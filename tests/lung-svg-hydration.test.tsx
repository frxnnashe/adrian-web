import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it, vi } from "vitest";

import { LungParticles } from "@/components/lung-particles";

const { particle } = vi.hoisted(() => ({
  particle: {
    x: 0.5313816449791398,
    y: -0.09341401021819931,
    z: 0.1313816449791398,
    scatterX: 1,
    scatterY: 1,
    scatterZ: 1,
    size: 1,
    phase: 1,
    airway: false,
  },
}));

vi.mock("@/lib/lung-particles", () => ({ createLungParticles: () => [particle] }));

it("hidrata el SVG sin diferencias ante variaciones numéricas entre motores JavaScript", async () => {
  const original = { ...particle };
  const container = document.createElement("div");
  container.innerHTML = renderToString(<LungParticles />);
  document.body.append(container);

  particle.x = 0.5313816449791399;
  particle.y = -0.09341401021819934;
  particle.z = 0.1313816449791399;

  const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
  let root: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => { root = hydrateRoot(container, <LungParticles />); });
    expect(consoleError.mock.calls).toEqual([]);
  } finally {
    await act(async () => root?.unmount());
    container.remove();
    Object.assign(particle, original);
    consoleError.mockRestore();
  }
});
