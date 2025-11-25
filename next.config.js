
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   images: {
//     domains: ['i.ibb.co'], // add the hostname(s) here
//   }
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,  // fixed property
//   images: {
//     domains: ['i.ibb.co'], // whitelist external image host
//   },
// };

// module.exports = nextConfig; // use this if not using ESM
// OR
// export default nextConfig; // if your project uses ESM


/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configuration settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // This is the hostname from your error message: 'i.ibb.co.com'
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**', // Allows any path on this domain
      },
      // You can add other remote image domains here if needed
    ],
  },
};

module.exports = nextConfig;