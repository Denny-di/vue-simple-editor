import VEmoji from "./index.vue";

// 为组件添加 install 方法，用于按需引入
VEmoji.install = (Vue) => {
    Vue.component(VEmoji.name, VEmoji);
};

export default VEmoji;
