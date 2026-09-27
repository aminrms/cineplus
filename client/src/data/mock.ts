import type { Booking, Cinema, Concession, Movie, Showtime } from "@/types";

const avatar = (seed: string) => `https://i.pravatar.cc/100?img=${seed}`;
const poster = (seed: string) => `https://images.unsplash.com/${seed}?w=600&q=80&auto=format&fit=crop`;
const backdrop = (seed: string) => `https://images.unsplash.com/${seed}?w=1600&q=80&auto=format&fit=crop`;

export const MOVIES: Movie[] = [
  {
    id: "dune-part-two", title: "Dune: Part Two", titleFa: "تل‌ماسه: بخش دوم",
    poster: poster("photo-1534447677768-be436bb09401"), backdrop: backdrop("photo-1534447677768-be436bb09401"),
    rating: 8.6, duration: 168,
    genres: ["Sci-Fi", "Drama", "Adventure"], genresFa: ["علمی‌تخیلی", "درام", "ماجراجویی"],
    certification: "PG-13",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    synopsisFa: "پل آتریدیز با چانی و فرمن‌ها متحد می‌شود تا از توطئه‌گرانی که خانواده‌اش را نابود کردند انتقام بگیرد؛ نبردی حماسی بر سر آراکیس و ادویه.",
    releaseDate: "2026-03-01", director: "Denis Villeneuve", language: "English", status: "now-showing",
    formats: ["IMAX", "Dolby Atmos"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    cast: [
      { id: "c1", name: "Timothée Chalamet", role: "Paul Atreides", avatar: avatar("12") },
      { id: "c2", name: "Zendaya", role: "Chani", avatar: avatar("47") },
      { id: "c3", name: "Rebecca Ferguson", role: "Lady Jessica", avatar: avatar("32") },
      { id: "c4", name: "Austin Butler", role: "Feyd-Rautha", avatar: avatar("53") },
    ],
  },
  {
    id: "oppenheimer", title: "Oppenheimer", titleFa: "اوپنهایمر",
    poster: poster("photo-1446776811953-b23d57bd21aa"), backdrop: backdrop("photo-1446776811953-b23d57bd21aa"),
    rating: 8.4, duration: 180,
    genres: ["Drama", "History"], genresFa: ["درام", "تاریخی"],
    certification: "R",
    synopsis: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
    synopsisFa: "روایت زندگی رابرت اوپنهایمر و ساخت بمب اتم؛ جایی که علم، سیاست و وجدان در برابر هم قرار می‌گیرند.",
    releaseDate: "2026-02-14", director: "Christopher Nolan", language: "English", status: "now-showing",
    formats: ["IMAX", "70mm"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    cast: [
      { id: "c5", name: "Cillian Murphy", role: "Oppenheimer", avatar: avatar("11") },
      { id: "c6", name: "Emily Blunt", role: "Kitty", avatar: avatar("44") },
    ],
  },
  {
    id: "interstellar-2", title: "Interstellar: Beyond", titleFa: "میان‌ستاره‌ای: آن‌سوی",
    poster: poster("photo-1462331940025-496dfbfc7564"), backdrop: backdrop("photo-1462331940025-496dfbfc7564"),
    rating: 8.1, duration: 155,
    genres: ["Sci-Fi", "Adventure"], genresFa: ["علمی‌تخیلی", "ماجراجویی"],
    certification: "PG-13",
    synopsis: "A new crew ventures beyond the wormhole to find a home for humanity.",
    synopsisFa: "گروهی تازه از دل کرم‌چاله می‌گذرد تا خانه‌ای نو برای بشر بیابد؛ سفری میان ستارگان و زمان.",
    releaseDate: "2026-04-10", director: "Ava Sterling", language: "English", status: "now-showing",
    formats: ["IMAX", "Dolby Atmos"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    cast: [{ id: "c7", name: "John David", role: "Commander", avatar: avatar("15") }],
  },
  {
    id: "neon-city", title: "Neon City", titleFa: "شهر نئون",
    poster: poster("photo-1518709268805-4e9042af9f23"), backdrop: backdrop("photo-1518709268805-4e9042af9f23"),
    rating: 7.8, duration: 132,
    genres: ["Action", "Thriller"], genresFa: ["اکشن", "هیجانی"],
    certification: "PG-13",
    synopsis: "A detective hunts a rogue AI through a rain-soaked megacity.",
    synopsisFa: "کارآگاهی در کلان‌شهری بارانی به دنبال هوش مصنوعی سرکشی است که شهر را به آشوب کشیده است.",
    releaseDate: "2026-03-20", director: "Rin Kato", language: "English", status: "now-showing",
    formats: ["Dolby Atmos"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    cast: [{ id: "c8", name: "Maya Chen", role: "Detective", avatar: avatar("45") }],
  },
  {
    id: "grand-budapest-nights", title: "Grand Nights", titleFa: "شب‌های بزرگ",
    poster: poster("photo-1489599849927-2ee91cede3ba"), backdrop: backdrop("photo-1489599849927-2ee91cede3ba"),
    rating: 7.5, duration: 118,
    genres: ["Comedy", "Drama"], genresFa: ["کمدی", "درام"],
    certification: "PG",
    synopsis: "A concierge and his protégé stumble into a night of mistaken identities.",
    synopsisFa: "یک مستخدم هتل و شاگردش در شبی پر از سوءتفاهم‌های خنده‌دار گرفتار می‌شوند.",
    releaseDate: "2026-03-28", director: "Wes Alden", language: "English", status: "now-showing",
    formats: ["Standard"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    cast: [{ id: "c9", name: "Owen Park", role: "Concierge", avatar: avatar("59") }],
  },
  {
    id: "deep-tide", title: "Deep Tide", titleFa: "موج عمیق",
    poster: poster("photo-1439405326854-014607f694d7"), backdrop: backdrop("photo-1439405326854-014607f694d7"),
    rating: 7.9, duration: 141,
    genres: ["Adventure", "Mystery"], genresFa: ["ماجراجویی", "معمایی"],
    certification: "PG-13",
    synopsis: "Marine biologists discover a glowing world beneath the trench.",
    synopsisFa: "زیست‌شناسان دریایی دنیایی درخشان را در اعماق گودال اقیانوس کشف می‌کنند.",
    releaseDate: "2026-05-02", director: "Sofia Mar", language: "English", status: "coming-soon",
    formats: ["IMAX"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    cast: [{ id: "c10", name: "Lena Ruiz", role: "Dr. Mara", avatar: avatar("26") }],
  },
  {
    id: "silent-orchestra", title: "Silent Orchestra", titleFa: "ارکستر خاموش",
    poster: poster("photo-1507838153414-b4b713384a76"), backdrop: backdrop("photo-1507838153414-b4b713384a76"),
    rating: 8.0, duration: 126,
    genres: ["Drama", "Music"], genresFa: ["درام", "موسیقی"],
    certification: "PG",
    synopsis: "A deaf composer rediscovers sound through a city that hums.",
    synopsisFa: "آهنگسازی ناشنوا در شهری که زمزمه می‌کند، دوباره صدا را کشف می‌کند.",
    releaseDate: "2026-05-16", director: "Elena Voss", language: "English", status: "coming-soon",
    formats: ["Dolby Atmos"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    cast: [{ id: "c11", name: "Theo Lind", role: "Composer", avatar: avatar("61") }],
  },
  {
    id: "crimson-peak-returns", title: "Crimson Dunes", titleFa: "تپه‌های سرخ",
    poster: poster("photo-1509347528160-9a9e33742cdb"), backdrop: backdrop("photo-1509347528160-9a9e33742cdb"),
    rating: 7.2, duration: 149,
    genres: ["Horror", "Mystery"], genresFa: ["ترسناک", "معمایی"],
    certification: "R",
    synopsis: "An heir returns to a desert manor where the walls whisper.",
    synopsisFa: "وارثی به عمارت کویری بازمی‌گردد؛ جایی که دیوارها نجوا می‌کنند.",
    releaseDate: "2026-06-01", director: "M. Okafor", language: "English", status: "coming-soon",
    formats: ["Standard"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    cast: [{ id: "c12", name: "Ivy Sloane", role: "Heir", avatar: avatar("31") }],
  },
  {
    id: "sky-cartel", title: "Sky Cartel", titleFa: "کارتل آسمان",
    poster: poster("photo-1436491865332-7a61a109cc05"), backdrop: backdrop("photo-1436491865332-7a61a109cc05"),
    rating: 7.6, duration: 137,
    genres: ["Action", "Crime"], genresFa: ["اکشن", "جنایی"],
    certification: "PG-13",
    synopsis: "Smugglers race rival crews across storm corridors.",
    synopsisFa: "قاچاقچیان در دالان‌های طوفانی با گروه‌های رقیب مسابقه می‌دهند.",
    releaseDate: "2026-04-18", director: "D. Reyes", language: "English", status: "now-showing",
    formats: ["Dolby Atmos"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    cast: [{ id: "c13", name: "Marco Diaz", role: "Pilot", avatar: avatar("13") }],
  },
  {
    id: "paper-moons", title: "Paper Moons", titleFa: "ماه‌های کاغذی",
    poster: poster("photo-1519681393784-d120267933ba"), backdrop: backdrop("photo-1519681393784-d120267933ba"),
    rating: 8.2, duration: 122,
    genres: ["Romance", "Drama"], genresFa: ["عاشقانه", "درام"],
    certification: "PG",
    synopsis: "Two night-shift astronomers fall in love over shared constellations.",
    synopsisFa: "دو ستاره‌شناس شیفت شب بر فراز صورت‌های فلکی مشترک دل به هم می‌بازند.",
    releaseDate: "2026-04-25", director: "Hana Ito", language: "English", status: "now-showing",
    formats: ["Standard"], trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    cast: [{ id: "c14", name: "Yuki Tanaka", role: "Astronomer", avatar: avatar("38") }],
  },
];

export const CINEMAS: Cinema[] = [
  {
    id: "grand-metropolis", name: "Grand Metropolis Cineplex", nameFa: "پردیس سینمایی کوروش",
    distance: 1.8, address: "Tehran, Kourosh Complex", addressFa: "تهران، مجتمع کوروش",
    facilities: ["IMAX", "Dolby Atmos", "Laser Projection", "Premium Seating"],
    facilitiesFa: ["آیمکس", "دالبی اتموس", "پروژکشن لیزری", "صندلی ویژه"],
    halls: ["Hall 1", "Hall 2", "Hall 3"],
  },
  {
    id: "starlight-downtown", name: "Starlight Downtown", nameFa: "پردیس سینمایی ملت",
    distance: 2.4, address: "Tehran, Mellat Park", addressFa: "تهران، پارک ملت",
    facilities: ["Dolby Atmos", "Premium Seating"],
    facilitiesFa: ["دالبی اتموس", "صندلی ویژه"],
    halls: ["Hall A", "Hall B"],
  },
  {
    id: "aurora-mall", name: "Aurora Mall Cinema", nameFa: "سینما آزادی",
    distance: 3.1, address: "Tehran, Azadi Sq.", addressFa: "تهران، میدان آزادی",
    facilities: ["Laser Projection", "Family Hall"],
    facilitiesFa: ["پروژکشن لیزری", "سالن خانواده"],
    halls: ["Hall 1", "Hall 2"],
  },
  {
    id: "palace-royale", name: "Palace Royale VIP", nameFa: "پردیس چارسو (وی‌آی‌پی)",
    distance: 4.6, address: "Tehran, Charsou Mall", addressFa: "تهران، بازار چارسو",
    facilities: ["VIP Lounge", "Dolby Atmos", "Premium Seating"],
    facilitiesFa: ["لژ وی‌آی‌پی", "دالبی اتموس", "صندلی ویژه"],
    halls: ["VIP 1", "VIP 2"],
  },
  {
    id: "riverfront-drive", name: "Riverfront Cinema", nameFa: "سینما فرهنگ",
    distance: 5.9, address: "Tehran, Farhang Blvd", addressFa: "تهران، بلوار فرهنگ",
    facilities: ["IMAX", "Laser Projection"],
    facilitiesFa: ["آیمکس", "پروژکشن لیزری"],
    halls: ["Hall 1", "Hall 2", "Hall 3"],
  },
];

export const DATES = ["2026-04-23", "2026-04-24", "2026-04-25", "2026-04-26", "2026-04-27", "2026-04-28", "2026-04-29"];
const TIMES = ["10:30", "13:45", "17:20", "20:10", "22:50"];

export const SHOWTIMES: Showtime[] = (() => {
  const out: Showtime[] = [];
  const movies = ["dune-part-two", "oppenheimer", "neon-city", "sky-cartel", "paper-moons", "interstellar-2"];
  for (const date of DATES) {
    for (const cinema of CINEMAS) {
      for (const movieId of movies.slice(0, 3)) {
        TIMES.forEach((time, i) => {
          const status = i === 4 ? "sold-out" : i === 3 ? "filling-fast" : "available";
          out.push({
            id: `${movieId}-${cinema.id}-${date}-${time}`.replace(/[:.]/g, ""),
            movieId, cinemaId: cinema.id, date, time,
            hall: cinema.halls[i % cinema.halls.length],
            format: time === "20:10" ? "imax" : i % 3 === 0 ? "dolby" : "standard",
            status,
          });
        });
      }
    }
  }
  return out;
})();

export const CONCESSIONS: Concession[] = [
  { id: "classic-combo", name: "Classic Combo", nameFa: "کمبو کلاسیک", description: "Large popcorn + 2 craft sodas", descriptionFa: "پاپ‌کورن بزرگ + ۲ نوشابه", price: 320000, category: "Combos", categoryFa: "کمبوها", image: poster("photo-1585647347483-22b66260dfff") },
  { id: "large-popcorn", name: "Large Popcorn", nameFa: "پاپ‌کورن بزرگ", description: "Buttered, extra crunch", descriptionFa: "کره‌ای و فوق ترد", price: 180000, category: "Gourmet Popcorn", categoryFa: "پاپ‌کورن ویژه", image: poster("photo-1578849278619-e73505e9610f") },
  { id: "caramel-popcorn", name: "Caramel Popcorn", nameFa: "پاپ‌کورن کاراملی", description: "Golden caramel drizzle", descriptionFa: "با سس کارامل طلایی", price: 160000, category: "Gourmet Popcorn", categoryFa: "پاپ‌کورن ویژه", image: poster("photo-1505686994434-e3cc5abf1330") },
  { id: "craft-soda", name: "Craft Soda", nameFa: "نوشابه خاص", description: "Artisan cola, 500ml", descriptionFa: "کولای دست‌ساز، ۵۰۰ میلی‌لیتر", price: 65000, category: "Craft Sodas", categoryFa: "نوشابه‌های خاص", image: poster("photo-1581636625402-29b2a704ef13") },
  { id: "nachos-grande", name: "Nachos Grande", nameFa: "ناچو گرانده", description: "Cheese, jalapeños, salsa", descriptionFa: "پنیر، هالوپینو، سالسا", price: 190000, category: "Nachos", categoryFa: "ناچو", image: poster("photo-1513456852971-30c0b8199d4d") },
  { id: "vip-combo", name: "VIP Combo", nameFa: "کمبو وی‌آی‌پی", description: "Popcorn, nachos + 2 drinks", descriptionFa: "پاپ‌کورن، ناچو + ۲ نوشیدنی", price: 420000, category: "Combos", categoryFa: "کمبوها", image: poster("photo-1563805042-7684c019e1cb") },
  { id: "choco-popcorn", name: "Choco Popcorn", nameFa: "پاپ‌کورن شکلاتی", description: "Belgian chocolate coat", descriptionFa: "با روکش شکلات بلژیکی", price: 170000, category: "Gourmet Popcorn", categoryFa: "پاپ‌کورن ویژه", image: poster("photo-1566478989037-eec170784d0b") },
  { id: "lemon-soda", name: "Yuzu Lemon Soda", nameFa: "نوشابه لیمو یوزو", description: "Sparkling citrus", descriptionFa: "مرکبات گازدار", price: 70000, category: "Craft Sodas", categoryFa: "نوشابه‌های خاص", image: poster("photo-1554866585-cd94860890b7") },
  { id: "cheese-nachos", name: "Triple Cheese Nachos", nameFa: "ناچو سه‌پنیر", description: "Three-cheese melt", descriptionFa: "ترکیب سه پنیر آب‌شده", price: 210000, category: "Nachos", categoryFa: "ناچو", image: poster("photo-1582169296194-e4d644c48063") },
  { id: "family-pack", name: "Family Pack", nameFa: "پک خانوادگی", description: "2 popcorns + 4 drinks + candy", descriptionFa: "۲ پاپ‌کورن + ۴ نوشیدنی + تنقلات", price: 650000, category: "Combos", categoryFa: "کمبوها", image: poster("photo-1489599849927-2ee91cede3ba") },
];

export const BOOKINGS: Booking[] = [
  {
    id: "CMX-88214", movieId: "dune-part-two", cinemaId: "grand-metropolis",
    showtimeId: "dune-part-two-grand-metropolis-2026-04-26-2010", seatIds: ["F7", "F8", "F9"],
    extras: [{ id: "classic-combo", name: "کمبو کلاسیک", price: 320000, quantity: 1 }],
    subtotal: 255000, discount: 25500, bookingFee: 15000, total: 569500, status: "active", createdAt: "2026-04-24",
  },
  {
    id: "CMX-87901", movieId: "oppenheimer", cinemaId: "starlight-downtown",
    showtimeId: "x", seatIds: ["D5", "D6"], extras: [], subtotal: 170000, discount: 0, bookingFee: 15000, total: 185000,
    status: "completed", createdAt: "2026-04-10",
  },
  {
    id: "CMX-87110", movieId: "neon-city", cinemaId: "aurora-mall",
    showtimeId: "x", seatIds: ["C3"], extras: [], subtotal: 85000, discount: 0, bookingFee: 15000, total: 100000,
    status: "completed", createdAt: "2026-03-29",
  },
  {
    id: "CMX-86900", movieId: "sky-cartel", cinemaId: "riverfront-drive",
    showtimeId: "x", seatIds: ["E1", "E2"], extras: [], subtotal: 170000, discount: 0, bookingFee: 15000, total: 185000,
    status: "cancelled", createdAt: "2026-03-12",
  },
  {
    id: "CMX-86002", movieId: "paper-moons", cinemaId: "palace-royale",
    showtimeId: "x", seatIds: ["A9"], extras: [], subtotal: 145000, discount: 0, bookingFee: 15000, total: 160000,
    status: "completed", createdAt: "2026-02-20",
  },
];
