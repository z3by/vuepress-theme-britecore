<template>
  <el-button
    type="text"
    @click="$emit('toggle-sidebar')"
    class="u-mr2 u-hidden-lg u-p0"
  >
    <div
      class="side-nav-toggler"
      :class="{ 'side-nav-toggler--opened': isSidebarOpen }"
    >
      <div class="side-nav-toggler__bar"></div>
      <div class="side-nav-toggler__bar"></div>
      <div class="side-nav-toggler__bar"></div>
    </div>
  </el-button>
</template>

<script>
export default {
  name: 'sidebar-toggler',

  props: ['isSidebarOpen']
}
</script>

<style lang="scss" scoped>
@import "@britecore/bc-design-system/packages/theme-chalk/src/common/var.scss";

.side-nav-toggler {
  display: inline-block;
  width: 1.34em;
  height: 1em;
  position: relative;
  cursor: pointer;
}

.side-nav-toggler__bar {
  position: absolute;
  background-color: $color-gray--030;
  height: 3px;
  width: 100%;
  border-radius: 10px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
  transform-origin: left center;

  &:first-child {
    top: 0;
  }

  &:nth-child(2) {
    top: 40%;
  }

  &:nth-child(3) {
    top: 80%;
    width: 75%;
  }
}

.side-nav-toggler--opened > .side-nav-toggler__bar {
  &:first-child {
    transform: rotate(45deg);
    top: -8%;
    left: 17.78%;
  }
  &:nth-child(2) {
    width: 0;
    opacity: 0;
  }
  &:nth-child(3) {
    transform: rotate(-45deg);
    top: 87%;
    left: 17.78%;
    width: 100%;
  }
}
</style>