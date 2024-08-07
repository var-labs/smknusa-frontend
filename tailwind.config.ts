import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '425px',
        'md': '576px',
        'lg': '768px',
        'xl': '1024px',
        '1xl': '1279.98px',
        '2xl': '1440px',
       
      },
      backgroundColor: {
        'gray-base': '#F2F2F2',
        'gray-medium': '#E2E8F0',
        'yellow-light': '#FFD980',
        'yellow' : '#F5C451',
        'primary' : '#081B34'
      },
      textColor: {
        'blue-base' : '#081B34',
        'gray': '#696969',
        'gray-light': '#9DA5B1'
      },
      borderColor: {
        'blue-base' : '#081B34',
        'yellow' : '#F5C451',
      },
      ringColor: {
        'yellow' : '#F5C451',
      },
      cursor: {
        next: 'url(/assets/icon/round-arrow-right.svg), next',
      },
      maxWidth: {
        'xs-content': '280px',
        'sm-content': '80%',
        'md-content': '485px',
        'lg-content': '648px',
        'xl-content': '922px',
        'grid-content': '1279.98px',
        'max-content': '1448.8px',
      }
    },
  },
  plugins: [],
};
export default config;
