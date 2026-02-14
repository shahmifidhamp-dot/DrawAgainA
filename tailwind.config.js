/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
        },
        lavender: {
          50: '#F8F7FF',
          100: '#E6E6FA',
          200: '#DCD0FF',
          300: '#C3B1E1',
          400: '#A994D8',
        },
        peach: {
          50: '#FFF5EE',
          100: '#FFDAB9',
          200: '#FFCCB3',
          300: '#FFBFA0',
          400: '#FFA07A',
        },
        pink: {
          200: '#FADADD'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
