---
layout: post
title: 初见swoole
category: 技术笔记
tags:
- php
- swoole
---




### 4-1 
由于刚接触swoole，知之甚少，作为笔记，目前只能粗略的记录下了解和使用的过程。

swoole是前些天和朋友聊天时得知的，他想用swoole来构建应用的通信框架，让我帮忙也研究一下，我自然是非常有兴趣。对于曾今做过多年phper的我来说，当年想通过php实现异步请求和稳定的长链接，是多么困难的事情，所以第一眼看到[swoole](http://www.swoole.com/)时，眼睛就亮了，以下是官方的说明：

> “PHP语言的高性能网络通信框架，提供了PHP语言的异步多线程服务器，异步TCP/UDP网络客户端，异步MySQL，数据库连接池，AsyncTask，消息队列，毫秒定时器，异步文件读写，异步DNS查询。
Swoole可以广泛应用于互联网、移动通信、企业软件、云计算、网络游戏、物联网、车联网、智能家居等领域。 使用PHP+Swoole作为网络通信框架，可以使企业IT研发团队的效率大大提升，更加专注于开发创新产品。”



### 4-2  
虽然已经有两年多没怎么碰php了，不过还是热情依旧。参照[环境搭建说明](https://github.com/LinkedDestiny/swoole-doc/blob/master/01-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E5%8F%8A%E6%89%A9%E5%B1%95%E5%AE%89%E8%A3%85.md)，使用环境：阿里云ECS，ubuntu14.04x64版本，php5.5.23, swoole 1.76-stable，很快就测通了文档中的服务端与客户端通信的例子。


之后我在本地mac上安装swoole，打算进行并发的测试，由于swoole已经在[pecl的Event分类中收录](https://pecl.php.net/packages.php)，mac上我使用pecl来安装swoole（不太清楚pecl和pear的区别可以看[这里](http://jingyan.baidu.com/article/e9fb46e1a3eb277521f76619.html)）, 如果运行*pecl install swoole*遇到找不到包的错误提示，可以在pecl官网下载，通过*pecl install ./本地文件*来安装，安装过程会遇到的编译问题在[这篇文章](http://blog.csdn.net/rsp19801226/article/details/44590803)中基本都遇到了，中间要用homebrew来安装缺失的依赖包。

目前对swoole还知道的太少，接下去准备继续测试swoole其他的api，异步通信，消息队列，内存读写等。还有其他事情，留着测试后再继续写。

### 4-3
昨天阅读了一遍官方站点的文档，发现很多文档和新版本的api对不上，比如新加入的websocket，on和message的参数并不匹配，看来swoole的官方人手和开源流程还是相对薄落。参考了swoole的c源码后，调试通了websocket的api，以下是测试过的 1.7.14版本可以运行的api

{% highlight php linenos %}
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

接下来准备测试异步通信，毫秒定时器和内存读写，然后将数据在网页端即使显示。

