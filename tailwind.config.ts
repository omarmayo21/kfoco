import type { Config } from 'tailwindcss';

/**
 * Design tokens — "Quiet authority" palette.
 * All colors meet WCAG AA when used per the guidelines in README.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F1B2D',
        navy: '#0B1F33',
        steel: {
          DEFAULT: '#7C9AA6',
          tint: '#DCE6EA',
          shade: '#4F6F7C'
        },
        gold: '#B08D57',
        offwhite: '#F7F8F9',
        warmgrey: '#E8EBED',
        textc: {
          DEFAULT: '#1C2430',
          muted: '#5B6673'
        }
      },
      fontFamily: {
        // CSS variables are remapped in globals.css for Arabic (html[lang="ar"])
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        label: '0.22em'
      },
      maxWidth: {
        container: '80rem'
      },
      boxShadow: {
        header: '0 1px 0 0 rgba(15, 27, 45, 0.08), 0 8px 24px -12px rgba(15, 27, 45, 0.12)',
        card: '0 1px 2px rgba(15, 27, 45, 0.05)',
        lift: '0 24px 48px -24px rgba(15, 27, 45, 0.25)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' }
        },
        scrollhint: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' }
        }
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-slow': 'marquee 90s linear infinite',
        kenburns: 'kenburns 12s ease-out forwards',
        scrollhint: 'scrollhint 2.2s ease-in-out infinite'
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};

export default config;
