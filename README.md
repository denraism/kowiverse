# KowiVerse — Website

> **From idea to animated short.**

Landing page resmi KowiVerse: bertema Emerald (gelap netral × aksen emerald, terinspirasi Raycast/Linear), Bahasa Indonesia × English, fully responsive, dengan video showcase, dua paket harga (Kowi Bronze & Kowi Metal) yang terhubung ke Lynk.id, dan tombol WhatsApp mengambang.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons · Inter (Geist Mono untuk angka/kode)

---

## Daftar Isi

1. [Menjalankan website](#1-menjalankan-website)
2. [Peta file — apa yang diedit di mana](#2-peta-file--apa-yang-diedit-di-mana)
3. [Branding & logo](#3-branding--logo)
4. [Mengedit teks website](#4-mengedit-teks-website)
5. [Video showcase: menambah, mengganti, menghapus](#5-video-showcase)
6. [Paket Kowi Bronze & Kowi Metal](#6-paket-kowi-bronze--kowi-metal)
7. [Memasang link Lynk.id](#7-memasang-link-lynkid)
8. [WhatsApp: nomor & pesan](#8-whatsapp-nomor--pesan)
9. [Social media & email](#9-social-media--email)
10. [Testimoni & FAQ](#10-testimoni--faq)
11. [SEO](#11-seo)
12. [Build & deploy](#12-build--deploy)
13. [Checklist sebelum go-live](#13-checklist-sebelum-go-live)

---

## 1. Menjalankan website

Butuh **Node.js 20.9+** (disarankan 22).

```bash
npm install
```

```bash
npm run dev
```

Buka http://localhost:3000. Setiap perubahan file langsung terlihat.

Cek versi production secara lokal:

```bash
npm run build
```

```bash
npm start
```

---

## 2. Peta file — apa yang diedit di mana

**Semua data bisnis ada di folder `config/`.** Kamu tidak perlu menyentuh folder `components/` untuk mengganti isi website.

| File | Isinya |
| --- | --- |
| `config/site.ts` | Nama brand, tagline, logo, menu navigasi, SEO |
| `config/content.ts` | Semua teks section (Hero, Showcase, Workflow, Pricing, Testimonials, FAQ, Final CTA, Footer) |
| `config/videos.ts` | Daftar video showcase + urutan kategori |
| `config/pricing.ts` | **Link Lynk.id**, harga, & daftar benefit Kowi Bronze / Kowi Metal |
| `config/contact.ts` | **Nomor WhatsApp**, pesan default, email |
| `config/social.ts` | Link Instagram / TikTok / YouTube |
| `config/testimonials.ts` | Testimoni (hanya yang asli) |
| `config/faq.ts` | Pertanyaan & jawaban FAQ |
| `app/globals.css` | Warna (design tokens), gradien, font, ukuran kartu video |
| `config/theme.ts` | Salinan palet untuk gambar share & warna browser |
| `public/` | Gambar, video, thumbnail, logo |

---

## 3. Branding & logo

### Warna (Emerald)
Semua warna adalah design tokens di blok `@theme` paling atas `app/globals.css`. Komponen hanya memakai nama token (mis. `bg-card`, `text-muted`, `bg-accent`), jadi cukup ubah nilai di sana dan seluruh website ikut berubah.

```css
--color-bg: #090a0b;                    /* background utama */
--color-bg-2: #101214;                  /* background section selang-seling */
--color-card: #15191a;                  /* permukaan / kartu */
--color-card-2: #1b2022;                /* permukaan terangkat / hover */
--color-line: rgb(255 255 255 / 0.08);  /* border halus */
--color-line-2: rgb(52 211 153 / 0.25); /* border hover / penekanan */
--color-accent: #10b981;                /* emerald utama — CTA, state aktif */
--color-accent-2: #34d399;              /* emerald sekunder — hover, teks aksen kecil */
--color-mint: #6ee7b7;                  /* emerald lembut — highlight tenang */
--color-fg: #f5f7f6;                    /* teks utama */
--color-muted: #a1aaa5;                 /* teks sekunder */
--color-subtle: #7c8680;                /* teks redup — label meta kecil (sedikit lebih terang dari #737d77 agar lolos AA) */
--color-ink: #06100c;                   /* teks di atas tombol emerald */
```

Token semantik: `--color-success` `#34d399`, `--color-warning` `#fbbf24`, `--color-error` `#fb7185`, `--color-info` `#67e8f9`.
Radius: `--radius-control` 10px (tombol, chip), `--radius-card` 14px, `--radius-panel` 16px.

Gradien bernama (juga di `globals.css`, dibangun dari token): `bg-hero`, `bg-glow-top`, `bg-stage`, `surface-bronze`, `surface-metal`, `surface-cta`. Satu-satunya permukaan transparan adalah header (`liquid-bar`).

**Panduan:** emerald hanya untuk aksen — CTA utama, state aktif, ikon kecil, highlight penting. Kedalaman dibuat dari tingkatan permukaan (`bg` → `bg-2` → `card` → `card-2`) dan border tipis, bukan dari bayangan, glow, atau efek kaca.

**Tempat yang tidak bisa membaca CSS:** gambar share (`app/opengraph-image.tsx`) dan warna browser (`theme-color`) memakai salinan palet di `config/theme.ts`; favicon `app/icon.svg` adalah file statis. Kalau palet diubah, perbarui ketiganya juga.

Tombol WhatsApp sengaja **tidak** mengikuti tema — tetap hijau resmi WhatsApp.

### Logo
Secara default, logo adalah simbol **K** abstrak (SVG) + tulisan "KowiVerse".

Mengganti dengan logo sendiri:
1. Simpan file di `public/images/`, misalnya `public/images/logo.svg`.
2. Buka `config/site.ts` dan isi:
   ```ts
   logo: {
     src: "/images/logo.svg",
     alt: "KowiVerse logo",
     width: 140,   // lebar asli logo (px)
     height: 32,   // tinggi asli logo (px)
   },
   ```
3. Logo otomatis dipakai di navbar dan footer.

**Favicon** ada di `app/icon.svg` — ganti file itu dengan icon kamu (SVG atau ganti jadi `app/icon.png`).

**Gambar share (Open Graph)** dibuat otomatis oleh `app/opengraph-image.tsx`. Kalau mau pakai gambar sendiri, hapus file itu dan taruh `app/opengraph-image.png` (1200×630).

---

## 4. Mengedit teks website

Semua copywriting ada di **`config/content.ts`**, dikelompokkan per section (`heroContent`, `showcaseContent`, `workflowContent`, dst). Langkah di `workflowContent` mengikuti isi paket Kowi Metal di `config/pricing.ts` — ubah keduanya bersamaan. Edit teks di dalam tanda kutip, simpan, selesai.

Contoh — mengganti headline hero:

```ts
export const heroContent = {
  headline: "Turn your story into an animated short.",
  highlight: "animated short.",   // bagian headline yang diwarnai emerald
  ...
};
```

> Kalau `highlight` diubah, pastikan teksnya persis ada di dalam `headline`.

---

## 5. Video showcase

File: **`config/videos.ts`**

### Menambah video
1. Taruh file video di `public/videos/` → misalnya `public/videos/robot-dance.mp4`
2. Taruh thumbnail di `public/videos/thumbnails/` → misalnya `robot-dance.jpg`
3. Tambahkan entri di array `videos`:

```ts
{
  id: "robot-dance",                              // unik, tanpa spasi
  title: "Robot Dance",
  description: "Robot kecil menari di tengah kota.",
  category: "Character Animation",
  thumbnail: "/videos/thumbnails/robot-dance.jpg",
  videoUrl: "/videos/robot-dance.mp4",
  aspectRatio: "9:16",                            // "9:16" | "16:9" | "1:1"
},
```

Urutan di array = urutan di website.

### Mengganti / mengedit / menghapus
- **Ganti thumbnail:** timpa file gambarnya, atau ubah path `thumbnail`.
- **Edit judul/deskripsi/kategori:** ubah `title`, `description`, `category`.
- **Hapus video:** hapus seluruh blok `{ ... }` entri tersebut.

### Kategori & filter
Tombol filter dibuat otomatis dari kategori yang dipakai video. Urutan tombol mengikuti `videoCategories`; kategori baru yang tidak ada di daftar itu otomatis ditambahkan di belakang. Filter disembunyikan kalau hanya ada satu kategori.

### Aturan penting
- `videoUrl: ""` → kartu tampil sebagai slot **"Segera Hadir"** (tidak ada video yang diputar).
- `thumbnail: ""` atau thumbnail gagal dimuat → otomatis diganti artwork abstrak.
- Entri yang ada sekarang (`Example Animation 01–06`) adalah **slot placeholder**, bukan karya asli. Ganti dengan video KowiVerse kamu.

### Tips video
- Format: **MP4 (H.264 + AAC)** — paling kompatibel di semua HP. Usahakan < 10 MB per video.
- Thumbnail: JPG/WebP, rasio sama dengan videonya (mis. 1080×1920 untuk 9:16).
- Boleh juga pakai URL eksternal langsung ke file `.mp4`/`.webm` (https). Link halaman YouTube/TikTok **tidak** bisa diputar langsung.
- Video tidak di-download saat halaman dibuka — baru dimuat saat pengunjung klik. Video tidak pernah autoplay saat halaman dibuka.

Tinggi kartu video bisa diatur lewat `--card-h` di `app/globals.css`.

---

## 6. Paket Kowi Bronze & Kowi Metal

File: **`config/pricing.ts`** → array `pricingPackages`.

Website sengaja dibuat untuk **tepat dua paket** (dipaksa oleh tipe TypeScript-nya).

```ts
{
  id: "bronze",
  name: "Kowi Bronze",
  label: "Your Creative Start",
  description: "Pilihan tepat untuk kamu yang ingin mulai ...",
  bestFor: "Pemula yang ingin mulai dengan essential resources.",
  price: "Rp49.000",          // "" → tampil "Segera Diumumkan"
  priceNote: "sekali bayar",  // opsional, "" untuk sembunyikan
  features: [
    "Isi benefit asli #1",
    "Isi benefit asli #2",
  ],
  ctaLabel: "Get Kowi Bronze",
  purchaseUrl: KOWI_BRONZE_URL,
  recommended: false,          // true = kartu premium + label RECOMMENDED
},
```

- **Harga:** isi `price` (teks bebas, contoh `"Rp49.000"`). Angka di atas hanya contoh — isi dengan harga asli.
- **Benefit:** ganti teks dalam tanda `[...]` dengan isi paket yang sebenarnya. Tambah/hapus baris sesuka kamu. Teks yang diawali `[` ditampilkan miring & abu-abu sebagai penanda placeholder.
- **Kowi Metal** sudah diset `recommended: true`.

---

## 7. Memasang link Lynk.id

File: **`config/pricing.ts`**, paling atas:

```ts
export const KOWI_BRONZE_URL = "https://lynk.id/namatoko/kowi-bronze";
export const KOWI_METAL_URL  = "https://lynk.id/namatoko/kowi-metal";
```

Selesai — tombol **Get Kowi Bronze** dan **Get Kowi Metal** langsung aktif dan membuka halaman Lynk.id di tab baru. Tidak perlu mengubah komponen apa pun.

Pengaman bawaan:
- Link kosong → tombol tampil terkunci dengan catatan *"Link pembelian sedang disiapkan."* dan **tidak** redirect.
- Link dianggap valid hanya jika `https://` dan domainnya `lynk.id` (atau subdomain seperti `www.lynk.id`), dan bukan halaman utama `lynk.id/` saja.
- Pakai domain checkout lain? Tambahkan ke `ALLOWED_CHECKOUT_HOSTS` di file yang sama.

Pembayaran sepenuhnya diproses oleh Lynk.id — website tidak punya checkout internal.

---

## 8. WhatsApp: nomor & pesan

File: **`config/contact.ts`**

```ts
export const WHATSAPP_NUMBER = "6281234567890";
```

Format **wajib**:

| ✅ Benar | ❌ Salah |
| --- | --- |
| `6281234567890` | `+6281234567890` (pakai +) |
| | `081234567890` (diawali 0) |
| | `62 812 3456 7890` (ada spasi) |

**Mengubah pesan otomatis:**

```ts
export const WHATSAPP_DEFAULT_MESSAGE = "Halo KowiVerse! ...";
```

Pesan di-encode otomatis menjadi link `https://wa.me/62...?text=...`.

**Opsi lain** di objek `whatsappButton`: teks tooltip, label aksesibilitas, atau `enabled: false` untuk mematikan tombol.

Perilaku tombol:
- Selama nomor masih placeholder (`628XXXXXXXXXX`) atau tidak valid: di **production** tombol & semua link WhatsApp disembunyikan; di **`npm run dev`** muncul tombol abu-abu (disabled) sebagai pengingat. Tidak pernah ada link WhatsApp yang rusak.
- Setelah nomor valid: tombol hijau muncul di pojok kanan bawah di semua halaman, plus link WhatsApp di Pricing, FAQ, Testimonials, dan Footer.
- Tombol otomatis "minggir" sebentar saat posisinya akan menutupi tombol pembelian atau kontrol carousel, dan saat modal video / menu mobile terbuka.

---

## 9. Social media & email

**`config/social.ts`** — isi URL lengkap (https). Yang kosong otomatis disembunyikan.

```ts
{ platform: "instagram", label: "Instagram", url: "https://instagram.com/kowiverse" },
```

**`config/contact.ts`** — email publik (opsional):

```ts
export const CONTACT_EMAIL = "halo@domainkamu.com";
```

---

## 10. Testimoni & FAQ

### Testimoni — `config/testimonials.ts`
Tambahkan **hanya testimoni asli** (dengan izin customer):

```ts
export const testimonials: Testimonial[] = [
  {
    name: "Nama Customer",
    role: "Content Creator",               // "" untuk sembunyikan
    quote: "Isi testimoni asli...",
    avatar: "/images/testimonials/nama.jpg", // "" → inisial nama
    rating: 5,                              // 1–5, atau 0 untuk sembunyikan bintang
  },
];
```

Entri dengan nama atau quote kosong dilewati otomatis. Selama belum ada testimoni, section menampilkan ajakan "Bagikan Pengalamanmu". Ingin menyembunyikan section sepenuhnya? Set `showEmptyState: false` di `testimonialsContent` (`config/content.ts`).

### FAQ — `config/faq.ts`
Edit, tambah, atau hapus pasangan `question` / `answer`. Gunakan `\n\n` di dalam jawaban untuk membuat paragraf baru. FAQ juga otomatis dikirim ke Google sebagai structured data (FAQPage).

---

## 11. SEO

Di `config/site.ts` → `site.seo`: title, description, keywords.

Sudah termasuk:
- Title & meta description, Open Graph & Twitter card (gambar share otomatis)
- `lang="id"`, satu `<h1>`, heading hierarchy rapi, alt text deskriptif
- `robots.txt`, `sitemap.xml`, JSON-LD (Organization + FAQPage)

**Penting saat deploy:** set environment variable domain kamu agar canonical URL, sitemap, dan Open Graph benar:

```
NEXT_PUBLIC_SITE_URL=https://www.domainkamu.com
```

---

## 12. Build & deploy

### Vercel (paling mudah)
1. Push project ini ke GitHub.
2. Di [vercel.com](https://vercel.com) → **Add New Project** → pilih repo.
3. Tambahkan environment variable `NEXT_PUBLIC_SITE_URL` (domain kamu).
4. Klik **Deploy**. Setiap push berikutnya otomatis ter-deploy.

### Hosting lain (VPS / Node.js)
```bash
npm install
```

```bash
NEXT_PUBLIC_SITE_URL=https://www.domainkamu.com npm run build
```

```bash
npm start
```

Website berjalan di port 3000 (ubah dengan `npm start -- -p 8080`).

> Setiap kali mengubah file di `config/`, jalankan build ulang (Vercel melakukannya otomatis setelah push).

---

## 13. Checklist sebelum go-live

- [ ] `KOWI_BRONZE_URL` & `KOWI_METAL_URL` diisi link Lynk.id asli (`config/pricing.ts`)
- [ ] Harga & benefit asli kedua paket diisi; tidak ada lagi teks `[...]` (`config/pricing.ts`)
- [ ] `WHATSAPP_NUMBER` diisi nomor asli format `62...` (`config/contact.ts`)
- [ ] Video & thumbnail asli menggantikan slot `Example Animation` (`config/videos.ts`)
- [ ] Link social media diisi (`config/social.ts`)
- [ ] `NEXT_PUBLIC_SITE_URL` diset di hosting
- [ ] Cek di HP: klik tombol WhatsApp, Get Kowi Bronze, dan Get Kowi Metal
