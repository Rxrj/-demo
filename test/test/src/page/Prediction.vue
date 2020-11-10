<template>
  <el-container style="height: 100%;background-color: #252525">
    <el-header style="padding: 0">
      <Header/>
    </el-header>
    <el-container style="height: 100%;background-color: #252525">
      <el-aside style="padding-top:90px">
        <div class="block" id = "date">
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
<!--          <div>-->
<!--            <el-checkbox v-model="checked" style="padding-top: 20px;margin-left: 0px;font-size: 20px;font-weight: 700" @change="handleChange"><div>Partition Visible</div></el-checkbox>-->
<!--            <br>-->
<!--          </div>-->
          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Start</el-button>
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
                  <span style="color: #eeeeee;font-size: 20px" class="item-title">Partition Option</span>
                </template>
                <el-menu-item style="font-size: 18px;padding-left: 40px" index="1-1" @click="handleChange"><div>Partition Visible</div></el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 40px" index="1-2" @click="HeatmapG">Hexagon Grid</el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 20px" index="1-3" @click="HeatmapI">Intersection</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

      </el-aside>
      <el-main style="padding-top: 70px;margin: 0">
        <el-row style="height: 100%;margin: 0;padding: 0">
          <el-col :span="8" style="height: 100%;margin: 0;padding-right: 40px">
            <div id="map1" style="border-radius: 10px;box-shadow: 0 2px 5px black;height: 95%;margin: 0;padding: 0">

              <p style="color: #eeeeee;position:absolute;left:20px;top:20px;font-size: 22px;font-weight: 700">Ground Truth</p>
<!--              <div class="Evaluation" style="text-align: right">-->
<!--                <div style="color: #eeeeee; font-weight: bold;text-align:center">MAPE(%)<br/><div class="font">16.677</div></div>-->

              <el-slider
                v-model="value1"
                max="24"
                :step="1"
                show-stops>
              </el-slider>
<!--              <p style="left:80px;top:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee" id="groud truth data">Ground Truth</p>-->
              <div class="Evaluation" style="text-align: right">
                <div style="color: #eeeeee; font-weight: bold;text-align:center">MAPE(%)<br/><div class="font">16.446</div></div>

                <div style="color: #eeeeee; font-weight: bold;text-align:center">MAE<br/><div class="font">3.648</div></div>
                <div style="color: #eeeeee; font-weight: bold;text-align:center">RMSE<br/><div class="font">5.458</div></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;margin: 0;padding: 0">
            <div id="map2" style="border-radius: 10px;box-shadow: 0 2px 5px black;height: 95%;margin: 0;padding: 0">

              <p style="color: #eeeeee;position:absolute;left:550px;top:20px;font-size: 22px;font-weight: 700">Predicted Request</p>

              <el-slider
                v-model="value2"
                max="24"
                :step="1"
                show-stops>
              </el-slider>
<!--              <p style="left:80px;top:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee" id="predicted data">Predicted Data</p>-->


            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;margin: 0;padding: 0">
            <div class="charts" id="charts1" style="width: auto;height: 46%"></div>
            <div class="charts" id="charts2" style="width: auto;height: 46%"></div>
          </el-col>
        </el-row>
        <div style="left:600px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee" id="currentTimePre">Date Time: 2016-6-1 0:00</div>
<!--        <pre id='info'></pre>-->
        <el-button id="info" type="info" plain class="left-button"></el-button>
<!--        <div id="choosePD" style="visibility: visible">-->
<!--          <div style="bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">-->
<!--            <div style="background-color:#FF0000;bottom:5px;right:115px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>-->
<!--            <el-checkbox v-model="pickup"-->
<!--                         @change="handleChangePickup"><div style="font-weight:700;">Pick Up</div></el-checkbox>-->
<!--          </div>-->
<!--          <div style="bottom:150px;right:85px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">-->
<!--            <div style="background-color:#007cbf;bottom:5px;right:128px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>-->
<!--            <el-checkbox v-model="dropoff" style="padding-top: 20px;margin-left: 10px;font-size: 20px;font-weight: 700" @change="handleChangeDropoff"-->
<!--            ><div>Drop Off</div></el-checkbox>-->
<!--          </div>-->
<!--        </div>-->
        <div class= "heatmapIcon" id="heatmapIcon" style="visibility: hidden">
          <div style="background-color:rgb(255,255,255);bottom:200px;right:300px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(255,208,166);bottom:200px;right:250px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(255,170,127);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(240,64,64);bottom:200px;right:150px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(181,10,9);bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
        </div>
        <div class="heatmapIcon2" id="heatmapIcon2" style="visibility: hidden">
          <div style="background-color:rgba(33,102,172,0);bottom:200px;right:350px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(209,229,240);bottom:200px;right:300px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(103,169,207);bottom:200px;right:250px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(253,219,199);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(239,138,98);bottom:200px;right:150px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
          <div style="background-color:rgb(178,24,43);bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<script type="text/ecmascript-6">
import Header from "../components/Header";
import echarts from 'echarts'
import '@/assets/css/all.css'
import {getMouseLngLat} from "../assets/js/utils";
import {getCurrentGridIndex} from "../assets/js/utils";
import {random} from "../assets/js/utils";
import {plotEcharts} from "../assets/js/utils";
const mapboxgl = require('mapbox-gl');
var grid_data;
var grid_center_coordinates = new Array();
// var grid_groundTruthes = new Array();
// var grid_preds = new Array();
var current_region_index;

export default {
  name: "Prediction",
  components: {Header},
  methods:{
    handleChange(){
      // var check = this.checked;
      var check = !this.checked;
      this.checked = check;
      if(!check){
        map1.setLayoutProperty('regions', 'visibility', 'none');
        map2.setLayoutProperty('regions', 'visibility', 'none');
      }
      else{
        map1.setLayoutProperty('regions', 'visibility', 'visible');
        map2.setLayoutProperty('regions', 'visibility', 'visible');
      }
    },
    HeatmapG(){
      map1.setPitch(0);
      map1.setBearing(0);
      // map.setZoom(11);
      map1.setLayoutProperty('pickup_intersection', 'visibility', 'none');
      map1.setLayoutProperty('pickup_grid','visibility','visible');
      // document.getElementById("choosePD").style.visibility="hidden";
      // document.getElementById("heatmapIcon").style.visibility="visible";
      // document.getElementById("heatmapIcon2").style.visibility="hidden";

      map2.setPitch(0);
      map2.setBearing(0);
      // map.setZoom(11);
      map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'none');
      map2.setLayoutProperty('pickup_grid_pred','visibility','visible');
      // document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility="visible";
      // document.getElementById("heatmapIcon2").style.visibility="hidden";
    },
    HeatmapI(){
      map1.setPitch(0);
      map1.setBearing(0);
      // map.setZoom(11);
      map1.setLayoutProperty('pickup_intersection', 'visibility', 'visible');
      map1.setLayoutProperty('pickup_grid','visibility','none');
      // document.getElementById("choosePD").style.visibility="hidden";
      // document.getElementById("heatmapIcon").style.visibility="hidden";
      // document.getElementById("heatmapIcon2").style.visibility="visible";

      map2.setPitch(0);
      map2.setBearing(0);
      // map.setZoom(11);
      map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'visible');
      map2.setLayoutProperty('pickup_grid_pred','visibility','none');
      // document.getElementById("choosePD").style.visibility="hidden";
      // document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="visible";
    },

    initData:function (){
      //单个区域的数据
      window.onload = function () {
        var url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_data.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        // var grid_center_coordinates = new Array();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
          if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            grid_data = JSON.parse(request.responseText);
            console.log("loading data...")
            for(var i=0;i<grid_data.length;i++){
              grid_center_coordinates[i] = grid_data[i].geometry.coordinates;
              // grid_groundTruthes[i] = grid_data[i].properties.groundTruth;
              // grid_preds[i] = grid_data[i].properties.pred;
            }
            // console.log(grid_data.length)
            // console.log(grid_data[0].id);
            // console.log(grid_data[0].properties.pred);
            // console.log(grid_data[0].properties.pred);
            // console.log(grid_data[0].properties.pred.length);
            // console.log(grid_data[0].properties.pred[0]);
            // console.log(grid_preds[0][8]);
            // console.log(grid_data[0].geometry.coordinates);
            // console.log(grid_data[0].geometry.coordinates[0]);
            // console.log(grid_data[0].geometry.coordinates[1]);
            // console.log(grid_center_coordinates.length);
            // console.log(grid_data.length);
          }
        }
      }
    },
    initMap:function () {
      mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
      window.map1 = new mapboxgl.Map({
        container: 'map1', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.96, 40.78], // 初始坐标系
        zoom: 11,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      // map1.addControl(new mapboxgl.FullscreenControl(), "top-left");
      // map1.addControl(new mapboxgl.NavigationControl(), "top-left");
      //
      map1.on('click', function (e) {
        // console.log(grid_center_coordinates.length)
        current_region_index = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
        // console.log(current_region_index);
        // console.log(document.getElementsByName('el-date-picker placeholder'));
        document.getElementById('info').innerHTML = getMouseLngLat(e) + '<br/>' + "grid index: " + current_region_index;
        var data1 = grid_data[current_region_index].properties.groundTruth.slice(0,288);
        var data2 = grid_data[current_region_index].properties.pred.slice(0,288);
        plotEcharts(data1,data2);
      });

      // map1.on('mousemove', function (e) {
      //   document.getElementById('info').innerHTML =       /* innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML  */
      //     // e.point is the x, y coordinates of the mousemove event relative
      //     // to the top-left corner of the map
      //     // JSON.stringify(e.point) + '<br />' +
      //     // e.lngLat is the longitude, latitude geographical position of the event
      //     JSON.stringify(e.lngLat);  /* JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串 */
      //
      //   // var features = map.queryRenderedFeatures(e.point);
      //   // document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
      // });

      var radius = 0.05;

      function pointOnCircle(i) {
        return {
          "type": "Point",
          "coordinates": [
            -73.98 + 0.0001 * i,
            40.75 + 0.0001 * i
            // 0.5 * Math.cos(angle) * radius - 73.98,
            // 0.5 * Math.sin(angle) * radius + 40.75
          ]
        };
      }

      map1.on('load', function () {

        map1.addSource("regions", {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
        });
        map1.addLayer({
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


        map1.addSource('pickup_grid', {
          "type": "geojson",
          // "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_groundTruth/grid_0.geojson"
          "data": "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_groundTruth/grid_0.geojson"
        });

        map1.addLayer({
          "id": "pickup_grid",
          "source": "pickup_grid",
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
            "fill-opacity": 0.95
          }
        });

        var index = 0;
        var timer = window.setInterval(function () {
          if (index < 8639) {
            index++;
            map1.getSource('pickup_grid').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_groundTruth/grid_" + String(index) + ".geojson");
            map2.getSource('pickup_grid_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_pred/grid_" + String(index) + ".geojson");
          } else {
            //移除添加的source和layer
            map1.removeLayer('pickup_grid');
            map1.removeSource('pickup_grid');
            map2.removeLayer('pickup_grid_pred');
            map2.removeSource('pickup_grid_pred');
            window.clearInterval(timer);
          }
        }, 1000);


        map1.addSource('pickup_intersection', {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_0.geojson"
        });
        map1.addLayer({
          "id": "pickup_intersection",
          "type": "heatmap",
          "source": "pickup_intersection",
          "maxzoom": 20,
          "paint": {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate", ["linear"],
              ["get", "mag"],
              0, 0,
              20, 1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate", ["linear"],
              ["zoom"],
              0, 2,
              30, 6,
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

            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate", ["linear"],
              ["zoom"],
              0, 1,
              30, 1,
            ],
          },
        });

        var index = 0;
        var timer = window.setInterval(function () {
          if (index < 1439) {
            index++;
            map1.getSource('pickup_intersection').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_" + String(index) + ".geojson");
            map2.getSource('pickup_intersection_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_pred/intersection_" + String(index) + ".geojson");
          } else {
            window.clearInterval(timer);
          }
        }, 1000);


        map1.setLayoutProperty('pickup_grid', 'visibility', 'none');
        map1.setLayoutProperty('pickup_intersection', 'visibility', 'none');

      });


      window.map2 = new mapboxgl.Map({
        container: 'map2', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.96, 40.78], // 初始坐标系
        zoom: 11,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      map2.on('click', function (e) {
        var current_region_index = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
        // console.log(current_region_index);
        document.getElementById('info').innerHTML = getMouseLngLat(e) + '<br/>' + "grid index: " + current_region_index;
        var data1 = grid_data[current_region_index].properties.groundTruth.slice(0,288);
        var data2 = grid_data[current_region_index].properties.pred.slice(0,288);
        plotEcharts(data1,data2);
      });
      var radius = 0.05;

      function pointOnCircle(i) {
        return {
          "type": "Point",
          "coordinates": [
            -73.98 + 0.0001 * i,
            40.75 + 0.0001 * i
            // 0.5 * Math.cos(angle) * radius - 73.98,
            // 0.5 * Math.sin(angle) * radius + 40.75
          ]
        };
      }

      map2.on('load', function () {

        map2.addSource("regions", {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
        });

        map2.addLayer({
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

        map2.addSource('pickup_grid_pred', {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_pred/grid_0.geojson"
        });

        map2.addLayer({
          "id": "pickup_grid_pred",
          "source": "pickup_grid_pred",
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
            "fill-opacity": 0.95
          }
        });

        map2.addSource('pickup_intersection_pred', {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_pred/intersection_0.geojson"
        });

        map2.addLayer({
          "id": "pickup_intersection_pred",
          "type": "heatmap",
          "source": "pickup_intersection_pred",
          "maxzoom": 20,
          "paint": {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate", ["linear"],
              ["get", "mag"],
              0, 0,
              20, 1
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

        map2.setLayoutProperty('pickup_grid_pred', 'visibility', 'none');
        map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'none');
      });
    },

    // plotEcharts:function (data1,data2){
    //   // 指定图表的配置项和数据
    //   var charts1 = echarts.init(document.getElementById('charts1'));
    //   var timeData = ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'];
    //
    //   var option = {
    //     title: {
    //       text: 'GroundTruth vs Predicted Request in 2016-06-01',
    //       subtext: 'The New York TLC Trip Record YELLOW Data',
    //       left: 'center',
    //       textStyle: {color:'#33CC00',fontSize: 12,},
    //       subtextStyle: {color:'#33CC00',fontSize: 10,},
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         animation: false
    //       }
    //     },
    //     legend: {
    //       data: ['Ground Truth', 'Predicted Requests'],
    //       // left: 20,
    //       top: 40,
    //       textStyle: {color:'#33CC00',fontSize: 10,},
    //     },
    //     toolbox: {
    //       feature: {
    //         dataZoom: {
    //           yAxisIndex: 'none'
    //         },
    //         restore: {},
    //         saveAsImage: {}
    //       }
    //     },
    //     axisPointer: {
    //       link: {xAxisIndex: 'all'}
    //     },
    //     dataZoom: [
    //       {
    //         show: true,
    //         realtime: true,
    //         start: 30,
    //         end: 40,
    //       },
    //       {
    //         type: 'inside',
    //         realtime: true,
    //         start: 30,
    //         end: 40,
    //       }
    //     ],
    //     xAxis:
    //       {
    //         type: 'category',
    //         boundaryGap: false,
    //         axisLine: {onZero: true},
    //         axisLabel:{color:'#33cc00',fontSize:10},
    //         data: timeData
    //       },
    //     yAxis: {
    //       type: 'value',
    //       max: 80,
    //       axisLabel:{color:'#33cc00',fontSize:10},
    //     },
    //     series: [
    //       {
    //         name: 'Ground Truth',
    //         type: 'line',
    //         symbolSize: 4,
    //         // data: grid_data[current_region_index].properties.groundTruth.slice(0,288),
    //         data: data1,
    //       },
    //       {
    //         name: 'Predicted Requests',
    //         type: 'line',
    //         symbolSize: 4,
    //         // data: grid_data[current_region_index].properties.pred,
    //         data: data2,
    //       }
    //     ]
    //   };
    //
    //
    //   // 使用刚指定的配置项和数据显示图表。
    //   charts1.setOption(option);
    //
    //   var charts2 = echarts.init(document.getElementById('charts2'));
    //   var data = [{"name":1596038400000,"value":[1596038400000,53]},{"name":1596039040000,"value":[1596039040000,51]},{"name":1596039680000,"value":[1596039680000,51]},{"name":1596040320000,"value":[1596040320000,51]},{"name":1596040832000,"value":[1596040832000,58]},{"name":1596041472000,"value":[1596041472000,67]},{"name":1596042112000,"value":[1596042112000,68]},{"name":1596042624000,"value":[1596042624000,54]},{"name":1596043264000,"value":[1596043264000,51]},{"name":1596043904000,"value":[1596043904000,57]},{"name":1596044416000,"value":[1596044416000,52]},{"name":1596045056000,"value":[1596045056000,54]},{"name":1596045696000,"value":[1596045696000,51]},{"name":1596046208000,"value":[1596046208000,51]},{"name":1596046848000,"value":[1596046848000,52]},{"name":1596047488000,"value":[1596047488000,51]},{"name":1596048000000,"value":[1596048000000,53]},{"name":1596048640000,"value":[1596048640000,52]},{"name":1596049280000,"value":[1596049280000,67]},{"name":1596049920000,"value":[1596049920000,59]},{"name":1596050432000,"value":[1596050432000,58]},{"name":1596051072000,"value":[1596051072000,52]},{"name":1596051712000,"value":[1596051712000,55]},{"name":1596052224000,"value":[1596052224000,53]},{"name":1596052864000,"value":[1596052864000,54]},{"name":1596053504000,"value":[1596053504000,54]},{"name":1596054016000,"value":[1596054016000,54]},{"name":1596054656000,"value":[1596054656000,52]},{"name":1596055296000,"value":[1596055296000,54]},{"name":1596055808000,"value":[1596055808000,65]},{"name":1596056448000,"value":[1596056448000,59]},{"name":1596057088000,"value":[1596057088000,55]},{"name":1596057600000,"value":[1596057600000,53]},{"name":1596058240000,"value":[1596058240000,55]},{"name":1596058880000,"value":[1596058880000,54]},{"name":1596059520000,"value":[1596059520000,55]},{"name":1596060032000,"value":[1596060032000,64]},{"name":1596060672000,"value":[1596060672000,57]},{"name":1596061312000,"value":[1596061312000,56]},{"name":1596061824000,"value":[1596061824000,55]},{"name":1596062464000,"value":[1596062464000,55]},{"name":1596063104000,"value":[1596063104000,55]},{"name":1596063616000,"value":[1596063616000,58]},{"name":1596064256000,"value":[1596064256000,79]},{"name":1596064896000,"value":[1596064896000,60]},{"name":1596065408000,"value":[1596065408000,63]},{"name":1596066048000,"value":[1596066048000,63]},{"name":1596066688000,"value":[1596066688000,82]},{"name":1596067200000,"value":[1596067200000,81]},{"name":1596067840000,"value":[1596067840000,78]},{"name":1596068480000,"value":[1596068480000,78]},{"name":1596069120000,"value":[1596069120000,65]},{"name":1596069632000,"value":[1596069632000,76]},{"name":1596070272000,"value":[1596070272000,80]},{"name":1596070912000,"value":[1596070912000,78]},{"name":1596107040000,"value":[1596107040000,70]},{"name":1596124799000,"value":[1596124799000,0]}];
    //
    //   var option = {
    //     legend:{},
    //     grid:{
    //       left:50
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       formatter: function (params) {
    //         params = params[0];
    //         var date = new Date(params.name);
    //         var hour = date.getHours();
    //         var minutes = date.getMinutes();
    //         if(hour < 10){
    //           hour = '0' + hour;
    //         }
    //         if(minutes < 10){
    //           minutes = '0' + minutes;
    //         }
    //         var dateStr = hour + ':' + minutes;
    //         return dateStr + ' ' + params.value[1];
    //       },
    //       axisPointer: {
    //         animation: false
    //       }
    //     },
    //     xAxis: {
    //       type: 'time',
    //       splitLine: {
    //         show: false
    //       },
    //       splitNumber:8,
    //       axisLine:{
    //         lineStyle:{
    //           color: '#eeeeee'
    //         }
    //       },
    //       axisLabel:{
    //         formatter:function(value,index){
    //           var date = new Date(value);
    //           var hour = date.getHours();
    //           var minutes = date.getMinutes();
    //           if(hour < 10){
    //             hour = '0' + hour;
    //           }
    //           if(minutes < 10){
    //             minutes = '0' + minutes;
    //           }
    //           return hour + ':' + minutes;
    //         },
    //         color:'#eeeeee'
    //       }
    //     },
    //     yAxis: {
    //       name:'Drop Off',
    //       nameTextStyle:{
    //         color: '#eeeeee',
    //         fontSize:15
    //       },
    //       type: 'value',
    //       boundaryGap: [0, '100%'],
    //       splitLine: {
    //         show: false
    //       },
    //       axisLine:{
    //         lineStyle:{
    //           color: '#eeeeee'
    //         }
    //       },
    //       axisLabel:{
    //         color:'#eeeeee'
    //       }
    //     },
    //     series: [{
    //       name: '',
    //       type: 'line',
    //       color:['#eeeeee'],
    //       hoverAnimation: false,
    //       smooth: true,
    //       symbolSize: 4,
    //       data: data
    //
    //     }]
    //   };
    //
    //   // 使用刚指定的配置项和数据显示图表。
    //   charts2.setOption(option);
    // },
  },

  mounted() {
      this.initData();
      this.initMap();

      // var data1 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 3.0, 2.0, 3.0, 1.0, 4.0, 1.0, 3.0, 6.0, 3.0, 1.0, 4.0, 1.0, 2.0, 0.0, 1.0, 2.0, 0.0, 3.0, 1.0, 0.0, 2.0, 1.0, 4.0, 0.0, 1.0, 1.0, 3.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0, 3.0, 2.0, 0.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 0.0, 3.0, 1.0, 4.0, 5.0, 4.0, 6.0, 8.0, 8.0, 9.0, 16.0, 13.0, 13.0, 12.0, 18.0, 19.0, 25.0, 17.0, 24.0, 29.0, 32.0, 35.0, 51.0, 47.0, 40.0, 44.0, 35.0, 51.0, 57.0, 43.0, 54.0, 64.0, 56.0, 58.0, 59.0, 63.0, 67.0, 65.0, 65.0, 84.0, 77.0, 59.0, 60.0, 59.0, 58.0, 56.0, 45.0, 65.0, 59.0, 50.0, 49.0, 38.0, 52.0, 52.0, 57.0, 60.0, 48.0, 50.0, 47.0, 42.0, 50.0, 44.0, 40.0, 48.0, 56.0, 57.0, 58.0, 52.0, 49.0, 55.0, 59.0, 50.0, 47.0, 54.0, 54.0, 41.0, 46.0, 59.0, 54.0, 53.0, 61.0, 50.0, 69.0, 51.0, 57.0, 63.0, 59.0, 64.0, 55.0, 66.0, 53.0, 54.0, 68.0, 54.0, 47.0, 51.0, 63.0, 41.0, 46.0, 51.0, 61.0, 38.0, 57.0, 62.0, 54.0, 48.0, 52.0, 58.0, 40.0, 51.0, 60.0, 58.0, 49.0, 53.0, 66.0, 56.0, 63.0, 72.0, 62.0, 59.0, 75.0, 74.0, 68.0, 50.0, 60.0, 67.0, 63.0, 60.0, 81.0, 68.0, 63.0, 60.0, 71.0, 66.0, 66.0, 62.0, 46.0, 40.0, 40.0, 61.0, 47.0, 47.0, 63.0, 51.0, 55.0, 50.0, 50.0, 74.0, 72.0, 66.0, 73.0, 69.0, 62.0, 64.0, 61.0, 58.0, 66.0, 56.0, 78.0, 54.0, 56.0, 59.0, 51.0, 62.0, 78.0, 57.0, 68.0, 75.0, 54.0, 55.0, 41.0, 50.0, 59.0, 50.0, 46.0, 53.0, 49.0, 33.0, 49.0, 36.0, 44.0, 39.0, 46.0, 43.0, 45.0, 34.0, 36.0, 34.0, 32.0, 35.0, 39.0, 27.0, 30.0, 23.0, 25.0, 32.0, 28.0, 31.0, 33.0, 21.0, 22.0, 24.0, 25.0, 23.0, 20.0, 20.0, 19.0, 29.0, 30.0, 16.0, 23.0, 23.0, 17.0, 16.0, 9.0, 15.0, 14.0, 18.0, 17.0, 11.0, 13.0, 10.0, 7.0, 6.0, 14.0, 10.0, 5.0, 2.0, 13.0, 3.0, 3.0, 4.0, 8.0, 4.0, 4.0, 7.0, 4.0, 6.0, 6.0, 3.0, 1.0, 4.0, 2.0, 2.0, 5.0, 5.0, 2.0, 5.0, 1.0, 4.0, 3.0, 5.0, 3.0, 1.0, 2.0, 1.0, 1.0, 2.0, 3.0, 2.0, 0.0, 2.0, 2.0, 2.0, 1.0, 2.0, 3.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 3.0, 2.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 4.0, 1.0, 4.0, 7.0, 2.0, 4.0, 5.0, 5.0, 7.0, 3.0, 5.0, 7.0, 6.0, 10.0, 10.0, 11.0, 17.0, 16.0, 25.0, 15.0, 33.0, 25.0, 37.0, 34.0, 33.0, 34.0, 32.0, 39.0, 52.0, 47.0, 60.0, 50.0, 65.0, 70.0, 71.0, 70.0, 61.0, 60.0, 76.0, 60.0, 58.0, 57.0, 66.0, 63.0, 64.0, 57.0, 73.0, 63.0, 57.0, 73.0, 69.0, 62.0, 58.0, 59.0, 46.0, 61.0, 49.0, 48.0, 55.0, 52.0, 56.0, 38.0, 63.0, 53.0, 50.0, 47.0, 55.0, 55.0, 48.0, 42.0, 48.0, 51.0, 66.0, 44.0, 45.0, 58.0, 66.0, 55.0, 58.0, 65.0, 69.0, 62.0, 69.0, 44.0, 46.0, 63.0, 49.0, 70.0, 45.0, 51.0, 57.0, 62.0, 50.0, 46.0, 60.0, 61.0, 72.0, 60.0, 53.0, 65.0, 46.0, 58.0, 53.0, 63.0, 67.0, 66.0, 61.0, 46.0, 46.0, 45.0, 51.0, 63.0, 52.0, 60.0, 47.0, 62.0, 61.0, 75.0, 69.0, 68.0, 64.0, 73.0, 71.0, 68.0, 54.0, 71.0, 63.0, 72.0, 67.0, 62.0, 68.0, 62.0, 53.0, 52.0, 76.0, 67.0, 63.0, 51.0, 56.0, 56.0, 49.0, 48.0, 54.0, 61.0, 62.0, 58.0, 59.0, 59.0, 74.0, 59.0, 67.0, 61.0, 54.0, 63.0, 69.0, 67.0, 59.0, 60.0, 78.0, 56.0, 64.0, 52.0, 48.0, 59.0, 67.0, 72.0, 58.0, 81.0, 54.0, 50.0, 47.0, 58.0, 53.0, 51.0, 43.0, 38.0, 49.0, 54.0, 43.0, 39.0, 33.0, 46.0, 41.0, 37.0, 37.0, 50.0, 50.0, 36.0, 43.0, 42.0, 49.0, 40.0, 45.0, 40.0, 47.0, 25.0, 28.0, 37.0, 31.0, 23.0, 27.0, 33.0, 30.0, 36.0, 17.0, 28.0, 26.0, 40.0, 26.0, 24.0, 23.0, 13.0, 21.0, 15.0, 18.0, 21.0, 15.0, 18.0, 16.0, 13.0, 23.0, 13.0, 11.0, 7.0, 12.0, 12.0, 12.0, 12.0, 2.0, 12.0, 8.0, 6.0, 9.0, 4.0, 6.0, 7.0, 7.0, 6.0, 6.0, 3.0, 6.0, 9.0, 6.0, 3.0, 4.0, 3.0, 0.0, 8.0, 2.0, 4.0, 3.0, 2.0, 1.0, 0.0, 1.0, 2.0, 2.0, 2.0, 4.0, 3.0, 2.0, 4.0, 1.0, 1.0, 2.0, 2.0, 0.0, 1.0, 1.0, 1.0, 3.0, 0.0, 1.0, 0.0, 2.0, 2.0, 1.0, 1.0, 0.0, 3.0, 1.0, 3.0, 0.0, 3.0, 2.0, 3.0, 3.0, 3.0, 6.0, 4.0, 3.0, 2.0, 3.0, 1.0, 5.0, 1.0, 5.0, 6.0, 4.0, 7.0, 7.0, 9.0, 9.0, 10.0, 13.0, 17.0, 12.0, 16.0, 19.0, 23.0, 25.0, 42.0, 32.0, 29.0, 25.0, 46.0, 51.0, 53.0, 44.0, 51.0, 75.0, 55.0, 66.0, 53.0, 52.0, 63.0, 73.0, 67.0, 91.0, 74.0, 84.0, 57.0, 54.0, 61.0, 56.0, 62.0, 60.0, 54.0, 52.0, 56.0, 68.0, 64.0, 51.0, 45.0, 49.0, 64.0, 49.0, 48.0, 54.0, 52.0, 53.0, 55.0, 43.0, 51.0, 53.0, 53.0, 50.0, 57.0, 40.0, 52.0, 58.0, 39.0, 38.0, 53.0, 56.0, 55.0, 46.0, 47.0, 54.0, 48.0, 62.0, 66.0, 50.0, 65.0, 71.0, 79.0, 53.0, 66.0, 63.0, 68.0, 59.0, 39.0, 54.0, 57.0, 60.0, 63.0, 56.0, 49.0, 57.0, 54.0, 55.0, 57.0, 65.0, 67.0, 62.0, 55.0, 72.0, 44.0, 63.0, 58.0, 60.0, 75.0, 62.0, 72.0, 82.0, 70.0, 61.0, 70.0, 67.0, 76.0, 64.0, 71.0, 52.0, 74.0, 76.0, 62.0, 56.0, 55.0, 61.0, 68.0, 59.0, 61.0, 51.0, 55.0, 44.0, 52.0, 51.0, 56.0, 54.0, 44.0, 51.0, 36.0, 36.0, 52.0, 68.0, 46.0, 57.0, 59.0, 55.0, 62.0, 56.0, 54.0, 75.0, 59.0, 69.0, 67.0, 54.0, 59.0, 68.0, 60.0, 63.0, 61.0, 51.0, 58.0, 56.0, 50.0, 64.0, 60.0, 54.0, 44.0, 64.0, 45.0, 55.0, 49.0, 56.0, 48.0, 43.0, 42.0, 46.0, 45.0, 47.0, 35.0, 37.0, 32.0, 45.0, 37.0, 45.0, 45.0, 44.0, 38.0, 52.0, 38.0, 29.0, 27.0, 33.0, 41.0, 33.0, 28.0, 24.0, 28.0, 23.0, 14.0, 30.0, 36.0, 38.0, 26.0, 20.0, 26.0, 16.0, 32.0, 25.0, 21.0, 16.0, 14.0, 13.0, 22.0, 24.0, 21.0, 19.0, 13.0, 26.0, 20.0, 23.0, 20.0, 18.0, 11.0, 16.0, 5.0, 18.0, 8.0, 18.0, 14.0, 9.0, 15.0, 7.0, 16.0, 9.0, 14.0, 7.0, 8.0, 14.0, 13.0, 14.0, 10.0, 5.0, 10.0, 10.0, 14.0, 9.0, 3.0, 6.0, 5.0, 6.0, 6.0, 4.0, 6.0, 1.0, 4.0, 3.0, 6.0, 4.0, 3.0, 4.0, 0.0, 2.0, 1.0, 2.0, 2.0, 1.0, 7.0, 5.0, 1.0, 2.0, 0.0, 3.0, 0.0, 0.0, 0.0, 3.0, 0.0, 2.0, 0.0, 5.0, 3.0, 0.0, 1.0, 2.0, 1.0, 4.0, 0.0, 2.0, 2.0, 3.0, 3.0, 1.0, 1.0, 2.0, 4.0, 2.0, 1.0, 3.0, 5.0, 0.0, 5.0, 4.0, 6.0, 5.0, 5.0, 17.0, 6.0, 7.0, 13.0, 10.0, 10.0, 16.0, 19.0, 19.0, 15.0, 17.0, 19.0, 23.0, 20.0, 20.0, 15.0, 15.0, 25.0, 14.0, 13.0, 25.0, 19.0, 35.0, 22.0, 34.0, 24.0, 28.0, 27.0, 28.0, 26.0, 24.0, 28.0, 27.0, 36.0, 45.0, 34.0, 27.0, 43.0, 32.0, 38.0, 33.0, 32.0, 40.0, 39.0, 41.0, 45.0, 38.0, 44.0, 38.0, 44.0, 47.0, 51.0, 49.0, 40.0, 50.0, 49.0, 59.0, 45.0, 48.0, 59.0, 53.0, 46.0, 53.0, 65.0, 56.0, 48.0, 50.0, 54.0, 53.0, 69.0, 45.0, 52.0, 51.0, 53.0, 62.0, 60.0, 64.0, 59.0, 68.0, 60.0, 67.0, 51.0, 70.0, 63.0, 59.0, 60.0, 52.0, 63.0, 61.0, 50.0, 65.0, 58.0, 46.0, 46.0, 43.0, 47.0, 53.0, 67.0, 59.0, 58.0, 50.0, 59.0, 54.0, 49.0, 58.0, 49.0, 58.0, 67.0, 45.0, 56.0, 46.0, 51.0, 60.0, 51.0, 57.0, 61.0, 54.0, 55.0, 55.0, 72.0, 51.0, 49.0, 46.0, 42.0, 45.0, 61.0, 47.0, 42.0, 56.0, 39.0, 48.0, 64.0, 58.0, 56.0, 45.0, 42.0, 45.0, 47.0, 60.0, 43.0, 50.0, 53.0, 50.0, 74.0, 71.0, 76.0, 80.0, 76.0, 60.0, 58.0, 67.0, 62.0, 50.0, 54.0, 31.0, 47.0, 44.0, 39.0, 40.0, 46.0, 42.0, 43.0, 49.0, 48.0, 41.0, 56.0, 45.0, 47.0, 39.0, 54.0, 44.0, 37.0, 32.0, 28.0, 23.0, 24.0, 30.0, 26.0, 23.0, 27.0, 20.0, 26.0, 28.0, 31.0, 21.0, 30.0, 17.0, 21.0, 29.0, 27.0, 17.0, 22.0, 25.0, 17.0, 17.0, 15.0, 19.0, 24.0, 22.0, 13.0, 12.0, 22.0, 16.0, 18.0, 25.0, 12.0, 11.0, 13.0, 18.0, 16.0, 16.0, 13.0, 17.0, 22.0, 13.0, 11.0, 9.0, 3.0, 9.0, 19.0, 11.0, 6.0, 9.0, 8.0, 11.0, 7.0, 8.0, 5.0, 3.0, 5.0, 9.0, 8.0, 5.0, 4.0, 5.0, 9.0, 1.0, 4.0, 3.0, 7.0, 4.0, 7.0, 3.0, 0.0, 0.0, 4.0, 4.0, 2.0, 6.0, 1.0, 5.0, 3.0, 9.0, 0.0, 5.0, 3.0, 3.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 1.0, 3.0, 4.0, 4.0, 0.0, 0.0, 0.0, 5.0, 2.0, 3.0, 1.0, 5.0, 5.0, 5.0, 6.0, 5.0, 10.0, 8.0, 3.0, 9.0, 10.0, 8.0, 7.0, 8.0, 5.0, 7.0, 16.0, 6.0, 16.0, 9.0, 10.0, 13.0, 18.0, 17.0, 14.0, 16.0, 10.0, 16.0, 22.0, 17.0, 20.0, 30.0, 13.0, 22.0, 17.0, 27.0, 9.0, 18.0, 25.0, 25.0, 23.0, 32.0, 24.0, 28.0, 24.0, 31.0, 26.0, 30.0, 32.0, 31.0, 31.0, 39.0, 38.0, 39.0, 32.0, 39.0, 40.0, 47.0, 57.0, 38.0, 66.0, 63.0, 58.0, 58.0, 53.0, 65.0, 62.0, 60.0, 59.0, 58.0, 49.0, 47.0, 52.0, 55.0, 53.0, 51.0, 62.0, 69.0, 55.0, 61.0, 52.0, 46.0, 56.0, 37.0, 53.0, 43.0, 51.0, 38.0, 46.0, 42.0, 53.0, 49.0, 35.0, 54.0, 50.0, 48.0, 45.0, 49.0, 50.0, 42.0, 42.0, 37.0, 45.0, 48.0, 44.0, 50.0, 37.0, 53.0, 52.0, 45.0, 50.0, 44.0, 50.0, 45.0, 53.0, 38.0, 52.0, 48.0, 43.0, 38.0, 38.0, 56.0, 54.0, 43.0, 44.0, 46.0, 41.0, 57.0, 48.0, 53.0, 53.0, 55.0, 64.0, 42.0, 61.0, 53.0, 47.0, 46.0, 45.0, 48.0, 53.0, 43.0, 39.0, 38.0, 46.0, 55.0, 54.0, 50.0, 74.0, 68.0, 63.0, 61.0, 44.0, 54.0, 37.0, 36.0, 32.0, 44.0, 31.0, 29.0, 19.0, 28.0, 36.0, 39.0, 22.0, 31.0, 19.0, 22.0, 18.0, 26.0, 15.0, 21.0, 16.0, 18.0, 17.0, 16.0, 17.0, 18.0, 18.0, 27.0, 15.0, 24.0, 15.0, 33.0, 17.0, 7.0, 13.0, 15.0, 16.0, 9.0, 12.0, 15.0, 16.0, 10.0, 11.0, 15.0, 16.0, 10.0, 14.0, 12.0, 11.0, 9.0, 8.0, 11.0, 9.0, 9.0, 13.0, 4.0, 8.0, 7.0, 5.0, 8.0, 5.0, 3.0, 4.0, 7.0, 9.0, 4.0, 3.0, 7.0, 5.0, 4.0, 4.0, 2.0, 2.0, 4.0, 0.0, 1.0, 2.0, 5.0, 3.0, 2.0, 1.0, 1.0, 1.0, 2.0, 4.0, 2.0, 0.0, 2.0, 2.0, 0.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 2.0, 0.0, 1.0, 1.0, 2.0, 2.0, 0.0, 2.0, 2.0, 2.0, 1.0, 0.0, 4.0, 2.0, 1.0, 1.0, 1.0, 3.0, 2.0, 5.0, 5.0, 2.0, 9.0, 11.0, 11.0, 9.0, 8.0, 7.0, 11.0, 11.0, 14.0, 23.0, 16.0, 19.0, 23.0, 29.0, 35.0, 44.0, 35.0, 33.0, 40.0, 35.0, 50.0, 37.0, 54.0, 47.0, 42.0, 57.0, 57.0, 37.0, 49.0, 57.0, 63.0, 49.0, 72.0, 61.0, 55.0, 45.0, 47.0, 55.0, 52.0, 51.0, 59.0, 38.0, 36.0, 46.0, 52.0, 50.0, 41.0, 45.0, 46.0, 45.0, 44.0, 59.0, 47.0, 43.0, 42.0, 51.0, 39.0, 45.0, 46.0, 34.0, 45.0, 50.0, 49.0, 47.0, 47.0, 42.0, 33.0, 50.0, 45.0, 46.0, 59.0, 51.0, 53.0, 31.0, 45.0, 46.0, 47.0, 48.0, 64.0, 53.0, 51.0, 74.0, 55.0, 43.0, 51.0, 55.0, 65.0, 49.0, 38.0, 50.0, 45.0, 42.0, 54.0, 49.0, 45.0, 47.0, 36.0, 66.0, 47.0, 59.0, 54.0, 52.0, 59.0, 59.0, 56.0, 62.0, 37.0, 44.0, 60.0, 67.0, 68.0, 55.0, 66.0, 72.0, 72.0, 62.0, 82.0, 78.0, 67.0, 50.0, 66.0, 79.0, 60.0, 53.0, 64.0, 55.0, 67.0, 55.0, 52.0, 61.0, 60.0, 63.0, 54.0, 48.0, 63.0, 56.0, 61.0, 63.0, 50.0, 60.0, 64.0, 66.0, 52.0, 73.0, 56.0, 66.0, 57.0, 59.0, 59.0, 60.0, 51.0, 65.0, 66.0, 50.0, 52.0, 59.0, 68.0, 62.0, 63.0, 55.0, 60.0, 55.0, 54.0, 40.0, 48.0, 46.0, 47.0, 46.0, 43.0, 39.0, 30.0, 29.0, 35.0, 36.0, 28.0, 36.0, 50.0, 33.0, 32.0, 37.0, 41.0, 36.0, 22.0, 35.0, 20.0, 39.0, 48.0, 28.0, 38.0, 18.0, 32.0, 38.0, 26.0, 17.0, 29.0, 23.0, 22.0, 21.0, 37.0, 28.0, 26.0, 25.0, 24.0, 15.0, 16.0, 15.0, 13.0, 16.0, 11.0, 16.0, 9.0, 8.0, 11.0, 16.0, 5.0, 6.0, 10.0, 9.0, 6.0, 7.0, 8.0, 16.0, 4.0, 6.0, 7.0, 4.0, 5.0, 3.0, 5.0, 5.0, 3.0, 5.0, 6.0, 2.0, 2.0, 1.0, 3.0, 1.0, 4.0, 2.0, 2.0, 2.0, 1.0, 1.0, 3.0, 4.0, 2.0, 0.0, 0.0, 2.0, 0.0, 1.0, 0.0, 0.0, 2.0, 2.0, 2.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 3.0, 1.0, 2.0, 1.0, 1.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 5.0, 4.0, 4.0, 2.0, 9.0, 5.0, 7.0, 8.0, 10.0, 7.0, 14.0, 9.0, 20.0, 15.0, 17.0, 19.0, 27.0, 29.0, 32.0, 34.0, 28.0, 29.0, 46.0, 47.0, 40.0, 44.0, 43.0, 38.0, 85.0, 68.0, 70.0, 66.0, 59.0, 66.0, 57.0, 67.0, 61.0, 85.0, 61.0, 63.0, 55.0, 56.0, 59.0, 50.0, 63.0, 53.0, 52.0, 48.0, 65.0, 65.0, 51.0, 53.0, 38.0, 48.0, 56.0, 58.0, 43.0, 46.0, 39.0, 49.0, 31.0, 58.0, 35.0, 52.0, 51.0, 49.0, 48.0, 54.0, 51.0, 44.0, 64.0, 30.0, 55.0, 51.0, 50.0, 39.0, 50.0, 55.0, 65.0, 58.0, 46.0, 64.0, 67.0, 65.0, 56.0, 64.0, 45.0, 61.0, 72.0, 93.0, 72.0, 73.0, 81.0, 78.0, 68.0, 67.0, 54.0, 62.0, 59.0, 62.0, 66.0, 58.0, 55.0, 64.0, 63.0, 61.0, 59.0, 51.0, 58.0, 58.0, 62.0, 69.0, 67.0, 71.0, 70.0, 68.0, 65.0, 57.0, 72.0, 69.0, 66.0, 68.0, 66.0, 61.0, 66.0, 57.0, 67.0, 63.0, 77.0, 67.0, 75.0, 81.0, 64.0, 63.0, 59.0, 57.0, 62.0, 55.0, 41.0, 66.0, 62.0, 60.0, 65.0, 56.0, 51.0, 70.0, 51.0, 61.0, 56.0, 58.0, 72.0, 55.0, 62.0, 71.0, 63.0, 75.0, 71.0, 68.0, 61.0, 75.0, 77.0, 63.0, 75.0, 70.0, 53.0, 59.0, 50.0, 48.0, 49.0, 63.0, 40.0, 50.0, 53.0, 45.0, 45.0, 40.0, 37.0, 42.0, 35.0, 35.0, 29.0, 38.0, 26.0, 30.0, 30.0, 29.0, 36.0, 27.0, 35.0, 28.0, 26.0, 29.0, 32.0, 35.0, 31.0, 34.0, 33.0, 33.0, 26.0, 35.0, 34.0, 31.0, 45.0, 29.0, 27.0, 27.0, 28.0, 21.0, 12.0, 15.0, 18.0, 27.0, 18.0, 16.0, 17.0, 18.0, 19.0, 16.0, 12.0, 10.0, 8.0, 13.0, 9.0, 3.0, 5.0, 6.0, 6.0, 4.0, 9.0, 10.0, 13.0, 4.0, 5.0, 7.0, 3.0, 6.0, 7.0, 4.0, 4.0, 7.0, 5.0, 6.0, 4.0, 5.0, 5.0, 3.0, 2.0, 1.0, 4.0, 2.0, 0.0, 1.0, 3.0, 0.0, 3.0, 2.0, 1.0, 3.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 1.0, 3.0, 2.0, 3.0, 0.0, 5.0, 1.0, 1.0, 3.0, 2.0, 4.0, 6.0, 7.0, 5.0, 4.0, 11.0, 4.0, 9.0, 13.0, 9.0, 11.0, 18.0, 12.0, 22.0, 13.0, 18.0, 25.0, 18.0, 34.0, 48.0, 53.0, 31.0, 31.0, 37.0, 32.0, 64.0, 49.0, 56.0, 51.0, 70.0, 71.0, 49.0, 63.0, 73.0, 65.0, 59.0, 65.0, 75.0, 58.0, 71.0, 69.0, 63.0, 53.0, 46.0, 67.0, 61.0, 42.0, 60.0, 58.0, 58.0, 44.0, 51.0, 58.0, 66.0, 53.0, 69.0, 67.0, 67.0, 51.0, 56.0, 64.0, 49.0, 56.0, 52.0, 47.0, 43.0, 62.0, 45.0, 42.0, 49.0, 54.0, 56.0, 56.0, 53.0, 58.0, 55.0, 63.0, 55.0, 70.0, 81.0, 69.0, 64.0, 64.0, 64.0, 75.0, 88.0, 71.0, 63.0, 86.0, 76.0, 70.0, 70.0, 65.0, 59.0, 76.0, 60.0, 71.0, 55.0, 53.0, 64.0, 54.0, 65.0, 80.0, 72.0, 77.0, 58.0, 62.0, 57.0, 64.0, 79.0, 63.0, 68.0, 63.0, 66.0, 76.0, 63.0, 48.0, 51.0, 45.0, 50.0, 49.0, 58.0, 39.0, 38.0, 41.0, 44.0, 54.0, 48.0, 50.0, 46.0, 56.0, 56.0, 60.0, 35.0, 49.0, 39.0, 44.0, 37.0, 52.0, 52.0, 50.0, 48.0, 48.0, 59.0, 64.0, 67.0, 46.0, 48.0, 53.0, 55.0, 62.0, 55.0, 68.0, 52.0, 69.0, 70.0, 65.0, 69.0, 67.0, 76.0, 67.0, 64.0, 74.0, 76.0, 60.0, 57.0, 64.0, 58.0, 61.0, 59.0, 51.0, 59.0, 41.0, 54.0, 42.0, 49.0, 46.0, 46.0, 43.0, 37.0, 47.0, 33.0, 32.0, 46.0, 45.0, 52.0, 39.0, 40.0, 33.0, 30.0, 54.0, 39.0, 48.0, 50.0, 41.0, 42.0, 46.0, 52.0, 38.0, 41.0, 26.0, 50.0, 32.0, 30.0, 33.0, 27.0, 40.0, 27.0, 30.0, 24.0, 32.0, 28.0, 15.0, 18.0, 17.0, 12.0, 8.0, 6.0, 14.0, 15.0, 13.0, 8.0, 15.0, 10.0, 6.0, 9.0, 12.0, 7.0, 9.0, 8.0, 9.0, 11.0, 5.0, 6.0, 14.0, 13.0, 8.0, 3.0, 10.0, 11.0, 3.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 0.0, 1.0, 3.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 4.0, 4.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 2.0, 1.0, 1.0, 0.0, 1.0, 4.0, 2.0, 4.0, 1.0, 0.0, 1.0, 3.0, 2.0, 2.0, 1.0, 2.0, 1.0, 6.0, 4.0, 4.0, 7.0, 7.0, 5.0, 8.0, 9.0, 9.0, 5.0, 7.0, 14.0, 14.0, 12.0, 19.0, 24.0, 24.0, 32.0, 27.0, 46.0, 43.0, 45.0, 45.0, 35.0, 40.0, 60.0, 52.0, 50.0, 57.0, 62.0, 61.0, 61.0, 65.0, 66.0, 67.0, 69.0, 58.0, 66.0, 52.0, 74.0, 55.0, 59.0, 59.0, 56.0, 61.0, 76.0, 59.0, 51.0, 54.0, 54.0, 50.0, 68.0, 43.0, 62.0, 54.0, 54.0, 55.0, 47.0, 50.0, 65.0, 46.0, 50.0, 46.0, 53.0, 53.0, 44.0, 49.0, 56.0, 51.0, 44.0, 52.0, 46.0, 59.0, 60.0, 40.0, 50.0, 68.0, 53.0, 61.0, 56.0, 56.0, 64.0, 72.0, 64.0, 68.0, 63.0, 63.0, 46.0, 44.0, 57.0, 62.0, 58.0, 53.0, 65.0, 48.0, 59.0, 69.0, 59.0, 53.0, 62.0, 61.0, 62.0, 64.0, 58.0, 51.0, 71.0, 53.0, 49.0, 73.0, 57.0, 71.0, 60.0, 86.0, 64.0, 69.0, 61.0, 72.0, 79.0, 77.0, 74.0, 65.0, 60.0, 82.0, 70.0, 64.0, 63.0, 64.0, 66.0, 59.0, 60.0, 61.0, 50.0, 65.0, 61.0, 63.0, 43.0, 56.0, 57.0, 54.0, 48.0, 49.0, 56.0, 69.0, 63.0, 82.0, 59.0, 69.0, 56.0, 58.0, 67.0, 65.0, 59.0, 58.0, 56.0, 60.0, 61.0, 68.0, 57.0, 67.0, 66.0, 52.0, 65.0, 66.0, 58.0, 64.0, 64.0, 57.0, 60.0, 63.0, 65.0, 55.0, 47.0, 41.0, 44.0, 58.0, 56.0, 46.0, 40.0, 28.0, 52.0, 41.0, 37.0, 40.0, 43.0, 44.0, 39.0, 33.0, 46.0, 37.0, 35.0, 30.0, 24.0, 45.0, 44.0, 33.0, 44.0, 28.0, 37.0, 42.0, 38.0, 39.0, 29.0, 30.0, 31.0, 25.0, 32.0, 22.0, 37.0, 23.0, 30.0, 30.0, 17.0, 28.0, 10.0, 12.0, 20.0, 14.0, 27.0, 16.0, 13.0, 22.0, 18.0, 20.0, 10.0, 15.0, 14.0, 5.0, 7.0, 13.0, 14.0, 9.0, 6.0, 5.0, 5.0, 5.0, 5.0, 3.0, 8.0, 8.0, 3.0, 2.0, 3.0, 3.0, 3.0, 4.0, 7.0, 5.0, 3.0, 3.0, 2.0, 1.0, 1.0, 0.0, 3.0, 2.0, 3.0, 1.0, 1.0, 0.0, 3.0, 2.0, 0.0, 6.0, 1.0, 1.0, 0.0, 3.0, 1.0, 1.0, 2.0, 0.0, 1.0, 0.0, 1.0, 0.0, 4.0, 3.0, 4.0, 0.0, 0.0, 0.0, 2.0, 5.0, 3.0, 0.0, 4.0, 1.0, 2.0, 7.0, 3.0, 3.0, 2.0, 5.0, 1.0, 8.0, 8.0, 9.0, 8.0, 7.0, 10.0, 13.0, 8.0, 9.0, 15.0, 20.0, 28.0, 24.0, 28.0, 27.0, 33.0, 38.0, 33.0, 33.0, 40.0, 49.0, 50.0, 49.0, 53.0, 57.0, 54.0, 77.0, 62.0, 61.0, 68.0, 70.0, 72.0, 57.0, 62.0, 63.0, 59.0, 66.0, 48.0, 53.0, 45.0, 49.0, 35.0, 64.0, 49.0, 56.0, 60.0, 41.0, 55.0, 54.0, 50.0, 49.0, 44.0, 48.0, 47.0, 52.0, 51.0, 45.0, 58.0, 54.0, 47.0, 55.0, 44.0, 30.0, 48.0, 66.0, 56.0, 39.0, 62.0, 46.0, 50.0, 58.0, 58.0, 59.0, 72.0, 62.0, 64.0, 61.0, 47.0, 48.0, 51.0, 56.0, 56.0, 56.0, 48.0, 55.0, 46.0, 62.0, 51.0, 39.0, 52.0, 43.0, 63.0, 54.0, 44.0, 54.0, 61.0, 53.0, 54.0, 53.0, 54.0, 55.0, 52.0, 60.0, 65.0, 51.0, 66.0, 56.0, 64.0, 55.0, 68.0, 61.0, 60.0, 68.0, 59.0, 62.0, 58.0, 70.0, 49.0, 63.0, 65.0, 52.0, 55.0, 60.0, 59.0, 82.0, 34.0, 52.0, 51.0, 58.0, 43.0, 40.0, 38.0, 43.0, 49.0, 48.0, 60.0, 58.0, 51.0, 41.0, 65.0, 64.0, 68.0, 58.0, 75.0, 48.0, 60.0, 59.0, 69.0, 71.0, 78.0, 60.0, 49.0, 71.0, 57.0, 67.0, 45.0, 53.0, 67.0, 57.0, 42.0, 55.0, 51.0, 54.0, 52.0, 60.0, 37.0, 54.0, 44.0, 43.0, 49.0, 41.0, 42.0, 34.0, 46.0, 31.0, 37.0, 38.0, 38.0, 43.0, 35.0, 45.0, 41.0, 34.0, 43.0, 34.0, 26.0, 23.0, 30.0, 44.0, 32.0, 38.0, 32.0, 35.0, 39.0, 26.0, 35.0, 21.0, 16.0, 26.0, 30.0, 39.0, 28.0, 29.0, 29.0, 23.0, 25.0, 23.0, 25.0, 24.0, 28.0, 20.0, 25.0, 18.0, 18.0, 15.0, 21.0, 24.0, 17.0, 16.0, 17.0, 17.0, 15.0, 17.0, 12.0, 10.0, 11.0, 15.0, 6.0, 8.0, 5.0, 8.0, 12.0, 6.0, 9.0, 10.0, 14.0, 6.0, 6.0, 6.0, 5.0, 4.0, 8.0, 7.0, 8.0, 5.0, 9.0, 6.0, 4.0, 9.0, 13.0, 6.0, 13.0, 3.0, 3.0, 4.0, 3.0, 3.0, 6.0, 4.0, 5.0, 4.0, 4.0, 3.0, 2.0, 2.0, 3.0, 3.0, 2.0, 2.0, 3.0, 3.0, 3.0, 0.0, 2.0, 1.0, 0.0, 3.0, 5.0, 1.0, 3.0, 2.0, 1.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 4.0, 7.0, 4.0, 6.0, 7.0, 8.0, 7.0, 7.0, 9.0, 7.0, 12.0, 11.0, 13.0, 8.0, 20.0, 13.0, 15.0, 15.0, 17.0, 16.0, 17.0, 15.0, 16.0, 24.0, 13.0, 12.0, 14.0, 14.0, 21.0, 19.0, 23.0, 24.0, 16.0, 16.0, 32.0, 34.0, 35.0, 28.0, 23.0, 30.0, 34.0, 28.0, 32.0, 31.0, 27.0, 35.0, 30.0, 28.0, 43.0, 22.0, 34.0, 35.0, 29.0, 30.0, 33.0, 49.0, 40.0, 40.0, 45.0, 52.0, 36.0, 42.0, 41.0, 42.0, 34.0, 50.0, 39.0, 48.0, 40.0, 46.0, 51.0, 52.0, 45.0, 50.0, 37.0, 52.0, 36.0, 43.0, 52.0, 46.0, 32.0, 62.0, 46.0, 46.0, 80.0, 53.0, 63.0, 59.0, 58.0, 51.0, 58.0, 56.0, 51.0, 50.0, 48.0, 55.0, 46.0, 68.0, 58.0, 45.0, 58.0, 64.0, 42.0, 53.0, 61.0, 48.0, 55.0, 48.0, 48.0, 43.0, 50.0, 51.0, 54.0, 39.0, 60.0, 34.0, 53.0, 51.0, 65.0, 50.0, 51.0, 48.0, 41.0, 46.0, 57.0, 51.0, 39.0, 60.0, 41.0, 44.0, 46.0, 47.0, 47.0, 50.0, 51.0, 50.0, 53.0, 64.0, 59.0, 60.0, 55.0, 38.0, 51.0, 58.0, 53.0, 57.0, 51.0, 52.0, 59.0, 56.0, 50.0, 50.0, 50.0, 43.0, 54.0, 39.0, 49.0, 45.0, 43.0, 47.0, 51.0, 48.0, 51.0, 42.0, 58.0, 44.0, 47.0, 45.0, 34.0, 38.0, 42.0, 30.0, 29.0, 39.0, 31.0, 38.0, 33.0, 34.0, 26.0, 30.0, 33.0, 41.0, 28.0, 26.0, 27.0, 23.0, 24.0, 19.0, 24.0, 22.0, 20.0, 20.0, 18.0, 18.0, 28.0, 22.0, 16.0, 20.0, 21.0, 24.0, 20.0, 28.0, 21.0, 19.0, 28.0, 20.0, 15.0, 12.0, 23.0, 20.0, 15.0, 14.0, 15.0, 14.0, 15.0, 20.0, 22.0, 22.0, 10.0, 11.0, 14.0, 10.0, 8.0, 7.0, 12.0, 9.0, 6.0, 5.0, 14.0, 13.0, 9.0, 13.0, 11.0, 6.0, 8.0, 9.0, 9.0, 13.0, 3.0, 2.0, 3.0, 4.0, 7.0, 8.0, 4.0, 5.0, 6.0, 4.0, 5.0, 9.0, 4.0, 3.0, 4.0, 3.0, 7.0, 3.0, 5.0, 2.0, 3.0, 2.0, 4.0, 0.0, 0.0, 2.0, 4.0, 1.0, 2.0, 4.0, 2.0, 3.0, 3.0, 1.0, 1.0, 1.0, 0.0, 0.0, 3.0, 3.0, 1.0, 2.0, 6.0, 1.0, 4.0, 2.0, 5.0, 2.0, 4.0, 1.0, 5.0, 8.0, 6.0, 5.0, 6.0, 7.0, 3.0, 4.0, 1.0, 3.0, 13.0, 10.0, 6.0, 6.0, 7.0, 7.0, 13.0, 8.0, 9.0, 10.0, 9.0, 12.0, 10.0, 7.0, 11.0, 9.0, 9.0, 8.0, 8.0, 18.0, 18.0, 12.0, 16.0, 14.0, 15.0, 18.0, 23.0, 19.0, 15.0, 16.0, 24.0, 21.0, 24.0, 19.0, 22.0, 27.0, 21.0, 27.0, 23.0, 36.0, 28.0, 29.0, 31.0, 32.0, 27.0, 20.0, 25.0, 24.0, 29.0, 25.0, 28.0, 33.0, 25.0, 32.0, 34.0, 36.0, 30.0, 35.0, 34.0, 41.0, 36.0, 36.0, 22.0, 30.0, 34.0, 32.0, 27.0, 35.0, 38.0, 39.0, 41.0, 38.0, 31.0, 57.0, 47.0, 36.0, 35.0, 26.0, 41.0, 29.0, 53.0, 36.0, 50.0, 38.0, 41.0, 46.0, 39.0, 30.0, 27.0, 34.0, 42.0, 43.0, 38.0, 44.0, 43.0, 49.0, 26.0, 35.0, 55.0, 38.0, 37.0, 44.0, 46.0, 52.0, 40.0, 43.0, 30.0, 42.0, 48.0, 34.0, 39.0, 45.0, 31.0, 44.0, 46.0, 37.0, 39.0, 30.0, 34.0, 23.0, 32.0, 42.0, 40.0, 35.0, 42.0, 32.0, 34.0, 37.0, 37.0, 36.0, 28.0, 37.0, 43.0, 32.0, 28.0, 28.0, 33.0, 28.0, 25.0, 31.0, 33.0, 30.0, 35.0, 24.0, 33.0, 22.0, 18.0, 27.0, 37.0, 32.0, 34.0, 25.0, 31.0, 23.0, 14.0, 16.0, 16.0, 17.0, 20.0, 22.0, 19.0, 17.0, 26.0, 22.0, 20.0, 21.0, 25.0, 16.0, 21.0, 30.0, 21.0, 22.0, 19.0, 16.0, 16.0, 17.0, 16.0, 11.0, 16.0, 16.0, 9.0, 22.0, 20.0, 9.0, 24.0, 12.0, 25.0, 19.0, 16.0, 14.0, 20.0, 14.0, 11.0, 8.0, 10.0, 12.0, 10.0, 11.0, 8.0, 17.0, 9.0, 12.0, 9.0, 10.0, 8.0, 8.0, 7.0, 10.0, 4.0, 8.0, 6.0, 8.0, 7.0, 3.0, 3.0, 1.0, 1.0, 2.0, 5.0, 0.0, 1.0, 2.0, 3.0, 2.0, 3.0, 1.0, 3.0, 5.0, 2.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 0.0, 3.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 3.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 5.0, 1.0, 5.0, 2.0, 6.0, 1.0, 2.0, 1.0, 2.0, 6.0, 8.0, 8.0, 6.0, 7.0, 7.0, 10.0, 8.0, 14.0, 18.0, 17.0, 16.0, 23.0, 19.0, 26.0, 24.0, 31.0, 28.0, 35.0, 27.0, 29.0, 46.0, 44.0, 35.0, 39.0, 47.0, 37.0, 45.0, 47.0, 42.0, 47.0, 54.0, 50.0, 61.0, 62.0, 45.0, 50.0, 55.0, 51.0, 48.0, 62.0, 45.0, 49.0, 34.0, 41.0, 45.0, 63.0, 45.0, 39.0, 46.0, 57.0, 46.0, 56.0, 40.0, 34.0, 43.0, 35.0, 44.0, 52.0, 39.0, 46.0, 41.0, 43.0, 42.0, 41.0, 45.0, 40.0, 42.0, 39.0, 39.0, 48.0, 42.0, 41.0, 52.0, 51.0, 55.0, 57.0, 47.0, 47.0, 52.0, 53.0, 39.0, 54.0, 51.0, 60.0, 56.0, 49.0, 59.0, 56.0, 54.0, 71.0, 53.0, 40.0, 54.0, 46.0, 46.0, 39.0, 43.0, 51.0, 58.0, 48.0, 43.0, 51.0, 45.0, 59.0, 54.0, 45.0, 51.0, 64.0, 65.0, 54.0, 51.0, 48.0, 55.0, 56.0, 55.0, 49.0, 58.0, 65.0, 86.0, 54.0, 61.0, 70.0, 53.0, 56.0, 79.0, 54.0, 56.0, 48.0, 59.0, 54.0, 35.0, 58.0, 56.0, 43.0, 48.0, 49.0, 62.0, 59.0, 43.0, 45.0, 55.0, 62.0, 55.0, 59.0, 40.0, 67.0, 62.0, 37.0, 61.0, 63.0, 52.0, 61.0, 61.0, 58.0, 51.0, 37.0, 52.0, 47.0, 53.0, 62.0, 41.0, 61.0, 47.0, 37.0, 50.0, 56.0, 35.0, 36.0, 41.0, 30.0, 40.0, 37.0, 38.0, 36.0, 38.0, 40.0, 44.0, 35.0, 41.0, 43.0, 25.0, 35.0, 35.0, 27.0, 25.0, 35.0, 42.0, 24.0, 29.0, 32.0, 28.0, 24.0, 30.0, 20.0, 27.0, 20.0, 16.0, 24.0, 25.0, 15.0, 15.0, 17.0, 17.0, 18.0, 21.0, 10.0, 15.0, 14.0, 9.0, 9.0, 14.0, 10.0, 8.0, 12.0, 13.0, 9.0, 9.0, 9.0, 10.0, 16.0, 8.0, 16.0, 10.0, 9.0, 6.0, 4.0, 3.0, 4.0, 7.0, 5.0, 1.0, 2.0, 3.0, 7.0, 2.0, 5.0, 2.0, 2.0, 1.0, 2.0, 1.0, 1.0, 4.0, 3.0, 3.0, 3.0, 2.0, 3.0, 3.0, 4.0, 1.0, 1.0, 1.0, 0.0, 3.0, 0.0, 2.0, 1.0, 3.0, 2.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 2.0, 0.0, 2.0, 0.0, 4.0, 1.0, 1.0, 1.0, 3.0, 0.0, 5.0, 2.0, 4.0, 3.0, 7.0, 6.0, 13.0, 7.0, 10.0, 9.0, 7.0, 13.0, 17.0, 8.0, 14.0, 17.0, 23.0, 27.0, 41.0, 33.0, 37.0, 29.0, 35.0, 30.0, 40.0, 33.0, 44.0, 45.0, 53.0, 53.0, 58.0, 56.0, 42.0, 52.0, 55.0, 58.0, 51.0, 56.0, 61.0, 51.0, 55.0, 61.0, 70.0, 48.0, 42.0, 59.0, 49.0, 44.0, 40.0, 51.0, 54.0, 54.0, 51.0, 57.0, 54.0, 48.0, 57.0, 47.0, 41.0, 42.0, 43.0, 51.0, 37.0, 44.0, 47.0, 41.0, 63.0, 49.0, 57.0, 51.0, 55.0, 44.0, 47.0, 58.0, 44.0, 55.0, 44.0, 69.0, 60.0, 59.0, 65.0, 52.0, 57.0, 46.0, 57.0, 67.0, 49.0, 65.0, 45.0, 53.0, 60.0, 70.0, 53.0, 47.0, 42.0, 52.0, 55.0, 66.0, 42.0, 62.0, 46.0, 65.0, 60.0, 57.0, 46.0, 54.0, 61.0, 45.0, 51.0, 53.0, 71.0, 69.0, 56.0, 66.0, 67.0, 67.0, 57.0, 77.0, 64.0, 66.0, 63.0, 86.0, 71.0, 67.0, 68.0, 63.0, 74.0, 61.0, 64.0, 61.0, 55.0, 53.0, 53.0, 39.0, 48.0, 46.0, 44.0, 54.0, 57.0, 59.0, 54.0, 39.0, 50.0, 63.0, 44.0, 54.0, 46.0, 54.0, 76.0, 53.0, 55.0, 51.0, 47.0, 44.0, 55.0, 59.0, 51.0, 57.0, 66.0, 49.0, 50.0, 59.0, 55.0, 69.0, 68.0, 48.0, 69.0, 55.0, 49.0, 57.0, 56.0, 46.0, 58.0, 45.0, 44.0, 41.0, 50.0, 44.0, 38.0, 42.0, 49.0, 43.0, 40.0, 48.0, 42.0, 53.0, 35.0, 41.0, 40.0, 46.0, 29.0, 40.0, 38.0, 22.0, 35.0, 19.0, 32.0, 26.0, 31.0, 26.0, 31.0, 27.0, 32.0, 24.0, 32.0, 27.0, 26.0, 29.0, 16.0, 21.0, 13.0, 15.0, 15.0, 17.0, 8.0, 14.0, 10.0, 16.0, 14.0, 14.0, 8.0, 8.0, 13.0, 12.0, 4.0, 14.0, 12.0, 12.0, 7.0, 4.0, 3.0, 8.0, 6.0, 2.0, 8.0, 6.0, 4.0, 6.0, 4.0, 2.0, 2.0, 3.0, 2.0, 3.0, 3.0, 2.0, 5.0, 1.0, 1.0, 1.0, 1.0, 0.0, 2.0, 3.0, 5.0, 1.0, 0.0, 2.0, 1.0, 2.0, 1.0, 2.0, 4.0, 1.0, 2.0, 2.0, 0.0, 2.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 3.0, 1.0, 4.0, 6.0, 2.0, 7.0, 7.0, 6.0, 7.0, 15.0, 6.0, 10.0, 8.0, 20.0, 12.0, 17.0, 19.0, 15.0, 24.0, 37.0, 44.0, 35.0, 33.0, 32.0, 46.0, 30.0, 40.0, 34.0, 37.0, 47.0, 45.0, 51.0, 57.0, 52.0, 55.0, 61.0, 69.0, 50.0, 66.0, 53.0, 52.0, 69.0, 54.0, 55.0, 68.0, 46.0, 56.0, 42.0, 33.0, 52.0, 41.0, 41.0, 50.0, 44.0, 42.0, 57.0, 60.0, 45.0, 53.0, 47.0, 49.0, 55.0, 53.0, 41.0, 44.0, 63.0, 46.0, 45.0, 54.0, 55.0, 51.0, 51.0, 57.0, 39.0, 53.0, 49.0, 53.0, 45.0, 59.0, 51.0, 58.0, 51.0, 52.0, 66.0, 68.0, 76.0, 54.0, 74.0, 57.0, 48.0, 61.0, 73.0, 49.0, 62.0, 58.0, 58.0, 60.0, 58.0, 59.0, 41.0, 50.0, 61.0, 54.0, 59.0, 44.0, 54.0, 67.0, 48.0, 53.0, 49.0, 60.0, 52.0, 54.0, 65.0, 60.0, 44.0, 65.0, 82.0, 61.0, 64.0, 67.0, 55.0, 61.0, 58.0, 58.0, 46.0, 47.0, 61.0, 61.0, 63.0, 55.0, 50.0, 51.0, 56.0, 50.0, 45.0, 44.0, 46.0, 45.0, 51.0, 46.0, 59.0, 48.0, 60.0, 57.0, 59.0, 47.0, 55.0, 58.0, 55.0, 50.0, 63.0, 45.0, 67.0, 59.0, 49.0, 57.0, 37.0, 46.0, 52.0, 49.0, 48.0, 57.0, 63.0, 59.0, 60.0, 61.0, 44.0, 47.0, 49.0, 54.0, 40.0, 40.0, 49.0, 42.0, 44.0, 35.0, 29.0, 56.0, 40.0, 40.0, 42.0, 34.0, 38.0, 39.0, 31.0, 33.0, 37.0, 30.0, 48.0, 35.0, 45.0, 39.0, 31.0, 28.0, 35.0, 47.0, 50.0, 37.0, 34.0, 37.0, 43.0, 44.0, 39.0, 49.0, 52.0, 76.0, 77.0, 69.0, 73.0, 50.0, 40.0, 43.0, 23.0, 32.0, 20.0, 15.0, 17.0, 13.0, 10.0, 16.0, 18.0, 10.0, 15.0, 13.0, 8.0, 5.0, 7.0, 8.0, 13.0, 4.0, 3.0, 6.0, 7.0, 12.0, 6.0, 3.0, 8.0, 6.0, 6.0, 6.0, 3.0, 7.0, 3.0, 1.0, 1.0, 2.0, 8.0, 2.0, 1.0, 3.0, 5.0, 3.0, 0.0, 0.0, 2.0, 1.0, 1.0, 4.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0, 2.0, 3.0, 3.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 5.0, 1.0, 4.0, 3.0, 3.0, 1.0, 0.0, 1.0, 1.0, 1.0, 3.0, 1.0, 5.0, 3.0, 6.0, 5.0, 8.0, 6.0, 10.0, 8.0, 7.0, 5.0, 11.0, 13.0, 16.0, 24.0, 24.0, 31.0, 29.0, 37.0, 56.0, 39.0, 45.0, 35.0, 47.0, 44.0, 45.0, 56.0, 39.0, 45.0, 57.0, 46.0, 50.0, 58.0, 52.0, 59.0, 62.0, 81.0, 61.0, 56.0, 70.0, 70.0, 58.0, 51.0, 51.0, 61.0, 56.0, 72.0, 47.0, 61.0, 70.0, 45.0, 47.0, 57.0, 60.0, 63.0, 58.0, 49.0, 49.0, 60.0, 52.0, 58.0, 52.0, 61.0, 63.0, 49.0, 56.0, 59.0, 44.0, 49.0, 58.0, 58.0, 64.0, 52.0, 64.0, 58.0, 62.0, 63.0, 51.0, 61.0, 70.0, 56.0, 70.0, 66.0, 59.0, 75.0, 71.0, 54.0, 47.0, 68.0, 61.0, 62.0, 50.0, 59.0, 44.0, 60.0, 70.0, 56.0, 55.0, 57.0, 52.0, 57.0, 84.0, 80.0, 97.0, 79.0, 93.0, 76.0, 73.0, 49.0, 74.0, 64.0, 80.0, 60.0, 58.0, 53.0, 64.0, 64.0, 50.0, 50.0, 58.0, 60.0, 51.0, 64.0, 60.0, 56.0, 52.0, 66.0, 68.0, 57.0, 47.0, 56.0, 64.0, 40.0, 42.0, 47.0, 48.0, 47.0, 39.0, 44.0, 46.0, 55.0, 41.0, 64.0, 58.0, 60.0, 65.0, 46.0, 65.0, 63.0, 63.0, 41.0, 63.0, 53.0, 42.0, 60.0, 48.0, 68.0, 42.0, 55.0, 58.0, 41.0, 48.0, 56.0, 46.0, 61.0, 49.0, 59.0, 40.0, 37.0, 57.0, 39.0, 47.0, 49.0, 31.0, 47.0, 46.0, 32.0, 48.0, 37.0, 28.0, 26.0, 23.0, 31.0, 36.0, 42.0, 32.0, 34.0, 34.0, 29.0, 28.0, 31.0, 40.0, 33.0, 30.0, 25.0, 31.0, 31.0, 31.0, 39.0, 27.0, 28.0, 43.0, 48.0, 52.0, 50.0, 36.0, 34.0, 29.0, 18.0, 31.0, 19.0, 17.0, 14.0, 28.0, 23.0, 20.0, 14.0, 12.0, 19.0, 11.0, 15.0, 16.0, 17.0, 23.0, 20.0, 9.0, 6.0, 12.0, 12.0, 11.0, 10.0, 13.0, 4.0, 12.0, 10.0, 10.0, 1.0, 7.0, 3.0, 6.0, 2.0, 4.0, 8.0, 6.0, 5.0, 5.0, 7.0, 5.0, 7.0, 5.0, 3.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 0.0, 3.0, 2.0, 2.0, 3.0, 0.0, 4.0, 5.0, 3.0, 1.0, 2.0, 1.0, 2.0, 3.0, 0.0, 0.0, 0.0, 3.0, 1.0, 0.0, 3.0, 0.0, 0.0, 5.0, 4.0, 5.0, 2.0, 1.0, 1.0, 2.0, 2.0, 4.0, 3.0, 4.0, 5.0, 10.0, 5.0, 11.0, 6.0, 14.0, 10.0, 11.0, 10.0, 14.0, 13.0, 9.0, 18.0, 17.0, 17.0, 28.0, 33.0, 32.0, 23.0, 21.0, 16.0, 40.0, 28.0, 33.0, 41.0, 38.0, 42.0, 38.0, 44.0, 35.0, 40.0, 56.0, 56.0, 56.0, 70.0, 51.0, 49.0, 58.0, 45.0, 51.0, 54.0, 56.0, 45.0, 55.0, 49.0, 42.0, 52.0, 48.0, 47.0, 45.0, 40.0, 48.0, 51.0, 38.0, 34.0, 44.0, 33.0, 33.0, 45.0, 44.0, 51.0, 54.0, 44.0, 44.0, 51.0, 47.0, 38.0, 58.0, 46.0, 52.0, 55.0, 50.0, 49.0, 63.0, 46.0, 58.0, 74.0, 69.0, 57.0, 59.0, 59.0, 56.0, 58.0, 50.0, 53.0, 51.0, 50.0, 49.0, 56.0, 67.0, 50.0, 49.0, 54.0, 56.0, 43.0, 46.0, 49.0, 59.0, 42.0, 45.0, 53.0, 61.0, 53.0, 59.0, 46.0, 43.0, 50.0, 48.0, 55.0, 44.0, 63.0, 44.0, 59.0, 63.0, 51.0, 44.0, 60.0, 49.0, 50.0, 48.0, 70.0, 57.0, 64.0, 47.0, 39.0, 51.0, 37.0, 53.0, 41.0, 62.0, 41.0, 54.0, 49.0, 39.0, 41.0, 46.0, 35.0, 35.0, 42.0, 54.0, 45.0, 49.0, 56.0, 51.0, 49.0, 39.0, 53.0, 46.0, 39.0, 52.0, 52.0, 54.0, 65.0, 54.0, 54.0, 44.0, 45.0, 51.0, 60.0, 50.0, 58.0, 54.0, 53.0, 58.0, 51.0, 46.0, 49.0, 48.0, 49.0, 43.0, 34.0, 47.0, 41.0, 38.0, 39.0, 36.0, 38.0, 38.0, 36.0, 43.0, 33.0, 29.0, 37.0, 31.0, 40.0, 28.0, 44.0, 35.0, 22.0, 29.0, 28.0, 27.0, 22.0, 21.0, 28.0, 22.0, 16.0, 23.0, 26.0, 31.0, 19.0, 30.0, 25.0, 20.0, 18.0, 28.0, 12.0, 28.0, 13.0, 11.0, 18.0, 17.0, 25.0, 19.0, 14.0, 17.0, 10.0, 20.0, 24.0, 14.0, 12.0, 16.0, 11.0, 14.0, 8.0, 9.0, 10.0, 9.0, 15.0, 14.0, 13.0, 11.0, 7.0, 10.0, 15.0, 10.0, 6.0, 9.0, 13.0, 13.0, 5.0, 4.0, 8.0, 2.0, 9.0, 5.0, 4.0, 4.0, 1.0, 5.0, 3.0, 0.0, 3.0, 2.0, 2.0, 9.0, 5.0, 2.0, 2.0, 4.0, 1.0, 3.0, 5.0, 3.0, 1.0, 4.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 3.0, 3.0, 1.0, 2.0, 4.0, 2.0, 1.0, 2.0, 3.0, 1.0, 1.0, 2.0, 2.0, 3.0, 5.0, 2.0, 3.0, 5.0, 2.0, 1.0, 2.0, 6.0, 1.0, 3.0, 5.0, 4.0, 4.0, 2.0, 7.0, 5.0, 8.0, 7.0, 7.0, 11.0, 9.0, 7.0, 8.0, 1.0, 8.0, 9.0, 6.0, 7.0, 14.0, 9.0, 9.0, 15.0, 15.0, 10.0, 14.0, 19.0, 16.0, 22.0, 12.0, 17.0, 14.0, 28.0, 29.0, 19.0, 14.0, 16.0, 22.0, 23.0, 22.0, 26.0, 26.0, 39.0, 26.0, 29.0, 23.0, 26.0, 29.0, 19.0, 24.0, 27.0, 31.0, 24.0, 29.0, 31.0, 32.0, 30.0, 37.0, 23.0, 36.0, 32.0, 30.0, 31.0, 34.0, 35.0, 34.0, 28.0, 44.0, 46.0, 57.0, 39.0, 48.0, 50.0, 38.0, 42.0, 43.0, 47.0, 56.0, 38.0, 37.0, 40.0, 54.0, 37.0, 48.0, 57.0, 39.0, 57.0, 42.0, 50.0, 47.0, 52.0, 47.0, 39.0, 36.0, 46.0, 35.0, 36.0, 50.0, 37.0, 46.0, 45.0, 41.0, 39.0, 36.0, 41.0, 35.0, 45.0, 56.0, 34.0, 40.0, 49.0, 45.0, 46.0, 47.0, 41.0, 41.0, 49.0, 43.0, 55.0, 47.0, 41.0, 42.0, 37.0, 38.0, 45.0, 48.0, 51.0, 38.0, 42.0, 44.0, 49.0, 40.0, 46.0, 38.0, 34.0, 41.0, 44.0, 41.0, 50.0, 41.0, 43.0, 39.0, 55.0, 36.0, 48.0, 42.0, 44.0, 49.0, 34.0, 45.0, 44.0, 29.0, 48.0, 32.0, 41.0, 50.0, 37.0, 49.0, 42.0, 38.0, 34.0, 39.0, 42.0, 37.0, 29.0, 28.0, 34.0, 27.0, 36.0, 45.0, 27.0, 21.0, 27.0, 23.0, 25.0, 31.0, 28.0, 34.0, 26.0, 30.0, 22.0, 24.0, 21.0, 14.0, 18.0, 12.0, 18.0, 24.0, 16.0, 23.0, 14.0, 21.0, 17.0, 21.0, 30.0, 24.0, 22.0, 18.0, 17.0, 16.0, 19.0, 17.0, 15.0, 20.0, 15.0, 17.0, 10.0, 16.0, 14.0, 10.0, 13.0, 13.0, 13.0, 21.0, 13.0, 8.0, 12.0, 10.0, 9.0, 8.0, 9.0, 9.0, 4.0, 9.0, 4.0, 4.0, 5.0, 10.0, 5.0, 4.0, 3.0, 5.0, 8.0, 3.0, 13.0, 5.0, 9.0, 2.0, 4.0, 7.0, 4.0, 5.0, 4.0, 3.0, 3.0, 2.0, 5.0, 6.0, 6.0, 4.0, 1.0, 0.0, 4.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 1.0, 1.0, 3.0, 0.0, 1.0, 4.0, 1.0, 1.0, 3.0, 3.0, 3.0, 5.0, 1.0, 2.0, 2.0, 3.0, 0.0, 1.0, 6.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 3.0, 3.0, 1.0, 4.0, 1.0, 8.0, 4.0, 6.0, 2.0, 5.0, 7.0, 6.0, 7.0, 5.0, 3.0, 6.0, 10.0, 10.0, 9.0, 8.0, 6.0, 5.0, 8.0, 7.0, 14.0, 15.0, 8.0, 12.0, 8.0, 11.0, 11.0, 17.0, 18.0, 15.0, 23.0, 18.0, 11.0, 15.0, 16.0, 22.0, 26.0, 15.0, 22.0, 21.0, 18.0, 24.0, 16.0, 24.0, 29.0, 28.0, 28.0, 28.0, 25.0, 22.0, 29.0, 16.0, 24.0, 36.0, 34.0, 22.0, 19.0, 28.0, 32.0, 36.0, 33.0, 32.0, 25.0, 37.0, 29.0, 26.0, 32.0, 48.0, 26.0, 29.0, 42.0, 34.0, 29.0, 27.0, 54.0, 36.0, 50.0, 40.0, 33.0, 39.0, 49.0, 49.0, 33.0, 35.0, 44.0, 36.0, 36.0, 27.0, 42.0, 37.0, 40.0, 33.0, 38.0, 43.0, 34.0, 44.0, 33.0, 36.0, 43.0, 38.0, 42.0, 30.0, 38.0, 25.0, 40.0, 40.0, 25.0, 46.0, 40.0, 36.0, 35.0, 36.0, 37.0, 36.0, 37.0, 42.0, 39.0, 45.0, 27.0, 44.0, 31.0, 30.0, 32.0, 41.0, 40.0, 38.0, 45.0, 47.0, 44.0, 45.0, 42.0, 32.0, 32.0, 24.0, 38.0, 24.0, 30.0, 35.0, 30.0, 29.0, 32.0, 27.0, 31.0, 26.0, 17.0, 30.0, 25.0, 24.0, 28.0, 22.0, 27.0, 19.0, 27.0, 23.0, 20.0, 25.0, 23.0, 28.0, 22.0, 20.0, 23.0, 24.0, 20.0, 17.0, 34.0, 14.0, 32.0, 20.0, 21.0, 29.0, 11.0, 19.0, 30.0, 21.0, 21.0, 16.0, 15.0, 22.0, 14.0, 16.0, 14.0, 14.0, 14.0, 16.0, 7.0, 18.0, 15.0, 8.0, 20.0, 12.0, 14.0, 12.0, 9.0, 12.0, 11.0, 21.0, 2.0, 20.0, 19.0, 11.0, 12.0, 8.0, 7.0, 11.0, 9.0, 8.0, 9.0, 11.0, 6.0, 4.0, 3.0, 3.0, 5.0, 6.0, 8.0, 6.0, 3.0, 1.0, 4.0, 6.0, 1.0, 0.0, 8.0, 0.0, 3.0, 3.0, 0.0, 0.0, 6.0, 2.0, 0.0, 0.0, 1.0, 4.0, 3.0, 0.0, 1.0, 2.0, 0.0, 1.0, 2.0, 1.0, 2.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 3.0, 3.0, 1.0, 2.0, 3.0, 0.0, 4.0, 2.0, 4.0, 1.0, 5.0, 0.0, 1.0, 5.0, 5.0, 3.0, 5.0, 1.0, 8.0, 7.0, 6.0, 5.0, 7.0, 6.0, 10.0, 14.0, 12.0, 20.0, 18.0, 20.0, 24.0, 21.0, 32.0, 26.0, 35.0, 44.0, 26.0, 35.0, 33.0, 31.0, 38.0, 35.0, 49.0, 45.0, 42.0, 39.0, 37.0, 46.0, 49.0, 51.0, 55.0, 47.0, 40.0, 59.0, 59.0, 51.0, 55.0, 52.0, 48.0, 50.0, 45.0, 41.0, 50.0, 38.0, 39.0, 43.0, 55.0, 45.0, 51.0, 44.0, 34.0, 47.0, 25.0, 43.0, 45.0, 41.0, 36.0, 35.0, 35.0, 48.0, 43.0, 35.0, 25.0, 48.0, 44.0, 45.0, 41.0, 40.0, 56.0, 53.0, 49.0, 68.0, 46.0, 37.0, 48.0, 55.0, 48.0, 49.0, 49.0, 43.0, 42.0, 47.0, 48.0, 37.0, 55.0, 44.0, 43.0, 41.0, 62.0, 41.0, 43.0, 52.0, 53.0, 47.0, 59.0, 64.0, 50.0, 39.0, 52.0, 54.0, 44.0, 59.0, 38.0, 53.0, 47.0, 59.0, 72.0, 63.0, 57.0, 67.0, 65.0, 52.0, 61.0, 50.0, 47.0, 58.0, 58.0, 57.0, 55.0, 61.0, 57.0, 47.0, 56.0, 44.0, 52.0, 56.0, 58.0, 47.0, 45.0, 45.0, 62.0, 48.0, 53.0, 60.0, 45.0, 57.0, 53.0, 53.0, 54.0, 69.0, 46.0, 39.0, 43.0, 43.0, 50.0, 42.0, 36.0, 51.0, 42.0, 49.0, 60.0, 46.0, 43.0, 49.0, 55.0, 47.0, 53.0, 59.0, 53.0, 37.0, 41.0, 49.0, 48.0, 41.0, 30.0, 33.0, 37.0, 31.0, 39.0, 23.0, 30.0, 28.0, 22.0, 25.0, 40.0, 36.0, 32.0, 29.0, 32.0, 26.0, 30.0, 20.0, 26.0, 25.0, 25.0, 26.0, 25.0, 25.0, 20.0, 33.0, 19.0, 18.0, 23.0, 23.0, 16.0, 20.0, 21.0, 22.0, 19.0, 13.0, 17.0, 4.0, 13.0, 16.0, 12.0, 20.0, 10.0, 12.0, 6.0, 10.0, 8.0, 10.0, 6.0, 7.0, 8.0, 11.0, 7.0, 6.0, 5.0, 10.0, 9.0, 9.0, 2.0, 4.0, 4.0, 3.0, 2.0, 3.0, 2.0, 3.0, 3.0, 1.0, 2.0, 1.0, 4.0, 2.0, 2.0, 0.0, 5.0, 1.0, 1.0, 2.0, 2.0, 3.0, 0.0, 2.0, 0.0, 4.0, 3.0, 2.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 2.0, 2.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.0, 2.0, 5.0, 2.0, 0.0, 5.0, 6.0, 2.0, 2.0, 7.0, 2.0, 8.0, 6.0, 10.0, 19.0, 9.0, 5.0, 9.0, 18.0, 14.0, 14.0, 20.0, 19.0, 30.0, 35.0, 46.0, 37.0, 28.0, 36.0, 42.0, 49.0, 49.0, 37.0, 39.0, 54.0, 45.0, 49.0, 34.0, 48.0, 50.0, 58.0, 40.0, 44.0, 59.0, 62.0, 64.0, 63.0, 55.0, 55.0, 59.0, 60.0, 52.0, 66.0, 41.0, 60.0, 51.0, 50.0, 49.0, 54.0, 53.0, 42.0, 61.0, 64.0, 46.0, 45.0, 55.0, 43.0, 38.0, 43.0, 49.0, 45.0, 34.0, 57.0, 47.0, 55.0, 66.0, 42.0, 50.0, 47.0, 60.0, 59.0, 55.0, 49.0, 43.0, 52.0, 60.0, 45.0, 54.0, 49.0, 53.0, 60.0, 55.0, 44.0, 53.0, 45.0, 48.0, 66.0, 51.0, 52.0, 58.0, 52.0, 51.0, 51.0, 47.0, 53.0, 47.0, 50.0, 51.0, 52.0, 66.0, 59.0, 45.0, 48.0, 53.0, 47.0, 59.0, 61.0, 51.0, 50.0, 56.0, 69.0, 76.0, 63.0, 73.0, 64.0, 60.0, 53.0, 67.0, 67.0, 65.0, 77.0, 60.0, 60.0, 69.0, 48.0, 65.0, 61.0, 56.0, 66.0, 50.0, 50.0, 47.0, 61.0, 41.0, 58.0, 61.0, 48.0, 50.0, 45.0, 79.0, 53.0, 64.0, 58.0, 44.0, 56.0, 51.0, 49.0, 52.0, 43.0, 62.0, 54.0, 50.0, 57.0, 44.0, 51.0, 52.0, 42.0, 48.0, 66.0, 51.0, 47.0, 38.0, 48.0, 45.0, 44.0, 46.0, 48.0, 42.0, 50.0, 27.0, 39.0, 36.0, 34.0, 28.0, 25.0, 25.0, 29.0, 28.0, 35.0, 40.0, 30.0, 25.0, 27.0, 25.0, 27.0, 31.0, 31.0, 24.0, 24.0, 33.0, 28.0, 30.0, 19.0, 16.0, 23.0, 24.0, 20.0, 29.0, 19.0, 16.0, 31.0, 29.0, 20.0, 26.0, 15.0, 27.0, 28.0, 28.0, 19.0, 16.0, 20.0, 14.0, 13.0, 14.0, 13.0, 11.0, 10.0, 7.0, 14.0, 10.0, 9.0, 6.0, 6.0, 7.0, 5.0, 13.0, 7.0, 10.0, 5.0, 1.0, 11.0, 9.0, 2.0, 5.0, 4.0, 3.0, 2.0, 3.0, 2.0, 3.0, 0.0, 2.0, 4.0, 2.0, 3.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 1.0, 0.0, 2.0, 3.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 4.0, 2.0, 2.0, 0.0, 3.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 4.0, 2.0, 8.0, 2.0, 4.0, 8.0, 15.0, 3.0, 5.0, 7.0, 7.0, 9.0, 8.0, 12.0, 23.0, 16.0, 20.0, 16.0, 21.0, 34.0, 33.0, 48.0, 28.0, 33.0, 31.0, 29.0, 36.0, 36.0, 41.0, 47.0, 41.0, 43.0, 35.0, 46.0, 51.0, 46.0, 47.0, 59.0, 54.0, 57.0, 59.0, 54.0, 67.0, 57.0, 64.0, 65.0, 62.0, 54.0, 51.0, 55.0, 57.0, 42.0, 54.0, 53.0, 48.0, 60.0, 59.0, 55.0, 46.0, 60.0, 41.0, 41.0, 45.0, 57.0, 46.0, 46.0, 44.0, 57.0, 53.0, 44.0, 56.0, 52.0, 38.0, 48.0, 59.0, 43.0, 59.0, 63.0, 56.0, 78.0, 58.0, 48.0, 57.0, 56.0, 66.0, 73.0, 55.0, 53.0, 56.0, 57.0, 59.0, 52.0, 61.0, 49.0, 47.0, 47.0, 58.0, 43.0, 55.0, 47.0, 39.0, 72.0, 54.0, 46.0, 61.0, 59.0, 38.0, 49.0, 50.0, 43.0, 49.0, 62.0, 62.0, 60.0, 68.0, 47.0, 68.0, 62.0, 48.0, 58.0, 52.0, 56.0, 59.0, 65.0, 37.0, 58.0, 58.0, 63.0, 59.0, 45.0, 55.0, 50.0, 44.0, 64.0, 42.0, 61.0, 48.0, 48.0, 52.0, 46.0, 46.0, 52.0, 46.0, 66.0, 62.0, 60.0, 62.0, 50.0, 49.0, 59.0, 50.0, 42.0, 52.0, 46.0, 54.0, 51.0, 57.0, 47.0, 42.0, 59.0, 45.0, 58.0, 48.0, 57.0, 62.0, 49.0, 59.0, 65.0, 40.0, 56.0, 58.0, 57.0, 49.0, 41.0, 57.0, 42.0, 56.0, 30.0, 42.0, 43.0, 36.0, 43.0, 44.0, 33.0, 36.0, 35.0, 18.0, 24.0, 30.0, 40.0, 30.0, 30.0, 32.0, 29.0, 27.0, 28.0, 33.0, 32.0, 27.0, 29.0, 39.0, 42.0, 31.0, 22.0, 30.0, 19.0, 27.0, 22.0, 16.0, 20.0, 19.0, 19.0, 14.0, 16.0, 12.0, 24.0, 11.0, 12.0, 9.0, 10.0, 14.0, 14.0, 7.0, 8.0, 6.0, 12.0, 16.0, 10.0, 13.0, 11.0, 14.0, 2.0, 11.0, 5.0, 5.0, 6.0, 4.0, 7.0, 6.0, 6.0, 2.0, 2.0, 4.0, 2.0, 0.0, 5.0, 2.0, 2.0, 1.0, 1.0, 0.0, 3.0, 1.0, 0.0, 0.0, 4.0, 6.0, 0.0, 0.0, 5.0, 1.0, 1.0, 0.0, 1.0, 1.0, 2.0, 3.0, 0.0, 1.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 1.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 3.0, 2.0, 0.0, 1.0, 2.0, 3.0, 5.0, 8.0, 6.0, 4.0, 9.0, 8.0, 9.0, 10.0, 10.0, 15.0, 21.0, 32.0, 28.0, 23.0, 27.0, 31.0, 27.0, 33.0, 23.0, 39.0, 46.0, 37.0, 49.0, 37.0, 29.0, 47.0, 32.0, 34.0, 47.0, 42.0, 49.0, 41.0, 51.0, 71.0, 50.0, 53.0, 62.0, 53.0, 54.0, 56.0, 62.0, 59.0, 51.0, 59.0, 49.0, 57.0, 57.0, 44.0, 54.0, 54.0, 55.0, 45.0, 45.0, 49.0, 48.0, 42.0, 33.0, 42.0, 40.0, 43.0, 46.0, 57.0, 49.0, 50.0, 49.0, 55.0, 53.0, 40.0, 41.0, 40.0, 47.0, 51.0, 48.0, 75.0, 79.0, 66.0, 62.0, 60.0, 66.0, 64.0, 57.0, 58.0, 56.0, 49.0, 61.0, 48.0, 60.0, 68.0, 51.0, 69.0, 44.0, 53.0, 60.0, 61.0, 55.0, 65.0, 61.0, 62.0, 46.0, 51.0, 58.0, 57.0, 62.0, 62.0, 46.0, 65.0, 55.0, 54.0, 66.0, 61.0, 64.0, 68.0, 63.0, 60.0, 69.0, 59.0, 46.0, 60.0, 52.0, 63.0, 54.0, 63.0, 61.0, 56.0, 50.0, 50.0, 67.0, 60.0, 46.0, 53.0, 50.0, 49.0, 52.0, 46.0, 51.0, 58.0, 47.0, 54.0, 65.0, 67.0, 55.0, 72.0, 61.0, 43.0, 52.0, 57.0, 51.0, 38.0, 47.0, 56.0, 59.0, 54.0, 59.0, 49.0, 52.0, 52.0, 53.0, 30.0, 54.0, 65.0, 68.0, 53.0, 53.0, 41.0, 35.0, 49.0, 31.0, 40.0, 43.0, 39.0, 29.0, 27.0, 27.0, 33.0, 30.0, 16.0, 24.0, 34.0, 30.0, 27.0, 24.0, 30.0, 26.0, 31.0, 22.0, 29.0, 22.0, 32.0, 27.0, 29.0, 37.0, 25.0, 16.0, 20.0, 23.0, 27.0, 31.0, 27.0, 22.0, 27.0, 22.0, 22.0, 11.0, 18.0, 19.0, 17.0, 13.0, 17.0, 24.0, 22.0, 21.0, 9.0, 12.0, 16.0, 9.0, 9.0, 8.0, 14.0, 15.0, 8.0, 6.0, 9.0, 9.0, 11.0, 11.0, 8.0, 7.0, 9.0, 6.0, 9.0, 10.0, 2.0, 7.0, 6.0, 3.0, 7.0, 7.0, 4.0, 4.0, 5.0, 15.0, 5.0, 1.0, 2.0, 3.0, 2.0, 2.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 4.0, 2.0, 3.0, 2.0, 0.0, 2.0, 0.0, 3.0, 2.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 3.0, 2.0, 0.0, 3.0, 3.0, 1.0, 3.0, 5.0, 4.0, 7.0, 3.0, 5.0, 4.0, 5.0, 7.0, 3.0, 7.0, 4.0, 5.0, 4.0, 11.0, 18.0, 7.0, 11.0, 13.0, 12.0, 9.0, 19.0, 13.0, 19.0, 25.0, 22.0, 27.0, 30.0, 25.0, 37.0, 33.0, 19.0, 45.0, 31.0, 32.0, 32.0, 36.0, 31.0, 35.0, 50.0, 39.0, 43.0, 36.0, 39.0, 30.0, 44.0, 57.0, 49.0, 54.0, 49.0, 52.0, 52.0, 42.0, 55.0, 51.0, 46.0, 43.0, 46.0, 45.0, 36.0, 52.0, 45.0, 40.0, 41.0, 37.0, 36.0, 45.0, 36.0, 34.0, 43.0, 33.0, 43.0, 43.0, 40.0, 50.0, 39.0, 55.0, 45.0, 40.0, 52.0, 41.0, 49.0, 52.0, 51.0, 50.0, 61.0, 75.0, 55.0, 54.0, 58.0, 46.0, 49.0, 50.0, 53.0, 50.0, 46.0, 52.0, 44.0, 49.0, 60.0, 56.0, 37.0, 66.0, 60.0, 54.0, 49.0, 44.0, 59.0, 65.0, 62.0, 55.0, 58.0, 53.0, 44.0, 45.0, 57.0, 42.0, 49.0, 51.0, 72.0, 51.0, 61.0, 56.0, 45.0, 45.0, 64.0, 54.0, 52.0, 48.0, 47.0, 51.0, 51.0, 48.0, 60.0, 50.0, 62.0, 58.0, 53.0, 55.0, 49.0, 53.0, 51.0, 49.0, 40.0, 34.0, 52.0, 36.0, 54.0, 49.0, 45.0, 44.0, 53.0, 51.0, 48.0, 56.0, 46.0, 56.0, 44.0, 63.0, 58.0, 54.0, 51.0, 64.0, 58.0, 54.0, 34.0, 39.0, 40.0, 39.0, 50.0, 45.0, 56.0, 29.0, 43.0, 52.0, 45.0, 52.0, 42.0, 44.0, 42.0, 41.0, 41.0, 53.0, 51.0, 34.0, 32.0, 46.0, 26.0, 35.0, 35.0, 37.0, 30.0, 47.0, 39.0, 35.0, 45.0, 40.0, 35.0, 20.0, 33.0, 22.0, 20.0, 25.0, 25.0, 19.0, 23.0, 24.0, 32.0, 19.0, 20.0, 22.0, 19.0, 26.0, 20.0, 23.0, 14.0, 35.0, 18.0, 25.0, 26.0, 17.0, 17.0, 23.0, 19.0, 12.0, 13.0, 15.0, 13.0, 12.0, 6.0, 11.0, 10.0, 13.0, 8.0, 17.0, 11.0, 12.0, 12.0, 6.0, 10.0, 8.0, 13.0, 4.0, 7.0, 10.0, 9.0, 6.0, 6.0, 11.0, 4.0, 8.0, 8.0, 4.0, 8.0, 5.0, 11.0, 6.0, 4.0, 5.0, 3.0, 4.0, 6.0, 6.0, 3.0, 2.0, 5.0, 6.0, 4.0, 3.0, 4.0, 2.0, 3.0, 1.0, 6.0, 3.0, 3.0, 2.0, 2.0, 3.0, 4.0, 2.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 3.0, 1.0, 0.0, 3.0, 0.0, 4.0, 3.0, 1.0, 5.0, 6.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 4.0, 3.0, 5.0, 8.0, 9.0, 2.0, 10.0, 7.0, 2.0, 6.0, 9.0, 15.0, 7.0, 4.0, 4.0, 10.0, 9.0, 11.0, 13.0, 5.0, 13.0, 12.0, 12.0, 17.0, 8.0, 10.0, 14.0, 15.0, 14.0, 22.0, 17.0, 23.0, 16.0, 25.0, 34.0, 24.0, 21.0, 26.0, 23.0, 23.0, 26.0, 28.0, 28.0, 19.0, 32.0, 34.0, 30.0, 31.0, 34.0, 29.0, 25.0, 27.0, 30.0, 31.0, 28.0, 27.0, 25.0, 25.0, 35.0, 29.0, 31.0, 29.0, 32.0, 33.0, 38.0, 32.0, 35.0, 35.0, 44.0, 42.0, 43.0, 41.0, 44.0, 39.0, 41.0, 43.0, 44.0, 42.0, 35.0, 36.0, 44.0, 32.0, 39.0, 29.0, 51.0, 43.0, 31.0, 47.0, 44.0, 43.0, 48.0, 41.0, 44.0, 45.0, 40.0, 43.0, 36.0, 39.0, 36.0, 38.0, 45.0, 38.0, 32.0, 41.0, 46.0, 42.0, 45.0, 41.0, 36.0, 37.0, 34.0, 44.0, 38.0, 42.0, 37.0, 43.0, 39.0, 35.0, 45.0, 28.0, 36.0, 36.0, 38.0, 41.0, 37.0, 51.0, 59.0, 49.0, 42.0, 33.0, 48.0, 46.0, 49.0, 57.0, 45.0, 52.0, 47.0, 40.0, 45.0, 33.0, 46.0, 45.0, 45.0, 43.0, 41.0, 35.0, 47.0, 43.0, 26.0, 33.0, 37.0, 43.0, 31.0, 38.0, 45.0, 42.0, 40.0, 42.0, 43.0, 55.0, 32.0, 47.0, 43.0, 31.0, 46.0, 36.0, 36.0, 41.0, 37.0, 28.0, 41.0, 27.0, 32.0, 24.0, 27.0, 32.0, 36.0, 26.0, 34.0, 32.0, 25.0, 30.0, 28.0, 21.0, 22.0, 22.0, 19.0, 18.0, 10.0, 18.0, 22.0, 21.0, 14.0, 10.0, 18.0, 17.0, 16.0, 23.0, 31.0, 8.0, 19.0, 18.0, 17.0, 11.0, 15.0, 17.0, 17.0, 12.0, 9.0, 18.0, 14.0, 8.0, 15.0, 16.0, 17.0, 14.0, 9.0, 5.0, 11.0, 15.0, 8.0, 5.0, 9.0, 15.0, 13.0, 12.0, 8.0, 5.0, 7.0, 4.0, 6.0, 7.0, 5.0, 7.0, 7.0, 6.0, 5.0, 1.0, 10.0, 6.0, 4.0, 11.0, 6.0, 2.0, 8.0, 3.0, 6.0, 7.0, 2.0, 4.0, 5.0, 1.0, 1.0, 2.0, 6.0, 3.0, 3.0, 6.0, 9.0, 1.0, 2.0, 1.0, 4.0, 1.0, 3.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 3.0, 1.0, 2.0, 1.0, 1.0, 2.0, 0.0, 1.0, 4.0, 3.0, 4.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 3.0, 3.0, 5.0, 1.0, 1.0, 2.0, 1.0, 2.0, 5.0, 6.0, 4.0, 3.0, 4.0, 6.0, 6.0, 0.0, 7.0, 5.0, 3.0, 6.0, 6.0, 11.0, 10.0, 11.0, 8.0, 5.0, 8.0, 11.0, 8.0, 12.0, 8.0, 4.0, 13.0, 13.0, 20.0, 15.0, 15.0, 6.0, 17.0, 15.0, 19.0, 21.0, 16.0, 16.0, 17.0, 17.0, 15.0, 22.0, 23.0, 18.0, 15.0, 19.0, 21.0, 38.0, 30.0, 22.0, 23.0, 27.0, 22.0, 19.0, 38.0, 35.0, 28.0, 27.0, 27.0, 28.0, 29.0, 24.0, 27.0, 32.0, 33.0, 31.0, 33.0, 35.0, 34.0, 45.0, 27.0, 41.0, 25.0, 33.0, 37.0, 34.0, 47.0, 37.0, 24.0, 31.0, 34.0, 38.0, 29.0, 38.0, 32.0, 33.0, 41.0, 42.0, 30.0, 34.0, 37.0, 38.0, 37.0, 33.0, 38.0, 34.0, 35.0, 25.0, 47.0, 28.0, 46.0, 50.0, 37.0, 38.0, 44.0, 50.0, 43.0, 44.0, 41.0, 43.0, 29.0, 37.0, 36.0, 30.0, 41.0, 33.0, 43.0, 35.0, 45.0, 33.0, 38.0, 27.0, 42.0, 42.0, 39.0, 31.0, 38.0, 36.0, 38.0, 43.0, 46.0, 39.0, 33.0, 39.0, 34.0, 25.0, 30.0, 20.0, 30.0, 26.0, 27.0, 40.0, 26.0, 37.0, 28.0, 36.0, 30.0, 28.0, 29.0, 22.0, 35.0, 21.0, 24.0, 20.0, 25.0, 20.0, 20.0, 24.0, 24.0, 25.0, 27.0, 28.0, 21.0, 20.0, 22.0, 17.0, 22.0, 12.0, 17.0, 15.0, 30.0, 20.0, 16.0, 14.0, 22.0, 19.0, 18.0, 22.0, 11.0, 17.0, 15.0, 17.0, 12.0, 11.0, 13.0, 15.0, 10.0, 18.0, 15.0, 15.0, 14.0, 17.0, 10.0, 17.0, 15.0, 20.0, 12.0, 11.0, 18.0, 16.0, 10.0, 12.0, 9.0, 10.0, 8.0, 12.0, 8.0, 6.0, 0.0, 4.0, 12.0, 4.0, 8.0, 8.0, 5.0, 4.0, 5.0, 5.0, 3.0, 4.0, 6.0, 3.0, 3.0, 3.0, 4.0, 5.0, 9.0, 1.0, 1.0, 3.0, 0.0, 2.0, 0.0, 2.0, 1.0, 2.0, 2.0, 5.0, 1.0, 3.0, 2.0, 3.0, 0.0, 0.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 2.0, 0.0, 2.0, 1.0, 0.0, 3.0, 1.0, 0.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 4.0, 4.0, 3.0, 1.0, 5.0, 5.0, 7.0, 6.0, 4.0, 7.0, 7.0, 10.0, 10.0, 13.0, 13.0, 18.0, 18.0, 17.0, 28.0, 29.0, 41.0, 23.0, 30.0, 24.0, 35.0, 28.0, 30.0, 31.0, 36.0, 32.0, 39.0, 44.0, 34.0, 33.0, 44.0, 39.0, 41.0, 46.0, 46.0, 51.0, 42.0, 41.0, 43.0, 57.0, 38.0, 57.0, 52.0, 52.0, 41.0, 37.0, 47.0, 44.0, 43.0, 52.0, 31.0, 49.0, 39.0, 43.0, 38.0, 37.0, 34.0, 44.0, 49.0, 29.0, 27.0, 25.0, 33.0, 28.0, 35.0, 33.0, 34.0, 53.0, 27.0, 38.0, 34.0, 38.0, 45.0, 52.0, 45.0, 35.0, 44.0, 35.0, 45.0, 53.0, 40.0, 44.0, 52.0, 50.0, 46.0, 47.0, 45.0, 45.0, 51.0, 46.0, 56.0, 38.0, 50.0, 54.0, 42.0, 30.0, 47.0, 52.0, 45.0, 52.0, 53.0, 41.0, 45.0, 48.0, 45.0, 40.0, 51.0, 44.0, 51.0, 50.0, 63.0, 55.0, 53.0, 47.0, 48.0, 53.0, 60.0, 59.0, 46.0, 65.0, 57.0, 41.0, 60.0, 53.0, 40.0, 52.0, 56.0, 55.0, 44.0, 47.0, 52.0, 50.0, 53.0, 47.0, 48.0, 46.0, 48.0, 37.0, 55.0, 54.0, 52.0, 55.0, 48.0, 54.0, 52.0, 39.0, 35.0, 36.0, 41.0, 39.0, 49.0, 49.0, 46.0, 49.0, 47.0, 45.0, 49.0, 50.0, 46.0, 43.0, 45.0, 47.0, 44.0, 36.0, 41.0, 48.0, 53.0, 33.0, 35.0, 31.0, 40.0, 45.0, 33.0, 42.0, 28.0, 27.0, 26.0, 23.0, 29.0, 26.0, 35.0, 29.0, 20.0, 23.0, 20.0, 34.0, 21.0, 37.0, 22.0, 33.0, 29.0, 36.0, 37.0, 40.0, 30.0, 29.0, 36.0, 28.0, 32.0, 38.0, 21.0, 15.0, 16.0, 14.0, 17.0, 12.0, 21.0, 16.0, 12.0, 13.0, 24.0, 9.0, 17.0, 14.0, 14.0, 11.0, 14.0, 13.0, 6.0, 7.0, 9.0, 6.0, 7.0, 7.0, 3.0, 5.0, 7.0, 4.0, 5.0, 5.0, 3.0, 5.0, 1.0, 2.0, 2.0, 1.0, 2.0, 3.0, 3.0, 1.0, 1.0, 0.0, 3.0, 5.0, 1.0, 1.0, 1.0, 1.0, 3.0, 1.0, 0.0, 1.0, 3.0, 0.0, 3.0, 2.0, 2.0, 0.0, 0.0, 1.0, 2.0, 2.0, 2.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 0.0, 1.0, 0.0, 0.0, 2.0, 0.0, 3.0, 1.0, 1.0, 4.0, 6.0, 4.0, 3.0, 5.0, 2.0, 9.0, 7.0, 4.0, 6.0, 7.0, 13.0, 10.0, 11.0, 16.0, 15.0, 21.0, 17.0, 18.0, 23.0, 38.0, 33.0, 25.0, 30.0, 28.0, 26.0, 38.0, 37.0, 33.0, 47.0, 41.0, 45.0, 33.0, 52.0, 43.0, 50.0, 50.0, 51.0, 56.0, 58.0, 58.0, 45.0, 55.0, 56.0, 66.0, 71.0, 47.0, 61.0, 49.0, 57.0, 55.0, 51.0, 54.0, 69.0, 50.0, 51.0, 49.0, 39.0, 39.0, 41.0, 58.0, 43.0, 41.0, 45.0, 34.0, 43.0, 42.0, 35.0, 51.0, 54.0, 43.0, 50.0, 44.0, 53.0, 37.0, 50.0, 39.0, 59.0, 44.0, 37.0, 53.0, 47.0, 45.0, 44.0, 58.0, 66.0, 60.0, 52.0, 53.0, 59.0, 63.0, 49.0, 46.0, 63.0, 55.0, 45.0, 55.0, 39.0, 49.0, 55.0, 38.0, 42.0, 62.0, 57.0, 60.0, 53.0, 51.0, 53.0, 52.0, 46.0, 42.0, 57.0, 55.0, 56.0, 39.0, 61.0, 68.0, 47.0, 48.0, 66.0, 63.0, 63.0, 51.0, 53.0, 53.0, 65.0, 50.0, 55.0, 58.0, 54.0, 58.0, 53.0, 53.0, 59.0, 43.0, 49.0, 53.0, 43.0, 42.0, 46.0, 49.0, 57.0, 60.0, 50.0, 45.0, 51.0, 57.0, 57.0, 68.0, 62.0, 55.0, 46.0, 52.0, 47.0, 36.0, 47.0, 50.0, 42.0, 62.0, 55.0, 55.0, 47.0, 51.0, 47.0, 52.0, 46.0, 55.0, 44.0, 53.0, 45.0, 50.0, 56.0, 36.0, 52.0, 37.0, 33.0, 35.0, 34.0, 29.0, 32.0, 30.0, 26.0, 32.0, 20.0, 23.0, 28.0, 25.0, 25.0, 28.0, 33.0, 28.0, 27.0, 33.0, 24.0, 27.0, 31.0, 43.0, 36.0, 24.0, 30.0, 21.0, 25.0, 22.0, 24.0, 26.0, 16.0, 12.0, 14.0, 17.0, 17.0, 18.0, 12.0, 21.0, 17.0, 14.0, 19.0, 9.0, 4.0, 10.0, 8.0, 12.0, 13.0, 9.0, 8.0, 8.0, 4.0, 10.0, 5.0, 8.0, 10.0, 4.0, 10.0, 3.0, 7.0, 5.0, 6.0, 7.0, 6.0, 0.0, 2.0, 8.0, 2.0, 2.0, 2.0, 5.0, 2.0, 0.0, 7.0, 1.0, 1.0, 2.0, 4.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 3.0, 0.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 4.0, 0.0, 0.0, 1.0, 3.0, 1.0, 4.0, 9.0, 15.0, 12.0, 11.0, 7.0, 4.0, 1.0, 4.0, 7.0, 5.0, 2.0, 6.0, 7.0, 7.0, 11.0, 9.0, 7.0, 14.0, 10.0, 18.0, 11.0, 13.0, 12.0, 14.0, 19.0, 31.0, 33.0, 28.0, 23.0, 29.0, 27.0, 23.0, 34.0, 37.0, 28.0, 51.0, 38.0, 42.0, 35.0, 44.0, 33.0, 44.0, 52.0, 50.0, 64.0, 58.0, 53.0, 47.0, 72.0, 62.0, 58.0, 62.0, 37.0, 55.0, 54.0, 47.0, 47.0, 45.0, 36.0, 51.0, 53.0, 54.0, 47.0, 46.0, 57.0, 46.0, 46.0, 47.0, 39.0, 49.0, 45.0, 48.0, 42.0, 39.0, 42.0, 48.0, 45.0, 45.0, 44.0, 35.0, 45.0, 46.0, 59.0, 46.0, 57.0, 63.0, 41.0, 59.0, 39.0, 50.0, 49.0, 50.0, 45.0, 50.0, 52.0, 32.0, 54.0, 43.0, 62.0, 45.0, 33.0, 59.0, 56.0, 47.0, 60.0, 49.0, 42.0, 47.0, 55.0, 48.0, 42.0, 68.0, 61.0, 58.0, 54.0, 60.0, 41.0, 46.0, 42.0, 53.0, 59.0, 51.0, 52.0, 63.0, 44.0, 59.0, 57.0, 57.0, 55.0, 55.0, 55.0, 42.0, 47.0, 51.0, 49.0, 46.0, 43.0, 41.0, 43.0, 47.0, 46.0, 36.0, 47.0, 41.0, 50.0, 43.0, 55.0, 62.0, 55.0, 46.0, 48.0, 47.0, 54.0, 45.0, 48.0, 39.0, 34.0, 42.0, 48.0, 38.0, 43.0, 48.0, 37.0, 47.0, 46.0, 52.0, 46.0, 59.0, 37.0, 48.0, 38.0, 53.0, 46.0, 38.0, 33.0, 20.0, 49.0, 51.0, 36.0, 38.0, 39.0, 34.0, 25.0, 34.0, 31.0, 18.0, 22.0, 33.0, 29.0, 36.0, 25.0, 24.0, 16.0, 26.0, 23.0, 28.0, 26.0, 41.0, 24.0, 37.0, 22.0, 32.0, 29.0, 32.0, 27.0, 26.0, 11.0, 28.0, 26.0, 25.0, 22.0, 31.0, 23.0, 18.0, 19.0, 13.0, 16.0, 15.0, 12.0, 9.0, 24.0, 11.0, 13.0, 17.0, 9.0, 13.0, 10.0, 11.0, 9.0, 10.0, 10.0, 6.0, 8.0, 10.0, 9.0, 4.0, 13.0, 8.0, 4.0, 6.0, 7.0, 1.0, 6.0, 5.0, 4.0, 3.0, 4.0, 5.0, 4.0, 2.0, 3.0, 0.0, 1.0, 3.0, 1.0, 1.0, 4.0, 3.0, 3.0, 2.0, 1.0, 2.0, 0.0, 2.0, 1.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 4.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 1.0, 3.0, 2.0, 5.0, 2.0, 2.0, 3.0, 3.0, 3.0, 6.0, 6.0, 6.0, 6.0, 5.0, 12.0, 4.0, 8.0, 16.0, 27.0, 27.0, 24.0, 38.0, 33.0, 43.0, 46.0, 45.0, 49.0, 50.0, 35.0, 36.0, 35.0, 48.0, 51.0, 42.0, 49.0, 46.0, 36.0, 40.0, 47.0, 45.0, 38.0, 41.0, 59.0, 61.0, 49.0, 56.0, 60.0, 58.0, 64.0, 54.0, 61.0, 43.0, 53.0, 54.0, 63.0, 50.0, 43.0, 35.0, 45.0, 44.0, 54.0, 55.0, 49.0, 40.0, 55.0, 36.0, 46.0, 40.0, 56.0, 38.0, 55.0, 45.0, 52.0, 34.0, 49.0, 53.0, 49.0, 51.0, 39.0, 47.0, 45.0, 50.0, 45.0, 54.0, 44.0, 66.0, 51.0, 51.0, 45.0, 50.0, 61.0, 47.0, 55.0, 32.0, 43.0, 48.0, 47.0, 44.0, 57.0, 50.0, 45.0, 49.0, 45.0, 57.0, 38.0, 36.0, 48.0, 47.0, 58.0, 31.0, 41.0, 59.0, 50.0, 55.0, 50.0, 43.0, 48.0, 62.0, 58.0, 53.0, 48.0, 40.0, 47.0, 52.0, 57.0, 59.0, 52.0, 50.0, 52.0, 41.0, 48.0, 54.0, 38.0, 45.0, 45.0, 51.0, 48.0, 35.0, 54.0, 50.0, 37.0, 41.0, 41.0, 47.0, 42.0, 47.0, 38.0, 49.0, 29.0, 47.0, 55.0, 40.0, 48.0, 53.0, 45.0, 43.0, 41.0, 60.0, 40.0, 39.0, 61.0, 51.0, 41.0, 34.0, 34.0, 40.0, 38.0, 43.0, 38.0, 39.0, 29.0, 39.0, 44.0, 35.0, 44.0, 23.0, 34.0, 33.0, 20.0, 34.0, 63.0, 42.0, 30.0, 28.0, 36.0, 29.0, 31.0, 35.0, 31.0, 31.0, 28.0, 39.0, 24.0, 28.0, 24.0, 29.0, 43.0, 33.0, 30.0, 30.0, 23.0, 20.0, 25.0, 22.0, 16.0, 19.0, 15.0, 28.0, 25.0, 13.0, 16.0, 14.0, 19.0, 20.0, 12.0, 13.0, 13.0, 20.0, 11.0, 17.0, 12.0, 17.0, 11.0, 17.0, 17.0, 13.0, 12.0, 14.0, 14.0, 8.0];
      // var data2 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 6.0, 8.0, 8.0, 9.0, 12.0, 12.0, 14.0, 14.0, 16.0, 19.0, 22.0, 22.0, 27.0, 34.0, 37.0, 40.0, 42.0, 44.0, 40.0, 44.0, 45.0, 54.0, 54.0, 52.0, 58.0, 62.0, 63.0, 63.0, 63.0, 62.0, 65.0, 65.0, 64.0, 69.0, 70.0, 65.0, 64.0, 63.0, 63.0, 62.0, 56.0, 56.0, 56.0, 56.0, 54.0, 51.0, 50.0, 50.0, 49.0, 52.0, 52.0, 54.0, 52.0, 49.0, 48.0, 49.0, 48.0, 47.0, 48.0, 48.0, 50.0, 51.0, 52.0, 55.0, 53.0, 52.0, 50.0, 53.0, 54.0, 51.0, 51.0, 52.0, 53.0, 53.0, 55.0, 57.0, 62.0, 58.0, 57.0, 58.0, 61.0, 59.0, 60.0, 57.0, 59.0, 60.0, 58.0, 58.0, 57.0, 55.0, 54.0, 53.0, 53.0, 53.0, 53.0, 50.0, 52.0, 53.0, 55.0, 54.0, 54.0, 53.0, 55.0, 53.0, 53.0, 54.0, 52.0, 55.0, 56.0, 59.0, 59.0, 61.0, 64.0, 63.0, 64.0, 65.0, 66.0, 64.0, 61.0, 63.0, 64.0, 61.0, 63.0, 64.0, 64.0, 60.0, 58.0, 59.0, 59.0, 58.0, 55.0, 52.0, 52.0, 54.0, 52.0, 51.0, 55.0, 52.0, 57.0, 54.0, 54.0, 61.0, 65.0, 65.0, 67.0, 68.0, 66.0, 66.0, 62.0, 63.0, 64.0, 61.0, 67.0, 62.0, 60.0, 60.0, 57.0, 59.0, 63.0, 60.0, 61.0, 63.0, 59.0, 56.0, 52.0, 52.0, 55.0, 52.0, 52.0, 50.0, 49.0, 48.0, 44.0, 44.0, 42.0, 39.0, 41.0, 42.0, 41.0, 39.0, 39.0, 37.0, 37.0, 34.0, 35.0, 33.0, 32.0, 30.0, 30.0, 30.0, 31.0, 30.0, 32.0, 28.0, 24.0, 26.0, 25.0, 24.0, 23.0, 22.0, 23.0, 24.0, 23.0, 21.0, 19.0, 19.0, 17.0, 17.0, 15.0, 14.0, 15.0, 14.0, 14.0, 12.0, 11.0, 11.0, 10.0, 9.0, 9.0, 8.0, 7.0, 6.0, 8.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 8.0, 9.0, 10.0, 10.0, 11.0, 13.0, 16.0, 17.0, 18.0, 26.0, 29.0, 35.0, 37.0, 39.0, 38.0, 39.0, 41.0, 44.0, 47.0, 50.0, 56.0, 58.0, 62.0, 64.0, 68.0, 66.0, 66.0, 65.0, 66.0, 66.0, 63.0, 62.0, 62.0, 62.0, 63.0, 61.0, 63.0, 62.0, 62.0, 60.0, 62.0, 63.0, 59.0, 58.0, 55.0, 56.0, 56.0, 55.0, 55.0, 54.0, 51.0, 50.0, 50.0, 50.0, 52.0, 51.0, 50.0, 52.0, 52.0, 52.0, 52.0, 50.0, 50.0, 49.0, 49.0, 53.0, 56.0, 54.0, 55.0, 59.0, 63.0, 64.0, 64.0, 58.0, 58.0, 58.0, 58.0, 57.0, 55.0, 56.0, 54.0, 57.0, 54.0, 54.0, 54.0, 54.0, 56.0, 58.0, 57.0, 60.0, 56.0, 55.0, 57.0, 57.0, 59.0, 63.0, 61.0, 60.0, 57.0, 54.0, 58.0, 56.0, 57.0, 55.0, 55.0, 59.0, 59.0, 61.0, 63.0, 66.0, 64.0, 64.0, 65.0, 66.0, 65.0, 64.0, 64.0, 66.0, 64.0, 64.0, 61.0, 63.0, 57.0, 57.0, 59.0, 58.0, 60.0, 56.0, 54.0, 53.0, 53.0, 51.0, 52.0, 55.0, 56.0, 58.0, 60.0, 61.0, 62.0, 64.0, 65.0, 64.0, 64.0, 65.0, 65.0, 65.0, 65.0, 64.0, 64.0, 65.0, 64.0, 61.0, 58.0, 58.0, 61.0, 62.0, 62.0, 66.0, 59.0, 56.0, 52.0, 53.0, 55.0, 52.0, 50.0, 47.0, 46.0, 48.0, 47.0, 43.0, 42.0, 44.0, 42.0, 40.0, 38.0, 42.0, 45.0, 40.0, 38.0, 41.0, 45.0, 40.0, 42.0, 39.0, 41.0, 38.0, 35.0, 36.0, 36.0, 28.0, 30.0, 32.0, 29.0, 30.0, 25.0, 25.0, 27.0, 32.0, 29.0, 29.0, 27.0, 23.0, 20.0, 18.0, 17.0, 19.0, 17.0, 16.0, 16.0, 14.0, 15.0, 13.0, 12.0, 12.0, 11.0, 12.0, 11.0, 11.0, 9.0, 8.0, 8.0, 8.0, 8.0, 6.0, 6.0, 5.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 6.0, 7.0, 7.0, 8.0, 9.0, 9.0, 10.0, 11.0, 13.0, 15.0, 16.0, 20.0, 27.0, 30.0, 31.0, 31.0, 33.0, 31.0, 37.0, 43.0, 50.0, 51.0, 56.0, 57.0, 62.0, 63.0, 64.0, 62.0, 60.0, 61.0, 65.0, 69.0, 74.0, 71.0, 70.0, 65.0, 58.0, 63.0, 61.0, 59.0, 59.0, 57.0, 57.0, 55.0, 55.0, 56.0, 57.0, 54.0, 54.0, 53.0, 54.0, 53.0, 53.0, 52.0, 52.0, 51.0, 49.0, 50.0, 50.0, 51.0, 52.0, 53.0, 51.0, 53.0, 52.0, 49.0, 47.0, 49.0, 51.0, 51.0, 50.0, 50.0, 54.0, 54.0, 55.0, 59.0, 57.0, 59.0, 62.0, 64.0, 63.0, 62.0, 58.0, 64.0, 61.0, 56.0, 56.0, 57.0, 58.0, 56.0, 56.0, 55.0, 56.0, 54.0, 53.0, 56.0, 56.0, 60.0, 60.0, 59.0, 60.0, 61.0, 61.0, 60.0, 61.0, 63.0, 64.0, 66.0, 68.0, 67.0, 65.0, 66.0, 64.0, 67.0, 66.0, 67.0, 63.0, 63.0, 61.0, 62.0, 60.0, 58.0, 56.0, 55.0, 57.0, 58.0, 57.0, 57.0, 51.0, 52.0, 53.0, 53.0, 51.0, 48.0, 51.0, 47.0, 45.0, 52.0, 54.0, 54.0, 53.0, 58.0, 60.0, 60.0, 60.0, 59.0, 64.0, 64.0, 64.0, 66.0, 62.0, 62.0, 62.0, 60.0, 61.0, 60.0, 57.0, 58.0, 56.0, 55.0, 54.0, 54.0, 53.0, 52.0, 51.0, 51.0, 51.0, 49.0, 48.0, 48.0, 46.0, 45.0, 45.0, 43.0, 43.0, 40.0, 39.0, 38.0, 39.0, 36.0, 37.0, 40.0, 40.0, 38.0, 39.0, 38.0, 33.0, 30.0, 35.0, 34.0, 31.0, 28.0, 29.0, 29.0, 26.0, 22.0, 26.0, 28.0, 29.0, 27.0, 23.0, 21.0, 21.0, 23.0, 24.0, 24.0, 20.0, 20.0, 18.0, 20.0, 21.0, 19.0, 19.0, 17.0, 18.0, 17.0, 19.0, 18.0, 18.0, 16.0, 17.0, 14.0, 15.0, 13.0, 13.0, 14.0, 11.0, 11.0, 10.0, 11.0, 10.0, 11.0, 10.0, 9.0, 10.0, 9.0, 10.0, 9.0, 8.0, 8.0, 8.0, 10.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 3.0, 2.0, 3.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 3.0, 4.0, 4.0, 6.0, 7.0, 8.0, 10.0, 8.0, 9.0, 10.0, 11.0, 12.0, 15.0, 19.0, 20.0, 20.0, 17.0, 22.0, 22.0, 19.0, 19.0, 18.0, 20.0, 21.0, 19.0, 19.0, 21.0, 23.0, 28.0, 29.0, 29.0, 29.0, 30.0, 27.0, 30.0, 31.0, 32.0, 32.0, 32.0, 34.0, 37.0, 42.0, 42.0, 43.0, 39.0, 35.0, 33.0, 39.0, 37.0, 40.0, 42.0, 42.0, 46.0, 46.0, 45.0, 44.0, 45.0, 43.0, 45.0, 45.0, 48.0, 49.0, 51.0, 51.0, 52.0, 52.0, 54.0, 53.0, 52.0, 52.0, 55.0, 54.0, 52.0, 53.0, 52.0, 54.0, 55.0, 57.0, 55.0, 56.0, 52.0, 56.0, 58.0, 59.0, 60.0, 59.0, 60.0, 58.0, 59.0, 58.0, 59.0, 57.0, 56.0, 56.0, 56.0, 56.0, 56.0, 56.0, 55.0, 52.0, 51.0, 52.0, 50.0, 53.0, 52.0, 56.0, 53.0, 53.0, 54.0, 53.0, 52.0, 53.0, 55.0, 54.0, 54.0, 53.0, 50.0, 50.0, 50.0, 51.0, 52.0, 51.0, 52.0, 53.0, 54.0, 54.0, 52.0, 52.0, 52.0, 50.0, 52.0, 53.0, 51.0, 49.0, 52.0, 49.0, 53.0, 52.0, 52.0, 56.0, 55.0, 50.0, 50.0, 50.0, 49.0, 52.0, 51.0, 50.0, 54.0, 59.0, 63.0, 71.0, 71.0, 70.0, 62.0, 60.0, 60.0, 58.0, 56.0, 52.0, 48.0, 49.0, 43.0, 44.0, 43.0, 45.0, 46.0, 42.0, 44.0, 45.0, 44.0, 47.0, 47.0, 44.0, 42.0, 41.0, 42.0, 39.0, 34.0, 32.0, 30.0, 28.0, 26.0, 25.0, 26.0, 25.0, 25.0, 23.0, 25.0, 27.0, 25.0, 25.0, 23.0, 21.0, 22.0, 24.0, 22.0, 23.0, 23.0, 21.0, 20.0, 19.0, 20.0, 19.0, 18.0, 16.0, 16.0, 17.0, 16.0, 17.0, 19.0, 17.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 14.0, 14.0, 13.0, 12.0, 12.0, 9.0, 10.0, 11.0, 10.0, 8.0, 9.0, 8.0, 9.0, 8.0, 8.0, 7.0, 6.0, 6.0, 6.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 5.0, 6.0, 6.0, 7.0, 7.0, 7.0, 8.0, 8.0, 8.0, 8.0, 10.0, 9.0, 10.0, 13.0, 11.0, 13.0, 11.0, 12.0, 11.0, 13.0, 14.0, 14.0, 15.0, 16.0, 16.0, 17.0, 21.0, 22.0, 21.0, 20.0, 17.0, 19.0, 22.0, 21.0, 23.0, 23.0, 25.0, 28.0, 29.0, 29.0, 31.0, 28.0, 26.0, 28.0, 31.0, 32.0, 32.0, 35.0, 35.0, 39.0, 40.0, 41.0, 42.0, 43.0, 46.0, 49.0, 49.0, 55.0, 60.0, 56.0, 53.0, 53.0, 55.0, 57.0, 53.0, 53.0, 52.0, 51.0, 50.0, 49.0, 50.0, 52.0, 52.0, 56.0, 57.0, 59.0, 55.0, 56.0, 52.0, 53.0, 51.0, 50.0, 49.0, 47.0, 46.0, 47.0, 47.0, 46.0, 46.0, 44.0, 46.0, 46.0, 47.0, 46.0, 46.0, 46.0, 46.0, 44.0, 43.0, 44.0, 46.0, 45.0, 45.0, 43.0, 46.0, 49.0, 46.0, 48.0, 46.0, 46.0, 48.0, 48.0, 47.0, 47.0, 45.0, 45.0, 45.0, 44.0, 49.0, 46.0, 45.0, 45.0, 47.0, 48.0, 49.0, 48.0, 49.0, 50.0, 53.0, 53.0, 50.0, 51.0, 51.0, 51.0, 51.0, 51.0, 52.0, 50.0, 48.0, 47.0, 45.0, 46.0, 47.0, 51.0, 55.0, 60.0, 65.0, 62.0, 58.0, 55.0, 49.0, 44.0, 42.0, 37.0, 35.0, 33.0, 28.0, 28.0, 29.0, 31.0, 28.0, 26.0, 23.0, 21.0, 20.0, 20.0, 21.0, 21.0, 20.0, 18.0, 19.0, 20.0, 19.0, 19.0, 17.0, 16.0, 16.0, 16.0, 18.0, 17.0, 18.0, 16.0, 15.0, 13.0, 16.0, 16.0, 14.0, 14.0, 14.0, 12.0, 10.0, 10.0, 11.0, 12.0, 11.0, 11.0, 10.0, 12.0, 11.0, 10.0, 9.0, 8.0, 8.0, 8.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 5.0, 7.0, 9.0, 9.0, 10.0, 10.0, 10.0, 12.0, 13.0, 16.0, 19.0, 20.0, 24.0, 26.0, 32.0, 37.0, 36.0, 36.0, 36.0, 41.0, 43.0, 45.0, 46.0, 49.0, 53.0, 55.0, 56.0, 57.0, 58.0, 56.0, 53.0, 55.0, 54.0, 59.0, 60.0, 61.0, 55.0, 53.0, 54.0, 54.0, 54.0, 54.0, 52.0, 49.0, 47.0, 46.0, 48.0, 47.0, 47.0, 46.0, 46.0, 44.0, 46.0, 48.0, 47.0, 46.0, 45.0, 46.0, 48.0, 47.0, 46.0, 47.0, 49.0, 48.0, 48.0, 48.0, 45.0, 45.0, 45.0, 46.0, 48.0, 49.0, 50.0, 53.0, 48.0, 48.0, 49.0, 49.0, 49.0, 52.0, 52.0, 55.0, 57.0, 53.0, 55.0, 54.0, 54.0, 58.0, 56.0, 51.0, 52.0, 53.0, 50.0, 51.0, 50.0, 50.0, 51.0, 47.0, 52.0, 52.0, 50.0, 53.0, 53.0, 55.0, 56.0, 54.0, 57.0, 53.0, 55.0, 56.0, 57.0, 57.0, 59.0, 61.0, 65.0, 66.0, 64.0, 67.0, 67.0, 66.0, 64.0, 62.0, 65.0, 65.0, 61.0, 60.0, 61.0, 62.0, 58.0, 54.0, 56.0, 57.0, 56.0, 56.0, 55.0, 58.0, 58.0, 57.0, 60.0, 60.0, 62.0, 62.0, 60.0, 63.0, 64.0, 63.0, 66.0, 63.0, 62.0, 61.0, 60.0, 59.0, 61.0, 60.0, 56.0, 55.0, 54.0, 56.0, 57.0, 57.0, 56.0, 56.0, 55.0, 53.0, 50.0, 48.0, 47.0, 46.0, 43.0, 42.0, 40.0, 39.0, 36.0, 36.0, 34.0, 31.0, 32.0, 39.0, 35.0, 31.0, 33.0, 36.0, 32.0, 30.0, 29.0, 30.0, 31.0, 32.0, 31.0, 30.0, 30.0, 29.0, 29.0, 25.0, 23.0, 24.0, 23.0, 21.0, 21.0, 24.0, 23.0, 23.0, 21.0, 21.0, 18.0, 16.0, 16.0, 14.0, 14.0, 13.0, 12.0, 12.0, 10.0, 9.0, 10.0, 8.0, 7.0, 8.0, 7.0, 7.0, 6.0, 7.0, 7.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 5.0, 8.0, 8.0, 9.0, 9.0, 10.0, 10.0, 11.0, 12.0, 15.0, 18.0, 19.0, 24.0, 31.0, 34.0, 33.0, 38.0, 35.0, 37.0, 37.0, 42.0, 44.0, 48.0, 51.0, 56.0, 66.0, 69.0, 69.0, 64.0, 63.0, 62.0, 60.0, 63.0, 64.0, 66.0, 66.0, 67.0, 63.0, 60.0, 57.0, 58.0, 57.0, 56.0, 54.0, 53.0, 54.0, 52.0, 54.0, 54.0, 49.0, 53.0, 51.0, 52.0, 52.0, 50.0, 49.0, 48.0, 45.0, 45.0, 46.0, 46.0, 50.0, 49.0, 51.0, 51.0, 49.0, 50.0, 50.0, 47.0, 51.0, 52.0, 50.0, 49.0, 52.0, 52.0, 54.0, 55.0, 56.0, 57.0, 58.0, 62.0, 60.0, 58.0, 55.0, 60.0, 60.0, 69.0, 70.0, 70.0, 68.0, 66.0, 66.0, 64.0, 63.0, 64.0, 62.0, 63.0, 62.0, 62.0, 61.0, 61.0, 59.0, 61.0, 61.0, 58.0, 59.0, 58.0, 60.0, 61.0, 63.0, 66.0, 65.0, 64.0, 64.0, 63.0, 66.0, 66.0, 65.0, 65.0, 66.0, 64.0, 65.0, 62.0, 61.0, 63.0, 65.0, 67.0, 68.0, 67.0, 65.0, 62.0, 57.0, 55.0, 56.0, 55.0, 53.0, 58.0, 60.0, 59.0, 62.0, 62.0, 63.0, 62.0, 60.0, 63.0, 63.0, 62.0, 64.0, 61.0, 62.0, 65.0, 63.0, 66.0, 67.0, 65.0, 61.0, 64.0, 66.0, 60.0, 63.0, 63.0, 56.0, 53.0, 52.0, 51.0, 51.0, 50.0, 48.0, 46.0, 46.0, 46.0, 45.0, 43.0, 41.0, 41.0, 39.0, 37.0, 34.0, 34.0, 32.0, 31.0, 31.0, 31.0, 30.0, 30.0, 30.0, 30.0, 29.0, 29.0, 30.0, 31.0, 29.0, 30.0, 31.0, 30.0, 29.0, 30.0, 31.0, 30.0, 32.0, 31.0, 26.0, 26.0, 27.0, 22.0, 20.0, 18.0, 18.0, 18.0, 16.0, 15.0, 15.0, 14.0, 13.0, 13.0, 13.0, 11.0, 10.0, 10.0, 9.0, 8.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 7.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 6.0, 7.0, 6.0, 9.0, 8.0, 10.0, 11.0, 11.0, 12.0, 15.0, 17.0, 18.0, 19.0, 22.0, 29.0, 31.0, 33.0, 34.0, 37.0, 38.0, 36.0, 39.0, 52.0, 52.0, 54.0, 62.0, 58.0, 64.0, 66.0, 61.0, 60.0, 60.0, 66.0, 65.0, 66.0, 65.0, 63.0, 65.0, 64.0, 64.0, 60.0, 57.0, 58.0, 58.0, 55.0, 55.0, 56.0, 54.0, 52.0, 52.0, 54.0, 57.0, 55.0, 57.0, 57.0, 59.0, 58.0, 57.0, 55.0, 55.0, 55.0, 56.0, 55.0, 53.0, 54.0, 53.0, 51.0, 51.0, 51.0, 52.0, 53.0, 52.0, 55.0, 57.0, 58.0, 58.0, 65.0, 66.0, 66.0, 65.0, 65.0, 66.0, 69.0, 73.0, 69.0, 67.0, 69.0, 68.0, 67.0, 67.0, 64.0, 63.0, 64.0, 62.0, 63.0, 60.0, 58.0, 57.0, 58.0, 57.0, 62.0, 65.0, 66.0, 64.0, 56.0, 58.0, 60.0, 61.0, 63.0, 64.0, 62.0, 64.0, 63.0, 63.0, 59.0, 57.0, 56.0, 55.0, 52.0, 53.0, 49.0, 46.0, 46.0, 43.0, 46.0, 45.0, 45.0, 45.0, 48.0, 47.0, 46.0, 44.0, 47.0, 42.0, 44.0, 45.0, 47.0, 51.0, 48.0, 51.0, 52.0, 59.0, 61.0, 59.0, 57.0, 59.0, 59.0, 60.0, 59.0, 59.0, 61.0, 58.0, 60.0, 60.0, 64.0, 64.0, 65.0, 67.0, 66.0, 66.0, 68.0, 69.0, 65.0, 63.0, 63.0, 60.0, 61.0, 59.0, 56.0, 57.0, 52.0, 49.0, 47.0, 46.0, 46.0, 45.0, 43.0, 41.0, 41.0, 41.0, 38.0, 40.0, 43.0, 43.0, 41.0, 40.0, 37.0, 39.0, 39.0, 40.0, 45.0, 41.0, 44.0, 42.0, 41.0, 46.0, 41.0, 38.0, 37.0, 40.0, 37.0, 33.0, 32.0, 35.0, 32.0, 29.0, 28.0, 25.0, 26.0, 22.0, 21.0, 19.0, 19.0, 17.0, 14.0, 13.0, 11.0, 11.0, 10.0, 10.0, 10.0, 9.0, 8.0, 8.0, 9.0, 8.0, 7.0, 8.0, 6.0, 7.0, 6.0, 5.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 7.0, 8.0, 8.0, 8.0, 9.0, 10.0, 11.0, 11.0, 12.0, 13.0, 16.0, 20.0, 28.0, 29.0, 32.0, 36.0, 40.0, 38.0, 39.0, 42.0, 46.0, 47.0, 53.0, 51.0, 58.0, 60.0, 62.0, 63.0, 63.0, 64.0, 64.0, 65.0, 66.0, 65.0, 65.0, 61.0, 63.0, 62.0, 61.0, 60.0, 58.0, 54.0, 59.0, 60.0, 58.0, 56.0, 54.0, 54.0, 57.0, 55.0, 55.0, 54.0, 55.0, 53.0, 54.0, 52.0, 53.0, 53.0, 52.0, 51.0, 52.0, 51.0, 53.0, 51.0, 52.0, 51.0, 49.0, 50.0, 50.0, 52.0, 53.0, 51.0, 52.0, 56.0, 55.0, 56.0, 57.0, 58.0, 59.0, 63.0, 62.0, 64.0, 63.0, 63.0, 61.0, 58.0, 56.0, 59.0, 58.0, 56.0, 57.0, 58.0, 59.0, 56.0, 57.0, 57.0, 59.0, 58.0, 60.0, 60.0, 57.0, 61.0, 62.0, 60.0, 59.0, 60.0, 59.0, 63.0, 61.0, 64.0, 66.0, 67.0, 61.0, 64.0, 67.0, 68.0, 68.0, 67.0, 66.0, 65.0, 65.0, 64.0, 62.0, 62.0, 59.0, 59.0, 58.0, 59.0, 56.0, 56.0, 55.0, 55.0, 52.0, 55.0, 52.0, 52.0, 51.0, 53.0, 59.0, 57.0, 61.0, 68.0, 65.0, 64.0, 64.0, 62.0, 62.0, 64.0, 64.0, 63.0, 63.0, 62.0, 62.0, 61.0, 60.0, 62.0, 60.0, 60.0, 59.0, 61.0, 61.0, 60.0, 60.0, 59.0, 59.0, 58.0, 59.0, 57.0, 54.0, 49.0, 48.0, 47.0, 49.0, 49.0, 44.0, 41.0, 44.0, 41.0, 38.0, 37.0, 41.0, 39.0, 38.0, 36.0, 36.0, 39.0, 37.0, 37.0, 35.0, 36.0, 34.0, 35.0, 35.0, 36.0, 35.0, 35.0, 36.0, 33.0, 34.0, 33.0, 33.0, 31.0, 29.0, 27.0, 28.0, 26.0, 25.0, 24.0, 23.0, 20.0, 20.0, 17.0, 17.0, 16.0, 18.0, 15.0, 14.0, 14.0, 14.0, 14.0, 13.0, 13.0, 12.0, 11.0, 10.0, 9.0, 10.0, 9.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 4.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 5.0, 6.0, 5.0, 7.0, 8.0, 9.0, 9.0, 9.0, 10.0, 12.0, 14.0, 14.0, 18.0, 24.0, 29.0, 31.0, 27.0, 30.0, 30.0, 32.0, 36.0, 38.0, 43.0, 48.0, 51.0, 54.0, 57.0, 61.0, 60.0, 64.0, 67.0, 65.0, 64.0, 63.0, 63.0, 64.0, 62.0, 64.0, 62.0, 62.0, 59.0, 58.0, 53.0, 55.0, 51.0, 51.0, 52.0, 53.0, 53.0, 51.0, 54.0, 53.0, 52.0, 50.0, 50.0, 48.0, 47.0, 49.0, 48.0, 49.0, 52.0, 50.0, 52.0, 52.0, 51.0, 47.0, 46.0, 48.0, 51.0, 47.0, 52.0, 51.0, 56.0, 54.0, 55.0, 58.0, 63.0, 60.0, 63.0, 63.0, 56.0, 56.0, 57.0, 55.0, 55.0, 55.0, 53.0, 55.0, 53.0, 53.0, 53.0, 52.0, 52.0, 51.0, 51.0, 51.0, 49.0, 52.0, 55.0, 53.0, 54.0, 54.0, 56.0, 58.0, 56.0, 56.0, 57.0, 58.0, 58.0, 58.0, 59.0, 59.0, 61.0, 61.0, 63.0, 61.0, 63.0, 61.0, 57.0, 59.0, 58.0, 57.0, 56.0, 56.0, 55.0, 56.0, 54.0, 58.0, 52.0, 53.0, 52.0, 49.0, 50.0, 50.0, 46.0, 46.0, 47.0, 50.0, 52.0, 53.0, 56.0, 54.0, 57.0, 60.0, 63.0, 63.0, 68.0, 64.0, 64.0, 61.0, 63.0, 64.0, 66.0, 65.0, 61.0, 62.0, 59.0, 59.0, 57.0, 56.0, 57.0, 57.0, 54.0, 52.0, 53.0, 53.0, 51.0, 52.0, 49.0, 47.0, 45.0, 45.0, 44.0, 43.0, 40.0, 40.0, 40.0, 38.0, 37.0, 36.0, 38.0, 36.0, 35.0, 36.0, 35.0, 36.0, 33.0, 36.0, 32.0, 29.0, 31.0, 30.0, 29.0, 31.0, 31.0, 33.0, 29.0, 29.0, 29.0, 28.0, 24.0, 24.0, 27.0, 26.0, 25.0, 25.0, 24.0, 22.0, 22.0, 23.0, 25.0, 23.0, 22.0, 20.0, 19.0, 19.0, 18.0, 16.0, 17.0, 18.0, 18.0, 18.0, 18.0, 17.0, 16.0, 16.0, 13.0, 13.0, 11.0, 11.0, 10.0, 9.0, 9.0, 8.0, 8.0, 7.0, 8.0, 8.0, 8.0, 7.0, 7.0, 7.0, 6.0, 5.0, 5.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 5.0, 6.0, 6.0, 6.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 12.0, 11.0, 11.0, 11.0, 14.0, 14.0, 16.0, 16.0, 16.0, 18.0, 19.0, 19.0, 19.0, 20.0, 18.0, 16.0, 16.0, 18.0, 18.0, 18.0, 21.0, 24.0, 26.0, 26.0, 27.0, 28.0, 27.0, 26.0, 27.0, 33.0, 33.0, 33.0, 33.0, 34.0, 35.0, 39.0, 37.0, 38.0, 36.0, 32.0, 32.0, 35.0, 35.0, 34.0, 36.0, 41.0, 40.0, 43.0, 42.0, 47.0, 45.0, 44.0, 43.0, 43.0, 41.0, 43.0, 45.0, 46.0, 45.0, 45.0, 47.0, 51.0, 49.0, 48.0, 46.0, 48.0, 48.0, 47.0, 46.0, 48.0, 46.0, 47.0, 49.0, 51.0, 63.0, 52.0, 56.0, 57.0, 52.0, 54.0, 55.0, 52.0, 54.0, 52.0, 52.0, 50.0, 50.0, 51.0, 53.0, 53.0, 53.0, 52.0, 56.0, 53.0, 51.0, 53.0, 50.0, 51.0, 49.0, 49.0, 51.0, 49.0, 51.0, 49.0, 50.0, 47.0, 46.0, 47.0, 49.0, 51.0, 51.0, 48.0, 49.0, 48.0, 50.0, 48.0, 46.0, 50.0, 46.0, 49.0, 48.0, 45.0, 46.0, 49.0, 48.0, 49.0, 50.0, 53.0, 55.0, 57.0, 57.0, 54.0, 54.0, 56.0, 56.0, 53.0, 53.0, 53.0, 54.0, 54.0, 51.0, 51.0, 51.0, 50.0, 49.0, 48.0, 50.0, 47.0, 47.0, 46.0, 47.0, 47.0, 45.0, 44.0, 45.0, 44.0, 44.0, 41.0, 41.0, 37.0, 35.0, 35.0, 30.0, 32.0, 32.0, 30.0, 30.0, 29.0, 28.0, 29.0, 26.0, 28.0, 29.0, 28.0, 29.0, 28.0, 24.0, 22.0, 21.0, 21.0, 21.0, 19.0, 19.0, 19.0, 20.0, 21.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 17.0, 19.0, 19.0, 16.0, 17.0, 17.0, 17.0, 15.0, 14.0, 16.0, 14.0, 13.0, 15.0, 15.0, 15.0, 14.0, 13.0, 14.0, 13.0, 11.0, 10.0, 10.0, 9.0, 8.0, 8.0, 8.0, 9.0, 8.0, 9.0, 9.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 9.0, 8.0, 6.0, 7.0, 8.0, 8.0, 9.0, 8.0, 9.0, 10.0, 11.0, 11.0, 13.0, 12.0, 11.0, 11.0, 11.0, 11.0, 12.0, 13.0, 14.0, 17.0, 16.0, 16.0, 18.0, 16.0, 17.0, 19.0, 19.0, 21.0, 21.0, 21.0, 22.0, 23.0, 24.0, 29.0, 28.0, 24.0, 25.0, 29.0, 28.0, 31.0, 32.0, 33.0, 30.0, 30.0, 31.0, 32.0, 33.0, 31.0, 29.0, 28.0, 28.0, 29.0, 30.0, 32.0, 29.0, 34.0, 35.0, 35.0, 37.0, 36.0, 33.0, 33.0, 33.0, 32.0, 33.0, 33.0, 35.0, 36.0, 36.0, 37.0, 38.0, 43.0, 44.0, 41.0, 39.0, 35.0, 38.0, 37.0, 36.0, 39.0, 42.0, 39.0, 42.0, 42.0, 41.0, 39.0, 38.0, 36.0, 38.0, 38.0, 38.0, 38.0, 39.0, 40.0, 38.0, 35.0, 42.0, 38.0, 38.0, 41.0, 43.0, 46.0, 44.0, 40.0, 38.0, 39.0, 43.0, 42.0, 39.0, 39.0, 39.0, 38.0, 38.0, 39.0, 41.0, 38.0, 35.0, 32.0, 31.0, 34.0, 35.0, 35.0, 35.0, 36.0, 36.0, 34.0, 33.0, 35.0, 36.0, 33.0, 37.0, 35.0, 31.0, 31.0, 33.0, 32.0, 30.0, 30.0, 32.0, 33.0, 30.0, 29.0, 29.0, 28.0, 26.0, 24.0, 27.0, 27.0, 27.0, 26.0, 26.0, 23.0, 22.0, 20.0, 22.0, 22.0, 19.0, 20.0, 18.0, 17.0, 19.0, 19.0, 18.0, 17.0, 18.0, 17.0, 19.0, 19.0, 19.0, 20.0, 19.0, 19.0, 17.0, 19.0, 17.0, 15.0, 15.0, 16.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 16.0, 14.0, 16.0, 14.0, 15.0, 13.0, 13.0, 12.0, 12.0, 12.0, 11.0, 10.0, 10.0, 11.0, 11.0, 11.0, 9.0, 9.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 3.0, 4.0, 6.0, 7.0, 8.0, 8.0, 9.0, 9.0, 11.0, 10.0, 14.0, 15.0, 17.0, 19.0, 24.0, 27.0, 30.0, 29.0, 30.0, 28.0, 32.0, 31.0, 37.0, 41.0, 42.0, 40.0, 47.0, 51.0, 53.0, 51.0, 51.0, 52.0, 52.0, 53.0, 52.0, 57.0, 59.0, 56.0, 57.0, 55.0, 54.0, 53.0, 54.0, 52.0, 53.0, 50.0, 48.0, 48.0, 49.0, 48.0, 44.0, 48.0, 50.0, 50.0, 48.0, 47.0, 45.0, 45.0, 44.0, 42.0, 46.0, 46.0, 45.0, 45.0, 44.0, 46.0, 45.0, 42.0, 44.0, 45.0, 45.0, 44.0, 44.0, 45.0, 45.0, 50.0, 51.0, 52.0, 52.0, 48.0, 51.0, 54.0, 52.0, 51.0, 51.0, 52.0, 52.0, 53.0, 52.0, 55.0, 56.0, 52.0, 55.0, 52.0, 53.0, 55.0, 50.0, 49.0, 50.0, 48.0, 51.0, 52.0, 51.0, 49.0, 52.0, 51.0, 52.0, 52.0, 51.0, 52.0, 55.0, 55.0, 59.0, 56.0, 56.0, 58.0, 58.0, 56.0, 55.0, 55.0, 56.0, 61.0, 60.0, 59.0, 61.0, 57.0, 61.0, 65.0, 55.0, 60.0, 57.0, 53.0, 53.0, 51.0, 52.0, 53.0, 54.0, 50.0, 50.0, 56.0, 55.0, 52.0, 51.0, 56.0, 58.0, 58.0, 57.0, 54.0, 60.0, 59.0, 56.0, 55.0, 56.0, 58.0, 57.0, 56.0, 58.0, 54.0, 51.0, 52.0, 50.0, 49.0, 50.0, 48.0, 49.0, 46.0, 46.0, 44.0, 46.0, 43.0, 38.0, 39.0, 39.0, 34.0, 34.0, 36.0, 35.0, 35.0, 34.0, 36.0, 35.0, 35.0, 37.0, 33.0, 31.0, 35.0, 32.0, 27.0, 30.0, 33.0, 29.0, 27.0, 29.0, 28.0, 24.0, 24.0, 23.0, 24.0, 22.0, 19.0, 22.0, 22.0, 20.0, 18.0, 17.0, 15.0, 15.0, 14.0, 14.0, 13.0, 12.0, 11.0, 11.0, 12.0, 11.0, 10.0, 9.0, 9.0, 8.0, 8.0, 8.0, 9.0, 10.0, 9.0, 9.0, 9.0, 8.0, 7.0, 6.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 2.0, 4.0, 5.0, 7.0, 8.0, 10.0, 10.0, 10.0, 10.0, 11.0, 13.0, 16.0, 19.0, 23.0, 23.0, 30.0, 33.0, 36.0, 32.0, 30.0, 35.0, 37.0, 41.0, 40.0, 42.0, 44.0, 47.0, 51.0, 55.0, 60.0, 58.0, 55.0, 57.0, 57.0, 59.0, 59.0, 58.0, 58.0, 59.0, 58.0, 59.0, 61.0, 59.0, 55.0, 54.0, 53.0, 53.0, 50.0, 50.0, 50.0, 50.0, 51.0, 53.0, 54.0, 52.0, 51.0, 49.0, 50.0, 48.0, 48.0, 47.0, 46.0, 46.0, 47.0, 48.0, 51.0, 50.0, 49.0, 49.0, 51.0, 51.0, 52.0, 52.0, 52.0, 52.0, 55.0, 55.0, 55.0, 59.0, 58.0, 56.0, 59.0, 57.0, 55.0, 57.0, 57.0, 56.0, 55.0, 55.0, 55.0, 57.0, 54.0, 55.0, 54.0, 54.0, 55.0, 53.0, 51.0, 56.0, 56.0, 59.0, 57.0, 60.0, 58.0, 57.0, 56.0, 55.0, 53.0, 53.0, 54.0, 56.0, 60.0, 60.0, 61.0, 63.0, 63.0, 63.0, 65.0, 66.0, 65.0, 66.0, 67.0, 66.0, 65.0, 64.0, 66.0, 65.0, 62.0, 59.0, 60.0, 57.0, 56.0, 53.0, 51.0, 52.0, 50.0, 52.0, 50.0, 49.0, 54.0, 49.0, 55.0, 57.0, 53.0, 54.0, 54.0, 60.0, 60.0, 58.0, 58.0, 60.0, 56.0, 56.0, 55.0, 57.0, 55.0, 54.0, 56.0, 53.0, 52.0, 50.0, 52.0, 58.0, 57.0, 52.0, 57.0, 52.0, 51.0, 50.0, 50.0, 50.0, 49.0, 48.0, 46.0, 42.0, 43.0, 42.0, 40.0, 38.0, 41.0, 41.0, 38.0, 41.0, 42.0, 45.0, 40.0, 39.0, 39.0, 41.0, 34.0, 36.0, 37.0, 36.0, 32.0, 32.0, 29.0, 28.0, 28.0, 27.0, 27.0, 27.0, 29.0, 26.0, 27.0, 25.0, 24.0, 23.0, 21.0, 20.0, 18.0, 17.0, 15.0, 14.0, 13.0, 13.0, 12.0, 11.0, 11.0, 10.0, 10.0, 9.0, 9.0, 8.0, 8.0, 8.0, 9.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 6.0, 8.0, 8.0, 9.0, 11.0, 10.0, 12.0, 12.0, 15.0, 15.0, 19.0, 22.0, 26.0, 32.0, 33.0, 34.0, 36.0, 36.0, 41.0, 41.0, 44.0, 42.0, 44.0, 49.0, 48.0, 52.0, 53.0, 56.0, 55.0, 55.0, 57.0, 60.0, 61.0, 62.0, 59.0, 59.0, 61.0, 60.0, 60.0, 58.0, 56.0, 56.0, 53.0, 49.0, 49.0, 49.0, 48.0, 46.0, 49.0, 47.0, 48.0, 48.0, 48.0, 50.0, 48.0, 49.0, 50.0, 52.0, 50.0, 51.0, 51.0, 50.0, 51.0, 51.0, 50.0, 50.0, 51.0, 52.0, 51.0, 53.0, 53.0, 53.0, 53.0, 55.0, 55.0, 56.0, 55.0, 55.0, 57.0, 60.0, 62.0, 62.0, 62.0, 61.0, 61.0, 58.0, 58.0, 58.0, 57.0, 59.0, 58.0, 58.0, 59.0, 59.0, 58.0, 56.0, 56.0, 57.0, 55.0, 54.0, 55.0, 56.0, 54.0, 53.0, 55.0, 55.0, 53.0, 55.0, 56.0, 59.0, 57.0, 58.0, 62.0, 63.0, 64.0, 64.0, 61.0, 62.0, 60.0, 57.0, 57.0, 56.0, 53.0, 52.0, 53.0, 55.0, 53.0, 52.0, 52.0, 51.0, 50.0, 48.0, 50.0, 49.0, 49.0, 49.0, 50.0, 52.0, 57.0, 58.0, 60.0, 59.0, 59.0, 58.0, 60.0, 59.0, 59.0, 57.0, 60.0, 59.0, 57.0, 58.0, 53.0, 54.0, 53.0, 52.0, 52.0, 50.0, 53.0, 53.0, 53.0, 54.0, 51.0, 50.0, 49.0, 50.0, 47.0, 45.0, 45.0, 44.0, 43.0, 39.0, 39.0, 41.0, 40.0, 38.0, 39.0, 41.0, 39.0, 39.0, 37.0, 35.0, 36.0, 35.0, 35.0, 35.0, 38.0, 37.0, 38.0, 35.0, 38.0, 35.0, 38.0, 38.0, 36.0, 37.0, 38.0, 36.0, 35.0, 39.0, 46.0, 61.0, 62.0, 59.0, 50.0, 41.0, 43.0, 35.0, 30.0, 25.0, 20.0, 19.0, 17.0, 17.0, 14.0, 13.0, 13.0, 11.0, 11.0, 10.0, 10.0, 10.0, 9.0, 8.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 5.0, 6.0, 8.0, 8.0, 10.0, 10.0, 11.0, 10.0, 14.0, 17.0, 18.0, 27.0, 33.0, 38.0, 40.0, 40.0, 42.0, 42.0, 38.0, 45.0, 48.0, 48.0, 47.0, 49.0, 50.0, 49.0, 52.0, 53.0, 54.0, 54.0, 54.0, 56.0, 58.0, 62.0, 65.0, 62.0, 63.0, 63.0, 61.0, 59.0, 57.0, 57.0, 57.0, 58.0, 56.0, 56.0, 57.0, 56.0, 53.0, 54.0, 54.0, 54.0, 55.0, 53.0, 53.0, 54.0, 52.0, 53.0, 53.0, 54.0, 54.0, 54.0, 55.0, 56.0, 54.0, 53.0, 54.0, 53.0, 54.0, 55.0, 57.0, 57.0, 58.0, 58.0, 60.0, 60.0, 60.0, 60.0, 62.0, 65.0, 65.0, 66.0, 66.0, 62.0, 61.0, 62.0, 61.0, 61.0, 58.0, 57.0, 57.0, 58.0, 57.0, 58.0, 56.0, 58.0, 56.0, 59.0, 66.0, 71.0, 78.0, 75.0, 75.0, 68.0, 64.0, 66.0, 65.0, 64.0, 66.0, 63.0, 63.0, 62.0, 63.0, 60.0, 60.0, 58.0, 57.0, 56.0, 53.0, 55.0, 56.0, 56.0, 53.0, 54.0, 55.0, 55.0, 53.0, 53.0, 52.0, 51.0, 49.0, 47.0, 49.0, 46.0, 46.0, 46.0, 45.0, 47.0, 49.0, 57.0, 56.0, 59.0, 59.0, 59.0, 62.0, 63.0, 61.0, 60.0, 60.0, 58.0, 57.0, 58.0, 55.0, 61.0, 54.0, 56.0, 56.0, 53.0, 53.0, 50.0, 52.0, 50.0, 51.0, 52.0, 48.0, 47.0, 49.0, 47.0, 45.0, 43.0, 42.0, 43.0, 41.0, 39.0, 38.0, 39.0, 36.0, 32.0, 33.0, 32.0, 31.0, 33.0, 33.0, 32.0, 30.0, 29.0, 30.0, 32.0, 36.0, 32.0, 30.0, 29.0, 30.0, 29.0, 28.0, 31.0, 29.0, 28.0, 31.0, 36.0, 42.0, 43.0, 37.0, 35.0, 30.0, 29.0, 26.0, 21.0, 20.0, 19.0, 21.0, 20.0, 18.0, 16.0, 15.0, 13.0, 12.0, 12.0, 15.0, 16.0, 18.0, 16.0, 13.0, 12.0, 12.0, 11.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 5.0, 7.0, 8.0, 10.0, 9.0, 11.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 20.0, 21.0, 26.0, 29.0, 28.0, 28.0, 26.0, 30.0, 31.0, 36.0, 32.0, 31.0, 39.0, 47.0, 45.0, 46.0, 45.0, 46.0, 48.0, 49.0, 52.0, 56.0, 59.0, 57.0, 56.0, 56.0, 54.0, 57.0, 55.0, 55.0, 55.0, 53.0, 52.0, 52.0, 50.0, 48.0, 49.0, 50.0, 49.0, 49.0, 49.0, 46.0, 45.0, 43.0, 42.0, 39.0, 38.0, 41.0, 44.0, 48.0, 46.0, 47.0, 50.0, 45.0, 44.0, 48.0, 49.0, 51.0, 51.0, 51.0, 52.0, 54.0, 52.0, 56.0, 60.0, 60.0, 62.0, 62.0, 57.0, 61.0, 58.0, 56.0, 56.0, 56.0, 55.0, 53.0, 54.0, 53.0, 54.0, 53.0, 54.0, 55.0, 52.0, 51.0, 50.0, 53.0, 50.0, 49.0, 49.0, 51.0, 52.0, 53.0, 52.0, 53.0, 52.0, 50.0, 51.0, 51.0, 52.0, 52.0, 54.0, 54.0, 52.0, 53.0, 55.0, 52.0, 51.0, 52.0, 52.0, 54.0, 54.0, 53.0, 48.0, 51.0, 49.0, 49.0, 47.0, 49.0, 49.0, 50.0, 50.0, 46.0, 46.0, 47.0, 43.0, 43.0, 47.0, 47.0, 50.0, 51.0, 51.0, 53.0, 54.0, 51.0, 51.0, 53.0, 52.0, 50.0, 53.0, 54.0, 55.0, 55.0, 56.0, 54.0, 51.0, 53.0, 52.0, 53.0, 54.0, 52.0, 52.0, 53.0, 52.0, 52.0, 50.0, 49.0, 48.0, 45.0, 42.0, 41.0, 40.0, 38.0, 38.0, 39.0, 37.0, 36.0, 37.0, 37.0, 34.0, 29.0, 29.0, 30.0, 30.0, 30.0, 32.0, 33.0, 29.0, 26.0, 28.0, 28.0, 23.0, 23.0, 24.0, 24.0, 20.0, 21.0, 23.0, 21.0, 21.0, 24.0, 23.0, 21.0, 21.0, 23.0, 19.0, 20.0, 19.0, 16.0, 18.0, 18.0, 19.0, 18.0, 16.0, 16.0, 15.0, 15.0, 17.0, 16.0, 14.0, 14.0, 13.0, 13.0, 12.0, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0, 10.0, 9.0, 9.0, 9.0, 10.0, 8.0, 8.0, 9.0, 9.0, 8.0, 7.0, 7.0, 5.0, 6.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 5.0, 5.0, 6.0, 7.0, 8.0, 8.0, 10.0, 9.0, 9.0, 9.0, 9.0, 8.0, 8.0, 9.0, 9.0, 11.0, 13.0, 13.0, 12.0, 12.0, 13.0, 14.0, 14.0, 16.0, 18.0, 18.0, 18.0, 22.0, 21.0, 22.0, 24.0, 22.0, 19.0, 23.0, 25.0, 25.0, 26.0, 25.0, 26.0, 33.0, 34.0, 33.0, 32.0, 31.0, 27.0, 25.0, 27.0, 29.0, 31.0, 29.0, 29.0, 33.0, 34.0, 31.0, 32.0, 31.0, 31.0, 31.0, 32.0, 34.0, 36.0, 37.0, 36.0, 35.0, 36.0, 41.0, 45.0, 42.0, 43.0, 43.0, 44.0, 43.0, 43.0, 46.0, 46.0, 48.0, 46.0, 46.0, 47.0, 45.0, 44.0, 46.0, 46.0, 49.0, 46.0, 46.0, 46.0, 48.0, 48.0, 47.0, 44.0, 42.0, 41.0, 40.0, 41.0, 41.0, 43.0, 41.0, 42.0, 43.0, 44.0, 41.0, 42.0, 41.0, 42.0, 42.0, 40.0, 43.0, 42.0, 42.0, 45.0, 42.0, 44.0, 47.0, 43.0, 46.0, 47.0, 45.0, 43.0, 43.0, 43.0, 41.0, 42.0, 43.0, 44.0, 43.0, 42.0, 42.0, 44.0, 45.0, 44.0, 43.0, 43.0, 43.0, 44.0, 45.0, 46.0, 44.0, 44.0, 44.0, 43.0, 45.0, 46.0, 46.0, 46.0, 42.0, 42.0, 42.0, 43.0, 38.0, 39.0, 38.0, 38.0, 43.0, 43.0, 42.0, 40.0, 35.0, 38.0, 36.0, 36.0, 33.0, 32.0, 31.0, 27.0, 28.0, 31.0, 31.0, 28.0, 24.0, 23.0, 24.0, 24.0, 24.0, 27.0, 26.0, 24.0, 22.0, 23.0, 20.0, 21.0, 21.0, 18.0, 18.0, 18.0, 19.0, 18.0, 18.0, 18.0, 18.0, 18.0, 20.0, 20.0, 19.0, 19.0, 18.0, 18.0, 18.0, 19.0, 17.0, 18.0, 17.0, 16.0, 14.0, 14.0, 14.0, 12.0, 12.0, 12.0, 12.0, 13.0, 13.0, 13.0, 13.0, 12.0, 12.0, 10.0, 9.0, 9.0, 8.0, 8.0, 7.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 4.0, 5.0, 4.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 4.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 3.0, 5.0, 4.0, 5.0, 5.0, 6.0, 5.0, 6.0, 7.0, 7.0, 6.0, 7.0, 9.0, 10.0, 11.0, 11.0, 10.0, 9.0, 9.0, 10.0, 11.0, 11.0, 11.0, 12.0, 12.0, 14.0, 14.0, 15.0, 15.0, 15.0, 16.0, 18.0, 19.0, 20.0, 19.0, 21.0, 23.0, 21.0, 22.0, 24.0, 22.0, 21.0, 20.0, 24.0, 26.0, 27.0, 27.0, 30.0, 32.0, 29.0, 29.0, 26.0, 27.0, 29.0, 29.0, 28.0, 28.0, 28.0, 30.0, 32.0, 33.0, 33.0, 35.0, 35.0, 32.0, 30.0, 31.0, 35.0, 34.0, 32.0, 34.0, 35.0, 33.0, 32.0, 38.0, 40.0, 40.0, 38.0, 40.0, 41.0, 39.0, 40.0, 41.0, 41.0, 42.0, 42.0, 37.0, 35.0, 38.0, 38.0, 38.0, 35.0, 38.0, 40.0, 39.0, 40.0, 38.0, 38.0, 38.0, 37.0, 38.0, 37.0, 36.0, 36.0, 36.0, 36.0, 34.0, 36.0, 37.0, 39.0, 36.0, 36.0, 33.0, 35.0, 35.0, 38.0, 39.0, 40.0, 35.0, 35.0, 36.0, 35.0, 34.0, 36.0, 40.0, 38.0, 37.0, 40.0, 44.0, 45.0, 41.0, 40.0, 39.0, 39.0, 34.0, 33.0, 31.0, 32.0, 32.0, 29.0, 29.0, 29.0, 28.0, 28.0, 24.0, 26.0, 28.0, 28.0, 27.0, 26.0, 25.0, 25.0, 25.0, 24.0, 23.0, 21.0, 22.0, 21.0, 23.0, 23.0, 25.0, 24.0, 22.0, 20.0, 21.0, 19.0, 21.0, 18.0, 19.0, 19.0, 20.0, 19.0, 18.0, 20.0, 19.0, 22.0, 20.0, 18.0, 18.0, 15.0, 15.0, 15.0, 15.0, 16.0, 13.0, 14.0, 14.0, 12.0, 13.0, 11.0, 9.0, 10.0, 13.0, 18.0, 16.0, 17.0, 14.0, 14.0, 14.0, 12.0, 11.0, 9.0, 7.0, 8.0, 8.0, 8.0, 8.0, 8.0, 7.0, 7.0, 6.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 2.0, 3.0, 2.0, 2.0, 3.0, 3.0, 4.0, 6.0, 5.0, 8.0, 8.0, 9.0, 8.0, 9.0, 9.0, 11.0, 14.0, 15.0, 17.0, 20.0, 25.0, 29.0, 28.0, 27.0, 30.0, 28.0, 33.0, 33.0, 35.0, 38.0, 37.0, 41.0, 44.0, 47.0, 47.0, 51.0, 48.0, 48.0, 48.0, 50.0, 51.0, 53.0, 55.0, 52.0, 54.0, 55.0, 56.0, 55.0, 52.0, 52.0, 51.0, 49.0, 50.0, 50.0, 49.0, 48.0, 45.0, 48.0, 47.0, 49.0, 46.0, 44.0, 44.0, 41.0, 39.0, 40.0, 43.0, 41.0, 42.0, 40.0, 43.0, 43.0, 39.0, 40.0, 43.0, 44.0, 44.0, 45.0, 43.0, 49.0, 50.0, 49.0, 52.0, 52.0, 52.0, 52.0, 53.0, 54.0, 52.0, 50.0, 51.0, 51.0, 49.0, 49.0, 48.0, 50.0, 48.0, 47.0, 47.0, 50.0, 49.0, 48.0, 48.0, 48.0, 51.0, 52.0, 54.0, 55.0, 53.0, 52.0, 54.0, 55.0, 53.0, 51.0, 52.0, 51.0, 53.0, 55.0, 59.0, 60.0, 62.0, 61.0, 61.0, 60.0, 55.0, 58.0, 56.0, 56.0, 54.0, 53.0, 54.0, 53.0, 53.0, 54.0, 52.0, 53.0, 53.0, 53.0, 51.0, 48.0, 49.0, 52.0, 51.0, 52.0, 53.0, 54.0, 58.0, 56.0, 54.0, 56.0, 59.0, 58.0, 54.0, 52.0, 51.0, 53.0, 48.0, 48.0, 47.0, 46.0, 46.0, 49.0, 48.0, 47.0, 46.0, 48.0, 49.0, 48.0, 50.0, 49.0, 45.0, 45.0, 44.0, 44.0, 38.0, 38.0, 37.0, 38.0, 34.0, 33.0, 32.0, 31.0, 30.0, 27.0, 26.0, 29.0, 30.0, 28.0, 26.0, 26.0, 27.0, 27.0, 25.0, 25.0, 26.0, 25.0, 24.0, 24.0, 24.0, 23.0, 23.0, 22.0, 19.0, 18.0, 20.0, 19.0, 18.0, 19.0, 19.0, 16.0, 16.0, 15.0, 12.0, 12.0, 11.0, 11.0, 12.0, 11.0, 10.0, 10.0, 9.0, 8.0, 8.0, 8.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 7.0, 6.0, 5.0, 6.0, 5.0, 4.0, 4.0, 3.0, 2.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 2.0, 3.0, 3.0, 3.0, 4.0, 6.0, 6.0, 8.0, 8.0, 9.0, 13.0, 11.0, 10.0, 12.0, 16.0, 17.0, 20.0, 26.0, 31.0, 36.0, 38.0, 37.0, 36.0, 35.0, 36.0, 43.0, 45.0, 48.0, 45.0, 47.0, 57.0, 55.0, 54.0, 51.0, 49.0, 52.0, 52.0, 53.0, 53.0, 55.0, 59.0, 61.0, 64.0, 61.0, 59.0, 57.0, 53.0, 56.0, 56.0, 55.0, 56.0, 54.0, 52.0, 52.0, 54.0, 53.0, 52.0, 52.0, 51.0, 51.0, 49.0, 52.0, 50.0, 49.0, 48.0, 47.0, 48.0, 46.0, 48.0, 48.0, 50.0, 50.0, 47.0, 53.0, 53.0, 50.0, 50.0, 55.0, 54.0, 54.0, 54.0, 54.0, 53.0, 53.0, 54.0, 56.0, 54.0, 55.0, 53.0, 55.0, 53.0, 53.0, 54.0, 52.0, 52.0, 55.0, 53.0, 54.0, 54.0, 52.0, 51.0, 52.0, 53.0, 53.0, 54.0, 55.0, 56.0, 57.0, 55.0, 55.0, 54.0, 52.0, 53.0, 54.0, 56.0, 57.0, 56.0, 62.0, 63.0, 64.0, 65.0, 64.0, 59.0, 60.0, 62.0, 65.0, 63.0, 64.0, 65.0, 64.0, 57.0, 62.0, 61.0, 58.0, 58.0, 54.0, 54.0, 51.0, 53.0, 52.0, 53.0, 55.0, 54.0, 54.0, 54.0, 59.0, 58.0, 61.0, 61.0, 60.0, 61.0, 57.0, 55.0, 55.0, 53.0, 54.0, 53.0, 53.0, 54.0, 51.0, 52.0, 50.0, 49.0, 48.0, 49.0, 49.0, 50.0, 46.0, 47.0, 47.0, 44.0, 43.0, 44.0, 42.0, 42.0, 40.0, 39.0, 37.0, 37.0, 33.0, 34.0, 30.0, 30.0, 30.0, 30.0, 33.0, 31.0, 26.0, 25.0, 25.0, 26.0, 28.0, 29.0, 28.0, 26.0, 28.0, 27.0, 26.0, 24.0, 22.0, 23.0, 22.0, 21.0, 23.0, 22.0, 20.0, 22.0, 22.0, 20.0, 18.0, 17.0, 17.0, 18.0, 19.0, 17.0, 19.0, 18.0, 17.0, 14.0, 13.0, 11.0, 11.0, 9.0, 8.0, 10.0, 9.0, 9.0, 8.0, 7.0, 6.0, 6.0, 7.0, 6.0, 6.0, 6.0, 4.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 4.0, 4.0, 5.0, 7.0, 10.0, 8.0, 10.0, 9.0, 10.0, 11.0, 12.0, 14.0, 17.0, 18.0, 22.0, 26.0, 30.0, 34.0, 34.0, 34.0, 35.0, 34.0, 39.0, 44.0, 39.0, 41.0, 44.0, 46.0, 51.0, 51.0, 50.0, 48.0, 49.0, 51.0, 53.0, 55.0, 55.0, 57.0, 59.0, 57.0, 62.0, 60.0, 59.0, 60.0, 60.0, 59.0, 57.0, 54.0, 55.0, 53.0, 54.0, 53.0, 53.0, 53.0, 54.0, 52.0, 51.0, 53.0, 49.0, 49.0, 47.0, 49.0, 50.0, 50.0, 50.0, 52.0, 52.0, 49.0, 49.0, 51.0, 49.0, 50.0, 52.0, 52.0, 53.0, 57.0, 58.0, 64.0, 59.0, 58.0, 57.0, 56.0, 57.0, 62.0, 60.0, 57.0, 57.0, 55.0, 57.0, 57.0, 57.0, 56.0, 55.0, 54.0, 53.0, 54.0, 53.0, 52.0, 52.0, 55.0, 52.0, 52.0, 53.0, 53.0, 53.0, 51.0, 49.0, 52.0, 49.0, 49.0, 52.0, 56.0, 60.0, 54.0, 58.0, 58.0, 59.0, 60.0, 57.0, 56.0, 56.0, 57.0, 52.0, 55.0, 53.0, 54.0, 53.0, 50.0, 53.0, 51.0, 50.0, 50.0, 48.0, 52.0, 50.0, 49.0, 52.0, 49.0, 48.0, 52.0, 50.0, 57.0, 57.0, 59.0, 61.0, 60.0, 61.0, 62.0, 59.0, 57.0, 57.0, 55.0, 55.0, 54.0, 56.0, 54.0, 53.0, 51.0, 53.0, 53.0, 54.0, 55.0, 55.0, 55.0, 54.0, 55.0, 53.0, 51.0, 51.0, 54.0, 52.0, 49.0, 49.0, 50.0, 47.0, 41.0, 41.0, 39.0, 41.0, 36.0, 39.0, 38.0, 35.0, 35.0, 30.0, 31.0, 31.0, 33.0, 30.0, 32.0, 32.0, 33.0, 28.0, 30.0, 30.0, 29.0, 27.0, 26.0, 31.0, 30.0, 29.0, 26.0, 28.0, 24.0, 24.0, 22.0, 21.0, 22.0, 21.0, 19.0, 17.0, 15.0, 15.0, 16.0, 15.0, 13.0, 12.0, 10.0, 11.0, 10.0, 10.0, 9.0, 7.0, 7.0, 9.0, 9.0, 9.0, 8.0, 9.0, 8.0, 7.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 5.0, 6.0, 8.0, 8.0, 8.0, 9.0, 9.0, 9.0, 11.0, 13.0, 16.0, 16.0, 24.0, 31.0, 34.0, 34.0, 30.0, 32.0, 32.0, 33.0, 37.0, 43.0, 40.0, 44.0, 48.0, 47.0, 48.0, 48.0, 46.0, 45.0, 49.0, 48.0, 51.0, 51.0, 56.0, 58.0, 56.0, 56.0, 58.0, 58.0, 58.0, 56.0, 56.0, 56.0, 55.0, 54.0, 54.0, 55.0, 52.0, 53.0, 54.0, 53.0, 51.0, 51.0, 50.0, 51.0, 48.0, 44.0, 44.0, 44.0, 44.0, 44.0, 48.0, 49.0, 50.0, 49.0, 50.0, 51.0, 50.0, 49.0, 49.0, 48.0, 49.0, 51.0, 58.0, 66.0, 67.0, 55.0, 56.0, 61.0, 63.0, 61.0, 60.0, 60.0, 58.0, 58.0, 56.0, 55.0, 57.0, 56.0, 57.0, 55.0, 55.0, 56.0, 55.0, 54.0, 58.0, 59.0, 63.0, 57.0, 55.0, 57.0, 59.0, 57.0, 58.0, 56.0, 59.0, 57.0, 58.0, 58.0, 59.0, 60.0, 61.0, 60.0, 62.0, 64.0, 60.0, 62.0, 59.0, 57.0, 58.0, 55.0, 55.0, 56.0, 56.0, 53.0, 53.0, 56.0, 55.0, 50.0, 51.0, 51.0, 49.0, 51.0, 51.0, 51.0, 52.0, 49.0, 54.0, 58.0, 61.0, 60.0, 63.0, 63.0, 62.0, 61.0, 60.0, 59.0, 53.0, 52.0, 54.0, 55.0, 53.0, 54.0, 54.0, 53.0, 49.0, 50.0, 48.0, 50.0, 52.0, 57.0, 51.0, 50.0, 49.0, 46.0, 45.0, 41.0, 38.0, 38.0, 39.0, 35.0, 34.0, 32.0, 33.0, 31.0, 26.0, 26.0, 29.0, 28.0, 26.0, 26.0, 26.0, 25.0, 27.0, 24.0, 27.0, 26.0, 28.0, 27.0, 26.0, 28.0, 27.0, 23.0, 22.0, 24.0, 24.0, 25.0, 24.0, 23.0, 23.0, 22.0, 21.0, 20.0, 19.0, 20.0, 18.0, 16.0, 17.0, 19.0, 18.0, 17.0, 15.0, 14.0, 14.0, 12.0, 11.0, 11.0, 11.0, 10.0, 10.0, 9.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 7.0, 6.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0, 5.0, 4.0, 6.0, 7.0, 8.0, 8.0, 11.0, 13.0, 13.0, 14.0, 12.0, 13.0, 12.0, 15.0, 16.0, 19.0, 23.0, 27.0, 29.0, 28.0, 29.0, 29.0, 34.0, 31.0, 39.0, 38.0, 35.0, 40.0, 42.0, 46.0, 43.0, 47.0, 47.0, 47.0, 45.0, 46.0, 46.0, 47.0, 47.0, 50.0, 53.0, 53.0, 56.0, 52.0, 51.0, 49.0, 50.0, 52.0, 51.0, 51.0, 48.0, 46.0, 46.0, 46.0, 46.0, 44.0, 42.0, 40.0, 39.0, 41.0, 39.0, 40.0, 41.0, 40.0, 41.0, 41.0, 45.0, 44.0, 44.0, 44.0, 44.0, 46.0, 46.0, 48.0, 48.0, 50.0, 50.0, 54.0, 59.0, 61.0, 59.0, 54.0, 53.0, 56.0, 57.0, 54.0, 53.0, 54.0, 52.0, 52.0, 51.0, 50.0, 51.0, 49.0, 54.0, 53.0, 53.0, 51.0, 50.0, 52.0, 53.0, 53.0, 54.0, 58.0, 58.0, 55.0, 53.0, 54.0, 53.0, 51.0, 51.0, 55.0, 52.0, 55.0, 55.0, 54.0, 55.0, 56.0, 52.0, 53.0, 52.0, 51.0, 52.0, 50.0, 49.0, 51.0, 49.0, 53.0, 53.0, 51.0, 54.0, 51.0, 50.0, 49.0, 50.0, 50.0, 48.0, 47.0, 45.0, 47.0, 49.0, 48.0, 50.0, 53.0, 52.0, 54.0, 52.0, 51.0, 57.0, 55.0, 57.0, 58.0, 59.0, 58.0, 59.0, 60.0, 59.0, 55.0, 51.0, 48.0, 49.0, 46.0, 47.0, 50.0, 43.0, 44.0, 43.0, 46.0, 47.0, 43.0, 45.0, 42.0, 43.0, 41.0, 43.0, 43.0, 40.0, 36.0, 40.0, 36.0, 31.0, 34.0, 36.0, 30.0, 32.0, 35.0, 34.0, 34.0, 36.0, 33.0, 28.0, 29.0, 27.0, 24.0, 22.0, 24.0, 22.0, 21.0, 22.0, 23.0, 21.0, 20.0, 21.0, 21.0, 21.0, 20.0, 21.0, 19.0, 21.0, 19.0, 20.0, 21.0, 19.0, 18.0, 21.0, 20.0, 16.0, 15.0, 15.0, 15.0, 13.0, 12.0, 12.0, 12.0, 11.0, 11.0, 11.0, 11.0, 11.0, 10.0, 10.0, 10.0, 10.0, 10.0, 8.0, 8.0, 9.0, 8.0, 7.0, 6.0, 7.0, 6.0, 6.0, 7.0, 6.0, 6.0, 5.0, 6.0, 5.0, 6.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 5.0, 6.0, 5.0, 8.0, 8.0, 7.0, 9.0, 10.0, 11.0, 10.0, 8.0, 8.0, 9.0, 9.0, 9.0, 11.0, 11.0, 13.0, 13.0, 16.0, 15.0, 15.0, 14.0, 13.0, 17.0, 17.0, 18.0, 18.0, 19.0, 21.0, 23.0, 27.0, 24.0, 24.0, 23.0, 24.0, 29.0, 31.0, 27.0, 28.0, 31.0, 32.0, 36.0, 36.0, 34.0, 31.0, 32.0, 31.0, 30.0, 31.0, 33.0, 31.0, 31.0, 31.0, 32.0, 32.0, 31.0, 31.0, 30.0, 31.0, 31.0, 34.0, 35.0, 35.0, 34.0, 36.0, 39.0, 42.0, 43.0, 43.0, 41.0, 40.0, 42.0, 44.0, 44.0, 42.0, 40.0, 41.0, 42.0, 38.0, 37.0, 39.0, 39.0, 38.0, 38.0, 42.0, 43.0, 41.0, 44.0, 45.0, 45.0, 43.0, 42.0, 40.0, 39.0, 36.0, 36.0, 38.0, 37.0, 37.0, 36.0, 40.0, 41.0, 41.0, 41.0, 40.0, 37.0, 36.0, 38.0, 40.0, 40.0, 39.0, 40.0, 38.0, 36.0, 38.0, 37.0, 36.0, 35.0, 37.0, 35.0, 35.0, 36.0, 41.0, 43.0, 40.0, 38.0, 43.0, 46.0, 46.0, 48.0, 49.0, 49.0, 50.0, 46.0, 46.0, 45.0, 45.0, 47.0, 49.0, 44.0, 44.0, 41.0, 40.0, 41.0, 39.0, 35.0, 38.0, 38.0, 35.0, 35.0, 37.0, 39.0, 38.0, 36.0, 38.0, 42.0, 40.0, 40.0, 41.0, 41.0, 35.0, 38.0, 36.0, 34.0, 37.0, 32.0, 32.0, 31.0, 29.0, 27.0, 27.0, 25.0, 25.0, 24.0, 26.0, 30.0, 26.0, 24.0, 23.0, 23.0, 23.0, 24.0, 22.0, 21.0, 18.0, 18.0, 20.0, 21.0, 18.0, 17.0, 16.0, 16.0, 16.0, 19.0, 20.0, 17.0, 17.0, 18.0, 18.0, 16.0, 17.0, 16.0, 17.0, 16.0, 13.0, 14.0, 14.0, 12.0, 13.0, 12.0, 13.0, 13.0, 13.0, 12.0, 11.0, 12.0, 10.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 9.0, 8.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 5.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 7.0, 8.0, 8.0, 9.0, 12.0, 11.0, 10.0, 10.0, 11.0, 13.0, 13.0, 13.0, 11.0, 12.0, 13.0, 15.0, 15.0, 16.0, 12.0, 13.0, 16.0, 16.0, 19.0, 18.0, 19.0, 19.0, 21.0, 24.0, 23.0, 20.0, 21.0, 20.0, 22.0, 22.0, 27.0, 25.0, 25.0, 25.0, 30.0, 28.0, 26.0, 29.0, 31.0, 30.0, 30.0, 30.0, 30.0, 30.0, 29.0, 29.0, 32.0, 33.0, 31.0, 32.0, 32.0, 33.0, 35.0, 34.0, 36.0, 36.0, 37.0, 35.0, 37.0, 39.0, 41.0, 37.0, 34.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 37.0, 36.0, 35.0, 38.0, 37.0, 37.0, 36.0, 38.0, 38.0, 37.0, 33.0, 33.0, 35.0, 37.0, 39.0, 41.0, 39.0, 40.0, 40.0, 40.0, 41.0, 42.0, 42.0, 40.0, 37.0, 39.0, 37.0, 39.0, 35.0, 37.0, 37.0, 38.0, 36.0, 35.0, 35.0, 34.0, 40.0, 39.0, 38.0, 37.0, 39.0, 38.0, 36.0, 41.0, 39.0, 38.0, 40.0, 38.0, 35.0, 35.0, 31.0, 33.0, 32.0, 29.0, 33.0, 30.0, 32.0, 32.0, 33.0, 30.0, 32.0, 31.0, 31.0, 29.0, 27.0, 26.0, 25.0, 25.0, 24.0, 22.0, 22.0, 23.0, 24.0, 24.0, 24.0, 22.0, 22.0, 21.0, 20.0, 20.0, 18.0, 19.0, 16.0, 20.0, 17.0, 18.0, 19.0, 17.0, 18.0, 17.0, 18.0, 19.0, 17.0, 15.0, 14.0, 14.0, 14.0, 14.0, 12.0, 12.0, 12.0, 14.0, 14.0, 14.0, 14.0, 13.0, 13.0, 13.0, 13.0, 12.0, 12.0, 12.0, 13.0, 12.0, 11.0, 11.0, 10.0, 8.0, 9.0, 9.0, 7.0, 6.0, 6.0, 6.0, 5.0, 5.0, 6.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 5.0, 6.0, 7.0, 8.0, 8.0, 9.0, 9.0, 10.0, 11.0, 13.0, 15.0, 18.0, 19.0, 20.0, 28.0, 30.0, 29.0, 28.0, 30.0, 30.0, 37.0, 35.0, 34.0, 36.0, 40.0, 41.0, 41.0, 44.0, 45.0, 44.0, 45.0, 46.0, 48.0, 49.0, 49.0, 47.0, 49.0, 46.0, 48.0, 49.0, 48.0, 48.0, 50.0, 50.0, 49.0, 45.0, 45.0, 47.0, 46.0, 47.0, 45.0, 45.0, 45.0, 42.0, 41.0, 43.0, 39.0, 40.0, 42.0, 37.0, 36.0, 37.0, 36.0, 33.0, 33.0, 32.0, 31.0, 37.0, 30.0, 31.0, 34.0, 39.0, 39.0, 46.0, 48.0, 45.0, 47.0, 43.0, 42.0, 46.0, 48.0, 46.0, 48.0, 49.0, 49.0, 49.0, 48.0, 49.0, 49.0, 49.0, 49.0, 49.0, 49.0, 49.0, 49.0, 43.0, 47.0, 50.0, 48.0, 49.0, 49.0, 49.0, 51.0, 48.0, 48.0, 48.0, 48.0, 48.0, 49.0, 51.0, 53.0, 54.0, 55.0, 53.0, 54.0, 52.0, 52.0, 52.0, 51.0, 55.0, 54.0, 53.0, 53.0, 53.0, 53.0, 50.0, 50.0, 52.0, 50.0, 47.0, 47.0, 49.0, 51.0, 48.0, 49.0, 50.0, 51.0, 50.0, 51.0, 53.0, 52.0, 52.0, 53.0, 55.0, 54.0, 51.0, 48.0, 46.0, 44.0, 42.0, 44.0, 47.0, 45.0, 48.0, 48.0, 46.0, 47.0, 45.0, 47.0, 47.0, 47.0, 45.0, 44.0, 44.0, 43.0, 42.0, 44.0, 40.0, 38.0, 40.0, 43.0, 40.0, 35.0, 36.0, 32.0, 29.0, 25.0, 28.0, 28.0, 27.0, 30.0, 27.0, 24.0, 20.0, 21.0, 25.0, 25.0, 31.0, 29.0, 32.0, 29.0, 33.0, 32.0, 35.0, 33.0, 32.0, 31.0, 30.0, 30.0, 31.0, 30.0, 24.0, 20.0, 18.0, 16.0, 14.0, 15.0, 14.0, 13.0, 12.0, 13.0, 13.0, 13.0, 13.0, 13.0, 12.0, 10.0, 11.0, 10.0, 9.0, 8.0, 7.0, 7.0, 7.0, 6.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 4.0, 5.0, 7.0, 7.0, 8.0, 8.0, 9.0, 11.0, 12.0, 13.0, 14.0, 18.0, 20.0, 23.0, 27.0, 29.0, 30.0, 35.0, 32.0, 33.0, 37.0, 39.0, 37.0, 40.0, 39.0, 43.0, 45.0, 46.0, 47.0, 49.0, 47.0, 48.0, 51.0, 55.0, 56.0, 56.0, 55.0, 58.0, 60.0, 58.0, 59.0, 61.0, 60.0, 56.0, 55.0, 55.0, 55.0, 54.0, 53.0, 55.0, 53.0, 53.0, 53.0, 49.0, 45.0, 45.0, 46.0, 48.0, 46.0, 44.0, 47.0, 45.0, 46.0, 42.0, 44.0, 48.0, 45.0, 48.0, 48.0, 49.0, 47.0, 47.0, 45.0, 51.0, 51.0, 50.0, 50.0, 52.0, 51.0, 50.0, 50.0, 52.0, 54.0, 54.0, 54.0, 56.0, 58.0, 56.0, 54.0, 55.0, 56.0, 54.0, 53.0, 50.0, 52.0, 51.0, 49.0, 49.0, 52.0, 52.0, 55.0, 55.0, 51.0, 55.0, 53.0, 51.0, 51.0, 51.0, 51.0, 52.0, 52.0, 53.0, 55.0, 56.0, 51.0, 54.0, 55.0, 58.0, 55.0, 55.0, 56.0, 57.0, 55.0, 55.0, 56.0, 54.0, 54.0, 53.0, 53.0, 54.0, 50.0, 50.0, 51.0, 49.0, 48.0, 48.0, 49.0, 51.0, 53.0, 52.0, 52.0, 55.0, 54.0, 54.0, 55.0, 61.0, 64.0, 61.0, 57.0, 57.0, 53.0, 52.0, 51.0, 50.0, 50.0, 51.0, 51.0, 50.0, 48.0, 48.0, 49.0, 48.0, 48.0, 48.0, 47.0, 48.0, 47.0, 48.0, 44.0, 45.0, 44.0, 40.0, 35.0, 39.0, 33.0, 32.0, 31.0, 29.0, 30.0, 28.0, 27.0, 27.0, 26.0, 25.0, 26.0, 27.0, 25.0, 25.0, 26.0, 26.0, 25.0, 27.0, 31.0, 30.0, 28.0, 26.0, 25.0, 23.0, 20.0, 21.0, 22.0, 19.0, 16.0, 14.0, 13.0, 16.0, 18.0, 17.0, 15.0, 14.0, 12.0, 12.0, 12.0, 10.0, 9.0, 8.0, 9.0, 8.0, 8.0, 8.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 7.0, 7.0, 7.0, 6.0, 5.0, 5.0, 5.0, 5.0, 8.0, 6.0, 7.0, 7.0, 8.0, 10.0, 10.0, 10.0, 11.0, 12.0, 14.0, 15.0, 18.0, 16.0, 20.0, 26.0, 32.0, 33.0, 31.0, 30.0, 30.0, 32.0, 32.0, 33.0, 37.0, 32.0, 41.0, 45.0, 44.0, 47.0, 48.0, 47.0, 45.0, 49.0, 51.0, 56.0, 56.0, 55.0, 55.0, 60.0, 60.0, 61.0, 59.0, 54.0, 55.0, 54.0, 52.0, 51.0, 51.0, 48.0, 46.0, 48.0, 48.0, 50.0, 50.0, 49.0, 49.0, 46.0, 48.0, 48.0, 48.0, 48.0, 47.0, 48.0, 48.0, 47.0, 45.0, 44.0, 47.0, 46.0, 44.0, 45.0, 45.0, 47.0, 48.0, 51.0, 57.0, 54.0, 54.0, 50.0, 52.0, 53.0, 52.0, 52.0, 51.0, 51.0, 49.0, 49.0, 49.0, 51.0, 51.0, 47.0, 50.0, 51.0, 50.0, 49.0, 50.0, 52.0, 53.0, 50.0, 53.0, 51.0, 52.0, 53.0, 56.0, 55.0, 55.0, 53.0, 54.0, 48.0, 52.0, 52.0, 53.0, 53.0, 56.0, 54.0, 55.0, 55.0, 54.0, 55.0, 55.0, 52.0, 53.0, 52.0, 51.0, 50.0, 50.0, 48.0, 48.0, 47.0, 46.0, 44.0, 42.0, 43.0, 43.0, 45.0, 47.0, 49.0, 49.0, 51.0, 51.0, 53.0, 53.0, 55.0, 54.0, 52.0, 53.0, 51.0, 48.0, 49.0, 48.0, 46.0, 49.0, 48.0, 47.0, 45.0, 50.0, 49.0, 51.0, 50.0, 51.0, 48.0, 47.0, 47.0, 43.0, 40.0, 40.0, 41.0, 42.0, 39.0, 38.0, 39.0, 39.0, 33.0, 33.0, 33.0, 28.0, 26.0, 30.0, 30.0, 30.0, 28.0, 27.0, 23.0, 24.0, 24.0, 24.0, 25.0, 27.0, 26.0, 27.0, 25.0, 28.0, 27.0, 29.0, 27.0, 27.0, 22.0, 23.0, 25.0, 22.0, 21.0, 25.0, 23.0, 19.0, 19.0, 17.0, 17.0, 15.0, 14.0, 12.0, 16.0, 14.0, 12.0, 13.0, 12.0, 11.0, 10.0, 10.0, 9.0, 9.0, 9.0, 7.0, 8.0, 8.0, 8.0, 6.0, 7.0, 7.0, 6.0, 5.0, 6.0, 5.0, 4.0, 5.0, 5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 5.0, 7.0, 7.0, 8.0, 9.0, 9.0, 10.0, 9.0, 12.0, 13.0, 18.0, 24.0, 26.0, 37.0, 40.0, 39.0, 43.0, 48.0, 45.0, 49.0, 48.0, 47.0, 45.0, 45.0, 49.0, 51.0, 54.0, 52.0, 53.0, 46.0, 47.0, 50.0, 48.0, 49.0, 51.0, 54.0, 59.0, 56.0, 59.0, 60.0, 58.0, 55.0, 57.0, 54.0, 53.0, 54.0, 54.0, 52.0, 52.0, 49.0, 48.0, 47.0, 46.0, 49.0, 48.0, 46.0, 50.0, 45.0, 46.0, 46.0, 47.0, 45.0, 50.0, 49.0, 49.0, 46.0, 45.0, 48.0, 49.0, 51.0, 47.0, 49.0, 50.0, 50.0, 50.0, 51.0, 52.0, 54.0, 53.0, 53.0, 54.0, 53.0, 52.0, 53.0, 52.0, 49.0, 50.0, 50.0, 50.0, 48.0, 47.0, 48.0, 49.0, 50.0, 47.0, 50.0, 48.0, 47.0, 48.0, 49.0, 49.0, 47.0, 47.0, 49.0, 49.0, 48.0, 50.0, 49.0, 50.0, 51.0, 51.0, 53.0, 51.0, 50.0, 52.0, 52.0, 50.0, 52.0, 50.0, 51.0, 53.0, 48.0, 50.0, 50.0, 48.0, 47.0, 46.0, 49.0, 48.0, 45.0, 43.0, 46.0, 45.0, 44.0, 41.0, 44.0, 45.0, 45.0, 45.0, 52.0, 46.0, 45.0, 50.0, 49.0, 49.0, 52.0, 51.0, 50.0, 48.0, 47.0, 48.0, 47.0, 48.0, 51.0, 52.0, 46.0, 41.0, 46.0, 42.0, 45.0, 43.0, 41.0, 38.0, 38.0, 39.0, 38.0, 36.0, 37.0, 36.0, 34.0, 31.0, 29.0, 45.0, 40.0, 33.0, 30.0, 33.0, 31.0, 26.0, 29.0, 29.0, 30.0, 28.0, 28.0, 28.0, 27.0, 26.0, 28.0, 28.0, 28.0, 27.0, 28.0, 26.0, 22.0, 24.0, 22.0, 20.0, 20.0, 20.0, 22.0, 22.0, 19.0, 17.0, 16.0, 15.0, 15.0, 15.0, 15.0, 15.0, 16.0, 13.0, 14.0, 14.0, 13.0, 12.0, 13.0, 13.0, 12.0, 12.0, 11.0, 11.0];

      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 288; i++) {
          data1.push(random(75));
          data2.push(random(70));
        }

      plotEcharts(data1,data2);
  },
  data() {
    return {
      checked: true,
      activeIndex: '1',
      activeIndex2: '1',
      maps: null,
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
      value: ''
    };
  },

}
var date = new Date(2016,5,1,0,0);//注意月份是0-11，1月为0，12月为11
var t = null;
t = setTimeout(timeChange,1000);//開始运行
function timeChange()
{
  clearTimeout(t);//清除定时器
  var min=date.getMinutes();
  date.setMinutes(min+30);
  var h=date.getHours();//获取时
  var m=date.getMinutes();//获取分
  if(m < 10)
  {
    document.getElementById("currentTimePre").innerHTML =  "Date Time: 2016-6-1 "+h+":0"+m;
  }
  else
  {
    document.getElementById("currentTimePre").innerHTML =  "Date Time: 2016-6-1 "+h+":"+m;
  }
  t = setTimeout(timeChange,1000); //设定定时器，循环运行
  if(h == 24)
  {
    clearTimeout(t);
  }

}
</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
@import url('https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css');
@import url('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css');
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
#map{
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 95%;
  z-index: 0;
}
.el-slider{
  padding: 20px;
  margin: 0;
  position: fixed;
  z-index: 1000;
  width: 500px;
  bottom: 50px;
  left: 600px;
}
.Evaluation{
  position: fixed;
  left:35px;
  top:500px;
  font-size: 22px;
  font-weight: 700;
  line-height: 50px;

  padding:10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px black;
  width: 11%;
}

.font{
  font-size: 35px;
  color: #409EFF;
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

.charts{
  border-radius: 10px;
  box-shadow: 0 2px 5px black;
  margin-left: 40px;
  margin-bottom: 23px;
}

.left-button {
  width: 200px;
  position: fixed;
  margin-bottom: 20px;
  margin-left: 5px;
  bottom: 0px;
  z-index: 1000;
  opacity: 0.9;
}

</style>
