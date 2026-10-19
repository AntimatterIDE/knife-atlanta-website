"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import * as THREE from "three";

interface Portrait {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface Picture {
  image: HTMLImageElement;
  texture: THREE.Texture;
  aspect: number;
  ready: boolean;
  uploaded: boolean;
  fade: number;
  used: number;
}

interface Card {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  w: number;
  rho0: number;
  dev: number;
  theta: number;
  scale: number;
  roll: number;
  image: number;
  grip: number;
  x: number;
  y: number;
  sw: number;
  sh: number;
  rot: number;
  alpha: number;
  reveal: number;
  shown: boolean;
}

interface Press {
  id: number;
  x: number;
  y: number;
  moved: boolean;
  radius: number;
  angle: number;
  samples: { t: number; zoom: number; angle: number }[];
}

interface StreamParts {
  root: HTMLElement;
  stage: HTMLElement;
  copy: HTMLElement;
  caption: HTMLElement;
  title: HTMLElement;
  subtitle: HTMLElement;
}

interface StreamEvents {
  onOpen: (index: number) => void;
  onClose: () => void;
}

const PORTRAITS: Portrait[] = [
  {
    src: "/images/knife/lounge.jpg",
    alt: "Dining room and bar at Knife",
    title: "The room",
    subtitle: "Atlanta",
  },
  {
    src: "/images/knife/carousel-3.jpg",
    alt: "Mezze trio with lavash",
    title: "Mezze",
    subtitle: "Shared plates",
  },
  {
    src: "/images/knife/carousel-4.jpg",
    alt: "Grilled lamb chops",
    title: "Lamb chops",
    subtitle: "From the kitchen",
  },
  {
    src: "/images/knife/carousel-2.jpg",
    alt: "Filet kebab",
    title: "Filet kebab",
    subtitle: "Charcoal",
  },
  {
    src: "/images/knife/carousel-1.jpg",
    alt: "Braised lamb shank",
    title: "Lamb shank",
    subtitle: "Slow braise",
  },
  {
    src: "/images/knife/carousel-5.jpg",
    alt: "Shrimp of the house",
    title: "Shrimp",
    subtitle: "Coastal",
  },
  {
    src: "/images/knife/patio.jpg",
    alt: "Evening patio",
    title: "The patio",
    subtitle: "After dark",
  },
  {
    src: "/images/knife/cuisine.jpg",
    alt: "Bone-in ribeye",
    title: "Ribeye",
    subtitle: "21-day aged",
  },
];

const MAX_CARDS = 24;
const COUNT = 14;
const MIN_COUNT = 6;
const COUNT_AREA = 1000000;
const SPEED = 0.07;
const RUSH = 0.35;
const SPIRAL = 0.25;
const SIZE = 0.22;
const SIZE_VARIANCE = 0.2;
const ASPECT = 0.8;
const RADIUS = 6;
const BORDER = 0.055;
const PAPER = 0xf5f3ef;
const RIM = 0.1;
const ROLL = 5;
const DEVELOP = 0.9;
const EDGE_FADE = 0.45;
const SHADOW = 0.6;
const HOVER_SLOW = 0.6;
const BLANK_PADDING = 24;
const BIRTH_SPREAD = 0.45;
const DEVELOP_ROOM = 0.4;
const ROOM_MIN = 1.35;
const SHIELD_FADE = 32;
const CAPTION_SPACE = 64;
const TAU = Math.PI * 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const smooth = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const springTo = (
  value: number,
  velocity: number,
  target: number,
  dt: number,
  response: number,
  ratio: number,
) => {
  const omega = TAU / Math.max(response, 0.02);
  const substeps = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / substeps;
  let v = velocity;
  let x = value;
  for (let i = 0; i < substeps; i++) {
    v += (omega * omega * (target - x) - 2 * ratio * omega * v) * h;
    x += v * h;
  }
  return [x, v] as const;
};

const advance = (w: number, distance: number) => {
  const base = Math.pow(w, RUSH) - RUSH * distance;
  if (base <= 1e-6) return 1e-4;
  return Math.pow(base, 1 / RUSH);
};

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D uImage;
uniform float uImageAspect;
uniform vec2 uSize;
uniform float uMargin;
uniform float uRadius;
uniform float uBorder;
uniform vec3 uBorderColor;
uniform float uRim;
uniform float uReveal;
uniform float uDevelop;
uniform float uAlpha;
uniform float uShadow;
uniform float uLift;
uniform vec3 uBackground;
uniform vec2 uResolution;
uniform float uEdge;
varying vec2 vUv;

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 full = uSize + 2.0 * uMargin;
  vec2 p = (vUv - 0.5) * full;
  float radius = min(uRadius, 0.5 * min(uSize.x, uSize.y));
  float d = roundBox(p, 0.5 * uSize, radius);
  float px = max(fwidth(d), 1e-4);
  float card = 1.0 - smoothstep(-0.7 * px, 0.7 * px, d);

  vec2 frag = gl_FragCoord.xy;
  float edgeDistance = min(min(frag.x, uResolution.x - frag.x), min(frag.y, uResolution.y - frag.y));
  float edge = uEdge > 0.5 ? smoothstep(0.0, uEdge, edgeDistance) : 1.0;

  float height = uSize.y;
  float sd = roundBox(p - vec2(0.0, -height * (0.03 + 0.03 * uLift)), 0.5 * uSize * 0.96, radius);
  float blur = height * (0.08 + 0.06 * uLift);
  float shade = (1.0 - smoothstep(-blur * 0.6, blur, sd)) * uShadow * (0.42 + 0.22 * uLift);

  float inner = min(uBorder, 0.45 * min(uSize.x, uSize.y));
  vec2 box = max(uSize - 2.0 * inner, vec2(1.0));
  float di = roundBox(p, 0.5 * box, max(radius - inner * 0.6, 0.0));
  float photo = 1.0 - smoothstep(-0.7 * px, 0.7 * px, di);
  float boxAspect = box.x / box.y;
  vec2 uv = p / box;
  if (boxAspect > uImageAspect) {
    uv.y *= uImageAspect / boxAspect;
  } else {
    uv.x *= boxAspect / uImageAspect;
  }
  uv += 0.5;
  vec3 image = texture2D(uImage, uv).rgb;

  float luma = dot(image, vec3(0.2126, 0.7152, 0.0722));
  float print = step(0.5, uBorder);
  vec3 ground = mix(uBackground, uBorderColor, print);
  float base = dot(ground, vec3(0.2126, 0.7152, 0.0722));
  float dark = step(base, 0.5);
  float contrast = abs(luma - base) / max(max(base, 1.0 - base), 0.25);
  float window = 0.3;
  float threshold = 1.0 - uReveal * (1.0 + window);
  float tonal = smoothstep(threshold, threshold + window, contrast);
  vec3 mono = vec3(luma);
  vec3 tinted = mix(mono, image, smoothstep(0.5, 0.95, uReveal));
  vec3 developedImage = mix(image, tinted, uDevelop);
  vec3 paper = mix(mix(uBackground, vec3(dark), 0.07), uBorderColor, print);
  float develop = mix(smoothstep(0.0, 1.0, uReveal), tonal, uDevelop);
  float paperShown = uDevelop * max(1.0 - dark, print);
  vec3 photoColor = mix(paper, developedImage, develop);
  float paperIn = mix(develop, smoothstep(0.0, 0.18, uReveal), paperShown);
  photoColor = mix(developedImage, photoColor, paperShown);

  vec3 color3 = mix(uBorderColor, photoColor, photo);
  float rimMask = card * (1.0 - smoothstep(0.0, 1.6 * px, -d));
  color3 = mix(color3, mix(vec3(1.0), vec3(0.0), 1.0 - dark), rimMask * uRim * smoothstep(0.3, 1.0, uReveal));
  float amount = mix(mix(smoothstep(0.0, 1.0, uReveal), paperIn, photo), smoothstep(0.0, 0.18, uReveal), print * uDevelop);
  float alpha = card * uAlpha * edge * amount;
  float shadowAlpha = (1.0 - card) * shade * uAlpha * edge * uReveal;
  float total = alpha + shadowAlpha * (1.0 - alpha);
  if (total < 0.002) discard;
  gl_FragColor = vec4(color3 * alpha, total);
}
`;

function createStream(parts: StreamParts, events: StreamEvents) {
  const { root, stage, copy, caption, title, subtitle } = parts;
  const doc = root.ownerDocument;
  const view = doc.defaultView ?? window;
  const canvas = doc.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  stage.appendChild(canvas);
  renderer.setClearColor(0x000000, 0);

  const motionQuery = view.matchMedia("(prefers-reduced-motion: reduce)");
  const schemeQuery = view.matchMedia("(prefers-color-scheme: dark)");
  const probe = doc.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const ink = probe.getContext("2d", { willReadFrequently: true });

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
  const plane = new THREE.PlaneGeometry(1, 1);
  const empty = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1);
  empty.needsUpdate = true;
  const resolution = new THREE.Vector2(1, 1);
  const background = new THREE.Color().setRGB(1, 1, 1, THREE.NoColorSpace);
  const paper = new THREE.Color().setHex(PAPER, THREE.NoColorSpace);
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const cards: Card[] = Array.from({ length: MAX_CARDS }, () => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uImage: { value: empty as THREE.Texture },
        uImageAspect: { value: ASPECT },
        uSize: { value: new THREE.Vector2(100, 125) },
        uMargin: { value: 20 },
        uRadius: { value: RADIUS },
        uBorder: { value: 0 },
        uBorderColor: { value: paper },
        uRim: { value: RIM },
        uReveal: { value: 0 },
        uDevelop: { value: DEVELOP },
        uAlpha: { value: 0 },
        uShadow: { value: SHADOW },
        uLift: { value: 0 },
        uBackground: { value: background },
        uResolution: { value: resolution },
        uEdge: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      premultipliedAlpha: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(plane, material);
    mesh.frustumCulled = false;
    mesh.visible = false;
    scene.add(mesh);
    return {
      mesh,
      w: 1,
      rho0: 0.2,
      dev: 0.3,
      theta: 0,
      scale: 1,
      roll: 0,
      image: 0,
      grip: 0,
      x: 0,
      y: 0,
      sw: 0,
      sh: 0,
      rot: 0,
      alpha: 0,
      reveal: 0,
      shown: false,
    };
  });

  const zone = { left: -160, right: 160, top: -100, bottom: 100 };
  let pictures: Picture[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let sized = false;
  let seeded = false;
  let activeCount = MIN_COUNT;
  let reduced = motionQuery.matches;
  let paused = false;
  let backgroundKey = "";
  let phi = 0;
  let spinVelocity = 0;
  let zoomVelocity = 0;
  let pendingZoom = 0;
  let inside = 0;
  let pointerInside = false;
  let pointerX = 0;
  let pointerY = 0;
  let hovered = -1;
  let openId = -1;
  let openTarget = 0;
  let openT = 0;
  let openV = 0;
  let shownCaption = -1;
  let captionOpacity = -1;
  let captionTop = Number.NaN;
  let copyOpacity = 1;
  let raf = 0;
  let last = 0;
  let visible = false;
  let destroyed = false;
  let lost = false;
  let consumed = false;
  let clock = 0;
  let order: Card[] = [];
  let press: Press | null = null;

  let seed = (Math.random() * 4294967296) | 0;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const halfDiagonal = () => Math.hypot(width, height) / 2;
  const minSide = () => Math.min(width, height);

  const schedule = () => {
    if (destroyed || lost || !visible || raf) return;
    raf = view.requestAnimationFrame(frame);
  };

  const loadPictures = () => {
    pictures.forEach((picture) => {
      picture.image.onload = null;
      picture.texture.dispose();
    });
    pictures = PORTRAITS.map((portrait) => {
      const image = doc.createElement("img");
      image.crossOrigin = "anonymous";
      image.decoding = "async";
      const texture = new THREE.Texture(image);
      texture.colorSpace = THREE.NoColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = anisotropy;
      const picture: Picture = {
        image,
        texture,
        aspect: ASPECT,
        ready: false,
        uploaded: false,
        fade: 0,
        used: -1,
      };
      image.onload = () => {
        if (destroyed) return;
        const finish = () => {
          if (destroyed || picture.ready) return;
          picture.aspect = image.naturalWidth / Math.max(image.naturalHeight, 1);
          picture.ready = true;
          texture.needsUpdate = true;
          schedule();
        };
        image.decode().then(finish, finish);
      };
      image.src = portrait.src;
      return picture;
    });
    for (const card of cards) card.image = Math.floor(random() * pictures.length);
    openId = -1;
    openTarget = 0;
    openT = 0;
  };

  const updateCount = () => {
    const spanX = Math.max(0, Math.min(zone.right, width / 2) - Math.max(zone.left, -width / 2));
    const spanY = Math.max(0, Math.min(zone.bottom, height / 2) - Math.max(zone.top, -height / 2));
    const free = Math.max(width * height - spanX * spanY, 0);
    activeCount = clamp(Math.round(COUNT * Math.sqrt(free / COUNT_AREA)), MIN_COUNT, MAX_CARDS);
  };

  const measureCopy = () => {
    if (!width || !height) return false;
    let left = 0;
    let top = 0;
    let node: HTMLElement | null = copy;
    while (node && node !== root) {
      left += node.offsetLeft;
      top += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    if (node !== root) {
      const outer = root.getBoundingClientRect();
      const inner = copy.getBoundingClientRect();
      left = (inner.left - outer.left) * (outer.width > 0 ? width / outer.width : 1);
      top = (inner.top - outer.top) * (outer.height > 0 ? height / outer.height : 1);
    }
    const w = copy.offsetWidth;
    const h = copy.offsetHeight;
    const fallback = minSide() * 0.15;
    const next =
      w > 0 && h > 0
        ? {
            left: left - width / 2 - BLANK_PADDING,
            right: left + w - width / 2 + BLANK_PADDING,
            top: top - height / 2 - BLANK_PADDING,
            bottom: top + h - height / 2 + BLANK_PADDING,
          }
        : { left: -fallback, right: fallback, top: -fallback, bottom: fallback };
    if (
      Math.abs(next.left - zone.left) < 0.5 &&
      Math.abs(next.right - zone.right) < 0.5 &&
      Math.abs(next.top - zone.top) < 0.5 &&
      Math.abs(next.bottom - zone.bottom) < 0.5
    ) {
      return false;
    }
    zone.left = next.left;
    zone.right = next.right;
    zone.top = next.top;
    zone.bottom = next.bottom;
    updateCount();
    return true;
  };

  const readSize = () => {
    const nextWidth = Math.round(root.clientWidth);
    const nextHeight = Math.round(root.clientHeight);
    if (nextWidth < 2 || nextHeight < 2) {
      sized = false;
      return false;
    }
    const nextDpr = Math.min(view.devicePixelRatio || 1, 2);
    if (sized && nextWidth === width && nextHeight === height && nextDpr === dpr) return false;
    sized = true;
    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    resolution.set(width * dpr, height * dpr);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    measureCopy();
    updateCount();
    return true;
  };

  const sample = (value: string) => {
    if (!ink || !value) return null;
    ink.clearRect(0, 0, 1, 1);
    ink.fillStyle = "rgba(0, 0, 0, 0)";
    ink.fillStyle = value;
    ink.fillRect(0, 0, 1, 1);
    return ink.getImageData(0, 0, 1, 1).data;
  };

  const syncBackground = () => {
    let color: ReturnType<typeof sample> = null;
    let node: HTMLElement | null = root;
    while (node) {
      const found = sample(view.getComputedStyle(node).backgroundColor);
      if (found && found[3] > 0) {
        color = found;
        break;
      }
      node = node.parentElement;
    }
    let r = 255;
    let g = 255;
    let b = 255;
    if (color) {
      r = color[0];
      g = color[1];
      b = color[2];
    } else {
      const text = sample(view.getComputedStyle(root).color);
      if (text && text[0] + text[1] + text[2] > 382) {
        r = 10;
        g = 10;
        b = 10;
      }
    }
    const key = `${r},${g},${b}`;
    if (key === backgroundKey) return false;
    backgroundKey = key;
    background.setRGB(r / 255, g / 255, b / 255, THREE.NoColorSpace);
    return true;
  };

  const pickImage = () => {
    const n = pictures.length;
    if (!n) return 0;
    const onScreen = new Uint8Array(n);
    for (let i = 0; i < activeCount; i++) {
      const card = cards[i];
      if (card.shown && card.image < n) onScreen[card.image] += 1;
    }
    let best = 0;
    let score = Infinity;
    for (let k = 0; k < n; k++) {
      const picture = pictures[k];
      const candidate = onScreen[k] * 1000 + picture.used + random() * 0.5 + (picture.ready ? 0 : 500);
      if (candidate < score) {
        score = candidate;
        best = k;
      }
    }
    pictures[best].used = clock;
    return best;
  };

  const frameReach = (angle: number) => {
    const c = Math.abs(Math.cos(angle));
    const s = Math.abs(Math.sin(angle));
    return Math.min(c > 1e-4 ? width / 2 / c : Infinity, s > 1e-4 ? height / 2 / s : Infinity);
  };

  const exitRadius = (card: Card, angle: number) => {
    const R = halfDiagonal();
    const grow = SIZE * minSide() * card.scale * Math.hypot(ASPECT, 1) * 1.05;
    const room = R - grow;
    return room > R * 0.08 ? frameReach(angle) / room : 1.6;
  };

  const birthRadius = (scale: number, roll: number, angle: number) => {
    const k = (SIZE * minSide() * scale) / Math.max(halfDiagonal(), 1);
    const tilt = ((ROLL * Math.PI) / 180) * Math.abs(roll);
    const c = Math.cos(tilt);
    const s = Math.sin(tilt);
    const ex = k * (ASPECT * c + s);
    const ey = k * (ASPECT * s + c);
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    let radius = Infinity;
    if (ux - ex > 1e-3) radius = Math.min(radius, Math.max(zone.right, 0) / (ux - ex));
    if (ux + ex < -1e-3) radius = Math.min(radius, Math.min(zone.left, 0) / (ux + ex));
    if (uy - ey > 1e-3) radius = Math.min(radius, Math.max(zone.bottom, 0) / (uy - ey));
    if (uy + ey < -1e-3) radius = Math.min(radius, Math.min(zone.top, 0) / (uy + ey));
    return radius;
  };

  const typicalBlank = () => {
    let sum = 0;
    let n = 0;
    for (let k = 0; k < 4; k++) {
      const radius = birthRadius(1, 0, Math.PI / 4 + (k * Math.PI) / 2);
      if (Number.isFinite(radius)) {
        sum += radius;
        n += 1;
      }
    }
    return n ? clamp(sum / n / Math.max(halfDiagonal(), 1), 0.05, 0.9) : 0.3;
  };

  const pickAngle = (card: Card, w: number) => {
    let best = random() * TAU;
    let bestScore = -Infinity;
    for (let k = 0; k < 16; k++) {
      const angle = random() * TAU;
      const room = frameReach(angle) / Math.max(birthRadius(card.scale, card.roll, angle), 1);
      let nearest = TAU;
      for (let i = 0; i < activeCount; i++) {
        const other = cards[i];
        if (!other.shown) continue;
        const near = Math.abs(Math.log(Math.max(other.w, 1e-4) / Math.max(w, 1e-4)));
        if (near > 0.9) continue;
        const delta = Math.abs(
          Math.atan2(Math.sin(angle - other.theta - phi), Math.cos(angle - other.theta - phi)),
        );
        nearest = Math.min(nearest, delta + near * 0.9);
      }
      const score = room >= ROOM_MIN ? nearest : room - 2 * TAU;
      if (score > bestScore) {
        bestScore = score;
        best = angle;
      }
    }
    return best;
  };

  const respawn = (card: Card, inward: boolean, w = 1) => {
    card.scale = 1 + SIZE_VARIANCE * (random() * 2 - 1);
    card.roll = random() * 2 - 1;
    const angle = pickAngle(card, w);
    const R = Math.max(halfDiagonal(), 1);
    const birth = birthRadius(card.scale, card.roll, angle);
    const reach = frameReach(angle);
    const room = Number.isFinite(birth) ? reach / Math.max(birth, 1) : 0;
    const spread = Math.min(1 + random() * BIRTH_SPREAD, Math.max(1, room / ROOM_MIN));
    const start = Number.isFinite(birth) ? Math.max(birth * spread, R * 0.04) : reach * 1.2;
    card.theta = angle - phi;
    card.rho0 = start / R;
    card.dev = Math.max(
      card.rho0 * 1.12,
      Math.min(card.rho0 * 1.5, (start + DEVELOP_ROOM * Math.max(reach - start, 0)) / R),
    );
    card.image = pickImage();
    card.grip = 0;
    card.alpha = 0;
    if (inward) {
      const out = exitRadius(card, angle);
      card.w = clamp(card.rho0 / out, 1e-3, 0.999);
    } else {
      card.w = 1;
    }
  };

  const seedCard = (card: Card, fraction: number) => {
    const R = halfDiagonal();
    const typicalOut = (width + height) / 4 / Math.max(R * 0.9, 1);
    const typicalEnd = clamp((typicalBlank() * 1.22) / Math.max(typicalOut, 0.05), 0.05, 0.95);
    const lifeGuess = (1 - Math.pow(typicalEnd, RUSH)) / RUSH;
    card.shown = false;
    respawn(card, false, advance(1, lifeGuess * fraction));
    const out = exitRadius(card, card.theta + phi);
    const wEnd = clamp(card.rho0 / out, 1e-3, 1);
    const life = (1 - Math.pow(wEnd, RUSH)) / RUSH;
    card.w = advance(1, life * fraction);
    card.shown = true;
  };

  const seedStream = () => {
    const active = activeCount;
    for (let i = 0; i < MAX_CARDS; i++) cards[i].shown = false;
    for (let i = 0; i < active; i++) {
      const fraction = (i + random() * 0.85) / active;
      seedCard(cards[i], reduced ? 0.12 + fraction * 0.76 : fraction);
    }
    seeded = true;
  };

  const openCard = (id: number) => {
    openId = id;
    openTarget = 1;
    cards[id].grip = 1;
    events.onOpen(cards[id].image);
    schedule();
  };

  const openBest = () => {
    let id = -1;
    let score = -Infinity;
    for (let i = 0; i < activeCount; i++) {
      const card = cards[i];
      if (!card.shown || card.alpha < 0.3) continue;
      const value = card.sh - Math.hypot(card.x - width / 2, card.y - height / 2) * 0.2;
      if (value > score) {
        score = value;
        id = i;
      }
    }
    if (id >= 0) openCard(id);
  };

  const close = () => {
    if (openId < 0 || openTarget === 0) return;
    openTarget = 0;
    events.onClose();
    schedule();
  };

  const boost = (amount: number) => {
    pendingZoom += clamp(amount, -4, 4);
    schedule();
  };

  const uploadOne = () => {
    let best: Picture | null = null;
    let bestUse = Infinity;
    for (const card of cards) {
      if (!card.shown) continue;
      const picture = pictures[card.image];
      if (picture && picture.ready && !picture.uploaded && card.w < bestUse) {
        bestUse = card.w;
        best = picture;
      }
    }
    if (!best) {
      for (const picture of pictures) {
        if (picture.ready && !picture.uploaded) {
          best = picture;
          break;
        }
      }
    }
    if (!best) return false;
    renderer.initTexture(best.texture);
    best.uploaded = true;
    return true;
  };

  const focusRect = (card: Card) => {
    const picture = pictures[card.image];
    const aspect = picture ? picture.aspect : ASPECT;
    const room = Math.max(height - CAPTION_SPACE, height * 0.6);
    let fh = room * 0.74;
    if (fh * aspect > width * 0.86) fh = (width * 0.86) / aspect;
    return { x: width / 2, y: (height - CAPTION_SPACE) / 2 + 6, w: fh * aspect, h: fh, aspect };
  };

  const shield = (card: Card) => {
    const c = Math.abs(Math.cos(card.rot));
    const s = Math.abs(Math.sin(card.rot));
    const hx = (card.sw * c + card.sh * s) / 2;
    const hy = (card.sw * s + card.sh * c) / 2;
    const cx = card.x - width / 2;
    const cy = card.y - height / 2;
    const overlapX = Math.min(cx + hx, zone.right) - Math.max(cx - hx, zone.left);
    const overlapY = Math.min(cy + hy, zone.bottom) - Math.max(cy - hy, zone.top);
    return 1 - smooth(0, SHIELD_FADE, Math.min(overlapX, overlapY));
  };

  const paintCopy = (ease: number) => {
    const opacity = 1 - smooth(0.02, 0.5, ease);
    if (
      opacity !== copyOpacity &&
      (Math.abs(opacity - copyOpacity) > 0.002 || opacity === 0 || opacity === 1)
    ) {
      copyOpacity = opacity;
      copy.style.opacity = opacity >= 1 ? "" : opacity.toFixed(3);
      copy.style.visibility = opacity <= 0 ? "hidden" : "";
    }
    const blocking = openTarget > 0 ? "none" : "";
    if (copy.style.pointerEvents !== blocking) copy.style.pointerEvents = blocking;
  };

  function paintCaption(focus: Card | null, rect: ReturnType<typeof focusRect> | null, ease: number) {
    if (!focus || !rect) {
      if (captionOpacity !== 0) {
        captionOpacity = 0;
        caption.style.opacity = "0";
      }
      return;
    }
    if (focus.image !== shownCaption) {
      shownCaption = focus.image;
      const portrait = PORTRAITS[focus.image];
      title.textContent = portrait ? portrait.title : "";
      subtitle.textContent = portrait ? portrait.subtitle : "";
    }
    const top = rect.y + rect.h / 2 + 22;
    if (Number.isNaN(captionTop) || Math.abs(top - captionTop) > 0.25) {
      captionTop = top;
      caption.style.top = `${top.toFixed(2)}px`;
    }
    const opacity = smooth(0.55, 1, ease);
    if (Math.abs(opacity - captionOpacity) > 0.002) {
      captionOpacity = opacity;
      caption.style.opacity = opacity.toFixed(3);
      caption.style.transform = `translate3d(0, ${((1 - opacity) * 8).toFixed(2)}px, 0)`;
    }
  }

  const hitTest = (px: number, py: number) => {
    for (let k = order.length - 1; k >= 0; k--) {
      const card = order[k];
      if (!card.mesh.visible || card.alpha < 0.3 || card.reveal < 0.45) continue;
      const dx = px - card.x;
      const dy = py - card.y;
      const c = Math.cos(-card.rot);
      const s = Math.sin(-card.rot);
      const lx = dx * c - dy * s;
      const ly = dx * s + dy * c;
      const pad = card.grip * 6;
      if (Math.abs(lx) <= card.sw / 2 + pad && Math.abs(ly) <= card.sh / 2 + pad) return cards.indexOf(card);
    }
    return -1;
  };

  function refreshHover() {
    if (openTarget > 0) {
      hovered = -1;
      if (stage.style.cursor !== "pointer") stage.style.cursor = "pointer";
      return;
    }
    const next = hitTest(pointerX, pointerY);
    hovered = next;
    const cursor = next >= 0 ? "pointer" : "grab";
    if (stage.style.cursor !== cursor) stage.style.cursor = cursor;
  }

  function frame(time: number) {
    raf = 0;
    if (destroyed || lost) return;
    if (!sized) {
      readSize();
      if (!sized) return;
    }
    const dt = last && time - last < 100 ? Math.min(Math.max((time - last) / 1000, 0), 0.05) : 1 / 60;
    last = time;
    clock += dt;
    let busy = false;

    if (Math.floor(clock / 1.2) !== Math.floor((clock - dt) / 1.2)) syncBackground();
    readSize();
    if (!seeded) seedStream();
    if (uploadOne()) busy = true;
    for (const picture of pictures) {
      if (picture.uploaded && picture.fade < 1) {
        picture.fade = reduced ? 1 : Math.min(1, picture.fade + dt / 0.6);
        busy = true;
      }
    }

    const active = activeCount;
    for (let i = active; i < MAX_CARDS; i++) {
      if (cards[i].shown) {
        cards[i].shown = false;
        cards[i].mesh.visible = false;
      }
    }
    if (openId >= active) {
      openId = -1;
      openTarget = 0;
      openT = 0;
      openV = 0;
      events.onClose();
    }
    for (let i = 0; i < active; i++) {
      if (!cards[i].shown) seedCard(cards[i], reduced ? 0.12 + random() * 0.76 : random() * 0.3);
    }

    const target = pointerInside && !press ? 1 : 0;
    inside += (target - inside) * (1 - Math.exp(-dt / (target > inside ? 0.35 : 0.6)));
    const cruise = paused || reduced ? 0 : SPEED;
    const slow = 1 - HOVER_SLOW * inside;

    [openT, openV] = springTo(openT, openV, openTarget, dt, reduced ? 0.06 : 0.62, 0.88);
    if (Math.abs(openT - openTarget) > 1e-4 || Math.abs(openV) > 1e-4) busy = true;
    else {
      openT = openTarget;
      openV = 0;
      if (openTarget === 0 && openId >= 0) openId = -1;
    }
    const calm = 1 - 0.9 * openT;

    const zoomStep = pendingZoom * (1 - Math.exp(-dt / (reduced ? 0.04 : 0.18)));
    pendingZoom -= zoomStep;
    if (Math.abs(pendingZoom) < 1e-5) pendingZoom = 0;
    else busy = true;
    if (!press || !press.moved) {
      zoomVelocity *= Math.exp(-dt / (reduced ? 0.05 : 0.7));
      spinVelocity *= Math.exp(-dt / (reduced ? 0.05 : 1.1));
    }
    if (Math.abs(zoomVelocity) < 1e-4) zoomVelocity = 0;
    if (Math.abs(spinVelocity) < 1e-4) spinVelocity = 0;
    if (zoomVelocity || spinVelocity) busy = true;
    if (!press || !press.moved) phi += spinVelocity * dt;

    const flow = cruise * slow * calm;
    const extra = zoomStep + (press && press.moved ? 0 : zoomVelocity * dt);
    if (flow !== 0) busy = true;

    const R = halfDiagonal();
    const side = minSide();
    const baseSize = 2 * SIZE * side;
    const rollMax = (ROLL * Math.PI) / 180;
    const maxDim = Math.max(width, height);

    for (let i = 0; i < active; i++) {
      const card = cards[i];
      const pinned = i === openId;
      const gripTarget = pinned || i === hovered ? 1 : 0;
      card.grip += (gripTarget - card.grip) * (1 - Math.exp(-dt / (gripTarget > card.grip ? 0.16 : 0.5)));
      if (Math.abs(card.grip - gripTarget) < 1e-3) card.grip = gripTarget;
      else busy = true;
      if (!pinned) {
        const travel = flow * (1 - card.grip) * dt + extra * (1 - card.grip * 0.85);
        if (travel !== 0) card.w = advance(card.w, travel);
      }
      const rho = card.rho0 / card.w;
      const angle = card.theta + phi + SPIRAL * Math.log(Math.max(rho / card.rho0, 1e-4));
      const s = baseSize * rho * card.scale;
      card.sh = s;
      card.sw = s * ASPECT;
      card.x = width / 2 + Math.cos(angle) * rho * R;
      card.y = height / 2 + Math.sin(angle) * rho * R;
      card.rot = rollMax * card.roll;
      const out = exitRadius(card, angle);
      if (!pinned && rho > out && card.grip < 0.5) {
        respawn(card, false);
        continue;
      }
      if (!pinned && card.w > 1.0001) {
        respawn(card, true);
        continue;
      }
      const picture = pictures[card.image];
      const developing = reduced ? 1 : smooth(card.rho0, card.dev, rho);
      card.reveal = Math.max(developing, card.grip);
      const giant = 1 - smooth(maxDim * 0.7, maxDim * 1.05, card.sh);
      card.alpha = (picture ? picture.fade : 0) * giant * shield(card);
    }

    order = cards.slice(0, active).sort((a, b) => b.w - a.w);
    if (pointerInside && !press) refreshHover();

    const focus = openId >= 0 ? cards[openId] : null;
    const rect = focus ? focusRect(focus) : null;
    const ease = openT;
    const edgePx = EDGE_FADE * side * 0.22 * dpr;

    for (let k = 0; k < order.length; k++) {
      const card = order[k];
      const mesh = card.mesh;
      const isFocus = card === focus;
      let x = card.x;
      let y = card.y;
      let w = card.sw;
      let h = card.sh;
      let rot = card.rot;
      let alpha = card.alpha * (isFocus ? 1 : 1 - 0.72 * ease);
      let reveal = card.reveal;
      let lift = card.grip;
      let radius = RADIUS * Math.min(1, card.sh / Math.max(baseSize * 0.5, 1));
      let imageAspect = pictures[card.image]?.aspect ?? ASPECT;
      if (isFocus && rect) {
        x += (rect.x - x) * ease;
        y += (rect.y - y) * ease;
        w += (rect.w - w) * ease;
        h += (rect.h - h) * ease;
        rot *= 1 - ease;
        alpha = Math.max(alpha, ease);
        reveal = 1;
        lift = 1;
        radius += (Math.max(RADIUS, 10) - radius) * ease;
        imageAspect = rect.aspect;
      }
      const visibleCard = alpha > 0.003 && w > 0.5;
      mesh.visible = visibleCard;
      if (!visibleCard) continue;
      const scale = 1 + 0.05 * card.grip * (1 - (isFocus ? ease : 0));
      w *= scale;
      h *= scale;
      const margin = Math.max(8, h * 0.22);
      mesh.position.set(x - width / 2, height / 2 - y, 0);
      mesh.rotation.set(0, 0, -rot);
      mesh.scale.set(w + 2 * margin, h + 2 * margin, 1);
      mesh.renderOrder = isFocus ? 10000 : k;
      const u = mesh.material.uniforms;
      const picture = pictures[card.image];
      u.uImage.value = picture?.uploaded ? picture.texture : empty;
      u.uImageAspect.value = imageAspect;
      u.uSize.value.set(w, h);
      u.uMargin.value = margin;
      u.uRadius.value = radius;
      u.uBorder.value = BORDER * Math.min(w, h);
      u.uRim.value = RIM * (0.6 + 0.4 * lift);
      u.uReveal.value = reveal;
      u.uDevelop.value = DEVELOP;
      u.uAlpha.value = alpha;
      u.uShadow.value = SHADOW;
      u.uLift.value = lift;
      u.uEdge.value = isFocus ? edgePx * (1 - ease) : edgePx;
    }

    paintCaption(focus, rect, ease);
    paintCopy(ease);
    renderer.render(scene, camera);

    if (busy || press || flow !== 0) schedule();
  }

  const local = (event: PointerEvent | MouseEvent) => {
    const box = root.getBoundingClientRect();
    const sx = box.width > 0 ? root.clientWidth / box.width : 1;
    const sy = box.height > 0 ? root.clientHeight / box.height : 1;
    return { x: (event.clientX - box.left) * sx, y: (event.clientY - box.top) * sy };
  };

  const fromCopy = (event: Event) => {
    const node = event.target as Node | null;
    return node !== null && copy.contains(node);
  };

  const capture = (id: number, on: boolean) => {
    try {
      if (on) stage.setPointerCapture(id);
      else if (stage.hasPointerCapture(id)) stage.releasePointerCapture(id);
    } catch {
      return;
    }
  };

  const onMove = (event: PointerEvent) => {
    const point = local(event);
    if (event.pointerType !== "touch") {
      pointerInside = true;
      pointerX = point.x;
      pointerY = point.y;
    }
    if (press && press.id === event.pointerId) {
      const dx = point.x - width / 2;
      const dy = point.y - height / 2;
      const radius = Math.max(Math.hypot(dx, dy), minSide() * 0.08);
      const angle = Math.atan2(dy, dx);
      if (!press.moved && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 6) {
        press.moved = true;
        hovered = -1;
        stage.style.cursor = "grabbing";
        zoomVelocity = 0;
        spinVelocity = 0;
        capture(event.pointerId, true);
      }
      if (press.moved) {
        const zoom = clamp(Math.log(radius / press.radius), -0.3, 0.3);
        const turn = Math.atan2(Math.sin(angle - press.angle), Math.cos(angle - press.angle));
        for (let i = 0; i < activeCount; i++) {
          if (i === openId) continue;
          cards[i].w = advance(cards[i].w, zoom);
        }
        phi += turn;
        press.radius = radius;
        press.angle = angle;
        const t = view.performance.now();
        press.samples.push({ t, zoom, angle: turn });
        while (press.samples.length > 2 && t - press.samples[0].t > 110) press.samples.shift();
      }
    }
    schedule();
  };

  const onDown = (event: PointerEvent) => {
    if (!event.isPrimary || event.button > 0) return;
    consumed = false;
    if (fromCopy(event)) return;
    const point = local(event);
    const dx = point.x - width / 2;
    const dy = point.y - height / 2;
    press = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
      radius: Math.max(Math.hypot(dx, dy), minSide() * 0.08),
      angle: Math.atan2(dy, dx),
      samples: [],
    };
    schedule();
  };

  const finish = (event: PointerEvent) => {
    if (!press || press.id !== event.pointerId) return;
    const ended = press;
    press = null;
    capture(event.pointerId, false);
    if (ended.moved) {
      consumed = true;
      const t = view.performance.now();
      const recent = ended.samples.filter((item) => t - item.t < 110);
      if (recent.length && t - recent[recent.length - 1].t < 60 && !reduced) {
        const span = Math.max((t - recent[0].t) / 1000, 1 / 60);
        const zoom = recent.reduce((sum, item) => sum + item.zoom, 0);
        const turn = recent.reduce((sum, item) => sum + item.angle, 0);
        zoomVelocity = clamp(zoom / span, -3, 3);
        spinVelocity = clamp(turn / span, -4, 4);
      }
      stage.style.cursor = "grab";
    }
    schedule();
  };

  const onClick = (event: MouseEvent) => {
    if (fromCopy(event)) return;
    if (consumed) {
      consumed = false;
      return;
    }
    if (openTarget > 0) {
      close();
      return;
    }
    const point = local(event);
    const hit = hitTest(point.x, point.y);
    if (hit >= 0) openCard(hit);
  };

  const onLeave = (event: PointerEvent) => {
    if (press && press.id === event.pointerId) return;
    pointerInside = false;
    hovered = -1;
    stage.style.cursor = "";
    schedule();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.target !== stage) return;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      boost(0.32);
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      boost(-0.32);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (openTarget > 0) close();
      else openBest();
    } else if (event.key === "Escape" && openTarget > 0) {
      event.preventDefault();
      close();
    } else if (event.key === " ") {
      event.preventDefault();
      paused = !paused;
      last = 0;
      schedule();
    }
  };

  root.addEventListener("pointerdown", onDown);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerup", finish);
  root.addEventListener("pointercancel", finish);
  root.addEventListener("pointerleave", onLeave);
  root.addEventListener("click", onClick);
  stage.addEventListener("keydown", onKey);

  const resizer = new view.ResizeObserver(() => {
    const resized = readSize();
    const moved = measureCopy();
    if (resized || moved) schedule();
  });
  resizer.observe(root);
  resizer.observe(copy);

  const intersection = new view.IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = 0;
        schedule();
      } else if (raf) {
        view.cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { rootMargin: "80px" },
  );
  intersection.observe(root);

  const refreshTheme = () => {
    if (syncBackground()) schedule();
  };
  const themes = new view.MutationObserver(refreshTheme);
  themes.observe(doc.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style", "data-theme"],
  });
  schemeQuery.addEventListener("change", refreshTheme);

  const onMotion = () => {
    reduced = motionQuery.matches;
    last = 0;
    schedule();
  };
  motionQuery.addEventListener("change", onMotion);

  const onFonts = () => {
    if (!destroyed && measureCopy()) schedule();
  };
  doc.fonts?.addEventListener("loadingdone", onFonts);
  doc.fonts?.ready.then(onFonts, () => undefined);

  const onLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    if (raf) view.cancelAnimationFrame(raf);
    raf = 0;
  };
  const onRestored = () => {
    lost = false;
    loadPictures();
    schedule();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  readSize();
  measureCopy();
  syncBackground();
  cards[0].mesh.visible = true;
  renderer.compile(scene, camera);
  cards[0].mesh.visible = false;
  loadPictures();
  schedule();

  return () => {
    destroyed = true;
    if (raf) view.cancelAnimationFrame(raf);
    raf = 0;
    intersection.disconnect();
    resizer.disconnect();
    themes.disconnect();
    schemeQuery.removeEventListener("change", refreshTheme);
    motionQuery.removeEventListener("change", onMotion);
    doc.fonts?.removeEventListener("loadingdone", onFonts);
    root.removeEventListener("pointerdown", onDown);
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerup", finish);
    root.removeEventListener("pointercancel", finish);
    root.removeEventListener("pointerleave", onLeave);
    root.removeEventListener("click", onClick);
    stage.removeEventListener("keydown", onKey);
    stage.style.cursor = "";
    copy.style.opacity = "";
    copy.style.visibility = "";
    copy.style.pointerEvents = "";
    caption.style.opacity = "0";
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    pictures.forEach((picture) => {
      picture.image.onload = null;
      picture.texture.dispose();
    });
    cards.forEach((card) => card.mesh.material.dispose());
    empty.dispose();
    plane.dispose();
    renderer.dispose();
    if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
    canvas.remove();
  };
}

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function About14() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const [opened, setOpened] = useState(-1);

  useEffect(() => {
    const root = sectionRef.current;
    const stage = stageRef.current;
    const copy = copyRef.current;
    const caption = captionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!root || !stage || !copy || !caption || !title || !subtitle) return;
    const destroy = createStream(
      { root, stage, copy, caption, title, subtitle },
      { onOpen: setOpened, onClose: () => setOpened(-1) },
    );
    return () => destroy?.();
  }, []);

  const portrait = opened >= 0 ? PORTRAITS[opened] : null;

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[44rem] w-full overflow-hidden bg-[#F4F1EA] text-[#1A1712] lg:h-[52rem]"
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1280px] justify-center">
          <div ref={copyRef} className="pointer-events-auto w-full max-w-[34rem] text-center">
            <motion.div
              variants={sequence}
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                variants={rise}
                className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#1A1712] [text-shadow:0_0_24px_#F4F1EA,0_0_10px_#F4F1EA]"
              >
                About
              </motion.p>
              <motion.h2
                variants={rise}
                className="mt-6 text-balance font-[family-name:var(--font-display-family)] text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#1A1712] [text-shadow:0_0_28px_#F4F1EA,0_0_12px_#F4F1EA]"
              >
                Modern Mediterranean, made for the evening.
              </motion.h2>
              <motion.p
                variants={rise}
                className="mx-auto mt-5 max-w-[36ch] text-pretty text-base leading-relaxed text-[#5A5348] [text-shadow:0_0_24px_#F4F1EA,0_0_10px_#F4F1EA] sm:text-lg"
              >
                Shared plates, charcoal heat, and a room that invites the night
                to linger — chic Atlanta hospitality with a coastal instinct.
              </motion.p>
              <motion.a
                variants={rise}
                href="/reservations"
                className="mt-10 inline-flex items-center border border-[#1A1712] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[#1A1712] transition-colors duration-500 hover:bg-[#1A1712] hover:text-[#FBF9F4]"
              >
                Reserve a table
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="gallery"
        aria-label="Knife photography stream. Click a print or press Enter to open it."
        tabIndex={0}
        className="absolute inset-0 touch-pan-y touch-pinch-zoom select-none [-webkit-touch-callout:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1A1712]"
      >
        <ul className="sr-only">
          {PORTRAITS.map((item) => (
            <li key={item.src}>{`${item.title}, ${item.subtitle}. ${item.alt}`}</li>
          ))}
        </ul>
      </div>
      <div
        ref={captionRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-1 px-4 text-center opacity-0 will-change-[transform,opacity]"
      >
        <span ref={titleRef} className="max-w-full truncate font-[family-name:var(--font-display-family)] text-xl font-normal leading-tight tracking-[-0.01em]" />
        <span ref={subtitleRef} className="max-w-full truncate text-[12px] uppercase tracking-[0.12em] text-[#5A5348]" />
      </div>
      <div aria-live="polite" className="sr-only">
        {portrait ? `Opened ${portrait.title}, ${portrait.subtitle}` : ""}
      </div>
    </section>
  );
}

export default About14;
