# MercyMed website – v1 (Assignment 6)

First draft of the MercyMed Medical Center website, built with AI assistance (Claude) from:
- the Team 1 PRD (v1.0, 30.10.2026),
- the MercyMed Logo Guidelines (colours, logo, mission/vision/values),
- the Website Client Questionnaire (Oct 2026).

## Files
- `index.html` – the page (English text lives here)
- `css/style.css` – styles; brand colours are defined once at the top
- `js/i18n.js` – Russian and Kyrgyz text (AI drafts, marked "Translation pending review")
- `js/main.js` – mobile menu, language switch, WhatsApp booking prototype
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

To switch on WhatsApp booking, put the clinic number in `WHATSAPP_NUMBER` at the top of `js/main.js`.
