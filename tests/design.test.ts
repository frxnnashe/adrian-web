import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("sistema visual", () => {
  it("usa la paleta P1 azul clínico y coral sobrio", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain("--page: #f3f7fa;");
    expect(css).toContain("--surface: #ffffff;");
    expect(css).toContain("--ink: #153247;");
    expect(css).toContain("--ink-soft: #4c7892;");
    expect(css).toContain("--accent: #b8443c;");
  });

  it("contiene el diseño dentro del viewport en móviles pequeños", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
    const mobileCss = css.slice(css.indexOf("@media (max-width: 760px)"));

    expect(css).toMatch(/html\s*\{[\s\S]*?overflow-x:\s*clip;/);
    expect(mobileCss).toContain(".service-detail {\n    min-width: 0;");
    expect(mobileCss).toContain(".brand-figure::before {\n    inset: 7% 0 -6% 7%;");
    expect(mobileCss).toContain(".service-detail h3 {\n    overflow-wrap: anywhere;");
  });
});
