/**
 * PENBRAE & CO LTD — PRIMARY EDITORIAL & ACCESSIBILITY INTERACTIONS
 * Supports: Mobile touch navigation, Slide-over Basket Drawer, Documentary Audio Player,
 * Search Drawer, and Reduced-Motion-Safe Editorial Reveals.
 */
(function () {
  'use strict';

  function initPageDynamicModules() {
    initDocumentaryAudioPlayers();
    initNewsletterForms();
    initScrollSectionReveals();
    initStallAtmosphereInteractions();
    if (typeof window.PenbraeCommerceInit === 'function') {
      window.PenbraeCommerceInit();
    }
    if (typeof window.PenbraeMapInit === 'function') {
      window.PenbraeMapInit();
    }
  }

  window.PenbraeEditorialInit = initPageDynamicModules;

  document.addEventListener('DOMContentLoaded', function () {
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
      toggleBtn.textContent = !expanded ? 'Close [×]' : 'Index [≡]';
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

      // If inside a real WordPress WooCommerce form and WC AJAX is not overriding,
      // we still update our client basket drawer and feedback state.
      e.preventDefault();

      var item = {
        id: addBtn.getAttribute('data-product-id') || 'lot-01',
        title: addBtn.getAttribute('data-product-title') || 'Penbrae Rare Lot',
        variant: addBtn.getAttribute('data-product-variant') || 'Standard Caddy',
        price: parseFloat(addBtn.getAttribute('data-product-price') || '24.00'),
        qty: parseInt(addBtn.getAttribute('data-product-qty') || '1', 10),
        url: addBtn.getAttribute('data-product-url') || '/product/assam-golden-tip',
        region: addBtn.getAttribute('data-product-region') || 'Northeast India'
      };

      addToPenbraeBasket(item);

      var originalText = addBtn.textContent;
      addBtn.textContent = 'Added to Basket ✓';
      setTimeout(function () {
        addBtn.textContent = originalText;
      }, 1400);

      openBasket();
    });

    renderBasketState();
  }

  function getBasketItems() {
    try {
      var raw = localStorage.getItem('penbrae_basket_v1');
      if (raw) return JSON.parse(raw);
    } catch (err) {
      // Fallback
    }
    return [
      {
        id: 'namrup-autumn-orthodox',
        title: 'Upper Assam Tippy Orthodox Reserve',
        variant: '75g Archival Caddy',
        price: 28.00,
        qty: 1,
        url: '/product/upper-assam-tippy-orthodox',
        region: 'Dibrugarh District, Upper Assam'
      }
    ];
  }

  function saveBasketItems(items) {
    try {
      localStorage.setItem('penbrae_basket_v1', JSON.stringify(items));
    } catch (err) {}
    renderBasketState();
  }

  function addToPenbraeBasket(newItem) {
    var items = getBasketItems();
    var existing = items.find(function (i) {
      return i.id === newItem.id && i.variant === newItem.variant;
    });
    if (existing) {
      existing.qty += newItem.qty;
    } else {
      items.push(newItem);
    }
    saveBasketItems(items);
  }

  window.PenbraeBasket = {
    getItems: getBasketItems,
    saveItems: saveBasketItems,
    addItem: addToPenbraeBasket
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
    if (drawerSubtotal) {
      drawerSubtotal.textContent = '£' + subtotal.toFixed(2);
    }

    if (drawerContainer) {
      if (items.length === 0) {
        drawerContainer.innerHTML =
          '<p style="color:var(--color-ink-secondary);padding:2rem 0;">Your dispatch ledger is currently empty. Explore the Tea, Spice, or Chilli Stalls to select rare seasonal lots.</p>';
      } else {
        drawerContainer.innerHTML = items
          .map(function (item, idx) {
            return (
              '<div style="padding:1rem 0;border-bottom:var(--rule-hairline);display:flex;justify-content:space-between;gap:1rem;">' +
              '<div>' +
              '<div class="kicker-index" style="font-size:0.66rem;">' + escapeHtml(item.region) + '</div>' +
              '<a href="' + escapeHtml(item.url) + '" style="font-family:var(--font-editorial);font-size:1.25rem;color:var(--color-charcoal);text-decoration:none;display:block;margin:0.2rem 0;">' +
              escapeHtml(item.title) +
              '</a>' +
              '<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">' +
              escapeHtml(item.variant) + ' × ' + item.qty +
              '</div>' +
              '</div>' +
              '<div style="text-align:right;display:flex;flex-direction:column;justify-content:space-between;">' +
              '<span class="tabular-nums" style="font-family:var(--font-mono);font-size:0.9rem;">£' +
              (item.price * item.qty).toFixed(2) +
              '</span>' +
              '<button type="button" data-remove-basket-idx="' + idx + '" style="background:none;border:none;font-family:var(--font-mono);font-size:0.68rem;text-transform:uppercase;color:var(--color-terracotta);cursor:pointer;padding:0.25rem 0;">Remove</button>' +
              '</div>' +
              '</div>'
            );
          })
          .join('');

        drawerContainer.querySelectorAll('[data-remove-basket-idx]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = parseInt(btn.getAttribute('data-remove-basket-idx'), 10);
            var current = getBasketItems();
            current.splice(idx, 1);
            saveBasketItems(current);
          });
        });
      }
    }
  }

  /* 3. Accessible Documentary Audio Player (Simulated + HTML5 Audio support) */
  function initDocumentaryAudioPlayers() {
    var modules = document.querySelectorAll('[data-audio-module]');
    modules.forEach(function (mod) {
      var playBtn = mod.querySelector('[data-audio-toggle]');
      var bar = mod.querySelector('[data-audio-bar]');
      var timeEl = mod.querySelector('[data-audio-time]');
      var audioEl = mod.querySelector('audio');
      var durationSec = parseInt(mod.getAttribute('data-duration-sec') || '94', 10);
      var currentSec = 0;
      var timer = null;
      var playing = false;

      if (!playBtn) return;

      playBtn.addEventListener('click', function () {
        playing = !playing;
        playBtn.setAttribute('aria-pressed', String(playing));
        playBtn.textContent = playing ? 'Pause ❚❚' : 'Listen ▶';

        if (audioEl && audioEl.getAttribute('src')) {
          if (playing) audioEl.play().catch(function () {});
          else audioEl.pause();
        }

        if (playing) {
          timer = setInterval(function () {
            currentSec = (currentSec + 1) % (durationSec + 1);
            var pct = Math.min(100, Math.round((currentSec / durationSec) * 100));
            if (bar) bar.style.width = pct + '%';
            if (timeEl) timeEl.textContent = formatTime(currentSec) + ' / ' + formatTime(durationSec);
            if (currentSec >= durationSec) {
              clearInterval(timer);
              playing = false;
              playBtn.setAttribute('aria-pressed', 'false');
              playBtn.textContent = 'Listen ▶';
            }
          }, 1000);
        } else if (timer) {
          clearInterval(timer);
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
      form.addEventListener('submit', function (e) {
        var consent = form.querySelector('input[name="gdpr_consent"]');
        var statusEl = form.querySelector('[data-newsletter-status]');
        if (consent && !consent.checked) {
          e.preventDefault();
          if (statusEl) {
            statusEl.textContent = 'Please confirm explicit marketing consent before subscribing to the Penbrae Dispatch.';
            statusEl.style.color = 'var(--color-oxblood)';
          }
          return;
        }
        if (form.getAttribute('data-ajax-preview') === 'true') {
          e.preventDefault();
          if (statusEl) {
            statusEl.textContent = 'Thank you. A double-opt-in confirmation has been queued for your address (Cardiff Dispatch Ledger).';
            statusEl.style.color = 'var(--color-forest)';
          }
          form.reset();
        }
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

    targets.forEach(function (el, index) {
      if (el.classList.contains('reveal-on-scroll')) return;
      var rect = el.getBoundingClientRect();
      // Immediately reveal items already high in the initial viewport
      if (rect.top < window.innerHeight * 0.86) {
        el.classList.add('reveal-on-scroll', 'is-in-view');
      } else {
        // Stagger siblings within the same grid row
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
    // A. Home Page Stall Triptych hover atmosphere
    var triptych = document.querySelector('.stall-triptych');
    if (triptych) {
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

    // B. Stalls Overview (/stalls) Sticky Environment Bar & Scroll Spy
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

    // Prefetch on hover / touchstart for instant Stall & Page switching
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

      // Immediately start morphing stall theme class if navigating to a stall
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
        setTimeout(resolve, 210);
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

          // Update document title & body class for atmosphere continuity
          if (doc.title) {
            document.title = doc.title;
          }
          document.body.className = doc.body.className || '';

          // Close mobile drawer if open
          var mobileDrawer = document.getElementById('penbrae-mobile-drawer');
          var mobileToggle = document.querySelector('[data-mobile-nav-toggle]');
          if (mobileDrawer && mobileDrawer.classList.contains('is-open') && mobileToggle) {
            mobileToggle.click();
          }

          // Swap main content
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

          // Trigger smooth enter animation
          currentMain.classList.remove('is-transitioning-out');
          void currentMain.offsetWidth; // force reflow
          currentMain.classList.add('is-transitioning-in');

          progressBar.classList.remove('is-active');
          progressBar.classList.add('is-completing');

          // Re-initialize interactive modules on new DOM
          initPageDynamicModules();

          setTimeout(function () {
            currentMain.classList.remove('is-transitioning-in');
            progressBar.classList.remove('is-completing');
            isTransitioning = false;
          }, 560);
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
