import BcDesignSystem from "@britecore/bc-design-system";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchResults from './components/SearchResults.vue'
import '@fortawesome/fontawesome-svg-core/styles.css'

library.add(fal)
library.add(fas)
library.add(far)

const extraRoutes = [
  {
    path: '/search',
    component: SearchResults
  }
]
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(BcDesignSystem);
  Vue.component('fa-icon', FontAwesomeIcon)

  router.addRoutes(extraRoutes)
};
