"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STORY_EXAMPLE, STORY_STAGES } from "@/lib/content";
import { BEAT, CENTER, chevron, doneAt, midAngle, polar, RINGS, roughCircle, SIZE, stageStateAt, textArc, TIMELINE, TOTAL_BEATS } from "./lifecycleModel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Màn đủ cao thì ghim bằng sticky, còn lại hiện toàn bộ dạng danh sách. */
const PINNED = "(prefers-reduced-motion: no-preference) and (min-height: 720px)";
const FLOWING = "(prefers-reduced-motion: reduce), (max-height: 719px)";

const hidden = { opacity: 0, y: 12 };
const shown = { opacity: 1, y: 0, duration: 0.12 };

const STAGE_COLOR = ["#f34437", "#f68d2e", "#f8bf38", "#24a9b4", "#a8d05f", "#f59bb0"];
const POP = 12;

/* `data-[pinned]:` nằm trên phần tử gốc, `[[data-pinned]_&]:` trên các phần tử con: GSAP matchMedia bật tắt data-pinned. */

// Ghim: sticky gốc của trình duyệt, mỗi chặng chiếm khoảng 2/3 màn hình cuộn.
const TRACK = "data-[pinned]:h-[calc(100svh_+_6.3_*_66svh)]";
const STICKY_PINNED = "[[data-pinned]_&]:sticky [[data-pinned]_&]:top-[72px] [[data-pinned]_&]:flex [[data-pinned]_&]:flex-col [[data-pinned]_&]:gap-[10px] [[data-pinned]_&]:h-[calc(100svh_-_72px)] [[data-pinned]_&]:py-[10px]";
const STICKY_PINNED_LG = "lg:[[data-pinned]_&]:top-(--header-h) lg:[[data-pinned]_&]:grid lg:[[data-pinned]_&]:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:[[data-pinned]_&]:items-center lg:[[data-pinned]_&]:gap-[clamp(28px,3vw,56px)] lg:[[data-pinned]_&]:h-[calc(100svh_-_var(--header-h))] lg:[[data-pinned]_&]:py-[12px]";
const STICKY = `${STICKY_PINNED} ${STICKY_PINNED_LG}`;

// Bánh xe vòng đời: mọi vị trí tính trong viewBox nên co giãn đúng tỉ lệ.
const WHEEL_BASE = "relative w-full max-w-[640px] aspect-square [[data-pinned]_&]:w-[min(100%,44svh)] lg:[[data-pinned]_&]:w-[min(100%,calc(100svh_-_var(--header-h)_-_28px))] lg:[[data-pinned]_&]:max-w-none";
// Vân giấy phủ lên toàn đĩa
const WHEEL_GRAIN = "after:content-[''] after:absolute after:inset-[1.5%] after:rounded-[50%] after:[background:url('/hero/grain.webp')_0_0/420px] after:mix-blend-multiply after:opacity-50 after:pointer-events-none";
const WHEEL = `${WHEEL_BASE} ${WHEEL_GRAIN}`;

const OUTER_TEXT = "fill-ink font-display text-[28px] font-extrabold";
// Điện thoại: chữ vòng trong sẽ quá nhỏ, phần đó đã có ở cột chữ.
const MIDDLE_TEXT = "fill-ink font-body text-[23px] font-bold max-[640px]:hidden";
const INNER_TEXT = "fill-ink font-body text-[20px] font-semibold max-[640px]:hidden";
const LEGEND_TEXT = "fill-ink font-hand text-[23px]";
const LEGEND_STRONG = "fill-ink font-hand text-[28px]";
const BADGE_TEXT = "fill-paper font-mega text-[76px]";

// Vùng bấm trong suốt đặt trên vòng ngoài
const HIT_ITEM = "absolute w-[15%] aspect-square [transform:translate(-50%,-50%)]";
const HIT_BUTTON = "block w-full h-full rounded-[50%] cursor-pointer focus-visible:outline-[3px] focus-visible:outline-ink focus-visible:outline-offset-[2px]";

// Cột chữ. Không ghim: bánh xe ở trên, sáu chặng hiện đủ.
const COPY = "mt-[24px] [[data-pinned]_&]:mt-0 [[data-pinned]_&]:flex-1 [[data-pinned]_&]:flex [[data-pinned]_&]:flex-col [[data-pinned]_&]:min-h-0 lg:[[data-pinned]_&]:self-stretch lg:[[data-pinned]_&]:justify-center";
const STORY = "font-hand text-[clamp(22px,1.9vw,28px)] leading-[1.2] [[data-pinned]_&]:hidden lg:[[data-pinned]_&]:block lg:[[data-pinned]_&]:mb-[10px]";
const PANELS = "grid gap-[24px] mt-[16px] md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(3,1fr)] [[data-pinned]_&]:grid-cols-none [[data-pinned]_&]:relative [[data-pinned]_&]:flex-1 [[data-pinned]_&]:mt-0 lg:[[data-pinned]_&]:flex-[0_1_clamp(450px,64svh,540px)]";
const PANEL = "[[data-pinned]_&]:absolute [[data-pinned]_&]:inset-0 [[data-pinned]_&]:opacity-0";
// Điện thoại thấp (max-[1023px] + max-height 800px): thu nhỏ chữ để bốn hàng vẫn nằm trọn trong màn hình.
const STAGE_NAME = "font-mega text-[clamp(40px,11vw,72px)] font-normal leading-[1.12] [[data-pinned]_&]:text-[clamp(32px,9vw,52px)] max-[1024px]:[@media(max-height:800px)]:[[data-pinned]_&]:text-[30px] lg:[[data-pinned]_&]:text-[clamp(48px,4.6vw,76px)]";
const ROWS = "mt-[8px] border-t-[1.5px] border-t-ink";
const ROW = "py-[9px] border-b border-b-[color-mix(in_srgb,var(--color-ink)_28%,transparent)] [[data-pinned]_&]:py-[5px] max-[1024px]:[@media(max-height:800px)]:[[data-pinned]_&]:py-[3px] lg:[[data-pinned]_&]:py-[clamp(8px,1.5svh,14px)]";
const TERM = "text-[14.5px] font-bold lg:[[data-pinned]_&]:text-[15px]";
// line-height 1.26 áp cho cả hàng "để lại trong hồ sơ": rule ghim của dd cũ có độ ưu tiên cao hơn dd.leaves.
const DETAIL_COMMON = "mt-[1px] text-pretty max-[1024px]:[@media(max-height:800px)]:[[data-pinned]_&]:leading-[1.26]";
// Giữ chỗ đủ hai dòng để bốn hàng không đổi độ cao giữa các chặng (min-h-[2.64em] khi ghim trên màn rộng).
const DETAIL = `${DETAIL_COMMON} text-[clamp(17px,1.4vw,20px)] font-medium leading-[1.32] max-[1024px]:[[data-pinned]_&]:text-[16px] max-[1024px]:[@media(max-height:800px)]:[[data-pinned]_&]:text-[15px] lg:[[data-pinned]_&]:min-h-[2.64em] lg:[[data-pinned]_&]:text-[clamp(18px,1.5vw,23px)]`;
const LEAVES = `${DETAIL_COMMON} font-hand text-[clamp(21px,1.7vw,25px)] font-normal leading-[1.15] max-[1024px]:[[data-pinned]_&]:text-[20px] max-[1024px]:[@media(max-height:800px)]:[[data-pinned]_&]:text-[18px] lg:[[data-pinned]_&]:min-h-0 lg:[[data-pinned]_&]:text-[clamp(22px,1.8vw,27px)]`;

interface StageParts {
  group: SVGGElement | null;
  outer: SVGPathElement | null;
  risk: SVGPathElement | null;
  verified: SVGPathElement | null;
  evidence: SVGPathElement | null;
}

export default function Lifecycle() {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const parts = useRef<{
    stages: StageParts[];
    buttons: Array<HTMLButtonElement | null>;
    count: SVGTSpanElement | null;
    badge: SVGGElement | null;
  }>({
    stages: STORY_STAGES.map(() => ({ group: null, outer: null, risk: null, verified: null, evidence: null })),
    buttons: [],
    count: null,
    badge: null,
  });

  // Ghi thẳng thuộc tính theo từng khung hình, không render lại React.
  const draw = useCallback((t: number) => {
    const p = parts.current;
    p.buttons.forEach((button, index) => {
      if (stageStateAt(index, t) === "active") button?.setAttribute("aria-current", "step");
      else button?.removeAttribute("aria-current");
    });
    const text = `${doneAt(t)}/${TOTAL_BEATS}`;
    if (p.count && p.count.textContent !== text) p.count.textContent = text;
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia(root);

      mm.add(PINNED, () => {
        el.setAttribute("data-pinned", "");
        const p = parts.current;
        const clock = { t: 0 };
        draw(0);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: () => `top ${window.innerWidth >= 1024 ? 80 : 72}`,
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(clock, { t: TOTAL_BEATS, duration: TOTAL_BEATS, onUpdate: () => draw(clock.t) }, 0);

        p.stages.forEach((stage, index) => {
          const [popX, popY] = polar(POP, midAngle(index)).map((value) => value - CENTER);

          // Chặng hiện tại lên màu và nhô ra khỏi vòng.
          if (index === 0) gsap.set(stage.group, { x: popX, y: popY });
          else {
            timeline.fromTo(stage.outer, { opacity: 0 }, { opacity: 1, duration: 0.08 }, index);
            timeline.fromTo(stage.group, { x: 0, y: 0 }, { x: popX, y: popY, duration: 0.08, ease: "power2.out" }, index);
          }

          // AI có thể sai, bạn kiểm chứng, bằng chứng được ghi lại.
          timeline.fromTo(stage.risk, { opacity: 0 }, { opacity: 1, duration: 0.05 }, index + BEAT.risk);
          timeline.fromTo(stage.verified, { opacity: 0 }, { opacity: 1, duration: 0.06 }, index + BEAT.verify);
          timeline.fromTo(stage.evidence, { opacity: 0 }, { opacity: 1, duration: 0.06 }, index + BEAT.leaves);
          timeline.to(stage.group, { x: 0, y: 0, duration: 0.05, ease: "power2.in" }, index + BEAT.done - 0.03);
        });

        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, index) => {
          const beat = (at: number) => index + at;
          if (index === 0) gsap.set(panel, { opacity: 1, y: 0 });
          else timeline.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1 }, beat(0));
          if (index > 0) timeline.fromTo(panel.querySelector('[data-row="help"] dd'), hidden, shown, beat(0.04));
          timeline
            .fromTo(panel.querySelector('[data-row="risk"] dd'), hidden, shown, beat(BEAT.risk))
            .fromTo(panel.querySelector('[data-row="verify"] dd'), hidden, shown, beat(BEAT.verify))
            .fromTo(panel.querySelector('[data-row="leaves"] dd'), hidden, shown, beat(BEAT.leaves));
          if (index < TOTAL_BEATS - 1) timeline.to(panel, { opacity: 0, y: -12, duration: 0.04 }, beat(BEAT.leave));
        });

        // Đủ sáu cổng thì tâm bánh xe chuyển thành Demo Day.
        timeline.fromTo(
          p.badge,
          { opacity: 0, scale: 1.5, svgOrigin: `${CENTER} ${CENTER}` },
          { opacity: 1, scale: 1, duration: 0.1, ease: "power4.in" },
          TOTAL_BEATS,
        );
        timeline.to({}, { duration: 0.01 }, TIMELINE - 0.01);

        trigger.current = timeline.scrollTrigger ?? null;
        ScrollTrigger.refresh();

        return () => {
          el.removeAttribute("data-pinned");
          trigger.current = null;
          ScrollTrigger.refresh();
        };
      });

      // Không ghim: bánh xe hiện ở trạng thái đã hoàn tất, sáu chặng là danh sách.
      mm.add(FLOWING, () => draw(TIMELINE));

      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const st = trigger.current;
    if (!st) {
      root.current?.querySelectorAll("[data-panel]")[index]?.scrollIntoView({ block: "center" });
      return;
    }
    window.scrollTo({ top: st.start + ((st.end - st.start) * (index + BEAT.leaves + 0.1)) / TIMELINE });
  };

  return (
    <div ref={root} className={TRACK}>
      <div className={STICKY}>
        <div className="grid place-items-center">
          <div className={WHEEL}>
            <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
              <path className="fill-[rgb(18_62_70/22%)]" d={roughCircle(422, 7)} transform="translate(7 11)" />
              <path className="fill-paper" d={roughCircle(422, 7)} />

              <defs>
                {STORY_STAGES.map((stage, index) => (
                  <g key={stage.name}>
                    <path id={`wheel-outer-${index}`} d={textArc(index, RINGS.outer.text, RINGS.outer.font)} />
                    <path id={`wheel-middle-${index}`} d={textArc(index, RINGS.middle.text, RINGS.middle.font)} />
                    <path id={`wheel-inner-${index}`} d={textArc(index, RINGS.inner.text, RINGS.inner.font)} />
                  </g>
                ))}
              </defs>

              {STORY_STAGES.map((stage, index) => {
                const [iconX, iconY] = polar(366, midAngle(index));
                const stageParts = parts.current.stages[index];
                const outer = chevron(index, RINGS.outer, 3);
                const middle = chevron(index, RINGS.middle, 5);
                const inner = chevron(index, RINGS.inner, 9);
                return (
                  <g key={stage.name} ref={(node) => void (stageParts.group = node)}>
                    <path d={outer} style={{ fill: `color-mix(in srgb, ${STAGE_COLOR[index]} 26%, #fff9f1)` }} />
                    <path d={outer} style={{ fill: STAGE_COLOR[index] }} ref={(node) => void (stageParts.outer = node)} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <image href={`/hero/icons/${stage.icon}.svg`} x={iconX - 22} y={iconY - 22} width="44" height="44" />
                    <text className={OUTER_TEXT}>
                      <textPath href={`#wheel-outer-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.name}
                      </textPath>
                    </text>

                    <path className="fill-[#eadfca]" d={middle} />
                    <path className="fill-coral" d={middle} ref={(node) => void (stageParts.risk = node)} />
                    <path className="fill-teal" d={middle} ref={(node) => void (stageParts.verified = node)} />
                    <text className={MIDDLE_TEXT}>
                      <textPath href={`#wheel-middle-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.gate}
                      </textPath>
                    </text>

                    <path className="fill-[#f2e9d7]" d={inner} />
                    <path className="fill-yellow" d={inner} ref={(node) => void (stageParts.evidence = node)} />
                    <text className={INNER_TEXT}>
                      <textPath href={`#wheel-inner-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.short}
                      </textPath>
                    </text>
                  </g>
                );
              })}

              <path className="fill-ink" d={roughCircle(130, 13, 2.5)} />
              <text className="fill-paper font-hand text-[30px]" x={CENTER} y={CENTER - 58} textAnchor="middle">
                Một User Story
              </text>
              <text className="fill-yellow font-mega text-[104px]" x={CENTER} y={CENTER + 36} textAnchor="middle">
                <tspan ref={(node) => void (parts.current.count = node)}>6/6</tspan>
              </text>
              <text className="fill-paper font-hand text-[25px]" x={CENTER} y={CENTER + 78} textAnchor="middle">
                chặng đã kiểm chứng
              </text>

              <g ref={(node) => void (parts.current.badge = node)}>
                <path className="fill-coral-deep" d={roughCircle(137, 21, 4)} />
                <text className={BADGE_TEXT} x={CENTER} y={CENTER - 8} textAnchor="middle">
                  Demo
                </text>
                <text className={BADGE_TEXT} x={CENTER} y={CENTER + 62} textAnchor="middle">
                  Day
                </text>
              </g>

              <g className="max-[640px]:hidden">
                <text className={LEGEND_TEXT} x="6" y="34">Vòng ngoài</text>
                <text className={LEGEND_STRONG} x="6" y="64">làm cùng AI</text>
                <text className={LEGEND_TEXT} x={SIZE - 6} y="34" textAnchor="end">Vòng giữa</text>
                <text className={LEGEND_STRONG} x={SIZE - 6} y="64" textAnchor="end">bạn kiểm chứng</text>
                <text className={LEGEND_TEXT} x="6" y={SIZE - 40}>Vòng trong</text>
                <text className={LEGEND_STRONG} x="6" y={SIZE - 10}>bằng chứng</text>
              </g>
            </svg>

            <ol className="absolute inset-0" aria-label="Sáu chặng của vòng đời">
              {STORY_STAGES.map((stage, index) => {
                const [x, y] = polar(352, midAngle(index));
                return (
                  <li key={stage.name} className={HIT_ITEM} style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}>
                    <button type="button" className={HIT_BUTTON} aria-label={stage.name} ref={(node) => void (parts.current.buttons[index] = node)} onClick={() => goTo(index)} />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className={COPY}>
          <p className={STORY}>Ví dụ: “{STORY_EXAMPLE}”</p>
          <div className={PANELS}>
            {STORY_STAGES.map((stage) => (
              <article key={stage.name} className={PANEL} data-panel>
                <h3 className={STAGE_NAME}>{stage.name}</h3>
                <dl className={ROWS}>
                  <div className={ROW} data-row="help">
                    <dt className={TERM}>AI giúp gì</dt>
                    <dd className={DETAIL}>{stage.help}</dd>
                  </div>
                  <div className={ROW} data-row="risk">
                    <dt className={TERM}>AI có thể sai gì</dt>
                    <dd className={DETAIL}>{stage.risk}</dd>
                  </div>
                  <div className={ROW} data-row="verify">
                    <dt className={TERM}>Bạn kiểm chứng bằng gì</dt>
                    <dd className={DETAIL}>{stage.verify}</dd>
                  </div>
                  <div className={ROW} data-row="leaves">
                    <dt className={TERM}>Để lại trong hồ sơ</dt>
                    <dd className={LEAVES}>{stage.leaves}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
