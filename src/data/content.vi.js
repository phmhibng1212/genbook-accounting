/*
 * Vietnamese copy, taken from the Vietnamese Figma frames (Desktop 91:9459, Tablet 91:9822,
 * Mobile 91:10185 and the FAQ / menu components 91:10548 – 91:10671).
 *
 * This is a patch over the English content (see i18n/merge.js): only text is listed here, so media,
 * links and layout flags come from content.js. Anything not listed falls back to English.
 *
 * Wording decisions made with the owner: "Giá trị đem lại" everywhere, "chính xác" in the hero,
 * "Khám phá tính năng" for the hero's second button, "Dùng thử miễn phí" for every free-trial button,
 * "Liên hệ" for the CTA's contact button (the Vietnamese tablet / mobile CTA frames still read "Contact us" /
 * "Start free trial").
 */
export default {
  navLinks: [
    { label: 'Giá trị đem lại' },
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
    benefits: 'Giá trị Genbook mang lại',
    chooseBenefit: 'Chọn giá trị',
    slide: (index, total) => `${index} trên ${total}`,
  },

  hero: {
    headingLines: ['Biến dữ liệu', 'thành tăng trưởng'],
    stackLines: true,
    fitActions: true,
    text: 'Tối ưu báo cáo bán hàng, dữ liệu chính xác và cập nhật thời gian thực giúp thúc đẩy doanh nghiệp của bạn.',
    primary: { label: 'Dùng thử miễn phí' },
    secondary: { label: 'Khám phá tính năng' },
    imageLabel: 'Bảng điều khiển kế toán Genbook',
  },

  value: {
    heading: [
      { text: 'Số liệu minh bạch, ', gradient: true },
      { text: 'đáng tin cậy', gradient: false },
      { text: ' ', gradient: true },
      { text: 'đến', gradient: false },
      { text: ' từng đơn hàng', gradient: true },
    ],
    text: 'Genbook chuyển đổi dữ liệu giao dịch thô từ các sàn thương mại điện tử thành dữ liệu phục vụ hạch toán kế toán, được phân loại, đối soát và sẵn sàng cho việc lập báo cáo.',
    items: [
      {
        title: 'Khớp với chuẩn mực kế toán',
        text: 'Tự động phân loại và chuẩn hóa dữ liệu giao dịch theo nghiệp vụ kế toán, hỗ trợ ghi nhận bút toán chính xác và lập báo cáo tài chính theo các chuẩn mực hiện hành.',
        paragraphs: null,
      },
      {
        title: 'Minh bạch doanh thu và lợi nhuận',
        text: 'Theo dõi chi tiết doanh thu, các khoản điều chỉnh và lợi nhuận thực tế sau khi trừ chi phí, giúp doanh nghiệp nắm rõ tình hình tài chính và đánh giá chính xác hiệu quả kinh doanh.',
      },
      {
        title: 'Kiểm soát toàn diện chi phí',
        text: 'Tổng hợp và phân loại các khoản chi phí, từ phí sàn, hoàn trả đến vận hành, giúp doanh nghiệp nắm rõ cơ cấu chi tiêu và các yếu tố tác động đến lợi nhuận.',
      },
      {
        title: 'Xác định lợi nhuận theo từng sản phẩm',
        text: 'Phân tích chi tiết doanh thu, chi phí và lợi nhuận theo từng mã sản phẩm (SKU), giúp doanh nghiệp xác định sản phẩm kinh doanh hiệu quả và những sản phẩm cần cải thiện hiệu suất.',
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

  reporting: {
    headingLines: [
      [
        { text: 'Từ ', gradient: false },
        { text: 'dữ liệu giao dịch', gradient: true },
      ],
      [
        { text: 'Đến ', gradient: false },
        { text: 'báo cáo tài chính toàn diện', gradient: true },
      ],
    ],
    textLines: [
      'Tự động tổng hợp số liệu và lập hệ thống báo cáo tài chính toàn diện, phản ánh chính xác tình hình tài chính và kết quả kinh doanh của doanh nghiệp.',
    ],
    rows: [
      {
        title: 'Bảng cân đối kế toán',
        titleLines: null,
        lines: [
          'Tổng hợp đầy đủ tài sản, nợ phải trả và vốn chủ sở hữu, mang lại cái nhìn toàn diện về tình hình tài chính, hỗ trợ đánh giá khả năng thanh toán, cơ cấu nguồn vốn và mức độ ổn định tài chính của doanh nghiệp.',
        ],
        imageLabel: 'Xem trước bảng cân đối kế toán',
      },
      {
        title: 'Báo cáo kết quả hoạt động kinh doanh',
        titleLines: null,
        lines: [
          'Tổng hợp doanh thu, giá vốn, chi phí và lợi nhuận trong kỳ báo cáo, phản ánh kết quả hoạt động kinh doanh và khả năng sinh lời, tạo cơ sở đánh giá hiệu quả và đưa ra các quyết định tài chính.',
        ],
        imageLabel: 'Xem trước báo cáo kết quả hoạt động kinh doanh',
      },
      {
        title: 'Báo cáo lưu chuyển tiền tệ',
        titleLines: null,
        lines: [
          'Tổng hợp và phân loại dòng tiền từ hoạt động kinh doanh, đầu tư và tài chính, hỗ trợ đánh giá khả năng tạo tiền, tình hình thanh khoản và sức khỏe tài chính của doanh nghiệp.',
        ],
        imageLabel: 'Xem trước báo cáo lưu chuyển tiền tệ',
      },
      {
        title: 'Bản thuyết minh báo cáo tài chính',
        titleLines: null,
        lines: [
          'Cung cấp thông tin chi tiết về các khoản mục trọng yếu, chính sách kế toán và những biến động tài chính trong kỳ, góp phần nâng cao tính minh bạch và độ tin cậy của hệ thống báo cáo tài chính.',
        ],
        imageLabel: 'Xem trước bản thuyết minh báo cáo tài chính',
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
          'Một tài khoản Genbook cho phép kết nối và quản lý nhiều cửa hàng trên cùng một nền tảng, thuận tiện cho việc tập trung dữ liệu và theo dõi hoạt động kinh doanh.',
      },
      {
        question: 'Tôi có thể nâng cấp hoặc thay đổi gói dịch vụ không?',
        answer:
          'Có. Genbook cung cấp các gói dịch vụ linh hoạt, cho phép bạn nâng cấp hoặc điều chỉnh theo nhu cầu sử dụng và quy mô kinh doanh. Đội ngũ Genbook luôn sẵn sàng tư vấn để bạn lựa chọn gói dịch vụ phù hợp.',
      },
      {
        question: 'Tôi có thể hủy bất cứ lúc nào không?',
        answer: 'Có. Bạn có thể chủ động hủy đăng ký dịch vụ bất cứ lúc nào mà không cần cung cấp lý do.',
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
}
