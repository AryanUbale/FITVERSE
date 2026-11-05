/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PowerBlast Design System Tokens
        black: '#000000',
        surface: {
          0: '#000000',
          1: '#111111',
          2: '#161616',
          3: '#1A1A1A',
        },
        yellow: {
          DEFAULT: '#FFD21F',
          hover: '#FFE04D',
          glow: 'rgba(255, 210, 31, 0.4)',
        },
        accent: {
          yellow: '#FFD21F',
          'yellow-hover': '#FFE04D',
          red: '#E5484D', // Semantic muted danger/error only
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1A1',
          muted: '#6B6B6B',
        },
        // Backward-compatibility aliases for smooth transition across components
        app: {
          bg: '#000000',
          card: '#111111',
          elevated: '#161616',
          primary: '#FFD21F',
          hover: '#FFE04D',
          text: '#FFFFFF',
          muted: '#A1A1A1',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        public: {
          bg: '#000000',
          card: '#111111',
          surface: '#161616',
          yellow: '#FFD21F',
          muted: '#A1A1A1',
          text: '#FFFFFF',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        background: {
          DEFAULT: '#000000',
          secondary: '#111111',
          card: '#111111',
          hover: '#1A1A1A',
          surface: '#161616',
        },
        brand: {
          purple: '#FFD21F',
          'purple-light': '#FFE04D',
          'purple-dark': '#FFD21F',
          blue: '#FFD21F',
          'blue-light': '#FFE04D',
          'blue-dark': '#FFD21F',
          lavender: '#A1A1A1',
          cyan: '#FFD21F',
          coral: '#FFD21F',
          green: '#FFD21F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'card-sm': '16px',
        'card-lg': '24px',
        'pill': '9999px',
        'input': '12px',
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-indigo': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-purple': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-blue': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-cyan': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-coral': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'glow-green': '0 0 25px -4px rgba(255, 210, 31, 0.45)',
        'card-hover': '0 16px 36px -8px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.25s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
