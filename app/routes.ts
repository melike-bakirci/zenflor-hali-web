import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("hakkimizda", "./routes/about.tsx"),
  route("karo-hali", "./routes/karo-hali.tsx"),
  route("karo-hali/:slug", "./routes/karo-hali-detail.tsx"),
  route("cim-hali", "./routes/cim-hali.tsx"),
  route("cim-hali/:slug", "./routes/cim-hali-detail.tsx"),
  route("referanslarimiz", "./routes/references.tsx", { id: "references" }),
  route("blog", "./routes/blog.tsx"),
  route("blog/:slug", "./routes/blog-detail.tsx"),
  route("iletisim", "./routes/contact.tsx"),
  route("gizlilik", "./routes/legal.tsx", { id: "legal-privacy" }),
  route("kosullar", "./routes/legal.tsx", { id: "legal-terms" }),
  route("kvkk", "./routes/legal.tsx", { id: "legal-kvkk" }),
  route("cerez-politikasi", "./routes/legal.tsx", { id: "legal-cookies" }),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
