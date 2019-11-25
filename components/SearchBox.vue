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
      >
      </fa-icon>
    </el-autocomplete>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  data () {
    return {
      query: "",
    };
  },
  methods: {
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
          return localePath;
        }
      }
      return "/";
    },

    isSearchable (page) {
      let searchPaths = SEARCH_PATHS;

      // all paths searchables
      if (searchPaths === null) {
        return true;
      }

      searchPaths = Array.isArray(searchPaths)
        ? searchPaths
        : new Array(searchPaths);

      return (
        searchPaths.filter(path => {
          return page.path.match(path);
        }).length > 0
      );
    },

    querySearchAsync (queryString, cb) {
      if (!queryString) {
        return cb([{ value: 'No Results', link: null }]);
      }
      const query = queryString.trim().toLowerCase();

      const { pages } = this.$site;
      const max =
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS;
      const localePath = this.$localePath;
      const matches = item =>
        item && item.title && item.title.toLowerCase().indexOf(query) > -1;

      const res = [];
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;
        const p = pages[i];
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue;
        }

        // filter out results that do not match searchable paths
        if (!this.isSearchable(p)) {
          continue;
        }

        if (matches(p)) {
          res.push(p);
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break;
            const h = p.headers[j];

            if (matches(h)) {
              res.push(
                Object.assign({}, p, {
                  path: p.path + "#" + h.slug,
                  header: h
                })
              );
            }
          }
        }
      }
      const cleanRes = res.map(resItem => {
        let section = resItem.path.slice(1, resItem.path.length).split('/')[0]
        let value = ''
        if (section) {
          value += section + ' > '
        }
        value += resItem.title
        if (resItem.header) {
          value += ' > ' + resItem.header.title
        }
        return { value: value, link: resItem.path };
      });
      cb(cleanRes);

    },
    createFilter (queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect (item) {
      if (item.link) {
        this.$router.push(item.link);
      } else {
        this.query = ''
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
  width: 450px !important;
}
.el-input__suffix {
  line-height: 2rem;
}
</style>