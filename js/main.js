/**
 * Created by Arnold on 2016/9/24.
 */

$(function(){
    $(window).resize();
    $('#block-nav').css("z-index", 1);

    // �调用函数
    $("#block-nav").navFixed();


    $('#fstPage-down a, nav a, #logo').bind('click',function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top-52}, 600);
        event.preventDefault();
    });
});

$(window).resize(function(){

    $("#block-firstPage").css("height", $(window).height());

    $('.blockTitle').stop().fadeIn("normal").animate({
        "top" : ($(window).height() - $('.blockTitle').outerHeight())/2
    },500);

    $("#block-wantMore").css("height", $(window).height()-52 + "px");
    $('#block-wantMore>p').css("top", ($("#block-wantMore").outerHeight(true) - $('#block-wantMore>p').outerHeight())/2 + "px");



    var str = '',
        data = [
            [
                { title : '第一章 图片效果相关'},
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/图片滚动.html', title : '图片滚动' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/图片无缝滚动.html', title : '图片无缝滚动' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/鼠标移入移出图片放大.html', title : '图片放大效果' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/鼠标移入移出渐变透明度.html', title : '图片透明度变幻' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/图片遮罩下拉.html', title : '图片遮罩下拉' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/图片放大镜效果.html', title : '图片放大镜效果' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/下拉图片轮播.html', title : '图片下拉轮播' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/渐变透明度轮播.html', title : '渐变透明度轮播' },
                { url : '阿诺作品-专注于原生JS的折腾/图片效果相关/旋转木马.html', title : '旋转木马' }

            ],
            [
                { title : '第二章 表单效果相关'},
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/级联菜单.html', title : '级联菜单' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/验证是否输入.html', title : '验证是否输入' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/禁止用户输入.html', title : '禁止用户输入' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/禁止用户复制和粘贴.html', title : '禁止用户复制和粘贴' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/限制只能输入数字.html', title : '限制只能输入数字' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/限制字符串长度.html', title : '限制字符串长度' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/提示可输入剩余字数.html', title : '提示可输入剩余字数' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/Ctrl + Return提交表单.html', title : 'Ctrl + Return提交表单' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/文本内容进行关键字过滤.html', title : '关键字过滤' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/全选反选少选复选框.html', title : '复选框' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/动态操作下拉选项.html', title : '动态操作下拉选项' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/关闭中文输入法.html', title : '关闭中文输入法' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/可输入的下拉框.html', title : '可输入的下拉框' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/段落文本文字自动滚动.html', title : '文字自动滚动' },
                { url : '阿诺作品-专注于原生JS的折腾/表单效果相关/去掉字符串左右空格.html', title : '去掉左右空格' }
            ],
            [
                { title : '第三章 内容展示相关'},
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/瀑布流布局/index.html', title : '瀑布流' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/隔行换色.html', title : '隔行换色' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/iphone解锁效果.html', title : 'iphone解锁效果' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/仿iMac任务栏效果.html', title : '仿iMac任务栏效果' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/可删减表格.html', title : '可删减表单' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/可拖拽弹出层.html', title : '可拖拽弹出层' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/商品分类导航.html', title : '商品分类导航' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/对联广告.html', title : '对联广告' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/榜单切换.html', title : '榜单切换' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/选项卡轮播.html', title : '选项卡轮播' },
                { url : '阿诺作品-专注于原生JS的折腾/内容展示相关/鼠标悬停提示.html', title : '鼠标悬停提示' }

            ],
            [
                { title : '第四章 时间效果相关'},
                { url : '阿诺作品-专注于原生JS的折腾/时间效果相关/canvas小时钟.html', title : 'canvas小时钟' }

            ],
            [
                { title : '第五章 迷你趣玩游戏'},
                { url : '阿诺作品-专注于原生JS的折腾/迷你小游戏/2048/index.html', title : '2048游戏' },
                { url : '阿诺作品-专注于原生JS的折腾/迷你小游戏/2048私人订制/index.html', title : '2048私人订制' }

            ]

        ];
    for(var i = 0; i < data.length; i++){
        var items = data[i];
        var sub = '';
        for(var j=0; j<items.length; j++){
            var son = items[j];
            if(j == 0){
                sub += '<li><h1><a href="javascript:;" title="' + son.title + '">' + son.title + '</a></h1><dl class="sub-dl">';
            } else {
                sub += '<dd><a href="' + son.url + '" target="_blank" title="' + son.title + '">' + son.title + '</a></dd>';
            }
            if(j == items.length - 1){
                sub += '</dl></li>';
            }
        }
        str += sub;
    }
    var ol = document.getElementById('ol');
    ol.innerHTML = str;
    var h1 = ol.getElementsByTagName('h1');
    var dl = ol.getElementsByTagName('dl');
    var tmp = -1;
    var open = false;
    for(var i=0; i < h1.length; i++){
        h1[i].index = i;
        h1[i].onclick = function(){
            for(var i=0; i<h1.length; i++){
                dl[i].style.display = 'none';
            }
            if(tmp == this.index && open){
                dl[this.index].style.display = 'none';
                open = false;
            } else {
                dl[this.index].style.display = 'block';
                open = true;
            }
            tmp = this.index;
        }
    }
});
