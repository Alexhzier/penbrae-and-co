/**
 * PENBRAE & CO LTD — LOCAL PREVIEW SERVER
 * Serves the CSS/JS/Image assets and templates of `wp-content/themes/penbrae/`.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3847;
const THEME_DIR = path.join(__dirname, '..', 'wp-content', 'themes', 'penbrae');

const STALLS = {
  teas: {
    slug: 'teas',
    number: 'STALL I',
    kicker: 'STALL I · CALM, CEREMONIAL, DELICATE, CONTEMPLATIVE',
    title: 'The Tea Stall',
    mood: 'Calm, ceremonial, delicate, contemplative.',
    deck: 'Single-harvest orthodox Assamica, high-altitude white buds, and bamboo-smoked reserve lots from Upper Assam and Arunachal Pradesh.',
    region: 'Dibrugarh, Tinsukia & Lohit Valley',
    elevation: '140m – 1,680m ASL',
    craft: 'Withered on woven bamboo trays & hand-rolled',
    season: 'Second Flush & Autumnal Tippy Flush',
    heroImg: '/assets/images/stall-tea-orthodox.jpg'
  },
  spices: {
    slug: 'spices',
    number: 'STALL II',
    kicker: 'STALL II · WARM, TEXTURED, AROMATIC, EXPRESSIVE',
    title: 'The Spice Stall',
    mood: 'Warm, textured, aromatic, expressive.',
    deck: 'High-curcumin single-origin Lakadong turmeric, sun-cured Sohra hill ginger, and citrus-husked wild canopy peppers.',
    region: 'West Jaintia Hills, Sohra & Ziro Valley',
    elevation: '950m – 1,680m ASL',
    craft: 'Limestone upland cultivation & bamboo-mat sun-curing',
    season: 'Winter Rhizome & Autumn Canopy Harvest',
    heroImg: '/assets/images/stall-spice-lakadong.jpg'
  },
  chillies: {
    slug: 'chillies',
    number: 'STALL III',
    kicker: 'STALL III · BOLD, ENERGETIC, INTENSE, SOPHISTICATED',
    title: 'The Chilli Stall',
    mood: 'Bold, energetic, intense, sophisticated.',
    deck: 'Alder-smoked Naga King Chilli (Raja Mircha) from Mon District and sun-ripened crimson Hathei chillies from Ukhrul Ridge.',
    region: 'Mon District (Nagaland) & Ukhrul (Manipur)',
    elevation: '1,350m – 1,750m ASL',
    craft: 'Alder-hearth smoke lofts & ridge sun-drying',
    season: 'Late Monsoon & Post-Monsoon Harvest',
    heroImg: '/assets/images/stall-chilli-smoked.jpg'
  }
};

const PRODUCTS = {
  'upper-assam-tippy-orthodox': {
    slug: 'upper-assam-tippy-orthodox',
    lot: 'LOT 26-A',
    stall: 'teas',
    title: 'Upper Assam Tippy Orthodox Reserve',
    latin: 'Camellia sinensis var. assamica',
    region: 'Dibrugarh District, Upper Assam',
    regionFilter: 'assam',
    elevation: '140m ASL',
    elevationNum: 140,
    harvest: 'Late November (Autumnal Tippy Flush)',
    price: 28.00,
    weight: '75g Archival Caddy',
    img: '/assets/images/stall-tea-orthodox.jpg',
    imgVessel: '/assets/images/tea-infusion-cup.jpg',
    imgOrigin: '/assets/images/hero-assam-mist.jpg',
    tasting: 'Toasted malt, dark heather honey, stewed orchard plum, clean mineral finish.',
    prep: '3.5g leaf per 250ml spring water at 92°C. Infuse for 3 minutes 30 seconds; yields three distinct infusions.',
    description: 'Hand-plucked two leaves and a downy bud from smallholder gardens along the southern bank of the Brahmaputra in Dibrugarh. Withered on woven bamboo trays and gently rolled to preserve unbroken golden tips.',
    makerSlug: 'upper-assam-orthodox-collective',
    makerName: 'Brahmaputra Smallholder Tea Collective',
    storySlug: 'mist-over-the-brahmaputra-autumn-pluck',
    storyTitle: 'Mist Over the Brahmaputra: The Autumn Tippy Pluck',
    journalSlug: 'orthodox-vs-ctc-assam-leaf'
  },
  'singpho-bamboo-smoked-tea': {
    slug: 'singpho-bamboo-smoked-tea',
    lot: 'LOT 26-B',
    stall: 'teas',
    title: 'Singpho Hearth-Smoked Bamboo Tea (Phalap)',
    latin: 'Camellia sinensis var. assamica (Indigenous Forest Jat)',
    region: 'Margherita & Lohit Border, Upper Assam / Arunachal',
    regionFilter: 'assam arunachal',
    elevation: '380m ASL',
    elevationNum: 380,
    harvest: 'Post-Monsoon Hearth Cure',
    price: 34.00,
    weight: '60g Pressed Bamboo Section',
    img: '/assets/images/tea-bamboo-smoked.jpg',
    imgVessel: '/assets/images/tea-infusion-cup.jpg',
    imgOrigin: '/assets/images/journal-preservation-loft.jpg',
    tasting: 'Roasted green bamboo internode, sweet woodsmoke, dried apricot, zero bitterness.',
    prep: 'Break 4g of compressed leaf with a tea needle; infuse in 95°C water for 4 minutes in clay or porcelain.',
    description: 'Crafted following ancestral Singpho methodology: pan-fired indigenous Assamica leaf is tamped into hollow green bamboo internodes and cured slowly above the domestic hearth.',
    makerSlug: 'upper-assam-orthodox-collective',
    makerName: 'Brahmaputra Smallholder Tea Collective',
    storySlug: 'mist-over-the-brahmaputra-autumn-pluck',
    storyTitle: 'Mist Over the Brahmaputra: The Autumn Tippy Pluck',
    journalSlug: 'smoke-mist-and-limestone-terroir'
  },
  'namdapha-wild-forest-white-tea': {
    slug: 'namdapha-wild-forest-white-tea',
    lot: 'LOT 26-H',
    stall: 'teas',
    title: 'Namdapha High-Canopy Silver Bud White Tea',
    latin: 'Camellia sinensis var. assamica (Wild Forest Jat)',
    region: 'Namdapha & Patkai Foothills, Arunachal Pradesh',
    regionFilter: 'arunachal nagaland',
    elevation: '1,520m ASL',
    elevationNum: 1520,
    harvest: 'Early Spring Canopy Pluck',
    price: 36.00,
    weight: '50g Archival Caddy',
    img: '/assets/images/tea-infusion-cup.jpg',
    imgVessel: '/assets/images/stall-tea-orthodox.jpg',
    imgOrigin: '/assets/images/hero-assam-mist.jpg',
    tasting: 'Wild mountain pear, white honey, crushed bamboo leaf, cool mineral finish.',
    prep: '3g buds per 220ml spring water at 84°C. Infuse for 3 minutes; yields four infusions.',
    description: 'Hand-gathered unopened silver-downy terminal buds from tall forest-margin Assamica trees along the Patkai and Namdapha uplands, sun-withered on elevated bamboo trays.',
    makerSlug: 'ziro-valley-forest-foragers',
    makerName: 'Lower Subansiri Forest Foragers',
    storySlug: 'mist-over-the-brahmaputra-autumn-pluck',
    storyTitle: 'Mist Over the Brahmaputra: The Autumn Tippy Pluck',
    journalSlug: 'orthodox-vs-ctc-assam-leaf'
  },
  'lakadong-turmeric-reserve': {
    slug: 'lakadong-turmeric-reserve',
    lot: 'LOT 26-D',
    stall: 'spices',
    title: 'Single-Harvest Lakadong Rhizome Reserve',
    latin: 'Curcuma longa (Lakadong Heirloom Ecotype)',
    region: 'West Jaintia Hills, Meghalaya',
    regionFilter: 'meghalaya',
    elevation: '1,280m ASL',
    elevationNum: 1280,
    harvest: 'January – February Dry Uplands Harvest',
    price: 18.50,
    weight: '80g UV-Opaque Glass Jar',
    img: '/assets/images/stall-spice-lakadong.jpg',
    imgVessel: '/assets/images/spice-hill-ginger.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    tasting: 'Vibrant saffron-amber pigment, fresh ginger blossom, warm resinous earth, bright citrus peel.',
    prep: 'Bloom 1/2 tsp in warm ghee or cold-pressed oil for 20 seconds before adding liquids, or steep with cracked black pepper.',
    description: 'Grown without synthetic inputs in the limestone-rich soils of Laskein Block in the West Jaintia Hills. Hand-washed, sliced onto woven bamboo mats, and sun-cured before small-batch stone milling.',
    makerSlug: 'jaintia-hills-lakadong-growers',
    makerName: 'West Jaintia Hills Lakadong Growers',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    storyTitle: 'Limestone & Curcumin: Winter Harvest in the West Jaintia Hills',
    journalSlug: 'tempering-lakadong-and-smoked-chilli'
  },
  'sohra-hill-ginger': {
    slug: 'sohra-hill-ginger',
    lot: 'LOT 26-G',
    stall: 'spices',
    title: 'Sohra Sun-Cured Hill Ginger (Ing Makhir)',
    latin: 'Zingiber officinale var. rubrum',
    region: 'Sohra (Cherrapunji) Escarpment, Meghalaya',
    regionFilter: 'meghalaya assam',
    elevation: '1,420m ASL',
    elevationNum: 1420,
    harvest: 'December Escarpment Harvest',
    price: 16.00,
    weight: '70g Archival Tin',
    img: '/assets/images/spice-hill-ginger.jpg',
    imgVessel: '/assets/images/stall-spice-lakadong.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    tasting: 'Concentrated lemon-verbena top note, fiery gingerol warmth, lingering pine-honey sweetness.',
    prep: 'Crush slices in a mortar for Masala Chai, broths, or slow-braised meats.',
    description: 'Tiny, fibrous heirloom rhizomes prized across the Khasi Hills for their extraordinary volatile oil content and citrus-forward pungency.',
    makerSlug: 'jaintia-hills-lakadong-growers',
    makerName: 'West Jaintia Hills Lakadong Growers',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    storyTitle: 'Limestone & Curcumin: Winter Harvest in the West Jaintia Hills',
    journalSlug: 'tempering-lakadong-and-smoked-chilli'
  },
  'arunachal-wild-hill-pepper': {
    slug: 'arunachal-wild-hill-pepper',
    lot: 'LOT 26-E',
    stall: 'spices',
    title: 'Arunachal Citrus-Husk Wild Hill Pepper',
    latin: 'Zanthoxylum rhetsa / Zanthoxylum armatum',
    region: 'Ziro Valley, Lower Subansiri, Arunachal Pradesh',
    regionFilter: 'arunachal manipur',
    elevation: '1,680m ASL',
    elevationNum: 1680,
    harvest: 'October Canopy Harvest',
    price: 21.00,
    weight: '45g Whole Pericarp Husks',
    img: '/assets/images/spice-wild-pepper.jpg',
    imgVessel: '/assets/images/stall-spice-lakadong.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    tasting: 'Crushed kaffir lime leaf, grapefruit zest, resinous pine needle, gentle tingling numbing finish.',
    prep: 'Toast dry husks lightly for 30 seconds and crush in a stone mortar immediately before serving.',
    description: 'Foraged from sub-Himalayan forest margins surrounding Ziro Valley. Sun-dried until the dark seed separates, leaving only the aromatic citrus-scented pericarp husk.',
    makerSlug: 'ziro-valley-forest-foragers',
    makerName: 'Lower Subansiri Forest Foragers',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    storyTitle: 'Limestone & Curcumin: Winter Harvest in the West Jaintia Hills',
    journalSlug: 'smoke-mist-and-limestone-terroir'
  },
  'alder-smoked-naga-king-chilli': {
    slug: 'alder-smoked-naga-king-chilli',
    lot: 'LOT 26-C',
    stall: 'chillies',
    title: 'Whole Alder-Smoked Naga King Chilli Pods',
    latin: 'Capsicum chinense (Raja Mircha)',
    region: 'Mon District, Nagaland',
    regionFilter: 'nagaland',
    elevation: '1,460m ASL',
    elevationNum: 1460,
    harvest: 'Late Monsoon Hearth-Loft Cure',
    price: 22.00,
    weight: '40g Sealed Glass Jar',
    img: '/assets/images/stall-chilli-smoked.jpg',
    imgVessel: '/assets/images/chilli-hathei-crimson.jpg',
    imgOrigin: '/assets/images/journal-preservation-loft.jpg',
    scoville: '850,000+ SHU (High Heat · Deep Smoke)',
    tasting: 'Smouldering alder wood, dried sour cherry, black cardamom, slow-building volcanic warmth.',
    prep: 'Steep a 1cm ribbon of pod in simmering broths, dals, or chilli oils; remove before serving for gentle infusion, or pound whole for intense heat.',
    description: 'Cultivated in rotational jhum hill plots alongside nitrogen-fixing Himalayan alder trees in Mon District, then cured for fourteen days on bamboo racks above domestic alder-wood hearths.',
    makerSlug: 'nagaland-alder-smoke-stewards',
    makerName: 'Mon District Alder-Smoke Chilli Stewards',
    storySlug: 'alder-smoke-and-monsoon-mist',
    storyTitle: 'Alder Smoke & Monsoon Mist: Curing Raja Mircha in Mon District',
    journalSlug: 'alder-trees-and-jhum-agroforestry'
  },
  'sirarakhong-hathei-chilli': {
    slug: 'sirarakhong-hathei-chilli',
    lot: 'LOT 26-F',
    stall: 'chillies',
    title: 'Sirarakhong Sun-Cured Hathei Crimson Chilli',
    latin: 'Capsicum annuum (Sirarakhong Hathei Landrace)',
    region: 'Sirarakhong Village, Ukhrul District, Manipur',
    regionFilter: 'manipur',
    elevation: '1,750m ASL',
    elevationNum: 1750,
    harvest: 'September – October Ridge Sun-Cure',
    price: 20.00,
    weight: '65g Coarse Flakes & Whole Pods',
    img: '/assets/images/chilli-hathei-crimson.jpg',
    imgVessel: '/assets/images/stall-chilli-smoked.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    scoville: '35,000 SHU (Moderate Warmth · High Colour)',
    tasting: 'Sun-dried red bell fruitiness, toasted carob, sweet tamarind, brilliant natural crimson staining.',
    prep: 'Bloom generously in warm oil to impart a deep ruby-red colour and sweet, rounded fruitiness without overwhelming heat.',
    description: 'Grown exclusively on the mineral-rich shale slopes surrounding Sirarakhong village in Manipur’s Ukhrul District, where cool mountain air and bright autumn sunshine produce an unmatched natural carotene depth.',
    makerSlug: 'ukhrul-hathei-cultivators',
    makerName: 'Ukhrul Ridge Hathei Cultivator Guild',
    storySlug: 'alder-smoke-and-monsoon-mist',
    storyTitle: 'Alder Smoke & Monsoon Mist: Curing Raja Mircha in Mon District',
    journalSlug: 'tempering-lakadong-and-smoked-chilli'
  },
  'barak-valley-smoked-birdseye': {
    slug: 'barak-valley-smoked-birdseye',
    lot: 'LOT 26-I',
    stall: 'chillies',
    title: 'Upland Sun-Cured Bird’s-Eye Forest Chilli',
    latin: 'Capsicum frutescens (Sohmynken Beb Landrace)',
    region: 'Khasi & Barak Uplands, Meghalaya / Manipur Border',
    regionFilter: 'meghalaya manipur nagaland',
    elevation: '1,180m ASL',
    elevationNum: 1180,
    harvest: 'November Escarpment Sun-Cure',
    price: 19.50,
    weight: '55g Sealed Glass Jar',
    img: '/assets/images/stall-chilli-smoked.jpg',
    imgVessel: '/assets/images/chilli-hathei-crimson.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    scoville: '140,000 SHU (Crisp Citrus Heat)',
    tasting: 'Bright calamansi peel, wild red berry, crisp vertical heat, clean finish.',
    prep: 'Crush two whole pods in a stone mortar with salt, ginger, and fermented bamboo shoot or infuse into warm oil.',
    description: 'Tiny, upward-pointing heirloom forest chillies cultivated on terraced limestone and shale ridges, prized for their bright citrus aromatics and immediate, clean heat.',
    makerSlug: 'ukhrul-hathei-cultivators',
    makerName: 'Ukhrul Ridge Hathei Cultivator Guild',
    storySlug: 'alder-smoke-and-monsoon-mist',
    storyTitle: 'Alder Smoke & Monsoon Mist: Curing Raja Mircha in Mon District',
    journalSlug: 'tempering-lakadong-and-smoked-chilli'
  }
};

function renderHeader(activePath, bodyClass = '') {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Penbrae &amp; Co Ltd — Rare Teas, Spices &amp; Chillies from Northeast India (Cardiff)</title>
  <meta name="description" content="Penbrae & Co Ltd — Cardiff-based importers of rare, handcrafted teas, spices, and chillies from Northeast India.">
  <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="/assets/css/design-system.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main-content">Skip to main editorial content</a>

<div class="editorial-dispatch-bar" role="region" aria-label="Provenance and Dispatch Notice">
  <span>PENBRAE &amp; CO LTD · CARDIFF, WALES — SMALL-LOT IMPORTERS OF NORTHEAST INDIAN TEAS, SPICES &amp; CHILLIES</span>
  <span class="editorial-dispatch-bar__coords">51°28′N 03°10′W ↔ 26°12′N 92°56′E · CURRENCY: GBP (£)</span>
</div>

<header class="site-masthead" role="banner">
  <div class="site-masthead__inner">
    <button type="button" class="mobile-menu-toggle" data-mobile-nav-toggle aria-expanded="false" aria-controls="penbrae-mobile-drawer">
      Index [≡]
    </button>

    <nav aria-label="Primary Editorial Navigation">
      <ul class="site-nav-primary">
        <li><a href="/stalls" ${activePath === '/stalls' ? 'aria-current="page"' : ''}>The Stalls</a></li>
        <li><a href="/stall/teas" ${activePath === '/stall/teas' ? 'aria-current="page"' : ''}>Teas</a></li>
        <li><a href="/stall/spices" ${activePath === '/stall/spices' ? 'aria-current="page"' : ''}>Spices</a></li>
        <li><a href="/stall/chillies" ${activePath === '/stall/chillies' ? 'aria-current="page"' : ''}>Chillies</a></li>
        <li><a href="/makers" ${activePath === '/makers' ? 'aria-current="page"' : ''}>Meet the Makers</a></li>
      </ul>
    </nav>

    <a href="/" class="site-brand" aria-label="Penbrae & Co Ltd — Home">
      <span class="site-brand__wordmark">Penbrae &amp; Co</span>
      <span class="site-brand__sub">Cardiff · Northeast India</span>
    </a>

    <div class="site-nav-utility">
      <a href="/journal" class="hide-mobile" ${activePath.startsWith('/journal') ? 'aria-current="page"' : ''}>Journal</a>
      <a href="/about" class="hide-mobile" ${activePath === '/about' ? 'aria-current="page"' : ''}>Provenance</a>
      <a href="/subscribe" class="hide-mobile" ${activePath === '/subscribe' ? 'aria-current="page"' : ''}>Dispatch</a>
      <a href="/my-account" class="hide-mobile" ${activePath === '/my-account' ? 'aria-current="page"' : ''}>Account</a>
      <button type="button" data-basket-open aria-label="Open shopping basket drawer">
        <span>Basket</span>
        <span class="basket-count-pill" data-basket-count>1</span>
      </button>
    </div>
  </div>

  <nav id="penbrae-mobile-drawer" class="mobile-nav-drawer" aria-label="Mobile Navigation Index" aria-hidden="true">
    <div class="kicker-index" style="margin-bottom:0.75rem;">Navigation Index — Products, Makers &amp; Stories</div>
    <ul class="mobile-nav-drawer__list">
      <li><a href="/stalls"><span>The Three Stalls Overview</span><span class="kicker-index">01</span></a></li>
      <li><a href="/stall/teas"><span>The Tea Stall</span><span class="kicker-index">Assam &amp; Arunachal</span></a></li>
      <li><a href="/stall/spices"><span>The Spice Stall</span><span class="kicker-index">Meghalaya &amp; Ziro</span></a></li>
      <li><a href="/stall/chillies"><span>The Chilli Stall</span><span class="kicker-index">Nagaland &amp; Manipur</span></a></li>
      <li><a href="/makers"><span>Meet the Makers (Interactive Atlas)</span><span class="kicker-index">Map</span></a></li>
      <li><a href="/story/mist-over-the-brahmaputra-autumn-pluck"><span>Product Provenance Stories</span><span class="kicker-index">Archive</span></a></li>
      <li><a href="/journal"><span>The Penbrae Journal</span><span class="kicker-index">Issue 01</span></a></li>
      <li><a href="/about"><span>About Penbrae &amp; Co</span><span class="kicker-index">Cardiff</span></a></li>
      <li><a href="/subscribe"><span>Subscribe to the Dispatch</span><span class="kicker-index">Letters</span></a></li>
      <li><a href="/basket"><span>Basket &amp; Checkout</span><span class="kicker-index">GBP £</span></a></li>
    </ul>
  </nav>
</header>

<div id="penbrae-basket-backdrop" class="basket-drawer-backdrop"></div>
<aside id="penbrae-basket-drawer" class="basket-drawer" role="dialog" aria-modal="true" aria-label="Shopping Basket Ledger" aria-hidden="true">
  <div class="basket-drawer__header">
    <div>
      <div class="kicker-index">CARDIFF DISPATCH LEDGER</div>
      <h2 style="font-size:1.55rem;margin:0.2rem 0 0 0;">Your Basket</h2>
    </div>
    <button type="button" data-basket-close class="filter-pill" aria-label="Close basket drawer">Close [×]</button>
  </div>
  <div id="penbrae-basket-drawer-items" class="basket-drawer__items"></div>
  <div class="basket-drawer__footer">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.5rem;">
      <span style="font-family:var(--font-mono);font-size:0.76rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">Estimated Subtotal (GBP)</span>
      <span id="penbrae-basket-drawer-subtotal" class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.75rem;">£28.00</span>
    </div>
    <p style="font-size:0.8rem;color:var(--color-ink-muted);margin-bottom:1rem;">
      UK shipping &amp; applicable taxes are calculated at checkout via configured WooCommerce shipping zones.
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
      <a href="/basket" class="btn-editorial btn-editorial--outline" style="justify-content:center;">View Basket</a>
      <a href="/checkout" class="btn-editorial" style="justify-content:center;">Checkout →</a>
    </div>
  </div>
</aside>

<main id="main-content" role="main">`;
}

function renderNonLinearCompass() {
  return `
<section class="provenance-compass" aria-label="Non-Linear Provenance Exploration">
  <div class="penbrae-container">
    <div class="provenance-compass__header">
      <div>
        <span class="kicker-index">NON-LINEAR PROVENANCE GRAPH · CONTINUE EXPLORING</span>
        <h2 style="font-size:2rem;margin:0.35rem 0 0 0;">Follow the Thread Across Ingredient, Maker, Region &amp; Essay</h2>
      </div>
      <a href="/makers" class="link-editorial">Open Northeast India Interactive Atlas →</a>
    </div>
    <div class="provenance-compass__nodes">
      <a href="/product/upper-assam-tippy-orthodox" class="provenance-node">
        <span class="provenance-node__type">01 · THE INGREDIENT (PRODUCT)</span>
        <h3 class="provenance-node__title">Upper Assam Tippy Orthodox Reserve (Lot 26-A)</h3>
        <p class="provenance-node__meta">Tasting profile, preparation notes &amp; acquire in GBP (£) →</p>
      </a>
      <a href="/maker/upper-assam-orthodox-collective" class="provenance-node">
        <span class="provenance-node__type">02 · THE PRODUCER (MAKER PROFILE)</span>
        <h3 class="provenance-node__title">Brahmaputra Smallholder Tea Collective</h3>
        <p class="provenance-node__meta">Producer biography, field audio &amp; harvest discipline →</p>
      </a>
      <a href="/story/mist-over-the-brahmaputra-autumn-pluck" class="provenance-node">
        <span class="provenance-node__type">03 · PROVENANCE MONOGRAPH (STORY)</span>
        <h3 class="provenance-node__title">Mist Over the Brahmaputra: The Autumn Tippy Pluck</h3>
        <p class="provenance-node__meta">Read the long-form documentary story of this harvest →</p>
      </a>
      <a href="/journal/smoke-mist-and-limestone-terroir" class="provenance-node">
        <span class="provenance-node__type">04 · THE JOURNAL &amp; REGION</span>
        <h3 class="provenance-node__title">Smoke, Mist &amp; Limestone: Reading the Terroir of Northeast India</h3>
        <p class="provenance-node__meta">Regional cultural essays &amp; culinary pairing dispatches →</p>
      </a>
    </div>
  </div>
</section>`;
}

function renderInstagramFieldNotes() {
  const notes = [
    { id: 'FIELD-01', location: 'Dibrugarh, Upper Assam', date: 'Autumn Dispatch', img: '/assets/images/hero-assam-mist.jpg', caption: 'Morning river mist lifting off smallholder Assamica plots before the late-November pluck.' },
    { id: 'FIELD-02', location: 'West Jaintia Hills, Meghalaya', date: 'Winter Harvest', img: '/assets/images/stall-spice-lakadong.jpg', caption: 'Freshly washed Lakadong turmeric rhizomes split for sun-curing on woven bamboo mats.' },
    { id: 'FIELD-03', location: 'Mon District, Nagaland', date: 'Hearth Archive', img: '/assets/images/stall-chilli-smoked.jpg', caption: 'Alder-wood smoke rising through the slatted loft where whole Raja Mircha pods cure.' },
    { id: 'FIELD-04', location: 'Cardiff Cupping Room', date: 'Cardiff Desk', img: '/assets/images/tea-infusion-cup.jpg', caption: 'Stoneware vessels and brass scales prepared in Cardiff for arrival inspection of Lot 26-A.' }
  ];
  return `
<section class="editorial-section" aria-label="Field Notes and Visual Dispatches">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">FIELD NOTES ARCHIVE · VISUAL NOTEBOOK</span>
        <h2 style="margin:0.35rem 0 0 0;">Dispatches from Cardiff &amp; Northeast India</h2>
      </div>
      <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">@penbraeandco · Server-Cached Visual Feed</span>
    </div>
    <div class="editorial-grid editorial-grid--ruled">
      ${notes.map(n => `
      <article class="col-span-3 journal-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:0.85rem;background:var(--color-parchment-light);">
        <div>
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.68rem;color:var(--color-ink-muted);margin-bottom:0.65rem;">
            <span>${n.id}</span><span>${n.date}</span>
          </div>
          <div class="journal-card__media" style="aspect-ratio:1/1;margin-bottom:0.85rem;">
            <img src="${n.img}" alt="${n.location}" loading="lazy">
          </div>
          <p style="font-size:0.88rem;color:var(--color-ink-secondary);margin:0;">${n.caption}</p>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-terracotta);">${n.location}</div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

function renderAudioModule(title = 'Field Recording: Morning Pluck & Bamboo Rolling Table (Dibrugarh)', location = '27°28′N 94°54′E · Upper Assam · 01:34') {
  return `
<div class="audio-field-module" data-audio-module data-duration-sec="94" role="region" aria-label="${title}">
  <div class="audio-field-module__top">
    <span class="kicker-index">DOCUMENTARY FIELD AUDIO</span>
    <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">${location}</span>
  </div>
  <h3 style="font-size:1.3rem;margin-bottom:0.65rem;">${title}</h3>
  <div class="audio-field-module__controls">
    <button type="button" class="audio-play-btn" data-audio-toggle aria-pressed="false">Listen ▶</button>
    <div class="audio-progress-track" aria-hidden="true">
      <div class="audio-progress-bar" data-audio-bar></div>
    </div>
    <span class="tabular-nums" data-audio-time style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">00:00 / 01:34</span>
  </div>
  <details class="audio-transcript-details">
    <summary>Read Verbatim Audio Transcript</summary>
    <div class="audio-transcript-body">
      <p style="margin:0;">Ambient sound of morning mist dripping from shade trees onto broad Camellia sinensis var. assamica leaves, followed by the rhythmic hand-rolling of withered leaf across woven bamboo tables.</p>
    </div>
  </details>
</div>`;
}

function renderFooter(includeLeaflet = false) {
  return `</main>
<footer class="site-colophon" role="contentinfo">
  <div class="penbrae-container">
    <div class="site-colophon__grid">
      <div>
        <div class="kicker-index" style="color:var(--color-brass-light);margin-bottom:0.75rem;">COLOPHON · PENBRAE &amp; CO LTD</div>
        <h2 style="font-size:2.1rem;line-height:1.12;margin-bottom:1rem;">Rare single-harvest teas, heirloom rhizomes, and smoked chillies from Northeast India, curated in Cardiff.</h2>
        <p style="color:rgba(245,240,230,0.74);max-width:48ch;font-size:0.95rem;">Every seasonal lot is documented alongside the makers who cultivate it, the altitude and micro-climate of its origin, and the craft traditions that shape its character.</p>
        <div style="margin-top:1.5rem;font-family:var(--font-mono);font-size:0.74rem;color:var(--color-brass-light);letter-spacing:0.08em;">REGISTERED IN WALES · PENBRAE &amp; CO LTD · CARDIFF, UK</div>
      </div>
      <div>
        <h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">The Three Stalls</h3>
        <ul class="site-colophon__list">
          <li><a href="/stalls">All Stalls Overview</a></li>
          <li><a href="/stall/teas">The Tea Stall (Assam &amp; Arunachal)</a></li>
          <li><a href="/stall/spices">The Spice Stall (Meghalaya &amp; Ziro)</a></li>
          <li><a href="/stall/chillies">The Chilli Stall (Nagaland &amp; Manipur)</a></li>
          <li><a href="/product/upper-assam-tippy-orthodox">Featured Lot: Tippy Orthodox Reserve</a></li>
        </ul>
      </div>
      <div>
        <h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">Editorial &amp; Origins</h3>
        <ul class="site-colophon__list">
          <li><a href="/makers">Meet the Makers (Interactive Map)</a></li>
          <li><a href="/maker/upper-assam-orthodox-collective">Maker Dossier: Upper Assam Collective</a></li>
          <li><a href="/story/mist-over-the-brahmaputra-autumn-pluck">Product Story: Autumn Tippy Pluck</a></li>
          <li><a href="/journal">The Penbrae Journal</a></li>
          <li><a href="/about">About Penbrae &amp; Co</a></li>
          <li><a href="/subscribe">Subscribe to Dispatch</a></li>
        </ul>
      </div>
      <div>
        <h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">Commerce &amp; Governance</h3>
        <ul class="site-colophon__list">
          <li><a href="/basket">Shopping Basket</a></li>
          <li><a href="/checkout">Checkout (Stripe Test Mode Ready)</a></li>
          <li><a href="/my-account">Customer Account</a></li>
          <li><a href="/shipping-returns">Shipping &amp; Returns Information</a></li>
          <li><a href="/privacy-policy">Privacy Policy &amp; UK GDPR</a></li>
          <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
          <li><a href="/contact">Contact &amp; Cardiff Enquiries</a></li>
        </ul>
      </div>
    </div>
    <div class="site-colophon__bottom">
      <span>&copy; 2026 Penbrae &amp; Co Ltd. All rights reserved. Prices displayed in GBP (£).</span>
      <span>CARDIFF, WALES · SMALL-LOT IMPORTERS OF NORTHEAST INDIAN TEAS, SPICES &amp; CHILLIES</span>
    </div>
  </div>
</footer>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="/assets/js/makers-map.js"></script>
<script src="/assets/js/commerce.js"></script>
<script src="/assets/js/main.js"></script>
</body>
</html>`;
}

function renderProductSpecimenCard(p, orderIdx = 1, defaultVisible = true) {
  return `
<article class="product-specimen" data-specimen-item data-stall-item="${p.stall}" data-region="${p.regionFilter}" data-price="${p.price}" data-elevation="${p.elevationNum}" data-order="${orderIdx}" style="${defaultVisible ? '' : 'display:none;'}">
  <div class="product-specimen__header">
    <span>${p.lot}</span>
    <span>${p.elevation} · ${p.region.split(',').pop().trim().toUpperCase()}</span>
  </div>
  <a href="/product/${p.slug}" class="product-specimen__media" aria-label="${p.title}">
    <img src="${p.img}" alt="${p.title}" class="product-specimen__img" loading="lazy">
  </a>
  <div class="product-specimen__body">
    <div class="product-specimen__region">${p.region}</div>
    <h2 class="product-specimen__title"><a href="/product/${p.slug}">${p.title}</a></h2>
    <p class="product-specimen__notes">${p.tasting}</p>
    <div class="product-specimen__provenance-links">
      <a href="/maker/${p.makerSlug}">Maker Dossier</a>
      <a href="/story/${p.storySlug}">Provenance Story</a>
    </div>
  </div>
  <div class="product-specimen__footer">
    <div class="product-specimen__price">£${p.price.toFixed(2)} <span class="product-specimen__weight">/ ${p.weight.split(' ')[0]}</span></div>
    <button type="button" class="product-specimen__add-btn"
      data-add-to-basket
      data-product-id="${p.slug}"
      data-product-title="${p.title}"
      data-product-variant="${p.weight}"
      data-product-price="${p.price.toFixed(2)}"
      data-product-url="/product/${p.slug}"
      data-product-region="${p.region}">
      Add to Basket +
    </button>
  </div>
</article>`;
}

function renderHomePage() {
  return renderHeader('/') + `
<section class="home-hero" aria-label="Editorial Monograph Cover">
  <div class="home-hero__grid">
    <div class="home-hero__editorial-column">
      <div class="home-hero__issue-meta">
        <span>MONOGRAPH NO. 01 · AUTUMN / WINTER</span>
        <span>CARDIFF ↔ NORTHEAST INDIA</span>
      </div>
      <div>
        <span class="kicker-index">SINGLE-HARVEST INGREDIENT HOUSE</span>
        <h1 class="home-hero__headline">Where River Mist, Limestone &amp; Alder Smoke Shape the Harvest.</h1>
        <p class="lead-standfirst">Rare orthodox teas, heirloom rhizomes, and hearth-smoked chillies from smallholder gardens across Northeast India—curated in Cardiff.</p>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:var(--space-5);">
          <a href="/stalls" class="btn-editorial"><span>Enter The Three Stalls</span><span aria-hidden="true">→</span></a>
          <a href="/makers" class="btn-editorial btn-editorial--outline"><span>Explore Maker Atlas</span></a>
        </div>
      </div>
      <div class="home-hero__ledger-foot">
        <div>
          <div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">ORIGIN CORRIDOR</div>
          <strong>Assam · Meghalaya · Nagaland · Arunachal · Manipur</strong>
        </div>
        <div>
          <div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">HOME PORT</div>
          <strong>Cardiff, Wales · GBP (£)</strong>
        </div>
      </div>
    </div>
    <div class="home-hero__visual-column">
      <img class="home-hero__visual-art" src="/assets/images/hero-assam-mist.jpg" alt="Morning mist rolling over tea terraces and shade trees in Upper Assam">
      <div class="specimen-figure__scrim"></div>
      <div style="position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;">
        <span class="specimen-figure__badge">UPPER ASSAM · 27°28′N 94°54′E</span>
        <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">PLATE I</span>
      </div>
      <div class="home-hero__visual-overlay">
        <span class="kicker-index" style="color:var(--color-brass-light);">FEATURED ARRIVAL · LOT 26-A</span>
        <h2 style="font-size:1.95rem;margin:0.35rem 0;color:var(--color-parchment);">Upper Assam Tippy Orthodox Reserve</h2>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.86);margin-bottom:0.85rem;">Late-November whole-leaf pluck rich in downy golden tips. Notes of toasted malt, heather honey, and orchard plum.</p>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.75rem;border-top:var(--rule-light-on-dark);">
          <a href="/product/upper-assam-tippy-orthodox" class="link-editorial" style="color:var(--color-parchment);border-color:var(--color-brass-light);">Inspect Lot (£28.00) →</a>
          <a href="/story/mist-over-the-brahmaputra-autumn-pluck" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);text-decoration:underline;">Provenance Story</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section" aria-label="Brand Philosophy">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:center;">
      <div class="col-span-5">
        <figure class="specimen-figure">
          <div class="specimen-figure__canvas" style="--aspect:4/4.6;">
            <img class="specimen-figure__img" src="/assets/images/tea-infusion-cup.jpg" alt="Amber orthodox tea infusion in stoneware cup on parchment" loading="lazy">
            <span class="specimen-figure__badge">CARDIFF CUPPING TABLE</span>
          </div>
          <figcaption class="specimen-figure__caption">
            <span>First infusion of Lot 26-A steeped at 92°C.</span>
            <span class="specimen-figure__caption-id">FIG. 02</span>
          </figcaption>
        </figure>
      </div>
      <div class="col-span-7" style="padding-left:var(--space-4);">
        <span class="kicker-index">01 · QUIET LUXURY &amp; PROVENANCE</span>
        <h2 style="font-size:clamp(2.1rem, 3.1vw, 3.25rem);line-height:1.12;margin:0.5rem 0 var(--space-4) 0;">An ingredient is never anonymous. Behind every leaf, rhizome, and smoked pod stands a landscape and a human hand.</h2>
        <p style="color:var(--color-ink-secondary);max-width:56ch;">From our tasting room in Cardiff, Penbrae &amp; Co documents and imports small-lot harvests from Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur—preserving the exact garden, harvest week, and craft tradition of every lot.</p>
        <div style="margin-top:var(--space-4);">
          <a href="/about" class="link-editorial">Read the Penbrae Manifesto →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section" style="padding-bottom:0;border-bottom:none;" aria-label="The Three Stalls">
  <div class="penbrae-container" style="margin-bottom:var(--space-5);">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
      <div>
        <span class="kicker-index">02 · THREE CURATED EDITORIAL ENVIRONMENTS</span>
        <h2 style="margin:0.35rem 0 0 0;">Enter The Stalls</h2>
      </div>
      <a href="/stalls" class="link-editorial">Compare All Three Stalls →</a>
    </div>
  </div>
  <div class="stall-triptych">
    <article class="stall-portal stall-portal--teas">
      <div>
        <div class="stall-portal__number"><span>STALL I · CAMELLIA SINENSIS</span><span>ASSAM &amp; ARUNACHAL</span></div>
        <div class="stall-portal__photo">
          <img src="/assets/images/stall-tea-orthodox.jpg" alt="Whole-leaf orthodox Assam tea with golden tips" loading="lazy">
        </div>
        <h3 class="stall-portal__title">The Tea Stall</h3>
        <div class="stall-portal__mood">Calm, ceremonial, delicate, contemplative.</div>
        <p style="color:var(--color-ink-secondary);font-size:0.94rem;">Unblended orthodox Assamica, high-altitude white buds, and Singpho hearth-smoked bamboo teas.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
        <a href="/stall/teas" class="btn-editorial">Enter Tea Stall →</a>
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £24.00</span>
      </div>
    </article>
    <article class="stall-portal stall-portal--spices">
      <div>
        <div class="stall-portal__number"><span>STALL II · RHIZOMES &amp; BARKS</span><span>MEGHALAYA &amp; ZIRO</span></div>
        <div class="stall-portal__photo">
          <img src="/assets/images/stall-spice-lakadong.jpg" alt="Freshly sliced Lakadong turmeric rhizomes and wild hill peppercorns" loading="lazy">
        </div>
        <h3 class="stall-portal__title">The Spice Stall</h3>
        <div class="stall-portal__mood">Warm, textured, aromatic, expressive.</div>
        <p style="color:var(--color-ink-secondary);font-size:0.94rem;">High-curcumin Lakadong turmeric from the West Jaintia Hills, sun-cured Sohra ginger, and citrus wild pepper.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
        <a href="/stall/spices" class="btn-editorial" style="background:var(--color-terracotta);border-color:var(--color-terracotta);">Enter Spice Stall →</a>
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £16.00</span>
      </div>
    </article>
    <article class="stall-portal stall-portal--chillies">
      <div>
        <div class="stall-portal__number"><span>STALL III · CAPSICUM CHINENSE</span><span>NAGALAND &amp; MANIPUR</span></div>
        <div class="stall-portal__photo">
          <img src="/assets/images/stall-chilli-smoked.jpg" alt="Whole alder-smoked crimson Naga King Chilli pods" loading="lazy">
        </div>
        <h3 class="stall-portal__title">The Chilli Stall</h3>
        <div class="stall-portal__mood">Bold, energetic, intense, sophisticated.</div>
        <p style="color:var(--color-ink-secondary);font-size:0.94rem;">Alder-smoked Naga King Chilli from Mon District and sun-ripened crimson Hathei chillies from Ukhrul Ridge.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
        <a href="/stall/chillies" class="btn-editorial" style="background:var(--color-oxblood);border-color:var(--color-oxblood);">Enter Chilli Stall →</a>
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £19.50</span>
      </div>
    </article>
  </div>
</section>

<section class="editorial-section editorial-section--deep" aria-label="Featured Harvest and Maker Story">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);margin-bottom:1rem;">
          <span class="kicker-index">03 · FEATURED RARE LOT</span>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">LOT 26-C · NAGALAND</span>
        </div>
        <div class="journal-card__media" style="aspect-ratio:16/9;">
          <img src="/assets/images/stall-chilli-smoked.jpg" alt="Whole Alder-Smoked Naga King Chilli Pods" loading="lazy">
        </div>
        <h2 style="font-size:2rem;margin:0.5rem 0 0.25rem 0;"><a href="/product/alder-smoked-naga-king-chilli" style="color:var(--color-charcoal);text-decoration:none;">Whole Alder-Smoked Naga King Chilli Pods</a></h2>
        <div class="latin-taxonomy" style="margin-bottom:0.85rem;">Capsicum chinense · Mon District, Nagaland · 1,460m ASL</div>
        <p style="color:var(--color-ink-secondary);font-size:0.94rem;">Cured for fourteen days on bamboo racks above smouldering alder-wood hearths. Slow-building warmth layered with dried sour cherry and woodsmoke.</p>
        <div style="padding:1rem 0;margin:1rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.85rem;">£22.00</span>
            <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);margin-left:0.5rem;">/ 40g Glass Jar</span>
          </div>
          <button type="button" class="btn-editorial"
            data-add-to-basket
            data-product-id="alder-smoked-naga-king-chilli"
            data-product-title="Whole Alder-Smoked Naga King Chilli Pods"
            data-product-variant="40g Sealed Glass Jar"
            data-product-price="22.00"
            data-product-qty="1"
            data-product-url="/product/alder-smoked-naga-king-chilli"
            data-product-region="Mon District, Nagaland">Add to Basket +</button>
        </div>
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;">
          <a href="/product/alder-smoked-naga-king-chilli" class="link-editorial">Tasting Dossier →</a>
          <a href="/story/alder-smoke-and-monsoon-mist" class="link-editorial">Read Product Story →</a>
        </div>
      </div>

      <div class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);margin-bottom:1rem;">
          <span class="kicker-index">04 · FEATURED MAKER DOCUMENTARY</span>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">DOSSIER M-01 · UPPER ASSAM</span>
        </div>
        <div class="journal-card__media" style="aspect-ratio:16/9;">
          <img src="/assets/images/maker-hands-crafting.jpg" alt="Artisan hands rolling withered tea leaves on woven bamboo tray" loading="lazy">
        </div>
        <h2 style="font-size:2rem;margin:0.5rem 0 0.25rem 0;"><a href="/maker/upper-assam-orthodox-collective" style="color:var(--color-charcoal);text-decoration:none;">Brahmaputra Smallholder Tea Collective</a></h2>
        <div class="latin-taxonomy" style="margin-bottom:0.85rem;">Dibrugarh &amp; Tinsukia, Upper Assam · 27°28′N 94°54′E</div>
        ${renderAudioModule()}
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;">
          <a href="/maker/upper-assam-orthodox-collective" class="btn-editorial btn-editorial--outline">Read Maker Profile →</a>
          <a href="/makers" class="link-editorial">Locate on Map →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section editorial-section--forest" aria-label="Northeast India Origins">
  <div class="penbrae-container">
    <div class="editorial-grid" style="margin-bottom:var(--space-5);">
      <div class="col-span-5">
        <span class="kicker-index">05 · GEOGRAPHY OF ORIGIN</span>
        <h2 style="margin-top:0.5rem;">The Landscapes of Northeast India</h2>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">From the misty floodplains of the Brahmaputra at 140 metres to cloud-wrapped limestone plateaus and ridges above 1,700 metres.</p>
      </div>
    </div>
    <div class="editorial-grid">
      <div class="col-span-4">
        <div class="region-card__photo">
          <img src="/assets/images/hero-assam-mist.jpg" alt="Upper Assam tea gardens in morning fog" loading="lazy">
        </div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">27°28′N 94°54′E · 140m ASL</div>
        <h3 style="margin:0.35rem 0;">Upper Assam</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Alluvial clay and heavy river fog nurturing tippy orthodox Assamica and Singpho bamboo-smoked teas.</p>
        <a href="/stall/teas" class="link-editorial" style="color:var(--color-brass-light);">Explore Assam Lots →</a>
      </div>
      <div class="col-span-4">
        <div class="region-card__photo">
          <img src="/assets/images/landscape-meghalaya-hills.jpg" alt="Cloud-wrapped limestone hills of Meghalaya" loading="lazy">
        </div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">25°26′N 92°17′E · 1,280m ASL</div>
        <h3 style="margin:0.35rem 0;">Meghalaya Plateau</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Limestone uplands in West Jaintia and Sohra yielding high-curcumin Lakadong turmeric and heirloom hill ginger.</p>
        <a href="/stall/spices" class="link-editorial" style="color:var(--color-brass-light);">Explore Meghalaya Lots →</a>
      </div>
      <div class="col-span-4">
        <div class="region-card__photo">
          <img src="/assets/images/journal-preservation-loft.jpg" alt="Traditional bamboo drying loft in Nagaland" loading="lazy">
        </div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">26°43′N 95°01′E · 1,460m ASL</div>
        <h3 style="margin:0.35rem 0;">Nagaland &amp; Manipur Uplands</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Terraced ridges cultivating alder-smoked Raja Mircha and Sirarakhong Hathei crimson chillies.</p>
        <a href="/stall/chillies" class="link-editorial" style="color:var(--color-brass-light);">Explore Nagaland &amp; Manipur →</a>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section" aria-label="The Penbrae Journal">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">06 · THE PENBRAE JOURNAL · ISSUE 01</span>
        <h2 style="margin:0.35rem 0 0 0;">Essays on Terroir, Craft &amp; Culinary Tradition</h2>
      </div>
      <a href="/journal" class="link-editorial">Read Full Journal Archive →</a>
    </div>
    <div class="editorial-grid">
      <article class="col-span-7 journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-5);">
        <div class="journal-card__media">
          <img src="/assets/images/journal-preservation-loft.jpg" alt="Woven bamboo trays inside a traditional drying loft" loading="lazy">
        </div>
        <span class="kicker-index">LEAD ESSAY · TERROIR &amp; TRADITION</span>
        <h3 style="font-size:2.1rem;margin:0.4rem 0 0.75rem 0;"><a href="/journal/smoke-mist-and-limestone-terroir" style="color:var(--color-charcoal);text-decoration:none;">Smoke, Mist &amp; Limestone: Why Preservation Is the Second Harvest of Northeast India</a></h3>
        <p style="color:var(--color-ink-secondary);font-size:0.95rem;">From bamboo smoke-lofts in Mon District to sun-warmed slate courtyards in Meghalaya, how preservation shapes flavour.</p>
        <a href="/journal/smoke-mist-and-limestone-terroir" class="link-editorial">Read Essay (8 Min Read) →</a>
      </article>
      <div class="col-span-5" style="display:flex;flex-direction:column;gap:var(--space-4);">
        <article class="journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-4);">
          <div class="journal-card__media" style="aspect-ratio:21/9;">
            <img src="/assets/images/stall-tea-orthodox.jpg" alt="Orthodox Assam tea leaves" loading="lazy">
          </div>
          <span class="kicker-index">TEA CEREMONY &amp; VESSEL</span>
          <h3 style="font-size:1.45rem;margin:0.35rem 0;"><a href="/journal/orthodox-vs-ctc-assam-leaf" style="color:var(--color-charcoal);text-decoration:none;">Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam</a></h3>
          <a href="/journal/orthodox-vs-ctc-assam-leaf" class="link-editorial">Read Article →</a>
        </article>
        <article class="journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-4);">
          <div class="journal-card__media" style="aspect-ratio:21/9;">
            <img src="/assets/images/stall-spice-lakadong.jpg" alt="Lakadong turmeric and spices" loading="lazy">
          </div>
          <span class="kicker-index">CULINARY NOTES</span>
          <h3 style="font-size:1.45rem;margin:0.35rem 0;"><a href="/journal/tempering-lakadong-and-smoked-chilli" style="color:var(--color-charcoal);text-decoration:none;">Tempering in Warm Fat: Lakadong &amp; Alder-Smoked Chilli</a></h3>
          <a href="/journal/tempering-lakadong-and-smoked-chilli" class="link-editorial">Read Article →</a>
        </article>
      </div>
    </div>
  </div>
</section>

${renderInstagramFieldNotes()}

<section class="editorial-section editorial-section--deep" aria-label="Subscribe to the Penbrae Dispatch">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6">
        <span class="kicker-index">07 · THE PENBRAE DISPATCH</span>
        <h2 style="margin-top:0.4rem;">Seasonal Harvest Letters &amp; First-Lot Allocations</h2>
        <p style="color:var(--color-ink-secondary);">Subscribers receive field dispatches from Northeast India, maker interviews, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.</p>
      </div>
      <div class="col-span-6">
        <form method="post" data-penbrae-newsletter-form data-ajax-preview="true" style="background:var(--color-parchment-light);padding:var(--space-5);border:var(--rule-strong);">
          <div class="editorial-form-field">
            <label for="home-subscriber-email">Electronic Mail Address</label>
            <input type="email" id="home-subscriber-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
          </div>
          <div class="consent-checkbox-box">
            <input type="checkbox" id="home-gdpr-consent" name="gdpr_consent" value="1" required>
            <label for="home-gdpr-consent">I explicitly consent to receive editorial dispatches and seasonal harvest notices from Penbrae &amp; Co Ltd (UK GDPR).</label>
          </div>
          <button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">Register for the Seasonal Dispatch →</button>
          <p data-newsletter-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.76rem;"></p>
        </form>
      </div>
    </div>
  </div>
</section>
` + renderFooter(false);
}

function renderStallsOverviewPage() {
  return renderHeader('/stalls', 'stall-theme-teas') + `
<section class="editorial-section" style="background:var(--color-parchment-deep);padding-bottom:var(--space-5);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">ARCHITECTURAL CATALOGUE · PAGE 02</span>
        <h1 style="margin-top:0.4rem;">The Three Stalls</h1>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">Three dedicated editorial environments—each shaped by the sensory discipline, harvest calendar, and preservation craft of its ingredients.</p>
      </div>
    </div>
  </div>
</section>

<div class="stalls-environment-bar" data-stalls-env-bar data-active-env="teas" role="navigation" aria-label="Switch or scroll between Stall environments">
  <div class="stalls-environment-bar__inner">
    <span class="kicker-index" style="margin:0;">STALL ATMOSPHERE INDEX · SCROLL OR SELECT</span>
    <div class="stalls-environment-bar__tabs">
      <a href="#stall-env-teas" class="stalls-env-tab is-active" data-env-target="teas">
        <span class="stalls-env-tab__dot" style="background:var(--color-forest);"></span>
        <span>I. The Tea Stall</span>
      </a>
      <a href="#stall-env-spices" class="stalls-env-tab" data-env-target="spices">
        <span class="stalls-env-tab__dot" style="background:var(--color-terracotta);"></span>
        <span>II. The Spice Stall</span>
      </a>
      <a href="#stall-env-chillies" class="stalls-env-tab" data-env-target="chillies">
        <span class="stalls-env-tab__dot" style="background:var(--color-oxblood);"></span>
        <span>III. The Chilli Stall</span>
      </a>
    </div>
  </div>
</div>

<section id="stall-env-teas" data-stall-section="teas" class="editorial-section stall-theme-teas" style="background:#EFECE1;" aria-labelledby="stall-heading-teas">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">STALL I · CALM &amp; CEREMONIAL</span>
        <h2 id="stall-heading-teas" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;">The Tea Stall</h2>
        <p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;">Camellia sinensis var. assamica · Upper Assam &amp; Arunachal</p>
        <p style="color:var(--color-ink-secondary);">Delicate, contemplative, and unhurried. Smallholder gardens that pluck whole terminal buds and hand-roll orthodox leaf on woven bamboo mats.</p>
        <a href="/stall/teas" class="btn-editorial" style="margin-top:1rem;">Enter The Tea Stall →</a>
      </div>
      <div class="col-span-7">
        <div class="editorial-grid">
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['upper-assam-tippy-orthodox'], 1)}</div>
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['singpho-bamboo-smoked-tea'], 2)}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="stall-env-spices" data-stall-section="spices" class="editorial-section stall-theme-spices" style="background:#F3E8DA;" aria-labelledby="stall-heading-spices">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-7">
        <div class="editorial-grid">
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['lakadong-turmeric-reserve'], 1)}</div>
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['arunachal-wild-hill-pepper'], 2)}</div>
        </div>
      </div>
      <div class="col-span-5">
        <span class="kicker-index">STALL II · WARM, TEXTURED &amp; AROMATIC</span>
        <h2 id="stall-heading-spices" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;">The Spice Stall</h2>
        <p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;">Curcuma longa &amp; Zanthoxylum · Meghalaya &amp; Ziro Valley</p>
        <p style="color:var(--color-ink-secondary);">Expressive, resinous, and deeply aromatic. Limestone uplands in the West Jaintia Hills and subtropical valleys in Arunachal yield extraordinary essential oil concentration.</p>
        <a href="/stall/spices" class="btn-editorial" style="margin-top:1rem;background:var(--color-terracotta);border-color:var(--color-terracotta);">Enter The Spice Stall →</a>
      </div>
    </div>
  </div>
</section>

<section id="stall-env-chillies" data-stall-section="chillies" class="editorial-section stall-theme-chillies" style="background:#EFE3DE;" aria-labelledby="stall-heading-chillies">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">STALL III · BOLD, ENERGETIC &amp; INTENSE</span>
        <h2 id="stall-heading-chillies" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;">The Chilli Stall</h2>
        <p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;">Capsicum chinense &amp; Capsicum annuum · Nagaland &amp; Manipur</p>
        <p style="color:var(--color-ink-secondary);">Intense yet remarkably complex. Revered across Nagaland and Manipur for fruit-forward aromatics, alder-smoke depth, and natural crimson staining.</p>
        <a href="/stall/chillies" class="btn-editorial" style="margin-top:1rem;background:var(--color-oxblood);border-color:var(--color-oxblood);">Enter The Chilli Stall →</a>
      </div>
      <div class="col-span-7">
        <div class="editorial-grid">
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['alder-smoked-naga-king-chilli'], 1)}</div>
          <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS['sirarakhong-hathei-chilli'], 2)}</div>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderIndividualStallPage(stallSlug) {
  const normalizedSlug = stallSlug === 'tea' ? 'teas' : stallSlug === 'spice' ? 'spices' : stallSlug === 'chilli' ? 'chillies' : stallSlug;
  const stall = STALLS[normalizedSlug] || STALLS.teas;
  const stallProducts = Object.values(PRODUCTS).filter(p => p.stall === stall.slug);
  const sisterProducts = Object.values(PRODUCTS).filter(p => p.stall !== stall.slug);
  const orderedCatalogue = [...stallProducts, ...sisterProducts];

  return renderHeader('/stall/' + stall.slug, 'stall-theme-' + stall.slug) + `
<div data-stall="${stall.slug}">
  <section class="stall-masthead" style="position:relative;overflow:hidden;">
    <img src="${stall.heroImg}" alt="${stall.title}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.24;pointer-events:none;">
    <div class="penbrae-container" style="position:relative;z-index:2;">
      <div class="editorial-grid">
        <div class="col-span-7">
          <span class="kicker-index" style="color:var(--color-brass-light);">${stall.kicker}</span>
          <h1 style="margin:0.4rem 0 1rem 0;">${stall.title}</h1>
          <p class="lead-standfirst">${stall.deck}</p>
        </div>
        <div class="col-span-5" style="display:flex;flex-direction:column;justify-content:flex-end;">
          <div style="padding:var(--space-4);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.38);backdrop-filter:blur(4px);">
            <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--color-brass-light);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">SWITCH STALL ENVIRONMENT</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              <a href="/stall/teas" class="stall-env-pill ${stall.slug === 'teas' ? 'is-active' : ''}" ${stall.slug === 'teas' ? 'aria-current="page"' : ''}>I. Teas</a>
              <a href="/stall/spices" class="stall-env-pill ${stall.slug === 'spices' ? 'is-active' : ''}" ${stall.slug === 'spices' ? 'aria-current="page"' : ''}>II. Spices</a>
              <a href="/stall/chillies" class="stall-env-pill ${stall.slug === 'chillies' ? 'is-active' : ''}" ${stall.slug === 'chillies' ? 'aria-current="page"' : ''}>III. Chillies</a>
            </div>
          </div>
        </div>
      </div>
      <div class="stall-masthead__ledger">
        <div><div style="color:var(--color-brass-light);">PROVENANCE DISTRICTS</div><strong>${stall.region}</strong></div>
        <div><div style="color:var(--color-brass-light);">ELEVATION BAND</div><strong>${stall.elevation}</strong></div>
        <div><div style="color:var(--color-brass-light);">CRAFT METHOD</div><strong>${stall.craft}</strong></div>
        <div><div style="color:var(--color-brass-light);">HARVEST WINDOW</div><strong>${stall.season}</strong></div>
      </div>
    </div>
  </section>

  <div class="stall-filter-bar" role="region" aria-label="Filter and sort stall catalogue">
    <div class="penbrae-container stall-filter-bar__inner">
      <div class="filter-pill-group" role="group" aria-label="Filter by Northeast India region">
        <button type="button" class="filter-pill is-active" data-filter-region="all" aria-pressed="true">All Regions</button>
        <button type="button" class="filter-pill" data-filter-region="assam" aria-pressed="false">Assam</button>
        <button type="button" class="filter-pill" data-filter-region="meghalaya" aria-pressed="false">Meghalaya</button>
        <button type="button" class="filter-pill" data-filter-region="nagaland" aria-pressed="false">Nagaland</button>
        <button type="button" class="filter-pill" data-filter-region="arunachal" aria-pressed="false">Arunachal</button>
        <button type="button" class="filter-pill" data-filter-region="manipur" aria-pressed="false">Manipur</button>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <span data-stall-count-status aria-live="polite" style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">Showing ${stallProducts.length} curated seasonal lots</span>
        <label for="penbrae-stall-sort" class="sr-only">Sort lots by</label>
        <select id="penbrae-stall-sort" data-stall-sort style="padding:0.45rem 0.85rem;border:var(--rule-strong);background:var(--color-parchment);font-family:var(--font-mono);font-size:0.74rem;">
          <option value="curated">Sort: Curated Archival Order</option>
          <option value="price-asc">Sort: Price (GBP Low → High)</option>
          <option value="price-desc">Sort: Price (GBP High → Low)</option>
          <option value="elevation-desc">Sort: Elevation (Highest First)</option>
        </select>
      </div>
    </div>
  </div>

  <section class="editorial-section">
    <div class="penbrae-container">
      <div class="stall-catalogue-grid" data-stall-catalogue data-current-stall="${stall.slug}" data-visible-count="${stallProducts.length}">
        ${orderedCatalogue.map((p, idx) => renderProductSpecimenCard(p, idx + 1, p.stall === stall.slug)).join('')}
      </div>
    </div>
  </section>
</div>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderProductDetailPage(slug) {
  const p = PRODUCTS[slug] || PRODUCTS['upper-assam-tippy-orthodox'];
  return renderHeader('/stall/' + p.stall, 'has-sticky-pdp-bar stall-theme-' + p.stall) + `
<nav aria-label="Product Provenance Breadcrumb" style="padding:0.85rem var(--gutter);border-bottom:var(--rule-hairline);font-family:var(--font-mono);font-size:0.74rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
  <div>
    <a href="/stalls" style="color:var(--color-ink-muted);text-decoration:none;">The Stalls</a>
    <span aria-hidden="true"> / </span>
    <a href="/stall/${p.stall}" style="color:var(--color-ink-muted);text-decoration:none;">${STALLS[p.stall].title}</a>
    <span aria-hidden="true"> / </span>
    <span style="color:var(--color-charcoal);">${p.title}</span>
  </div>
  <span style="color:var(--color-brass);">${p.lot} · ${p.elevation}</span>
</nav>

<section class="pdp-dossier" aria-label="Product Gallery and Acquisition Dossier">
  <div class="pdp-gallery-column">
    <figure class="specimen-figure">
      <div class="specimen-figure__canvas" style="--aspect:4/4.1;">
        <img class="specimen-figure__img" data-gallery-stage-img src="${p.img}" alt="${p.title}">
        <span class="specimen-figure__badge" data-gallery-stage-badge>PLATE I — DRY SPECIMEN</span>
      </div>
      <figcaption class="specimen-figure__caption">
        <span data-gallery-stage-caption>Close study of unbroken whole specimen (${p.region}).</span>
        <span class="specimen-figure__caption-id">${p.lot}</span>
      </figcaption>
    </figure>

    <div class="pdp-gallery-thumbs" role="tablist" aria-label="Product photography views">
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="true"
        data-gallery-thumb
        data-img-src="${p.img}"
        data-plate-id="PLATE I — DRY SPECIMEN"
        data-caption="Close study of unbroken whole specimen (${p.region}).">
        <img src="${p.img}" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>01 · Dry Specimen</strong>
      </button>
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
        data-gallery-thumb
        data-img-src="${p.imgVessel}"
        data-plate-id="PLATE II — IN PREPARATION"
        data-caption="Aromatic extraction and colour clarity in the vessel.">
        <img src="${p.imgVessel}" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>02 · In Preparation</strong>
      </button>
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
        data-gallery-thumb
        data-img-src="${p.imgOrigin}"
        data-plate-id="PLATE III — FIELD ORIGIN"
        data-caption="Smallholder cultivation landscape in ${p.region}.">
        <img src="${p.imgOrigin}" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>03 · Field Origin</strong>
      </button>
    </div>

    <div style="margin-top:var(--space-5);padding:var(--space-5);background:var(--color-parchment-deep);border:var(--rule-strong);">
      <span class="kicker-index">DEDICATED INGREDIENT MONOGRAPH</span>
      <h2 style="font-size:1.85rem;margin:0.4rem 0 0.65rem 0;">${p.storyTitle}</h2>
      <p style="font-size:0.94rem;color:var(--color-ink-secondary);margin-bottom:1.1rem;">Explore how micro-climate, soil mineralogy, and traditional curing shape the flavour of this lot.</p>
      <a href="/story/${p.storySlug}" class="btn-editorial btn-editorial--outline">Read Dedicated Product Story →</a>
    </div>
  </div>

  <div class="pdp-purchase-column">
    <span class="kicker-index">${p.lot} · ${p.region}</span>
    <h1 style="font-size:clamp(2.1rem,3vw,3.1rem);margin:0.4rem 0 0.25rem 0;">${p.title}</h1>
    <div class="latin-taxonomy">${p.latin}</div>

    <div class="pdp-price-row">
      <div>
        <span class="pdp-price-gbp" data-pdp-price>£${p.price.toFixed(2)}</span>
        <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);display:block;margin-top:0.25rem;">Currency: GBP (£) · Small-batch seasonal import</span>
      </div>
      <span class="pdp-stock-badge">In Stock · Cardiff Dispatch</span>
    </div>

    <p style="color:var(--color-ink-secondary);margin-bottom:var(--space-4);">${p.description}</p>

    ${p.scoville ? `
    <div class="scoville-meter" role="region" aria-label="Scoville Heat Index">
      <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;">
        <span>Scoville Heat Register</span>
        <strong>${p.scoville}</strong>
      </div>
      <div class="scoville-meter__track"><div class="scoville-meter__fill" style="width:82%;"></div></div>
    </div>` : ''}

    <div class="pdp-variant-group" role="radiogroup" aria-label="Select weight or vessel format">
      <span style="font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">Select Format / Weight Variant:</span>
      <div class="pdp-variant-options">
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="true"
          data-variant-option data-variant-label="${p.weight}" data-variant-price="${p.price.toFixed(2)}">
          <strong>${p.weight.split(' ')[0]} Vessel</strong><br><span>£${p.price.toFixed(2)}</span>
        </button>
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
          data-variant-option data-variant-label="Double Reserve Pouch" data-variant-price="${(p.price * 1.8).toFixed(2)}">
          <strong>Double Pouch</strong><br><span>£${(p.price * 1.8).toFixed(2)}</span>
        </button>
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
          data-variant-option data-variant-label="25g Tasting Sample" data-variant-price="${(p.price * 0.45).toFixed(2)}">
          <strong>Tasting Lot</strong><br><span>£${(p.price * 0.45).toFixed(2)}</span>
        </button>
      </div>
    </div>

    <div class="pdp-purchase-actions">
      <div>
        <label for="pdp-quantity-select" class="sr-only">Quantity</label>
        <input type="number" id="pdp-quantity-select" class="pdp-qty-input" value="1" min="1" max="20" data-pdp-qty>
      </div>
      <button type="button" class="btn-editorial" style="justify-content:center;font-size:0.82rem;"
        data-add-to-basket
        data-pdp-add-btn
        data-product-id="${p.slug}"
        data-product-title="${p.title}"
        data-product-variant="${p.weight}"
        data-product-price="${p.price.toFixed(2)}"
        data-product-qty="1"
        data-product-url="/product/${p.slug}"
        data-product-region="${p.region}">
        Add to Basket — GBP (£)
      </button>
    </div>

    <table class="pdp-ledger-table" aria-label="Tasting notes, origin, maker, and preparation details">
      <tbody>
        <tr><th>Tasting Profile</th><td>${p.tasting}</td></tr>
        <tr><th>Origin &amp; Region</th><td>${p.region} (${p.elevation})</td></tr>
        <tr><th>Harvest Window</th><td>${p.harvest}</td></tr>
        <tr><th>Artisan / Maker</th><td><a href="/maker/${p.makerSlug}" style="color:var(--color-charcoal);font-weight:500;text-decoration:underline;">${p.makerName} →</a></td></tr>
        <tr><th>Preparation / Usage</th><td>${p.prep}</td></tr>
        <tr><th>Shipping &amp; Dispatch</th><td>Dispatched from Cardiff, Wales in airtight UV-protected vessels. <a href="/shipping-returns" style="color:var(--color-charcoal);">Shipping Policy</a></td></tr>
      </tbody>
    </table>
  </div>
</section>

<div class="pdp-sticky-mobile-bar" role="region" aria-label="Quick mobile purchase bar">
  <div>
    <div style="font-family:var(--font-editorial);font-size:1.15rem;line-height:1.1;">${p.title}</div>
    <span class="tabular-nums" data-pdp-price style="font-family:var(--font-mono);font-size:0.85rem;color:var(--color-forest);">£${p.price.toFixed(2)}</span>
  </div>
  <button type="button" class="btn-editorial" style="padding:0.65rem 1.1rem;min-height:44px;"
    data-add-to-basket
    data-pdp-add-btn
    data-product-id="${p.slug}"
    data-product-title="${p.title}"
    data-product-variant="${p.weight}"
    data-product-price="${p.price.toFixed(2)}"
    data-product-qty="1"
    data-product-url="/product/${p.slug}"
    data-product-region="${p.region}">
    Add to Basket +
  </button>
</div>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderMakersAtlasPage() {
  return renderHeader('/makers') + `
<section class="editorial-section" style="background:var(--color-parchment-deep);padding-bottom:var(--space-5);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6">
        <span class="kicker-index">CARTOGRAPHIC ARCHIVE · PAGE 05</span>
        <h1 style="margin-top:0.4rem;">Meet the Makers of Northeast India</h1>
      </div>
      <div class="col-span-6">
        <p class="lead-standfirst">Select a geographical marker across Assam, Meghalaya, Nagaland, Arunachal Pradesh, or Manipur to inspect each producer’s region, craft discipline, and seasonal harvests.</p>
      </div>
    </div>
  </div>
</section>

<section aria-label="Interactive Map of Northeast India Producers">
  <div class="makers-atlas-layout">
    <div class="makers-map-stage">
      <div id="penbrae-makers-map" role="application" aria-label="Interactive Leaflet map of Northeast India makers. Use the accessible directory below for full keyboard and screen-reader navigation."></div>
    </div>
    <div id="penbrae-maker-preview-card" class="makers-preview-panel" aria-live="polite"></div>
  </div>
</section>

<section class="editorial-section" id="accessible-maker-directory" aria-labelledby="directory-heading">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">ACCESSIBLE PRODUCER INDEX · KEYBOARD &amp; SCREEN-READER DIRECTORY</span>
        <h2 id="directory-heading" style="margin:0.35rem 0 0 0;">Complete Directory of Documented Makers &amp; Regions</h2>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="commerce-ledger-table" aria-describedby="directory-heading">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Maker / Collective</th>
            <th scope="col">Region &amp; Coordinates</th>
            <th scope="col">Stall &amp; Craft Specialty</th>
            <th scope="col">Associated Products</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-family:var(--font-mono);">M-01</td>
            <td><strong>Brahmaputra Smallholder Tea Collective</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Dibrugarh, Upper Assam<br>27°28′N 94°54′E · 140m ASL</td>
            <td>Tea Stall · Hand-rolled orthodox tippy Assam &amp; bamboo-smoked reserve</td>
            <td><a href="/product/upper-assam-tippy-orthodox">Tippy Orthodox Reserve (£28.00)</a></td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill is-active" data-maker-select="maker-dibrugarh-tea" aria-pressed="true">Preview on Map</button>
                <a href="/maker/upper-assam-orthodox-collective" class="link-editorial">Full Story →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-02</td>
            <td><strong>West Jaintia Hills Lakadong Growers</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">West Jaintia Hills, Meghalaya<br>25°26′N 92°17′E · 1,280m ASL</td>
            <td>Spice Stall · Single-origin Lakadong turmeric &amp; sun-cured hill ginger</td>
            <td><a href="/product/lakadong-turmeric-reserve">Lakadong Rhizome Reserve (£18.50)</a></td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-jaintia-turmeric" aria-pressed="false">Preview on Map</button>
                <a href="/maker/jaintia-hills-lakadong-growers" class="link-editorial">Full Story →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-03</td>
            <td><strong>Mon District Alder-Smoke Chilli Stewards</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Mon District, Nagaland<br>26°43′N 95°01′E · 1,460m ASL</td>
            <td>Chilli Stall · Alder-hearth smoked Naga King Chilli (Raja Mircha)</td>
            <td><a href="/product/alder-smoked-naga-king-chilli">Alder-Smoked King Chilli (£22.00)</a></td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-mon-king-chilli" aria-pressed="false">Preview on Map</button>
                <a href="/maker/nagaland-alder-smoke-stewards" class="link-editorial">Full Story →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-04</td>
            <td><strong>Lower Subansiri Forest Foragers</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Ziro Valley, Arunachal Pradesh<br>27°32′N 93°49′E · 1,680m ASL</td>
            <td>Spice Stall · Canopy-harvested wild Sichuan-type hill pepper</td>
            <td><a href="/product/arunachal-wild-hill-pepper">Wild Hill Pepper (£21.00)</a></td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-ziro-wild-pepper" aria-pressed="false">Preview on Map</button>
                <a href="/maker/ziro-valley-forest-foragers" class="link-editorial">Full Story →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-05</td>
            <td><strong>Ukhrul Ridge Hathei Cultivator Guild</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Sirarakhong, Ukhrul, Manipur<br>25°05′N 94°21′E · 1,750m ASL</td>
            <td>Chilli Stall · Sun-ripened crimson Hathei chilli</td>
            <td><a href="/product/sirarakhong-hathei-chilli">Sirarakhong Hathei Chilli (£20.00)</a></td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-ukhrul-hathei" aria-pressed="false">Preview on Map</button>
                <a href="/maker/ukhrul-hathei-cultivators" class="link-editorial">Full Story →</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
` + renderNonLinearCompass() + renderFooter(true);
}

const MAKERS_DATA = {
  'upper-assam-orthodox-collective': {
    code: 'M-01',
    stall: 'TEA STALL',
    name: 'Brahmaputra Smallholder Tea Collective',
    deck: 'Hand-rolled orthodox tippy Assam & Singpho hearth-smoked bamboo reserve lots cultivated along the southern bank of the Brahmaputra.',
    region: 'Dibrugarh & Tinsukia, Upper Assam',
    coords: '27°28′N 94°54′E · 140m ASL',
    badge: 'DIBRUGARH · 140m ASL',
    img: '/assets/images/maker-hands-crafting.jpg',
    caption: 'Hand-rolling withered leaf on woven bamboo tables.',
    process: 'Ambient bamboo-tray withering, hand-rolling, and controlled oxidation',
    products: ['upper-assam-tippy-orthodox', 'singpho-bamboo-smoked-tea']
  },
  'jaintia-hills-lakadong-growers': {
    code: 'M-02',
    stall: 'SPICE STALL',
    name: 'West Jaintia Hills Lakadong Growers',
    deck: 'High-curcumin single-origin Lakadong turmeric & sun-cured heirloom hill ginger from the limestone plateaus of Meghalaya.',
    region: 'Laskein Block, West Jaintia Hills, Meghalaya',
    coords: '25°26′N 92°17′E · 1,280m ASL',
    badge: 'WEST JAINTIA HILLS · 1,280m ASL',
    img: '/assets/images/stall-spice-lakadong.jpg',
    caption: 'Hand-sliced Lakadong turmeric rhizomes cured on woven bamboo mats.',
    process: 'Limestone upland cultivation, spring-water washing, and winter sun-curing',
    products: ['lakadong-turmeric-reserve', 'sohra-hill-ginger']
  },
  'nagaland-alder-smoke-stewards': {
    code: 'M-03',
    stall: 'CHILLI STALL',
    name: 'Mon District Alder-Smoke Chilli Stewards',
    deck: 'Jhum-cultivated Raja Mircha slow-cured for fourteen days on bamboo racks above smouldering alder-wood hearths.',
    region: 'Mon & Kohima Uplands, Nagaland',
    coords: '26°43′N 95°01′E · 1,460m ASL',
    badge: 'MON DISTRICT · 1,460m ASL',
    img: '/assets/images/stall-chilli-smoked.jpg',
    caption: 'Whole Naga King Chilli pods cured over domestic alder-wood hearths.',
    process: 'Rotational alder agroforestry and 14-day hearth-loft smoke preservation',
    products: ['alder-smoked-naga-king-chilli', 'sirarakhong-hathei-chilli']
  },
  'ziro-valley-forest-foragers': {
    code: 'M-04',
    stall: 'SPICE STALL',
    name: 'Lower Subansiri Forest Foragers',
    deck: 'Canopy-harvested wild Sichuan-type hill pepper from subtropical pine and bamboo valley margins in Arunachal Pradesh.',
    region: 'Ziro Valley, Lower Subansiri, Arunachal Pradesh',
    coords: '27°32′N 93°49′E · 1,680m ASL',
    badge: 'ZIRO VALLEY · 1,680m ASL',
    img: '/assets/images/spice-wild-pepper.jpg',
    caption: 'Sun-dried aromatic Zanthoxylum pericarp husks after seed separation.',
    process: 'Autumn canopy foraging and gentle sun-drying on elevated mats',
    products: ['arunachal-wild-hill-pepper', 'lakadong-turmeric-reserve']
  },
  'ukhrul-hathei-cultivators': {
    code: 'M-05',
    stall: 'CHILLI STALL',
    name: 'Ukhrul Ridge Hathei Cultivator Guild',
    deck: 'Sun-ripened crimson Hathei chilli prized for deep natural carotene staining and rounded fruit sweetness.',
    region: 'Sirarakhong Village, Ukhrul District, Manipur',
    coords: '25°05′N 94°21′E · 1,750m ASL',
    badge: 'SIRARAKHONG · 1,750m ASL',
    img: '/assets/images/chilli-hathei-crimson.jpg',
    caption: 'Sun-curing crimson Hathei pods on woven bamboo winnowing trays.',
    process: 'High-ridge mineral shale cultivation and bright autumn ridge sun-drying',
    products: ['sirarakhong-hathei-chilli', 'alder-smoked-naga-king-chilli']
  }
};

function renderMakerStoryPage(slug = 'upper-assam-orthodox-collective') {
  const m = MAKERS_DATA[slug] || MAKERS_DATA['upper-assam-orthodox-collective'];
  return renderHeader('/makers') + `
<section class="editorial-section editorial-section--forest">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:center;">
      <div class="col-span-7">
        <span class="kicker-index">MAKER DOCUMENTARY DOSSIER ${m.code} · ${m.stall}</span>
        <h1 style="margin:0.4rem 0 1rem 0;">${m.name}</h1>
        <p class="lead-standfirst">${m.deck}</p>
        <div style="margin-top:var(--space-5);padding-top:var(--space-4);border-top:var(--rule-light-on-dark);display:flex;flex-wrap:wrap;gap:2.5rem;font-family:var(--font-mono);font-size:0.76rem;">
          <div><span style="color:var(--color-brass-light);">REGION:</span> ${m.region}</div>
          <div><span style="color:var(--color-brass-light);">COORDINATES:</span> ${m.coords}</div>
          <div><a href="/makers" style="color:var(--color-brass-light);text-decoration:underline;">← Return to Northeast India Atlas</a></div>
        </div>
      </div>
      <div class="col-span-5">
        <figure class="specimen-figure" style="border-color:rgba(245,240,230,0.28);">
          <div class="specimen-figure__canvas" style="--aspect:4/4.5;">
            <img class="specimen-figure__img" src="${m.img}" alt="${m.name}">
            <span class="specimen-figure__badge">${m.badge}</span>
          </div>
          <figcaption class="specimen-figure__caption">
            <span>${m.caption}</span>
            <span class="specimen-figure__caption-id">${m.code}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <aside class="col-editorial-marginalia">
        <div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-strong);">
          <span class="kicker-index">PRODUCER LEDGER</span>
          <dl style="font-size:0.88rem;margin:1rem 0 0 0;">
            <dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">Location</dt>
            <dd style="margin:0.2rem 0 1rem 0;">${m.region}</dd>
            <dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">Craft Process</dt>
            <dd style="margin:0.2rem 0 0 0;">${m.process}</dd>
          </dl>
        </div>
      </aside>
      <div class="col-editorial-essay prose-measure">
        <p class="editorial-dropcap">Across ${m.region}, smallholder stewards maintain cultivation and post-harvest curing traditions calibrated to micro-altitude and seasonal rainfall. Rather than blending harvests into anonymous regional bulk, each lot is kept distinct by harvest week and curing loft.</p>
        <p>When temperatures shift after the monsoon, slow maturation concentrates essential oils, natural sugars, and mineral character—yielding ingredients with unmistakable sense of place.</p>
        <div class="editorial-pullquote">
          <blockquote>“When the harvest is cured slowly on woven bamboo, the cell wall yields gently. You taste the mist, the soil, and the woodsmoke—never a factory floor.”</blockquote>
          <cite>FIELD NOTES ARCHIVE · ${m.code}</cite>
        </div>
        ${renderAudioModule('Field Recording: Inside the Curing & Sorting Loft (' + m.region + ')', m.coords + ' · 01:34')}
        <figure class="specimen-figure" style="margin-top:var(--space-5);">
          <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
            <img class="specimen-figure__img" src="/assets/images/journal-preservation-loft.jpg" alt="Traditional bamboo drying loft in Northeast India" loading="lazy">
            <span class="specimen-figure__badge">DOCUMENTARY STUDY · CURING LOFT</span>
          </div>
          <figcaption class="specimen-figure__caption">
            <span>Tiered bamboo racks used for ambient withering and hearth-smoke curing.</span>
            <span class="specimen-figure__caption-id">PLATE II</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section editorial-section--deep" aria-label="Associated Products from This Maker">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">DIRECT PROVENANCE ACQUISITION</span>
        <h2 style="margin:0.35rem 0 0 0;">Seasonal Lots Crafted by This Producer</h2>
      </div>
      <a href="/stalls" class="link-editorial">Browse All Stalls →</a>
    </div>
    <div class="editorial-grid">
      <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS[m.products[0]], 1)}</div>
      <div class="col-span-6">${renderProductSpecimenCard(PRODUCTS[m.products[1]], 2)}</div>
    </div>
  </div>
</section>
` + renderNonLinearCompass() + renderFooter(false);
}

const STORIES_DATA = {
  'mist-over-the-brahmaputra-autumn-pluck': {
    title: 'Mist Over the Brahmaputra: The Autumn Tippy Pluck',
    deck: 'How cool November nights slow leaf growth in Upper Assam, concentrating malted honey and muscatel aromatics in the golden terminal bud.',
    badge: 'DIBRUGARH · 27°28′N 94°54′E',
    heroImg: '/assets/images/hero-assam-mist.jpg',
    detailImg: '/assets/images/stall-tea-orthodox.jpg',
    productSlug: 'upper-assam-tippy-orthodox'
  },
  'limestone-and-curcumin-jaintia-hills': {
    title: 'Limestone & Curcumin: Winter Harvest in the West Jaintia Hills',
    deck: 'Inside Laskein Block, where mineral-rich limestone uplands and dry January sunshine yield the world’s highest-curcumin heirloom turmeric.',
    badge: 'WEST JAINTIA HILLS · 1,280m ASL',
    heroImg: '/assets/images/landscape-meghalaya-hills.jpg',
    detailImg: '/assets/images/stall-spice-lakadong.jpg',
    productSlug: 'lakadong-turmeric-reserve'
  },
  'alder-smoke-and-monsoon-mist': {
    title: 'Alder Smoke & Monsoon Mist: Curing Raja Mircha in Mon District',
    deck: 'Why fourteen days on slatted bamboo racks above smouldering Himalayan alder hearths turns fierce heat into layered culinary depth.',
    badge: 'MON DISTRICT · 1,460m ASL',
    heroImg: '/assets/images/journal-preservation-loft.jpg',
    detailImg: '/assets/images/stall-chilli-smoked.jpg',
    productSlug: 'alder-smoked-naga-king-chilli'
  }
};

function renderProductStoryPage(slug = 'mist-over-the-brahmaputra-autumn-pluck') {
  const s = STORIES_DATA[slug] || STORIES_DATA['mist-over-the-brahmaputra-autumn-pluck'];
  const p = PRODUCTS[s.productSlug] || PRODUCTS['upper-assam-tippy-orthodox'];
  return renderHeader('/story/' + slug) + `
<div class="story-acquisition-ribbon" role="region" aria-label="Connected Product Acquisition Bar">
  <div>
    <span style="color:var(--color-terracotta);margin-right:0.5rem;">INGREDIENT MONOGRAPH FOR:</span>
    <a href="/product/${p.slug}" style="color:var(--color-charcoal);font-weight:600;text-decoration:underline;">${p.title} (${p.lot})</a>
    <span style="color:var(--color-ink-muted);margin-left:0.5rem;">· £${p.price.toFixed(2)} (${p.weight})</span>
  </div>
  <div style="display:flex;align-items:center;gap:0.85rem;">
    <a href="/product/${p.slug}" class="link-editorial">Return to Product Dossier →</a>
    <button type="button" class="btn-editorial" style="min-height:38px;padding:0.4rem 1rem;"
      data-add-to-basket
      data-product-id="${p.slug}"
      data-product-title="${p.title}"
      data-product-price="${p.price.toFixed(2)}"
      data-product-url="/product/${p.slug}"
      data-product-region="${p.region}">
      Acquire Lot (£${p.price.toFixed(2)}) +
    </button>
  </div>
</div>

<article>
  <header class="editorial-section" style="background:var(--color-parchment-deep);">
    <div class="penbrae-container">
      <div class="editorial-grid" style="align-items:center;">
        <div class="col-span-7">
          <span class="kicker-index">PRODUCT PROVENANCE MONOGRAPH · PAGE 07</span>
          <h1 style="margin:0.4rem 0 1rem 0;">${s.title}</h1>
          <p class="lead-standfirst">${s.deck}</p>
        </div>
        <div class="col-span-5">
          <figure class="specimen-figure">
            <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
              <img class="specimen-figure__img" src="${s.heroImg}" alt="${s.title}">
              <span class="specimen-figure__badge">${s.badge}</span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </header>

  <section class="editorial-section">
    <div class="penbrae-container">
      <div class="editorial-grid">
        <aside class="col-editorial-marginalia">
          <div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-hairline);">
            <span class="kicker-index">HARVEST CHRONOLOGY</span>
            <ol style="font-size:0.88rem;padding-left:1.1rem;margin:1rem 0 0 0;color:var(--color-ink-secondary);display:flex;flex-direction:column;gap:0.75rem;">
              <li><strong>Dawn Mist:</strong> Cool valley fog shields the crop from harsh early sun.</li>
              <li><strong>Selective Harvest:</strong> Hand-gathered at peak volatile oil and sap density.</li>
              <li><strong>Bamboo Curing:</strong> Slow ambient withering or hearth-loft preservation on woven bamboo.</li>
              <li><strong>Cardiff Arrival:</strong> Small-batch inspection and sealing in UV-opaque vessels.</li>
            </ol>
          </div>
        </aside>
        <div class="col-editorial-essay prose-measure">
          <p class="editorial-dropcap">${p.description} Across ${p.region}, the transition from monsoon humidity to crisp post-monsoon nights slows plant metabolism—concentrating aromatics before the harvest window opens.</p>
          <figure class="specimen-figure" style="margin:var(--space-5) 0;">
            <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
              <img class="specimen-figure__img" src="${s.detailImg}" alt="${p.title}" loading="lazy">
            </div>
            <figcaption class="specimen-figure__caption">
              <span>${p.title} (${p.region}).</span>
              <span class="specimen-figure__caption-id">${p.lot}</span>
            </figcaption>
          </figure>
          <p>Tasting profile in the cup or pan: ${p.tasting} Recommended preparation: ${p.prep}</p>
          <div class="editorial-pullquote">
            <blockquote>“When the autumn fog settles over the valley, growth slows to a whisper—concentrating essential oils and mineral character inside every harvest.”</blockquote>
            <cite>PENBRAE FIELD ARCHIVE · ${p.lot}</cite>
          </div>
          ${renderAudioModule()}
          <div style="margin-top:var(--space-6);padding:var(--space-5);background:var(--color-parchment-deep);border:var(--rule-strong);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;">
            <div>
              <span class="kicker-index">TASTE THIS HARVEST</span>
              <h2 style="font-size:1.85rem;margin:0.35rem 0;">${p.title} (${p.lot})</h2>
              <p style="font-size:0.9rem;color:var(--color-ink-secondary);margin:0;">${p.weight} · £${p.price.toFixed(2)} · Dispatched from Cardiff, Wales.</p>
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
              <a href="/product/${p.slug}" class="btn-editorial">View Product Dossier &amp; Buy →</a>
              <a href="/maker/${p.makerSlug}" class="btn-editorial btn-editorial--outline">Meet the Maker →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</article>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderAboutPage() {
  return renderHeader('/about') + `
<section class="editorial-section editorial-section--forest">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:center;">
      <div class="col-span-6">
        <span class="kicker-index">COMPANY MONOGRAPH · PAGE 08</span>
        <h1 style="margin-top:0.4rem;">From Cardiff to the Hills &amp; Valleys of Northeast India.</h1>
        <p class="lead-standfirst">Penbrae &amp; Co Ltd is a Cardiff-based company importing rare, handcrafted teas, spices, and chillies from Northeast India—preserving the identity of every region and producer.</p>
      </div>
      <div class="col-span-6">
        <figure class="specimen-figure">
          <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
            <img class="specimen-figure__img" src="/assets/images/landscape-meghalaya-hills.jpg" alt="Misty hills and valleys of Northeast India">
            <span class="specimen-figure__badge">CARDIFF ↔ NORTHEAST INDIA</span>
          </div>
        </figure>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <aside class="col-editorial-marginalia">
        <figure class="specimen-figure">
          <div class="specimen-figure__canvas" style="--aspect:4/5;">
            <img class="specimen-figure__img" src="/assets/images/tea-infusion-cup.jpg" alt="Cardiff tasting table" loading="lazy">
          </div>
          <figcaption class="specimen-figure__caption">
            <span>Arrival cupping and sensory inspection in Cardiff, Wales.</span>
          </figcaption>
        </figure>
      </aside>
      <div class="col-editorial-essay prose-measure">
        <h2>I. Who We Are &amp; Why We Started</h2>
        <p class="editorial-dropcap">Penbrae &amp; Co Ltd was established in Cardiff with a clear conviction: that the extraordinary agricultural and culinary heritage of Northeast India deserves to be experienced in its unblended, single-origin form. For generations, harvests from Upper Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur have either remained within local hill markets or been absorbed into anonymous commodity supply chains.</p>
        <p>Our purpose is to bridge Cardiff and Northeast India through careful curation and documentary storytelling—allowing cooks, tea drinkers, and curious readers in the United Kingdom to discover not only rare ingredients, but the landscapes and people behind them.</p>
        <hr style="border:none;border-top:var(--rule-hairline);margin:var(--space-6) 0;">
        <h2>II. Philosophy of Sourcing &amp; Respect for Craftsmanship</h2>
        <p>True luxury in agriculture lies in patience and specificity. Whether it is smallholder orthodox tea withered on woven bamboo trays in Dibrugarh, high-curcumin Lakadong turmeric cultivated on misty limestone slopes in the West Jaintia Hills, or Raja Mircha chillies cured above smouldering alder hearths in Nagaland, traditional methods cannot be rushed.</p>
        <div style="margin-top:var(--space-5);display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="/makers" class="btn-editorial">Explore the Maker Atlas →</a>
          <a href="/stalls" class="btn-editorial btn-editorial--outline">Visit The Three Stalls →</a>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderJournalArchivePage() {
  return renderHeader('/journal') + `
<section class="editorial-section" style="background:var(--color-parchment-deep);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">EDITORIAL PUBLICATION · PAGE 09</span>
        <h1 style="margin-top:0.4rem;">The Penbrae Journal</h1>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">Long-form essays, field dispatches, artisan interviews, and culinary studies from Northeast India and our Cardiff tasting room.</p>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:stretch;">
      <div class="col-span-7">
        <figure class="specimen-figure" style="height:100%;">
          <div class="specimen-figure__canvas specimen-figure__canvas--landscape" style="height:100%;">
            <img class="specimen-figure__img" src="/assets/images/journal-preservation-loft.jpg" alt="Traditional bamboo drying loft in Northeast India">
            <span class="specimen-figure__badge">ISSUE 01 · COVER ESSAY</span>
          </div>
        </figure>
      </div>
      <article class="col-span-5" style="padding:var(--space-5);background:var(--color-parchment-light);border:var(--rule-strong);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <span class="kicker-index">REGIONAL CULTURE &amp; CRAFT</span>
          <h2 style="font-size:2.2rem;margin:0.5rem 0 1rem 0;"><a href="/journal/smoke-mist-and-limestone-terroir" style="color:var(--color-charcoal);text-decoration:none;">Smoke, Mist &amp; Limestone: Why Preservation Is the Second Harvest of Northeast India</a></h2>
          <p style="color:var(--color-ink-secondary);">How alder-wood smoke lofts, green bamboo internodes, and sun-warmed slate courtyards transform monsoon moisture into enduring flavour.</p>
        </div>
        <div style="padding-top:1rem;border-top:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;">
          <a href="/journal/smoke-mist-and-limestone-terroir" class="btn-editorial">Read Essay →</a>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">8 Min Read</span>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="editorial-section editorial-section--deep">
  <div class="penbrae-container">
    <div class="editorial-grid editorial-grid--ruled">
      <article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
        <div>
          <div class="journal-card__media">
            <img src="/assets/images/stall-tea-orthodox.jpg" alt="Whole-leaf orthodox Assam tea" loading="lazy">
          </div>
          <span class="kicker-index">TEA TRADITIONS</span>
          <h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;"><a href="/journal/orthodox-vs-ctc-assam-leaf" style="color:var(--color-charcoal);text-decoration:none;">Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam</a></h3>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);">How smallholder hand-rolling preserves golden pubescent tips and honeyed muscatel notes.</p>
        </div>
        <a href="/journal/orthodox-vs-ctc-assam-leaf" class="link-editorial">Read Dispatch →</a>
      </article>
      <article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
        <div>
          <div class="journal-card__media">
            <img src="/assets/images/stall-spice-lakadong.jpg" alt="Lakadong turmeric rhizomes and spices" loading="lazy">
          </div>
          <span class="kicker-index">CULINARY &amp; RECIPES</span>
          <h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;"><a href="/journal/tempering-lakadong-and-smoked-chilli" style="color:var(--color-charcoal);text-decoration:none;">Tempering in Warm Fat: Lakadong &amp; Alder-Smoked Chilli</a></h3>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);">Kitchen guidance on bloom temperatures, lipid solubility of curcumin, and infusing whole smoked pods.</p>
        </div>
        <a href="/journal/tempering-lakadong-and-smoked-chilli" class="link-editorial">Read Dispatch →</a>
      </article>
      <article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
        <div>
          <div class="journal-card__media">
            <img src="/assets/images/stall-chilli-smoked.jpg" alt="Alder-smoked Naga King Chillies" loading="lazy">
          </div>
          <span class="kicker-index">ARTISAN INTERVIEWS</span>
          <h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;"><a href="/journal/alder-trees-and-jhum-agroforestry" style="color:var(--color-charcoal);text-decoration:none;">Nitrogen-Fixing Alder Trees &amp; Rotational Hill Plots in Nagaland</a></h3>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);">Why Himalayan alder is both the ecological partner of upland soil fertility and the fuel of the drying hearth.</p>
        </div>
        <a href="/journal/alder-trees-and-jhum-agroforestry" class="link-editorial">Read Dispatch →</a>
      </article>
    </div>
  </div>
</section>
` + renderInstagramFieldNotes() + renderNonLinearCompass() + renderFooter(false);
}

const JOURNALS_DATA = {
  'smoke-mist-and-limestone-terroir': {
    kicker: 'THE PENBRAE JOURNAL · TERROIR & TRADITION',
    title: 'Smoke, Mist & Limestone: Why Preservation Is the Second Harvest of Northeast India',
    deck: 'From bamboo smoke-lofts in Mon District to sun-warmed slate courtyards in Meghalaya, how traditional preservation shapes the flavour of Northeast India.',
    img: '/assets/images/journal-preservation-loft.jpg',
    badge: 'ISSUE 01 · 8 MIN READ'
  },
  'orthodox-vs-ctc-assam-leaf': {
    kicker: 'THE PENBRAE JOURNAL · TEA TRADITIONS',
    title: 'Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam',
    deck: 'How smallholder hand-rolling on woven bamboo mats preserves golden pubescent tips, toasted malt, and honeyed muscatel notes.',
    img: '/assets/images/stall-tea-orthodox.jpg',
    badge: 'ISSUE 01 · 6 MIN READ'
  },
  'tempering-lakadong-and-smoked-chilli': {
    kicker: 'THE PENBRAE JOURNAL · CULINARY NOTES',
    title: 'Tempering in Warm Fat: Lakadong & Alder-Smoked Chilli',
    deck: 'Kitchen guidance on bloom temperatures, lipid solubility of curcumin, and infusing whole smoked pods without scorching volatile aromatics.',
    img: '/assets/images/stall-spice-lakadong.jpg',
    badge: 'ISSUE 01 · 5 MIN READ'
  },
  'alder-trees-and-jhum-agroforestry': {
    kicker: 'THE PENBRAE JOURNAL · ARTISAN INTERVIEWS',
    title: 'Nitrogen-Fixing Alder Trees & Rotational Hill Plots in Nagaland',
    deck: 'Why Himalayan alder is both the ecological partner of upland soil fertility and the aromatic fuel of the Naga drying hearth.',
    img: '/assets/images/stall-chilli-smoked.jpg',
    badge: 'ISSUE 01 · 7 MIN READ'
  }
};

function renderJournalArticlePage(slug = 'smoke-mist-and-limestone-terroir') {
  const j = JOURNALS_DATA[slug] || JOURNALS_DATA['smoke-mist-and-limestone-terroir'];
  return renderHeader('/journal/' + slug) + `
<article>
  <header class="editorial-section" style="background:var(--color-parchment-deep);">
    <div class="penbrae-container">
      <div class="editorial-grid" style="align-items:center;">
        <div class="col-span-7">
          <span class="kicker-index">${j.kicker}</span>
          <h1 style="margin:0.4rem 0 1rem 0;">${j.title}</h1>
          <p class="lead-standfirst">${j.deck}</p>
        </div>
        <div class="col-span-5">
          <figure class="specimen-figure">
            <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
              <img class="specimen-figure__img" src="${j.img}" alt="${j.title}">
              <span class="specimen-figure__badge">${j.badge}</span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </header>

  <section class="editorial-section">
    <div class="penbrae-container">
      <div class="editorial-grid">
        <aside class="col-editorial-marginalia">
          <div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-strong);">
            <span class="kicker-index">INGREDIENTS IN THIS ESSAY</span>
            <div style="margin-top:1rem;padding-top:1rem;border-top:var(--rule-hairline);">
              <img src="/assets/images/stall-chilli-smoked.jpg" alt="Alder-Smoked Naga King Chilli Pods" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.5rem;">
              <h3 style="font-size:1.2rem;margin-bottom:0.2rem;"><a href="/product/alder-smoked-naga-king-chilli" style="color:var(--color-charcoal);text-decoration:none;">Alder-Smoked Naga King Chilli Pods</a></h3>
              <p style="font-size:0.82rem;color:var(--color-ink-secondary);margin-bottom:0.5rem;">Mon District, Nagaland · £22.00</p>
              <a href="/product/alder-smoked-naga-king-chilli" class="link-editorial">Inspect Ingredient →</a>
            </div>
            <div style="margin-top:1rem;padding-top:1rem;border-top:var(--rule-hairline);">
              <img src="/assets/images/stall-spice-lakadong.jpg" alt="Single-Harvest Lakadong Rhizome Reserve" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.5rem;">
              <h3 style="font-size:1.2rem;margin-bottom:0.2rem;"><a href="/product/lakadong-turmeric-reserve" style="color:var(--color-charcoal);text-decoration:none;">Single-Harvest Lakadong Rhizome Reserve</a></h3>
              <p style="font-size:0.82rem;color:var(--color-ink-secondary);margin-bottom:0.5rem;">West Jaintia Hills · £18.50</p>
              <a href="/product/lakadong-turmeric-reserve" class="link-editorial">Inspect Ingredient →</a>
            </div>
          </div>
        </aside>
        <div class="col-editorial-essay prose-measure">
          <p class="editorial-dropcap">Across the hills of Meghalaya, Nagaland, and Upper Assam, moisture is an ever-present force. When annual rainfall is measured in metres rather than millimetres, a freshly harvested chilli pod or tea shoot cannot simply be left in an open shed. Without skilled intervention, humidity quickly erases weeks of careful cultivation.</p>
          <p>Out of this climatic necessity arose a remarkable vocabulary of preservation: slatted bamboo drying lofts suspended above domestic hearths in Mon District; green bamboo cylinders packed with roasted Assamica tea leaves among the Singpho; and thinly sliced Lakadong rhizomes turned by hand across elevated mats during the crisp, dry mornings of January.</p>
          <div class="editorial-pullquote">
            <blockquote>“In the monsoon belt of Northeast India, preservation is not an afterthought—it is where raw harvest becomes culinary architecture.”</blockquote>
            <cite>ISSUE 01 · PENBRAE EDITORIAL ARCHIVE</cite>
          </div>
          ${renderAudioModule('Field Recording: Alder Hearth Loft in Mon District', '26°43′N 95°01′E · Nagaland · 01:34')}
        </div>
      </div>
    </div>
  </section>
</article>
` + renderNonLinearCompass() + renderFooter(false);
}

function renderSubscribePage() {
  return renderHeader('/subscribe') + `
<section class="editorial-section" style="background:var(--color-parchment-deep);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">READER REGISTRATION · PAGE 11</span>
        <h1 style="margin-top:0.4rem;">Subscribe to the Penbrae Dispatch</h1>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">Receive occasional harvest letters, documentary field notes from Northeast India, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.</p>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <figure class="specimen-figure" style="margin-bottom:var(--space-4);">
          <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
            <img class="specimen-figure__img" src="/assets/images/tea-infusion-cup.jpg" alt="Penbrae Dispatch and Cupping Table">
          </div>
        </figure>
        <span class="kicker-index">WHAT SUBSCRIBERS RECEIVE</span>
        <h2 style="font-size:1.85rem;margin:0.4rem 0 0.75rem 0;">Written like a correspondence, never a promotional circular.</h2>
        <p style="font-size:0.92rem;color:var(--color-ink-secondary);">Seasonal arrival notices, field monographs with audio transcripts, and preparation notes from our Cardiff table.</p>
      </div>
      <div class="col-span-7">
        <form method="post" data-penbrae-newsletter-form data-ajax-preview="true" style="background:var(--color-parchment-light);padding:var(--space-6);border:var(--rule-strong);">
          <span class="kicker-index">DISPATCH LEDGER REGISTRATION</span>
          <h2 style="font-size:1.95rem;margin:0.4rem 0 1.5rem 0;">Join the Reading List</h2>
          <div class="editorial-form-field">
            <label for="sub-full-name">Your Name (Optional)</label>
            <input type="text" id="sub-full-name" name="subscriber_name" placeholder="Eleanor Vance">
          </div>
          <div class="editorial-form-field">
            <label for="sub-email">Electronic Mail Address (Required)</label>
            <input type="email" id="sub-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
          </div>
          <div class="consent-checkbox-box">
            <input type="checkbox" id="sub-gdpr-consent" name="gdpr_consent" value="1" required>
            <label for="sub-gdpr-consent">Explicit Marketing Consent (UK GDPR): I consent to Penbrae &amp; Co Ltd storing my email address to send editorial dispatches and seasonal harvest announcements.</label>
          </div>
          <button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">Confirm Dispatch Subscription →</button>
          <p data-newsletter-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.78rem;"></p>
        </form>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section editorial-section--forest" aria-labelledby="club-preview-heading">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6">
        <span class="kicker-index">FUTURE-READY ARCHITECTURE · FORTHCOMING ARCHIVE</span>
        <h2 id="club-preview-heading" style="margin-top:0.4rem;">The Penbrae Seasonal Tasting Society (Tea &amp; Spice Club)</h2>
        <p class="lead-standfirst">A quarterly curation of micro-lot teas, single-harvest rhizomes, and smoked chillies accompanied by printed monograph notes.</p>
      </div>
      <div class="col-span-6">
        <div style="padding:var(--space-5);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.2);">
          <span style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.09em;color:var(--color-brass-light);display:block;margin-bottom:0.5rem;">COMMERCE GOVERNANCE NOTICE</span>
          <p style="font-size:0.94rem;color:rgba(245,240,230,0.86);margin-bottom:1rem;">Recurring subscription billing and automated checkout are intentionally disabled until final club allocations, quarterly billing terms, and UK fulfilment schedules are ratified by Penbrae &amp; Co Ltd.</p>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">STATUS: PROSPECTUS REGISTRATION ONLY · NO RECURRING CHARGE COLLECTED</span>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderFooter(false);
}

function renderBasketPage() {
  return renderHeader('/basket') + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
      <div>
        <span class="kicker-index">COMMERCE LEDGER · CARDIFF DISPATCH</span>
        <h1 style="margin:0.35rem 0 0 0;">Your Shopping Basket</h1>
      </div>
      <a href="/stalls" class="link-editorial">← Continue Browsing The Stalls</a>
    </div>
    <div class="editorial-grid">
      <div class="col-span-8">
        <div style="overflow-x:auto;">
          <table class="commerce-ledger-table" aria-label="Shopping Basket Items">
            <thead>
              <tr>
                <th scope="col">Harvest Lot &amp; Region</th>
                <th scope="col">Format</th>
                <th scope="col">Unit Price (GBP)</th>
                <th scope="col">Quantity</th>
                <th scope="col">Line Total</th>
              </tr>
            </thead>
            <tbody id="penbrae-basket-page-rows"></tbody>
          </table>
        </div>
      </div>
      <aside class="col-span-4">
        <div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
          <span class="kicker-index">BASKET SUMMARY (GBP)</span>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.25rem 0;margin:1rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);">
            <span style="font-family:var(--font-mono);font-size:0.78rem;text-transform:uppercase;">Subtotal</span>
            <span id="penbrae-basket-page-subtotal" class="tabular-nums" style="font-family:var(--font-editorial);font-size:2rem;">£28.00</span>
          </div>
          <p style="font-size:0.86rem;color:var(--color-ink-secondary);margin-bottom:1.5rem;">Shipping &amp; applicable UK tax settings are calculated dynamically at checkout via WooCommerce shipping zones and tax classes.</p>
          <a href="/checkout" class="btn-editorial" style="width:100%;justify-content:center;">Proceed to Checkout →</a>
        </div>
      </aside>
    </div>
  </div>
</section>
` + renderFooter(false);
}

function renderCheckoutPage() {
  return renderHeader('/checkout') + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);">
      <span class="kicker-index">CARDIFF DISPATCH &amp; PAYMENT LEDGER · CURRENCY: GBP (£)</span>
      <h1 style="margin:0.35rem 0 0 0;">Checkout &amp; Fulfilment Details</h1>
    </div>
    <form method="post" action="/order-confirmation" data-penbrae-checkout-form data-test-preview="true">
      <div class="editorial-grid">
        <div class="col-span-7" style="background:var(--color-parchment-light);border:var(--rule-hairline);padding:var(--space-5);">
          <span class="kicker-index">01 · RECIPIENT &amp; DELIVERY ADDRESS</span>
          <h2 style="font-size:1.85rem;margin:0.4rem 0 1.25rem 0;">Dispatch Destination</h2>
          <div class="editorial-grid" style="gap:1rem;">
            <div class="col-span-6 editorial-form-field">
              <label for="billing_first_name">First Name *</label>
              <input type="text" id="billing_first_name" name="billing_first_name" required>
            </div>
            <div class="col-span-6 editorial-form-field">
              <label for="billing_last_name">Surname *</label>
              <input type="text" id="billing_last_name" name="billing_last_name" required>
            </div>
          </div>
          <div class="editorial-form-field">
            <label for="billing_email">Email Address for Order Confirmation *</label>
            <input type="email" id="billing_email" name="billing_email" required>
          </div>
          <div class="editorial-form-field">
            <label for="billing_address_1">Street Address *</label>
            <input type="text" id="billing_address_1" name="billing_address_1" required>
          </div>
          <div class="editorial-grid" style="gap:1rem;">
            <div class="col-span-6 editorial-form-field">
              <label for="billing_city">Town / City *</label>
              <input type="text" id="billing_city" name="billing_city" required>
            </div>
            <div class="col-span-6 editorial-form-field">
              <label for="billing_postcode">Postcode *</label>
              <input type="text" id="billing_postcode" name="billing_postcode" required>
            </div>
          </div>
        </div>
        <div class="col-span-5">
          <div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
            <span class="kicker-index">02 · ORDER LEDGER &amp; PAYMENT PROVIDER</span>
            <h2 style="font-size:1.85rem;margin:0.4rem 0 1.25rem 0;">Review &amp; Sandbox Payment</h2>
            <div style="padding:1rem;background:var(--color-parchment-deep);border:var(--rule-brass);margin-bottom:1.25rem;">
              <div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-oxblood);margin-bottom:0.35rem;">PAYMENT GATEWAY STATUS: TEST MODE (SANDBOX)</div>
              <p style="font-size:0.86rem;color:var(--color-ink-secondary);margin:0;">Live payment processing is disabled until Penbrae &amp; Co Ltd merchant credentials are configured in WooCommerce → Settings → Payments.</p>
            </div>
            <button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">Place Test Mode Order (No Live Charge) →</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
` + renderFooter(false);
}

function renderUtilityPage(title, kicker, contentHtml) {
  return renderHeader('') + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <aside class="col-editorial-marginalia">
        <span class="kicker-index">${kicker}</span>
        <h1 style="font-size:2.3rem;margin-top:0.4rem;">${title}</h1>
      </aside>
      <div class="col-editorial-essay prose-measure">
        ${contentHtml}
      </div>
    </div>
  </div>
</section>
` + renderNonLinearCompass() + renderFooter(false);
}

function getRouteHtml(rawPathname) {
  const pathname = (rawPathname || '/').replace(/\/+$/, '') || '/';

  if (pathname === '/') return { status: 200, html: renderHomePage() };
  if (pathname === '/stalls') return { status: 200, html: renderStallsOverviewPage() };
  if (pathname.startsWith('/stall/')) {
    const slug = pathname.split('/')[2] || 'teas';
    return { status: 200, html: renderIndividualStallPage(slug) };
  }
  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/')[2] || 'upper-assam-tippy-orthodox';
    return { status: 200, html: renderProductDetailPage(slug) };
  }
  if (pathname === '/makers') return { status: 200, html: renderMakersAtlasPage() };
  if (pathname.startsWith('/maker/')) {
    const slug = pathname.split('/')[2] || 'upper-assam-orthodox-collective';
    return { status: 200, html: renderMakerStoryPage(slug) };
  }
  if (pathname.startsWith('/story/')) {
    const slug = pathname.split('/')[2] || 'mist-over-the-brahmaputra-autumn-pluck';
    return { status: 200, html: renderProductStoryPage(slug) };
  }
  if (pathname === '/about') return { status: 200, html: renderAboutPage() };
  if (pathname === '/journal') return { status: 200, html: renderJournalArchivePage() };
  if (pathname.startsWith('/journal/')) {
    const slug = pathname.split('/')[2] || 'smoke-mist-and-limestone-terroir';
    return { status: 200, html: renderJournalArticlePage(slug) };
  }
  if (pathname === '/subscribe') return { status: 200, html: renderSubscribePage() };
  if (pathname === '/basket') return { status: 200, html: renderBasketPage() };
  if (pathname === '/checkout') return { status: 200, html: renderCheckoutPage() };
  if (pathname === '/order-confirmation') {
    return {
      status: 200,
      html: renderUtilityPage(
        'Thank You. Your Order Has Been Logged in the Cardiff Ledger.',
        'DISPATCH DOSSIER RECORDED · TEST ENVIRONMENT',
        '<p class="lead-standfirst">Reference: PB-TEST-2026-084 · Status: Test Mode Verification Order (No Live Payment Captured).</p><p>While your seasonal lots are prepared, we invite you to explore the provenance stories and maker profiles connected to your harvest.</p>'
      )
    };
  }
  if (pathname === '/my-account') {
    return {
      status: 200,
      html: renderUtilityPage(
        'My Penbrae Account',
        'PATRON ARCHIVE & DISPATCH HISTORY',
        '<p>Sign in to inspect past seasonal allocations, manage UK delivery addresses, or update your Penbrae Dispatch preferences.</p>'
      )
    };
  }
  if (pathname === '/contact') {
    return {
      status: 200,
      html: renderUtilityPage(
        'Contact Penbrae & Co Ltd',
        'CORRESPONDENCE · CARDIFF, WALES',
        '<p>For enquiries regarding seasonal lot availability, culinary &amp; restaurant allocations, or provenance documentation, write to our Cardiff desk (Penbrae &amp; Co Ltd, Cardiff, Wales, UK).</p>'
      )
    };
  }
  if (pathname === '/shipping-returns') {
    return {
      status: 200,
      html: renderUtilityPage(
        'Shipping & Returns Information',
        'FULFILMENT GOVERNANCE',
        '<p>All Penbrae &amp; Co Ltd orders are inspected, packed, and dispatched from Cardiff, Wales. Exact postage in GBP (£) is calculated dynamically at checkout based on active WooCommerce Shipping Zones.</p>'
      )
    };
  }
  if (pathname === '/privacy-policy') {
    return {
      status: 200,
      html: renderUtilityPage(
        'Privacy Policy & UK GDPR',
        'DATA PROTECTION',
        '<p>Penbrae &amp; Co Ltd collects only the personal data necessary to fulfil orders placed through WooCommerce or to deliver the Penbrae Dispatch when explicit opt-in consent has been granted.</p>'
      )
    };
  }
  if (pathname === '/terms-and-conditions') {
    return {
      status: 200,
      html: renderUtilityPage(
        'Terms & Conditions',
        'COMMERCIAL TERMS',
        '<p>All prices across the Tea, Spice, and Chilli Stalls are stated in Pounds Sterling (GBP £). Applicable UK taxation and shipping fees are governed by WooCommerce Settings.</p>'
      )
    };
  }

  return {
    status: 404,
    html: renderUtilityPage('Entry Not Found (404)', 'ARCHIVAL FOLIO 404', '<p>The page or seasonal lot you requested has moved. Use the Provenance Compass below to continue exploring.</p>')
  };
}

function getAllStaticRoutes() {
  const routes = [
    '/',
    '/stalls',
    '/stall/teas',
    '/stall/spices',
    '/stall/chillies',
    '/stall/tea',
    '/stall/spice',
    '/stall/chilli',
    '/makers',
    '/about',
    '/journal',
    '/subscribe',
    '/basket',
    '/checkout',
    '/order-confirmation',
    '/my-account',
    '/contact',
    '/shipping-returns',
    '/privacy-policy',
    '/terms-and-conditions',
    '/404'
  ];
  Object.keys(PRODUCTS).forEach(slug => routes.push('/product/' + slug));
  Object.keys(MAKERS_DATA).forEach(slug => routes.push('/maker/' + slug));
  Object.keys(STORIES_DATA).forEach(slug => routes.push('/story/' + slug));
  Object.keys(JOURNALS_DATA).forEach(slug => routes.push('/journal/' + slug));
  return routes;
}

function handleRequest(req, res) {
  const parsed = url.parse(req.url || '/', true);
  const pathname = parsed.pathname.replace(/\/+$/, '') || '/';

  if (pathname.startsWith('/assets/')) {
    const filePath = path.join(THEME_DIR, pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.json': 'application/json'
      };
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  const result = getRouteHtml(pathname);
  res.writeHead(result.status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(result.html);
}

const server = http.createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Penbrae & Co preview server running at http://localhost:${PORT}`);
  });
}

module.exports = { handleRequest, getRouteHtml, getAllStaticRoutes, THEME_DIR };
