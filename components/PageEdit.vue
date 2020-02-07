<template>
  <div class="page-edit u-px0 u-mb5 u-mt3 wrapper">
    <el-card
      shadow="never"
      class="u-text--center"
    >
      <h3>
        Was this page helpful?
      </h3>

      <div class="u-py3">
        <a
          class="u-link"
          @click="feedbackDialogVisible = true"
        >
          Submit a feedback
        </a>
        <span class="u-px3"> or </span>
        <a
          v-if="editLink"
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
          class="u-link u-pr3"
        >
          {{ editLinkText }}
          <OutboundLink />
        </a>
      </div>
    </el-card>
    <el-dialog
      title="How was this page?"
      :visible.sync="feedbackDialogVisible"
      height="400"
      width="70%"
      show-close
      class="feedback-dialog"
    >

      <el-loading-wrapper
        tag="div"
        class="loading-wrapper"
        :loading="feedbackFormIsLoading"
        loading-text="Loading..."
      >
        <iframe
          src="https://forms.monday.com/forms/embed/396d479fb99e2ae71c252b89554c8021"
          frameborder="0"
          class="u-width100"
          height="500px"
          @load="feedbackFormLoaded"
        ></iframe>
      </el-loading-wrapper>

    </el-dialog>
  </div>
</template>

<script>
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PageEdit',

  data () {
    return {
      feedbackDialogVisible: false,
      feedbackFormIsLoading: true
    }
  },

  computed: {
    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        )
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo
        return (
          base.replace(endingSlashRE, '')
          + `/src`
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
          + path
          + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    },

    feedbackFormLoaded() {
      this.feedbackFormIsLoading = false
    }
  }
}
</script>
