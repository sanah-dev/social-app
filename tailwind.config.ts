import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        screen:
          'radial-gradient(circle, rgba(21, 29, 35, 0) 0%, rgba(21, 29, 35, 1) 100%), url("https://mir-s3-cdn-cf.behance.net/project_modules/1400/099bd5199183793.66547d97cc73a.jpg")',
        logo: 'url("https://i.namu.wiki/i/9BdgTdnA7Ne7nuJguNc2lkxV-hA30LG0Do1Qmhffuo1KxkQpSbYfX-WBV80fbaC-NIIirgvCSpXefhocf1UYjg.svg")',
      },
      backgroundPosition: {
        center_top_30: 'center top 30%',
      },
      dropShadow: {
        neon: '0 0 2px #fff20082',
      },
      colors: {
        light: 'var(--color-white)',
        gray: 'var(--color-gray)',
        dark: 'var(--color-black)',
        yellow: 'var(--color-yellow)',
        purple: 'var(--color-purple)',
        sky: 'var(--color-sky)',
        rose: 'var(--color-rose)',
      },
    },
  },
};
export default config;
