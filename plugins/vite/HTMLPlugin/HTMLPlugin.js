export const transformHtmlPlugin = (variables) => ({
  name: 'transform-html',
  transformIndexHtml: {
    enforce: 'pre',
    transform(html) {
      return html.replace(
        /\$\s*(\w+)\s*\$/gi,
        (_, key) => variables[key] || ''
      );
    }
  }
});
