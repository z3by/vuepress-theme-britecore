<template>
  <el-container class="page">
    <nav class="page-top-nav u-background--base u-p2 u-border-b">
      <breadcrumbs />
    </nav>

    <el-main class="u-pt5 u-mt5">
      <Content class="theme-default-content wrapper u-p4 page-fade-in" />
    </el-main>

    <el-footer>
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />
    </el-footer>
  </el-container>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import Breadcrumbs from '@theme/components/Breadcrumbs.vue'

export default {
  components: { PageEdit, PageNav, Breadcrumbs },

  props: ['sidebarItems'],
}
</script>

<style lang="scss">
@import "@britecore/bc-design-system/packages/theme-chalk/src/common/var.scss";

.page {
  $--header-height: 60px;

  padding-left: 25rem;
  top: $--header-height;

  .page-top-nav {
    margin-top: $--header-height;
    position: fixed;
    width: 100%;
    z-index: 100;
    background-color: $color-gray--000;
  }

  .theme-default-content:not(.custom) {
    a:hover {
      text-decoration: underline;
    }

    img {
      max-width: 100%;
    }
  }

  @media (max-width: $screen-lg) {
    padding-left: 0;
  }
}

.page-fade-in {
  animation: dialog-fade-in 0.2s ease-in;
}
</style>