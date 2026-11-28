/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — FAQ
 * ─────────────────────────────────────────────────────────────
 *  Edit, add, reorder or remove questions freely.
 *  Use a blank line ("\n\n") inside an answer to start a new paragraph.
 */

/** `bronzeOnly: true` → hidden while Kowi Bronze is hidden (SHOW_KOWI_BRONZE in config/pricing.ts). */
export const faqs: { question: string; answer: string; bronzeOnly?: boolean }[] = [
  {
    question: "Apa itu KowiVerse?",
    answer:
      "KowiVerse menyediakan prompt, panduan, dan contoh untuk membuat animasi pendek dengan AI. Tujuannya sederhana: kamu bisa langsung berkarya tanpa mulai dari nol.",
  },
  {
    question: "Apa yang dimaksud dengan animation prompts?",
    answer:
      "Instruksi teks untuk mengarahkan AI — soal karakter, gerakan, suasana, dan gaya visual. Prompt yang jelas membuat hasilnya lebih dekat dengan ide di kepalamu.",
  },
  {
    question: "Apa bedanya Kowi Bronze dan Kowi Metal?",
    bronzeOnly: true,
    answer:
      "Kowi Bronze berisi bahan dasar untuk mulai. Kowi Metal lebih lengkap, untuk kamu yang ingin melangkah lebih jauh.\n\nIsi tiap paket ada di bagian Pricing. Masih ragu? Tanya kami lewat WhatsApp.",
  },
  {
    question: "Bagaimana cara mengakses produk setelah membeli?",
    answer:
      "Pembelian diproses oleh Lynk.id. Setelah pembayaran berhasil, ikuti petunjuk di Lynk.id untuk mengakses produkmu. Ada kendala? Hubungi kami.",
  },
  {
    question: "Apakah saya perlu pengalaman animasi?",
    answer:
      "Tidak. Panduannya dibuat untuk pemula. Kalau sudah berpengalaman, kamu tetap bisa memakainya sebagai referensi.",
  },
  {
    question: "Apakah prompt-nya bisa dipakai di tool AI lain?",
    answer:
      "Bisa, sebagai titik awal. Hasilnya bisa berbeda tergantung tool, versi, dan pengaturan yang kamu pakai — jadi sesuaikan prompt-nya dan bereksperimenlah.",
  },
  {
    question: "Ke mana saya bisa minta bantuan?",
    answer:
      "Lewat WhatsApp — tombol hijau di pojok kanan bawah — atau kontak di bagian bawah halaman.",
  },
];
