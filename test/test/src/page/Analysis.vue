<template>
  <el-container style="height: 100%;background-color: #252525">
    <el-header style="padding: 0;">
      <Header/>
    </el-header>
    <el-container style="height: 100%;background-color: #252525">
      <el-aside style="padding-top:90px">
        <div class="block" >
          <el-date-picker
            align="right"
            type="date"
            placeholder=" Select Data"
            style="font-size: 22px;"
            v-model="valueTime"
            default-value = "2016-6-1"
            :picker-options="pickerOptions">
          </el-date-picker>
          <br>
          <div>
            <el-checkbox v-model="checked" style="padding-top: 20px;margin-left: 5px;font-size: 20px;font-weight: 700" @change="handleChange"><div>Partition Visible</div></el-checkbox>
            <br>
          </div>
          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Play</el-button>
        </div>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="1-1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              style="left: 25px;font-weight: 700">
              <el-submenu default-active="1-1" index="1" style="width: 250px;background-color: #252525">
                <template slot="title">
                  <span style="color: #eeeeee;font-size: 20px" class="item-title">Data Visualization</span>
                </template>
                <el-menu-item style="font-size: 18px" index="1-1" @click="scatterP">Scatter Plot</el-menu-item>

                <el-menu-item style="font-size: 18px;padding-left: 40px" index="1-2" @click="Choropleth">Choropleth Map</el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 35px" index="1-3" @click="Heatmap">Heat
                  Map</el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 35px" index="1-4" @click="threeD">3D Map</el-menu-item>

<!--                <el-menu-item style="font-size: 18px;padding-left: 20px" index="1-2">Thermodynamic Diagram</el-menu-item>-->
<!--                <el-menu-item style="font-size: 18px;padding-left: 5px" index="1-3" @click="threeD">3D Diagram</el-menu-item>-->

              </el-submenu>
              <el-submenu index="2" style="width: 250px;background-color: #252525">
                <template slot="title">
                  <span style="color: #eeeeee;font-size: 20px" class="item-title">Data Analysis</span>
                </template>
                <el-menu-item style="font-size: 18px;padding-left: 5px">Holidays and Working Days</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main style="padding-top: 70px;margin: 0;position: relative">
        <div id="map" style="border-radius: 10px;box-shadow: 0 2px 5px black">
          <el-slider
            v-model="valueSlider"
            max="22"
            :step="1"
            show-stops>
          </el-slider>
          <div style="height:90px;left:50px;top:75px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px" id="NumberRequest"><div class="numberBoard">Number of Request</div><br><div id="requestNumber"style="color: #fd4949;top:55px;left:100px;position: absolute;font-size: 23px">200</div></div>
          <div style="right:0px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px" id="currentTime">Date Time: 2016-6-1 8:00</div>
          <div id="choosePD" style="visibility: visible">
            <div style="bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
              <div style="background-color:#FF0000;bottom:5px;right:115px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
              <el-checkbox v-model="pickup"
                         @change="handleChangePickup"><div style="font-weight:700;">Pick Up</div></el-checkbox>
            </div>
            <div style="bottom:150px;right:85px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
              <div style="background-color:#007cbf;bottom:5px;right:128px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
              <el-checkbox v-model="dropoff" style="padding-top: 20px;margin-left: 10px;font-size: 20px;font-weight: 700" @change="handleChangeDropoff"
            ><div>Drop Off</div></el-checkbox>
            </div>
          </div>
          <div id="heatmapIcon" style="visibility: hidden">
            <div style="background-color:#00000000;bottom:350px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px;border: solid 1px rgb(255,208,166)">
              <div style="right:-40px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;"><5</div>
            </div>
            <div style="background-color:rgb(255,208,166);bottom:300px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-60px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">5-10</div>
            </div>
            <div style="background-color:rgb(255,170,127);bottom:250px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">10-30</div>
            </div>
            <div style="background-color:rgb(255,112,78);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">30-50</div>
            </div>
            <div style="background-color:rgb(240,64,64);bottom:150px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">50-70</div>
            </div>
            <div style="background-color:rgb(181,10,9);bottom:100px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">>70</div>
            </div>
          </div>
          <div id="heatmapIcon2" style="visibility: hidden">
            <div style="background-color:#00000000;bottom:350px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px;border: solid 1px rgb(209,229,240)">
              <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;"><12</div>
            </div>
            <div style="background-color:rgb(209,229,240);bottom:300px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">12-24</div>
            </div>
            <div style="background-color:rgb(103,169,207);bottom:250px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">24-36</div>
            </div>
            <div style="background-color:rgb(253,219,199);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">36-48</div>
            </div>
            <div style="background-color:rgb(239,138,98);bottom:150px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">48-60</div>
            </div>
            <div style="background-color:rgb(178,24,43);bottom:100px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
              <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">>60</div>
            </div>
          </div>
          <div style="left:40px;bottom:65px;position: absolute;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px">
            <div class="chartsBoard">Historical Curve</div>
            <div class="charts" id="charts1" style="width: 400px;height: 400px"></div>
          </div>


        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Header from "../components/Header";
import echarts from 'echarts'
import '@/assets/css/all.css'
const mapboxgl = require('mapbox-gl');
export default {
  name: "Analysis",
  components: {Header},
  methods: {
    handleChange() {
      var check = this.checked;
      if (!check) {
        map.setLayoutProperty('regions', 'visibility', 'none');
      } else {
        map.setLayoutProperty('regions', 'visibility', 'visible');
      }
    },
    handleChangePickup(){
      var pickup = this.pickup;
      if (!pickup) {
        map.setLayoutProperty('pickup', 'visibility', 'none');
      } else {
        map.setLayoutProperty('pickup', 'visibility', 'visible');
      }
    },
    handleChangeDropoff(){
      var dropoff = this.dropoff;
      if (!dropoff) {
        map.setLayoutProperty('dropoff', 'visibility', 'none');
      } else {
        map.setLayoutProperty('dropoff', 'visibility', 'visible');
      }
    },
    threeD(){
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.setPitch(70);
      map.setBearing(-17.6);
      map.setZoom(15);

      map.addLayer({
        "id": "3d-buildings",
        "source": "composite",
        "source-layer": "building",
        "filter": ["==", "extrude", "true"],
        "maxzoom":0,
        "type": "fill-extrusion",
        "paint": {
          "fill-extrusion-color": "#007cbf",

// use an 'interpolate' expression to add a smooth transition effect to the
// buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate", ["linear"], ["zoom"],
            7, 0,
            7.5, ["get", "height"]
          ],
          "fill-extrusion-base": [
            "interpolate", ["linear"], ["zoom"],
            7, 0,
            7.5, ["get", "min_height"]
          ],
          "fill-extrusion-opacity": .6
        }
      }, labelLayerId);
    },
    scatterP(){
      map.setPitch(0);
      map.setBearing(0);
      map.setZoom(11);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap', 'visibility', 'none');
      map.setLayoutProperty('regionRequests','visibility','none');
      map.setLayoutProperty('pickup','visibility','visible');
      map.setLayoutProperty('dropoff','visibility','visible');
      document.getElementById("choosePD").style.visibility="visible";
      document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="hidden";
    },
    Choropleth(){
      map.setPitch(0);
      map.setBearing(0);
      map.setZoom(11);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup','visibility','none');
      map.setLayoutProperty('dropoff','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap', 'visibility', 'none');
      map.setLayoutProperty('regionRequests','visibility','visible');
      document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility="visible";
      document.getElementById("heatmapIcon2").style.visibility="hidden";
    },
    Heatmap(){
      map.setPitch(0);
      map.setBearing(0);
      map.setZoom(11);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup','visibility','none');
      map.setLayoutProperty('dropoff','visibility','none');
      map.setLayoutProperty('regionRequests','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap','visibility','visible');
      document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="visible";
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
    window.map = new mapboxgl.Map({
      container: 'map', // container id 绑定的组件的id
      style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [-73.96,40.78], // 初始坐标系
      zoom: 11,     // starting zoom 地图初始的拉伸比例
      antialias: true, //抗锯齿，通过false关闭提升性能
    });


    map.on('load', function () {
      map.addSource("regions", {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
      });

      map.addLayer({
        "id": "regions",
        "type": "fill",           /* fill类型一般用来表示一个面，一般较大 */
        "source": "regions",
        "paint": {
          "fill-color": "rgba(0,0,0,0)", /* 填充的颜色 */
          "fill-outline-color": "#eeeeee",
          "fill-opacity": 0.5      /* 透明度 */
        },
        "filter": ["==", "$type", "Polygon"]  /* filter过滤器将type等于Polygon的数据显示在layer上 */
      });



      map.addSource('pickup', {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/pickup/pickup_0.geojson"
      });

      map.addSource('dropoff', {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/dropoff/dropoff_0.geojson"
      });

      map.addLayer({
        "id": "pickup",
        "source": "pickup",
        "type": "circle",
        "paint": {
          "circle-radius": 2,
          "circle-color": "#FF0000"
        }
      });

      map.addLayer({
        "id": "dropoff",
        "source": "dropoff",
        "type": "circle",
        "paint": {
          "circle-radius": 2,
          "circle-color": "#007cbf"
        }
      });


      var index=0;
      var timer = window.setInterval(function() {
        if(index < 168){
          index++;
          map.getSource('pickup').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/pickup/pickup_" + String(index) +
            ".geojson");
          map.getSource('dropoff').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/dropoff/dropoff_" + String(index) +
            ".geojson");
        }else {
          //移除添加的source和layer
          map.removeLayer('pickup');
          map.removeLayer('dropoff');
          map.removeSource('pickup');
          map.removeSource('dropoff');
          window.clearInterval(timer);
        }
      }, 1000);

      map.addSource("regionRequests", {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/region_requests/region_request_0.geojson"
      });

      map.addLayer({
        "id": "regionRequests",
        "source": "regionRequests",
        "type": "fill",
        "paint": {
          "fill-color": {
            "property": "weight",
            "stops": [
              [0, "rgba(0,0,0,0)"],
              [5, "rgb(255,208,166)"],
              [10, "rgb(255,170,127)"],
              [30, "rgb(255,112,78)"],
              [50, "rgb(240,64,64)"],
              [70, "rgb(181,10,9)"]
            ]
          },
          "fill-opacity" : 0.95
        }
      });
      var index=0;
      var timer = window.setInterval(function() {
        if(index < 168){
          index++;
          map.getSource('regionRequests').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/region_requests/region_request_" + String(index) +
            ".geojson");
        }else {
          //移除添加的source和layer
          map.removeLayer('regionRequests');
          map.removeSource('regionRequests');
          window.clearInterval(timer);
        }
      }, 1000);
      map.setLayoutProperty('regionRequests','visibility','none');

      map.addSource('pickup_pred',{
        "type":"geojson",
        "data":"https://raw.githubusercontent.com/Rxrj/SOUP-data/main/intersection_pickup_pred.geojson"
      });

      map.addLayer({
        "id":"pickup_pred-heatmap",
        "type":"heatmap",
        "source":"pickup_pred",
        "maxzoom": 20,
        "paint": {
          // Increase the heatmap weight based on frequency and property magnitude
          "heatmap-weight": [
            "interpolate", ["linear"],
            ["get", "mag"],
            0, 0,
            60, 1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          "heatmap-intensity": [
            "interpolate", ["linear"],
            ["zoom"],
            0, 2,
            30, 6,
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.

          // Adjust the heatmap radius by zoom level
          "heatmap-radius": [
            "interpolate", ["linear"],
            ["zoom"],
            0, 0,
            50, 30,
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(209,229,240)",
            0.4, "rgb(103,169,207)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1, "rgb(178,24,43)"
          ],

          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": [
            "interpolate", ["linear"],
            ["zoom"],
            0, 1,
            30, 1,
          ],
        },
      });
      var indexP=0;
      var timerP = window.setInterval(function() {
        if(indexP < 47){
          indexP++;
          // if(indexP < 10){
          //   map.getSource('pickup_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/groundTruth/intersection_0" + String(index) +
          //     ".geojson");
          // }
          // else
          // {
            map.getSource('pickup_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_" + String(index) +
              ".geojson");
          // }
        }else {
          window.clearInterval(timerP);
        }
      }, 1000);
      map.setLayoutProperty('pickup_pred-heatmap','visibility','none');

    });


    //echarts图表
    window.charts1 = echarts.init(document.getElementById('charts1'));
    window.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

        }
      },
      legend: {
        data: ['Pick Up', 'Drop Off'],
        padding:[20,0,0,0],
        textStyle:{
          color:['#eeeeee']
        }
      },

      xAxis: [
        {
          type: 'category',
          data: ['8', '9', '10', '11', '12', '13', '14','15','16', '17', '18', '19', '20', '21', '22'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',//左边线的颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: '#eeeeee',//坐标值得具体的颜色

            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',//左边线的颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: '#eeeeee',//坐标值得具体的颜色

            }
          }
        }
      ],
      series: [
        {
          name: 'Pick Up',
          type: 'line',
          data: [320, 432, 301, 334, 290, 230, 220,160, 172, 271, 374, 390, 230, 210,200],
          color:['#FF0000']
        },
        {
          name: 'Drop Off',
          type: 'line',
          data: [320, 332, 301, 134, 290, 230, 200,162, 182, 291, 384, 309, 310, 220,300],
          color:['#007cbf']
        },
      ],
    };
    charts1.setOption(option);



  },
  data() {
    return {
      checked: true,
      pickup:true,
      dropoff:true,
      valueSlider:0,
      valueTime:"2016-6-1",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'One week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      radio:'1',
      options: [{
        value: '选项1',
        label: 'drop-off'
      }, {
        value: '选项2',
        label: 'pick-up'
      }, {
        value: '选项3',
        label: 'both'
      }],
      value: ''
    };
  },

}
var date = new Date(2016,5,1,8,0);//注意月份是0-11，1月为0，12月为11
var t = null;
t = setTimeout(timeChange,1000);//開始运行
function timeChange()
{
  clearTimeout(t);//清除定时器
  var min=date.getMinutes();
  date.setMinutes(min+5);
  var h=date.getHours();//获取时
  var m=date.getMinutes();//获取分
  if(m < 10)
  {
    document.getElementById("currentTime").innerHTML =  "Date Time: 2016-6-1 "+h+":0"+m;
  }
  else
  {
    document.getElementById("currentTime").innerHTML =  "Date Time: 2016-6-1 "+h+":"+m;
  }
  t = setTimeout(timeChange,1000); //设定定时器，循环运行
  if(h == 22)
  {
    clearTimeout(t);
  }
  document.getElementById("requestNumber").innerHTML =  (h+m)*15;

}

</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
/deep/ .el-submenu__title:hover{background-color:#383838 !important;}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eeeeee;
  font-size: 22px;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #252525;
  border-color: #eeeeee;
}
/deep/ .el-p .el-picker-panel__sidebar{
  color: #eeeeee;
  background-color: #252525;
}
/deep/ .el-input__inner{
  background-color: #2d2d2d;
  border: solid 2px #444444;
  color: #eeeeee;
}

/deep/ .el-date-table {
  font-size: 12px;
}

/deep/ .el-checkbox__label{
  font-size: 22px;
}



.el-menu{
  border-right: 0!important;
  top: 30px;
}

.el-menu-item{
  background-color: #252525;
  color: #eeeeee;
}
.el-menu-item:hover,.el-menu-item:focus,.el-menu-item.is-active{
  color: #409EFF;
}

#map{
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 95%;
  z-index: 0;
}
/deep/ .mapboxgl-popup,.mapboxgl-popup-anchor-bottom{
  position: absolute;
  top: 30px;
  color: #eeeeee;
}

.el-slider{
  padding: 20px;
  margin: 0;
  position: fixed;
  z-index: 1000;
  width: 500px;
  bottom: 50px;
  left: 850px;
}
.numberBoard{
  background: rgba(251,103,103,.5);
  text-align: left;
  color: #fff;
  margin: 10px 10px 0 10px;
  padding: 0px 30px 0px 10px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 700;
  border-left: 12px solid #fb6767;
  text-shadow: 1px 1px 1px #000,1px 1px 1px #fff;
}
.chartsBoard{
  background: rgba(100,191,255,.3);
  text-align: left;
  color: #fff;
  margin: 10px 10px 0 10px;
  padding: 0px 30px 0px 10px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 700;
  border-left: 12px solid #64bfff;
  text-shadow: 1px 1px 1px #000,1px 1px 1px #fff;
}
</style>
