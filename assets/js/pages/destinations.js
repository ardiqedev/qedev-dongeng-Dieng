/* =========================================================
   DONGENG DIENG
   DESTINATIONS MODULE
========================================================= */

import DestinationsData from "../../../data/destinations.js";

const DestinationsPage = {
  /* =====================================================
     HTML ESCAPE
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
     LOAD DESTINATIONS SECTION
  ===================================================== */

  async loadDestinations(container) {
    if (!container) return;

    try {
      const response = await fetch("./components/destinations.html");

      if (!response.ok) {
        throw new Error(`Gagal memuat destinations.html: ${response.status}`);
      }

      container.innerHTML = await response.text();

      await this.renderDestinationCards(container);
    } catch (error) {
      console.error("Destinations Error:", error);
    }
  },

  /* =========================================
    RENDER HALAMAN DAFTAR DESTINASI
    ========================================= */

  async renderDestinations(container) {
    if (!container) return;

    await this.loadDestinations(container);
  },

  /* =====================================================
     RENDER DETAIL DESTINASI
  ===================================================== */

  /* =====================================================
   RENDER DETAIL DESTINASI
===================================================== */

  renderDestinationDetail(container, slug) {
    if (!container) return false;

    const destination = DestinationsData.find((item) => item.slug === slug);

    if (!destination) return false;

    const escape = (value) => this.escapeHTML(value);
    const isSikunir = destination.slug === "sikunir";

    /* =====================================================
     DETAIL INFORMATION
  ===================================================== */

    const detailInfo = isSikunir
      ? [
          {
            icon: "▲",
            label: "Ketinggian",
            value: "± 2.300 mdpl",
          },
          {
            icon: "◷",
            label: "Waktu terbaik",
            value: "04:00 – 06:00",
          },
          {
            icon: "▥",
            label: "Tingkat kesulitan",
            value: "Mudah",
          },
          {
            icon: "♧",
            label: "Cocok untuk",
            value: "Semua wisatawan",
          },
        ]
      : [];

    /* =====================================================
     STORY CONTENT
  ===================================================== */

    const storyImage = destination.storyImage || destination.image;

    const storyTitle = isSikunir
      ? "Menanti Matahari Terbit di Atas Lautan Awan"
      : `Cerita dari ${destination.fullName || destination.name}`;

    const storyParagraphs = isSikunir
      ? [
          "Bukit Sikunir adalah salah satu spot sunrise paling ikonik di Dieng. Dari puncaknya, kamu bisa menyaksikan matahari perlahan muncul dari balik deretan gunung dengan hamparan awan yang menyelimuti lembah.",
          "Perjalanan menuju puncak dimulai saat langit masih gelap. Udara dingin, jalur pendakian, dan perubahan warna langit menjadi bagian dari pengalaman yang membuat perjalanan ini begitu berkesan.",
        ]
      : [
          destination.excerpt,
          `Kenali lebih dekat ${
            destination.fullName || destination.name
          } dan temukan pengalaman menarik selama menjelajahi dataran tinggi Dieng.`,
        ];

    /* =====================================================
     GALLERY CONTENT
  ===================================================== */

    const galleryPhotos = [
      {
        image: destination.image,
        alt: `Pemandangan ${destination.name}`,
      },
      {
        image: destination.storyImage || destination.image,
        alt: `Suasana perjalanan di ${destination.name}`,
      },
      {
        image: destination.galleryImages?.[0] || destination.image,
        alt: `Panorama ${destination.name}`,
      },
      {
        image: destination.galleryImages?.[1] || destination.image,
        alt: `Momen wisata di ${destination.name}`,
      },
    ];

    /* =====================================================
     RENDER HTML
  ===================================================== */

    container.innerHTML = `
    <article class="destination-detail">

      <!-- ===============================================
           HERO DESTINASI
      ================================================ -->

      <section class="destination-detail-hero">

        <img
          class="destination-detail-hero-image"
          src="${escape(destination.image)}"
          alt="${escape(destination.alt || destination.name)}"
          fetchpriority="high"
        />

        <div class="destination-detail-hero-overlay"></div>

        <div class="destination-detail-hero-content">

          <a
            href="/destinasi"
            data-route
            class="destination-detail-back"
          >
            ← Kembali ke Destinasi
          </a>

          <div class="destination-detail-heading">

            <span class="destination-detail-category">
              ${escape(destination.category)}
            </span>

            <h1 class="destination-detail-title">
              ${escape(destination.fullName || destination.name)}
            </h1>

            <p class="destination-detail-location">
              <span aria-hidden="true">⌖</span>
              ${escape(destination.location)}
            </p>

            <p class="destination-detail-excerpt">
              ${escape(
                isSikunir
                  ? "Menyambut pagi dari ketinggian Dieng, dengan lautan awan dan panorama gunung yang memukau."
                  : destination.excerpt,
              )}
            </p>

          </div>

          ${
            detailInfo.length
              ? `
                <div class="destination-detail-highlights">

                  ${detailInfo
                    .map(
                      (info) => `
                        <div class="destination-detail-highlight">

                          <span
                            class="destination-detail-highlight-icon"
                            aria-hidden="true"
                          >${info.icon}</span>

                          <div>
                            <span class="destination-detail-highlight-label">
                              ${escape(info.label)}
                            </span>

                            <span class="destination-detail-highlight-value">
                              ${escape(info.value)}
                            </span>
                          </div>

                        </div>
                      `,
                    )
                    .join("")}

                </div>
              `
              : ""
          }

        </div>
      </section>

      <!-- ===============================================
           CERITA DESTINASI
      ================================================ -->

      <section
        class="destination-detail-story"
        aria-labelledby="destination-story-title"
      >

        <div class="destination-detail-story-copy">

          <span class="destination-detail-section-label">
            Cerita tentang ${escape(destination.name)}
          </span>

          <h2
            class="destination-detail-story-title"
            id="destination-story-title"
          >
            ${escape(storyTitle)}
          </h2>

          ${storyParagraphs
            .map(
              (paragraph) => `
                <p class="destination-detail-story-paragraph">
                  ${escape(paragraph)}
                </p>
              `,
            )
            .join("")}

        </div>

        <figure class="destination-detail-story-figure">

          <img
            class="destination-detail-story-image"
            src="${escape(storyImage)}"
            alt="${escape(`Suasana ${destination.name} di Dieng`)}"
            loading="lazy"
          />

        </figure>

      </section>

      <!-- ===============================================
           GALERI FOTO
      ================================================ -->

      <section
        class="destination-detail-gallery"
        aria-labelledby="destination-gallery-title"
      >

        <div class="destination-detail-gallery-heading">

          <div>
            <span class="destination-detail-section-label">
              Galeri Momen
            </span>

            <h2
              class="destination-detail-gallery-title"
              id="destination-gallery-title"
            >
              Galeri Foto ${escape(destination.name)}
            </h2>
          </div>

        </div>

        <div class="destination-detail-gallery-grid">

          ${galleryPhotos
            .map(
              (photo) => `
                <figure class="destination-detail-gallery-item">

                  <img
                    src="${escape(photo.image)}"
                    alt="${escape(photo.alt)}"
                    loading="lazy"
                  />

                </figure>
              `,
            )
            .join("")}

        </div>

      
      </section>

      <!-- ===============================================
           INFORMASI PRAKTIS
      ================================================ -->

      <section
        class="destination-detail-practical"
        aria-labelledby="destination-practical-title"
      >

        <div class="destination-detail-practical-main">

          <span class="destination-detail-section-label">
            Informasi Praktis
          </span>

          <h2
            class="destination-detail-practical-title"
            id="destination-practical-title"
          >
            Hal yang Perlu Kamu Tahu
          </h2>

          <div class="destination-detail-practical-grid">

            <article class="destination-detail-practical-card">
              <span class="destination-detail-practical-icon" aria-hidden="true">
                📍
              </span>

              <div>
                <h3>Lokasi</h3>
                <p>
                  Desa Sembungan, Kecamatan Kejajar,
                  Kabupaten Wonosobo
                </p>
              </div>
            </article>

            <article class="destination-detail-practical-card">
              <span class="destination-detail-practical-icon" aria-hidden="true">
                ◷
              </span>

              <div>
                <h3>Waktu Terbaik</h3>
                <p>
                  04.00–06.00<br />
                  <span>Untuk menikmati sunrise</span>
                </p>
              </div>
            </article>

            <article class="destination-detail-practical-card">
              <span class="destination-detail-practical-icon" aria-hidden="true">
                🎟
              </span>

              <div>
                <h3>Tiket Masuk</h3>
                <p>
                  Cek tarif terbaru sebelum berkunjung.
                </p>
              </div>
            </article>

            <article class="destination-detail-practical-card">
              <span class="destination-detail-practical-icon" aria-hidden="true">
                ▥
              </span>

              <div>
                <h3>Tingkat Kesulitan</h3>
                <p>
                  Mudah<br />
                  <span>Jalur menanjak menuju puncak</span>
                </p>
              </div>
            </article>

          </div>
        </div>

        <!-- TIPS BERKUNJUNG -->
        <aside class="destination-detail-tips">

          <h3 class="destination-detail-tips-title">
            <span aria-hidden="true">☀</span>
            Tips Berkunjung
          </h3>

          <ul class="destination-detail-tips-list">
            <li>Gunakan jaket tebal dan sarung tangan.</li>
            <li>Datang lebih awal untuk mendapatkan spot terbaik.</li>
            <li>Siapkan lampu senter untuk perjalanan sebelum matahari terbit.</li>
            <li>Perhatikan kondisi cuaca dan jalur pendakian.</li>
            <li>Jaga kebersihan dan kelestarian alam.</li>
          </ul>

        </aside>

      </section>

      
      <!-- ===============================================
           DESTINASI TERKAIT
      ================================================ -->

      <section
        class="destination-detail-related"
        aria-labelledby="destination-related-title"
      >

        <div class="destination-detail-related-heading">

          <span class="destination-detail-section-label">
            Destinasi Terkait
          </span>

          <h2
            class="destination-detail-related-title"
            id="destination-related-title"
          >
            Jelajahi Tempat Lain di Dieng
          </h2>

        </div>

        <div class="destination-detail-related-grid">

          ${DestinationsData.filter((item) => item.slug !== destination.slug)
            .slice(0, 4)
            .map(
              (item) => `
                <a
                  href="/destinasi/${escape(item.slug)}"
                  data-route
                  class="destination-detail-related-card"
                >

                  <img
                    class="destination-detail-related-image"
                    src="${escape(item.image)}"
                    alt="${escape(item.alt || item.name)}"
                    loading="lazy"
                  />

                  <div class="destination-detail-related-overlay"></div>

                  <div class="destination-detail-related-content">

                    <h3>
                      ${escape(item.fullName || item.name)}
                    </h3>

                    <p>
                      ${escape(item.excerpt)}
                    </p>

                  </div>

                  <span
                    class="destination-detail-related-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>

                </a>
              `,
            )
            .join("")}

        </div>

      </section>

    </article>


    </article>

  `;

    return true;
  },

  /* =====================================================
     RENDER DESTINATION CARDS
  ===================================================== */

  async renderDestinationCards(section) {
    const grid = section.querySelector(".destinations-grid");

    if (!grid) {
      console.warn("Destinations grid tidak ditemukan.");
      return;
    }

    try {
      const response = await fetch("./components/destination-card.html");

      if (!response.ok) {
        throw new Error(
          `Gagal memuat destination-card.html: ${response.status}`,
        );
      }

      const template = await response.text();

      grid.innerHTML = DestinationsData.map((item) => {
        const values = {
          slug: item.slug,
          image: item.image,
          alt: item.alt || item.name,
          category: item.category,
          name: item.name,
          excerpt: item.excerpt,
          cardClass:
            item.cardClass ||
            (item.featured ? "destination-card-featured" : ""),
        };

        return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
          this.escapeHTML(values[key] ?? ""),
        );
      }).join("");
    } catch (error) {
      console.error("Render Destination Cards Error:", error);
    }
  },
};

export default DestinationsPage;
