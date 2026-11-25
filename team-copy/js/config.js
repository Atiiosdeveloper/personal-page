/* MercyMed – clinic settings.
   This is the ONE file staff edit to keep the website up to date.
   Leave a value empty ("") while it is not confirmed: the website then shows
   a safe fallback instead of wrong information. */
window.MM_CONFIG = {
  // Clinic WhatsApp number, digits only with country code, e.g. "996555123456".
  // Empty: WhatsApp still opens with the message ready, and the visitor picks the chat.
  whatsappNumber: "",

  // Instagram account without "@", e.g. "mercymed.kg". Empty: shown as "TBC".
  instagramHandle: "",

  // Prices as they should appear, e.g. "1 500 KGS" or "from 800 KGS".
  // Empty: the card shows "Ask us on WhatsApp".
  prices: {
    consult: "",
    lab: "",
    ultrasound: "",
    corporate: "",
    students: "",
    travellers: ""
  },

  // Team profiles. Add one object per person, e.g.
  // { name: "Dr. ...", photo: "images/team/name.jpg",
  //   role: { en: "Family doctor", ru: "Семейный врач", ky: "Үй-бүлөлүк дарыгер" },
  //   bio:  { en: "Two sentences...", ru: "...", ky: "..." } }
  // Empty list: a "profiles coming soon" card is shown.
  team: []
};
