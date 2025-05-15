import { nextui } from "@nextui-org/theme";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: "true",
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        oswald: ["var(--font-oswald)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              foreground: "#000",
              DEFAULT: "#2abdfc",
            },
            primary: {
              foreground: "#000",
              DEFAULT: "#2abdfc",
            },
            secondary: {
              foreground: "#fff",
              DEFAULT: "#aa1e22",
            },
            success: {
              foreground: "#000",
              DEFAULT: "#85ea20",
            },
            warning: {
              foreground: "#000",
              DEFAULT: "#ffc32d",
            },
            danger: {
              foreground: "#000",
              DEFAULT: "#ff5728",
            },
            background: "#ffffff",
            foreground: "#000000", // Removed unnecessary object nesting here
            content1: {
              DEFAULT: "#ffffff",
              foreground: "#000",
            },
            content2: {
              DEFAULT: "#f4f4f5",
              foreground: "#000",
            },
            content3: {
              DEFAULT: "#e4e4e7",
              foreground: "#000",
            },
            content4: {
              DEFAULT: "#d4d4d8",
              foreground: "#000",
            },
            focus: "#006FEE",
            overlay: "#000000",
            divider: "#111111",
          },
        },
        dark: {
          colors: {
            default: {
              foreground: "#fff",
              DEFAULT: "#3f3f46",
            },
            primary: {
              foreground: "#000",
              DEFAULT: "#2abdfc",
            },
            secondary: {
              foreground: "#fff",
              DEFAULT: "#aa1e22",
            },
            success: {
              foreground: "#000",
              DEFAULT: "#85ea20",
            },
            warning: {
              foreground: "#000",
              DEFAULT: "#ffc32d",
            },
            danger: {
              foreground: "#000",
              DEFAULT: "#ff5728",
            },
            background: "#000000",
            foreground: "#ffffff", // Simplified
            content1: {
              DEFAULT: "#18181b",
              foreground: "#fff",
            },
            content2: {
              DEFAULT: "#27272a",
              foreground: "#fff",
            },
            content3: {
              DEFAULT: "#3f3f46",
              foreground: "#fff",
            },
            content4: {
              DEFAULT: "#52525b",
              foreground: "#fff",
            },
            focus: "#006FEE",
            overlay: "#ffffff",
            divider: "#ffffff",
          },
        },
      },
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "0.5rem",
          medium: "0.75rem",
          large: "0.875rem",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
        disabledOpacity: "0.5",
        dividerWeight: "1",
        hoverOpacity: "0.9",
      },
    }),
  ],
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
