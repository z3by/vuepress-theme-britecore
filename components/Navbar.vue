<template>
  <el-header
    ref="header"
    class="l-flex-grid l-flex-grid--v-center u-border-b"
  >
    <div class="u-mr-auto l-flex-grid">
      <SidebarToggler
        :isSidebarOpen="isSidebarOpen"
        @toggle-sidebar="$emit('toggle-sidebar')"
        v-if="!!showSidebarToggler"
      />
      <router-link
        :to="$localePath"
        class="l-flex-grid u-shrink"
      >
        <img
          class="nav-logo"
          :src="$site.themeConfig.logo"
          alt="BriteCore"
        >
      </router-link>
    </div>

    <div class="l-flex-grid l-flex-grid--v-center u-ml-auto">
      <NavLinks class="u-hidden-md u-hidden-sm u-hidden-xs u-border-0" />
      <SearchBox />
    </div>
  </el-header>
</template>

<script>
import SearchBox from './SearchBox'
import NavLinks from './NavLinks'
import SidebarToggler from './SidebarToggler'

export default {
  props: {
    isSidebarOpen: {
      required: true,
      type: Boolean
    },
    showSidebarToggler: {
      required: true,
      type: Boolean
    }
  },

  components: {
    SearchBox,
    NavLinks,
    SidebarToggler
  },
};
</script>

<style lang="scss" scoped>
@import "@britecore/bc-design-system/packages/theme-chalk/src/common/var.scss";

header {
  background: $color-white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: $z-index-doc-nav;
}

.nav-logo {
  width: 3em;
  top: 0;
}

@media (max-width: $screen-md-max) {
  header {
    justify-content: space-between;
    padding: $space3;
  }

  .nav-logo {
    width: 7em;
  }
}

@media (max-width: $screen-xs-min) {
  .nav-logo {
    width: 5.5em;
  }
  .search-wrapper {
    width: 55%;
    display: flex;
  }
}
</style>
