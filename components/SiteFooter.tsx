"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FOOTER_LINKS, REGISTRATION_URL } from "@/lib/content";
import styles from "./SiteFooter.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = ["plan", "build", "test", "deploy"];
const HIDDEN = "inset(-25% 100% -25% -5%)";
const SHOWN = "inset(-25% -5% -25% -5%)";

export default function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add(
        { calm: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1024px)" },
        (context) => {
          if (!context.conditions?.calm) return;

          // Desktop: chữ viết xong đúng lúc chạm đáy trang.
          // Mobile: footer cao hơn màn hình nên phải viết xong khi bảng phấn còn trong tầm mắt.
          const scrollTrigger = context.conditions.wide
            ? { trigger: root.current, start: "top 85%", end: "bottom bottom", scrub: 0.4 }
            : { trigger: "[data-chalk-list]", start: "top 85%", end: "clamp(bottom 55%)", scrub: 0.4 };

          gsap
            .timeline({ defaults: { ease: "none" }, scrollTrigger })
            .from("[data-rise]", { y: -48, duration: 4.05 }, 0)
            .from("[data-scrap-far]", { y: -18, duration: 4.05 }, 0)
            .from("[data-scrap-near]", { y: -44, duration: 4.05 }, 0)
            .fromTo("[data-chalk]", { clipPath: HIDDEN }, { clipPath: SHOWN, duration: 0.9, stagger: 0.85 }, 0.25)
            .fromTo("[data-chalk-tick]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer ref={root} className={styles.footer}>
      <div className={styles.scraps} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/shapes/torn_coral.svg" alt="" className={styles.scrapCoral} data-scrap-near />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/shapes/torn_yellow.svg" alt="" className={styles.scrapYellow} data-scrap-far />
      </div>
      <div className={styles.edge} aria-hidden="true">
        <div className={styles.edgePaper} />
      </div>

      <div className={styles.board}>
        <div className={styles.inner} data-rise>
          <ol className={styles.chalk} aria-label="Bốn bước của quy trình" data-chalk-list>
            {STEPS.map((step) => (
              <li key={step} data-chalk>
                <span aria-hidden="true">&gt; </span>
                {step}
                {step === "deploy" && (
                  <svg className={styles.chalkTick} viewBox="0 0 48 44" aria-hidden="true">
                    <path d="M4 26 L17 39 L44 4" pathLength={1} data-chalk-tick />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          <div className={styles.closing}>
            <h2 className={styles.statement}>
              <span>AI giúp bạn làm nhanh.</span> <span>Chất lượng vẫn do bạn quyết định.</span>
            </h2>

            <div className={styles.actions}>
              {REGISTRATION_URL ? (
                <a className={`${styles.button} ${styles.primary}`} href={REGISTRATION_URL}>
                  Đăng ký
                </a>
              ) : (
                <span className={`${styles.button} ${styles.primary} ${styles.pending}`}>Sắp mở đăng ký</span>
              )}
              <a className={`${styles.button} ${styles.secondary}`} href="#curriculum">
                Xem chương trình
              </a>
            </div>
          </div>

          <div className={styles.base}>
            <div className={styles.identity}>
              <a className={styles.brand} href="#top">
                AI-SE — FA26
              </a>
              <p>Ảnh trên trang là ảnh minh họa, không phải ảnh chính thức của học viên hoặc cơ sở đào tạo.</p>
            </div>

            <nav className={styles.links} aria-label="Liên kết cuối trang">
              {FOOTER_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
