const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  chromeWebSecurity: true,
  pageLoadTimeout: 60000,
  requestTimeout: 50000,
  responseTimeout: 50000,
  projectId: "u4qxtw",
  viewportWidth: 1600,
  viewportHeight: 900,
  e2e: {
    defaultCommandTimeout: 50000,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return require("./cypress/plugins/index.js")(on, config);
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
    env: {
      allure: true,
    },
  },
});
