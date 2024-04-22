/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: process.env.GBC_DOMAIN },
                    { key: "Access-Control-Allow-Methods", value: "GET" },
                ]
            }
        ]
    }
}

module.exports = nextConfig