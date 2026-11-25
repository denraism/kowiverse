/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — WEBSITE COPY
 * ─────────────────────────────────────────────────────────────
 *  All visible section text lives here. Edit freely — components
 *  read from this file, so you never need to touch the layout.
 *
 *  Pricing copy  → config/pricing.ts
 *  FAQ           → config/faq.ts
 *  Testimonials  → config/testimonials.ts
 *  Videos        → config/videos.ts
 */

export const heroContent = {
  label: "KowiVerse — Animation Prompt Collection",
  headline: "Turn Your Imagination Into Animation.",
  /** Words in the headline that get the orange accent. */
  highlight: "Animation.",
  description:
    "Punya ide animasi keren tapi bingung mulai dari mana? KowiVerse hadir dengan kumpulan animation prompts dan creative resources yang membantu kamu mengubah ide menjadi karya visual yang lebih menarik.",
  primaryCta: { label: "Explore Examples", href: "#showcase" },
  secondaryCta: { label: "Lihat Paket", href: "#pricing" },
  /** Short reassurance points under the buttons. Keep them 100% true. */
  assurances: ["Ramah untuk pemula", "Pembelian aman via Lynk.id", "Tanya langsung via WhatsApp"],
  /** Small decorative prompt shown in the hero visual (illustration only). */
  visualPrompt:
    "a small orange ball bouncing across a quiet night city, squash & stretch, soft cinematic light",
};

export const showcaseContent = {
  label: "Creative Showcase",
  title: "See What You Can Create.",
  description:
    "Setiap ide punya potensi untuk jadi sesuatu yang luar biasa. Explore berbagai contoh animasi dan temukan inspirasi untuk project berikutnya.",
  allFilterLabel: "Semua",
  comingSoonLabel: "Segera Hadir",
  comingSoonModalText:
    "Video contoh untuk slot ini sedang disiapkan dan akan segera ditambahkan. Pantau terus KowiVerse, ya!",
};

export const featuresContent = {
  label: "Features",
  title: "Everything You Need to Create.",
  description:
    "Semua yang kamu butuhkan untuk mulai mengeksplorasi animation prompting — dari referensi prompt sampai contoh visual.",
  items: [
    {
      icon: "prompts",
      title: "Ready-to-Use Prompts",
      description:
        "Mulai berkarya tanpa harus selalu memikirkan prompt dari nol. Temukan referensi prompt yang bisa kamu eksplorasi.",
    },
    {
      icon: "inspiration",
      title: "Creative Inspiration",
      description:
        "Temukan berbagai ide, gaya visual, dan inspirasi baru untuk mengembangkan kreativitasmu.",
    },
    {
      icon: "examples",
      title: "Visual Examples",
      description:
        "Lihat langsung contoh hasil animasi agar kamu punya gambaran tentang kemungkinan yang bisa dieksplorasi.",
    },
    {
      icon: "workflow",
      title: "Simple Workflow",
      description:
        "Dirancang agar lebih mudah dipahami dan digunakan, bahkan jika kamu baru mulai mengenal dunia animation prompting.",
    },
  ] as const,
};

export const howItWorksContent = {
  label: "How It Works",
  title: "Your Creative Journey Starts Here.",
  description: "Tiga langkah sederhana dari ide di kepala sampai karya animasi pertamamu.",
  steps: [
    {
      number: "01",
      title: "Choose Your Package",
      description:
        "Pilih paket KowiVerse yang paling sesuai dengan kebutuhan dan perjalanan kreatifmu.",
    },
    {
      number: "02",
      title: "Get Your Resources",
      description:
        "Lakukan pembelian melalui Lynk.id dan ikuti petunjuk untuk mendapatkan produk digitalmu.",
    },
    {
      number: "03",
      title: "Start Creating",
      description:
        "Mulai eksplorasi, kembangkan ide, dan ciptakan karya animasi versimu sendiri.",
    },
  ],
};

export const pricingContent = {
  label: "Pricing",
  title: "Choose Your Creative Level.",
  description:
    "Temukan paket yang sesuai dengan kebutuhanmu. Mulai dari essential resources hingga pilihan yang lebih lengkap.",
  recommendedLabel: "Recommended",
  priceFallback: "Segera Diumumkan",
  priceFallbackNote: "Harga akan diumumkan segera",
  fitLabel: "Cocok untuk",
  featuresLabel: "Yang kamu dapatkan",
  unavailableNote: "Link pembelian sedang disiapkan.",
  checkoutNote: "Pembelian & pembayaran diproses melalui Lynk.id",
  trustPoints: [
    "Pembayaran diproses langsung oleh Lynk.id",
    "Produk digital — ikuti petunjuk akses setelah pembelian",
  ],
  questionPrompt: "Masih bingung pilih paket yang mana?",
  questionCta: "Tanya via WhatsApp",
};

export const testimonialsContent = {
  label: "Testimonials",
  title: "Creators Speak.",
  description: "Pengalaman dan feedback dari para pengguna KowiVerse.",
  /**
   * When there are no testimonials yet (config/testimonials.ts is empty):
   *  - true  → show a small, honest "share your story" invitation
   *  - false → hide the entire Testimonials section
   */
  showEmptyState: true,
  emptyTitle: "Cerita kreatifmu bisa tampil di sini.",
  emptyDescription:
    "KowiVerse hanya menampilkan testimoni asli dari pengguna. Sudah mencoba KowiVerse? Kami senang sekali kalau kamu mau berbagi pengalaman.",
  emptyCta: "Bagikan Pengalamanmu",
  /** Pre-filled WhatsApp message for the "share your story" button. */
  shareMessage: "Halo KowiVerse! Saya ingin berbagi pengalaman setelah mencoba KowiVerse.",
};

export const faqContent = {
  label: "FAQ",
  title: "Got Questions?",
  description:
    "Temukan jawaban sebelum kamu memulai perjalanan kreatif bersama KowiVerse.",
  moreQuestions: "Pertanyaanmu belum terjawab?",
  moreQuestionsCta: "Chat kami di WhatsApp",
};

export const finalCtaContent = {
  headline: "Your Ideas Deserve to Be Created.",
  description:
    "Jangan biarkan ide kreatifmu berhenti di pikiran. Explore KowiVerse dan mulai perjalanan animasimu sekarang.",
  cta: { label: "Explore KowiVerse", href: "#pricing" },
};

export const footerContent = {
  description:
    "KowiVerse adalah creative resource platform untuk membantu kamu mengeksplorasi dunia animation prompting, menemukan inspirasi, dan mengembangkan ide menjadi karya visual.",
  navTitle: "Navigasi",
  socialTitle: "Social",
  contactTitle: "Kontak",
  contactFallback: "Informasi kontak akan segera diperbarui.",
  socialFallback: "Akun social media segera hadir.",
  rights: "All rights reserved.",
  bottomNote: "Animation Prompter · Made for Indonesian creators",
};
