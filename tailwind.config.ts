import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0067ff",

          secondary: "#00a3ff",

          accent: "#009b00",

          neutral: "#120000",

          "base-100": "#292929",

          info: "#00c7dd",

          success: "#2ff252",

          warning: "#ffb100",

          error: "#ff396c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
