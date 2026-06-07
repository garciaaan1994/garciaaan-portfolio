"use client";

/* Shared "Paper Terminal" theme: design tokens, CRT overlays, reveal,
   glitch, magnetic-cursor + work-preview styles, and isolation of the
   live site's global chrome. Rendered by every preview route so the home
   and blog pages share one source of truth. */
export default function PaperTheme() {
  return (
    <style jsx global>{`
      .kt {
        --kt-bg: #f3f1ea; /* warm paper */
        --kt-fg: #17150f; /* ink */
        --kt-dim: #978f7e; /* muted */
        --kt-accent: #f97316; /* bright orange — matches PALETTE.c1 */
        --kt-amber: #1f6f66; /* muted teal — matches PALETTE.c2 */
        --kt-border: rgba(23, 21, 15, 0.14);
        background: var(--kt-bg);
      }
      @media (hover: hover) and (pointer: fine) {
        .kt,
        .kt * {
          cursor: none !important;
        }
      }
      @media (hover: none) {
        html,
        body,
        * {
          cursor: auto !important;
        }
      }
      .kt-scanlines {
        background: repeating-linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0px,
          rgba(0, 0, 0, 0) 3px,
          rgba(23, 21, 15, 0.035) 4px
        );
        mix-blend-mode: multiply;
      }
      .kt-vignette {
        background: radial-gradient(ellipse at center, transparent 62%, rgba(23, 21, 15, 0.06) 100%);
      }
      /* scroll reveal */
      .kt-reveal {
        opacity: 0;
        transform: translateY(26px);
        transition:
          opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1),
          transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
      }
      .kt-reveal.kt-in {
        opacity: 1;
        transform: none;
      }
      /* magnetic cursor */
      .kt-cursor {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 60;
        width: 26px;
        height: 26px;
        border: 1.5px solid var(--kt-accent);
        border-radius: 999px;
        pointer-events: none;
        mix-blend-mode: multiply;
        will-change: transform;
        transition:
          width 0.25s ease,
          height 0.25s ease,
          background-color 0.25s ease;
      }
      .kt-cursor.kt-cursor-hover {
        width: 54px;
        height: 54px;
        background: color-mix(in srgb, var(--kt-accent) 16%, transparent);
      }
      /* cursor-following work preview */
      .kt-preview {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 55;
        pointer-events: none;
        opacity: 0;
        transform: translate(-100px, -100px);
        transition: opacity 0.3s ease;
        border: 1px solid var(--kt-border);
        box-shadow: 0 20px 50px -20px rgba(23, 21, 15, 0.4);
        overflow: hidden;
        will-change: transform;
      }
      .kt-preview.kt-preview-on {
        opacity: 1;
      }
      .kt-blink {
        animation: kt-blink 1s steps(2, start) infinite;
      }
      @keyframes kt-blink {
        to {
          opacity: 0;
        }
      }
      /* glitch title */
      .kt-glitch {
        position: relative;
        color: var(--kt-fg);
      }
      .kt-glitch::before,
      .kt-glitch::after {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        overflow: hidden;
      }
      .kt-glitch::before {
        color: var(--kt-accent);
        animation: kt-glitch-1 3.5s infinite linear alternate-reverse;
        clip-path: inset(0 0 60% 0);
      }
      .kt-glitch::after {
        color: var(--kt-amber);
        animation: kt-glitch-2 2.8s infinite linear alternate-reverse;
        clip-path: inset(55% 0 0 0);
      }
      @keyframes kt-glitch-1 {
        0%, 92%, 100% { transform: translate(0); opacity: 0; }
        93% { transform: translate(-3px, 1px); opacity: 0.85; }
        96% { transform: translate(2px, -1px); opacity: 0.85; }
      }
      @keyframes kt-glitch-2 {
        0%, 90%, 100% { transform: translate(0); opacity: 0; }
        91% { transform: translate(3px, -1px); opacity: 0.8; }
        94% { transform: translate(-2px, 1px); opacity: 0.8; }
      }
      .kt-glitch-hover {
        position: relative;
      }
      .kt-row:hover .kt-glitch-hover::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        color: var(--kt-amber);
        clip-path: inset(0 0 50% 0);
        animation: kt-glitch-2 0.4s infinite linear alternate-reverse;
      }
      /* article (markdown) — terminal-flavoured, dependency-free */
      .kt-article {
        font-size: 0.95rem;
        line-height: 1.85;
        color: color-mix(in srgb, var(--kt-fg) 72%, transparent);
      }
      .kt-article > * + * {
        margin-top: 1.4rem;
      }
      .kt-article h2 {
        margin-top: 2.6rem;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.01em;
        color: var(--kt-fg);
      }
      .kt-article h3 {
        margin-top: 2rem;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--kt-fg);
      }
      .kt-article h2::before,
      .kt-article h3::before {
        color: var(--kt-accent);
      }
      .kt-article h2::before {
        content: "## ";
      }
      .kt-article h3::before {
        content: "### ";
      }
      .kt-article strong {
        font-weight: 700;
        color: var(--kt-fg);
      }
      .kt-article a {
        color: var(--kt-accent);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .kt-article ul {
        padding-left: 1.2rem;
      }
      .kt-article li {
        position: relative;
        list-style: none;
      }
      .kt-article li::before {
        content: "› ";
        position: absolute;
        left: -1.1rem;
        color: var(--kt-accent);
      }
      .kt-article li + li {
        margin-top: 0.5rem;
      }
      .kt-article code {
        padding: 0.1em 0.35em;
        border-radius: 3px;
        font-size: 0.88em;
        color: var(--kt-accent);
        background: color-mix(in srgb, var(--kt-fg) 6%, transparent);
      }
      .kt-article pre {
        overflow: auto;
        padding: 1rem 1.2rem;
        border: 1px solid var(--kt-border);
        border-radius: 4px;
        background: color-mix(in srgb, var(--kt-fg) 4%, transparent);
      }
      .kt-article pre code {
        padding: 0;
        color: var(--kt-fg);
        background: none;
      }
    `}</style>
  );
}
