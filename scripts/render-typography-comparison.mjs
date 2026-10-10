import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2]);
const root = process.cwd();
const fontDir = path.join(root, "typography-options", "fonts");
const output = path.join(root, "typography-options", "comparativa-tipografias.png");
const background = path.join(root, "typography-options", "background-clinico.png");

const palette = {
  navy: "#153247",
  secondary: "#4C7892",
  coral: "#B8443C",
  border: "#C9DDE8",
  white: "#FFFFFF",
};

const fonts = {
  ibmDisplay: {
    name: "IBM Plex Sans Condensed",
    file: path.join(fontDir, "IBMPlexSansCondensed-SemiBold.ttf"),
  },
  ibmBody: {
    name: "IBM Plex Sans",
    file: path.join(fontDir, "IBMPlexSans-Variable.ttf"),
  },
  sourceSerif: {
    name: "Source Serif 4",
    file: path.join(fontDir, "SourceSerif4-Variable.ttf"),
  },
  sourceSans: {
    name: "Source Sans 3",
    file: path.join(fontDir, "SourceSans3-Variable.ttf"),
  },
  manrope: {
    name: "Manrope",
    file: path.join(fontDir, "Manrope-Variable.ttf"),
  },
};

const panels = [
  {
    number: "01",
    descriptor: "TÉCNICA · SOBRIA · CLÍNICA",
    pair: "IBM Plex Sans Condensed + IBM Plex Sans",
    display: fonts.ibmDisplay,
    body: fonts.ibmBody,
  },
  {
    number: "02",
    descriptor: "INSTITUCIONAL · EDITORIAL · HUMANA",
    pair: "Source Serif 4 + Source Sans 3",
    display: fonts.sourceSerif,
    body: fonts.sourceSans,
  },
  {
    number: "03",
    descriptor: "CONTEMPORÁNEA · LIMPIA · CERCANA",
    pair: "Manrope + Source Sans 3",
    display: fonts.manrope,
    body: fonts.sourceSans,
  },
];

const escapeMarkup = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

async function textBuffer({ text, font, width, height, size, weight = 400, color, align = "left", spacing = 0 }) {
  const markup = `<span foreground="${color}" weight="${weight}" letter_spacing="${spacing}">${escapeMarkup(text)}</span>`;

  return sharp({
    text: {
      text: markup,
      font: `${font.name} ${size}`,
      fontfile: font.file,
      width,
      height,
      align,
      rgba: true,
    },
  }).png().toBuffer();
}

const panelSvg = Buffer.from(`
  <svg width="1200" height="1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="22" flood-color="#153247" flood-opacity="0.10"/>
      </filter>
    </defs>
    <rect x="55" y="205" width="1090" height="360" rx="30" fill="#FFFFFF" fill-opacity="0.93" stroke="#C9DDE8" filter="url(#shadow)"/>
    <rect x="55" y="585" width="1090" height="360" rx="30" fill="#FFFFFF" fill-opacity="0.93" stroke="#C9DDE8" filter="url(#shadow)"/>
    <rect x="55" y="965" width="1090" height="360" rx="30" fill="#FFFFFF" fill-opacity="0.93" stroke="#C9DDE8" filter="url(#shadow)"/>
    <rect x="85" y="235" width="72" height="42" rx="21" fill="#B8443C"/>
    <rect x="85" y="615" width="72" height="42" rx="21" fill="#B8443C"/>
    <rect x="85" y="995" width="72" height="42" rx="21" fill="#B8443C"/>
    <line x1="85" y1="514" x2="1115" y2="514" stroke="#D9E7EE" stroke-width="2"/>
    <line x1="85" y1="894" x2="1115" y2="894" stroke="#D9E7EE" stroke-width="2"/>
    <line x1="85" y1="1274" x2="1115" y2="1274" stroke="#D9E7EE" stroke-width="2"/>
    <circle cx="1092" cy="88" r="18" fill="none" stroke="#B8443C" stroke-width="3"/>
    <path d="M1075 88h34M1092 71v34" stroke="#B8443C" stroke-width="3" stroke-linecap="round"/>
  </svg>
`);

const composites = [{ input: panelSvg, left: 0, top: 0 }];

composites.push({
  input: await textBuffer({
    text: "COMPARATIVA TIPOGRÁFICA",
    font: fonts.ibmBody,
    width: 900,
    height: 66,
    size: 42,
    weight: 700,
    color: palette.navy,
    spacing: 1200,
  }),
  left: 66,
  top: 54,
});

composites.push({
  input: await textBuffer({
    text: "Adrián Ludovico · Kinesiología Cardiorrespiratoria",
    font: fonts.ibmBody,
    width: 980,
    height: 44,
    size: 24,
    color: palette.secondary,
  }),
  left: 68,
  top: 123,
});

for (const [index, panel] of panels.entries()) {
  const y = 205 + index * 380;

  composites.push({
    input: await textBuffer({
      text: panel.number,
      font: fonts.ibmBody,
      width: 72,
      height: 42,
      size: 18,
      weight: 700,
      color: palette.white,
      align: "center",
    }),
    left: 85,
    top: y + 30,
  });

  composites.push({
    input: await textBuffer({
      text: panel.descriptor,
      font: panel.body,
      width: 520,
      height: 42,
      size: 18,
      weight: 600,
      color: palette.secondary,
      spacing: 800,
    }),
    left: 180,
    top: y + 16,
  });

  composites.push({
    input: await textBuffer({
      text: "Respirar mejor cambia tu manera de vivir.",
      font: panel.display,
      width: 980,
      height: 92,
      size: 54,
      weight: 650,
      color: palette.navy,
    }),
    left: 85,
    top: y + 76,
  });

  composites.push({
    input: await textBuffer({
      text: "Atención especializada para recuperar capacidad, autonomía y confianza\nen cada etapa de tu salud respiratoria.",
      font: panel.body,
      width: 980,
      height: 84,
      size: 23,
      color: palette.navy,
    }),
    left: 87,
    top: y + 174,
  });

  composites.push({
    input: await textBuffer({
      text: panel.pair,
      font: panel.body,
      width: 800,
      height: 40,
      size: 19,
      weight: 600,
      color: palette.coral,
    }),
    left: 87,
    top: y + 310,
  });
}

composites.push({
  input: await textBuffer({
    text: "Mismo mensaje · misma escala · tres personalidades",
    font: fonts.ibmBody,
    width: 1060,
    height: 46,
    size: 20,
    color: palette.secondary,
    align: "center",
  }),
  left: 70,
  top: 1400,
});

await sharp(background)
  .resize(1200, 1500, { fit: "cover" })
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);
