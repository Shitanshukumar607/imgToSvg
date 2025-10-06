import constantSEO from "@/lib/constantSEO";

export const metadata = {
  title: "Sitemap",
};

export default function sitemap() {
  const baseUrl = constantSEO.baseUrl;
  const lastMod = new Date().toISOString();

  return [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // generate - High priority
    {
      url: `${baseUrl}/generate`,
      lastModified: lastMod,
      changeFrequency: "always",
      priority: 0.9,
    },
    // Collections - Medium priority
    {
      url: `${baseUrl}/collections`,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 0.7,
    },
    // Badges - Medium priority
  ];
}
