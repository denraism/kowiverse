/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — WEBSITE COPY
 * ─────────────────────────────────────────────────────────────
 *  All visible section text lives here. Edit freely — components
 *  read from this file, so you never need to touch the layout.
 *
 *  Workflow steps → workflowContent below (mirrors the package contents)
 *  Pricing copy  → config/pricing.ts
 *  FAQ           → config/faq.ts
 *  Testimonials  → config/testimonials.ts
 *  Videos        → config/videos.ts
 */

export const heroContent = {
  label: "AI animation prompts & workflow",
  headline: "Turn your story into an animated short.",
  /** Words in the headline that get the emerald accent (must appear in `headline`). */
  highlight: "animated short.",
  description:
    "Prompt siap salin dan alur kerja yang jelas untuk membuat animasi pendek dengan AI — dari naskah sampai video. Dirancang untuk pemula.",
  primaryCta: { label: "See Examples", href: "#showcase" },
  secondaryCta: { label: "View Pricing", href: "#pricing" },
  /** Short reassurance points under the buttons. Keep them 100% true. */
  assurances: ["Tanpa pengalaman animasi", "Pembayaran via Lynk.id", "Bantuan lewat WhatsApp"],
  /**
   * Video shown on the right of the hero (plays silently on loop).
   * Set `src: ""` to bring back the old animated "kowiverse / prompt" illustration.
   */
  video: {
    src: "/videos/uang-dari-langit.mp4",
    poster: "/videos/thumbnails/uang-dari-langit.jpg",
    title: "Bagaimana Jika Uang Turun dari Langit?",
  },
  /** Small decorative prompt shown in the old hero illustration (used when video.src is ""). */
  visualPrompt:
    "a small orange ball bouncing across a quiet night city, squash & stretch, soft cinematic light",
};

export const showcaseContent = {
  label: "Showcase",
  title: "What you can make.",
  description:
    "Contoh animasi pendek, dari ide cerita sampai video jadi. Pilih satu untuk memutarnya.",
  allFilterLabel: "All",
  comingSoonLabel: "Coming soon",
  comingSoonModalText:
    "Video untuk slot ini sedang disiapkan.",
};

/**
 * Workflow — what Kowi Metal walks you through, in order.
 * Each step maps to the package contents in config/pricing.ts; keep them in sync.
 * The hero preview window reuses the step titles and tools.
 */
export const workflowContent = {
  label: "Workflow",
  title: "From idea to finished video.",
  description: "Kowi Metal memandu kamu lewat empat tahap. Tiap tahap punya prompt atau petunjuknya sendiri.",
  steps: [
    {
      number: "01",
      title: "Write the script",
      tool: "Google AI Studio",
      description: "Prompt siap salin untuk menulis naskah 1–2 menit dan membaginya per adegan.",
    },
    {
      number: "02",
      title: "Set up your tools",
      tool: "Panduan",
      description: "Siapkan semua alat yang dibutuhkan, langkah demi langkah.",
    },
    {
      number: "03",
      title: "Animate",
      tool: "Claude Code",
      description: "Pakai skill animasi untuk mengubah naskah menjadi video.",
    },
    {
      number: "04",
      title: "Review",
      tool: "Video",
      description: "Tinjau hasilnya dan revisi bagian yang perlu.",
    },
  ],
  /** Short facts under the steps. Keep them 100% true. */
  points: [
    { title: "Untuk pemula", text: "Tidak perlu pengalaman animasi." },
    { title: "Prompt siap salin", text: "Salin, sesuaikan, lalu jalankan." },
    { title: "Contoh nyata", text: "Lihat hasil jadinya di Showcase." },
  ],
};

export const pricingContent = {
  label: "Pricing",
  title: "Simple pricing.",
  description:
    "Bayar lewat Lynk.id, lalu dapatkan prompt, panduan, dan alur kerja lengkapnya.",
  stepsTitle: "Cara membeli",
  /** How buying works — shown next to the package card. */
  steps: [
    { title: "Choose a package", text: "Pilih paket yang sesuai dengan kebutuhanmu." },
    { title: "Pay via Lynk.id", text: "Pembayaran diproses oleh Lynk.id." },
    { title: "Get access", text: "Ikuti petunjuk akses yang diberikan setelah pembayaran." },
  ],
  recommendedLabel: "Recommended",
  priceFallback: "Segera diumumkan",
  priceFallbackNote: "Harga akan segera diumumkan.",
  fitLabel: "Cocok untuk",
  featuresLabel: "Isi paket",
  unavailableNote: "Link pembelian sedang disiapkan.",
  checkoutNote: "Pembayaran diproses oleh Lynk.id.",
  trustPoints: ["Pembayaran aman lewat Lynk.id", "Produk digital"],
  questionPrompt: "Ada pertanyaan sebelum membeli?",
  questionCta: "Tanya via WhatsApp",
};

export const testimonialsContent = {
  label: "Testimonials",
  title: "From our creators.",
  description: "Pengalaman nyata dari pengguna KowiVerse.",
  /**
   * When there are no testimonials yet (config/testimonials.ts is empty):
   *  - true  → show a small, honest "share your story" invitation
   *  - false → hide the entire Testimonials section
   */
  showEmptyState: true,
  emptyTitle: "Ceritamu bisa tampil di sini.",
  emptyDescription:
    "Kami hanya menampilkan testimoni asli. Sudah mencoba KowiVerse? Ceritakan pengalamanmu.",
  emptyCta: "Share Your Story",
  /** Pre-filled WhatsApp message for the "share your story" button. */
  shareMessage: "Halo KowiVerse! Saya ingin berbagi pengalaman setelah mencoba KowiVerse.",
};

export const faqContent = {
  label: "FAQ",
  title: "Questions, answered.",
  description:
    "Yang paling sering ditanyakan sebelum membeli.",
  moreQuestions: "Masih ada pertanyaan?",
  moreQuestionsCta: "Chat on WhatsApp",
};

export const finalCtaContent = {
  headline: "Ready to animate your first story?",
  description:
    "Prompt, panduan, dan alur kerja lengkap — semua dalam satu paket.",
  cta: { label: "View Pricing", href: "#pricing" },
};

export const footerContent = {
  description:
    "KowiVerse membantu kreator membuat animasi pendek dengan AI — lewat prompt siap salin dan alur kerja yang jelas.",
  navTitle: "Navigate",
  socialTitle: "Social",
  contactTitle: "Contact",
  contactFallback: "Kontak akan segera tersedia.",
  socialFallback: "Akun media sosial segera hadir.",
  rights: "All rights reserved.",
  bottomNote: "Made for Indonesian creators",
};
