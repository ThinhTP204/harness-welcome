"use client";

import { useState, type KeyboardEvent } from "react";
import { EVIDENCE, STORY_EXAMPLE, STORY_STAGES } from "@/lib/content";
import Tear from "./Tear";
import styles from "./Projects.module.css";

export default function Projects() {
  const [active, setActive] = useState(0);
  const stage = STORY_STAGES[active];

  // Mẫu tabs chuẩn: mũi tên trái/phải chuyển tab và đưa focus theo.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + STORY_STAGES.length) % STORY_STAGES.length;
    setActive(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <Tear edge="bottom" tone="paper" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="projects-title" className={styles.title}>
            <span>Demo chạy được chưa đủ.</span> <span>Bạn phải chứng minh nó đúng.</span>
          </h2>
          <p className={styles.lede}>
            Mỗi nhóm lần theo một User Story qua từng chặng, rồi giải thích AI đã tham gia ở đâu, đã sai ở đâu và bạn
            kiểm chứng thế nào.
          </p>
        </div>

        <div className={styles.board}>
          <div className={styles.tabs} role="tablist" aria-label="Các chặng của một User Story" onKeyDown={onKeyDown}>
            {STORY_STAGES.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`story-tab-${index}`}
                aria-selected={index === active}
                aria-controls="story-panel"
                tabIndex={index === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(index)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div
            id="story-panel"
            className={styles.sheet}
            role="tabpanel"
            aria-labelledby={`story-tab-${active}`}
            tabIndex={0}
          >
            <p className={styles.story}>Ví dụ: “{STORY_EXAMPLE}”</p>
            <dl key={active} className={styles.columns}>
              <div>
                <dt>AI giúp gì</dt>
                <dd>{stage.help}</dd>
              </div>
              <div>
                <dt>AI có thể sai gì</dt>
                <dd>{stage.risk}</dd>
              </div>
              <div>
                <dt>Bạn kiểm chứng bằng gì</dt>
                <dd>{stage.verify}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.evidence}>
          <p className={styles.evidenceLead}>Cuối khóa là Demo Day, cùng một bộ hồ sơ của riêng bạn.</p>
          <ul>
            {EVIDENCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
