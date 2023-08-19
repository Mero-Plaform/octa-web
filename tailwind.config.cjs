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
        "screen/2": "50vh"
      },
      maxWidth: {
        "90wv": "90vw"
      },
      fontSize: {
        "xss": "0.5rem"
      },
      screens: {
        'm-sm': { 'max': '500px' },
        'm-420': { 'max': '420px' },
      },
      spacing: {
        "90%": "90%",
        "1/2": "50%"
      }
    },
  },
  plugins: [
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
  safelist: [
    "bg-emerald-400",
    "hover:bg-emerald-500",
    "focus:bg-emerald-500",
    "bg-blue-200",
    "group-hover:bg-blue-500",
    "!bg-blue-200",
    "!bg-emerald-200",
    "bg-blue-400",
    "bg-fuchsia-200",
    "!bg-fuchsia-200",
    "bg-fuchsia-400",
    "bg-fuchsia-500",
    "bg-fuchsia-600",
    "text-fuchsia-500",
    "text-fuchsia-900",
    "text-blue-900",
    "border-fuchsia-400",
    "hover:bg-fuchsia-500",
    "focus:bg-fuchsia-500",
    "hover:bg-blue-500",
    "focus:bg-blue-500",
  ]
};

module.exports = config;
