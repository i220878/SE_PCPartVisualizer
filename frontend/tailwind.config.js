/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          border:    "hsl(var(--border))",
          input:     "hsl(var(--input))",
          ring:      "hsl(var(--ring))",
          background:"hsl(var(--background))",
          foreground:"hsl(var(--foreground))",
          primary: {
            DEFAULT:    "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          // add any other CSS‑variable‑backed tokens here
        },
      },
    },
    plugins: [],
  };
  