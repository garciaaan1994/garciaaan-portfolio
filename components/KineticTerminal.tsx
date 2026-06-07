"use client";

import { useEffect, useRef, useState } from "react";
import type { Work } from "@/lib/works";
import PaperTheme from "./PaperTheme";
import MagneticCursor from "./MagneticCursor";
import MobileNav from "./MobileNav";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

/* ────────────────────────────────────────────────────────────
   WebGL shader hero — fbm noise flow, phosphor accent.
   No external deps: raw WebGL, DPR-capped, cleaned up on unmount.
   ──────────────────────────────────────────────────────────── */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform vec3  u_c1;   // primary accent
uniform vec3  u_c2;   // secondary (chromatic)

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0,0.0)), c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p  = uv; p.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 0.04;
  vec2 q  = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float n = fbm(p + q * 1.6 + u_mouse * 0.25);

  // light "paper" base with a flowing colored ink wash (subtractive)
  vec3 paper = vec3(0.957, 0.949, 0.922);

  float glow = pow(smoothstep(0.24, 0.84, n), 1.05);
  vec3 tint = mix(u_c2, u_c1, glow);
  vec3 col = paper - (1.0 - tint) * glow * 0.26;

  // faint flowing filaments (ink concentration)
  float fil = smoothstep(0.66, 0.72, n) - smoothstep(0.72, 0.82, n);
  col -= (1.0 - u_c1) * fil * 0.18;

  // very subtle fanfold-paper ruling
  float scan = sin(uv.y * u_resolution.y * 1.2) * 0.006;
  col -= scan;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* accent palette — single source of truth.
   Keep these in sync with the --kt-accent / --kt-amber CSS vars below.
   To restyle the whole site, change PALETTE only. */
const PALETTE = {
  c1: [0.976, 0.451, 0.086] as [number, number, number], // bright orange #F97316
  c2: [0.122, 0.435, 0.400] as [number, number, number], // muted teal #1F6F66
};

function useShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c1"), PALETTE.c1);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c2"), PALETTE.c2);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = 0.5 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return canvasRef;
}

/* Reveal-on-scroll: fade + rise elements tagged .kt-reveal as they enter view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".kt-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("kt-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ──────────────────────────── small UI atoms ──────────────────────────── */
function Prompt({ cmd }: { cmd: string }) {
  return (
    <div className="kt-reveal mb-6 flex items-center gap-2 text-xs">
      <span className="text-[var(--kt-accent)]">garciaaan@studio</span>
      <span className="text-[var(--kt-dim)]">:</span>
      <span className="text-[var(--kt-amber)]">~</span>
      <span className="text-[var(--kt-dim)]">$</span>
      <span className="text-[var(--kt-fg)]">{cmd}</span>
    </div>
  );
}

// Skill groups stay in English (tech / domain terms read the same in both locales).
const SKILLS = [
  { label: "Product", items: ["PRD / Specs", "A/B Testing", "Growth / UX"] },
  { label: "Data", items: ["SQL · PG / BigQuery", "Redash", "KPI / Cohort / LTV"] },
  { label: "Domain", items: ["Payments / Fintech", "C2C / Commerce", "Creator / SNS"] },
  { label: "Stack", items: ["Notion / Linear", "React Native · Expo", "Devin / Claude"] },
];

type Lang = "en" | "ja";

const COPY: Record<Lang, {
  boot: string;
  booting: string;
  role: string;
  domains: string;
  scroll: string;
  aboutBio: string;
  aboutSub: string;
  noPosts: string;
  contactLead: [string, string, string];
  location: string;
}> = {
  en: {
    boot: "> boot sequence complete",
    booting: "> initializing…",
    role: "Product Manager",
    domains: "Commerce · Fintech · Creator",
    scroll: "[ scroll to traverse ↓ ]",
    aboutBio:
      "garciaaan is a product manager and business strategist based in Tokyo. For over a decade I've built consumer products across payments, fintech, C2C marketplaces, and creator platforms.",
    aboutSub:
      "I translate complex systems — settlement law, pricing, incentive design — into experiences people use without thinking. End to end: SQL analysis → PRD → A/B design → design & dev direction → QA → release → impact. Off the clock, I dig records and DJ.",
    noPosts: "// no posts yet — check back soon",
    contactLead: ["Let's create something ", "together", "."],
    location: "Tokyo, Japan",
  },
  ja: {
    boot: "> 起動シーケンス完了",
    booting: "> 初期化中…",
    role: "プロダクトマネージャー",
    domains: "コマース・フィンテック・クリエイター",
    scroll: "[ スクロールで進む ↓ ]",
    aboutBio:
      "garciaaan は東京拠点のプロダクトマネージャー／事業企画。十年以上にわたり、決済・フィンテック・CtoCマーケットプレイス・クリエイタープラットフォームなど、toC プロダクトを作ってきました。",
    aboutSub:
      "決済法・価格設計・インセンティブ設計といった複雑な仕組みを、誰もが意識せず使える体験へ翻訳します。SQL分析 → PRD → A/Bテスト設計 → デザイン／開発ディレクション → QA → リリース → 効果分析まで一気通貫。オフはレコードを掘り、DJ をしています。",
    noPosts: "// まだ記事はありません — 近日公開",
    contactLead: ["一緒に、何かを", "つくりましょう", "。"],
    location: "東京, 日本",
  },
};

const CONTACT = [
  { k: "EMAIL", v: "garcia@laidbackhumans.com", href: "mailto:garcia@laidbackhumans.com" },
  { k: "X/TWITTER", v: "@garciaaan1994", href: "https://x.com/garciaaan1994" },
  { k: "LOCATION", v: "Tokyo, Japan" },
];

export default function KineticTerminal({
  works,
  posts,
  fontClass = "",
}: {
  works: Work[];
  posts: Post[];
  fontClass?: string;
}) {
  const canvasRef = useShaderBackground();
  const [booted, setBooted] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>("ja"); // JP is the primary audience → default ja
  const previewRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const t = COPY[lang];

  useReveal();

  // language: stored preference → browser language → default ja
  useEffect(() => {
    const stored = localStorage.getItem("kt-lang");
    if (stored === "ja" || stored === "en") {
      setLang(stored);
      return;
    }
    setLang((navigator.language || "").toLowerCase().startsWith("ja") ? "ja" : "en");
  }, []);

  const chooseLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("kt-lang", l);
    } catch {}
  };

  const langToggle = (
    <span className="flex items-center gap-3">
      <span className="text-[var(--kt-dim)]">[</span>
      <button
        onClick={() => chooseLang("en")}
        className={`transition-colors ${lang === "en" ? "text-[var(--kt-accent)]" : "text-[var(--kt-fg)]/40 hover:text-[var(--kt-fg)]/70"}`}
        data-cursor-hover
      >
        EN
      </button>
      <span className="text-[var(--kt-dim)]">/</span>
      <button
        onClick={() => chooseLang("ja")}
        className={`transition-colors ${lang === "ja" ? "text-[var(--kt-accent)]" : "text-[var(--kt-fg)]/40 hover:text-[var(--kt-fg)]/70"}`}
        data-cursor-hover
      >
        日本語
      </button>
      <span className="text-[var(--kt-dim)]">]</span>
    </span>
  );

  useEffect(() => {
    const id = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(id);
  }, []);

  // cursor-following work preview (the magnetic cursor itself lives in <MagneticCursor/>)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      if (previewRef.current)
        previewRef.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`kt ${fontClass} relative min-h-screen overflow-hidden text-[var(--kt-fg)]`}>
      <PaperTheme />
      <MagneticCursor />
      {/* cursor-following work preview */}
      <div
        ref={previewRef}
        className={`kt-preview hidden md:block ${hoveredWork !== null ? "kt-preview-on" : ""}`}
        aria-hidden
      >
        {hoveredWork !== null &&
          (works[hoveredWork].video ? (
            <video
              src={works[hoveredWork].video}
              muted
              loop
              autoPlay
              playsInline
              className="block h-40 w-60 object-cover"
            />
          ) : (
            <div className="flex h-40 w-60 flex-col justify-end bg-[var(--kt-accent)] p-4 text-[var(--kt-bg)]">
              <span className="text-[10px] tracking-[0.2em] uppercase opacity-70">
                {works[hoveredWork].category}
              </span>
              <span className="text-lg font-bold">{works[hoveredWork].title}</span>
            </div>
          ))}
      </div>

      {/* CRT overlays (full page, subtle) */}
      <div className="kt-scanlines pointer-events-none fixed inset-0 z-[2]" />
      <div className="kt-vignette pointer-events-none fixed inset-0 z-[2]" />

      {/* system bar */}
      <header className="fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-[var(--kt-border)] bg-[var(--kt-bg)]/75 px-4 py-2 text-[10px] tracking-wider backdrop-blur-sm sm:px-6">
        <span className="text-[var(--kt-accent)]">● SYSTEM: garciaaan.studio</span>
        <nav className="hidden gap-5 sm:flex">
          {["works", "about", "blog", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="text-[var(--kt-fg)]/60 transition-colors hover:text-[var(--kt-accent)]" data-cursor-hover>
              ./{s}
            </a>
          ))}
        </nav>
        {/* desktop: status + language */}
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-[var(--kt-amber)]">STATUS: ONLINE</span>
          {langToggle}
        </div>
        {/* mobile: hamburger menu (language toggle lives inside it) */}
        <MobileNav base="">{langToggle}</MobileNav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* ─── HERO ─── */}
        <section className="relative -mx-6 flex min-h-[58vh] flex-col justify-center overflow-hidden px-6 sm:-mx-10 sm:min-h-screen sm:px-10">
          {/* WebGL shader — the kinetic centerpiece, scoped to the hero */}
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90" />
          <div className="relative z-10">
          <p className="mb-4 text-xs text-[var(--kt-dim)]">
            {booted ? t.boot : t.booting}
            <span className="kt-blink ml-1 text-[var(--kt-accent)]">_</span>
          </p>
          <h1
            className="kt-glitch text-[clamp(3rem,14vw,11rem)] leading-[0.85] font-bold tracking-tighter"
            data-text="garciaaan"
          >
            garciaaan
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.3em] uppercase">
            <span className="text-[var(--kt-accent)]">Tokyo</span>
            <span className="text-[var(--kt-dim)]">—</span>
            <span className="text-[var(--kt-fg)]/60">{t.role}</span>
            <span className="text-[var(--kt-dim)]">—</span>
            <span className="text-[var(--kt-fg)]/40">{t.domains}</span>
          </div>
          </div>
          <div className="absolute bottom-10 left-6 z-10 text-[10px] text-[var(--kt-dim)] sm:left-10">
            {t.scroll}
          </div>
        </section>

        {/* ─── WORKS ─── */}
        <section id="works" className="py-32">
          <Prompt cmd="ls ./works --detail" />
          <div className="border-t border-[var(--kt-border)]">
            {works.map((w, i) => (
              <a
                key={w.slug}
                href={`/works/${w.slug}`}
                className="kt-row kt-reveal group grid grid-cols-[auto_1fr] items-start gap-4 border-b border-[var(--kt-border)] py-6 transition-colors hover:bg-[var(--kt-accent)]/[0.04] sm:grid-cols-[3rem_1fr_8rem_5rem]"
                style={{ transitionDelay: `${i * 70}ms` }}
                data-cursor-hover
                onMouseEnter={() => setHoveredWork(i)}
                onMouseLeave={() => setHoveredWork((cur) => (cur === i ? null : cur))}
              >
                <span className="text-xs text-[var(--kt-dim)]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3
                    className="kt-glitch-hover text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--kt-accent)] sm:text-3xl"
                    data-text={w.title}
                  >
                    {w.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--kt-fg)]/40">
                    {lang === "ja" ? w.overview ?? w.description : w.description}
                  </p>
                  {w.tools && (
                    <p className="mt-3 text-[10px] tracking-wider text-[var(--kt-dim)]">
                      {w.tools.map((t) => `[${t}]`).join(" ")}
                    </p>
                  )}
                </div>
                <span className="hidden text-[10px] tracking-[0.2em] text-[var(--kt-fg)]/40 uppercase sm:block">
                  {w.category}
                </span>
                <span className="hidden text-right text-xs text-[var(--kt-dim)] tabular-nums sm:block">{w.year}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="py-32">
          <Prompt cmd="cat ./about.txt" />
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
            <div className="kt-reveal space-y-6">
              <p className="text-lg leading-relaxed text-[var(--kt-fg)]/80">{t.aboutBio}</p>
              <p className="text-sm leading-relaxed text-[var(--kt-fg)]/40">{t.aboutSub}</p>
            </div>
            <div className="kt-reveal grid grid-cols-2 gap-x-8 gap-y-8" style={{ transitionDelay: "120ms" }}>
              {SKILLS.map((g) => (
                <div key={g.label}>
                  <h4 className="mb-3 text-[10px] tracking-[0.2em] text-[var(--kt-accent)] uppercase">
                    ▸ {g.label}
                  </h4>
                  <ul className="space-y-1.5">
                    {g.items.map((it) => (
                      <li key={it} className="text-xs text-[var(--kt-fg)]/50">{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BLOG ─── */}
        <section id="blog" className="py-32">
          <Prompt cmd="ls ./blog" />
          {posts.length === 0 ? (
            <p className="text-xs text-[var(--kt-dim)]">{t.noPosts}</p>
          ) : (
            <div className="border-t border-[var(--kt-border)]">
              {posts.map((p, i) => (
                <a
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="kt-reveal group flex items-baseline justify-between gap-4 border-b border-[var(--kt-border)] py-6 transition-colors hover:bg-[var(--kt-accent)]/[0.04]"
                  style={{ transitionDelay: `${i * 70}ms` }}
                  data-cursor-hover
                >
                  <div>
                    <h3 className="text-base text-[var(--kt-fg)]/70 transition-colors group-hover:text-[var(--kt-accent)]">
                      {p.title}
                    </h3>
                    {p.description && <p className="mt-1 text-xs text-[var(--kt-fg)]/30">{p.description}</p>}
                  </div>
                  <time className="shrink-0 text-[10px] text-[var(--kt-dim)] tabular-nums">{p.date}</time>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-32">
          <Prompt cmd="./contact --connect" />
          <p className="kt-reveal mb-12 text-3xl font-bold tracking-tight sm:text-5xl">
            {t.contactLead[0]}
            <span className="text-[var(--kt-accent)]">{t.contactLead[1]}</span>
            {t.contactLead[2]}
          </p>
          <div className="kt-reveal grid gap-px border border-[var(--kt-border)] sm:grid-cols-3" style={{ transitionDelay: "100ms" }}>
            {CONTACT.map((c) => (
              <div key={c.k} className="bg-[var(--kt-fg)]/[0.03] p-6">
                <span className="text-[10px] tracking-[0.3em] text-[var(--kt-dim)] uppercase">{c.k}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-2 block text-sm break-all text-[var(--kt-fg)]/70 transition-colors hover:text-[var(--kt-accent)]"
                    data-cursor-hover
                  >
                    {c.v}
                  </a>
                ) : (
                  <p className="mt-2 text-sm break-all text-[var(--kt-fg)]/70">
                    {c.k === "LOCATION" ? t.location : c.v}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-16 text-[10px] text-[var(--kt-dim)]">
            © 2026 garciaaan — rendered via WebGL · prototype: kinetic-terminal
          </p>
        </section>
      </main>
    </div>
  );
}
