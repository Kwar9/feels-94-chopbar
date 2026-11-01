# Feels 94 Chopbar website

A mobile-first restaurant website built with the Next.js App Router, React, TypeScript, Tailwind CSS 4, and lucide-react.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

## Features

- Responsive sticky navigation with a mobile menu.
- Cloudinary-hosted logo and hero photography.
- Restaurant story section.
- Interactive category tabs for carbohydrates, proteins, and soups.
- Fufu, Banku, Oiless Okro Soup and Rice Balls menu highlights.
- Add/remove quantities and a live cart subtotal.
- WhatsApp checkout addressed to **+233 50 337 1871**.
- Checkout message includes selected items, quantities, estimated subtotal, price-confirmation notes, and a prompt to enter a delivery address.
- Branch cards with storefront photos and supplied opening hours.
- A responsive **The Vibe** gallery featuring all four supplied storefront photographs and all eight supplied interior photographs.
- Floating WhatsApp contact button.

## Cloudinary images

The component uses the exact Cloudinary URLs supplied for the restaurant logo, hero, four menu highlights, two branch cards, story image, and gallery. The Cloudinary host is allowed in `next.config.ts` under `images.remotePatterns`.

All image URLs are centralised near the top of `components/site-client.tsx` in `IMAGE_PATHS` and `galleryImages`.

## Important menu-price behaviour

The supplied brief did not include prices for Goat Light Soup, Chicken Light Soup, Groundnut Soup, Palmnut Soup, or Green Soup. These display as **Price on confirmation** and are excluded from the estimated subtotal. Fufu is calculated from its stated starting price of GHS 15, and Tilapia from the low end of its GHS 40–80 range. The WhatsApp order message explains these estimates so the restaurant can confirm the final price.

## Business details to confirm before publishing

- The branch cards currently show neighbourhood-level locations only. Add verified street addresses, directions, and map links for each branch.
- The supplied weekly opening hours are used as provided. Please reconfirm them with the restaurant before publishing.
- WhatsApp checkout uses the number supplied in the brief: **+233 50 337 1871**.
- A public listing surfaced a different Mallam contact number and only independently confirmed a Mallam listing. Confirm the preferred public contact number and East Legon branch details with the business owner.

## Notes

This is a front-end WhatsApp ordering MVP. It does not process online payments, calculate delivery fees, reserve stock, or send orders to a restaurant backend. The customer reviews and sends the pre-filled WhatsApp message to complete the order.

The `typescript.ignoreBuildErrors` setting in `next.config.ts` was included at the user's request. It skips TypeScript build errors; it does not correct underlying type problems. Remove or set it to `false` before production once the project type-checks cleanly.
