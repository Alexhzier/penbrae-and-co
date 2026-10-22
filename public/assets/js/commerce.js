/**
 * PENBRAE & CO LTD — STALL FILTERING, PRODUCT VARIANT SELECTION & COMMERCE UX
 */
(function () {
  'use strict';

  function initAllCommerceInteractions() {
    initStallCatalogueFilters();
    initProductDetailInteractions();
    initBasketPageInteractions();
    initCheckoutTestModeFlow();
  }

  window.PenbraeCommerceInit = initAllCommerceInteractions;

  document.addEventListener('DOMContentLoaded', initAllCommerceInteractions);

  /* 1. Individual Stall (Page 3) Filtering & Sorting */
  function initStallCatalogueFilters() {
    var grid = document.querySelector('[data-stall-catalogue]');
    if (!grid) return;

    var currentStall = (grid.getAttribute('data-current-stall') || '').toLowerCase();
    var filterBtns = document.querySelectorAll('[data-filter-region]');
    var sortSelect = document.querySelector('[data-stall-sort]');
    var countAnnouncement = document.querySelector('[data-stall-count-status]');
    var items = Array.prototype.slice.call(grid.querySelectorAll('[data-specimen-item]'));

    var activeRegion = 'all';

    function applyFilterAndSort(animate) {
      if (animate) {
        grid.classList.add('is-filtering');
      }

      var delay = animate ? 160 : 0;

      setTimeout(function () {
        var visibleCount = 0;

        // First check if the current stall has any items matching activeRegion
        var stallHasRegionMatch = items.some(function (el) {
          var itemStall = (el.getAttribute('data-stall-item') || currentStall).toLowerCase();
          var itemRegion = (el.getAttribute('data-region') || '').toLowerCase();
          return itemStall === currentStall && itemRegion.indexOf(activeRegion) !== -1;
        });

        items.forEach(function (el) {
          var itemStall = (el.getAttribute('data-stall-item') || currentStall).toLowerCase();
          var itemRegion = (el.getAttribute('data-region') || '').toLowerCase();
          var match = false;

          if (activeRegion === 'all') {
            match = !currentStall || itemStall === currentStall;
          } else {
            // Show all lots matching the selected region across Penbrae so no region filter is ever empty
            match = itemRegion.indexOf(activeRegion) !== -1;
          }

          el.style.display = match ? '' : 'none';
          if (match) {
            el.classList.add('is-in-view');
            visibleCount++;
          }
        });

        var mode = sortSelect ? sortSelect.value : 'curated';
        var sorted = items.slice().sort(function (a, b) {
          var sa = (a.getAttribute('data-stall-item') || '') === currentStall ? 0 : 1;
          var sb = (b.getAttribute('data-stall-item') || '') === currentStall ? 0 : 1;
          var pa = parseFloat(a.getAttribute('data-price') || '0');
          var pb = parseFloat(b.getAttribute('data-price') || '0');
          var ea = parseFloat(a.getAttribute('data-elevation') || '0');
          var eb = parseFloat(b.getAttribute('data-elevation') || '0');
          var oa = parseInt(a.getAttribute('data-order') || '0', 10);
          var ob = parseInt(b.getAttribute('data-order') || '0', 10);

          if (mode === 'price-asc') return pa - pb;
          if (mode === 'price-desc') return pb - pa;
          if (mode === 'elevation-desc') return eb - ea;
          if (sa !== sb) return sa - sb;
          return oa - ob;
        });

        sorted.forEach(function (node) {
          grid.appendChild(node);
        });

        grid.setAttribute('data-visible-count', String(visibleCount));

        if (countAnnouncement) {
          if (activeRegion === 'all') {
            countAnnouncement.textContent = 'Showing ' + visibleCount + ' curated seasonal ' + (visibleCount === 1 ? 'lot' : 'lots');
          } else if (!stallHasRegionMatch) {
            countAnnouncement.textContent =
              'Showing ' + visibleCount + ' ' + activeRegion.charAt(0).toUpperCase() + activeRegion.slice(1) + ' harvest lots across Penbrae Stalls';
          } else {
            countAnnouncement.textContent =
              'Showing ' + visibleCount + ' ' + activeRegion.charAt(0).toUpperCase() + activeRegion.slice(1) + ' ' + (visibleCount === 1 ? 'lot' : 'lots');
          }
        }

        requestAnimationFrame(function () {
          grid.classList.remove('is-filtering');
        });
      }, delay);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeRegion = (btn.getAttribute('data-filter-region') || 'all').toLowerCase();
        filterBtns.forEach(function (b) {
          var isCurrent = b === btn;
          b.setAttribute('aria-pressed', String(isCurrent));
          b.classList.toggle('is-active', isCurrent);
        });
        applyFilterAndSort(true);
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        applyFilterAndSort(true);
      });
    }

    applyFilterAndSort(false);
  }

  /* 2. Product Details (Page 4) — Variants, Gallery, Quantity & Sticky Mobile Bar */
  function initProductDetailInteractions() {
    var variantBtns = document.querySelectorAll('[data-variant-option]');
    var priceDisplays = document.querySelectorAll('[data-pdp-price]');
    var addBtns = document.querySelectorAll('[data-pdp-add-btn]');
    var qtyInput = document.querySelector('[data-pdp-qty]');

    if (variantBtns.length) {
      variantBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          variantBtns.forEach(function (b) {
            b.setAttribute('aria-checked', String(b === btn));
          });
          var newPrice = parseFloat(btn.getAttribute('data-variant-price') || '28.00');
          var newLabel = btn.getAttribute('data-variant-label') || '75g Archival Caddy';

          priceDisplays.forEach(function (el) {
            el.textContent = '£' + newPrice.toFixed(2);
          });

          addBtns.forEach(function (ab) {
            ab.setAttribute('data-product-price', newPrice.toFixed(2));
            ab.setAttribute('data-product-variant', newLabel);
          });
        });
      });
    }

    if (qtyInput && addBtns.length) {
      qtyInput.addEventListener('change', function () {
        var q = Math.max(1, parseInt(qtyInput.value || '1', 10));
        qtyInput.value = String(q);
        addBtns.forEach(function (ab) {
          ab.setAttribute('data-product-qty', String(q));
        });
      });
    }

    // Gallery plate switcher (switches real photograph + caption + badge)
    var thumbBtns = document.querySelectorAll('[data-gallery-thumb]');
    var stageCaption = document.querySelector('[data-gallery-stage-caption]');
    var stageBadge = document.querySelector('[data-gallery-stage-badge]');
    var stageImg = document.querySelector('[data-gallery-stage-img]');

    thumbBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        thumbBtns.forEach(function (b) {
          b.setAttribute('aria-selected', String(b === btn));
        });
        var newSrc = btn.getAttribute('data-img-src');
        if (stageImg && newSrc) {
          stageImg.classList.add('is-swapping');
          setTimeout(function () {
            stageImg.setAttribute('src', newSrc);
            stageImg.classList.remove('is-swapping');
          }, 150);
        }
        if (stageCaption) {
          stageCaption.textContent = btn.getAttribute('data-caption') || '';
        }
        if (stageBadge) {
          stageBadge.textContent = btn.getAttribute('data-plate-id') || 'PLATE I';
        }
      });
    });
  }

  /* 3. Basket Page (/basket) Dynamic Sync */
  function initBasketPageInteractions() {
    var tableBody = document.getElementById('penbrae-basket-page-rows');
    var subtotalEl = document.getElementById('penbrae-basket-page-subtotal');
    if (!tableBody || !window.PenbraeBasket) return;

    function renderFullBasketPage() {
      var items = window.PenbraeBasket.getItems();
      var subtotal = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);

      if (subtotalEl) {
        subtotalEl.textContent = '£' + subtotal.toFixed(2);
      }

      if (!items.length) {
        tableBody.innerHTML =
          '<tr><td colspan="5" style="padding:2.5rem;text-align:center;color:var(--color-ink-secondary);">Your basket contains no lots. <a href="/stalls" class="link-editorial" style="margin-left:0.5rem;">Return to The Stalls →</a></td></tr>';
        return;
      }

      tableBody.innerHTML = items
        .map(function (item, idx) {
          return (
            '<tr>' +
            '<td><a href="' + item.url + '" style="font-family:var(--font-editorial);font-size:1.3rem;color:var(--color-charcoal);text-decoration:none;">' + item.title + '</a><div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">' + item.region + '</div></td>' +
            '<td style="font-family:var(--font-mono);font-size:0.8rem;">' + item.variant + '</td>' +
            '<td class="tabular-nums" style="font-family:var(--font-mono);">£' + item.price.toFixed(2) + '</td>' +
            '<td><input type="number" min="1" max="20" value="' + item.qty + '" data-basket-row-qty="' + idx + '" aria-label="Quantity for ' + item.title + '" style="width:72px;padding:0.45rem;border:var(--rule-strong);background:var(--color-parchment);font-family:var(--font-mono);text-align:center;" /></td>' +
            '<td class="tabular-nums" style="font-family:var(--font-mono);font-weight:500;">£' + (item.price * item.qty).toFixed(2) + '</td>' +
            '</tr>'
          );
        })
        .join('');

      tableBody.querySelectorAll('[data-basket-row-qty]').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var idx = parseInt(inp.getAttribute('data-basket-row-qty'), 10);
          var q = Math.max(1, parseInt(inp.value || '1', 10));
          var current = window.PenbraeBasket.getItems();
          if (current[idx]) {
            current[idx].qty = q;
            window.PenbraeBasket.saveItems(current);
            renderFullBasketPage();
          }
        });
      });
    }

    renderFullBasketPage();
  }

  /* 4. Checkout Test Mode Flow */
  function initCheckoutTestModeFlow() {
    var checkoutForm = document.querySelector('[data-penbrae-checkout-form]');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', function (e) {
      if (checkoutForm.getAttribute('data-test-preview') === 'true') {
        e.preventDefault();
        window.location.href = '/order-confirmation?order_ref=PB-TEST-2026-084';
      }
    });
  }
})();
