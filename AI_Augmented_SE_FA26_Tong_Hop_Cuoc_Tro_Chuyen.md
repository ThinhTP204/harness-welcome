# Tổng hợp cuộc trò chuyện: Tổ chức khóa AI thực chiến – AI-Augmented Software Engineering (FA26)

> **Ngày tổng hợp:** 09/11/2026  
> **Ngôn ngữ:** Tiếng Việt  
> **Phạm vi:** Tổng hợp có cấu trúc các nội dung, nhận định và bản nháp đã trao đổi trong cuộc trò chuyện. Đây **không phải bản chép lời nguyên văn**.  
> **Trạng thái:** Tài liệu làm việc; các nội dung về lịch học, học phí, phòng học, chỉ tiêu và hình thức đánh giá cần được đơn vị tổ chức xác nhận trước khi công bố.

---

## 1. Bối cảnh và mục tiêu

Người tổ chức mong muốn xây dựng khóa **AI thực chiến** dành cho sinh viên ngành **Software Engineering (SE)** và có thể mở rộng cho các chuyên ngành IT, đặc biệt sinh viên mới làm quen với quy trình **AI-Augmented Software Engineering**.

**Định hướng cốt lõi:**

- Không chỉ dạy prompt engineering, “vibe coding” hoặc thao tác với một coding tool cụ thể.
- Dạy cách **đưa AI vào toàn bộ vòng đời phát triển phần mềm**: nhận diện vấn đề → yêu cầu → thiết kế → lập trình → kiểm thử → review → triển khai → vận hành.
- Nhấn mạnh **con người chịu trách nhiệm kỹ thuật**: đánh giá kế hoạch và mã nguồn AI đề xuất, phát hiện sai sót, xác minh bằng bằng chứng và biết khi nào không nên tin vào kết quả AI.
- Học qua **dự án và các increment có thể kiểm thử**, không chỉ qua slide.
- Có kết quả đầu ra được đánh giá: đặc tả, thiết kế, repository, tests, pull requests, log tương tác AI, demo và khả năng bảo vệ quyết định cá nhân.

Nguyên tắc xuyên suốt được thảo luận:

> Mỗi nhóm nên chứng minh được một User Story đi xuyên qua **Workflow → Design → Implementation → Testing → Deployment**; giải thích AI đã tham gia ở đâu, đã tạo ra sai sót gì và sinh viên đã kiểm chứng ra sao.

---

## 2. Khóa học và tài nguyên được tìm để tham khảo

| Chương trình | Tổ chức | Nội dung / giá trị tham khảo | URL |
|---|---|---|---|
| **AI-Augmented Software Development + Studio** | University of British Columbia (UBC), Canada | Mô hình lecture + studio, project nhóm, milestone, rubric, full-stack và engineering practices. Được đánh giá là mô hình tham khảo phù hợp nhất. | https://ubc-vsp26.github.io/syllabus/ |
| **CS146S – The Modern Software Developer** | Stanford University | Coding agents, MCP, Agent Skills, Spec-Driven Development, human–agent workflows, software factory. Dùng để cập nhật phương pháp và kỹ thuật mới. | https://themodernsoftware.dev/ |
| **CS485 – AI-Assisted Software Engineering** | New Jersey Institute of Technology (NJIT) | Assignments theo các pha requirements, specification, frontend, backend, testing, deployment; lưu vết AI interaction. | https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/about/ |
| **Scientific Software Engineering with AI Coding Agents** | Carnegie Mellon University (CMU) | Git, APIs, testing, debugging, code quality, CI/CD và cấu hình coding agent. | https://kitchingroup.cheme.cmu.edu/s26-06643/syllabus.html |
| **Spec-Driven Development with Coding Agents** | DeepLearning.AI × JetBrains | Khóa beginner ngắn; specifications, plan–implement–verify. | https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents |
| **Getting Started with GitHub Copilot** | GitHub Skills | Lab nhập môn thao tác với Copilot, repository và pull request. | https://github.com/skills/getting-started-with-github-copilot |
| **Get Started with AI-Assisted Development** | Microsoft Learn | Code generation, documentation, unit testing, refactoring, v.v. | https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/ |
| **AI-Powered Software Engineer** | Udacity | Chương trình chuyên sâu hơn về TDD, design patterns, architecture và AI coding agents. | https://www.udacity.com/course/ai-powered-software-engineer--nd770 |

### Tài liệu UBC có thể tham khảo trực tiếp

- Syllabus: https://ubc-vsp26.github.io/syllabus/
- Lịch học, slides và hoạt động studio: https://ubc-vsp26.github.io/schedule/
- Assignments, milestones và rubric: https://ubc-vsp26.github.io/assessments/

### Tài liệu NJIT có thể tham khảo trực tiếp

- Assignment Requirements Engineering: https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/projects/p1.html
- Assignment Testing: https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/projects/p5.html

**Lưu ý:** Các URL trên được nêu trong cuộc trò chuyện để nghiên cứu/đối chiếu. Việc một trường công khai syllabus không đồng nghĩa người ngoài được đăng ký học chính thức hoặc sử dụng mọi nội dung theo giấy phép mở.

---

## 3. Bộ tài liệu được người dùng cung cấp: Course 4 – The Modern AI Software Developer

**Tên file đầu vào:** `Course4_ModernAISoftwareDeveloper_Materials.zip`.

Qua phân tích ở lượt trao đổi trước, bộ tài liệu có:

- 10 buổi học, mỗi buổi khoảng 120 phút; tổng **20 giờ trên lớp**.
- Khoảng **30 giờ tự học/làm dự án** được nêu trong kế hoạch đào tạo.
- 10 slide, 10 lab dạng Markdown, Instructor Guide, các templates, demos và syllabus Excel.
- Định hướng *build-first* với nhiều bài tập trực tiếp trên dự án phần mềm.
- Đầu vào được mô tả thiên về sinh viên đã học OOP, JavaScript/TypeScript, React và Git.
- Công nghệ thực hành được thảo luận: React, Node.js/Express, TypeScript, Prisma; Vitest, Supertest, Playwright, CI, Semgrep, npm audit, v.v.
- Tài liệu có nhắc tới Stanford CS146S như nguồn tham khảo; **không được mặc định Course 4 là khóa chính thức của Stanford**.

### Những lab nổi bật đã thảo luận

1. **Lab 01 – From Prompt to Running App:** dùng prompt mơ hồ và prompt có cấu trúc cho cùng một bài toán, so sánh kết quả.
2. **Lab 02 – Specs and Agent Context:** chuẩn hóa yêu cầu, đặc tả và bối cảnh hoạt động của coding agent.
3. **Lab 03 – Plan → Build → Verify:** đánh giá plan, kiểm tra diff, tạo PR và ghi AI Engineering Log.
4. **Lab 08 – Code Review & Debugging:** review PR bằng con người và AI; bug-hunt với lỗi cài sẵn.
5. **Lab 09 – Deploy & Operate:** thử xử lý lỗi cấu hình, chẩn đoán logs, viết runbook/postmortem.

**Đánh giá:** Course 4 có tính sẵn sàng để dạy (*ready-to-teach*) và phù hợp bootcamp thực chiến ngắn; điểm cần tăng cường là tư duy Requirements/Architecture/Traceability, đánh giá chất lượng tests và Responsible AI.

---

## 4. So sánh trực tiếp Course 4 với UBC

### 4.1. Tổng quan

| Khía cạnh | Course 4 – The Modern AI Software Developer | UBC – AI-Augmented Software Development + Studio |
|---|---|---|
| Mô hình | Build-first, lab theo từng increment | Lecture + Engineering Studio, dự án nhóm |
| Thời lượng từng được nêu | 10 buổi × 2 giờ = **20 giờ trên lớp**, cộng khoảng 30 giờ tự học/dự án | Khoảng **58 giờ** lecture + studio theo cách cộng lịch đã tham khảo trong cuộc trò chuyện; cần xem lịch chính thức để xác nhận |
| Điều kiện đầu vào | Thiên về SV đã có nền tảng web/SE | Lập trình cơ bản, Git, command line; không yêu cầu AI/ML trước đó |
| Trọng tâm | Coding agent workflow, tooling, build/test/deploy, vận hành | AI-assisted SE toàn diện, design/engineering judgment và studio |
| Hình thức thực hành | Lab định hướng và deliverable từng buổi | Dự án nhóm với milestones và đánh giá riêng |
| Khả năng sử dụng để tổ chức ngay | **Rất cao** do có nhiều tài liệu dạy học sẵn | Cao để tham khảo tổ chức học phần nhưng cần chuyển thành giáo án phù hợp điều kiện nội bộ |

### 4.2. So sánh năng lực được bao phủ

| Tiêu chí | Course 4 | UBC | Nhận xét |
|---|---|---|---|
| Requirements Engineering | PRD, user stories, Given/When/Then | User stories, acceptance criteria, prioritization | Cần bổ sung traceability đầu-cuối cho cả chương trình tổ chức mới |
| Software Architecture & Design | Context, data model ban đầu, specs | Design document, ADR, component diagram, API design | **UBC nổi bật hơn** ở thiết kế và rationale |
| AI Coding Workflow | Plan–Build–Verify, diff, PR, logs | Agent workflows, AI IDE, code organization | **Course 4 nổi bật hơn** về lab cụ thể và quy trình tác nghiệp |
| AI Agent Engineering | Commands, skills, subagents, MCP | Agent architecture, MCP, advanced patterns | Cả hai hữu ích, tùy độ sâu mục tiêu |
| Testing | Vitest, Supertest, Playwright, CI, TDD | Unit/Integration/E2E; test pyramid, property/mutation testing | Course 4 thực hành công cụ; UBC bổ sung chiều sâu đánh giá test |
| Security | Semgrep, npm audit, prompt injection | Semgrep, STRIDE, threat modeling | **UBC nổi bật hơn** ở threat modeling |
| Deployment & Operations | Logging, health check, incident drill, postmortem | CI/CD, deployment, tech debt, retrospective | **Course 4 nổi bật hơn** ở phần vận hành/incident drill |
| Responsible AI / Ethics | AI Engineering Log, peer review, individual defense | Ethics, accountability, independent judgment | **UBC nổi bật hơn** ở nội dung đạo đức/chuyên môn độc lập |

**Nhận định đã chốt ở mức đề xuất:**

- **Course 4:** làm khung thực hành nhanh, có thể triển khai thành bootcamp.
- **UBC:** làm chuẩn bổ sung chiều sâu Software Engineering, assessment và tổ chức studio.
- **Giải pháp kết hợp:** giữ khung lab của Course 4, bổ sung từ UBC các kỹ năng thiết kế, kiểm chứng và trách nhiệm kỹ thuật.

Đây là **đánh giá định tính dựa trên syllabus và tài liệu** chứ không phải kết quả kiểm chứng chất lượng giảng dạy trong thực tế.

---

## 5. Đề xuất chương trình đào tạo

Cuộc trò chuyện có **hai phương án đề xuất** ở các thời điểm khác nhau. Chưa có phương án nào được xác nhận là thời khóa biểu chính thức.

### Phương án A – Nhập môn ngắn: 6 buổi × 4 giờ = 24 giờ

Đề xuất ban đầu cho bootcamp có khoảng 70% thời gian thực hành:

| Buổi | Nội dung | Đầu ra |
|---|---|---|
| 1 | AI-Augmented SE Foundations | Repository, AGENTS.md, AI usage log |
| 2 | AI-Assisted Requirements Engineering | Problem, Persona, User Stories, Acceptance Criteria |
| 3 | AI-Assisted Software Design & Spec-Driven Development | Workflow, kiến trúc, ERD, API Spec |
| 4 | AI Coding Agents & Implementation | Workflow chạy xuyên suốt UI → API → DB |
| 5 | AI-Augmented Testing, Review & Refactoring | Test suite, bug report, review, security checks |
| 6 | GitHub Collaboration, CI/CD & Delivery | App deploy, PRs, demo, báo cáo sử dụng AI |

### Phương án B – Mở rộng Course 4: 12 buổi × 2 giờ = 24 giờ trên lớp

- Dự án/tự học ngoài lớp: đề xuất 30 giờ.
- Phù hợp tổ chức trong khoảng 6 tuần (mỗi tuần hai buổi) nếu cần đủ thời gian hoàn thành incremental project.
- Nếu buộc tổ chức trong tuần 12–13, cần **điều chỉnh khối lượng và số buổi** cho phù hợp lịch thực tế.

| Buổi | Chủ đề |
|---|---|
| 1 | From Prompt to Running App |
| 2 | Requirements & Context Engineering |
| 3 | **AI-Assisted Workflow & Software Design** — bổ sung |
| 4 | Plan → Build → Verify |
| 5 | Testing with AI & CI |
| 6 | Agent Skills, Subagents & MCP |
| 7 | Rapid UI & MVP Checkpoint |
| 8 | Secure AI Code |
| 9 | Code Review & Debugging |
| 10 | **AI Quality Assurance & Responsible Engineering** — bổ sung |
| 11 | Deploy, Operate & Incident Drill |
| 12 | Demo Day & Individual Defense |

### 5.1. Bốn năng lực nên tăng cường

1. **Workflow & Traceability:** Story → Workflow → Screen → API → DB → Test.
2. **Software Architecture & Decision Records:** Component Diagram, API Contract, ERD, ADR, giải thích trade-offs.
3. **Quality of Testing:** Không dừng ở “tests pass”; bổ sung phản ví dụ, mutation testing hoặc đánh giá sức mạnh bộ test.
4. **Responsible AI:** IP, privacy, security, accountability, chính sách và log về sử dụng AI.

### 5.2. Cách đánh giá được đề xuất trong cuộc trò chuyện

| Tiêu chí | Trọng số |
|---|---:|
| Requirements & Design / Traceability | 20% |
| Implementation & Integration | 30% |
| Testing, Review, Security, CI | 25% |
| AI Usage Log & Engineering Decisions | 15% |
| Demo và bảo vệ cá nhân không dùng AI | 10% |
| **Tổng** | **100%** |

Đây là **rubric đề xuất**, chưa phải tiêu chí chính thức của FA26.

---

## 6. Bối cảnh tổ chức chương trình trong FA26

Một email được người dùng cung cấp có nội dung yêu cầu **thầy Phương** hỗ trợ thông tin cho *Chương trình AI thực chiến dành cho sinh viên các chuyên ngành IT*, dự kiến diễn ra **tuần 12–13 của học kỳ FA26**.

Các thông tin đơn vị triển khai đang cần:

1. **Nội dung thông báo cho sinh viên:** mục tiêu, nội dung, đối tượng, đầu vào, hình thức học, yêu cầu tham gia.
2. **Cam kết tham dự lớp học:** có dùng mẫu hay không, thu như thế nào, cần lưu bằng chứng gì.
3. **Thời khóa biểu khi sinh viên đăng ký:** thông báo trước ngày và khung giờ dự kiến để tránh đăng ký rồi phát sinh trùng lịch.

### Nguyên tắc vận hành được đề xuất

- Công bố ít nhất **ngày và khung giờ học dự kiến trước khi mở form**.
- Ưu tiên dùng Google Forms / Microsoft Forms với **checkbox bắt buộc xác nhận cam kết**, thay vì bắt buộc in và ký mẫu giấy riêng, trừ khi có yêu cầu hành chính.
- Gửi xác nhận đăng ký kèm lịch chính thức, phòng học, hướng dẫn chuẩn bị thiết bị và công cụ.
- Sinh viên phải tự kiểm tra khả năng tham gia toàn bộ lịch trước khi đăng ký.
- Chỉ chốt thông báo và mở đăng ký khi lịch đã được thống nhất; nếu lịch chưa chốt, ghi rõ *dự kiến* và không khẳng định các ngày cụ thể.

---

## 7. Bản nháp email phản hồi của thầy Phương

**Trạng thái:** Bản nháp được đề xuất trong cuộc trò chuyện; người gửi cần rà soát lại ngôn xưng và các nội dung chưa được phê duyệt.

**Tiêu đề:** Re: Thông tin triển khai Chương trình AI thực chiến – FA26

> Chào em,
>
> Thầy gửi một số thông tin đề xuất để chuẩn bị triển khai Chương trình AI thực chiến dành cho sinh viên các chuyên ngành IT trong tuần 12–13 của học kỳ FA26.
>
> **1. Nội dung thông báo cho sinh viên**
>
> Chương trình hướng đến việc giúp sinh viên làm quen với phương pháp phát triển phần mềm có sự hỗ trợ của AI (AI-Augmented Software Engineering).
>
> Sinh viên sẽ được thực hành sử dụng các công cụ AI trong quy trình phát triển phần mềm, từ phân tích yêu cầu, thiết kế, lập trình, kiểm thử đến hoàn thiện sản phẩm. Chương trình tập trung vào thực hành trên dự án cụ thể, không chỉ giới thiệu công cụ hay kỹ thuật prompting.
>
> Thầy sẽ cung cấp nội dung thông báo chi tiết để bộ phận phụ trách triển khai truyền thông.
>
> **2. Cam kết tham dự lớp học**
>
> Thầy đề xuất tích hợp nội dung cam kết trực tiếp vào biểu mẫu đăng ký online. Sinh viên cần xác nhận đã đọc và đồng ý tham gia đầy đủ các buổi học, thực hiện các bài thực hành và tuân thủ quy định của chương trình.
>
> Có thể sử dụng Microsoft Forms hoặc Google Forms, với một mục xác nhận cam kết bắt buộc trước khi gửi đăng ký. Cách này thuận tiện hơn việc thu mẫu giấy riêng.
>
> **3. Thời khóa biểu**
>
> Thầy thống nhất cần cung cấp thời khóa biểu dự kiến ngay tại thời điểm mở đăng ký để sinh viên chủ động sắp xếp việc học.
>
> Chương trình dự kiến tổ chức trong tuần 12–13 của học kỳ FA26. Lịch chi tiết về ngày, giờ, địa điểm và số buổi học cần được thống nhất với bộ phận tổ chức trước khi công bố.
>
> Thầy đề xuất chỉ mở đăng ký chính thức sau khi đã xác định được các khung giờ học, nhằm hạn chế tình trạng sinh viên đăng ký nhưng không thể tham gia đầy đủ.
>
> Trân trọng,  
> Thầy Phương

---

## 8. Bản nháp thông báo cho sinh viên

**Trạng thái:** Chưa chốt lịch, chỉ tiêu, phòng học và link đăng ký.

# THÔNG BÁO ĐĂNG KÝ CHƯƠNG TRÌNH AI THỰC CHIẾN – FA26

**AI-Augmented Software Engineering: From Requirements to Working Software**

Chương trình được thiết kế nhằm giúp sinh viên các chuyên ngành thuộc khối Công nghệ thông tin tiếp cận phương pháp phát triển phần mềm hiện đại với sự hỗ trợ của trí tuệ nhân tạo (AI).

### 8.1. Mục tiêu chương trình

Sau khi hoàn thành chương trình, sinh viên có thể:

- Hiểu vai trò và giới hạn của AI trong quy trình phát triển phần mềm.
- Sử dụng AI Coding Assistants và AI Coding Agents để hỗ trợ công việc kỹ thuật.
- Áp dụng AI từ phân tích yêu cầu, thiết kế đến lập trình và kiểm thử.
- Biết đánh giá, kiểm chứng và cải thiện kết quả do AI tạo ra.
- Hoàn thành một sản phẩm phần mềm nhỏ theo quy trình AI-Augmented Software Engineering.

### 8.2. Nội dung đào tạo

1. Introduction to AI-Augmented Software Engineering.
2. Prompt Engineering & Context Engineering.
3. AI-Assisted Requirements & Software Design.
4. AI Coding Agents & Software Implementation.
5. AI-Assisted Testing, Debugging & Code Review.
6. Project Integration, Demo & Evaluation.

### 8.3. Hình thức tổ chức

- Học trực tiếp, kết hợp hướng dẫn và thực hành.
- Sinh viên làm việc cá nhân và theo nhóm.
- Sử dụng công cụ AI trong quá trình xây dựng sản phẩm.
- Có hoạt động trình diễn và đánh giá kết quả thực hành.

### 8.4. Đối tượng tham gia

Sinh viên các chuyên ngành thuộc khối Công nghệ thông tin, ưu tiên sinh viên đã có kiến thức lập trình cơ bản và biết sử dụng Git.

### 8.5. Thời gian và địa điểm

- **Thời gian dự kiến:** Tuần 12–13, học kỳ Fall 2026.
- **Lịch học chi tiết:** [Cập nhật ngày và khung giờ cụ thể].
- **Địa điểm:** [Cập nhật phòng học].
- **Thời lượng:** [Xác nhận theo kế hoạch tổ chức].

### 8.6. Yêu cầu tham gia

Sinh viên cần có máy tính cá nhân, chủ động tham gia thực hành, hoàn thành các nhiệm vụ được giao và cam kết tham gia đầy đủ lịch học đã công bố.

### 8.7. Đăng ký

- **Thời hạn đăng ký:** [Ngày].
- **Biểu mẫu đăng ký:** [Link].
- **Số lượng:** [Chỉ tiêu].
- **Thông báo kết quả đăng ký:** [Ngày].

Sinh viên cần kiểm tra thời khóa biểu và xác nhận cam kết tham dự trước khi gửi biểu mẫu đăng ký.

---

## 9. Mẫu cam kết tham dự lớp học

### CAM KẾT THAM GIA CHƯƠNG TRÌNH AI THỰC CHIẾN – FA26

Tôi xác nhận đã đọc và hiểu các thông tin về mục tiêu, nội dung, thời gian và yêu cầu tham gia chương trình.

Tôi cam kết:

1. Đã kiểm tra lịch học của chương trình và bảo đảm có thể tham gia đầy đủ các buổi học.
2. Tham gia đúng giờ, thực hiện nghiêm túc các hoạt động học tập và thực hành.
3. Chủ động chuẩn bị thiết bị và công cụ cần thiết.
4. Hoàn thành các bài tập, sản phẩm và hoạt động đánh giá theo yêu cầu.
5. Thông báo kịp thời cho ban tổ chức nếu phát sinh tình huống bất khả kháng ảnh hưởng đến việc tham dự.

**Xác nhận bắt buộc trong form:**

- [ ] Tôi đã đọc, hiểu và đồng ý với nội dung cam kết tham gia chương trình.

*Thông tin xác nhận được ghi nhận cùng biểu mẫu đăng ký của sinh viên.*

---

## 10. Quy trình đăng ký và vận hành đề xuất

1. **Công bố thông tin:** nêu mục tiêu, điều kiện, ngày và giờ học dự kiến, thiết bị cần có, hạn đăng ký.
2. **Sinh viên đăng ký:** nhập MSSV, email trường, ngành học; xác nhận xem lịch và tick cam kết.
3. **Kiểm tra, xét đăng ký:** rà soát điều kiện đầu vào, chỉ tiêu, khả năng tham dự đầy đủ.
4. **Gửi xác nhận:** danh sách chính thức, thời khóa biểu, phòng học, setup tools và tài liệu trước khóa.
5. **Tổ chức đào tạo:** điểm danh, lab submission, nhóm thực hành, phản hồi theo từng buổi.
6. **Demo và đánh giá:** sản phẩm, evidence của SE workflow, log AI, bảo vệ cá nhân.

---

## 11. Danh sách nội dung chưa được xác nhận

Cần phối hợp với đơn vị tổ chức trước khi gửi email hoặc mở form:

- [ ] **Lịch chính thức:** ngày, buổi, giờ cụ thể của tuần 12–13 FA26.
- [ ] **Phòng học / phương án thiết bị và Internet.**
- [ ] **Chỉ tiêu tuyển sinh, số nhóm, tỷ lệ trợ giảng.**
- [ ] **Điều kiện đầu vào:** SV năm 1–2 hay năm 3–4; kiến thức Git, Web, API, Database cần ở mức nào.
- [ ] **Chọn một cấu trúc chương trình:** 6×4 giờ, 12×2 giờ hoặc cấu trúc khác khả thi trong hai tuần.
- [ ] **Thời lượng làm dự án ngoài lớp** và hình thức submission.
- [ ] **Công cụ AI hỗ trợ** và tài khoản/quota cho sinh viên.
- [ ] **Rubric, tiêu chí hoàn thành / chứng nhận.**
- [ ] **Mẫu cam kết** có được bộ phận đào tạo chấp thuận dưới dạng online checkbox hay cần mẫu có chữ ký.
- [ ] **Link form, hạn đăng ký, đầu mối liên hệ.**

---

## 12. Kết luận đã hình thành trong cuộc thảo luận

1. **Định vị khóa:** AI-Augmented **Software Engineering**, không chỉ AI coding hoặc vibe coding.
2. **Thiết kế chương trình:** **Course 4** là nền tảng tổ chức lab; **UBC** là chuẩn để tăng chiều sâu engineering, chất lượng kiểm chứng và đánh giá năng lực.
3. **Đánh giá năng lực:** cần xem cả sản phẩm, quá trình SE, chứng cứ kiểm thử và khả năng giải thích quyết định AI-assisted.
4. **Triển khai FA26:** khẩn trương chốt lịch trong tuần 12–13, ban hành thông báo và tích hợp cam kết tham dự vào biểu mẫu đăng ký.
5. **Nội dung còn là đề xuất:** số giờ, số buổi, rubric, stack, công cụ AI, thời khóa biểu, phòng học và chính sách cam kết chưa được xác nhận chính thức.

---

*Tài liệu này được biên soạn từ nội dung trao đổi trong cuộc trò chuyện để tiện chia sẻ, tiếp tục chỉnh sửa và xây dựng kế hoạch. Không nhằm thay thế syllabus, kế hoạch đào tạo hoặc công văn được phê duyệt.*
