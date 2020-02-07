const path = require("path");

module.exports = (options) => ({

  plugins: [
    [require.resolve('./clipboard-copy/clipboard-copy')],
    ["@vuepress/active-header-links", options.activeHeaderLinks],
    ["@vuepress/plugin-nprogress"],
    [path.resolve(__dirname, 'search.js')],
    [
      "container",
      {
        type: "tip",
        defaultTitle: {
          "/en/": "tip"
        }
      }
    ],
    [
      "container",
      {
        type: "warning",
        defaultTitle: {
          "/en/": "warning"
        }
      }
    ],
    [
      "container",
      {
        type: "danger",
        defaultTitle: {
          "/en/": "danger"
        }
      }
    ]
  ],

  enhanceAppFiles: path.resolve(__dirname, "enhanceAppFile.js")
});
