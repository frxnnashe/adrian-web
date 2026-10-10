import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourcePath = path.join(root, ".next", "server", "app", "index.html");
const outputDir = path.join(root, ".impeccable", "review");
const outputPath = path.join(outputDir, "preview.html");
let html = await readFile(sourcePath, "utf8");

const stylesheetPattern = /<link rel="stylesheet" href="([^"]+)"[^>]*>/g;
const stylesheetMatches = [...html.matchAll(stylesheetPattern)];

for (const match of stylesheetMatches) {
  const diskPath = path.join(root, ".next", match[1].replace("/_next/", ""));
  let css = await readFile(diskPath, "utf8");
  const mediaUrl = pathToFileURL(path.join(root, ".next", "static", "media")).href;
  css = css.replaceAll("url(../media/", `url(${mediaUrl}/`);
  html = html.replace(match[0], `<style>${css}</style>`);
}

html = html
  .replace(/<link rel="preload"[^>]*>/g, "")
  .replace(/<script[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/\s+srcSet="[^"]*"/g, "")
  .replace(/\s+imageSrcSet="[^"]*"/g, "")
  .replace(/\s+imageSizes="[^"]*"/g, "")
  .replace(/src="\/_next\/image\?url=([^&"]+)[^"]*"/g, (_, encodedPath) => {
    const assetPath = path.join(root, "public", decodeURIComponent(encodedPath));
    return `src="${pathToFileURL(assetPath).href}"`;
  })
  .replaceAll("opacity:0", "opacity:1")
  .replaceAll("filter:blur(8px)", "filter:none")
  .replaceAll("transform:translateY(28px)", "transform:none")
  .replaceAll("transform:translateY(24px)", "transform:none")
  .replaceAll("transform:scaleX(0)", "transform:scaleX(1)");

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, html, "utf8");
console.log(outputPath);
