export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        gray: {
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        yellow: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706'
        },
        green: {
          300: '#86EFAC',
          900: '#064E3B'
        },
        red: {
          200: '#FECACA',
          800: '#7F1D1D',
          900: '#7F1D1D'
        }
      }
    }
  },
  plugins: []
}
