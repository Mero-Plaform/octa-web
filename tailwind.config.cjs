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
        "90%": "90%"
      },
      fontSize: {
        "xss": "0.5rem"
      }
    },
  },

  plugins: [
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
};

module.exports = config;
