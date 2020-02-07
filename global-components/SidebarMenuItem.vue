<template>
  <el-submenu
    v-if="item.children && item.type === 'group'"
    :index="item.title"
  >
    <template slot="title">
      <fa-icon :icon="['fas', 'folder']"></fa-icon>
      <span class="u-text--bold">{{item.title}}</span>
    </template>

    <sidebar-menu-items :items="item.children" />

  </el-submenu>

  <el-menu-item
    :index="item.path"
    v-else
  >
    <fa-icon :icon="['fas', 'file-alt']"></fa-icon>
    <span>{{item.title}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'sidebar-menu-item',

  props: ['item']
}
</script>
