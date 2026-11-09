/**
 * Mô hình thuần của bánh xe vòng đời: trạng thái suy ra từ một số t chạy từ 0 đến TIMELINE,
 * hình học cũng tính sẵn ở đây. Cuộn xuống hay ngược lên đều cho đúng cùng một hình.
 */

export const TOTAL_BEATS = 6;

/** Dư ra một đoạn sau chặng cuối để bánh xe hoàn chỉnh đứng yên trước khi rời màn hình. */
export const TIMELINE = TOTAL_BEATS + 0.3;

/** Mốc trong một chặng: AI sai, bạn kiểm chứng, bằng chứng được ghi, rồi chuyển chặng. */
export const BEAT = { risk: 0.22, verify: 0.44, leaves: 0.6, done: 0.94, leave: 0.96 };

export type StageState = "idle" | "active" | "done";

export function stageStateAt(index: number, t: number): StageState {
  if (t < index) return "idle";
  return t - index >= BEAT.done ? "done" : "active";
}

export const doneAt = (t: number) => Array.from({ length: TOTAL_BEATS }, (_, i) => i).filter((i) => t - i >= BEAT.done).length;

/* Hình học, viewBox vuông 860. */
export const SIZE = 860;
export const CENTER = SIZE / 2;

export const RINGS = {
  outer: { out: 408, in: 296, text: 318, font: 28 },
  middle: { out: 286, in: 214, text: 250, font: 23 },
  inner: { out: 204, in: 142, text: 173, font: 20 },
};

/** Góc giữa của chặng: chặng đầu ở đỉnh, đi theo chiều kim đồng hồ. */
export const midAngle = (index: number) => -90 + (360 / TOTAL_BEATS) * index;

const round = (value: number) => Number(value.toFixed(2));

export function polar(radius: number, degrees: number): [number, number] {
  const angle = (degrees * Math.PI) / 180;
  return [round(CENTER + radius * Math.cos(angle)), round(CENTER + radius * Math.sin(angle))];
}

/** Sinh số giả ngẫu nhiên có hạt giống, để viền xé giống hệt nhau ở server và trình duyệt. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647 - 0.5;
  };
}

const toPath = (points: Array<[number, number]>) => `M${points.map(([x, y]) => `${x} ${y}`).join("L")}Z`;

/** Một mảnh hình mũi tên trên vành khăn, mép hơi răng cưa như giấy xé. */
export function chevron(index: number, ring: { out: number; in: number }, seed: number) {
  const noise = seeded(seed + index * 97 + 11);
  const mid = midAngle(index);
  const start = mid - 29;
  const end = mid + 29;
  const tip = 5;
  const steps = 22;
  const points: Array<[number, number]> = [];
  for (let step = 0; step <= steps; step += 1) points.push(polar(ring.out + noise() * 3, start + ((end - start) * step) / steps));
  points.push(polar((ring.out + ring.in) / 2, end + tip));
  for (let step = steps; step >= 0; step -= 1) points.push(polar(ring.in + noise() * 3, start + ((end - start) * step) / steps));
  points.push(polar((ring.out + ring.in) / 2, start + tip));
  return toPath(points);
}

/** Hình tròn mép xé. */
export function roughCircle(radius: number, seed: number, jitter = 3) {
  const noise = seeded(seed);
  const points: Array<[number, number]> = [];
  for (let degrees = 0; degrees < 360; degrees += 2.5) points.push(polar(radius + noise() * jitter, degrees));
  return toPath(points);
}

/** Cung để đặt chữ. Nửa dưới vẽ ngược chiều để chữ luôn đứng thẳng khi đọc. */
export function textArc(index: number, radius: number, font: number) {
  const mid = midAngle(index);
  const flip = Math.sin((mid * Math.PI) / 180) > 0.01;
  const baseline = flip ? radius + font * 0.35 : radius - font * 0.35;
  const span = 28;
  const [fromX, fromY] = polar(baseline, flip ? mid + span : mid - span);
  const [toX, toY] = polar(baseline, flip ? mid - span : mid + span);
  return `M${fromX} ${fromY}A${baseline} ${baseline} 0 0 ${flip ? 0 : 1} ${toX} ${toY}`;
}
