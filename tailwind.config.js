/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightestGrey: '#E2F2F2',
        lightCyan: '#9AD3D4',
        veryLightCyan: '#C8E6E6',
        teal: '#00A5A5',
        darkTeal: '#007582',
        lightBlueGreen: '#5DBFC0',
        // Additional semantic color variants
        primary: {
          50: '#E2F2F2',
          100: '#C8E6E6',
          200: '#9AD3D4',
          300: '#5DBFC0',
          400: '#00A5A5',
          500: '#007582',
          600: '#005F6B',
          700: '#004851',
          800: '#003137',
          900: '#001A1E',
        },
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
        'sans': ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(93, 191, 192, 0.3)',
        'glow-lg': '0 0 30px rgba(93, 191, 192, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      gradients: {
        'primary': 'linear-gradient(135deg, var(--color-light-blue-green), var(--color-teal))',
        'secondary': 'linear-gradient(135deg, var(--color-light-cyan), var(--color-very-light-cyan))',
        'accent': 'linear-gradient(135deg, var(--color-dark-teal), var(--color-teal))',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            color: '#007582',
            h1: {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: '600',
              letterSpacing: '-0.015em',
            },
            h3: {
              fontWeight: '600',
            },
            h4: {
              fontWeight: '600',
            },
            strong: {
              fontWeight: '600',
            },
            a: {
              color: '#5DBFC0',
              textDecoration: 'none',
              '&:hover': {
                color: '#00A5A5',
                textDecoration: 'underline',
              },
            },
          },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.transition-default': {
          'transition': 'all 0.2s ease-in-out',
        },
        '.focus-ring': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 3px rgba(93, 191, 192, 0.3)',
          },
        },
        '.gradient-primary': {
          'background': 'linear-gradient(135deg, #5DBFC0, #00A5A5)',
        },
        '.gradient-secondary': {
          'background': 'linear-gradient(135deg, #9AD3D4, #C8E6E6)',
        },
        '.gradient-accent': {
          'background': 'linear-gradient(135deg, #007582, #00A5A5)',
        },
        '.border-gradient': {
          'border': '2px solid transparent',
          'background': 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #9AD3D4, #5DBFC0) border-box',
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
} 