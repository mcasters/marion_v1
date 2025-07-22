import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "Marion Casters",
    name: "Oeuvres de Marion Casters",
    start_url: "/",
    display: "standalone",
    background_color: "#eee",
    theme_color: "#555555",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "icon-x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
