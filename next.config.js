module.exports = {
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "/api/graphql",
      },
    ];
  },
};
