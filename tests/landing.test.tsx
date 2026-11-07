import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KinesiologyLanding } from "@/components/kinesiology-landing";

describe("KinesiologyLanding", () => {
  it("invita a consultar horarios y turnos por WhatsApp sin mostrar avisos de datos pendientes", () => {
    render(<KinesiologyLanding />);
    const contact = screen.getByRole("heading", { name: "Tu consulta puede empezar con un mensaje." }).closest("section")!;
    expect(within(contact).getByText(/consultá horarios de atención y disponibilidad de turnos por WhatsApp/i)).toBeInTheDocument();
    expect(within(contact).queryByText(/se incorporarán cuando sean confirmados/i)).not.toBeInTheDocument();
  });

  it("presenta los textos corregidos por el cliente", () => {
    render(<KinesiologyLanding />);
    expect(screen.getByText(/confianza en cada etapa de las enfermedades respiratorias crónicas\./i)).toBeInTheDocument();
    expect(screen.getByText(/acompañar el presente y anticipar los cuidados futuros\./i)).toBeInTheDocument();
    expect(screen.getByText(/entender qué necesitás en todo momento\./i)).toBeInTheDocument();
  });

  it("sitúa las credenciales junto al logo y la capacitación permanente en la introducción de formación", () => {
    render(<KinesiologyLanding />);
    expect(screen.getByText(/Matrícula profesional N.º 675/i).closest(".approach-section")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Capacitación permanente" }).closest(".formation-intro")).not.toBeNull();
  });

  it("presenta la identidad profesional y una vía de contacto por WhatsApp", () => {
    render(<KinesiologyLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /respirar mejor cambia tu manera de vivir/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Adrián Javier Ludovico/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Matrícula profesional N.º 675/i)).toBeInTheDocument();
    expect(screen.getByText(/RE N.º XVII, F 002, L1/i)).toBeInTheDocument();

    const contactLink = screen.getAllByRole("link", {
      name: /solicitar turno/i,
    })[0];
    expect(contactLink).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
  });

  it("acredita el desarrollo y enlaza al WhatsApp de Francisco Rocchia", () => {
    render(<KinesiologyLanding />);

    const developerLink = screen.getByRole("link", {
      name: /desarrollado por francisco rocchia/i,
    });

    expect(developerLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/5493541221485"),
    );
  });

  it("permite explorar los seis servicios y actualiza el detalle seleccionado", async () => {
    render(<KinesiologyLanding />);

    expect(screen.getAllByTestId("service-selector")).toHaveLength(6);

    fireEvent.click(
      screen.getByRole("button", {
        name: /VNI y oxígeno.*ventilación no invasiva y oxigenoterapia/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /ventilación no invasiva y oxigenoterapia/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/puesta en marcha y adaptación a los equipos/i)).toBeInTheDocument();
  });

  it("expone y cierra la navegación móvil con un control accesible", () => {
    render(<KinesiologyLanding />);

    const menuButton = screen.getByRole("button", { name: /abrir menú/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(
      screen.getByRole("button", { name: /cerrar menú/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
  });
});
