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
 *  NOTE: The entries below are PLACEHOLDER SLOTS, not real KowiVerse projects.
 *  Replace them with your own animation examples.
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
    id: "example-01",
    title: "Example Animation 01",
    description: "Slot contoh animasi stick figure — video segera ditambahkan.",
    category: "Stick Figure Animation",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "9:16",
  },
  {
    id: "example-02",
    title: "Example Animation 02",
    description: "Slot contoh story animation — video segera ditambahkan.",
    category: "Story Animation",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "16:9",
  },
  {
    id: "example-03",
    title: "Example Animation 03",
    description: "Slot contoh character animation — video segera ditambahkan.",
    category: "Character Animation",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "1:1",
  },
  {
    id: "example-04",
    title: "Example Animation 04",
    description: "Slot contoh cinematic animation — video segera ditambahkan.",
    category: "Cinematic Animation",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "9:16",
  },
  {
    id: "example-05",
    title: "Example Animation 05",
    description: "Slot contoh creative experiment — video segera ditambahkan.",
    category: "Creative Experiments",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "9:16",
  },
  {
    id: "example-06",
    title: "Example Animation 06",
    description: "Slot contoh story animation — video segera ditambahkan.",
    category: "Story Animation",
    thumbnail: "",
    videoUrl: "",
    aspectRatio: "9:16",
  },
];
