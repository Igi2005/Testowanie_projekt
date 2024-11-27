import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:3001",
    // Wskazanie osobnego tsconfig dla Cypress
    //tsConfigFile: "cypress/tsconfig.cypress.json"
  },
});
