"""Generate app icons from SVG using Playwright canvas rendering."""
from playwright.sync_api import sync_playwright
import base64
import os

# 🌿風の葉っぱ + 下に「こもれび」テキスト
LEAF_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5a9e7f"/>
      <stop offset="100%" stop-color="#3d7a5e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bg)"/>
  <g transform="translate(256, 195) scale(1.1)">
    <!-- Main stem -->
    <path d="M0 160 C0 160, -5 80, -12 30 C-18 -20, -22 -55, -15 -90"
          stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" opacity="0.9"/>
    <!-- Left leaf 1 (lower) -->
    <path d="M-8 120 C-35 95, -85 87, -102 72 C-85 65, -42 72, -12 105"
          fill="#fff" opacity="0.82"/>
    <!-- Right leaf 1 (lower-mid) -->
    <path d="M-5 78 C18 52, 68 40, 92 28 C76 42, 32 56, -2 78"
          fill="#fff" opacity="0.82"/>
    <!-- Left leaf 2 (upper-mid) -->
    <path d="M-11 30 C-35 5, -78 -6, -98 -22 C-78 -26, -40 -14, -14 15"
          fill="#fff" opacity="0.88"/>
    <!-- Right leaf 2 (upper) -->
    <path d="M-14 -8 C8 -32, 48 -48, 72 -60 C55 -42, 16 -22, -11 -2"
          fill="#fff" opacity="0.88"/>
    <!-- Top leaf (crown) -->
    <path d="M-17 -50 C-24 -75, -20 -108, -4 -125 C5 -108, 2 -75, -12 -50"
          fill="#fff" opacity="0.92"/>
  </g>
  <!-- こもれび text -->
  <text x="256" y="440" text-anchor="middle" fill="#fff" font-family="sans-serif"
        font-size="52" font-weight="600" letter-spacing="8" opacity="0.95">こもれび</text>
</svg>'''

# Maskable: full bleed bg, content in safe zone
LEAF_SVG_MASKABLE = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5a9e7f"/>
      <stop offset="100%" stop-color="#3d7a5e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(256, 200) scale(0.85)">
    <!-- Main stem -->
    <path d="M0 160 C0 160, -5 80, -12 30 C-18 -20, -22 -55, -15 -90"
          stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
    <path d="M-8 120 C-35 95, -85 87, -102 72 C-85 65, -42 72, -12 105"
          fill="#fff" opacity="0.82"/>
    <path d="M-5 78 C18 52, 68 40, 92 28 C76 42, 32 56, -2 78"
          fill="#fff" opacity="0.82"/>
    <path d="M-11 30 C-35 5, -78 -6, -98 -22 C-78 -26, -40 -14, -14 15"
          fill="#fff" opacity="0.88"/>
    <path d="M-14 -8 C8 -32, 48 -48, 72 -60 C55 -42, 16 -22, -11 -2"
          fill="#fff" opacity="0.88"/>
    <path d="M-17 -50 C-24 -75, -20 -108, -4 -125 C5 -108, 2 -75, -12 -50"
          fill="#fff" opacity="0.92"/>
  </g>
  <text x="256" y="430" text-anchor="middle" fill="#fff" font-family="sans-serif"
        font-size="46" font-weight="600" letter-spacing="7" opacity="0.95">こもれび</text>
</svg>'''

# Favicon: simpler, no text (too small)
LEAF_SVG_FAVICON = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5a9e7f"/>
      <stop offset="100%" stop-color="#3d7a5e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bg)"/>
  <g transform="translate(256, 256) scale(1.25)">
    <path d="M0 160 C0 160, -5 80, -12 30 C-18 -20, -22 -55, -15 -90"
          stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
    <path d="M-8 120 C-35 95, -85 87, -102 72 C-85 65, -42 72, -12 105"
          fill="#fff" opacity="0.82"/>
    <path d="M-5 78 C18 52, 68 40, 92 28 C76 42, 32 56, -2 78"
          fill="#fff" opacity="0.82"/>
    <path d="M-11 30 C-35 5, -78 -6, -98 -22 C-78 -26, -40 -14, -14 15"
          fill="#fff" opacity="0.88"/>
    <path d="M-14 -8 C8 -32, 48 -48, 72 -60 C55 -42, 16 -22, -11 -2"
          fill="#fff" opacity="0.88"/>
    <path d="M-17 -50 C-24 -75, -20 -108, -4 -125 C5 -108, 2 -75, -12 -50"
          fill="#fff" opacity="0.92"/>
  </g>
</svg>'''

SIZES = {
    "icon-192x192.png": (192, LEAF_SVG),
    "icon-512x512.png": (512, LEAF_SVG),
    "icon-maskable-192x192.png": (192, LEAF_SVG_MASKABLE),
    "icon-maskable-512x512.png": (512, LEAF_SVG_MASKABLE),
    "apple-touch-icon.png": (180, LEAF_SVG),
    "favicon.png": (32, LEAF_SVG_FAVICON),
}

PUBLIC_DIR = "C:/Users/mineo/ClaudeProjects/komorebi/public"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_content("<html><body></body></html>")

    for filename, (size, svg) in SIZES.items():
        data_url = page.evaluate("""([svg, size]) => {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                const img = new window.Image();
                const blob = new Blob([svg], {type: 'image/svg+xml'});
                const url = URL.createObjectURL(blob);
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, size, size);
                    URL.revokeObjectURL(url);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.src = url;
            });
        }""", [svg, size])

        png_data = base64.b64decode(data_url.split(",")[1])
        path = os.path.join(PUBLIC_DIR, filename)
        with open(path, "wb") as f:
            f.write(png_data)
        print(f"Generated {filename} ({size}x{size}, {len(png_data)} bytes)")

    browser.close()
    print("All icons generated!")
