/**
 * Created by zhangw on 2015-8-18.
 */
var general = {
    commonConfAjax: function (requestXML) {
        var responseXML;
        jQuery.ajax({
            type: 'POST',
            url: '/admin/_conf.jsp',
            async: false,
            data: requestXML,
            dataType: 'xml',
            success: function (rspData) {
                responseXML = rspData;
            },
            error: function () {
                console.log("Send Ajax error ...")
            }
        });
        return responseXML
    },
    HandelData: function(){
        var data = this.commonConfAjax();
        var arr = [];

        //

        return arr;
    },
    showGeneLine : function() {
        var $gen_div = $("#general");
        var mapData1 = this.HandelData();
        /*[
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
        var option = BIECharts.ChartOptionTemplates.mapChart(mapData1);
        /*var xDataArr = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        var yDataTraArr = [45, 62, 58, 65, 74, 59, 74, 85, 53];
        var yDataVisArr = [25, 42, 38, 45, 54, 39, 54, 65, 33];*/
        //var option = BIECharts.ChartOptionTemplates.LinesForBI(xDataArr, yDataTraArr, yDataVisArr);
        var opt = BIECharts.Config($gen_div[0], option);
        var eConsole = function(param){
            alert(param);
            alert(11);
        };
        BIECharts.Charts.RenderChart(option, $gen_div[0],eConsole);
    }
}

