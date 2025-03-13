const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  chromeWebSecurity: true,
  failOnStatusCode: false,
  pageLoadTimeout: 60000,
  requestTimeout: 50000,
  responseTimeout: 50000,
  projectId: "u4qxtw",
  viewportWidth: 1600,
  viewportHeight: 900,

  e2e: {
    defaultCommandTimeout: 50000,

    // 📌 Ajustando caminhos dos arquivos .feature e steps
    specPattern: "**/features/**/*.feature", // 🔹 Certifica que os arquivos .feature são encontrados

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      allureWriter(on, config);
      return config;
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
