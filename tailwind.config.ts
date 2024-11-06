import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/components/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#FF7800',
        'primary-light': '#FEE9DE',
      },
      height: {
        screen: '100vh',
        dscreen: '100dvh',
      },
      minHeight: {
        screen: '100vh',
        dscreen: '100dvh',
      },
      width: {
        screen: '100vw',
        dscreen: '100dvw',
      },
    },
  },
  plugins: [],
}
export default config
