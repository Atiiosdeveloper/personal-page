# MercyMed website – v2 (Assignment 7)

First draft of the MercyMed Medical Center website, built with AI assistance (Claude) from:
- the Team 1 PRD (v1.0, 30.10.2026),
- the MercyMed Logo Guidelines (colours, logo, mission/vision/values),
- the Website Client Questionnaire (Oct 2026).

## Changes in v2 (from teammate feedback)
- **Services (Improve):** 6 services instead of 3, each with "Good for", a price line and an
  "Ask about price" button that opens WhatsApp with the question ready; plus 3 "how it works" steps.
  Prices are not invented: they show "ask us on WhatsApp" until added in `js/config.js`.
- **Booking (Fix):** the WhatsApp button now works. "Send via WhatsApp" opens WhatsApp with the
  booking message filled in (name, date of birth, phone, optional service). Added "Copy message",
  a floating WhatsApp button and a "Message us on WhatsApp" button in Contact.
  Once the clinic number is set in `js/config.js`, messages go straight to the receptionist.
- **Contact (AI-assisted Improve):** Google Map of the Ayu Grand landmark with Google Maps and 2GIS links,
  and an opening-hours table ready to fill in. Hours stay "TBC" until MercyMed confirms them.
- **Team (AI-assisted Fix):** replaced the "[Name TBC]" cards with a "profiles coming soon" card.
  Real profiles are added in `js/config.js` and appear automatically in all 3 languages.
- **Easy updates:** WhatsApp number, Instagram handle, prices and team all live in `js/config.js`.

## Files
- `index.html` – the page (English text lives here)
- `css/style.css` – styles; brand colours are defined once at the top
- `js/i18n.js` – Russian and Kyrgyz text (AI drafts, marked "Translation pending review")
- `js/config.js` – clinic settings to update: WhatsApp number, Instagram, prices, team
- `js/main.js` – mobile menu, language switch, services, team, WhatsApp booking
- `images/mercymed-emblem.png` – logo emblem taken from the brand guide

## Brand colours used (Logo Guidelines p.05)
| Name | CMYK | Hex |
|---|---|---|
| Grey (text) | 0/0/0/75 | #58595B |
| Red | 0/100/100/0 | #EC1C24 |
| Yellow | 0/0/100/0 | #FFF100 |
| Orange 1 | 0/30/100/0 | #FCB813 |
| Orange 2 | 0/50/100/0 | #F6921E |
| Orange 3 | 0/65/100/0 | #F37920 |
| Orange 4 | 0/80/100/0 | #F05A22 |

Plus white for the light background (client request) and transparent tints of the colours above.

## Waiting on the client (shown as "TBC" on the site)
Exact address and map, phone, email, WhatsApp number, opening hours, Instagram handle,
team names/bios/photos, clinic history, full service list and prices, approved photos,
and review of the Russian and Kyrgyz translations.

To send bookings straight to the clinic, put its number in `whatsappNumber` in `js/config.js`.
