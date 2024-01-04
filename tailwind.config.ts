import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      register: '890px',
    },
    extend: {
      colors: {
        primary: {
          900: '#453D31',
          800: '#594D3D',
          700: '#7E6F5D',
          600: '#A59073',
          500: '#CEBEA7',
          400: '#F5E6D0',
          300: '#F7EBDA',
        },
        secondary: {
          900: '#101118',
          800: '#1A1C29',
          700: '#3D3F4F',
          600: '#505473',
          500: '#B4B4B4',
          400: '#D9D9D9',
          300: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
export default config;
