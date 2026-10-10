import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adrián Ludovico | Kinesiología Cardiorrespiratoria",
  description:
    "Atención especializada en rehabilitación, kinesiología y fisioterapia cardiorrespiratoria para adultos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sourceSans.variable} ${sourceSerif.variable}`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
