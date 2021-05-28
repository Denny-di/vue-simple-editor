<template>
    <simple-editor></simple-editor>
    <v-emoji></v-emoji>
</template>

<script>
import { SimpleEditor } from "../packages";
import { VEmoji } from "../packages";

export default {
    name: "App",
    components: {
        [SimpleEditor.name]: SimpleEditor,
        [VEmoji.name]: VEmoji,
    },
};
</script>

<style lang="less"></style>
