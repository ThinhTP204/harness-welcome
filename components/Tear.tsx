const TEAR =
  "[--h:clamp(64px,7vw,112px)] absolute z-3 left-[-4%] w-[108%] h-(--h) pointer-events-none " +
  // Chỉ giữ mép hướng vào section; mép còn lại trùng màu nền nên cắt bỏ để không lộ bóng.
  "data-[edge=top]:top-[calc(var(--h)*-0.55)] data-[edge=top]:[filter:drop-shadow(0_3px_0_#fff)_drop-shadow(0_6px_8px_rgb(18_62_70/22%))] data-[edge=top]:[clip-path:inset(45%_-5%_-40%_-5%)] " +
  "data-[edge=bottom]:bottom-[calc(var(--h)*-0.55)] data-[edge=bottom]:[filter:drop-shadow(0_-3px_0_#fff)_drop-shadow(0_-6px_8px_rgb(18_62_70/22%))] data-[edge=bottom]:[clip-path:inset(-40%_-5%_45%_-5%)]";

const SHEET =
  "relative w-full h-full [mask:url('/hero/shapes/torn_paper.svg')_center/100%_100%] " +
  "data-[tone=lavender]:bg-lavender " +
  "data-[tone=paper]:[background:var(--color-paper)_url('/hero/paper.webp')_center/cover] " +
  "data-[tone=paper]:before:content-[''] data-[tone=paper]:before:absolute data-[tone=paper]:before:inset-0 data-[tone=paper]:before:[background:url('/hero/grain.webp')_0_0/500px] data-[tone=paper]:before:opacity-50";

type TearProps = {
  edge: "top" | "bottom";
  /** Màu của section nằm bên kia mép giấy. */
  tone: "paper" | "lavender";
};

/** Mép giấy xé nối hai section có màu nền khác nhau. Section chứa nó cần position: relative. */
export default function Tear({ edge, tone }: TearProps) {
  return (
    <div className={TEAR} data-edge={edge} aria-hidden="true">
      <div className={SHEET} data-tone={tone} />
    </div>
  );
}
