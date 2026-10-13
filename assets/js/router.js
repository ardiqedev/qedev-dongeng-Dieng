/**
 * =========================================================
 * DONGENG DIENG
 * ROUTER
 * =========================================================
 */

const Router = {
  routes: {},

  currentRoute: null,

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

    /*
     * Normalize trailing slash
     */

    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    return path || "/";
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
    if (!path) {
      return;
    }

    const basePath = "/qedev-dongeng-Dieng";

    // Pertahankan path deployment GitHub Pages
    let targetPath = path;

    if (path.startsWith("/") && !path.startsWith(`${basePath}/`)) {
      targetPath = `${basePath}${path === "/" ? "/" : path}`;
    }

    window.history.pushState({}, "", targetPath);

    this.resolve();
  },

  /* =====================================================
       INIT
    ===================================================== */

  init() {
    window.addEventListener("popstate", () => {
      this.resolve();
    });

    /*
     * Intercept internal links
     */

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-route]");

      if (!link) {
        return;
      }

      event.preventDefault();

      const path = link.getAttribute("href");

      this.navigate(path);
    });

    /*
     * Resolve initial route
     */

    this.resolve();
  },
};

export default Router;
