<template>
    <div class="simple-editor">
        <div
            ref="textRef"
            class="editor-content"
            contenteditable="true"
            v-html="content"
            @input="getRange"
            @click="getRange"
        ></div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "simple-editor",
    props: {
        value: {
            type: [Number, String],
            default: "",
        },
    },
    emits: ["update:value"],
    setup(props, { emit }) {
        const textRef = ref(null);
        const content = ref("");
        let range = null; // 光标实例

        /**
         * 初始化  默认文本
         * type = 1  纯文本 -> 富文本文本
         * type = 2  富文本
         */
        const initText = (text = "", tags = {}, type = 1) => {
            content.value = text;
            if (type === 1) {
                for (let key in tags) {
                    const value = tags[key];
                    const reg = new RegExp(value, "g");
                    content.value = content.value.replace(
                        reg,
                        `<section class="tag" unselectable="no" onmousedown="return false" contenteditable="false" data-value="${value}">${key}</section>`
                    );
                }
                if (text[text.length - 1] !== " ") {
                    content.value += "<span>&nbsp;</span>";
                }
            }
        };

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
                const span = document.createElement("span");
                span.innerHTML = "&nbsp;";
                range.insertNode(span);
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
            emit("update:value", getText());
        };
        // 获取HTML
        const getHtml = () => {
            return textRef.value.innerHTML;
        };

        /**
         * 获取文本
         */
        const getText = (node = textRef.value) => {
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
            textRef,
            content,
            initText,
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
    background: #ffffff;
    min-height: 200px;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    .editor-content {
        height: 100%;
        outline: none;
        line-height: 1.5;
        word-break: break-all;
        overflow-y: auto;
        white-space: pre-wrap;
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
}
</style>
