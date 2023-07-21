module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://305tax.com",
        permanent: false,
      },
    ];
  },
  env: {
    ROOT: __dirname,
  },
};
