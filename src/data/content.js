/*
 * All copy for the page, from the Figma file Accounting-Genbook (BSo47xDdofOAWXTIADvGwI), section "EN":
 * Desktop 160:5773 · Tablet 160:6179 · Mobile 160:6585 · FAQ answers 160:10381 – 160:10471 · Contact modal 193:51226.
 * Pricing, the contact panel and the footer are unchanged from the previous design and kept as they were.
 *
 * Artwork (the animated GIF / WebP files) is not listed here: each slot is picked up by name from
 * `src/assets/media/` (see data/media.js).
 *
 * Copy marked "not in the design" (form validation, success and error messages, screen-reader strings) was written
 * for this page and should be reviewed by the owner.
 */
import { links, SUPPORT_EMAIL } from './links'

export const navLinks = [
  { label: 'How it works', href: '#value' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

export const languages = ['EN', 'VI']

export const header = {
  cta: 'Start free trial',
  menuCta: 'Start free trial',
}

/* Screen-reader and tooltip strings that are not drawn in the design. */
export const a11y = {
  home: 'Genbook Accounting, home',
  primaryNav: 'Primary',
  menuNav: 'Menu',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
}

export const hero = {
  heading: 'Automated Accounting for E-commerce',
  text: 'Genbook connects data across platforms, automates journal entries, and reconciles individual orders.',
  primary: { label: 'Start free trial', href: links.signIn },
  // opens the contact modal
  secondary: { label: 'Schedule a demo' },
  imageLabel: 'Genbook accounting dashboard',
}

/*
 * Headings: `|` marks a line break that is only drawn in some frames. `titleBreaks` / `breaks` list those frames
 * (desktop · tablet · mobile); outside them the text simply reflows.
 */
export const steps = {
  heading: [
    { text: 'Accurate Accounting Records', gradient: false, breakAfter: ['desktop', 'tablet'] },
    { text: ' in ', gradient: false },
    { text: 'Just 3 Simple Steps', gradient: true },
  ],
  items: [
    {
      id: 'connect',
      slot: 'step-1',
      tone: 'green',
      title: 'Connect Data and Automate Journal Entries',
      text: 'Connect via API or uploaded reports to automatically record revenue, marketplace fees, advertising expenses, refunds, and exchange rate differences.',
      imageLabel: 'Google Sheets, Amazon and Etsy data feeding automatic journal entries',
    },
    {
      id: 'integrate',
      slot: 'step-2',
      tone: 'blue',
      title: 'Integrate Purchase Data and Off-Marketplace Expenses',
      titleBreaks: [{ after: 'Integrate Purchase Data', frames: ['tablet'] }],
      text: 'Import purchase and inventory data by SKU, sync marketplace records, and record off-marketplace expenses such as payroll and advertising.',
      imageLabel: 'Sales, ads, clicks and orders charted from purchase and marketplace data',
    },
    {
      id: 'reconcile',
      slot: 'step-3',
      tone: 'gradient',
      title: 'Reconcile, Review, and Generate Reports',
      text: 'Genbook flags discrepancies for accountants to review and approve, then uses the processed data to prepare accounting records, financial statements, and audit documentation.',
      imageLabel: 'Transaction reconciliation summary with accountant approval',
    },
  ],
}

export const features = {
  // one entry per heading line (each stays whole on desktop); `gradient` lines take the brand gradient
  headingLines: [
    { text: 'Comprehensive Accounting Solutions', gradient: false },
    { text: 'for E-commerce', gradient: false },
  ],
  // paragraphs: separate lines on desktop and mobile, one flowing paragraph on tablet
  textLines: [
    'Automate financial data consolidation and reporting designed to provide',
    "complete visibility into your business's financial position and performance.",
  ],
  // mobile: the visual sits above its copy in every row but the first (the Vietnamese frame keeps it below)
  mobileMediaFirst: true,
  rows: [
    {
      id: 'multi-platform',
      slot: 'feature-1',
      title: 'Multi-Platform Data Integration',
      bullets: [
        'Integrate data from e-commerce marketplaces, payment gateways, fulfillment providers, and invoicing systems via APIs or uploaded reports.',
        'Cross-check marketplace data against seller-uploaded reports to identify discrepancies at the individual order level.',
      ],
      imageLabel: 'Marketplace, payment and logistics data merged into a unified ledger',
      reverse: false,
      gap: '80',
    },
    {
      id: 'sku',
      slot: 'feature-2',
      title: 'Cost and Profitability Analysis by SKU',
      titleBreaks: [{ after: 'Cost and Profitability Analysis', frames: ['desktop'] }],
      bullets: [
        'Automatically calculate the cost of goods sold from purchase data, combining sales revenue and related expenses to determine profitability by SKU.',
      ],
      imageLabel: 'Selling price, cost of goods sold and gross profit by SKU',
      reverse: true,
      gap: '80',
    },
    {
      id: 'reconciliation',
      slot: 'feature-3',
      title: 'Automated Reconciliation and Audit Readiness',
      bullets: [
        'Reconcile sales revenue, payments, e-invoices, and customs declarations to identify discrepancies.',
        'Link journal entries to their underlying transactions and source documents for traceability.',
        'Maintain accounting records in accordance with VAS, IFRS, and US GAAP, with supporting documentation for audit purposes.',
      ],
      imageLabel: 'E-invoice match rate and reconciliation across revenue, payments and customs declarations',
      reverse: false,
      gap: '89',
    },
    {
      id: 'gen-agent',
      slot: 'feature-4',
      title: 'Gen Agent AI Accounting Assistant',
      titleBreaks: [{ after: 'Gen Agent', frames: ['desktop', 'mobile'] }],
      bullets: [
        'Categorize transactions, flag discrepancies, and recommend appropriate journal entries.',
        'Retrieve transaction-level financial data and supporting documents.',
      ],
      imageLabel: 'Gen Agent flagging a difference and suggesting a journal entry',
      reverse: true,
      gap: '80',
    },
  ],
}

export const pricing = {
  perMonth: '/ month',
  // Enterprise banner gradient angle per frame
  bannerAngles: { desktop: '148.54deg', tablet: '122.25deg', mobile: '102.59deg' },
  heading: [
    { text: 'Plans That ', gradient: false },
    { text: 'Grow With Your Business', gradient: true },
  ],
  textLines: [
    'Choose a plan by the number of entities, marketplaces and',
    'orders you manage. Every plan starts with a free trial.',
  ],
  enterprise: {
    title: 'Enterprise',
    lines: [
      'Unlimited entities and volume, single sign-on, dedicated deployment, a service-level',
      'agreement, and help migrating from your current system.',
    ],
    cta: { label: 'Talk to us', href: links.contact },
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      tone: 'outline',
      description: 'A single company finding its feet across two marketplaces.',
      price: '$49',
      priceGap: 'var(--space-4-27)',
      yearly: 'Yearly: $490 (two months free)',
      yearlyStrong: false,
      // the rows Figma sets on one line that run past the text column at the tablet / mobile widths
      nowrapItems: [4],
      features: [
        '1 legal entity',
        '2 marketplaces',
        'Up to 2,000 orders / month',
        '3 users',
        'Multi-currency and every report',
        'Email support',
      ],
      cta: { label: 'Start free trial', href: links.signIn },
    },
    {
      id: 'growth',
      name: 'Growth',
      tone: 'popular',
      badge: 'Most popular',
      description: 'Several companies, several marketplaces.',
      price: '$129',
      priceGap: 'var(--space-6)',
      yearly: 'Yearly: $1,290 (two months free)',
      nowrapItems: [4],
      nowrapItemsDesktop: [0, 1, 2],
      features: [
        '3 legal entities with consolidation',
        'Every supported marketplace',
        'Up to 10,000 orders / month',
        '10 users with role-based permissions',
        'Approval chains and period locks',
        'Margin reporting by SKU and by order',
      ],
      cta: { label: 'Start free trial', href: links.signIn },
    },
    {
      id: 'scale',
      name: 'Scale',
      tone: 'outline',
      description: 'A single company finding its feet across two marketplaces.',
      price: '$299',
      priceGap: 'var(--space-6)',
      yearly: 'Yearly: $2,990 (two months free)',
      yearlyStrong: true,
      nowrapItems: [3],
      features: [
        '10 legal entities',
        'Up to 50,000 orders / month',
        '30 users',
        'Group-wide master data locking',
        'Audit trail and ledger export',
        'Priority support and guided onboarding',
      ],
      cta: { label: 'Start free trial', href: links.signIn },
    },
  ],
}

export const faq = {
  heading: [
    { text: 'Frequently Asked ', gradient: false },
    { text: 'Questions', gradient: true },
  ],
  text: 'Find answers to common questions about Genbook and its services.',
  items: [
    {
      question: 'How many stores can I connect to one Genbook account?',
      answer:
        'A single Genbook account allows you to connect and manage multiple stores in one place, making it easier to centralize data and monitor business performance.',
    },
    {
      question: 'Do I need another accounting software if I use Genbook?',
      answer:
        'Not necessarily. Genbook can serve as your primary accounting system. If you already use another accounting software, Genbook can process and reconcile your e-commerce data and transfer journal entries to your existing system.',
    },
    {
      question: 'Does Genbook support financial reporting under accounting standards?',
      answer:
        'Yes. Genbook supports financial reporting in accordance with VAS, IFRS, and US GAAP, meeting the accounting needs of businesses operating in Vietnam and international markets.',
    },
    {
      question: 'Can Genbook export accounting records and supporting documents for audits?',
      answer:
        'Yes. Genbook allows you to export general ledgers, reconciliation reports, and supporting documents by accounting period. Journal entries are linked to their underlying transactions and source documents for easy review, reconciliation, and auditing.',
    },
    {
      question: 'How does Genbook protect my accounting and business data?',
      answer:
        'Genbook encrypts data both in transit and at rest. Access is restricted to authorized accounts, allowing businesses to control who can access and manage their information.',
    },
    {
      question: 'What payment methods does Genbook accept?',
      answer:
        'Genbook accepts major credit cards and PayPal, making it easy to pay for your subscription and manage your account.',
    },
  ],
}

export const cta = {
  heading: "Connect with Genbook's experts to explore our accounting automation solutions.",
  // the desktop frame breaks the heading after "explore"; below it the text flows
  headingLines: ["Connect with Genbook's experts to explore", 'our accounting automation solutions.'],
  before: 'For further information or assistance, please send your inquiry via email ',
  email: SUPPORT_EMAIL,
  dot: '',
  after: 'The Genbook team will review your request and respond within 24 hours.',
  lineBreak: 'always',
  // the English desktop panel is drawn 1320 wide (20px past the page inset on each side)
  panelWide: true,
  // panel gradient angle per frame
  angles: { desktop: '112.7deg', tablet: '108.18deg', mobile: '95.52deg' },
  secondary: { label: 'Contact us', href: links.contact },
  primary: { label: 'Start free trial', href: links.signIn },
}

export const footer = {
  description:
    'Genbook is an Accounting & Financial Operations System for E-commerce. We help sellers worldwide maximize profits through real-time analytics, cost tracking, PPC information, inventory management, and advanced automation tools.',
  contact: {
    title: 'Contact',
    // the frame sets the address as plain copy; it is a link that reads the same
    textParts: [
      { text: 'Email us at ' },
      { text: SUPPORT_EMAIL, link: true, plain: true },
      { text: '. We will respond within 24 hours!' },
    ],
    socials: [
      { label: 'Genbook on LinkedIn', href: links.linkedin, icon: 'linkedin' },
      { label: 'Genbook on Facebook', href: links.facebook, icon: 'facebook' },
    ],
  },
  products: {
    title: 'Products',
    links: [
      { label: 'Value', href: '#value' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQs', href: '#faqs' },
    ],
  },
  legal: {
    title: 'Support & Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
  copyright: '© 2026 Genbook. All rights reserved.',
}

/* The "Schedule a demo" pop-up (Figma "Modal pop-up-en" 193:51226). Placeholders, title and button are from the
   design; `errors`, `success`, `failure` and `a11y` are not in the design. */
export const contactModal = {
  titleLines: ['Let’s start a', 'Conversation'],
  fields: {
    fullName: 'Full name',
    phone: 'Contact number',
    email: 'Email',
    industry: 'Industry',
    company: 'Company name',
    message: 'Send us a message',
  },
  submit: 'Contact us',
  submitting: 'Sending…',
  errors: {
    fullName: 'Please enter your full name.',
    phone: 'Please enter a valid phone number.',
    email: 'Please enter a valid email address.',
  },
  success: {
    title: 'Thank you!',
    text: 'We have your details. The Genbook team will get in touch within 24 hours.',
    close: 'Close',
  },
  failure: `Something went wrong. Please try again, or email us at ${SUPPORT_EMAIL}.`,
  a11y: {
    dialog: 'Schedule a demo',
    close: 'Close',
    required: 'required',
  },
}
