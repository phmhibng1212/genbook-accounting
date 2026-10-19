/*
 * All copy and media for the page. Text is taken from the Figma frames (Desktop 70:3392,
 * Tablet 78:4735, Mobile 78:5103; Value rows: Desktop-accounting 78:6053). The FAQ answers are the only
 * copy taken from the project brief (PROMPT_GENBOOK_ACCOUNTING_LP.md) rather than Figma.
 *
 * The `clip` / `heroClip` videos are the animated versions of the static product images (transparent WebM);
 * `clipStack` / `heroClipStack` are the same clips as stacked-alpha H.264 for Safari and iOS (see
 * components/ClipPlayer and scripts/encode-stacked-clips.mjs).
 */
import section201 from '../assets/images/section-2-01.webp'
import section202 from '../assets/images/section-2-02.webp'
import section203 from '../assets/images/section-2-03.webp'
import section204 from '../assets/images/section-2-04.webp'
import section3 from '../assets/images/section-3.webp'
import section4 from '../assets/images/section-4.webp'
import section5 from '../assets/images/section-5.webp'
import section6 from '../assets/images/section-6.webp'
import hero4 from '../assets/images/hero-4.webp'
import heroClipUrl from '../assets/clips/hero.webm'
import clip3 from '../assets/clips/section-3.webm'
import clip4 from '../assets/clips/section-4.webm'
import clip5 from '../assets/clips/section-5.webm'
import clip6 from '../assets/clips/section-6.webm'
import heroStack from '../assets/clips/hero.stack.mp4'
import stack3 from '../assets/clips/section-3.stack.mp4'
import stack4 from '../assets/clips/section-4.stack.mp4'
import stack5 from '../assets/clips/section-5.stack.mp4'
import stack6 from '../assets/clips/section-6.stack.mp4'
import { links, SUPPORT_EMAIL } from './links'

export const navLinks = [
  { label: 'Value', href: '#value' },
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
  benefits: 'Genbook benefits',
  chooseBenefit: 'Choose benefit',
  slide: (index, total) => `${index} of ${total}`,
}

export const hero = {
  headingLines: ['Turn Insights', 'Into Growth'],
  text: 'Better sales reports, accurate data & real-time reporting to empower your business.',
  primary: { label: 'Start free trial', href: links.signIn },
  secondary: { label: 'Explore features', href: '#features' },
  poster: hero4,
  imageLabel: 'Genbook accounting dashboard',
}

export const value = {
  // heading fragments; `gradient` fragments are set in the brand gradient
  heading: [
    { text: 'Clear Numbers', gradient: true },
    { text: ' You Can Trust, Down to ', gradient: false },
    { text: 'Every Order', gradient: true },
  ],
  text: 'Genbook turns raw marketplace transactions into accounting-ready data-classified, reconciled and ready for reporting.',
  items: [
    {
      title: 'Accounting-Matched',
      text: 'Automatically classifies and standardizes transaction data in accordance with accounting principles, supporting accurate journal entries and financial reporting in compliance with applicable accounting standards.',
      image: section201,
      artwork: 'wide',
      paragraphs: [
        'Automatically classifies and standardizes transaction data in accordance with accounting principles, supporting accurate journal entries and financial reporting in compliance with applicable',
        'accounting standards.',
      ],
      source: 'figma',
      tone: 'ink',
    },
    {
      title: 'Revenue and Profit Transparency',
      text: 'Provides detailed visibility into revenue, adjustments, and net profit after expenses, enabling businesses to assess financial performance and profitability with greater accuracy.',
      image: section202,
      artwork: 'wide',
      source: 'figma',
    },
    {
      title: 'Comprehensive Cost Control',
      text: 'Consolidates and categorizes expenses, including marketplace fees, returns, and operating costs, providing a clear breakdown of cost structures and the factors affecting profitability.',
      image: section203,
      artwork: 'compact',
      source: 'figma',
    },
    {
      title: 'SKU-Level Profitability Analysis',
      text: 'Analyzes revenue, costs, and profit at the individual SKU level, enabling businesses to identify winning and losing products.',
      image: section204,
      artwork: 'compact',
      source: 'figma',
    },
  ],
}

export const reporting = {
  // one array of fragments per heading line
  headingLines: [
    [
      { text: 'From ', gradient: false },
      { text: 'Transaction Data', gradient: true },
      { text: ' to', gradient: false },
    ],
    [{ text: 'Comprehensive Financial Reporting', gradient: true }],
  ],
  textLines: [
    'Automate financial data consolidation and reporting designed to provide',
    "complete visibility into your business's financial position and performance.",
  ],
  rows: [
    {
      id: 'balance-sheet',
      title: 'Balance Sheet',
      lines: [
        'Provides a comprehensive overview of assets, liabilities,',
        "and shareholders' equity, enabling businesses to assess",
        'their financial position, liquidity, and capital structure.',
      ],
      poster: section3,
      clip: clip3,
      clipStack: stack3,
      imageLabel: 'Balance sheet report preview',
      reverse: false,
      gap: '80',
    },
    {
      id: 'profit-and-loss',
      title: 'Profit and Loss Statement',
      lines: [
        'Consolidates revenue, cost of goods sold, expenses,',
        'and profit for the reporting period, providing insight into',
        'operating performance and profitability to support',
        'financial analysis and informed decision-making.',
      ],
      poster: section4,
      clip: clip4,
      clipStack: stack4,
      imageLabel: 'Profit and loss statement preview',
      reverse: true,
      fixedText: true,
      gap: '80',
    },
    {
      id: 'cash-flows',
      title: 'Statement of Cash Flows',
      lines: [
        'Consolidates and classifies cash flows from operating,',
        'investing, and financing activities, enabling businesses',
        'to assess cash generation capabilities, liquidity, and',
        'overall financial health.',
      ],
      poster: section5,
      clip: clip5,
      clipStack: stack5,
      imageLabel: 'Statement of cash flows preview',
      reverse: false,
      gap: '89',
    },
    {
      id: 'notes',
      title: 'Notes to the Financial Statements',
      titleLines: ['Notes to the|Financial', 'Statements'], // "|" = a break only the mobile frame has
      lines: [
        'Provides detailed disclosures on significant financial',
        'statement items, accounting policies, and material',
        'changes during the reporting period, enhancing the',
        'transparency and reliability of financial reporting.',
      ],
      poster: section6,
      clip: clip6,
      clipStack: stack6,
      imageLabel: 'Notes to the financial statements preview',
      reverse: true,
      gap: '40',
    },
  ],
}

export const heroClip = heroClipUrl
export const heroClipStack = heroStack

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
      question: 'How many stores can I connect to a single Genbook account?',
      answer:
        'A single Genbook account allows you to connect and manage multiple stores on the same platform, enabling centralized data management and streamlined business performance monitoring.',
    },
    {
      question: 'Can I upgrade or change my subscription plan?',
      answer:
        'Yes. Genbook offers flexible subscription plans that can be upgraded or adjusted to accommodate your business needs and growth. The Genbook team is available to help you select the most suitable plan.',
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes. You can cancel your subscription at any time without providing a reason.',
    },
    {
      question: 'What payment methods does Genbook accept?',
      answer:
        'Genbook accepts all major credit cards and PayPal, providing convenient payment options for subscription and service fees.',
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
