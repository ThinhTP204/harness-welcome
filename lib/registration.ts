/** Quy tắc kiểm tra dùng chung cho form (trình duyệt) và API (server). */

export const BACKGROUNDS = [
  "Đã biết lập trình cơ bản và dùng được Git",
  "Biết lập trình cơ bản, chưa dùng Git",
  "Mới bắt đầu học lập trình",
] as const;

export interface Registration {
  fullName: string;
  studentId: string;
  email: string;
  major: string;
  background: string;
  commitment: boolean;
}

export type RegistrationErrors = Partial<Record<keyof Registration, string>>;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function validateRegistration(raw: Record<string, unknown>) {
  const value: Registration = {
    fullName: text(raw.fullName),
    studentId: text(raw.studentId).toUpperCase(),
    email: text(raw.email).toLowerCase(),
    major: text(raw.major),
    background: text(raw.background),
    commitment: raw.commitment === true,
  };

  const errors: RegistrationErrors = {};
  if (value.fullName.length < 2 || value.fullName.length > 100) errors.fullName = "Nhập họ và tên của bạn.";
  if (!/^[A-Z0-9]{4,20}$/.test(value.studentId)) errors.studentId = "MSSV chỉ gồm chữ và số, từ 4 đến 20 ký tự.";
  if (value.email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = "Nhập email đúng định dạng, ví dụ ten@truong.edu.vn.";
  if (value.major.length < 2 || value.major.length > 100) errors.major = "Nhập ngành bạn đang học.";
  if (!(BACKGROUNDS as readonly string[]).includes(value.background)) errors.background = "Chọn mức gần với bạn nhất.";
  if (!value.commitment) errors.commitment = "Tick vào ô này để gửi đăng ký.";

  return { value, errors };
}
