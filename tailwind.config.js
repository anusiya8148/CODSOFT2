export default {
  content: ['./index.html', './src/*/.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A66C2', // LinkedIn blue
        accent: '#7C3AED', // purple accent
        sunrise: {
          50: '#ECF4FF',
          100: '#D9E9FF',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A66C2 0%, #7C3AED 100%)',
      },
    },
  },
  plugins: [],
};
