<template>
  <el-aside
    class="sidebar u-pl1 u-border-r u-overflow--scroll"
    :class="{'sidebar-open': isSidebarOpen}"
    width="25rem"
  >
    <h2 class=" u-ml2 u-p3 c-heading__title">
      {{$page.title}}
    </h2>
    <NavLinks
      mode="vertical"
      class="u-hidden-lg sidebar-navlinks u-border-b"
    />
    <el-menu
      :default-active="activeKey"
      :default-openeds="activeSubmenus"
      background-color="transparent"
      ref="sidebar-menu"
      router
      class="u-border-0"
    >
      <sidebar-menu-items :items="items" />
    </el-menu>
  </el-aside>
</template>

<script>
import NavLinks from './NavLinks.vue'

export default {
  name: 'sidebar',

  components: {
    NavLinks
  },

  props: [
    'isSidebarOpen',
    'items'
  ],

  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'title',
        isLeaf: 'collapsable'
      },
      activeKey: '',
      activeSubmenus: []
    }
  },

  mounted () {
    this.activeKey = this.$page.path
  }

}
</script>

<style lang="scss">
@import "@britecore/bc-design-system/packages/theme-chalk/src/common/var.scss";

.sidebar {
  background-color: $color-gray--000;
  position: fixed;
  z-index: 10;
  top: 60px;
  left: 0;
  bottom: 0;
  box-sizing: border-box;


  &.sidebar-open {
    transform: translateX(0);
  }

  @media (max-width: $screen-lg) {
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
}
</style>