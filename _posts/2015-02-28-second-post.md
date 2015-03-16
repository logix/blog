---
layout: post
title: 第二篇测试文v4
category: test
tags:
- jekyll
---



这是第二篇文章，我增加了.gitigonre文件来过滤掉site目录的提交，测试github是否会生成新的blog文章。

如果你能看到这篇文章，说明Github内部就有jekyll引擎，而且应该是在文件push的时刻触发。

测试二，我要知道post.url的结构，所以输出它： `{{ page.url }}`

测试三，一段js代码能否解析

```javascript
var str = "use lang to transform code format";
for(var i =0; i<5; i++) str += ","+i;
```

{% highlight javascript %}
var str = "welcome to my blog";
document.getElementById("my").innerHTML = str;
{% endhighlight %}

{% highlight ruby linenos %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}


测试四，建立CSS和assets目录，并解析一张目录下的图片

![author]({{ site.baseurl }}/assets/author.jpeg "It's me :)")

[我的博客]({{ site.baseurl }})