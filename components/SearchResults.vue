<template>
  <el-container>
    <el-header>
      <Navbar
        :isSidebarOpen="false"
        :showSidebarToggler="false"
      />
    </el-header>
    <el-main>
      <div class="search-results u-mx-auto">
        <div
          class="u-py2"
          v-if="searchResults.length"
        >
          <h1 class="c-heading__main">
            <fa-icon :icon="['fal', 'search']" class="u-text--light-gray"></fa-icon>
            <span>Search Results for</span>
            <span class=" u-text--primary">"{{ query }}"</span>
          </h1>
          <p class="u-text--light-gray">
             Found <span>{{searchResults.length}}</span> results
          </p>
          <el-card
            shadow="never"
            v-for="result in searchResults"
            :key="result.path"
            class="search-result-item"
          >
            <h3 class="c-heading__section">
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="result.path"
              >
                {{ result.title }}
              </a>
            </h3>
            <p v-html="getSearchText(result.content)"></p>
            <p>
              <span class="u-text--light-gray"> Last updated</span>
              <span class="u-text--light-gray">{{result.lastUpdated}}</span>
            </p>
          </el-card>
        </div>
        <div
          v-else
          class=" u-text--center u-py4"
        >
          <img
            src="../assets/img/no-data.svg"
            alt="not found"
            height="300px"
          />
          <h1 class="u-text--light-gray c-heading__main">No Results</h1>

          <div class="u-py4">
            <router-link
              to="/"
              class="el-button el-button--primary"
            >
              Back Home
            </router-link>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import Flexsearch from "flexsearch";
import VueMarkdown from "vue-markdown";
import Navbar from "./Navbar.vue";
import "../styles/index.scss";

export default {
  data () {
    return {
      searchResults: []
    };
  },
  components: {
    Navbar,
    'vue-markdown': VueMarkdown
  },
  computed: {
    query () {
      return this.$route.query.q;
    }
  },
  methods: {
    search (queryString) {
      if (!queryString) {
        return null
      }
      const { pages, themeConfig } = this.$site;
      const query = queryString.trim().toLowerCase();

      if (this.index === null || query.length < 3) {
        this.searchResults = [];
      }
      this.index.search(
        query,
        {
          suggest: true,
          encode: "extra",
          tokenize: "strict",
          threshold: 1,
          resolution: 9,
          depth: 4
        },
        result => {
          if (result.length) {
            this.searchResults = result;
          }
        }
      );
    },

    getSearchText (mdText) {
      const queryWords = this.query.split(' ')
      let queryIndex = mdText.toLowerCase().indexOf(queryWords[0])
      queryIndex = queryIndex - 50 < 0 ? 0 : queryIndex - 50
      let result = mdText
        .substr(queryIndex, 300)
        .replace(/[^a-z0-9]/gmi, " ")
        .replace(/\s+/g, " ")

      for (const word of queryWords) {
        result = result.replace(
          new RegExp(word, 'gi'),
          `<strong class="c-heading--bold u-text--primary u-background--info-light">${word}</strong>`
        )
      }

      return result.toLowerCase() + ' ...'
    }
  },

  watch: {
    query () {
      this.search(this.query);
    }
  },

  mounted () {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "key",
        field: ["title", "content"]
      }
    });
    const { pages } = this.$site;

    this.index.add(pages);

    this.search(this.query);
  }
};
</script>

<style lang="scss" scoped>
.search-results {
  max-width: 720px;
}

.search-result-item {
  margin: 0.5rem 0;
}
</style>
