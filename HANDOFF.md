# Bàn giao — Genbook Accounting landing page

Trang landing (EN + VI, desktop / tablet / mobile) dựng từ Figma. Tài liệu này là danh sách việc cho dev; chi tiết kỹ thuật
(breakpoint, cấu trúc, animation, i18n) nằm trong [README.md](./README.md).

## Tài liệu tham chiếu

- **Figma:** <https://www.figma.com/design/BSo47xDdofOAWXTIADvGwI/Accounting-Genbook>
  - Section EN: `194:51227` (Desktop `160:5773` · Tablet `160:6179` · Mobile `160:6585`)
  - Section VI: `194:51228` (Desktop `160:8531` · Tablet `160:8933` · Mobile `160:9335`)
  - Modal "Schedule a demo": EN `193:51226` · VI `193:51225`
- **Preview:** <https://claude.ai/artifact/TzUFW3uL3dUvSupZJCzLa4>. Đây là bản nén thấp để xem nhanh: clip animation mờ hơn bản
  thật, **không dùng làm nguồn so sánh pixel**. Dùng `npm run dev` hoặc Figma.
- **Nhánh:** `claude/nifty-bell-og5ydu` (chưa merge vào `main`).

## Chạy dự án

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build ra dist/
npm run preview
```

React 19, Vite 8, CSS Modules. Không dùng thư viện UI hay animation.

## Việc dev cần làm

### 1. Nối form "Schedule a demo" (bắt buộc)

Form mới có giao diện và validate; **chưa gửi dữ liệu đi đâu**. `submitContact(values)` trong `src/data/contact.js` hiện chỉ
chờ 700 ms rồi báo thành công. Thay phần thân hàm bằng request thật:

- `values = { fullName, phone, email, industry, company, message }`, giá trị đã được cắt khoảng trắng.
- Trả về bình thường = thành công; **ném lỗi = thất bại**. Modal tự hiện màn hình cảm ơn hoặc dòng báo lỗi tương ứng.
- Name, phone, email bắt buộc (phone 8–15 chữ số, cho phép `+ ( ) . -` và dấu cách; email dạng `a@b.cc`); industry, company,
  message tuỳ chọn. Validate phía client đã có, **cần validate lại phía server** (độ dài, định dạng, chống spam).
- Nên gửi thêm ngôn ngữ hiện tại (`document.documentElement.lang` là `en` hoặc `vi`) và URL trang nếu cần phân tích.

**Yêu cầu của chủ sản phẩm:** dữ liệu form phải đổ về một Google Sheet, **có các tab lớn Ngày / Tuần / Tháng / Năm** để lọc
thông tin sau này. Gợi ý (chưa làm trong repo, đã bàn nhưng bỏ khỏi phạm vi): một tab dữ liệu gốc, mỗi lần gửi thêm một dòng
gồm thời gian (múi giờ `Asia/Ho_Chi_Minh`), ngày `2026-10-21`, tuần ISO `2026-W43`, tháng `2026-10`, năm, rồi bốn tab thống kê
đọc từ tab gốc. Cách nhận dữ liệu (Apps Script web app, API riêng, v.v.) do dev chọn. Lưu ý địa chỉ web app công khai thì ai có
địa chỉ cũng gửi được dữ liệu, nên cần kiểm tra phía server.

### 2. Link và nút

`src/data/links.js`: kiểm tra lại các địa chỉ thật.

- `signIn` — mọi nút "Start free trial" / "Dùng thử miễn phí" (header, menu, Hero, các gói, CTA).
- `facebook`, `linkedin` — hai icon mạng xã hội ở footer.
- `contact` — các nút "Contact us" / "Talk to us" / "Liên hệ" và địa chỉ support trong nội dung: hiện mở cửa sổ soạn Gmail tới
  `support@genbook.io`.

### 3. Test trên thiết bị thật (chưa làm được)

- **Safari và mọi trình duyệt iOS:** không giải mã được kênh alpha của WebM nên dùng file dự phòng `*.stack.mp4` + canvas WebGL
  (`src/components/ClipPlayer/stackedAlpha.js`). Mới kiểm tra bằng tính toán shader, **chưa chạy trên máy thật**. Cần xem nền
  trong suốt, animation chạy đúng, và lúc không có WebGL thì hiện ảnh `*.poster.webp`.
- Android Chrome, Firefox, Edge: xem animation chạy một lần khi section vào khung nhìn (40% hiển thị), giữ khung cuối, tua lại
  khi cuộn ra khỏi khung và chạy lại khi cuộn quay lại.
- Modal: Esc / bấm nền / nút đóng, giữ focus trong hộp thoại, trang phía sau không cuộn; mobile là bottom sheet. Kiểm tra trên
  iOS Safari (thanh địa chỉ co giãn, bàn phím ảo).
- Độ rộng nhỏ nhất đã kiểm tra là 320px, lớn nhất 2560px, không tràn ngang.

## Điểm khác design đã biết (không phải lỗi mới)

| Chỗ | Design | Code | Ghi chú |
| --- | --- | --- | --- |
| Thẻ "3 Simple Steps" | chiều cao cố định, có khoảng trống thừa | chiều cao theo nội dung | chủ sản phẩm đã chọn không sao chép |
| FAQ desktop EN | hai cột 540, section cao 716 | cột câu hỏi 638, section cao ~800 | chủ sản phẩm chọn cột 638, khoảng cách 16 cho cả EN và VI |
| Hero VI tablet / mobile | layout riêng (tablet 888, mobile 846) | dùng chung layout EN (tablet 1008, mobile 810) | chưa chỉnh |
| CTA / Footer tablet, Pricing tablet-mobile | có khác biệt nhỏ | giữ code cũ | chủ sản phẩm chọn giữ code cũ cho Header, Pricing, CTA, Footer; riêng tiêu đề và đoạn mô tả Pricing đã cập nhật |
| Đoạn mô tả Pricing | 24px | 18px | chủ sản phẩm yêu cầu 18px cho mọi khung |
| Pricing mobile VI | còn câu cũ ("…dựa trên số lượng pháp nhân…") | dùng câu mới như desktop/tablet | nghi design mobile chưa cập nhật, cần xác nhận |
| Header | — | đã đổi bố cục (`.actions`, `.compact` cho VI) | chưa xác nhận giữ hay bỏ thay đổi này |

Một số chữ trong Figma có lỗi gõ (ví dụ EN tablet "volume,and"); code dùng bản đúng chính tả.

## Yêu cầu animation: chạy mượt và đúng trên mọi nền tảng

**Yêu cầu của chủ sản phẩm:** animation phải chạy **mượt và đúng** trên desktop, tablet và mobile, ở các hệ **Windows, Android
và iOS** (thêm macOS vì Safari desktop cùng nhóm lỗi với iOS).

"Đúng" nghĩa là, với cả 8 animation (hero, 3 step, 4 feature) ở cả EN và VI:

1. Chạy **một lần** khi section vào khung nhìn (40% hiển thị), **không lặp**.
2. Dừng và **giữ khung cuối** khi chạy xong.
3. Khi cuộn ra khỏi khung nhìn hoàn toàn thì tua về đầu, cuộn quay lại thì **chạy lại**.
4. Nền **trong suốt** (không có nền đen hay viền), đúng tỷ lệ khung, không giật, không nhấp nháy lúc bắt đầu.
5. Không làm cuộn trang giật, không gây tràn ngang, không có điều khiển video hiện ra (kể cả iOS).

**Ma trận cần nghiệm thu** (mỗi ô chạy đủ 5 điều trên):

| Nền tảng | Trình duyệt | Cơ chế dùng | Trạng thái |
| --- | --- | --- | --- |
| Windows desktop | Chrome, Edge, Firefox | WebM VP9 có alpha | Chromium đã kiểm tra trên Linux; **Windows chưa thử trên máy thật** |
| macOS desktop | Safari, Chrome | Safari: `*.stack.mp4` + WebGL; Chrome: WebM | **Chưa thử** |
| Android phone / tablet | Chrome, Samsung Internet | WebM VP9 có alpha | **Chưa thử trên máy thật** |
| iPhone / iPad | Safari và mọi trình duyệt iOS | `*.stack.mp4` + WebGL (iOS không giải mã được alpha của WebM) | **Chưa thử**, mới kiểm tra shader bằng tính toán |

Cách kiểm tra trên máy thật: mở trang, cuộn chậm qua từng section, quan sát 5 điều trên; đổi EN/VI; xoay ngang/dọc với
tablet và điện thoại; thử chế độ tiết kiệm pin. Nếu ô nào không đạt thì ghi lại máy, trình duyệt, animation nào lỗi.

Lưu ý đã biết cho dev:

- Clip chạy **kể cả khi người dùng bật "giảm chuyển động"** (clip là nội dung chính); chỉ hiệu ứng hiện dần khi cuộn mới bị giảm.
- iOS chỉ cho video tự chạy khi tắt tiếng và `playsinline`; `ClipPlayer` đã đặt sẵn, cần xác nhận trên máy thật, đặc biệt
  khi bật Low Power Mode.
- Nếu thiết bị không có WebGL thì hiện ảnh tĩnh `*.poster.webp` (khung cuối) thay vì animation.
- Với thiết bị yếu, theo dõi dung lượng clip (`src/assets/media`, đã nén CRF 30) và số clip chạy cùng lúc.

## Animation / media

- File ở `src/assets/media/`, đặt tên `<slot>.<lang>.<đuôi>`; slot: `hero`, `step-1..3`, `feature-1..4`. Tìm theo tên, thay file
  không cần sửa code. Slot VI không có file `.vi.` sẽ dùng file EN.
- Thay hoặc thêm clip: `node scripts/optimise-clips.mjs` rồi `node scripts/encode-clips.mjs --force` (cần `ffmpeg` có libvpx,
  libx264, libwebp). Chi tiết trong README mục "Animated artwork".

## Dọn dẹp nhỏ

- `.gitignore.txt` và `.claude/launch.json` (đường dẫn Windows của máy người dựng ban đầu) nằm từ commit đầu, không thuộc phần
  landing page; cân nhắc xoá.
- Bảng Google Sheet trống tên "Genbook - Yêu cầu demo từ website" trong Drive của chủ sản phẩm là bản thử, có thể xoá.
