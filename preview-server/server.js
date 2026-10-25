/**
 * PENBRAE & CO LTD — PREVIEW & STATIC BUILD SERVER
 * Serves the CSS/JS/Image assets and templates of `wp-content/themes/penbrae/`.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3847;
const SITE_URL = 'https://penbrae-and-co.vercel.app';
const THEME_DIR = path.join(__dirname, '..', 'wp-content', 'themes', 'penbrae');

const STALLS = {
  teas: {
    slug: 'teas',
    number: 'STALL I',
    kicker: 'STALL I · SINGLE-ORIGIN ORTHODOX & SMOKE-CURED LEAF',
    title: 'The Tea Stall',
    mood: 'Calm, ceremonial, delicate, contemplative.',
    deck: 'Single-harvest orthodox Assamica, high-altitude white buds, and bamboo-smoked reserve lots from Upper Assam and Arunachal Pradesh.',
    region: 'Dibrugarh, Tinsukia & Lohit Valley',
    elevation: '140m – 1,520m ASL',
    craft: 'Withered on woven bamboo trays & hand-rolled',
    season: 'Early Spring & Autumnal Tippy Flush',
    heroImg: '/assets/images/stall-tea-orthodox.jpg',
    regions: [
      { key: 'assam', label: 'Assam' },
      { key: 'arunachal', label: 'Arunachal Pradesh' }
    ]
  },
  spices: {
    slug: 'spices',
    number: 'STALL II',
    kicker: 'STALL II · HEIRLOOM RHIZOMES & CANOPY PEPPERS',
    title: 'The Spice Stall',
    mood: 'Warm, textured, aromatic, expressive.',
    deck: 'High-curcumin single-origin Lakadong turmeric, sun-cured Sohra hill ginger, and citrus-husked wild canopy peppers.',
    region: 'West Jaintia Hills, Sohra & Ziro Valley',
    elevation: '1,280m – 1,680m ASL',
    craft: 'Limestone upland cultivation & bamboo-mat sun-curing',
    season: 'Winter Rhizome & Autumn Canopy Harvest',
    heroImg: '/assets/images/stall-spice-lakadong.jpg',
    regions: [
      { key: 'meghalaya', label: 'Meghalaya' },
      { key: 'arunachal', label: 'Arunachal Pradesh' }
    ]
  },
  chillies: {
    slug: 'chillies',
    number: 'STALL III',
    kicker: 'STALL III · HEARTH-SMOKED & SUN-CURED CULTIVARS',
    title: 'The Chilli Stall',
    mood: 'Bold, energetic, intense, sophisticated.',
    deck: 'Alder-smoked Naga King Chilli (Raja Mircha) from Mon District, sun-ripened crimson Hathei chillies from Ukhrul Ridge, and upland forest bird’s-eye pods.',
    region: 'Mon District (Nagaland), Ukhrul (Manipur) & Khasi Uplands',
    elevation: '1,180m – 1,750m ASL',
    craft: 'Alder-hearth smoke lofts & ridge sun-drying',
    season: 'Late Monsoon & Post-Monsoon Harvest',
    heroImg: '/assets/images/stall-chilli-smoked.jpg',
    regions: [
      { key: 'nagaland', label: 'Nagaland' },
      { key: 'manipur', label: 'Manipur' },
      { key: 'meghalaya', label: 'Meghalaya' }
    ]
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
    regionFilter: 'arunachal',
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
    regionFilter: 'meghalaya',
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
    regionFilter: 'arunachal',
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
    scovillePct: 88,
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
    scovillePct: 28,
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
    regionFilter: 'meghalaya manipur',
    elevation: '1,180m ASL',
    elevationNum: 1180,
    harvest: 'November Escarpment Sun-Cure',
    price: 19.50,
    weight: '55g Sealed Glass Jar',
    img: '/assets/images/stall-chilli-smoked.jpg',
    imgVessel: '/assets/images/chilli-hathei-crimson.jpg',
    imgOrigin: '/assets/images/landscape-meghalaya-hills.jpg',
    scoville: '140,000 SHU (Crisp Citrus Heat)',
    scovillePct: 52,
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
    products: ['upper-assam-tippy-orthodox', 'singpho-bamboo-smoked-tea'],
    journalSlug: 'orthodox-vs-ctc-assam-leaf',
    storySlug: 'mist-over-the-brahmaputra-autumn-pluck',
    audioTitle: 'Field Audio Study: Morning Pluck & Bamboo Rolling Table (Dibrugarh)',
    audioTranscript: 'Simulated field recording transcript (Dibrugarh, Upper Assam): Ambient sound of morning river mist dripping from Albizia shade trees onto broad Assamica tea leaves, followed by the rhythmic hand-rolling of withered leaf across woven bamboo tables to preserve unbroken golden tips.'
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
    products: ['lakadong-turmeric-reserve', 'sohra-hill-ginger'],
    journalSlug: 'tempering-lakadong-and-smoked-chilli',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    audioTitle: 'Field Audio Study: Washing & Slicing Lakadong Rhizomes (Laskein Block)',
    audioTranscript: 'Simulated field recording transcript (West Jaintia Hills, Meghalaya): Crisp winter mountain breeze across limestone terraces, spring-water washing of freshly dug Lakadong turmeric fingers, and the steady rhythm of iron blades slicing deep saffron-orange rhizomes onto bamboo drying mats.'
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
    products: ['alder-smoked-naga-king-chilli'],
    journalSlug: 'alder-trees-and-jhum-agroforestry',
    storySlug: 'alder-smoke-and-monsoon-mist',
    audioTitle: 'Field Audio Study: Alder-Wood Hearth Loft in Mon District',
    audioTranscript: 'Simulated field recording transcript (Mon District, Nagaland): Low crackle of seasoned Himalayan alder wood smouldering in a domestic hearth, monsoon rain pattering against a timber roof, and the dry rustle of whole Raja Mircha chilli pods being turned across overhead slatted bamboo racks.'
  },
  'ziro-valley-forest-foragers': {
    code: 'M-04',
    stall: 'SPICE & TEA STALLS',
    name: 'Lower Subansiri Forest Foragers',
    deck: 'Canopy-harvested wild Sichuan-type hill pepper and high-altitude silver white tea buds from Arunachal Pradesh.',
    region: 'Ziro Valley & Patkai Foothills, Arunachal Pradesh',
    coords: '27°32′N 93°49′E · 1,680m ASL',
    badge: 'ZIRO VALLEY · 1,680m ASL',
    img: '/assets/images/spice-wild-pepper.jpg',
    caption: 'Sun-dried aromatic Zanthoxylum pericarp husks after seed separation.',
    process: 'Autumn canopy foraging and gentle sun-drying on elevated bamboo mats',
    products: ['arunachal-wild-hill-pepper', 'namdapha-wild-forest-white-tea'],
    journalSlug: 'smoke-mist-and-limestone-terroir',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    audioTitle: 'Field Audio Study: Winnowing Wild Hill Pepper Husks in Ziro Valley',
    audioTranscript: 'Simulated field recording transcript (Ziro Valley, Arunachal Pradesh): Wind moving through high-altitude pine and bamboo groves at 1,680m, accompanied by the crisp sound of sun-dried Zanthoxylum peppercorn husks being tossed in woven bamboo winnowing trays to separate the dark seeds.'
  },
  'ukhrul-hathei-cultivators': {
    code: 'M-05',
    stall: 'CHILLI STALL',
    name: 'Ukhrul Ridge Hathei Cultivator Guild',
    deck: 'Sun-ripened crimson Hathei chilli and upland bird’s-eye pods prized for deep natural carotene staining and bright citrus heat.',
    region: 'Sirarakhong Village, Ukhrul District, Manipur',
    coords: '25°05′N 94°21′E · 1,750m ASL',
    badge: 'SIRARAKHONG · 1,750m ASL',
    img: '/assets/images/chilli-hathei-crimson.jpg',
    caption: 'Sun-curing crimson Hathei pods on woven bamboo winnowing trays.',
    process: 'High-ridge mineral shale cultivation and bright autumn ridge sun-drying',
    products: ['sirarakhong-hathei-chilli', 'barak-valley-smoked-birdseye'],
    journalSlug: 'tempering-lakadong-and-smoked-chilli',
    storySlug: 'alder-smoke-and-monsoon-mist',
    audioTitle: 'Field Audio Study: Autumn Ridge Sun-Curing in Sirarakhong Village',
    audioTranscript: 'Simulated field recording transcript (Sirarakhong, Ukhrul District, Manipur): Clear autumn wind sweeping across 1,750m shale ridges as cultivators spread ripe crimson Hathei chillies across wide bamboo baskets in the afternoon sun.'
  }
};

const STORIES_DATA = {
  'mist-over-the-brahmaputra-autumn-pluck': {
    slug: 'mist-over-the-brahmaputra-autumn-pluck',
    title: 'Mist Over the Brahmaputra: The Autumn Tippy Pluck',
    deck: 'How cool November nights slow leaf growth in Upper Assam, concentrating malted honey and muscatel aromatics in the golden terminal bud.',
    badge: 'DIBRUGARH · 27°28′N 94°54′E',
    heroImg: '/assets/images/hero-assam-mist.jpg',
    detailImg: '/assets/images/stall-tea-orthodox.jpg',
    productSlug: 'upper-assam-tippy-orthodox',
    relatedProducts: ['upper-assam-tippy-orthodox', 'singpho-bamboo-smoked-tea', 'namdapha-wild-forest-white-tea'],
    audioTitle: 'Field Audio Study: Dawn Pluck & Bamboo Withering Troughs (Dibrugarh)',
    audioLocation: '27°28′N 94°54′E · Upper Assam · 01:34',
    audioTranscript: 'Simulated field recording transcript (Upper Assam): Early morning river fog lifting off smallholder plots along the Brahmaputra, two-leaf-and-a-bud plucking into bamboo baskets, and slow ambient air circulation across elevated withering trays.'
  },
  'limestone-and-curcumin-jaintia-hills': {
    slug: 'limestone-and-curcumin-jaintia-hills',
    title: 'Limestone & Curcumin: Winter Harvest in the West Jaintia Hills',
    deck: 'Inside Laskein Block, where mineral-rich limestone uplands and dry January sunshine yield the world’s highest-curcumin heirloom turmeric.',
    badge: 'WEST JAINTIA HILLS · 1,280m ASL',
    heroImg: '/assets/images/landscape-meghalaya-hills.jpg',
    detailImg: '/assets/images/stall-spice-lakadong.jpg',
    productSlug: 'lakadong-turmeric-reserve',
    relatedProducts: ['lakadong-turmeric-reserve', 'sohra-hill-ginger', 'arunachal-wild-hill-pepper'],
    audioTitle: 'Field Audio Study: Winter Rhizome Harvest & Slicing (West Jaintia Hills)',
    audioLocation: '25°26′N 92°17′E · Meghalaya · 01:34',
    audioTranscript: 'Simulated field recording transcript (Meghalaya): Hand-lifting mature Lakadong rhizomes from friable limestone soil in January, washing in cold hill stream water, and slicing rhizome fingers for sun-curing on woven bamboo mats.'
  },
  'alder-smoke-and-monsoon-mist': {
    slug: 'alder-smoke-and-monsoon-mist',
    title: 'Alder Smoke & Monsoon Mist: Curing Raja Mircha in Mon District',
    deck: 'Why fourteen days on slatted bamboo racks above smouldering Himalayan alder hearths turns fierce heat into layered culinary depth.',
    badge: 'MON DISTRICT · 1,460m ASL',
    heroImg: '/assets/images/journal-preservation-loft.jpg',
    detailImg: '/assets/images/stall-chilli-smoked.jpg',
    productSlug: 'alder-smoked-naga-king-chilli',
    relatedProducts: ['alder-smoked-naga-king-chilli', 'sirarakhong-hathei-chilli', 'barak-valley-smoked-birdseye'],
    audioTitle: 'Field Audio Study: Fourteen-Day Alder Hearth Curing Loft (Mon District)',
    audioLocation: '26°43′N 95°01′E · Nagaland · 01:34',
    audioTranscript: 'Simulated field recording transcript (Nagaland): Steady embers of Alnus nepalensis (Himalayan alder) warming the slatted bamboo drying rack above a domestic hearth while monsoon mist settles over the hills of Mon District.'
  }
};

const JOURNALS_DATA = {
  'smoke-mist-and-limestone-terroir': {
    slug: 'smoke-mist-and-limestone-terroir',
    kicker: 'THE PENBRAE JOURNAL · TERROIR & TRADITION',
    title: 'Smoke, Mist & Limestone: Why Preservation Is the Second Harvest of Northeast India',
    deck: 'From bamboo smoke-lofts in Mon District to sun-warmed slate courtyards in Meghalaya, how traditional preservation shapes the flavour of Northeast India.',
    img: '/assets/images/journal-preservation-loft.jpg',
    badge: 'ISSUE 01 · 8 MIN READ',
    products: ['singpho-bamboo-smoked-tea', 'arunachal-wild-hill-pepper'],
    makerSlug: 'ziro-valley-forest-foragers',
    storySlug: 'alder-smoke-and-monsoon-mist',
    paragraphs: [
      'Across the hills of Meghalaya, Nagaland, and Upper Assam, moisture is an ever-present force. When annual rainfall is measured in metres rather than millimetres, a freshly harvested chilli pod, citrus-pepper husk, or tea shoot cannot simply be left in an open shed. Without skilled post-harvest intervention, subtropical humidity quickly erases weeks of careful cultivation.',
      'Out of this climatic necessity arose a remarkable regional vocabulary of preservation: slatted bamboo drying lofts suspended above domestic hearths in Mon District; green bamboo cylinders packed with pan-fired Assamica tea leaves among the Singpho; and thinly sliced Lakadong rhizomes turned by hand across elevated mats during the crisp, dry mornings of January.',
      'For the cook or tea drinker in Cardiff, these methods are never mere technicalities. Smoke, sun, and bamboo vessel curing transform fleeting raw harvests into enduring culinary architecture—imparting notes of toasted wood, resin, and mineral clarity that industrial dehydrators cannot replicate.'
    ],
    pullquote: 'In the monsoon belt of Northeast India, preservation is not an afterthought—it is where raw harvest becomes culinary architecture.',
    audioTitle: 'Field Audio Study: Bamboo Smoke-Loft & Monsoon Rain (Northeast India)',
    audioLocation: '27°15′N 95°10′E · Upper Assam / Arunachal Border · 01:34',
    audioTranscript: 'Simulated field recording transcript: Gentle crackle of hearth embers beneath green bamboo cylinders of Singpho Phalap tea and overhead drying trays during a late-afternoon valley rain.'
  },
  'orthodox-vs-ctc-assam-leaf': {
    slug: 'orthodox-vs-ctc-assam-leaf',
    kicker: 'THE PENBRAE JOURNAL · TEA TRADITIONS',
    title: 'Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam',
    deck: 'How smallholder hand-rolling on woven bamboo mats preserves golden pubescent tips, toasted malt, and honeyed muscatel notes.',
    img: '/assets/images/stall-tea-orthodox.jpg',
    badge: 'ISSUE 01 · 6 MIN READ',
    products: ['upper-assam-tippy-orthodox', 'namdapha-wild-forest-white-tea'],
    makerSlug: 'upper-assam-orthodox-collective',
    storySlug: 'mist-over-the-brahmaputra-autumn-pluck',
    paragraphs: [
      'For over a century, the British tea trade knew Assam primarily through commodity CTC (Crush-Tear-Curl) granules—engineered to yield a rapid, astringent dark liquor designed for milk and sugar. In doing so, the extraordinary aromatic complexity of unbroken Camellia sinensis var. assamica leaf was largely obscured.',
      'When plucked as two leaves and a silver-gold terminal bud during the cool, misty mornings of late November and rolled gently by hand on woven bamboo tables, the broad Assamica leaf behaves entirely differently. Cell walls rupture gradually rather than shattering, allowing essential oils and polyphenols to oxidize at a measured pace.',
      'Steeped at 92°C without milk, a single-origin autumn orthodox Assam reveals layers of toasted barley malt, dark heather honey, and ripe orchard plum with a clean, non-astringent mineral finish across three consecutive infusions.'
    ],
    pullquote: 'When the broad Assamica leaf is rolled gently by hand rather than crushed by steel rollers, astringency gives way to heather honey, toasted malt, and orchard fruit.',
    audioTitle: 'Field Audio Study: Hand-Rolling Autumn Tippy Leaf (Dibrugarh)',
    audioLocation: '27°28′N 94°54′E · Dibrugarh, Upper Assam · 01:34',
    audioTranscript: 'Simulated field recording transcript (Dibrugarh): The rhythmic circular motion of withered tea shoots being rolled by hand across woven bamboo mats, followed by arrival cupping notes in Cardiff.'
  },
  'tempering-lakadong-and-smoked-chilli': {
    slug: 'tempering-lakadong-and-smoked-chilli',
    kicker: 'THE PENBRAE JOURNAL · CULINARY NOTES',
    title: 'Tempering in Warm Fat: Lakadong & Alder-Smoked Chilli',
    deck: 'Kitchen guidance on bloom temperatures, lipid solubility of curcumin, and infusing whole smoked pods without scorching volatile aromatics.',
    img: '/assets/images/stall-spice-lakadong.jpg',
    badge: 'ISSUE 01 · 5 MIN READ',
    products: ['lakadong-turmeric-reserve', 'sirarakhong-hathei-chilli'],
    makerSlug: 'jaintia-hills-lakadong-growers',
    storySlug: 'limestone-and-curcumin-jaintia-hills',
    paragraphs: [
      'High-curcumin Lakadong turmeric and sun-cured heirloom chillies contain volatile aromatic compounds and fat-soluble pigments that respond dramatically to temperature. Dropped raw into boiling water, their brightest top notes remain locked inside the plant fibre; dropped into smoking-hot oil, their delicate sugars scorch within seconds.',
      'In our Cardiff test kitchen, we recommend warming ghee or cold-pressed rapeseed oil to a gentle shimmer (roughly 120°C–130°C) before adding half a teaspoon of stone-milled Lakadong rhizome or a ribbon of Sirarakhong Hathei chilli. Within twenty seconds, lipid-soluble curcuminoids and carotenes dissolve into a luminous saffron-ruby oil.',
      'Pair Lakadong turmeric with freshly cracked black or wild hill pepper to enhance bioavailability and add a bright citrus-pine counterpoint to slow-braised legumes, roast root vegetables, or broth.'
    ],
    pullquote: 'Treat single-harvest spices like fragile aromatics rather than background colour: twenty seconds in warm fat unlocks months of upland sunshine.',
    audioTitle: 'Field Audio Study: Stone-Milling & Tempering Trials (Cardiff & Jaintia Hills)',
    audioLocation: '51°28′N 03°10′W · Cardiff Tasting Kitchen · 01:34',
    audioTranscript: 'Simulated field recording transcript: Small-batch grinding of sun-cured Lakadong turmeric slices and the gentle sizzle of whole spice tempering in warm ghee.'
  },
  'alder-trees-and-jhum-agroforestry': {
    slug: 'alder-trees-and-jhum-agroforestry',
    kicker: 'THE PENBRAE JOURNAL · ARTISAN INTERVIEWS',
    title: 'Nitrogen-Fixing Alder Trees & Rotational Hill Plots in Nagaland',
    deck: 'Why Himalayan alder is both the ecological partner of upland soil fertility and the aromatic fuel of the Naga drying hearth.',
    img: '/assets/images/stall-chilli-smoked.jpg',
    badge: 'ISSUE 01 · 7 MIN READ',
    products: ['alder-smoked-naga-king-chilli', 'barak-valley-smoked-birdseye'],
    makerSlug: 'nagaland-alder-smoke-stewards',
    storySlug: 'alder-smoke-and-monsoon-mist',
    paragraphs: [
      'Across the steep ridges of Nagaland, smallholder cultivators have practiced alder-based agroforestry for centuries. The Himalayan alder (Alnus nepalensis) is a non-leguminous nitrogen-fixing tree whose root nodules naturally replenish upland soils between rotational cropping cycles.',
      'Rather than clearing hill slopes bare, growers pollard the alder trunks at chest height when opening a plot for Raja Mircha chillies, upland rice, and heirloom job’s tears. The pruned alder branches provide clean, resin-free firewood for the domestic hearth, while the living root system stabilizes the hillside against monsoon erosion.',
      'When ripe Naga King Chillies are harvested at the end of the rains, they are laid across bamboo racks directly above those same alder-wood hearths—completing an ecological circle you can taste in every smoky, fruit-forward pod.'
    ],
    pullquote: 'The same Himalayan alder tree that nourishes the hill soil with nitrogen provides the sweet, clean woodsmoke that cures the harvest.',
    audioTitle: 'Field Audio Study: Alder Agroforestry & Hearth Curing (Mon District)',
    audioLocation: '26°43′N 95°01′E · Mon District, Nagaland · 01:34',
    audioTranscript: 'Simulated field recording transcript (Nagaland): Wind through pollarded Himalayan alder trees on a terraced hillside in Mon District, followed by the quiet crackle of the curing hearth.'
  }
};

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderHeader(activePath, bodyClass = '', seo = {}) {
  const pageTitle = seo.title || 'Penbrae & Co Ltd — Rare Teas, Spices & Chillies from Northeast India | Cardiff';
  const pageDesc = seo.description || 'Penbrae & Co Ltd is a Cardiff-based importer of rare single-harvest teas, heirloom spices, and smoked chillies from smallholder growers across Northeast India.';
  const canonicalPath = seo.canonicalPath !== undefined ? seo.canonicalPath : (activePath || '/');
  const canonicalUrl = SITE_URL + (canonicalPath === '/' ? '' : canonicalPath);
  const ogType = seo.ogType || 'website';
  const ogImage = seo.ogImage ? (seo.ogImage.startsWith('http') ? seo.ogImage : SITE_URL + seo.ogImage) : SITE_URL + '/assets/images/hero-assam-mist.jpg';
  const robotsMeta = seo.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">';

  const baseOrgSchema = {
    '@type': 'Organization',
    '@id': SITE_URL + '/#organization',
    name: 'Penbrae & Co Ltd',
    url: SITE_URL,
    logo: SITE_URL + '/assets/images/favicon.svg',
    creator: {
      '@type': 'Person',
      name: 'Alexhzier',
      url: 'https://github.com/Alexhzier'
    },
    description: 'Cardiff-based purveyors of small-lot single-harvest teas, heirloom rhizomes, and smoked chillies from Northeast India.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cardiff',
      addressRegion: 'Wales',
      addressCountry: 'GB'
    }
  };

  const graph = [baseOrgSchema];
  if (Array.isArray(seo.schema)) {
    seo.schema.forEach(item => graph.push(item));
  } else if (seo.schema) {
    graph.push(seo.schema);
  }

  const jsonLdString = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });

  return `<!--
  PENBRAE & CO. LTD · ARCHIVAL FIELD MONOGRAPH & EDITORIAL COMMERCE
  Concept, Design & Full-Stack Engineering by Alexhzier (https://github.com/Alexhzier)
  All Rights Reserved · Registered Portfolio Project
-->
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeAttr(pageTitle)}</title>
  <meta name="description" content="${escapeAttr(pageDesc)}">
  <meta name="author" content="Alexhzier">
  <meta name="creator" content="Alexhzier">
  <meta name="copyright" content="Copyright © 2026 Alexhzier. All rights reserved.">
  ${robotsMeta}
  <link rel="canonical" href="${escapeAttr(canonicalUrl)}">
  <meta property="og:site_name" content="Penbrae &amp; Co Ltd">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="${escapeAttr(ogType)}">
  <meta property="og:title" content="${escapeAttr(pageTitle)}">
  <meta property="og:description" content="${escapeAttr(pageDesc)}">
  <meta property="og:url" content="${escapeAttr(canonicalUrl)}">
  <meta property="og:image" content="${escapeAttr(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(pageTitle)}">
  <meta name="twitter:description" content="${escapeAttr(pageDesc)}">
  <meta name="twitter:image" content="${escapeAttr(ogImage)}">
  <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="/assets/css/design-system.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/pages.css">
  <script type="application/ld+json">${jsonLdString}</script>
</head>
<body class="${bodyClass}">
<div id="penbrae-preloader" class="editorial-preloader" aria-hidden="true">
  <div class="editorial-preloader__inner">
    <div class="kicker-index" style="color:var(--color-brass-light);margin-bottom:0.5rem;letter-spacing:0.18em;">CARDIFF DISPATCH · PROVENANCE LEDGER</div>
    <div class="editorial-preloader__logo">PENBRAE &amp; CO.</div>
    <div class="editorial-preloader__sub">Single-Harvest Teas · Heirloom Rhizomes · Hearth-Smoked Chillies</div>
    
    <!-- 4 Tea Leaves Botanical Progress Indicator -->
    <div class="preloader-tea-leaves" style="display:flex;justify-content:center;align-items:center;gap:1.1rem;margin:1.4rem 0 0.8rem 0;">
      <svg viewBox="0 0 32 32" width="38" height="38" class="preloader-tea-leaf" aria-hidden="true">
        <defs>
          <clipPath id="penbraeLeafClip1">
            <rect id="penbrae-leaf-clip-rect-1" x="0" y="32" width="32" height="0" />
          </clipPath>
        </defs>
        <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="rgba(245, 240, 230, 0.08)" stroke="rgba(245, 240, 230, 0.25)" stroke-width="1.2" />
        <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="rgba(245, 240, 230, 0.18)" stroke-width="0.8" />
        <g clip-path="url(#penbraeLeafClip1)">
          <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="#C6A96B" stroke="#E5D19A" stroke-width="1.2" />
          <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="#FFF7E6" stroke-width="1" />
        </g>
      </svg>
      <svg viewBox="0 0 32 32" width="38" height="38" class="preloader-tea-leaf" aria-hidden="true">
        <defs>
          <clipPath id="penbraeLeafClip2">
            <rect id="penbrae-leaf-clip-rect-2" x="0" y="32" width="32" height="0" />
          </clipPath>
        </defs>
        <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="rgba(245, 240, 230, 0.08)" stroke="rgba(245, 240, 230, 0.25)" stroke-width="1.2" />
        <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="rgba(245, 240, 230, 0.18)" stroke-width="0.8" />
        <g clip-path="url(#penbraeLeafClip2)">
          <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="#C6A96B" stroke="#E5D19A" stroke-width="1.2" />
          <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="#FFF7E6" stroke-width="1" />
        </g>
      </svg>
      <svg viewBox="0 0 32 32" width="38" height="38" class="preloader-tea-leaf" aria-hidden="true">
        <defs>
          <clipPath id="penbraeLeafClip3">
            <rect id="penbrae-leaf-clip-rect-3" x="0" y="32" width="32" height="0" />
          </clipPath>
        </defs>
        <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="rgba(245, 240, 230, 0.08)" stroke="rgba(245, 240, 230, 0.25)" stroke-width="1.2" />
        <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="rgba(245, 240, 230, 0.18)" stroke-width="0.8" />
        <g clip-path="url(#penbraeLeafClip3)">
          <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="#C6A96B" stroke="#E5D19A" stroke-width="1.2" />
          <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="#FFF7E6" stroke-width="1" />
        </g>
      </svg>
      <svg viewBox="0 0 32 32" width="38" height="38" class="preloader-tea-leaf" aria-hidden="true">
        <defs>
          <clipPath id="penbraeLeafClip4">
            <rect id="penbrae-leaf-clip-rect-4" x="0" y="32" width="32" height="0" />
          </clipPath>
        </defs>
        <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="rgba(245, 240, 230, 0.08)" stroke="rgba(245, 240, 230, 0.25)" stroke-width="1.2" />
        <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="rgba(245, 240, 230, 0.18)" stroke-width="0.8" />
        <g clip-path="url(#penbraeLeafClip4)">
          <path d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z" fill="#C6A96B" stroke="#E5D19A" stroke-width="1.2" />
          <path d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18" fill="none" stroke="#FFF7E6" stroke-width="1" />
        </g>
      </svg>
    </div>

    <!-- Live Numeric Percentage -->
    <div id="penbrae-preload-percent" class="tabular-nums" style="font-family:var(--font-mono);font-size:1.15rem;color:var(--color-brass-light);font-weight:500;margin-bottom:0.6rem;letter-spacing:0.04em;">0%</div>

    <div class="editorial-preloader__track">
      <div id="penbrae-preload-bar" class="editorial-preloader__bar" style="width:0%;"></div>
    </div>
    <div class="editorial-preloader__status" style="font-family:var(--font-mono);font-size:0.68rem;color:rgba(245,240,230,0.6);margin-top:0.75rem;letter-spacing:0.08em;">UPPER ASSAM ↔ MEGHALAYA ↔ NAGALAND</div>
  </div>
</div>
<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="editorial-dispatch-bar" role="region" aria-label="Provenance and Dispatch Notice">
  <span>PENBRAE &amp; CO LTD · CARDIFF, WALES — SMALL-LOT TEAS, SPICES &amp; CHILLIES FROM NORTHEAST INDIA</span>
  <span class="editorial-dispatch-bar__coords">FREE UK DISPATCH OVER £50 · CURRENCY: GBP (£)</span>
</div>

<header class="site-masthead" role="banner">
  <div class="site-masthead__inner">
    <button type="button" class="mobile-menu-toggle" data-mobile-nav-toggle aria-expanded="false" aria-controls="penbrae-mobile-drawer">
      Menu [≡]
    </button>

    <nav aria-label="Primary Navigation">
      <ul class="site-nav-primary">
        <li><a href="/stalls" ${activePath === '/stalls' ? 'aria-current="page"' : ''}>The Stalls</a></li>
        <li><a href="/stall/teas" ${activePath === '/stall/teas' ? 'aria-current="page"' : ''}>Teas</a></li>
        <li><a href="/stall/spices" ${activePath === '/stall/spices' ? 'aria-current="page"' : ''}>Spices</a></li>
        <li><a href="/stall/chillies" ${activePath === '/stall/chillies' ? 'aria-current="page"' : ''}>Chillies</a></li>
        <li><a href="/makers" ${activePath === '/makers' ? 'aria-current="page"' : ''}>Makers</a></li>
      </ul>
    </nav>

    <a href="/" class="site-brand" aria-label="Penbrae & Co Ltd — Home">
      <span class="site-brand__wordmark">Penbrae &amp; Co</span>
      <span class="site-brand__sub">Cardiff · Northeast India</span>
    </a>

    <div class="site-nav-utility">
      <a href="/journal" class="hide-mobile" ${activePath.startsWith('/journal') ? 'aria-current="page"' : ''}>Journal</a>
      <a href="/about" class="hide-mobile" ${activePath === '/about' ? 'aria-current="page"' : ''}>About</a>
      <a href="/subscribe" class="hide-mobile" ${activePath === '/subscribe' ? 'aria-current="page"' : ''}>Newsletter</a>
      <a href="/my-account" class="hide-mobile" ${activePath === '/my-account' ? 'aria-current="page"' : ''}>Account</a>
      <button type="button" data-basket-open aria-label="Open shopping basket">
        <span>Basket</span>
        <span class="basket-count-pill" data-basket-count>0</span>
      </button>
    </div>
  </div>

  <nav id="penbrae-mobile-drawer" class="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true">
    <div class="kicker-index" style="margin-bottom:0.75rem;">Menu — Stalls, Makers &amp; Journal</div>
    <ul class="mobile-nav-drawer__list">
      <li><a href="/stalls"><span>All Three Stalls</span><span class="kicker-index">Overview</span></a></li>
      <li><a href="/stall/teas"><span>The Tea Stall</span><span class="kicker-index">Assam &amp; Arunachal</span></a></li>
      <li><a href="/stall/spices"><span>The Spice Stall</span><span class="kicker-index">Meghalaya &amp; Ziro</span></a></li>
      <li><a href="/stall/chillies"><span>The Chilli Stall</span><span class="kicker-index">Nagaland &amp; Manipur</span></a></li>
      <li><a href="/makers"><span>Meet the Makers</span><span class="kicker-index">Interactive Map</span></a></li>
      <li><a href="/journal"><span>The Penbrae Journal</span><span class="kicker-index">Essays</span></a></li>
      <li><a href="/about"><span>About Penbrae &amp; Co</span><span class="kicker-index">Our Story</span></a></li>
      <li><a href="/subscribe"><span>Seasonal Newsletter</span><span class="kicker-index">Subscribe</span></a></li>
      <li><a href="/my-account"><span>Customer Account</span><span class="kicker-index">Orders</span></a></li>
      <li><a href="/basket"><span>Shopping Basket</span><span class="kicker-index">GBP (£)</span></a></li>
    </ul>
  </nav>
</header>

<div id="penbrae-basket-backdrop" class="basket-drawer-backdrop"></div>
<aside id="penbrae-basket-drawer" class="basket-drawer" role="dialog" aria-modal="true" aria-label="Shopping Basket" aria-hidden="true">
  <div class="basket-drawer__header">
    <div>
      <div class="kicker-index">SHOPPING BASKET</div>
      <h2 style="font-size:1.55rem;margin:0.2rem 0 0 0;">Your Selected Lots</h2>
    </div>
    <button type="button" data-basket-close class="filter-pill" aria-label="Close basket drawer">Close [×]</button>
  </div>
  <div id="penbrae-basket-drawer-items" class="basket-drawer__items"></div>
  <div class="basket-drawer__footer">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.5rem;">
      <span style="font-family:var(--font-mono);font-size:0.76rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">Subtotal (GBP)</span>
      <span id="penbrae-basket-drawer-subtotal" class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.75rem;">£0.00</span>
    </div>
    <p style="font-size:0.8rem;color:var(--color-ink-muted);margin-bottom:1rem;">
      Complimentary UK tracked dispatch on orders over £50.00 (£4.50 standard).
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
      <a href="/basket" class="btn-editorial btn-editorial--outline" style="justify-content:center;">View Basket</a>
      <a href="/checkout" data-drawer-checkout-btn aria-disabled="true" class="btn-editorial" style="justify-content:center;">Checkout →</a>
    </div>
  </div>
</aside>

<main id="main-content" role="main">`;
}

function renderContextualExploreSection(nodes, heading = 'Connected Origins, Makers & Essays', kicker = 'CONTINUE EXPLORING') {
  if (!nodes || !nodes.length) return '';
  return `
<section class="provenance-compass" aria-label="Related Provenance and Reading">
  <div class="penbrae-container">
    <div class="provenance-compass__header">
      <div>
        <span class="kicker-index">${kicker}</span>
        <h2 style="font-size:2rem;margin:0.35rem 0 0 0;">${heading}</h2>
      </div>
      <a href="/makers" class="link-editorial">Explore Producer Map →</a>
    </div>
    <div class="provenance-compass__nodes">
      ${nodes.map(n => `
      <a href="${n.url}" class="provenance-node">
        <span class="provenance-node__type">${n.type}</span>
        <h3 class="provenance-node__title">${n.title}</h3>
        <p class="provenance-node__meta">${n.meta} →</p>
      </a>`).join('')}
    </div>
  </div>
</section>`;
}

function renderInstagramFieldNotes() {
  const notes = [
    { id: 'STUDY 01', location: 'Dibrugarh, Upper Assam', date: 'Autumn Harvest', img: '/assets/images/hero-assam-mist.jpg', caption: 'Morning river mist lifting off smallholder Assamica plots before the late-November pluck.' },
    { id: 'STUDY 02', location: 'West Jaintia Hills, Meghalaya', date: 'Winter Harvest', img: '/assets/images/stall-spice-lakadong.jpg', caption: 'Freshly washed Lakadong turmeric rhizomes split for sun-curing on woven bamboo mats.' },
    { id: 'STUDY 03', location: 'Mon District, Nagaland', date: 'Hearth Curing', img: '/assets/images/stall-chilli-smoked.jpg', caption: 'Alder-wood smoke rising through the slatted loft where whole Raja Mircha pods cure.' },
    { id: 'STUDY 04', location: 'Cardiff Tasting Room', date: 'Arrival Cupping', img: '/assets/images/tea-infusion-cup.jpg', caption: 'Stoneware vessels and brass scales prepared in Cardiff for arrival inspection of Lot 26-A.' }
  ];
  return `
<section class="editorial-section" aria-label="Field Notes and Visual Studies">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">VISUAL FIELD NOTEBOOK</span>
        <h2 style="margin:0.35rem 0 0 0;">Studies from Northeast India &amp; Cardiff</h2>
      </div>
      <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">Editorial Photography Studies · Curated Portfolio Archive</span>
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

function renderAudioModule(
  title = 'Field Audio Study: Morning Pluck & Bamboo Rolling Table (Dibrugarh)',
  location = '27°28′N 94°54′E · Upper Assam · 01:34',
  transcript = 'Simulated field recording transcript (Dibrugarh, Upper Assam): Ambient sound of morning mist dripping from shade trees onto broad Camellia sinensis var. assamica leaves, followed by the rhythmic hand-rolling of withered leaf across woven bamboo tables.'
) {
  return `
<div class="audio-field-module" data-audio-module data-duration-sec="94" role="region" aria-label="${escapeAttr(title)}">
  <div class="audio-field-module__top">
    <span class="audio-sim-badge" data-audio-sim-status>DEMO AUDIO PLAYER · SIMULATED TIMELINE &amp; VERBATIM TRANSCRIPT</span>
    <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">${location}</span>
  </div>
  <h3 style="font-size:1.3rem;margin:0.5rem 0 0.65rem 0;">${title}</h3>
  <div class="audio-field-module__controls">
    <button type="button" class="audio-play-btn" data-audio-toggle aria-pressed="false">Listen (Demo) ▶</button>
    <div class="audio-progress-track" aria-hidden="true">
      <div class="audio-progress-bar" data-audio-bar></div>
    </div>
    <span class="tabular-nums" data-audio-time style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">00:00 / 01:34</span>
  </div>
  <details class="audio-transcript-details">
    <summary>Read Verbatim Field Transcript</summary>
    <div class="audio-transcript-body">
      <p style="margin:0;">${transcript}</p>
    </div>
  </details>
</div>`;
}

function renderFooter() {
  return `</main>
<footer class="site-colophon" role="contentinfo">
  <div class="penbrae-container">
    <div class="site-colophon__grid">
      <div>
        <div class="kicker-index" style="color:var(--color-brass-light);margin-bottom:0.75rem;">PENBRAE &amp; CO LTD · CARDIFF</div>
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
        <h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">Origins &amp; Journal</h3>
        <ul class="site-colophon__list">
          <li><a href="/makers">Meet the Makers (Interactive Map)</a></li>
          <li><a href="/maker/upper-assam-orthodox-collective">Producer Profile: Upper Assam Collective</a></li>
          <li><a href="/story/mist-over-the-brahmaputra-autumn-pluck">Harvest Story: Autumn Tippy Pluck</a></li>
          <li><a href="/journal">The Penbrae Journal</a></li>
          <li><a href="/about">About Penbrae &amp; Co</a></li>
          <li><a href="/subscribe">Seasonal Newsletter</a></li>
        </ul>
      </div>
      <div>
        <h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">Customer Care &amp; Policies</h3>
        <ul class="site-colophon__list">
          <li><a href="/basket">Shopping Basket</a></li>
          <li><a href="/checkout">Checkout (Sandbox Mode)</a></li>
          <li><a href="/my-account">Customer Account</a></li>
          <li><a href="/shipping-returns">Shipping &amp; Returns</a></li>
          <li><a href="/privacy-policy">Privacy Policy &amp; UK GDPR</a></li>
          <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
          <li><a href="/contact">Contact &amp; Wholesale Enquiries</a></li>
        </ul>
      </div>
    </div>
    <div class="site-colophon__bottom">
      <div>
        <span>&copy; 2026 Penbrae &amp; Co Ltd. All rights reserved.</span>
        <span style="display:inline-block;margin:0 0.5rem;color:var(--color-brass);">·</span>
        <span>Concept, Design &amp; Full-Stack Engineering by <a href="https://github.com/Alexhzier" target="_blank" rel="noopener noreferrer" style="color:var(--color-brass-light);text-decoration:underline;text-underline-offset:3px;font-weight:500;">Alexhzier</a></span>
      </div>
      <div>
        <span>PORTFOLIO DEMONSTRATION · CARDIFF ↔ NORTHEAST INDIA</span>
      </div>
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
  <a href="/product/${p.slug}" class="product-specimen__media" aria-label="${escapeAttr(p.title)}">
    <img src="${p.img}" alt="${escapeAttr(p.title)}" class="product-specimen__img" loading="lazy">
  </a>
  <div class="product-specimen__body">
    <div class="product-specimen__region">${p.region}</div>
    <h2 class="product-specimen__title"><a href="/product/${p.slug}">${p.title}</a></h2>
    <p class="product-specimen__notes">${p.tasting}</p>
    <div class="product-specimen__provenance-links">
      <a href="/maker/${p.makerSlug}">Meet the Maker</a>
      <a href="/story/${p.storySlug}">Harvest Story</a>
    </div>
  </div>
  <div class="product-specimen__footer">
    <div class="product-specimen__price">£${p.price.toFixed(2)} <span class="product-specimen__weight">/ ${p.weight.split(' ')[0]}</span></div>
    <button type="button" class="product-specimen__add-btn"
      data-add-to-basket
      data-product-id="${p.slug}"
      data-product-title="${escapeAttr(p.title)}"
      data-product-variant="${escapeAttr(p.weight)}"
      data-product-price="${p.price.toFixed(2)}"
      data-product-url="/product/${p.slug}"
      data-product-region="${escapeAttr(p.region)}">
      Add to Basket +
    </button>
  </div>
</article>`;
}

function renderHomePage() {
  const seo = {
    title: 'Penbrae & Co Ltd — Rare Teas, Spices & Chillies from Northeast India | Cardiff',
    description: 'Rare orthodox Assam teas, single-harvest Lakadong turmeric, wild hill peppers, and alder-smoked Naga chillies from Northeast India, curated in Cardiff, Wales.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: '/assets/images/hero-assam-mist.jpg',
    schema: {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL,
      name: 'Penbrae & Co Ltd',
      publisher: { '@id': SITE_URL + '/#organization' }
    }
  };

  return renderHeader('/', '', seo) + `
<section class="home-hero" aria-label="Editorial Monograph Cover">
  <div class="home-hero__grid">
    <div class="home-hero__editorial-column">
      <div class="home-hero__issue-meta">
        <span>ISSUE NO. 01 · AUTUMN / WINTER HARVEST</span>
        <span>CARDIFF ↔ NORTHEAST INDIA</span>
      </div>
      <div>
        <span class="kicker-index">SINGLE-HARVEST INGREDIENT HOUSE</span>
        <h1 class="home-hero__headline">Where River Mist, Limestone &amp; Alder Smoke Shape the Harvest.</h1>
        <p class="lead-standfirst">Rare orthodox teas, heirloom rhizomes, and hearth-smoked chillies from smallholder gardens across Northeast India—curated in Cardiff.</p>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:var(--space-5);">
          <a href="/stalls" class="btn-editorial"><span>Enter The Three Stalls</span><span aria-hidden="true">→</span></a>
          <a href="/makers" class="btn-editorial btn-editorial--outline"><span>Explore Producer Map</span></a>
        </div>
      </div>
      <div class="home-hero__ledger-foot">
        <div>
          <div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">ORIGIN CORRIDOR</div>
          <strong>Assam · Meghalaya · Nagaland · Arunachal · Manipur</strong>
        </div>
        <div>
          <div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">DISPATCH ORIGIN</div>
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
          <a href="/product/upper-assam-tippy-orthodox" class="link-editorial" style="color:var(--color-parchment);border-color:var(--color-brass-light);">View Lot (£28.00) →</a>
          <a href="/story/mist-over-the-brahmaputra-autumn-pluck" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);text-decoration:underline;">Harvest Story</a>
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
      <div class="col-span-7 editorial-split-copy">
        <span class="kicker-index">01 · SOURCING PHILOSOPHY</span>
        <h2 style="font-size:clamp(2.1rem, 3.1vw, 3.25rem);line-height:1.12;margin:0.5rem 0 var(--space-4) 0;">An ingredient is never anonymous. Behind every leaf, rhizome, and smoked pod stands a landscape and a human hand.</h2>
        <p style="color:var(--color-ink-secondary);max-width:56ch;">From our tasting room in Cardiff, Penbrae &amp; Co documents and imports small-lot harvests from Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur—preserving the exact garden, harvest week, and craft tradition of every lot.</p>
        <div style="margin-top:var(--space-4);">
          <a href="/about" class="link-editorial">Read Our Story →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="editorial-section" style="padding-bottom:0;border-bottom:none;" aria-label="The Three Stalls">
  <div class="penbrae-container" style="margin-bottom:var(--space-5);">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
      <div>
        <span class="kicker-index">02 · THE COLLECTION</span>
        <h2 style="margin:0.35rem 0 0 0;">Explore The Three Stalls</h2>
      </div>
      <a href="/stalls" class="link-editorial">Compare All Three Stalls (9 Lots) →</a>
    </div>
  </div>
  <div class="stall-triptych">
    <article class="stall-portal stall-portal--teas">
      <div>
        <div class="stall-portal__number"><span>STALL I · 3 LOTS</span><span>ASSAM &amp; ARUNACHAL</span></div>
        <div class="stall-portal__photo">
          <img src="/assets/images/stall-tea-orthodox.jpg" alt="Whole-leaf orthodox Assam tea with golden tips" loading="lazy">
        </div>
        <h3 class="stall-portal__title">The Tea Stall</h3>
        <div class="stall-portal__mood">Calm, ceremonial, delicate, contemplative.</div>
        <p style="color:var(--color-ink-secondary);font-size:0.94rem;">Unblended orthodox Assamica, high-altitude white buds, and Singpho hearth-smoked bamboo teas.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
        <a href="/stall/teas" class="btn-editorial">Enter Tea Stall →</a>
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £28.00</span>
      </div>
    </article>
    <article class="stall-portal stall-portal--spices">
      <div>
        <div class="stall-portal__number"><span>STALL II · 3 LOTS</span><span>MEGHALAYA &amp; ZIRO</span></div>
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
        <div class="stall-portal__number"><span>STALL III · 3 LOTS</span><span>NAGALAND &amp; MANIPUR</span></div>
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
          <span class="kicker-index">03 · SEASONAL HIGHLIGHT</span>
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
          <a href="/product/alder-smoked-naga-king-chilli" class="link-editorial">View Product Details →</a>
          <a href="/story/alder-smoke-and-monsoon-mist" class="link-editorial">Read Harvest Story →</a>
        </div>
      </div>

      <div class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);margin-bottom:1rem;">
          <span class="kicker-index">04 · PRODUCER SPOTLIGHT</span>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">PRODUCER M-01 · UPPER ASSAM</span>
        </div>
        <div class="journal-card__media" style="aspect-ratio:16/9;">
          <img src="/assets/images/maker-hands-crafting.jpg" alt="Artisan hands rolling withered tea leaves on woven bamboo tray" loading="lazy">
        </div>
        <h2 style="font-size:2rem;margin:0.5rem 0 0.25rem 0;"><a href="/maker/upper-assam-orthodox-collective" style="color:var(--color-charcoal);text-decoration:none;">Brahmaputra Smallholder Tea Collective</a></h2>
        <div class="latin-taxonomy" style="margin-bottom:0.85rem;">Dibrugarh &amp; Tinsukia, Upper Assam · 27°28′N 94°54′E</div>
        ${renderAudioModule(
          MAKERS_DATA['upper-assam-orthodox-collective'].audioTitle,
          '27°28′N 94°54′E · Upper Assam · 01:34',
          MAKERS_DATA['upper-assam-orthodox-collective'].audioTranscript
        )}
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;">
          <a href="/maker/upper-assam-orthodox-collective" class="btn-editorial btn-editorial--outline">Read Producer Profile →</a>
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
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">27°28′N 94°54′E · 140m – 1,520m ASL</div>
        <h3 style="margin:0.35rem 0;">Assam &amp; Arunachal Canopy</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Alluvial river valleys and eastern Himalayan forest margins nurturing tippy orthodox Assamica, Singpho bamboo tea, and silver buds.</p>
        <a href="/stall/teas" class="link-editorial" style="color:var(--color-brass-light);">Explore The Tea Stall →</a>
      </div>
      <div class="col-span-4">
        <div class="region-card__photo">
          <img src="/assets/images/landscape-meghalaya-hills.jpg" alt="Cloud-wrapped limestone hills of Meghalaya" loading="lazy">
        </div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">25°26′N 92°17′E · 1,280m – 1,680m ASL</div>
        <h3 style="margin:0.35rem 0;">Meghalaya &amp; Ziro Uplands</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Limestone plateaus in West Jaintia and Sohra alongside Ziro Valley forests yielding Lakadong turmeric, hill ginger, and citrus pepper.</p>
        <a href="/stall/spices" class="link-editorial" style="color:var(--color-brass-light);">Explore The Spice Stall →</a>
      </div>
      <div class="col-span-4">
        <div class="region-card__photo">
          <img src="/assets/images/journal-preservation-loft.jpg" alt="Traditional bamboo drying loft in Nagaland" loading="lazy">
        </div>
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">26°43′N 95°01′E · 1,180m – 1,750m ASL</div>
        <h3 style="margin:0.35rem 0;">Nagaland &amp; Manipur Ridges</h3>
        <p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">Terraced mountain plots cultivating alder-smoked Raja Mircha, Sirarakhong Hathei crimson chillies, and upland bird’s-eye pods.</p>
        <a href="/stall/chillies" class="link-editorial" style="color:var(--color-brass-light);">Explore The Chilli Stall →</a>
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
          <span class="kicker-index">TEA TRADITIONS</span>
          <h3 style="font-size:1.45rem;margin:0.35rem 0;"><a href="/journal/orthodox-vs-ctc-assam-leaf" style="color:var(--color-charcoal);text-decoration:none;">Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam</a></h3>
          <a href="/journal/orthodox-vs-ctc-assam-leaf" class="link-editorial">Read Essay →</a>
        </article>
        <article class="journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-4);">
          <div class="journal-card__media" style="aspect-ratio:21/9;">
            <img src="/assets/images/stall-spice-lakadong.jpg" alt="Lakadong turmeric and spices" loading="lazy">
          </div>
          <span class="kicker-index">CULINARY NOTES</span>
          <h3 style="font-size:1.45rem;margin:0.35rem 0;"><a href="/journal/tempering-lakadong-and-smoked-chilli" style="color:var(--color-charcoal);text-decoration:none;">Tempering in Warm Fat: Lakadong &amp; Alder-Smoked Chilli</a></h3>
          <a href="/journal/tempering-lakadong-and-smoked-chilli" class="link-editorial">Read Essay →</a>
        </article>
      </div>
    </div>
  </div>
</section>

${renderInstagramFieldNotes()}

<section class="editorial-section editorial-section--deep" aria-label="Subscribe to the Penbrae Newsletter">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6">
        <span class="kicker-index">07 · SEASONAL DISPATCH</span>
        <h2 style="margin-top:0.4rem;">Harvest Letters &amp; First-Lot Notices</h2>
        <p style="color:var(--color-ink-secondary);">Subscribers receive field dispatches from Northeast India, producer interviews, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.</p>
      </div>
      <div class="col-span-6">
        <form method="post" data-penbrae-newsletter-form data-ajax-preview="true" style="background:var(--color-parchment-light);padding:var(--space-5);border:var(--rule-strong);">
          <div class="editorial-form-field">
            <label for="home-subscriber-email">Email Address</label>
            <input type="email" id="home-subscriber-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
          </div>
          <div class="consent-checkbox-box">
            <input type="checkbox" id="home-gdpr-consent" name="gdpr_consent" value="1" required>
            <label for="home-gdpr-consent">I consent to receive editorial dispatches and seasonal harvest notices from Penbrae &amp; Co Ltd (UK GDPR).</label>
          </div>
          <button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">Subscribe to the Dispatch →</button>
          <p data-newsletter-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.76rem;"></p>
        </form>
      </div>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderStallsOverviewPage() {
  const teaProducts = Object.values(PRODUCTS).filter(p => p.stall === 'teas');
  const spiceProducts = Object.values(PRODUCTS).filter(p => p.stall === 'spices');
  const chilliProducts = Object.values(PRODUCTS).filter(p => p.stall === 'chillies');

  const seo = {
    title: 'The Three Stalls — Teas, Spices & Chillies | Penbrae & Co Ltd',
    description: 'Explore all nine single-harvest lots across The Tea Stall, The Spice Stall, and The Chilli Stall—imported from Northeast India to Cardiff.',
    canonicalPath: '/stalls',
    ogType: 'website',
    ogImage: '/assets/images/stall-tea-orthodox.jpg'
  };

  return renderHeader('/stalls', 'stall-theme-teas', seo) + `
<section class="editorial-section" style="background:var(--color-parchment-deep);padding-bottom:var(--space-5);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">COMPLETE COLLECTION · 9 SEASONAL LOTS</span>
        <h1 style="margin-top:0.4rem;">The Three Stalls</h1>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">Three dedicated rooms—each shaped by the sensory discipline, harvest calendar, and preservation craft of its ingredients.</p>
      </div>
    </div>
  </div>
</section>

<div class="stalls-environment-bar" data-stalls-env-bar data-active-env="teas" role="navigation" aria-label="Jump between Stall sections">
  <div class="stalls-environment-bar__inner">
    <span class="kicker-index" style="margin:0;">SELECT A STALL · 9 CURATED LOTS</span>
    <div class="stalls-environment-bar__tabs">
      <a href="#stall-env-teas" class="stalls-env-tab is-active" data-env-target="teas">
        <span class="stalls-env-tab__dot" style="background:var(--color-forest);"></span>
        <span>I. The Tea Stall (3)</span>
      </a>
      <a href="#stall-env-spices" class="stalls-env-tab" data-env-target="spices">
        <span class="stalls-env-tab__dot" style="background:var(--color-terracotta);"></span>
        <span>II. The Spice Stall (3)</span>
      </a>
      <a href="#stall-env-chillies" class="stalls-env-tab" data-env-target="chillies">
        <span class="stalls-env-tab__dot" style="background:var(--color-oxblood);"></span>
        <span>III. The Chilli Stall (3)</span>
      </a>
    </div>
  </div>
</div>

<section id="stall-env-teas" data-stall-section="teas" class="editorial-section stall-theme-teas" style="background:#EFECE1;" aria-labelledby="stall-heading-teas">
  <div class="penbrae-container">
    <div class="editorial-grid" style="margin-bottom:var(--space-5);align-items:flex-end;">
      <div class="col-span-7">
        <span class="kicker-index">STALL I · 3 SEASONAL LOTS · ASSAM &amp; ARUNACHAL PRADESH</span>
        <h2 id="stall-heading-teas" style="font-size:clamp(2.2rem,3.2vw,3.4rem);margin:0.35rem 0;">The Tea Stall</h2>
        <p style="color:var(--color-ink-secondary);max-width:60ch;margin:0;">Delicate, contemplative, and unhurried. Smallholder gardens that pluck whole terminal buds, sun-wither silver canopy shoots, and cure pan-fired leaf in hollow bamboo.</p>
      </div>
      <div class="col-span-5" style="display:flex;justify-content:flex-end;">
        <a href="/stall/teas" class="btn-editorial">Enter The Tea Stall →</a>
      </div>
    </div>
    <div class="editorial-grid">
      ${teaProducts.map((p, i) => `<div class="col-span-4">${renderProductSpecimenCard(p, i + 1)}</div>`).join('')}
    </div>
  </div>
</section>

<section id="stall-env-spices" data-stall-section="spices" class="editorial-section stall-theme-spices" style="background:#F3E8DA;" aria-labelledby="stall-heading-spices">
  <div class="penbrae-container">
    <div class="editorial-grid" style="margin-bottom:var(--space-5);align-items:flex-end;">
      <div class="col-span-7">
        <span class="kicker-index">STALL II · 3 SEASONAL LOTS · MEGHALAYA &amp; ZIRO VALLEY</span>
        <h2 id="stall-heading-spices" style="font-size:clamp(2.2rem,3.2vw,3.4rem);margin:0.35rem 0;">The Spice Stall</h2>
        <p style="color:var(--color-ink-secondary);max-width:60ch;margin:0;">Expressive, resinous, and deeply aromatic. Limestone uplands in the West Jaintia Hills and subtropical valleys in Arunachal yield extraordinary essential oil concentration.</p>
      </div>
      <div class="col-span-5" style="display:flex;justify-content:flex-end;">
        <a href="/stall/spices" class="btn-editorial" style="background:var(--color-terracotta);border-color:var(--color-terracotta);">Enter The Spice Stall →</a>
      </div>
    </div>
    <div class="editorial-grid">
      ${spiceProducts.map((p, i) => `<div class="col-span-4">${renderProductSpecimenCard(p, i + 1)}</div>`).join('')}
    </div>
  </div>
</section>

<section id="stall-env-chillies" data-stall-section="chillies" class="editorial-section stall-theme-chillies" style="background:#EFE3DE;" aria-labelledby="stall-heading-chillies">
  <div class="penbrae-container">
    <div class="editorial-grid" style="margin-bottom:var(--space-5);align-items:flex-end;">
      <div class="col-span-7">
        <span class="kicker-index">STALL III · 3 SEASONAL LOTS · NAGALAND, MANIPUR &amp; MEGHALAYA</span>
        <h2 id="stall-heading-chillies" style="font-size:clamp(2.2rem,3.2vw,3.4rem);margin:0.35rem 0;">The Chilli Stall</h2>
        <p style="color:var(--color-ink-secondary);max-width:60ch;margin:0;">Intense yet remarkably complex. Revered across Nagaland and Manipur for fruit-forward aromatics, alder-smoke depth, and natural crimson staining.</p>
      </div>
      <div class="col-span-5" style="display:flex;justify-content:flex-end;">
        <a href="/stall/chillies" class="btn-editorial" style="background:var(--color-oxblood);border-color:var(--color-oxblood);">Enter The Chilli Stall →</a>
      </div>
    </div>
    <div class="editorial-grid">
      ${chilliProducts.map((p, i) => `<div class="col-span-4">${renderProductSpecimenCard(p, i + 1)}</div>`).join('')}
    </div>
  </div>
</section>
` + renderFooter();
}

function renderIndividualStallPage(stallSlug) {
  const normalizedSlug = stallSlug === 'tea' ? 'teas' : stallSlug === 'spice' ? 'spices' : stallSlug === 'chilli' ? 'chillies' : stallSlug;
  const stall = STALLS[normalizedSlug] || STALLS.teas;
  const stallProducts = Object.values(PRODUCTS).filter(p => p.stall === stall.slug);

  const regionPillsHtml = (stall.regions || []).map(r => {
    const count = stallProducts.filter(p => p.regionFilter.split(/\s+/).includes(r.key)).length;
    return `<button type="button" class="filter-pill" data-filter-region="${r.key}" aria-pressed="false">${r.label} (${count})</button>`;
  }).join('\n        ');

  // Contextually relevant makers, story, and journal for this specific Stall
  const firstProduct = stallProducts[0];
  const secondProduct = stallProducts[1] || stallProducts[0];
  const maker1 = MAKERS_DATA[firstProduct.makerSlug];
  const maker2 = MAKERS_DATA[secondProduct.makerSlug];
  const story = STORIES_DATA[firstProduct.storySlug];
  const journal = JOURNALS_DATA[firstProduct.journalSlug];

  const contextNodes = [
    {
      url: '/maker/' + firstProduct.makerSlug,
      type: '01 · PRODUCER PROFILE',
      title: maker1.name,
      meta: maker1.region
    },
    {
      url: '/story/' + firstProduct.storySlug,
      type: '02 · HARVEST MONOGRAPH',
      title: story.title,
      meta: 'Read how origin & curing shape this Stall'
    },
    {
      url: '/journal/' + firstProduct.journalSlug,
      type: '03 · JOURNAL ESSAY',
      title: journal.title,
      meta: journal.badge
    },
    {
      url: maker2 && maker2.code !== maker1.code ? '/maker/' + secondProduct.makerSlug : '/makers',
      type: '04 · REGIONAL ATLAS',
      title: maker2 && maker2.code !== maker1.code ? maker2.name : 'Northeast India Producer Atlas',
      meta: 'Inspect coordinates and harvest districts'
    }
  ];

  const seo = {
    title: `${stall.title} — Single-Harvest ${stall.slug === 'teas' ? 'Assam & Arunachal Teas' : stall.slug === 'spices' ? 'Meghalaya & Ziro Spices' : 'Smoked & Sun-Cured Chillies'} | Penbrae & Co`,
    description: stall.deck,
    canonicalPath: '/stall/' + stall.slug,
    ogType: 'website',
    ogImage: stall.heroImg,
    schema: [
      {
        '@type': 'CollectionPage',
        name: stall.title,
        description: stall.deck,
        url: SITE_URL + '/stall/' + stall.slug
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'The Stalls', item: SITE_URL + '/stalls' },
          { '@type': 'ListItem', position: 3, name: stall.title, item: SITE_URL + '/stall/' + stall.slug }
        ]
      }
    ]
  };

  return renderHeader('/stall/' + stall.slug, 'stall-theme-' + stall.slug, seo) + `
<div data-stall="${stall.slug}">
  <section class="stall-masthead" style="position:relative;overflow:hidden;">
    <img src="${stall.heroImg}" alt="${escapeAttr(stall.title)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.24;pointer-events:none;">
    <div class="penbrae-container" style="position:relative;z-index:2;">
      <div class="editorial-grid">
        <div class="col-span-7">
          <span class="kicker-index" style="color:var(--color-brass-light);">${stall.kicker}</span>
          <h1 style="margin:0.4rem 0 1rem 0;">${stall.title}</h1>
          <p class="lead-standfirst">${stall.deck}</p>
        </div>
        <div class="col-span-5" style="display:flex;flex-direction:column;justify-content:flex-end;">
          <div style="padding:var(--space-4);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.38);backdrop-filter:blur(4px);">
            <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--color-brass-light);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">SWITCH STALL</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              <a href="/stall/teas" class="stall-env-pill ${stall.slug === 'teas' ? 'is-active' : ''}" ${stall.slug === 'teas' ? 'aria-current="page"' : ''}>I. Teas (3)</a>
              <a href="/stall/spices" class="stall-env-pill ${stall.slug === 'spices' ? 'is-active' : ''}" ${stall.slug === 'spices' ? 'aria-current="page"' : ''}>II. Spices (3)</a>
              <a href="/stall/chillies" class="stall-env-pill ${stall.slug === 'chillies' ? 'is-active' : ''}" ${stall.slug === 'chillies' ? 'aria-current="page"' : ''}>III. Chillies (3)</a>
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
      <div class="filter-pill-group" role="group" aria-label="Filter ${escapeAttr(stall.title)} by origin region">
        <button type="button" class="filter-pill is-active" data-filter-region="all" aria-pressed="true">All Regions (${stallProducts.length})</button>
        ${regionPillsHtml}
      </div>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <span data-stall-count-status aria-live="polite" style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">Showing ${stallProducts.length} of ${stallProducts.length} seasonal lots</span>
        <label for="penbrae-stall-sort" class="sr-only">Sort lots by</label>
        <select id="penbrae-stall-sort" data-stall-sort style="padding:0.45rem 0.85rem;border:var(--rule-strong);background:var(--color-parchment);font-family:var(--font-mono);font-size:0.74rem;">
          <option value="curated">Sort: Curated Order</option>
          <option value="price-asc">Sort: Price (Low → High)</option>
          <option value="price-desc">Sort: Price (High → Low)</option>
          <option value="elevation-desc">Sort: Elevation (Highest First)</option>
        </select>
      </div>
    </div>
  </div>

  <section class="editorial-section">
    <div class="penbrae-container">
      <div class="stall-catalogue-grid" data-stall-catalogue data-current-stall="${stall.slug}" data-visible-count="${stallProducts.length}">
        ${stallProducts.map((p, idx) => renderProductSpecimenCard(p, idx + 1, true)).join('')}
      </div>
      <div data-stall-empty-state style="display:none;padding:var(--space-5);background:var(--color-parchment-light);border:var(--rule-hairline);text-align:center;">
        <p style="color:var(--color-ink-secondary);margin-bottom:1rem;">No lots in ${stall.title} match that region filter.</p>
        <button type="button" class="btn-editorial btn-editorial--outline" data-reset-stall-filter>Show All ${stall.title} Lots</button>
      </div>
    </div>
  </section>
</div>
` + renderContextualExploreSection(contextNodes, `Producers & Stories Behind ${stall.title}`, `${stall.number} PROVENANCE`) + renderFooter();
}

function renderProductDetailPage(slug) {
  const p = PRODUCTS[slug] || PRODUCTS['upper-assam-tippy-orthodox'];
  const stall = STALLS[p.stall];
  const sisterStallLots = Object.values(PRODUCTS).filter(item => item.stall === p.stall && item.slug !== p.slug);
  const journal = JOURNALS_DATA[p.journalSlug] || JOURNALS_DATA['smoke-mist-and-limestone-terroir'];
  const unitWeightShort = p.weight.split(' ')[0];

  const contextNodes = [
    ...sisterStallLots.map((sLot, idx) => ({
      url: '/product/' + sLot.slug,
      type: `0${idx + 1} · COMPANION LOT (${stall.title.toUpperCase()})`,
      title: `${sLot.title} (${sLot.lot})`,
      meta: `${sLot.region} · £${sLot.price.toFixed(2)}`
    })),
    {
      url: '/maker/' + p.makerSlug,
      type: '03 · THE PRODUCER',
      title: p.makerName,
      meta: 'Read producer biography, craft process & field transcript'
    },
    {
      url: '/journal/' + p.journalSlug,
      type: '04 · RELATED JOURNAL ESSAY',
      title: journal.title,
      meta: journal.badge
    }
  ];

  const seo = {
    title: `${p.title} (${p.lot}) — ${stall.title} | Penbrae & Co Ltd`,
    description: `${p.description} Tasting notes: ${p.tasting} (£${p.price.toFixed(2)} / ${p.weight}).`,
    canonicalPath: '/product/' + p.slug,
    ogType: 'product',
    ogImage: p.img,
    schema: [
      {
        '@type': 'Product',
        name: p.title,
        sku: p.lot,
        image: [SITE_URL + p.img, SITE_URL + p.imgVessel, SITE_URL + p.imgOrigin],
        description: p.description,
        brand: { '@type': 'Brand', name: 'Penbrae & Co Ltd' },
        offers: {
          '@type': 'Offer',
          url: SITE_URL + '/product/' + p.slug,
          priceCurrency: 'GBP',
          price: p.price.toFixed(2),
          availability: 'https://schema.org/InStock'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: stall.title, item: SITE_URL + '/stall/' + p.stall },
          { '@type': 'ListItem', position: 3, name: p.title, item: SITE_URL + '/product/' + p.slug }
        ]
      }
    ]
  };

  return renderHeader('/stall/' + p.stall, 'has-sticky-pdp-bar stall-theme-' + p.stall, seo) + `
<nav aria-label="Breadcrumb" style="padding:0.85rem var(--gutter);border-bottom:var(--rule-hairline);font-family:var(--font-mono);font-size:0.74rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
  <div>
    <a href="/stalls" style="color:var(--color-ink-muted);text-decoration:none;">The Stalls</a>
    <span aria-hidden="true"> / </span>
    <a href="/stall/${p.stall}" style="color:var(--color-ink-muted);text-decoration:none;">${stall.title}</a>
    <span aria-hidden="true"> / </span>
    <span style="color:var(--color-charcoal);">${p.title}</span>
  </div>
  <span style="color:var(--color-brass);">${p.lot} · ${p.elevation}</span>
</nav>

<section class="pdp-dossier" aria-label="Product Details">
  <div class="pdp-gallery-column">
    <figure class="specimen-figure">
      <div class="specimen-figure__canvas" style="--aspect:4/4.1;">
        <img class="specimen-figure__img" data-gallery-stage-img src="${p.img}" alt="${escapeAttr(p.title)}">
        <span class="specimen-figure__badge" data-gallery-stage-badge>PLATE I — DRY SPECIMEN</span>
      </div>
      <figcaption class="specimen-figure__caption">
        <span data-gallery-stage-caption>Close study of whole harvest specimen (${p.region}).</span>
        <span class="specimen-figure__caption-id">${p.lot}</span>
      </figcaption>
    </figure>

    <div class="pdp-gallery-thumbs" role="tablist" aria-label="Product photography views">
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="true"
        data-gallery-thumb
        data-img-src="${p.img}"
        data-plate-id="PLATE I — DRY SPECIMEN"
        data-caption="Close study of whole harvest specimen (${escapeAttr(p.region)}).">
        <img src="${p.img}" alt="${escapeAttr(p.title)} — dry specimen view" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>01 · Dry Specimen</strong>
      </button>
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
        data-gallery-thumb
        data-img-src="${p.imgVessel}"
        data-plate-id="PLATE II — IN PREPARATION"
        data-caption="Aromatic extraction and colour clarity in preparation.">
        <img src="${p.imgVessel}" alt="${escapeAttr(p.title)} — in preparation view" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>02 · In Preparation</strong>
      </button>
      <button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
        data-gallery-thumb
        data-img-src="${p.imgOrigin}"
        data-plate-id="PLATE III — FIELD ORIGIN"
        data-caption="Smallholder cultivation landscape in ${escapeAttr(p.region)}.">
        <img src="${p.imgOrigin}" alt="${escapeAttr(p.title)} — field origin landscape" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
        <strong>03 · Field Origin</strong>
      </button>
    </div>

    <div style="margin-top:var(--space-5);padding:var(--space-5);background:var(--color-parchment-deep);border:var(--rule-strong);">
      <span class="kicker-index">HARVEST MONOGRAPH</span>
      <h2 style="font-size:1.85rem;margin:0.4rem 0 0.65rem 0;">${p.storyTitle}</h2>
      <p style="font-size:0.94rem;color:var(--color-ink-secondary);margin-bottom:1.1rem;">Explore how micro-climate, soil mineralogy, and traditional curing shape the character of this lot.</p>
      <a href="/story/${p.storySlug}" class="btn-editorial btn-editorial--outline">Read Harvest Story →</a>
    </div>
  </div>

  <div class="pdp-purchase-column">
    <span class="kicker-index">${p.lot} · ${p.region}</span>
    <h1 style="font-size:clamp(2.1rem,3vw,3.1rem);margin:0.4rem 0 0.25rem 0;">${p.title}</h1>
    <div class="latin-taxonomy">${p.latin}</div>

    <div class="pdp-price-row">
      <div>
        <span class="pdp-price-gbp" data-pdp-price>£${p.price.toFixed(2)}</span>
        <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);display:block;margin-top:0.25rem;">${p.weight} · Free UK delivery over £50</span>
      </div>
      <span class="pdp-stock-badge">In Stock · Cardiff Dispatch</span>
    </div>

    <p style="color:var(--color-ink-secondary);margin-bottom:var(--space-4);">${p.description}</p>

    ${p.scoville ? `
    <div class="scoville-meter" role="region" aria-label="Scoville Heat Index">
      <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;flex-wrap:wrap;gap:0.4rem;">
        <span>Heat Level</span>
        <strong>${p.scoville}</strong>
      </div>
      <div class="scoville-meter__track"><div class="scoville-meter__fill" style="width:${p.scovillePct || 75}%;"></div></div>
    </div>` : ''}

    <div class="pdp-variant-group" role="radiogroup" aria-label="Select weight format">
      <span style="font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">Select Format:</span>
      <div class="pdp-variant-options">
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="true"
          data-variant-option data-variant-label="${escapeAttr(p.weight)}" data-variant-price="${p.price.toFixed(2)}">
          <strong>${unitWeightShort} Standard</strong><br><span>£${p.price.toFixed(2)}</span>
        </button>
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
          data-variant-option data-variant-label="Double Reserve (2 × ${unitWeightShort})" data-variant-price="${(p.price * 1.8).toFixed(2)}">
          <strong>2 × ${unitWeightShort} Reserve</strong><br><span>£${(p.price * 1.8).toFixed(2)}</span>
        </button>
        <button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
          data-variant-option data-variant-label="25g Tasting Sample" data-variant-price="${(p.price * 0.45).toFixed(2)}">
          <strong>25g Sample</strong><br><span>£${(p.price * 0.45).toFixed(2)}</span>
        </button>
      </div>
    </div>

    <div class="pdp-purchase-actions">
      <div>
        <label for="pdp-quantity-select" class="sr-only">Quantity</label>
        <input type="number" id="pdp-quantity-select" class="pdp-qty-input" value="1" min="1" max="99" data-pdp-qty>
      </div>
      <button type="button" class="btn-editorial" style="justify-content:center;font-size:0.82rem;"
        data-add-to-basket
        data-pdp-add-btn
        data-product-id="${p.slug}"
        data-product-title="${escapeAttr(p.title)}"
        data-product-variant="${escapeAttr(p.weight)}"
        data-product-price="${p.price.toFixed(2)}"
        data-product-qty="1"
        data-product-url="/product/${p.slug}"
        data-product-region="${escapeAttr(p.region)}">
        Add to Basket +
      </button>
    </div>

    <table class="pdp-ledger-table" aria-label="Product specifications">
      <tbody>
        <tr><th>Tasting Notes</th><td>${p.tasting}</td></tr>
        <tr><th>Origin &amp; Altitude</th><td>${p.region} (${p.elevation})</td></tr>
        <tr><th>Harvest Window</th><td>${p.harvest}</td></tr>
        <tr><th>Producer</th><td><a href="/maker/${p.makerSlug}" style="color:var(--color-charcoal);font-weight:500;text-decoration:underline;">${p.makerName} →</a></td></tr>
        <tr><th>Preparation</th><td>${p.prep}</td></tr>
        <tr><th>Dispatch</th><td>Packed in Cardiff, Wales in UV-protected vessels. <a href="/shipping-returns" style="color:var(--color-charcoal);">Shipping Info</a></td></tr>
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
    data-product-title="${escapeAttr(p.title)}"
    data-product-variant="${escapeAttr(p.weight)}"
    data-product-price="${p.price.toFixed(2)}"
    data-product-qty="1"
    data-product-url="/product/${p.slug}"
    data-product-region="${escapeAttr(p.region)}">
    Add to Basket +
  </button>
</div>
` + renderContextualExploreSection(contextNodes, `More from ${stall.title} & Connected Origins`, `${p.lot} PROVENANCE`) + renderFooter();
}

function renderMakersAtlasPage() {
  const seo = {
    title: 'Meet the Makers — Interactive Northeast India Producer Map | Penbrae & Co',
    description: 'Explore our interactive atlas of smallholder tea collectives, Lakadong turmeric growers, forest foragers, and alder-smoke chilli stewards across Northeast India.',
    canonicalPath: '/makers',
    ogType: 'website',
    ogImage: '/assets/images/maker-hands-crafting.jpg'
  };

  return renderHeader('/makers', '', seo) + `
<section class="editorial-section" style="background:var(--color-parchment-deep);padding-bottom:var(--space-5);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-6">
        <span class="kicker-index">PRODUCER ATLAS · NORTHEAST INDIA</span>
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
      <div id="penbrae-makers-map" role="application" aria-label="Interactive map of Northeast India makers. Use the producer directory below for full keyboard and screen-reader navigation."></div>
    </div>
    <div id="penbrae-maker-preview-card" class="makers-preview-panel" aria-live="polite"></div>
  </div>
</section>

<section class="editorial-section" id="accessible-maker-directory" aria-labelledby="directory-heading">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">COMPLETE PRODUCER DIRECTORY · 5 PARTNER COLLECTIVES</span>
        <h2 id="directory-heading" style="margin:0.35rem 0 0 0;">Documented Producers &amp; Harvest Lots</h2>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="commerce-ledger-table" aria-describedby="directory-heading">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Producer / Collective</th>
            <th scope="col">Region &amp; Coordinates</th>
            <th scope="col">Stall &amp; Craft Specialty</th>
            <th scope="col">Harvest Lots</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-family:var(--font-mono);">M-01</td>
            <td><strong>Brahmaputra Smallholder Tea Collective</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Dibrugarh, Upper Assam<br>27°28′N 94°54′E · 140m ASL</td>
            <td>Tea Stall · Hand-rolled orthodox tippy Assam &amp; bamboo-smoked reserve</td>
            <td>
              <a href="/product/upper-assam-tippy-orthodox">Tippy Orthodox Reserve (£28.00)</a><br>
              <a href="/product/singpho-bamboo-smoked-tea">Singpho Bamboo Tea (£34.00)</a>
            </td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill is-active" data-maker-select="maker-dibrugarh-tea" aria-pressed="true">Show on Map</button>
                <a href="/maker/upper-assam-orthodox-collective" class="link-editorial">Profile →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-02</td>
            <td><strong>West Jaintia Hills Lakadong Growers</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">West Jaintia Hills, Meghalaya<br>25°26′N 92°17′E · 1,280m ASL</td>
            <td>Spice Stall · Single-origin Lakadong turmeric &amp; sun-cured hill ginger</td>
            <td>
              <a href="/product/lakadong-turmeric-reserve">Lakadong Rhizome Reserve (£18.50)</a><br>
              <a href="/product/sohra-hill-ginger">Sohra Hill Ginger (£16.00)</a>
            </td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-jaintia-turmeric" aria-pressed="false">Show on Map</button>
                <a href="/maker/jaintia-hills-lakadong-growers" class="link-editorial">Profile →</a>
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
                <button type="button" class="filter-pill" data-maker-select="maker-mon-king-chilli" aria-pressed="false">Show on Map</button>
                <a href="/maker/nagaland-alder-smoke-stewards" class="link-editorial">Profile →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-04</td>
            <td><strong>Lower Subansiri Forest Foragers</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Ziro Valley &amp; Patkai, Arunachal<br>27°32′N 93°49′E · 1,680m ASL</td>
            <td>Spice &amp; Tea Stalls · Canopy wild hill pepper &amp; silver white tea buds</td>
            <td>
              <a href="/product/arunachal-wild-hill-pepper">Wild Hill Pepper (£21.00)</a><br>
              <a href="/product/namdapha-wild-forest-white-tea">Namdapha White Tea (£36.00)</a>
            </td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-ziro-wild-pepper" aria-pressed="false">Show on Map</button>
                <a href="/maker/ziro-valley-forest-foragers" class="link-editorial">Profile →</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-family:var(--font-mono);">M-05</td>
            <td><strong>Ukhrul Ridge Hathei Cultivator Guild</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem;">Sirarakhong, Ukhrul, Manipur<br>25°05′N 94°21′E · 1,750m ASL</td>
            <td>Chilli Stall · Sun-ripened crimson Hathei &amp; upland bird’s-eye chillies</td>
            <td>
              <a href="/product/sirarakhong-hathei-chilli">Sirarakhong Hathei Chilli (£20.00)</a><br>
              <a href="/product/barak-valley-smoked-birdseye">Upland Bird’s-Eye Chilli (£19.50)</a>
            </td>
            <td>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="filter-pill" data-maker-select="maker-ukhrul-hathei" aria-pressed="false">Show on Map</button>
                <a href="/maker/ukhrul-hathei-cultivators" class="link-editorial">Profile →</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderMakerStoryPage(slug = 'upper-assam-orthodox-collective') {
  const m = MAKERS_DATA[slug] || MAKERS_DATA['upper-assam-orthodox-collective'];
  const makerProducts = (m.products || []).map(pSlug => PRODUCTS[pSlug]).filter(Boolean);
  const story = STORIES_DATA[m.storySlug] || STORIES_DATA['mist-over-the-brahmaputra-autumn-pluck'];
  const journal = JOURNALS_DATA[m.journalSlug] || JOURNALS_DATA['smoke-mist-and-limestone-terroir'];
  const otherMakers = Object.entries(MAKERS_DATA).filter(([k]) => k !== slug).slice(0, 2);

  const contextNodes = [
    {
      url: '/story/' + m.storySlug,
      type: '01 · HARVEST MONOGRAPH',
      title: story.title,
      meta: 'Read the harvest story connected to this region'
    },
    {
      url: '/journal/' + m.journalSlug,
      type: '02 · JOURNAL ESSAY',
      title: journal.title,
      meta: journal.badge
    },
    ...otherMakers.map(([k, om], idx) => ({
      url: '/maker/' + k,
      type: `0${idx + 3} · FELLOW PRODUCER (${om.code})`,
      title: om.name,
      meta: om.region
    }))
  ];

  const seo = {
    title: `${m.name} (${m.region}) — Producer Profile | Penbrae & Co Ltd`,
    description: m.deck,
    canonicalPath: '/maker/' + slug,
    ogType: 'article',
    ogImage: m.img,
    schema: {
      '@type': 'Article',
      headline: m.name,
      description: m.deck,
      image: SITE_URL + m.img,
      author: { '@type': 'Organization', name: 'Penbrae & Co Ltd' }
    }
  };

  return renderHeader('/makers', '', seo) + `
<section class="editorial-section editorial-section--forest">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:center;">
      <div class="col-span-7">
        <span class="kicker-index">PRODUCER PROFILE ${m.code} · ${m.stall}</span>
        <h1 style="margin:0.4rem 0 1rem 0;">${m.name}</h1>
        <p class="lead-standfirst">${m.deck}</p>
        <div style="margin-top:var(--space-5);padding-top:var(--space-4);border-top:var(--rule-light-on-dark);display:flex;flex-wrap:wrap;gap:2.5rem;font-family:var(--font-mono);font-size:0.76rem;">
          <div><span style="color:var(--color-brass-light);">REGION:</span> ${m.region}</div>
          <div><span style="color:var(--color-brass-light);">COORDINATES:</span> ${m.coords}</div>
          <div><a href="/makers" style="color:var(--color-brass-light);text-decoration:underline;">← Return to Producer Map</a></div>
        </div>
      </div>
      <div class="col-span-5">
        <figure class="specimen-figure" style="border-color:rgba(245,240,230,0.28);">
          <div class="specimen-figure__canvas" style="--aspect:4/4.5;">
            <img class="specimen-figure__img" src="${m.img}" alt="${escapeAttr(m.name)}">
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
          <span class="kicker-index">PRODUCER DETAILS</span>
          <dl style="font-size:0.88rem;margin:1rem 0 0 0;">
            <dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">Location</dt>
            <dd style="margin:0.2rem 0 1rem 0;">${m.region}</dd>
            <dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">Coordinates</dt>
            <dd style="margin:0.2rem 0 1rem 0;font-family:var(--font-mono);font-size:0.8rem;">${m.coords}</dd>
            <dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);">Craft Process</dt>
            <dd style="margin:0.2rem 0 0 0;">${m.process}</dd>
          </dl>
        </div>
      </aside>
      <div class="col-editorial-essay prose-measure">
        <p class="editorial-dropcap">Across ${m.region}, smallholder stewards maintain cultivation and post-harvest curing traditions calibrated to micro-altitude and seasonal rainfall. Rather than blending harvests into anonymous regional bulk, each lot is kept distinct by harvest week and curing loft.</p>
        <p>When temperatures shift after the monsoon, slow maturation concentrates essential oils, natural sugars, and mineral character—yielding ingredients with an unmistakable sense of place.</p>
        <div class="editorial-pullquote">
          <blockquote>“When the harvest is cured slowly on woven bamboo, the cell wall yields gently. You taste the mist, the soil, and the woodsmoke—never a factory floor.”</blockquote>
          <cite>FIELD NOTES ARCHIVE · ${m.code}</cite>
        </div>
        ${renderAudioModule(m.audioTitle, m.coords + ' · 01:34', m.audioTranscript)}
        <figure class="specimen-figure" style="margin-top:var(--space-5);">
          <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
            <img class="specimen-figure__img" src="/assets/images/journal-preservation-loft.jpg" alt="Traditional bamboo drying loft in Northeast India" loading="lazy">
            <span class="specimen-figure__badge">CURING &amp; SORTING LOFT</span>
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

<section class="editorial-section editorial-section--deep" aria-label="Harvest Lots Crafted by This Producer">
  <div class="penbrae-container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
      <div>
        <span class="kicker-index">HARVEST LOTS BY ${m.code}</span>
        <h2 style="margin:0.35rem 0 0 0;">Seasonal Lots Crafted by ${m.name}</h2>
      </div>
      <a href="/stalls" class="link-editorial">Browse All Stalls →</a>
    </div>
    <div class="editorial-grid">
      ${makerProducts.map((prod, idx) => `<div class="col-span-6">${renderProductSpecimenCard(prod, idx + 1)}</div>`).join('')}
    </div>
  </div>
</section>
` + renderContextualExploreSection(contextNodes, 'Connected Stories & Fellow Producers', `${m.code} NETWORK`) + renderFooter();
}

function renderProductStoryPage(slug = 'mist-over-the-brahmaputra-autumn-pluck') {
  const s = STORIES_DATA[slug] || STORIES_DATA['mist-over-the-brahmaputra-autumn-pluck'];
  const p = PRODUCTS[s.productSlug] || PRODUCTS['upper-assam-tippy-orthodox'];
  const relatedLots = (s.relatedProducts || [p.slug]).map(k => PRODUCTS[k]).filter(Boolean);
  const journal = JOURNALS_DATA[p.journalSlug] || JOURNALS_DATA['smoke-mist-and-limestone-terroir'];
  const otherStories = Object.values(STORIES_DATA).filter(st => st.slug !== s.slug);

  const contextNodes = [
    {
      url: '/maker/' + p.makerSlug,
      type: '01 · THE PRODUCER',
      title: p.makerName,
      meta: p.region
    },
    {
      url: '/journal/' + p.journalSlug,
      type: '02 · RELATED JOURNAL ESSAY',
      title: journal.title,
      meta: journal.badge
    },
    ...otherStories.map((ost, idx) => ({
      url: '/story/' + ost.slug,
      type: `0${idx + 3} · HARVEST MONOGRAPH`,
      title: ost.title,
      meta: ost.badge
    }))
  ];

  const seo = {
    title: `${s.title} — Harvest Story | Penbrae & Co Ltd`,
    description: s.deck,
    canonicalPath: '/story/' + s.slug,
    ogType: 'article',
    ogImage: s.heroImg,
    schema: {
      '@type': 'Article',
      headline: s.title,
      description: s.deck,
      image: SITE_URL + s.heroImg,
      author: { '@type': 'Organization', name: 'Penbrae & Co Ltd' }
    }
  };

  return renderHeader('/story/' + s.slug, '', seo) + `
<div class="story-acquisition-ribbon" role="region" aria-label="Featured Lot in This Story">
  <div>
    <span style="color:var(--color-terracotta);margin-right:0.5rem;">FEATURED LOT:</span>
    <a href="/product/${p.slug}" style="color:var(--color-charcoal);font-weight:600;text-decoration:underline;">${p.title} (${p.lot})</a>
    <span style="color:var(--color-ink-muted);margin-left:0.5rem;">· £${p.price.toFixed(2)} (${p.weight})</span>
  </div>
  <div style="display:flex;align-items:center;gap:0.85rem;">
    <a href="/product/${p.slug}" class="link-editorial">View Product Details →</a>
    <button type="button" class="btn-editorial" style="min-height:38px;padding:0.4rem 1rem;"
      data-add-to-basket
      data-product-id="${p.slug}"
      data-product-title="${escapeAttr(p.title)}"
      data-product-variant="${escapeAttr(p.weight)}"
      data-product-price="${p.price.toFixed(2)}"
      data-product-url="/product/${p.slug}"
      data-product-region="${escapeAttr(p.region)}">
      Add to Basket (£${p.price.toFixed(2)}) +
    </button>
  </div>
</div>

<article>
  <header class="editorial-section" style="background:var(--color-parchment-deep);">
    <div class="penbrae-container">
      <div class="editorial-grid" style="align-items:center;">
        <div class="col-span-7">
          <span class="kicker-index">HARVEST MONOGRAPH · ${s.badge}</span>
          <h1 style="margin:0.4rem 0 1rem 0;">${s.title}</h1>
          <p class="lead-standfirst">${s.deck}</p>
        </div>
        <div class="col-span-5">
          <figure class="specimen-figure">
            <div class="specimen-figure__canvas specimen-figure__canvas--landscape">
              <img class="specimen-figure__img" src="${s.heroImg}" alt="${escapeAttr(s.title)}">
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
              <img class="specimen-figure__img" src="${s.detailImg}" alt="${escapeAttr(p.title)}" loading="lazy">
            </div>
            <figcaption class="specimen-figure__caption">
              <span>${p.title} (${p.region}).</span>
              <span class="specimen-figure__caption-id">${p.lot}</span>
            </figcaption>
          </figure>
          <p>Tasting profile in the cup or kitchen: ${p.tasting} Recommended preparation: ${p.prep}</p>
          <div class="editorial-pullquote">
            <blockquote>“When the autumn fog settles over the valley, growth slows to a whisper—concentrating essential oils and mineral character inside every harvest.”</blockquote>
            <cite>PENBRAE FIELD ARCHIVE · ${p.lot}</cite>
          </div>
          ${renderAudioModule(s.audioTitle, s.audioLocation, s.audioTranscript)}
        </div>
      </div>
    </div>
  </section>

  <section class="editorial-section editorial-section--deep" aria-label="Lots Featured in This Story">
    <div class="penbrae-container">
      <div style="margin-bottom:var(--space-5);">
        <span class="kicker-index">HARVEST LOTS FROM THIS CORRIDOR</span>
        <h2 style="margin:0.35rem 0 0 0;">Explore Lots Connected to This Story</h2>
      </div>
      <div class="editorial-grid">
        ${relatedLots.map((lot, idx) => `<div class="col-span-4">${renderProductSpecimenCard(lot, idx + 1)}</div>`).join('')}
      </div>
    </div>
  </section>
</article>
` + renderContextualExploreSection(contextNodes, 'Related Producers, Essays & Harvest Stories', 'CONTINUE READING') + renderFooter();
}

function renderAboutPage() {
  const seo = {
    title: 'About Penbrae & Co Ltd — Cardiff & Northeast India Sourcing Philosophy',
    description: 'Learn how Penbrae & Co Ltd connects Cardiff, Wales with smallholder tea, turmeric, wild pepper, and smoked chilli producers across Northeast India.',
    canonicalPath: '/about',
    ogType: 'website',
    ogImage: '/assets/images/landscape-meghalaya-hills.jpg'
  };

  return renderHeader('/about', '', seo) + `
<section class="editorial-section editorial-section--forest">
  <div class="penbrae-container">
    <div class="editorial-grid" style="align-items:center;">
      <div class="col-span-6">
        <span class="kicker-index">OUR STORY · CARDIFF &amp; NORTHEAST INDIA</span>
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
        <div style="margin:var(--space-5) 0;padding:var(--space-4);background:var(--color-parchment-deep);border:var(--rule-brass);">
          <div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-forest);margin-bottom:0.35rem;">PORTFOLIO PROTOTYPE &amp; DEMONSTRATION NOTICE</div>
          <p style="font-size:0.9rem;color:var(--color-ink-secondary);margin:0;">This digital flagship prototype demonstrates the bespoke WordPress &amp; WooCommerce architecture designed for Penbrae &amp; Co Ltd. Producer collectives, seasonal lot numbers (Lot 26-A through Lot 26-I), studio photography, simulated audio timelines, and sandbox checkout flows are structured as representative demonstration data awaiting final merchant catalogue onboarding.</p>
        </div>
        <div style="margin-top:var(--space-5);display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="/makers" class="btn-editorial">Explore the Producer Map →</a>
          <a href="/stalls" class="btn-editorial btn-editorial--outline">Visit The Three Stalls →</a>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderJournalArchivePage() {
  const seo = {
    title: 'The Penbrae Journal — Essays on Northeast Indian Terroir & Craft',
    description: 'Long-form essays, field dispatches, producer interviews, and culinary studies from Northeast India and the Penbrae & Co tasting room in Cardiff.',
    canonicalPath: '/journal',
    ogType: 'website',
    ogImage: '/assets/images/journal-preservation-loft.jpg'
  };

  return renderHeader('/journal', '', seo) + `
<section class="editorial-section" style="background:var(--color-parchment-deep);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">THE PENBRAE JOURNAL · ISSUE 01</span>
        <h1 style="margin-top:0.4rem;">The Penbrae Journal</h1>
      </div>
      <div class="col-span-7">
        <p class="lead-standfirst">Long-form essays, field dispatches, producer interviews, and culinary studies from Northeast India and our Cardiff tasting room.</p>
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
        <a href="/journal/orthodox-vs-ctc-assam-leaf" class="link-editorial">Read Essay (6 Min Read) →</a>
      </article>
      <article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
        <div>
          <div class="journal-card__media">
            <img src="/assets/images/stall-spice-lakadong.jpg" alt="Lakadong turmeric rhizomes and spices" loading="lazy">
          </div>
          <span class="kicker-index">CULINARY NOTES</span>
          <h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;"><a href="/journal/tempering-lakadong-and-smoked-chilli" style="color:var(--color-charcoal);text-decoration:none;">Tempering in Warm Fat: Lakadong &amp; Alder-Smoked Chilli</a></h3>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);">Kitchen guidance on bloom temperatures, lipid solubility of curcumin, and infusing whole smoked pods.</p>
        </div>
        <a href="/journal/tempering-lakadong-and-smoked-chilli" class="link-editorial">Read Essay (5 Min Read) →</a>
      </article>
      <article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
        <div>
          <div class="journal-card__media">
            <img src="/assets/images/stall-chilli-smoked.jpg" alt="Alder-smoked Naga King Chillies" loading="lazy">
          </div>
          <span class="kicker-index">PRODUCER INTERVIEWS</span>
          <h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;"><a href="/journal/alder-trees-and-jhum-agroforestry" style="color:var(--color-charcoal);text-decoration:none;">Nitrogen-Fixing Alder Trees &amp; Rotational Hill Plots in Nagaland</a></h3>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);">Why Himalayan alder is both the ecological partner of upland soil fertility and the fuel of the drying hearth.</p>
        </div>
        <a href="/journal/alder-trees-and-jhum-agroforestry" class="link-editorial">Read Essay (7 Min Read) →</a>
      </article>
    </div>
  </div>
</section>
` + renderInstagramFieldNotes() + renderFooter();
}

function renderJournalArticlePage(slug = 'smoke-mist-and-limestone-terroir') {
  const j = JOURNALS_DATA[slug] || JOURNALS_DATA['smoke-mist-and-limestone-terroir'];
  const featuredProducts = (j.products || []).map(k => PRODUCTS[k]).filter(Boolean);
  const maker = MAKERS_DATA[j.makerSlug] || MAKERS_DATA['upper-assam-orthodox-collective'];
  const otherEssays = Object.values(JOURNALS_DATA).filter(item => item.slug !== j.slug);

  const contextNodes = [
    {
      url: '/maker/' + j.makerSlug,
      type: '01 · FEATURED PRODUCER',
      title: maker.name,
      meta: maker.region
    },
    ...otherEssays.map((oe, idx) => ({
      url: '/journal/' + oe.slug,
      type: `0${idx + 2} · JOURNAL ESSAY`,
      title: oe.title,
      meta: oe.badge
    }))
  ];

  const seo = {
    title: `${j.title} — The Penbrae Journal`,
    description: j.deck,
    canonicalPath: '/journal/' + j.slug,
    ogType: 'article',
    ogImage: j.img,
    schema: {
      '@type': 'Article',
      headline: j.title,
      description: j.deck,
      image: SITE_URL + j.img,
      author: { '@type': 'Organization', name: 'Penbrae & Co Ltd' }
    }
  };

  return renderHeader('/journal/' + j.slug, '', seo) + `
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
              <img class="specimen-figure__img" src="${j.img}" alt="${escapeAttr(j.title)}">
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
            <span class="kicker-index">LOTS IN THIS ESSAY</span>
            ${featuredProducts.map(fp => `
            <div style="margin-top:1rem;padding-top:1rem;border-top:var(--rule-hairline);">
              <img src="${fp.img}" alt="${escapeAttr(fp.title)}" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.5rem;">
              <h3 style="font-size:1.2rem;margin-bottom:0.2rem;"><a href="/product/${fp.slug}" style="color:var(--color-charcoal);text-decoration:none;">${fp.title}</a></h3>
              <p style="font-size:0.82rem;color:var(--color-ink-secondary);margin-bottom:0.5rem;">${fp.region} · £${fp.price.toFixed(2)}</p>
              <a href="/product/${fp.slug}" class="link-editorial">View Lot →</a>
            </div>`).join('')}
          </div>
        </aside>
        <div class="col-editorial-essay prose-measure">
          <p class="editorial-dropcap">${j.paragraphs[0]}</p>
          <p>${j.paragraphs[1]}</p>
          <div class="editorial-pullquote">
            <blockquote>“${j.pullquote}”</blockquote>
            <cite>ISSUE 01 · PENBRAE EDITORIAL ARCHIVE</cite>
          </div>
          <p>${j.paragraphs[2]}</p>
          ${renderAudioModule(j.audioTitle, j.audioLocation, j.audioTranscript)}
        </div>
      </div>
    </div>
  </section>
</article>
` + renderContextualExploreSection(contextNodes, 'More from The Penbrae Journal', 'FURTHER READING') + renderFooter();
}

function renderSubscribePage() {
  const seo = {
    title: 'Subscribe to the Seasonal Dispatch | Penbrae & Co Ltd',
    description: 'Receive harvest letters, documentary field notes from Northeast India, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.',
    canonicalPath: '/subscribe',
    ogType: 'website',
    ogImage: '/assets/images/tea-infusion-cup.jpg'
  };

  return renderHeader('/subscribe', '', seo) + `
<section class="editorial-section" style="background:var(--color-parchment-deep);">
  <div class="penbrae-container">
    <div class="editorial-grid">
      <div class="col-span-5">
        <span class="kicker-index">SEASONAL NEWSLETTER · CARDIFF</span>
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
          <span class="kicker-index">NEWSLETTER REGISTRATION</span>
          <h2 style="font-size:1.95rem;margin:0.4rem 0 1.5rem 0;">Join the Reading List</h2>
          <div class="editorial-form-field">
            <label for="sub-full-name">Your Name (Optional)</label>
            <input type="text" id="sub-full-name" name="subscriber_name" placeholder="Eleanor Vance">
          </div>
          <div class="editorial-form-field">
            <label for="sub-email">Email Address (Required)</label>
            <input type="email" id="sub-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
          </div>
          <div class="consent-checkbox-box">
            <input type="checkbox" id="sub-gdpr-consent" name="gdpr_consent" value="1" required>
            <label for="sub-gdpr-consent">Explicit Marketing Consent (UK GDPR): I consent to Penbrae &amp; Co Ltd storing my email address to send editorial dispatches and seasonal harvest announcements.</label>
          </div>
          <button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">Subscribe to the Dispatch →</button>
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
        <span class="kicker-index">FORTHCOMING PROGRAMME</span>
        <h2 id="club-preview-heading" style="margin-top:0.4rem;">The Penbrae Seasonal Tasting Society</h2>
        <p class="lead-standfirst">A quarterly curation of micro-lot teas, single-harvest rhizomes, and smoked chillies accompanied by printed monograph notes.</p>
      </div>
      <div class="col-span-6">
        <div style="padding:var(--space-5);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.2);">
          <span style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.09em;color:var(--color-brass-light);display:block;margin-bottom:0.5rem;">PROGRAMME STATUS</span>
          <p style="font-size:0.94rem;color:rgba(245,240,230,0.86);margin-bottom:1rem;">Recurring subscription billing and automated club checkout are intentionally disabled until quarterly allocations, billing terms, and UK fulfilment schedules are finalized by Penbrae &amp; Co Ltd.</p>
          <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">STATUS: PROSPECTUS ONLY · NO RECURRING CHARGE COLLECTED</span>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderBasketPage() {
  const seo = {
    title: 'Shopping Basket | Penbrae & Co Ltd',
    description: 'Review your selected Northeast Indian teas, spices, and chillies before proceeding to sandbox checkout.',
    canonicalPath: '/basket',
    noindex: true
  };

  return renderHeader('/basket', '', seo) + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
      <div>
        <span class="kicker-index">SHOPPING BASKET · GBP (£)</span>
        <h1 style="margin:0.35rem 0 0 0;">Your Shopping Basket</h1>
      </div>
      <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap;">
        <button type="button" class="basket-remove-btn" data-clear-basket-btn style="display:none;">Clear Entire Basket</button>
        <a href="/stalls" class="link-editorial">← Continue Browsing The Stalls</a>
      </div>
    </div>
    <div class="editorial-grid">
      <div class="col-span-8">
        <div style="overflow-x:auto;">
          <table class="commerce-ledger-table" aria-label="Shopping Basket Items">
            <thead>
              <tr>
                <th scope="col">Harvest Lot &amp; Region</th>
                <th scope="col">Format</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Line Total</th>
                <th scope="col" style="text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody id="penbrae-basket-page-rows">
              <tr>
                <td colspan="6" style="padding:3rem 1.5rem;text-align:center;color:var(--color-ink-secondary);">
                  <p style="margin-bottom:1rem;font-size:1.05rem;">Your shopping basket is currently empty.</p>
                  <a href="/stalls" class="btn-editorial">Explore The Three Stalls →</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <aside class="col-span-4">
        <div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
          <span class="kicker-index">BASKET SUMMARY (GBP)</span>
          <div style="padding:1rem 0;margin:1rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);font-family:var(--font-mono);font-size:0.84rem;">
            <div style="display:flex;justify-content:space-between;padding:0.4rem 0;">
              <span>Subtotal</span>
              <span id="penbrae-basket-page-subtotal" class="tabular-nums">£0.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.4rem 0;color:var(--color-ink-secondary);">
              <span>UK Tracked Dispatch</span>
              <span id="penbrae-basket-page-shipping" class="tabular-nums">£0.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:0.75rem;margin-top:0.5rem;border-top:var(--rule-hairline);">
              <span style="text-transform:uppercase;font-weight:600;">Estimated Total</span>
              <span id="penbrae-basket-page-total" class="tabular-nums" style="font-family:var(--font-editorial);font-size:2rem;font-weight:500;">£0.00</span>
            </div>
          </div>
          <p style="font-size:0.84rem;color:var(--color-ink-secondary);margin-bottom:1.5rem;">Complimentary UK Tracked 48 dispatch on orders of £50.00 or more (£4.50 standard).</p>
          <a href="/checkout" data-basket-checkout-btn aria-disabled="true" class="btn-editorial" style="width:100%;justify-content:center;">Proceed to Checkout →</a>
        </div>
      </aside>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderCheckoutPage() {
  const seo = {
    title: 'Checkout (Sandbox Mode) | Penbrae & Co Ltd',
    description: 'Complete your sandbox demonstration order for Penbrae & Co Ltd.',
    canonicalPath: '/checkout',
    noindex: true
  };

  return renderHeader('/checkout', '', seo) + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
      <div>
        <span class="kicker-index">CHECKOUT &amp; DISPATCH · CURRENCY: GBP (£)</span>
        <h1 style="margin:0.35rem 0 0 0;">Checkout &amp; Fulfilment Details</h1>
      </div>
      <a href="/basket" class="link-editorial">← Return to Shopping Basket</a>
    </div>
    <form method="post" action="/order-confirmation" data-penbrae-checkout-form data-test-preview="true">
      <div class="editorial-grid">
        <div class="col-span-7" style="background:var(--color-parchment-light);border:var(--rule-hairline);padding:var(--space-5);">
          <span class="kicker-index">01 · RECIPIENT &amp; UK DELIVERY ADDRESS</span>
          <h2 style="font-size:1.85rem;margin:0.4rem 0 1.25rem 0;">Dispatch Destination</h2>
          <div class="editorial-grid" style="gap:1rem;">
            <div class="col-span-6 editorial-form-field">
              <label for="billing_first_name">First Name *</label>
              <input type="text" id="billing_first_name" name="billing_first_name" required autocomplete="given-name">
            </div>
            <div class="col-span-6 editorial-form-field">
              <label for="billing_last_name">Surname *</label>
              <input type="text" id="billing_last_name" name="billing_last_name" required autocomplete="family-name">
            </div>
          </div>
          <div class="editorial-form-field">
            <label for="billing_email">Email Address for Order Confirmation *</label>
            <input type="email" id="billing_email" name="billing_email" required autocomplete="email">
          </div>
          <div class="editorial-form-field">
            <label for="billing_address_1">Street Address *</label>
            <input type="text" id="billing_address_1" name="billing_address_1" required autocomplete="address-line1">
          </div>
          <div class="editorial-grid" style="gap:1rem;">
            <div class="col-span-6 editorial-form-field">
              <label for="billing_city">Town / City *</label>
              <input type="text" id="billing_city" name="billing_city" required autocomplete="address-level2">
            </div>
            <div class="col-span-6 editorial-form-field">
              <label for="billing_postcode">Postcode *</label>
              <input type="text" id="billing_postcode" name="billing_postcode" required autocomplete="postal-code">
            </div>
          </div>
          <div class="editorial-form-field" style="margin-bottom:0;">
            <label for="order_comments">Delivery Notes (Optional)</label>
            <textarea id="order_comments" name="order_comments" placeholder="Safe place instructions or gift note..."></textarea>
          </div>
        </div>
        <div class="col-span-5">
          <div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
            <span class="kicker-index">02 · ORDER SUMMARY &amp; SANDBOX PAYMENT</span>
            <h2 style="font-size:1.85rem;margin:0.4rem 0 1rem 0;">Your Order</h2>
            <div id="penbrae-checkout-items" style="margin-bottom:1rem;"></div>
            <div style="font-family:var(--font-mono);font-size:0.82rem;padding:0.75rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);margin-bottom:1.25rem;">
              <div style="display:flex;justify-content:space-between;padding:0.35rem 0;">
                <span>Subtotal</span>
                <span id="penbrae-checkout-subtotal" class="tabular-nums">£0.00</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:0.35rem 0;color:var(--color-ink-secondary);">
                <span>UK Dispatch</span>
                <span id="penbrae-checkout-shipping" class="tabular-nums">£0.00</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:0.65rem;margin-top:0.35rem;border-top:var(--rule-hairline);font-weight:600;">
                <span>Total (GBP)</span>
                <span id="penbrae-checkout-total" class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.85rem;">£0.00</span>
              </div>
            </div>
            <div style="padding:1rem;background:var(--color-parchment-deep);border:var(--rule-brass);margin-bottom:1.25rem;">
              <div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-oxblood);margin-bottom:0.35rem;">PAYMENT GATEWAY STATUS: SANDBOX DEMO MODE</div>
              <p style="font-size:0.85rem;color:var(--color-ink-secondary);margin:0;">This portfolio preview processes orders in local sandbox mode. No credit card details are requested and no live charge is captured.</p>
            </div>
            <button type="submit" data-checkout-submit-btn class="btn-editorial" style="width:100%;justify-content:center;">Place Sandbox Order (No Live Charge) →</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
` + renderFooter();
}

function renderOrderConfirmationPage() {
  const seo = {
    title: 'Sandbox Order Confirmation | Penbrae & Co Ltd',
    description: 'Sandbox order confirmation receipt for Penbrae & Co Ltd.',
    canonicalPath: '/order-confirmation',
    noindex: true
  };

  return renderHeader('/order-confirmation', '', seo) + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);">
      <span class="kicker-index">CARDIFF DISPATCH LEDGER · SANDBOX ENVIRONMENT</span>
      <h1 style="margin:0.35rem 0 0 0;">Order Confirmation</h1>
    </div>
    <div id="penbrae-order-confirmation-view"></div>
  </div>
</section>
` + renderFooter();
}

function renderMyAccountPage() {
  const seo = {
    title: 'Customer Account (Preview Mode) | Penbrae & Co Ltd',
    description: 'Inspect local sandbox orders or preview the WooCommerce customer account portal for Penbrae & Co Ltd.',
    canonicalPath: '/my-account',
    noindex: true
  };

  return renderHeader('/my-account', '', seo) + `
<section class="editorial-section">
  <div class="penbrae-container">
    <div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);">
      <span class="kicker-index">CUSTOMER ACCOUNT · PORTFOLIO PREVIEW</span>
      <h1 style="margin:0.35rem 0 0 0;">My Penbrae Account</h1>
    </div>
    <div class="editorial-grid">
      <div class="col-span-7">
        <div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);margin-bottom:var(--space-5);">
          <span class="kicker-index">SESSION SANDBOX ORDERS</span>
          <h2 style="font-size:1.75rem;margin:0.4rem 0 1rem 0;">Recent Test Orders in This Browser</h2>
          <div id="penbrae-account-orders-view"></div>
        </div>
      </div>
      <div class="col-span-5">
        <div style="background:var(--color-parchment-deep);border:var(--rule-brass);padding:var(--space-5);">
          <span class="kicker-index">AUTHENTICATION STATUS</span>
          <h2 style="font-size:1.65rem;margin:0.4rem 0 0.75rem 0;">WordPress / WooCommerce Account Portal</h2>
          <p style="font-size:0.92rem;color:var(--color-ink-secondary);margin-bottom:1rem;">Persistent customer login, password recovery, and saved UK delivery addresses are powered by WooCommerce session authentication when deployed on WordPress (` + '`woocommerce/myaccount/my-account.php`' + `).</p>
          <p style="font-size:0.88rem;color:var(--color-ink-secondary);margin:0;">In this static Vercel preview, authentication is intentionally disabled; any test orders you place at <a href="/checkout" style="color:var(--color-charcoal);font-weight:500;">/checkout</a> are stored locally in your browser session and displayed on this page.</p>
        </div>
      </div>
    </div>
  </div>
</section>
` + renderFooter();
}

function renderUtilityPage(pathname, title, kicker, description, contentHtml) {
  const seo = {
    title: `${title} | Penbrae & Co Ltd`,
    description,
    canonicalPath: pathname || '/404',
    noindex: pathname === '/404'
  };

  return renderHeader(pathname, '', seo) + `
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
` + renderFooter();
}

function generateSitemapXml() {
  const indexableRoutes = [
    '/',
    '/stalls',
    '/stall/teas',
    '/stall/spices',
    '/stall/chillies',
    '/makers',
    '/about',
    '/journal',
    '/subscribe',
    '/contact',
    '/shipping-returns',
    '/privacy-policy',
    '/terms-and-conditions',
    ...Object.keys(PRODUCTS).map(s => '/product/' + s),
    ...Object.keys(MAKERS_DATA).map(s => '/maker/' + s),
    ...Object.keys(STORIES_DATA).map(s => '/story/' + s),
    ...Object.keys(JOURNALS_DATA).map(s => '/journal/' + s)
  ];

  const urlsXml = indexableRoutes.map(r => {
    const loc = SITE_URL + (r === '/' ? '' : r);
    const priority = r === '/' ? '1.0' : r.startsWith('/stall') || r.startsWith('/product') ? '0.9' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
}

function generateRobotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /basket\nDisallow: /checkout\nDisallow: /order-confirmation\nDisallow: /my-account\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
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
  if (pathname === '/order-confirmation') return { status: 200, html: renderOrderConfirmationPage() };
  if (pathname === '/my-account') return { status: 200, html: renderMyAccountPage() };

  if (pathname === '/contact') {
    return {
      status: 200,
      html: renderUtilityPage(
        '/contact',
        'Contact Penbrae & Co Ltd',
        'CORRESPONDENCE · CARDIFF, WALES',
        'Contact Penbrae & Co Ltd in Cardiff, Wales regarding seasonal lot availability, culinary trade allocations, or provenance documentation.',
        `<p class="lead-standfirst">For enquiries regarding seasonal lot availability, restaurant and trade allocations, or provenance documentation, write to our Cardiff desk.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-hairline);margin:var(--space-5) 0;">
          <div>
            <div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);">Registered Office &amp; Tasting Room</div>
            <p style="margin:0.35rem 0 0 0;font-size:0.94rem;">Penbrae &amp; Co Ltd<br>Cardiff, Wales<br>United Kingdom</p>
          </div>
          <div>
            <div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);">Dispatch &amp; Trade Desk</div>
            <p style="margin:0.35rem 0 0 0;font-size:0.94rem;">Monday – Friday, 09:30 – 17:30 GMT<br>Currency: Pounds Sterling (GBP £)</p>
          </div>
        </div>
        <form method="post" data-penbrae-contact-form style="background:var(--color-parchment-light);padding:var(--space-5);border:var(--rule-strong);">
          <span class="kicker-index">SEND A MESSAGE (PREVIEW MODE)</span>
          <h2 style="font-size:1.75rem;margin:0.4rem 0 1.25rem 0;">Direct Enquiry</h2>
          <div class="editorial-form-field">
            <label for="contact-name">Your Name *</label>
            <input type="text" id="contact-name" name="name" required>
          </div>
          <div class="editorial-form-field">
            <label for="contact-email">Email Address *</label>
            <input type="email" id="contact-email" name="email" required>
          </div>
          <div class="editorial-form-field">
            <label for="contact-message">Enquiry *</label>
            <textarea id="contact-message" name="message" required placeholder="How can we assist you?"></textarea>
          </div>
          <button type="submit" class="btn-editorial">Send Enquiry →</button>
          <p data-contact-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.78rem;"></p>
        </form>`
      )
    };
  }

  if (pathname === '/shipping-returns') {
    return {
      status: 200,
      html: renderUtilityPage(
        '/shipping-returns',
        'Shipping & Returns Information',
        'FULFILMENT POLICY · UK DISPATCH',
        'UK dispatch schedules, packaging standards, and returns policy for Penbrae & Co Ltd orders shipped from Cardiff, Wales.',
        `<p class="lead-standfirst">All Penbrae &amp; Co Ltd orders are inspected, packed in UV-opaque archival vessels, and dispatched from Cardiff, Wales.</p>
        <h2>I. UK Dispatch &amp; Postage Tariffs</h2>
        <p>Orders placed before 14:00 GMT Monday to Friday are prepared for dispatch within 24 hours via Royal Mail Tracked services:</p>
        <ul>
          <li><strong>UK Tracked 48 Service:</strong> £4.50 flat rate (2–3 working days).</li>
          <li><strong>Complimentary UK Dispatch:</strong> Automatically applied on all orders of £50.00 or more.</li>
        </ul>
        <h2>II. Packaging &amp; Freshness Preservation</h2>
        <p>Single-harvest orthodox teas, high-curcumin rhizomes, and smoked chillies are sensitive to ultraviolet light and ambient humidity. Every lot is sealed in airtight tinplate caddies or UV-protected glass jars before leaving our Cardiff room.</p>
        <h2>III. Returns &amp; Perishable Food Regulations</h2>
        <p>Under UK Consumer Contracts Regulations, sealed food and beverage items may be returned within 14 days of receipt provided the tamper-evident vessel seal remains unbroken. If any vessel arrives damaged in transit, please contact our Cardiff desk within 7 days for an immediate replacement or full GBP refund.</p>`
      )
    };
  }

  if (pathname === '/privacy-policy') {
    return {
      status: 200,
      html: renderUtilityPage(
        '/privacy-policy',
        'Privacy Policy & UK GDPR',
        'DATA PROTECTION',
        'Privacy Policy and UK GDPR data governance for Penbrae & Co Ltd.',
        `<p class="lead-standfirst">Penbrae &amp; Co Ltd respects the privacy of every reader and patron and complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
        <h2>I. Data We Collect</h2>
        <p>We collect only the personal information required to fulfil orders (name, UK delivery address, and contact email) or to send the Penbrae Dispatch when you have granted explicit opt-in consent.</p>
        <h2>II. Local Storage in This Portfolio Preview</h2>
        <p>In this interactive preview environment, your shopping basket (<code>penbrae_basket_v2</code>) and any sandbox test orders (<code>penbrae_sandbox_orders_v1</code>) are stored solely within your browser’s local storage and are never transmitted to third-party trackers.</p>
        <h2>III. Your Rights Under UK GDPR</h2>
        <p>You have the right to request access to, rectification of, or erasure of your personal data at any time, and you may withdraw newsletter consent with a single click.</p>`
      )
    };
  }

  if (pathname === '/terms-and-conditions') {
    return {
      status: 200,
      html: renderUtilityPage(
        '/terms-and-conditions',
        'Terms & Conditions',
        'COMMERCIAL TERMS',
        'Commercial terms and conditions of sale for Penbrae & Co Ltd (Cardiff, Wales).',
        `<p class="lead-standfirst">These Terms &amp; Conditions govern the use of the Penbrae &amp; Co Ltd website and the purchase of seasonal lots dispatched from Cardiff, Wales.</p>
        <h2>I. Pricing &amp; Currency</h2>
        <p>All prices across The Tea Stall, The Spice Stall, and The Chilli Stall are stated in Pounds Sterling (GBP £). Applicable UK shipping rates are itemized clearly in the Shopping Basket and Checkout prior to order submission.</p>
        <h2>II. Seasonal Small-Lot Availability</h2>
        <p>Because our ingredients are harvested from smallholder gardens and forest margins across Northeast India, each lot is finite. Once a seasonal harvest lot is exhausted, it cannot be restocked until the next harvest window.</p>
        <h2>III. Governing Law</h2>
        <p>Any contract formed through Penbrae &amp; Co Ltd is governed by the laws of England and Wales.</p>`
      )
    };
  }

  return {
    status: 404,
    html: renderUtilityPage(
      '/404',
      'Entry Not Found (404)',
      'ARCHIVAL FOLIO 404',
      'The requested page or seasonal harvest lot could not be found.',
      `<p class="lead-standfirst">The page or seasonal harvest lot you requested could not be found.</p>
      <p>Use the links below to return to The Three Stalls, inspect the Northeast India Producer Map, or read The Penbrae Journal.</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:var(--space-4);">
        <a href="/stalls" class="btn-editorial">Explore The Three Stalls →</a>
        <a href="/makers" class="btn-editorial btn-editorial--outline">Open Producer Map</a>
      </div>`
    )
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

  if (pathname === '/sitemap.xml') {
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(generateSitemapXml());
    return;
  }

  if (pathname === '/robots.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(generateRobotsTxt());
    return;
  }

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

module.exports = {
  handleRequest,
  getRouteHtml,
  getAllStaticRoutes,
  generateSitemapXml,
  generateRobotsTxt,
  THEME_DIR
};
