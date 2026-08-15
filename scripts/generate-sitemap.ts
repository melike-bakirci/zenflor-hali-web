import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/data/blogPosts.ts";
import { cimHaliProducts } from "../src/data/cimHaliProducts.ts";
import { karoHaliProducts } from "../src/data/karoHaliProducts.ts";
import { SITE_URL } from "../src/constants.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const staticRoutes = [
  "/",
  "/hakkimizda",
  "/karo-hali",
  "/cim-hali",
  "/referanslarimiz",
  "/blog",
  "/iletisim",
];

const dynamicRoutes = [
  ...karoHaliProducts.map((p) => `/karo-hali/${p.slug}`),
  ...cimHaliProducts.map((p) => `/cim-hali/${p.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];

const urls = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(join(rootDir, "public", "sitemap.xml"), sitemap);
console.log(`sitemap.xml written with ${urls.length} URLs`);
