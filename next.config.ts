// ai-chat-front/next.config.ts
import { NextConfig } from "next/types";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'api.together.ai', 'res.cloudinary.com', 'cloudinary.com', 'ai-stepik-django.onrender.com'],
  },
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
