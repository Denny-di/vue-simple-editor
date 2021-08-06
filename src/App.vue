<template>
    <div class="editor-wrap">
        <div class="btn-wrap">
            <button class="emoji-btn" @click="show_emoji = !show_emoji">
                表情
                <div class="emoji-warp" v-if="show_emoji">
                    <v-emoji
                        @submit="
                            insertNode('text', $event), (show_emoji = false)
                        "
                    ></v-emoji>
                </div>
            </button>

            <button
                v-for="(value, key) in tags"
                @click="insertNode('tag', key, value)"
                :key="key"
            >
                {{ key }}
            </button>
        </div>
        <simple-editor
            ref="EditorRef"
            v-model:value="form.content"
        ></simple-editor>

        <div class="btn-wrap">
            <button @click="hanldeClick('text')">获取纯文本</button>
            <button @click="hanldeClick('html')">获取富文本</button>
            <button @click="initText(content)">设置富文本</button>
            <button @click="initText(undefined)">清空</button>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { SimpleEditor, VEmoji } from "../packages";

export default {
    name: "App",
    components: {
        [SimpleEditor.name]: SimpleEditor,
        [VEmoji.name]: VEmoji,
    },
    setup() {
        const content = `表情-> 😄😍😳✋😋😎👀🌹🌾
哈                   哈哈
tag
{{value}}
#hot# `;
        const state = reactive({
            content,
            EditorRef: null,
            show_emoji: false,
            form: {
                content,
                //                 content: `表情-&gt; 😄😍😳✋😋😎👀🌹🌾
                // 哈                   哈哈
                // <span></span><section class="tag" unselectable="no" onmousedown="return false" contenteditable="false" data-value="tag">tag</section><span></span>
                // <span></span><section class="tag" unselectable="no" onmousedown="return false" contenteditable="false" data-value="{{value}}">tag-value</section><span></span>
                // <span></span><section class="tag" unselectable="no" onmousedown="return false" contenteditable="false" data-value="#热门话题#">@全部人</section><span></span>`,
            },

            tags: {
                tag: "tag",
                "tag-value": "{{value}}",
                "#热门话题#": "#hot#",
            },
        });

        const insertNode = (type = "text", content, value) => {
            state.EditorRef.insertNode(type, content, value);
        };

        const hanldeClick = (type) => {
            let content = "";
            if (type === "text") {
                content = state.EditorRef.getText();
            } else {
                content = state.EditorRef.getHtml();
            }
            console.log(content);
        };

        // // 初始化文本
        const initText = (text) => {
            console.log("text=> ", text);
            state.EditorRef.initText(text, state.tags);
        };

        onMounted(() => {
            initText(state.form.content);
        });

        return {
            ...toRefs(state),
            insertNode,
            hanldeClick,
            initText,
        };
    },
};
</script>

<style lang="less">
.editor-wrap {
    margin: 20px;
    border: 1px solid #eaebf0;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    flex-direction: column;
    height: 560px;

    .emoji-btn {
        position: relative;

        .emoji-warp {
            position: absolute;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            left: 0;
            top: 40px;
        }
    }

    .btn-wrap {
        height: 50px;
        background: #f8f9fa;
        border-bottom: 1px solid #eaebf0;
        padding: 10px;
        display: flex;
        button {
            height: 32px;
            min-width: initial;
            border: 0;
            margin-right: 20px;
        }
        &:last-of-type {
            border-top: 1px solid #eaebf0;
            border-bottom: 0;
        }
    }
}
</style>
