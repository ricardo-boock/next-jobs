import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}

// VERSION BELOW IS USED WHEN INDEXING IS ALLOWED

// import { headers } from "next/headers";

// export default async function robots(): Promise<MetadataRoute.Robots> {
//   const headersList = await headers();
//   const host = headersList.get("host");
//   const protocol =
//     process.env.NODE_ENV === "production" ? "https://" : "http://";
//   const baseUrl = `${protocol}${host}`;

//   return {
//     rules: {
//       userAgent: "*",
//       allow: "/",
//     },
//     sitemap: `${baseUrl}/sitemap.xml`,
//   };
// }
