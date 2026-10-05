import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vishwa-Vani",
    short_name: "VishwaVani",
    description: "The Universal Voice of Vedic Wisdom",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#EA580C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      }
    ]
  }
}
