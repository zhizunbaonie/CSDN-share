
var BIECharts = {
    //Loading ECharts configuration files
    Config: function (container, option) {
        var chart_path = "libs/echarts-2.2.5/build/dist/echarts";
        require.config({
            paths: {
                echarts: chart_path,
                'echarts/chart/bar': "libs/echarts-2.2.5/build/dist/chart/bar",
                'echarts/chart/pie': "libs/echarts-2.2.5/build/dist/chart/pie",
                'echarts/chart/line': "libs/echarts-2.2.5/build/dist/chart/line",
                'echarts/chart/funnel': "libs/echarts-2.2.5/build/dist/chart/funnel",
                'echarts/chart/map': "libs/echarts-2.2.5/build/dist/chart/map"
            }
        });

        this.option = { chart: {}, option: option, container: container };
        return this.option;
    },

    //Initialize the chart types in common use
    ChartOptionTemplates: {
        LinesForBI: function (xData ,yDataTra, yDataVis) {
            option = {
                title : {
                    text: '',
                    textStyle:{
                        fontSize: 14
                    },
                    subtext: ''
                },
                legend: {
                    x:'70%',
                    data:['流量','访问量']
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer :{
                        type : 'line',
                        lineStyle : {
                            width: 2
                        }
                    }
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        splitNumber : 30,
                        splitLine : {
                            show: false
                        },
                        axisLine :{
                            show : false
                        },
                        data : xData
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitLine : {
                            show: true,
                            onGap: true
                        },
                        axisLine :{
                            show : false
                        }
                    }
                ],
                grid : {
                    x : '4%',
                    x2 : '7%',
                    width : '86%',
                    y : '10%',
                    height : '70%',
                    y2 : '15%',
                    borderWidth:'0'

                },

                series : [
                    {
                        name:'流量',
                        type:'line',
                        symbol:'circle',
                        symbolSize:2,
                        calculable:false,
                        itemStyle: {
                            normal: {
                                color: '#53a67a',
                                lineStyle: {
                                    shadowColor : 'rgba(0,0,0,0.4)',
                                    width :2
                                }
                            }
                        },
                        data:yDataTra
                    },
                    {
                        name:'访问量',
                        type:'line',
                        symbol:'circle',
                        symbolSize:2,
                        calculable:false,
                        itemStyle: {
                            normal: {
                                color: '#e44621',
                                lineStyle: {
                                    shadowColor : 'rgba(0,0,0,0.4)',
                                    width :2
                                }
                            }
                        },
                        data:yDataVis
                    }
                ]
            };
            return option;
        },
        BarsForBI: function (xData, yDataTra, yDataVis) {
            option = {
                title : {
                    text: '',
                    textStyle:{
                        fontSize: 14
                    },
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['流量','访问量']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : xData
                    }
                ],
                yAxis : [
                    {
                        type: 'value',
                        splitLine : {
                            show: true,
                            lineStyle : {
                                color:'#CCCCCC',
                                type:'dotted',
                                //shadowColor:rgba(0,0,0,0),
                                width:1
                            }
                        },
                        splitNumber : 4,
                        axisLine :{
                            show : false
                        }
                    }
                ],
                grid : {
                    x : '7%',
                    x2 : '7%',
                    width : '86%',
                    y : '10%',
                    height : '70%',
                    y2 : '15%',
                    borderWidth:'0'

                },
                series : [
                    {
                        name:'流量',
                        type:'bar',
                        itemStyle: {
                            normal: {
                                color: '#2ec8ca'
                            }
                        },
                        calculable:false,
                        barCategoryGap:'60%',
                        barWidth:20,
                        data:yDataTra
                    },
                    {
                        name:'访问量',
                        type:'bar',
                        itemStyle: {
                            normal: {
                                color: '#b6a2df'
                            }
                        },
                        calculable:false,
                        barCategoryGap:'60%',
                        barWidth:20,
                        data:yDataVis
                    }
                ]
            };
            return option;
        },
        PiesForBI: function (pieData) {
            option = {
                title : {
                    text: '',
                    textStyle:{
                        fontSize: 14
                    },
                    subtext: ''
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['访问量','访客量','浏览量','跳出率','平均访问深度']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: pieData
                    }
                ]
            };
            return option;
        },
        mapChart : function(mapData1){
            option = {
                title : {
                    text: '中国文化数据库',
                    // subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {                      // 是否启用图例
                    orient: 'vertical',
                    x:'left',
                    data:['笔','墨','纸']
                },
                dataRange: {               //值域范围 左下角那个范围值
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                toolbox: {                      // 工具提示 true/false
                    show: false,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                roamController: {       //缩放漫游组件，仅对地图有效（右侧方向箭头）
                    show: false,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : [
                    {
                        name: '笔',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:mapData1
                    },
                    {
                        name: '墨',
                        type: 'map',
                        mapType: 'china',
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '重庆',value: Math.round(Math.random()*1000)},
                            {name: '河北',value: Math.round(Math.random()*1000)},
                            {name: '安徽',value: Math.round(Math.random()*1000)},
                            {name: '新疆',value: Math.round(Math.random()*1000)},
                            {name: '浙江',value: Math.round(Math.random()*1000)},
                            {name: '江西',value: Math.round(Math.random()*1000)},
                            {name: '山西',value: Math.round(Math.random()*1000)},
                            {name: '内蒙古',value: Math.round(Math.random()*1000)},
                            {name: '吉林',value: Math.round(Math.random()*1000)},
                            {name: '福建',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '西藏',value: Math.round(Math.random()*1000)},
                            {name: '四川',value: Math.round(Math.random()*1000)},
                            {name: '宁夏',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    },
                    {
                        name: '纸',
                        type: 'map',
                        mapType: 'china',
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '台湾',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    }
                ]
            };
            return option;
        }
    },

    //Render the chart
    Charts: {
        RenderChart: function (option,divId, eConsole) {
            require([
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar',
                    'echarts/chart/pie',
                    'echarts/chart/funnel',
                    'echarts/chart/map'
                ],
                function (ec) {
                    echarts = ec;
                    var myChart = ec.init(divId);
                    myChart.setOption(option);
                    window.onresize = myChart.resize;
                    var ecConfig = require('echarts/config');
                    myChart.on(ecConfig.EVENT.CLICK, eConsole);
                });
        }
    }

}
