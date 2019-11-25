<template>
  <el-container align="center">
    <el-main
      class="home"
      aria-labelledby="main-title"
    >
      <header class="hero">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
        >
        <h1
          v-if="data.heroText !== null"
          class="c-heading__page"
          id="main-title"
        >{{ data.heroText || $title || 'Hello' }}</h1>

        <p class="c-heading__sub">
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>
        
        <p
          class="u-mb5"
          v-if="data.actionText && data.actionLink"
        >
          <NavLink
            class="el-button el-button--primary"
            :item="actionLink"
          />
        </p>
      </header>

      <el-row
        class="features"
        v-if="data.features && data.features.length"
        :gutter="10"
      >
        <el-col
          v-for="(feature, index) in data.features"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="6"
          :key="index"
        >
          <el-card shadow="never">
            <div
              slot="header"
              class="clearfix"
            >
              <span class=" c-heading--bold">{{feature.title}}</span>
              <router-link
                class="u-float-right el-button--text"
                :to="feature.link"
              >
                Read
              </router-link>
            </div>
            <p>{{ feature.details }}</p>
          </el-card>
        </el-col>
      </el-row>

      <Content class="theme-default-content custom" />

    </el-main>
    <el-footer
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </el-footer>
  </el-container>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>
