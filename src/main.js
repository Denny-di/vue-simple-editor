import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/reset.css";

// 导入组件库
import SimpleEditor from "../packages";
const app = createApp(App);
// 注册组件库
app.use(SimpleEditor);

app.mount("#app");
