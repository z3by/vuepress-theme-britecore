<template>
  <el-card class="vid-card u-mt5">
    <template slot="header">
      <h4 class=" c-heading__title">
        <fa-icon :icon="['fal', 'video']" class="u-mr2"></fa-icon>
        <span>
          {{title}}
        </span>
      </h4>
    </template>
    <div style="padding:56.25% 0 0 0;position:relative;">
      <iframe
        :src="link"
        allowfullscreen
        frameborder='0'
        style='position:absolute;top:0;left:0;width:100%;height:100%;'
      ></iframe>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'vimeo-video',
  props: ['link', 'title']
}
</script>
