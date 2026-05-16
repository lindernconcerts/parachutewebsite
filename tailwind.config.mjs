/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        dark:      'var(--color-dark)',
        'brand-black': 'var(--color-black)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
      },
    },
  },
  plugins: [],
};
