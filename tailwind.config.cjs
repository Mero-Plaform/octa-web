const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./index.html",
    require('path').join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        "screen/2": "50vh",
      },
      maxWidth: {
        "90%": "90%",
        "90wv": "90vw"
      },
      fontSize: {
        "xss": "0.5rem"
      },
      screens: {
        'm-sm': { 'max': '500px' },
      },
    },
  },
  plugins: [
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
};

module.exports = config;
