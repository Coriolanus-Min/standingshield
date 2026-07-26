"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Layers, Pause, Play, RefreshCw, RotateCw } from "lucide-react";

interface Tumbler3DProps {
  colorHex: string;
  colorName: string;
  heightCm: number;
  diameterCm: number;
  heightLabel: string;
  diameterLabel: string;
  capacityLabel: string;
  weightLabel: string;
  engravingText?: string;
  showDimensions?: boolean;
}

// Reference proportions (30oz model) — other sizes scale relative to this
const REF_HEIGHT = 21.5;
const REF_DIAMETER = 8.5;

// Camera dolly: fixed direction from look-at target, distance drives zoom
const CAM_TARGET = new THREE.Vector3(0, 0.5, 0);
const CAM_DIR = new THREE.Vector3(0, 0.124, 0.992).normalize();
const BASE_DIST = 4.45;
const MIN_DIST = 3.1;
const MAX_DIST = 6.3;

function makeBodyTexture(hex: string, engraving?: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Matte powder-coat base with subtle vertical sheen
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  const base = new THREE.Color(hex);
  const light = base.clone().lerp(new THREE.Color("#ffffff"), 0.09);
  const dark = base.clone().lerp(new THREE.Color("#000000"), 0.26);
  const stops: [number, THREE.Color][] = [
    [0, dark],
    [0.18, base],
    [0.38, light],
    [0.55, base],
    [0.8, dark],
    [1, dark],
  ];
  stops.forEach(([o, c]) => grad.addColorStop(o, `#${c.getHexString()}`));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fine noise for the powder-coat grain
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Brand wordmark engraved on one side (texture u=0.5 faces camera at start)
  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.42;
  const lum = 0.299 * base.r + 0.587 * base.g + 0.114 * base.b;
  const fg = lum > 0.45 ? "rgba(20,20,20,0.85)" : "rgba(235,235,235,0.9)";
  ctx.fillStyle = fg;
  ctx.textAlign = "center";

  // Minimal camel-rider mark (triangle-hump glyph)
  ctx.save();
  ctx.translate(cx, cy - 70);
  ctx.beginPath();
  ctx.moveTo(-46, 26);
  ctx.quadraticCurveTo(-30, 2, -14, 10); // neck up
  ctx.lineTo(-10, -8); // head
  ctx.lineTo(-2, 6);
  ctx.quadraticCurveTo(8, -26, 22, -6); // hump
  ctx.quadraticCurveTo(34, 4, 42, 26); // rear
  ctx.lineTo(30, 26);
  ctx.lineTo(26, 10);
  ctx.lineTo(12, 12);
  ctx.lineTo(8, 26);
  ctx.lineTo(-4, 26);
  ctx.lineTo(-8, 12);
  ctx.lineTo(-24, 14);
  ctx.lineTo(-28, 26);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.font = "600 44px Georgia, serif";
  ctx.fillText("STANDING", cx, cy + 8);
  ctx.font = "300 30px Georgia, serif";
  ctx.fillText("s h i e l d", cx, cy + 48);

  // Optional live custom engraving below the wordmark
  const custom = engraving?.trim().toUpperCase().slice(0, 18);
  if (custom) {
    const etchCtx = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    etchCtx.letterSpacing = "8px";
    ctx.font = "600 34px 'Courier New', monospace";
    // Divider rule
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = fg;
    ctx.fillRect(cx - 70, cy + 78, 140, 1);
    ctx.globalAlpha = 1;
    // Inset shadow pass, then main pass, for an etched look
    ctx.fillStyle = lum > 0.45 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.55)";
    ctx.fillText(custom, cx, cy + 118 + 1.5);
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.85;
    ctx.fillText(custom, cx, cy + 118);
    ctx.globalAlpha = 1;
    etchCtx.letterSpacing = "0px";
  }

  // Capacity etching near the base
  ctx.font = "500 22px Arial, sans-serif";
  ctx.globalAlpha = 0.6;
  ctx.fillText("316L · DOUBLE-WALL VACUUM", cx, canvas.height * 0.86);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Soft radial contact shadow, replaces a hard-edged flat disc
function makeContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.75)");
  g.addColorStop(0.45, "rgba(0,0,0,0.4)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

export default function Tumbler3D({
  colorHex,
  colorName,
  heightCm,
  diameterCm,
  heightLabel,
  diameterLabel,
  capacityLabel,
  weightLabel,
  engravingText = "",
  showDimensions = true,
}: Tumbler3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const innerWallRef = useRef<THREE.Mesh | null>(null);
  const clipPlaneRef = useRef<THREE.Plane | null>(null);

  // Mutable interaction state read by the animation loop
  const viewRef = useRef({
    vel: 0.004,
    tilt: 0.08,
    tiltTarget: 0.08,
    dist: BASE_DIST,
    distTarget: BASE_DIST,
  });
  const autoRotateRef = useRef(true);

  const [autoRotate, setAutoRotate] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [cutaway, setCutaway] = useState(false);
  const [webglOk] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Cutaway toggle: slide the shared section plane in/out (no shader recompile)
  useEffect(() => {
    if (clipPlaneRef.current) clipPlaneRef.current.constant = cutaway ? 0.02 : 100;
    if (innerWallRef.current) innerWallRef.current.visible = cutaway;
  }, [cutaway]);

  // Build scene once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webglOk) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.localClippingEnabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.copy(CAM_TARGET).addScaledVector(CAM_DIR, BASE_DIST);
    camera.lookAt(CAM_TARGET);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";

    // Image-based lighting so the steel and powder coat pick up real reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Studio rig on top of the IBL: brand-orange rim, soft key
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 3.5, 2.5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff8c3b, 0.9);
    rim.position.set(-3, 1.5, -2.5);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 3.5, 12);
    fill.position.set(0.5, 1.0, 3.2);
    scene.add(fill);

    const group = new THREE.Group();
    groupRef.current = group;
    // Lathe UV u=0.5 (the wordmark) sits at -z; flip the group so it faces the camera
    group.rotation.y = Math.PI;
    scene.add(group);

    // World-space section plane shared by every cup material. Normal faces away
    // from the camera so the cutaway removes the near half and reveals the walls.
    // constant=100 keeps everything visible; the cutaway toggle pulls it to ~0.
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 100);
    clipPlaneRef.current = clipPlane;

    // Body — tapered lathe profile (unit height = 1)
    const bodyPts: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 0.03),
      new THREE.Vector2(0.26, 0.03),
      new THREE.Vector2(0.3, 0.045),
      new THREE.Vector2(0.315, 0.09),
      new THREE.Vector2(0.325, 0.2),
      new THREE.Vector2(0.35, 0.55),
      new THREE.Vector2(0.372, 0.8),
      new THREE.Vector2(0.375, 0.875),
      new THREE.Vector2(0.365, 0.885),
    ];
    const bodyMat = new THREE.MeshStandardMaterial({
      map: makeBodyTexture(colorHex, engravingText),
      roughness: 0.55,
      metalness: 0.25,
      envMapIntensity: 0.55,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    bodyMatRef.current = bodyMat;
    group.add(new THREE.Mesh(new THREE.LatheGeometry(bodyPts, 96), bodyMat));

    // Lid — low-dome screw cap, dark tritan
    const lidPts: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 0.878),
      new THREE.Vector2(0.36, 0.878),
      new THREE.Vector2(0.375, 0.9),
      new THREE.Vector2(0.375, 0.94),
      new THREE.Vector2(0.35, 0.975),
      new THREE.Vector2(0.22, 0.995),
      new THREE.Vector2(0.001, 1.0),
    ];
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.35,
      metalness: 0.4,
      envMapIntensity: 1.0,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    group.add(new THREE.Mesh(new THREE.LatheGeometry(lidPts, 96), lidMat));

    // Steel rim accent between body and lid
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8c8,
      roughness: 0.2,
      metalness: 0.95,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    const rimRing = new THREE.Mesh(new THREE.CylinderGeometry(0.368, 0.368, 0.018, 96, 1, true), rimMat);
    rimRing.position.y = 0.882;
    group.add(rimRing);

    // Anti-slip silicone base
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x101010,
      roughness: 0.9,
      metalness: 0.05,
      envMapIntensity: 0.4,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(0.322, 0.312, 0.07, 96), baseMat);
    baseRing.position.y = 0.045;
    group.add(baseRing);

    // 316L inner vessel — only revealed by the cutaway
    const innerPts: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 0.12),
      new THREE.Vector2(0.22, 0.12),
      new THREE.Vector2(0.26, 0.145),
      new THREE.Vector2(0.285, 0.28),
      new THREE.Vector2(0.305, 0.55),
      new THREE.Vector2(0.328, 0.82),
      new THREE.Vector2(0.335, 0.868),
    ];
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xb8bec4,
      roughness: 0.25,
      metalness: 0.95,
      envMapIntensity: 1.2,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
    });
    const innerWall = new THREE.Mesh(new THREE.LatheGeometry(innerPts, 96), innerMat);
    innerWall.visible = false;
    innerWallRef.current = innerWall;
    group.add(innerWall);

    // Ground: soft contact shadow + orange under-glow
    const shadowTex = makeContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.001;
    shadow.renderOrder = 1;
    scene.add(shadow);

    const glowMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.06, depthWrite: false });
    const glow = new THREE.Mesh(new THREE.CircleGeometry(1.15, 64), glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.0005;
    glow.renderOrder = 0;
    scene.add(glow);

    // Sizing per product
    group.scale.set(diameterCm / REF_DIAMETER, heightCm / REF_HEIGHT, diameterCm / REF_DIAMETER);

    // Interaction: drag to rotate + tilt, wheel/pinch to zoom, dblclick reset
    const view = viewRef.current;
    const pointers = new Map<number, { x: number; y: number }>();
    let dragging = false;
    let pinchStartSpan = 0;
    let pinchStartDist = view.distTarget;
    let lastX = 0;
    let lastY = 0;

    const pointerSpan = () => {
      const [a, b] = [...pointers.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };

    const onPointerDown = (e: PointerEvent) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      renderer.domElement.setPointerCapture(e.pointerId);
      if (pointers.size === 1) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        renderer.domElement.style.cursor = "grabbing";
      } else if (pointers.size === 2) {
        dragging = false;
        pinchStartSpan = pointerSpan();
        pinchStartDist = view.distTarget;
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && pinchStartSpan > 0) {
        view.distTarget = THREE.MathUtils.clamp(
          (pinchStartDist * pinchStartSpan) / pointerSpan(),
          MIN_DIST,
          MAX_DIST
        );
        return;
      }
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      group.rotation.y += dx * 0.008;
      view.vel = dx * 0.008;
      view.tiltTarget = THREE.MathUtils.clamp(view.tiltTarget + dy * 0.004, -0.35, 0.55);
    };
    const onPointerUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchStartSpan = 0;
      if (pointers.size === 0) {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
      } else if (pointers.size === 1) {
        const p = [...pointers.values()][0];
        dragging = true;
        lastX = p.x;
        lastY = p.y;
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      view.distTarget = THREE.MathUtils.clamp(view.distTarget + e.deltaY * 0.0016, MIN_DIST, MAX_DIST);
    };
    const onDblClick = () => {
      view.distTarget = BASE_DIST;
      view.tiltTarget = 0.08;
      group.rotation.y = Math.PI;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("dblclick", onDblClick);

    // Resize
    const resize = () => {
      const w = Math.max(320, mount.clientWidth || mount.parentElement?.clientWidth || 320);
      const h = Math.max(320, mount.clientHeight || mount.parentElement?.clientHeight || 320);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    requestAnimationFrame(resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!dragging) {
        if (autoRotateRef.current) {
          view.vel += (0.004 - view.vel) * 0.03;
          view.tiltTarget += (0.08 - view.tiltTarget) * 0.01;
        } else {
          view.vel *= 0.94;
        }
        group.rotation.y += view.vel;
      }
      view.tilt += (view.tiltTarget - view.tilt) * 0.08;
      group.rotation.x = view.tilt;
      view.dist += (view.distTarget - view.dist) * 0.12;
      camera.position.copy(CAM_TARGET).addScaledVector(CAM_DIR, view.dist);
      camera.lookAt(CAM_TARGET);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("dblclick", onDblClick);
      mount.removeChild(renderer.domElement);
      bodyMat.map?.dispose();
      bodyMat.dispose();
      lidMat.dispose();
      rimMat.dispose();
      baseMat.dispose();
      innerMat.dispose();
      shadowTex.dispose();
      shadowMat.dispose();
      glowMat.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      bodyMatRef.current = null;
      groupRef.current = null;
      innerWallRef.current = null;
      clipPlaneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recolor / re-engrave on prop change (debounced for live typing)
  useEffect(() => {
    const mat = bodyMatRef.current;
    if (!mat) return;
    const t = setTimeout(() => {
      mat.map?.dispose();
      mat.map = makeBodyTexture(colorHex, engravingText);
      mat.needsUpdate = true;
    }, 160);
    return () => clearTimeout(t);
  }, [colorHex, engravingText]);

  // Rescale on size change
  useEffect(() => {
    groupRef.current?.scale.set(diameterCm / REF_DIAMETER, heightCm / REF_HEIGHT, diameterCm / REF_DIAMETER);
  }, [heightCm, diameterCm]);

  const resetView = () => {
    const view = viewRef.current;
    view.distTarget = BASE_DIST;
    view.tiltTarget = 0.08;
    if (groupRef.current) groupRef.current.rotation.y = Math.PI;
  };

  if (!webglOk) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        3D view requires WebGL support.
      </div>
    );
  }

  const controlBtn =
    "w-9 h-9 rounded-full border bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors";

  return (
    <div className="relative w-full h-full select-none">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Dimension callouts (HTML overlay) */}
      {showDimensions && (
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {/* Height — right side vertical */}
          <div className="absolute right-2 top-[18%] bottom-[16%] flex items-center gap-2">
            <div className="flex flex-col items-center h-full">
              <div className="w-2 h-px bg-orange-500" />
              <div className="w-px flex-1 bg-orange-500/60" />
              <div className="w-2 h-px bg-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Height</span>
              <span className="text-xs font-mono text-orange-500">{heightLabel}</span>
            </div>
          </div>
          {/* Diameter — bottom horizontal */}
          <div className="absolute left-[24%] right-[24%] bottom-[7%] flex flex-col items-center gap-1">
            <div className="flex items-center w-full">
              <div className="h-2 w-px bg-orange-500" />
              <div className="h-px flex-1 bg-orange-500/60" />
              <div className="h-2 w-px bg-orange-500" />
            </div>
            <span className="text-xs font-mono text-orange-500">⌀ {diameterLabel}</span>
          </div>
          {/* Capacity chip — top left */}
          <div className="absolute left-3 top-3 border border-white/10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="block text-[9px] uppercase tracking-widest text-gray-500">Capacity</span>
            <span className="text-xs font-mono text-white">{capacityLabel}</span>
          </div>
          {/* Weight chip — bottom left */}
          <div className="absolute left-3 bottom-3 border border-white/10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="block text-[9px] uppercase tracking-widest text-gray-500">Weight</span>
            <span className="text-xs font-mono text-white">{weightLabel}</span>
          </div>
        </div>
      )}

      {/* Cutaway annotations */}
      {cutaway && (
        <div className="absolute left-3 top-[36%] hidden sm:flex flex-col gap-2 pointer-events-none">
          {["Powder-Coated Shell", "0.001 Pa Vacuum Gap", "316L Inner Vessel"].map((label) => (
            <span
              key={label}
              className="flex items-center gap-2 border border-orange-500/20 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-gray-300">{label}</span>
            </span>
          ))}
        </div>
      )}

      {/* Viewer controls */}
      <div
        className={`absolute z-10 flex gap-2 ${
          showDimensions ? "top-3 right-3 flex-row" : "bottom-3 right-3 flex-col"
        }`}
      >
        <button
          onClick={() => setAutoRotate((v) => !v)}
          aria-pressed={autoRotate}
          title={autoRotate ? "Pause rotation" : "Auto-rotate"}
          className={`${controlBtn} ${
            autoRotate
              ? "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              : "border-orange-500/50 text-orange-500"
          }`}
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setCutaway((v) => !v)}
          aria-pressed={cutaway}
          title={cutaway ? "Exit cutaway view" : "Cutaway view — see the double wall"}
          className={`${controlBtn} ${
            cutaway
              ? "border-orange-500/50 text-orange-500"
              : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          title="Reset view"
          className={`${controlBtn} border-white/10 text-gray-400 hover:text-white hover:border-white/30`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Hint + current color */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.25em] pointer-events-none whitespace-nowrap">
        <RotateCw className="w-3 h-3 text-orange-500 flex-shrink-0" />
        <span className="hidden sm:inline">Drag to rotate · Scroll to zoom — {colorName}</span>
        <span className="sm:hidden">Drag · Pinch to zoom</span>
      </div>
    </div>
  );
}
