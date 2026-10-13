/* =========================================================
   DONGENG DIENG
   JEEP PACKAGES PAGE
========================================================= */

const JeepPackagesPage = {
  /* =====================================================
     HELPERS
  ===================================================== */

  escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  },

  /* =====================================================
     ZONE DATA
  ===================================================== */

  zones: [
    {
      id: "zona-1",
      number: "01",
      title: "Zona 1",
      subtitle: "Jantung Wisata Dieng",
      description:
        "Jelajahi destinasi ikonik Dieng, mulai dari candi bersejarah hingga kawah vulkanik.",
      image: "./assets/images/destinations/destination-candi-arjuna.jpg",
      imageAlt: "Kompleks Candi Arjuna di Dieng",
      destinations: [
        "Kompleks Candi Arjuna",
        "Kawah Sikidang",
        "Dieng Plateau Theater (DPT)",
        "Telaga Warna & Telaga Pengilon",
        "Batu Pandang Ratapan Angin",
      ],
    },
    {
      id: "zona-2",
      number: "02",
      title: "Zona 2",
      subtitle: "Pesona Eksotis & Keheningan Alam",
      description:
        "Nikmati lanskap pegunungan, telaga tersembunyi, dan suasana alam Dieng yang menenangkan.",
      image: "./assets/images/destinations/explore-destination.jpg",
      imageAlt: "Panorama alam dataran tinggi Dieng",
      destinations: [
        "Tol Kahyangan",
        "Telaga Dringo",
        "Sumur Jalatunda",
        "Kawah Candradimuka",
      ],
    },
    {
      id: "zona-3",
      number: "03",
      title: "Zona 3",
      subtitle: "Lembah Hijau & Panorama Memukau",
      description:
        "Susuri hamparan hijau, air terjun, dan lanskap perbukitan yang memanjakan mata.",
      image: "./assets/images/destinations/destination-telaga-warna.jpg",
      imageAlt: "Panorama alam hijau di dataran tinggi Dieng",
      destinations: [
        "Curug Sikarim",
        "Swiss Van Java",
        "Telaga Menjer",
        "Panama Tea Resort",
      ],
    },
    {
      id: "zona-sunrise",
      number: "04",
      title: "Zona Sunrise",
      subtitle: "Berburu Fajar Dieng",
      description:
        "Pilih spot terbaik untuk menyambut matahari terbit dan menikmati lautan awan.",
      image: "./assets/images/destinations/sikunir-hero.jpg",
      imageAlt: "Pemandangan matahari terbit dari Bukit Sikunir",
      destinations: [
        "Sunrise Sikunir",
        "Sunrise Taman Langit / Pintu Langit",
        "Sunrise Bukit Sikapuk",
        "Batu Angkruk",
      ],
    },
    {
      id: "zona-custom",
      number: "05",
      title: "Zona Custom",
      subtitle: "Bebas Tentukan Rute",
      description:
        "Rancang perjalanan sesuai keinginanmu dan diskusikan kombinasi destinasi bersama penyedia Jeep.",
      image: "./assets/images/destinations/explore-destination.jpg",
      imageAlt: "Panorama pegunungan Dieng",
      destinations: [
        "Pilih destinasi sesuai keinginan",
        "Kombinasikan beberapa zona",
        "Diskusikan rute dengan admin",
      ],
    },
  ],

  /* =====================================================
     RENDER PAGE
  ===================================================== */

  render(container) {
    if (!container) return;

    const escape = (value) => this.escapeHTML(value);

    container.innerHTML = `
    <div class="jeep-packages-page">

      <!-- HERO -->
      <section
        class="jeep-hero"
        aria-labelledby="jeep-hero-title"
      >
        <div class="jeep-hero-background">
          <img
            class="jeep-hero-image"
            src="./assets/images/destinations/explore-destination.jpg"
            alt="Panorama pegunungan Dieng untuk petualangan Jeep"
            fetchpriority="high"
          />
        </div>

        <div
          class="jeep-hero-overlay"
          aria-hidden="true"
        ></div>

        <div class="jeep-hero-container">
          <div class="jeep-hero-content">

            <span class="jeep-eyebrow">
              Dongeng Dieng · Jeep Adventure
            </span>

            <h1
              class="jeep-hero-title"
              id="jeep-hero-title"
            >
              <span>Jelajahi Dieng.</span>
              <span>Ikuti Ceritamu.</span>
            </h1>

            <p class="jeep-hero-description">
              Dari berburu sunrise hingga menjelajahi lembah hijau,
              pilih rute Jeep yang paling sesuai dengan petualanganmu.
            </p>

            <div class="jeep-hero-actions">
              <a
                href="#pilihan-zona"
                class="jeep-button jeep-button-primary"
              >
                Jelajahi Zona
                <span aria-hidden="true">↓</span>
              </a>

              <a
                href="/destinasi"
                class="jeep-button jeep-button-outline"
                data-route
              >
                Lihat Destinasi
              </a>
            </div>

            <div class="jeep-hero-features">

              <div class="jeep-hero-feature">
                <span
                  class="jeep-hero-feature-icon"
                  aria-hidden="true"
                >✦</span>

                <div>
                  <strong>5 Pilihan Zona</strong>
                  <small>Beragam rute perjalanan</small>
                </div>
              </div>

              <div class="jeep-hero-feature">
                <span
                  class="jeep-hero-feature-icon"
                  aria-hidden="true"
                >⌖</span>

                <div>
                  <strong>Destinasi Pilihan</strong>
                  <small>Alam dan panorama Dieng</small>
                </div>
              </div>

              <div class="jeep-hero-feature">
                <span
                  class="jeep-hero-feature-icon"
                  aria-hidden="true"
                >↗</span>

                <div>
                  <strong>Rute Fleksibel</strong>
                  <small>Sesuaikan perjalananmu</small>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- PILIHAN ZONA -->
      <section
        class="jeep-zones section-padding"
        id="pilihan-zona"
        aria-labelledby="jeep-zones-title"
      >
        <div class="jeep-section-heading">

          <div class="jeep-section-heading-copy">
            <span class="jeep-eyebrow jeep-eyebrow-dark">
              Pilihan Perjalanan
            </span>

            <h2
              class="jeep-section-title"
              id="jeep-zones-title"
            >
              Temukan Zona Petualanganmu
            </h2>
          </div>

          <p class="jeep-section-description">
            Setiap zona menawarkan suasana yang berbeda.
            Pilih destinasi favoritmu dan rencanakan perjalanan
            menjelajahi dataran tinggi Dieng.
          </p>

        </div>

        <!-- GRID ZONA -->
        <div class="jeep-zones-grid">
          ${this.zones
            .map((zone) => {
              const destinationIcons = {
                "Kompleks Candi Arjuna": "🏛️",
                "Kawah Sikidang": "♨️",
                "Dieng Plateau Theater (DPT)": "🎬",
                "Telaga Warna & Telaga Pengilon": "🏞️",
                "Batu Pandang Ratapan Angin": "🌄",
                "Tol Kahyangan": "⛰️",
                "Telaga Dringo": "🌿",
                "Sumur Jalatunda": "🪨",
                "Kawah Candradimuka": "♨️",
                "Curug Sikarim": "💧",
                "Swiss Van Java": "🌱",
                "Telaga Menjer": "🚣",
                "Panama Tea Resort": "🍃",
                "Sunrise Sikunir": "🌅",
                "Sunrise Taman Langit / Pintu Langit": "🌄",
                "Sunrise Bukit Sikapuk": "🌄",
                "Batu Angkruk": "🌉",
                "Pilih destinasi sesuai keinginan": "🧭",
                "Kombinasikan beberapa zona": "🗺️",
                "Diskusikan rute dengan admin": "💬",
              };

              const isCustom = zone.id === "zona-custom";
              const isSunrise = zone.id === "zona-sunrise";

              const zoneLabel = isCustom
                ? "Bebas Eksplorasi"
                : isSunrise
                  ? "Sunrise Experience"
                  : "Jeep Adventure";

              return `
                <article
                  class="jeep-zone-card"
                  id="${escape(zone.id)}"
                >

                  <!-- FOTO ZONA -->
                  <div class="jeep-zone-image-wrapper">
                    <img
                      class="jeep-zone-image"
                      src="${escape(zone.image)}"
                      alt="${escape(zone.imageAlt)}"
                      loading="lazy"
                    />

                    <div
                      class="jeep-zone-image-overlay"
                      aria-hidden="true"
                    ></div>

                    <span class="jeep-zone-badge">
                      <span class="jeep-zone-badge-dot"></span>
                      ${escape(zone.title)}
                    </span>

                    <span class="jeep-zone-image-label">
                      ${zoneLabel}
                    </span>
                  </div>

                  <!-- KONTEN ZONA -->
                  <div class="jeep-zone-content">

                    <!-- META -->
                    <div class="jeep-zone-meta">
                      <span
                        class="jeep-zone-meta-icon"
                        aria-hidden="true"
                      >${isCustom ? "✦" : isSunrise ? "☀" : "✧"}</span>

                      <span>
                        ${zone.destinations.length} pilihan destinasi
                      </span>
                    </div>

                    <!-- JUDUL -->
                    <h3 class="jeep-zone-title">
                      ${escape(zone.subtitle)}
                    </h3>

                    <!-- DESKRIPSI -->
                    <p class="jeep-zone-description">
                      ${escape(zone.description)}
                    </p>

                    <!-- DAFTAR DESTINASI -->
                    <div class="jeep-zone-destination-heading">
                      <span>Destinasi dalam rute</span>
                      <span aria-hidden="true">↓</span>
                    </div>

                    <ul class="jeep-zone-destinations">
                      ${zone.destinations
                        .map(
                          (destination) => `
                            <li>
                              <span
                                class="jeep-destination-icon"
                                aria-hidden="true"
                              >${destinationIcons[destination] || "📍"}</span>

                              <span class="jeep-destination-name">
                                ${escape(destination)}
                              </span>
                            </li>
                          `,
                        )
                        .join("")}
                    </ul>

                    <!-- INFORMASI TAMBAHAN -->
                    <div class="jeep-zone-details">

                      <div class="jeep-zone-detail">
                        <span
                          class="jeep-zone-detail-icon"
                          aria-hidden="true"
                        >◷</span>

                        <div>
                          <span class="jeep-zone-detail-label">
                            Estimasi durasi
                          </span>

                          <span class="jeep-zone-detail-value">
                            ${escape(zone.estimatedDuration || "Menyesuaikan rute")}
                          </span>
                        </div>
                      </div>

                      <div class="jeep-zone-detail">
                        <span
                          class="jeep-zone-detail-icon"
                          aria-hidden="true"
                        >♧</span>

                        <div>
                          <span class="jeep-zone-detail-label">
                            Cocok untuk
                          </span>

                          <span class="jeep-zone-detail-value">
                            ${escape(zone.suitableFor || "Tanyakan kepada admin")}
                          </span>
                        </div>
                      </div>

                      <div class="jeep-zone-detail">
                        <span
                          class="jeep-zone-detail-icon"
                          aria-hidden="true"
                        >★</span>

                        <div>
                          <span class="jeep-zone-detail-label">
                            Highlight
                          </span>

                          <span class="jeep-zone-detail-value">
                            ${escape(zone.highlight || "Panorama Dieng")}
                          </span>
                        </div>
                      </div>

                    </div>

                    <!-- TOMBOL AKSI -->
                    <div class="jeep-zone-actions">

                      <a
                        class="jeep-zone-button"
                        href="#kontak-jeep"
                        data-jeep-zone="${escape(zone.id)}"
                      >
                        <span>Konsultasikan Rute</span>

                        <span
                          class="jeep-zone-button-arrow"
                          aria-hidden="true"
                        >↗</span>
                      </a>

                      <button
                        type="button"
                        class="jeep-zone-favorite"
                        data-jeep-favorite="${escape(zone.id)}"
                        aria-label="Tambahkan ${escape(zone.subtitle)} ke favorit"
                        aria-pressed="false"
                        title="Tambahkan ke favorit"
                      >
                        <span aria-hidden="true">♡</span>
                      </button>

                    </div>

                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>

      <!-- KONTAK / CTA -->
      <section
        class="jeep-contact section-padding"
        id="kontak-jeep"
        aria-labelledby="jeep-contact-title"
      >
        <span class="jeep-eyebrow jeep-eyebrow-dark">
          Rencanakan Perjalanan
        </span>

        <h2
          class="jeep-section-title"
          id="jeep-contact-title"
        >
          Siap Menjelajahi Dieng?
        </h2>

        <p class="jeep-section-description">
          Tentukan zona dan destinasi yang ingin kamu kunjungi.
          Informasi harga, ketersediaan Jeep, dan pemesanan
          bisa kita tambahkan setelah detail layanan dikonfirmasi.
        </p>

        <a
          href="/kontak"
          class="jeep-button jeep-button-primary"
          data-route
        >
          Hubungi Kami
          <span aria-hidden="true">→</span>
        </a>
      </section>

    </div>
  `;

    this.bindEvents(container);
  },

  /* =====================================================
     EVENTS
  ===================================================== */

  bindEvents(container) {
    container.querySelectorAll("[data-jeep-zone]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const zone = this.zones.find(
          (item) => item.id === link.dataset.jeepZone,
        );

        if (!zone) return;

        const contact = container.querySelector("#kontak-jeep");
        if (!contact) return;

        const title = contact.querySelector("#jeep-contact-title");
        const description = contact.querySelector(".jeep-section-description");

        if (title) {
          title.textContent = `Rencanakan Perjalanan ${zone.title}`;
        }

        if (description) {
          description.textContent =
            `Kamu tertarik menjelajahi ${zone.subtitle}. ` +
            `Destinasi pilihan: ${zone.destinations.join(", ")}. ` +
            "Hubungi kami untuk mendiskusikan rute perjalanan.";
        }

        contact.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  },
};

export default JeepPackagesPage;
