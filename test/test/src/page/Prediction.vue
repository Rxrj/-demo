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
          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Run</el-button>
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
        <div style="left:1410px;top:100px;width:500px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee" id="gridInfo">[Click the Grid]</div>
<!--        <pre id='info'></pre>-->
<!--        <div class= "heatmapIcon" id="heatmapIcon" style="visibility: hidden">-->
<!--          <div style="background-color:rgb(255,255,255);bottom:200px;right:300px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(255,208,166);bottom:200px;right:250px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(255,170,127);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(240,64,64);bottom:200px;right:150px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(181,10,9);bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--        </div>-->
<!--        <div class="heatmapIcon2" id="heatmapIcon2" style="visibility: hidden">-->
<!--          <div style="background-color:rgba(33,102,172,0);bottom:200px;right:350px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(209,229,240);bottom:200px;right:300px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(103,169,207);bottom:200px;right:250px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(253,219,199);bottom:200px;right:200px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(239,138,98);bottom:200px;right:150px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--          <div style="background-color:rgb(178,24,43);bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 20px"></div>-->
<!--        </div>-->
        <div id="heatmapIcon" style="visibility: hidden">
          <div style="background-color:#00000000;bottom:350px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px;border: solid 1px rgb(255,208,166)">
            <div style="right:-40px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;"><5</div>
          </div>
          <div style="background-color:rgb(255,208,166);bottom:300px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-60px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">5-10</div>
          </div>
          <div style="background-color:rgb(255,170,127);bottom:250px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">10-30</div>
          </div>
          <div style="background-color:rgb(255,112,78);bottom:200px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">30-50</div>
          </div>
          <div style="background-color:rgb(240,64,64);bottom:150px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">50-70</div>
          </div>
          <div style="background-color:rgb(181,10,9);bottom:100px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">>70</div>
          </div>
        </div>
        <div id="heatmapIcon2" style="visibility: hidden">
          <div style="background-color:#00000000;bottom:350px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px;border: solid 1px rgb(209,229,240)">
            <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;"><12</div>
          </div>
          <div style="background-color:rgb(209,229,240);bottom:300px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">12-24</div>
          </div>
          <div style="background-color:rgb(103,169,207);bottom:250px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">24-36</div>
          </div>
          <div style="background-color:rgb(253,219,199);bottom:200px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">36-48</div>
          </div>
          <div style="background-color:rgb(239,138,98);bottom:150px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-70px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">48-60</div>
          </div>
          <div style="background-color:rgb(178,24,43);bottom:100px;right:650px;font-size:22px;font-weight:700;position: absolute;width: 50px;height: 22px;border-radius: 5px">
            <div style="right:-55px;font-size:20px;font-weight:700;position: absolute;color: #eeeeee;">>60</div>
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
import {getMouseLngLat} from "../assets/js/utils";
import {getCurrentGridIndex} from "../assets/js/utils";
import {plotEcharts} from "../assets/js/utils";
const mapboxgl = require('mapbox-gl');

var grid_data;
var grid_center_coordinates = new Array();
var current_region_id;
var intersection_data = new Array();
var current_intersection_index;
var current_intersection_id;


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
      document.getElementById("heatmapIcon2").style.visibility="hidden";
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
      document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="visible";
    },

    initGridData:function (){
      //单个区域的数据

      let url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_data.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      let request = new XMLHttpRequest();
      request.timeout = 3000;
      request.ontimeout = function (event) {
        alert("Loading Grid Data Time out！");
      }
      request.open("get", url);/*设置请求方法与路径*/
      request.send("");/*不发送数据到服务器*/
      request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
          grid_data = JSON.parse(request.responseText);
          console.log("loading grid data...")
          for(let i=0;i<grid_data.length;i++) {
            grid_center_coordinates[i] = grid_data[i].geometry.coordinates;
          }
        }
      };
    },

    initIntersectionData:function (){
      //单个区域的数据
      // window.onload = function () {
      // intersection数据
      //   let url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_data_3day.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        let url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_data_3day.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        let request = new XMLHttpRequest();
        request.timeout = 3000;
        request.ontimeout = function (event) {
          alert("Loading Intersection Data Time out！");
        }
        request.open("get", url);/*设置请求方法与路径*/
        request.send("");/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
          if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            intersection_data = JSON.parse(request.responseText);
            console.log("loading intersection data...")
          }
        };
      // };
    },

    getIntersectionData:function (index){
      let url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_data/intersection_"+String(index)+".geojson";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      let request = new XMLHttpRequest();
      request.timeout = 3000;
      request.ontimeout = function (event) {
        alert("Loading Intersection Data Time out！");
      }
      request.open("get", url);/*设置请求方法与路径*/
      request.send("");/*不发送数据到服务器*/
      request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
          intersection_data[0] = JSON.parse(request.responseText);
          console.log("loading intersection data...")
          console.log(intersection_data[0])
          console.log(intersection_data[0].id)
          console.log(intersection_data[0].properties)
        }
      };
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
      map1.on('click', (e)=>{

        current_region_id = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);

        current_intersection_index = getCurrentGridIndex(e.lngLat.toArray(), grid_data[current_region_id].intersections.coordinates);
        current_intersection_id = grid_data[current_region_id].intersections.ids[current_intersection_index];
        // console.log(document.getElementsByName('el-date-picker placeholder'));
        document.getElementById('gridInfo').innerHTML = getMouseLngLat(e) + " grid id: " + current_region_id + " intersection id: " + current_intersection_id;

        if (typeof intersection_data[0] == "undefined"){
          console.log("loading...");
          this.getIntersectionData(current_intersection_id);

        }
        console.log(current_intersection_id);
        console.log(intersection_data.length);
        console.log(intersection_data[0]);
        console.log(intersection_data);
        let data1 = grid_data[current_region_id].properties.groundTruth.slice(0,288);
        let data2 = grid_data[current_region_id].properties.pred.slice(0,288);
        var data3 = intersection_data[0].properties.groundTruth;
        var data4 = intersection_data[0].properties.pred;
        plotEcharts(data1,data2,data3,data4);
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
        // if (grid_center_coordinates.length == 0){
        //   this.$options.methods.initData();
        // }
        current_region_id = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
        // console.log(current_region_index);

        current_intersection_index = getCurrentGridIndex(e.lngLat.toArray(), grid_data[current_region_id].intersections.coordinates);
        current_intersection_id = grid_data[current_region_id].intersections.ids[current_intersection_index];

        console.log(current_region_id)
        console.log(current_intersection_index)
        console.log(current_intersection_id)
        console.log(grid_data[current_region_id].intersections.ids)
        document.getElementById('gridInfo').innerHTML = getMouseLngLat(e) + " grid id: " + current_region_id + " intersection id: "+ current_intersection_id;

        let data1 = grid_data[current_region_id].properties.groundTruth.slice(0,288);
        let data2 = grid_data[current_region_id].properties.pred.slice(0,288);
        // var data3 = intersection_data[current_intersection_id].properties.groundTruth;
        //var data4 = intersection_data[current_intersection_id].properties.pred;
        plotEcharts(data1,data2,data1,data2);
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

  },

  mounted() {
      this.initGridData();

      // this.initIntersectionData();

      this.initMap();

      let data1 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 3.0, 2.0, 3.0, 1.0, 4.0, 1.0, 3.0, 6.0, 3.0, 1.0, 4.0, 1.0, 2.0, 0.0, 1.0, 2.0, 0.0, 3.0, 1.0, 0.0, 2.0, 1.0, 4.0, 0.0, 1.0, 1.0, 3.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0, 3.0, 2.0, 0.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 0.0, 3.0, 1.0, 4.0, 5.0, 4.0, 6.0, 8.0, 8.0, 9.0, 16.0, 13.0, 13.0, 12.0, 18.0, 19.0, 25.0, 17.0, 24.0, 29.0, 32.0, 35.0, 51.0, 47.0, 40.0, 44.0, 35.0, 51.0, 57.0, 43.0, 54.0, 64.0, 56.0, 58.0, 59.0, 63.0, 67.0, 65.0, 65.0, 84.0, 77.0, 59.0, 60.0, 59.0, 58.0, 56.0, 45.0, 65.0, 59.0, 50.0, 49.0, 38.0, 52.0, 52.0, 57.0, 60.0, 48.0, 50.0, 47.0, 42.0, 50.0, 44.0, 40.0, 48.0, 56.0, 57.0, 58.0, 52.0, 49.0, 55.0, 59.0, 50.0, 47.0, 54.0, 54.0, 41.0, 46.0, 59.0, 54.0, 53.0, 61.0, 50.0, 69.0, 51.0, 57.0, 63.0, 59.0, 64.0, 55.0, 66.0, 53.0, 54.0, 68.0, 54.0, 47.0, 51.0, 63.0, 41.0, 46.0, 51.0, 61.0, 38.0, 57.0, 62.0, 54.0, 48.0, 52.0, 58.0, 40.0, 51.0, 60.0, 58.0, 49.0, 53.0, 66.0, 56.0, 63.0, 72.0, 62.0, 59.0, 75.0, 74.0, 68.0, 50.0, 60.0, 67.0, 63.0, 60.0, 81.0, 68.0, 63.0, 60.0, 71.0, 66.0, 66.0, 62.0, 46.0, 40.0, 40.0, 61.0, 47.0, 47.0, 63.0, 51.0, 55.0, 50.0, 50.0, 74.0, 72.0, 66.0, 73.0, 69.0, 62.0, 64.0, 61.0, 58.0, 66.0, 56.0, 78.0, 54.0, 56.0, 59.0, 51.0, 62.0, 78.0, 57.0, 68.0, 75.0, 54.0, 55.0, 41.0, 50.0, 59.0, 50.0, 46.0, 53.0, 49.0, 33.0, 49.0, 36.0, 44.0, 39.0, 46.0, 43.0, 45.0, 34.0, 36.0, 34.0, 32.0, 35.0, 39.0, 27.0, 30.0, 23.0, 25.0, 32.0, 28.0, 31.0, 33.0, 21.0, 22.0, 24.0, 25.0, 23.0, 20.0, 20.0, 19.0, 29.0, 30.0, 16.0, 23.0, 23.0, 17.0, 16.0, 9.0, 15.0, 14.0, 18.0, 17.0, 11.0, 13.0, 10.0, 7.0, 6.0, 14.0, 10.0, 5.0, 2.0];
      let data2 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 6.0, 8.0, 8.0, 9.0, 12.0, 12.0, 14.0, 14.0, 16.0, 19.0, 22.0, 22.0, 27.0, 34.0, 37.0, 40.0, 42.0, 44.0, 40.0, 44.0, 45.0, 54.0, 54.0, 52.0, 58.0, 62.0, 63.0, 63.0, 63.0, 62.0, 65.0, 65.0, 64.0, 69.0, 70.0, 65.0, 64.0, 63.0, 63.0, 62.0, 56.0, 56.0, 56.0, 56.0, 54.0, 51.0, 50.0, 50.0, 49.0, 52.0, 52.0, 54.0, 52.0, 49.0, 48.0, 49.0, 48.0, 47.0, 48.0, 48.0, 50.0, 51.0, 52.0, 55.0, 53.0, 52.0, 50.0, 53.0, 54.0, 51.0, 51.0, 52.0, 53.0, 53.0, 55.0, 57.0, 62.0, 58.0, 57.0, 58.0, 61.0, 59.0, 60.0, 57.0, 59.0, 60.0, 58.0, 58.0, 57.0, 55.0, 54.0, 53.0, 53.0, 53.0, 53.0, 50.0, 52.0, 53.0, 55.0, 54.0, 54.0, 53.0, 55.0, 53.0, 53.0, 54.0, 52.0, 55.0, 56.0, 59.0, 59.0, 61.0, 64.0, 63.0, 64.0, 65.0, 66.0, 64.0, 61.0, 63.0, 64.0, 61.0, 63.0, 64.0, 64.0, 60.0, 58.0, 59.0, 59.0, 58.0, 55.0, 52.0, 52.0, 54.0, 52.0, 51.0, 55.0, 52.0, 57.0, 54.0, 54.0, 61.0, 65.0, 65.0, 67.0, 68.0, 66.0, 66.0, 62.0, 63.0, 64.0, 61.0, 67.0, 62.0, 60.0, 60.0, 57.0, 59.0, 63.0, 60.0, 61.0, 63.0, 59.0, 56.0, 52.0, 52.0, 55.0, 52.0, 52.0, 50.0, 49.0, 48.0, 44.0, 44.0, 42.0, 39.0, 41.0, 42.0, 41.0, 39.0, 39.0, 37.0, 37.0, 34.0, 35.0, 33.0, 32.0, 30.0, 30.0, 30.0, 31.0, 30.0, 32.0, 28.0, 24.0, 26.0, 25.0, 24.0, 23.0, 22.0, 23.0, 24.0, 23.0, 21.0, 19.0, 19.0, 17.0, 17.0, 15.0, 14.0, 15.0, 14.0, 14.0, 12.0, 11.0, 11.0, 10.0, 9.0, 9.0, 8.0, 7.0];

      let data3 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 4.0, 5.0, 3.0, 4.0, 4.0, 5.0, 5.0, 3.0, 3.0, 0.0, 3.0, 1.0, 1.0, 4.0, 0.0, 0.0, 0.0, 2.0, 1.0, 4.0, 6.0, 4.0, 8.0, 9.0, 4.0, 12.0, 4.0, 1.0, 1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 4.0, 2.0, 9.0, 4.0, 2.0, 5.0, 2.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 1.0, 1.0, 1.0, 1.0, 4.0, 0.0, 2.0, 3.0, 0.0, 0.0, 2.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 3.0, 5.0, 5.0, 6.0, 3.0, 2.0, 4.0, 1.0, 4.0, 6.0, 3.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 7.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0, 3.0, 5.0, 5.0, 3.0, 4.0, 5.0, 1.0, 5.0, 4.0, 4.0, 7.0, 6.0, 4.0, 5.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 5.0, 7.0, 10.0, 5.0, 5.0, 2.0, 0.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 5.0, 3.0, 4.0, 3.0, 3.0, 4.0, 5.0, 2.0, 4.0, 4.0, 5.0, 4.0, 5.0, 1.0, 1.0, 4.0, 1.0, 5.0, 1.0, 2.0, 0.0, 5.0, 2.0, 2.0, 5.0, 4.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 4.0, 4.0, 11.0, 5.0, 4.0, 4.0, 6.0, 6.0, 0.0, 5.0, 3.0, 1.0, 3.0, 0.0, 2.0, 3.0, 2.0, 3.0, 2.0, 1.0, 4.0, 2.0, 1.0, 2.0, 1.0, 0.0, 2.0, 2.0, 4.0, 2.0, 0.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 6.0, 6.0, 6.0, 2.0, 7.0, 7.0, 4.0, 3.0, 5.0, 3.0, 2.0, 2.0, 4.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 4.0, 2.0, 3.0, 5.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 2.0, 4.0, 1.0, 7.0, 8.0, 5.0, 1.0, 3.0, 6.0, 3.0, 6.0, 3.0, 7.0, 3.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 2.0, 2.0, 5.0, 5.0, 3.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 3.0, 4.0, 7.0, 8.0, 7.0, 8.0, 4.0, 2.0, 7.0, 5.0, 1.0, 3.0, 4.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 1.0, 1.0, 4.0, 4.0, 4.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 6.0, 3.0, 3.0, 4.0, 3.0, 3.0, 6.0, 4.0, 4.0, 2.0, 2.0, 4.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 7.0, 4.0, 4.0, 6.0, 2.0, 1.0, 2.0, 2.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 3.0, 4.0, 1.0, 2.0, 4.0, 3.0, 0.0, 1.0, 8.0, 4.0, 5.0, 1.0, 6.0, 6.0, 7.0, 2.0, 2.0, 1.0, 4.0, 1.0, 1.0, 2.0, 3.0, 4.0, 4.0, 6.0, 4.0, 3.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 0.0, 4.0, 2.0, 3.0, 0.0, 6.0, 2.0, 5.0, 1.0, 2.0, 2.0, 3.0, 2.0, 6.0, 4.0, 1.0, 3.0, 0.0, 1.0, 7.0, 2.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 4.0, 1.0, 6.0, 5.0, 3.0, 0.0, 5.0, 0.0, 5.0, 1.0, 2.0, 1.0, 1.0, 0.0, 3.0, 3.0, 2.0, 1.0, 6.0, 1.0, 2.0, 2.0, 4.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 6.0, 5.0, 8.0, 2.0, 7.0, 6.0, 3.0, 4.0, 6.0, 1.0, 4.0, 2.0, 3.0, 3.0, 4.0, 4.0, 2.0, 3.0, 6.0, 1.0, 3.0, 2.0, 4.0, 4.0, 5.0, 3.0, 2.0, 3.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 3.0, 0.0, 5.0, 6.0, 7.0, 2.0, 6.0, 4.0, 4.0, 0.0, 1.0, 2.0, 2.0, 1.0, 4.0, 0.0, 4.0, 3.0, 1.0, 2.0, 0.0, 5.0, 1.0, 8.0, 8.0, 3.0, 1.0, 3.0, 5.0, 3.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.0, 1.0, 1.0, 4.0, 3.0, 7.0, 9.0, 2.0, 3.0, 7.0, 4.0, 2.0, 4.0, 2.0, 3.0, 3.0, 1.0, 4.0, 0.0, 3.0, 2.0, 1.0, 4.0, 2.0, 4.0, 3.0, 4.0, 3.0, 1.0, 3.0, 3.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 2.0, 6.0, 6.0, 2.0, 3.0, 3.0, 0.0, 3.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 4.0, 2.0, 4.0, 6.0, 4.0, 6.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 2.0, 2.0, 5.0, 5.0, 1.0, 4.0, 3.0, 6.0, 1.0, 4.0, 5.0, 4.0, 4.0, 3.0, 5.0, 1.0, 1.0, 1.0, 4.0, 2.0, 3.0, 4.0, 0.0, 4.0, 3.0, 6.0, 2.0, 2.0, 0.0, 2.0, 2.0, 3.0, 5.0, 0.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 3.0, 1.0, 4.0, 5.0, 1.0, 3.0, 6.0, 1.0, 5.0, 1.0, 3.0, 0.0, 4.0, 1.0, 1.0, 1.0, 4.0, 4.0, 7.0, 3.0, 5.0, 2.0, 3.0, 2.0, 2.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 2.0, 5.0, 2.0, 4.0, 2.0, 3.0, 3.0, 0.0, 2.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 2.0, 3.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 6.0, 4.0, 5.0, 4.0, 1.0, 3.0, 3.0, 6.0, 2.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 3.0, 1.0, 4.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 3.0, 2.0, 2.0, 2.0, 0.0, 5.0, 0.0, 3.0, 2.0, 5.0, 1.0, 1.0, 3.0, 2.0, 1.0, 4.0, 1.0, 3.0, 4.0, 4.0, 0.0, 1.0, 4.0, 4.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 3.0, 1.0, 6.0, 2.0, 5.0, 6.0, 4.0, 0.0, 2.0, 6.0, 3.0, 4.0, 7.0, 0.0, 2.0, 0.0, 2.0, 1.0, 3.0, 2.0, 3.0, 0.0, 4.0, 2.0, 4.0, 2.0, 3.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 3.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 4.0, 5.0, 2.0, 3.0, 4.0, 3.0, 5.0, 4.0, 5.0, 3.0, 2.0, 3.0, 1.0, 2.0, 2.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 2.0, 4.0, 4.0, 2.0, 2.0, 1.0, 5.0, 4.0, 0.0, 0.0, 3.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 5.0, 4.0, 4.0, 1.0, 2.0, 3.0, 6.0, 5.0, 6.0, 1.0, 3.0, 2.0, 3.0, 1.0, 4.0, 3.0, 2.0, 4.0, 6.0, 6.0, 3.0, 3.0, 5.0, 4.0, 3.0, 3.0, 2.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 2.0, 3.0, 2.0, 1.0, 1.0, 5.0, 5.0, 3.0, 1.0, 7.0, 6.0, 5.0, 5.0, 3.0, 6.0, 2.0, 3.0, 1.0, 4.0, 2.0, 2.0, 3.0, 1.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0, 5.0, 1.0, 9.0, 1.0, 6.0, 2.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 3.0, 3.0, 0.0, 3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.0, 3.0, 3.0, 0.0, 3.0, 1.0, 9.0, 4.0, 5.0, 2.0, 1.0, 2.0, 6.0, 3.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.0, 3.0, 2.0, 1.0, 5.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 4.0, 2.0, 2.0, 0.0, 4.0, 5.0, 5.0, 5.0, 4.0, 1.0, 3.0, 5.0, 1.0, 2.0, 2.0, 1.0, 3.0, 3.0, 0.0, 1.0, 1.0, 2.0, 4.0, 1.0, 5.0, 4.0, 3.0, 2.0, 1.0, 5.0, 3.0, 2.0, 3.0, 0.0, 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 2.0, 4.0, 4.0, 2.0, 3.0, 1.0, 4.0, 1.0, 3.0, 2.0, 2.0, 1.0, 3.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 4.0, 1.0, 2.0, 1.0, 3.0, 2.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0];
      let data4 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 4.0, 5.0, 3.0, 4.0, 4.0, 5.0, 5.0, 3.0, 3.0, 0.0, 3.0, 1.0, 1.0, 4.0, 0.0, 0.0, 0.0, 2.0, 1.0, 4.0, 6.0, 4.0, 8.0, 9.0, 4.0, 13.0, 4.0, 1.0, 1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 4.0, 2.0, 9.0, 4.0, 2.0, 5.0, 2.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 1.0, 4.0, 0.0, 2.0, 3.0, 0.0, 0.0, 2.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 3.0, 5.0, 5.0, 6.0, 3.0, 2.0, 4.0, 1.0, 4.0, 6.0, 3.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 7.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 0.0, 2.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0, 3.0, 5.0, 5.0, 3.0, 4.0, 5.0, 1.0, 5.0, 4.0, 4.0, 7.0, 6.0, 4.0, 5.0, 2.0, 1.0, 3.0, 2.0, 5.0, 2.0, 5.0, 7.0, 10.0, 5.0, 5.0, 2.0, 0.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 5.0, 3.0, 4.0, 3.0, 3.0, 4.0, 5.0, 2.0, 4.0, 4.0, 5.0, 4.0, 5.0, 1.0, 1.0, 4.0, 1.0, 5.0, 1.0, 2.0, 0.0, 5.0, 2.0, 2.0, 5.0, 4.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 4.0, 4.0, 11.0, 5.0, 4.0, 4.0, 6.0, 6.0, 0.0, 5.0, 3.0, 1.0, 3.0, 0.0, 2.0, 3.0, 2.0, 3.0, 2.0, 1.0, 4.0, 2.0, 1.0, 2.0, 1.0, 0.0, 2.0, 2.0, 4.0, 2.0, 0.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 6.0, 6.0, 6.0, 2.0, 7.0, 8.0, 4.0, 3.0, 5.0, 3.0, 2.0, 2.0, 4.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 4.0, 2.0, 3.0, 5.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 2.0, 4.0, 1.0, 7.0, 8.0, 5.0, 1.0, 3.0, 6.0, 3.0, 6.0, 3.0, 7.0, 3.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 2.0, 2.0, 5.0, 5.0, 3.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 3.0, 4.0, 7.0, 8.0, 7.0, 8.0, 4.0, 2.0, 7.0, 5.0, 1.0, 3.0, 4.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 1.0, 1.0, 4.0, 4.0, 4.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 6.0, 3.0, 3.0, 4.0, 3.0, 3.0, 6.0, 4.0, 4.0, 2.0, 2.0, 4.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 7.0, 4.0, 4.0, 6.0, 2.0, 1.0, 2.0, 2.0, 0.0, 1.0, 1.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 3.0, 4.0, 1.0, 2.0, 4.0, 3.0, 0.0, 1.0, 8.0, 4.0, 5.0, 1.0, 6.0, 6.0, 7.0, 2.0, 2.0, 1.0, 4.0, 1.0, 1.0, 2.0, 3.0, 4.0, 4.0, 6.0, 4.0, 3.0, 4.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 0.0, 4.0, 2.0, 3.0, 0.0, 6.0, 2.0, 5.0, 1.0, 2.0, 2.0, 3.0, 2.0, 6.0, 4.0, 1.0, 3.0, 0.0, 1.0, 7.0, 2.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 4.0, 1.0, 6.0, 5.0, 3.0, 0.0, 5.0, 0.0, 5.0, 1.0, 2.0, 1.0, 1.0, 0.0, 3.0, 3.0, 2.0, 1.0, 6.0, 1.0, 2.0, 2.0, 4.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 6.0, 5.0, 8.0, 2.0, 7.0, 6.0, 3.0, 4.0, 6.0, 1.0, 4.0, 2.0, 3.0, 3.0, 4.0, 4.0, 2.0, 3.0, 6.0, 1.0, 3.0, 2.0, 4.0, 4.0, 5.0, 3.0, 2.0, 3.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 3.0, 0.0, 5.0, 6.0, 7.0, 2.0, 6.0, 4.0, 4.0, 0.0, 1.0, 2.0, 2.0, 1.0, 4.0, 0.0, 4.0, 3.0, 1.0, 2.0, 0.0, 5.0, 1.0, 8.0, 8.0, 3.0, 1.0, 3.0, 5.0, 3.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.0, 1.0, 1.0, 4.0, 3.0, 7.0, 9.0, 2.0, 3.0, 6.0, 4.0, 2.0, 4.0, 2.0, 3.0, 3.0, 1.0, 4.0, 0.0, 3.0, 2.0, 1.0, 4.0, 2.0, 4.0, 3.0, 4.0, 3.0, 1.0, 3.0, 3.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 2.0, 6.0, 6.0, 2.0, 3.0, 3.0, 0.0, 3.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 4.0, 2.0, 4.0, 6.0, 4.0, 6.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 2.0, 2.0, 5.0, 5.0, 1.0, 4.0, 3.0, 6.0, 1.0, 4.0, 4.0, 4.0, 4.0, 3.0, 5.0, 1.0, 1.0, 1.0, 4.0, 2.0, 3.0, 4.0, 0.0, 4.0, 3.0, 5.0, 2.0, 2.0, 0.0, 2.0, 2.0, 3.0, 5.0, 0.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 3.0, 1.0, 4.0, 5.0, 1.0, 3.0, 6.0, 1.0, 5.0, 1.0, 3.0, 0.0, 4.0, 1.0, 1.0, 1.0, 4.0, 4.0, 7.0, 3.0, 5.0, 2.0, 3.0, 2.0, 2.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 2.0, 5.0, 2.0, 4.0, 2.0, 3.0, 3.0, 0.0, 2.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 2.0, 3.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 6.0, 4.0, 5.0, 4.0, 1.0, 3.0, 3.0, 6.0, 2.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 3.0, 1.0, 4.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 3.0, 2.0, 2.0, 2.0, 0.0, 5.0, 0.0, 3.0, 2.0, 5.0, 1.0, 1.0, 3.0, 2.0, 1.0, 4.0, 1.0, 3.0, 4.0, 4.0, 0.0, 1.0, 4.0, 4.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 3.0, 1.0, 6.0, 2.0, 5.0, 6.0, 4.0, 0.0, 2.0, 6.0, 3.0, 4.0, 7.0, 0.0, 2.0, 0.0, 2.0, 0.0, 3.0, 2.0, 3.0, 0.0, 4.0, 2.0, 4.0, 2.0, 3.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 3.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 4.0, 5.0, 2.0, 3.0, 4.0, 3.0, 5.0, 4.0, 5.0, 3.0, 2.0, 3.0, 1.0, 2.0, 2.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 2.0, 4.0, 4.0, 2.0, 2.0, 1.0, 5.0, 4.0, 0.0, 0.0, 3.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 4.0, 4.0, 1.0, 2.0, 3.0, 6.0, 4.0, 6.0, 1.0, 3.0, 2.0, 3.0, 1.0, 4.0, 3.0, 2.0, 4.0, 6.0, 6.0, 3.0, 2.0, 5.0, 4.0, 3.0, 3.0, 2.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 2.0, 3.0, 2.0, 1.0, 1.0, 5.0, 5.0, 3.0, 1.0, 7.0, 6.0, 5.0, 5.0, 3.0, 6.0, 2.0, 3.0, 1.0, 4.0, 2.0, 2.0, 3.0, 1.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0, 5.0, 1.0, 9.0, 1.0, 6.0, 2.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 3.0, 3.0, 0.0, 3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 2.0, 2.0, 4.0, 3.0, 3.0, 3.0, 4.0, 6.0, 3.0, 2.0, 1.0, 2.0, 2.0, 2.0, 3.0, 0.0, 2.0, 1.0, 2.0, 2.0, 3.0, 1.0, 2.0, 0.0, 2.0, 3.0, 3.0, 3.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 5.0, 6.0, 4.0, 3.0, 2.0, 0.0, 3.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 3.0, 3.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 0.0, 1.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 3.0, 3.0, 5.0, 2.0, 3.0, 3.0, 6.0, 4.0, 4.0, 3.0, 0.0, 0.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 3.0, 3.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0];

      plotEcharts(data1,data2,data3,data4);
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
