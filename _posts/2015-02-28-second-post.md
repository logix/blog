---
layout: default
title: 第二篇测试文v2
---

{{ page.title }}
================

这是第二篇文章，我增加了.gitigonre文件来过滤掉site目录的提交，测试github是否会生成新的blog文章。

如果你能看到这篇文章，说明Github内部就有jekyll引擎，而且应该是在文件push的时刻触发。

测试二，我要知道post.url的结构，所以输出它： `{{ page.url }}`



[我的博客](http://{{ site.baseurl }})