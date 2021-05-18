<template>
    <div class="simple-editor">
        <div class="editor-wrap">
            <slot>
                <div class="btn-wrap">
                    <button class="emoji-btn" @click="show_emoji = !show_emoji">
                        表情
                        <div class="emoji-warp" v-if="show_emoji">
                            <v-emoji
                                @submit="
                                    insertNode('text', $event),
                                        (show_emoji = false)
                                "
                            ></v-emoji>
                        </div>
                    </button>
                    <button @click="insertNode('tag', 'tag', '[tag-value]')">
                        tag
                    </button>
                    <button @click="insertNode('tag', 'no-value')">
                        no-value
                    </button>
                </div>
            </slot>
            <div
                ref="textRef"
                class="editor-content"
                contenteditable="true"
                v-html="value"
                @input="getRange"
                @click="getRange"
            ></div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
    name: "simple-editor",
    props: {
        value: {
            type: [Number, String],
            default: "",
        },
        text: {
            type: [Number, String],
            default: "",
        },
    },
    emits: ["update:value", "update:text"],
    setup(props, { emit }) {
        const state = reactive({
            show_emoji: false,
        });
        const textRef = ref(null);
        let range = null;

        // 插入节点
        const insertNode = (type = "text", e, value = "") => {
            textRef.value.focus();
            const selection = getSelection();
            selection.deleteFromDocument(); // 删除光标所选区域

            if (!range) {
                range = selection.getRangeAt(0);
            }

            let node = e;
            switch (type) {
                case "text":
                    node = document.createTextNode(e);
                    break;
                case "tag":
                    node = document.createElement("section");
                    node.setAttribute("class", "tag");
                    node.setAttribute("unselectable", "no");
                    node.setAttribute("onmousedown", "return false");
                    node.setAttribute("contenteditable", false); // 不可编辑
                    node.innerHTML = e;
                    break;
                default:
                    node = e;
                    break;
            }

            range.insertNode(node); // 插入节点
            range.collapse(); //  true 折叠到 Range 的 start 节点，默认 false 折叠到 end 节点。
            if (type !== "text") {
                node.setAttribute("data-value", value);
                range.insertNode(document.createElement("span"));
                range.collapse(); //  true 折叠到 Range 的 start 节点，默认 false 折叠到 end 节点。
            }
            getRange();
        };

        // 获取光标
        const getRange = () => {
            const selection = getSelection();
            range = selection.getRangeAt(0);
            // console.log("selection=>", selection);
            // console.log("range=>", range);

            submit();
        };

        const submit = () => {
            emit("update:value", getHtml());
            const text = getText(textRef.value);
            emit("update:text", text);
            console.log("getText=>", text);
        };
        // 获取HTML
        const getHtml = () => {
            return textRef.value.innerHTML;
        };

        /**
         * 获取文本
         */
        const getText = (node) => {
            let str = "";
            switch (node.nodeName) {
                case "DIV":
                    str = node.className !== "editor-content" ? "\n" : "";
                    break;
                case "#text":
                    str = node.nodeValue;
                    break;
                case "SECTION": {
                    const value = node.getAttribute("data-value");
                    if (value) return value;
                    break;
                }
                default:
                    break;
            }
            if (node.childNodes.length > 0) {
                for (let el of node.childNodes) {
                    str += getText(el);
                }
            }
            return str;
        };

        return {
            ...toRefs(state),
            textRef,
            insertNode,
            getRange,
            getHtml,
            getText,
        };
    },
};
</script>
<style lang="less" scoped>
.simple-editor {
    .editor-wrap {
        height: 560px;
        background: #ffffff;
        border: 1px solid #eaebf0;
        border-radius: 4px 4px 0px 0px;
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
        }
        .editor-content {
            padding: 20px;
            height: 100%;
            outline: none;

            :deep(.tag) {
                display: inline-block;
                height: 32px;
                line-height: 32px;
                padding: 0 15px;
                background: #ffe5d3;
                border-radius: 4px;
                color: #fd7b2a;
                margin: 2px 4px;
            }
        }

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
    }
}
</style>
