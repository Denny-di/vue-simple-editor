<template>
    <div class="simple-editor">
        <div class="editor-wrap">
            <div class="btn-wrap">
                <!-- <v-emoji @submit="add('emoji', $event)"></v-emoji> -->
                <a-button @click="add('new')">@进群新人</a-button>
            </div>
            <div
                ref="textRef"
                class="editor-content"
                contenteditable="true"
                v-html="content"
                @input="input"
                @click="getStart"
                @blur="getStart"
            ></div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watch } from "vue";
export default {
    name: "simple-editor",
    components: {},
    setup() {
        const state = reactive({
            content: "",
            index: 0, // 光标下标
        });

        const add = (type, e) => {
            const { text = "" } = state.form;
            let str = "",
                index = state.index;
            switch (type) {
                case "new": {
                    str = `<span class="tag">@进群新人</span>`;
                    break;
                }
                case "emoji": {
                    str = e;
                    break;
                }
                case "all": {
                    str = "@全员 ";
                    // str = `<span class="tag">@全员</span>`;
                    break;
                }
                default:
                    break;
            }
            state.content = text.slice(0, index) + str + text.slice(index);
        };

        const textRef = ref(null);
        const getStart = () => {
            state.index = textRef.value.selectionStart;
            console.log("state.index=>", state.index);
        };

        watch(
            () => state.content,
            (val = "", prev = "") => {
                const diff = val.length - prev.length;
                if (diff > 0) state.index += diff;
            }
        );
        return {
            ...toRefs(state),
            textRef,
            input(e) {
                console.log(123, e.target.innerHTML);
            },
            add,
            getStart,
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

            // :deep(.new-people) {
            //     display: inline-block;
            //     height: 32px;
            //     line-height: 32px;
            //     padding: 0 15px;
            //     background: @third-color;
            //     border-radius: 4px;
            //     color: #fd7b2a;
            // }

            :deep(.ant-input) {
                border: 0;
                &:focus {
                    border: 0;
                    box-shadow: none;
                }
                outline: none;
            }
        }
    }
}
</style>
