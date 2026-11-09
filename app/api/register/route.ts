import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { validateRegistration, type Registration } from "@/lib/registration";

/**
 * Tạm lưu vào data/registrations.jsonl (đã gitignore), mỗi dòng một đăng ký.
 * Cách này chỉ dùng được khi chạy trên một máy có ổ đĩa cố định.
 * Khi triển khai thật, thay hai hàm dưới đây bằng nơi lưu chính thức.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.jsonl");

async function isRegistered(studentId: string) {
  const content = await readFile(DATA_FILE, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return "";
    throw error;
  });
  return content
    .split("\n")
    .filter(Boolean)
    .some((line) => (JSON.parse(line) as Registration).studentId === studentId);
}

async function save(registration: Registration) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, `${JSON.stringify({ ...registration, submittedAt: new Date().toISOString() })}\n`, "utf8");
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ message: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  const raw = body as Record<string, unknown>;

  // Ô ẩn chỉ bot mới điền: trả về thành công nhưng không lưu.
  if (raw.website) return Response.json({ ok: true }, { status: 201 });

  const { value, errors } = validateRegistration(raw);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  try {
    if (await isRegistered(value.studentId)) {
      return Response.json({ errors: { studentId: "MSSV này đã đăng ký rồi." } }, { status: 409 });
    }
    await save(value);
  } catch {
    return Response.json({ message: "Chưa lưu được đăng ký." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
