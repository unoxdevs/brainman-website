import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        darker: "#000000",
        lighter: "#1c1c1c",
        muted: "#2b2b2b",
        accent: "#3d3d3d",
      }
    }
  },

  plugins: []
} as Config;
