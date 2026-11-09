"use client";

import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FAQ_ITEMS } from "@/lib/content";
import styles from "./Faq.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Ô vuông vẽ tay lấy từ tờ checklist ở hero. */
function CheckBox() {
  return (
    <svg className={styles.box} viewBox="-4 -34 52 52" aria-hidden="true">
      <rect x="0" y="-28" width="40" height="40" rx="2" />
      <path className={styles.tick} d="M7 -9 L18 2 L40 -28" pathLength={1} data-tick />
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
    <section ref={root} id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="faq-title" className={styles.title}>
            <span>Câu hỏi</span> <span>thường gặp</span>
          </h2>
        </div>

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.question} className={styles.item} open={index === 0}>
              <summary className={styles.question} onClick={toggle}>
                <CheckBox />
                <span>{item.question}</span>
                <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </summary>
              <div className={styles.panel} data-panel>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
