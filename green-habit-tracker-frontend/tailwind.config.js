/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cloudWhite: "#F8F9FA", // Backgrounds
        calmBlue: "#BCCEDA", // Secondary Buttons
        mutedTeal: "#9FB8AD", // Highlights/Badges
        sandstone: "#E8D8C3", // Secondary Backgrounds
        charcoalGray: "#495057", // Text, Header, Footer
        fontPrimary: "#495057", // Charcoal Gray
        fontAccent: "#9FB8AD", // Muted Teal
        fontMuted: "#BCCEDA", // Calm Blue
        customGreen: "#8ec140",
      },
      fontFamily: {
        heading: ['"Quicksand"', "sans-serif"], // For headings
        body: ['"Roboto"', "sans-serif"], // For body text
      },
    },
  },
  plugins: [],
};
