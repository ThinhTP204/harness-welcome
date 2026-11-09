"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CHAPTERS } from "@/lib/content";
import Tear from "./Tear";
import styles from "./Curriculum.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Curriculum() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      // Các dải giấy trượt lên với quãng đường tăng dần, chặng sau đi xa hơn chặng trước.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1200px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter, index) => {
          gsap.from(chapter, {
            y: 70 + index * 34,
            ease: "none",
            scrollTrigger: { trigger: "[data-chapters]", start: "top bottom", end: "top 35%", scrub: 0.4 },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="curriculum" className={styles.curriculum} aria-labelledby="curriculum-title">
      <Tear edge="top" tone="paper" />
      <Tear edge="bottom" tone="lavender" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="curriculum-title" className={styles.title}>
            <span>Sáu chặng,</span> <span>từ yêu cầu đến</span> <span>sản phẩm chạy được.</span>
          </h2>
        </div>

        <ol className={styles.chapters} data-chapters>
          {CHAPTERS.map((chapter, index) => (
            <li
              key={chapter.title}
              className={styles.chapter}
              data-tint={chapter.tint}
              data-chapter
              style={{ "--i": index } as CSSProperties}
            >
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <div className={styles.body}>
                <h3>{chapter.title}</h3>
                <p>{chapter.summary}</p>
                <p className={styles.output}>
                  <span>Làm ra:</span> {chapter.output}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className={styles.note}>Chương trình dự kiến. Chặng nào cũng kết thúc bằng một thứ bạn làm ra được.</p>
      </div>
    </section>
  );
}
