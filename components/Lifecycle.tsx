"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STORY_EXAMPLE, STORY_STAGES } from "@/lib/content";
import { BEAT, CENTER, chevron, doneAt, midAngle, polar, RINGS, roughCircle, SIZE, stageStateAt, textArc, TIMELINE, TOTAL_BEATS } from "./lifecycleModel";
import styles from "./Lifecycle.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Màn đủ cao thì ghim bằng sticky, còn lại hiện toàn bộ dạng danh sách. */
const PINNED = "(prefers-reduced-motion: no-preference) and (min-height: 720px)";
const FLOWING = "(prefers-reduced-motion: reduce), (max-height: 719px)";

const hidden = { opacity: 0, y: 12 };
const shown = { opacity: 1, y: 0, duration: 0.12 };

const STAGE_COLOR = ["#f34437", "#f68d2e", "#f8bf38", "#24a9b4", "#a8d05f", "#f59bb0"];
const POP = 12;

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
    <div ref={root} className={styles.track}>
      <div className={styles.sticky}>
        <div className={styles.diagram}>
          <div className={styles.wheel}>
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
              <path className={styles.discShadow} d={roughCircle(422, 7)} transform="translate(7 11)" />
              <path className={styles.disc} d={roughCircle(422, 7)} />

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
                    <path className={styles.idle} d={outer} style={{ fill: `color-mix(in srgb, ${STAGE_COLOR[index]} 26%, #fff9f1)` }} />
                    <path className={styles.full} d={outer} style={{ fill: STAGE_COLOR[index] }} ref={(node) => void (stageParts.outer = node)} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <image href={`/hero/icons/${stage.icon}.svg`} x={iconX - 22} y={iconY - 22} width="44" height="44" />
                    <text className={styles.outerText}>
                      <textPath href={`#wheel-outer-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.name}
                      </textPath>
                    </text>

                    <path className={styles.idleMiddle} d={middle} />
                    <path className={styles.risk} d={middle} ref={(node) => void (stageParts.risk = node)} />
                    <path className={styles.verified} d={middle} ref={(node) => void (stageParts.verified = node)} />
                    <text className={styles.middleText}>
                      <textPath href={`#wheel-middle-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.gate}
                      </textPath>
                    </text>

                    <path className={styles.idleInner} d={inner} />
                    <path className={styles.evidence} d={inner} ref={(node) => void (stageParts.evidence = node)} />
                    <text className={styles.innerText}>
                      <textPath href={`#wheel-inner-${index}`} startOffset="50%" textAnchor="middle">
                        {stage.short}
                      </textPath>
                    </text>
                  </g>
                );
              })}

              <path className={styles.core} d={roughCircle(130, 13, 2.5)} />
              <text className={styles.coreSmall} x={CENTER} y={CENTER - 58} textAnchor="middle">
                Một User Story
              </text>
              <text className={styles.coreCount} x={CENTER} y={CENTER + 36} textAnchor="middle">
                <tspan ref={(node) => void (parts.current.count = node)}>6/6</tspan>
              </text>
              <text className={styles.coreSmall} x={CENTER} y={CENTER + 80} textAnchor="middle">
                cổng đã qua
              </text>

              <g ref={(node) => void (parts.current.badge = node)}>
                <path className={styles.badge} d={roughCircle(137, 21, 4)} />
                <text className={styles.badgeText} x={CENTER} y={CENTER - 8} textAnchor="middle">
                  Demo
                </text>
                <text className={styles.badgeText} x={CENTER} y={CENTER + 62} textAnchor="middle">
                  Day
                </text>
              </g>

              <g className={styles.legend}>
                <text x="6" y="34">Vòng ngoài</text>
                <text className={styles.legendStrong} x="6" y="64">làm cùng AI</text>
                <text x={SIZE - 6} y="34" textAnchor="end">Vòng giữa</text>
                <text className={styles.legendStrong} x={SIZE - 6} y="64" textAnchor="end">bạn kiểm chứng</text>
                <text x="6" y={SIZE - 40}>Vòng trong</text>
                <text className={styles.legendStrong} x="6" y={SIZE - 10}>bằng chứng</text>
              </g>
            </svg>

            <ol className={styles.hits} aria-label="Sáu chặng của vòng đời">
              {STORY_STAGES.map((stage, index) => {
                const [x, y] = polar(352, midAngle(index));
                return (
                  <li key={stage.name} style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}>
                    <button type="button" aria-label={stage.name} ref={(node) => void (parts.current.buttons[index] = node)} onClick={() => goTo(index)} />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.story}>Ví dụ: “{STORY_EXAMPLE}”</p>
          <div className={styles.panels}>
            {STORY_STAGES.map((stage) => (
              <article key={stage.name} className={styles.panel} data-panel>
                <h3>{stage.name}</h3>
                <dl>
                  <div data-row="help">
                    <dt>AI giúp gì</dt>
                    <dd>{stage.help}</dd>
                  </div>
                  <div data-row="risk">
                    <dt>AI có thể sai gì</dt>
                    <dd>{stage.risk}</dd>
                  </div>
                  <div data-row="verify">
                    <dt>Bạn kiểm chứng bằng gì</dt>
                    <dd>{stage.verify}</dd>
                  </div>
                  <div data-row="leaves">
                    <dt>Để lại trong hồ sơ</dt>
                    <dd className={styles.leaves}>{stage.leaves}</dd>
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
