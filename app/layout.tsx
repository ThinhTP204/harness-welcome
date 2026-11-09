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

const SITE_TITLE = "AI-SE FA26 | Xây phần mềm cùng AI, làm chủ chất lượng";
const SITE_DESCRIPTION =
  "Khóa học thực chiến dành cho sinh viên IT, giúp bạn đưa AI vào toàn bộ quy trình phát triển phần mềm với tư duy kỹ sư và trách nhiệm về chất lượng.";
const SHARE_IMAGE = {
  url: "/hero/seo/AI_SE_FA26_OG_1200x630.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "AI-SE FA26: Xây phần mềm cùng AI, làm chủ chất lượng",
};

export const metadata: Metadata = {
  // Các nền tảng chỉ đọc được ảnh theo địa chỉ đầy đủ: đặt NEXT_PUBLIC_SITE_URL bằng tên miền thật khi triển khai.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "AI-SE FA26",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
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
