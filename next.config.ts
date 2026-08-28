import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    
    // Performance: Optimize remote images and define domains
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Accept all domains for now, should be restricted to known CDN/Storage in production
            },
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
    },

    // Performance & Security: Inject HTTP headers
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            }
        ];
    },

    // SEO: Handle legacy URL redirects perfectly via 301
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
