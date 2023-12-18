/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primary: {
          100: "#E0E7FF",
          200: "#111827",
        },
        accent: {
          100: "#4F46E5",
          200: "#ddd",
          300: "#E0E7FF",
          400: "#2563eb",
          500: "#6b21a8",
          foreground: "#fff",
        },
        100: "#fff",
      },
      textColor: {
        primary: {
          100: "#4F46E5",
          200: "#6B21A8",
          300: "#9ca3af",
        },
        100: "#000",
        200: "#6b7280",
        300: "#fff",
      },
      borderColor: {
        100: "#4F46E5",
        200: "#6B21A8",
        300: "#2563eb",
      },
    },
  },
  plugins: [],
};
