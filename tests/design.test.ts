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
});
