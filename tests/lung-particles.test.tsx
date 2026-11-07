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
let onPreferenceChange = () => {};
let reduced = false;

beforeEach(() => {
  vi.clearAllMocks();
  reduced = false;
  onPreferenceChange = () => {};
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

  it("ramifica los bronquios hacia los lóbulos superiores de ambos pulmones", () => {
    const airways = createLungParticles(8800).filter(p => p.airway);
    expect(airways.some(p => p.x < -0.35 && p.y > 0.7)).toBe(true);
    expect(airways.some(p => p.x > 0.35 && p.y > 0.7)).toBe(true);
  });

  it("distribuye el tejido sin acumulaciones circulares en las terminaciones", () => {
    const particles = createLungParticles(8800);
    const cells = new Map<string, number>();
    for (const p of particles.filter(p => !p.airway)) {
      const key = `${Math.floor(p.x / 0.08)}:${Math.floor(p.y / 0.08)}`;
      cells.set(key, (cells.get(key) ?? 0) + 1);
    }
    expect(Math.max(...cells.values())).toBeLessThan(35);
  });

  it("mantiene las ramificaciones en el interior central y conserva el contorno", () => {
    const particles = createLungParticles(4400);
    const branches = particles.filter(p => p.airway && Math.abs(p.x) > 0.12);
    expect(branches.every(p => Math.abs(p.x) < 1.1 && p.y > -0.95 && p.y < 1.05)).toBe(true);
    const tissue = particles.filter(p => !p.airway);
    expect(tissue.some(p => Math.abs(p.x) > 1.4)).toBe(true);
    expect(tissue.some(p => p.y < -1.4)).toBe(true);
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

  it("anima y repite la formación aunque se solicite movimiento reducido", async () => {
    reduced = true;
    render(<LungParticles />);
    await updateVisibility(true);
    const visual = screen.getByRole("img", { name: /pulmones tridimensionales/i }).parentElement;
    await waitFor(() => expect(visual).toHaveAttribute("data-ready", "true"));
    await updateVisibility(false);
    await updateVisibility(true);
    expect(controller.replay).toHaveBeenCalledOnce();
    expect(controller.setVisible).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("mantiene la animación al cambiar la preferencia y libera la escena al desmontar", async () => {
    const { unmount } = render(<LungParticles />);
    await updateVisibility(true);
    act(() => { reduced = true; onPreferenceChange(); });
    expect(controller.dispose).not.toHaveBeenCalled();
    expect(screen.getByRole("img", { name: /pulmones tridimensionales/i }).parentElement).toHaveAttribute("data-ready", "true");
    act(() => { reduced = false; onPreferenceChange(); });
    expect(createLungScene).toHaveBeenCalledTimes(1);
    unmount();
    expect(controller.dispose).toHaveBeenCalledOnce();
  });
});
