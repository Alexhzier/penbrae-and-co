/**
 * PENBRAE & CO LTD — NORTHEAST INDIA INTERACTIVE MAKER ATLAS
 * Uses Leaflet + OpenStreetMap with regional coordinates across Northeast India.
 * Includes full keyboard & screen-reader synchronization with the Producer Directory.
 */
(function () {
  'use strict';

  var DEFAULT_MAKERS = [
    {
      id: 'maker-dibrugarh-tea',
      code: 'M-01',
      name: 'Brahmaputra Smallholder Tea Collective',
      region: 'Dibrugarh & Tinsukia, Upper Assam',
      state: 'Assam',
      coords: [27.4728, 94.9120],
      coordsLabel: '27°28′N 94°54′E · 140m ASL',
      stall: 'Tea Stall',
      photo: '/assets/images/maker-hands-crafting.jpg',
      craft: 'Hand-rolled orthodox tippy Assam & bamboo-smoked reserve lots',
      intro: 'Smallholder gardens along the southern bank of the Brahmaputra cultivating broad-leafed Assamica under a dappled canopy of shade trees.',
      storyUrl: '/maker/upper-assam-orthodox-collective',
      products: [
        { title: 'Upper Assam Tippy Orthodox Reserve (Lot 26-A)', url: '/product/upper-assam-tippy-orthodox', price: '£28.00' },
        { title: 'Singpho Hearth-Smoked Bamboo Tea (Lot 26-B)', url: '/product/singpho-bamboo-smoked-tea', price: '£34.00' }
      ]
    },
    {
      id: 'maker-jaintia-turmeric',
      code: 'M-02',
      name: 'West Jaintia Hills Lakadong Growers',
      region: 'Laskein Block, West Jaintia Hills, Meghalaya',
      state: 'Meghalaya',
      coords: [25.4480, 92.2936],
      coordsLabel: '25°26′N 92°17′E · 1,280m ASL',
      stall: 'Spice Stall',
      photo: '/assets/images/stall-spice-lakadong.jpg',
      craft: 'High-curcumin single-origin Lakadong turmeric & sun-cured heirloom ginger',
      intro: 'Cultivating heirloom Lakadong rhizomes in misty limestone uplands, hand-sliced onto woven bamboo mats for winter sun-curing.',
      storyUrl: '/maker/jaintia-hills-lakadong-growers',
      products: [
        { title: 'Single-Harvest Lakadong Rhizome Reserve (Lot 26-D)', url: '/product/lakadong-turmeric-reserve', price: '£18.50' },
        { title: 'Sohra Sun-Cured Hill Ginger (Lot 26-G)', url: '/product/sohra-hill-ginger', price: '£16.00' }
      ]
    },
    {
      id: 'maker-mon-king-chilli',
      code: 'M-03',
      name: 'Mon District Alder-Smoke Chilli Stewards',
      region: 'Mon & Kohima Uplands, Nagaland',
      state: 'Nagaland',
      coords: [26.7220, 95.0284],
      coordsLabel: '26°43′N 95°01′E · 1,460m ASL',
      stall: 'Chilli Stall',
      photo: '/assets/images/stall-chilli-smoked.jpg',
      craft: 'Jhum-cultivated Raja Mircha slow-dried over alder-wood hearths',
      intro: 'Rotational alder-tree agroforestry and fourteen-day smoke-loft preservation in the eastern hills of Nagaland.',
      storyUrl: '/maker/nagaland-alder-smoke-stewards',
      products: [
        { title: 'Whole Alder-Smoked Naga King Chilli Pods (Lot 26-C)', url: '/product/alder-smoked-naga-king-chilli', price: '£22.00' }
      ]
    },
    {
      id: 'maker-ziro-wild-pepper',
      code: 'M-04',
      name: 'Lower Subansiri Forest Foragers',
      region: 'Ziro Valley & Patkai Foothills, Arunachal Pradesh',
      state: 'Arunachal Pradesh',
      coords: [27.5449, 93.8197],
      coordsLabel: '27°32′N 93°49′E · 1,680m ASL',
      stall: 'Spice & Tea Stalls',
      photo: '/assets/images/spice-wild-pepper.jpg',
      craft: 'Canopy-harvested wild Sichuan-type hill pepper & high-elevation white tea',
      intro: 'Harvesting citrus-scented wild Zanthoxylum peppercorns and unopened silver tea buds from subtropical pine and bamboo valley margins.',
      storyUrl: '/maker/ziro-valley-forest-foragers',
      products: [
        { title: 'Arunachal Citrus-Husk Wild Hill Pepper (Lot 26-E)', url: '/product/arunachal-wild-hill-pepper', price: '£21.00' },
        { title: 'Namdapha High-Canopy Silver Bud White Tea (Lot 26-H)', url: '/product/namdapha-wild-forest-white-tea', price: '£36.00' }
      ]
    },
    {
      id: 'maker-ukhrul-hathei',
      code: 'M-05',
      name: 'Ukhrul Ridge Hathei Cultivator Guild',
      region: 'Sirarakhong, Ukhrul District, Manipur',
      state: 'Manipur',
      coords: [25.0954, 94.3617],
      coordsLabel: '25°05′N 94°21′E · 1,750m ASL',
      stall: 'Chilli Stall',
      photo: '/assets/images/chilli-hathei-crimson.jpg',
      craft: 'Sun-ripened crimson Hathei & upland bird’s-eye forest chillies',
      intro: 'High-ridge shale cultivation in Ukhrul District yielding Manipur’s celebrated crimson Hathei and citrus-bright upland chillies.',
      storyUrl: '/maker/ukhrul-hathei-cultivators',
      products: [
        { title: 'Sirarakhong Sun-Cured Hathei Crimson Chilli (Lot 26-F)', url: '/product/sirarakhong-hathei-chilli', price: '£20.00' },
        { title: 'Upland Sun-Cured Bird’s-Eye Forest Chilli (Lot 26-I)', url: '/product/barak-valley-smoked-birdseye', price: '£19.50' }
      ]
    }
  ];

  function initMakersMap() {
    var mapEl = document.getElementById('penbrae-makers-map');
    if (!mapEl || mapEl.getAttribute('data-map-initialized') === 'true') return;
    mapEl.setAttribute('data-map-initialized', 'true');

    var makers = (window.PENBRAE_MAKERS_DATA && window.PENBRAE_MAKERS_DATA.length)
      ? window.PENBRAE_MAKERS_DATA
      : DEFAULT_MAKERS;

    var previewEl = document.getElementById('penbrae-maker-preview-card');
    var listButtons = document.querySelectorAll('[data-maker-select]');
    var leafletMap = null;
    var markersById = {};

    function selectMaker(makerId, panMap) {
      var maker = makers.find(function (m) { return m.id === makerId; }) || makers[0];
      if (!maker) return;

      document.querySelectorAll('.penbrae-map-pin').forEach(function (pin) {
        pin.classList.toggle('is-active', pin.getAttribute('data-pin-id') === maker.id);
      });

      listButtons.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-maker-select') === maker.id;
        btn.setAttribute('aria-pressed', String(isMatch));
        btn.classList.toggle('is-active', isMatch);
      });

      if (leafletMap && panMap && markersById[maker.id]) {
        leafletMap.panTo(maker.coords, { animate: true });
      }

      renderMakerPreview(maker, previewEl);
    }

    listButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectMaker(btn.getAttribute('data-maker-select'), true);
      });
    });

    if (typeof window.L !== 'undefined') {
      try {
        leafletMap = window.L.map(mapEl, {
          center: [26.35, 93.85],
          zoom: 7,
          scrollWheelZoom: false
        });

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 14,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · Penbrae Northeast India Provenance Atlas'
        }).addTo(leafletMap);

        makers.forEach(function (maker) {
          var icon = window.L.divIcon({
            className: 'penbrae-map-pin-wrapper',
            html: '<div class="penbrae-map-pin" data-pin-id="' + maker.id + '" title="' + maker.name + '">' + maker.code + '</div>',
            iconSize: [34, 34],
            iconAnchor: [17, 17]
          });

          var marker = window.L.marker(maker.coords, { icon: icon, keyboard: true, title: maker.name }).addTo(leafletMap);
          marker.on('click', function () {
            selectMaker(maker.id, true);
          });
          markersById[maker.id] = marker;
        });

        setTimeout(function () {
          if (leafletMap) leafletMap.invalidateSize();
        }, 320);
      } catch (err) {
        renderSvgAtlasFallback(mapEl, makers, selectMaker);
      }
    } else {
      renderSvgAtlasFallback(mapEl, makers, selectMaker);
    }

    selectMaker(makers[0].id, false);
  }

  window.PenbraeMapInit = initMakersMap;
  document.addEventListener('DOMContentLoaded', initMakersMap);

  function renderMakerPreview(maker, container) {
    if (!container) return;
    container.style.transition = 'opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
    container.style.opacity = '0.25';
    container.style.transform = 'translateY(6px)';
    var productsHtml = (maker.products || [])
      .map(function (p) {
        return (
          '<li style="display:flex;justify-content:space-between;align-items:center;padding:0.65rem 0;border-bottom:var(--rule-hairline);">' +
          '<a href="' + p.url + '" style="color:var(--color-charcoal);font-weight:500;text-decoration:underline;text-underline-offset:3px;">' + p.title + '</a>' +
          '<span class="tabular-nums" style="font-family:var(--font-mono);font-size:0.82rem;">' + p.price + '</span>' +
          '</li>'
        );
      })
      .join('');

    container.innerHTML =
      '<div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);">' +
      '<span class="kicker-index">PRODUCER ' + maker.code + ' · ' + maker.stall + '</span>' +
      '<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">' + maker.coordsLabel + '</span>' +
      '</div>' +
      '<div style="position:relative;aspect-ratio:16/9;margin:1rem 0;border:var(--rule-hairline);overflow:hidden;background:var(--color-parchment-deep);">' +
      '<img src="' + (maker.photo || '/assets/images/maker-hands-crafting.jpg') + '" alt="' + maker.region + '" style="width:100%;height:100%;object-fit:cover;display:block;">' +
      '<span class="specimen-figure__badge" style="position:absolute;top:0.75rem;left:0.75rem;">' + maker.region + '</span>' +
      '</div>' +
      '<h2 style="font-size:1.85rem;margin-bottom:0.35rem;">' + maker.name + '</h2>' +
      '<p style="font-family:var(--font-editorial);font-style:italic;font-size:1.15rem;color:var(--color-forest);margin-bottom:0.75rem;">' + maker.craft + '</p>' +
      '<p style="color:var(--color-ink-secondary);font-size:0.94rem;">' + maker.intro + '</p>' +
      '<div style="margin-top:1.25rem;">' +
      '<div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.09em;color:var(--color-ink-muted);margin-bottom:0.35rem;">Harvest Lots by This Producer</div>' +
      '<ul style="list-style:none;padding:0;margin:0;border-top:var(--rule-hairline);">' + productsHtml + '</ul>' +
      '</div>' +
      '</div>' +
      '<div style="margin-top:1.5rem;padding-top:1rem;border-top:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">' +
      '<a href="' + maker.storyUrl + '" class="btn-editorial">Read Producer Profile →</a>' +
      '<span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--color-ink-muted);">State: ' + maker.state + '</span>' +
      '</div>';

    requestAnimationFrame(function () {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });
  }

  function renderSvgAtlasFallback(mapEl, makers, onSelect) {
    mapEl.innerHTML =
      '<div style="position:relative;width:100%;height:100%;min-height:520px;background:#E2DAC7;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">' +
      '<div style="font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;letter-spacing:0.09em;color:var(--color-ink-secondary);display:flex;justify-content:space-between;">' +
      '<span>NORTHEAST INDIA TOPOGRAPHIC SURVEY (24°N–29°N, 88°E–97°E)</span>' +
      '<span>SELECT A PRODUCER REGION BELOW</span>' +
      '</div>' +
      '<svg viewBox="0 0 800 460" style="width:100%;height:auto;max-height:380px;border:var(--rule-hairline);background:#EBE4D4;" role="img" aria-label="Interactive topographic map of Northeast India showing maker locations">' +
      '<path d="M80,240 Q220,160 390,140 T690,95 L730,190 Q610,250 540,360 L410,380 Q320,280 180,295 Z" fill="#D8CEB8" stroke="#8F6F32" stroke-width="1.5"/>' +
      '<path d="M120,225 Q350,185 670,125" fill="none" stroke="#172A21" stroke-width="2" stroke-dasharray="4 3"/>' +
      '<text x="340" y="165" font-family="monospace" font-size="11" fill="#4D4941">BRAHMAPUTRA VALLEY (ASSAM)</text>' +
      '<text x="210" y="275" font-family="monospace" font-size="11" fill="#4D4941">MEGHALAYA PLATEAU</text>' +
      '<text x="480" y="110" font-family="monospace" font-size="11" fill="#4D4941">ARUNACHAL HIMALAYA</text>' +
      '<text x="545" y="255" font-family="monospace" font-size="11" fill="#4D4941">NAGALAND HILLS</text>' +
      '<text x="485" y="340" font-family="monospace" font-size="11" fill="#4D4941">MANIPUR UPLANDS</text>' +
      '</svg>' +
      '<div style="display:flex;flex-wrap:wrap;gap:0.6rem;" id="svg-fallback-pins"></div>' +
      '</div>';

    var pinBar = mapEl.querySelector('#svg-fallback-pins');
    if (pinBar) {
      makers.forEach(function (m) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-pill penbrae-map-pin';
        btn.style.width = 'auto';
        btn.style.height = 'auto';
        btn.setAttribute('data-pin-id', m.id);
        btn.textContent = m.code + ' · ' + m.state + ' (' + m.region.split(',')[0] + ')';
        btn.addEventListener('click', function () {
          onSelect(m.id, false);
        });
        pinBar.appendChild(btn);
      });
    }
  }
})();
