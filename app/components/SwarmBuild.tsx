"use client";

import { useEffect } from "react";

/*
  Page-load intro: the page starts blank, a swarm of multiplayer-style
  cursors gathers around the logo, then they rebuild every element —
  dragging out a selection box with a live size badge, then typing the
  text in (or fading the element in). Elements below the fold are built
  as they scroll into view. Esc or "Skip" reveals everything at once.

  The <head> script in layout.tsx sets html[data-swarm="intro"] before
  first paint so nothing flashes; this component takes over from there.
*/

const COLORS = [
  "#f87171", "#fb923c", "#facc15", "#4ade80", "#2dd4bf",
  "#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#a3e635",
];

const TARGETS =
  "h1,h2,h3,h4,h5,p,span,a,button,img,svg,li,label,input,textarea,select";

const TYPEABLE = new Set(["H1", "H2", "H3", "H4", "H5", "P", "SPAN", "LI", "LABEL", "A", "BUTTON"]);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// Monochrome arrow that follows the theme: white on dark, black on light
const CURSOR_SVG = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M1.5 1.5 L16 9.2 L9.4 10.9 L6.2 17.6 Z" fill="var(--foreground)" stroke="var(--background)" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

type Agent = { el: HTMLDivElement; color: string; x: number; y: number; idleUntil: number };

export default function SwarmBuild() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete root.dataset.swarm;
      return;
    }

    let stopped = false;
    const mobile = window.innerWidth < 768;

    /* ---------------- collect targets ---------------- */
    const scope = Array.from(document.querySelectorAll("header, main, footer"));
    const candidates = new Set<HTMLElement>();
    scope.forEach((s) => {
      // A moving marquee is built as one block, not item by item
      s.querySelectorAll<HTMLElement>("[class*='animate-marquee']").forEach(
        (m) => m.parentElement && candidates.add(m.parentElement)
      );
      s.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => candidates.add(el));
    });
    const visible = [...candidates].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    // Keep only the outermost target so nested ones are not built twice
    const targets = visible.filter(
      (el) => !visible.some((other) => other !== el && other.contains(el))
    );
    targets.forEach((el) => (el.dataset.swarmPending = ""));
    let pending = targets.length;
    delete root.dataset.swarm;

    /* ---------------- overlay layer ---------------- */
    const layer = document.createElement("div");
    layer.className = "swarm-layer";
    const world = document.createElement("div");
    world.className = "swarm-world";
    layer.appendChild(world);
    document.body.appendChild(layer);

    const syncScroll = () =>
      (world.style.transform = `translate(${-window.scrollX}px, ${-window.scrollY}px)`);
    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });

    const skipBtn = document.createElement("button");
    skipBtn.className = "swarm-skip";
    skipBtn.textContent = "Skip intro  Esc";
    layer.appendChild(skipBtn);

    /* ---------------- agents ---------------- */
    const agents: Agent[] = [];
    const spawn = (x: number, y: number) => {
      const color = COLORS[agents.length % COLORS.length];
      const el = document.createElement("div");
      el.className = "swarm-cursor";
      el.innerHTML = CURSOR_SVG;
      el.style.transform = `translate(${x}px, ${y}px)`;
      world.appendChild(el);
      const agent = { el, color, x, y, idleUntil: 0 };
      agents.push(agent);
      return agent;
    };

    const moveTo = (a: Agent, x: number, y: number, ms?: number) => {
      const dist = Math.hypot(x - a.x, y - a.y);
      const d = ms ?? clamp(dist * 0.95, 240, 840) / speed();
      a.x = x;
      a.y = y;
      a.el.style.transition = `transform ${d}ms cubic-bezier(.45,.05,.25,1)`;
      a.el.style.transform = `translate(${x}px, ${y}px)`;
      return wait(d);
    };

    // Speeds up when a fast scroll leaves a long backlog
    const queue: HTMLElement[] = [];
    const speed = () => clamp(1 + queue.length / 12, 1, 3);

    /* ---------------- reveal helpers ---------------- */
    const docRect = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
    };

    const markDone = (el: HTMLElement) => {
      if (!("swarmPending" in el.dataset)) return;
      delete el.dataset.swarmPending;
      pending--;
    };

    const fadeIn = (el: HTMLElement) => {
      markDone(el);
      el.animate(
        [
          { opacity: 0, filter: "blur(6px)" },
          { opacity: 1, filter: "blur(0)" },
        ],
        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    };

    const canType = (el: HTMLElement) => {
      if (!TYPEABLE.has(el.tagName)) return false;
      const len = (el.textContent ?? "").trim().length;
      if (len === 0 || len > 400) return false;
      // Gradient (background-clip) text would show through the hidden part
      return !getComputedStyle(el).color.endsWith(", 0)");
    };

    /* Types the element's text in place. Untyped characters stay laid out
       but transparent, so nothing around it shifts while it types. */
    const typeIn = async (a: Agent, el: HTMLElement) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: { node: Text; full: string; rest: HTMLSpanElement }[] = [];
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const node = n as Text;
        if (!node.data.trim()) continue;
        const rest = document.createElement("span");
        rest.className = "swarm-rest";
        rest.textContent = node.data;
        nodes.push({ node, full: node.data, rest });
      }
      nodes.forEach(({ node, rest }) => {
        node.after(rest);
        node.data = "";
      });

      const caret = document.createElement("span");
      caret.className = "swarm-caret";
      caret.style.background = a.color;
      a.el.classList.add("is-typing");
      markDone(el);

      const total = nodes.reduce((s, n) => s + n.full.length, 0);
      const step = Math.max(1, Math.ceil(total / (1100 / 16)));
      let tick = 0;
      for (const { node, full, rest } of nodes) {
        rest.before(caret);
        for (let i = 0; i < full.length && !stopped; i += step) {
          node.data = full.slice(0, i + step);
          rest.textContent = full.slice(i + step);
          if (tick++ % 4 === 0) {
            const c = caret.getBoundingClientRect();
            moveTo(a, c.right + window.scrollX + 2, c.top + window.scrollY + c.height * 0.35, 90);
          }
          await wait(16 / speed());
        }
        node.data = full;
        rest.remove();
      }
      caret.remove();
      a.el.classList.remove("is-typing");
    };

    /* Drag out a selection box over the element, then build it */
    const build = async (a: Agent, el: HTMLElement) => {
      const r = docRect(el);
      await moveTo(a, r.x, r.y);
      if (stopped) return;

      const box = document.createElement("div");
      box.className = "swarm-box";
      box.style.cssText = `left:${r.x}px;top:${r.y}px;border-color:${a.color}`;
      const badge = document.createElement("span");
      badge.className = "swarm-badge";
      badge.style.background = a.color;
      box.appendChild(badge);
      world.appendChild(box);

      const dragMs = clamp(Math.hypot(r.w, r.h) * 1.05, 260, 720) / speed();
      const start = performance.now();
      const grow = () => {
        const t = clamp((performance.now() - start) / dragMs, 0, 1);
        const e = 1 - Math.pow(1 - t, 3);
        box.style.width = `${r.w * e}px`;
        box.style.height = `${r.h * e}px`;
        badge.textContent = `${Math.round(r.w * e)} × ${Math.round(r.h * e)}`;
        if (t < 1 && !stopped) requestAnimationFrame(grow);
      };
      requestAnimationFrame(grow);
      await moveTo(a, r.x + r.w, r.y + r.h, dragMs);
      if (stopped) return box.remove();

      if (canType(el)) await typeIn(a, el);
      else {
        fadeIn(el);
        await wait(320 / speed());
      }

      box.classList.add("is-done");
      setTimeout(() => box.remove(), 400);
    };

    /* ---------------- scheduling ---------------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          queue.push(e.target as HTMLElement);
        });
        // Call in reinforcements for a long backlog, like a fast scroll
        const max = mobile ? 14 : 24;
        while (queue.length > agents.length * 2 && agents.length < max) {
          const a = spawn(window.scrollX + rand(0, window.innerWidth), window.scrollY - 30);
          run(a);
        }
      },
      { threshold: 0 }
    );

    const take = () => {
      if (!queue.length) return null;
      // Nearest-to-top first, so the page builds top to bottom
      let best = 0;
      let bestTop = Infinity;
      queue.forEach((el, i) => {
        const t = el.getBoundingClientRect().top;
        if (t < bestTop) {
          bestTop = t;
          best = i;
        }
      });
      return queue.splice(best, 1)[0];
    };

    // Drift somewhere in view, but keep checking for work while drifting
    const wander = async (a: Agent) => {
      if (performance.now() >= a.idleUntil) {
        const d = rand(900, 1700);
        a.idleUntil = performance.now() + d;
        moveTo(
          a,
          window.scrollX + rand(40, window.innerWidth - 40),
          window.scrollY + rand(80, window.innerHeight - 40),
          d
        );
      }
      await wait(120);
    };

    async function run(a: Agent) {
      while (!stopped) {
        const el = take();
        if (el) {
          a.idleUntil = 0;
          await build(a, el);
        } else if (pending <= 0) return finish();
        else await wander(a);
      }
    }

    /* ---------------- intro + teardown ---------------- */
    let finishing = false;
    function finish(fast = false) {
      if (finishing) return;
      finishing = true;
      setTimeout(
        () => {
          stopped = true;
          layer.classList.add("is-leaving");
          setTimeout(cleanup, 500);
        },
        fast ? 0 : 2200
      );
    }

    const skip = () => {
      stopped = true;
      targets.forEach(markDone);
      document.querySelectorAll(".swarm-caret").forEach((c) => c.remove());
      finish(true);
    };
    skipBtn.addEventListener("click", skip);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);

    const cleanup = () => {
      io.disconnect();
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("keydown", onKey);
      targets.forEach(markDone);
      layer.remove();
    };

    (async () => {
      // A logo badge in the middle of the blank page
      const cx = window.scrollX + window.innerWidth / 2;
      const cy = window.scrollY + window.innerHeight / 2;
      const logo = document.createElement("div");
      logo.className = "swarm-logo";
      logo.textContent = "SR";
      logo.style.cssText = `left:${cx}px;top:${cy}px`;
      world.appendChild(logo);

      // Cursors fly in from the edges and swarm around it
      const count = mobile ? 8 : 14;
      for (let i = 0; i < count; i++) {
        const edge = i % 4;
        const x = window.scrollX + (edge === 1 ? window.innerWidth + 20 : edge === 3 ? -20 : rand(0, window.innerWidth));
        const y = window.scrollY + (edge === 0 ? -20 : edge === 2 ? window.innerHeight + 20 : rand(0, window.innerHeight));
        spawn(x, y);
      }
      for (let round = 0; round < 3 && !stopped; round++) {
        agents.forEach((a, i) => {
          const angle = (i / agents.length) * Math.PI * 2 + round * 1.3 + rand(-0.4, 0.4);
          const rad = rand(48, 110);
          moveTo(a, cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad, rand(540, 780));
        });
        await wait(720);
      }
      logo.classList.add("is-done");
      setTimeout(() => logo.remove(), 400);
      if (stopped) return;

      targets.forEach((el) => io.observe(el));
      agents.forEach(run);
    })();

    return () => {
      stopped = true;
      cleanup();
    };
  }, []);

  return null;
}
