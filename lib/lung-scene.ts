import * as THREE from "three";

import { createHeroScatter, createLungParticles } from "@/lib/lung-particles";

export type LungScene = {
  setVisible: (visible: boolean) => void;
  replay: () => void;
  dispose: () => void;
};

export function createLungScene(canvas: HTMLCanvasElement): LungScene {
  const host = canvas.parentElement!;
  const hero = canvas.closest<HTMLElement>(".hero-section") ?? host;
  const mobile = matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);

  const particles = createLungParticles(mobile ? 4400 : 8800);
  const positions = new Float32Array(particles.length * 3);
  const colors = new Float32Array(positions.length);
  const sizes = new Float32Array(particles.length);
  const phases = new Float32Array(particles.length);
  const dark = matchMedia("(prefers-color-scheme: dark)");

  particles.forEach((p, i) => {
    positions.set([p.x, p.y, p.z], i * 3);
    sizes[i] = p.size;
    phases[i] = p.phase;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(new Float32Array(positions.length), 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const updateColors = () => {
    const style = getComputedStyle(host);
    const blue = new THREE.Color(style.getPropertyValue("--lung-depth").trim());
    const secondary = new THREE.Color(style.getPropertyValue("--lung-tissue").trim());
    const coral = new THREE.Color(style.getPropertyValue("--lung-airway").trim());
    particles.forEach((p, i) => {
      const color = p.airway ? coral : blue.clone().lerp(secondary, (p.z + 0.5) * 0.6);
      colors.set([color.r, color.g, color.b], i * 3);
    });
    geometry.attributes.color.needsUpdate = true;
  };
  updateColors();

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uAssembly: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    },
    vertexShader: `
      attribute vec3 aScatter;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uAssembly;
      uniform float uPixelRatio;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float progress = clamp((uAssembly - aPhase * 0.035) / 0.78, 0.0, 1.0);
        float attraction = 1.0 - pow(1.0 - progress, 4.0);
        vec3 drift = vec3(sin(uTime * 0.45 + aPhase), cos(uTime * 0.36 + aPhase), sin(uTime * 0.3 + aPhase)) * 0.16;
        vec3 point = mix(aScatter + drift, position, attraction);
        float breath = sin(uTime * 0.85) * 0.018 * attraction;
        point.x *= 1.0 + breath;
        point.z *= 1.0 + breath * 2.0;
        vec4 mvPosition = modelViewMatrix * vec4(point, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = clamp(aSize * uPixelRatio * 13.8 / -mvPosition.z, 1.0, 7.0);
        vColor = color;
        vAlpha = mix(0.32, 0.96, attraction) * clamp((point.z + 1.3) * 0.6, 0.55, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float radius = length(gl_PointCoord - vec2(0.5));
        float alpha = (1.0 - smoothstep(0.27, 0.5, radius)) * vAlpha;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const cloud = new THREE.Points(geometry, material);
  cloud.frustumCulled = false;
  scene.add(cloud);

  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let assemblyTime = 0;
  let visible = true;
  let disposed = false;
  let pointerX = 0;
  let pointerY = 0;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const resize = () => {
    const target = host.getBoundingClientRect();
    const area = hero.getBoundingClientRect();
    const width = Math.max(1, area.width);
    const height = Math.max(1, area.height);
    const targetHeight = Math.max(1, target.height);
    const targetWidth = Math.max(1, target.width);
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2, Math.sqrt(3000000 / (width * height))));
    renderer.setSize(width, height);
    canvas.style.left = `${area.left - target.left}px`;
    canvas.style.top = `${area.top - target.top}px`;
    camera.aspect = targetWidth / targetHeight;
    camera.position.z = camera.aspect < 0.85 ? 7.4 : 6.5;
    camera.setViewOffset(targetWidth, targetHeight, area.left - target.left, area.top - target.top, width, height);
    const worldPerPixel = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z) / targetHeight;
    const left = (area.left - target.left - targetWidth / 2) * worldPerPixel;
    const top = (target.top + targetHeight / 2 - area.top) * worldPerPixel;
    const scatter = createHeroScatter(particles, {
      left, right: left + width * worldPerPixel,
      top, bottom: top - height * worldPerPixel,
    }, camera.position.z);
    geometry.attributes.aScatter.array.set(scatter);
    geometry.attributes.aScatter.needsUpdate = true;
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    renderer.render(scene, camera);
  };

  const tick = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    elapsed += delta;
    assemblyTime += delta;
    material.uniforms.uTime.value = elapsed;
    material.uniforms.uAssembly.value = Math.min(1, assemblyTime / 2.8);
    const smoothing = 1 - Math.exp(-delta * 3);
    cloud.rotation.y += (Math.sin(elapsed * 0.22) * 0.16 + pointerX * 0.2 - cloud.rotation.y) * smoothing;
    cloud.rotation.x += (pointerY * 0.08 - cloud.rotation.x) * smoothing;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };

  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (!disposed && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };

  const pointerMove = (event: PointerEvent) => {
    if (!finePointer || event.pointerType === "touch") return;
    const rect = hero.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
  };
  const pointerLeave = () => { pointerX = 0; pointerY = 0; };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  if (hero !== host) resizeObserver.observe(hero);
  hero.addEventListener("pointermove", pointerMove);
  hero.addEventListener("pointerleave", pointerLeave);
  document.addEventListener("visibilitychange", sync);
  dark.addEventListener("change", updateColors);
  resize();
  sync();

  return {
    setVisible(value) { visible = value; sync(); },
    replay() { assemblyTime = 0; sync(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", pointerMove);
      hero.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", sync);
      dark.removeEventListener("change", updateColors);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
