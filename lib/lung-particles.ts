export type LungParticle = {
  x: number;
  y: number;
  z: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
  size: number;
  phase: number;
  airway: boolean;
};

export function createHeroScatter(
  particles: LungParticle[],
  bounds: { left: number; right: number; top: number; bottom: number },
  cameraZ: number,
) {
  const scatter = new Float32Array(particles.length * 3);
  const centerX = (bounds.left + bounds.right) / 2;
  const centerY = (bounds.top + bounds.bottom) / 2;
  const halfWidth = (bounds.right - bounds.left) / 2;
  const halfHeight = (bounds.top - bounds.bottom) / 2;

  particles.forEach((particle, index) => {
    const edge = index % 4;
    const distance = 1.04 + (particle.size % 1) * 0.35;
    const z = particle.scatterZ * 0.25;
    const perspective = (cameraZ - z) / cameraZ;
    const x = edge < 2
      ? centerX + (edge === 0 ? -1 : 1) * halfWidth * distance
      : centerX + (particle.scatterX / 5.2) * halfWidth;
    const y = edge < 2
      ? centerY + (particle.scatterY / 5.2) * halfHeight
      : centerY + (edge === 2 ? -1 : 1) * halfHeight * distance;
    scatter.set([x * perspective, y * perspective, z], index * 3);
  });

  return scatter;
}

type Point = readonly [number, number];

const outline: Point[] = [
  [0.22, 0.66], [0.22, 1.13], [0.32, 1.43], [0.48, 1.51],
  [0.7, 1.41], [0.93, 1.1], [1.17, 0.7], [1.37, 0.2],
  [1.5, -0.37], [1.51, -0.91], [1.43, -1.2], [1.26, -1.29],
  [0.98, -1.25], [0.69, -1.13], [0.43, -0.99], [0.29, -0.78],
  [0.25, -0.37], [0.23, 0.13],
];

function inside(x: number, y: number) {
  let contained = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [ax, ay] = outline[i];
    const [bx, by] = outline[j];
    if ((ay > y) !== (by > y) && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) {
      contained = !contained;
    }
  }
  return contained;
}

function edgeDistance(x: number, y: number) {
  let minimum = Infinity;
  for (let i = 0; i < outline.length; i++) {
    const [ax, ay] = outline[i];
    const [bx, by] = outline[(i + 1) % outline.length];
    const dx = bx - ax;
    const dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    minimum = Math.min(minimum, Math.hypot(x - ax - dx * t, y - ay - dy * t));
  }
  return minimum;
}

export function createLungParticles(count: number): LungParticle[] {
  let seed = 675;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const particles: LungParticle[] = [];
  for (let i = 0; i < count; i++) {
    const airway = i % 7 === 0;
    const side = random() > 0.5 ? 1 : -1;
    let x: number;
    let y: number;
    let z: number;

    if (airway) {
      const t = random();
      if (i % 3 === 0) {
        x = (random() - 0.5) * 0.12;
        y = 0.57 + t * 1.48;
      } else {
        const branch = i % 4;
        const endX = [0.93, 1.13, 0.98, 0.68][branch];
        const endY = [0.96, 0.15, -0.63, -0.98][branch];
        x = side * (0.04 + endX * t);
        y = 0.63 + (endY - 0.63) * t - Math.sin(t * Math.PI) * 0.16;
        x += (random() - 0.5) * 0.06;
        y += (random() - 0.5) * 0.06;
      }
      z = 0.2 + (random() - 0.5) * 0.12;
    } else {
      do {
        x = 0.2 + random() * 1.34;
        y = -1.32 + random() * 2.86;
      } while (!inside(x, y));
      const thickness = 0.48 * Math.sqrt(Math.min(1, edgeDistance(x, y) / 0.38));
      z = thickness * (random() > 0.5 ? 1 : -1) * (0.65 + random() * 0.35);
      if (side === 1) {
        x += 0.16 * Math.exp(-Math.pow((y + 0.1) / 0.47, 2)) * (1 - Math.min(1, (x - 0.2) / 0.6));
      }
      x *= side;
    }

    const angle = random() * Math.PI * 2;
    const radius = 2.2 + random() * 3;
    particles.push({
      x, y: y - 0.25, z,
      scatterX: Math.cos(angle) * radius,
      scatterY: Math.sin(angle) * radius,
      scatterZ: (random() - 0.5) * 5,
      size: airway ? 1.1 + random() * 0.7 : 0.65 + random() * 0.9,
      phase: random() * Math.PI * 2,
      airway,
    });
  }
  return particles;
}
