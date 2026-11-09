# AI-SE FA26 — PROMPT DỰNG HERO (DESKTOP + MOBILE)

## Mục tiêu
Dựa đúng vào `01_reference/hero_selected_reference.png` để xây dựng HERO của landing page giới thiệu khóa AI-Augmented Software Engineering (AI-SE), học kỳ FA26. Đây là website GIỚI THIỆU KHÓA HỌC, không phải dashboard, phòng thí nghiệm hay công cụ coding. Chỉ dựng HERO, KHÔNG làm các section khác.

## Visual direction cố định
- Vibe: bright creative-campus collage, contemporary education campaign. Tươi sáng, hiếu động, nhiều chất liệu thật, hiện đại nhưng rõ ràng. KHÔNG chuyển sang ảnh trắng đen, KHÔNG cyberpunk/neon dark, KHÔNG glassmorphism tràn lan, KHÔNG dùng 3D sphere.
- Nền giấy sáng `#FFF9F1`, chữ xanh đen `#123E46`; accents coral `#F34437`, vàng `#F8BF38`, teal `#24A9B4`, tím lavender `#DDAAEF`, cam `#F68D2E`.
- Ảnh nhân vật là **màu thật**, đặt bên phải trong collage; ảnh học đường/sky phía sau. Các vệt torn-paper, brush lavender, checklist và chalkboard là các lớp độc lập để tạo chiều sâu.
- Serif không phù hợp cho headline này: dùng display sans đậm với counter rõ + body sans hiện đại hỗ trợ dấu tiếng Việt; gợi ý Be Vietnam Pro cho body, Anton/Barlow Condensed (hoặc sans condensed phù hợp) cho mảng “AI-SE / FA26”. KHÔNG nhúng font file từ gói asset.

## Nội dung chính (viết bằng HTML TEXT, không chèn chữ từ ảnh đã render)
Brand ở navbar: `AI-SE — FA26`.
Menu: `Tổng quan`, `Nội dung`, `Dự án`, `Đối tượng`.
CTA navbar: `Đăng ký` (chỉ dẫn sang form nếu URL thực sự đã được xác nhận; nếu chưa, dùng trạng thái `Sắp mở đăng ký`).
Big typography label: `AI-SE` và `FA26` thành 2 khối lớn ở phần bên trái, có nền torn-paper đỏ và vàng riêng (text đặt phía trên bằng HTML).
Main headline: `XÂY PHẦN MỀM CÙNG AI, LÀM CHỦ CHẤT LƯỢNG.`
Intro copy: `Khóa học thực chiến dành cho sinh viên IT, giúp bạn đưa AI vào toàn bộ quy trình phát triển phần mềm — từ phân tích yêu cầu, thiết kế, lập trình và kiểm thử đến triển khai, với tư duy kỹ sư và trách nhiệm về chất lượng.`
CTA 1: `Khám phá khóa học` → scroll sang section tổng quan (anchor `#overview`).
CTA 2: `Xem chương trình` → scroll sang section chương trình (`#curriculum`).
4 key outcomes trong strip dưới hero:
1. `AI trong toàn bộ vòng đời SE`
2. `Thực hành và làm việc nhóm`
3. `Kiểm chứng và đảm bảo chất lượng`
4. `Sản phẩm thực tế & Demo Day`
Không thêm các thống kê, lịch, học phí, giảng viên hoặc logo tổ chức chưa được xác nhận.

## Layout desktop — đặc tả để dựng
- Cỡ tham chiếu: 1440x800 (ưu tiên từ 1280 đến 1920). Background full-bleed tông kem, max width nội dung ~1440px và padding ngang clamp(24px,4vw,72px).
- Header cao khoảng 80px, bên trái là brand, giữa là nav, bên phải nút CTA đỏ. Sticky khi cuộn nếu phù hợp.
- Hero main có 2 vùng thị giác: vùng nội dung + mega type ở trái khoảng 52%; vùng ảnh collage ở phải khoảng 48%, phần ảnh và shapes có thể vượt ranh giới grid.
- Vùng trái: chữ `AI-SE` ở khổ rất lớn, `FA26` ở dưới, mỗi chữ là DOM text có khả năng responsive (không bake vào hình). Kề bên là headline (màu dark teal), highlight dòng `LÀM CHỦ CHẤT LƯỢNG` bằng brush tím nằm SAU chữ. Mô tả khoảng 2–4 dòng dễ đọc; 2 CTA ngang cách nhau 16px.
- Vùng phải: xếp layer từ sau ra trước: `sky_cyan_clouds.jpg` và `campus_pink_building.jpg` làm background trong polygon; các shape SVG đỏ/cam/vàng/teal nằm sau; `students_team_cutout.png` là lớp tiền cảnh; hai note `chalkboard_editable.svg`, `checklist_editable.svg` đặt ở cạnh trên/phải, không che mặt; `corner_sunburst.svg`, `red_arrow.svg` và texture là lớp trang trí tiết chế.
- Bottom: strip 4 lợi ích đặt trong cùng viewport hoặc ngay sát mép hero; mỗi item có icon SVG, label 2 dòng, chia bằng border mảnh. Đây KHÔNG phải các card bóng nổi.
- Z-index gợi ý: texture (0), background photos (1), color geometric shapes (2), students (3), notes & doodles (4), header/content/CTAs (5).
- Type scale: nhãn cực lớn clamp(100px,11vw,190px), headline clamp(34px,3.3vw,58px), body 16–18px line-height 1.5, benefit label 14–16px. Tránh chữ vỡ hoặc bị che.

## Motion & microinteraction — đẹp nhưng dùng đúng chỗ
1. On-load stagger: navbar → mega type bằng reveal-mask → headline theo từng dòng → nhóm ảnh fade/translate 24px → notes pop-in nhẹ. Tổng 900–1300ms; không animate quá nhiều cùng lúc.
2. Parallax rất nhẹ bằng transform theo pointer hoặc scroll: sky 4px, paper shapes 8px, people 12px; tắt khi `prefers-reduced-motion` hoặc trên thiết bị yếu.
3. Brush highlight của headline được reveal bằng CSS clip-path/SVG stroke sau khi text xuất hiện.
4. Hover CTA: translateY(-2px), icon mũi tên dịch 4px, shadow nhẹ; focus-visible rõ ràng.
5. Không scroll hijacking, không smooth-scroll nặng, không glow hoặc particle vô nghĩa.

## Responsive
- >=1024px: hero 2 cột như mô tả, kiểm tra 1440px và 1280px.
- 768–1023px: 1 cột headline/text phía trên và montage bên dưới, nav thu gọn hợp lý.
- <=767px: menu gọn, giới hạn max width text 100%; mega type nhỏ lại, title/CTA trước ảnh, 4 lợi ích thành grid 2x2; ảnh nhân vật chiếm width 100% và luôn thấy đầy đủ mặt, checklist không che headline. Tránh horizontal overflow.

## Quy tắc và kiểm tra trước bàn giao
- Dùng assets trong ZIP dưới dạng ảnh SVG/PNG độc lập. `01_reference/hero_selected_reference.png` chỉ là VISUAL REFERENCE, KHÔNG được đặt làm background nguyên hero vì chữ sẽ bị trùng và không responsive.
- Không tự dựng UI thành một ảnh phẳng. Nav, buttons, headline, description, benefit labels phải là text và HTML/CSS thật, có khả năng chọn/copy, hỗ trợ accessibility.
- Kiểm tra font tiếng Việt, contrast, focus states, alt text ảnh, responsive 390/768/1440, performance; ưu tiên lazy-load ảnh trang dưới nhưng hero chính fetch priority cao.
- Các ảnh cutout/giấy note tái tạo từ ảnh concept nên là asset minh họa, không phải ảnh chính thức của học viên hoặc cơ sở đào tạo.
- Không tự khẳng định khóa học 10 buổi/học phí/chỉ tiêu đã chốt; nếu cần thông tin kế hoạch phải dùng nhãn `dự kiến` rõ ràng.

## Mapping asset
- `01_reference/hero_selected_reference.png` — ảnh mẫu đầy đủ
- `02_photos/students_team_cutout.png` — nhân vật, PNG có alpha
- `02_photos/sky_cyan_clouds.jpg` — bầu trời sáng, để clip theo shape
- `02_photos/campus_pink_building.jpg` — minh họa kiến trúc campus (không phải hình chính thức của đơn vị tổ chức)
- `03_textures/*` — giấy, grain
- `04_collage_shapes/*` — giấy màu xé, vệt cọ, mũi tên, dots SVG
- `05_notes/*` — note checklist và bảng phấn (bản PNG tạo hình + bản SVG chỉnh sửa)
- `06_icons/*` — icon vector cho outcomes

## Lưu ý quan trọng
Ảnh gốc là một render raster hoàn chỉnh, KHÔNG phải file PSD/Figma có các layer thật. Các asset ở đây là TÁI TẠO/TÁCH GẦN ĐÚNG từ concept; chúng không thể khớp tuyệt đối từng pixel khi ghép lại. Ưu tiên tái hiện bố cục/tinh thần, sau đó điều chỉnh thủ công bằng CSS để đạt chất lượng cao.
