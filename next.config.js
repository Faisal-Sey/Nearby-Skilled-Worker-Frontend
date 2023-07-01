/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    STRIPE_PRIMARY_KEY: process.env.STRIPE_PRIMARY_KEY,
  }
}

module.exports = nextConfig
 
