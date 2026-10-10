"use client";

import {
  ArrowUpRight,
  List,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { navItems } from "@/lib/site";

type NavigationProps = {
  whatsappUrl: string;
};

export function Navigation({ whatsappUrl }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegación principal">
        <a className="brand-lockup" href="#inicio" onClick={() => setMenuOpen(false)}>
          <span className="brand-logo">
            <Image
              src="/brand/adrian-ludovico-logo.jpeg"
              alt=""
              width={52}
              height={52}
              priority
            />
          </span>
          <span>
            <strong>Adrián Ludovico</strong>
            <small>Kinesiología cardiorrespiratoria</small>
          </span>
        </a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>

        <div className="nav-menu desktop-nav-menu">
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a
            className="button button-small"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappLogo size={19} weight="fill" />
            Solicitar turno
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>

        {menuOpen ? (
          <div
            className="mobile-nav-menu"
            id="mobile-menu"
            data-testid="mobile-menu"
          >
            <div className="nav-links">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              className="button button-small"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappLogo size={19} weight="fill" />
              Solicitar turno
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
