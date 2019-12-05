<template>
  <div class="search-wrapper u-px3">
    <el-autocomplete
      ref="searchInput"
      slot="reference"
      v-model="query"
      size="small"
      :fetch-suggestions="querySearchAsync"
      placeholder="Search"
      @select="handleSelect"
      popper-class="components-search"
      :trigger-on-focus="false"
      placement="bottom-end"
      :debounce="200"
    >
      <fa-icon
        :icon="['fal', 'search']"
        slot="suffix"
      > </fa-icon>
    </el-autocomplete>
  </div>
</template>

<script>
import Flexsearch from "flexsearch";

export default {
  data () {
    return {
      index: null,
      query: ""
    };
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

  },
  methods: {
    querySearchAsync (queryString, cb) {
      const { pages, themeConfig } = this.$site;
      const query = queryString.trim().toLowerCase();
      const usingGoogleSearch =
        themeConfig.googleCustomSearchEngineID && themeConfig.googleAPIKey;
      const max = themeConfig.searchMaxSuggestions || 10;

      if (this.index === null || query.length < 3) {
        return cb([]);
      }
      this.index.search(
        query,
        {
          limit: max,
          threshold: 2,
          encode: 'extra'
        },
        (result) => {
          console.log(result);

          if (result.length) {
            const resolvedResult = result.map(page => {
              return {
                link: page.path,
                value: this.getQuerySnippet(page)
              };
            });
            return cb(resolvedResult);
          } else {
            if (usingGoogleSearch) {
              return cb([
                {
                  value: `Search the entire site for "${query}"`,
                  link: `/search?q=${query}`
                }
              ]);
            } else {
              cb([{ value: `No results! Try something else.`, link: `#` }]);
            }
          }
        }
      );
    },

    getQuerySnippet (page) {
      const queryPosition = page.content.toLowerCase().indexOf(this.query)
      const startIndex = queryPosition - 30 < 0 ? 0 :queryPosition - 30
      const endIndex = queryPosition + 40
      const querySnippet = page.content.slice(startIndex, endIndex).split(' ').slice(1, -1).join(' ')
      
      if (querySnippet) {
        return `${page.title} > ..${querySnippet}..`.replace(/\|/g, ' ').replace(/:::/g, ' ')
      } else {
        return page.title
      }
    },

    handleSelect (item) {
      if (item.link) {
        this.$router.push(item.link);
        this.query = "";
      } else {
        this.query = "";
      }
    }
  }
};
</script>
<style>
.el-input__inner {
  height: 2rem !important;
}
.search-wrapper input {
  width: 160px;
  transition: all 0.5s ease;
}

.el-autocomplete-suggestion__wrap,
.el-autocomplete-suggestion {
  width: 100%;
}
.components-search {
  width: 600px !important;
}
.el-input__suffix {
  line-height: 2rem;
}
</style>
