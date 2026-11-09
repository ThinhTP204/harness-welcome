"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FOOTER_LINKS, REGISTRATION_URL } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = ["plan", "build", "test", "deploy"];
const HIDDEN = "inset(-25% 100% -25% -5%)";
const SHOWN = "inset(-25% -5% -25% -5%)";

const GRAIN =
  "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px]";
const HAIRLINE = "border-t border-t-[rgb(255_249_241/24%)]";

const FOOTER =
  "[--edge-h:clamp(90px,10vw,160px)] relative z-1 overflow-x-clip text-paper [&_:focus-visible]:outline-yellow";

// Mép giấy xé của phần FAQ phủ lên bảng phấn.
// clip-path chỉ giữ mép dưới: mép trên trùng màu nền FAQ, để lại sẽ lộ bóng.
const EDGE =
  "absolute z-3 top-[calc(var(--edge-h)*-0.55)] left-[-4%] w-[108%] h-(--edge-h) [filter:drop-shadow(0_4px_0_#fff)_drop-shadow(0_8px_10px_rgb(9_36_41/35%))] [clip-path:inset(45%_-5%_-40%_-5%)] pointer-events-none";

const EDGE_PAPER = `relative w-full h-full [background:var(--color-paper)_url('/hero/paper.webp')_center/cover] [mask:url('/hero/shapes/torn_paper.svg')_center/100%_100%] ${GRAIN} before:opacity-50`;

// Cắt theo đỉnh footer để mẩu giấy không ló lên phần FAQ khi đang trượt.
const SCRAPS = "absolute z-2 [inset:0_0_auto] h-[calc(var(--edge-h)*2)] overflow-clip pointer-events-none";

const SCRAP = "absolute top-[calc(var(--edge-h)*0.1)] h-[clamp(44px,4.4vw,70px)]";
const SCRAP_CORAL = `${SCRAP} left-[-3%] w-[clamp(130px,17vw,280px)] [transform:rotate(-4deg)]`;
const SCRAP_YELLOW = `${SCRAP} right-[-3%] w-[clamp(120px,15vw,250px)] [transform:rotate(4deg)]`;

const BOARD = `relative overflow-clip pt-[calc(var(--edge-h)*0.35+clamp(40px,4vw,60px))] px-(--gutter) pb-5 bg-ink ${GRAIN} before:opacity-[0.32] before:pointer-events-none`;

// Bảng phấn: đây là một quy trình có thứ tự nên dùng danh sách có thứ tự.
// Đủ rộng thì bốn bước chạy thành một hàng, phủ kín bề ngang.
const CHALK =
  "grid grid-cols-[1fr_1fr] gap-x-3 gap-y-1 text-[#f2f6e9] font-hand text-[10.4vw] leading-[1.08] md:flex md:justify-between md:text-[clamp(52px,7.2vw,140px)]";

const CHALK_TICK =
  "inline-block w-[0.5em] h-[0.45em] ml-[0.16em] overflow-visible align-[-0.02em] fill-none stroke-yellow stroke-6 [stroke-linejoin:round] [stroke-dasharray:1]";

const CLOSING = `grid gap-5 mt-6 pt-6 ${HAIRLINE} lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:mt-[clamp(20px,2vw,32px)] lg:pt-[clamp(20px,2vw,32px)]`;

const STATEMENT =
  "font-display text-[clamp(30px,8vw,40px)] font-extrabold leading-[1.12] text-balance lg:text-[clamp(32px,3.2vw,56px)]";

// Điện thoại: hai nút chia đôi một hàng thay vì xếp chồng.
const BUTTON =
  "inline-flex items-center justify-center min-h-[52px] py-3 px-[26px] rounded-[13px_17px_12px_18px/17px_12px_18px_13px] font-semibold whitespace-nowrap [transition:transform_0.16s_ease,background-color_0.16s_ease,color_0.16s_ease] max-[768px]:flex-1 max-[768px]:px-[10px] max-[768px]:text-[15px]";
const BUTTON_LINK = `${BUTTON} hover:[transform:translateY(-2px)]`;
const PRIMARY = "bg-coral-deep text-paper";
const SECONDARY = "border-[1.5px] border-paper hover:bg-paper hover:text-ink";

const BASE = `grid gap-3 mt-6 pt-4 ${HAIRLINE} text-[14px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:mt-[clamp(20px,2vw,32px)]`;

const FOOTER_LINK =
  "py-2 underline decoration-transparent decoration-2 underline-offset-5 [transition:text-decoration-color_0.15s_ease] hover:decoration-yellow";

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
    <footer ref={root} className={FOOTER}>
      <div className={SCRAPS} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/shapes/torn_coral.svg" alt="" className={SCRAP_CORAL} data-scrap-near />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/shapes/torn_yellow.svg" alt="" className={SCRAP_YELLOW} data-scrap-far />
      </div>
      <div className={EDGE} aria-hidden="true">
        <div className={EDGE_PAPER} />
      </div>

      <div className={BOARD}>
        <div className="relative max-w-[1776px] mx-auto" data-rise>
          <ol className={CHALK} aria-label="Bốn bước của quy trình" data-chalk-list>
            {STEPS.map((step) => (
              <li key={step} className="whitespace-nowrap" data-chalk>
                <span aria-hidden="true">&gt; </span>
                {step}
                {step === "deploy" && (
                  <svg className={CHALK_TICK} viewBox="0 0 48 44" aria-hidden="true">
                    <path d="M4 26 L17 39 L44 4" pathLength={1} data-chalk-tick />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          <div className={CLOSING}>
            <h2 className={STATEMENT}>
              <span className="block">AI giúp bạn làm nhanh.</span>{" "}
              <span className="block">Chất lượng vẫn do bạn quyết định.</span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {REGISTRATION_URL ? (
                <a className={`${BUTTON_LINK} ${PRIMARY}`} href={REGISTRATION_URL}>
                  Đăng ký
                </a>
              ) : (
                <span className={`${BUTTON} ${PRIMARY} cursor-default`}>Sắp mở đăng ký</span>
              )}
              <a className={`${BUTTON_LINK} ${SECONDARY}`} href="#curriculum">
                Xem chương trình
              </a>
            </div>
          </div>

          <div className={BASE}>
            <div>
              <a className="font-display text-[21px] tracking-[0.01em] whitespace-nowrap" href="#top">
                AI-SE — FA26
              </a>
              <p className="max-w-[100ch] text-[rgb(255_249_241/78%)] text-pretty">Ảnh trên trang là ảnh minh họa, không phải ảnh chính thức của học viên hoặc cơ sở đào tạo.</p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-0 text-[15px] font-medium" aria-label="Liên kết cuối trang">
              {FOOTER_LINKS.map((link) => (
                <a key={link.href} className={FOOTER_LINK} href={link.href}>
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
