"use client";

import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FAQ_ITEMS } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SECTION =
  "relative pt-[clamp(64px,7vw,104px)] pb-[clamp(40px,3.5vw,56px)] px-(--gutter) scroll-mt-(--header-h) [background:var(--color-paper)_url('/hero/paper.webp')_center/cover] before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-50 before:pointer-events-none";

// Desktop: tiêu đề nhỏ bên trái, danh sách câu hỏi là nội dung chính.
const INNER =
  "relative max-w-[880px] mx-auto lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-[clamp(40px,4.4vw,72px)] lg:max-w-[1440px]";

const TITLE = "text-ink font-mega text-[clamp(36px,10vw,48px)] font-normal leading-[1.12] lg:text-[clamp(40px,3.8vw,58px)]";

const ITEM = "border-b border-b-[color-mix(in_srgb,var(--color-ink)_26%,transparent)]";

const QUESTION =
  "group grid grid-cols-[auto_minmax(0,1fr)_auto] [align-items:start] gap-4 py-5 text-[clamp(18px,1.5vw,21px)] font-semibold leading-[1.35] [list-style:none] cursor-pointer lg:py-6 [&::-webkit-details-marker]:hidden";

const BOX =
  "flex-none w-7 h-7 overflow-visible fill-none stroke-ink stroke-4 [transition:stroke_0.15s_ease] group-hover:stroke-coral-deep";

const TICK = "stroke-coral-deep stroke-6 [stroke-dasharray:1] [stroke-dashoffset:1] in-open:[stroke-dashoffset:0]";

const CHEVRON =
  "w-[18px] h-[18px] mt-[5px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [transition:transform_0.2s_ease] [details[open]:not([data-closing])_&]:[transform:rotate(180deg)]";

const ANSWER = "max-w-[62ch] pr-[34px] pb-6 pl-[44px] text-[16px] leading-[1.6] text-pretty";

/** Ô vuông vẽ tay lấy từ tờ checklist ở hero. */
function CheckBox() {
  return (
    <svg className={BOX} viewBox="-4 -34 52 52" aria-hidden="true">
      <rect x="0" y="-28" width="40" height="40" rx="2" />
      <path className={TICK} d="M7 -9 L18 2 L40 -28" pathLength={1} data-tick />
    </svg>
  );
}

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: root });

  // Giữ <details> gốc để không có JS vẫn dùng được; GSAP chỉ làm mượt việc đóng mở.
  const toggle = contextSafe((event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();

    const details = event.currentTarget.closest("details");
    const panel = details?.querySelector<HTMLElement>("[data-panel]");
    const tick = details?.querySelector("[data-tick]");
    if (!details || !panel || !tick) return;

    const wasClosed = !details.open;
    const opening = wasClosed || details.dataset.closing !== undefined;

    // FAQ đổi chiều cao trang nên phải tính lại vị trí hiệu ứng cuộn của footer.
    const settle = () => {
      gsap.set([panel, tick], { clearProps: "height,strokeDashoffset" });
      ScrollTrigger.refresh();
    };

    if (opening) {
      delete details.dataset.closing;
      details.open = true;
      if (wasClosed) gsap.set(panel, { height: 0 });
      if (wasClosed) gsap.set(tick, { strokeDashoffset: 1 });
      gsap.to(panel, { height: "auto", duration: 0.3, ease: "power3.out", overwrite: true, onComplete: settle });
      gsap.to(tick, { strokeDashoffset: 0, duration: 0.26, ease: "power2.out", overwrite: true });
    } else {
      details.dataset.closing = "";
      gsap.to(tick, { strokeDashoffset: 1, duration: 0.18, ease: "power2.out", overwrite: true });
      gsap.to(panel, {
        height: 0,
        duration: 0.24,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          delete details.dataset.closing;
          details.open = false;
          settle();
        },
      });
    }
  });

  return (
    <section ref={root} id="faq" className={SECTION} aria-labelledby="faq-title">
      <div className={INNER}>
        <div className="mb-[clamp(20px,3vw,32px)] lg:mb-0 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
          <h2 id="faq-title" className={TITLE} data-reveal-title>
            <span className="block">Câu hỏi</span> <span className="block">thường gặp</span>
          </h2>
        </div>

        <div className="border-t-[1.5px] border-t-ink" data-reveal-group>
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.question} className={ITEM} open={index === 0} data-reveal-item>
              <summary className={QUESTION} onClick={toggle}>
                <CheckBox />
                <span>{item.question}</span>
                <svg className={CHEVRON} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </summary>
              <div className="overflow-hidden" data-panel>
                <p className={ANSWER}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
