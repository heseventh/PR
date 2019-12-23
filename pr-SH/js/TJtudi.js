///////////////echarts地图////////////////////////////////////////
    var rawDataCJ=dataland[1];
    var data0CJ=dataland[0];
    var keysCJ = Object.keys(rawDataCJ);
    for (var p1 in geoCoordMap) {
         if (rawDataCJ.hasOwnProperty(p1))
         {continue;}
         keysCJ.push(p1);
     }
    var LBavCJ=[];
    for (var i = 0; i < keysCJ.length; i++) {
         var zhongjian = {};
         var dijiahe = 0;
         var jianmhe = 0;
         for (var j = 0; j < data0CJ.length; j++) {
             if (data0CJ[j][5] == '普通商品房' && data0CJ[j][4] == keysCJ[i] && data0CJ[j][9] == "成交") {
                 dijiahe += data0CJ[j][10];
                 jianmhe += data0CJ[j][10] / data0CJ[j][15];
             }
         }
         zhongjian["name"] = keysCJ[i];
         zhongjian["value"] = Math.round(dijiahe / jianmhe);
         LBavCJ.push(zhongjian)
     }

///////成交地图////////////////////////////
    var chartnameCJ="成交";
    var cartnameCJ="cartCJ";
    var optionCJ={};
    var myChartCJ = echarts.init(document.getElementById('map'));
    addmap(myChartCJ,optionCJ, keysCJ, chartnameCJ, LBavCJ, rawDataCJ, data0CJ, cartnameCJ);

///////////待拍地图//////////////////////////
    var rawDataDP=dataland[3];
    var data0DP=dataland[2];
    var keysDP = Object.keys(rawDataDP);
    for (var p1 in geoCoordMap) {
         if (rawDataDP.hasOwnProperty(p1))
         {continue;}
         keysDP.push(p1);
     }
    var chartnameDP="待拍";
    var cartnameDP="cartDP";
    var optionDP={};
    var LBavDP=[];
    for (var i = 0; i < keysDP.length; i++) {
            var zhongjian={};
            var dijiahe=0;
            var jianmhe=0;
        for (var j = 0; j < data0DP.length; j++){
            if(data0DP[j][5]=='普通商品房'&&data0DP[j][4]==keysDP[i]){
                 dijiahe+=data0DP[j][8];
                 jianmhe+=data0DP[j][8]/data0DP[j][14];
            }
        }
         zhongjian["name"]=keysDP[i];
         zhongjian["value"]=Math.round(dijiahe/jianmhe);
         LBavDP.push(zhongjian)
    }
    var myChartDP = echarts.init(document.getElementById('DPmap'));
    addmap(myChartDP,optionDP,keysDP, chartnameDP, LBavDP, rawDataDP, data0DP,cartnameDP);

 function addmap(myChart,option, keys1, chartname, LBavCJ, rawData, data0,cartname) {

     // 市区坐标
     option = {
         title: {
             text: '上海'+chartname+'土地地图',
             subtext: '------Made By H7-----',
             subtextStyle: {
                 fontWeight: 'normal',
                 fontSize: 10,
                 color: '#fff',
             },
             textStyle: {
                 fontWeight: 'normal',
                 fontSize: 20,
                 color: '#fff',
                 fontFamily: 'STXingkai',
             }
         },
         // 地区块儿颜色
         animation: false,
         // 地图背景颜色
         backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
             offset: 0,
             color: '#53695a'
         }, {
             offset: 1,
             color: '#595652'
         }]),
         tooltip: {
             trigger: 'item',
         },
         toolbox: {
             show: true,
             left: 'right',
             top: 'top',
             feature: {
                 //dataView: {readOnly: false},
                 //restore: {},
                 saveAsImage: {}
             }
         },

         geo: {
             map: '上海',
             roam: false,
             zoom: 1.155, // 地图初始大小
             center: [121.485986, 31.277283], // 初始中心位置
             itemStyle: {
                 normal: {
                     borderColor: 'rgba(0, 0, 0, 0.2)'
                 },
                 emphasis: {
                     areaColor: '#F3B329',//鼠标选择区域颜色
                     shadowOffsetX: 0,
                     shadowOffsetY: 0,
                     shadowBlur: 20,
                     borderWidth: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
             }
         },
         series: []
     };
     myChart.setOption(option);

     function renderEachCity() {
         var option1 = {
             xAxis: [],
             yAxis: [],
             grid: [],
             series: [{
                 name: '土地价格',
                 type: 'map',
                 geoIndex: 0,
                 data: LBavCJ,
             }],
             visualMap: {
                 seriesIndex: 0,
                 left: 'right',
                 min: 10000,
                 max: 60000,
                 inRange: {
                     color: ['#6ec1ca', '#d6ff5f', '#e2240c'],
                 },
                 text: ['', '宅地单价'],           // 文本，默认为数值文本
                 textStyle: {
                     fontWeight: 'normal',
                     fontSize: 10,
                     color: '#fff'
                 },
                 calculable: true,
                 itemWidth: 15,                           //图形的宽度，即长条的宽度。
                 itemHeight: 100,                         //图形的高度，即长条的高度。
             },
         };
         echarts.util.each(rawData, function (dataItem, idx) {
             var geoCoord = geoCoordMap[idx];
             var coord = myChart.convertToPixel('geo', geoCoord);
             idx += '';
             inflationData = dataItem;
             option1.xAxis.push({
                 id: idx,
                 gridId: idx,
                 type: 'category',
                 name: idx,
                 nameLocation: 'middle',
                 nameGap: 3,
                 textStyle: {
                     fontWeight: 'normal',
                     fontSize: 30,
                     color: '#050412',
                     fontFamily: 'STXingkai',
                 },
                 splitLine: {
                     show: false
                 },
                 axisTick: {
                     show: false
                 },
                 axisLabel: {
                     show: false
                 },
                 axisLine: {
                     onZero: false,

                     lineStyle: {
                         color: '#666'
                     }
                 },
                 // data: xAxisCategory,
                 data: ["成交宗数", "成交面积", "成交额"],
                 z: 100
             });
             option1.yAxis.push({
                 id: idx,
                 gridId: idx,
                 splitLine: {
                     show: false
                 },
                 axisTick: {
                     show: false
                 },
                 axisLabel: {
                     show: false
                 },
                 axisLine: {
                     show: false,
                     lineStyle: {
                         color: '#f8fdff'
                     }
                 },
                 z: 100
             });
             option1.grid.push({
                 id: idx,
                 width: 30,
                 height: 40,
                 left: coord[0] - 15,
                 top: coord[1] - 15,
                 z: 100
             });
             option1.series.push({
                 id: idx,
                 type: 'bar',
                 xAxisId: idx,
                 yAxisId: idx,
                 barGap: 0,
                 barCategoryGap: 0,
                 data: inflationData,
                 z: 100,
                 itemStyle: {
                     normal: {
                         color: function (params) {
                             // 柱状图每根柱子颜色
                             var colorList = ['#15938c', '#e8c425', '#ff1a02'];
                             return colorList[params.dataIndex];
                         }
                     }
                 },
                 legend: {
                     show: true,
                     data: [{name: '成交宗数',},
                            {name: '成交面积',},
                            {name: '成交金额',}]
                 }
             });
         });
         console.time('a');
         myChart.setOption(option1);
         console.timeEnd('a');

     }

     setTimeout(renderEachCity, 0);

     // 缩放和拖拽
     function throttle(fn, delay, debounce) {
         var currCall;
         var lastCall = 0;
         var lastExec = 0;
         var timer = null;
         var diff;
         var scope;
         var args;
         delay = delay || 0;

         function exec() {
             lastExec = (new Date()).getTime();
             timer = null;
             fn.apply(scope, args || []);
         }

         var cb = function () {
             currCall = (new Date()).getTime();
             scope = this;
             args = arguments;
             diff = currCall - (debounce ? lastCall : lastExec) - delay;
             clearTimeout(timer);
             if (debounce) {
                 timer = setTimeout(exec, delay);
             } else {
                 if (diff >= 0) {
                     exec();
                 } else {
                     timer = setTimeout(exec, -diff);
                 }
             }

             lastCall = currCall;
         };
         return cb;
     }

     var throttledRenderEachCity = throttle(renderEachCity, 3);
     myChart.on('geoRoam', throttledRenderEachCity);
     myChart.setOption(option);


//////////添加点击反馈////////////

     for (var i = 0; i < keys1.length; i++) {
         addtab(data0,cartname, keys1[i]);
     }
     myChart.on('click', function (param) {
         if (typeof param.seriesId != 'undefined') {
             if (geoCoordMap.hasOwnProperty(param.seriesId)) {
                 deltab(cartname);
                 addtab(data0, cartname, param.seriesId);
             }

         }
     });

//////////添加数据的函数////////////
     function addtab(data, cartname, index) {
         // 第二步:获取table列表并用forEach写入到列表中
         var cart = document.getElementById(cartname);
         var tbody = cart.children[1];
         data.forEach(function (value) {
             //console.log(value);
             var tr = document.createElement('tr');
             if (value[4] == index&&cartname.indexOf('CJ')>0) {
                 tr.innerHTML = '<td>' + value[1] + '</td>';
                 tr.innerHTML += '<td>' + value[2] + '</td>';
                 tr.innerHTML += '<td>' + value[3] + '</td>';
                 tr.innerHTML += '<td>' + value[5] + '</td>';
                 tr.innerHTML += '<td>' + value[6] + '</td>';
                 tr.innerHTML += '<td>' + value[7] + '</td>';
                 tr.innerHTML += '<td>' + value[8] + '</td>';
                 tr.innerHTML += '<td>' + value[10] + '</td>';
                 tr.innerHTML += '<td>' + value[11] + '</td>';
                 tr.innerHTML += '<td>' + value[12] + '</td>';
                 tr.innerHTML += '<td>' + value[14] + '</td>';
                 tr.innerHTML += '<td>' + value[15] + '</td>';
                 tbody.appendChild(tr);
             }else if (value[4] == index&&cartname.indexOf('DP')>0) {
                 tr.innerHTML='<td>'+ value[1]+'</td>';
                 tr.innerHTML += '<td>'+ value[2]+'</td>';
                 tr.innerHTML += '<td>'+ value[3]+'</td>';
                 tr.innerHTML += '<td>'+ value[5]+'</td>';
                 tr.innerHTML += '<td>'+ value[6]+'</td>';
                 tr.innerHTML += '<td>'+ value[7]+'</td>';
                 tr.innerHTML += '<td>'+ value[8]+'</td>';
                 tr.innerHTML += '<td>'+ value[14]+'</td>';
                 tbody.appendChild(tr);
             }
         })
     }

////////删除表格函数///////////
     function deltab(cartname) {
         var table_body = document.getElementById(cartname);
         var trs = table_body.getElementsByTagName("tr");
         for (var i = trs.length - 1; i > 0; i--) {
             table_body.deleteRow(i);
         }
     }
 }


//////////添加echarts柱状图///////////
var myChartCJzz = echarts.init(document.getElementById('chart_alarm'));
var optionCJzz={};
addzzt(myChartCJzz, rawDataCJ, optionCJzz,keysCJ,chartnameCJ);

var myChartDPzz = echarts.init(document.getElementById('chart_alarmDP'));
var optionDPzz={};
addzzt(myChartDPzz, rawDataDP, optionDPzz,keysDP,chartnameDP);
function addzzt(myChart, rawData, optionzz, keys1, chartname){
    optionzz = {
    title : {
        text: '上海'+chartname+'土地分析',
        subtext: '-----Made By H7-----',
        subtextStyle:{
                fontWeight: 'normal',
                fontSize: 10,
                color: '#000000',
            },
        textStyle: {
                fontWeight: 'normal',
                fontSize: 20,
                color: '#000000',
                fontFamily:'STXingkai',
            }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        x:'right',
        padding:30,
        textStyle:{
             fontSize: 12,//字体大小
             color: '#000000'//字体颜色
                        },
        data:['宗数','面积(十万)','宅地单价']
    },
    toolbox: {
        show : true,
        feature : {
            //dataView : {show: true, readOnly: false},
           // magicType : {show: true, type: ['line', 'bar']},
            //restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type: 'category',
            data: keys1,
            axisLabel: {
                interval: 0,
                formatter:function(value) {
                      return value.split("").join("\n");
                 },
                show: true,
                textStyle: {
                    fontSize: 10,//字体大小
                    color: '#1d2217'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        },
                {
            type : 'value'
        }
    ],
    series : [
        {
            name:'宗数',
            type:'bar',
            yAxisIndex: '0',
            itemStyle: {
                    normal: {
                         color: '#10797a',
                                }
                            },
            data:getData(rawData,0),
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'面积(十万)',
            type:'bar',
            yAxisIndex: '0',
            itemStyle: {
                    normal: {
                         color: '#f78a02',
                                }
                            },
            data:getData(rawData,1),
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        },
        {
            name:'宅地单价',
            yAxisIndex: '1',
            type:'scatter',
            symbolSize: 10,
            itemStyle: {
                    normal: {
                         color: '#f72717',
                        ///label: {
                        ///    show: true,
                        ///    position: 'top',
                        ///    formatter: '{b}\n{c}'
                        ///           }
                                }
                            },
            data:LBavCJ,
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};

myChart.setOption(optionzz);
function  getData(data,x){
      var shuju = [];                
      for(i=0;i<keys1.length;i++){
          var forxun=keys1[i];
          if(data.hasOwnProperty(forxun)){
              shuju.push(data[forxun][x]);
          }
          else{
             shuju.push(0);
          }
     } 
      return shuju      
}
}


var bdmapCJ = new BMap.Map('tudimap');
addbdmap(bdmapCJ, rawDataCJ, data0CJ);
var bdmapDP = new BMap.Map('tudimapDP');
addbdmap(bdmapDP, rawDataDP, data0DP);
function addbdmap(map, rawData, data0){
    var markerArr = [{title : "", content:"",point:"",isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}];
	map.centerAndZoom(new BMap.Point(121.506377,31.245105), 10);
    map.enableScrollWheelZoom(true);
    ///map.disableScrollWheelZoom();//禁止缩放
	//map.setMapStyleV2({styleJson:styleJsonheihei});
	addever(data0);
    function addever(rearray) { //添加
                for (var j = 0; j < rearray.length; j++) {
                    var json = markerArr[0];
                    var point = new BMap.Point(rearray[j][16], rearray[j][17]);
                    var iconImg = createIcon(json.icon);
                    var marker = new BMap.Marker(point, {icon: iconImg});
                    var label = new BMap.Label(rearray[j][1], {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    label.setStyle({
                        borderColor: "#808080",
                        color: "#333",
                        cursor: "pointer"
                    });
                    (function () {
                        var _iw = createInfoWindow(rearray[j]);
                        var _marker = marker;
                        _marker.addEventListener("click", function () {
                            this.openInfoWindow(_iw);
                        });
                        _iw.addEventListener("click", function () {
                            _marker.getLabel().hide();
                        });
                        _iw.addEventListener("close", function () {
                            _marker.getLabel().show();
                        });
                        label.addEventListener("click", function () {
                            _marker.openInfoWindow(_iw);
                        });
                    })()
                }
    }

    //创建InfoWindow
    function createInfoWindow(rearray){
        var opts = {
			width: 210, // 信息窗口宽度
			};
        var iw = new BMap.InfoWindow("<b style=\"color:#2813ff;font-size:12px;\" class='iw_poi_title' title='"  + "'>"
            + rearray[1] + "</b><div style=\"font-size:12px\" class='iw_poi_content'>"+
            "<tr><td >用途："+rearray[5]+"<br/>"+
            "<tr><td >占地："+rearray[6]+"㎡<br/>"+
            "<tr><td >容积率："+rearray[7]+"<br/>"+
            "<tr><td >起始价："+rearray[8]+"万<br/>"+
            "<tr><td >成交价："+rearray[10]+"万<br/>"+
            "<tr><td >楼板价："+rearray[15]+"<br/>"+
            "<tr><td >竞得人："+rearray[11]+"<br/>"+
            "<tr><td >成交日期："+rearray[12]+"<br/>"+
            "</div>", opts);

        return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    }