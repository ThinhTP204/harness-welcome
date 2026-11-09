"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMMITMENTS, REGISTER_STEPS } from "@/lib/content";
import { BACKGROUNDS, validateRegistration, type RegistrationErrors } from "@/lib/registration";
import Tear from "./Tear";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Status = "idle" | "sending" | "done";

const SECTION_BASE = "relative pt-[clamp(84px,8vw,124px)] px-(--gutter) pb-[clamp(88px,8vw,124px)] overflow-x-clip scroll-mt-(--header-h) bg-yellow";
const SECTION_GRAIN = "before:content-[''] before:absolute before:inset-0 before:[background:url('/hero/grain.webp')_0_0/500px] before:opacity-40 before:pointer-events-none";
const SECTION = `${SECTION_BASE} ${SECTION_GRAIN}`;
const INNER = "relative grid gap-[28px] max-w-[1440px] mx-auto lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-[clamp(40px,5vw,88px)]";
const TITLE = "font-mega text-[clamp(34px,11.2vw,84px)] font-normal leading-[1.12] lg:text-[clamp(44px,4.6vw,72px)]";
const LEDE = "max-w-[50ch] mt-[12px] text-[clamp(17px,1.35vw,20px)] font-medium leading-[1.5] text-pretty";
const PROMISE_TITLE = "mt-[20px] pt-[12px] border-t-[1.5px] border-t-ink font-display text-[24px] font-extrabold leading-[1.1]";
const PROMISE_ITEM = "relative pl-[22px] font-medium leading-[1.4] text-pretty";
const PROMISE_TICK = "before:content-[''] before:[clip-path:inset(var(--tick-hide,0%)_0_0_0)] before:absolute before:top-[0.3em] before:left-[2px] before:w-[7px] before:h-[11px] before:border-r-[2.5px] before:border-b-[2.5px] before:border-ink before:[transform:rotate(40deg)]";

// Tờ form
const SHEET_BASE = "relative [align-self:start] pt-[clamp(28px,3vw,44px)] px-[clamp(20px,3vw,44px)] pb-[clamp(22px,2.4vw,34px)] bg-paper [box-shadow:0_14px_24px_rgb(18_62_70/22%)]";
const SHEET_TAPE = "before:content-[''] before:absolute before:top-[-14px] before:left-[50%] before:w-[124px] before:h-[30px] before:bg-[rgb(245_191_97/88%)] before:[box-shadow:0_1px_2px_rgb(18_62_70/18%)] before:[transform:translateX(-50%)_rotate(-2deg)]";
const SHEET = `${SHEET_BASE} ${SHEET_TAPE}`;
const FORM = "grid gap-[16px] sm:grid-cols-[1fr_1fr] sm:gap-x-[20px]";
const CONTROL = "w-full min-h-[50px] py-[10px] px-[14px] border-[1.5px] border-ink rounded-[11px_14px_10px_15px/14px_10px_15px_11px] bg-[#fffdf8] text-ink aria-[invalid=true]:border-coral-deep aria-[invalid=true]:[box-shadow:inset_0_0_0_1px_var(--color-coral-deep)]";
const ERROR = "text-[#b3231a] text-[14.5px] font-semibold leading-[1.35]";
const SUBMIT_BASE = "min-h-[52px] py-[12px] px-[40px] rounded-[13px_17px_12px_18px/17px_12px_18px_13px] bg-coral-deep text-paper font-bold cursor-pointer [transition:transform_0.16s_ease,box-shadow_0.16s_ease]";
const SUBMIT_STATES = "disabled:opacity-70 disabled:cursor-progress not-disabled:hover:[transform:translateY(-2px)] not-disabled:hover:[box-shadow:0_8px_16px_rgb(18_62_70/22%)]";
const SUBMIT = `${SUBMIT_BASE} ${SUBMIT_STATES}`;
const FAILURE = "col-span-full py-[10px] px-[14px] bg-[color-mix(in_srgb,var(--color-coral)_18%,var(--color-paper))] text-[#8f1b14] font-semibold";

// Xác nhận sau khi gửi
const DONE_TICK = "stroke-coral-deep stroke-[5] [stroke-dasharray:1] animate-draw-tick motion-reduce:animate-none";
const DONE_TITLE = "font-display text-[clamp(30px,3vw,44px)] font-extrabold leading-[1.1] wrap-anywhere";

// Các bước sau khi đăng ký
const AFTER = "relative max-w-[1440px] mt-[clamp(40px,4vw,60px)] mx-auto pt-[18px] border-t-[1.5px] border-t-ink";
const AFTER_TITLE = "mb-[20px] font-mega text-[clamp(32px,3.2vw,48px)] font-normal leading-[1.15]";
const STEP_LINE = "absolute top-[24px] bottom-[44px] left-[22px] w-[4px] bg-[rgb(18_62_70/22%)] min-[900px]:top-[22px] min-[900px]:right-[10%] min-[900px]:bottom-auto min-[900px]:left-[10%] min-[900px]:w-auto min-[900px]:h-[4px]";
const STEP_FILL = "block w-full h-full bg-coral-deep origin-[center_top] min-[900px]:origin-[left_center]";
const STEPS = "relative grid gap-[18px] min-[900px]:grid-cols-[repeat(5,minmax(0,1fr))] min-[900px]:gap-[clamp(14px,2vw,32px)]";
const STEP = "grid grid-cols-[48px_minmax(0,1fr)] [align-content:start] [align-items:start] gap-[14px] min-[900px]:grid-cols-[minmax(0,1fr)] min-[900px]:justify-items-center min-[900px]:gap-[10px] min-[900px]:text-center";
const MARK = "grid place-items-center w-[48px] h-[48px] rounded-[46%_54%_42%_58%/56%_44%_58%_42%] bg-ink text-yellow font-mega text-[24px] leading-[1] [li:last-child_&]:bg-coral-deep [li:last-child_&]:text-paper";
const STEP_TITLE = "font-display text-[clamp(23px,1.9vw,28px)] font-extrabold leading-[1.15]";
const STEP_DETAIL = "mt-[3px] text-[clamp(16px,1.2vw,18px)] font-medium leading-[1.38] text-pretty";

interface FieldProps {
  name: keyof RegistrationErrors;
  label: string;
  error?: string;
  children: (control: { id: string; name: string; "aria-invalid": true | undefined; "aria-describedby": string | undefined }) => ReactNode;
}

function Field({ name, label, error, children }: FieldProps) {
  const id = `register-${name}`;
  return (
    <div className="grid gap-[5px]">
      <label className="font-semibold" htmlFor={id}>{label}</label>
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined })}
      {error ? (
        <p id={`${id}-error`} className={ERROR}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Register() {
  const steps = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [failure, setFailure] = useState("");
  const [saved, setSaved] = useState({ name: "", email: "" });

  // Đường nối chạy theo cuộn: ngang trên màn rộng, dọc trên điện thoại.
  useGSAP(
    () => {
      const mm = gsap.matchMedia(steps);
      const animate = (axis: "scaleX" | "scaleY") => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: steps.current, start: "top 82%", end: "clamp(bottom 62%)", scrub: 0.4 },
        });
        timeline.fromTo("[data-step-fill]", { [axis]: 0 }, { [axis]: 1, duration: 1 }, 0);
        timeline.fromTo("[data-step-mark]", { scale: 0.6 }, { scale: 1, duration: 0.2, stagger: 0.2 }, 0);
      };
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => animate("scaleX"));
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 899px)", () => animate("scaleY"));
      return () => mm.revert();
    },
    { scope: steps },
  );

  const showErrors = (next: RegistrationErrors) => {
    setErrors(next);
    // Đợi React vẽ lại rồi mới đưa con trỏ tới ô sai đầu tiên.
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setFailure("");

    const data = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(data), commitment: data.get("commitment") === "on" };
    const { value, errors: found } = validateRegistration(payload);
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setSaved({ name: value.fullName, email: value.email });
        setStatus("done");
        requestAnimationFrame(() => confirmation.current?.focus());
        return;
      }
      const result = (await response.json().catch(() => ({}))) as { errors?: RegistrationErrors };
      setStatus("idle");
      if (result.errors) showErrors(result.errors);
      else setFailure("Chưa gửi được đăng ký. Thử lại sau ít phút.");
    } catch {
      setStatus("idle");
      setFailure("Chưa gửi được đăng ký. Kiểm tra kết nối mạng rồi thử lại.");
    }
  };

  return (
    <section id="register" className={SECTION} aria-labelledby="register-title">
      <Tear edge="top" tone="paper" />
      <Tear edge="bottom" tone="paper" />

      <div className={INNER}>
        <div>
          <h2 id="register-title" className={TITLE} data-reveal-title>
            <span className="block">Đăng ký</span> <span className="block">tham gia khóa học.</span>
          </h2>
          <p className={LEDE}>
            Khóa học dự kiến diễn ra trong tuần 12–13, học kỳ FA26. Lịch chính thức được gửi qua email sau khi xét đăng ký.
          </p>

          <p className={PROMISE_TITLE}>Khi đăng ký, bạn cam kết:</p>
          <ul className="grid gap-[6px] mt-[8px]" data-reveal-group data-reveal-ticks>
            {COMMITMENTS.map((item) => (
              <li key={item} className={`${PROMISE_ITEM} ${PROMISE_TICK}`} data-reveal-item>{item}</li>
            ))}
          </ul>
        </div>

        <div className={SHEET} data-reveal-sheet="2.5">
          {status === "done" ? (
            <div ref={confirmation} className="grid justify-items-start gap-[8px] py-[12px] outline-none" tabIndex={-1} role="status">
              <svg className="w-[56px] h-[56px] overflow-visible fill-none stroke-ink stroke-[3]" viewBox="-4 -34 52 52" aria-hidden="true">
                <rect x="0" y="-28" width="40" height="40" rx="2" />
                <path className={DONE_TICK} d="M7 -9 L18 2 L40 -28" pathLength={1} />
              </svg>
              <h3 className={DONE_TITLE}>Đã nhận đăng ký của {saved.name}.</h3>
              <p className="text-[18px] leading-[1.45] wrap-anywhere">Ban tổ chức sẽ gửi kết quả và lịch chính thức tới {saved.email}.</p>
            </div>
          ) : (
            <form ref={form} className={FORM} onSubmit={submit} noValidate>
              <Field name="fullName" label="Họ và tên" error={errors.fullName}>
                {(control) => <input {...control} className={CONTROL} type="text" autoComplete="name" maxLength={100} />}
              </Field>
              <Field name="studentId" label="MSSV" error={errors.studentId}>
                {(control) => <input {...control} className={CONTROL} type="text" autoComplete="off" autoCapitalize="characters" maxLength={20} />}
              </Field>
              <Field name="email" label="Email trường" error={errors.email}>
                {(control) => <input {...control} className={CONTROL} type="email" autoComplete="email" inputMode="email" maxLength={120} />}
              </Field>
              <Field name="major" label="Ngành học" error={errors.major}>
                {(control) => <input {...control} className={CONTROL} type="text" autoComplete="off" maxLength={100} />}
              </Field>
              <div className="col-span-full">
                <Field name="background" label="Trình độ lập trình hiện tại" error={errors.background}>
                  {(control) => (
                    <select {...control} className={CONTROL} defaultValue="">
                      <option value="" disabled>
                        Chọn mức gần với bạn nhất
                      </option>
                      {BACKGROUNDS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              </div>

              <div className="col-span-full absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="register-website">Website</label>
                <input id="register-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="col-span-full">
                <label className="flex items-start gap-[12px] font-medium leading-[1.4] cursor-pointer">
                  <input
                    className="flex-none w-[24px] h-[24px] accent-coral-deep cursor-pointer"
                    type="checkbox"
                    name="commitment"
                    aria-invalid={errors.commitment ? true : undefined}
                    aria-describedby={errors.commitment ? "register-commitment-error" : undefined}
                  />
                  <span>Tôi đã đọc, hiểu và đồng ý với nội dung cam kết tham gia chương trình.</span>
                </label>
                {errors.commitment ? (
                  <p id="register-commitment-error" className={ERROR}>
                    {errors.commitment}
                  </p>
                ) : null}
              </div>

              <div className="col-span-full flex flex-wrap items-center gap-[12px_20px]">
                <button type="submit" className={SUBMIT} disabled={status === "sending"}>
                  {status === "sending" ? "Đang gửi..." : "Đăng ký"}
                </button>
                <p className="flex-[1_1_14em] text-[14.5px] leading-[1.4]">Thông tin chỉ dùng để xét đăng ký và liên hệ về khóa học.</p>
              </div>

              {failure ? (
                <p className={FAILURE} role="alert">
                  {failure}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>

      <div ref={steps} className={AFTER}>
        <h3 className={AFTER_TITLE}>Sau khi đăng ký</h3>
        <div className="relative">
          <div className={STEP_LINE} aria-hidden="true">
            <i className={STEP_FILL} data-step-fill />
          </div>
          <ol className={STEPS}>
            {REGISTER_STEPS.map((step, index) => (
              <li key={step.title} className={STEP}>
                <span className={MARK} data-step-mark aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <p className={STEP_TITLE}>{step.title}</p>
                  <p className={STEP_DETAIL}>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
