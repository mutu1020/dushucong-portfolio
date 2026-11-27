"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type GalleryPanel = {
  id: string;
  title: string;
  href: string;
  image: string;
  external?: boolean;
  metric?: { value: string; label: string };
};

const VERT = `
attribute vec3 aPos;
attribute vec2 aUv;
uniform mat4 uMvp;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = uMvp * vec4(aPos, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform float uAlpha;
uniform float uMirror;
varying vec2 vUv;
void main() {
  vec4 color = texture2D(uTex, vUv);
  float fade = uMirror > 0.5 ? pow(vUv.y, 1.35) : 1.0;
  gl_FragColor = vec4(color.rgb, color.a * uAlpha * fade);
}
`;

function multiply(a: Float32Array, b: Float32Array) {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      out[col * 4 + row] =
        a[row] * b[col * 4] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3];
    }
  }
  return out;
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

function modelMatrix(x: number, y: number, z: number, rotY: number, w: number, h: number) {
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  const m = new Float32Array(16);
  m[0] = c * w;
  m[1] = 0;
  m[2] = -s * w;
  m[5] = h;
  m[8] = s;
  m[10] = c;
  m[12] = x;
  m[13] = y;
  m[14] = z;
  m[15] = 1;
  return m;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ScurveGallery({ panels }: { panels: GalleryPanel[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);
  const [focus, setFocus] = useState(0);
  const [open, setOpen] = useState<GalleryPanel | null>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || panels.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "aPos");
    gl.bindAttribLocation(program, 1, "aUv");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }

    const quad = new Float32Array([
      -0.5, -0.5, 0, 0, 0,
      0.5, -0.5, 0, 1, 0,
      -0.5, 0.5, 0, 0, 1,
      0.5, -0.5, 0, 1, 0,
      0.5, 0.5, 0, 1, 1,
      -0.5, 0.5, 0, 0, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const textures = panels.map(() => gl.createTexture());
    const ready = panels.map(() => false);
    panels.forEach((panel, index) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const texture = textures[index];
        if (!texture) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        ready[index] = true;
      };
      image.src = panel.image;
    });

    let offset = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let frame = 0;
    const focusRef = { current: 0 };
    const hits: { index: number; points: { x: number; y: number }[]; depth: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);
      const mvpLoc = gl.getUniformLocation(program, "uMvp");
      const alphaLoc = gl.getUniformLocation(program, "uAlpha");
      const mirrorLoc = gl.getUniformLocation(program, "uMirror");
      const aspect = width / height;
      const proj = perspective(0.78, aspect, 0.1, 40);
      const view = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, -0.35, -5.1, 1,
      ]);
      const vp = multiply(proj, view);
      hits.length = 0;
      const count = panels.length;
      const order = panels.map((_, index) => {
        let delta = index - (((offset % count) + count) % count);
        if (delta > count / 2) delta -= count;
        if (delta < -count / 2) delta += count;
        return { index, delta };
      }).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

      for (const item of order) {
        if (!ready[item.index]) continue;
        const wave = item.delta * 0.78;
        const x = item.delta * 1.72;
        const z = Math.sin(wave) * 1.15;
        const rot = -Math.cos(wave) * 0.72;
        const panel = modelMatrix(x, 0.42, z, rot, 1.62, 1.02);
        const reflection = modelMatrix(x, -0.72, z, rot, 1.62, 1.02);
        const texture = textures[item.index];
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1f(mirrorLoc, 1);
        gl.uniform1f(alphaLoc, 0.55);
        gl.uniformMatrix4fv(mvpLoc, false, multiply(vp, reflection));
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.uniform1f(mirrorLoc, 0);
        gl.uniform1f(alphaLoc, 1);
        const mvp = multiply(vp, panel);
        gl.uniformMatrix4fv(mvpLoc, false, mvp);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        const corners = [
          [-0.81, -0.51, 0],
          [0.81, -0.51, 0],
          [0.81, 0.51, 0],
          [-0.81, 0.51, 0],
        ].map(([px, py, pz]) => {
          const clip = [
            mvp[0] * px + mvp[4] * py + mvp[8] * pz + mvp[12],
            mvp[1] * px + mvp[5] * py + mvp[9] * pz + mvp[13],
            mvp[2] * px + mvp[6] * py + mvp[10] * pz + mvp[14],
            mvp[3] * px + mvp[7] * py + mvp[11] * pz + mvp[15],
          ];
          const w = clip[3] || 1;
          const rect = canvas.getBoundingClientRect();
          return {
            x: rect.left + ((clip[0] / w) * 0.5 + 0.5) * rect.width,
            y: rect.top + (1 - ((clip[1] / w) * 0.5 + 0.5)) * rect.height,
          };
        });
        hits.push({ index: item.index, points: corners, depth: z });
      }
      const nearest = ((offset % count) + count) % count;
      const rounded = ((Math.round(nearest) % count) + count) % count;
      if (focusRef.current !== rounded) {
        focusRef.current = rounded;
        setFocus(rounded);
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      moved += Math.abs(dx);
      offset -= dx / 220;
      lastX = event.clientX;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onWheel = (event: WheelEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const mid = bounds.top + bounds.height / 2;
      if (Math.abs(mid - window.innerHeight / 2) > window.innerHeight * 0.35 && Math.abs(event.deltaX) < 6) return;
      event.preventDefault();
      offset += (event.deltaY + event.deltaX) / 700;
    };
    const inside = (x: number, y: number, points: { x: number; y: number }[]) => {
      let hit = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const a = points[i];
        const b = points[j];
        if ((a.y > y) !== (b.y > y) && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y + 0.0001) + a.x) hit = !hit;
      }
      return hit;
    };
    const onClick = (event: MouseEvent) => {
      if (moved > 8) return;
      const found = [...hits].reverse().find((hit) => inside(event.clientX, event.clientY, hit.points));
      if (found) setOpen(panels[found.index]);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("click", onClick);
      textures.forEach((texture) => texture && gl.deleteTexture(texture));
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [panels, reduced]);

  const current = panels[focus];

  if (reduced || failed) {
    return (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {panels.map((panel) => {
          const body = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={panel.image} alt="" className="aspect-video w-full object-cover" />
              <span className="mt-3 block text-sm text-[#f6eddf]">{panel.title}</span>
              {panel.metric ? (
                <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-[#e5ca7e]">
                  {panel.metric.value} · {panel.metric.label}
                </span>
              ) : null}
            </>
          );
          return (
            <li key={panel.id} className="overflow-hidden rounded-[1.15rem] bg-[#10141c] ring-1 ring-white/10">
              {panel.external ? (
                <a href={panel.href} target="_blank" rel="noopener noreferrer" className="block p-3">
                  {body}
                </a>
              ) : (
                <Link href={panel.href} className="block p-3">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <canvas ref={canvasRef} className="h-[min(62vh,560px)] min-h-[320px] w-full cursor-grab active:cursor-grabbing" />
      <button
        type="button"
        aria-label="全屏"
        className="absolute bottom-3 right-4 grid size-9 place-items-center rounded-full border border-white/25 font-mono text-[10px] text-[#f6eddf]/70"
        onClick={() => {
          const node = wrapRef.current;
          if (!node) return;
          if (document.fullscreenElement) {
            void document.exitFullscreen();
            setFull(false);
          } else {
            void node.requestFullscreen();
            setFull(true);
          }
        }}
      >
        {full ? "×" : "⛶"}
      </button>
      {current ? (
        <p className="mt-2 text-center text-sm tracking-wide text-[#f6eddf]">
          {current.title}
          {current.metric ? (
            <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-[#e5ca7e]">
              {current.metric.value} · {current.metric.label}
            </span>
          ) : null}
        </p>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#050913]/88 px-4" onClick={() => setOpen(null)}>
          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.image} alt="" className="max-h-[72vh] w-full rounded-[1.15rem] object-contain" />
            <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-4 text-[#f6eddf]">
              <span>
                <span className="block text-lg">{open.title}</span>
                {open.metric ? (
                  <span className="mt-1 block font-mono text-[11px] tracking-[0.14em] text-[#e5ca7e]">
                    {open.metric.value} · {open.metric.label}
                  </span>
                ) : null}
              </span>
              {open.external ? (
                <a href={open.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[0.16em] text-[#e5ca7e]">
                  查看
                </a>
              ) : (
                <Link href={open.href} className="font-mono text-[11px] tracking-[0.16em] text-[#e5ca7e]">
                  查看
                </Link>
              )}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
