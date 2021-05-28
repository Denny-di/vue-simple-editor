# 🍓 vue-simple-editor
```
基于 vue 3.x 轻量级富文本编辑器，可用于聊天框，发布框..
```
- ⭐ [gitHub](https://github.com/Denny-di/vue-simple-editor)

## Install
```
npm install vue-simple-editor
```

## Usage
```
import SimpleEditor from "vue-simple-editor";
const app = createApp(App);
app.use(SimpleEditor);
```

### 按需引入
> 需要先安装插件
```
    npm i babel-plugin-import --save-dev
```

> 在引入组件库的项目根目录新建.babelrc 文件， 配置如下
```
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vue-simple-editor", // 组件名
        "libraryDirectory": "packages" // 组件源码包名
      }
    ]
  ]
}
```

> 按需引入示例
```
<tempalte>
	<div>
        <simple-editor></simple-editor>
        <v-emoji></v-emoji>
    </div>
</tempalte>
import { SimpleEditor, VEmoji } from "vue-simple-editor";
export default {
	components:{
    	[SimpleEditor.name]: SimpleEditor,
    	[VEmoji.name]: VEmoji,
    }
}
```

## Props
Name|Type|Default|Description
--|:--:|--:|--:
v-model:value|[Number, String]|-|获取富文本
v-model:text|[Number, String]|-|获取纯文本

## Events
Name|Parameters|Description
--|--:|--:
insertNode|`type="text", content, value`|插入节点 `type: text（文本节点）、tag（标签节点），content：显示内容， value：获取纯文本的内容`
getHtml|-|获取富文本
getText|-|获取纯文本


## Examples
```
<template>
    <simple-editor></simple-editor>
</template>
<script>
export default {
    name: "App",
    components: {},
};
</script>
<style lang="less"></style>

```

![Examples](https://raw.githubusercontent.com/Denny-di/vue-simple-editor/master/src/assets/img/examples.jpg "Examples")


