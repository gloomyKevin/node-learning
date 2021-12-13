# 输入

- node 传参

# 输出

node 输出

文档参考：
```javascript
console.log()
```

```
console.
```

# 全局对象

特殊的全局对象（模块中的变量）
- 只是每个模块都有，但模块之间彼此可能有差异
- 在命令行交互中不可以使用
- 包括：`__dirname`、 `__filename`

# 常用内置模块
## path
用于对路径和文件进行处理

补充：可移植操作系统接口（POSIX）
- Linux 和 Mac OS 都实现了POSIX接口
- Windows 部分电脑实现了POSIX接口

# 包管理工具
## npm
- Node Package Manager
- 目前已经不仅仅是 Node 包管理器
- 例如 express、kos、
- 存放位置：不同 registry

项目配置文件
package.json
- name
- version
- description
- author
- license
private 属性
- private 属性记录当前项目是否私有
- 当值为 true 时，npm不能发布它，这是私有项目或模块发布出去的方式

必填属性：name、version

补充 mpx-ui中的发布校验
即，限制必须走 npm run publish，而非走自带的 npm publish

### 常见属性分析
#### main
在借助 webpack 构建时，使用的是 webpack 中的main，package.json 的 main 主要是在开源出去

#### scripts
可以省略run
- start
- 
即 npm start 的执行

#### dependencies
指定 开发环境 和 生产环境都需要依赖的包

#### devDependencies
生产环境不需要的包（例如webpack、babel），通过 `npm install webpack --save-dev`， 安装到 devDependencies 中

Q：在生产环境如何保证不安装这些包？
A：生产环境不需要安装时，通过 `npm install --production` 来安装文件依赖

#### 版本管理问题
npm 的包需要遵从 semver 规范
semver 版本规范是X.Y.Z
- X主版本号（major） 主版本号：不兼容的 API 修改（可能不兼容之前的版本）
- Y 次版本号：向下兼容的功能性修改（性能增加，但兼容之前的版本）
- Z 修订号：向下兼容的问题修正（无新功能，修复之前版本的 bug ）

^ 和 ~ 的区别
- ^ x.y.z：表示 x 是保持不变的，y 和 z 永远安装最新的版本
- ~x.y.z：表示 x 和 y 保持不变，z 永远安装最新

#### engines

#### browserslist

### 全局安装和局部安装
全局安装（global install）：npm install yarn -g
项目安装（局部）安装（local install）：npm install

#### 全局安装
- 全局安装是直接将某个包安装到全局
但很多人对全局安装有些误会
- 通常使用 npm 全局安装的包都是一些工具包：yarn、webpack 等
- 并不是类似于 axios、express、koa 等库文件
- 所以全局安装之后并不能让我们在所有项目中使用 axios 等库

### 局部安装
局部安装分为 `开发时依赖` 和 `生产时依赖`
安装开发和生产依赖
npm install axios
npm i axios

问题，如果没有正确区分局部/全局安装，会有是吗影响

开发依赖

注意：直接执行 npm install，会根据 package.json 中的依赖包进行安装
补充：（自己的实践）npm install 后问题解决（可复询志恒）

### npm install 原理
- 执行 npm install 其背后帮我们完成了什么操作
- 会发现还有一个成为 package-lock.json 的文件，其作用是什么？
- 从 npm5 开始，npm 支持缓存策略（来自 yarn 的压力），缓存有什么作用？

(流程图)
文字
- 没有 lock 文件
    - 分析依赖关系
    - 从 registry 仓库中下载压缩包（如果设置了镜像，会从镜像服务器下载压缩包）
    - 到压缩包后会对压缩包进行缓存（npm5 开始）
    - 将压缩包解压到项目的 node_modules 文件夹中（require的查找顺序）
- 有 lock 文件
    - 检测 lock 中包的版本是否和 package.json 中一致（按照 semver 版本规范检测）
        - 不一致，会重新构建依赖关系，走顶层流程
    - 一致的情况下，会优先查找缓存
        - 没找到，会从 registry 仓库下载，走顶层流程
    - 查找到，会获取缓存中的压缩文件，并且将压缩文件解压到 node_modules 文件夹中

添加说明：`检查依赖一致性`


原本为树形结构，存在重复安装依赖的问题，后改为扁平结构


详解 package-lock.json

关于：要不要提交 package-lock.json
两种论调

获取当前缓存路径
npm config get cache

npm i 和 npm ci

### npm其他命令（常用）
卸载依赖包
```
npm uninstall package
npm uninstall package --save-dev
npm uninstall package -D
```

强制重新build
npm rebuild

清除缓存
npm cache clean

[学习链接](https://juejin.cn/post/6844903870578032647)

## Yarn


## cnpm

## npx
npx 是 npm5.2 之后自带的一个命令
- 调用项目安装的模块
- 避免全局安装模块
- 使用不同版本的 node
- 执行 GitHub 源码

[阮一峰-npx](https://www.ruanyifeng.com/blog/2019/02/npx.html)
## pnpm

# 实践：自建脚手架