import type { Metadata } from "next";
import { Anton, Barlow_Semi_Condensed, Be_Vietnam_Pro, Patrick_Hand } from "next/font/google";
import "./globals.css";

const mega = Anton({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-mega",
  display: "swap",
});

const display = Barlow_Semi_Condensed({
  weight: "800",
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

const body = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

// Chữ viết tay của tờ note và bảng phấn, chỉ xuất hiện ở cuối trang nên không preload.
const hand = Patrick_Hand({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-hand",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "AI-SE FA26 | Xây phần mềm cùng AI, làm chủ chất lượng",
  description:
    "Khóa học thực chiến dành cho sinh viên IT, giúp bạn đưa AI vào toàn bộ quy trình phát triển phần mềm với tư duy kỹ sư và trách nhiệm về chất lượng.",
};

// Ẩn các phần tử sẽ animate trước lần paint đầu, tránh nháy nội dung.
// Có hẹn giờ dự phòng để nội dung vẫn hiện nếu JS không chạy được.
const motionGate = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('motion');setTimeout(function(){d.classList.remove('motion')},3000)}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${mega.variable} ${display.variable} ${body.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
