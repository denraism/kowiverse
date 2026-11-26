/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — ANIMATION SHOWCASE VIDEOS
 * ─────────────────────────────────────────────────────────────
 *  How to add a video:
 *   1. Put the video file in  /public/videos/        (e.g. my-video.mp4)
 *   2. Put its thumbnail in   /public/videos/thumbnails/  (e.g. my-video.jpg)
 *   3. Add an entry below:
 *        {
 *          id: "my-video",                       // unique, no spaces
 *          title: "Judul Video",
 *          description: "Deskripsi singkat.",
 *          category: "Story Animation",          // any text; becomes a filter chip
 *          thumbnail: "/videos/thumbnails/my-video.jpg",
 *          videoUrl: "/videos/my-video.mp4",     // or a full https:// URL to an .mp4/.webm
 *          aspectRatio: "9:16",                  // "9:16" | "16:9" | "1:1"
 *        }
 *
 *  Rules:
 *   - `videoUrl: ""` → the card is shown as a "Segera Hadir" placeholder slot.
 *   - `thumbnail: ""` → a designed abstract placeholder is drawn instead.
 *   - Remove an entry to remove the video. Order here = order on the website.
 *
 *  The showcase scrolls endlessly: the list repeats, so a few videos are enough.
 */

export type AspectRatio = "9:16" | "16:9" | "1:1";

export type ShowcaseVideo = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  aspectRatio: AspectRatio;
};

/** Optional fixed order for category filter chips. Unlisted categories are appended. */
export const videoCategories = [
  "Stick Figure Animation",
  "Story Animation",
  "Character Animation",
  "Cinematic Animation",
  "Creative Experiments",
];

export const videos: ShowcaseVideo[] = [
  {
    id: "tinggi",
    title: "Bagaimana Jika Makin Tua, Makin Tinggi?",
    description: "Kisah Budi di kota tempat setiap ulang tahun membuatmu makin tinggi — dari 1 meter sampai 25 meter.",
    category: "Story Animation",
    thumbnail: "/videos/thumbnails/tinggi.jpg",
    videoUrl: "/videos/tinggi.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "gravitasi",
    title: "Bagaimana Jika Dunia Tanpa Gravitasi?",
    description: "Warga kota tiba-tiba melayang ke langit — cerita kartun 3D tentang dunia tanpa gravitasi.",
    category: "Story Animation",
    thumbnail: "/videos/thumbnails/gravitasi.jpg",
    videoUrl: "/videos/gravitasi.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "hujan-terbalik",
    title: "Bagaimana Jika Hujan Turun ke Langit?",
    description: "Di kota ini air terbang ke atas — jalanan selalu kering, sampai awan terlalu berat dan semuanya jatuh sekaligus.",
    category: "Story Animation",
    thumbnail: "/videos/thumbnails/hujan-terbalik.jpg",
    videoUrl: "/videos/hujan-terbalik.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "mimpi-lila",
    title: "Lila dan Mimpi yang Jadi Nyata",
    description: "Setiap mimpi Lila mulai muncul di dunia nyata — ditemani kucing yang bisa bicara, ia mencari tahu sebabnya.",
    category: "Story Animation",
    thumbnail: "/videos/thumbnails/mimpi-lila.jpg",
    videoUrl: "/videos/mimpi-lila.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "pulau-raka-naya",
    title: "Raka, Naya, dan Pulau Misterius",
    description: "Raka dan Naya terdampar di pulau misterius yang bisa bergetar — dan menemukan batu besar dengan tanda aneh.",
    category: "Story Animation",
    thumbnail: "/videos/thumbnails/pulau-raka-naya.jpg",
    videoUrl: "/videos/pulau-raka-naya.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "uang-dari-langit",
    title: "Bagaimana Jika Uang Turun dari Langit?",
    description: "Semua orang mendadak kaya — sampai harga-harga ikut melambung. Animasi stick figure tentang nilai uang.",
    category: "Stick Figure Animation",
    thumbnail: "/videos/thumbnails/uang-dari-langit.jpg",
    videoUrl: "/videos/uang-dari-langit.mp4",
    aspectRatio: "16:9",
  },
];
