---
layout: post
title: 初见swoole
category: 技术笔记
tags:
- php
- swoole
---



由于刚接触swoole，知之甚少，作为笔记粗略记录下。

swoole是前些天和朋友聊天时得知的，他想用swoole来构建应用的通信框架，让我帮忙也研究一下，我自然是有兴趣，正好也有时间。对于曾今做过多年phper的我来说，当年想通过php实现异步请求和稳定的长链接，是多么困难的事情，所以第一眼看到[swoole](http://www.swoole.com/)时，眼睛就亮了，以下是官方的说明：

> “PHP语言的高性能网络通信框架，提供了PHP语言的异步多线程服务器，异步TCP/UDP网络客户端，异步MySQL，数据库连接池，AsyncTask，消息队列，毫秒定时器，异步文件读写，异步DNS查询。”

已经有两年多没怎么碰php了，不过还算顺手。参照[环境搭建说明](https://github.com/LinkedDestiny/swoole-doc/blob/master/01-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E5%8F%8A%E6%89%A9%E5%B1%95%E5%AE%89%E8%A3%85.md)，使用环境：阿里云ECS，ubuntu14.04x64版本，php5.5.23, swoole 1.76-stable，很快就测通了文档中的服务端与客户端通信的例子。

之后我在本地mac book上安装swoole，由于swoole已经在[pecl的Event分类中收录](https://pecl.php.net/packages.php)，mac上我使用pecl来安装swoole（不太清楚pecl和pear的区别可以看[这里](http://jingyan.baidu.com/article/e9fb46e1a3eb277521f76619.html)）, 如果运行*pecl install swoole*遇到找不到包的错误提示，可以在pecl官网下载，通过*pecl install ./本地文件*来安装，安装过程会遇到的编译问题在[这篇文章](http://blog.csdn.net/rsp19801226/article/details/44590803)中基本都遇到了，主要是用homebrew来安装缺失的依赖包。

阅读了一遍官方站点的文档，发现文档和新版本的api有些地方对不上，比如新加入的websocket，on和message的参数并不匹配，看来swoole的官方文档的更新还是滞后的。参考了swoole的c源码后，调试通了websocket的api，贴上测试过的1.7.14版本可以运行的代码示例：

{% highlight php %}
<?php
/**
 * swoole 1.7.14 websocket 
 * api sample
 */
$server = new swoole_websocket_server("0.0.0.0", 9502);
$server->on('open', 
    function (swoole_websocket_server $server, swoole_http_request $req) {
        echo "server: handshake success with fd\n";
    });
$server->on('message', 
    function (swoole_websocket_server $server, swoole_websocket_frame $frame) {
        echo "receive from {$frame->fd}:{$frame->data},"
        . "opcode:{$frame->opcode},fin:{$frame->finish}\n";
        $server->push($frame->fd, "this is server");
    });
$server->on('close', function ($ser, $fd) {
    echo "client {$fd} closed\n";
});
$server->start();
?>
{% endhighlight %}

这是我初次和swoole打交道，体验下来蛮有惊喜的，swoole在弥补php的短板，使php变得更加方便，后面计划用swoole来做一个应用的通信框架，继续深入使用看看。

