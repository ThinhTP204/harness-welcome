"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CODING_STAGE, GOALS, LIFECYCLE } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GRAIN = "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-50 before:pointer-events-none";
const SECTION = `relative px-(--gutter) pt-[clamp(56px,6vw,96px)] pb-[clamp(48px,5vw,76px)] scroll-mt-(--header-h) [background:var(--color-paper)_url('/hero/paper.webp')_center/cover] ${GRAIN}`;
const INTRO = "grid gap-[16px] lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:[align-items:end] lg:gap-[48px]";
const TITLE = "font-mega text-[clamp(52px,14vw,128px)] font-normal leading-[1.08] text-balance";
const LEDE = "max-w-[54ch] text-[clamp(17px,1.35vw,20px)] leading-[1.55] text-pretty";
// Hai dòng chữ tay nằm chồng lên nhau và đổi chỗ khi cuộn.
// Từ 1200px, canh chữ tay ngay trên chặng Lập trình (chặng thứ 4 trong 8).
const CAPTIONS = "grid mt-[28px] font-hand text-[clamp(26px,2.4vw,36px)] leading-[1.2] text-coral-deep min-[1200px]:ml-[37.5%]";
const CAPTION = "[grid-area:1/1]";
// Dùng min-[768px] thay vì md: Tailwind xếp breakpoint rem sau px, md: sẽ đè min-[1200px].
const STAGES = "grid grid-cols-[1fr_1fr] gap-[4px] mt-[8px] min-[768px]:grid-cols-[repeat(4,1fr)] min-[1200px]:grid-cols-[repeat(8,1fr)]";
const STAGE = "relative isolate grid place-items-center min-h-[84px] py-[12px] px-[10px] font-display text-[clamp(23px,2.1vw,34px)] font-extrabold leading-[1.08] text-center text-balance";
const BRUSH = "absolute z-[-1] inset-[-2%_-6%] [background:url('/hero/shapes/brush_lavender.svg')_center/100%_165%]";
const GOALS_BLOCK = "grid gap-[14px] mt-[clamp(28px,3vw,44px)] pt-[20px] border-t-[1.5px] border-ink lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-[32px]";
const GOALS_LABEL = "font-display text-[24px] font-extrabold leading-[1.1]";
const GOALS_LIST = "grid gap-[12px] md:grid-cols-[1fr_1fr] md:gap-x-[32px] md:gap-y-[16px] lg:grid-cols-[repeat(4,1fr)]";
const GOAL = "font-medium leading-[1.4] text-pretty lg:not-first:pl-[24px] lg:not-first:border-l lg:not-first:border-l-[color-mix(in_srgb,var(--color-ink)_22%,transparent)]";

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
    <section ref={root} id="overview" className={SECTION} aria-labelledby="overview-title">
      <div className="relative max-w-[1440px] mx-auto">
        <div className={INTRO}>
          <h2 id="overview-title" className={TITLE} data-reveal-title>
            Viết code chỉ là một chặng.
          </h2>
          <p className={LEDE}>
            Khóa AI-&#8288;Augmented Software Engineering (AI-&#8288;SE) không dừng ở prompt hay vibe coding. Bạn học cách đưa AI vào toàn bộ vòng đời phần mềm, và là
            người chịu trách nhiệm cuối cùng cho kết quả.
          </p>
        </div>

        <div className={CAPTIONS}>
          <p className={`${CAPTION} opacity-0`} aria-hidden="true" data-caption-short>
            Vibe coding dừng ở đây
          </p>
          <p className={CAPTION} data-caption-full>
            AI-SE đi hết cả vòng đời
          </p>
        </div>

        <ol className={STAGES} data-stages>
          {LIFECYCLE.map((stage, index) => (
            <li key={stage} className={STAGE}>
              <span className={BRUSH} data-spread={index === CODING_STAGE ? undefined : index} />
              {stage}
            </li>
          ))}
        </ol>

        <div className={GOALS_BLOCK}>
          <p className={GOALS_LABEL}>Sau khóa học, bạn có thể</p>
          <ul className={GOALS_LIST} data-reveal-group>
            {GOALS.map((goal) => (
              <li data-reveal-item key={goal} className={GOAL}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
