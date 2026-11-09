"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CHAPTERS } from "@/lib/content";
import Tear from "./Tear";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GRAIN = "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-50 before:pointer-events-none";
const SECTION = `relative px-(--gutter) pt-[clamp(20px,2vw,32px)] pb-[clamp(72px,6.5vw,100px)] overflow-x-clip scroll-mt-(--header-h) [background:var(--color-paper)_url('/hero/paper.webp')_center/cover] ${GRAIN}`;
const INNER = "[--rise:clamp(40px,3.8vw,60px)] relative max-w-[1440px] mx-auto";
const HEADER = "relative z-1 min-[1200px]:max-w-[47%]";
const TITLE = "max-w-[13em] font-mega text-[clamp(30px,9.6vw,92px)] font-normal leading-[1.12] min-[1200px]:text-[clamp(52px,4.4vw,78px)]";
const NOTE = "w-fit max-w-[24em] mt-[20px] py-[12px] px-[18px] bg-[#fff4d8] [box-shadow:0_8px_14px_rgb(18_62_70/22%)] font-hand text-[23px] leading-[1.2] [transform:rotate(1.5deg)] min-[1200px]:absolute min-[1200px]:right-[8px] min-[1200px]:bottom-[calc(var(--rise)*1.2)] min-[1200px]:max-w-[19em] min-[1200px]:mt-0";
// max-[1199px] của Tailwind là width < 1199px nên bỏ sót đúng 1199px, phải viết media query đầy đủ.
const CHAPTER_LIST = "grid gap-[8px] mt-[28px] md:[@media(max-width:1199px)]:grid-cols-[1fr_1fr] min-[1200px]:grid-cols-[repeat(6,minmax(0,1fr))] min-[1200px]:items-stretch min-[1200px]:gap-[10px] min-[1200px]:mt-[calc(var(--rise)*-2.7)] [filter:drop-shadow(0_6px_8px_rgb(18_62_70/18%))]";
const CHAPTER_TINTS = "data-[tint=coral]:bg-[color-mix(in_srgb,var(--color-coral)_52%,var(--color-paper))] data-[tint=yellow]:bg-yellow data-[tint=lavender]:bg-lavender data-[tint=orange]:bg-orange data-[tint=teal]:bg-[color-mix(in_srgb,var(--color-teal)_62%,var(--color-paper))]";
// Màn rộng: sáu dải giấy leo chéo lên bên phải. Góc trên trái cho tiêu đề, góc dưới phải cho ghi chú.
// Tổng margin trên và dưới của mỗi dải luôn bằng 5 bậc nên các dải cao bằng nhau.
const CHAPTER_WIDE = "min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:justify-between min-[1200px]:gap-[20px] min-[1200px]:[margin-block:calc((5-var(--i))*var(--rise))_calc(var(--i)*var(--rise))] min-[1200px]:pt-[16px] min-[1200px]:pb-[30px]";
const CHAPTER = `grid grid-cols-[56px_minmax(0,1fr)] gap-[8px] pt-[18px] px-[16px] pb-[24px] [clip-path:polygon(0_0,100%_0,100%_96%,84%_99%,68%_95%,50%_100%,32%_96%,14%_99%,0_95%)] even:[clip-path:polygon(0_0,100%_0,100%_98%,80%_95%,62%_100%,44%_96%,24%_100%,10%_96%,0_99%)] ${CHAPTER_TINTS} ${CHAPTER_WIDE}`;
const NUMBER = "font-mega text-[56px] leading-[1] min-[1200px]:text-[clamp(72px,6.4vw,104px)]";
const CHAPTER_TITLE = "mb-[6px] font-display text-[26px] font-extrabold leading-[1.08] min-[1200px]:text-[clamp(23px,1.9vw,30px)]";
const CHAPTER_TEXT = "text-[15px] leading-[1.45]";

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

      // Tablet và điện thoại không có bố cục leo chéo: các dải giấy lần lượt trượt vào khi cuộn tới.
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1199px)", () => {
        const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");
        gsap.set(chapters, { autoAlpha: 0, x: (index) => (index % 2 ? 44 : -44) });
        ScrollTrigger.batch(chapters, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", overwrite: true, clearProps: "opacity,visibility,transform" }),
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="curriculum" className={SECTION} aria-labelledby="curriculum-title">
      <Tear edge="bottom" tone="lavender" />

      <div className={INNER}>
        <div className={HEADER}>
          <h2 id="curriculum-title" className={TITLE} data-reveal-title>
            <span className="block">Sáu học phần,</span> <span className="block">từ yêu cầu đến</span> <span className="block">sản phẩm chạy được.</span>
          </h2>
        </div>

        <ol className={CHAPTER_LIST} data-chapters>
          {CHAPTERS.map((chapter, index) => (
            <li
              key={chapter.title}
              className={CHAPTER}
              data-tint={chapter.tint}
              data-chapter
              style={{ "--i": index } as CSSProperties}
            >
              <span className={NUMBER} aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className={CHAPTER_TITLE}>{chapter.title}</h3>
                <p className={CHAPTER_TEXT}>{chapter.summary}</p>
                <p className={`${CHAPTER_TEXT} mt-[10px] font-semibold`}>
                  <span className="font-hand text-[19px] font-normal">Làm ra:</span> {chapter.output}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className={NOTE}>Chương trình dự kiến. Mỗi học phần đều kết thúc bằng một sản phẩm cụ thể.</p>
      </div>
    </section>
  );
}
