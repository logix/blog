

//        document.write(jo.articles[1].title.toString() + "x");
//        console.log(jo);


//生成talk
var talknum = talkdata.length;
document.getElementById("talkdata").innerHTML = "“"+talkdata[talknum-1][1]+"”";



//生成文章列表
createArticleList(jo.articles);


/**
 * 生成文章列表
 *
 * @param obj Json Obj
 * @param pageNum Int
 * @param pageFunc String 分页时调用的参数名称
 */
function createArticleList(obj, pageNum, pageFunc, keyword) {

    pageNum = pageNum || 1;
    pageFunc = pageFunc || "createAllList";

    //这里很奇怪，当pagenate做全局变量的时候，obj.length/pagenate = NaN , 是否和模板有关系？再测试下
    var pagenate = 4;
    var isLast = false;

    //清空列表栏
    document.getElementById("article_list").innerHTML = "";

    //分页计算
//            document.write(Math.ceil(obj.length/pagenate));
    var totalPageNum = 0;
    totalPageNum = parseFloat(obj.length/pagenate);


    for(var i = (pageNum-1) * pagenate; i< pageNum * pagenate; i++) {
//                document.write(i);
        if(i > obj.length -1 ) {
            isLast = true;
            break;
        }

        if(i < 0) i =0;

        document.getElementById("article_list").innerHTML +=
            "<li><span class='catetag'>"+ obj[i].categories +"</span>"+obj[i].date+" - <a href='"+obj[i].url+"' >"
            +obj[i].title+"</a></li>";
    }

    if(obj.length <= pagenate) return;

    var Prev = "<a class='pagimenu' href='#' onclick='"+pageFunc+"(\""+keyword+"\","+(pageNum-1)+")'>[ Prev ]</a>";
    var Next = "<a class='pagimenu' href='#' onclick='"+pageFunc+"(\""+keyword+"\","+(pageNum+1)+")'>[ Next ]</a>";

    if(pageNum == 1)
        document.getElementById("article_list").innerHTML += "<div>"+Next+"</div>";
    else if(isLast)
        document.getElementById("article_list").innerHTML += "<div>"+Prev+"</div>";
    else
        document.getElementById("article_list").innerHTML += "<div>"+Prev+" "+Next+"</div>";


}


function createAllList(keywordnull,pageNum){
    createArticleList(jo.articles, pageNum);
}


function createListbyTag(tag,pageNum) {
    var tmp_arr = [];
    for(i in jo.articles) {
        if(jo.articles[i].tags.indexOf(tag) >= 0) { // 等于0也是有的，indexOf若第一位匹配到就返回0，无匹配返回-1
            tmp_arr.push(jo.articles[i]);
        }
    }
    if(tmp_arr.length > 0)
        createArticleList(tmp_arr,pageNum,"createListbyTag",tag);
    else
        document.write("无此类文章");
}

function createListbycategory(category, pageNum) {
    var tmp_arr = [];
    for(i in jo.articles) {
        if(jo.articles[i].categories.indexOf(category) >= 0) {
            tmp_arr.push(jo.articles[i]);
        }
    }
    if(tmp_arr.length > 0)
        createArticleList(tmp_arr,pageNum,"createListbycategory",category);
    else
        document.write("无此类文章");
}
