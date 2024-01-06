export const removeUnusedCSS = () => {
  return {
    name: 'transform-file-test',

    transform(src, id) {
      if (/.css$/.test(id)) {
        return {
          // removing ".dark" styles
          code: src.replace(/}(:is)?.dark.*?}/gs, "}"),
          map: null,
        };
      }
    },
  };
};
