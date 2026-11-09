"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CODING_STAGE, GOALS, LIFECYCLE } from "@/lib/content";
import styles from "./Overview.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Overview() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      // Vệt cọ bắt đầu ở chặng Lập trình rồi lan ra toàn bộ vòng đời theo tay cuộn.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-stages]", start: "top 72%", end: "bottom 42%", scrub: 0.5 },
        });

        gsap.utils.toArray<HTMLElement>("[data-spread]").forEach((brush) => {
          const index = Number(brush.dataset.spread);
          const distance = Math.abs(index - CODING_STAGE);
          const from = index < CODING_STAGE ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
          timeline.fromTo(brush, { clipPath: from }, { clipPath: "inset(0 0% 0 0%)", duration: 1 }, distance * 0.55);
        });

        timeline
          .fromTo("[data-caption-short]", { opacity: 1 }, { opacity: 0, duration: 0.8 }, 0.9)
          .fromTo("[data-caption-full]", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.5);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="overview" className={styles.overview} aria-labelledby="overview-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="overview-title" className={styles.title}>
            Viết code chỉ là một chặng.
          </h2>
          <p className={styles.lede}>
            Khóa học không dừng ở prompt hay vibe coding. Bạn học cách đưa AI vào toàn bộ vòng đời phần mềm, và là
            người chịu trách nhiệm cuối cùng cho kết quả.
          </p>
        </div>

        <div className={styles.captions}>
          <p className={styles.captionShort} aria-hidden="true" data-caption-short>
            Vibe coding dừng ở đây
          </p>
          <p className={styles.captionFull} data-caption-full>
            AI-SE đi hết cả vòng đời
          </p>
        </div>

        <ol className={styles.stages} data-stages>
          {LIFECYCLE.map((stage, index) => (
            <li key={stage} className={styles.stage}>
              <span className={styles.brush} data-spread={index === CODING_STAGE ? undefined : index} />
              {stage}
            </li>
          ))}
        </ol>

        <div className={styles.goals}>
          <p className={styles.goalsLabel}>Sau khóa học, bạn có thể</p>
          <ul>
            {GOALS.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
