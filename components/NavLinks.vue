<template>
  <el-menu
    :mode="mode || 'horizontal'"
    v-if="userLinks.length || repoLink"
    :default-active="activeIndex"
    router
    active-text-color="#08859b"
  >
    <!-- user links -->
    <el-menu-item
      class="u-px2"
      v-for="(item) in userLinks"
      :key="item.link"
      :index="item.link"
    >
      <NavLink
        :item="item"
        :repoLink="repoLink"
      />
    </el-menu-item>
  </el-menu>
</template>

<script>
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  props: ['mode'],

  components: { NavLink },

  data () {
    return {
      activeIndex: ''
    }
  },

  computed: {
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav () {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },

    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }
      return 'Source'
    }
  },

  mounted () {
    let pathItems = this.$route.path.split('/').filter(item => !!item)
    if (!pathItems.length) {
      this.activeIndex = '/'
    } else {
      this.activeIndex = `/${pathItems[0]}/`
    }
  }
}
</script>
