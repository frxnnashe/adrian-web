import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl } from "@/lib/contact";

describe("buildWhatsAppUrl", () => {
  it("normaliza el número y codifica el mensaje para un contacto directo", () => {
    expect(
      buildWhatsAppUrl("+54 9 341 555-1234", "Hola Adrián, quisiera solicitar un turno."),
    ).toBe(
      "https://wa.me/5493415551234?text=Hola%20Adri%C3%A1n%2C%20quisiera%20solicitar%20un%20turno.",
    );
  });

  it("abre el selector de contacto cuando el número todavía no fue definido", () => {
    expect(buildWhatsAppUrl(undefined, "Necesito información")).toBe(
      "https://wa.me/?text=Necesito%20informaci%C3%B3n",
    );
  });
});
