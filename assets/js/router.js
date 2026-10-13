/**
 * =========================================================
 * DONGENG DIENG
 * ROUTER
 * GitHub Pages Compatible
 * =========================================================
 */

const Router = {
  routes: {},

  currentRoute: null,

  // Sesuaikan dengan nama repository GitHub
  basePath: "/qedev-dongeng-Dieng",

  /* =====================================================
       REGISTER ROUTE
  ===================================================== */

  register(path, handler) {
    this.routes[path] = handler;
  },

  /* =====================================================
       GET CURRENT PATH
  ===================================================== */

  getPath() {
    let path = window.location.pathname;
    const basePath = this.basePath;

    // Hilangkan prefix repository GitHub Pages
    if (path === basePath || path === `${basePath}/`) {
      path = "/";
    } else if (path.startsWith(`${basePath}/`)) {
      path = path.slice(basePath.length);
    }

    // Normalisasi trailing slash
    if (path.length > 1) {
      path = path.replace(/\/+$/, "");
    }

    return path || "/";
  },

  /* =====================================================
       BUILD URL
  ===================================================== */

  buildUrl(path) {
    if (!path || path === "/") {
      return `${this.basePath}/`;
    }

    // Jangan tambahkan base path dua kali
    if (path === this.basePath || path.startsWith(`${this.basePath}/`)) {
      return path;
    }

    // Hanya tangani path internal
    if (path.startsWith("/")) {
      return `${this.basePath}${path}`;
    }

    return path;
  },

  /* =====================================================
       RESOLVE ROUTE
  ===================================================== */

  resolve() {
    const path = this.getPath();

    const handler = this.routes[path] || this.routes["404"];

    this.currentRoute = path;

    if (typeof handler === "function") {
      handler();
      return;
    }

    console.error(`Route tidak ditemukan: ${path}`);
  },

  /* =====================================================
       NAVIGATE
  ===================================================== */

  navigate(path) {
    if (!path) return;

    const targetPath = this.buildUrl(path);

    window.history.pushState({}, "", targetPath);

    this.resolve();
  },

  /* =====================================================
       INIT
  ===================================================== */

  init() {
    // Browser back / forward
    window.addEventListener("popstate", () => {
      this.resolve();
    });

    // Intercept internal links QEDEV
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-route]");

      if (!link) return;

      // Abaikan klik khusus browser
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || !href.startsWith("/")) {
        return;
      }

      event.preventDefault();

      this.navigate(href);
    });

    // Resolve halaman awal
    this.resolve();
  },
};

export default Router;
