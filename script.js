(() => {
  // ========= Utility =========
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const formatIDR = (n) => {
    try {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
    } catch {
      return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
    }
  };

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  // ========= Inline "photo" images (SVG data URIs) =========
  // No external requests. Looks like photos-ish: gradient + silhouettes.
  const svgData = (svg) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  const IMG = {
    braga: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#00c2ff" stop-opacity="0.35"/>
            <stop offset="1" stop-color="#6c5cff" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#eaf7ff"/>
            <stop offset="1" stop-color="#ffffff"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)"/>
        <circle cx="980" cy="160" r="90" fill="#ffd66a" opacity="0.85"/>
        <rect y="420" width="1200" height="380" fill="url(#g)"/>
        <g opacity="0.85">
          <rect x="120" y="270" width="220" height="260" rx="24" fill="#0b1b2b" opacity="0.18"/>
          <rect x="170" y="310" width="120" height="220" rx="18" fill="#0b1b2b" opacity="0.22"/>
          <rect x="430" y="240" width="260" height="300" rx="24" fill="#0b1b2b" opacity="0.16"/>
          <rect x="740" y="280" width="160" height="260" rx="24" fill="#0b1b2b" opacity="0.14"/>
        </g>
        <g>
          <path d="M1200 560 C 980 510, 840 610, 620 560 C 420 515, 300 590, 0 560 L0 800 L1200 800 Z"
            fill="#00d39a" opacity="0.18"/>
        </g>
        <text x="40" y="70" font-family="Arial" font-size="40" fill="#0b1b2b" opacity="0.35">Braga</text>
        <text x="40" y="110" font-family="Arial" font-size="22" fill="#0b1b2b" opacity="0.25">Heritage • Art • Street food</text>
      </svg>
    `),
    lembang: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#e9fff6"/>
            <stop offset="1" stop-color="#ffffff"/>
          </linearGradient>
          <linearGradient id="h" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stop-color="#00d39a" stop-opacity="0.30"/>
            <stop offset="1" stop-color="#00c2ff" stop-opacity="0.22"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)"/>
        <circle cx="220" cy="180" r="80" fill="#ffd66a" opacity="0.9"/>
        <path d="M0 520 C 220 420, 380 610, 560 520 C 720 440, 860 560, 980 500 C 1080 450, 1140 460, 1200 430 L1200 800 L0 800 Z"
          fill="url(#h)"/>
        <path d="M0 610 C 260 520, 420 680, 640 610 C 820 555, 980 690, 1200 600 L1200 800 L0 800 Z"
          fill="#0b1b2b" opacity="0.08"/>
        <g opacity="0.24" fill="#0b1b2b">
          <circle cx="860" cy="340" r="34"/>
          <rect x="850" y="370" width="20" height="80" rx="10"/>
          <circle cx="930" cy="360" r="28"/>
          <rect x="920" y="386" width="20" height="70" rx="10"/>
        </g>
        <text x="40" y="70" font-family="Arial" font-size="40" fill="#0b1b2b" opacity="0.35">Lembang</text>
        <text x="40" y="110" font-family="Arial" font-size="22" fill="#0b1b2b" opacity="0.25">Nature • Coffee • Views</text>
      </svg>
    `),
    food: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
        <defs>
          <linearGradient id="a" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#ff6aa2" stop-opacity="0.30"/>
            <stop offset="1" stop-color="#00c2ff" stop-opacity="0.22"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="#ffffff"/>
        <rect width="1200" height="800" fill="url(#a)"/>
        <g fill="#0b1b2b" opacity="0.14">
          <circle cx="360" cy="420" r="170"/>
          <circle cx="640" cy="420" r="170"/>
          <circle cx="920" cy="420" r="170"/>
        </g>
        <text x="40" y="70" font-family="Arial" font-size="38" fill="#0b1b2b" opacity="0.35">Food Hunt</text>
        <text x="40" y="110" font-family="Arial" font-size="22" fill="#0b1b2b" opacity="0.25">Snacks • Night market vibes</text>
      </svg>
    `),
    craft: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
        <defs>
          <linearGradient id="b" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stop-color="#ffd66a" stop-opacity="0.40"/>
            <stop offset="1" stop-color="#6c5cff" stop-opacity="0.22"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="#ffffff"/>
        <rect width="1200" height="800" fill="url(#b)"/>
        <g opacity="0.18" fill="#0b1b2b">
          <rect x="170" y="220" width="260" height="360" rx="30"/>
          <rect x="480" y="260" width="260" height="320" rx="30"/>
          <rect x="790" y="240" width="240" height="340" rx="30"/>
        </g>
        <text x="40" y="70" font-family="Arial" font-size="38" fill="#0b1b2b" opacity="0.35">Crafts</text>
        <text x="40" y="110" font-family="Arial" font-size="22" fill="#0b1b2b" opacity="0.25">Heritage • Handmade stories</text>
      </svg>
    `),
    nature: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
        <defs>
          <linearGradient id="c" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#00d39a" stop-opacity="0.30"/>
            <stop offset="1" stop-color="#00c2ff" stop-opacity="0.22"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="#ffffff"/>
        <rect width="1200" height="800" fill="url(#c)"/>
        <path d="M0 560 C 200 460, 380 640, 560 560 C 740 480, 920 640, 1200 540 L1200 800 L0 800 Z"
          fill="#0b1b2b" opacity="0.10"/>
        <text x="40" y="70" font-family="Arial" font-size="38" fill="#0b1b2b" opacity="0.35">Nature</text>
        <text x="40" y="110" font-family="Arial" font-size="22" fill="#0b1b2b" opacity="0.25">Fresh air • Scenic stops</text>
      </svg>
    `)
  };

  // Put into CSS variables so style.css can reference them.
  const root = document.documentElement;
  root.style.setProperty("--img-braga", IMG.braga);
  root.style.setProperty("--img-lembang", IMG.lembang);
  root.style.setProperty("--img-food", IMG.food);
  root.style.setProperty("--img-craft", IMG.craft);
  root.style.setProperty("--img-nature", IMG.nature);

  // ========= i18n =========
  const dict = {
    EN: {
      myBookings: "My Bookings",
      kicker: "Bandung, Indonesia",
      heroTitle: "Plan a trip with locals.\nNo language stress.",
      heroDesc: "Pick a destination like Braga or Lembang, choose OpenTrip or Guide plan, then book, pay (dummy), and leave reviews.",
      destination: "Destination",
      style: "Style",
      tripLang: "Trip language",
      search: "Search",
      findTrips: "Find trips",
      reset: "Reset",
      trust1Title: "Language filters",
      trust1Sub: "ID / EN UI + trip language tags",
      trust2Title: "Community-made",
      trust2Sub: "Trips made by locals & ITB partners",
      trust3Title: "Reviews included",
      trust3Sub: "Experience + guide ratings",
      popular: "Popular right now",
      quickBraga: "Art, heritage, food",
      quickLembang: "Nature, coffee, views",
      discover: "Discover OpenTrips",
      discoverDesc: "Click a card to see details. Then book → pay → review.",
      sort: "Sort",
      newest: "Newest",
      topRated: "Top rated",
      priceLow: "Price: low",
      priceHigh: "Price: high",
      results: "results",
      emptyTitle: "No trips found",
      emptySub: "Try changing filters or search keywords.",
      booking: "Booking",
      payment: "Payment",
      review: "Review",
      bookingTitle: "Reserve your spot",
      bookingSub: "Pick date, guests, contact. Total updates automatically.",
      date: "Date",
      guests: "Guests",
      contact: "Contact",
      total: "Total",
      goPayment: "Go to Payment",
      saveDraft: "Save draft",
      paymentTitle: "Payment (dummy)",
      paymentSub: "No real money. This just marks the booking as “paid”.",
      payingFor: "Paying for",
      confirmPay: "Confirm Payment",
      back: "Back",
      reviewTitle: "Leave a review",
      reviewSub: "Rate the experience and the guide. Then submit.",
      experienceRating: "Experience rating",
      guideRating: "Guide rating",
      comment: "Comment",
      submit: "Submit review",
      newTrip: "Pick another trip",
      footerNote: "No external APIs. Dummy data only.",
      guidePlan: "Guide plan",
      all: "All",
      noBookings: "No bookings yet",
      noBookingsSub: "Choose a trip and book it. It will appear here.",
      toastPickTrip: "Pick a trip first.",
      toastNeedInput: "Please fill date and contact.",
      toastDraftSaved: "Draft saved.",
      toastPaid: "Payment completed (dummy).",
      toastReviewNeedStars: "Please choose star ratings.",
      toastReviewSaved: "Review submitted. Thanks!",
      openTrip: "OpenTrip",
      guidePlanShort: "Guide plan"
    },
    ID: {
      myBookings: "Pesanan Saya",
      kicker: "Bandung, Indonesia",
      heroTitle: "Rencanakan trip dengan warga lokal.\nTanpa stres bahasa.",
      heroDesc: "Pilih destinasi seperti Braga atau Lembang, pilih OpenTrip atau Guide plan, lalu booking, bayar (dummy), dan beri ulasan.",
      destination: "Destinasi",
      style: "Gaya",
      tripLang: "Bahasa trip",
      search: "Cari",
      findTrips: "Cari trip",
      reset: "Reset",
      trust1Title: "Filter bahasa",
      trust1Sub: "UI ID / EN + tag bahasa trip",
      trust2Title: "Dibuat komunitas",
      trust2Sub: "Trip dari warga lokal & partner ITB",
      trust3Title: "Ada ulasan",
      trust3Sub: "Rating pengalaman + guide",
      popular: "Populer sekarang",
      quickBraga: "Seni, heritage, kuliner",
      quickLembang: "Alam, kopi, pemandangan",
      discover: "Temukan OpenTrip",
      discoverDesc: "Klik kartu untuk detail. Lalu booking → bayar → ulasan.",
      sort: "Urutkan",
      newest: "Terbaru",
      topRated: "Rating tertinggi",
      priceLow: "Harga: murah",
      priceHigh: "Harga: mahal",
      results: "hasil",
      emptyTitle: "Tidak ada trip",
      emptySub: "Coba ubah filter atau kata kunci.",
      booking: "Booking",
      payment: "Bayar",
      review: "Ulasan",
      bookingTitle: "Pesan tempatmu",
      bookingSub: "Pilih tanggal, jumlah orang, kontak. Total otomatis.",
      date: "Tanggal",
      guests: "Orang",
      contact: "Kontak",
      total: "Total",
      goPayment: "Lanjut Bayar",
      saveDraft: "Simpan draft",
      paymentTitle: "Pembayaran (dummy)",
      paymentSub: "Tidak ada uang asli. Ini hanya menandai “paid”.",
      payingFor: "Membayar untuk",
      confirmPay: "Konfirmasi Bayar",
      back: "Kembali",
      reviewTitle: "Beri ulasan",
      reviewSub: "Nilai pengalaman dan guide, lalu kirim.",
      experienceRating: "Rating pengalaman",
      guideRating: "Rating guide",
      comment: "Komentar",
      submit: "Kirim ulasan",
      newTrip: "Pilih trip lain",
      footerNote: "Tanpa API eksternal. Data dummy.",
      guidePlan: "Rencana guide",
      all: "Semua",
      noBookings: "Belum ada booking",
      noBookingsSub: "Pilih trip dan booking. Akan muncul di sini.",
      toastPickTrip: "Pilih trip dulu.",
      toastNeedInput: "Isi tanggal dan kontak ya.",
      toastDraftSaved: "Draft tersimpan.",
      toastPaid: "Pembayaran selesai (dummy).",
      toastReviewNeedStars: "Pilih rating bintang dulu.",
      toastReviewSaved: "Ulasan terkirim. Terima kasih!",
      openTrip: "OpenTrip",
      guidePlanShort: "Guide plan"
    }
  };

  let uiLang = "EN";
  const t = (key) => (dict[uiLang] && dict[uiLang][key]) ? dict[uiLang][key] : key;

  const applyI18n = () => {
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      el.textContent = text;
    });
  };

  // ========= Data (dummy) =========
  const trips = [
    {
      id: "T1",
      title: { EN: "Braga Heritage Mini Tour (History + Crafts)", ID: "Tur Mini Heritage Braga (Sejarah + Kerajinan)" },
      destination: "Braga",
      languageSupported: "EN",
      createdBy: "Community",
      style: "OpenTrip",
      guideName: "Maya (ITB Student)",
      price: 150000,
      duration: "3 hours",
      meetingPoint: { EN: "Museum entrance (Braga area)", ID: "Pintu masuk museum (area Braga)" },
      ratingAvg: 4.9,
      tags: ["Heritage", "Crafts", "Story"],
      imageKey: "braga"
    },
    {
      id: "T2",
      title: { EN: "Lembang Scenic Photo Plan (Guide-made)", ID: "Rencana Foto Scenic Lembang (Dibuat guide)" },
      destination: "Lembang",
      languageSupported: "EN/ID",
      createdBy: "Community",
      style: "GuidePlan",
      guideName: "Raka (Volunteer)",
      price: 180000,
      duration: "Half day",
      meetingPoint: { EN: "Pick-up point (flexible)", ID: "Titik jemput (fleksibel)" },
      ratingAvg: 4.7,
      tags: ["Photo", "Plan", "Scenic"],
      imageKey: "nature"
    },
    {
      id: "T3",
      title: { EN: "Braga Night Food & Snacks Hunt", ID: "Jelajah Kuliner Malam Braga" },
      destination: "Braga",
      languageSupported: "ID",
      createdBy: "Local",
      style: "OpenTrip",
      guideName: "Sari (Local Host)",
      price: 90000,
      duration: "2 hours",
      meetingPoint: { EN: "Braga street corner", ID: "Sudut jalan Braga" },
      ratingAvg: 4.6,
      tags: ["Food", "Night", "Budget"],
      imageKey: "food"
    },
    {
      id: "T4",
      title: { EN: "Lembang Nature & Coffee Stops", ID: "Lembang: Alam & Singgah Kopi" },
      destination: "Lembang",
      languageSupported: "EN",
      createdBy: "Local",
      style: "GuidePlan",
      guideName: "Dewi (Local Guide)",
      price: 220000,
      duration: "4 hours",
      meetingPoint: { EN: "Main road meeting point", ID: "Titik temu jalan utama" },
      ratingAvg: 4.8,
      tags: ["Nature", "Coffee", "View"],
      imageKey: "lembang"
    },
    {
      id: "T5",
      title: { EN: "Braga Art Walk (Gallery + Street)", ID: "Braga Art Walk (Galeri + Street)" },
      destination: "Braga",
      languageSupported: "EN/ID",
      createdBy: "Community",
      style: "OpenTrip",
      guideName: "Nina (Community)",
      price: 130000,
      duration: "2.5 hours",
      meetingPoint: { EN: "Café entrance (Braga)", ID: "Depan kafe (Braga)" },
      ratingAvg: 4.5,
      tags: ["Art", "Gallery", "Street"],
      imageKey: "craft"
    }
  ];

  // ========= State =========
  let selectedTripId = null;

  // Booking store in-memory + localStorage
  const STORAGE_KEY = "bandung_openTrip_bookings_v1";
  const loadBookings = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const saveBookings = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };
  let bookings = loadBookings();

  const newBooking = (tripId) => ({
    id: `B_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    openTripId: tripId,
    date: "",
    guests: 2,
    contact: "",
    status: "planned", // planned/paid/done
    review: null
  });

  // ========= DOM refs =========
  const uiLangSelect = $("#uiLang");
  const filterDestination = $("#filterDestination");
  const filterStyle = $("#filterStyle");
  const filterTripLang = $("#filterTripLang");
  const filterQuery = $("#filterQuery");
  const sortBy = $("#sortBy");

  const btnFind = $("#btnFind");
  const btnReset = $("#btnReset");
  const btnReset2 = $("#btnReset2");
  const activeChips = $("#activeChips");
  const tripGrid = $("#tripGrid");
  const emptyState = $("#emptyState");
  const resultCount = $("#resultCount");

  const modal = $("#modal");
  const modalBackdrop = $("#modalBackdrop");
  const modalClose = $("#modalClose");
  const modalImg = $("#modalImg");
  const modalBadges = $("#modalBadges");
  const modalTitle = $("#modalTitle");
  const modalMeta = $("#modalMeta");

  const stepBtn1 = $("#stepBtn1");
  const stepBtn2 = $("#stepBtn2");
  const stepBtn3 = $("#stepBtn3");
  const panelBooking = $("#panelBooking");
  const panelPayment = $("#panelPayment");
  const panelReview = $("#panelReview");

  const bookDate = $("#bookDate");
  const bookGuests = $("#bookGuests");
  const bookContact = $("#bookContact");
  const bookTotal = $("#bookTotal");
  const toPayment = $("#toPayment");
  const saveDraftBtn = $("#saveDraft");

  const payTripTitle = $("#payTripTitle");
  const payAmount = $("#payAmount");
  const confirmPay = $("#confirmPay");
  const backToBooking = $("#backToBooking");

  const starsExp = $("#starsExp");
  const starsGuide = $("#starsGuide");
  const reviewComment = $("#reviewComment");
  const submitReview = $("#submitReview");
  const newBookingBtn = $("#newBooking");

  const toastEl = $("#toast");

  const openMyBookings = $("#openMyBookings");
  const drawer = $("#drawer");
  const drawerBackdrop = $("#drawerBackdrop");
  const drawerClose = $("#drawerClose");
  const bookingList = $("#bookingList");
  const bookingEmpty = $("#bookingEmpty");

  const quickBraga = $("#quickBraga");
  const quickLembang = $("#quickLembang");

  const promoCarousel = $("#promoCarousel");
  const promoDots = $("#promoDots");

  // ========= Helpers (UI) =========
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.remove("hidden");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.add("hidden"), 2200);
  };

  const setStep = (n) => {
    [stepBtn1, stepBtn2, stepBtn3].forEach((b, i) => {
      b.classList.toggle("is-active", i === (n - 1));
    });
    panelBooking.classList.toggle("hidden", n !== 1);
    panelPayment.classList.toggle("hidden", n !== 2);
    panelReview.classList.toggle("hidden", n !== 3);
  };

  const openModal = () => modal.classList.remove("hidden");
  const closeModal = () => modal.classList.add("hidden");

  const openDrawer = () => drawer.classList.remove("hidden");
  const closeDrawer = () => drawer.classList.add("hidden");

  const tripLabelStyle = (style) => style === "OpenTrip" ? t("openTrip") : t("guidePlanShort");

  const imageFor = (key) => {
    // map keys to css variables
    if (key === "braga") return IMG.braga;
    if (key === "lembang") return IMG.lembang;
    if (key === "food") return IMG.food;
    if (key === "craft") return IMG.craft;
    if (key === "nature") return IMG.nature;
    return IMG.braga;
  };

  // ========= Filtering / Sorting =========
  const getFilters = () => ({
    destination: filterDestination.value,
    style: filterStyle.value,
    tripLang: filterTripLang.value,
    q: filterQuery.value.trim().toLowerCase(),
    sort: sortBy.value
  });

  const filteredTrips = () => {
    const f = getFilters();
    let list = trips.slice();

    if (f.destination !== "ALL") list = list.filter(t => t.destination === f.destination);
    if (f.style !== "ALL") list = list.filter(t => t.style === f.style);
    if (f.tripLang !== "ALL") list = list.filter(t => t.languageSupported === f.tripLang);

    if (f.q) {
      list = list.filter(tr => {
        const title = (tr.title.EN + " " + tr.title.ID).toLowerCase();
        const tags = tr.tags.join(" ").toLowerCase();
        const guide = tr.guideName.toLowerCase();
        const dest = tr.destination.toLowerCase();
        return title.includes(f.q) || tags.includes(f.q) || guide.includes(f.q) || dest.includes(f.q);
      });
    }

    // sort
    if (f.sort === "NEWEST") {
      list.sort((a, b) => (b.id > a.id ? 1 : -1));
    } else if (f.sort === "RATING") {
      list.sort((a, b) => b.ratingAvg - a.ratingAvg);
    } else if (f.sort === "PRICE_LOW") {
      list.sort((a, b) => a.price - b.price);
    } else if (f.sort === "PRICE_HIGH") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  };

  const renderChips = () => {
    const f = getFilters();
    const chips = [];
    if (f.destination !== "ALL") chips.push(`${t("destination")}: ${f.destination}`);
    if (f.style !== "ALL") chips.push(`${t("style")}: ${f.style === "GuidePlan" ? t("guidePlan") : "OpenTrip"}`);
    if (f.tripLang !== "ALL") chips.push(`${t("tripLang")}: ${f.tripLang}`);
    if (f.q) chips.push(`${t("search")}: "${filterQuery.value.trim()}"`);

    activeChips.innerHTML = chips.map(c => `<span class="chip">${escapeHtml(c)}</span>`).join("");
  };

  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const starsInline = (rating) => {
    const full = Math.round(clamp(rating, 0, 5));
    const s = "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
    return `<span class="starsInline">${s}</span>`;
  };

  const renderList = () => {
    renderChips();
    const list = filteredTrips();

    resultCount.textContent = String(list.length);
    tripGrid.innerHTML = list.map(tr => {
      const title = tr.title[uiLang] || tr.title.EN;
      const img = imageFor(tr.imageKey);
      return `
        <article class="card" data-trip="${tr.id}" tabindex="0" role="button" aria-label="${escapeHtml(title)}">
          <div class="card__img" style="background-image:${img}"></div>
          <div class="card__body">
            <h3 class="card__title">${escapeHtml(title)}</h3>
            <div class="badgeRow">
              <span class="badge badge--brand">${escapeHtml(tr.destination)}</span>
              <span class="badge">${escapeHtml(tr.languageSupported)}</span>
              <span class="badge badge--green">${escapeHtml(tr.createdBy)}</span>
              <span class="badge">${escapeHtml(trLabelStyle(tr.style))}</span>
            </div>
            <div class="card__meta">
              <div class="rating">${starsInline(tr.ratingAvg)} <span>${tr.ratingAvg.toFixed(1)}</span></div>
              <div>
                <div class="price">${formatIDR(tr.price)}</div>
                <div class="small">/ person</div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    emptyState.classList.toggle("hidden", list.length !== 0);

    // attach events
    $$("[data-trip]", tripGrid).forEach(card => {
      const id = card.getAttribute("data-trip");
      card.addEventListener("click", () => selectTrip(id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectTrip(id);
        }
      });
    });
  };

  // ========= Promo carousel =========
  const promos = [
    { imgKey: "braga", kickerEN: "Weekend highlight", kickerID: "Sorotan akhir pekan",
      titleEN: "Braga Heritage + Crafts", titleID: "Heritage Braga + Kerajinan",
      descEN: "Walk the classic street, hear local stories, and meet makers.",
      descID: "Jalan santai di Braga, dengar cerita lokal, dan ketemu pembuat karya.",
      ctaEN: "See trips", ctaID: "Lihat trip", apply: () => { filterDestination.value = "Braga"; filterStyle.value = "ALL"; filterTripLang.value = "ALL"; filterQuery.value = ""; renderList(); } },
    { imgKey: "lembang", kickerEN: "Fresh air plan", kickerID: "Rencana udara segar",
      titleEN: "Lembang Nature & Coffee", titleID: "Lembang Alam & Kopi",
      descEN: "Simple route with views, coffee stops, and chill timing.",
      descID: "Rute mudah: pemandangan, singgah kopi, timing santai.",
      ctaEN: "Explore", ctaID: "Jelajahi", apply: () => { filterDestination.value = "Lembang"; filterStyle.value = "ALL"; filterTripLang.value = "ALL"; filterQuery.value = ""; renderList(); } },
    { imgKey: "food", kickerEN: "Budget friendly", kickerID: "Hemat",
      titleEN: "Night Food Hunt", titleID: "Jelajah Kuliner Malam",
      descEN: "Street snacks, warm lights, and a guide who knows the spots.",
      descID: "Jajanan kaki lima, lampu malam, dan guide yang tahu spot.",
      ctaEN: "Try it", ctaID: "Coba", apply: () => { filterStyle.value = "OpenTrip"; filterQuery.value = "food"; renderList(); } }
  ];

  let promoIndex = 0;
  const renderPromos = () => {
    promoCarousel.innerHTML = promos.map((p, i) => {
      const img = imageFor(p.imgKey);
      const kicker = uiLang === "ID" ? p.kickerID : p.kickerEN;
      const title = uiLang === "ID" ? p.titleID : p.titleEN;
      const desc = uiLang === "ID" ? p.descID : p.descEN;
      const cta = uiLang === "ID" ? p.ctaID : p.ctaEN;

      return `
        <div class="slide ${i === promoIndex ? "is-active" : ""}" data-promo="${i}">
          <div class="slide__img" style="background-image:${img}"></div>
          <div class="slide__text">
            <div class="slide__kicker">${escapeHtml(kicker)}</div>
            <div class="slide__title">${escapeHtml(title)}</div>
            <div class="slide__desc">${escapeHtml(desc)}</div>
            <button class="slide__cta" type="button">${escapeHtml(cta)} →</button>
          </div>
        </div>
      `;
    }).join("");

    promoDots.innerHTML = promos.map((_, i) => `<span class="dot ${i===promoIndex?"is-active":""}"></span>`).join("");

    // bind CTA
    $$("[data-promo]", promoCarousel).forEach(slide => {
      const i = Number(slide.getAttribute("data-promo"));
      const btn = $(".slide__cta", slide);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        promos[i].apply();
        window.scrollTo({ top: $(".main").offsetTop - 8, behavior: "smooth" });
      });
    });
  };

  const nextPromo = () => {
    promoIndex = (promoIndex + 1) % promos.length;
    renderPromos();
  };

  // ========= Trip selection / modal =========
  const selectTrip = (id) => {
    selectedTripId = id;
    const tr = trips.find(x => x.id === id);
    if (!tr) return;

    const title = tr.title[uiLang] || tr.title.EN;
    modalTitle.textContent = title;

    modalImg.style.backgroundImage = imageFor(tr.imageKey);

    modalBadges.innerHTML = `
      <span class="badge badge--brand">${escapeHtml(tr.destination)}</span>
      <span class="badge">${escapeHtml(tr.languageSupported)}</span>
      <span class="badge badge--green">${escapeHtml(tr.createdBy)}</span>
      <span class="badge">${escapeHtml(trLabelStyle(tr.style))}</span>
    `;

    const mp = tr.meetingPoint[uiLang] || tr.meetingPoint.EN;
    modalMeta.innerHTML = `
      <div><strong>Guide:</strong> ${escapeHtml(tr.guideName)}</div>
      <div><strong>Duration:</strong> ${escapeHtml(tr.duration)}</div>
      <div><strong>Meeting:</strong> ${escapeHtml(mp)}</div>
      <div><strong>Tags:</strong> ${escapeHtml(tr.tags.map(x => "#" + x).join(" "))}</div>
      <div><strong>Rating:</strong> ${tr.ratingAvg.toFixed(1)} / 5</div>
      <div><strong>Price:</strong> ${formatIDR(tr.price)} <span class="small">/ person</span></div>
    `;

    // init booking UI based on a fresh booking draft
    const draft = newBooking(id);
    bookDate.value = "";
    bookGuests.value = String(draft.guests);
    bookContact.value = "";
    updateTotal();

    // reset review
    setStars(starsExp, 0);
    setStars(starsGuide, 0);
    reviewComment.value = "";

    setStep(1);
    openModal();
  };

  const updateTotal = () => {
    const tr = trips.find(x => x.id === selectedTripId);
    if (!tr) { bookTotal.textContent = formatIDR(0); return; }
    const guests = clamp(Number(bookGuests.value || 1), 1, 20);
    const total = tr.price * guests;
    bookTotal.textContent = formatIDR(total);

    payTripTitle.textContent = tr.title[uiLang] || tr.title.EN;
    payAmount.textContent = formatIDR(total);
  };

  // ========= Stars =========
  const buildStars = (rootEl) => {
    rootEl.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "starBtn";
      b.setAttribute("data-star", String(i));
      b.innerHTML = `<span class="starGlyph">★</span>`;
      b.addEventListener("click", () => setStars(rootEl, i));
      rootEl.appendChild(b);
    }
  };

  const setStars = (rootEl, val) => {
    rootEl.setAttribute("data-value", String(val));
    $$("[data-star]", rootEl).forEach(btn => {
      const n = Number(btn.getAttribute("data-star"));
      btn.classList.toggle("is-on", n <= val);
    });
  };

  const getStars = (rootEl) => Number(rootEl.getAttribute("data-value") || "0");

  // ========= Booking actions =========
  const saveDraft = () => {
    if (!selectedTripId) return toast(t("toastPickTrip"));

    const tr = trips.find(x => x.id === selectedTripId);
    const b = newBooking(selectedTripId);

    b.date = bookDate.value || "";
    b.guests = clamp(Number(bookGuests.value || 1), 1, 20);
    b.contact = bookContact.value.trim();

    // status stays planned
    bookings.unshift(b);
    saveBookings(bookings);
    toast(t("toastDraftSaved"));

    renderBookings();
  };

  const goToPayment = () => {
    if (!selectedTripId) return toast(t("toastPickTrip"));
    const date = (bookDate.value || "").trim();
    const contact = bookContact.value.trim();
    if (!date || !contact) return toast(t("toastNeedInput"));
    setStep(2);
  };

  const confirmPayment = () => {
    if (!selectedTripId) return toast(t("toastPickTrip"));

    // create a booking as "paid" (or update latest planned)
    const b = newBooking(selectedTripId);
    b.date = bookDate.value || "";
    b.guests = clamp(Number(bookGuests.value || 1), 1, 20);
    b.contact = bookContact.value.trim();
    b.status = "paid";

    bookings.unshift(b);
    saveBookings(bookings);
    renderBookings();

    toast(t("toastPaid"));
    setStep(3);
  };

  const submitReviewNow = () => {
    const exp = getStars(starsExp);
    const guide = getStars(starsGuide);
    if (exp === 0 || guide === 0) return toast(t("toastReviewNeedStars"));

    const comment = reviewComment.value.trim();
    // attach review to most recent booking for selectedTrip
    const idx = bookings.findIndex(b => b.openTripId === selectedTripId && (b.status === "paid" || b.status === "planned"));
    if (idx >= 0) {
      bookings[idx].review = {
        experienceRating: exp,
        guideRating: guide,
        comment,
        language: uiLang
      };
      bookings[idx].status = "done";
      saveBookings(bookings);
      renderBookings();
    }
    toast(t("toastReviewSaved"));
  };

  const renderBookings = () => {
    bookingList.innerHTML = "";
    if (!bookings.length) {
      bookingEmpty.classList.remove("hidden");
      return;
    }
    bookingEmpty.classList.add("hidden");

    bookingList.innerHTML = bookings.slice(0, 20).map(b => {
      const tr = trips.find(x => x.id === b.openTripId);
      const title = tr ? (tr.title[uiLang] || tr.title.EN) : b.openTripId;
      const status = b.status;
      const statusLabel = status.toUpperCase();
      const when = b.date ? b.date : "-";
      const guests = b.guests ?? "-";
      const review = b.review ? `⭐ ${b.review.experienceRating}/5 + Guide ${b.review.guideRating}/5` : "—";
      return `
        <div class="bookingItem">
          <div class="bookingTop">
            <div class="bookingTitle">${escapeHtml(title)}</div>
            <div class="bookingStatus">${escapeHtml(statusLabel)}</div>
          </div>
          <div class="bookingMeta">
            <div><strong>Date:</strong> ${escapeHtml(String(when))}</div>
            <div><strong>Guests:</strong> ${escapeHtml(String(guests))}</div>
            <div><strong>Review:</strong> ${escapeHtml(String(review))}</div>
          </div>
        </div>
      `;
    }).join("");
  };

  // ========= Events =========
  const resetFilters = () => {
    filterDestination.value = "ALL";
    filterStyle.value = "ALL";
    filterTripLang.value = "ALL";
    filterQuery.value = "";
    sortBy.value = "NEWEST";
    renderList();
  };

  const init = () => {
    // year
    $("#year").textContent = String(new Date().getFullYear());

    // build stars
    buildStars(starsExp);
    buildStars(starsGuide);
    setStars(starsExp, 0);
    setStars(starsGuide, 0);

    // i18n
    uiLangSelect.value = uiLang;
    applyI18n();

    // promos
    renderPromos();
    clearInterval(init._promoTimer);
    init._promoTimer = setInterval(nextPromo, 5500);

    // list
    renderList();

    // bookings
    renderBookings();

    // filter actions
    btnFind.addEventListener("click", renderList);
    btnReset.addEventListener("click", resetFilters);
    btnReset2.addEventListener("click", resetFilters);

    [filterDestination, filterStyle, filterTripLang, sortBy].forEach(el => el.addEventListener("change", renderList));
    filterQuery.addEventListener("keydown", (e) => {
      if (e.key === "Enter") renderList();
    });

    // quick destination
    quickBraga.addEventListener("click", () => {
      filterDestination.value = "Braga";
      renderList();
      window.scrollTo({ top: $(".main").offsetTop - 8, behavior: "smooth" });
    });
    quickLembang.addEventListener("click", () => {
      filterDestination.value = "Lembang";
      renderList();
      window.scrollTo({ top: $(".main").offsetTop - 8, behavior: "smooth" });
    });

    // modal close
    modalBackdrop.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeDrawer();
      }
    });

    // step buttons
    stepBtn1.addEventListener("click", () => setStep(1));
    stepBtn2.addEventListener("click", () => setStep(2));
    stepBtn3.addEventListener("click", () => setStep(3));

    // booking
    bookGuests.addEventListener("input", updateTotal);
    bookDate.addEventListener("change", updateTotal);

    saveDraftBtn.addEventListener("click", saveDraft);
    toPayment.addEventListener("click", goToPayment);

    backToBooking.addEventListener("click", () => setStep(1));
    confirmPay.addEventListener("click", confirmPayment);

    submitReview.addEventListener("click", submitReviewNow);
    newBookingBtn.addEventListener("click", () => {
      closeModal();
      selectedTripId = null;
      window.scrollTo({ top: $(".main").offsetTop - 8, behavior: "smooth" });
    });

    // drawer
    openMyBookings.addEventListener("click", () => {
      renderBookings();
      openDrawer();
    });
    drawerBackdrop.addEventListener("click", closeDrawer);
    drawerClose.addEventListener("click", closeDrawer);

    // language switch
    uiLangSelect.addEventListener("change", () => {
      uiLang = uiLangSelect.value;
      applyI18n();
      renderPromos();
      renderList();
      renderBookings();
      // update modal text if open
      if (!modal.classList.contains("hidden") && selectedTripId) {
        selectTrip(selectedTripId);
      }
    });

    // default total calc
    updateTotal();
  };

  document.addEventListener("DOMContentLoaded", init);
})();