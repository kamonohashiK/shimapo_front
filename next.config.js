/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // 暫定的に画像の最適化を無効化
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig
