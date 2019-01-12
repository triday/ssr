
## 使用说明

```StrongRes```是强类型的资源工具，目的在于帮助前端开发人员高效便捷的处理前台国际化资源。


### 安装使用 
    ```npm install strongres```
### 使用约定
    为了更方便的处理前台资源，默认提供了一些约定。
1. 资源文件必须为json格式文件，且后缀名称必须是```.json```。
2. 资源文件需要按照```src/i18n/{locale}/```的目录关系组织，例如名称为common.json的资源文件，如果提供中文和英文的资源，则```src/i18n/zh-CN/common.json```放置中文资源，```src/i18n/en-US/common.json```中放置英文资源。

### 配置
```strongres```的配置信息在```package.json```文件中的```sr```节点下面。例如：

    ```
    sr: {
        resBaseDir: "src/i18n",
        codeBaseDir: "src/i18n",
        codeType: "ts",
        fromLocale: "zh-CN",
        targetBaseDir: "dist/i18n",
    }
    ```



|名称|描述|默认值|
|---|---|---|
|resBaseDir|资源文件根目录|```src/i18n```|
|codeBaseDir|生成的代码文件根目录|```src/i18n```|
|codeType|生成的代码类型(```ts```,```js```)|```ts```|
|fromLocale|根据何种语言生产代码|```zh-CN```|
|targetBaseDir|build时目标根路径|```dist/i18n```|


### 命令
```sr```
```sr build```

#### Webpack配置
```npm i webpack-shell-plugin```
webpack的配置如下
```
    plugins: [
        ......
        new ShellWebpackPlugin({ 
            onBuildStart: ['sr gen'], 
            onBuildEnd: ['sr build'] 
        })
    ]
```
