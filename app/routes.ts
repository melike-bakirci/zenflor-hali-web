import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("../src/pages/Home.tsx"),
  route("hakkimizda", "../src/pages/About.tsx"),
  route("karo-hali", "../src/pages/KaroHali.tsx"),
  route("karo-hali/:slug", "../src/pages/KaroHaliDetail.tsx"),
  route("cim-hali", "../src/pages/CimHali.tsx"),
  route("cim-hali/:slug", "../src/pages/CimHaliDetail.tsx"),
  route("referanslarimiz", "../src/pages/References.tsx", { id: "references" }),
  route("blog", "../src/pages/Blog.tsx"),
  route("blog/:slug", "../src/pages/BlogDetail.tsx"),
  route("iletisim", "../src/pages/Contact.tsx"),
  route("gizlilik", "../src/pages/Legal.tsx", { id: "legal-privacy" }),
  route("kosullar", "../src/pages/Legal.tsx", { id: "legal-terms" }),
  route("kvkk", "../src/pages/Legal.tsx", { id: "legal-kvkk" }),
  route("cerez-politikasi", "../src/pages/Legal.tsx", { id: "legal-cookies" }),
  route("*", "../src/pages/NotFound.tsx"),
] satisfies RouteConfig;
