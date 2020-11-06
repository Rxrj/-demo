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
            <el-checkbox v-model="checked" style="padding-top: 20px;margin-left: 30px;font-size: 20px;font-weight: 700" @change="handleChange"><div>Partition Visible</div></el-checkbox>
            <br>
            <el-checkbox v-model="pickup"
                         style="padding-top: 20px;margin-left: 30px;font-size: 20px;font-weight: 700"
                         @change="handleChangePickup"><div>Pick Up</div></el-checkbox>
            <br>
            <el-checkbox v-model="dropoff" style="padding-top: 20px;margin-left: 10px;font-size: 20px;font-weight: 700" @change="handleChangeDropoff"
            ><div>Drop Off</div></el-checkbox>
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
                <el-menu-item style="font-size: 18px;padding-left: 20px" index="1-2">Thermodynamic Diagram</el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 35px" index="1-3" @click="threeD">3D Diagram</el-menu-item>
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
          <p style="left:80px;top:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee" id="NumberRequest">Number of Request: 200</p>
          <div style="right:0px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee" id="currentTime">Date Time: 2016-6-1 8:00</div>
          <div style="bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
            <div style="background-color:#FF0000;bottom:10px;right:100px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
            Pick Up
          </div>
          <div style="bottom:150px;right:85px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
            <div style="background-color:#007cbf;bottom:10px;right:115px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
            Drop Off
          </div>
          <div class="charts" id="charts1" style="left:40px;bottom:100px;position: absolute;width: 400px;height: 400px"></div>
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



      // map.addSource('pickup', {
      //   "type": "geojson",
      //   "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/pickup/pickup_0.geojson"
      // });
      //
      // map.addSource('dropoff', {
      //   "type": "geojson",
      //   "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/dropoff/dropoff_0.geojson"
      // });
      //
      // map.addLayer({
      //   "id": "pickup",
      //   "source": "pickup",
      //   "type": "circle",
      //   "paint": {
      //     "circle-radius": 2,
      //     "circle-color": "#FF0000"
      //   }
      // });
      //
      // map.addLayer({
      //   "id": "dropoff",
      //   "source": "dropoff",
      //   "type": "circle",
      //   "paint": {
      //     "circle-radius": 2,
      //     "circle-color": "#007cbf"
      //   }
      // });


      // var index=0;
      // var timer = window.setInterval(function() {
      //   if(index < 168){
      //     index++;
      //     map.getSource('pickup').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/pickup/pickup_" + String(index) +
      //       ".geojson");
      //     map.getSource('dropoff').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/dropoff/dropoff_" + String(index) +
      //       ".geojson");
      //   }else {
      //     //移除添加的source和layer
      //     map.removeLayer('pickup');
      //     map.removeLayer('dropoff');
      //     map.removeSource('pickup');
      //     map.removeSource('dropoff');
      //     window.clearInterval(timer);
      //   }
      // }, 1000);



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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
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
          type: 'bar',
          stack: '搜索引擎',
          data: [320, 432, 301, 334, 290, 230, 220,160, 172, 271, 374, 390, 230, 210,200],
          color:['#FF0000']
        },
        {
          name: 'Drop Off',
          type: 'bar',
          stack: '搜索引擎',
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
  document.getElementById("NumberRequest").innerHTML =  "Number of Request: "+(h+m)*15;

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

</style>
