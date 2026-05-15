/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        sidebar: 'var(--color-sidebar)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        'status-red': 'var(--status-red)',
        'status-red-bg': 'var(--status-red-bg)',
        'status-blue': 'var(--status-blue)',
        'status-blue-bg': 'var(--status-blue-bg)',
        'status-emerald': 'var(--status-emerald)',
        'status-emerald-bg': 'var(--status-emerald-bg)',
        'status-purple': 'var(--status-purple)',
        'status-purple-bg': 'var(--status-purple-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
