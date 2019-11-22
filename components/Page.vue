<template>
  <el-container class="page">
    <el-main>
      <slot name="top" />
      <Content class="theme-default-content" />
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
