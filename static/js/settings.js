/**
 * SixthSense — Global Settings Manager
 * =====================================
 * Reads/writes user accessibility preferences to localStorage.
 * Applied before first paint (inline script in base.html) to prevent
 * theme flash. Also provides shared utilities (announce, vibrate).
 *
 * No data ever leaves the device.
 */

const SS = {
  /** Default preference values */
  defaults: {
    fontSize:   17,
    theme:      'default',   // 'default' | 'light' | 'high-contrast'
    fontFamily: 'default',   // 'default' | 'dyslexia'
    vibration:  true,
    ttsRate:    1.0,
    ttsPitch:   1.0,
  },

  /** Load preferences from localStorage, merging with defaults */
  get() {
    try {
      return { ...this.defaults, ...JSON.parse(localStorage.getItem('ssSettings') || '{}') };
    } catch { return { ...this.defaults }; }
  },

  /** Persist a partial update and immediately apply it */
  save(partial) {
    const updated = { ...this.get(), ...partial };
    localStorage.setItem('ssSettings', JSON.stringify(updated));
    this.apply(updated);
    return updated;
  },

  /** Apply settings to the document root */
  apply(s) {
    const root = document.documentElement;
    // Font size via CSS custom property
    root.style.setProperty('--base-size', s.fontSize + 'px');
    // Colour theme via data attribute
    if (!s.theme || s.theme === 'default') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', s.theme);
    // Font family via data attribute
    if (s.fontFamily === 'dyslexia') root.setAttribute('data-font', 'dyslexia');
    else root.removeAttribute('data-font');
  },

  /** Reset all preferences to factory defaults */
  reset() {
    localStorage.removeItem('ssSettings');
    this.apply(this.defaults);
  },

  /**
   * Announce a message to screen readers via an aria-live region.
   * @param {string} msg
   * @param {'polite'|'assertive'} priority
   */
  announce(msg, priority = 'polite') {
    const id = priority === 'assertive' ? 'ss-alert-live' : 'ss-polite-live';
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    // Small delay ensures the DOM change is detected by screen readers
    requestAnimationFrame(() => { el.textContent = msg; });
  },

  /**
   * Trigger device vibration if supported and user has enabled it.
   * @param {number[]} pattern  Vibration API pattern array
   */
  vibrate(pattern = [150]) {
    if (!this.get().vibration) return;
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  },
};

// Apply settings on every page load
document.addEventListener('DOMContentLoaded', () => SS.apply(SS.get()));

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

window.SS = SS;
