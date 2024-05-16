/** @type {import('tailwindcss').Config} */


export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
      'fs':{'max': '668px'},
      'fxs':{'max': '530px'}
      },
      colors: {
          primaryLight: '#ff80b5',
      },
    },
    
    
  },
  plugins: [
    
  ],

}
