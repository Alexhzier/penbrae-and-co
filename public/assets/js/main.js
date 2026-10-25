/**
 * PENBRAE & CO LTD — PRIMARY EDITORIAL & ACCESSIBILITY INTERACTIONS
 * Concept, Design & Full-Stack Engineering by Alexhzier (https://github.com/Alexhzier)
 * Copyright © 2026 Alexhzier. All Rights Reserved.
 *
 * Supports: Mobile touch navigation, Slide-over Basket Drawer, Documentary Audio Player,
 * Newsletter validation, and Reduced-Motion-Safe Editorial Reveals.
 */
(function () {
  'use strict';

  try {
    if (typeof console !== 'undefined' && console.log) {
      console.log(
        '%c PENBRAE & CO. %c Concept, Design & Engineering by Alexhzier (https://github.com/Alexhzier) ',
        'background:#2D3B2D;color:#F8F4EC;font-family:serif;font-size:11px;padding:3px 6px;font-weight:bold;border-radius:2px 0 0 2px;',
        'background:#8C6D3F;color:#F8F4EC;font-family:sans-serif;font-size:11px;padding:3px 6px;border-radius:0 2px 2px 0;'
      );
    }
  } catch (e) {}

  var BASKET_STORAGE_KEY = 'penbrae_basket_v2';

  function initPageDynamicModules() {
    initDocumentaryAudioPlayers();
    initNewsletterForms();
    initContactPreviewForms();
    initScrollSectionReveals();
    initStallAtmosphereInteractions();
    renderBasketState();
    if (typeof window.PenbraeCommerceInit === 'function') {
      window.PenbraeCommerceInit();
    }
    if (typeof window.PenbraeMapInit === 'function') {
      window.PenbraeMapInit();
    }
  }

  function initPreloader() {
    var preloader = document.getElementById('penbrae-preloader');
    if (!preloader) return;

    function dismiss() {
      if (preloader.classList.contains('is-loaded')) return;
      preloader.classList.add('is-loaded');
      setTimeout(function () {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 500);
    }

    if (document.readyState === 'complete') {
      setTimeout(dismiss, 2000);
    } else {
      window.addEventListener('load', function () {
        setTimeout(dismiss, 2000);
      });
      setTimeout(dismiss, 2800);
    }
  }

  window.PenbraeEditorialInit = initPageDynamicModules;

  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initMobileNavigation();
    initBasketDrawer();
    initPageDynamicModules();
    initSmoothPageAndStallTransitions();
  });

  /* 1. Mobile Navigation Drawer */
  function initMobileNavigation() {
    var toggleBtn = document.querySelector('[data-mobile-nav-toggle]');
    var drawer = document.getElementById('penbrae-mobile-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
      drawer.classList.toggle('is-open', !expanded);
      drawer.setAttribute('aria-hidden', String(expanded));
      toggleBtn.textContent = !expanded ? 'Close [×]' : 'Menu [≡]';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        toggleBtn.click();
        toggleBtn.focus();
      }
    });
  }

  /* 2. Slide-Over Basket Drawer & Live GBP Cart State */
  function initBasketDrawer() {
    var openBtns = document.querySelectorAll('[data-basket-open]');
    var closeBtns = document.querySelectorAll('[data-basket-close]');
    var drawer = document.getElementById('penbrae-basket-drawer');
    var backdrop = document.getElementById('penbrae-basket-backdrop');

    function openBasket() {
      if (!drawer || !backdrop) return;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      renderBasketState();
    }

    function closeBasket() {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openBasket();
      });
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', closeBasket);
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeBasket);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeBasket();
      }
    });

    // Global Add-to-Basket buttons
    document.addEventListener('click', function (e) {
      var addBtn = e.target.closest('[data-add-to-basket]');
      if (!addBtn) return;

      e.preventDefault();

      var qtyVal = parseInt(addBtn.getAttribute('data-product-qty') || '1', 10);
      if (isNaN(qtyVal) || qtyVal < 1) qtyVal = 1;

      var item = {
        id: addBtn.getAttribute('data-product-id') || 'upper-assam-tippy-orthodox',
        title: addBtn.getAttribute('data-product-title') || 'Upper Assam Tippy Orthodox Reserve',
        variant: addBtn.getAttribute('data-product-variant') || '75g Archival Caddy',
        price: parseFloat(addBtn.getAttribute('data-product-price') || '28.00'),
        qty: qtyVal,
        url: addBtn.getAttribute('data-product-url') || '/product/upper-assam-tippy-orthodox',
        region: addBtn.getAttribute('data-product-region') || 'Northeast India'
      };

      addToPenbraeBasket(item);

      if (!addBtn.hasAttribute('data-original-label')) {
        addBtn.setAttribute('data-original-label', addBtn.textContent);
      }
      addBtn.textContent = 'Added to Basket ✓';
      setTimeout(function () {
        addBtn.textContent = addBtn.getAttribute('data-original-label') || 'Add to Basket +';
      }, 1400);

      openBasket();
    });

    // Close basket drawer when clicking View Basket or Checkout inside drawer
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        var navLink = e.target.closest('a[href]');
        if (navLink) {
          closeBasket();
        }
      });
    }

    renderBasketState();
  }

  function getBasketItems() {
    try {
      var raw = localStorage.getItem(BASKET_STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(function (item) {
          return item && item.id && typeof item.price === 'number' && item.qty > 0;
        });
      }
    } catch (err) {
      // Fallback to empty array
    }
    return [];
  }

  function saveBasketItems(items) {
    var clean = Array.isArray(items)
      ? items.filter(function (i) { return i && i.qty > 0; })
      : [];
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(clean));
    } catch (err) {}
    renderBasketState();
    try {
      window.dispatchEvent(new CustomEvent('penbrae:basket-updated', { detail: { items: clean } }));
    } catch (err) {}
  }

  function addToPenbraeBasket(newItem) {
    var items = getBasketItems();
    var existing = items.find(function (i) {
      return i.id === newItem.id && i.variant === newItem.variant;
    });
    if (existing) {
      existing.qty = Math.min(99, existing.qty + newItem.qty);
      existing.price = newItem.price;
    } else {
      items.push(newItem);
    }
    saveBasketItems(items);
  }

  function updateBasketItemQty(index, nextQty) {
    var items = getBasketItems();
    if (!items[index]) return;
    if (nextQty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].qty = Math.min(99, Math.max(1, nextQty));
    }
    saveBasketItems(items);
  }

  function removeBasketItem(index) {
    var items = getBasketItems();
    if (!items[index]) return;
    items.splice(index, 1);
    saveBasketItems(items);
  }

  function clearBasket() {
    saveBasketItems([]);
  }

  window.PenbraeBasket = {
    getItems: getBasketItems,
    saveItems: saveBasketItems,
    addItem: addToPenbraeBasket,
    updateQty: updateBasketItemQty,
    removeItem: removeBasketItem,
    clear: clearBasket
  };

  function renderBasketState() {
    var items = getBasketItems();
    var countEls = document.querySelectorAll('[data-basket-count]');
    var totalQty = items.reduce(function (sum, i) { return sum + i.qty; }, 0);
    var subtotal = items.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);

    countEls.forEach(function (el) {
      el.textContent = String(totalQty);
    });

    var drawerContainer = document.getElementById('penbrae-basket-drawer-items');
    var drawerSubtotal = document.getElementById('penbrae-basket-drawer-subtotal');
    var drawerCheckoutBtn = document.querySelector('[data-drawer-checkout-btn]');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = '£' + subtotal.toFixed(2);
    }

    if (drawerCheckoutBtn) {
      if (items.length === 0) {
        drawerCheckoutBtn.setAttribute('aria-disabled', 'true');
      } else {
        drawerCheckoutBtn.removeAttribute('aria-disabled');
      }
    }

    if (drawerContainer) {
      if (items.length === 0) {
        drawerContainer.innerHTML =
          '<div style="padding:2.5rem 0;text-align:center;">' +
          '<p style="color:var(--color-ink-secondary);margin-bottom:1.25rem;">Your basket is currently empty. Explore the Tea, Spice, or Chilli Stalls to select seasonal lots.</p>' +
          '<a href="/stalls" class="btn-editorial btn-editorial--outline" style="justify-content:center;">Browse The Stalls →</a>' +
          '</div>';
      } else {
        drawerContainer.innerHTML = items
          .map(function (item, idx) {
            return (
              '<div style="padding:1.1rem 0;border-bottom:var(--rule-hairline);display:flex;justify-content:space-between;gap:1rem;">' +
              '<div style="flex:1;min-width:0;">' +
              '<div style="font-family:var(--font-mono);font-size:0.66rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">' + escapeHtml(item.region) + '</div>' +
              '<a href="' + escapeHtml(item.url) + '" style="font-family:var(--font-editorial);font-size:1.25rem;color:var(--color-charcoal);text-decoration:none;display:block;margin:0.2rem 0;line-height:1.2;">' +
              escapeHtml(item.title) +
              '</a>' +
              '<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-secondary);margin-bottom:0.65rem;">' +
              escapeHtml(item.variant) + ' · £' + item.price.toFixed(2) + ' each' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:0.85rem;">' +
              '<div class="qty-stepper" role="group" aria-label="Quantity for ' + escapeHtml(item.title) + '">' +
              '<button type="button" class="qty-stepper__btn" data-drawer-qty-step="-1" data-drawer-idx="' + idx + '" aria-label="Decrease quantity">−</button>' +
              '<input type="number" class="qty-stepper__input" min="1" max="99" value="' + item.qty + '" data-drawer-qty-input="' + idx + '" aria-label="Quantity">' +
              '<button type="button" class="qty-stepper__btn" data-drawer-qty-step="1" data-drawer-idx="' + idx + '" aria-label="Increase quantity">+</button>' +
              '</div>' +
              '<button type="button" class="basket-remove-btn" data-remove-basket-idx="' + idx + '">Remove</button>' +
              '</div>' +
              '</div>' +
              '<div style="text-align:right;font-family:var(--font-mono);font-size:0.92rem;font-weight:500;" class="tabular-nums">' +
              '£' + (item.price * item.qty).toFixed(2) +
              '</div>' +
              '</div>'
            );
          })
          .join('');

        drawerContainer.querySelectorAll('[data-drawer-qty-step]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = parseInt(btn.getAttribute('data-drawer-idx'), 10);
            var delta = parseInt(btn.getAttribute('data-drawer-qty-step'), 10);
            var current = getBasketItems();
            if (current[idx]) {
              updateBasketItemQty(idx, current[idx].qty + delta);
            }
          });
        });

        drawerContainer.querySelectorAll('[data-drawer-qty-input]').forEach(function (inp) {
          inp.addEventListener('change', function () {
            var idx = parseInt(inp.getAttribute('data-drawer-qty-input'), 10);
            var val = parseInt(inp.value || '1', 10);
            updateBasketItemQty(idx, isNaN(val) ? 1 : val);
          });
        });

        drawerContainer.querySelectorAll('[data-remove-basket-idx]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = parseInt(btn.getAttribute('data-remove-basket-idx'), 10);
            removeBasketItem(idx);
          });
        });
      }
    }
  }

  /* 3. Accessible Documentary Audio Player (Simulated Preview + HTML5 Audio support) */
  function initDocumentaryAudioPlayers() {
    var modules = document.querySelectorAll('[data-audio-module]');
    modules.forEach(function (mod) {
      if (mod.getAttribute('data-audio-bound') === 'true') return;
      mod.setAttribute('data-audio-bound', 'true');

      var playBtn = mod.querySelector('[data-audio-toggle]');
      var bar = mod.querySelector('[data-audio-bar]');
      var timeEl = mod.querySelector('[data-audio-time]');
      var simNoteEl = mod.querySelector('[data-audio-sim-status]');
      var audioEl = mod.querySelector('audio');
      var durationSec = parseInt(mod.getAttribute('data-duration-sec') || '94', 10);
      var currentSec = 0;
      var timer = null;
      var playing = false;

      if (!playBtn) return;

      playBtn.addEventListener('click', function () {
        playing = !playing;
        playBtn.setAttribute('aria-pressed', String(playing));
        playBtn.textContent = playing ? 'Pause Preview ❚❚' : 'Listen (Demo) ▶';

        if (simNoteEl) {
          simNoteEl.textContent = playing
            ? 'SIMULATED FIELD AUDIO PLAYBACK ACTIVE · READ FULL TRANSCRIPT BELOW'
            : 'DEMO AUDIO PLAYER · SIMULATED TIMELINE & VERBATIM TRANSCRIPT';
        }

        if (audioEl && audioEl.getAttribute('src')) {
          if (playing) audioEl.play().catch(function () {});
          else audioEl.pause();
        }

        if (timer) {
          clearInterval(timer);
          timer = null;
        }

        if (playing) {
          timer = setInterval(function () {
            currentSec = currentSec + 1;
            if (currentSec > durationSec) {
              currentSec = 0;
              clearInterval(timer);
              timer = null;
              playing = false;
              playBtn.setAttribute('aria-pressed', 'false');
              playBtn.textContent = 'Listen (Demo) ▶';
              if (bar) bar.style.width = '0%';
              if (timeEl) timeEl.textContent = '00:00 / ' + formatTime(durationSec);
              if (simNoteEl) {
                simNoteEl.textContent = 'DEMO AUDIO PLAYER · SIMULATED TIMELINE & VERBATIM TRANSCRIPT';
              }
              return;
            }
            var pct = Math.min(100, Math.round((currentSec / durationSec) * 100));
            if (bar) bar.style.width = pct + '%';
            if (timeEl) timeEl.textContent = formatTime(currentSec) + ' / ' + formatTime(durationSec);
          }, 1000);
        }
      });
    });
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }

  /* 4. Explicit Consent Newsletter Registration */
  function initNewsletterForms() {
    var forms = document.querySelectorAll('[data-penbrae-newsletter-form]');
    forms.forEach(function (form) {
      if (form.getAttribute('data-newsletter-bound') === 'true') return;
      form.setAttribute('data-newsletter-bound', 'true');

      form.addEventListener('submit', function (e) {
        var consent = form.querySelector('input[name="gdpr_consent"]');
        var emailInp = form.querySelector('input[type="email"]');
        var statusEl = form.querySelector('[data-newsletter-status]');
        if (consent && !consent.checked) {
          e.preventDefault();
          if (statusEl) {
            statusEl.textContent = 'Please confirm explicit UK GDPR marketing consent before subscribing.';
            statusEl.style.color = 'var(--color-oxblood)';
          }
          return;
        }
        if (form.getAttribute('data-ajax-preview') === 'true') {
          e.preventDefault();
          var emailVal = emailInp ? emailInp.value.trim() : 'your address';
          if (statusEl) {
            statusEl.textContent =
              'Preview Mode Recorded: ' +
              emailVal +
              ' validated with explicit UK GDPR consent. (Live email dispatch requires production ESP integration.)';
            statusEl.style.color = 'var(--color-forest)';
          }
          form.reset();
        }
      });
    });
  }

  /* 4b. Contact Enquiry Preview Form */
  function initContactPreviewForms() {
    var forms = document.querySelectorAll('[data-penbrae-contact-form]');
    forms.forEach(function (form) {
      if (form.getAttribute('data-contact-bound') === 'true') return;
      form.setAttribute('data-contact-bound', 'true');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var statusEl = form.querySelector('[data-contact-status]');
        if (statusEl) {
          statusEl.textContent =
            'Preview Mode: Your enquiry has been validated locally. (In production, enquiries route to the Penbrae & Co Cardiff desk via WordPress SMTP.)';
          statusEl.style.color = 'var(--color-forest)';
        }
        form.reset();
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 5. Scroll-Triggered Editorial Section & Specimen Reveals */
  function initScrollSectionReveals() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var mainEl = document.getElementById('main-content');
    if (!mainEl || !('IntersectionObserver' in window)) return;

    var targets = mainEl.querySelectorAll(
      '.editorial-section > .penbrae-container, .stall-portal, .product-specimen, .journal-card, .provenance-node'
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    targets.forEach(function (el) {
      if (el.classList.contains('reveal-on-scroll')) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.86) {
        el.classList.add('reveal-on-scroll', 'is-in-view');
      } else {
        var parentChildren = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        var siblingIndex = Math.max(0, parentChildren.indexOf(el)) % 4;
        el.style.setProperty('--stagger-idx', String(siblingIndex));
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      }
    });
  }

  /* 6. Interactive Stall Environment Atmosphere Shifts (Home Triptych & /stalls Overview) */
  function initStallAtmosphereInteractions() {
    var triptych = document.querySelector('.stall-triptych');
    if (triptych && triptych.getAttribute('data-triptych-bound') !== 'true') {
      triptych.setAttribute('data-triptych-bound', 'true');
      var portals = triptych.querySelectorAll('.stall-portal');
      var parentSection = triptych.closest('.editorial-section');

      portals.forEach(function (portal) {
        function activatePortal() {
          triptych.classList.add('has-hovered-portal');
          portals.forEach(function (p) {
            p.classList.toggle('is-hovered', p === portal);
          });
          if (parentSection) {
            parentSection.style.transition = 'background-color 520ms cubic-bezier(0.22, 1, 0.36, 1)';
            if (portal.classList.contains('stall-portal--teas')) {
              parentSection.style.backgroundColor = '#EFECE1';
            } else if (portal.classList.contains('stall-portal--spices')) {
              parentSection.style.backgroundColor = '#F3E8DA';
            } else if (portal.classList.contains('stall-portal--chillies')) {
              parentSection.style.backgroundColor = '#EFE3DE';
            }
          }
        }

        function deactivatePortal() {
          triptych.classList.remove('has-hovered-portal');
          portals.forEach(function (p) {
            p.classList.remove('is-hovered');
          });
          if (parentSection) {
            parentSection.style.backgroundColor = '';
          }
        }

        portal.addEventListener('mouseenter', activatePortal);
        portal.addEventListener('focusin', activatePortal);
        portal.addEventListener('mouseleave', deactivatePortal);
        portal.addEventListener('focusout', deactivatePortal);
      });
    }

    var envBar = document.querySelector('[data-stalls-env-bar]');
    var stallSections = document.querySelectorAll('[data-stall-section]');
    if (envBar && stallSections.length && 'IntersectionObserver' in window) {
      var envTabs = envBar.querySelectorAll('[data-env-target]');

      envTabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          var targetSlug = tab.getAttribute('data-env-target');
          var targetSec = document.querySelector('[data-stall-section="' + targetSlug + '"]');
          if (targetSec) {
            e.preventDefault();
            var offsetTop = targetSec.getBoundingClientRect().top + window.scrollY - 124;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        });
      });

      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var activeSlug = entry.target.getAttribute('data-stall-section');
              if (!activeSlug) return;
              envBar.setAttribute('data-active-env', activeSlug);
              envTabs.forEach(function (t) {
                t.classList.toggle('is-active', t.getAttribute('data-env-target') === activeSlug);
              });
              document.body.classList.remove('stall-theme-teas', 'stall-theme-spices', 'stall-theme-chillies');
              document.body.classList.add('stall-theme-' + activeSlug);
            }
          });
        },
        { rootMargin: '-28% 0px -45% 0px', threshold: 0.05 }
      );

      stallSections.forEach(function (sec) {
        sectionObserver.observe(sec);
      });
    }
  }

  /* 7. Smooth Client-Side Page & Stall Environment Transitions (Prefetch + Cross-Fade) */
  function initSmoothPageAndStallTransitions() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var pageCache = new Map();
    var isTransitioning = false;

    var progressBar = document.createElement('div');
    progressBar.className = 'penbrae-transition-bar';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    function normalizeUrl(href) {
      try {
        var u = new URL(href, window.location.origin);
        if (u.origin !== window.location.origin) return null;
        return u.pathname.replace(/\/+$/, '') || '/';
      } catch (e) {
        return null;
      }
    }

    function prefetchUrl(urlPath) {
      if (!urlPath || pageCache.has(urlPath)) return;
      fetch(urlPath, { credentials: 'same-origin' })
        .then(function (r) {
          if (!r.ok) throw new Error('Status ' + r.status);
          return r.text();
        })
        .then(function (html) {
          pageCache.set(urlPath, html);
        })
        .catch(function () {});
    }

    document.addEventListener(
      'mouseover',
      function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var path = normalizeUrl(link.getAttribute('href'));
        if (path) prefetchUrl(path);
      },
      { passive: true }
    );

    document.addEventListener(
      'touchstart',
      function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var path = normalizeUrl(link.getAttribute('href'));
        if (path) prefetchUrl(path);
      },
      { passive: true }
    );

    function fetchPageHtml(urlPath) {
      if (pageCache.has(urlPath)) {
        return Promise.resolve(pageCache.get(urlPath));
      }
      return fetch(urlPath, { credentials: 'same-origin' }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text().then(function (html) {
          pageCache.set(urlPath, html);
          return html;
        });
      });
    }

    function updateActiveNavLinks(pathname) {
      var navLinks = document.querySelectorAll('.site-nav-primary a, .site-nav-utility a');
      navLinks.forEach(function (a) {
        var linkPath = normalizeUrl(a.getAttribute('href'));
        var isCurrent =
          linkPath === pathname ||
          (linkPath === '/journal' && pathname.indexOf('/journal') === 0);
        if (isCurrent) {
          a.setAttribute('aria-current', 'page');
        } else {
          a.removeAttribute('aria-current');
        }
      });
    }

    function syncHeadMetadata(newDoc) {
      if (newDoc.title) {
        document.title = newDoc.title;
      }
      var newDesc = newDoc.querySelector('meta[name="description"]');
      var curDesc = document.querySelector('meta[name="description"]');
      if (newDesc && curDesc) {
        curDesc.setAttribute('content', newDesc.getAttribute('content') || '');
      }
      var newCanon = newDoc.querySelector('link[rel="canonical"]');
      var curCanon = document.querySelector('link[rel="canonical"]');
      if (newCanon && curCanon) {
        curCanon.setAttribute('href', newCanon.getAttribute('href') || '');
      }
    }

    function navigateSmoothly(targetUrl, pushState, preserveStallScroll) {
      if (isTransitioning) return;
      var currentMain = document.getElementById('main-content');
      if (!currentMain) {
        window.location.href = targetUrl;
        return;
      }

      isTransitioning = true;
      progressBar.classList.remove('is-completing');
      progressBar.classList.add('is-active');

      if (targetUrl.indexOf('/stall/teas') === 0 || targetUrl.indexOf('/stall/tea') === 0) {
        document.body.className = 'stall-theme-teas';
      } else if (targetUrl.indexOf('/stall/spices') === 0 || targetUrl.indexOf('/stall/spice') === 0) {
        document.body.className = 'stall-theme-spices';
      } else if (targetUrl.indexOf('/stall/chillies') === 0 || targetUrl.indexOf('/stall/chilli') === 0) {
        document.body.className = 'stall-theme-chillies';
      }

      currentMain.classList.remove('is-transitioning-in');
      currentMain.classList.add('is-transitioning-out');

      var minFadeTime = new Promise(function (resolve) {
        setTimeout(resolve, 190);
      });

      Promise.all([fetchPageHtml(targetUrl), minFadeTime])
        .then(function (results) {
          var htmlString = results[0];
          var parser = new DOMParser();
          var doc = parser.parseFromString(htmlString, 'text/html');
          var newMain = doc.getElementById('main-content');

          if (!newMain) {
            window.location.href = targetUrl;
            return;
          }

          syncHeadMetadata(doc);
          document.body.className = doc.body.className || '';

          var mobileDrawer = document.getElementById('penbrae-mobile-drawer');
          var mobileToggle = document.querySelector('[data-mobile-nav-toggle]');
          if (mobileDrawer && mobileDrawer.classList.contains('is-open') && mobileToggle) {
            mobileToggle.click();
          }

          currentMain.innerHTML = newMain.innerHTML;

          if (pushState) {
            window.history.pushState({ path: targetUrl }, '', targetUrl);
          }

          updateActiveNavLinks(targetUrl);

          if (!preserveStallScroll) {
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else if (window.scrollY > 240) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          currentMain.classList.remove('is-transitioning-out');
          void currentMain.offsetWidth;
          currentMain.classList.add('is-transitioning-in');

          progressBar.classList.remove('is-active');
          progressBar.classList.add('is-completing');

          initPageDynamicModules();

          setTimeout(function () {
            currentMain.classList.remove('is-transitioning-in');
            progressBar.classList.remove('is-completing');
            isTransitioning = false;
          }, 520);
        })
        .catch(function () {
          isTransitioning = false;
          window.location.href = targetUrl;
        });
    }

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      var link = e.target.closest('a[href]');
      if (!link) return;
      if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;
      if (link.getAttribute('aria-disabled') === 'true') {
        e.preventDefault();
        return;
      }

      var rawHref = link.getAttribute('href') || '';
      if (rawHref.indexOf('#') === 0 || rawHref.indexOf('mailto:') === 0 || rawHref.indexOf('tel:') === 0) {
        return;
      }

      var targetPath = normalizeUrl(rawHref);
      if (!targetPath) return;

      var currentPath = normalizeUrl(window.location.pathname);
      if (targetPath === currentPath) return;

      e.preventDefault();
      var isStallEnvSwitch =
        link.classList.contains('stall-env-pill') ||
        (currentPath.indexOf('/stall/') === 0 && targetPath.indexOf('/stall/') === 0);

      navigateSmoothly(targetPath, true, isStallEnvSwitch);
    });

    window.addEventListener('popstate', function () {
      var targetPath = normalizeUrl(window.location.pathname);
      if (targetPath) {
        navigateSmoothly(targetPath, false, false);
      }
    });
  }
})();
