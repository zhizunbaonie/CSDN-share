/**
 * Created by zhangw on 2015-8-18.
 */
$(function(){
    // 概况图显示
    general.showGeneLine();
    /************************* common ***************************/
    $(".left-nav .menu1>a").click(function(){
        if($(this).children("span").length != 0){
            if($(this).next().is(":hidden")){
                $(this).next().slideDown(500);
                $(this).parent().siblings().children('ul').hide(500).end()
                    .find('span i').removeClass('fa-angle-down').addClass('fa-angle-right').end();
                $(this).addClass('active').parent().siblings().children('a').removeClass('active');
                $(this).find('span i').removeClass('fa-angle-right').addClass('fa-angle-down');
                return;
            }else{
                $(this).next().hide(500);
                $(this).find('span i').removeClass('fa-angle-down').addClass('fa-angle-right');
                $(this).removeClass('active');
                return;
            }
        }else{
            $(this).parent().siblings().children('ul').hide(500).end()
                .find('span i').removeClass('fa-angle-down').addClass('fa-angle-right').end();
            $(this).addClass('active').parent().siblings().children('a').removeClass('active');
            var i = $(this).attr("index");
            $("#index" + i).removeClass('noShow').siblings().addClass('noShow');
        }
    });

    $(".left-nav .menu1>ul>li>a").click(function(){
        $(this).addClass('active').parent().siblings().children('a').removeClass('active');
        var i = $(this).attr("index");
        $("#index" + i).removeClass('noShow').siblings().addClass('noShow');
    });

    $(".time_toggle").click(function(){
        if($(this).next().is(":hidden")){
            $(this).next().slideDown(500);
            $(this).children("span:last").removeClass().addClass("show_ico");
        }else{
            $(this).next().hide(500);
            $(this).children("span:last").removeClass().addClass("hide_ico");
        }
    });
    /************************* 创建自定义报告 ***************************/
    $("a:contains('创建自定义报告')").click(function(){
        $(".content_bar a:contains('自定义报告')").parent().addClass('active').siblings().removeClass('active');
        $("#createCP").removeClass('noShow').siblings().addClass('noShow');
    });

    /************************* 概况 ***************************/
    $("a:contains('概况')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
    });

    /************************* 流量 ***************************/
    //流量来源渠道
    $("a:contains('流量来源渠道')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
        var xDataArr = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        var yDataTraArr = [45, 62, 58, 65, 74, 59, 74, 85, 53];
        var yDataVisArr = [25, 42, 38, 45, 54, 39, 54, 65, 33];
        trafficScript.showTraLine(xDataArr, yDataTraArr, yDataVisArr);
    });

    $(".sel_chart ul li a:contains('线图')").click(function () {
        $(".sel_chart .txt").html('线图');
        var xDataArr = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        var yDataTraArr = [45, 62, 58, 65, 74, 59, 74, 85, 53];
        var yDataVisArr = [25, 42, 38, 45, 54, 39, 54, 65, 33];
        trafficScript.showTraLine(xDataArr, yDataTraArr, yDataVisArr);
    });
    $(".sel_chart ul li a:contains('柱状图')").click(function () {
        $(".sel_chart .txt").html('柱状图');
        var xDataArr = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        var yDataTraArr = [45, 62, 58, 65, 74, 59, 74, 85, 53];
        var yDataVisArr = [25, 42, 38, 45, 54, 39, 54, 65, 33];
        trafficScript.showTraBar(xDataArr, yDataTraArr, yDataVisArr);
    });
    $(".sel_chart ul li a:contains('饼图')").click(function () {
        $(".sel_chart .txt").html('饼图');
        var pieData = [
            {value: 335, name: '访问量'},
            {value: 310, name: '访客量'},
            {value: 234, name: '浏览量'},
            {value: 135, name: '跳出率'},
            {value: 1548, name: '平均访问深度'}
        ];
        trafficScript.showTraPie(pieData);
    });
    //查看流量趋势
    $("#trends tr td a:contains('百度')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
        $("#seeTrends").removeClass('noShow').siblings().addClass('noShow');
        trafficScript.showTraSeeTrendLine();
    });
    //页面路径
    $("a:contains('页面路径')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
    });
    //页面上下游
    $("a:contains('页面上下游')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
        trafficScript.setList();
        trafficScript.drawLine_l();
        trafficScript.drawLine_r();
    });

    /************************* 转化 ***************************/
    //转化漏斗
    $(".mid .funnel_bg").each(function(){
        var $f_num = $(this).next().find("span:nth-child(1)");
        var f_num = parseInt($f_num.html());
        var $sum = $(this).parent().parent().prev().find(".mid .tips span:nth-child(2)");
        var sum = parseInt($sum.html());
        var data_per = (f_num/sum * 100).toFixed(2);
        $(this).parent().parent().prev().find(".mid .tips .data_bar>.bar_l").css('width',data_per + '%');
        $(this).parent().parent().prev().find(".mid .tips .data_bar>.bar_r").css('width',(100-data_per) + '%');
        var i = parseInt(data_per/10);
        $(this).css({
            background: 'url("assets/imgs/funnel_' + (i + 1) + '0.gif") no-repeat',
            backgroundSize: '100% 100%'
        });
    });
    $("a:contains('转化漏斗')").click(function(){
        $(".content_bar a:contains('报表')").parent().addClass('active').siblings().removeClass('active');
    });
    /************************* 自定义报告 ***************************/
    $("a:contains('自定义报告')").click(function(){
        $(".content_bar a:contains('自定义报告')").parent().addClass('active').siblings().removeClass('active');
    });
})
