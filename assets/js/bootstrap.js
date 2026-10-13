/**
 * =========================================================
 * DONGENG DIENG
 * BOOTSTRAP
 * =========================================================
 */

import CONFIG from "./config.js";
import App from "./app.js";

/**
 * =========================================================
 * BOOT
 * =========================================================
 */

const Bootstrap = {
  init() {
    console.info(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`);

    console.info(`Environment: ${CONFIG.APP.ENV}`);

    App.init();
  },
};

/**
 * =========================================================
 * START APPLICATION
 * =========================================================
 */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Bootstrap.init());
} else {
  Bootstrap.init();
}
