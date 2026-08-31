import type { Config } from "@react-router/dev/config";
import { blogPosts } from "./app/data/blogPosts";
import { cimHaliProducts } from "./app/data/cimHaliProducts";
import { karoHaliProducts } from "./app/data/karoHaliProducts";

const staticRoutes = [
  "/",
  "/hakkimizda",
  "/karo-hali",
  "/cim-hali",
  "/galeri",
  "/blog",
  "/iletisim",
  "/gizlilik-politikasi",
  "/kullanim-kosullari",
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
