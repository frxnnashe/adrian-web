import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BreathJourney } from "@/components/breath-journey";
import { Reveal } from "@/components/reveal";
import { ServiceExplorer } from "@/components/service-explorer";

function AnimatedSections() {
  return (
    <>
      <Reveal>Contenido</Reveal>
      <BreathJourney />
      <ServiceExplorer />
    </>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("animated sections hydration", () => {
  it("no calcula propiedades iniciales de Motion con datos exclusivos del cliente", () => {
    const animatedComponents = [
      "components/reveal.tsx",
      "components/breath-journey.tsx",
      "components/service-explorer.tsx",
    ];

    for (const file of animatedComponents) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, file).not.toContain("useReducedMotion");
    }
  });

  it("hidrata sin diferencias cuando el navegador prefiere menos movimiento", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });

    const container = document.createElement("div");
    container.innerHTML = renderToString(<AnimatedSections />);
    document.body.append(container);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <AnimatedSections />);
    });

    const hydrationErrors = consoleError.mock.calls.filter(([message]) =>
      String(message).toLowerCase().includes("hydration"),
    );

    expect(hydrationErrors).toHaveLength(0);

    await act(async () => root?.unmount());
    container.remove();
  });
});
