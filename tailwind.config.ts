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
      fontFamily: {
        brush: ["'Caveat Brush'", 'sans-serif'],
        poppins: ["'Poppins'", 'sans-serif'],
      },
      backgroundImage: {
        screen:
          'radial-gradient(circle, rgba(21, 29, 35, 0) 0%, rgba(21, 29, 35, 1) 100%), url("https://mir-s3-cdn-cf.behance.net/project_modules/1400/099bd5199183793.66547d97cc73a.jpg")',
        logo: 'url("https://i.namu.wiki/i/9BdgTdnA7Ne7nuJguNc2lkxV-hA30LG0Do1Qmhffuo1KxkQpSbYfX-WBV80fbaC-NIIirgvCSpXefhocf1UYjg.svg")',
        card: 'linear-gradient(0deg, #e1e5e6, #ffffff)',
      },
      backgroundPosition: {
        center_top_30: 'center top 30%',
      },
      dropShadow: {
        neon: '0 0 2px #fff20082',
        dark: '0 0 2px #000000',
      },

      colors: {
        dark: 'var(--color-dark)',
        rose: 'var(--color-rose)',
        rose_hover: 'var(--color-rose-hover)',
      },

      width: {
        device: 'var(--device-width)',
      },
      height: {
        device: 'var(--device-height)',
        tab: 'var(--tab-height)',
        tweets_inner_height: 'var(--tweets-inner-height)',
      },
    },
  },
};
export default config;
