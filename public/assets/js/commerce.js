/**
 * PENBRAE & CO LTD — STALL FILTERING, PRODUCT VARIANT SELECTION & COMMERCE UX
 */
(function () {
  'use strict';

  var ORDERS_STORAGE_KEY = 'penbrae_sandbox_orders_v1';
  var LAST_ORDER_SESSION_KEY = 'penbrae_last_order_v1';

  function initAllCommerceInteractions() {
    initStallCatalogueFilters();
    initProductDetailInteractions();
    initBasketPageInteractions();
    initCheckoutTestModeFlow();
    initOrderConfirmationView();
    initAccountSandboxHistoryView();
  }

  window.PenbraeCommerceInit = initAllCommerceInteractions;

  document.addEventListener('DOMContentLoaded', initAllCommerceInteractions);

  window.addEventListener('penbrae:basket-updated', function () {
    renderBasketPageTable();
    renderCheckoutOrderSummary();
    renderAccountSandboxHistory();
  });

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 1. Individual Stall (Page 3) Filtering & Sorting */
  function initStallCatalogueFilters() {
    var grid = document.querySelector('[data-stall-catalogue]');
    if (!grid || grid.getAttribute('data-filters-bound') === 'true') return;
    grid.setAttribute('data-filters-bound', 'true');

    var currentStall = (grid.getAttribute('data-current-stall') || '').toLowerCase();
    var filterBtns = document.querySelectorAll('[data-filter-region]');
    var sortSelect = document.querySelector('[data-stall-sort]');
    var countAnnouncement = document.querySelector('[data-stall-count-status]');
    var emptyStateEl = document.querySelector('[data-stall-empty-state]');
    var resetBtn = document.querySelector('[data-reset-stall-filter]');
    var items = Array.prototype.slice.call(grid.querySelectorAll('[data-specimen-item]'));

    var activeRegion = 'all';

    var regionDisplayNames = {
      all: 'All Regions',
      assam: 'Assam',
      meghalaya: 'Meghalaya',
      nagaland: 'Nagaland',
      arunachal: 'Arunachal Pradesh',
      manipur: 'Manipur'
    };

    function itemMatchesRegion(el, regionKey) {
      if (regionKey === 'all') return true;
      var tokens = (el.getAttribute('data-region') || '')
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      return tokens.indexOf(regionKey) !== -1;
    }

    function applyFilterAndSort(animate) {
      if (animate) {
        grid.classList.add('is-filtering');
      }

      var delay = animate ? 150 : 0;

      setTimeout(function () {
        var visibleCount = 0;
        var totalStallCount = 0;

        items.forEach(function (el) {
          var itemStall = (el.getAttribute('data-stall-item') || currentStall).toLowerCase();
          var belongsToStall = !currentStall || itemStall === currentStall;
          if (belongsToStall) {
            totalStallCount++;
          }

          var match = belongsToStall && itemMatchesRegion(el, activeRegion);
          el.style.display = match ? '' : 'none';
          if (match) {
            el.classList.add('is-in-view');
            visibleCount++;
          }
        });

        var mode = sortSelect ? sortSelect.value : 'curated';
        var sorted = items.slice().sort(function (a, b) {
          var pa = parseFloat(a.getAttribute('data-price') || '0');
          var pb = parseFloat(b.getAttribute('data-price') || '0');
          var ea = parseFloat(a.getAttribute('data-elevation') || '0');
          var eb = parseFloat(b.getAttribute('data-elevation') || '0');
          var oa = parseInt(a.getAttribute('data-order') || '0', 10);
          var ob = parseInt(b.getAttribute('data-order') || '0', 10);

          if (mode === 'price-asc') return pa - pb;
          if (mode === 'price-desc') return pb - pa;
          if (mode === 'elevation-desc') return eb - ea;
          return oa - ob;
        });

        sorted.forEach(function (node) {
          grid.appendChild(node);
        });

        grid.setAttribute('data-visible-count', String(visibleCount));

        if (emptyStateEl) {
          emptyStateEl.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        if (countAnnouncement) {
          var regionLabel = regionDisplayNames[activeRegion] || activeRegion;
          if (activeRegion === 'all') {
            countAnnouncement.textContent =
              'Showing ' + visibleCount + ' of ' + totalStallCount + ' seasonal ' + (visibleCount === 1 ? 'lot' : 'lots');
          } else {
            countAnnouncement.textContent =
              'Showing ' +
              visibleCount +
              ' of ' +
              totalStallCount +
              ' ' +
              (totalStallCount === 1 ? 'lot' : 'lots') +
              ' · ' +
              regionLabel;
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

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var allBtn = document.querySelector('[data-filter-region="all"]');
        if (allBtn) allBtn.click();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        applyFilterAndSort(true);
      });
    }

    applyFilterAndSort(false);
  }

  /* 2. Product Details (Page 4) — Variants, Gallery, Quantity & Sticky Mobile Bar */
  function initProductDetailInteractions() {
    var pdpSection = document.querySelector('.pdp-dossier');
    if (!pdpSection || pdpSection.getAttribute('data-pdp-bound') === 'true') return;
    pdpSection.setAttribute('data-pdp-bound', 'true');

    var variantBtns = document.querySelectorAll('[data-variant-option]');
    var priceDisplays = document.querySelectorAll('[data-pdp-price]');
    var addBtns = document.querySelectorAll('[data-pdp-add-btn]');
    var qtyInput = document.querySelector('[data-pdp-qty]');
    var qtyStepBtns = document.querySelectorAll('[data-pdp-qty-step]');

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

    function syncQty(val) {
      var q = Math.min(99, Math.max(1, parseInt(val || '1', 10) || 1));
      if (qtyInput) qtyInput.value = String(q);
      addBtns.forEach(function (ab) {
        ab.setAttribute('data-product-qty', String(q));
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('change', function () {
        syncQty(qtyInput.value);
      });
    }

    qtyStepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delta = parseInt(btn.getAttribute('data-pdp-qty-step') || '0', 10);
        var current = qtyInput ? parseInt(qtyInput.value || '1', 10) : 1;
        syncQty(current + delta);
      });
    });

    // Gallery plate switcher
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
    var clearBtn = document.querySelector('[data-clear-basket-btn]');
    if (clearBtn && clearBtn.getAttribute('data-bound') !== 'true') {
      clearBtn.setAttribute('data-bound', 'true');
      clearBtn.addEventListener('click', function () {
        if (window.PenbraeBasket) {
          window.PenbraeBasket.clear();
        }
      });
    }
    renderBasketPageTable();
  }

  function renderBasketPageTable() {
    var tableBody = document.getElementById('penbrae-basket-page-rows');
    var subtotalEl = document.getElementById('penbrae-basket-page-subtotal');
    var shippingEl = document.getElementById('penbrae-basket-page-shipping');
    var totalEl = document.getElementById('penbrae-basket-page-total');
    var checkoutBtn = document.querySelector('[data-basket-checkout-btn]');
    var clearBtn = document.querySelector('[data-clear-basket-btn]');

    if (!tableBody || !window.PenbraeBasket) return;

    var items = window.PenbraeBasket.getItems();
    var subtotal = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    var shipping = items.length === 0 ? 0 : (subtotal >= 50 ? 0 : 4.50);
    var total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = '£' + subtotal.toFixed(2);
    if (shippingEl) {
      shippingEl.textContent =
        items.length === 0
          ? '£0.00'
          : shipping === 0
            ? 'Free (Orders £50+)'
            : '£' + shipping.toFixed(2);
    }
    if (totalEl) totalEl.textContent = '£' + total.toFixed(2);

    if (checkoutBtn) {
      if (items.length === 0) {
        checkoutBtn.setAttribute('aria-disabled', 'true');
      } else {
        checkoutBtn.removeAttribute('aria-disabled');
      }
    }

    if (clearBtn) {
      clearBtn.style.display = items.length > 0 ? 'inline-flex' : 'none';
    }

    if (!items.length) {
      tableBody.innerHTML =
        '<tr><td colspan="6" style="padding:3rem 1.5rem;text-align:center;color:var(--color-ink-secondary);">' +
        '<p style="margin-bottom:1rem;font-size:1.05rem;">Your shopping basket is currently empty.</p>' +
        '<a href="/stalls" class="btn-editorial">Explore The Three Stalls →</a>' +
        '</td></tr>';
      return;
    }

    tableBody.innerHTML = items
      .map(function (item, idx) {
        return (
          '<tr>' +
          '<td>' +
          '<a href="' + escapeHtml(item.url) + '" style="font-family:var(--font-editorial);font-size:1.3rem;color:var(--color-charcoal);text-decoration:none;font-weight:500;">' + escapeHtml(item.title) + '</a>' +
          '<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);margin-top:0.2rem;">' + escapeHtml(item.region) + '</div>' +
          '</td>' +
          '<td style="font-family:var(--font-mono);font-size:0.8rem;">' + escapeHtml(item.variant) + '</td>' +
          '<td class="tabular-nums" style="font-family:var(--font-mono);">£' + item.price.toFixed(2) + '</td>' +
          '<td>' +
          '<div class="qty-stepper" role="group" aria-label="Quantity for ' + escapeHtml(item.title) + '">' +
          '<button type="button" class="qty-stepper__btn" data-basket-step="-1" data-basket-idx="' + idx + '" aria-label="Decrease quantity">−</button>' +
          '<input type="number" class="qty-stepper__input" min="1" max="99" value="' + item.qty + '" data-basket-row-qty="' + idx + '" aria-label="Quantity for ' + escapeHtml(item.title) + '" />' +
          '<button type="button" class="qty-stepper__btn" data-basket-step="1" data-basket-idx="' + idx + '" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '</td>' +
          '<td class="tabular-nums" style="font-family:var(--font-mono);font-weight:500;">£' + (item.price * item.qty).toFixed(2) + '</td>' +
          '<td style="text-align:right;">' +
          '<button type="button" class="basket-remove-btn" data-basket-row-remove="' + idx + '" aria-label="Remove ' + escapeHtml(item.title) + ' from basket">Remove</button>' +
          '</td>' +
          '</tr>'
        );
      })
      .join('');

    tableBody.querySelectorAll('[data-basket-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-basket-idx'), 10);
        var delta = parseInt(btn.getAttribute('data-basket-step'), 10);
        var current = window.PenbraeBasket.getItems();
        if (current[idx]) {
          window.PenbraeBasket.updateQty(idx, current[idx].qty + delta);
        }
      });
    });

    tableBody.querySelectorAll('[data-basket-row-qty]').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var idx = parseInt(inp.getAttribute('data-basket-row-qty'), 10);
        var q = parseInt(inp.value || '1', 10);
        window.PenbraeBasket.updateQty(idx, isNaN(q) ? 1 : q);
      });
    });

    tableBody.querySelectorAll('[data-basket-row-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-basket-row-remove'), 10);
        window.PenbraeBasket.removeItem(idx);
      });
    });
  }

  /* 4. Checkout Test Mode Flow & Live Order Summary */
  function renderCheckoutOrderSummary() {
    var itemsContainer = document.getElementById('penbrae-checkout-items');
    var subtotalEl = document.getElementById('penbrae-checkout-subtotal');
    var shippingEl = document.getElementById('penbrae-checkout-shipping');
    var totalEl = document.getElementById('penbrae-checkout-total');
    var submitBtn = document.querySelector('[data-checkout-submit-btn]');

    if (!itemsContainer || !window.PenbraeBasket) return;

    var items = window.PenbraeBasket.getItems();
    var subtotal = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    var shipping = items.length === 0 ? 0 : (subtotal >= 50 ? 0 : 4.50);
    var total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = '£' + subtotal.toFixed(2);
    if (shippingEl) {
      shippingEl.textContent =
        items.length === 0
          ? '£0.00'
          : shipping === 0
            ? 'Free (Orders £50+)'
            : '£' + shipping.toFixed(2) + ' (UK Tracked 48)';
    }
    if (totalEl) totalEl.textContent = '£' + total.toFixed(2);

    if (submitBtn) {
      submitBtn.disabled = items.length === 0;
    }

    if (!items.length) {
      itemsContainer.innerHTML =
        '<div style="padding:1.25rem;background:var(--color-parchment);border:var(--rule-hairline);text-align:center;">' +
        '<p style="font-size:0.9rem;color:var(--color-ink-secondary);margin-bottom:0.75rem;">Your basket is currently empty. Add at least one lot before placing a sandbox order.</p>' +
        '<a href="/stalls" class="link-editorial">Browse The Three Stalls →</a>' +
        '</div>';
      return;
    }

    itemsContainer.innerHTML = items
      .map(function (item) {
        return (
          '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding:0.65rem 0;border-bottom:var(--rule-hairline);font-size:0.9rem;">' +
          '<div>' +
          '<strong>' + escapeHtml(item.title) + '</strong>' +
          '<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">' +
          escapeHtml(item.variant) + ' × ' + item.qty +
          '</div>' +
          '</div>' +
          '<span class="tabular-nums" style="font-family:var(--font-mono);">£' + (item.price * item.qty).toFixed(2) + '</span>' +
          '</div>'
        );
      })
      .join('');
  }

  function initCheckoutTestModeFlow() {
    renderCheckoutOrderSummary();

    var checkoutForm = document.querySelector('[data-penbrae-checkout-form]');
    if (!checkoutForm || checkoutForm.getAttribute('data-checkout-bound') === 'true') return;
    checkoutForm.setAttribute('data-checkout-bound', 'true');

    checkoutForm.addEventListener('submit', function (e) {
      if (checkoutForm.getAttribute('data-test-preview') === 'true') {
        e.preventDefault();
        var items = window.PenbraeBasket ? window.PenbraeBasket.getItems() : [];
        if (!items.length) return;

        var subtotal = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
        var shipping = subtotal >= 50 ? 0 : 4.50;
        var total = subtotal + shipping;

        var firstName = (checkoutForm.querySelector('[name="billing_first_name"]') || {}).value || '';
        var lastName = (checkoutForm.querySelector('[name="billing_last_name"]') || {}).value || '';
        var email = (checkoutForm.querySelector('[name="billing_email"]') || {}).value || '';
        var address = (checkoutForm.querySelector('[name="billing_address_1"]') || {}).value || '';
        var city = (checkoutForm.querySelector('[name="billing_city"]') || {}).value || '';
        var postcode = (checkoutForm.querySelector('[name="billing_postcode"]') || {}).value || '';
        var notes = (checkoutForm.querySelector('[name="order_comments"]') || {}).value || '';

        var orderRef = 'PB-SAND-' + String(Date.now()).slice(-6);
        var orderRecord = {
          ref: orderRef,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          customer: {
            name: (firstName + ' ' + lastName).trim() || 'Guest Patron',
            email: email,
            address: address,
            city: city,
            postcode: postcode,
            notes: notes
          },
          items: items,
          subtotal: subtotal,
          shipping: shipping,
          total: total
        };

        try {
          sessionStorage.setItem(LAST_ORDER_SESSION_KEY, JSON.stringify(orderRecord));
          var existingHistory = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
          existingHistory.unshift(orderRecord);
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingHistory.slice(0, 10)));
        } catch (err) {}

        if (window.PenbraeBasket) {
          window.PenbraeBasket.clear();
        }

        window.location.href = '/order-confirmation';
      }
    });
  }

  /* 5. Dynamic Sandbox Order Confirmation View */
  function initOrderConfirmationView() {
    var container = document.getElementById('penbrae-order-confirmation-view');
    if (!container) return;

    var order = null;
    try {
      var raw = sessionStorage.getItem(LAST_ORDER_SESSION_KEY);
      if (raw) {
        order = JSON.parse(raw);
      } else {
        var hist = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
        if (hist.length > 0) order = hist[0];
      }
    } catch (err) {}

    if (!order || !order.items || !order.items.length) {
      container.innerHTML =
        '<div style="padding:var(--space-5);background:var(--color-parchment-light);border:var(--rule-strong);">' +
        '<span class="kicker-index">SANDBOX ORDER VERIFICATION</span>' +
        '<h2 style="font-size:1.85rem;margin:0.4rem 0 0.75rem 0;">No Sandbox Order Found in Current Session</h2>' +
        '<p style="color:var(--color-ink-secondary);margin-bottom:1.25rem;">To test the full checkout flow, add a seasonal lot from any Stall to your basket and complete the sandbox checkout form. No real payment is captured.</p>' +
        '<div style="display:flex;gap:1rem;flex-wrap:wrap;">' +
        '<a href="/stalls" class="btn-editorial">Explore The Three Stalls →</a>' +
        '<a href="/basket" class="btn-editorial btn-editorial--outline">View Basket</a>' +
        '</div>' +
        '</div>';
      return;
    }

    var rowsHtml = order.items
      .map(function (i) {
        return (
          '<tr>' +
          '<td><strong>' + escapeHtml(i.title) + '</strong><div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">' + escapeHtml(i.region) + '</div></td>' +
          '<td style="font-family:var(--font-mono);font-size:0.8rem;">' + escapeHtml(i.variant) + '</td>' +
          '<td style="font-family:var(--font-mono);">' + i.qty + '</td>' +
          '<td class="tabular-nums" style="font-family:var(--font-mono);text-align:right;">£' + (i.price * i.qty).toFixed(2) + '</td>' +
          '</tr>'
        );
      })
      .join('');

    container.innerHTML =
      '<div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;padding-bottom:1.25rem;border-bottom:var(--rule-hairline);margin-bottom:1.5rem;">' +
      '<div>' +
      '<span class="kicker-index">SANDBOX RECEIPT · NO LIVE CHARGE CAPTURED</span>' +
      '<h2 style="font-size:2rem;margin:0.35rem 0 0 0;">Order Reference: ' + escapeHtml(order.ref) + '</h2>' +
      '<div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--color-ink-muted);margin-top:0.25rem;">Logged: ' + escapeHtml(order.date) + ' · Status: Sandbox Demonstration Order</div>' +
      '</div>' +
      '<span class="pdp-stock-badge">Sandbox Verified</span>' +
      '</div>' +
      '<div class="editorial-grid" style="margin-bottom:1.5rem;">' +
      '<div class="col-span-6">' +
      '<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);margin-bottom:0.35rem;">Recipient &amp; Dispatch Address</div>' +
      '<p style="margin:0;font-size:0.95rem;"><strong>' + escapeHtml(order.customer.name) + '</strong><br>' +
      escapeHtml(order.customer.address) + '<br>' +
      escapeHtml(order.customer.city) + ' ' + escapeHtml(order.customer.postcode) + '<br>' +
      '<span style="color:var(--color-ink-muted);">' + escapeHtml(order.customer.email) + '</span></p>' +
      '</div>' +
      '<div class="col-span-6">' +
      '<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);margin-bottom:0.35rem;">Payment &amp; Fulfilment Mode</div>' +
      '<p style="margin:0;font-size:0.92rem;color:var(--color-ink-secondary);">Processed in portfolio sandbox mode (no payment gateway charge). In production, orders are fulfilled from Cardiff via Royal Mail Tracked service.</p>' +
      '</div>' +
      '</div>' +
      '<div style="overflow-x:auto;margin-bottom:1.5rem;">' +
      '<table class="commerce-ledger-table" aria-label="Ordered Items">' +
      '<thead><tr><th>Lot</th><th>Format</th><th>Qty</th><th style="text-align:right;">Total</th></tr></thead>' +
      '<tbody>' + rowsHtml + '</tbody>' +
      '</table>' +
      '</div>' +
      '<div style="max-width:340px;margin-left:auto;font-family:var(--font-mono);font-size:0.85rem;">' +
      '<div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:var(--rule-hairline);"><span>Subtotal</span><span>£' + order.subtotal.toFixed(2) + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:var(--rule-hairline);"><span>UK Dispatch</span><span>' + (order.shipping === 0 ? 'Free' : '£' + order.shipping.toFixed(2)) + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:0.65rem 0;font-size:1.05rem;font-weight:600;"><span>Total (GBP)</span><span>£' + order.total.toFixed(2) + '</span></div>' +
      '</div>' +
      '</div>';
  }

  /* 6. Account Page Local Sandbox Order History */
  function initAccountSandboxHistoryView() {
    renderAccountSandboxHistory();
  }

  function renderAccountSandboxHistory() {
    var container = document.getElementById('penbrae-account-orders-view');
    if (!container) return;

    var history = [];
    try {
      history = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    } catch (err) {}

    if (!history.length) {
      container.innerHTML =
        '<p style="color:var(--color-ink-secondary);margin:0;">No sandbox orders have been placed in this browser session yet. <a href="/stalls" class="link-editorial" style="margin-left:0.4rem;">Browse The Three Stalls →</a></p>';
      return;
    }

    container.innerHTML = history
      .map(function (ord) {
        var count = (ord.items || []).reduce(function (s, i) { return s + i.qty; }, 0);
        return (
          '<div style="padding:1rem 0;border-bottom:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">' +
          '<div>' +
          '<strong style="font-family:var(--font-mono);font-size:0.86rem;">' + escapeHtml(ord.ref) + '</strong>' +
          '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);margin-left:0.75rem;">' + escapeHtml(ord.date) + ' · ' + count + (count === 1 ? ' item' : ' items') + '</span>' +
          '<div style="font-size:0.88rem;color:var(--color-ink-secondary);margin-top:0.2rem;">Recipient: ' + escapeHtml((ord.customer && ord.customer.name) || 'Guest') + '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:1rem;">' +
          '<span class="tabular-nums" style="font-family:var(--font-mono);font-weight:600;">£' + Number(ord.total || 0).toFixed(2) + '</span>' +
          '<a href="/order-confirmation" class="link-editorial">View Receipt →</a>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }
})();
