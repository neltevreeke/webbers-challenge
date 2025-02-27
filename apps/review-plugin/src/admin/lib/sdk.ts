import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  // TODO: Find a way to make this injectable through module/plugin options
  baseUrl: "http://localhost:9000",
  debug: import.meta.env.DEV,
  auth: {
    type: "session"
  }
});