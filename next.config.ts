import { NextConfig } from 'next'

const config: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bytegrad.com',
            },  {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
}

export default config