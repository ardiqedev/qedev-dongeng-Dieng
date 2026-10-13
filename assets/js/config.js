/**
 * =========================================================
 * DONGENG DIENG
 * CONFIG
 * =========================================================
 */

const CONFIG = {
  APP: {
    NAME: "Dongeng Dieng",
    VERSION: "1.0.0",
    ENV: "development",
  },

  // Base path deployment
  BASE_PATH: "/qedev-dongeng-Dieng",

  ROUTER: {
    DEFAULT_ROUTE: "/",
  },

  API: {
    ENABLED: false,
    BASE_URL: "",
  },

  /**
   * =====================================================
   * ASSET PATH
   * =====================================================
   */

  asset(path) {
    const cleanPath = String(path).replace(/^\/+/, "");

    return `${this.BASE_PATH}/${cleanPath}`;
  },
};

/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

export default CONFIG;
