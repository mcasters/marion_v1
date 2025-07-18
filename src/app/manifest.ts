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
        src: "icon-x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icon-x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon-x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icon-x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icon-x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icon-x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable_icon_x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "maskable_icon_x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
