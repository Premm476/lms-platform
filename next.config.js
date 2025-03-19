// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api-inference.huggingface.co;
              connect-src 'self' https://api-inference.huggingface.co;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              font-src 'self';
              default-src 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};