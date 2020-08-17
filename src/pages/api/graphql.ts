if (process.env.NODE_ENV === "development") require("nexus").default.reset();

const app = require("nexus").default;

require("../../../graphql/schema");

app.assemble();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default app.server.handlers.graphql;
