/**
 * Nơi các nút "Đăng ký" dẫn tới: section form ngay trên trang.
 * Đặt về null để đóng đăng ký, các nút sẽ quay lại trạng thái "Sắp mở đăng ký".
 */
export const REGISTRATION_URL: string | null = "#register";

export const COMMITMENTS = [
  "Sắp xếp để tham gia đầy đủ các buổi theo lịch được công bố",
  "Đúng giờ và thực hiện nghiêm túc các hoạt động học tập, thực hành",
  "Tự chuẩn bị máy tính và công cụ cần thiết",
  "Hoàn thành bài tập, sản phẩm và hoạt động đánh giá",
  "Báo kịp thời cho ban tổ chức nếu có việc bất khả kháng",
] as const;

export const NAV_LINKS = [
  { label: "Tổng quan", href: "#overview" },
  { label: "Nội dung", href: "#curriculum" },
  { label: "Dự án", href: "#projects" },
  { label: "Đối tượng", href: "#audience" },
] as const;

/** Vòng đời phần mềm ở section Tổng quan. CODING_STAGE là chặng mà vibe coding dừng lại. */
export const LIFECYCLE = [
  "Nhận diện vấn đề",
  "Yêu cầu",
  "Thiết kế",
  "Lập trình",
  "Kiểm thử",
  "Review",
  "Triển khai",
  "Vận hành",
] as const;
export const CODING_STAGE = 3;

export const GOALS = [
  "Hiểu AI làm được gì và không làm được gì trong phát triển phần mềm",
  "Dùng AI Coding Assistant và Agent cho công việc kỹ thuật",
  "Đánh giá, kiểm chứng và cải thiện kết quả do AI tạo ra",
  "Hoàn thành một sản phẩm nhỏ theo đúng quy trình",
] as const;

export const CHAPTERS = [
  {
    tint: "coral",
    title: "Nền tảng AI-\u2060SE",
    summary: "Vai trò và giới hạn của AI trong quy trình phần mềm.",
    output: "Repository và log tương tác AI",
  },
  {
    tint: "yellow",
    title: "Prompt & Context Engineering",
    summary: "Đưa yêu cầu rõ ràng và đủ bối cảnh cho AI.",
    output: "Đặc tả và bối cảnh cho agent",
  },
  {
    tint: "lavender",
    title: "Yêu cầu & Thiết kế với AI",
    summary: "Từ user story đến kiến trúc, dữ liệu và API.",
    output: "User stories, ERD, API spec",
  },
  {
    tint: "orange",
    title: "Coding Agent & Lập trình",
    summary: "Lập kế hoạch, giao việc cho agent, đọc và duyệt diff.",
    output: "Một luồng chạy từ UI đến DB",
  },
  {
    tint: "teal",
    title: "Kiểm thử, Debug & Code Review",
    summary: "Viết test bắt được lỗi, debug và review code.",
    output: "Test suite, bug report, review",
  },
  {
    tint: "yellow",
    title: "Tích hợp, Demo & Đánh giá",
    summary: "Hoàn thiện sản phẩm và bảo vệ quyết định của bạn.",
    output: "Sản phẩm, demo, log tương tác AI",
  },
] as const;

export const STORY_EXAMPLE = "Là sinh viên, tôi muốn đặt phòng lab theo khung giờ để không bị trùng lịch.";

export const STORY_STAGES = [
  {
    name: "User Story",
    icon: "group",
    short: "Đặc tả",
    gate: "Given/When/Then",
    leaves: "Đặc tả và tiêu chí chấp nhận",
    help: "Gợi ý tiêu chí chấp nhận và các trường hợp biên.",
    risk: "Tự thêm những yêu cầu không ai đưa ra.",
    verify: "Đối chiếu với đề bài, viết lại tiêu chí theo Given/When/Then.",
  },
  {
    name: "Workflow",
    icon: "workflow",
    short: "Sơ đồ luồng",
    gate: "Truy vết đến test",
    leaves: "Sơ đồ luồng và bảng truy vết",
    help: "Phác luồng màn hình và các trạng thái của lượt đặt.",
    risk: "Bỏ sót nhánh lỗi, như hai người đặt cùng một giờ.",
    verify: "Truy vết từ story đến màn hình, API, dữ liệu và test.",
  },
  {
    name: "Design",
    icon: "cube",
    short: "ERD, API spec",
    gate: "Ghi lý do thiết kế",
    leaves: "Thiết kế, ERD, API spec",
    help: "Đề xuất ERD, API contract và cách chia thành phần.",
    risk: "Chọn kiến trúc phức tạp hơn bài toán cần.",
    verify: "Ghi lại quyết định thiết kế và giải thích được đánh đổi.",
  },
  {
    name: "Implementation",
    icon: "code",
    short: "Repository, PR",
    gate: "Đọc từng diff",
    leaves: "Repository, pull requests",
    help: "Viết code theo kế hoạch đã được duyệt.",
    risk: "Sửa ngoài phạm vi hoặc gọi thư viện không tồn tại.",
    verify: "Đọc từng diff, chia nhỏ pull request, chạy lại trên máy.",
  },
  {
    name: "Testing",
    icon: "shield",
    short: "Test, báo lỗi",
    gate: "Thêm phản ví dụ",
    leaves: "Tests, bug report",
    help: "Sinh test và gợi ý dữ liệu kiểm thử.",
    risk: "Test chỉ lặp lại đúng code vừa viết, pass mà không bắt được lỗi.",
    verify: "Thêm phản ví dụ, cố ý làm sai code để xem test có báo không.",
  },
  {
    name: "Deployment",
    icon: "deploy",
    short: "Log tương tác",
    gate: "Health check",
    leaves: "Demo, log tương tác AI, bảo vệ quyết định cá nhân",
    help: "Hỗ trợ cấu hình CI/CD và đọc log khi có sự cố.",
    risk: "Để lộ secret hoặc cấu hình sai môi trường.",
    verify: "Kiểm tra health check, quét bảo mật, viết runbook.",
  },
] as const;

export const FIT_CHECKS = [
  "Mình học một chuyên ngành thuộc khối CNTT",
  "Mình đã học lập trình, biết dùng Git càng tốt",
  "Mình có máy tính cá nhân để thực hành",
  "Mình sắp xếp được để đi đủ các buổi",
] as const;

export const COURSE_FACTS = [
  { term: "Thời gian", detail: "Dự kiến tuần 12–13, học kỳ FA26" },
  { term: "Hình thức", detail: "Học trực tiếp, làm cá nhân và theo nhóm" },
  { term: "Đăng ký", detail: "Xác nhận cam kết tham dự ngay trong form" },
] as const;

/** Những gì diễn ra sau khi gửi form, theo quy trình vận hành đề xuất. */
export const REGISTER_STEPS = [
  { title: "Gửi form", detail: "Điền thông tin và xác nhận cam kết tham gia." },
  { title: "Xét đăng ký", detail: "Rà soát điều kiện đầu vào và chỉ tiêu." },
  { title: "Nhận xác nhận", detail: "Email gửi lịch chính thức, phòng học, hướng dẫn chuẩn bị." },
  { title: "Vào học", detail: "Làm lab, dự án nhóm và nhận phản hồi từng buổi." },
  { title: "Demo Day", detail: "Trình diễn sản phẩm và bảo vệ quyết định cá nhân." },
] as const;

/** Liên kết cuối trang: menu chính cộng thêm FAQ. */
export const FOOTER_LINKS = [...NAV_LINKS, { label: "Câu hỏi thường gặp", href: "#faq" }] as const;

export const FAQ_ITEMS = [
  {
    question: "Khóa học này dành cho ai?",
    answer:
      "Dành cho sinh viên các chuyên ngành thuộc khối CNTT muốn đưa AI vào công việc phát triển phần mềm một cách có phương pháp. Khóa ưu tiên bạn đã biết lập trình cơ bản và dùng được Git.",
  },
  {
    question: "Bạn sẽ học những gì?",
    answer:
      "Bạn học cách dùng AI ở từng giai đoạn của quy trình phát triển phần mềm: phân tích yêu cầu, thiết kế, lập trình, kiểm thử và triển khai.",
  },
  {
    question: "Đây có phải khóa dạy dùng công cụ AI để viết code không?",
    answer:
      "Không chỉ vậy. AI tạo ra kết quả rất nhanh, nhưng người chịu trách nhiệm vẫn là bạn. Khóa học tập trung vào tư duy kỹ sư: biết kiểm chứng những gì AI tạo ra và bảo đảm chất lượng sản phẩm.",
  },
  {
    question: "Khóa học diễn ra thế nào?",
    answer:
      "Học trực tiếp, vừa được hướng dẫn vừa thực hành trên dự án, làm cá nhân và theo nhóm. Số buổi và thời lượng sẽ có trong chương trình chính thức.",
  },
  {
    question: "Cuối khóa bạn làm ra được gì?",
    answer:
      "Một sản phẩm phần mềm nhỏ cùng hồ sơ chứng minh: đặc tả, thiết kế, repository, tests, log tương tác AI, và phần trình bày tại Demo Day.",
  },
  {
    question: "Cần chuẩn bị gì trước khi học?",
    answer: "Bạn cần có máy tính cá nhân để thực hành. Danh sách công cụ và hướng dẫn cài đặt sẽ được gửi sau khi đăng ký thành công.",
  },
  {
    question: "Khi nào khóa học bắt đầu và học phí bao nhiêu?",
    answer:
      "Khóa học dự kiến diễn ra trong tuần 12–13 của học kỳ FA26. Ngày, giờ, phòng học và học phí sẽ được ban tổ chức thông báo chính thức.",
  },
  {
    question: "Đăng ký bằng cách nào?",
    answer: REGISTRATION_URL
      ? "Bấm nút Đăng ký ở đầu hoặc cuối trang rồi điền form. Trong form, bạn xác nhận cam kết tham dự đầy đủ."
      : "Form đăng ký chưa mở. Khi mở, nút ở đầu và cuối trang sẽ chuyển thành Đăng ký, và bạn sẽ xác nhận cam kết tham dự ngay trong form.",
  },
] as const;

export const OUTCOMES = [
  { icon: "code", tint: "coral", lines: ["AI trong toàn bộ", "vòng đời SE"] },
  { icon: "group", tint: "yellow", lines: ["Thực hành và", "làm việc nhóm"] },
  { icon: "shield", tint: "lavender", lines: ["Kiểm chứng và", "bảo đảm chất lượng"] },
  { icon: "cube", tint: "teal", lines: ["Sản phẩm chạy được", "& Demo Day"] },
] as const;
