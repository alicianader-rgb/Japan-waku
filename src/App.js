import React, { useEffect, useState } from "react";

// Centralised itinerary data and design tokens.

const GOLD="#B8924A",DARK="#2C2420",MID="#7A6E64",PALE="#F5F0E8";
const CARD="#FDFAF6",BORD="#E2DDD4",GRN="#4A7C59",RED="#C4412A";
const CAT_COLORS={sushi:"#FF2D78",fine:"#A855F7",casual:"#00C9A7",burger:"#FF6B2B",bar:"#FACC15",coffee:"#7C4A1E",vintage:"#FF85C2",craft:"#2563EB",art:"#22D3EE",temple:"#4ADE80",market:"#F43F5E",beauty:"#7DD3FC"};
const CAT_BG={sushi:"#FFF0F5",fine:"#FAF5FF",casual:"#F0FFFC",burger:"#FFF7F0",bar:"#FEFCE8",coffee:"#FDF6F0",vintage:"#FFF0F8",craft:"#EFF6FF",art:"#ECFEFF",temple:"#F0FFF4",market:"#FFF1F2",beauty:"#F0F9FF"};
const CAT_TEXT={sushi:"#8B0038",fine:"#5B21B6",casual:"#065F50",burger:"#7C2D12",bar:"#713F12",coffee:"#3B1A08",vintage:"#8B1A5A",craft:"#1D4ED8",art:"#164E63",temple:"#14532D",market:"#881337",beauty:"#0369A1"};
const TAG_STYLES={D:{bg:"#EDE8F5",color:"#5B3FA8",border:"#C4B4E8",label:"Dua Lipa"},NG:{bg:"#E4F2EE",color:"#1A7A65",border:"#9FD4C7",label:"Neighborhood Guide"},SV:{bg:"#E4EEF5",color:"#1A6080",border:"#9FC8D8",label:"Softer Volumes"},YOU:{bg:"#E8F2E8",color:"#2A6B3A",border:"#9FCC9F",label:"Your list"},OMAKASE:{bg:"#F5E8EE",color:"#8B2252",border:"#D4A0B8",label:"Omakase"},BOOK:{bg:"#FBF0EC",color:"#B03818",border:"#E8B8A4",label:"Book ahead"},ARTHUR:{bg:"#EAF0FA",color:"#2248A0",border:"#A4BCE8",label:"Arthur"},GROUP:{bg:"#FAF4E0",color:"#7A5C00",border:"#E0C860",label:"Group"},CUSTOM:{bg:"#FAF0E4",color:"#8A4A10",border:"#E0B880",label:"Added"}};
const WEATHER={"Nov 13":{icon:"🌤",lo:8,hi:14,note:"Cool, clear. First day."},"Nov 14":{icon:"🌤",lo:8,hi:14,note:"Good for east Tokyo."},"Nov 15":{icon:"🌥",lo:7,hi:13,note:"Shimokitazawa morning."},"Nov 16":{icon:"🌤",lo:7,hi:13,note:"Aoyama morning. Shinkansen to Kyoto 3–4pm."},"Nov 17":{icon:"🌤",lo:9,hi:15,note:"Perfect Fushimi Inari dawn."},"Nov 18":{icon:"⛅",lo:10,hi:16,note:"Hiroshima + Miyajima. Best weather for the torii."},"Nov 19":{icon:"🌤",lo:14,hi:18,note:"Kinkaku-ji morning → Naoshima afternoon."},"Nov 20":{icon:"🌤",lo:15,hi:19,note:"Chichu + Lee Ufan + Valley Gallery. Arrive Toky…"},"Nov 21":{icon:"🌥",lo:7,hi:12,note:"Tokyo cool. Neighbourhood day."},"Nov 22":{icon:"🌥",lo:7,hi:12,note:"Tokyo. Final dinner."},"Nov 23":{icon:"🌤",lo:6,hi:11,note:"Clear for departure."}};
const BOOKING=[
  {name:"Sumo stable training",when:"NOW",date:"Nov 14",urgency:"critical",how:"Magical Trip or Wabunka online"},
  {name:"JR Pass 14-day",when:"NOW — before Japan",date:"All",urgency:"critical",how:"jrpass.com — must buy outside Japan"},
  {name:"Suica on iPhone",when:"Before departure",date:"All",urgency:"critical",how:"Wallet → Add Card → Transit Card"},
  {name:"eSIM card",when:"Before departure",date:"All",urgency:"critical",how:"Holafly or Ubigi or Japan Experience"},
  {name:"Higashiazabu Amamoto",when:"July 1 · 1am London",date:"Nov 14",urgency:"critical",how:"Omakase app — be ready exactly on time"},
  {name:"Benesse House Naoshima",when:"NOW",date:"Nov 20",urgency:"critical",how:"benesse-artsite.jp — books months out"},
  {name:"Chichu Art Museum (timed entry)",when:"As soon as Benesse booked",date:"Nov 20",urgency:"critical",how:"chichu.jp — timed slots required"},
  {name:"Benfiddich",when:"Oct 19 · 1am London",date:"Nov 20/21/22",urgency:"critical",how:"TableCheck at benfiddich.tokyo — any Tokyo II night"},
  {name:"Pre-book taxi 5:45am → Haneda",when:"Night of Nov 22",date:"Nov 23",urgency:"critical",how:"Ask Yuen Bettei hotel"},
  {name:"Teshima Art Museum",when:"Aug–Sep 2026",date:"Nov 20",urgency:"high",how:"teshima-artmuseum.jp — timed slots"},
  {name:"Miyoshi Gion — wagyu kaiseki",when:"Aug–Sep 2026",date:"Nov 17/18",urgency:"high",how:"TableAll — DO NOT MISS"},
  {name:"Jambo Hanare",when:"Aug–Sep 2026",date:"Nov 15–16",urgency:"high",how:"TableAll + pre-order Chateaubriand"},
  {name:"Cignale Enoteca",when:"Aug–Sep 2026",date:"Nov 15–16",urgency:"high",how:"TableAll — Italian-Japanese omakase"},
  {name:"teamLab Borderless",when:"Aug–Sep 2026",date:"Nov 14",urgency:"high",how:"teamlab.art — timed entry"},
  {name:"Toyosu tuna auction",when:"First week of October",date:"Nov 14 5:45am",urgency:"high",how:"Toyosu Market website (English)"},
  {name:"Sushidokoro Yamato",when:"Sep–Oct midnight drop",date:"Nov 15",urgency:"high",how:"TableAll or OMAKASE app"},
  {name:"Art House Project tickets",when:"On Naoshima arrival",date:"Nov 20",urgency:"high",how:"Honmura Lounge on island"},
  {name:"Gen Yamamoto",when:"1 month before (Oct)",date:"Nov 22",urgency:"medium",how:"Email office@genyamamoto.jp 30 days out"},
  {name:"Shugakuin Imperial Villa",when:"August 2026",date:"Nov 17/18",urgency:"medium",how:"kyoto-gosho.kunaicho.go.jp"},
  {name:"WIFE & HUSBAND Kyoto",when:"1 week before",date:"Nov 17/18",urgency:"medium",how:"075-201-7324"},
  {name:"Setomae Sushi Nagi — Naoshima",when:"ASAP — small counter",date:"Nov 19",urgency:"critical",how:"Book direct or via concierge at Benesse House on arrival"},
];
const PLACES=[
  {name:"Higashiazabu Amamoto",city:"Tokyo",cat:"sushi",meal:"dinner",note:"The dinner of the trip. Book July 1."},
  {name:"Sushi Kojima",city:"Tokyo",cat:"sushi",meal:"dinner",note:"Your favourite of the five. 1 Michelin star."},
  {name:"Sushidokoro Yamato",city:"Tokyo",cat:"sushi",meal:"dinner",note:"The impossible one. Midnight slot release."},
  {name:"Matoi Ginza",city:"Tokyo",cat:"fine",meal:"dinner",note:"Wagyu kappo omakase. Near Edition."},
  {name:"Cignale Enoteca",city:"Tokyo",cat:"fine",meal:"dinner",note:"Italian-Japanese omakase. Your top 3."},
  {name:"Jambo Hanare",city:"Tokyo",cat:"fine",meal:"dinner",note:"Best yakiniku. A5 wagyu. TableAll."},
  {name:"Tempura Kondo",city:"Tokyo",cat:"fine",meal:"both",note:"2 Michelin stars. Lunch from 9,900 yen."},
  {name:"Moonflower Sagaya",city:"Tokyo",cat:"fine",meal:"dinner",note:"AI art dining. Book 2 months out."},
  {name:"Pigneto Four Seasons",city:"Tokyo",cat:"fine",meal:"dinner",note:"Italian. Terrace, Imperial Palace views."},
  {name:"Miyoshi Gion",city:"Kyoto",cat:"fine",meal:"dinner",note:"DO NOT MISS. Wagyu kaiseki. OAD #23 Japan."},
  {name:"Nakamura Kyoto",city:"Kyoto",cat:"fine",meal:"dinner",note:"Same family since 1716. Via Sowaka concierge."},
  {name:"Kikunoi Honten",city:"Kyoto",cat:"fine",meal:"dinner",note:"3 Michelin stars. Only do one kaiseki."},
  {name:"Narukiyo",city:"Tokyo",cat:"casual",meal:"dinner",note:"No menu, chef decides. Cash only. Dua."},
  {name:"Ahiru Store",city:"Tokyo",cat:"casual",meal:"dinner",note:"Natural wine bar. NG essential."},
  {name:"Ichiran Ramen",city:"Tokyo",cat:"casual",meal:"both",note:"Solo booth ramen experience. Tonkotsu."},
  {name:"Shima Kitchen",city:"Teshima",cat:"casual",meal:"lunch",note:"Farm-to-table. Lunch only. No reservations."},
  {name:"Henry's Burger",city:"Tokyo",cat:"burger",meal:"lunch",note:"100% Kuroge wagyu. Pre-order harami slab."},
  {name:"Savoy Pizza",city:"Tokyo",cat:"burger",meal:"both",note:"Reference Neapolitan since 1995."},
  {name:"Pizza Bar on the 38th",city:"Tokyo",cat:"burger",meal:"lunch",note:"6-piece pizza omakase. Book 2 months out."},
  {name:"Benfiddich",city:"Tokyo",cat:"bar",meal:"bar",note:"Oct 19 1am London. No menu. World's 50 Best."},
  {name:"Bar Martha Ebisu",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. 1970s Tannoy. Jazz, hard bop. No photos."},
  {name:"Bar Track Tokyo",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. Vinyl, analog system. World's 50 Best."},
  {name:"Gen Yamamoto",city:"Tokyo",cat:"bar",meal:"bar",note:"4-glass omakase cocktail. Book 1 month out."},
  {name:"Virtù Four Seasons",city:"Tokyo",cat:"bar",meal:"bar",note:"NG. 39th floor. Asia's 50 Best Bars."},
  {name:"Golden Gai Shinjuku",city:"Tokyo",cat:"bar",meal:"bar",note:"200+ micro-bars. Friday night is best."},
  {name:"Bee's Knees Kyoto",city:"Kyoto",cat:"bar",meal:"bar",note:"NG + SV. Yellow door. Art Deco speakeasy."},
  {name:"Hachimonjiya Kyoto",city:"Kyoto",cat:"bar",meal:"bar",note:"Kai Fusayoshi's bar. 50 years of photography."},
  {name:"Music Bar 1G",city:"Kyoto",cat:"bar",meal:"bar",note:"Fridge door entrance. Underground Kyoto."},
  {name:"Jazz Spot Yamatoya",city:"Kyoto",cat:"bar",meal:"bar",note:"SV. Since 1958. Basement Kiyamachi."},
  {name:"Fuglen Tokyo",city:"Tokyo",cat:"coffee",meal:"coffee",note:"SV. Norwegian coffee. 1960s mid-century."},
  {name:"The Matcha Tokyo",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Ceremonial matcha, wagashi. Omotesando."},
  {name:"Sidewalk Coffee",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Opens early. Bagels. Shimokitazawa."},
  {name:"WIFE & HUSBAND Kyoto",city:"Kyoto",cat:"coffee",meal:"coffee",note:"Real couple. Pour-over. Phone reservation."},
  {name:"Vintage QOO Omotesando",city:"Tokyo",cat:"vintage",meal:"shop",note:"6,000 items. Chanel B1F. 11:30-20h."},
  {name:"Casanova Vintage Tokyo",city:"Tokyo",cat:"vintage",meal:"shop",note:"Archive luxury. Chanel, Hermes, LV. Vogue."},
  {name:"KOMEHYO VINTAGE TOKYO",city:"Tokyo",cat:"vintage",meal:"shop",note:"AI-authenticated. Tax-free. Two locations."},
  {name:"Paradise Vintage Tokyo",city:"Tokyo",cat:"vintage",meal:"shop",note:"Pristine condition. Hermes, Chanel, Dior."},
  {name:"Kaikado Kyoto",city:"Kyoto",cat:"craft",meal:"shop",note:"Tea caddies since 1875. 130 steps by hand."},
  {name:"Aritsugu Kyoto",city:"Kyoto",cat:"craft",meal:"shop",note:"Knives since 1560. Name engraved. Nishiki."},
  {name:"Kamiji Kakimoto Kyoto",city:"Kyoto",cat:"craft",meal:"shop",note:"Finest washi paper shop. Teramachi-dori."},
  {name:"Traditional Crafts Aoyama Square",city:"Tokyo",cat:"craft",meal:"shop",note:"100+ craft types. 3-min from Aoyama-Itchome."},
  {name:"Bingoya Tokyo",city:"Tokyo",cat:"craft",meal:"shop",note:"Five-floor Mingei folk craft. Shinjuku."},
  {name:"21_21 Design Sight",city:"Tokyo",cat:"art",meal:"visit",note:"Tadao Ando + Issey Miyake."},
  {name:"Mori Art Museum",city:"Tokyo",cat:"art",meal:"visit",note:"53rd floor Roppongi. Check November show."},
  {name:"Nezu Museum",city:"Tokyo",cat:"art",meal:"visit",note:"Kengo Kuma. 7 National Treasures. Nov maple."},
  {name:"Chichu Art Museum",city:"Naoshima",cat:"art",meal:"visit",note:"Underground Ando. 5 Monets in natural light."},
  {name:"Valley Gallery",city:"Naoshima",cat:"art",meal:"visit",note:"Yoshitomo Nara. Oval concrete. Silent."},
  {name:"Lee Ufan Museum",city:"Naoshima",cat:"art",meal:"visit",note:"Ando + Lee Ufan minimal mark-making."},
  {name:"Benesse House Museum",city:"Naoshima",cat:"art",meal:"visit",note:"Sleep inside the art collection."},
  {name:"Art House Project",city:"Naoshima",cat:"art",meal:"visit",note:"Turrell, Sugimoto. Buy tickets at Honmura Lounge."},
  {name:"Teshima Art Museum",city:"Teshima",cat:"art",meal:"visit",note:"Water beads from floor. Book in advance."},
  {name:"Les Archives du Coeur",city:"Teshima",cat:"art",meal:"visit",note:"Boltanski. 90,000 heartbeats archived."},
  {name:"ZENBI Kagizen Museum",city:"Kyoto",cat:"art",meal:"visit",note:"Mingei ceramics. Kawai Kanjiro legacy."},
  {name:"Fushimi Inari Taisha",city:"Kyoto",cat:"temple",meal:"visit",note:"6:30am. Climb to top. Sake at summit."},
  {name:"Arashiyama Bamboo Grove",city:"Kyoto",cat:"temple",meal:"visit",note:"Before 9am. Empty gates, mist."},
  {name:"Kinkaku-ji",city:"Kyoto",cat:"temple",meal:"visit",note:"9am. Gold leaf + November maple."},
  {name:"Hamarikyu Gardens",city:"Tokyo",cat:"temple",meal:"visit",note:"5-min walk from Edition. November maples."},
  {name:"Gotokuji Temple",city:"Tokyo",cat:"temple",meal:"visit",note:"Lucky cat birthplace. Free. Near Yuen Bettei."},
  {name:"Meiji Jingu",city:"Tokyo",cat:"temple",meal:"visit",note:"November maple. Your favourite Tokyo temple."},
  {name:"Itsukushima Shrine",city:"Miyajima",cat:"temple",meal:"visit",note:"Floating torii. JR ferry covered by JR Pass."},
  {name:"Tsukiji Outer Market",city:"Tokyo",cat:"market",meal:"lunch",note:"First morning. Tamagoyaki, tuna nigiri."},
  {name:"Azabudai Hills Market",city:"Tokyo",cat:"market",meal:"both",note:"4,000 sqm underground. Same as teamLab."},
  {name:"Nishiki Market Kyoto",city:"Kyoto",cat:"market",meal:"both",note:"Pickles, miso, matcha, fresh yuba."},
  {name:"Matsumoto Kiyoshi Shibuya",city:"Tokyo",cat:"beauty",meal:"shop",note:"Japan's biggest drugstore chain. Hada Labo, DHC…"},
  {name:"Isetan Shinjuku — beauty floor",city:"Tokyo",cat:"beauty",meal:"shop",note:"Best department store beauty floor in Tokyo. De…"},
  {name:"Don Quijote Shibuya",city:"Tokyo",cat:"beauty",meal:"shop",note:"Open until 5am. Kit Kats, Pocky, Calbee snacks,…"},
  {name:"MEGA Don Quijote Shibuya",city:"Tokyo",cat:"beauty",meal:"shop",note:"24-hour beauty, snacks and gift chaos. Use eith…"},
  {name:"New York Joe Exchange — Shimokitazawa",city:"Tokyo",cat:"vintage",meal:"shop",note:"Treasure-hunt vintage in a converted bathhouse.…"},
  {name:"BIG TIME Shimokitazawa",city:"Tokyo",cat:"vintage",meal:"shop",note:"Large second-hand store with Americana, denim, …"},
  {name:"AULD LANG SUN — Shimokitazawa",city:"Tokyo",cat:"vintage",meal:"shop",note:"More curated vintage stop. Good if you want qua…"},
  {name:"Sui Vintage Shimokitazawa",city:"Tokyo",cat:"vintage",meal:"shop",note:"Small, curated vintage with softer styling and …"},
  {name:"Disk Union Shimokitazawa",city:"Tokyo",cat:"bar",meal:"shop",note:"Essential record store for vinyl digging: rock,…"},
  {name:"JET SET Shimokitazawa",city:"Tokyo",cat:"bar",meal:"shop",note:"Record store with electronic, hip-hop, indie an…"},
  {name:"Jazzy Sport Shimokitazawa",city:"Tokyo",cat:"bar",meal:"shop",note:"Jazz, soul, hip-hop and beat records. Best if A…"},
  {name:"@cosme Tokyo Harajuku",city:"Tokyo",cat:"beauty",meal:"shop",note:"Japan's biggest beauty review site has a flagsh…"},
  {name:"LOFT Shibuya",city:"Tokyo",cat:"beauty",meal:"shop",note:"Six floors of stationery, beauty, lifestyle. Be…"},
  {name:"Sundrug or Welcia",city:"Tokyo",cat:"beauty",meal:"shop",note:"Cheaper than Matsumoto Kiyoshi. Best for bulk H…"},
  {name:"Kiehl's Japan exclusives",city:"Tokyo",cat:"beauty",meal:"shop",note:"Japan has exclusive formulas and sets not avail…"},
  {name:"Three Aoyama",city:"Tokyo",cat:"beauty",meal:"shop",note:"Japanese organic beauty brand. Minimalist Aoyam…"},
  {name:"Decorte AQ Skincare",city:"Tokyo",cat:"beauty",meal:"shop",note:"Japan's quiet luxury skincare. Counter at Iseta…"},
  {name:"Whitmoor Pharmacy Roppongi",city:"Tokyo",cat:"beauty",meal:"shop",note:"English-speaking staff. Good for Western prescr…"},
  {name:"Setomae Sushi Nagi",city:"Naoshima",cat:"sushi",meal:"dinner",note:"The island's best sushi. Freshest Seto Inland S…"},
  {name:"Benizuru Pancakes — Nishiasakusa",city:"Tokyo",cat:"coffee",meal:"both",note:"Rice flour souffle pancakes. Bacon and egg holl…"},
  {name:"Kamachiku Udon — Nezu",city:"Tokyo",cat:"casual",meal:"lunch",note:"Most beautiful udon restaurant in Tokyo. 100-ye…"},
  {name:"Ebisu Yokocho",city:"Tokyo",cat:"bar",meal:"bar",note:"20 izakayas in a covered Showa alley. Yakitori,…"},
  {name:"Iyoshi Cola",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Japanese craft cola. Ginger-forward, complex, m…"},
  {name:"Pizza Marumo",city:"Tokyo",cat:"burger",meal:"lunch",note:"Highly rated Neapolitan pizza. Excellent but do…"},
  {name:"Studio Mule",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. Natural wine + vinyl on Klipsch Cornwall + …"},
  {name:"Epulor — Nakameguro",city:"Tokyo",cat:"coffee",meal:"coffee",note:"SV. Specialty coffee + natural wine. DJ plays j…"},
  {name:"Little Soul Café",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. 14,000+ vinyl records. Soul and jazz. Deep …"},
  {name:"Musium",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. Roppongi. Newer vinyl listening bar. Audiop…"},
  {name:"King Biscuit",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. Tokyo vinyl listening bar. Soul and blues f…"},
  {name:"Record Bar 33 1/3RPM",city:"Tokyo",cat:"bar",meal:"bar",note:"SV. Tokyo vinyl bar named after the LP speed. C…"},
  {name:"Simose Art Museum",city:"Hiroshima",cat:"art",meal:"visit",note:"Shigeru Ban. 2024 Prix Versailles World's Most …"},
  {name:"Ikuchijima — Setoda",city:"Hiroshima",cat:"art",meal:"visit",note:"Lemon island. Kosanji Temple, Shimanami Kaido c…"},
  {name:"Hario Café — Ishibei-koji",city:"Kyoto",cat:"coffee",meal:"coffee",note:"Opened July 2024 on the most beautiful lane in …"},
  {name:"APFR Kyoto — Apotheke Fragrance",city:"Kyoto",cat:"craft",meal:"shop",note:"Japanese fragrance brand. 120-year townhouse on…"},
  {name:"Kyo Amahare",city:"Kyoto",cat:"craft",meal:"shop",note:"Curated ceramics and housewares. Tea room frame…"},
  {name:"POJ Studio",city:"Kyoto",cat:"craft",meal:"shop",note:"Pieces of Japan. 100-year restored machiya. Ind…"},
  {name:"Lisn Kyoto",city:"Kyoto",cat:"craft",meal:"shop",note:"Modern incense brand by Shoyeido (since 1705). …"},
  {name:"Taiga Takahashi — Gion",city:"Kyoto",cat:"craft",meal:"shop",note:"Kyoto menswear in Gion. Workwear-inspired, natu…"},
  {name:"YamaDA MPD",city:"Kyoto",cat:"craft",meal:"shop",note:"Kyoto multi-purpose design store. Known in Japa…"},
  {name:"Bar Cavalier",city:"Kyoto",cat:"bar",meal:"bar",note:"Well-regarded Kyoto cocktail bar. European-infl…"},
  // ── TOKYO FOOD ──
  {name:"Benitsuru Pancake — Asakusa",city:"Tokyo",cat:"coffee",meal:"both",note:"Rice flour soufflé pancakes. Bacon & egg hollan…",tags:[]},
  {name:"Kamachiku Udon — Nezu",city:"Tokyo",cat:"casual",meal:"both",note:"Michelin Bib Gourmand. 100-year stone warehouse…",tags:[]},
  {name:"Pizza Marumo — Ebisu",city:"Tokyo",cat:"burger",meal:"both",note:"Top 10 pizzeria in the world (Best Chef Awards )…",tags:["BOOK"]},
  {name:"Ebisu Yokocho",city:"Tokyo",cat:"bar",meal:"bar",note:"Covered alleyway of 20 izakayas. Yakitori, oden…",tags:[]},
  // ── TOKYO LISTENING BARS ──
  {name:"Studio Mule — Shibuya",city:"Tokyo",cat:"bar",meal:"bar",note:"Owner Toshiya Kawasaki (Mule Musiq label). 1,00…",tags:["SV"]},
  {name:"Musium — Roppongi",city:"Tokyo",cat:"bar",meal:"bar",note:"100,000+ records in a safe-like industrial vaul…",tags:[]},
  {name:"Record Bar 33⅓RPM — Shibuya",city:"Tokyo",cat:"bar",meal:"bar",note:"6,000-piece rock + pop vinyl collection (UK/US)…",tags:["SV"]},
  {name:"Little Soul Café — Shimokitazawa",city:"Tokyo",cat:"bar",meal:"bar",note:"14,000+ records. Black music obsessive owner. N…",tags:["SV"]},
  {name:"Epulor — Nakameguro",city:"Tokyo",cat:"bar",meal:"bar",note:"Natural wine and vinyl. Good quality, continent…",tags:["SV"]},
  {name:"Bar Record — Shimokitazawa",city:"Tokyo",cat:"bar",meal:"bar",note:"Vinyl listening bar in Shimokitazawa. Intimate,…",tags:["SV"]},
  {name:"King Biscuit — Shimokitazawa",city:"Tokyo",cat:"bar",meal:"bar",note:"Blues and soul listening bar, Shimokitazawa. Cu…",tags:[]},
  {name:"Spin Coaster — Tokyo",city:"Tokyo",cat:"bar",meal:"bar",note:"Vinyl listening bar. Good sound system, curated…",tags:[]},
  // ── TOKYO COFFEE ──
  {name:"Glitch Coffee — Ginza",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Top-of-top specialty single origin light roasts…",tags:[]},
  {name:"Bongen — Nihonbashi",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Noh theatre-inspired interiors in burnt cedar. …",tags:[]},
  {name:"Onibus Coffee — Nakameguro",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Paul Bassett alumni. Strong specialty coffee. N…",tags:["NG"]},
  {name:"Beasty Coffee — Shimokitazawa",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Quality roaster with strong local following in …",tags:[]},
  {name:"Acid Coffee — Tokyo",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Specialty pour-over. Complex acidic light roast…",tags:[]},
  {name:"Ogawa Coffee Laboratory — Shimokitazawa",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Kyoto's Ogawa Coffee brand new concept — differ…",tags:[]},
  // ── KYOTO CRAFT + SCENT ──
  {name:"APFR Kyoto — Teramachi",city:"Kyoto",cat:"craft",meal:"shop",note:"Apotheke Fragrance flagship in a 120-year Kyoto…",tags:[]},
  {name:"Lisn Kyoto — COCON Karasuma",city:"Kyoto",cat:"craft",meal:"shop",note:"Shoyeido's modern incense brand. 150+ scents. B…",tags:[]},
  {name:"Taiga Takahashi — Gion",city:"Kyoto",cat:"vintage",meal:"shop",note:"Back alley off Hanamikoji. Part store, part gal…",tags:["NG"]},
  {name:"POJ Studio — Kyoto",city:"Kyoto",cat:"craft",meal:"shop",note:"Curated, thoughtful design objects and souvenir…",tags:[]},
  {name:"YamaDA MPD — Tokyo",city:"Tokyo",cat:"vintage",meal:"shop",note:"Tokyo-based menswear. Curated vintage and conte…",tags:[]},
  // ── KYOTO COFFEE + TEA ──
  {name:"Hario Café Kyoto — Higashiyama",city:"Kyoto",cat:"coffee",meal:"coffee",note:"Glassware brand's flagship café in a historic b…",tags:[]},
  {name:"[ki:] Café Kyoto",city:"Kyoto",cat:"coffee",meal:"coffee",note:"Design-forward specialty coffee space. Precisio…",tags:[]},
  {name:"Kyo Amahare (Sabo Kyo) — Sanjo-Karasuma",city:"Kyoto",cat:"coffee",meal:"coffee",note:"Contemporary Japanese tea salon in a machiya wa…",tags:["BOOK"]},
  // ── HIROSHIMA ──
  {name:"Simose Art Museum — Otake",city:"Hiroshima",cat:"art",meal:"visit",note:"World's Most Beautiful Museum 2024 (Prix Versai)…",tags:[]},

  {name:"Iyoshi Cola — various locations",city:"Tokyo",cat:"coffee",meal:"coffee",note:"Japanese craft cola. Complex, spiced, slightly …",tags:[]},
  // ── TOKYO YAKITORI ──
  {name:"Torishiki — Meguro",city:"Tokyo",cat:"fine",meal:"dinner",note:"The legend. Michelin star since 2010. 12 seats.…",tags:["OMAKASE","BOOK"]},
  {name:"Eiki — Ebisu",city:"Tokyo",cat:"fine",meal:"dinner",note:"Best Torishiki apprentice. Same Date chicken, s…",tags:["OMAKASE"]},
  {name:"Torisho Ishii Hina — Azabu-Juban",city:"Tokyo",cat:"fine",meal:"dinner",note:"Tokyo branch of Osaka 1-star Torisho Ishii. Kai…",tags:["OMAKASE","BOOK","YOU"]},
  {name:"Tori Chataro — Shibuya",city:"Tokyo",cat:"fine",meal:"dinner",note:"Hina-jidori from Akita, Kasumi duck from Kyushu…",tags:["OMAKASE","BOOK"]},
  {name:"Ginza Torishige — Ginza",city:"Tokyo",cat:"casual",meal:"dinner",note:"Since 1931. Third generation. 120 seats. Prix-f…",tags:[]},
  {name:"Toriyoshi — Nakameguro",city:"Tokyo",cat:"casual",meal:"dinner",note:"Walk-ins only. Founder Inomata trained Torishik…",tags:[]},
  {name:"Trunk (Kushi) — Shibuya Cat Street",city:"Tokyo",cat:"casual",meal:"dinner",note:"Casual yakitori at Trunk Hotel. Paper lanterns,…",tags:[]},
  {name:"Ukai Toriyama — Mt Takao",city:"Tokyo",cat:"fine",meal:"both",note:"55 min Keio Line from Shinjuku + 10 min free sh…",tags:["BOOK"]},
  {name:"Café Accueil Ebisu",city:"Tokyo",cat:"coffee",meal:"both",note:"The right pancake. Between Daikanyama and Ebisu…",tags:[]},

  // ── NEW ADDITIONS ──
  // Tokyo food
  {name:"Ozaki Azabujuban — おざき",city:"Tokyo",cat:"sushi",meal:"dinner",note:"Michelin-starred 9 consecutive years. Kappo-style omakase, 20 courses ~30,000 yen. Small counter + private room. Azabu-Juban. Bookable via Tabelog.",tags:[]},
  {name:"Los Tacos Azules",city:"Tokyo",cat:"casual",meal:"both",note:"Tokyo's best taco. Shibuya. Trust the recommendation.",tags:[]},
  {name:"Sushi Shin",city:"Tokyo",cat:"sushi",meal:"dinner",note:"Omakase sushi, Higashiazabu. Intimate counter, very good. Book ahead.",tags:["BOOK"]},
  {name:"Higashiya — Aoyama",city:"Tokyo",cat:"coffee",meal:"both",note:"Japanese wagashi and tea. Aoyama flagship. Very considered, quiet luxury register. Fits the Nov 16 morning circuit perfectly.",tags:[]},
  {name:"Kakimori — Kuramae",city:"Tokyo",cat:"craft",meal:"shop",note:"Custom notebooks and ink. Japanese stationery at its best. Kuramae, near Asakusa. Nov 14 area.",tags:[]},
  {name:"Koganeyu sauna — Kinshicho",city:"Tokyo",cat:"bar",meal:"bar",note:"90-year sento renovated 2021. Tattoo-friendly. Craft beer bar, in-house DJ curating vinyl. Top 5 sauna in Tokyo. Online reservation recommended. Near Tokyo Skytree.",tags:[]},
  {name:"The SG Club — Shibuya",city:"Tokyo",cat:"bar",meal:"bar",note:"Best bar in Japan 2020-21. #23 Asia's 50 Best Bars 2024, ninth consecutive year on the list. Ground floor Guzzle (casual) + basement Sip (speakeasy). Shibuya Jinnan.",tags:[]},
  {name:"Bar Trench — Ebisu",city:"Tokyo",cat:"bar",meal:"bar",note:"Classic Tokyo bar. Absinthe specialist, bitter cocktails, very considered and dark. Ebisu, near Bar Martha.",tags:[]},
  {name:"Visvim GYRE — Omotesando",city:"Tokyo",cat:"vintage",meal:"shop",note:"Cult Japanese brand flagship in GYRE building on Omotesando. Heritage-inspired apparel and footwear. Little Cloud Coffee terrace on site. Nov 16 Aoyama circuit.",tags:[]},
  {name:"WMV Visvim — Nakameguro",city:"Tokyo",cat:"vintage",meal:"shop",note:"Women's Visvim flagship on the Meguro River. 1970s home converted with earthen walls, timber beams, Japanese garden. Nov 21 canal walk.",tags:[]},
  {name:"Real McCoy's — Harajuku",city:"Tokyo",cat:"vintage",meal:"shop",note:"The original. Japanese reproduction workwear, denim, leather, heritage Americana. Harajuku. The Kobe suit equivalent.",tags:[]},
  {name:"Minimal Bean to Bar — Azabudai",city:"Tokyo",cat:"coffee",meal:"both",note:"Tokyo's best single-origin chocolate. 5-min walk from teamLab Borderless in Azabudai Hills. Do both on the same visit.",tags:[]},
  // Kyoto food
  {name:"Monk — Philosopher's Path",city:"Kyoto",cat:"fine",meal:"dinner",note:"Chef's Table: Pizza on Netflix. Chef Imai, wood-fired oven, 8-course omakase ending in pizza. Seasonal veg from Ohara. 14 guests. Tue-Fri only. Book exactly 2 months out via Resy.",tags:["BOOK","OMAKASE"]},
  {name:"Farmoon — Kitashirakawa",city:"Kyoto",cat:"fine",meal:"dinner",note:"Chef Masayo Funakoshi. Converted machiya near Ginkaku-ji. By night: ichigen-san okotowari — introduction required. Your friend can text her directly. Seasonal omakase, natural wine.",tags:["OMAKASE"]},
  {name:"Sushi Wakon — Kyoto",city:"Kyoto",cat:"sushi",meal:"dinner",note:"Michelin 1-star 2024. Blends Edomae Tokyo-style with Kyoto-style sushi (mackerel, steamed). Chef trained in Switzerland, selects Swiss wines. Unusual and excellent.",tags:["OMAKASE","BOOK"]},
  // Kyoto temples
  {name:"Kokedera Moss Temple (Saihoji)",city:"Kyoto",cat:"temple",meal:"visit",note:"UNESCO World Heritage. 120 varieties of moss. Starts with sutra copying ceremony. Book exactly 2 months out at saihoji-kokedera.com — ¥4,000 per person, max 2 people. Near Arashiyama. November peak season — book Sept 13 for Nov 13 onwards.",tags:["BOOK"]},
  {name:"Katsura Imperial Villa",city:"Kyoto",cat:"temple",meal:"visit",note:"Built same era as Versailles. One of Japan's most refined architectural achievements. Reservation required via Imperial Household Agency (kunaicho.go.jp). Limited slots.",tags:["BOOK"]},
  // ── Aoyama block additions ──
  {name:"pejite 青山 — ceramics",city:"Tokyo",cat:"craft",meal:"shop",note:"Handpicked Mashiko-ware ceramics in a quiet Minami-Aoyama alley. Everything handmade, staff gives artist notes with purchase. 5-chome, 2-min from Nezu Museum.",tags:[]},
  {name:"Issey Miyake — Omotesando",city:"Tokyo",cat:"vintage",meal:"shop",note:"Flagship on the Omotesando boulevard. Same stretch as Prada and Nezu Museum. Architecture as bold as the clothes.",tags:[]},
  {name:"Prada Aoyama",city:"Tokyo",cat:"vintage",meal:"shop",note:"Herzog & de Meuron glass building on Omotesando. Worth seeing as architecture alone. Same boulevard as Issey Miyake.",tags:[]},
  // Tsukiji
  {name:"Tsukiji Fish Burger MASA",city:"Tokyo",cat:"casual",meal:"both",note:"The hidden one. Fish wholesaler by morning, burger spot 10am–5pm. Tucked in a narrow covered alley off the main market. Cod burger with panko crust + homemade ginger ale. Owner-chef inspired by New York. Genuinely low-key and excellent.",tags:[]},
  {name:"Tsukiji Wine Kitchen",city:"Tokyo",cat:"bar",meal:"dinner",note:"Wine bar in the Tsukiji outer market. Natural wine, small plates, market produce. Good for a glass after the morning market visit.",tags:[]},
];
const PACKING=[
  {cat:"Documents & money",items:["Passport (valid 6+ months beyond Nov 2026)","JR Pass 14-day — must buy before Japan","Hotel confirmations (Edition Ginza, Sowaka Kyoto, Benesse House, Yuen Bettei)","Cash 100,000 yen+ — Japan is heavily cash","Suica on iPhone loaded 10,000 yen","eSIM activated before departure"]},
  {cat:"Clothing — Tokyo 8-14C",items:["Warm coat","3x everyday outfits — layers","1x smarter outfit for Amamoto, Benfiddich","Comfortable walking shoes — 15,000+ steps daily","Warm scarf + light gloves"]},
  {cat:"Japan essentials",items:["Pocket handkerchief — Japan has no paper towels","Small day bag for packages","Slip-on shoes — shoes off constantly at temples","Earplugs — useful in temples and ryokan"]},
  {cat:"Beauty & pharmacy",items:["Sunscreen face","Lip balm — indoor heating very dry","Hand cream","Blister plasters — 15,000+ steps daily","Paracetamol, antihistamine, antidiarrhoeal"]},
  {cat:"Tech",items:["Type A adapter — Japan flat two-pin","Portable battery / power bank","Camera + SD cards + charger","Download Google Maps offline: Tokyo, Kyoto, Hiroshima","Download Travel Japan app"]},
];
const CATS=[{id:"all",label:"All"},{id:"sushi",label:"Sushi"},{id:"fine",label:"Fine dining"},{id:"casual",label:"Casual"},{id:"burger",label:"Burger & pizza"},{id:"bar",label:"Bars"},{id:"coffee",label:"Coffee"},{id:"vintage",label:"Vintage"},{id:"craft",label:"Craft"},{id:"art",label:"Art"},{id:"temple",label:"Temples"},{id:"market",label:"Markets"},{id:"beauty",label:"💄 Beauty"}];
const DAYS=[
  {date:"Nov 13",title:"Arrive · Arthur's Birthday 🎂",hotel:"Edition Ginza",
   fixed:[
     {id:"f1a",time:"Morning",name:"Tsukiji Outer Market",note:"First meal in Japan. Tamagoyaki, tuna nigiri, Daruma coffee. Hidden gem: Fish Burger MASA (narrow covered alley inside market, cod panko burger + homemade ginger ale, open from 10am). Tsukiji Wine Kitchen for a glass after.",tags:[]},
     {id:"f1b",time:"Midday",name:"Hamarikyu Gardens",note:"5-min walk from Edition. Tidal pond, November maples.",tags:[]},
     {id:"f1c",time:"Afternoon",name:"Imperial Palace East Gardens",note:"November maples, no tourists. Free.",tags:[]},
   ],
   choices:[
     {label:"Lunch — first meal in Japan",pick:1,options:[
       {id:"l1a",name:"Sushi Dai — Tsukiji",note:"Original market sushi counter. Queue early.",tags:[]},
       {id:"l1b",name:"Yama Yama — Tsukiji",note:"Thick egg tamago sando, fresh tuna bowl.",tags:[]},
       {id:"l1c",name:"Fuunji ramen — Shinjuku",note:"Tsukemen dipping ramen. Japan's best. 15-min queue.",tags:[]},
       {id:"l1d",name:"Skip lunch — too jet-lagged",note:"Arrive 6:50am. Body says no.",tags:[]},
     ]},
     {label:"Tonight — group of 6 or couple?",pick:1,options:[
       {id:"s1a",name:"Group of 6 🎉",note:"Pick a group dinner below.",tags:["GROUP"]},
       {id:"s1b",name:"Just the two of you 🥂",note:"Pick a couple dinner below.",tags:["ARTHUR"]},
     ]},
     {label:"Birthday dinner — GROUP of 6",pick:1,options:[
       
       {id:"g1b",name:"Narukiyo — Shibuya",note:"No menu, chef decides for everyone. Cash only. Provocative art room. Dua's obsession.",tags:["D","GROUP"]},
       
       
       
       {id:"g1f",name:"Kagurazaka Ishikawa — kaiseki for 6",note:"2 Michelin stars. Private tatami room. Book months out.",tags:["GROUP","BOOK"]},
       {id:"g1g",name:"Warayaki Gyuu — straw-fire beef, Ginza",note:"Wagyu seared tableside over burning straw. Theatrical and delicious.",tags:["GROUP"]},
       {id:"g1h",name:"Ginza Torishige — since 1931",note:"Third generation yakitori, 120 seats, prix-fixe from 7,100 yen. Signature dry curry finale. Great group option.",tags:["GROUP"]},
     ]},
     {label:"Birthday dinner — COUPLE (intimate)",pick:1,options:[
       
       {id:"c1b",name:"L'Effervescence — Nishi-Azabu",note:"3 Michelin stars. Most romantic high-end dinner in Tokyo. Book 2-3 months out.",tags:["BOOK","ARTHUR"]},
       {id:"c1c",name:"Ryugin — Roppongi",note:"3 Michelin stars. Precise Japanese kaiseki. Intimate and thoughtful.",tags:["BOOK","ARTHUR"]},
       {id:"c1d",name:"Jade Room, Edition",note:"In-hotel. No navigation after 12-hour flight. Good food, beautiful room.",tags:["ARTHUR"]},
       {id:"c1e",name:"Pigneto — Four Seasons Otemachi",note:"Italian terrace, Imperial Palace views. Virtù cocktails on 39th floor after.",tags:["YOU","ARTHUR"]},
     ]},
     {label:"Birthday activity",pick:1,options:[
       {id:"b1a",name:"Shibuya Sky — rooftop at sunset",note:"Open-air rooftop 229m up. Tokyo at golden hour with the crossing below. Book timed entry.",tags:["ARTHUR"]},
       {id:"b1b",name:"teamLab Planets — immersive art",note:"Walk through knee-deep water into infinite mirror spaces. Magical for a group or couple. Book ahead.",tags:["GROUP","BOOK","ARTHUR"]},
       {id:"b1c",name:"Karaoke — Shidax or Big Echo",note:"Private room, all-you-can-drink, tambourines. Quintessential Tokyo group night.",tags:["GROUP"]},
       
       {id:"b1e",name:"Skip — dinner and bed",note:"12-hour flight. A great dinner is enough.",tags:[]},
     ]},
     {label:"After dinner",pick:1,options:[
       {id:"a1a",name:"Golden Gai — Shinjuku",note:"200+ micro-bars, 5-8 seats each. Friday night is peak. The whole group fits.",tags:[]},
       {id:"a1a2",name:"Ebisu Yokocho",note:"Covered alleyway of 20 izakayas. Less touristy than Golden Gai. 2-min from Ebisu Station. Good second option.",tags:[]},
       {id:"a1b",name:"Bar Martha — couple",note:"SV. 1970s Tannoy, jazz, hard bop. No photos. The right end to a birthday night.",tags:["SV","ARTHUR"]},
       {id:"a1c",name:"Early night",note:"12-hour flight. Sometimes bed is the move.",tags:[]},
     ]},
   ]},
  {date:"Nov 14",title:"Sumo stable → Amamoto",hotel:"Edition Ginza",
   fixed:[
     {id:"f2a",time:"7:30am",name:"Sumo stable — Ryogoku",note:"Ringside training. Book via Magical Trip or Wabunka.",tags:["BOOK"]},
     {id:"f2b",time:"10am",name:"Sumida Hokusai Museum",note:"Sejima building. Great Wave in context. Near Ryogoku.",tags:[]},
     {id:"f2c",time:"Midday",name:"Senso-ji + Asakusa",note:"Nakamise to Kappabashi kitchen tools.",tags:[]},
     {id:"f2d",time:"6:30pm",name:"Higashiazabu Amamoto",note:"The dinner of the trip (couple only). Book July 1 at 1am London. Small counter.",tags:["BOOK","OMAKASE"]},
   ],
   choices:[
     {label:"Lunch — east Tokyo",pick:1,options:[
       {id:"l2a",name:"Benitsuru pancakes — Asakusa",note:"Rice flour soufflé pancakes. Queue from 6:30am for same-day ticket. 120 spots. Near Senso-ji.",tags:[]},
       {id:"l2b",name:"Kamachiku Udon — Nezu",note:"Michelin Bib Gourmand. 100-year stone warehouse by Kengo Kuma, glass extension over Japanese garden. Closed Sun/Mon.",tags:[]},
       {id:"l2c",name:"Tempura Kondo — Ginza",note:"2 Michelin stars. Lunch from 9,900 yen. November = matsutake. Book ahead.",tags:["BOOK","YOU"]},
       {id:"l2d",name:"Sometaro — Asakusa okonomiyaki",note:"Since 1937. Cook it yourself at the table. Near Senso-ji.",tags:[]},
       {id:"l2e",name:"Nakajima — Shinjuku",note:"1 Michelin star sardines. Cheapest Michelin lunch in Tokyo at 1,000 yen.",tags:[]},
     ]},
     {label:"Afternoon art",pick:1,options:[
       {id:"a2a",name:"SCAI The Bathhouse — Yanaka",note:"200-year-old bathhouse, best contemporary gallery in Tokyo. Free.",tags:[]},
       {id:"a2b",name:"Mori Art Museum",note:"53rd floor Roppongi Hills. Check November show.",tags:["D"]},
       {id:"a2c",name:"teamLab Borderless + Azabudai Hills Market",note:"Immersive digital art + extraordinary food hall. Book timed entry.",tags:["BOOK","ARTHUR"]},
       {id:"a2d",name:"Kayaba Coffee + Yanaka Ginza",note:"Since 1938. Best egg sando. Old Tokyo shitamachi neighbourhood.",tags:["NG"]},
      {id:"a2e",name:"Kakimori — Kuramae",note:"Custom notebooks and ink. Japanese stationery at its finest. Kuramae, 15-min from Asakusa. A beautiful stop.",tags:[]},
     ]},
     {label:"Dinner — GROUP of 6 (while couple goes to Amamoto)",pick:1,options:[
       {id:"dg2a",name:"Narukiyo — Shibuya",note:"No menu, chef decides for everyone. Cash only. Dua's obsession. The group's version of the special dinner.",tags:["D","GROUP"]},
       {id:"dg2b",name:"Kagurazaka Ishikawa — kaiseki for 6",note:"2 Michelin stars. Private tatami room. Book months out.",tags:["GROUP","BOOK"]},
       {id:"dg2c",name:"Gonpachi Nishi-Azabu",note:"Multi-level robata and yakitori. Dramatic interior. Good for a group.",tags:["GROUP"]},
       {id:"dg2d",name:"Ginza Torishige — since 1931",note:"120 seats, third generation. Prix-fixe from 7,100 yen. Signature dry curry. Easy to book.",tags:["GROUP"]},
       {id:"dg2e",name:"Toriyoshi — Nakameguro (walk-in)",note:"Walk-in only. Founder Inomata trained Torishiki's Ikegawa — the original master. Date chicken. Arrive before 6pm.",tags:[]},
       {id:"dg2f",name:"Janka — Shibuya yakiniku",note:"Real wasabi kalbi, A5 wagyu, moody lighting. Serious yakiniku the group will remember.",tags:["GROUP"]},
       {id:"dg2g",name:"Warayaki Gyuu — straw-fire beef",note:"Wagyu seared over burning straw tableside. Theatrical and delicious.",tags:["GROUP"]},
     ]},
     {label:"After dinner — regroup",pick:1,options:[
       {id:"n2a",name:"Golden Gai — all together",note:"Couple joins after Amamoto. 200+ micro-bars. The perfect reunion point.",tags:[]},
       {id:"n2b",name:"Bar Martha — couple only",note:"SV. 1970s Tannoy, jazz. No photos. Intimate end to an extraordinary dinner.",tags:["SV","ARTHUR"]},
       {id:"n2c",name:"Nonbei Yokocho — Shibuya",note:"Narrow alleyway, glowing lanterns, tiny izakayas. Good for all 6.",tags:[]},
       {id:"n2d",name:"Back to Edition",note:"Amamoto ends late. That's enough.",tags:[]},
     ]},
   ]},
  {date:"Nov 15",title:"Tokyo free day · Art · Sushi",hotel:"Edition Ginza",
   fixed:[
     {id:"f3a",time:"Morning",name:"Oedo Antique Market — Tokyo Intl Forum",note:"~250 dealers. Best pieces gone by 10am. Free. Yurakucho area — central Tokyo.",tags:["NG"]},
     {id:"f3b",time:"Late morning",name:"21_21 Design Sight — Roppongi",note:"Tadao Ando + Issey Miyake. Check November programme.",tags:[]},
   ],
   choices:[
     {label:"Morning coffee",pick:1,options:[
       {id:"m3a",name:"Glitch Coffee — Ginza",note:"Top-of-top specialty single origin. New Ginza location, on the way from Edition to Forum.",tags:[]},
       {id:"m3b",name:"Bongen — Nihonbashi",note:"Noh theatre-inspired interiors in burnt cedar. Bonsai displayed. Signature Latte Rich with double beans.",tags:[]},
       {id:"m3c",name:"Fuglen Tokyo — Tomigaya",note:"★ NOT TO MISS. SV + NG. Norwegian coffee, 1960s mid-century interior.",tags:["SV","NG"]},
     ]},
     {label:"Lunch — central Tokyo",pick:1,options:[
       {id:"l3a0",name:"Los Tacos Azules — Shibuya",note:"Tokyo's best taco. Trust the recommendation. Fun, casual, very good.",tags:[]},
       {id:"l3a",name:"Pizza Marumo — Ebisu",note:"Top 10 world. Japanese Umami pizza ranked 3rd globally by Time Out. Chef trained at Savoy. Book ahead.",tags:["BOOK"]},
       {id:"l3b",name:"Savoy Pizza — Azabujuban",note:"Reference Neapolitan since 1995.",tags:[]},
       {id:"l3c",name:"Wagyumafia The Burger — Jingumae",note:"Walk-in. Kobe Chateaubriand cutlet sando.",tags:[]},
       {id:"l3d",name:"Ichiran Ramen",note:"Solo booth tonkotsu. The quintessential Japanese solo lunch.",tags:[]},
     ]},
     {label:"Afternoon",pick:1,options:[
       {id:"a3a",name:"Mori Art Museum — Roppongi Hills",note:"53rd floor. Check November exhibition.",tags:["D"]},
       {id:"a3b",name:"Taka Ishii Gallery — Roppongi",note:"Best contemporary art gallery in Tokyo. Moriyama, Araki. Free.",tags:[]},
       {id:"a3c",name:"Namco Tokyo arcade — Azabudai Hills",note:"Multi-floor arcade with bar, AI DJ, claw machines, prize games. Inside Azabudai Hills — same building as teamLab. Open late.",tags:[]},
       {id:"a3d",name:"Akihabara arcade crawl",note:"GiGO Akihabara + Super Potato retro games. The real arcade district. 20-min from central Tokyo.",tags:[]},
       {id:"a3e",name:"Azabudai Hills wander",note:"Newest Tokyo mega-development. Teamlab space, Hermès flagship, wild architecture.",tags:[]},
     ]},
     {label:"Dinner",pick:1,options:[
       {id:"d3a",name:"Sushi Kojima",note:"Your favourite. 1 Michelin star, Edomae omakase.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d3b",name:"Sushidokoro Yamato",note:"★ BOOK AHEAD — midnight slot release on TableAll. Set alarm. Worth the attempt.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d3c",name:"Cignale Enoteca",note:"Italian-Japanese omakase. Your top 3.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d3d",name:"Jambo Hanare",note:"★ BOOK AHEAD via TableAll. Best yakiniku in Tokyo. Pre-order the Chateaubriand by phone when confirming.",tags:["YOU","BOOK"]},
       {id:"d3e",name:"Ahiru Store — Tomigaya",note:"★ Worth it — one of the best natural wine bars in Tokyo. Walk-in only, arrive before 7pm or it fills. Small plates.",tags:["NG"]},
       {id:"d3f",name:"Ebisu Yokocho",note:"Covered alleyway of 20 izakayas. Less touristy than Golden Gai. 2-min from Ebisu Station.",tags:[]},
     ]},
     {label:"Late night listening bar",pick:1,options:[
       {id:"n3a0",name:"The SG Club — Shibuya",note:"Best bar in Japan 2020-21. #23 Asia's 50 Best Bars. Ground floor Guzzle (casual, vintage west coast) + basement Sip (speakeasy). World-class.",tags:[]},
       {id:"n3a",name:"Bar Martha — Ebisu",note:"SV + NG. 1970s Tannoy. Jazz, hard bop. No photos.",tags:["SV","NG"]},
       {id:"n3b",name:"Bar Track — Tokyo",note:"SV. Analog system, deep catalogue. World's 50 Best Discovery.",tags:["SV"]},
       {id:"n3c",name:"Studio Mule — Shibuya",note:"SV. Mule Musiq founder. Klipsch Cornwall speakers. 1,000+ natural wines.",tags:["SV"]},
       {id:"n3d",name:"Musium — Roppongi",note:"100,000+ records in a vault. Vintage speakers, Japanese whisky. Spectacular space.",tags:[]},
       {id:"n3e",name:"Record Bar 33⅓RPM — Shibuya",note:"Write one request slip. 6,000-piece UK/US rock + pop. Rules-based. No groups over 6.",tags:["SV"]},
       {id:"n3f",name:"Blue Note Tokyo",note:"Legendary jazz venue. Check November schedule.",tags:["NG"]},
       {id:"n3g",name:"Early night",note:"Rest.",tags:[]},
     ]},
   ]},
  {date:"Nov 16",title:"Aoyama + DSM → Kyoto afternoon",hotel:"Edition → Sowaka Kyoto",
   fixed:[
     {id:"f4a",time:"9am",name:"Nezu Museum",note:"Kengo Kuma. 7 National Treasures. November maple garden. Before 10am. At the end of the Omotesando boulevard — Issey Miyake and Prada are on the same stretch on the way.",tags:["NG"]},
     {id:"f4b",time:"Late morning",name:"Aoyama + Omotesando block",note:"QOO · Casanova Vintage · KOMEHYO · pejite 青山 (Mashiko ceramics, narrow alley, 5-chome) · Higashiya wagashi tea · Visvim GYRE · Issey Miyake flagship · Prada Aoyama (Herzog & de Meuron glass building) · Traditional Crafts Aoyama Square.",tags:["NG"]},
     {id:"f4c",time:"Midday",name:"DSM Ginza + Lemaire Ebisu",note:"CDG, Alaïa, The Row. Lemaire: 1960s former residence, shoji screens.",tags:[]},
     {id:"f4d",time:"Afternoon",name:"Tokyo Beauty & Gift Run",note:"Isetan Beauty + Matsumoto Kiyoshi + MEGA Don Quijote Shibuya + @cosme Tokyo if time. Best moment for cosmetics/skincare before Kyoto.",tags:["YOU"]},
     {id:"f4e",time:"3-4pm",name:"Shinkansen Tokyo → Kyoto",note:"2h20. JR Pass. Arrive Kyoto 5:30-6pm. Taxi to Sowaka Gion.",tags:[]},
   ],
   choices:[
     {label:"Morning coffee before Nezu",pick:1,options:[
       {id:"m4a",name:"Glitch Coffee — Ginza",note:"Top-of-top specialty single origin. Near Edition, on the way.",tags:[]},
       {id:"m4b",name:"Bongen — Nihonbashi",note:"Noh theatre-inspired burnt cedar interiors. Bonsai displayed. Worth a detour.",tags:[]},
       {id:"m4c",name:"Koffee Mameya — Omotesando",note:"Precision pour-over. Near Nezu Museum. Staff choose your cup by flavour profile.",tags:["NG"]},
     ]},
     {label:"Lunch — Tokyo before departure",pick:1,options:[
       {id:"l4a",name:"Pizza Bar on the 38th — Mandarin Oriental",note:"6-piece pizza omakase. Book 2 months out. World's 50 top pizzerias.",tags:["BOOK"]},
       {id:"l4b",name:"Afuri — yuzu shio ramen",note:"Light yuzu ramen. Omotesando or Harajuku. Quick.",tags:[]},
       {id:"l4c",name:"Gyukatsu Motomura",note:"Wagyu beef katsu you finish on a hot stone yourself. Queue outside.",tags:[]},
     ]},
     {label:"Kyoto arrival dinner",pick:1,options:[
       {id:"d4a",name:"Miyoshi Gion — wagyu kaiseki",note:"DO NOT MISS. OAD #23 Japan 2025. TableAll. First Kyoto night.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d4b",name:"Nakamura",note:"Since 1716. Ask Sowaka concierge on check-in.",tags:["OMAKASE"]},
       {id:"d4c",name:"Rohan — Gion",note:"Post-Kikunoi chef, izakaya. Saba sando. No reservation needed.",tags:[]},
       {id:"d4d",name:"Tousuiro — Kyoto tofu kaiseki",note:"Gentle, warming first Kyoto dinner.",tags:[]},
     ]},
     {label:"After dinner — first Kyoto night",pick:1,options:[
       {id:"n4a",name:"Walk Gion + Pontocho",note:"Hanamikoji at dusk. Pontocho lanterns after 7pm. The Kyoto arrival ritual.",tags:[]},
       {id:"n4b",name:"Bee's Knees",note:"Yellow door. Art Deco speakeasy. NG + SV. First Kyoto drink.",tags:["NG","SV"]},
       {id:"n4c",name:"Hachimonjiya",note:"Kai Fusayoshi's bar. 50 years of Kyoto photography on every wall.",tags:[]},
       {id:"n4d",name:"Early night — long travel day",note:"Rest.",tags:[]},
     ]},
   ]},
  {date:"Nov 17",title:"Fushimi Inari · Arashiyama · Antiques · Kaiseki",hotel:"Sowaka Kyoto",
   fixed:[
     {id:"f5a0",time:"Option",name:"Kokedera Moss Temple (Saihoji)",note:"UNESCO. 120 moss varieties. Book 2 months out at saihoji-kokedera.com. Near Arashiyama — combine with bamboo grove. Max 2 people, ¥4,000.",tags:["BOOK"]},
     {id:"f5a",time:"6:30am",name:"Fushimi Inari — summit walk",note:"Empty vermilion gates, mist. Climb to the top. Blessed sake at summit stalls. 2 hours return.",tags:[]},
     {id:"f5b",time:"8:30am",name:"Arashiyama bamboo grove + Tenryu-ji",note:"Right after Fushimi Inari while still empty. Peak November maple in Tenryu-ji garden.",tags:[]},
     {id:"f5c",time:"Late morning",name:"Shinmonzen + Furumonzen antiques",note:"Best antique streets in Japan. Lacquer, ceramics, scrolls. NG essential.",tags:["NG"]},
     {id:"f5d",time:"Afternoon",name:"Craft + scent circuit: Aritsugu · Nishiki · Kaikado · Kamiji Kakimoto · APFR · Taiga Takahashi",note:"Knives engraved since 1560 · pickles + yuba · tea caddies since 1875 · washi paper since 1845 · APFR fragrance 120yr townhouse Teramachi · Taiga Takahashi Gion back alley: store/gallery/tea room, one of the best retail experiences in Japan.",tags:["NG"]},
   ],
   choices:[
     {label:"Morning coffee — Kyoto",pick:1,options:[
       {id:"m5a",name:"Hario Café — Higashiyama",note:"Glassware brand flagship café. V60 drippers and siphons in action. Historic building. Perfect Kyoto calm.",tags:[]},
       {id:"m5b",name:"[ki:] Café Kyoto",note:"Design-forward precision brewing. Minimal interior. Consistently recommended.",tags:[]},
       {id:"m5c",name:"Skip — go straight to Fushimi Inari",note:"6:30am is the move. Don't delay.",tags:[]},
     ]},
     {label:"Lunch — Kyoto",pick:1,options:[
       {id:"l5a",name:"Okutan Nanzenji — Buddhist tofu since 1635",note:"Yudofu in a garden. Meditative and light.",tags:[]},
       {id:"l5b",name:"Honke Owariya — soba since 1465",note:"Oldest soba restaurant in Japan. Teramachi-dori.",tags:[]},
       {id:"l5c",name:"Nishiki Market eat-as-you-go",note:"Pickles, yuba, matcha soft serve. Standing lunch while shopping.",tags:["NG"]},
       {id:"l5d",name:"Kyo Amahare (Sabo Kyo)",note:"Contemporary Japanese tea in a machiya warehouse. Opened spring 2024. Reserve ahead.",tags:["BOOK"]},
     ]},
     {label:"Kaiseki dinner",pick:1,options:[
       {id:"d5a",name:"Miyoshi Gion — wagyu kaiseki",note:"DO NOT MISS. OAD #23 Japan 2025. If not done Nov 16.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d5a2",name:"Monk — Philosopher's Path",note:"Chef's Table: Pizza. Wood-fired 8-course omakase ending in pizza. 14 guests. Book exactly 2 months out via Resy. Tue-Fri only.",tags:["OMAKASE","BOOK"]},
       {id:"d5a3",name:"Farmoon — Kitashirakawa",note:"Chef Masayo Funakoshi. Converted machiya near Ginkaku-ji. Introduction required — your friend can text her directly.",tags:["OMAKASE"]},
       {id:"d5a4",name:"Sushi Wakon",note:"Michelin 1-star. Edomae + Kyoto-style sushi. Chef trained in Switzerland. Swiss wines. Unusual and excellent.",tags:["OMAKASE","BOOK"]},
       {id:"d5b",name:"Nakamura",note:"Since 1716. Ask Sowaka concierge.",tags:["OMAKASE"]},
       {id:"d5c",name:"Kikunoi Honten",note:"3 Michelin stars. The prestigious option.",tags:["OMAKASE","BOOK"]},
       {id:"d5d",name:"Mizai",note:"Chef forages personally every morning from the mountains.",tags:["OMAKASE"]},
     ]},
     {label:"After dinner bar",pick:1,options:[
       {id:"n5a",name:"Bee's Knees",note:"Yellow door. Art Deco speakeasy. NG + SV.",tags:["NG","SV"]},
       {id:"n5b",name:"Jazz Spot Yamatoya",note:"SV. Since 1958. Basement Kiyamachi-dori.",tags:["SV"]},
       {id:"n5c",name:"Music Bar 1G",note:"Fridge door entrance. Underground Kyoto.",tags:["YOU"]},
       {id:"n5d",name:"Hachimonjiya",note:"Kai Fusayoshi's bar. 50 years of Kyoto photography.",tags:[]},
     ]},
   ]},
  {date:"Nov 18",title:"Hiroshima · Peace Memorial · Miyajima",hotel:"Sowaka Kyoto",
   fixed:[
     {id:"f6a",time:"7:00am",name:"Shinkansen Kyoto → Hiroshima",note:"~50 min. JR Pass. Tram to Peace Park 15 min from Hiroshima station.",tags:[]},
     {id:"f6b",time:"9:00am",name:"Atomic Bomb Dome + Peace Memorial Park",note:"Approach from the river side on foot. 30 min before the museum.",tags:[]},
     {id:"f6c",time:"10:00am",name:"Peace Memorial Museum",note:"One of the most important museums in the world. Allow 2.5-3 hours.",tags:[]},
     {id:"f6d",time:"1:00pm",name:"Okonomimura — Hiroshima-yaki",note:"6-floor building of okonomiyaki stalls. Hiroshima-style with noodles inside. The definitive Hiroshima lunch.",tags:[]},
     {id:"f6e",time:"2:30pm",name:"Miyajima — floating torii + Itsukushima Shrine",note:"JR train + ferry both covered by JR Pass. High tide 2-5pm is ideal — torii appears to float. Allow 2 hours.",tags:[]},
     {id:"f6f",time:"Optional",name:"Simose Art Museum — Otake",note:"World's Most Beautiful Museum 2024 (Prix Versailles). Shigeru Ban. 8 glass pavilions on water. 40 min JR + 10 min bus from Hiroshima. 30 min from Miyajima direction. Add this if you start Hiroshima early.",tags:[]},
     {id:"f6g",time:"4:30pm",name:"Daisho-in Temple — Miyajima",note:"10-min walk from shrine. Most atmospheric Buddhist temple on the island. Almost no tourists.",tags:[]},
     {id:"f6h",time:"6:30pm",name:"Shinkansen Hiroshima → Kyoto",note:"Arrive Kyoto ~7:45pm. Last evening in Kyoto.",tags:[]},
   ],
   choices:[
     {label:"Dinner — last Kyoto night",pick:1,options:[
       {id:"d6a",name:"Miyoshi Gion",note:"If not done yet. DO NOT MISS. Wagyu kaiseki. TableAll.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d6b",name:"Rohan — Gion",note:"Post-Kikunoi chef, izakaya. Saba sando. Easy late arrival, no reservation.",tags:[]},
       {id:"d6c",name:"Bee's Knees — nightcap",note:"Yellow door. Close Kyoto properly.",tags:["NG","SV"]},
       {id:"d6d",name:"Rest — long and emotional day",note:"Hiroshima is heavy. Sometimes early night is right.",tags:[]},
     ]},
   ]},
  {date:"Nov 19",title:"Kinkaku-ji · Garden of Fine Arts → Naoshima",hotel:"Benesse House",
   fixed:[
     {id:"f7a",time:"9:00am",name:"Kinkaku-ji — Golden Temple",note:"9am opening. Gold leaf reflected in Mirror Lake. November maple at peak. ¥500.",tags:[]},
     {id:"f7b",time:"10:00am",name:"Garden of Fine Arts — Kitayama",note:"Tadao Ando. Monet, Da Vinci on ceramic tiles. Almost no tourists. Near Kinkaku-ji.",tags:[]},
     {id:"f7c",time:"11:30am",name:"Shinkansen Kyoto → Okayama",note:"~50 min. JR Pass. Then JR Uno Line to Uno Station ~50 min.",tags:[]},
     {id:"f7d",time:"1:30pm",name:"Ferry Uno → Miyanoura Port, Naoshima",note:"20 min. 300 yen. Not JR Pass. Rent bikes at port.",tags:[]},
     {id:"f7e",time:"2:30pm",name:"Art House Project — Honmura village",note:"Buy tickets at Honmura Lounge. Turrell (Backside of the Moon), Sugimoto (Ango Shrine), Miyajima. Allow 2 hours.",tags:["BOOK"]},
     {id:"f7f",time:"5:00pm",name:"Check into Benesse House",note:"Free shuttle from Honmura. Sea view rooms. Kusama sculptures along coast path at dusk.",tags:[]},
     {id:"f7g",time:"Evening",name:"Setomae Sushi Nagi — Naoshima (CONFIRMED)",note:"Freshest Seto Inland Sea fish. Small counter. Confirmed booking via Benesse concierge.",tags:[]},
   ],
   choices:[
     {label:"Morning coffee before Kinkaku-ji",pick:1,options:[
       {id:"m7a",name:"WIFE & HUSBAND — Kitaoji",note:"Real couple. Pour-over. Honey cheese toast. Near Kinkaku-ji. Phone: 075-201-7324.",tags:["YOU","ARTHUR","BOOK"]},
       {id:"m7b",name:"Skip — straight to Kinkaku-ji at 9am",note:"9am is the best light. Don't delay.",tags:[]},
     ]},
     {label:"Afternoon art on Naoshima (before dinner)",pick:1,options:[
       {id:"a7a",name:"Valley Gallery — Yoshitomo Nara",note:"Oval concrete in the hillside. Natural light only. Silent. 15 min bike.",tags:[]},
       {id:"a7b",name:"Lee Ufan Museum",note:"Ando + minimal mark-making. 15 min from Benesse.",tags:[]},
       {id:"a7c",name:"Benesse House Museum",note:"The art collection you're sleeping inside. Sea view terrace.",tags:[]},
       {id:"a7d",name:"Rest — onsen + sea view",note:"Save energy. Setomae is tonight.",tags:[]},
     ]},
   ]},
  {date:"Nov 20",title:"Naoshima · Chichu · Lee Ufan → Spontaneous day",hotel:"Flexible",
   fixed:[
     {id:"f8a",time:"9:00am",name:"Chichu Art Museum",note:"Book chichu.jp in advance. 5 Monets in natural light only. Turrell Skyspace. Walter De Maria. Allow 2 hours.",tags:["BOOK"]},
     {id:"f8b",time:"11:30am",name:"Lee Ufan Museum",note:"15 min shuttle. Ando + Lee Ufan. Silence as medium. 1 hour.",tags:[]},
     {id:"f8c",time:"12:30pm",name:"Valley Gallery — Yoshitomo Nara",note:"If not done Nov 19. Oval concrete, natural light only.",tags:[]},
     {id:"f8d",time:"2:00pm",name:"Ferry Naoshima → Uno Port",note:"20 min. Then decide where to go.",tags:[]},
   ],
   choices:[
     {label:"Lunch — last on Naoshima",pick:1,options:[
       {id:"l8a",name:"Benesse House terrace café",note:"Simple, fresh, sea view. Before the ferry.",tags:[]},
       {id:"l8b",name:"Umi no Ie — Miyaura port",note:"Local izakaya at the ferry terminal. Fresh octopus, sea bream.",tags:[]},
       {id:"l8c",name:"Eat at Okayama station",note:"Skip island lunch. Excellent ekiben (station bento) at Okayama.",tags:[]},
     ]},
     {label:"Spontaneous Nov 20 — where to?",pick:1,options:[
       {id:"s8a0",name:"Stop in Takamatsu — 1 night",note:"Naoshima → Takamatsu high-speed boat 30 min → check in. Evening: walk port area, Marugame-machi arcade, dinner in town.",tags:[]},
      {id:"s8a",name:"Straight to Tokyo — arrive early evening",note:"Okayama → Nozomi → Tokyo ~3h45. Arrive Yuen Bettei ~7pm. First night in Tokyo II.",tags:[]},
       {id:"s8b",name:"Ukai Toriyama — Mt Takao + dinner",note:"Okayama → Tokyo → Keio Line Takaosanguchi (55 min from Shinjuku). November foliage hike then dinner: irori charcoal chicken, 20,000sqm garden, private tatami. Book ahead.",tags:["BOOK"]},
       {id:"s8c",name:"Stop in Osaka for the evening",note:"Okayama → Osaka ~45 min. Dotonbori, Namba, Shinsekai. Takoyaki, kushikatsu, standing bars. Shinkansen to Tokyo next morning.",tags:[]},
       {id:"s8d",name:"Stop in Kyoto — one last time",note:"Okayama → Kyoto ~45 min. Afternoon in Gion, Bee's Knees one last time. Night train to Tokyo.",tags:[]},
       {id:"s8e",name:"Hakone — onsen with Fuji view",note:"Okayama → Tokyo → Odakyu line to Hakone ~2h total. Overnight ryokan, Fuji views, outdoor onsen.",tags:[]},
     ]},
     {label:"Dinner — depending on route",pick:1,options:[
       {id:"d8a",name:"Tokyo — Virtù for arrival drinks",note:"39th floor Four Seasons Otemachi. Asia's 50 Best Bars. The Tokyo II re-entry.",tags:[]},
       {id:"d8b",name:"Osaka — Dotonbori street food",note:"Takoyaki, okonomiyaki, kushikatsu at Daruma. Loud, fun, cheap.",tags:[]},
       {id:"d8c",name:"Kyoto — Bee's Knees farewell",note:"Yellow door one last time.",tags:["NG","SV"]},
       {id:"d8d",name:"Hakone — kaiseki at the ryokan",note:"Seasonal kaiseki included in most Hakone ryokan stays.",tags:[]},
     ]},
   ]},
  {date:"Nov 21",title:"Daita · Gotokuji · Shimokitazawa Creative Day",hotel:"Yuen Bettei Daita",
   fixed:[
     {id:"f9a0",time:"If in Takamatsu",name:"Takamatsu morning → Tokyo",note:"Isamu Noguchi Museum (book ahead, 10am–5pm, Tue–Sun) — reserve in advance at isamunoguchi.org. Then Ritsurin Garden (Nov maples, one of Japan's finest landscape gardens, 2 hours). Shikokumura open-air museum if time. Marine Liner → Okayama → Nozomi → Yuen Bettei arrive ~7–8pm. Loses the Shimokitazawa afternoon.",tags:["BOOK"]},
     {id:"f9a",time:"Morning",name:"Japanese breakfast + outdoor onsen — Yuen Bettei",note:"No rush. Enjoy the ryokan and the quiet Daita neighbourhood before Shimokitazawa wakes up.",tags:[]},
     {id:"f9b",time:"9:00am",name:"Gotokuji Temple",note:"Original lucky cat temple. Quiet residential Tokyo, 12-min from Yuen Bettei. Go early before the day starts.",tags:[]},
     {id:"f9c",time:"10:30am",name:"Walk back through Daita",note:"Small streets, calm houses, local cafés. This is the slower Tokyo contrast to Ginza and Aoyama.",tags:["NG"]},
     {id:"f9d",time:"11:30am",name:"Shimokitazawa coffee",note:"Ogawa Coffee Laboratory, Beasty Coffee or Sidewalk Coffee. Pick one and keep the day easy.",tags:["NG"]},
     {id:"f9e",time:"12:30–3:00pm",name:"Shimokitazawa vintage circuit",note:"New York Joe Exchange · BIG TIME · AULD LANG SUN · Sui Vintage · TreFacStyle. Mix curated stores with treasure-hunt shops.",tags:["NG"]},
     {id:"f9f",time:"3:00–5:00pm",name:"Record store circuit",note:"Disk Union · JET SET · Jazzy Sport. Add a short coffee break if needed.",tags:["SV"]},
     {id:"f9g",time:"5:30pm",name:"Back to Yuen Bettei",note:"Onsen, rest and change before dinner. Keep the evening easy.",tags:[]},
   ],
   choices:[
     {label:"Lunch — Shimokitazawa area",pick:1,options:[
       {id:"l9a",name:"Shirohige's Cream Puff Factory",note:"Only Totoro-licensed café. Light lunch or snack while vintage shopping.",tags:[]},
       {id:"l9b",name:"Ogawa Coffee Laboratory — Shimokitazawa",note:"Kyoto's Ogawa Coffee brand concept. Good for coffee + calm interiors.",tags:[]},
       {id:"l9c",name:"Beasty Coffee — Shimokitazawa",note:"Quality local roaster with a stronger neighbourhood feel.",tags:[]},
       {id:"l9d",name:"Casual local lunch",note:"Leave open: ramen, curry, izakaya lunch or whatever looks good while wandering.",tags:[]},
     ]},
     {label:"Vintage emphasis",pick:1,options:[
       {id:"v9a",name:"Curated vintage",note:"AULD LANG SUN + Sui Vintage. Better if you want a cleaner edit and fewer piles.",tags:["NG"]},
       {id:"v9b",name:"Treasure-hunt vintage",note:"New York Joe Exchange + BIG TIME + TreFacStyle. More fun, more chaotic, better for bargains.",tags:[]},
       {id:"v9c",name:"Mixed circuit",note:"Start curated, then do one treasure-hunt shop. The best balance.",tags:["YOU"]},
     ]},
     {label:"Record store emphasis",pick:1,options:[
       {id:"r9a",name:"Disk Union Shimokitazawa",note:"The essential stop. Broad vinyl selection, good for digging.",tags:["SV"]},
       {id:"r9b",name:"JET SET Shimokitazawa",note:"Best for electronic, hip-hop, indie and new releases.",tags:["SV"]},
       {id:"r9c",name:"Jazzy Sport Shimokitazawa",note:"Jazz, soul, hip-hop and beat culture. Best music-lover stop.",tags:["SV"]},
     ]},
     {label:"Dinner — easy Tokyo II",pick:1,options:[
       {id:"d9a",name:"Ahiru Store — Tomigaya",note:"Natural wine, casual plates, local mood. Best no-rush dinner if you want easy.",tags:["NG"]},
       {id:"d9b",name:"Toriyoshi — Nakameguro (walk-in)",note:"Casual yakitori. Arrive early if you want to try without stress.",tags:[]},
       {id:"d9c",name:"Ginza Torishige",note:"Since 1931. 120 seats, no stress booking. Prix-fixe 7,100 yen. Signature dry curry finale.",tags:[]},
       {id:"d9d",name:"Jambo Hanare",note:"Fun wagyu night if booked. Less ceremonial than omakase.",tags:["YOU","BOOK"]},
       {id:"d9e",name:"Cignale Enoteca",note:"Refined but relaxed. Keep for either Nov 21 or Nov 22, not both.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d9f",name:"Sushi Kojima",note:"Elegant sushi option if you want another serious counter after Amamoto.",tags:["YOU","OMAKASE","BOOK"]},
     ]},
     {label:"Listening bar — stay local",pick:1,options:[
       {id:"n9a",name:"Little Soul Café — Shimokitazawa",note:"14,000+ records. The most natural ending to this day.",tags:["SV","NG"]},
       {id:"n9b",name:"King Biscuit — Shimokitazawa",note:"Blues and soul. Local, cult, less polished.",tags:["SV"]},
       {id:"n9c",name:"Bar Record — Shimokitazawa",note:"Intimate vinyl listening bar. Easy if you want to stay near the hotel.",tags:["SV"]},
       {id:"n9d",name:"Early night + onsen",note:"Also a very good choice after Kyoto, Hiroshima and Naoshima.",tags:[]},
     ]},
   ]},
  {date:"Nov 22",title:"Nakameguro · Daikanyama · Easy final dinner",hotel:"Yuen Bettei Daita",
   fixed:[
     {id:"f10a",time:"9:00am",name:"Slow breakfast + onsen — Yuen Bettei",note:"No early museum. Pack a little, enjoy the ryokan, keep the final day soft.",tags:[]},
     {id:"f10b",time:"10:30am",name:"Nakameguro stroll",note:"Meguro River, Onibus Coffee, Cowbooks, Epulor and small boutiques. Beautiful final neighbourhood without pressure.",tags:["NG"]},
     {id:"f10c",time:"1:00pm",name:"Daikanyama T-Site",note:"Books, magazines, architecture, stationery and coffee. Very easy from Nakameguro.",tags:["NG"]},
     {id:"f10d",time:"Optional 3:30pm",name:"Final beauty / gift top-up",note:"Only if needed: MEGA Don Quijote Shibuya, @cosme Tokyo or LOFT. Otherwise skip and go back to the onsen.",tags:["YOU"]},
     {id:"f10e",time:"5:30pm",name:"Back to Yuen Bettei",note:"Onsen, pack luggage, change for dinner. Pre-book Haneda taxi for tomorrow morning.",tags:[]},
   ],
   choices:[
     {label:"Lunch — keep it easy",pick:1,options:[
       {id:"l10a",name:"Café Accueil Ebisu — pancakes",note:"Local crowd, seasonal pancakes, between Daikanyama and Ebisu. Book via TableCheck if you want certainty.",tags:[]},
       {id:"l10b",name:"Henry's Burger — Daikanyama",note:"100% Kuroge wagyu. Easy, satisfying, no long meal.",tags:[]},
       {id:"l10c",name:"Pizza Marumo — Ebisu",note:"Excellent pizza if booked. Good final casual lunch.",tags:["BOOK"]},
       {id:"l10d",name:"Light lunch / café only",note:"Best if dinner is serious. Keep the afternoon relaxed.",tags:[]},
     ]},
     {label:"Tokyo beauty / Don Quijote timing",pick:1,options:[
       {id:"b10a",name:"Tokyo I — Nov 16 beauty run",note:"Isetan Beauty + Matsumoto Kiyoshi + MEGA Don Quijote Shibuya before Kyoto. Best for cosmetics and skincare.",tags:["YOU"]},
       {id:"b10b",name:"Tokyo II — Nov 22 top-up",note:"Use only for snacks, gifts and forgotten items. Don’t make the last day a shopping mission.",tags:[]},
       {id:"b10c",name:"Split strategy",note:"Tokyo I = cosmetics/skincare. Tokyo II = snacks/gifts. This keeps Nov 22 easy.",tags:["YOU"]},
       {id:"b10d",name:"Skip today",note:"If everything was bought in Tokyo I, keep Nov 22 as Nakameguro + Daikanyama + onsen.",tags:[]},
     ]},
     {label:"Final dinner — all good options, no rush",pick:1,options:[
       {id:"d10a",name:"Cignale Enoteca",note:"Best overall finale: refined, unique, Tokyo-only, but still warm and relaxed.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d10b",name:"Sushi Kojima",note:"Best sushi finale if you want one more elegant counter after Amamoto.",tags:["YOU","OMAKASE","BOOK"]},
       {id:"d10c",name:"Jambo Hanare",note:"Best fun finale: wagyu, lively, less ceremonial than a tasting menu.",tags:["YOU","BOOK"]},
       {id:"d10d",name:"Ahiru Store — Tomigaya",note:"Best relaxed finale: natural wine and casual plates. Feels local and low-pressure.",tags:["NG"]},
       {id:"d10e",name:"Matoi Ginza — wagyu kappo",note:"Excellent and easier to book. Former Aman chef, wagyu-focused omakase near Ginza.",tags:["BOOK"]},
       {id:"d10f",name:"Pigneto — Four Seasons Otemachi",note:"Best view/comfort option: Italian terrace, Imperial Palace views, Virtù cocktails after.",tags:["YOU"]},
       {id:"d10g",name:"Ginza Torishige",note:"Easy yakitori classic since 1931. Reliable if you want less reservation stress.",tags:[]},
       {id:"d10h",name:"Light dinner + Gen Yamamoto",note:"Cocktails become the main event. Good if you want final night to feel special but not heavy.",tags:["YOU","BOOK"]},
     ]},
     {label:"Final drink of Japan",pick:1,options:[
       {id:"n10a",name:"Benfiddich",note:"If booked. No menu, tiny room, memorable final Tokyo drink.",tags:["BOOK"]},
       {id:"n10b",name:"Gen Yamamoto",note:"Omakase cocktail tasting, seasonal produce, calm and precise. Book 30 days out.",tags:["YOU","NG","BOOK"]},
       {id:"n10c",name:"Bar Martha — Ebisu",note:"Vinyl listening goodbye. No photos, 1970s Tannoy, jazz.",tags:["SV","NG"]},
       {id:"n10d",name:"Studio Mule — Shibuya",note:"Natural wine + vinyl if you want a softer final bar.",tags:["SV"]},
       {id:"n10e",name:"Back to Yuen Bettei",note:"Early Haneda departure tomorrow. No shame in ending with onsen and sleep.",tags:[]},
     ]},
   ]},
  {date:"Nov 23",title:"Depart 9:05am ✈️ CDG",hotel:"Depart",
   fixed:[
     {id:"f11a",time:"4:30am",name:"Wake + breakfast box",note:"Ask Yuen Bettei the night before.",tags:[]},
     {id:"f11b",time:"5:45am",name:"Pre-booked taxi to Haneda",note:"~40 min. ~5,500 yen. Book with hotel.",tags:[]},
     {id:"f11c",time:"Gate",name:"Last onigiri from 7-Eleven",note:"The thing you'll miss most when you land.",tags:[]},
   ],
   choices:[]},
];


const KEY="jp26_v5";

// Helpers
function mapsUrl(name) {
  const ky=["Gion","Fushimi","Arashiyama","Kinkaku","Nakamura","Mizai","Bee","Hachimonjiya","Miyoshi","Mouriya","Okutan","Kagizen","Kaikado","Kamiji","Wife","Nishiki","Yamatoya","1G","Kyoto","Kyourakutei","MAKANAI","Tenryu","Pontocho","Sowaka"];
  const na=["Naoshima","Chichu","Benesse","Lee Ufan","Valley Gallery","Ando Museum","Art House"];
  const te=["Teshima","Boltanski","Archives","Shima Kitchen"];
  const mi=["Miyajima","Itsukushima"];
  const hi=["Hiroshima","Peace Memorial","Okonomimura"];
  const city=te.some(k=>name.includes(k))?"Teshima Kagawa Japan":mi.some(k=>name.includes(k))?"Miyajima Hiroshima Japan":hi.some(k=>name.includes(k))?"Hiroshima Japan":na.some(k=>name.includes(k))?"Naoshima Kagawa Japan":ky.some(k=>name.includes(k))?"Kyoto Japan":"Tokyo Japan";
  return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(name+" "+city);
}
function Tag({type}) {
  const s=TAG_STYLES[type]; if(!s) return null;
  return <span style={{fontSize:"9px",background:s.bg,color:s.color,border:"1px solid "+s.border,borderRadius:"2px",padding:"1px 5px",flexShrink:0,whiteSpace:"nowrap"}}>{s.label}</span>;
}
function PL({name,style}) {
  return <a href={mapsUrl(name)} target="_blank" rel="noopener noreferrer" style={{color:"#1A3A7A",textDecoration:"underline",textDecorationColor:GOLD,textDecorationThickness:"1px",textUnderlineOffset:"2px",...style}}>{name}</a>;
}

// Navigation
function Tabs({view,setView,counts}) {
  const tabs=[["today","Today"],["build","Build"],["must","Must"],["archive","Archive"],["pack","Pack"],["book","Booking"],["map","Map"],["buys","Buys"],["plan","Plan"]];
  return <div style={{display:"flex",overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",borderBottom:"1px solid "+BORD,background:PALE}}>{tabs.map(([v,l])=><button key={v} onClick={()=>setView(v)} style={{padding:"0 14px",height:"44px",border:"none",background:"transparent",fontFamily:"monospace",fontSize:"11px",letterSpacing:"0.06em",textTransform:"uppercase",color:view===v?GOLD:MID,borderBottom:view===v?"2px solid "+GOLD:"2px solid transparent",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{l}{counts?.[v]>0?" ("+counts[v]+")":""}</button>)}</div>;
}

// Views
function TodayView({notes,setNotes,kept}) {
  const start=new Date("2026-11-13"),today=new Date();
  const diff=Math.floor((today-start)/86400000);
  const [idx,setIdx]=useState(Math.max(0,Math.min(diff,DAYS.length-1)));
  const day=DAYS[idx],w=WEATHER[day?.date];
  const dk=kept.filter(k=>k.date===day?.date);
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{display:"flex",overflowX:"auto",gap:"6px",paddingBottom:"10px",scrollbarWidth:"none"}}>
      {DAYS.map((d,i)=><button key={i} onClick={()=>setIdx(i)} style={{padding:"6px 12px",borderRadius:"20px",border:"1px solid "+(i===idx?GOLD:BORD),background:i===idx?GOLD:CARD,color:i===idx?"#fff":MID,fontFamily:"monospace",fontSize:"10px",flexShrink:0,cursor:"pointer"}}>{d.date}</button>)}
    </div>
    <div style={{background:"#EDE7DC",borderRadius:"12px",padding:"1rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div><div style={{fontFamily:"monospace",fontSize:"10px",color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"4px"}}>{day?.date} · {day?.hotel}</div><div style={{fontSize:"1rem",color:DARK,fontWeight:"500",lineHeight:1.3}}>{day?.title}</div></div>
      {w&&<div style={{textAlign:"right",flexShrink:0,paddingLeft:"12px"}}><div style={{fontSize:"1.8rem"}}>{w.icon}</div><div style={{fontFamily:"monospace",fontSize:"10px",color:GOLD}}>{w.lo}–{w.hi}°C</div><div style={{fontSize:"10px",color:MID,marginTop:"2px",maxWidth:"90px",lineHeight:1.3}}>{w.note}</div></div>}
    </div>
    <div style={{marginBottom:"1rem"}}>
      <div style={{fontFamily:"monospace",fontSize:"10px",color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"8px"}}>Fixed programme</div>
      {day?.fixed?.map((f,i)=><div key={i} style={{display:"flex",gap:"10px",padding:"8px 0",borderBottom:"1px solid "+BORD,alignItems:"flex-start"}}>
        <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,minWidth:"52px",paddingTop:"2px",flexShrink:0}}>{f.time}</div>
        <div><div style={{fontSize:"13px",color:DARK,fontWeight:"500"}}>{f.name}</div>{f.note&&<div style={{fontSize:"11px",color:MID,fontStyle:"italic",marginTop:"2px",lineHeight:1.4}}>{f.note}</div>}</div>
      </div>)}
    </div>
    {dk.length>0&&<div style={{marginBottom:"1rem"}}><div style={{fontFamily:"monospace",fontSize:"10px",color:GRN,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"8px"}}>Your confirmed choices</div>{dk.map((k,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 0",borderBottom:"1px solid "+BORD}}><div style={{width:"8px",height:"8px",borderRadius:"50%",background:GRN,flexShrink:0}}/><PL name={k.name} style={{fontSize:"14px"}}/></div>)}</div>}
    <div><div style={{fontFamily:"monospace",fontSize:"10px",color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"6px"}}>Journal</div><textarea value={notes[day?.date]||""} onChange={e=>setNotes(p=>({...p,[day.date]:e.target.value}))} placeholder="Write it here while it's fresh…" style={{width:"100%",minHeight:"100px",padding:"10px 12px",background:CARD,border:"1px solid "+BORD,borderRadius:"8px",fontFamily:"inherit",fontSize:"14px",color:DARK,lineHeight:1.6,resize:"vertical",outline:"none",boxSizing:"border-box"}}/></div>
  </div>;
}
function OCard({opt,state,onToggle,musts,toggleMust,onScratch,onMove,isBooked,onBook,editMode,onEdit}) {
  const kept=state==="kept",isMust=musts?.[opt.id];
  return <div onClick={onToggle} style={{padding:"10px 12px",marginBottom:"6px",border:"1px solid "+(kept?GOLD:BORD),borderRadius:"6px",background:kept?"#FBF4E4":CARD,cursor:"pointer",minHeight:"44px",borderLeft:isMust?"3px solid "+RED:kept?"3px solid "+GOLD:"3px solid transparent"}}>
    <div style={{display:"flex",alignItems:"flex-start",gap:"8px"}}>
      <div style={{width:"16px",height:"16px",borderRadius:"50%",border:"2px solid "+(kept?GOLD:BORD),background:kept?GOLD:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px"}}>{kept&&<span style={{color:"#111",fontSize:"9px",fontWeight:"bold"}}>✓</span>}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"4px",flexWrap:"wrap",marginBottom:"2px"}}>
          {editMode
            ? <input defaultValue={opt.name} onClick={e=>e.stopPropagation()} onBlur={e=>onEdit&&onEdit({...opt,name:e.target.value})} style={{fontFamily:"Georgia,serif",fontSize:"13px",border:"1px solid "+GOLD,borderRadius:"4px",padding:"2px 6px",background:"#FDFAF6",color:DARK,width:"100%"}}/>
            : <PL name={opt.name} style={{fontSize:"13px"}}/>}
          {opt.tags?.map(t=><Tag key={t} type={t}/>)}
          <button onClick={e=>{e.stopPropagation();toggleMust&&toggleMust(opt.id);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"11px",color:isMust?RED:"#D0C8BC",padding:"0 2px"}}>⚑</button>
          <button onClick={e=>{e.stopPropagation();onBook&&onBook(opt.id);}} style={{padding:"1px 6px",fontSize:"9px",fontFamily:"monospace",border:"1px solid "+(isBooked?"#6B8F71":BORD),borderRadius:"10px",background:isBooked?"#6B8F71":"transparent",color:isBooked?"#fff":MID,cursor:"pointer",letterSpacing:"0.05em"}}>{isBooked?"✓ BOOKED":"BOOK?"}</button>
          <button onClick={e=>{e.stopPropagation();onScratch();}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"13px",color:"#D0C8BC",fontWeight:"300",padding:"0 2px"}} title="Remove → Archive">✕</button>
          <button onClick={e=>{e.stopPropagation();onMove();}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"12px",color:"#D0C8BC",padding:"0 2px"}}>⇄</button>
        </div>
        {editMode
        ? <textarea defaultValue={opt.note||""} placeholder="Add a note…" onClick={e=>e.stopPropagation()} onBlur={e=>onEdit&&onEdit({...opt,note:e.target.value})} style={{fontFamily:"Georgia,serif",fontSize:"11px",border:"1px solid "+BORD,borderRadius:"4px",padding:"4px 6px",background:"#FDFAF6",color:MID,marginTop:"4px",resize:"vertical",minHeight:"50px",width:"100%",lineHeight:1.4}}/>
        : opt.note&&<div style={{fontSize:"11px",color:MID,fontStyle:"italic",lineHeight:1.5}}>{opt.note}</div>}
      </div>
    </div>
  </div>;
}

// Small form components
function AddCustom({onAdd}) {
  const [open,setOpen]=useState(false);
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  if(!open) return <button onClick={()=>setOpen(true)} style={{marginTop:"8px",width:"100%",padding:"8px",background:"transparent",border:"1px dashed #D4C4A8",borderRadius:"6px",fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em",textTransform:"uppercase",color:MID,cursor:"pointer"}}>+ Add your own</button>;
  async function add() {
    if(!name.trim()) return;
    setLoading(true);
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,system:'Japan trip Nov 2026. Reply ONLY with JSON: {"name":"...","note":"1 sentence","tags":[]}. Add "BOOK" if reservation needed.',messages:[{role:"user",content:name}]})});
      const d=await r.json();
      const t=d.content?.find(b=>b.type==="text")?.text||"";
      const p=JSON.parse(t.replace(/```json|```/g,"").trim());
      onAdd({id:"c_"+Date.now(),name:p.name||name,note:p.note||"",tags:p.tags||["CUSTOM"]});
      setName("");setOpen(false);
    } catch(e){console.error(e);}
    setLoading(false);
  }
  return <div style={{marginTop:"8px",padding:"10px",background:"#F5F0E8",border:"1px dashed #D4C4A8",borderRadius:"6px"}}>
    <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"6px"}}>Type a place — Claude describes it</div>
    <div style={{display:"flex",gap:"6px"}}>
      <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="e.g. Bar High Five…" style={{flex:1,padding:"8px 10px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"13px",color:DARK,outline:"none"}}/>
      <button onClick={add} disabled={loading||!name.trim()} style={{padding:"8px 12px",background:loading?"#D8D2C8":GOLD,color:"#fff",border:"none",borderRadius:"6px",fontFamily:"monospace",fontSize:"10px",cursor:loading?"wait":"pointer"}}>{loading?"…":"Add"}</button>
      <button onClick={()=>{setOpen(false);setName("");}} style={{padding:"8px 10px",background:"transparent",border:"1px solid "+BORD,borderRadius:"6px",color:MID,cursor:"pointer",fontSize:"12px"}}>✕</button>
    </div>
  </div>;
}
function AddFixed({onAdd}) {
  const [open,setOpen]=useState(false);
  const [time,setTime]=useState("");
  const [name,setName]=useState("");
  const [note,setNote]=useState("");
  if(!open) return <button onClick={()=>setOpen(true)} style={{marginTop:"8px",width:"100%",padding:"7px",background:"transparent",border:"1px dashed #D4C4A8",borderRadius:"6px",fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em",textTransform:"uppercase",color:MID,cursor:"pointer"}}>+ Add to fixed programme</button>;
  return <div style={{marginTop:"8px",padding:"10px",background:"#F5F0E8",border:"1px dashed #D4C4A8",borderRadius:"6px"}}>
    <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"8px"}}>Add fixed item</div>
    <div style={{display:"flex",gap:"6px",marginBottom:"6px"}}>
      <input value={time} onChange={e=>setTime(e.target.value)} placeholder="Time (e.g. 9am)" style={{width:"90px",padding:"7px 8px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"12px",color:DARK,outline:"none",flexShrink:0}}/>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Place or activity name" style={{flex:1,padding:"7px 8px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"12px",color:DARK,outline:"none"}}/>
    </div>
    <div style={{display:"flex",gap:"6px"}}>
      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" style={{flex:1,padding:"7px 8px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"12px",color:DARK,outline:"none"}}/>
      <button onClick={()=>{if(!name.trim())return;onAdd({id:"cf_"+Date.now(),time:time||"Added",name:name.trim(),note:note.trim(),tags:[]});setTime("");setName("");setNote("");setOpen(false);}} style={{padding:"7px 14px",background:GOLD,color:"#fff",border:"none",borderRadius:"6px",fontFamily:"monospace",fontSize:"10px",cursor:"pointer",flexShrink:0}}>Add</button>
      <button onClick={()=>setOpen(false)} style={{padding:"7px 10px",background:"transparent",border:"1px solid "+BORD,borderRadius:"6px",color:MID,cursor:"pointer",fontSize:"12px"}}>✕</button>
    </div>
  </div>;
}
function BuildView({days,setDays,selections,setSelections,musts,setMusts,scratched,setScratched,hiddenFixed,setHiddenFixed,notes,setNotes,editMode,booked,setBooked}) {
  const [collapsed,setCollapsed]=useState({});
  const [moveSheet,setMoveSheet]=useState(null);
  const [editingFixed,setEditingFixed]=useState(null);
  const [editName,setEditName]=useState("");
  const [addingOpt,setAddingOpt]=useState(null);
  const [addingFixed,setAddingFixed]=useState(null);
  const [addName,setAddName]=useState("");
  const [addTime,setAddTime]=useState("");
  function toggleSelect(id,opts,pick1) {
    setSelections(prev=>{
      const next={...prev},cur=next[id]||"neutral";
      if(pick1){if(cur==="kept"){opts.forEach(o=>{next[o.id]="neutral";});}else{opts.forEach(o=>{next[o.id]=o.id===id?"kept":"neutral";});}}
      else{next[id]=cur==="neutral"?"kept":cur==="kept"?"removed":"neutral";}
      return next;
    });
  }
  return <div style={{paddingBottom:"5rem"}}>

    {days.map(day=>{
      const isOpen=!collapsed[day.date],w=WEATHER[day.date];
      const nKept=day.choices.flatMap(c=>c.options.filter(o=>selections[o.id]==="kept")).length;
      return <div key={day.date} style={{borderBottom:"1px solid "+BORD}}>
        <div onClick={()=>setCollapsed(p=>({...p,[day.date]:!p[day.date]}))} style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",background:"#FAF7F2",minHeight:"56px"}}>
          <div style={{fontFamily:"monospace",fontSize:"11px",color:GOLD,fontWeight:"600",flexShrink:0,width:"44px"}}>{day.date}</div>
          <div style={{flex:1}}><div style={{fontSize:"14px",color:DARK,fontWeight:"500",lineHeight:1.25}}>{day.title}</div><div style={{fontFamily:"monospace",fontSize:"9px",color:MID,marginTop:"2px"}}>{day.hotel}</div></div>
          {w&&<div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:"1.1rem"}}>{w.icon}</div><div style={{fontFamily:"monospace",fontSize:"9px",color:GOLD}}>{w.lo}–{w.hi}°C</div></div>}
          <div style={{display:"flex",alignItems:"center",gap:"6px",flexShrink:0}}>
            {nKept>0&&<span style={{fontFamily:"monospace",fontSize:"10px",color:GRN}}>{nKept}✓</span>}
            <span style={{color:MID,fontSize:"12px"}}>{isOpen?"▾":"▸"}</span>
          </div>
        </div>
        {isOpen&&<div style={{padding:"0 16px 16px",background:"#F7F3EC"}}>
          {day.fixed.filter(f=>!hiddenFixed[f.id]).length>0&&<div style={{marginBottom:"12px",paddingTop:"10px"}}>
            <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px",borderLeft:"2px solid #D4C4A8",paddingLeft:"6px"}}>Fixed</div>
            {day.fixed.filter(f=>!hiddenFixed[f.id]).map(f=><div key={f.id} style={{display:"flex",gap:"8px",marginBottom:"6px",alignItems:"flex-start"}}>
              <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,minWidth:"52px",paddingTop:"3px",textAlign:"right",flexShrink:0}}>{f.time}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"4px",flexWrap:"wrap"}}>
                  {editMode
                    ? <input defaultValue={f.name} onBlur={e=>setDays(ds=>ds.map(d=>({...d,fixed:d.fixed.map(fi=>fi.id===f.id?{...fi,name:e.target.value}:fi)})))} style={{fontFamily:"Georgia,serif",fontSize:"13px",border:"1px solid "+GOLD,borderRadius:"4px",padding:"2px 6px",background:"#FDFAF6",width:"100%",color:DARK}}/>
                    : <PL name={f.name} style={{fontSize:"13px"}}/>}
                  {f.tags?.map(t=><Tag key={t} type={t}/>)}
                  <button onClick={e=>{e.stopPropagation();setBooked(b=>({...b,[f.id]:!b[f.id]}));}} style={{padding:"1px 6px",fontSize:"9px",fontFamily:"monospace",border:"1px solid "+(booked[f.id]?"#6B8F71":BORD),borderRadius:"10px",background:booked[f.id]?"#6B8F71":"transparent",color:booked[f.id]?"#fff":MID,cursor:"pointer",letterSpacing:"0.05em"}}>{booked[f.id]?"✓ BOOKED":"BOOK?"}</button>
                  <button onClick={()=>setMusts(p=>({...p,[f.id]:!p[f.id]}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:"11px",color:musts[f.id]?RED:"#D0C8BC",padding:"0 2px"}}>⚑</button>
                  <button onClick={()=>{setEditingFixed(f.id);setEditName(f.name);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"10px",color:"#D0C8BC",padding:"0 2px"}}>✎</button>
                  <button onClick={()=>setHiddenFixed(p=>({...p,[f.id]:true}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:"13px",color:"#D0C8BC",fontWeight:"300",padding:"0 2px"}}>✕</button>
                </div>
                {editingFixed===f.id?<div style={{display:"flex",gap:"5px",marginTop:"4px"}}>
                  <input value={editName} autoFocus onChange={e=>setEditName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,fixed:d.fixed.map(fi=>fi.id!==f.id?fi:{...fi,name:editName})}));setEditingFixed(null);}if(e.key==="Escape")setEditingFixed(null);}} style={{flex:1,padding:"4px 8px",border:"1px solid "+GOLD,borderRadius:"4px",fontFamily:"inherit",fontSize:"12px",color:DARK,outline:"none"}}/>
                  <button onClick={()=>{setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,fixed:d.fixed.map(fi=>fi.id!==f.id?fi:{...fi,name:editName})}));setEditingFixed(null);}} style={{padding:"4px 10px",background:GOLD,color:"#fff",border:"none",borderRadius:"4px",fontSize:"11px",cursor:"pointer"}}>✓</button>
                  <button onClick={()=>setEditingFixed(null)} style={{padding:"4px 8px",background:"transparent",border:"1px solid "+BORD,borderRadius:"4px",color:MID,fontSize:"11px",cursor:"pointer"}}>✕</button>
                </div>:f.note&&<div style={{fontSize:"11px",color:MID,fontStyle:"italic",lineHeight:1.5,marginTop:"2px"}}>{f.note}</div>}
              </div>
            </div>)}
            {day.fixed.filter(f=>hiddenFixed[f.id]).length>0&&<div style={{paddingLeft:"60px",marginTop:"4px"}}>{day.fixed.filter(f=>hiddenFixed[f.id]).map(f=><span key={f.id} style={{fontSize:"11px",color:MID,textDecoration:"line-through",marginRight:"8px"}}>{f.name} <button onClick={()=>setHiddenFixed(p=>({...p,[f.id]:false}))} style={{background:"none",border:"none",cursor:"pointer",color:GOLD,fontSize:"10px"}}>↩</button></span>)}</div>}
            <AddFixed onAdd={item=>setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,fixed:[...d.fixed,item]}))}/>
            {editMode&&(addingFixed===day.date
              ? <div style={{display:"flex",flexDirection:"column",gap:"6px",marginTop:"6px",padding:"8px",border:"1px solid "+GOLD,borderRadius:"6px",background:"#FDFAF6"}} onClick={e=>e.stopPropagation()}>
                  <input autoFocus value={addName} onChange={e=>setAddName(e.target.value)} placeholder="Item name…" style={{padding:"6px 8px",border:"1px solid "+GOLD,borderRadius:"4px",fontFamily:"Georgia,serif",fontSize:"12px",color:DARK}}/>
                  <input value={addTime} onChange={e=>setAddTime(e.target.value)} placeholder="Time (e.g. 9am, Morning)…" style={{padding:"6px 8px",border:"1px solid "+BORD,borderRadius:"4px",fontFamily:"Georgia,serif",fontSize:"12px",color:DARK}}/>
                  <div style={{display:"flex",gap:"6px"}}>
                    <button onClick={()=>{if(addName.trim()){setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,fixed:[...d.fixed,{id:"uf"+Date.now(),time:addTime,name:addName.trim(),note:"",tags:[]}]}));setAddName("");setAddTime("");setAddingFixed(null);}}} style={{flex:1,padding:"6px",background:GOLD,border:"none",borderRadius:"4px",color:"#fff",cursor:"pointer",fontSize:"12px"}}>Add</button>
                    <button onClick={()=>setAddingFixed(null)} style={{padding:"6px 10px",background:"transparent",border:"1px solid "+BORD,borderRadius:"4px",color:MID,cursor:"pointer",fontSize:"12px"}}>✕</button>
                  </div>
                </div>
              : <button onClick={()=>{setAddingFixed(day.date);setAddName("");setAddTime("");}} style={{width:"100%",padding:"8px",border:"1px dashed "+GOLD,borderRadius:"6px",background:"transparent",color:GOLD,fontFamily:"Georgia,serif",fontSize:"12px",cursor:"pointer",marginTop:"6px"}}>+ Add fixed item</button>
            )}
          </div>}
          {day.choices.map((ch,ci)=><div key={ci} style={{marginBottom:"12px",padding:"12px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px"}}>
            <div style={{fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:"#8A6430",marginBottom:"10px",borderBottom:"1px solid "+BORD,paddingBottom:"8px"}}>{ch.label} <span style={{color:MID}}>· pick {ch.pick===1?"one":"up to "+ch.pick}</span></div>
            {ch.options.filter(o=>!scratched[o.id]).map(opt=><OCard key={opt.id} opt={opt} state={selections[opt.id]||"neutral"} onToggle={()=>toggleSelect(opt.id,ch.options,ch.pick===1)} musts={musts} toggleMust={id=>setMusts(p=>({...p,[id]:!p[id]}))} onScratch={()=>{setScratched(p=>({...p,[opt.id]:true}));if(selections[opt.id]==="kept")setSelections(p=>({...p,[opt.id]:"neutral"}));}} onMove={()=>setMoveSheet({optId:opt.id,optName:opt.name,fromDate:day.date,fromLabel:ch.label,opt})} isBooked={booked?.[opt.id]} onBook={(id)=>setBooked(b=>({...b,[id]:!b[id]}))} editMode={editMode} onEdit={(updated)=>setDays(ds=>ds.map(d=>({...d,choices:d.choices.map(ch=>({...ch,options:ch.options.map(op=>op.id===updated.id?updated:op)}))})))}/>)}
            {ch.options.filter(o=>scratched[o.id]).length>0&&<div style={{paddingTop:"6px",borderTop:"1px dashed #E2DDD4",marginTop:"6px"}}><div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"4px"}}>In archive</div>{ch.options.filter(o=>scratched[o.id]).map(o=><span key={o.id} style={{fontSize:"11px",color:MID,textDecoration:"line-through",marginRight:"8px"}}>{o.name} <button onClick={()=>setScratched(p=>({...p,[o.id]:false}))} style={{background:"none",border:"none",cursor:"pointer",color:GOLD,fontSize:"10px"}}>↩</button></span>)}</div>}
            {editMode&&(addingOpt===day.date+":"+ci
              ? <div style={{display:"flex",gap:"6px",marginBottom:"6px"}} onClick={e=>e.stopPropagation()}>
                  <input autoFocus value={addName} onChange={e=>setAddName(e.target.value)} placeholder="Option name…" onKeyDown={e=>{if(e.key==="Enter"&&addName.trim()){setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,choices:d.choices.map((c,ci)=>ci!==parseInt(addingOpt.split(":")[1])?c:{...c,options:[...c.options,{id:"u"+Date.now(),name:addName.trim(),note:"",tags:[]}]})}));setAddName("");setAddingOpt(null);}if(e.key==="Escape")setAddingOpt(null);}} style={{flex:1,padding:"6px 8px",border:"1px solid "+GOLD,borderRadius:"4px",fontFamily:"Georgia,serif",fontSize:"12px",color:DARK}}/>
                  <button onClick={()=>{if(addName.trim()){setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,choices:d.choices.map((c,ci)=>ci!==parseInt(addingOpt.split(":")[1])?c:{...c,options:[...c.options,{id:"u"+Date.now(),name:addName.trim(),note:"",tags:[]}]})}));setAddName("");setAddingOpt(null);}}} style={{padding:"6px 10px",background:GOLD,border:"none",borderRadius:"4px",color:"#fff",cursor:"pointer",fontSize:"12px"}}>Add</button>
                  <button onClick={()=>setAddingOpt(null)} style={{padding:"6px 8px",background:"transparent",border:"1px solid "+BORD,borderRadius:"4px",color:MID,cursor:"pointer",fontSize:"12px"}}>✕</button>
                </div>
              : <button onClick={()=>{setAddingOpt(day.date+":"+ci);setAddName("");}} style={{width:"100%",padding:"8px",border:"1px dashed "+BORD,borderRadius:"6px",background:"transparent",color:MID,fontFamily:"Georgia,serif",fontSize:"12px",cursor:"pointer",marginBottom:"6px"}}>+ Add option</button>
            )}
            <AddCustom onAdd={opt=>setDays(prev=>prev.map(d=>d.date!==day.date?d:{...d,choices:d.choices.map(c=>c.label!==ch.label?c:{...c,options:[...c.options,opt]})}))}/>
          </div>)}
          <div style={{marginTop:"12px"}}>
            <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"6px"}}>Journal</div>
            <textarea value={notes[day.date]||""} onChange={e=>setNotes(p=>({...p,[day.date]:e.target.value}))} placeholder="What happened, what surprised you…" style={{width:"100%",minHeight:"70px",padding:"8px 10px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"13px",color:DARK,lineHeight:1.6,resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
          </div>
        </div>}
      </div>;
    })}
    {moveSheet&&<div onClick={()=>setMoveSheet(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:PALE,width:"100%",maxWidth:"480px",margin:"0 auto",borderRadius:"16px 16px 0 0",padding:"16px 16px 32px",boxShadow:"0 -4px 24px rgba(0,0,0,0.12)"}}>
        <div style={{width:"36px",height:"4px",background:BORD,borderRadius:"2px",margin:"0 auto 16px"}}/>
        <div style={{fontSize:"13px",color:DARK,fontWeight:"500",marginBottom:"12px"}}>Move "{moveSheet.optName}" to:</div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"50vh",overflowY:"auto"}}>
          {days.filter(d=>d.date!==moveSheet.fromDate).map(d=><button key={d.date} onClick={()=>{
            const newOpt={...moveSheet.opt,id:"moved_"+Date.now()};
            setDays(prev=>prev.map(day=>{
              if(day.date===moveSheet.fromDate) return {...day,choices:day.choices.map(ch=>ch.label!==moveSheet.fromLabel?ch:{...ch,options:ch.options.filter(o=>o.id!==moveSheet.optId)})};
              if(day.date===d.date){const ei=day.choices.findIndex(ch=>ch.label===moveSheet.fromLabel);if(ei>=0){const nc=[...day.choices];nc[ei]={...nc[ei],options:[...nc[ei].options,newOpt]};return{...day,choices:nc};}return{...day,choices:[...day.choices,{label:"Moved · "+moveSheet.fromLabel,pick:1,options:[newOpt]}]};}
              return day;
            }));
            setMoveSheet(null);
          }} style={{display:"flex",gap:"12px",padding:"12px 14px",background:CARD,border:"1px solid "+BORD,borderRadius:"10px",cursor:"pointer",textAlign:"left"}}>
            <span style={{fontFamily:"monospace",fontSize:"10px",color:GOLD,width:"44px",flexShrink:0}}>{d.date}</span>
            <span style={{fontSize:"13px",color:DARK}}>{d.title}</span>
          </button>)}
        </div>
        <button onClick={()=>setMoveSheet(null)} style={{marginTop:"10px",width:"100%",padding:"12px",background:"#EDE7DC",border:"none",borderRadius:"10px",fontFamily:"monospace",fontSize:"11px",color:MID,cursor:"pointer"}}>Cancel</button>
      </div>
    </div>}
  </div>;
}
function MustView({days,selections,musts,setMusts}) {
  const all=days.flatMap(day=>[...day.fixed.filter(f=>musts[f.id]).map(f=>({id:f.id,name:f.name,date:day.date,isFixed:true,isChosen:true})),...day.choices.flatMap(ch=>ch.options.filter(o=>musts[o.id]).map(o=>({id:o.id,name:o.name,date:day.date,label:ch.label,isChosen:selections[o.id]==="kept"})))]);
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{fontSize:"17px",color:DARK,fontStyle:"italic",marginBottom:"12px"}}>Must not miss</div>
    {all.length===0?<div style={{color:MID,fontStyle:"italic",textAlign:"center",padding:"2rem 0"}}>Tap the flag on any item in Build to flag it.</div>:<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>{all.map((item,i)=><div key={i} style={{display:"flex",gap:"10px",padding:"12px 14px",background:CARD,border:"1px solid "+(item.isChosen?"#C8DCC8":BORD),borderRadius:"8px",borderLeft:"3px solid "+(item.isChosen?GRN:"#D0C8BC")}}>
      <div style={{width:"10px",height:"10px",borderRadius:"50%",background:item.isChosen?GRN:"#D0C8BC",flexShrink:0,marginTop:"3px"}}/>
      <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginBottom:"2px"}}><PL name={item.name} style={{fontSize:"14px"}}/><button onClick={()=>setMusts(p=>({...p,[item.id]:false}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:"10px",color:MID}}>✕</button></div><div style={{fontFamily:"monospace",fontSize:"9px",color:item.isFixed?GOLD:item.isChosen?GRN:MID}}>{item.isFixed?"Fixed":item.isChosen?"Chosen":"Not yet chosen"} · {item.date}</div></div>
    </div>)}</div>}
  </div>;
}
function ArchiveView({days,scratched,setScratched}) {
  const all=days.flatMap(day=>day.choices.flatMap(ch=>ch.options.filter(o=>scratched[o.id]).map(o=>({...o,dayDate:day.date,choiceLabel:ch.label}))));
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{fontSize:"17px",color:DARK,fontStyle:"italic",marginBottom:"12px"}}>Archive</div>
    {all.length===0?<div style={{color:MID,fontStyle:"italic",textAlign:"center",padding:"2rem 0"}}>Nothing archived. Tap X on options in Build.</div>:<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>{all.map((o,i)=><div key={i} style={{display:"flex",gap:"10px",padding:"12px 14px",background:CARD,border:"1px solid "+BORD,borderRadius:"8px",opacity:0.7}}>
      <div style={{flex:1}}><div style={{fontSize:"13px",color:MID,textDecoration:"line-through",marginBottom:"4px"}}>{o.name}</div><div style={{fontFamily:"monospace",fontSize:"9px",color:"#A89E94"}}>{o.dayDate} · {o.choiceLabel}</div>{o.note&&<div style={{fontSize:"11px",color:"#A89E94",fontStyle:"italic",marginTop:"4px"}}>{o.note}</div>}</div>
      <button onClick={()=>setScratched(p=>({...p,[o.id]:false}))} style={{padding:"8px 12px",background:PALE,border:"1px solid #D4C4A8",borderRadius:"6px",fontFamily:"monospace",fontSize:"10px",color:"#8A6430",cursor:"pointer",flexShrink:0,alignSelf:"center"}}>Restore</button>
    </div>)}</div>}
  </div>;
}
function PackView() {
  const [packed,setPacked]=useState({});
  useEffect(()=>{window.storage?.get("jp26_pack")?.then(r=>{if(r?.value)setPacked(JSON.parse(r.value));}).catch(()=>{});},[]);
  useEffect(()=>{window.storage?.set("jp26_pack",JSON.stringify(packed))?.catch(()=>{});},[packed]);
  const total=PACKING.reduce((a,c)=>a+c.items.length,0),done=Object.values(packed).filter(Boolean).length;
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"16px"}}><div style={{fontSize:"17px",color:DARK,fontStyle:"italic"}}>Packing list</div><div style={{fontFamily:"monospace",fontSize:"11px",color:done===total?GRN:GOLD}}>{done}/{total} packed</div></div>
    {PACKING.map((cat,ci)=><div key={ci} style={{marginBottom:"20px"}}><div style={{fontSize:"13px",color:DARK,fontWeight:"500",marginBottom:"8px",paddingBottom:"6px",borderBottom:"1px solid "+BORD}}>{cat.cat}</div>{cat.items.map((item,ii)=>{const k=ci+"_"+ii,isDone=packed[k];return <div key={ii} onClick={()=>setPacked(p=>({...p,[k]:!p[k]}))} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 12px",marginBottom:"4px",background:isDone?"#EEF6EE":CARD,border:"1px solid "+(isDone?"#C8DCC8":BORD),borderRadius:"6px",cursor:"pointer",opacity:isDone?0.6:1,minHeight:"44px"}}>
      <div style={{width:"15px",height:"15px",borderRadius:"3px",border:"1.5px solid "+(isDone?GRN:"#BCB4A8"),background:isDone?GRN:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px"}}>{isDone&&<span style={{color:"#fff",fontSize:"9px",fontWeight:"bold"}}>✓</span>}</div>
      <div style={{fontSize:"13px",color:isDone?MID:DARK,textDecoration:isDone?"line-through":"none",lineHeight:1.5}}>{item}</div>
    </div>;})}
    </div>)}
  </div>;
}
function BookingView() {
  const [done,setDone]=useState({});
  const [cal,setCal]=useState(false);
  useEffect(()=>{window.storage?.get("jp26_book")?.then(r=>{if(r?.value)setDone(JSON.parse(r.value));}).catch(()=>{});},[]);
  useEffect(()=>{window.storage?.set("jp26_book",JSON.stringify(done))?.catch(()=>{});},[done]);
  const uC={critical:RED,high:GOLD,medium:"#A855F7",low:GRN};
  const uL={critical:"Do now",high:"Aug–Oct",medium:"Sep–Oct",low:"Few weeks"};
  const uO={critical:0,high:1,medium:2,low:3};
  const sorted=[...BOOKING].sort((a,b)=>uO[a.urgency]-uO[b.urgency]);
  const pending=sorted.filter(b=>!done[b.name]),doneItems=sorted.filter(b=>done[b.name]);
  const groups=[{label:"Do now — June/July 2026",u:"critical"},{label:"Aug–Oct 2026",u:"high"},{label:"Sep–Oct 2026",u:"medium"},{label:"Few weeks before",u:"low"}].map(g=>({...g,items:BOOKING.filter(b=>b.urgency===g.u)}));
  function Card({b}) {
    const isDone=done[b.name];
    return <div onClick={()=>setDone(p=>({...p,[b.name]:!p[b.name]}))} style={{display:"flex",gap:"10px",padding:"10px 12px",marginBottom:"6px",background:isDone?"#EEF6EE":CARD,border:"1px solid "+(isDone?"#C8DCC8":BORD),borderLeft:"3px solid "+(isDone?"#C8DCC8":uC[b.urgency]),borderRadius:"6px",cursor:"pointer",opacity:isDone?0.5:1}}>
      <div style={{width:"15px",height:"15px",borderRadius:"3px",border:"1.5px solid "+(isDone?GRN:"#BCB4A8"),background:isDone?GRN:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px"}}>{isDone&&<span style={{color:"#fff",fontSize:"9px",fontWeight:"bold"}}>✓</span>}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginBottom:"3px"}}><span style={{fontSize:"13px",color:isDone?MID:DARK,textDecoration:isDone?"line-through":"none"}}>{b.name}</span><span style={{fontFamily:"monospace",fontSize:"9px",background:uC[b.urgency]+"20",color:uC[b.urgency],border:"1px solid "+uC[b.urgency]+"50",borderRadius:"2px",padding:"1px 5px"}}>{uL[b.urgency]}</span><span style={{fontFamily:"monospace",fontSize:"9px",color:MID}}>→ {b.date}</span></div>
        <div style={{fontSize:"11px",color:isDone?MID:GOLD,fontFamily:"monospace",marginBottom:"2px"}}>{b.when}</div>
        <div style={{fontSize:"11px",color:MID,lineHeight:1.4}}>{b.how}</div>
      </div>
    </div>;
  }
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
      <div style={{fontSize:"17px",color:DARK,fontStyle:"italic"}}>Booking list</div>
      <div style={{fontFamily:"monospace",fontSize:"11px",color:doneItems.length===BOOKING.length?GRN:GOLD}}>{doneItems.length}/{BOOKING.length} done</div>
      <button onClick={()=>setCal(v=>!v)} style={{padding:"4px 10px",background:cal?"#F8EED4":"transparent",border:"1px solid "+BORD,borderRadius:"4px",fontFamily:"monospace",fontSize:"10px",color:GOLD,cursor:"pointer"}}>{cal?"List":"Timeline"}</button>
    </div>
    {cal?groups.map((g,i)=><div key={i} style={{marginBottom:"20px"}}><div style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:uC[g.u]+"10",border:"1px solid "+uC[g.u]+"30",borderLeft:"4px solid "+uC[g.u],borderRadius:"0 6px 6px 0",marginBottom:"8px"}}><span style={{fontSize:"13px",color:DARK}}>{g.label}</span><span style={{fontFamily:"monospace",fontSize:"10px",color:g.items.filter(b=>!done[b.name]).length>0?uC[g.u]:GRN}}>{g.items.filter(b=>!done[b.name]).length>0?g.items.filter(b=>!done[b.name]).length+" to do":"done"}</span></div>{g.items.map((b,j)=><Card key={j} b={b}/>)}</div>):<><>{pending.map((b,i)=><Card key={i} b={b}/>)}</>{doneItems.length>0&&<><div style={{fontFamily:"monospace",fontSize:"9px",color:GRN,letterSpacing:"0.12em",textTransform:"uppercase",margin:"16px 0 8px"}}>Booked ({doneItems.length})</div>{doneItems.map((b,i)=><Card key={i} b={b}/>)}</>}</>}
  </div>;
}
function MapView() {
  const [city,setCity]=useState("All");
  const [cat,setCat]=useState("all");
  const [meal,setMeal]=useState("all");
  const cities=["All","Tokyo","Kyoto","Naoshima","Teshima","Miyajima","Hiroshima"];
  const meals=[{id:"all",label:"All"},{id:"lunch",label:"Lunch"},{id:"dinner",label:"Dinner"},{id:"both",label:"Lunch+Dinner"},{id:"bar",label:"Bar"},{id:"coffee",label:"Coffee"},{id:"shop",label:"Shop"},{id:"visit",label:"Visit"}];
  const filtered=PLACES.filter(p=>{
    if(city!=="All"&&p.city!==city) return false;
    if(cat!=="all"&&p.cat!==cat) return false;
    if(meal!=="all"){if(meal==="lunch"&&p.meal!=="lunch"&&p.meal!=="both") return false;if(meal==="dinner"&&p.meal!=="dinner"&&p.meal!=="both") return false;if(meal!=="lunch"&&meal!=="dinner"&&p.meal!==meal) return false;}
    return true;
  });
  function Pill({active,onClick,label,color}) {
    const isY=color==="#FACC15",isLP=color==="#FF85C2";
    const atc=(isY||isLP)?(isY?"#713F12":"#8B1A5A"):"#fff";
    return <button onClick={onClick} style={{padding:"4px 9px",borderRadius:"20px",border:"2px solid "+(color||BORD),background:active?(color||DARK):"transparent",color:active?atc:(color||MID),fontFamily:"monospace",fontSize:"9px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontWeight:active?"700":"500",transition:"all 0.12s"}}>{label}</button>;
  }
  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{fontSize:"17px",color:DARK,fontStyle:"italic",marginBottom:"4px"}}>All places</div>
    <div style={{fontSize:"11px",color:MID,fontStyle:"italic",marginBottom:"12px"}}>{filtered.length} places · tap name to open in Maps</div>
    <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"8px"}}>{cities.map(c=><Pill key={c} active={city===c} onClick={()=>setCity(c)} label={c} color={DARK}/>)}</div>
    <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"8px"}}>{meals.map(m=><Pill key={m.id} active={meal===m.id} onClick={()=>setMeal(m.id)} label={m.label} color={GOLD}/>)}</div>
    <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"12px"}}><Pill active={cat==="all"} onClick={()=>setCat("all")} label="All" color={DARK}/>{CATS.filter(c=>c.id!=="all").map(c=><Pill key={c.id} active={cat===c.id} onClick={()=>setCat(c.id)} label={c.label} color={CAT_COLORS[c.id]}/>)}</div>
    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>{filtered.length===0?<div style={{color:MID,fontStyle:"italic",textAlign:"center",padding:"2rem 0"}}>No places match.</div>:filtered.map((p,i)=><div key={i} style={{display:"flex",gap:"10px",padding:"10px 12px",background:CAT_BG[p.cat]||CARD,border:"1px solid "+((CAT_COLORS[p.cat]||MID)+"44"),borderLeft:"4px solid "+(CAT_COLORS[p.cat]||MID),borderRadius:"6px"}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginBottom:"3px"}}><PL name={p.name} style={{fontSize:"13px",fontWeight:"500",color:CAT_TEXT[p.cat]||"#1A3A7A"}}/><span style={{fontFamily:"monospace",fontSize:"9px",background:CAT_COLORS[p.cat]||MID,color:"#fff",borderRadius:"10px",padding:"2px 8px",fontWeight:"600"}}>{p.city} · {p.meal}</span></div>
        {p.note&&<div style={{fontSize:"11px",color:MID,lineHeight:1.4}}>{p.note}</div>}
      </div>
    </div>)}</div>
  </div>;
}
function PlanView({days,selections,musts,notes}) {
  const kept=days.flatMap(day=>day.choices.flatMap(ch=>ch.options.filter(o=>selections[o.id]==="kept").map(o=>({...o,date:day.date}))));
  const mustItems=days.flatMap(day=>[...day.fixed.filter(f=>musts[f.id]).map(f=>({name:f.name,date:day.date})),...day.choices.flatMap(ch=>ch.options.filter(o=>musts[o.id]).map(o=>({name:o.name,date:day.date})))]);
  return <div style={{padding:"1rem 1rem 5rem"}}>
    {mustItems.length>0&&<div style={{marginBottom:"20px",padding:"12px",background:"#FAEAE6",border:"1px solid "+RED+"40",borderLeft:"4px solid "+RED,borderRadius:"0 8px 8px 0"}}><div style={{fontFamily:"monospace",fontSize:"9px",color:RED,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px"}}>Must not miss</div>{mustItems.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}><span style={{fontFamily:"monospace",fontSize:"9px",color:RED,width:"44px"}}>{m.date}</span><PL name={m.name} style={{fontSize:"13px"}}/></div>)}</div>}
    <div style={{fontSize:"17px",color:DARK,fontStyle:"italic",marginBottom:"12px"}}>Your confirmed choices</div>
    {kept.length===0?<div style={{color:MID,fontStyle:"italic",textAlign:"center",padding:"2rem 0"}}>No choices confirmed yet. Go to Build and tap options.</div>:<div>{DAYS.map(td=>{
      const dk=kept.filter(k=>k.date===td.date),note=notes[td.date];
      if(!dk.length&&!note) return null;
      return <div key={td.date} style={{marginBottom:"16px",padding:"12px 14px",background:CARD,border:"1px solid "+BORD,borderRadius:"8px"}}>
        <div style={{fontFamily:"monospace",fontSize:"9px",color:GOLD,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"4px"}}>{td.date}</div>
        <div style={{fontSize:"14px",color:DARK,fontWeight:"500",marginBottom:"10px"}}>{td.title}</div>
        <div style={{marginBottom:"8px"}}>
          {td.fixed?.map((f,i)=><div key={i} style={{display:"flex",gap:"8px",padding:"4px 0",fontSize:"12px",color:DARK}}>
            <span style={{fontFamily:"monospace",fontSize:"9px",color:MID,minWidth:"48px",flexShrink:0,paddingTop:"2px"}}>{f.time}</span>
            <div><div style={{fontWeight:"500"}}>{f.name}</div>{f.note&&<div style={{fontSize:"11px",color:MID,fontStyle:"italic",lineHeight:1.4}}>{f.note}</div>}</div>
          </div>)}
        </div>
        {dk.length>0&&<div style={{borderTop:"1px solid "+BORD,paddingTop:"8px",marginTop:"4px"}}>
          <div style={{fontFamily:"monospace",fontSize:"9px",color:GRN,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"6px"}}>Confirmed choices</div>
          {dk.map((item,i)=><div key={i} style={{paddingLeft:"12px",borderLeft:"2px solid "+GOLD,marginBottom:"6px"}}><PL name={item.name} style={{fontSize:"13px"}}/></div>)}
        </div>}
        {note&&<div style={{marginTop:"8px",fontSize:"12px",color:DARK,fontStyle:"italic",lineHeight:1.6,padding:"8px",background:PALE,borderRadius:"4px",whiteSpace:"pre-wrap"}}>{note}</div>}
      </div>;
    })}</div>}
  </div>;
}
function BuysView() {
  const [checked,setChecked]=useState({});
  const [custom,setCustom]=useState([]);
  const [addOpen,setAddOpen]=useState(false);
  const [newName,setNewName]=useState("");
  const [newNote,setNewNote]=useState("");
  const [newCity,setNewCity]=useState("Tokyo");
  const [newPhoto,setNewPhoto]=useState(null);

  useEffect(()=>{
    window.storage?.get("jp26_buys")?.then(r=>{if(r?.value){const d=JSON.parse(r.value);setChecked(d.checked||{});setCustom(d.custom||[]);}}).catch(()=>{});
  },[]);

  useEffect(()=>{
    window.storage?.set("jp26_buys",JSON.stringify({checked,custom}))?.catch(()=>{});
  },[checked,custom]);

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => setNewPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  function addCustomItem() {
    if(!newName.trim()) return;
    const item = {id:"cust_"+Date.now(), name:newName.trim(), note:newNote.trim(), city:newCity, photo:newPhoto};
    setCustom(prev=>[...prev,item]);
    setNewName(""); setNewNote(""); setNewCity("Tokyo"); setNewPhoto(null); setAddOpen(false);
  }

  const total = BUYS.reduce((a,c)=>a+c.items.length,0) + custom.length;
  const done = Object.values(checked).filter(Boolean).length;

  function Item({k, name, note, city, photo, onDelete}) {
    const isDone = checked[k];
    return <div style={{display:"flex",gap:"10px",padding:"10px 12px",marginBottom:"4px",background:isDone?"#EEF6EE":CARD,border:"1px solid "+(isDone?"#C8DCC8":BORD),borderRadius:"6px",minHeight:"44px"}}>
      <div onClick={()=>setChecked(p=>({...p,[k]:!p[k]}))} style={{width:"15px",height:"15px",borderRadius:"3px",border:"1.5px solid "+(isDone?GRN:"#BCB4A8"),background:isDone?GRN:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px",cursor:"pointer"}}>{isDone&&<span style={{color:"#fff",fontSize:"9px",fontWeight:"bold"}}>✓</span>}</div>
      {photo&&<div style={{width:"48px",height:"48px",borderRadius:"6px",overflow:"hidden",flexShrink:0,alignSelf:"center"}}><img src={photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
      <div onClick={()=>setChecked(p=>({...p,[k]:!p[k]}))} style={{flex:1,cursor:"pointer"}}>
        <div style={{fontSize:"13px",color:isDone?MID:DARK,textDecoration:isDone?"line-through":"none",marginBottom:"2px"}}>{name}</div>
        {note&&<div style={{fontSize:"11px",color:MID,lineHeight:1.4,fontStyle:"italic"}}>{note}</div>}
        {city&&<div style={{fontFamily:"monospace",fontSize:"9px",color:GOLD,marginTop:"3px"}}>{city}</div>}
      </div>
      {onDelete&&<button onClick={onDelete} style={{background:"none",border:"none",cursor:"pointer",color:"#D0C8BC",fontSize:"14px",padding:"0 4px",alignSelf:"flex-start",flexShrink:0}}>✕</button>}
    </div>;
  }

  return <div style={{padding:"1rem 1rem 5rem"}}>
    <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"4px"}}>
      <div style={{fontSize:"17px",color:DARK,fontStyle:"italic"}}>Things to buy</div>
      <div style={{fontFamily:"monospace",fontSize:"11px",color:done===total?GRN:GOLD}}>{done}/{total} ticked</div>
    </div>
    <div style={{fontSize:"11px",color:MID,fontStyle:"italic",marginBottom:"16px"}}>Tick as you buy. Add your own with a photo.</div>

    {BUYS.map((cat,ci)=><div key={ci} style={{marginBottom:"20px"}}>
      <div style={{fontSize:"13px",color:DARK,fontWeight:"500",marginBottom:"8px",paddingBottom:"6px",borderBottom:"1px solid "+BORD}}>{cat.cat}</div>
      {cat.items.map((item,ii)=><Item key={ci+"_"+ii} k={ci+"_"+ii} name={item.name} note={item.note} city={item.city}/>)}
    </div>)}

    {custom.length>0&&<div style={{marginBottom:"20px"}}>
      <div style={{fontSize:"13px",color:DARK,fontWeight:"500",marginBottom:"8px",paddingBottom:"6px",borderBottom:"1px solid "+BORD}}>📸 Your additions</div>
      {custom.map((item,i)=><Item key={item.id} k={"custom_"+item.id} name={item.name} note={item.note} city={item.city} photo={item.photo} onDelete={()=>setCustom(prev=>prev.filter(c=>c.id!==item.id))}/>)}
    </div>}

    {addOpen?<div style={{padding:"12px",background:"#F5F0E8",border:"1px dashed #D4C4A8",borderRadius:"8px",marginBottom:"16px"}}>
      <div style={{fontFamily:"monospace",fontSize:"9px",color:MID,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"10px"}}>Add something to buy</div>
      <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="What is it?" style={{width:"100%",padding:"8px 10px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"13px",color:DARK,outline:"none",marginBottom:"8px",boxSizing:"border-box"}}/>
      <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Note (optional)" style={{width:"100%",padding:"8px 10px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",fontFamily:"inherit",fontSize:"13px",color:DARK,outline:"none",marginBottom:"8px",boxSizing:"border-box"}}/>
      <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
        {["Tokyo","Kyoto","Naoshima","Airport","Both"].map(c=><button key={c} onClick={()=>setNewCity(c)} style={{padding:"5px 10px",borderRadius:"20px",border:"1px solid "+(newCity===c?GOLD:BORD),background:newCity===c?GOLD:"transparent",color:newCity===c?"#fff":MID,fontFamily:"monospace",fontSize:"10px",cursor:"pointer"}}>{c}</button>)}
      </div>
      <div style={{marginBottom:"10px"}}>
        <label style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:CARD,border:"1px solid "+BORD,borderRadius:"6px",cursor:"pointer"}}>
          <span style={{fontSize:"20px"}}>📷</span>
          <div>
            <div style={{fontSize:"13px",color:DARK}}>{newPhoto?"Photo added ✓":"Add a photo"}</div>
            <div style={{fontSize:"11px",color:MID}}>Take a photo or choose from library</div>
          </div>
          <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{display:"none"}}/>
        </label>
        {newPhoto&&<img src={newPhoto} alt="" style={{width:"80px",height:"80px",objectFit:"cover",borderRadius:"6px",marginTop:"8px",border:"1px solid "+BORD}}/>}
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={addCustomItem} disabled={!newName.trim()} style={{flex:1,padding:"10px",background:newName.trim()?GOLD:"#D8D2C8",color:"#fff",border:"none",borderRadius:"6px",fontFamily:"monospace",fontSize:"11px",cursor:newName.trim()?"pointer":"default"}}>Add to list</button>
        <button onClick={()=>{setAddOpen(false);setNewName("");setNewNote("");setNewPhoto(null);}} style={{padding:"10px 14px",background:"transparent",border:"1px solid "+BORD,borderRadius:"6px",color:MID,cursor:"pointer",fontSize:"12px"}}>Cancel</button>
      </div>
    </div>:<button onClick={()=>setAddOpen(true)} style={{width:"100%",padding:"12px",background:"transparent",border:"1px dashed #D4C4A8",borderRadius:"8px",fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em",textTransform:"uppercase",color:MID,cursor:"pointer",marginBottom:"16px"}}>📷 + Add your own with photo</button>}
  </div>;
}

// Root app
export default function App() {
  const [days,setDays]=useState(DAYS);
  const [selections,setSelections]=useState({});
  const [musts,setMusts]=useState({});
  const [scratched,setScratched]=useState({});
  const [hiddenFixed,setHiddenFixed]=useState({});
  const [notes,setNotes]=useState({});
  
  const [view,setView]=useState("build");
  const [shareMode,setShareMode]=useState(false);
  const [syncStatus,setSyncStatus]=useState(null);
  const [booked,setBooked]=useState({});
  const [editMode,setEditMode]=useState(false);
  const SKEY="jp26_shared_v1";
  useEffect(()=>{
    const load=(d)=>{
      if(d.selections) setSelections(d.selections);
      if(d.musts) setMusts(d.musts);
      if(d.scratched) setScratched(d.scratched);
      if(d.hiddenFixed) setHiddenFixed(d.hiddenFixed);
      if(d.notes) setNotes(d.notes);
      if(d.booked) setBooked(d.booked);
      if(d.days) setDays(d.days);
    };
    if(window.storage){
      window.storage?.get(KEY).then(r=>{if(r?.value)load(JSON.parse(r.value));}).catch(()=>{});
    } else {
      try{const s=localStorage.getItem(KEY);if(s)load(JSON.parse(s));}catch(e){}
    }
  },[]);
  useEffect(()=>{
    const data=JSON.stringify({selections,musts,scratched,hiddenFixed,notes,booked,days});
    if(window.storage){window.storage.set(KEY,data).catch(()=>{});}
    else{try{localStorage.setItem(KEY,data);}catch(e){}}
  },[selections,musts,scratched,hiddenFixed,notes,booked,days]);
  useEffect(()=>{
    if(!shareMode) return;
    setSyncStatus("syncing");
    window.storage?.set(SKEY,JSON.stringify({selections,musts,notes}),true)?.then(()=>setSyncStatus("synced"))?.catch(()=>setSyncStatus("error"));
  },[selections,musts,notes,shareMode]);
  useEffect(()=>{
    if(!shareMode) return;
    const iv=setInterval(async()=>{
      try{const r=await window.storage?.get(SKEY,true);if(r?.value){const d=JSON.parse(r.value);setSelections(prev=>{const m={...d.selections};Object.entries(prev).forEach(([k,v])=>{if(v!=="neutral")m[k]=v;});return m;});}}catch(e){}
    },8000);
    return ()=>clearInterval(iv);
  },[shareMode]);
  const kept=days.flatMap(day=>day.choices.flatMap(ch=>ch.options.filter(o=>selections[o.id]==="kept").map(o=>({...o,date:day.date}))));
  const mustCount=Object.values(musts).filter(Boolean).length;
  const archiveCount=Object.values(scratched).filter(Boolean).length;
  return <div style={{fontFamily:"Georgia, serif",background:PALE,color:DARK,minHeight:"100vh",maxWidth:"100%",fontSize:"15px",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
    <div style={{padding:"12px 16px 0",background:"#EDE7DC",borderBottom:"1px solid "+BORD}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"6px"}}>
        <div><div style={{fontFamily:"monospace",fontSize:"10px",color:GOLD,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"2px"}}>Alicia & Arthur · Japan · Nov 2026</div><div style={{fontSize:"18px",color:DARK,fontStyle:"italic"}}>Interactive Itinerary Planner</div></div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px",paddingTop:"2px"}}>
          <button onClick={()=>setEditMode(e=>!e)} style={{padding:"5px 10px",background:editMode?"#6B8F71":"transparent",border:"1px solid "+(editMode?"#6B8F71":BORD),borderRadius:"20px",fontFamily:"monospace",fontSize:"10px",color:editMode?"#fff":MID,cursor:"pointer"}}>{editMode?"✏️ Editing":"✏️ Edit"}</button>
          <button onClick={()=>setShareMode(s=>!s)} style={{padding:"5px 10px",background:shareMode?GRN:"transparent",border:"1px solid "+(shareMode?GRN:BORD),borderRadius:"20px",fontFamily:"monospace",fontSize:"10px",color:shareMode?"#fff":MID,cursor:"pointer"}}>{shareMode?"Sharing ON":"Share w/ Arthur"}</button>
          {shareMode&&syncStatus&&<div style={{fontFamily:"monospace",fontSize:"9px",color:syncStatus==="synced"?GRN:syncStatus==="error"?RED:GOLD}}>{syncStatus==="syncing"?"syncing…":syncStatus==="synced"?"synced":"deploy to bolt.new"}</div>}
        </div>
      </div>
      <Tabs view={view} setView={setView} counts={{must:mustCount,archive:archiveCount,plan:kept.length}}/>
    </div>
    <div>
      {view==="today"&&<TodayView notes={notes} setNotes={setNotes} kept={kept}/>}
      {view==="build"&&<BuildView days={days} setDays={setDays} selections={selections} setSelections={setSelections} musts={musts} setMusts={setMusts} scratched={scratched} setScratched={setScratched} hiddenFixed={hiddenFixed} setHiddenFixed={setHiddenFixed} notes={notes} setNotes={setNotes} editMode={editMode} booked={booked} setBooked={setBooked}/>}
      {view==="must"&&<MustView days={days} selections={selections} musts={musts} setMusts={setMusts}/>}
      {view==="archive"&&<ArchiveView days={days} scratched={scratched} setScratched={setScratched}/>}
      {view==="pack"&&<PackView/>}
      {view==="book"&&<BookingView/>}
      {view==="map"&&<MapView/>}
      {view==="buys"&&<BuysView/>}
      {view==="plan"&&<PlanView days={days} selections={selections} musts={musts} notes={notes}/>}
    </div>
  </div>;
}
