module.exports = {
  mode: 'history',
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'top-nav': '72px',
        'top-category': '216px',
        'side-bar': '256px',
        "76": "19.5rem",
        '86': '23rem',
        "110": "28rem",
        '120': "30rem"
      },
      opacity: {
        '85': '.85'
      },
      colors: {
        'action-color': '#F6A433',
        'action-color-hover': '#E59A32',
        'gris-mais-beaucoup': '#1E1E1E'
      },
      boxShadow: {
        "post": "0px 0px 40px 0px rgba(224,224,224,1);",
        "add": "0px 0px 50px -17px rgba(0,0,0,1);",
        "inset": "inset 0px -10px 15px -15px rgba(0,0,0,1);"
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(180deg, rgba(221,0,185,0) 0%, rgba(0,0,0,0.4164040616246498) 100%);"
      }
    },
  },
  plugins: [],
}
