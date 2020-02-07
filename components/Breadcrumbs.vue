<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <fa-icon :icon="['fal', 'home']"></fa-icon>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="link in allLinks"
      :key="link.path"
      :to="link"
    >
      <span class="u-text--capitalize">
        {{link.text | formatBreadCrumb }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumbs',

  props: ['links'],

  computed: {
    allLinks () {
      const allLinks = this.$page.path.replace('.html', '').split('/').filter(link => !!link)

      return allLinks.map((text, i) => {
        const link = {
          text,
          path: '/' + allLinks.slice(0, i + 1).join('/') + '/'
        }
        return link
      })
    }
  },

  filters: {
    formatBreadCrumb (text) {
      return text.replace(/\-/g, ' ').replace('_', ' ')
    }
  }
}
</script>
