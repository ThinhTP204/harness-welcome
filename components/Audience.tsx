"use client";

import { useState } from "react";
import Image from "next/image";
import { COURSE_FACTS, FIT_CHECKS, REGISTRATION_URL } from "@/lib/content";

const GRAIN = "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-50 before:pointer-events-none";
const SECTION = `relative px-(--gutter) pt-[clamp(72px,8vw,120px)] pb-[clamp(32px,3vw,48px)] scroll-mt-(--header-h) [background:var(--color-paper)_url('/hero/paper.webp')_center/cover] ${GRAIN}`;
const INNER = "relative grid gap-[28px] max-w-[1440px] mx-auto lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-center lg:gap-[clamp(40px,5vw,80px)]";
const TITLE = "font-mega text-[clamp(44px,11vw,92px)] font-normal leading-[1.12] text-balance lg:text-[clamp(48px,5vw,84px)]";
const LEDE = "max-w-[50ch] mt-[14px] text-[clamp(17px,1.35vw,20px)] leading-[1.55] text-pretty";
const FACTS = "mt-[20px] border-t-[1.5px] border-ink";
const FACT = "grid grid-cols-[6.5rem_minmax(0,1fr)] gap-[12px] py-[11px] border-b border-b-[color-mix(in_srgb,var(--color-ink)_26%,transparent)]";
const STAGE = "relative pt-[32px] pb-[8px] lg:pt-[40px] lg:pb-[24px]";
const PHOTO = "absolute inset-[0_0_18%_12%] [clip-path:polygon(3%_5%,30%_0,66%_4%,100%_0,100%_92%,72%_100%,38%_94%,0_98%)]";
const TAPE = "before:content-[''] before:absolute before:top-[-13px] before:left-[50%] before:w-[112px] before:h-[28px] before:bg-[rgb(245_191_97/80%)] before:[transform:translateX(-50%)_rotate(-3deg)]";
const NOTE = `relative w-[min(100%,460px)] pt-[34px] px-[24px] pb-[22px] bg-[#fff4d8] [box-shadow:0_12px_22px_rgb(18_62_70/22%)] font-hand text-[clamp(22px,1.9vw,27px)] leading-[1.2] [transform:rotate(-1.5deg)] lg:ml-[4%] ${TAPE}`;
const NOTE_TITLE = "mb-[10px] text-[1.28em]";
const LABEL = "relative flex items-center gap-[12px] min-h-[44px] cursor-pointer";
const INPUT = "peer absolute w-[30px] h-[30px] opacity-0 cursor-pointer";
const BOX = "flex-none w-[30px] h-[30px] overflow-visible fill-none stroke-ink stroke-[4] rounded-[4px] peer-focus-visible:[outline:3px_solid_var(--color-ink)] peer-focus-visible:[outline-offset:3px]";
const TICK = "stroke-coral-deep stroke-[6] [stroke-dasharray:1] [stroke-dashoffset:1] [transition:stroke-dashoffset_0.2s_ease-out] motion-reduce:[transition:none] [input:checked+svg_&]:[stroke-dashoffset:0]";
const RESULT = "mt-[12px] pt-[10px] border-t border-dashed border-t-[color-mix(in_srgb,var(--color-ink)_40%,transparent)] text-[color-mix(in_srgb,var(--color-ink)_78%,transparent)] data-[ready]:text-coral-deep";

export default function Audience() {
  const [checked, setChecked] = useState<boolean[]>(() => FIT_CHECKS.map(() => false));
  const ready = checked.every(Boolean);

  const toggle = (index: number) =>
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));

  return (
    <section id="audience" className={SECTION} aria-labelledby="audience-title">
      <div className={INNER}>
        <div>
          <h2 id="audience-title" className={TITLE} data-reveal-title>
            Dành cho người muốn làm chủ AI, không chỉ dùng AI.
          </h2>
          <p className={LEDE}>
            Khóa học chưa phù hợp nếu bạn chỉ tìm vài mẹo prompt. Bạn sẽ làm dự án thực hành, nộp sản phẩm chạy được và tự bảo vệ
            quyết định của mình.
          </p>
          <dl className={FACTS}>
            {COURSE_FACTS.map((fact) => (
              <div key={fact.term} className={FACT}>
                <dt className="font-bold">{fact.term}</dt>
                <dd className="font-medium">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={STAGE}>
          <div className={PHOTO}>
            <Image src="/hero/campus.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>

          <form className={NOTE} data-reveal-sheet="5" aria-label="Tự kiểm tra mức độ phù hợp">
            <p className={NOTE_TITLE}>Bạn có hợp với khóa này?</p>
            <ul data-reveal-group="0.2">
              {FIT_CHECKS.map((item, index) => (
                <li key={item} data-reveal-item>
                  <label className={LABEL}>
                    <input className={INPUT} type="checkbox" checked={checked[index]} onChange={() => toggle(index)} />
                    <svg className={BOX} viewBox="-4 -34 52 52" aria-hidden="true">
                      <rect x="0" y="-28" width="40" height="40" rx="2" />
                      <path className={TICK} d="M7 -9 L18 2 L40 -28" pathLength={1} />
                    </svg>
                    {item}
                  </label>
                </li>
              ))}
            </ul>

            <p className={RESULT} aria-live="polite" data-ready={ready || undefined}>
              {ready ? (
                REGISTRATION_URL ? (
                  <a href={REGISTRATION_URL} className="underline underline-offset-4">Bạn đã sẵn sàng. Đăng ký</a>
                ) : (
                  "Bạn đã sẵn sàng. Form đăng ký sắp mở."
                )
              ) : (
                "Tick đủ cả bốn ô nhé."
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
