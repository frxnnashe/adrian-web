import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LungParticles } from "@/components/lung-particles";
import { createHeroScatter, createLungParticles } from "@/lib/lung-particles";
import { createLungScene } from "@/lib/lung-scene";

vi.mock("@/lib/lung-scene", () => ({ createLungScene: vi.fn() }));

const controller = {
  setVisible: vi.fn(), replay: vi.fn(), dispose: vi.fn(),
};
let onIntersect: IntersectionObserverCallback;
let onPreferenceChange: () => void;
let reduced = false;

beforeEach(() => {
  vi.clearAllMocks();
  reduced = false;
  vi.mocked(createLungScene).mockReturnValue(controller);
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { onIntersect = callback; }
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() { return query.includes("prefers-reduced-motion") && reduced; },
    addEventListener: (_: string, callback: () => void) => { onPreferenceChange = callback; },
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => { vi.unstubAllGlobals(); });

async function updateVisibility(visible: boolean) {
  await act(async () => {
    onIntersect([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0 } as IntersectionObserverEntry], {} as IntersectionObserver);
  });
}

describe("pulmones de partículas", () => {
  it("distribuye las partículas fuera de los cuatro bordes del hero completo", () => {
    const scatter = createHeroScatter(createLungParticles(120), {
      left: -8, right: 3, top: 4, bottom: -4,
    }, 6.5);
    const projected = Array.from({ length: 120 }, (_, index) => {
      const depth = 1 - scatter[index * 3 + 2] / 6.5;
      return { x: scatter[index * 3] / depth, y: scatter[index * 3 + 1] / depth };
    });
    expect(projected.every(p => p.x < -8 || p.x > 3 || p.y > 4 || p.y < -4)).toBe(true);
    expect(projected.some(p => p.x < -8)).toBe(true);
    expect(projected.some(p => p.x > 3)).toBe(true);
    expect(projected.some(p => p.y > 4)).toBe(true);
    expect(projected.some(p => p.y < -4)).toBe(true);
  });

  it("produce una nube reproducible con volumen, ambos pulmones y vía aérea", () => {
    const particles = createLungParticles(1200);
    expect(particles).toEqual(createLungParticles(1200));
    expect(particles).toHaveLength(1200);
    expect(particles.every(p => Object.values(p).every(v => typeof v !== "number" || Number.isFinite(v)))).toBe(true);
    expect(particles.some(p => p.x < -1 && p.z < -0.2)).toBe(true);
    expect(particles.some(p => p.x > 1 && p.z > 0.2)).toBe(true);
    expect(particles.some(p => p.airway && p.y > 1.6)).toBe(true);
  });

  it("carga 3D al entrar en pantalla y repite solo cuando vuelve a entrar", async () => {
    render(<LungParticles />);
    expect(createLungScene).not.toHaveBeenCalled();
    expect(screen.getByRole("img", { name: /pulmones tridimensionales/i })).toBeInTheDocument();
    await updateVisibility(true);
    await waitFor(() => expect(createLungScene).toHaveBeenCalledTimes(1));
    await updateVisibility(true);
    expect(controller.replay).not.toHaveBeenCalled();
    await updateVisibility(false);
    expect(controller.setVisible).toHaveBeenLastCalledWith(false);
    await updateVisibility(true);
    expect(controller.replay).toHaveBeenCalledOnce();
    expect(controller.setVisible).toHaveBeenLastCalledWith(true);
    expect(createLungScene).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("muestra una alternativa estática cuando se solicita movimiento reducido", async () => {
    reduced = true;
    render(<LungParticles />);
    await updateVisibility(true);
    expect(createLungScene).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Pausar animación" })).not.toBeInTheDocument();
  });

  it("detiene y libera la escena al cambiar la preferencia o desmontar", async () => {
    const { unmount } = render(<LungParticles />);
    await updateVisibility(true);
    act(() => { reduced = true; onPreferenceChange(); });
    expect(controller.dispose).toHaveBeenCalledTimes(1);
    act(() => { reduced = false; onPreferenceChange(); });
    await waitFor(() => expect(createLungScene).toHaveBeenCalledTimes(2));
    unmount();
    expect(controller.dispose).toHaveBeenCalledTimes(2);
  });
});
