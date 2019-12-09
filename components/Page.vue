<template>
  <el-container class="page">
    <el-main>
      <slot name="top" />
      <Content class="theme-default-content dialog-fade-in" />
    </el-main>
    
    <el-footer>
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />
      <slot name="bottom" />
    </el-footer>
  </el-container>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
.dialog-fade-in {
  animation: dialog-fade-in 0.3s ease;
}
</style>