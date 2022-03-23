---
title: 基于reveal.js做一个支持Markdown的在线PPT
tags:
  - null
---

reveal.js 是一个开源的 HTML 演示框架。借用这个工具我们可以渲染Markdown实现一些类似markdown博客或者markdown在线ppt的效果。

下面是一段示例代码

```js
<section data-markdown>
  <textarea data-template>
    ## Slide 1
    A paragraph with some text and a [link](http://hakim.se).
    ---
    ## Slide 2
    ---
    ## Slide 3
  </textarea>
</section>
```

渲染后

![](Jietu20220321-122054-HD.mp4.gif)

尝试一下，新建项目slide.md，安装reveal.js

```shell
npm install reveal.js
```

