import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://knifeatlanta.com";
  const paths = [
    "",
    "/menu",
    "/story",
    "/gallery",
    "/private-dining",
    "/contact",
    "/reservations",
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
