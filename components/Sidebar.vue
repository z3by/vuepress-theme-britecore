<template>
  <el-aside
    class="sidebar u-pl1 u-py3"
    width="22rem"
  >
    <NavLinks />
    <slot name="top" />
    <el-tree
      :data="items"
      default-expand-all
      :props="defaultProps"
      node-key="title"
      highlight-current
      @node-click="handleNodeClick"
    >
    </el-tree>
    <slot name="bottom" />
  </el-aside>
</template>

<script>
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Sidebar',

  components: { NavLinks },

  props: ['items'],

  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'title',
        isLeaf: 'collapsable'
      }
    }
  },
  methods: {
    handleNodeClick (node) {
      if (node.path && this.$route.path != node.path) {
        this.$router.push(node.path)
      }
    }
  }
}
</script>

<style lang="stylus">
.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem;
    }
  }

  & > .sidebar-links {
    padding: 1.5rem 0;

    & > li > a.sidebar-link {
      font-size: 1.1em;
      line-height: 1.7;
      font-weight: bold;
    }

    & > li:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    & > .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
