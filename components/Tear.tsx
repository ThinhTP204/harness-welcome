import styles from "./Tear.module.css";

type TearProps = {
  edge: "top" | "bottom";
  /** Màu của section nằm bên kia mép giấy. */
  tone: "paper" | "lavender";
};

/** Mép giấy xé nối hai section có màu nền khác nhau. Section chứa nó cần position: relative. */
export default function Tear({ edge, tone }: TearProps) {
  return (
    <div className={styles.tear} data-edge={edge} aria-hidden="true">
      <div className={styles.sheet} data-tone={tone} />
    </div>
  );
}
