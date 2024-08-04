const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://crash-cruise-hqe3fizo2-jarvis-projects-77e68e1c.vercel.app',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // Node event listeners can be implemented here if needed.
    },
  },
});
