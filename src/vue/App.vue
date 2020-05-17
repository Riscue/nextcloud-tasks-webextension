<template>
    <div id="app">
        {{msg}}
    </div>
</template>

<script>
    export default {
        el: '#app',
        props: {},
        data() {
            return {
                msg: browser.i18n.getMessage("extensionName", null)
            }
        }
    };
</script>

<style lang="scss">
    @import "~@scss/main.scss";
</style>
