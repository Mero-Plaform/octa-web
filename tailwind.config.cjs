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
      },
      keyframes: {
        lift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-100px)' },
        }
      },
      animation: {
        lift: 'lift 10s linear infinite',
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
    "bg-violet-200",
    "!bg-violet-200",
    "bg-violet-400",
    "bg-violet-500",
    "bg-violet-600",
    "text-violet-500",
    "text-violet-900",
    "border-violet-400",
    "hover:bg-violet-500",
    "focus:bg-violet-500",
    "text-blue-900",
    "hover:bg-blue-500",
    "focus:bg-blue-500",
  ]
};

module.exports = config;
