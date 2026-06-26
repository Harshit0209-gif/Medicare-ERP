/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', hover: '#1D4ED8', light: '#EFF6FF' },
        green: { DEFAULT: '#10B981', hover: '#059669', light: '#ECFDF5' },
        teal: { DEFAULT: '#0F766E', light: '#F0FDFA' },
        purple: { DEFAULT: '#8B5CF6', light: '#F5F3FF' },
        orange: { DEFAULT: '#F97316', light: '#FFF7ED' },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: { DEFAULT: '#EF4444', hover: '#DC2626', light: '#FEF2F2' },
        info: '#3B82F6',
        sidebar: '#0F172A',
        app: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        divider: '#CBD5E1',
        txt: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        inp: '10px',
        tbl: '12px',
        modal: '20px',
        drop: '10px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.06)',
        'card-hover': '0 8px 24px -4px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.08)',
        modal: '0 24px 64px -12px rgba(15,23,42,0.28)',
        dropdown: '0 4px 12px -2px rgba(15,23,42,0.12)',
      },
      transitionDuration: { DEFAULT: '300ms' },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        countUp: { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        slideIn: 'slideIn 250ms ease-out',
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
}
