/* =========================================
   DONGENG DIENG
   DESTINATIONS DATA
========================================= */

import CONFIG from "../assets/js/config.js";

const DestinationsData = [
  /* =====================================
     01. BUKIT SIKUNIR
  ===================================== */

  {
    id: "sikunir",
    name: "Sikunir",
    fullName: "Bukit Sikunir",
    slug: "sikunir",
    category: "Sunrise",
    location: "Dieng, Jawa Tengah",

    image: CONFIG.asset("assets/images/destinations/destination-sikunir.jpg"),

    storyImage: CONFIG.asset("assets/images/destinations/sikunir-hero.jpg"),

    galleryImages: [
      CONFIG.asset("assets/images/destinations/sikunir-gallery-1.jpg"),
      CONFIG.asset("assets/images/destinations/sikunir-gallery-2.jpg"),
    ],

    alt: "Pemandangan sunrise dari Bukit Sikunir Dieng",
    excerpt: "Menyambut pagi dari ketinggian Dieng.",
    featured: true,
    cardClass: "destination-card-featured",
  },

  /* =====================================
     02. TELAGA WARNA
  ===================================== */

  {
    id: "telaga-warna",
    name: "Telaga Warna",
    fullName: "Telaga Warna Dieng",
    slug: "telaga-warna",
    category: "Nature",
    location: "Dieng, Jawa Tengah",

    image: CONFIG.asset(
      "assets/images/destinations/destination-telaga-warna.jpg",
    ),

    alt: "Pemandangan Telaga Warna Dieng",
    excerpt: "Warna air, kabut, dan cerita di baliknya.",
    featured: false,
    cardClass: "destination-card-telaga",
  },

  /* =====================================
     03. KAWAH SIKIDANG
  ===================================== */

  {
    id: "kawah-sikidang",
    name: "Kawah Sikidang",
    fullName: "Kawah Sikidang Dieng",
    slug: "kawah-sikidang",
    category: "Geologi",
    location: "Dieng, Jawa Tengah",

    image: CONFIG.asset(
      "assets/images/destinations/destination-kawah-sikidang.jpg",
    ),

    alt: "Pemandangan Kawah Sikidang Dieng",
    excerpt: "Menyaksikan bumi Dieng dari dekat.",
    featured: false,
    cardClass: "destination-card-sikidang",
  },

  /* =====================================
     04. CANDI ARJUNA
  ===================================== */

  {
    id: "candi-arjuna",
    name: "Candi Arjuna",
    fullName: "Kompleks Candi Arjuna",
    slug: "candi-arjuna",
    category: "Sejarah",
    location: "Dieng, Jawa Tengah",

    image: CONFIG.asset(
      "assets/images/destinations/destination-candi-arjuna.jpg",
    ),

    alt: "Kompleks Candi Arjuna di dataran tinggi Dieng",
    excerpt: "Jejak sejarah di tengah dataran tinggi.",
    featured: false,
    cardClass: "destination-card-arjuna",
  },
];

/* =========================================
   EXPORT
========================================= */

export default DestinationsData;
