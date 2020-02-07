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
      />

      <template slot-scope="props">
        <li
          role="option"
          v-html="props.item.value"
        ></li>
      </template>

    </el-autocomplete>
  </div>
</template>

<script>
import Flexsearch from "flexsearch";
import { getQuerySnippet } from '../util'

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
      const max = themeConfig.searchMaxSuggestions || 5;

      if (this.index === null || query.length < 3) {
        return cb([]);
      }
      this.index.search(
        query,
        {
          limit: max,
          encode: "extra",
          tokenize: "strict",
          threshold: 1,
          resolution: 9,
          depth: 4
        },
        (result) => {
          if (result.length) {
            const resolvedResult = result.map(page => {
              return {
                link: page.path,
                value: getQuerySnippet(page, this.query)
              };
            });
            resolvedResult.unshift({
              link: `/search?q=${query}`,
              value: `<strong class="u-text--primary"><i class="fal fa-search u-mr2"></i> Show all results for "${query}"<strong>`
            })
            return cb(resolvedResult);
          } else {
            cb([{ value: `No results! Try something else.`, link: '' }]);
          }
        }
      );
    },

    handleSelect (item) {
      if (item.link) {
        this.$router.push(item.link);
      }
      this.query = "";
    }
  }
};
</script>

<style lang="scss">
.search-wrapper {
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

  .el-input__suffix {
    line-height: 2rem;
  }
}
.components-search {
  width: 600px !important;
}
</style>