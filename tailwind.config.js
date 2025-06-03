/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "1.125rem",
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1400px",
        "max": "1400px",
      },
      max: "1400px",
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        'container': '1400px',
      },
      width: {
        'container': '1400px',
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'primary-shadow': '0 0 15px 0 rgb(var(--primary) / 0.5)',
      }
    },
  },
  safelist: [
    'max-w-container',
    'w-container',
    'font-roboto-light',
    'font-roboto-light-italic',
    'font-roboto-regular',
    'font-roboto-italic',
    'font-roboto-medium',
    'font-roboto-medium-italic',
    'font-roboto-bold',
    'font-roboto-bold-italic',
    'font-gugi'
  ],
  plugins: [],
} 