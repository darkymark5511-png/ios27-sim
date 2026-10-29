/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        squircle: '22.5%',
        'ios': '38px',
        'ios-sm': '22px',
        'ios-md': '28px',
        'ios-lg': '36px',
      },
      backdropBlur: {
        glass: '40px',
        'glass-sm': '20px',
        'glass-lg': '60px',
      },
      fontFamily: {
        system: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        phone: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.25)',
      },
      colors: {
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [],
}
