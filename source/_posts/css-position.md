---
layout: post
title: CSS position
date: 2022-01-04 21:25 +0800
toc: true
tags: 
  - CSS
  - 坑
---
`fixed` 和 `absolute`属性会被移除文档流，其他的不会。

使用`position: fixed`配合`top/right/bottom/left`可以用来做导航条。如果缩宽度，可以加`with: 100%` 外面加一个`container`。

