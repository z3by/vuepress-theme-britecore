<template>
  <div class="search-wrapper u-px3">
    <el-autocomplete
      v-model="query"
      :fetch-suggestions="querySearchAsync"
      placeholder="Search"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [],
      query: "",
      timeout: null
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
        cb([]);
        return;
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
        let file = resItem.path.slice(1, resItem.path.length - 1)
          .replace(new RegExp('/', 'g'), ' > ')
          .replace(new RegExp('#', 'g'), ' > ')
          .replace(new RegExp('.html', 'g'), '')
        if (!!file) {
          file += ' > '
        }
        return { value: file + resItem.title, link: resItem.path };
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
      this.$router.push(item.link);
    }
  }
};
</script>
<style>
.el-input__inner {
  height: 2rem !important;
}
.search-wrapper input {
  width: 200px;
  transition: all 0.5s ease;
}

.search-wrapper input:focus {
  width: 600px;
}

.el-autocomplete-suggestion__wrap,
.el-autocomplete-suggestion {
  width: 100%;
}
</style>