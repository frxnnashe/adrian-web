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

type Position = readonly [number, number, number];
type BronchialBranch = {
  start: Position;
  control: Position;
  end: Position;
  radius: number;
  terminal: boolean;
};

function pointOnBranch(branch: BronchialBranch, t: number): Position {
  const a = (1 - t) ** 2;
  const b = 2 * (1 - t) * t;
  const c = t * t;
  return [
    a * branch.start[0] + b * branch.control[0] + c * branch.end[0],
    a * branch.start[1] + b * branch.control[1] + c * branch.end[1],
    a * branch.start[2] + b * branch.control[2] + c * branch.end[2],
  ];
}

function createBronchialTree() {
  const root: Position = [0, 0.72, 0.25];
  const branches: BronchialBranch[] = [{
    start: [0, 2.05, 0.22], control: [0, 1.3, 0.24], end: root,
    radius: 0.075, terminal: false,
  }];

  for (const side of [-1, 1]) {
    const position = (x: number, y: number, z = 0.28): Position => [
      side * x * 0.76, root[1] + (y - root[1]) * 0.64, z,
    ];
    const primary: BronchialBranch = {
      start: root, control: position(0.16, 0.58), end: position(0.58, 0.24),
      radius: 0.065, terminal: false,
    };
    const descending: BronchialBranch = {
      start: primary.end, control: position(0.87, -0.33, 0.24), end: position(0.51, -0.97, 0.2),
      radius: 0.05, terminal: false,
    };
    branches.push(primary, descending);

    const addLobarBranch = (
      parent: BronchialBranch, t: number, control: Position, end: Position, tips: Position[],
    ) => {
      branches.push({ start: pointOnBranch(parent, t), control, end, radius: 0.025, terminal: false });
      for (const tip of tips) {
        branches.push({
          start: end,
          control: [end[0] * 0.7 + tip[0] * 0.3, end[1] * 0.25 + tip[1] * 0.75, (end[2] + tip[2]) / 2],
          end: tip, radius: 0.013, terminal: false,
        });
        const direction = tip[1] >= end[1] ? 1 : -1;
        for (const fork of [-1, 1]) {
          branches.push({
            start: tip,
            control: [tip[0] + side * fork * 0.035, tip[1] + direction * 0.035, tip[2]],
            end: [tip[0] + side * fork * 0.07, tip[1] + direction * 0.07, tip[2] + fork * 0.035],
            radius: 0.008, terminal: true,
          });
        }
      }
    };

    addLobarBranch(primary, 0.65, position(0.5, 0.66), position(0.47, 1.02), [
      position(0.36, 1.33, 0.14), position(0.68, 1.19, 0.34),
    ]);
    addLobarBranch(descending, 0.18, position(0.91, 0.22), position(1.04, 0.32), [
      position(1.19, 0.4, 0.18), position(0.99, 0.68, 0.32),
    ]);
    addLobarBranch(descending, 0.49, position(0.96, -0.34), position(1.02, -0.65), [
      position(1.23, -0.78, 0.18), position(1.01, -1.04, 0.32),
    ]);
    addLobarBranch(descending, 0.87, position(0.74, -0.9), position(0.68, -0.96), [
      position(0.52, -1, 0.16), position(0.89, -1.08, 0.3),
    ]);
  }
  return branches;
}

const bronchialTree = createBronchialTree();
const branchWeights = bronchialTree.map(branch => (
  Math.hypot(...branch.start.map((v, i) => v - branch.control[i])) +
  Math.hypot(...branch.control.map((v, i) => v - branch.end[i]))
) * Math.sqrt(branch.radius));
const totalBranchWeight = branchWeights.reduce((sum, weight) => sum + weight, 0);

function sampleAirway(random: () => number, particleIndex: number): Position {
  let weight = random() * totalBranchWeight;
  let index = 0;
  while (index < bronchialTree.length - 1 && weight > branchWeights[index]) {
    weight -= branchWeights[index++];
  }
  const tracheal = particleIndex % 15 === 0;
  const branch = bronchialTree[tracheal ? 0 : index];
  const t = tracheal ? ((Math.floor(particleIndex / 15) % 12) + random()) / 12 : random();
  const center = pointOnBranch(branch, t);
  const dx = 2 * ((1 - t) * (branch.control[0] - branch.start[0]) + t * (branch.end[0] - branch.control[0]));
  const dy = 2 * ((1 - t) * (branch.control[1] - branch.start[1]) + t * (branch.end[1] - branch.control[1]));
  const length = Math.hypot(dx, dy);
  const angle = random() * Math.PI * 2;
  const radius = branch.radius * (1 - t * 0.5) * Math.sqrt(random());
  return [
    center[0] - (dy / length) * radius * Math.cos(angle),
    center[1] + (dx / length) * radius * Math.cos(angle),
    center[2] + radius * Math.sin(angle),
  ];
}

export function createLungParticles(count: number): LungParticle[] {
  let seed = 675;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const particles: LungParticle[] = [];
  for (let i = 0; i < count; i++) {
    const airway = i % 3 === 0;
    const side = random() > 0.5 ? 1 : -1;
    let x: number;
    let y: number;
    let z: number;

    if (airway) {
      [x, y, z] = sampleAirway(random, i);
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
