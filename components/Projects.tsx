import Lifecycle from "./Lifecycle";
import Tear from "./Tear";

const GRAIN = "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-40 before:pointer-events-none";
const SECTION = `relative px-(--gutter) pt-[clamp(64px,6vw,96px)] pb-[clamp(72px,7vw,108px)] overflow-x-clip scroll-mt-(--header-h) bg-lavender ${GRAIN}`;
// Từ 1200px, cột lede hẹp lại để mỗi câu của tiêu đề nằm trọn một dòng.
const HEADER = "grid gap-[14px] mb-[12px] min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] min-[1200px]:[align-items:end] min-[1200px]:gap-[48px]";
const TITLE = "font-mega text-[clamp(42px,10.6vw,92px)] font-normal leading-[1.12] text-balance min-[1200px]:text-[clamp(52px,4.3vw,72px)]";
const LEDE = "max-w-[50ch] text-[clamp(17px,1.35vw,20px)] leading-[1.55] text-pretty";

export default function Projects() {
  return (
    <section id="projects" className={SECTION} aria-labelledby="projects-title">
      <Tear edge="bottom" tone="paper" />

      <div className="relative max-w-[1440px] mx-auto">
        <div className={HEADER}>
          <h2 id="projects-title" className={TITLE} data-reveal-title>
            <span className="block">Demo chạy được chưa đủ.</span> <span className="block">Bạn phải chứng minh nó đúng.</span>
          </h2>
          <p className={LEDE}>
            Cùng một User Story đi qua sáu chặng. Ở mỗi chặng, AI hỗ trợ, bạn kiểm chứng, và hồ sơ của bạn dày thêm. Cuối vòng là
            Demo Day.
          </p>
        </div>

        <Lifecycle />
      </div>
    </section>
  );
}
