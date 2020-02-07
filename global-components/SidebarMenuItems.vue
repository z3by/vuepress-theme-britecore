<template>
  <div>
    <template v-for="item of items">
      <sidebar-menu-item :item="item" />
    </template>
  </div>
</template>

<script>

export default {
  name: 'sidebar-menu-items',

  props: ['items']

}
</script>

<style>
</style>