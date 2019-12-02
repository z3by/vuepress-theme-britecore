<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>
    <el-main>
      <div class="search-results u-mx-auto">
        <h1 class="c-heading__page">Search Results for <span class=" u-text--info">"{{query}}"</span></h1>
        <div class="u-py2">
          <el-card
            shadow="hover"
            v-for="result in searchResults"
            :key="result.cacheId"
            class="search-result-item"
          >
            <h4 class="c-heading__title">{{result.title}}</h4>
            <h4 class="c-heading__title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="result.link"
              >
                {{result.link}}
              </a>
            </h4>
            <p
              v-html="result.htmlSnippet"
              class="c-heading__text u-text--light"
            ></p>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Navbar from './Navbar.vue'
import axios from 'axios'

export default {
  data () {
    return {
      searchResults: []
    }
  },
  components: {
    Navbar
  },
  computed: {
    query () {
      return this.$route.query.q
    }
  },
  methods: {
    searchUsingGoogle (query) {
      axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: query,
          cx: this.$site.themeConfig.googleCustomSearchEngineID,
          key: this.$site.themeConfig.googleAPIKey
        }
      }).then(res => {

        if (res.data.items) {
          this.searchResults = res.data.items
        } else {
          this.searchResults = []
        }
      })
    }
  },
  watch: {
    query () {
      this.searchUsingGoogle(this.query)
    }
  },
  mounted () {
    this.searchUsingGoogle(this.query)
  }
}
</script>

<style lang="stylus">
.search-results {
  max-width: 720px;
}

.search-result-item {
  margin: 0.5rem 0;
}
</style>