/**
 * Created by zhangw on 2015-12-23.
 */
function loadMap(options){
    var nodes = [
        { course: "1",fixed:true,id:"32",index:0,prop:{course:"1",name:"MySQL入门",subject:"mysql"},x:210.5,y:384.5},
        { course: "2",id:"0",index:2,prop:{course:"2",name:"Node.js入门",subject:"node.js"}},
        { course: "3",id:"8",index:1,prop:{course:"3",name:"MongoDB",subject:"mongodb"}},
        { course: "4",id:"16",index:1,prop:{course:"4",name:"C语言基础（一）",subject:"c"}},
        { course: "5",id:"19",index:1,prop:{course:"5",name:"javascript基础",subject:"javascript"}},
        { course: "6",id:"37",index:1,prop:{course:"6",name:"Redis入门",subject:"redis"}},
        { course: "7",id:"53",index:1,prop:{course:"7",name:"Meteor开发平台入门",subject:"meteor"}},
        { course: "8",id:"57",index:1,prop:{course:"8",name:"测试利器Mocha",subject:"node.js"}},
        { course: "9",id:"58",index:1,prop:{course:"9",name:"Gulp",subject:"node.js"}},
        { course: "10",id:"1",index:1,prop:{course:"10",name:"Express框架",subject:"node.js"}},
        { course: "11",id:"4",index:1,prop:{course:"11",name:"异步编程",subject:"node.js"}},
        { course: "12",id:"5",index:1,prop:{course:"12",name:"Mongoose",subject:"node.js"}},
        { course: "13",id:"6",index:1,prop:{course:"13",name:"实时通讯Socket.io",subject:"node.js"}},
        { course: "14",id:"29",index:2,prop:{course:"14",name:"Python语言基础",subject:"python"}},
        { course: "15",id:"56",index:1,prop:{course:"15",name:"Flask框架",subject:"python"}},
        { course: "16",id:"43",index:2,prop:{course:"16",name:"C# 基础入门",subject:"c#"}},
        { course: "17",id:"27",index:1,prop:{course:"17",name:"UML基础",subject:"uml"}},
        { course: "18",id:"54",index:1,prop:{course:"18",name:"Git",subject:"git"}},
        { course: "19",id:"44",index:1,prop:{course:"19",name:"C# 进阶",subject:"c#"}},
        { course: "20",id:"49",index:2,prop:{course:"20",name:"PHP 起步篇",subject:"php"}},
        { course: "21",id:"26",index:1,prop:{course:"21",name:"Nginx入门",subject:"nginx"}},
        { course: "22",id:"23",index:1,prop:{course:"22",name:"HTML5",subject:"html"}},
        { course: "23",id:"50",index:1,prop:{course:"23",name:"PHP 提高篇",subject:"php"}},
        { course: "24",id:"33",index:2,prop:{course:"24",name:"PHP 提高篇",subject:"mysql"}}
    ];

    var links = [
        { desc:"数据存储", source : 0  , target: 1 , type: "REL"} ,
        { desc:"数据存储", source : 2  , target: 1 , type: "REL"} ,
        { desc:"开发模块", source : 3  , target: 1 , type: "REL"} ,
        { desc:"应用", source : 4  , target: 1 , type: "REL"} ,
        { desc:"数据存储", source : 5  , target: 1 , type: "REL"} ,
        { desc:"集成开发", source : 6  , target: 1 , type: "REL"} ,
        { desc:"测试框架", source : 7  , target: 1 , type: "REL"} ,
        { desc:"项目构建", source : 8  , target: 1 , type: "REL"} ,
        { desc:"进阶", source : 1  , target: 9 , type: "NEXT"} ,
        { desc:"进阶", source : 1  , target: 10 , type: "NEXT"} ,
        { desc:"操作数据库", source : 1  , target: 11 , type: "NEXT"} ,
        { desc:"实时通讯", source : 1  , target: 12 , type: "NEXT"} ,
        { desc:"数据存储", source : 0  , target: 13 , type: "REL"} ,
        { desc:"数据存储", source : 2  , target: 13 , type: "REL"} ,
        { desc:"数据存储", source : 5  , target: 13 , type: "REL"} ,
        { desc:"进阶", source : 13  , target: 14 , type: "NEXT"} ,
        { desc:"数据存储", source : 0  , target: 15 , type: "REL"} ,
        { desc:"建模", source : 16  , target: 15 , type: "REL"} ,
        { desc:"数据存储", source : 5  , target: 15 , type: "REL"} ,
        { desc:"项目管理", source : 15  , target: 17 , type: "REL"} ,
        { desc:"进阶", source : 15  , target: 18 , type: "NEXT"} ,
        { desc:"数据存储", source : 0  , target: 19 , type: "REL"} ,
        { desc:"数据存储", source : 5  , target: 19 , type: "REL"} ,
        { desc:"网站运维", source : 19  , target: 20 , type: "REL"} ,
        { desc:"项目管理", source : 19  , target: 17 , type: "REL"} ,
        { desc:"应用", source : 21  , target: 19 , type: "NEXT"} ,
        { desc:"进阶", source : 19  , target: 22 , type: "NEXT"} ,
        { desc:"进阶", source : 0  , target: 23 , type: "NEXT"}
    ];

    var color   = ['#1f77b4','#ff7f0e', '#2ca02c','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'],
        w       = options.width,
        h       = options.height,
        holder  = d3.select('#mapRow').append('svg').attr({ id:'map', width:w,height:h }),
        vis     = holder.append('g');
    var drag = d3.behavior.zoom().on('zoom', function() {
        vis.attr('transform','translate('+d3.event.translate+') scale('+d3.event.scale+')');
    });
    holder.call(drag);
    var force = d3.layout.force();
    force.on('tick', function(){
        vis.selectAll('line.link').each(function(d){
            var $this = d3.select(this),x1,x2,y1,y2;
            if(d.type == 'NEXT'){
                var deltaX = d.target.x - d.source.x,
                    deltaY = d.target.y - d.source.y,
                    dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                    normX = deltaX / dist,
                    normY = deltaY / dist,
                    sourcePadding = 35,
                    targetPadding = 35;
                x1 = d.source.x + (sourcePadding * normX);
                x2 = d.target.x - (targetPadding * normX);
                y1 = d.source.y + (sourcePadding * normY);
                y2 = d.target.y - (targetPadding * normY);
                $this.attr('marker-end','url(#arrow)');
            }else{
                x1 = d.source.x;
                y1 = d.source.y;
                x2 = d.target.x;
                y2 = d.target.y;
            }
            $this.attr('x1',x1);
            $this.attr('x2',x2);
            $this.attr('y1',y1);
            $this.attr('y2',y2);
        });
        vis.selectAll('g.node').selectAll('circle.ring').attr({
            'cx':function(d) { return d.x;},
            'cy':function(d) { return d.y; }
        });
        vis.selectAll('g.node').selectAll('circle.outline').attr({
            'cx':function(d) { return d.x;},
            'cy':function(d) { return d.y; }
        }) ;
        vis.selectAll('g.node').selectAll('text').attr({
            'x':function(d) { return d.x - 35; },
            'y':function(d) { return d.y - 35; }
        });
        desc.attr({
            x:function(d){ return (d.source.x + d.target.x) / 2 - 25  ; },
            y:function(d){ return (d.source.y + d.target.y) / 2 + 5 ; },
            transform:function(d){
                var diff_x = d.target.x - d.source.x,
                    diff_y = d.target.y - d.source.y;
                var p = 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
                var cx = (d.target.x + d.source.x)/2,
                    cy = (d.target.y + d.source.y)/2;
                return 'rotate('+p+','+cx+','+cy+')';
            }
        });
    })
        .charge(-1300)
        .linkDistance(200)
        .nodes(nodes)
        .links(links)
        .size([w, h]).alpha(0.1);
    holder.append('svg:defs').append('svg:marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#6ac6ff');
    vis.selectAll('line.link').data(links).enter()
        .append('line')
        .attr('class', 'link');
    var desc = vis.selectAll('link.desc')
        .data(links)
        .enter()
        .append('text')
        .attr('class','desc')
        .text(function(d){
            return  d.desc;
        });
    var node = vis.selectAll('g.node').data(nodes);
    var group = node.enter().append('g')
            .attr('class',function(d,i){
                return i===0?'node active':'node';
            })
    /*.on('click', function(d){
     var $this = d3.select(this);
     if($this.attr('class') !== 'node') return;
     d3.selectAll('.node').attr('class',function(d1){
     return d1.course === d.course ?'node active':'node';
     });
     getCourse(d.course);
     })
     .on('dblclick',function(d){
     options.course = d.course;
     loadMap(options);
     })*/;

    group.append('circle').attr({ r:29,'class':'ring' });
    group.append('circle').attr({ r:25,'class':'outline'})
        .style({
            'fill':function(d){ return  color[d.index]; },
            'stroke':'#5CA8DB',
            'stroke-width':'2px'
        });
    group.append('text').text(function(d){ return d.prop.name; }).style('fill','black');

    force.start();
    for(var i = 0;i<50;i++){
        force.tick();
    }
    var s = setInterval(function(){
        if(force.alpha()<0.01){
            clearInterval(s);
        }else{
            force.tick();
        }
    },80);
}