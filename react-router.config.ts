import type { Config } from "@react-router/dev/config";
import { blogPosts } from "./src/data/blogPosts";
import { cimHaliProducts } from "./src/data/cimHaliProducts";
import { karoHaliProducts } from "./src/data/karoHaliProducts";

const staticRoutes = [
  "/",
  "/hakkimizda",
  "/karo-hali",
  "/cim-hali",
  "/referanslarimiz",
  "/blog",
  "/iletisim",
  "/gizlilik",
  "/kosullar",
  "/kvkk",
  "/cerez-politikasi",
];

export default {
  ssr: false,
  async prerender() {
    const dynamicRoutes = [
      ...karoHaliProducts.map((p) => `/karo-hali/${p.slug}`),
      ...cimHaliProducts.map((p) => `/cim-hali/${p.slug}`),
      ...blogPosts.map((p) => `/blog/${p.slug}`),
    ];
    return [...staticRoutes, ...dynamicRoutes];
  },
} satisfies Config;
