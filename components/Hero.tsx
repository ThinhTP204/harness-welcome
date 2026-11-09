import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { OUTCOMES } from "@/lib/content";

const PAPER_BG = "[background:var(--color-paper)_url('/hero/paper.webp')_center/cover]";
const GRAIN =
  "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-50";

// Desktop: chữ bên trái, collage tràn ra toàn hero phía sau.
// Khoảng 1024-1279: chữ 16px chiếm tỉ lệ lớn hơn, nên nới cột chữ về bên trái (giá trị ở lg:, xl: trả về giá trị desktop).
const HERO = `relative flex flex-col pt-22 overflow-clip ${PAPER_BG} ${GRAIN} before:pointer-events-none lg:min-h-[max(100svh,calc(800*var(--u)))] lg:pt-(--header-h)`;

const LEAD =
  "relative z-5 px-(--gutter) " +
  "lg:flex-1 lg:grid lg:grid-cols-[calc(452*var(--u))_minmax(0,calc(340*var(--u)))] lg:content-center lg:[align-items:start] lg:w-[calc(1440*var(--u))] lg:max-w-full lg:mx-auto lg:pt-[calc(8*var(--u))] lg:pr-0 lg:pl-[calc(30*var(--u))]";

const MEGA =
  "flex flex-col items-start font-mega text-[clamp(100px,27vw,150px)] leading-none " +
  "md:flex-row md:items-center md:text-[15vw] " +
  "lg:flex-col lg:items-start lg:col-1 lg:row-1 lg:text-[clamp(100px,11vw,190px)]";

const PAPER =
  "relative inline-block isolate before:content-[''] before:absolute before:inset-0 before:-z-1 after:content-[''] after:absolute after:inset-0 after:-z-1";

const PAPER_CORAL =
  "p-[0.12em_0.26em_0.16em_0.22em] text-paper [transform:rotate(-5deg)] " +
  "before:[background:url('/hero/shapes/torn_coral.svg')_center/100%_100%] before:[filter:drop-shadow(2px_3px_0_#fff)] " +
  "after:[background:url('/hero/grain.webp')_0_0/420px] after:mix-blend-multiply after:[mask:url('/hero/shapes/torn_coral.svg')_center/100%_100%]";

const PAPER_YELLOW =
  "mt-[-0.2em] ml-[0.42em] p-[0.08em_0.3em_0.12em_0.26em] text-ink [transform:rotate(-6deg)] " +
  "before:[background:url('/hero/shapes/torn_yellow.svg')_center/100%_100%] before:[filter:drop-shadow(2px_3px_0_#fff)] " +
  "after:[background:url('/hero/grain.webp')_120px_80px/420px] after:mix-blend-multiply after:[mask:url('/hero/shapes/torn_yellow.svg')_center/100%_100%] " +
  "md:mt-[0.3em] md:ml-[-0.1em] " +
  "lg:mt-[-0.2em] lg:ml-[0.5em] lg:text-[max(100px,0.82em)]";

const MEGA_TEXT = "block [transform:scaleX(1.08)_skewX(-5deg)] origin-left";

const HEADLINE =
  "mt-7 font-display text-[clamp(38px,10.4vw,52px)] font-extrabold leading-[1.12] [transform:rotate(-2deg)] origin-top-left " +
  "md:text-[54px] " +
  "lg:col-2 lg:row-1 lg:mt-[calc(14*var(--u))] lg:text-[clamp(34px,3.3vw,58px)]";

const INTRO =
  "max-w-[58ch] mt-[22px] text-[18px] leading-[1.5] text-pretty " +
  "lg:col-[1/3] lg:row-2 lg:max-w-[440px] lg:mt-[10px] lg:ml-[calc(110*var(--u))] lg:text-[clamp(18px,calc(20*var(--u)),28px)] lg:leading-[1.42] " +
  "xl:max-w-[calc(470*var(--u)+24px)] xl:mt-[calc(-14*var(--u))] xl:ml-[calc(215*var(--u))]";

const ACTIONS =
  "flex flex-wrap gap-4 mt-[22px] " +
  "lg:col-[1/3] lg:row-3 lg:mt-[calc(18*var(--u))] lg:ml-[calc(110*var(--u))] " +
  "xl:ml-[calc(215*var(--u))]";

const BUTTON =
  "group inline-flex items-center justify-center gap-[10px] min-h-13 py-3 px-[26px] rounded-[13px_17px_12px_18px/17px_12px_18px_13px] font-semibold whitespace-nowrap [transition:transform_0.18s_ease,box-shadow_0.18s_ease] " +
  "hover:[transform:translateY(-2px)] hover:[box-shadow:0_8px_16px_rgb(18_62_70/22%)]";

// Collage: mobile và tablet là một khối ảnh riêng, được dàn lại chứ không thu nhỏ từ desktop.
const MONTAGE =
  "relative w-full max-w-[640px] aspect-[1/1.24] mt-7 mx-auto " +
  "lg:absolute lg:inset-0 lg:max-w-none lg:aspect-auto lg:m-0";

const LAYER = "absolute inset-0";
const DESKTOP_ONLY = "hidden lg:block";

const SKY_RIGHT =
  "absolute inset-[2%_0_26%_0] [clip-path:polygon(0_5%,18%_0,46%_4%,74%_0,100%_3%,100%_90%,76%_96%,52%_91%,24%_100%,0_93%)] " +
  "lg:inset-[-20px_-24px_auto_calc(50%+190*var(--u))] lg:h-[calc(560*var(--u))] lg:[clip-path:polygon(16%_8%,42%_0,100%_0,100%_86%,74%_93%,40%_100%,7%_80%,2%_44%)]";

const CAMPUS_RIGHT =
  "absolute top-[24%] right-0 w-[26%] h-[26%] [clip-path:polygon(14%_4%,100%_0,100%_100%,8%_94%)] " +
  "lg:top-[calc(88*var(--u))] lg:right-[-24px] lg:left-[calc(50%+612*var(--u))] lg:w-auto lg:h-[calc(270*var(--u))]";

const SKY_LEFT =
  "absolute lg:top-[calc(116*var(--u))] lg:left-[-24px] lg:w-[calc(120*var(--u))] lg:h-[calc(130*var(--u))] lg:[clip-path:polygon(0_8%,100%_0,78%_96%,0_100%)]";

const CAMPUS_LEFT =
  "absolute lg:bottom-[-24px] lg:left-[-24px] lg:w-[calc(392*var(--u))] lg:h-[calc(335*var(--u))] lg:[clip-path:polygon(0_0,30%_12%,62%_34%,100%_78%,86%_100%,0_100%)]";

const TORN_ORANGE =
  "top-[-1%] left-[34%] w-[40%] h-[7%] [transform:rotate(-10deg)] " +
  "lg:top-[calc(-34*var(--u))] lg:left-[calc(50%+232*var(--u))] lg:w-[calc(250*var(--u))] lg:h-[calc(84*var(--u))] lg:[transform:rotate(-16deg)]";

const TORN_TEAL =
  "top-[56%] left-[-6%] w-[34%] h-[12%] [transform:rotate(-12deg)] " +
  "lg:top-auto lg:bottom-[calc(322*var(--u))] lg:left-[calc(50%+372*var(--u))] lg:w-[calc(250*var(--u))] lg:h-[calc(120*var(--u))] lg:[transform:rotate(10deg)]";

const TORN_YELLOW =
  "right-[-6%] bottom-[12%] w-[54%] h-[11%] [transform:rotate(-7deg)] " +
  "lg:right-[calc(-30*var(--u))] lg:bottom-[calc(150*var(--u))] lg:w-[calc(420*var(--u))] lg:h-[calc(92*var(--u))] lg:[transform:rotate(-8deg)]";

const HALFTONE =
  "right-0 bottom-[5%] w-1/2 h-[13%] " +
  "lg:bottom-[calc(165*var(--u))] lg:w-[calc(320*var(--u))] lg:h-[calc(120*var(--u))]";

const STUDENTS =
  "absolute right-0 bottom-[5%] w-full aspect-[949/1085] " +
  "lg:right-auto lg:bottom-[calc(150*var(--u))] lg:left-[calc(50%+18*var(--u))] lg:w-[calc(478*var(--u))]";

const TORN_YELLOW_FRONT =
  "left-[-5%] bottom-[6%] w-[34%] h-[8%] [transform:rotate(-16deg)] " +
  "lg:bottom-[calc(130*var(--u))] lg:left-[calc(50%+6*var(--u))] lg:w-[calc(112*var(--u))] lg:h-[calc(58*var(--u))]";

// Cùng độ grain với nền hero để dải giấy không lộ thành mảng sáng hơn.
const GROUND =
  `absolute left-[-3%] right-[-3%] bottom-[-2%] w-[106%] max-w-none h-[10%] ${PAPER_BG} [mask:url('/hero/shapes/torn_paper.svg')_center/100%_100%] ${GRAIN} ` +
  "lg:bottom-[calc(-40*var(--u))] lg:left-[calc(50%-340*var(--u))] lg:right-[-30px] lg:w-auto lg:h-[calc(205*var(--u))]";

const TORN_CORAL =
  "lg:bottom-[calc(-34*var(--u))] lg:left-[calc(-46*var(--u))] lg:w-[calc(240*var(--u))] lg:h-[calc(150*var(--u))] lg:[transform:rotate(-20deg)]";

const TORN_LAVENDER =
  "lg:right-[calc(-44*var(--u))] lg:bottom-[calc(-36*var(--u))] lg:w-[calc(180*var(--u))] lg:h-[calc(100*var(--u))] lg:[transform:rotate(-12deg)]";

const SUNBURST =
  "top-[4%] left-[27%] w-[11%] [transform:rotate(-24deg)] " +
  "lg:top-auto lg:bottom-[calc(665*var(--u))] lg:left-[calc(50%+84*var(--u))] lg:w-[calc(62*var(--u))] lg:[transform:none]";

const CHALKBOARD =
  "absolute top-[1%] left-[2%] w-[26%] aspect-[525/528] " +
  "lg:top-auto lg:bottom-[calc(520*var(--u))] lg:left-[calc(50%+372*var(--u))] lg:w-[calc(232*var(--u))]";

const CHECKLIST =
  "absolute top-[7%] right-[2%] w-[26%] aspect-[495/534] " +
  "lg:top-auto lg:right-auto lg:bottom-[calc(268*var(--u))] lg:left-[calc(50%+492*var(--u))] lg:w-[calc(212*var(--u))]";

const ARROW =
  "lg:right-[calc(50%-668*var(--u))] lg:bottom-[calc(48*var(--u))] lg:w-[calc(150*var(--u))] lg:[transform:rotate(-14deg)]";

// Lợi ích
const OUTCOMES_LIST =
  "relative z-5 grid grid-cols-[1fr_1fr] gap-x-4 gap-y-5 pt-3 px-(--gutter) pb-8 " +
  "md:grid-cols-[repeat(4,1fr)] " +
  "lg:grid-cols-[repeat(4,auto)] lg:[justify-content:start] lg:gap-0 lg:w-[calc(1440*var(--u))] lg:max-w-full lg:mx-auto lg:pt-[calc(18*var(--u))] lg:pr-[calc(120*var(--u))] lg:pb-[calc(26*var(--u))] lg:pl-[calc(376*var(--u))] " +
  "xl:pr-[calc(210*var(--u))] xl:pl-[calc(385*var(--u))]";

const OUTCOME =
  "flex flex-col items-start gap-2 " +
  "lg:px-4 lg:border-l lg:border-l-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] lg:first:pl-0 lg:first:border-l-0 " +
  "xl:px-[calc(30*var(--u))]";

const BLOB =
  "flex-none grid place-items-center w-12 h-11 rounded-[46%_54%_42%_58%/56%_44%_58%_42%] " +
  "data-[tint=coral]:bg-[color-mix(in_srgb,var(--color-coral)_42%,var(--color-paper))] data-[tint=yellow]:bg-yellow data-[tint=lavender]:bg-lavender data-[tint=teal]:bg-[color-mix(in_srgb,var(--color-teal)_55%,var(--color-paper))]";

const OUTCOME_LINE = "block lg:whitespace-nowrap xl:whitespace-normal";

type PlaneProps = { z: number; pointer: number; scroll: number; children: ReactNode };

/** Ba lớp transform tách biệt để parallax con trỏ, parallax cuộn và on-load không ghi đè nhau. */
function Plane({ z, pointer, scroll, children }: PlaneProps) {
  return (
    <div className={`${LAYER} pointer-events-none will-change-transform`} style={{ zIndex: z } as CSSProperties} data-pointer-depth={pointer}>
      <div className={LAYER} data-scroll-depth={scroll}>
        <div className={LAYER} data-anim="collage">
          {children}
        </div>
      </div>
    </div>
  );
}

function Shape({ name, className }: { name: string; className: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/hero/shapes/${name}.svg`} alt="" className={`absolute ${className}`} />;
}

export default function Hero() {
  return (
    <section id="top" className={HERO} aria-labelledby="hero-title" data-hero>
      <div className={LEAD}>
        <p className={MEGA}>
          <span className={`${PAPER} ${PAPER_CORAL}`} data-anim="mega">
            <span className={MEGA_TEXT}>AI-SE</span>
          </span>{" "}
          <span className={`${PAPER} ${PAPER_YELLOW}`} data-anim="mega">
            <span className={MEGA_TEXT}>FA26</span>
          </span>
        </p>

        <h1 id="hero-title" className={HEADLINE}>
          <span className="block" data-anim="line">XÂY PHẦN MỀM</span>{" "}
          <span className="block" data-anim="line">CÙNG AI,</span>{" "}
          <span className="relative inline-block isolate mt-[0.12em] p-[0.14em_0.34em_0.16em_0.1em]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/shapes/brush_lavender.svg"
              alt=""
              className="absolute -z-1 top-[-26%] left-[-7%] w-[114%] h-[170%] max-w-none"
              data-anim="brush"
            />
            <span className="block" data-anim="line">LÀM CHỦ</span>{" "}
            <span className="block" data-anim="line">CHẤT LƯỢNG.</span>
          </span>
        </h1>

        <p className={INTRO} data-anim="support">
          Khóa học thực chiến dành cho sinh viên IT, giúp bạn đưa AI vào toàn bộ quy trình phát triển phần mềm — từ
          phân tích yêu cầu, thiết kế, lập trình và kiểm thử đến triển khai, với tư duy kỹ sư và trách nhiệm về chất
          lượng.
        </p>

        <div className={ACTIONS} data-anim="support">
          <a className={`${BUTTON} bg-coral-deep text-paper`} href="#overview">
            Khám phá khóa học
            <svg
              className="[transition:transform_0.18s_ease] group-hover:[transform:translate(4px,-4px)]"
              viewBox="0 0 16 16"
              width="15"
              height="15"
              aria-hidden="true"
            >
              <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            className={`${BUTTON} border-[1.5px] border-ink [background:color-mix(in_srgb,var(--color-paper)_85%,transparent)]`}
            href="#curriculum"
          >
            Xem chương trình
          </a>
        </div>
      </div>

      <div className={MONTAGE}>
        <Plane z={1} pointer={4} scroll={24}>
          <div className={SKY_RIGHT}>
            <Image className="object-cover" src="/hero/sky.jpg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className={CAMPUS_RIGHT}>
            <Image className="object-cover object-[100%_40%]" src="/hero/campus.jpg" alt="" fill sizes="(min-width: 1024px) 30vw, 60vw" />
          </div>
          <div className={`${SKY_LEFT} ${DESKTOP_ONLY}`}>
            <Image className="object-cover" src="/hero/sky.jpg" alt="" fill loading="eager" sizes="10vw" />
          </div>
          <div className={`${CAMPUS_LEFT} ${DESKTOP_ONLY}`}>
            <Image
              className="object-cover lg:object-[72%_100%] lg:[transform:scaleX(-1)]"
              src="/hero/campus.jpg"
              alt=""
              fill
              sizes="30vw"
            />
          </div>
        </Plane>

        <Plane z={2} pointer={8} scroll={48}>
          <Shape name="torn_orange" className={TORN_ORANGE} />
          <Shape name="torn_teal" className={TORN_TEAL} />
          <Shape name="halftone_orange" className={HALFTONE} />
          <Shape name="torn_yellow" className={`${TORN_YELLOW} ${DESKTOP_ONLY}`} />
        </Plane>

        <Plane z={3} pointer={12} scroll={72}>
          <div className={STUDENTS}>
            <Image
              className="object-cover"
              src="/hero/students.png"
              alt="Ba sinh viên cùng nhìn vào một chiếc laptop và cười (ảnh minh họa)"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <Shape name="torn_yellow" className={TORN_YELLOW_FRONT} />
          <div className={GROUND} />
          <Shape name="torn_coral" className={`${TORN_CORAL} ${DESKTOP_ONLY}`} />
          <Shape name="torn_lavender" className={`${TORN_LAVENDER} ${DESKTOP_ONLY}`} />
        </Plane>

        <Plane z={4} pointer={14} scroll={96}>
          <Shape name="corner_sunburst" className={SUNBURST} />
          <div className={CHALKBOARD} data-anim="note">
            <Image className="object-cover" src="/hero/chalkboard.png" alt="Bảng phấn ghi plan, build, test, deploy" fill sizes="240px" />
          </div>
          <div className={CHECKLIST} data-anim="note">
            <Image
              className="object-cover"
              src="/hero/checklist.png"
              alt="Giấy ghi chú liệt kê Requirements, Design, Implementation, Testing, Deployment"
              fill
              sizes="210px"
            />
          </div>
          <Shape name="red_arrow" className={`${ARROW} ${DESKTOP_ONLY}`} />
        </Plane>
      </div>

      <ul className={OUTCOMES_LIST} data-anim="support">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.icon} className={OUTCOME}>
            <span className={BLOB} data-tint={outcome.tint}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-7 h-auto" src={`/hero/icons/${outcome.icon}.svg`} alt="" width={30} height={27} />
            </span>
            <span className="text-[14px] font-medium leading-[1.35] lg:text-[clamp(14px,1.1vw,16px)]">
              <span className={OUTCOME_LINE}>{outcome.lines[0]}</span> <span className={OUTCOME_LINE}>{outcome.lines[1]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
