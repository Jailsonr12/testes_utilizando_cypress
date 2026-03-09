const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ebac-agenda-contatos-tan.vercel.app",
    specPattern: "cypress/e2e/**/*.cy.js",
    video: false
  }
});
