module.exports = {
    theme: {
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      },
      container: {
        center: true,
        padding: {
          default: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem'
        }
      },
      extend: {
        colors: {
          'primary': '#F7CB82',
          'secondary': '#575353',
          'accent': '#F3EAC6',
          'disabled': '#88a5e5'
        },
        height: {
          '72': '24rem',
          '80': '20rem',
          '100': '25rem',
          '120': '30rem'
        },
        padding: {
          '80': '20rem'
        },
        borderWidth: {
          '10': '10px'
        },
        zIndex: {
          '1': '1',
          '2': '2',
          '3': '3',
          '4': '4',
          '5': '5',
          '6': '6',
          '7': '7',
          '8': '8'
        },
        gridTemplateColumns: {
          'markets': 'repeat(auto-fill, min-content)',
          'event-price': 'repeat(auto-fill, minmax(1rem, 2rem))',
        }
      },
    },
    variants: {},
    plugins: [],
  }