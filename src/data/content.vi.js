/*
 * Vietnamese copy, from the Vietnamese Figma frames (section "VI", 194:51228: Desktop 160:8531 · Tablet 160:8933 ·
 * Mobile 160:9335 · FAQ answers 160:10558 – 160:10648 · Contact modal 193:51225). Pricing, the contact panel and the
 * footer are unchanged from the previous design and kept as they were.
 *
 * This is a patch over the English content (see i18n/merge.js): only text is listed here, so media, links and layout
 * flags come from content.js. Anything not listed falls back to English. Where an English array carries a layout
 * flag that does not apply to the Vietnamese text, the patch resets it to `null`.
 *
 * Copy marked "not in the design" (form validation, success and error messages, screen-reader strings) was written
 * for this page and should be reviewed by the owner.
 */
export default {
  navLinks: [
    { label: 'Cách hoạt động' },
    { label: 'Tính năng' },
    { label: 'Bảng giá' },
    { label: 'Câu hỏi' },
    { label: 'Liên hệ' },
  ],

  header: {
    cta: 'Dùng thử miễn phí',
    menuCta: 'Dùng thử miễn phí',
  },

  a11y: {
    home: 'Genbook Accounting, trang chủ',
    primaryNav: 'Điều hướng chính',
    menuNav: 'Menu',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    language: 'Ngôn ngữ',
  },

  hero: {
    heading: 'Tự động hoá kế toán Thương mại điện tử',
    text: 'Genbook kết nối dữ liệu đa nền tảng rồi tự động ghi nhận bút toán và đối soát giao dịch theo từng đơn hàng.',
    primary: { label: 'Dùng thử miễn phí' },
    secondary: { label: 'Đặt lịch trải nghiệm sản phẩm' },
    imageLabel: 'Bảng điều khiển kế toán Genbook',
  },

  steps: {
    heading: [
      { text: '3 bước đơn giản', gradient: true, breakAfter: null },
      { text: ' để có sổ sách kế toán chính xác', gradient: false },
    ],
    items: [
      {
        title: 'Kết nối dữ liệu và ghi nhận bút toán',
        text: 'Kết nối dữ liệu bán hàng qua API hoặc báo cáo tải lên, tự động ghi nhận bút toán doanh thu, phí sàn, quảng cáo, hoàn tiền và chênh lệch tỷ giá.',
        imageLabel: 'Dữ liệu từ Google Sheets, Amazon và Etsy được ghi nhận thành bút toán tự động',
      },
      {
        title: 'Bổ sung chi phí và dữ liệu mua hàng',
        titleBreaks: null,
        text: 'Cập nhật dữ liệu mua hàng, tồn kho theo từng mã sản phẩm, đồng bộ với sàn và bổ sung các bút toán ngoài sàn như tiền lương, phí và quảng cáo.',
        imageLabel: 'Biểu đồ doanh thu, quảng cáo, lượt nhấp và đơn hàng từ dữ liệu mua hàng và dữ liệu sàn',
      },
      {
        title: 'Đối soát, phê duyệt và lập báo cáo',
        text: 'Genbook đối soát và xác định giao dịch chênh lệch để kế toán kiểm tra, phê duyệt. Dữ liệu sau xử lý được sử dụng để lập sổ sách, báo cáo tài chính và cung cấp chứng từ phục vụ kiểm toán.',
        imageLabel: 'Bảng đối soát giao dịch và phê duyệt của kế toán',
      },
    ],
  },

  features: {
    // the Vietnamese frames: gradient on the first line, no intro paragraph, and the visual stays below its copy on mobile
    headingLines: [
      { text: 'Giải pháp kế toán toàn diện', gradient: true },
      { text: 'cho thương mại điện tử', gradient: false },
    ],
    textLines: [],
    mobileMediaFirst: false,
    rows: [
      {
        title: 'Kết nối dữ liệu đa nền tảng',
        titleBreaks: null,
        bullets: [
          'Kết nối dữ liệu từ sàn thương mại điện tử, thanh toán, kho vận và hóa đơn qua API hoặc báo cáo tải lên.',
          'Đối chiếu dữ liệu trực tiếp từ sàn với báo cáo người bán cung cấp, phát hiện chênh lệch theo từng đơn hàng.',
        ],
        imageLabel: 'Dữ liệu sàn, thanh toán và kho vận được hợp nhất trong một sổ cái',
      },
      {
        title: 'Quản lý giá vốn và lợi nhuận theo SKU',
        titleBreaks: [{ after: 'Quản lý giá vốn và lợi nhuận', frames: ['desktop', 'mobile'] }],
        bullets: [
          'Tự động xác định giá vốn từ dữ liệu mua hàng, kết hợp doanh thu và các khoản chi phí để tính toán lợi nhuận theo từng SKU.',
        ],
        imageLabel: 'Giá bán, giá vốn và lợi nhuận gộp theo từng SKU',
      },
      {
        title: 'Tự động đối soát đa nguồn và hỗ trợ kiểm toán',
        titleBreaks: null,
        bullets: [
          'Đối chiếu doanh thu, thanh toán, hóa đơn điện tử và chứng từ hải quan để phát hiện chênh lệch.',
          'Liên kết bút toán với giao dịch và chứng từ gốc để thuận tiện truy xuất.',
          'Hỗ trợ lập sổ sách theo VAS, IFRS và US GAAP, cung cấp hồ sơ phục vụ kiểm toán.',
        ],
        imageLabel: 'Tỷ lệ khớp hóa đơn điện tử và đối soát doanh thu, thanh toán, chứng từ hải quan',
      },
      {
        title: 'Gen Agent - Trợ lý AI cho kế toán',
        titleBreaks: null,
        bullets: [
          'Phân loại giao dịch, phát hiện sai lệch và đề xuất bút toán kế toán phù hợp.',
          'Phân tích nguyên nhân chênh lệch, hỗ trợ tra cứu số liệu và truy xuất chứng từ theo từng giao dịch.',
        ],
        imageLabel: 'Gen Agent phát hiện chênh lệch và đề xuất bút toán',
      },
    ],
  },

  pricing: {
    perMonth: '/ tháng',
    // the Vietnamese tablet / mobile banner keeps the solid desktop colours (the English one is 80% pale)
    solidBanner: true,
    bannerAngles: { desktop: '150.16deg', tablet: '119.05deg', mobile: '102.59deg' },
    wrapHeading: true,
    fitEnterpriseCta: true,
    heading: [
      // the desktop and tablet frames break the line after "cho"; the mobile frame lets it flow
      { text: 'Giá trị dành cho ', gradient: false, breakAfter: true },
      { text: 'phát triển doanh nghiệp', gradient: true },
      { text: ' của bạn', gradient: false },
    ],
    textLines: [
      'Lựa chọn gói dịch vụ phù hợp dựa trên số lượng pháp nhân, sàn thương mại điện tử và đơn hàng cần quản lý. Tất cả các gói đều có thời gian dùng thử miễn phí.',
    ],
    enterprise: {
      title: 'Doanh nghiệp lớn',
      lines: [
        'Không giới hạn pháp nhân và khối lượng, đăng nhập một lần (SSO), triển khai riêng,',
        'cam kết chất lượng dịch vụ, và hỗ trợ chuyển số liệu từ hệ thống cũ.',
      ],
      cta: { label: 'Liên hệ để báo giá' },
    },
    plans: [
      {
        name: 'Khởi đầu',
        description: 'Một công ty, mới bắt đầu bán đa sàn.',
        yearly: 'Trả năm: $490 — tiết kiệm 2 tháng',
        nowrapItems: [4],
        features: [
          '1 pháp nhân',
          '2 sàn',
          'Tới 2.000 đơn / tháng',
          '3 người dùng',
          'Đa tiền tệ và toàn bộ báo cáo',
          'Hỗ trợ qua email',
        ],
        cta: { label: 'Dùng thử miễn phí' },
      },
      {
        name: 'Tăng trưởng',
        badge: 'PHỔ BIẾN NHẤT',
        whiteBadge: true,
        strongInk: true,
        description: 'Nhóm vài công ty, bán trên nhiều sàn, khoá sổ hàng tháng.',
        yearly: 'Trả năm: $1.290 — tiết kiệm 2 tháng',
        nowrapItems: [4],
        nowrapItemsDesktop: [0, 1, 2],
        features: [
          '3 pháp nhân, có báo cáo hợp nhất',
          'Tất cả sàn đã hỗ trợ',
          'Tới 10.000 đơn / tháng',
          '10 người dùng, phân quyền theo vai trò',
          'Luồng phê duyệt và khoá kỳ',
          'Báo cáo lãi theo SKU và theo đơn',
        ],
        cta: { label: 'Dùng thử miễn phí' },
      },
      {
        name: 'Mở rộng',
        description: 'Nhóm công ty nhiều pháp nhân, khối lượng lớn, cần vết kiểm toán đầy đủ.',
        yearly: 'Trả năm: $2.990 — tiết kiệm 2 tháng',
        nowrapItems: [],
        features: [
          '10 pháp nhân',
          'Tới 50.000 đơn / tháng',
          '30 người dùng',
          'Khoá danh mục dùng chung toàn nhóm',
          'Xuất vết kiểm toán và sổ chi tiết',
          'Hỗ trợ ưu tiên và hỗ trợ khởi tạo',
        ],
        cta: { label: 'Dùng thử miễn phí' },
      },
    ],
  },

  faq: {
    tightHeading: true,
    heading: [
      { text: 'Những ', gradient: false },
      { text: 'câu hỏi', gradient: true },
      { text: ' thường gặp', gradient: false },
    ],
    text: 'Giải đáp những thắc mắc phổ biến về nền tảng và dịch vụ của chúng tôi.',
    items: [
      {
        question: 'Một tài khoản Genbook có thể kết nối bao nhiêu cửa hàng?',
        answer:
          'Một tài khoản Genbook có thể kết nối và quản lý nhiều cửa hàng trên cùng một nền tảng, giúp doanh nghiệp tập trung dữ liệu và theo dõi hiệu quả kinh doanh thuận tiện.',
      },
      {
        question: 'Doanh nghiệp có cần sử dụng thêm phần mềm kế toán khác khi đã có Genbook không?',
        answer:
          'Không bắt buộc. Genbook có thể được sử dụng làm hệ thống kế toán chính. Nếu doanh nghiệp đang sử dụng phần mềm kế toán khác, Genbook có thể hỗ trợ xử lý, đối soát dữ liệu thương mại điện tử và chuyển bút toán sang hệ thống hiện có.',
      },
      {
        question: 'Genbook có hỗ trợ lập báo cáo tài chính theo chuẩn mực kế toán không?',
        answer:
          'Có. Genbook hỗ trợ lập báo cáo tài chính theo VAS, IFRS và US GAAP, phù hợp với nhu cầu kế toán của doanh nghiệp hoạt động tại Việt Nam và các thị trường quốc tế.',
      },
      {
        question: 'Genbook có hỗ trợ xuất sổ sách và chứng từ phục vụ kiểm toán không?',
        answer:
          'Có. Genbook hỗ trợ xuất sổ cái, bảng đối soát và các chứng từ liên quan theo từng kỳ kế toán. Các bút toán được liên kết với giao dịch và chứng từ gốc, thuận tiện cho việc kiểm tra, đối chiếu và kiểm toán.',
      },
      {
        question: 'Dữ liệu kế toán và thông tin doanh nghiệp trên Genbook được bảo mật như thế nào?',
        answer:
          'Dữ liệu được mã hóa trong quá trình truyền tải và lưu trữ. Quyền truy cập được giới hạn theo tài khoản được cấp phép, giúp doanh nghiệp kiểm soát việc truy cập và quản lý thông tin trên hệ thống.',
      },
      {
        question: 'Genbook hỗ trợ những phương thức thanh toán nào?',
        answer:
          'Genbook chấp nhận thanh toán qua các loại thẻ tín dụng phổ biến và PayPal, mang lại sự thuận tiện cho khách hàng trong quá trình đăng ký và sử dụng dịch vụ.',
      },
    ],
  },

  cta: {
    heading: 'Kết nối với đội ngũ chuyên gia Genbook để khám phá giải pháp tự động hóa kế toán',
    headingLines: ['Kết nối với đội ngũ chuyên gia Genbook để', 'khám phá giải pháp tự động hóa kế toán'],
    headingLarge: true,
    before: 'Để được tư vấn hoặc hỗ trợ thêm thông tin, vui lòng gửi yêu cầu qua email ',
    dot: '.',
    after: 'Đội ngũ Genbook sẽ tiếp nhận và phản hồi trong vòng 24 giờ.',
    lineBreak: 'desktop',
    panelWide: false,
    angles: { desktop: '112.08deg', tablet: '107.58deg', mobile: '95.21deg' },
    secondary: { label: 'Liên hệ' },
    primary: { label: 'Dùng thử miễn phí' },
  },

  footer: {
    description:
      'Genbook là nền tảng quản lý tài chính và tự động hóa kế toán dành cho doanh nghiệp thương mại điện tử. Chúng tôi giúp nhà bán hàng trên toàn cầu tối ưu hóa lợi nhuận thông qua phân tích dữ liệu theo thời gian thực, theo dõi chi phí, quản lý hiệu quả quảng cáo, hàng tồn kho và các công cụ tự động hóa tiên tiến.',
    contact: {
      title: 'Liên hệ',
      // in this frame the address is an underlined mailto link
      textParts: [
        { text: 'Liên hệ với chúng tôi qua email: ', link: false },
        { text: 'support@genbook.io', link: true },
        { text: '. Đội ngũ Genbook sẽ phản hồi trong vòng 24 giờ!', link: false },
      ],
      socials: [{ label: 'Genbook trên LinkedIn' }, { label: 'Genbook trên Facebook' }],
    },
    products: {
      title: 'Sản phẩm',
      links: [
        { label: 'Giá trị đem lại' },
        { label: 'Tính năng' },
        { label: 'Bảng giá' },
        { label: 'Câu hỏi thường gặp' },
      ],
    },
    legal: {
      title: 'Hỗ trợ & Pháp lý',
      links: [{ label: 'Chính sách bảo mật' }, { label: 'Điều khoản dịch vụ' }, { label: 'Trung tâm hỗ trợ' }],
    },
    copyright: '© 2026 Genbook. Bảo lưu mọi quyền.',
  },

  contactModal: {
    titleLines: ['Hãy bắt đầu một', 'Cuộc trò chuyện'],
    fields: {
      fullName: 'Họ tên đầy đủ',
      phone: 'Số điện thoại',
      email: 'Email',
      industry: 'Lĩnh vực bạn đang hoạt động',
      company: 'Tên công ty',
      message: 'Gửi lời nhắn tới chúng tôi',
    },
    submit: 'Liên hệ',
    submitting: 'Đang gửi…',
    errors: {
      fullName: 'Vui lòng nhập họ tên của bạn.',
      phone: 'Vui lòng nhập số điện thoại hợp lệ.',
      email: 'Vui lòng nhập địa chỉ email hợp lệ.',
    },
    success: {
      title: 'Cảm ơn bạn!',
      text: 'Genbook đã nhận được thông tin của bạn. Đội ngũ Genbook sẽ liên hệ trong vòng 24 giờ.',
      close: 'Đóng',
    },
    failure: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc gửi email tới support@genbook.io.',
    a11y: {
      dialog: 'Đặt lịch trải nghiệm sản phẩm',
      close: 'Đóng',
      required: 'bắt buộc',
    },
  },
}
