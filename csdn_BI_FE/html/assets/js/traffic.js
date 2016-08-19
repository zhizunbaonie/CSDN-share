/**
 * Created by zhangw on 2015-8-18.
 */
trafficScript = {
    //流量来源渠道
    showTraLine: function (xDataArr, yDataTraArr, yDataVisArr) {
        var $chart_div = $("#traffic_chart");
        var option = BIECharts.ChartOptionTemplates.LinesForBI(xDataArr, yDataTraArr, yDataVisArr);
        BIECharts.Config($chart_div[0], option);
        BIECharts.Charts.RenderChart(option, $chart_div[0]);
    },
    showTraBar: function (xDataArr, yDataTraArr, yDataVisArr) {
        var $chart_div = $("#traffic_chart");
        var option = BIECharts.ChartOptionTemplates.BarsForBI(xDataArr, yDataTraArr, yDataVisArr);
        BIECharts.Config($chart_div[0], option);
        BIECharts.Charts.RenderChart(option, $chart_div[0]);
    },
    showTraPie: function (pieData) {
        var $chart_div = $("#traffic_chart");
        var option = BIECharts.ChartOptionTemplates.PiesForBI(pieData);
        BIECharts.Config($chart_div[0], option);
        BIECharts.Charts.RenderChart(option, $chart_div[0]);
    },
    //trafficseetrends
    showTraSeeTrendLine : function(){
        var $tst_div = $("#tr_see_trend");
        /*var mapData1 = [
            {name: '北京',value: Math.round(Math.random()*1000)},
            {name: '天津',value: Math.round(Math.random()*1000)},
            {name: '上海',value: Math.round(Math.random()*1000)},
            {name: '重庆',value: Math.round(Math.random()*1000)},
            {name: '河北',value: Math.round(Math.random()*1000)},
            {name: '河南',value: Math.round(Math.random()*1000)},
            {name: '云南',value: Math.round(Math.random()*1000)},
            {name: '辽宁',value: Math.round(Math.random()*1000)},
            {name: '黑龙江',value: Math.round(Math.random()*1000)},
            {name: '湖南',value: Math.round(Math.random()*1000)},
            {name: '安徽',value: Math.round(Math.random()*1000)},
            {name: '山东',value: 50},
            {name: '新疆',value: Math.round(Math.random()*1000)},
            {name: '江苏',value: Math.round(Math.random()*1000)},
            {name: '浙江',value: Math.round(Math.random()*1000)},
            {name: '江西',value: Math.round(Math.random()*1000)},
            {name: '湖北',value: Math.round(Math.random()*1000)},
            {name: '广西',value: Math.round(Math.random()*1000)},
            {name: '甘肃',value: Math.round(Math.random()*1000)},
            {name: '山西',value: Math.round(Math.random()*1000)},
            {name: '内蒙古',value: Math.round(Math.random()*1000)},
            {name: '陕西',value: Math.round(Math.random()*1000)},
            {name: '吉林',value: Math.round(Math.random()*1000)},
            {name: '福建',value: Math.round(Math.random()*1000)},
            {name: '贵州',value: Math.round(Math.random()*1000)},
            {name: '广东',value: Math.round(Math.random()*1000)},
            {name: '青海',value: Math.round(Math.random()*1000)},
            {name: '西藏',value: Math.round(Math.random()*1000)},
            {name: '四川',value: Math.round(Math.random()*1000)},
            {name: '宁夏',value: Math.round(Math.random()*1000)},
            {name: '海南',value: Math.round(Math.random()*1000)},
            {name: '台湾',value: Math.round(Math.random()*1000)},
            {name: '香港',value: Math.round(Math.random()*1000)},
            {name: '澳门',value: Math.round(Math.random()*1000)}
        ];*/
        var xDataArr = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        var yDataTraArr = [45, 62, 58, 65, 74, 59, 74, 85, 53];
        var yDataVisArr = [25, 42, 38, 45, 54, 39, 54, 65, 33];
        var option = BIECharts.ChartOptionTemplates.LinesForBI(xDataArr,yDataTraArr,yDataVisArr);
        //var option = BIECharts.ChartOptionTemplates.mapChart(mapData1);
        var opt = BIECharts.Config($tst_div[0], option);
        BIECharts.Charts.RenderChart(option,$tst_div[0]);
    },
    //页面上下游
    setList: function(){
        var $item_l_h = $(".items_l ul").height() + 20;
        var $item_m_h = $(".items_m ul").height() + 20;
        var $item_r_h = $(".items_r ul").height() + 20;
        var max_h = $item_l_h > $item_r_h ? $item_l_h : $item_r_h;
        $(".lines>canvas").attr('height',max_h);
        var itemLM_val = Math.ceil((max_h - $item_l_h)/2);
        var itemMM_val = Math.ceil((max_h - $item_m_h)/2);
        var itemRM_val = Math.ceil((max_h - $item_r_h)/2);
        if($item_l_h < max_h){
            $(".items_l").css('margin-top',itemLM_val + 'px');
            $(".items_m").css('margin-top',itemMM_val + 'px');
        }
        if($item_r_h < max_h){
            $(".items_m").css('margin-top',itemMM_val + 'px');
            $(".items_r").css('margin-top',itemRM_val + 'px');
        }
    },
    drawLine_l: function(){
        var canvas = document.getElementById('canvas_l');
        if (canvas === null) {
            return false;
        }
        var context = canvas.getContext("2d");
        if(!context){
            alert("Your browser does not support canvas.");
            return;
        }
        context.strokeStyle = 'rgb(71,195,185)';
        context.beginPath();
        var y1 = parseInt($(".items_l").css('margin-top')) + 15 + 15;
        var len_l = $(".items_l ul>li").length;
        var cell = parseInt(30/(len_l+1));
        var y2 = parseInt($(".items_m").css('margin-top')) + 15 + cell;
        for(var i= 0;i<len_l;i++){
            context.moveTo(0, i * 45 + y1);
            context.lineTo(100, i * cell + y2);
        }
        context.stroke();
        context.closePath();
    },
    drawLine_r: function(){
        var canvas = document.getElementById('canvas_r');
        if (canvas === null) {
            return false;
        }
        var context = canvas.getContext("2d");
        if(!context){
            alert("Your browser does not support canvas.");
            return;
        }
        context.strokeStyle = 'rgb(71,195,185)';
        context.beginPath();
        var len_l = $(".items_r ul>li").length;
        var cell = parseInt(30/(len_l+1));
        var y1 = parseInt($(".items_m").css('margin-top')) + 15 + cell;
        var y2 = parseInt($(".items_r").css('margin-top')) + 15 + 15;
        for(var i= 0;i<len_l;i++){
            context.moveTo(0, i * cell + y1);
            context.lineTo(100, i * 45 + y2);
        }
        context.stroke();
        context.closePath();
    }
}

