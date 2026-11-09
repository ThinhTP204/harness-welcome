import Lifecycle from "./Lifecycle";
import Tear from "./Tear";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <Tear edge="bottom" tone="paper" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="projects-title" className={styles.title}>
            <span>Demo chạy được chưa đủ.</span> <span>Bạn phải chứng minh nó đúng.</span>
          </h2>
          <p className={styles.lede}>
            Cùng một User Story đi qua sáu chặng. Ở mỗi chặng, AI hỗ trợ, bạn kiểm chứng, và hồ sơ của bạn dày thêm. Cuối vòng là
            Demo Day.
          </p>
        </div>

        <Lifecycle />
      </div>
    </section>
  );
}
