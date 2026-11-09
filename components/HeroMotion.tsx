"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CALM = "(prefers-reduced-motion: no-preference)";
const DESKTOP = `${CALM} and (min-width: 1024px)`;
const POINTER = `${DESKTOP} and (hover: hover) and (pointer: fine)`;

function isLowEndDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
}

export default function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Phải gỡ trước khi tạo tween from(), nếu không GSAP đọc "hidden" làm giá trị đích.
      document.documentElement.classList.remove("motion");

      const header = root.current?.querySelector("[data-site-header]");
      ScrollTrigger.create({
        start: 24,
        end: () => ScrollTrigger.maxScroll(window) + 1,
        onToggle: (self) => header?.toggleAttribute("data-scrolled", self.isActive),
      });

      const mm = gsap.matchMedia(root);

      // Một chuỗi on-load duy nhất, tổng khoảng 1.3s theo spec.
      mm.add(CALM, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from('[data-anim="header"]', { autoAlpha: 0, y: -14, duration: 0.32, clearProps: "all" }, 0)
          .fromTo(
            '[data-anim="mega"]',
            { autoAlpha: 1, clipPath: "inset(-15% 100% -15% -15%)" },
            { clipPath: "inset(-15% -15% -15% -15%)", duration: 0.42, stagger: 0.1, ease: "power2.inOut", clearProps: "clipPath" },
            0.12,
          )
          .from('[data-anim="collage"]', { autoAlpha: 0, y: 24, duration: 0.5 }, 0.36)
          .from('[data-anim="line"]', { autoAlpha: 0, y: 18, duration: 0.34, stagger: 0.08 }, 0.42)
          .fromTo(
            '[data-anim="brush"]',
            { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.34, ease: "power2.inOut", clearProps: "clipPath" },
            0.74,
          )
          .from('[data-anim="support"]', { autoAlpha: 0, y: 10, duration: 0.3, stagger: 0.05 }, 0.72)
          .from('[data-anim="note"]', { autoAlpha: 0, scale: 0.86, duration: 0.34, ease: "back.out(1.7)", stagger: 0.08 }, 0.86);
      });

      // Khi cuộn: mỗi plane rời đi một tốc độ, giữ tỉ lệ 4:8:12 của spec. Scroll vẫn là native.
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>("[data-scroll-depth]").forEach((plane) => {
          gsap.to(plane, {
            y: -Number(plane.dataset.scrollDepth),
            ease: "none",
            scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.3 },
          });
        });
      });

      // Parallax theo con trỏ: đúng 4 / 8 / 12px cho sky / shapes / people.
      mm.add(POINTER, () => {
        if (isLowEndDevice()) return;
        const planes = gsap.utils.toArray<HTMLElement>("[data-pointer-depth]").map((el) => ({
          depth: Number(el.dataset.pointerDepth),
          x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
        }));

        const move = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          planes.forEach((p) => {
            p.x(nx * -2 * p.depth);
            p.y(ny * -2 * p.depth);
          });
        };
        const reset = () => planes.forEach((p) => (p.x(0), p.y(0)));

        window.addEventListener("pointermove", move, { passive: true });
        document.documentElement.addEventListener("pointerleave", reset);
        return () => {
          window.removeEventListener("pointermove", move);
          document.documentElement.removeEventListener("pointerleave", reset);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
