<template>
  <el-container
    align="center"
    class="u-mt5"
  >
    <div class="hero u-p3">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
        class="u-p5 u-width100"
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
        class="u-mb3"
        v-if="data.actionText && data.actionLink"
      >
        <bc-button-link
          :to="data.actionLink"
          type="primary"
          size="medium"
        >
          {{data.actionText}}
        </bc-button-link>
      </p>
    </div>
    <el-main
      class="home"
      aria-labelledby="main-title"
    >
      <el-row
        class="features l-flex-grid l-flex-grid--h-center"
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
          <el-card
            shadow="never"
            class="u-m2"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <span class="c-heading--bold">{{feature.title}}</span>
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

<style lang="scss">
.hero img {
  max-width: 25rem;
}
</style>