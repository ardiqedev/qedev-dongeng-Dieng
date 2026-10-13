/**
 * =========================================================
 * DONGENG DIENG
 * APP
 * =========================================================
 */

import Router from "./router.js";
import HeroData from "../../data/hero.js";
import DestinationsPage from "./pages/destinations.js";
import JeepPackagesPage from "./pages/jeep-packages.js";

const App = {
  /* =====================================================
       HERO STATE
  ===================================================== */

  heroIndex: 0,

  heroTimer: null,

  heroTouchStartX: 0,

  heroTouchEndX: 0,

  /* =====================================================
       INIT
    ===================================================== */

  async init() {
    await this.loadHeader();

    this.setupRoutes();

    Router.init();
  },

  /* =====================================================
       ROUTES
    ===================================================== */

  setupRoutes() {
    Router.register("/", () => this.renderHome());

    Router.register("/destinasi", () => this.renderDestinations());

    Router.register("/destinasi/sikunir", () =>
      this.renderDestinationDetail("sikunir"),
    );

    Router.register("/destinasi/telaga-warna", () =>
      this.renderDestinationDetail("telaga-warna"),
    );

    Router.register("/destinasi/kawah-sikidang", () =>
      this.renderDestinationDetail("kawah-sikidang"),
    );

    Router.register("/destinasi/candi-arjuna", () =>
      this.renderDestinationDetail("candi-arjuna"),
    );

    Router.register("/cerita", () => this.renderStories());

    Router.register("/kuliner", () =>
      this.renderPage("Kuliner", "Temukan rasa dan kuliner khas Dieng."),
    );

    Router.register("/pengalaman", () =>
      this.renderPage(
        "Pengalaman",
        "Berbagai pengalaman yang bisa kamu temukan di Dieng.",
      ),
    );

    Router.register("/panduan", () => this.renderGuides());

    Router.register("/itinerary", () => this.renderItineraries());

    Router.register("/paket-wisata", () =>
      this.renderPage(
        "Paket Wisata",
        "Pilihan perjalanan siap berangkat ke Dieng.",
      ),
    );

    // Paket Jeep Dieng
    Router.register("/paket-jeep", () => this.renderJeepPackages());

    Router.register("/tentang", () =>
      this.renderPage("Tentang Dongeng Dieng", "Mengenal Dongeng Dieng."),
    );

    Router.register("/kontak", () =>
      this.renderPage("Kontak", "Hubungi Dongeng Dieng."),
    );

    Router.register("404", () => this.render404());
  },

  /* =====================================================
       LOAD HERO
    ===================================================== */

  async loadHero() {
    const container = document.getElementById("hero-container");

    if (!container) {
      return;
    }

    try {
      const response = await fetch("./components/hero.html");

      if (!response.ok) {
        throw new Error("Gagal memuat hero.");
      }

      container.innerHTML = await response.text();

      this.initHeroSlider();

      const header = document.querySelector(".site-header");

      if (header) {
        header.classList.add("is-overlay");
      }
    } catch (error) {
      console.error("Hero Error:", error);
    }
  },

  /* =====================================================
   LOAD DESTINATIONS — MODULE BRIDGE
===================================================== */

  async loadDestinations() {
    const container = document.getElementById("destinations-container");

    if (!container) return;

    await DestinationsPage.loadDestinations(container);
  },

  /* =========================================================
   LOAD STORIES
========================================================= */

  async loadStories() {
    const container = document.getElementById("stories-container");

    if (!container) {
      console.warn("Stories container tidak ditemukan.");
      return;
    }

    try {
      const response = await fetch("./components/stories.html");

      if (!response.ok) {
        throw new Error("Gagal memuat stories.html.");
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Stories Error:", error);
    }
  },

  /* =====================================================
   LOAD GUIDES
===================================================== */

  async loadGuides() {
    const container = document.getElementById("guides-container");

    if (!container) {
      return;
    }

    try {
      const response = await fetch("./components/guides.html");

      if (!response.ok) {
        throw new Error(`Gagal memuat guides.html: ${response.status}`);
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Guides Error:", error);

      container.innerHTML = `
      <section class="page-placeholder">
        <p>DONGENG DIENG</p>
        <h2>Panduan Dieng</h2>
        <p>Panduan belum dapat dimuat.</p>
      </section>
    `;
    }
  },

  /* =====================================================
   LOAD ITINERARIES
===================================================== */

  async loadItineraries() {
    const container = document.getElementById("itineraries-container");

    if (!container) {
      return;
    }

    try {
      const response = await fetch("./components/itineraries.html");

      if (!response.ok) {
        throw new Error(`Gagal memuat itineraries.html: ${response.status}`);
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Itineraries Error:", error);
    }
  },

  /* =====================================================
   LOAD EXPLORE
===================================================== */

  async loadExplore() {
    const container = document.getElementById("explore-container");

    if (!container) {
      return;
    }

    try {
      const response = await fetch("./components/explore.html");

      if (!response.ok) {
        throw new Error("Gagal memuat Explore.");
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Explore Error:", error);
    }
  },

  /* =====================================================
       LOAD HEADER
    ===================================================== */

  async loadHeader() {
    const container = document.getElementById("site-header");

    if (!container) {
      return;
    }

    try {
      const response = await fetch("./components/header.html");

      if (!response.ok) {
        throw new Error("Gagal memuat header.");
      }

      container.innerHTML = await response.text();

      await this.loadMobileNav();

      this.initHeader();
    } catch (error) {
      console.error("Header Error:", error);
    }
  },

  /* =====================================================
       LOAD MOBILE NAV
    ===================================================== */

  async loadMobileNav() {
    const header = document.getElementById("site-header");

    if (!header) {
      return;
    }

    const response = await fetch("./components/mobile-nav.html");

    if (!response.ok) {
      throw new Error("Gagal memuat mobile navigation.");
    }

    const mobileNav = await response.text();

    header.insertAdjacentHTML("beforeend", mobileNav);
  },

  /* =====================================================
       INIT HEADER
    ===================================================== */

  initHeader() {
    const header = document.querySelector(".site-header");

    const toggle = document.getElementById("mobile-menu-toggle");

    const mobileNav = document.getElementById("mobile-nav");

    if (!header) {
      return;
    }

    /* ================================================
       SCROLL
    ================================================= */

    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    /* ================================================
       MOBILE MENU
    ================================================= */

    if (!toggle || !mobileNav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");

      toggle.classList.toggle("is-active", isOpen);

      toggle.setAttribute("aria-expanded", String(isOpen));

      mobileNav.setAttribute("aria-hidden", String(!isOpen));

      document.body.classList.toggle("menu-open", isOpen);
    });

    /* ================================================
       CLOSE AFTER NAVIGATION
    ================================================= */

    mobileNav.querySelectorAll("a[data-route]").forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });
  },

  /* =====================================================
   HOME
===================================================== */

  async renderHome() {
    const container = document.getElementById("page-view");

    if (!container) {
      return;
    }

    container.innerHTML = `
    <!-- SECTION 01: HERO -->
    <div id="hero-container"></div>

    <!-- SECTION 02: EXPLORE -->
    <div id="explore-container"></div>

    <!-- SECTION 03: DESTINATIONS -->
    <div id="destinations-container"></div>

    <!-- SECTION 04: STORIES -->
    <div id="stories-container"></div>

    <!-- SECTION 05: GUIDES -->
    <div id="guides-container"></div>

    <!-- SECTION 06: ITINERARIES -->
    <div id="itineraries-container"></div>
  `;

    await this.loadHero();
    await this.loadExplore();
    await this.loadDestinations();
    await this.loadStories();
    await this.loadGuides();
    await this.loadItineraries();
  },

  async renderDestinations() {
    const container = document.getElementById("page-view");

    if (!container) return;

    await DestinationsPage.renderDestinations(container);
  },

  /* =====================================================
   RENDER DESTINATION DETAIL — MODULE BRIDGE
===================================================== */

  renderDestinationDetail(slug) {
    const container = document.getElementById("page-view");

    if (!container) return;

    this.stopHeroAutoplay();

    document.querySelector(".site-header")?.classList.remove("is-overlay");

    const rendered = DestinationsPage.renderDestinationDetail(container, slug);

    if (!rendered) {
      this.render404();
    }
  },

  /* =====================================================
   RENDER STORIES
===================================================== */

  async renderStories() {
    const container = document.getElementById("page-view");

    if (!container) {
      return;
    }

    this.stopHeroAutoplay();

    const header = document.querySelector(".site-header");

    if (header) {
      header.classList.remove("is-overlay");
    }

    try {
      const response = await fetch("./components/stories.html");

      if (!response.ok) {
        throw new Error("Gagal memuat stories.html.");
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Stories Error:", error);

      container.innerHTML = `
      <section class="page-placeholder">
        <p>DONGENG DIENG</p>
        <h1>Cerita</h1>
        <p>Gagal memuat halaman cerita.</p>
        <a href="/" data-route>Kembali ke Beranda</a>
      </section>
    `;
    }
  },

  /* =====================================================
   RENDER GUIDES
===================================================== */

  async renderGuides() {
    const container = document.getElementById("page-view");

    if (!container) {
      return;
    }

    this.stopHeroAutoplay();

    const header = document.querySelector(".site-header");

    if (header) {
      header.classList.remove("is-overlay");
    }

    try {
      const response = await fetch("./components/guides.html");

      if (!response.ok) {
        throw new Error("Gagal memuat guides.html.");
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Guides Error:", error);

      container.innerHTML = `
      <section class="page-placeholder">
        <p>DONGENG DIENG</p>
        <h1>Panduan Dieng</h1>
        <p>Gagal memuat halaman panduan.</p>
        <a href="/" data-route>Kembali ke Beranda</a>
      </section>
    `;
    }
  },

  async renderItineraries() {
    const container = document.getElementById("page-view");
    if (!container) return;

    this.stopHeroAutoplay?.();

    document.querySelector(".site-header")?.classList.remove("is-overlay");

    try {
      const response = await fetch("./components/itineraries.html");

      if (!response.ok) {
        throw new Error(`Gagal memuat itineraries.html: ${response.status}`);
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Itineraries Error:", error);

      container.innerHTML = `
      <section class="page-error">
        <h1>Itinerary belum dapat dimuat</h1>
        <p>Periksa file components/itineraries.html.</p>
      </section>
    `;
    }
  },

  /* =========================================
   JEEP PACKAGES PAGE
========================================= */

  renderJeepPackages() {
    const container = document.getElementById("page-view");

    if (!container) {
      console.error("Container #page-view tidak ditemukan.");
      return;
    }

    this.stopHeroAutoplay?.();

    document.querySelector(".site-header")?.classList.remove("is-overlay");

    JeepPackagesPage.render(container);
  },

  /* =====================================================
       GENERIC PAGE
    ===================================================== */

  renderPage(title, description) {
    const container = document.getElementById("page-view");

    if (!container) {
      return;
    }

    /* ================================================
       STOP HERO
    ================================================= */

    this.stopHeroAutoplay();

    /* ================================================
       NORMAL HEADER MODE
    ================================================= */

    const header = document.querySelector(".site-header");

    if (header) {
      header.classList.remove("is-overlay");
    }

    /* ================================================
       PAGE CONTENT
    ================================================= */

    container.innerHTML = `

      <section class="page-placeholder">

        <p>
          DONGENG DIENG
        </p>


        <h1>
          ${title}
        </h1>


        <p>
          ${description}
        </p>


        <a
          href="/"
          data-route
        >
          ← Kembali ke Beranda
        </a>

      </section>

    `;
  },

  /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

  closeMobileMenu() {
    const toggle = document.getElementById("mobile-menu-toggle");

    const mobileNav = document.getElementById("mobile-nav");

    if (!toggle || !mobileNav) {
      return;
    }

    mobileNav.classList.remove("is-open");

    toggle.classList.remove("is-active");

    toggle.setAttribute("aria-expanded", "false");

    mobileNav.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
  },

  /* =====================================================
       404
    ===================================================== */

  render404() {
    const container = document.getElementById("page-view");

    if (!container) {
      return;
    }

    /* ================================================
       NORMAL HEADER MODE
    ================================================= */

    const header = document.querySelector(".site-header");

    if (header) {
      header.classList.remove("is-overlay");
    }

    /* ================================================
       404 CONTENT
    ================================================= */

    container.innerHTML = `

      <section class="page-placeholder">

        <p>
          404
        </p>


        <h1>
          Halaman tidak ditemukan.
        </h1>


        <p>
          Halaman yang kamu cari
          belum tersedia.
        </p>


        <a
          href="/"
          data-route
        >
          ← Kembali ke Beranda
        </a>

      </section>

    `;
  },

  /* =====================================================
       RENDER HERO SLIDE
    ===================================================== */

  /* =====================================================
       INIT HERO SLIDER
    ===================================================== */

  initHeroSlider() {
    const slidesContainer = document.getElementById("hero-slides");

    const indicatorsContainer = document.getElementById("hero-indicators");

    if (!slidesContainer || !indicatorsContainer) {
      return;
    }

    if (!HeroData.length) {
      return;
    }

    /* ================================================
       RESET STATE
    ================================================= */

    this.stopHeroAutoplay();

    this.heroIndex = 0;

    slidesContainer.innerHTML = "";

    indicatorsContainer.innerHTML = "";

    /* ================================================
       RENDER ALL SLIDES
    ================================================= */

    HeroData.forEach((item, index) => {
      const slide = document.createElement("div");

      slide.className = "hero-slide";

      if (index === 0) {
        slide.classList.add("is-active");
      }

      slide.dataset.index = String(index);

      slide.innerHTML = `

          <img
            class="hero-slide-image"
            src="${item.image}"
            alt="${item.alt}"
            style="object-position: ${item.position};"
            ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
          >

        `;

      slidesContainer.appendChild(slide);
    });

    /* ================================================
       RENDER INDICATORS
    ================================================= */

    HeroData.forEach((item, index) => {
      const indicator = document.createElement("button");

      indicator.type = "button";

      indicator.className = "hero-indicator";

      if (index === 0) {
        indicator.classList.add("is-active");
      }

      indicator.setAttribute("aria-label", `Tampilkan slide ${index + 1}`);

      indicator.setAttribute("aria-current", index === 0 ? "true" : "false");

      indicator.dataset.index = String(index);

      indicatorsContainer.appendChild(indicator);
    });

    /* ================================================
       EVENTS
    ================================================= */

    this.bindHeroEvents();

    /* ================================================
       PRELOAD NEXT IMAGE
    ================================================= */

    this.preloadHeroImage(this.getNextHeroIndex());

    /* ================================================
       AUTOPLAY
    ================================================= */

    this.startHeroAutoplay();
  },

  /* =====================================================
       BIND HERO EVENTS
    ===================================================== */

  bindHeroEvents() {
    const hero = document.getElementById("hero");

    const indicators = document.getElementById("hero-indicators");

    if (!hero) {
      return;
    }

    /* ================================================
       DOT NAVIGATION
    ================================================= */

    if (indicators) {
      indicators.querySelectorAll(".hero-indicator").forEach((indicator) => {
        indicator.addEventListener("click", () => {
          const index = Number(indicator.dataset.index);

          this.goToHeroSlide(index);
        });
      });
    }

    /* ================================================
       DESKTOP HOVER
    ================================================= */

    hero.addEventListener("mouseenter", () => {
      this.stopHeroAutoplay();
    });

    hero.addEventListener("mouseleave", () => {
      this.startHeroAutoplay();
    });

    /* ================================================
       MOBILE TOUCH
    ================================================= */

    hero.addEventListener(
      "touchstart",
      (event) => {
        this.heroTouchStartX = event.changedTouches[0].screenX;
      },
      {
        passive: true,
      },
    );

    hero.addEventListener(
      "touchend",
      (event) => {
        this.heroTouchEndX = event.changedTouches[0].screenX;

        this.handleHeroSwipe();
      },
      {
        passive: true,
      },
    );

    /* ================================================
       PAGE VISIBILITY
    ================================================= */

    document.addEventListener("visibilitychange", this.handleHeroVisibility);
  },

  /* =====================================================
       HANDLE HERO VISIBILITY
    ===================================================== */

  handleHeroVisibility: () => {
    if (document.visibilityState === "hidden") {
      App.stopHeroAutoplay();
    } else {
      App.startHeroAutoplay();
    }
  },

  /* =====================================================
       HANDLE HERO SWIPE
    ===================================================== */

  handleHeroSwipe() {
    const distance = this.heroTouchEndX - this.heroTouchStartX;

    const threshold = 50;

    if (Math.abs(distance) < threshold) {
      return;
    }

    if (distance < 0) {
      /* SWIPE LEFT */

      this.goToHeroSlide(this.getNextHeroIndex());
    } else {
      /* SWIPE RIGHT */

      this.goToHeroSlide(this.getPreviousHeroIndex());
    }
  },

  /* =====================================================
       GO TO HERO SLIDE
    ===================================================== */

  goToHeroSlide(index) {
    const slides = document.querySelectorAll(".hero-slide");

    const indicators = document.querySelectorAll(".hero-indicator");

    if (!slides.length) {
      return;
    }

    if (index < 0 || index >= HeroData.length) {
      return;
    }

    this.heroIndex = index;

    /* ================================================
       SLIDES
    ================================================= */

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    /* ================================================
       INDICATORS
    ================================================= */

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === index;

      indicator.classList.toggle("is-active", isActive);

      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });

    /* ================================================
       PRELOAD NEXT
    ================================================= */

    this.preloadHeroImage(this.getNextHeroIndex());
  },

  /* =====================================================
       NEXT HERO INDEX
    ===================================================== */

  getNextHeroIndex() {
    return (this.heroIndex + 1) % HeroData.length;
  },

  /* =====================================================
       PREVIOUS HERO INDEX
    ===================================================== */

  getPreviousHeroIndex() {
    return (this.heroIndex - 1 + HeroData.length) % HeroData.length;
  },

  /* =====================================================
       START AUTOPLAY
    ===================================================== */

  startHeroAutoplay() {
    if (HeroData.length <= 1) {
      return;
    }

    this.stopHeroAutoplay();

    this.heroTimer = setInterval(() => {
      this.goToHeroSlide(this.getNextHeroIndex());
    }, 5500);
  },

  /* =====================================================
       STOP AUTOPLAY
    ===================================================== */

  stopHeroAutoplay() {
    if (!this.heroTimer) {
      return;
    }

    clearInterval(this.heroTimer);

    this.heroTimer = null;
  },

  /* =====================================================
       PRELOAD HERO IMAGE
    ===================================================== */

  preloadHeroImage(index) {
    const item = HeroData[index];

    if (!item) {
      return;
    }

    const image = new Image();

    image.src = item.image;
  },
};

export default App;
