(() => {
  "use strict";

  // ---------- helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const nowId = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

  // ---------- i18n ----------
  const i18n = {
    EN: {
      appTitle: "Bandung OpenTrip Planner",
      appSubtitle: "Find trips, chat, book (dummy), and review.",
      uiLabel: "UI",
      topBtn: "Top",

      heroTitle: "Plan your Bandung trip with locals",
      heroText: "Choose language, destination, and style. Join OpenTrips or request a guide-made plan. Then book, pay (demo), and review.",
      destLabel: "Destination",
      styleLabel: "Style",
      searchLabel: "Search",
      searchBtn: "Search",
      qlExplore: "Explore Trips",
      qlGuide: "Plan with a Guide",
      qlOpenTrip: "OpenTrip (Community)",
      popularDest: "Popular destinations",
      tapToFilter: "Tap to filter",
      howItWorks: "How it works",
      step1Title: "Discover",
      step1Text: "Filter by language, destination, and style.",
      step2Title: "Chat & Book",
      step2Text: "Ask questions, reserve date & guests (demo).",
      step3Title: "Review",
      step3Text: "Rate experience + guide and share impressions.",
      all: "All",

      discoverTitle: "Discover trips",
      discoverSub: "Filter by language, destination, and style. Pick one to see details.",
      results: "results",
      tripLangLabel: "Trip language",
      sortLabel: "Sort",
      minRatingLabel: "Min rating",
      any: "Any",
      sortNewest: "Newest",
      sortRating: "Top rated",
      sortPriceLow: "Price: low",
      sortPriceHigh: "Price: high",
      reset: "Reset",

      selectedTitle: "Selected trip",
      selectedSub: "See details and move through Booking → Payment → Review.",
      emptyTitle: "Pick a trip on the left",
      emptyText: "Then you can see details, book, pay (demo), and review.",
      pickFirst: "Pick the first trip",

      perPerson: "per person",
      guideLabel: "Guide",
      durationLabel: "Duration",
      meetingLabel: "Meeting point",
      tagsLabel: "Tags",

      seePlanDetail: "See plan details",
      join: "Join",
      askQuestion: "Ask a question",

      bookingTitle: "Booking",
      bookingNote: "Demo: validates basic input.",
      dateLabel: "Date",
      guestsLabel: "Guests",
      contactLabel: "Contact",
      totalLabel: "Total",
      currencyHint: "Currency",
      toPayment: "Go to Payment",

      paymentTitle: "Payment",
      paymentNote: "Demo only. No real transaction.",
      payAmount: "Amount",
      payNow: "Pay (Demo)",

      reviewTitle: "Review",
      reviewNote: "Rate the experience and the guide.",
      experienceRating: "Experience",
      guideRating: "Guide",
      quickTags: "Quick tags",
      tagHint: "Pick a few bright feelings.",
      commentLabel: "Comment",
      submitReview: "Submit review",
      newBooking: "Book another",
      recentReviews: "Recent reviews (demo)",

      footerNote: "Prototype only. No external API. Dummy data & demo flows.",

      guidePanelTitle: "Plan with a Guide",
      guidePanelSub: "Send your request. After matching, you will move to a talk room.",
      guideRequestTitle: "Request a guide-made plan",
      uiLanguageLabel: "Language",
      interestLabel: "Interests",
      sendRequest: "Send request",
      guideTip: "Demo: matching is instant. The talk room will show an icon slot + name.",
      talkRoomTitle: "Talk room",
      talkRoomHint: "Send a request to get matched and start chatting.",
      send: "Send",

      groupChatTitle: "OpenTrip Group Chat",
      backToTrip: "Back to trip",

      toastPicked: "Trip selected.",
      toastNeedTrip: "Pick a trip first.",
      toastNeedBooking: "Please fill date, guests, and contact.",
      toastPaid: "Payment completed (demo).",
      toastNeedStars: "Please choose star ratings.",
      toastReviewSaved: "Review saved (demo).",
      toastMatched: "Matched! You are now in the talk room.",
      toastOpenedChat: "Opened chat room.",
      toastOpenedDetail: "Plan details opened."
    },

    ID: {
      appTitle: "Bandung OpenTrip Planner",
      appSubtitle: "Cari trip, chat, booking (demo), dan review.",
      uiLabel: "UI",
      topBtn: "Top",

      heroTitle: "Rencanakan trip Bandung bersama warga lokal",
      heroText: "Pilih bahasa, destinasi, dan gaya. Ikuti OpenTrip atau minta rencana dari guide. Lalu booking, bayar (demo), dan review.",
      destLabel: "Destinasi",
      styleLabel: "Gaya",
      searchLabel: "Cari",
      searchBtn: "Cari",
      qlExplore: "Cari Trip",
      qlGuide: "Minta Guide",
      qlOpenTrip: "OpenTrip (Komunitas)",
      popularDest: "Destinasi populer",
      tapToFilter: "Tap untuk filter",
      howItWorks: "Cara kerja",
      step1Title: "Temukan",
      step1Text: "Filter bahasa, destinasi, dan gaya.",
      step2Title: "Chat & Booking",
      step2Text: "Tanya, pilih tanggal & jumlah (demo).",
      step3Title: "Review",
      step3Text: "Nilai pengalaman + guide dan tulis kesan.",
      all: "Semua",

      discoverTitle: "Temukan trip",
      discoverSub: "Filter bahasa, destinasi, dan gaya. Pilih satu untuk detail.",
      results: "hasil",
      tripLangLabel: "Bahasa trip",
      sortLabel: "Urutkan",
      minRatingLabel: "Rating min",
      any: "Apa saja",
      sortNewest: "Terbaru",
      sortRating: "Rating terbaik",
      sortPriceLow: "Harga: murah",
      sortPriceHigh: "Harga: mahal",
      reset: "Reset",

      selectedTitle: "Trip dipilih",
      selectedSub: "Lihat detail dan lanjut Booking → Payment → Review.",
      emptyTitle: "Pilih trip di sebelah kiri",
      emptyText: "Lalu kamu bisa lihat detail, booking, bayar (demo), dan review.",
      pickFirst: "Pilih trip pertama",

      perPerson: "per orang",
      guideLabel: "Guide",
      durationLabel: "Durasi",
      meetingLabel: "Titik kumpul",
      tagsLabel: "Tag",

      seePlanDetail: "Lihat detail rencana",
      join: "Ikut",
      askQuestion: "Tanya",

      bookingTitle: "Booking",
      bookingNote: "Demo: validasi input dasar.",
      dateLabel: "Tanggal",
      guestsLabel: "Jumlah",
      contactLabel: "Kontak",
      totalLabel: "Total",
      currencyHint: "Mata uang",
      toPayment: "Ke Payment",

      paymentTitle: "Payment",
      paymentNote: "Demo saja. Tidak ada transaksi nyata.",
      payAmount: "Jumlah",
      payNow: "Bayar (Demo)",

      reviewTitle: "Review",
      reviewNote: "Nilai pengalaman dan guide.",
      experienceRating: "Pengalaman",
      guideRating: "Guide",
      quickTags: "Tag cepat",
      tagHint: "Pilih beberapa perasaan positif.",
      commentLabel: "Komentar",
      submitReview: "Kirim review",
      newBooking: "Booking lagi",
      recentReviews: "Review terbaru (demo)",

      footerNote: "Prototipe saja. Tanpa API eksternal. Data dummy & alur demo.",

      guidePanelTitle: "Minta Rencana dari Guide",
      guidePanelSub: "Kirim permintaan. Setelah matching, masuk ke talk room.",
      guideRequestTitle: "Minta rencana perjalanan",
      uiLanguageLabel: "Bahasa",
      interestLabel: "Minat",
      sendRequest: "Kirim permintaan",
      guideTip: "Demo: matching instan. Talk room tampilkan slot ikon + nama.",
      talkRoomTitle: "Talk room",
      talkRoomHint: "Kirim permintaan untuk mulai chat.",
      send: "Kirim",

      groupChatTitle: "OpenTrip Group Chat",
      backToTrip: "Kembali ke trip",

      toastPicked: "Trip dipilih.",
      toastNeedTrip: "Pilih trip dulu.",
      toastNeedBooking: "Isi tanggal, jumlah, dan kontak.",
      toastPaid: "Payment selesai (demo).",
      toastNeedStars: "Pilih rating bintang dulu.",
      toastReviewSaved: "Review tersimpan (demo).",
      toastMatched: "Matched! Kamu masuk talk room.",
      toastOpenedChat: "Chat room dibuka.",
      toastOpenedDetail: "Detail rencana dibuka."
    },

    JA: {
      appTitle: "Bandung OpenTrip Planner",
      appSubtitle: "体験を探す→チャット→予約(デモ)→レビューまで。",
      uiLabel: "UI",
      topBtn: "トップへ",

      heroTitle: "地元の人とつくる、バンドンの旅",
      heroText: "言語・目的地・スタイルを選んで、OpenTrip参加 or ガイド依頼。予約→決済(デモ)→レビューまで体験できます。",
      destLabel: "目的地",
      styleLabel: "スタイル",
      searchLabel: "検索",
      searchBtn: "検索",
      qlExplore: "体験を探す",
      qlGuide: "ガイドに依頼",
      qlOpenTrip: "OpenTrip（コミュニティ）",
      popularDest: "人気の目的地",
      tapToFilter: "タップで絞り込み",
      howItWorks: "使い方",
      step1Title: "探す",
      step1Text: "言語・目的地・スタイルでフィルタ。",
      step2Title: "チャット & 予約",
      step2Text: "質問して日程・人数を確定（デモ）。",
      step3Title: "レビュー",
      step3Text: "体験とガイドを評価して投稿。",
      all: "すべて",

      discoverTitle: "体験を探す",
      discoverSub: "言語・目的地・スタイルで絞り込み。選ぶと右に詳細が出ます。",
      results: "件",
      tripLangLabel: "体験の言語",
      sortLabel: "並び替え",
      minRatingLabel: "最低評価",
      any: "指定なし",
      sortNewest: "新しい順",
      sortRating: "評価が高い順",
      sortPriceLow: "価格が安い順",
      sortPriceHigh: "価格が高い順",
      reset: "リセット",

      selectedTitle: "選択中の体験",
      selectedSub: "詳細→予約→決済(デモ)→レビューへ進めます。",
      emptyTitle: "左のリストから選んでください",
      emptyText: "選ぶと詳細・予約・決済(デモ)・レビューができます。",
      pickFirst: "最初の体験を選ぶ",

      perPerson: "（1人あたり）",
      guideLabel: "ガイド",
      durationLabel: "所要時間",
      meetingLabel: "集合場所",
      tagsLabel: "タグ",

      seePlanDetail: "プラン詳細を見る",
      join: "参加する",
      askQuestion: "質問する",

      bookingTitle: "予約",
      bookingNote: "デモ：最低限の入力だけ確認します。",
      dateLabel: "日付",
      guestsLabel: "人数",
      contactLabel: "連絡先",
      totalLabel: "合計",
      currencyHint: "表示通貨",
      toPayment: "支払いへ",

      paymentTitle: "支払い",
      paymentNote: "デモです。実際の決済はしません。",
      payAmount: "支払額",
      payNow: "支払う（デモ）",

      reviewTitle: "レビュー",
      reviewNote: "体験とガイドを評価して投稿できます。",
      experienceRating: "体験",
      guideRating: "ガイド",
      quickTags: "クイックタグ",
      tagHint: "明るい感想をいくつか選べます。",
      commentLabel: "コメント",
      submitReview: "投稿する",
      newBooking: "別の体験を探す",
      recentReviews: "最近のレビュー（デモ）",

      footerNote: "プロトタイプです。外部APIなし・ダミーデータで動作します。",

      guidePanelTitle: "ガイドに依頼",
      guidePanelSub: "条件を送る→マッチング→トークルームへ移動します。",
      guideRequestTitle: "ガイドプランを依頼する",
      uiLanguageLabel: "言語",
      interestLabel: "興味",
      sendRequest: "依頼を送信",
      guideTip: "デモ：マッチングは即時。トークルームにアイコン枠＋名前を表示します。",
      talkRoomTitle: "トークルーム",
      talkRoomHint: "依頼を送ると、マッチングしてチャットできます。",
      send: "送信",

      groupChatTitle: "OpenTrip グループチャット",
      backToTrip: "体験へ戻る",

      toastPicked: "体験を選択しました。",
      toastNeedTrip: "先に体験を選んでください。",
      toastNeedBooking: "日付・人数・連絡先を入力してください。",
      toastPaid: "支払い完了（デモ）",
      toastNeedStars: "星評価を選んでください。",
      toastReviewSaved: "レビューを保存しました（デモ）",
      toastMatched: "マッチングしました。トークルームに移動します。",
      toastOpenedChat: "チャットを開きました。",
      toastOpenedDetail: "プラン詳細を開きました。"
    }
  };

  let uiLang = "EN";

  // ---------- Currency handling (demo rates) ----------
  // Base data uses IDR as base.
  // Demo rates (not real-time): 1 USD = 15,600 IDR, 1 JPY = 105 IDR
  const FX = {
    IDR_PER_USD: 15600,
    IDR_PER_JPY: 105
  };

  function currencyForUiLang(lang){
    if (lang === "JA") return "JPY";
    if (lang === "EN") return "USD";
    return "IDR";
  }

  function formatMoney(amount, currency){
    const n = Math.round(amount);
    if (currency === "IDR") return "Rp " + n.toLocaleString("id-ID");
    if (currency === "JPY") return "¥" + n.toLocaleString("ja-JP");
    // USD
    return "$" + (amount).toFixed(2);
  }

  function convertFromIDR(idr, currency){
    if (currency === "IDR") return idr;
    if (currency === "USD") return idr / FX.IDR_PER_USD;
    if (currency === "JPY") return idr / FX.IDR_PER_JPY;
    return idr;
  }

  function getPriceLabel(idr){
    const cur = currencyForUiLang(uiLang);
    const v = convertFromIDR(idr, cur);
    return formatMoney(v, cur);
  }

  function getCurrencyHintText(){
    const cur = currencyForUiLang(uiLang);
    if (cur === "IDR") return "IDR (Rp)";
    if (cur === "JPY") return "JPY (¥)  ※デモ換算";
    return "USD ($)  ※demo rate";
  }

  // ---------- Data (dummy) ----------
  const trips = [
    {
      id: "t1",
      title: { EN: "Braga Heritage Mini Tour (History + Crafts)", ID: "Tur Mini Braga (Sejarah + Kerajinan)", JA: "ブラガ歴史ミニツアー（街歩き＋工芸）" },
      destination: "Braga",
      languageSupported: "EN",
      createdBy: "Community",
      guideName: "Maya (ITB Student)",
      priceIDR: 150000,
      duration: { EN: "3 hours", ID: "3 jam", JA: "3時間" },
      meetingPoint: { EN: "Museum entrance (Braga area)", ID: "Pintu museum (area Braga)", JA: "博物館入口（ブラガ周辺）" },
      ratingAvg: 4.9,
      tags: ["Heritage", "Crafts", "Story"],
      style: "OpenTrip",
      img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=70"
    },
    {
      id: "t2",
      title: { EN: "Lembang Scenic Photo Plan (Guide-made)", ID: "Rencana Foto Lembang (Dibuat Guide)", JA: "レンバン絶景フォトプラン（ガイド作成）" },
      destination: "Lembang",
      languageSupported: "EN/ID",
      createdBy: "Community",
      guideName: "Rizky (Volunteer Guide)",
      priceIDR: 180000,
      duration: { EN: "Half day", ID: "Setengah hari", JA: "半日" },
      meetingPoint: { EN: "Pick-up point (Lembang)", ID: "Titik jemput (Lembang)", JA: "集合（レンバン）" },
      ratingAvg: 4.6,
      tags: ["Photo", "Plan", "Scenic"],
      style: "GuidePlan",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=70"
    },
    {
      id: "t3",
      title: { EN: "Braga Night Food & Snacks Hunt", ID: "Jelajah Kuliner Malam Braga", JA: "ブラガ夜の食べ歩きツアー" },
      destination: "Braga",
      languageSupported: "ID",
      createdBy: "Local",
      guideName: "Dina (Local Host)",
      priceIDR: 90000,
      duration: { EN: "2 hours", ID: "2 jam", JA: "2時間" },
      meetingPoint: { EN: "Main street corner", ID: "Sudut jalan utama", JA: "大通りの角" },
      ratingAvg: 4.4,
      tags: ["Food", "Night", "Budget"],
      style: "OpenTrip",
      img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=70"
    },
    {
      id: "t4",
      title: { EN: "Lembang Nature & Coffee Stops", ID: "Lembang Alam & Kopi", JA: "レンバン自然とコーヒー巡り" },
      destination: "Lembang",
      languageSupported: "EN",
      createdBy: "Local",
      guideName: "Adi (Local Guide)",
      priceIDR: 220000,
      duration: { EN: "4 hours", ID: "4 jam", JA: "4時間" },
      meetingPoint: { EN: "Café meeting spot", ID: "Titik temu kafe", JA: "カフェ集合" },
      ratingAvg: 4.8,
      tags: ["Nature", "Coffee", "View"],
      style: "GuidePlan",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=70"
    },
    {
      id: "t5",
      title: { EN: "Dago Street Art Walk", ID: "Jalan Seni Dago", JA: "ダゴ・ストリートアート散策" },
      destination: "Dago",
      languageSupported: "EN/ID",
      createdBy: "Community",
      guideName: "Sari (ITB Partner)",
      priceIDR: 120000,
      duration: { EN: "2.5 hours", ID: "2.5 jam", JA: "2.5時間" },
      meetingPoint: { EN: "Dago landmark", ID: "Landmark Dago", JA: "ダゴの目印集合" },
      ratingAvg: 4.7,
      tags: ["Art", "Walk", "Local"],
      style: "OpenTrip",
      img: "https://images.unsplash.com/photo-1520975958225-3f61d2e6f3f2?auto=format&fit=crop&w=1200&q=70"
    }
  ];

  // Guide matching pool (dummy)
  const guides = [
    { id:"g1", name:"Maya (ITB Student)", lang:["EN","JA"], vibe:"Culture + stories", avatarSlot:true },
    { id:"g2", name:"Rizky (Volunteer)", lang:["ID","EN"], vibe:"Nature + photos", avatarSlot:true },
    { id:"g3", name:"Dina (Local Host)", lang:["ID","JA"], vibe:"Food + hidden spots", avatarSlot:true }
  ];

  // Reviews store (demo)
  const reviews = [];

  // Booking store (demo)
  let booking = null; // { id, openTripId, date, guests, contact, status, uiCurrency }
  let selectedTripId = null;

  // Group chat state (OpenTrip)
  let groupChat = null; // { tripId, participants:[], messages:[] }

  // Guide talkroom state
  let guideRoom = null; // { guide, req, messages:[] }

  // ---------- UI elements ----------
  const el = {
    uiLang: $("#uiLang"),
    goTopBtn: $("#goTopBtn"),

    heroDestination: $("#heroDestination"),
    heroStyle: $("#heroStyle"),
    heroSearchText: $("#heroSearchText"),
    heroSearchBtn: $("#heroSearchBtn"),
    linkExplore: $("#linkExplore"),
    linkGuide: $("#linkGuide"),
    linkOpenTrip: $("#linkOpenTrip"),
    destRow: $("#destRow"),

    filterTripLang: $("#filterTripLang"),
    filterDestination: $("#filterDestination"),
    filterStyle: $("#filterStyle"),
    filterSort: $("#filterSort"),
    filterMinRating: $("#filterMinRating"),
    filterSearch: $("#filterSearch"),
    resetBtn: $("#resetBtn"),

    tripList: $("#tripList"),
    resultCount: $("#resultCount"),

    emptyState: $("#emptyState"),
    pickFirstBtn: $("#pickFirstBtn"),
    detail: $("#detail"),

    detailTitle: $("#detailTitle"),
    detailChips: $("#detailChips"),
    detailPrice: $("#detailPrice"),
    detailImg: $("#detailImg"),
    detailGuide: $("#detailGuide"),
    detailDuration: $("#detailDuration"),
    detailMeeting: $("#detailMeeting"),
    detailTags: $("#detailTags"),
    detailStars: $("#detailStars"),
    detailRatingText: $("#detailRatingText"),

    openTripDetailBtn: $("#openTripDetailBtn"),
    joinBtn: $("#joinBtn"),
    questionBtn: $("#questionBtn"),

    flowPills: $("#flowPills"),
    bookingSection: $("#bookingSection"),
    paymentSection: $("#paymentSection"),
    reviewSection: $("#reviewSection"),

    bookDate: $("#bookDate"),
    bookGuests: $("#bookGuests"),
    bookContact: $("#bookContact"),
    bookTotal: $("#bookTotal"),
    currencyHint: $("#currencyHint"),
    toPaymentBtn: $("#toPaymentBtn"),

    payAmount: $("#payAmount"),
    payNowBtn: $("#payNowBtn"),

    expStars: $("#expStars"),
    guideStars: $("#guideStars"),
    tagPills: $("#tagPills"),
    reviewComment: $("#reviewComment"),
    submitReviewBtn: $("#submitReviewBtn"),
    newBookingBtn: $("#newBookingBtn"),
    reviewList: $("#reviewList"),

    toast: $("#toast"),

    // guide request & chat
    guidePanel: $("#guidePanel"),
    guideDest: $("#guideDest"),
    guideDate: $("#guideDate"),
    guideGuests: $("#guideGuests"),
    guideLang: $("#guideLang"),
    interestPills: $("#interestPills"),
    sendGuideReqBtn: $("#sendGuideReqBtn"),
    guideChatBox: $("#guideChatBox"),
    guideChatHint: $("#guideChatHint"),
    guideChatHeader: $("#guideChatHeader"),
    guideChatName: $("#guideChatName"),
    guideChatMeta: $("#guideChatMeta"),
    guideChatLog: $("#guideChatLog"),
    guideChatInput: $("#guideChatInput"),
    guideSendBtn: $("#guideSendBtn"),

    // group chat
    groupChatPanel: $("#groupChatPanel"),
    groupChatSub: $("#groupChatSub"),
    closeGroupChatBtn: $("#closeGroupChatBtn"),
    participants: $("#participants"),
    groupChatLog: $("#groupChatLog"),
    groupChatInput: $("#groupChatInput"),
    groupSendBtn: $("#groupSendBtn"),
  };

  // ---------- i18n apply ----------
  function t(key){
    const dict = i18n[uiLang] || i18n.EN;
    return dict[key] ?? i18n.EN[key] ?? key;
  }

  function applyI18n(){
    $$("[data-i18n]").forEach(node => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });

    // placeholders
    $("#heroSearchText").placeholder = uiLang === "JA" ? "Braga, カフェ, アート..." : "Braga, coffee, art...";
    $("#filterSearch").placeholder = uiLang === "JA" ? "Braga, カフェ, アート..." : "Braga, coffee, art...";
    $("#reviewComment").placeholder = uiLang === "JA" ? "感想を書いてください…" : "Write your review...";
    $("#guideChatInput").placeholder = uiLang === "JA" ? "メッセージを入力…" : "Type a message...";
    $("#groupChatInput").placeholder = uiLang === "JA" ? "メッセージを入力…" : "Type a message...";

    // currency hint
    el.currencyHint.textContent = getCurrencyHintText();

    // rerender views affected by language
    renderDestinations();
    renderList();
    renderSelectedTrip();
    renderReviews();
    renderGuideInterests();
    renderReviewTagPills();
  }

  // ---------- toast ----------
  let toastTimer = null;
  function toast(msg){
    el.toast.textContent = msg;
    el.toast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.add("hidden"), 1800);
  }

  // ---------- destination cards ----------
  const destCards = [
    { key:"Braga", img:"https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=70", hintEN:"Heritage streets & crafts", hintID:"Jalan heritage & kerajinan", hintJA:"街歩き・歴史・工芸" },
    { key:"Lembang", img:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=70", hintEN:"Nature, views, coffee", hintID:"Alam, pemandangan, kopi", hintJA:"自然・景色・カフェ" },
    { key:"Dago", img:"https://images.unsplash.com/photo-1520975958225-3f61d2e6f3f2?auto=format&fit=crop&w=1200&q=70", hintEN:"Art walk & local vibes", hintID:"Seni jalanan & vibe lokal", hintJA:"アート散策・ローカル感" },
    { key:"Ciwidey", img:"https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=70", hintEN:"Hot springs & scenery", hintID:"Pemandian air panas & view", hintJA:"温泉・絶景" }
  ];

  function renderDestinations(){
    el.destRow.innerHTML = "";
    destCards.forEach(d => {
      const hint = uiLang === "JA" ? d.hintJA : (uiLang === "ID" ? d.hintID : d.hintEN);
      const card = document.createElement("div");
      card.className = "destCard";
      card.innerHTML = `
        <img class="destImg" src="${d.img}" alt="${d.key}">
        <div class="destBody">
          <div class="destName">${d.key}</div>
          <div class="destHint">${hint}</div>
        </div>
      `;
      card.addEventListener("click", () => {
        el.filterDestination.value = d.key;
        el.heroDestination.value = d.key;
        renderList();
        document.querySelector(".grid").scrollIntoView({ behavior:"smooth", block:"start" });
      });
      el.destRow.appendChild(card);
    });
  }

  // ---------- filters & list ----------
  function getFilteredTrips(){
    const tripLang = el.filterTripLang.value;
    const dest = el.filterDestination.value;
    const style = el.filterStyle.value;
    const sort = el.filterSort.value;
    const minRating = parseFloat(el.filterMinRating.value || "0");
    const search = (el.filterSearch.value || "").trim().toLowerCase();

    let list = trips.slice();

    if (tripLang !== "All") {
      list = list.filter(x => x.languageSupported === tripLang);
    }
    if (dest !== "All") {
      list = list.filter(x => x.destination === dest);
    }
    if (style !== "All") {
      list = list.filter(x => x.style === style);
    }
    if (minRating > 0) {
      list = list.filter(x => x.ratingAvg >= minRating);
    }
    if (search) {
      list = list.filter(x => {
        const title = (x.title[uiLang] || x.title.EN).toLowerCase();
        const tags = x.tags.join(" ").toLowerCase();
        const guide = x.guideName.toLowerCase();
        const dest2 = x.destination.toLowerCase();
        return (title + " " + tags + " " + guide + " " + dest2).includes(search);
      });
    }

    // sorting
    if (sort === "rating") list.sort((a,b) => b.ratingAvg - a.ratingAvg);
    if (sort === "priceLow") list.sort((a,b) => a.priceIDR - b.priceIDR);
    if (sort === "priceHigh") list.sort((a,b) => b.priceIDR - a.priceIDR);
    if (sort === "newest") list.sort((a,b) => (a.id < b.id ? 1 : -1)); // demo

    return list;
  }

  function starsText(rating){
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const total = 5;
    let s = "★".repeat(full);
    if (half) s += "★";
    s = s.padEnd(total, "☆");
    return s;
  }

  function makeChips(trip){
    const chips = [
      `<span class="chip">📍 ${trip.destination}</span>`,
      `<span class="chip">🗣 ${trip.languageSupported}</span>`,
      `<span class="chip">👥 ${trip.createdBy}</span>`,
      `<span class="chip">${trip.style === "OpenTrip" ? "OpenTrip" : (uiLang==="JA" ? "ガイドプラン" : "Guide plan")}</span>`
    ];
    return chips.join("");
  }

  function renderList(){
    const list = getFilteredTrips();
    el.resultCount.textContent = String(list.length);
    el.tripList.innerHTML = "";

    list.forEach(trip => {
      const card = document.createElement("div");
      card.className = "card" + (trip.id === selectedTripId ? " active" : "");
      const title = trip.title[uiLang] || trip.title.EN;
      const price = getPriceLabel(trip.priceIDR);
      card.innerHTML = `
        <div class="cardTop">
          <div>
            <div class="cardTitle">${title}</div>
            <div class="cardSub">
              ${makeChips(trip)}
              <span class="chip">#${trip.tags.join(" #")}</span>
            </div>
          </div>
          <div style="text-align:right">
            <div class="stars">${starsText(trip.ratingAvg)}</div>
            <div class="cardPrice">${price}</div>
          </div>
        </div>
      `;
      card.addEventListener("click", () => selectTrip(trip.id));
      el.tripList.appendChild(card);
    });

    // keep selection if possible
    if (selectedTripId && !list.some(x => x.id === selectedTripId)){
      selectedTripId = null;
      booking = null;
      setStep(1);
      renderSelectedTrip();
    }
  }

  function selectTrip(id){
    selectedTripId = id;
    booking = null; // reset booking for new selection
    setStep(1);
    renderList();
    renderSelectedTrip();
    toast(t("toastPicked"));
  }

  function getSelectedTrip(){
    return trips.find(x => x.id === selectedTripId) || null;
  }

  // ---------- detail + flow ----------
  let currentStep = 1; // 1 booking, 2 payment, 3 review
  function setStep(step){
    currentStep = clamp(step, 1, 3);
    $$("#flowPills .pillBtn").forEach(btn => {
      btn.classList.toggle("active", Number(btn.dataset.step) === currentStep);
    });

    // show/hide sections
    el.bookingSection.classList.toggle("hidden", currentStep !== 1);
    el.paymentSection.classList.toggle("hidden", currentStep !== 2);
    el.reviewSection.classList.toggle("hidden", currentStep !== 3);
  }

  function renderSelectedTrip(){
    const trip = getSelectedTrip();

    if (!trip){
      el.emptyState.classList.remove("hidden");
      el.detail.classList.add("hidden");
      return;
    }

    el.emptyState.classList.add("hidden");
    el.detail.classList.remove("hidden");

    const title = trip.title[uiLang] || trip.title.EN;
    el.detailTitle.textContent = title;

    el.detailChips.innerHTML = makeChips(trip);
    el.detailPrice.textContent = getPriceLabel(trip.priceIDR);
    el.detailImg.src = trip.img;

    el.detailGuide.textContent = trip.guideName;
    el.detailDuration.textContent = trip.duration[uiLang] || trip.duration.EN;
    el.detailMeeting.textContent = trip.meetingPoint[uiLang] || trip.meetingPoint.EN;
    el.detailTags.textContent = "#" + trip.tags.join(" #");

    el.detailStars.textContent = starsText(trip.ratingAvg);
    el.detailRatingText.textContent = `${trip.ratingAvg.toFixed(1)} / 5`;

    // update booking total if inputs exist
    el.currencyHint.textContent = getCurrencyHintText();
    updateTotal();

    // If currently in step 2/3 but booking missing, keep them but warn on actions.
  }

  function updateTotal(){
    const trip = getSelectedTrip();
    if (!trip){
      el.bookTotal.textContent = "—";
      el.payAmount.textContent = "—";
      return;
    }
    const guests = Number(el.bookGuests.value || "1");
    const totalIDR = trip.priceIDR * guests;
    const cur = currencyForUiLang(uiLang);
    const total = convertFromIDR(totalIDR, cur);
    el.bookTotal.textContent = formatMoney(total, cur);
    el.payAmount.textContent = formatMoney(total, cur);
  }

  // ---------- Review UI ----------
  function renderStarPicker(container, onPick){
    container.innerHTML = "";
    for (let i=1; i<=5; i++){
      const b = document.createElement("button");
      b.className = "starBtn";
      b.type = "button";
      b.textContent = "★";
      b.dataset.value = String(i);
      b.addEventListener("click", () => onPick(i));
      container.appendChild(b);
    }
  }

  function setStars(container, value){
    $$(".starBtn", container).forEach(btn => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle("on", v <= value);
    });
  }

  // quick tags: 7 bright phrases per language
  const quickTags = {
    EN: ["Fun!", "Educational", "Touching", "Would go again", "Great local vibe", "Safe & smooth", "Good value"],
    ID: ["Seru!", "Banyak belajar", "Bikin terharu", "Mau lagi", "Vibe lokal", "Aman & nyaman", "Worth it"],
    JA: ["楽しい", "勉強になる", "感動した", "また行きたい", "ローカル感が良い", "安心だった", "コスパ良い"]
  };

  let reviewState = {
    exp: 0,
    guide: 0,
    tags: new Set()
  };

  function renderReviewTagPills(){
    el.tagPills.innerHTML = "";
    const arr = quickTags[uiLang] || quickTags.EN;
    arr.forEach(tag => {
      const p = document.createElement("button");
      p.type = "button";
      p.className = "tagPill";
      p.textContent = tag;
      p.addEventListener("click", () => {
        if (reviewState.tags.has(tag)) reviewState.tags.delete(tag);
        else reviewState.tags.add(tag);
        p.classList.toggle("on", reviewState.tags.has(tag));
      });
      el.tagPills.appendChild(p);
    });
  }

  function renderReviews(){
    el.reviewList.innerHTML = "";
    const curTrip = getSelectedTrip();
    const list = reviews.slice().reverse();

    list.forEach(r => {
      const trip = trips.find(x => x.id === r.openTripId);
      const title = trip ? (trip.title[uiLang] || trip.title.EN) : "(Unknown trip)";
      const item = document.createElement("div");
      item.className = "reviewItem";
      item.innerHTML = `
        <div class="reviewItemTop">
          <div class="reviewItemTitle">${title}</div>
          <div class="muted small">${r.language} · ${new Date(r.createdAt).toLocaleString()}</div>
        </div>
        <div class="muted" style="margin-top:6px;">
          ${t("experienceRating")}: <span style="color:#f59e0b;font-weight:900">${"★".repeat(r.experienceRating).padEnd(5,"☆")}</span>
          &nbsp; · &nbsp;
          ${t("guideRating")}: <span style="color:#f59e0b;font-weight:900">${"★".repeat(r.guideRating).padEnd(5,"☆")}</span>
        </div>
        <div class="reviewItemTags">
          ${(r.tags || []).map(x => `<span class="chip">${x}</span>`).join("")}
        </div>
        <div style="margin-top:8px; white-space:pre-wrap;">${escapeHtml(r.comment || "")}</div>
      `;
      el.reviewList.appendChild(item);
    });

    // if no reviews, show hint
    if (list.length === 0){
      const hint = document.createElement("div");
      hint.className = "muted";
      hint.style.padding = "10px 2px";
      hint.textContent = uiLang === "JA" ? "まだレビューはありません。投稿するとここに表示されます。" :
                        uiLang === "ID" ? "Belum ada review. Setelah kirim, muncul di sini." :
                        "No reviews yet. After submitting, they appear here.";
      el.reviewList.appendChild(hint);
    }
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // ---------- Guide request + talk room (②) ----------
  const interests = {
    EN: ["Cafe", "Nature", "Culture", "Shopping", "Art", "Food", "Photo"],
    ID: ["Kafe", "Alam", "Budaya", "Belanja", "Seni", "Kuliner", "Foto"],
    JA: ["カフェ", "自然", "文化", "買い物", "アート", "グルメ", "写真"]
  };
  let selectedInterests = new Set(["Cafe", "Culture"]);

  function renderGuideInterests(){
    el.interestPills.innerHTML = "";
    const list = interests[uiLang] || interests.EN;

    // Map display tags back to canonical keys (EN-ish keys) for stable logic
    const canonKeys = ["Cafe","Nature","Culture","Shopping","Art","Food","Photo"];

    list.forEach((label, idx) => {
      const key = canonKeys[idx];
      const b = document.createElement("button");
      b.type = "button";
      b.className = "interestPill";
      b.textContent = label;
      b.classList.toggle("on", selectedInterests.has(key));
      b.addEventListener("click", () => {
        if (selectedInterests.has(key)) selectedInterests.delete(key);
        else selectedInterests.add(key);
        b.classList.toggle("on", selectedInterests.has(key));
      });
      el.interestPills.appendChild(b);
    });
  }

  function pickGuideFor(lang){
    // pick first guide matching requested language, else random
    const candidates = guides.filter(g => g.lang.includes(lang));
    const pool = candidates.length ? candidates : guides;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function makeGuideReply(req){
    // Create a meaning-preserving response based on destination + interests
    const interestTextEN = Array.from(req.interests).join(", ");
    const interestTextJA = Array.from(req.interests).map(k => {
      const map = {Cafe:"カフェ",Nature:"自然",Culture:"文化",Shopping:"買い物",Art:"アート",Food:"グルメ",Photo:"写真"};
      return map[k] || k;
    }).join("・");

    if (uiLang === "JA"){
      return `了解です。${req.destination}で「${interestTextJA}」中心のプランを作ります。\n` +
             `候補：①朝カフェ→②散策（写真スポット）→③ローカル体験→④買い物/休憩。\n` +
             `希望のペース（ゆっくり/詰め込み）と、移動手段（徒歩/車）を教えてください。`;
    }
    if (uiLang === "ID"){
      return `Siap! Aku buat rencana di ${req.destination} dengan fokus: ${interestTextEN}.\n` +
             `Draft: (1) kafe, (2) spot foto, (3) aktivitas lokal, (4) waktu santai.\n` +
             `Kamu maunya santai atau padat? Dan transportnya jalan kaki / mobil?`;
    }
    return `Got it! I’ll build a ${req.destination} plan focused on: ${interestTextEN}.\n` +
           `Draft idea: (1) café stop, (2) photo spots, (3) local activity, (4) chill time.\n` +
           `Do you prefer relaxed or packed? And walking or car?`;
  }

  function renderGuideRoom(){
    // header + messages
    if (!guideRoom){
      el.guideChatHeader.classList.add("hidden");
      el.guideChatHint.classList.remove("hidden");
      el.guideChatLog.innerHTML = "";
      return;
    }

    el.guideChatHint.classList.add("hidden");
    el.guideChatHeader.classList.remove("hidden");
    el.guideChatName.textContent = guideRoom.guide.name;
    el.guideChatMeta.textContent =
      uiLang === "JA" ? `言語: ${guideRoom.req.lang} · 目的地: ${guideRoom.req.destination}` :
      uiLang === "ID" ? `Bahasa: ${guideRoom.req.lang} · Destinasi: ${guideRoom.req.destination}` :
      `Language: ${guideRoom.req.lang} · Destination: ${guideRoom.req.destination}`;

    el.guideChatLog.innerHTML = "";
    guideRoom.messages.forEach(m => {
      el.guideChatLog.appendChild(renderBubble(m));
    });
    el.guideChatLog.scrollTop = el.guideChatLog.scrollHeight;
  }

  // ---------- OpenTrip plan details + group chat (③) ----------
  function openPlanDetail(){
    const trip = getSelectedTrip();
    if (!trip) return toast(t("toastNeedTrip"));

    // For now: show a friendly explanation as a chat-like message
    toast(t("toastOpenedDetail"));

    const msg =
      uiLang === "JA"
        ? `【プラン詳細（デモ）】\n・集合: ${trip.meetingPoint[uiLang] || trip.meetingPoint.EN}\n・流れ: オリエン→スポット巡り→休憩→まとめ\n・持ち物: 歩きやすい靴/水\n・質問があれば「質問する」からどうぞ。`
        : uiLang === "ID"
        ? `【Detail rencana (demo)】\n• Meet: ${trip.meetingPoint[uiLang] || trip.meetingPoint.EN}\n• Alur: briefing → spot → istirahat → wrap-up\n• Bawa: sepatu nyaman / air minum\n• Kalau ada pertanyaan, tekan "Tanya".`
        : `【Plan details (demo)】\n• Meet: ${trip.meetingPoint[uiLang] || trip.meetingPoint.EN}\n• Flow: briefing → spots → break → wrap-up\n• Bring: comfy shoes / water\n• Questions? Tap "Ask a question".`;

    // Put the details into group chat panel as system message (even before join)
    ensureGroupChat(trip);
    groupChat.messages.push({
      id: nowId(),
      who: "system",
      name: uiLang === "JA" ? "システム" : "System",
      text: msg,
      me: false
    });
  }

  function ensureGroupChat(trip){
    if (groupChat && groupChat.tripId === trip.id) return;

    // create participants (like LINE: icon slot + name)
    groupChat = {
      tripId: trip.id,
      participants: [
        { id:"p1", name: trip.guideName, role: uiLang==="JA" ? "ホスト/ガイド" : (uiLang==="ID" ? "Host/Guide" : "Host/Guide") },
        { id:"p2", name: trip.createdBy === "Community" ? "ITB Community" : "Local Community", role: uiLang==="JA" ? "コミュニティ" : (uiLang==="ID" ? "Komunitas" : "Community") },
        { id:"me", name: uiLang==="JA" ? "あなた" : (uiLang==="ID" ? "Kamu" : "You"), role: uiLang==="JA" ? "参加者" : (uiLang==="ID" ? "Peserta" : "Guest") }
      ],
      messages: [
        {
          id: nowId(),
          who: "system",
          name: uiLang === "JA" ? "システム" : "System",
          text:
            uiLang === "JA"
              ? "ここはOpenTripのグループチャット（デモ）です。参加や質問ができます。"
              : uiLang === "ID"
              ? "Ini grup chat OpenTrip (demo). Kamu bisa ikut dan tanya."
              : "This is the OpenTrip group chat (demo). You can join and ask.",
          me: false
        }
      ]
    };
  }

  function openGroupChat(mode){
    const trip = getSelectedTrip();
    if (!trip) return toast(t("toastNeedTrip"));

    ensureGroupChat(trip);

    // Add a message based on action
    if (mode === "join"){
      groupChat.messages.push({
        id: nowId(),
        who: "system",
        name: uiLang === "JA" ? "システム" : "System",
        text:
          uiLang === "JA"
            ? "参加リクエストを送信しました（デモ）。ホストが確認します。"
            : uiLang === "ID"
            ? "Permintaan ikut dikirim (demo). Host akan konfirmasi."
            : "Join request sent (demo). Host will confirm.",
        me: false
      });

      // Simulate host response
      groupChat.messages.push({
        id: nowId(),
        who: "p1",
        name: trips.find(x => x.id === trip.id).guideName,
        text:
          uiLang === "JA"
            ? "参加ありがとう！当日は集合場所で会いましょう。質問があればどうぞ。"
            : uiLang === "ID"
            ? "Makasih sudah join! Kita ketemu di meeting point ya. Kalau ada pertanyaan, chat saja."
            : "Thanks for joining! See you at the meeting point. Ask anything here.",
        me: false
      });
    }

    if (mode === "question"){
      groupChat.messages.push({
        id: nowId(),
        who: "system",
        name: uiLang === "JA" ? "システム" : "System",
        text:
          uiLang === "JA"
            ? "質問モードです（デモ）。下からメッセージを送ってください。"
            : uiLang === "ID"
            ? "Mode tanya (demo). Kirim pesan di bawah."
            : "Question mode (demo). Send a message below.",
        me: false
      });
    }

    // Show panel
    el.groupChatPanel.classList.remove("hidden");
    el.groupChatSub.textContent = `${trip.destination} · ${trip.title[uiLang] || trip.title.EN}`;
    renderGroupChat();
    toast(t("toastOpenedChat"));

    // scroll to group chat
    el.groupChatPanel.scrollIntoView({ behavior:"smooth", block:"start" });
  }

  function renderGroupChat(){
    if (!groupChat){
      el.groupChatPanel.classList.add("hidden");
      return;
    }
    // participants
    el.participants.innerHTML = "";
    groupChat.participants.forEach(p => {
      const row = document.createElement("div");
      row.className = "participant";
      row.innerHTML = `
        <div class="avatar" aria-hidden="true"></div>
        <div>
          <div class="pName">${p.name}</div>
          <div class="pRole">${p.role}</div>
        </div>
      `;
      el.participants.appendChild(row);
    });

    // messages
    el.groupChatLog.innerHTML = "";
    groupChat.messages.forEach(m => {
      el.groupChatLog.appendChild(renderBubble(m));
    });
    el.groupChatLog.scrollTop = el.groupChatLog.scrollHeight;
  }

  function renderBubble(m){
    const wrap = document.createElement("div");
    wrap.className = "bubble" + (m.me ? " me" : "");
    if (!m.me){
      // show avatar for others
      wrap.innerHTML = `
        <div class="avatar" aria-hidden="true"></div>
        <div class="bubbleBody">
          <div class="bubbleHead">${escapeHtml(m.name)}</div>
          <div class="bubbleText">${escapeHtml(m.text)}</div>
        </div>
      `;
    } else {
      wrap.innerHTML = `
        <div class="bubbleBody">
          <div class="bubbleHead">${escapeHtml(m.name)}</div>
          <div class="bubbleText">${escapeHtml(m.text)}</div>
        </div>
      `;
    }
    return wrap;
  }

  function simulateGroupReply(userText){
    const trip = getSelectedTrip();
    if (!trip) return;

    const hostName = trip.guideName;
    const repliesJA = [
      "いい質問です。集合場所は10分前に来ると安心です。",
      "天気が悪い場合は、屋内スポット中心に調整します。",
      "歩きやすい靴がベストです。"
    ];
    const repliesEN = [
      "Good question. Arriving 10 minutes early is safest.",
      "If it rains, we’ll focus more on indoor spots.",
      "Comfy shoes are the best choice."
    ];
    const repliesID = [
      "Pertanyaan bagus. Datang 10 menit lebih awal ya.",
      "Kalau hujan, kita fokus ke spot indoor.",
      "Pakai sepatu yang nyaman ya."
    ];

    const pool = uiLang === "JA" ? repliesJA : (uiLang === "ID" ? repliesID : repliesEN);
    const pick = pool[Math.floor(Math.random()*pool.length)];

    setTimeout(() => {
      groupChat.messages.push({
        id: nowId(),
        who: "p1",
        name: hostName,
        text: pick,
        me: false
      });
      renderGroupChat();
    }, 500);
  }

  // ---------- events ----------
  function bindEvents(){
    // UI language
    el.uiLang.addEventListener("change", () => {
      uiLang = el.uiLang.value;
      applyI18n();
    });

    // Top
    el.goTopBtn.addEventListener("click", () => {
      $("#top").scrollIntoView({ behavior:"smooth", block:"start" });
    });

    // hero search => set filters
    el.heroSearchBtn.addEventListener("click", () => {
      el.filterDestination.value = el.heroDestination.value;
      el.filterStyle.value = el.heroStyle.value;
      el.filterSearch.value = el.heroSearchText.value;
      renderList();
      document.querySelector(".grid").scrollIntoView({ behavior:"smooth", block:"start" });
    });

    // quick links
    el.linkExplore.addEventListener("click", () => document.querySelector(".grid").scrollIntoView({ behavior:"smooth" }));
    el.linkGuide.addEventListener("click", () => el.guidePanel.scrollIntoView({ behavior:"smooth" }));
    el.linkOpenTrip.addEventListener("click", () => {
      // set filter style to OpenTrip and scroll
      el.filterStyle.value = "OpenTrip";
      renderList();
      document.querySelector(".grid").scrollIntoView({ behavior:"smooth" });
    });

    // filters
    [el.filterTripLang, el.filterDestination, el.filterStyle, el.filterSort, el.filterMinRating].forEach(x => {
      x.addEventListener("change", renderList);
    });
    el.filterSearch.addEventListener("input", () => {
      // light debounce
      clearTimeout(el.filterSearch._t);
      el.filterSearch._t = setTimeout(renderList, 120);
    });
    el.resetBtn.addEventListener("click", () => {
      el.filterTripLang.value = "All";
      el.filterDestination.value = "All";
      el.filterStyle.value = "All";
      el.filterSort.value = "newest";
      el.filterMinRating.value = "0";
      el.filterSearch.value = "";
      renderList();
    });

    // flow pills
    $$("#flowPills .pillBtn").forEach(btn => {
      btn.addEventListener("click", () => setStep(Number(btn.dataset.step)));
    });

    // pick first
    el.pickFirstBtn.addEventListener("click", () => {
      const list = getFilteredTrips();
      if (list.length) selectTrip(list[0].id);
    });

    // booking inputs
    el.bookGuests.addEventListener("input", updateTotal);
    el.bookDate.addEventListener("input", updateTotal);
    el.bookContact.addEventListener("input", updateTotal);

    // to payment
    el.toPaymentBtn.addEventListener("click", () => {
      const trip = getSelectedTrip();
      if (!trip) return toast(t("toastNeedTrip"));

      const date = (el.bookDate.value || "").trim();
      const guests = Number(el.bookGuests.value || "0");
      const contact = (el.bookContact.value || "").trim();
      if (!date || guests <= 0 || !contact) return toast(t("toastNeedBooking"));

      booking = {
        id: nowId(),
        openTripId: trip.id,
        date,
        guests,
        contact,
        status: "planned",
        uiCurrency: currencyForUiLang(uiLang)
      };
      setStep(2);
      updateTotal();
    });

    // payment method buttons (cosmetic)
    $$(".payMethod").forEach(b => b.addEventListener("click", () => {
      $$(".payMethod").forEach(x => x.classList.remove("primary"));
      b.classList.add("primary");
    }));

    // pay now
    el.payNowBtn.addEventListener("click", () => {
      if (!booking) return toast(t("toastNeedBooking"));
      booking.status = "paid";
      toast(t("toastPaid"));
      setStep(3);
    });

    // review star pickers
    renderStarPicker(el.expStars, (v) => {
      reviewState.exp = v;
      setStars(el.expStars, v);
    });
    renderStarPicker(el.guideStars, (v) => {
      reviewState.guide = v;
      setStars(el.guideStars, v);
    });

    // submit review
    el.submitReviewBtn.addEventListener("click", () => {
      const trip = getSelectedTrip();
      if (!trip) return toast(t("toastNeedTrip"));
      if (!booking || booking.status !== "paid"){
        // allow demo anyway? keep strict-ish
      }

      if (reviewState.exp === 0 || reviewState.guide === 0) return toast(t("toastNeedStars"));
      const comment = (el.reviewComment.value || "").trim();

      reviews.push({
        id: nowId(),
        bookingId: booking ? booking.id : "demo",
        openTripId: trip.id,
        experienceRating: reviewState.exp,
        guideRating: reviewState.guide,
        comment,
        language: uiLang,
        tags: Array.from(reviewState.tags),
        createdAt: Date.now()
      });

      toast(t("toastReviewSaved"));
      // reset state
      reviewState = { exp:0, guide:0, tags:new Set() };
      setStars(el.expStars, 0);
      setStars(el.guideStars, 0);
      el.reviewComment.value = "";
      renderReviewTagPills();
      renderReviews();
    });

    // book another
    el.newBookingBtn.addEventListener("click", () => {
      selectedTripId = null;
      booking = null;
      setStep(1);
      renderList();
      renderSelectedTrip();
      $("#top").scrollIntoView({ behavior:"smooth" });
    });

    // (③) plan detail / join / question
    el.openTripDetailBtn.addEventListener("click", () => {
      openPlanDetail();
      openGroupChat("detail");
    });
    el.joinBtn.addEventListener("click", () => openGroupChat("join"));
    el.questionBtn.addEventListener("click", () => openGroupChat("question"));

    // group chat send
    el.groupSendBtn.addEventListener("click", () => {
      const text = (el.groupChatInput.value || "").trim();
      if (!text || !groupChat) return;
      const meName = uiLang === "JA" ? "あなた" : (uiLang === "ID" ? "Kamu" : "You");
      groupChat.messages.push({ id: nowId(), who:"me", name: meName, text, me:true });
      el.groupChatInput.value = "";
      renderGroupChat();
      simulateGroupReply(text);
    });
    el.groupChatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") el.groupSendBtn.click();
    });

    el.closeGroupChatBtn.addEventListener("click", () => {
      el.groupChatPanel.classList.add("hidden");
      // return focus to detail
      document.querySelector(".grid").scrollIntoView({ behavior:"smooth" });
    });

    // (②) guide request
    el.sendGuideReqBtn.addEventListener("click", () => {
      const destination = el.guideDest.value;
      const date = (el.guideDate.value || "").trim();
      const guests = Number(el.guideGuests.value || "0");
      const lang = el.guideLang.value;

      // allow empty date in demo, but better UX to nudge
      const req = {
        destination,
        date: date || "(TBD)",
        guests: guests || 2,
        lang,
        interests: new Set(selectedInterests)
      };

      const matched = pickGuideFor(lang);
      guideRoom = {
        guide: matched,
        req,
        messages: []
      };

      // greeting + auto reply
      guideRoom.messages.push({
        id: nowId(),
        who:"system",
        name: uiLang === "JA" ? "システム" : "System",
        text:
          uiLang === "JA" ? `マッチングしました：${matched.name}\n目的地: ${destination} / 人数: ${req.guests} / 言語: ${lang}` :
          uiLang === "ID" ? `Matched: ${matched.name}\nDestinasi: ${destination} / Orang: ${req.guests} / Bahasa: ${lang}` :
          `Matched: ${matched.name}\nDestination: ${destination} / Guests: ${req.guests} / Language: ${lang}`,
        me:false
      });

      guideRoom.messages.push({
        id: nowId(),
        who:"guide",
        name: matched.name,
        text: makeGuideReply(req),
        me:false
      });

      toast(t("toastMatched"));
      renderGuideRoom();
      el.guideChatBox.scrollIntoView({ behavior:"smooth", block:"start" });
    });

    // guide chat send
    el.guideSendBtn.addEventListener("click", () => {
      const text = (el.guideChatInput.value || "").trim();
      if (!text || !guideRoom) return;
      const meName = uiLang === "JA" ? "あなた" : (uiLang === "ID" ? "Kamu" : "You");
      guideRoom.messages.push({ id: nowId(), who:"me", name: meName, text, me:true });
      el.guideChatInput.value = "";
      renderGuideRoom();

      // auto reply that "makes sense"
      setTimeout(() => {
        const reply =
          uiLang === "JA"
            ? `了解です。「${text}」を踏まえて、${guideRoom.req.destination}のプランを微調整します。おすすめスポットを2〜3個提案して良いですか？`
            : uiLang === "ID"
            ? `Siap. Dari pesanmu: "${text}", aku akan sesuaikan rencananya di ${guideRoom.req.destination}. Mau aku rekomendasikan 2-3 spot?`
            : `Got it. Based on: "${text}", I’ll adjust the plan for ${guideRoom.req.destination}. Want 2–3 suggested spots?`;

        guideRoom.messages.push({ id: nowId(), who:"guide", name: guideRoom.guide.name, text: reply, me:false });
        renderGuideRoom();
      }, 600);
    });
    el.guideChatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") el.guideSendBtn.click();
    });
  }

  // ---------- init ----------
  function init(){
    // default UI lang from browser but keep stable
    const nav = (navigator.language || "en").toLowerCase();
    uiLang = nav.startsWith("ja") ? "JA" : (nav.startsWith("id") ? "ID" : "EN");
    el.uiLang.value = uiLang;

    // default values
    el.filterTripLang.value = "All";
    el.filterDestination.value = "All";
    el.filterStyle.value = "All";
    el.filterSort.value = "newest";
    el.filterMinRating.value = "0";
    el.filterSearch.value = "";

    // bind
    bindEvents();

    // render initial
    setStep(1);
    renderDestinations();
    renderGuideInterests();
    renderReviewTagPills();
    renderList();
    renderSelectedTrip();
    renderReviews();
    renderGuideRoom();

    // currency hint
    el.currencyHint.textContent = getCurrencyHintText();
  }

  // Run
  document.addEventListener("DOMContentLoaded", init);
})();