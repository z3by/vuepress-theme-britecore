module.exports = () => ({
    extendPageData ($page) {
        const {
            _content
        } = $page
        $page.content = _content
    }
})
