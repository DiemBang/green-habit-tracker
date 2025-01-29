/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cloudWhite: "#FFFAF2", // Backgrounds
        calmBlue: "#BCCEDA", // Secondary Buttons
        mutedTeal: "#9FB8AD", // Highlights/Badges
        sandstone: "#E8D8C3", // Secondary Backgrounds
        charcoalGray: "#495057", // Text, Header, Footer
        fontPrimary: "#495057", // Charcoal Gray
        fontAccent: "#9FB8AD", // Muted Teal
        fontMuted: "#BCCEDA", // Calm Blue
        buttonGreen: "#acd980",
        customGreen: "#107f39",
        customBlue: "#4784aa",
        customRed: "#f1a0a0",
        cardWhite: "#fffdf9",
        headerAndFooterColor: "#fff0de",
      },
      fontFamily: {
        heading: ['"Quicksand"', "sans-serif"], // For headings
        body: ['"Roboto"', "sans-serif"], // For body text
        josefin: ['"Josefin Sans"', "sans-serif"], // For body text
        custom: ["CustomFont", "sans-serif"], // Add your custom font
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
