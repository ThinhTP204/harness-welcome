"use client";

import { useState } from "react";
import Image from "next/image";
import { COURSE_FACTS, FIT_CHECKS, REGISTRATION_URL } from "@/lib/content";
import styles from "./Audience.module.css";

export default function Audience() {
  const [checked, setChecked] = useState<boolean[]>(() => FIT_CHECKS.map(() => false));
  const ready = checked.every(Boolean);

  const toggle = (index: number) =>
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));

  return (
    <section id="audience" className={styles.audience} aria-labelledby="audience-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="audience-title" className={styles.title}>
            Dành cho người muốn làm chủ AI, không chỉ dùng AI.
          </h2>
          <p className={styles.lede}>
            Khóa học chưa phù hợp nếu bạn chỉ tìm vài mẹo prompt. Bạn sẽ làm dự án thật, nộp sản phẩm thật và tự bảo vệ
            quyết định của mình.
          </p>
          <dl className={styles.facts}>
            {COURSE_FACTS.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.stage}>
          <div className={styles.photo}>
            <Image src="/hero/campus.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>

          <form className={styles.note} aria-label="Tự kiểm tra mức độ phù hợp">
            <p className={styles.noteTitle}>Bạn có hợp với khóa này?</p>
            <ul>
              {FIT_CHECKS.map((item, index) => (
                <li key={item}>
                  <label>
                    <input type="checkbox" checked={checked[index]} onChange={() => toggle(index)} />
                    <svg className={styles.box} viewBox="-4 -34 52 52" aria-hidden="true">
                      <rect x="0" y="-28" width="40" height="40" rx="2" />
                      <path className={styles.tick} d="M7 -9 L18 2 L40 -28" pathLength={1} />
                    </svg>
                    {item}
                  </label>
                </li>
              ))}
            </ul>

            <p className={styles.result} aria-live="polite" data-ready={ready || undefined}>
              {ready ? (
                REGISTRATION_URL ? (
                  <a href={REGISTRATION_URL}>Bạn đã sẵn sàng. Đăng ký</a>
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
