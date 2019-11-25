const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Vuepress Docs Boilerplate",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: require.resolve("../../../"),
  themeConfig: {
    repo: "https://github.com/z3by/vuepress-theme-britecore",
    editLinks: true,
    logo: "/logo.png",
    docsDir: "example/docs",
    editLinkText: "Edit this page",
    lastUpdated: true,
    searchMaxSuggestions: 10,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
        icon: ['fal', 'directions']
      },
      {
        text: "Config",
        link: "/config/",
        icon: ['fal', 'cog']
      },
      {
        text: "VuePress",
        link: "https://v1.vuepress.vuejs.org"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: true,
          children: [
            "",
            "using-vue",
            {
              title: "Markdown Demos",
              collapsable: true,
              children: [
                "/guide/markdown-demo/demo1.md",
                "/guide/markdown-demo/demo2.md"
              ]
            }
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"]
};
