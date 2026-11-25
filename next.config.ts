import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "form-action 'self' https://formspree.io",
              "img-src 'self' data: blob: https://cdn.sanity.io",
              [
                "script-src 'self' 'unsafe-inline'",
                // React's development tooling requires eval; production does not.
                process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "",
                "https://va.vercel-scripts.com",
              ]
                .filter(Boolean)
                .join(" "),
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://formspree.io https://*.sanity.io https://*.api.sanity.io https://cdn.sanity.io",
              "frame-src https://www.google.com https://www.google.com/iframe",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
