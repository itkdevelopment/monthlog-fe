import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ["dev-files.monthler.kr"], // 허용할 이미지 도메인들 추가
    },
};

export default nextConfig;
