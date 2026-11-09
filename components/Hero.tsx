import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { OUTCOMES } from "@/lib/content";
import styles from "./Hero.module.css";

type PlaneProps = { z: number; pointer: number; scroll: number; children: ReactNode };

/** Ba lớp transform tách biệt để parallax con trỏ, parallax cuộn và on-load không ghi đè nhau. */
function Plane({ z, pointer, scroll, children }: PlaneProps) {
  return (
    <div className={styles.plane} style={{ zIndex: z } as CSSProperties} data-pointer-depth={pointer}>
      <div className={styles.planeInner} data-scroll-depth={scroll}>
        <div className={styles.planeInner} data-anim="collage">
          {children}
        </div>
      </div>
    </div>
  );
}

function Shape({ name, className }: { name: string; className: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/hero/shapes/${name}.svg`} alt="" className={`${styles.piece} ${className}`} />;
}

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" data-hero>
      <div className={styles.lead}>
        <p className={styles.mega}>
          <span className={`${styles.paper} ${styles.paperCoral}`} data-anim="mega">
            <span className={styles.megaText}>AI-SE</span>
          </span>{" "}
          <span className={`${styles.paper} ${styles.paperYellow}`} data-anim="mega">
            <span className={styles.megaText}>FA26</span>
          </span>
        </p>

        <h1 id="hero-title" className={styles.headline}>
          <span data-anim="line">XÂY PHẦN MỀM</span>{" "}
          <span data-anim="line">CÙNG AI,</span>{" "}
          <span className={styles.highlight}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/shapes/brush_lavender.svg" alt="" className={styles.brush} data-anim="brush" />
            <span data-anim="line">LÀM CHỦ</span>{" "}
            <span data-anim="line">CHẤT LƯỢNG.</span>
          </span>
        </h1>

        <p className={styles.intro} data-anim="support">
          Khóa học thực chiến dành cho sinh viên IT, giúp bạn đưa AI vào toàn bộ quy trình phát triển phần mềm — từ
          phân tích yêu cầu, thiết kế, lập trình và kiểm thử đến triển khai, với tư duy kỹ sư và trách nhiệm về chất
          lượng.
        </p>

        <div className={styles.actions} data-anim="support">
          <a className={`${styles.button} ${styles.primary}`} href="#overview">
            Khám phá khóa học
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a className={`${styles.button} ${styles.secondary}`} href="#curriculum">
            Xem chương trình
          </a>
        </div>
      </div>

      <div className={styles.montage}>
        <Plane z={1} pointer={4} scroll={24}>
          <div className={`${styles.piece} ${styles.skyRight}`}>
            <Image src="/hero/sky.jpg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className={`${styles.piece} ${styles.campusRight}`}>
            <Image src="/hero/campus.jpg" alt="" fill sizes="(min-width: 1024px) 30vw, 60vw" />
          </div>
          <div className={`${styles.piece} ${styles.skyLeft} ${styles.desktopOnly}`}>
            <Image src="/hero/sky.jpg" alt="" fill loading="eager" sizes="10vw" />
          </div>
          <div className={`${styles.piece} ${styles.campusLeft} ${styles.desktopOnly}`}>
            <Image src="/hero/campus.jpg" alt="" fill sizes="30vw" />
          </div>
        </Plane>

        <Plane z={2} pointer={8} scroll={48}>
          <Shape name="torn_orange" className={styles.tornOrange} />
          <Shape name="torn_teal" className={styles.tornTeal} />
          <Shape name="halftone_orange" className={styles.halftone} />
          <Shape name="torn_yellow" className={`${styles.tornYellow} ${styles.desktopOnly}`} />
        </Plane>

        <Plane z={3} pointer={12} scroll={72}>
          <div className={`${styles.piece} ${styles.students}`}>
            <Image
              src="/hero/students.png"
              alt="Ba sinh viên cùng nhìn vào một chiếc laptop và cười (ảnh minh họa)"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <Shape name="torn_yellow" className={styles.tornYellowFront} />
          <div className={`${styles.piece} ${styles.ground}`} />
          <Shape name="torn_coral" className={`${styles.tornCoral} ${styles.desktopOnly}`} />
          <Shape name="torn_lavender" className={`${styles.tornLavender} ${styles.desktopOnly}`} />
        </Plane>

        <Plane z={4} pointer={14} scroll={96}>
          <Shape name="corner_sunburst" className={styles.sunburst} />
          <div className={`${styles.piece} ${styles.chalkboard}`} data-anim="note">
            <Image src="/hero/chalkboard.png" alt="Bảng phấn ghi plan, build, test, deploy" fill sizes="240px" />
          </div>
          <div className={`${styles.piece} ${styles.checklist}`} data-anim="note">
            <Image
              src="/hero/checklist.png"
              alt="Giấy ghi chú liệt kê Requirements, Design, Implementation, Testing, Deployment"
              fill
              sizes="210px"
            />
          </div>
          <Shape name="red_arrow" className={`${styles.arrow} ${styles.desktopOnly}`} />
        </Plane>
      </div>

      <ul className={styles.outcomes} data-anim="support">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.icon} className={styles.outcome}>
            <span className={styles.blob} data-tint={outcome.tint}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/hero/icons/${outcome.icon}.svg`} alt="" width={30} height={27} />
            </span>
            <span className={styles.outcomeLabel}>
              <span>{outcome.lines[0]}</span> <span>{outcome.lines[1]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
