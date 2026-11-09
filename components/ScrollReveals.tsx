"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Chừa khoảng âm trên dưới để dấu tiếng Việt không bị cắt khi đang lộ chữ.
const TITLE_HIDDEN = "inset(-25% 100% -25% -2%)";
const TITLE_SHOWN = "inset(-25% -4% -25% -2%)";

/**
 * Hiệu ứng khi cuộn tới, mỗi phần chỉ chạy một lần. Các component chỉ cần gắn data attribute:
 * data-reveal-title (lộ chữ từng dòng), data-reveal-sheet="góc xoay" (tờ giấy được dán xuống),
 * data-reveal-group="độ trễ" + data-reveal-item (các dòng hiện lần lượt), data-reveal-ticks (tự vẽ dấu tick).
 * Trạng thái ẩn do JS đặt, nên không có JS hoặc khi giảm chuyển động thì nội dung vẫn hiện đầy đủ.
 */
export default function ScrollReveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-title]").forEach((title) => {
        const lines = title.querySelectorAll(":scope > span");
        gsap.fromTo(lines.length ? lines : title, { clipPath: TITLE_HIDDEN }, {
          clipPath: TITLE_SHOWN,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: title, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-sheet]").forEach((sheet) => {
        gsap.from(sheet, {
          autoAlpha: 0,
          y: 48,
          rotation: Number(sheet.dataset.revealSheet),
          duration: 0.6,
          ease: "back.out(1.5)",
          clearProps: "opacity,visibility,transform",
          scrollTrigger: { trigger: sheet, start: "top 84%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        const delay = Number(group.dataset.revealGroup) || 0;
        const scrollTrigger = { trigger: group, start: "top 88%", once: true };

        gsap.from(items, {
          autoAlpha: 0,
          y: 14,
          duration: 0.4,
          delay,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
          scrollTrigger,
        });

        // Dấu tick vẽ bằng ::before, nên điều khiển qua biến CSS.
        if (group.hasAttribute("data-reveal-ticks")) {
          gsap.fromTo(
            items,
            { "--tick-hide": "100%" },
            { "--tick-hide": "0%", duration: 0.28, delay: delay + 0.15, stagger: 0.08, ease: "power2.out", scrollTrigger },
          );
        }
      });

      // Câu đang mở sẵn ở FAQ: tick tự vẽ khi danh sách hiện ra.
      gsap.fromTo(
        "#faq details[open] [data-tick]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.35,
          delay: 0.25,
          ease: "power2.out",
          clearProps: "strokeDashoffset",
          scrollTrigger: { trigger: "#faq details", start: "top 88%", once: true },
        },
      );
    });

    return () => mm.revert();
  });

  return null;
}
