import SimpleEditor from "./index.vue";

// 为组件添加 install 方法，用于按需引入
SimpleEditor.install = (Vue) => {
    Vue.component(SimpleEditor.name, SimpleEditor);
};

export default SimpleEditor;
