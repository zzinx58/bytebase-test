# 摩客拜思（南宁） - 实习前端工程师 岗位应聘笔试题

要求：参考网站 bytebase 的登录页面，利用 React 技术（UI 框架不限），完成以下页面，实现一个基本可用的登录页面，注册不要求实现，只需要实现自有登录和第三方登录即可。
限时：48 小时
提交产物：

- 可运行压缩包（必须）
- 可访问、交互的网站（可选）

https://cdn.nlark.com/yuque/0/2023/png/502196/1687686826280-f2298926-8f34-414f-8212-0245346da0ec.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0

# 得分项

- 页面基本布局，输入框以及交互操作
  - 要求能基本复现 Bytebase 登录页面以及交互，能够在用户进行错误操作时完成提示（必须）
  - 使用 Flex 布局或者 Grid 布局（可选）
  - 在各个不同屏幕下能基本保持一致，在小屏幕下能进行响应式布局（可选）
- 第三方登录商集成
  - github（必须）
  - Google（可选）
  - Microsoft（可选）
- 页面优化
  - 图片缺省优化（可选）
  - 打包体积优化（可选）
  - 使用 Typescript（可选）

# 解决步骤

使用 Vite 构建工具及其与 React 栈相应的生态插件，提升开发效率。
通过 pnpm create vite . --template react-ts ，创建 react-ts 项目
整合 UnoCSS 技术, 安装依赖，切换终端界面，通过 code uno.config.ts 创建并编辑 unocss 配置
cmd + p 打开 vscode 编辑页面切换面板
浏览器搜索:
(ESLint/Cypress): Parsing error: ESLint was configured to run on `<tsconfigRootDir>/component/TestComponent.cy.ts` using `parserOptions.project`
编辑器报错提示问题，通过移除 .eslintrc.cjs 文件内容中：project 属性，解决编辑器报错提示问题。

import 'virtual:uno.css'？

配置 UnoCSS 配置项： presetUno, presetIcons, presetAttributify
重启项目，测试 UnoCSS 配置效果
配置项：通过设置 button 按钮的 className 属性：<... className='bg-red' >
测试效果成功
查看目标登陆页面，目的是获取其登录页面背景图
研究目标登录页面结构组成
页面登录表单项通过一个 section 包裹
背景图是一个背景图占左半边页面的 webp 图片文件....这..有些..
还有用的是 svg 格式 logo 文件，这里我们也下载下来。
将用得到的文件转移至项目 public 文件夹中，以供后面使用。
获取目标页面对应元素及布局的 size 信息
感觉这页面的 size 信息好怪啊....
表单项部份的数据，常规页面尺寸下，先复现一个页面大小情景下的结果。
第三方登录项的宽为 320px，高为 50px，border = 1px，
表单项的多平台登录的图标都是彩色的，因为我们使用的 UnoCSS 技术对于 iconify 的图标集有很好的集成，我们上 iconify 搜索看看有无彩色图标集，发现是有的，于是安装 iconify 彩色按钮图标集：@iconify-json/devicon -D
但是 devicon 图标集没有 microsoft 图标，我们需要安装图标集: @iconify-json/devicon -D
在 index.css 文件中使用 \*{} 的方式，清楚页内外边距， margin:0 padding:0
涉及盒模型使用的知识
我习惯添加上 flex flex-col 提醒自己页面流的默认布局流向方式
W3C 标准盒模型是不包含 border 和 padding 的，只包含 content 部份，所以在应用 4px 设计原则时，我们要将 border 和 padding 的信息考虑进单一元素整体的 size 设置当中去。
涉及 React 组件属性传递的知识
inline-block 和 vertical-align 效果？
call,bind,apply 方法要尽快了解其作用
Array 类的操作方法 20+需要尽快了解
利用数组 map 方法，渲染重复组件
unocss 样式有时会失效？unocss 不直接支持动态样式获取，无法扫描到
unocss safelist？
根据实际情况，unocss 扫描的是整个文件，只要样式是具体的字符串，就能被扫描到，无论其所处位置。但不能动态插值的形式使用。
attributify mode 需要在 HTML 元素上添加自定义属性，而不是用 classname，但是默认的 HTMLAttributes 类型不包含这些属性，因此需要手动打一个类型补丁。可以在项目根目录的 index.d.ts 文件中添加如下语句

You can solve this problem just by adjusting the order of react() and Unocss() in the vite.config.ts. You should put the Unocss() in the first place. There might be some limitation of react, or it might just be a bug of unocss. The regular expression is not wrong, and you can test it by the unitest here. A similar issue is here.!!!

Unocss 也有动态包 runtime，查看 safelist 对应文档。

既然文件内容能被扫描到，但是 attributify 模式不起作用，或许 attributify 的工作机制不一样，不是只扫描那么简单。
官网有 JSX/TSX 支持介绍，看 attributify 模块文档，创建 shims.d.ts 文档...

脚手架交互的话，如何检测具体依赖是否已安装？
如何提供多个选项供用户多选选定？

表单的欢迎元素样式，320 宽，36 高，margin-top 24px margin-bottom 16px
为什么 Unocss 写在 border attribute 的 伪元素属性不起作用？

shims.d.ts 文件需要放在 src 文件夹目录下。

input 元素的 after 伪元素不生效
::after 是一个伪元素选择器，用于在目标元素的内容之后插入生成的内容。然而，对于 <input> 元素，由于其自身的特殊性质，::after 伪元素并不适用。
<input> 元素是一个自闭合元素，它没有实际的内容，所以 ::after 伪元素无法插入在其内容之后。通常情况下，伪元素需要目标元素有实际的内容才能生效。

在 input 内容 invalid 的时候，在输入框下方提示文字：使用 span，结合监听器。

感觉 unocss 使用不是那么...好像有 bug， border attribute 在 input 组件上好像无效。。
现在是用 group 特性，直接在 className 上写，这似乎挺不错的，不必使用 attributify mode。
group 没有办法嵌套使用？...不是那么方便，hover 选择器使用了 group，其他的需要写全了。
env 文件写在根目录下，vite-env.d.ts 写在 src 目录下
配置 vite 环境变量的 TS 提示。
前后端 router 有什么不同？
style={{ backgroundImage: "url('login-bg.webp')" }} cool.
不同层级的元素的 flex flex-col 长宽自适应问题。
bytebase 的页面响应式有点难度，没能完全理解和使用，暂放。
{ [key: string]: string }
字符串对象读取类型·问题。

删除 lint 处理，vercel 部署
"lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
可以先本地 build 一下查看部署可能出现的问题
tsconfig 配置处理
"noUnusedLocals": false,
"noUnusedParameters": false,
第一个配置 false 即可
