"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { COMMITMENTS } from "@/lib/content";
import { BACKGROUNDS, validateRegistration, type RegistrationErrors } from "@/lib/registration";
import Tear from "./Tear";
import styles from "./Register.module.css";

type Status = "idle" | "sending" | "done";

interface FieldProps {
  name: keyof RegistrationErrors;
  label: string;
  error?: string;
  children: (control: { id: string; name: string; "aria-invalid": true | undefined; "aria-describedby": string | undefined }) => ReactNode;
}

function Field({ name, label, error, children }: FieldProps) {
  const id = `register-${name}`;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined })}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Register() {
  const form = useRef<HTMLFormElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [failure, setFailure] = useState("");
  const [saved, setSaved] = useState({ name: "", email: "" });

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
    <section id="register" className={styles.register} aria-labelledby="register-title">
      <Tear edge="top" tone="paper" />
      <Tear edge="bottom" tone="paper" />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="register-title" className={styles.title}>
            <span>Đăng ký</span> <span>tham gia khóa học.</span>
          </h2>
          <p className={styles.lede}>
            Khóa học dự kiến diễn ra trong tuần 12–13, học kỳ FA26. Ban tổ chức xét đăng ký rồi gửi lịch chính thức, phòng học và hướng
            dẫn chuẩn bị qua email của bạn.
          </p>

          <p className={styles.promiseTitle}>Khi đăng ký, bạn cam kết:</p>
          <ul className={styles.promises}>
            {COMMITMENTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.sheet}>
          {status === "done" ? (
            <div ref={confirmation} className={styles.done} tabIndex={-1} role="status">
              <svg viewBox="-4 -34 52 52" aria-hidden="true">
                <rect x="0" y="-28" width="40" height="40" rx="2" />
                <path d="M7 -9 L18 2 L40 -28" pathLength={1} />
              </svg>
              <h3>Đã nhận đăng ký của {saved.name}.</h3>
              <p>Ban tổ chức sẽ gửi kết quả và lịch chính thức tới {saved.email}.</p>
            </div>
          ) : (
            <form ref={form} className={styles.form} onSubmit={submit} noValidate>
              <Field name="fullName" label="Họ và tên" error={errors.fullName}>
                {(control) => <input {...control} type="text" autoComplete="name" maxLength={100} />}
              </Field>
              <Field name="studentId" label="MSSV" error={errors.studentId}>
                {(control) => <input {...control} type="text" autoComplete="off" autoCapitalize="characters" maxLength={20} />}
              </Field>
              <Field name="email" label="Email trường" error={errors.email}>
                {(control) => <input {...control} type="email" autoComplete="email" inputMode="email" maxLength={120} />}
              </Field>
              <Field name="major" label="Ngành học" error={errors.major}>
                {(control) => <input {...control} type="text" autoComplete="off" maxLength={100} />}
              </Field>
              <div className={styles.wide}>
                <Field name="background" label="Nền tảng hiện tại của bạn" error={errors.background}>
                  {(control) => (
                    <select {...control} defaultValue="">
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

              <div className={`${styles.wide} ${styles.honeypot}`} aria-hidden="true">
                <label htmlFor="register-website">Website</label>
                <input id="register-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className={styles.wide}>
                <label className={styles.commit}>
                  <input
                    type="checkbox"
                    name="commitment"
                    aria-invalid={errors.commitment ? true : undefined}
                    aria-describedby={errors.commitment ? "register-commitment-error" : undefined}
                  />
                  <span>Tôi đã đọc, hiểu và đồng ý với nội dung cam kết tham gia chương trình.</span>
                </label>
                {errors.commitment ? (
                  <p id="register-commitment-error" className={styles.error}>
                    {errors.commitment}
                  </p>
                ) : null}
              </div>

              <div className={`${styles.wide} ${styles.actions}`}>
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Đang gửi..." : "Đăng ký"}
                </button>
                <p className={styles.privacy}>Thông tin chỉ dùng để xét đăng ký và liên hệ về khóa học.</p>
              </div>

              {failure ? (
                <p className={`${styles.wide} ${styles.failure}`} role="alert">
                  {failure}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
