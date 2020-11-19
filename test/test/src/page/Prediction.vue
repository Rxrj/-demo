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
          <div>
            <el-checkbox v-model="checkedP" style="padding-top: 20px;margin-left: 0px;font-size: 20px;font-weight: 700" @change="handleChange"><div>Partition Visible</div></el-checkbox>
            <br>
          </div>
          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee" @click="runPrediction">Run</el-button>
<!--          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee" @click="stopPrediction">STOP</el-button>-->
<!--          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee" @click="resetPrediction">RESET</el-button>-->
<!--          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee" @click="runPrediction">CONTINUE</el-button>-->
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
                  <span style="color: #eeeeee;font-size: 20px" class="item-title">Option</span>
                </template>
                <el-menu-item style="font-size: 20px;padding-left: 40px" index="1-1" @click="HeatmapG">Choropleth Map</el-menu-item>
                <el-menu-item style="font-size: 20px;padding-left: 35px" index="1-2" @click="HeatmapI">Heat Map</el-menu-item>
                <el-menu-item style="font-size: 20px;padding-left: 15px" index="1-3" @click="showComparison" id="showComparison" >Prediction Comparison</el-menu-item>
                <el-dialog
                  title="Prediction Comparison"
                  :visible.sync="dialogVisible"
                  width="60%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="24"><div style="height: 500px;" id="chartsComparison"></div></el-col>
                  </el-row>
                </el-dialog>
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

              <el-slider
                v-model="valueSlider"
                max="24"
                :step="1"
                :marks="marksSlider"
                @change="getValueSlider"
                show-stops>
              </el-slider>
<!--              <p style="left:80px;top:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee" id="groud truth data">Ground Truth</p>-->
              <div class="Evaluation" style="text-align: right">
                <div style="color: #eeeeee; font-weight: bold;text-align:center">MAPE(%)<br/><div class="font">16.466</div></div>

                <div style="color: #eeeeee; font-weight: bold;text-align:center">MAE<br/><div class="font">1.788</div></div>
                <div style="color: #eeeeee; font-weight: bold;text-align:center">RMSE<br/><div class="font">3.563</div></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;margin: 0;padding: 0">
            <div id="map2" style="border-radius: 10px;box-shadow: 0 2px 5px black;height: 95%;margin: 0;padding: 0">

              <p style="color: #eeeeee;position:absolute;left:550px;top:20px;font-size: 22px;font-weight: 700">Predicted Request</p>

            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;margin: 0;padding: 0">
            <div class="charts" id="charts1" style="width: auto;height: 46%"></div>
            <div class="charts" id="charts2" style="width: auto;height: 46%"></div>
          </el-col>
        </el-row>
        <div style="left:600px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee" id="currentTime" v-if="showTimeGrid">Date Time: 2016-06-01 00:00</div>
        <div style="left:600px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee" id="currentTime2" v-if="showTimeIntersection">Date Time: 2016-06-01 00:00</div>
        <div style="left:1410px;top:100px;width:500px;font-size:18px;font-weight:700;position: absolute;color: #eeeeee" id="gridInfo">lng: -73.959 lat: 40.779 grid id: 0 intersection id: 3677</div>

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
import axios from "axios";
import '@/assets/css/all.css'
import {getMouseLngLat} from "../assets/js/utils";
import {getCurrentGridIndex} from "../assets/js/utils";
import {plotEcharts,plotEchartsGrid,plotEchartsIntersection} from "../assets/js/utils";
// import {plotEchartsComparison} from "../assets/js/utils";
const mapboxgl = require('mapbox-gl');

var grid_data;
var grid_center_coordinates = new Array();
var current_region_id = 0;

var intersection_data;
var current_intersection_index;
var current_intersection_id;

var dayOfMonth = 1;
var runClick = false;
var changeValueSlider = false;

export default {
  name: "Prediction",
  components: {Header},
  methods: {
    getValueSlider(){
      changeValueSlider = true;
      // this.$watch('valueSlider', function (newValue, oldValue){
        // if(newValue - oldValue > 1 || newValue - oldValue < -1){
        //   console.log("修改前值为: " + oldValue + "，修改后值为: " + newValue);
        //   changeValueSlider = true;
        // }else{
        //   changeValueSlider = false;
        // }
      // })
      //alert(this.valueSlider);
    },

    runPrediction() {
      alert("Start Run");
      if (typeof this.valueTime != "object") {
        this.valueTime = new Date(this.valueTime);
      }
      console.log(this.valueTime.format("yyyy-MM-dd"));
      const that = this;//注意先获取this，计时器内部的this不是能控制valueSlider的this
      runClick = true;
      if (runClick == true) {
        if (this.showTimeGrid) {
          var date = this.valueTime;
          date.setHours(0);
          date.setMinutes(0);
          var index = (dayOfMonth - 1) * 288;
          var timer = window.setInterval(function () {
            if (index < dayOfMonth * 288) {
              index++;
              map1.getSource('pickup_grid').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_groundTruth/grid_" + String(index) + ".geojson");
              map2.getSource('pickup_grid_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_pred/grid_" + String(index) + ".geojson");

              map1.getSource('pickup_intersection').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_" + String(Math.floor(index/6)) + ".geojson");
              map2.getSource('pickup_intersection_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_pred/intersection_" + String(Math.floor(index/6)) + ".geojson");

              var min = date.getMinutes();
              date.setMinutes(min + 5);
              var h = date.getHours();//获取时
              if (changeValueSlider == false)
                that.valueSlider = h;//时间条会随着时间移动
              if (changeValueSlider == true) {
                index = (that.valueSlider) * 12;
                date.setHours(that.valueSlider, 0);
                changeValueSlider = false;
              }


              charts1.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,//这行不能省
                dataIndex: index
              });
              charts1.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,//这行不能省
                dataIndex: index
              });

              charts2.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,//这行不能省
                dataIndex: Math.floor(index / 6),
                // dataIndex:index
              });
              charts2.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,//这行不能省
                dataIndex: Math.floor(index / 6),
                // dataIndex: index
              });

              document.getElementById("currentTime").innerHTML = "Date Time: " + date.format("yyyy-MM-dd hh:mm");
            } else {
              //移除添加的source和layer
              map1.removeLayer('pickup_grid');
              map1.removeSource('pickup_grid');
              map2.removeLayer('pickup_grid_pred');
              map2.removeSource('pickup_grid_pred');
              map1.removeLayer('pickup_intersection');
              map1.removeSource('pickup_intersection');
              map2.removeLayer('pickup_intersection_pred');
              map2.removeSource('pickup_intersection_pred');
              window.clearInterval(timer);
            }
          }, 500);
        }
      }
    },


    handleChange() {
      var check = this.checkedP;
      if (!check) {
        map1.setLayoutProperty('regions', 'visibility', 'none');
        map2.setLayoutProperty('regions', 'visibility', 'none');
      } else {
        map1.setLayoutProperty('regions', 'visibility', 'visible');
        map2.setLayoutProperty('regions', 'visibility', 'visible');
      }
    },
    HeatmapG() {
      // isShowGridData = true;
      this.showTimeGrid = true;
      this.showTimeIntersection = false;
      map1.setPitch(0);
      map1.setBearing(0);
      // map.setZoom(11);
      map1.setLayoutProperty('pickup_intersection', 'visibility', 'none');
      map1.setLayoutProperty('pickup_grid', 'visibility', 'visible');

      map2.setPitch(0);
      map2.setBearing(0);
      // map.setZoom(11);
      map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'none');
      map2.setLayoutProperty('pickup_grid_pred', 'visibility', 'visible');
      document.getElementById("heatmapIcon").style.visibility = "visible";
      document.getElementById("heatmapIcon2").style.visibility = "hidden";
    },
    HeatmapI() {
      // isShowGridData = false;
      this.showTimeGrid = true;
      this.showTimeIntersection = false,
      map1.setPitch(0);
      map1.setBearing(0);
      // map.setZoom(11);
      map1.setLayoutProperty('pickup_intersection', 'visibility', 'visible');
      map1.setLayoutProperty('pickup_grid', 'visibility', 'none');

      map2.setPitch(0);
      map2.setBearing(0);
      // map.setZoom(11);
      map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'visible');
      map2.setLayoutProperty('pickup_grid_pred', 'visibility', 'none');
      // document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility = "hidden";
      document.getElementById("heatmapIcon2").style.visibility = "visible";
    },

    getGridData: function () {
      //单个区域的数据
      // let url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_data.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      // let request = new XMLHttpRequest();
      // request.timeout = 3000;
      // request.ontimeout = function (event) {
      //   alert("Loading Grid Data Time out！");
      // }
      // request.open("get", url);/*设置请求方法与路径*/
      // request.send("");/*不发送数据到服务器*/
      // request.onload = function () {/*XHR对象获取到返回信息后执行*/
      //   if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
      //     grid_data = JSON.parse(request.responseText);
      //     console.log("loading grid data...")
      //     for(let i=0;i<grid_data.length;i++) {
      //       grid_center_coordinates[i] = grid_data[i].geometry.coordinates;
      //     }
      //   }
      // };
      axios.get('../../static/grid_data2.geojson').then(response => {
        // console.log(response.data);
        grid_data = response.data;
        for (let i = 0; i < grid_data.length; i++) {
          grid_center_coordinates[i] = grid_data[i].geometry.coordinates;
        }
      }, response => {
        console.log("error");
      });
    },

    getIntersectionData() {
      axios.get('../../static/intersection_data.geojson').then(response => {
        // console.log(response.data);
        intersection_data = response.data;
      }, response => {
        console.log("error");
      });
    },

    initMap: function () {
      document.getElementById("heatmapIcon").style.visibility = "visible";
      mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
      window.map1 = new mapboxgl.Map({
        container: 'map1', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.96, 40.785], // 初始坐标系
        zoom: 11.3,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      // map1.addControl(new mapboxgl.FullscreenControl(), "top-left");
      // map1.addControl(new mapboxgl.NavigationControl(), "top-left");
      //
      map1.on('click', (e) => {
        if (typeof this.valueTime != "object") {
          this.valueTime = new Date(this.valueTime);
        }
        dayOfMonth = this.valueTime.getDate();
        current_region_id = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
        current_intersection_index = getCurrentGridIndex(e.lngLat.toArray(), grid_data[current_region_id].intersections.coordinates);
        current_intersection_id = grid_data[current_region_id].intersections.ids[current_intersection_index];
        document.getElementById('gridInfo').innerHTML = getMouseLngLat(e) + " grid id: " + current_region_id + " intersection id: " + current_intersection_id;

        let data1 = grid_data[current_region_id].properties.groundTruth.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
        let data2 = grid_data[current_region_id].properties.pred.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
        let data3 = intersection_data[current_intersection_id].properties.groundTruth.slice(48 * (dayOfMonth - 1), dayOfMonth * 48);
        let data4 = intersection_data[current_intersection_id].properties.pred.slice(48 * (dayOfMonth - 1), dayOfMonth * 48);
        // let data3 = grid_data[current_region_id].properties.dcrnn_pred.slice(288*(dayOfMonth-1),dayOfMonth*288);
        // let data4 = grid_data[current_region_id].properties.stgcn_pred.slice(288*(dayOfMonth-1),dayOfMonth*288);
        // plotEcharts(data1,data2,data3,data4);
        plotEchartsGrid(data1, data2);
        plotEchartsIntersection(data3, data4);
        // plotEchartsComparison(data1,data2,data3,data4);
      });


      map1.on('load', function () {

        map1.addSource("regions", {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
        });
        map1.addLayer({
          "id": "regions",
          "type": "line",           /* fill类型一般用来表示一个面，一般较大 */
          "source": "regions",
          "paint": {
            "line-color": 'rgba(255,255,255,1)',
            "line-width": 1
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



        map1.setLayoutProperty('pickup_grid', 'visibility', 'visible');
        map1.setLayoutProperty('pickup_intersection', 'visibility', 'none');

      });


      window.map2 = new mapboxgl.Map({
        container: 'map2', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.96, 40.785], // 初始坐标系
        zoom: 11.3,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      map2.on('click', (e) => {

        if (typeof this.valueTime != "object") {
          this.valueTime = new Date(this.valueTime);
        }
        dayOfMonth = this.valueTime.getDate();
        current_region_id = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
        current_intersection_index = getCurrentGridIndex(e.lngLat.toArray(), grid_data[current_region_id].intersections.coordinates);
        current_intersection_id = grid_data[current_region_id].intersections.ids[current_intersection_index];

        document.getElementById('gridInfo').innerHTML = getMouseLngLat(e) + " grid id: " + current_region_id + " intersection id: " + current_intersection_id;

        let data1 = grid_data[current_region_id].properties.groundTruth.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
        let data2 = grid_data[current_region_id].properties.pred.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
        let data3 = intersection_data[current_intersection_id].properties.groundTruth.slice(48 * (dayOfMonth - 1), dayOfMonth * 48);;
        let data4 = intersection_data[current_intersection_id].properties.pred.slice(48 * (dayOfMonth - 1), dayOfMonth * 48);;
        // let data3 = grid_data[current_region_id].properties.dcrnn_pred.slice(288*(dayOfMonth-1),dayOfMonth*288);
        // let data4 = grid_data[current_region_id].properties.stgcn_pred.slice(288*(dayOfMonth-1),dayOfMonth*288);
        // plotEcharts(data1,data2,data3,data4);
        plotEchartsGrid(data1, data2);
        plotEchartsIntersection(data3, data4);
        // plotEchartsComparison(data1,data2,data3,data4);
      });

      map2.on('load', function () {

        map2.addSource("regions", {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
        });

        map2.addLayer({
          "id": "regions",
          "type": "line",           /* fill类型一般用来表示一个面，一般较大 */
          "source": "regions",
          "paint": {
            "line-color": 'rgba(255,255,255,1)',
            "line-width": 1
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

        map2.setLayoutProperty('pickup_grid_pred', 'visibility', 'visible');
        map2.setLayoutProperty('pickup_intersection_pred', 'visibility', 'none');
      });
    },

    showComparison() {
      // if(current_region_id == undefined)
      //   alert("Please click a grid to get the comparison!");
      // else{
      this.dialogVisible = true;
      let data1 = grid_data[current_region_id].properties.groundTruth.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
      let data2 = grid_data[current_region_id].properties.pred.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
      let data3 = grid_data[current_region_id].properties.dcrnn_pred.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
      let data4 = grid_data[current_region_id].properties.stgcn_pred.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
      this.plotEchartsComparison(data1, data2, data3, data4,current_region_id);
      // }
    },
    plotEchartsComparison(data1, data2, data3, data4,grid_id) {
      this.$nextTick(() => {
        // 指定图表的配置项和数据
        let charts = echarts.init(document.getElementById('chartsComparison'));
        var timeData = ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'];

        var option = {
          title: {
            text: 'Prediction Comparison in Grid '+String(grid_id),
            left: 'center',
            textStyle: {color: '#252525', fontSize: 16,},
            top: 5
          },
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['Ground Truth', 'Our ST-GCSL', 'DCRNN', 'STGCN'],
            // left: 20,
            top: 30,
            textStyle: {color: '#252525', fontSize: 14,},
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              show: true,
              realtime: true,
              start: 5,
              end: 95,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
              end: 50,
            },
            {
              type: 'inside',
              realtime: true,
              xAxisIndex: [0],
              start: 5,
              end: 95,
            },
            {
              type: 'inside',
              realtime: true,
              yAxisIndex: [0],
              start: 0,
              end: 50,
            }
          ],
          xAxis:
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: true,fontWeight:700},
              axisLabel: {color: '#252525', fontSize: 14,fontWeight:700},
              data: timeData
            },
          yAxis: {
            name: 'Request',
            nameTextStyle: {
              color: '#252525',
              fontSize: 14,
              fontWeight:700
            },
            type: 'value',
            max: 180,
            axisLine: {fontWeight:700},
            axisLabel: {color: '#252525', fontSize: 14,fontWeight:700},
          },
          series: [
            {
              name: 'Ground Truth',
              type: 'line',
              symbolSize: 4,
              data: data1,
              color: ['#FF0000']
            },
            {
              name: 'Our ST-GCSL',
              type: 'line',
              symbolSize: 4,
              data: data2,
              color: ['#007cbf']

            },
            {
              name: 'DCRNN',
              type: 'line',
              symbolSize: 4,
              data: data3,
              color: ['#fdd845']
            },
            {
              name: 'STGCN',
              type: 'line',
              symbolSize: 4,
              data: data4,
              color: ['#ff9063']
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        charts.setOption(option);
      })
    },
  },
  watch:{
    valueSlider:function (val){
      this.valueSlider = val;
    }
  },

  mounted() {
      this.getGridData();

      this.getIntersectionData();

      this.initMap();


      let data1 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 3.0, 2.0, 3.0, 1.0, 4.0, 1.0, 3.0, 6.0, 3.0, 1.0, 4.0, 1.0, 2.0, 0.0, 1.0, 2.0, 0.0, 3.0, 1.0, 0.0, 2.0, 1.0, 4.0, 0.0, 1.0, 1.0, 3.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0, 3.0, 2.0, 0.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 0.0, 3.0, 1.0, 4.0, 5.0, 4.0, 6.0, 8.0, 8.0, 9.0, 16.0, 13.0, 13.0, 12.0, 18.0, 19.0, 25.0, 17.0, 24.0, 29.0, 32.0, 35.0, 51.0, 47.0, 40.0, 44.0, 35.0, 51.0, 57.0, 43.0, 54.0, 64.0, 56.0, 58.0, 59.0, 63.0, 67.0, 65.0, 65.0, 84.0, 77.0, 59.0, 60.0, 59.0, 58.0, 56.0, 45.0, 65.0, 59.0, 50.0, 49.0, 38.0, 52.0, 52.0, 57.0, 60.0, 48.0, 50.0, 47.0, 42.0, 50.0, 44.0, 40.0, 48.0, 56.0, 57.0, 58.0, 52.0, 49.0, 55.0, 59.0, 50.0, 47.0, 54.0, 54.0, 41.0, 46.0, 59.0, 54.0, 53.0, 61.0, 50.0, 69.0, 51.0, 57.0, 63.0, 59.0, 64.0, 55.0, 66.0, 53.0, 54.0, 68.0, 54.0, 47.0, 51.0, 63.0, 41.0, 46.0, 51.0, 61.0, 38.0, 57.0, 62.0, 54.0, 48.0, 52.0, 58.0, 40.0, 51.0, 60.0, 58.0, 49.0, 53.0, 66.0, 56.0, 63.0, 72.0, 62.0, 59.0, 75.0, 74.0, 68.0, 50.0, 60.0, 67.0, 63.0, 60.0, 81.0, 68.0, 63.0, 60.0, 71.0, 66.0, 66.0, 62.0, 46.0, 40.0, 40.0, 61.0, 47.0, 47.0, 63.0, 51.0, 55.0, 50.0, 50.0, 74.0, 72.0, 66.0, 73.0, 69.0, 62.0, 64.0, 61.0, 58.0, 66.0, 56.0, 78.0, 54.0, 56.0, 59.0, 51.0, 62.0, 78.0, 57.0, 68.0, 75.0, 54.0, 55.0, 41.0, 50.0, 59.0, 50.0, 46.0, 53.0, 49.0, 33.0, 49.0, 36.0, 44.0, 39.0, 46.0, 43.0, 45.0, 34.0, 36.0, 34.0, 32.0, 35.0, 39.0, 27.0, 30.0, 23.0, 25.0, 32.0, 28.0, 31.0, 33.0, 21.0, 22.0, 24.0, 25.0, 23.0, 20.0, 20.0, 19.0, 29.0, 30.0, 16.0, 23.0, 23.0, 17.0, 16.0, 9.0, 15.0, 14.0, 18.0, 17.0, 11.0, 13.0, 10.0, 7.0, 6.0, 14.0, 10.0, 5.0, 2.0];
      let data2 = [5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 6.0, 8.0, 8.0, 9.0, 12.0, 12.0, 14.0, 14.0, 16.0, 19.0, 22.0, 22.0, 27.0, 34.0, 37.0, 40.0, 42.0, 44.0, 40.0, 44.0, 45.0, 54.0, 54.0, 52.0, 58.0, 62.0, 63.0, 63.0, 63.0, 62.0, 65.0, 65.0, 64.0, 69.0, 70.0, 65.0, 64.0, 63.0, 63.0, 62.0, 56.0, 56.0, 56.0, 56.0, 54.0, 51.0, 50.0, 50.0, 49.0, 52.0, 52.0, 54.0, 52.0, 49.0, 48.0, 49.0, 48.0, 47.0, 48.0, 48.0, 50.0, 51.0, 52.0, 55.0, 53.0, 52.0, 50.0, 53.0, 54.0, 51.0, 51.0, 52.0, 53.0, 53.0, 55.0, 57.0, 62.0, 58.0, 57.0, 58.0, 61.0, 59.0, 60.0, 57.0, 59.0, 60.0, 58.0, 58.0, 57.0, 55.0, 54.0, 53.0, 53.0, 53.0, 53.0, 50.0, 52.0, 53.0, 55.0, 54.0, 54.0, 53.0, 55.0, 53.0, 53.0, 54.0, 52.0, 55.0, 56.0, 59.0, 59.0, 61.0, 64.0, 63.0, 64.0, 65.0, 66.0, 64.0, 61.0, 63.0, 64.0, 61.0, 63.0, 64.0, 64.0, 60.0, 58.0, 59.0, 59.0, 58.0, 55.0, 52.0, 52.0, 54.0, 52.0, 51.0, 55.0, 52.0, 57.0, 54.0, 54.0, 61.0, 65.0, 65.0, 67.0, 68.0, 66.0, 66.0, 62.0, 63.0, 64.0, 61.0, 67.0, 62.0, 60.0, 60.0, 57.0, 59.0, 63.0, 60.0, 61.0, 63.0, 59.0, 56.0, 52.0, 52.0, 55.0, 52.0, 52.0, 50.0, 49.0, 48.0, 44.0, 44.0, 42.0, 39.0, 41.0, 42.0, 41.0, 39.0, 39.0, 37.0, 37.0, 34.0, 35.0, 33.0, 32.0, 30.0, 30.0, 30.0, 31.0, 30.0, 32.0, 28.0, 24.0, 26.0, 25.0, 24.0, 23.0, 22.0, 23.0, 24.0, 23.0, 21.0, 19.0, 19.0, 17.0, 17.0, 15.0, 14.0, 15.0, 14.0, 14.0, 12.0, 11.0, 11.0, 10.0, 9.0, 9.0, 8.0, 7.0];

      let data3 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 4.0, 5.0, 3.0, 4.0, 4.0, 5.0, 5.0, 3.0, 3.0, 0.0, 3.0, 1.0, 1.0, 4.0, 0.0, 0.0, 0.0, 2.0, 1.0, 4.0, 6.0, 4.0, 8.0, 9.0, 4.0, 12.0, 4.0, 1.0, 1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 4.0, 2.0, 9.0, 4.0, 2.0, 5.0, 2.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 1.0, 1.0, 1.0, 1.0, 4.0, 0.0, 2.0, 3.0, 0.0, 0.0, 2.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 3.0, 5.0, 5.0, 6.0, 3.0, 2.0, 4.0, 1.0, 4.0, 6.0, 3.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 7.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0, 3.0, 5.0, 5.0, 3.0, 4.0, 5.0, 1.0, 5.0, 4.0, 4.0, 7.0, 6.0, 4.0, 5.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 5.0, 7.0, 10.0, 5.0, 5.0, 2.0, 0.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 5.0, 3.0, 4.0, 3.0, 3.0, 4.0, 5.0, 2.0, 4.0, 4.0, 5.0, 4.0, 5.0, 1.0, 1.0, 4.0, 1.0, 5.0, 1.0, 2.0, 0.0, 5.0, 2.0, 2.0, 5.0, 4.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 4.0, 4.0, 11.0, 5.0, 4.0, 4.0, 6.0, 6.0, 0.0, 5.0, 3.0, 1.0, 3.0, 0.0, 2.0, 3.0, 2.0, 3.0, 2.0, 1.0, 4.0, 2.0, 1.0, 2.0, 1.0, 0.0, 2.0, 2.0, 4.0, 2.0, 0.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 6.0, 6.0, 6.0, 2.0, 7.0, 7.0, 4.0, 3.0, 5.0, 3.0, 2.0, 2.0, 4.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 4.0, 2.0, 3.0, 5.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 2.0, 4.0, 1.0, 7.0, 8.0, 5.0, 1.0, 3.0, 6.0, 3.0, 6.0, 3.0, 7.0, 3.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 2.0, 2.0, 5.0, 5.0, 3.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 3.0, 4.0, 7.0, 8.0, 7.0, 8.0, 4.0, 2.0, 7.0, 5.0, 1.0, 3.0, 4.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 1.0, 1.0, 4.0, 4.0, 4.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 6.0, 3.0, 3.0, 4.0, 3.0, 3.0, 6.0, 4.0, 4.0, 2.0, 2.0, 4.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 7.0, 4.0, 4.0, 6.0, 2.0, 1.0, 2.0, 2.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 3.0, 4.0, 1.0, 2.0, 4.0, 3.0, 0.0, 1.0, 8.0, 4.0, 5.0, 1.0, 6.0, 6.0, 7.0, 2.0, 2.0, 1.0, 4.0, 1.0, 1.0, 2.0, 3.0, 4.0, 4.0, 6.0, 4.0, 3.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 0.0, 4.0, 2.0, 3.0, 0.0, 6.0, 2.0, 5.0, 1.0, 2.0, 2.0, 3.0, 2.0, 6.0, 4.0, 1.0, 3.0, 0.0, 1.0, 7.0, 2.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 4.0, 1.0, 6.0, 5.0, 3.0, 0.0, 5.0, 0.0, 5.0, 1.0, 2.0, 1.0, 1.0, 0.0, 3.0, 3.0, 2.0, 1.0, 6.0, 1.0, 2.0, 2.0, 4.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 6.0, 5.0, 8.0, 2.0, 7.0, 6.0, 3.0, 4.0, 6.0, 1.0, 4.0, 2.0, 3.0, 3.0, 4.0, 4.0, 2.0, 3.0, 6.0, 1.0, 3.0, 2.0, 4.0, 4.0, 5.0, 3.0, 2.0, 3.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 3.0, 0.0, 5.0, 6.0, 7.0, 2.0, 6.0, 4.0, 4.0, 0.0, 1.0, 2.0, 2.0, 1.0, 4.0, 0.0, 4.0, 3.0, 1.0, 2.0, 0.0, 5.0, 1.0, 8.0, 8.0, 3.0, 1.0, 3.0, 5.0, 3.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.0, 1.0, 1.0, 4.0, 3.0, 7.0, 9.0, 2.0, 3.0, 7.0, 4.0, 2.0, 4.0, 2.0, 3.0, 3.0, 1.0, 4.0, 0.0, 3.0, 2.0, 1.0, 4.0, 2.0, 4.0, 3.0, 4.0, 3.0, 1.0, 3.0, 3.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 2.0, 6.0, 6.0, 2.0, 3.0, 3.0, 0.0, 3.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 4.0, 2.0, 4.0, 6.0, 4.0, 6.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 2.0, 2.0, 5.0, 5.0, 1.0, 4.0, 3.0, 6.0, 1.0, 4.0, 5.0, 4.0, 4.0, 3.0, 5.0, 1.0, 1.0, 1.0, 4.0, 2.0, 3.0, 4.0, 0.0, 4.0, 3.0, 6.0, 2.0, 2.0, 0.0, 2.0, 2.0, 3.0, 5.0, 0.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 3.0, 1.0, 4.0, 5.0, 1.0, 3.0, 6.0, 1.0, 5.0, 1.0, 3.0, 0.0, 4.0, 1.0, 1.0, 1.0, 4.0, 4.0, 7.0, 3.0, 5.0, 2.0, 3.0, 2.0, 2.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 2.0, 5.0, 2.0, 4.0, 2.0, 3.0, 3.0, 0.0, 2.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 2.0, 3.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 6.0, 4.0, 5.0, 4.0, 1.0, 3.0, 3.0, 6.0, 2.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 3.0, 1.0, 4.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 3.0, 2.0, 2.0, 2.0, 0.0, 5.0, 0.0, 3.0, 2.0, 5.0, 1.0, 1.0, 3.0, 2.0, 1.0, 4.0, 1.0, 3.0, 4.0, 4.0, 0.0, 1.0, 4.0, 4.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 3.0, 1.0, 6.0, 2.0, 5.0, 6.0, 4.0, 0.0, 2.0, 6.0, 3.0, 4.0, 7.0, 0.0, 2.0, 0.0, 2.0, 1.0, 3.0, 2.0, 3.0, 0.0, 4.0, 2.0, 4.0, 2.0, 3.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 3.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 4.0, 5.0, 2.0, 3.0, 4.0, 3.0, 5.0, 4.0, 5.0, 3.0, 2.0, 3.0, 1.0, 2.0, 2.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 2.0, 4.0, 4.0, 2.0, 2.0, 1.0, 5.0, 4.0, 0.0, 0.0, 3.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 5.0, 4.0, 4.0, 1.0, 2.0, 3.0, 6.0, 5.0, 6.0, 1.0, 3.0, 2.0, 3.0, 1.0, 4.0, 3.0, 2.0, 4.0, 6.0, 6.0, 3.0, 3.0, 5.0, 4.0, 3.0, 3.0, 2.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 2.0, 3.0, 2.0, 1.0, 1.0, 5.0, 5.0, 3.0, 1.0, 7.0, 6.0, 5.0, 5.0, 3.0, 6.0, 2.0, 3.0, 1.0, 4.0, 2.0, 2.0, 3.0, 1.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0, 5.0, 1.0, 9.0, 1.0, 6.0, 2.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 3.0, 3.0, 0.0, 3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.0, 3.0, 3.0, 0.0, 3.0, 1.0, 9.0, 4.0, 5.0, 2.0, 1.0, 2.0, 6.0, 3.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.0, 3.0, 2.0, 1.0, 5.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 4.0, 2.0, 2.0, 0.0, 4.0, 5.0, 5.0, 5.0, 4.0, 1.0, 3.0, 5.0, 1.0, 2.0, 2.0, 1.0, 3.0, 3.0, 0.0, 1.0, 1.0, 2.0, 4.0, 1.0, 5.0, 4.0, 3.0, 2.0, 1.0, 5.0, 3.0, 2.0, 3.0, 0.0, 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 2.0, 4.0, 4.0, 2.0, 3.0, 1.0, 4.0, 1.0, 3.0, 2.0, 2.0, 1.0, 3.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 4.0, 1.0, 2.0, 1.0, 3.0, 2.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0].slice(48 * (dayOfMonth - 1), dayOfMonth * 48);;
      let data4 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 4.0, 5.0, 3.0, 4.0, 4.0, 5.0, 5.0, 3.0, 3.0, 0.0, 3.0, 1.0, 1.0, 4.0, 0.0, 0.0, 0.0, 2.0, 1.0, 4.0, 6.0, 4.0, 8.0, 9.0, 4.0, 13.0, 4.0, 1.0, 1.0, 3.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 4.0, 2.0, 9.0, 4.0, 2.0, 5.0, 2.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 1.0, 4.0, 0.0, 2.0, 3.0, 0.0, 0.0, 2.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 3.0, 5.0, 5.0, 6.0, 3.0, 2.0, 4.0, 1.0, 4.0, 6.0, 3.0, 0.0, 1.0, 2.0, 3.0, 2.0, 1.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 7.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 0.0, 2.0, 1.0, 3.0, 3.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 0.0, 1.0, 3.0, 0.0, 3.0, 5.0, 5.0, 3.0, 4.0, 5.0, 1.0, 5.0, 4.0, 4.0, 7.0, 6.0, 4.0, 5.0, 2.0, 1.0, 3.0, 2.0, 5.0, 2.0, 5.0, 7.0, 10.0, 5.0, 5.0, 2.0, 0.0, 3.0, 1.0, 4.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 5.0, 3.0, 4.0, 3.0, 3.0, 4.0, 5.0, 2.0, 4.0, 4.0, 5.0, 4.0, 5.0, 1.0, 1.0, 4.0, 1.0, 5.0, 1.0, 2.0, 0.0, 5.0, 2.0, 2.0, 5.0, 4.0, 1.0, 0.0, 0.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 4.0, 4.0, 11.0, 5.0, 4.0, 4.0, 6.0, 6.0, 0.0, 5.0, 3.0, 1.0, 3.0, 0.0, 2.0, 3.0, 2.0, 3.0, 2.0, 1.0, 4.0, 2.0, 1.0, 2.0, 1.0, 0.0, 2.0, 2.0, 4.0, 2.0, 0.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 6.0, 6.0, 6.0, 2.0, 7.0, 8.0, 4.0, 3.0, 5.0, 3.0, 2.0, 2.0, 4.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 1.0, 3.0, 4.0, 2.0, 3.0, 5.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 2.0, 4.0, 1.0, 7.0, 8.0, 5.0, 1.0, 3.0, 6.0, 3.0, 6.0, 3.0, 7.0, 3.0, 2.0, 1.0, 3.0, 3.0, 5.0, 2.0, 2.0, 2.0, 5.0, 5.0, 3.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 3.0, 4.0, 7.0, 8.0, 7.0, 8.0, 4.0, 2.0, 7.0, 5.0, 1.0, 3.0, 4.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 1.0, 1.0, 4.0, 4.0, 4.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 6.0, 3.0, 3.0, 4.0, 3.0, 3.0, 6.0, 4.0, 4.0, 2.0, 2.0, 4.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 7.0, 4.0, 4.0, 6.0, 2.0, 1.0, 2.0, 2.0, 0.0, 1.0, 1.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 3.0, 4.0, 1.0, 2.0, 4.0, 3.0, 0.0, 1.0, 8.0, 4.0, 5.0, 1.0, 6.0, 6.0, 7.0, 2.0, 2.0, 1.0, 4.0, 1.0, 1.0, 2.0, 3.0, 4.0, 4.0, 6.0, 4.0, 3.0, 4.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 3.0, 0.0, 4.0, 2.0, 3.0, 0.0, 6.0, 2.0, 5.0, 1.0, 2.0, 2.0, 3.0, 2.0, 6.0, 4.0, 1.0, 3.0, 0.0, 1.0, 7.0, 2.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 4.0, 1.0, 6.0, 5.0, 3.0, 0.0, 5.0, 0.0, 5.0, 1.0, 2.0, 1.0, 1.0, 0.0, 3.0, 3.0, 2.0, 1.0, 6.0, 1.0, 2.0, 2.0, 4.0, 1.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.0, 6.0, 5.0, 8.0, 2.0, 7.0, 6.0, 3.0, 4.0, 6.0, 1.0, 4.0, 2.0, 3.0, 3.0, 4.0, 4.0, 2.0, 3.0, 6.0, 1.0, 3.0, 2.0, 4.0, 4.0, 5.0, 3.0, 2.0, 3.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 3.0, 0.0, 5.0, 6.0, 7.0, 2.0, 6.0, 4.0, 4.0, 0.0, 1.0, 2.0, 2.0, 1.0, 4.0, 0.0, 4.0, 3.0, 1.0, 2.0, 0.0, 5.0, 1.0, 8.0, 8.0, 3.0, 1.0, 3.0, 5.0, 3.0, 0.0, 1.0, 1.0, 2.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.0, 1.0, 1.0, 4.0, 3.0, 7.0, 9.0, 2.0, 3.0, 6.0, 4.0, 2.0, 4.0, 2.0, 3.0, 3.0, 1.0, 4.0, 0.0, 3.0, 2.0, 1.0, 4.0, 2.0, 4.0, 3.0, 4.0, 3.0, 1.0, 3.0, 3.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 2.0, 6.0, 6.0, 2.0, 3.0, 3.0, 0.0, 3.0, 0.0, 1.0, 1.0, 3.0, 3.0, 2.0, 2.0, 1.0, 3.0, 2.0, 1.0, 0.0, 4.0, 2.0, 4.0, 6.0, 4.0, 6.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 3.0, 2.0, 2.0, 5.0, 5.0, 1.0, 4.0, 3.0, 6.0, 1.0, 4.0, 4.0, 4.0, 4.0, 3.0, 5.0, 1.0, 1.0, 1.0, 4.0, 2.0, 3.0, 4.0, 0.0, 4.0, 3.0, 5.0, 2.0, 2.0, 0.0, 2.0, 2.0, 3.0, 5.0, 0.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 2.0, 0.0, 0.0, 2.0, 2.0, 3.0, 1.0, 4.0, 5.0, 1.0, 3.0, 6.0, 1.0, 5.0, 1.0, 3.0, 0.0, 4.0, 1.0, 1.0, 1.0, 4.0, 4.0, 7.0, 3.0, 5.0, 2.0, 3.0, 2.0, 2.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 2.0, 5.0, 2.0, 4.0, 2.0, 3.0, 3.0, 0.0, 2.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 2.0, 3.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 2.0, 6.0, 4.0, 5.0, 4.0, 1.0, 3.0, 3.0, 6.0, 2.0, 0.0, 2.0, 2.0, 1.0, 0.0, 0.0, 2.0, 1.0, 0.0, 0.0, 2.0, 2.0, 2.0, 3.0, 3.0, 1.0, 4.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 3.0, 2.0, 2.0, 2.0, 0.0, 5.0, 0.0, 3.0, 2.0, 5.0, 1.0, 1.0, 3.0, 2.0, 1.0, 4.0, 1.0, 3.0, 4.0, 4.0, 0.0, 1.0, 4.0, 4.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 3.0, 1.0, 6.0, 2.0, 5.0, 6.0, 4.0, 0.0, 2.0, 6.0, 3.0, 4.0, 7.0, 0.0, 2.0, 0.0, 2.0, 0.0, 3.0, 2.0, 3.0, 0.0, 4.0, 2.0, 4.0, 2.0, 3.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 3.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 4.0, 5.0, 2.0, 3.0, 4.0, 3.0, 5.0, 4.0, 5.0, 3.0, 2.0, 3.0, 1.0, 2.0, 2.0, 2.0, 5.0, 1.0, 2.0, 1.0, 1.0, 2.0, 4.0, 4.0, 2.0, 2.0, 1.0, 5.0, 4.0, 0.0, 0.0, 3.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 3.0, 1.0, 1.0, 3.0, 1.0, 4.0, 4.0, 4.0, 1.0, 2.0, 3.0, 6.0, 4.0, 6.0, 1.0, 3.0, 2.0, 3.0, 1.0, 4.0, 3.0, 2.0, 4.0, 6.0, 6.0, 3.0, 2.0, 5.0, 4.0, 3.0, 3.0, 2.0, 1.0, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 2.0, 3.0, 2.0, 1.0, 1.0, 5.0, 5.0, 3.0, 1.0, 7.0, 6.0, 5.0, 5.0, 3.0, 6.0, 2.0, 3.0, 1.0, 4.0, 2.0, 2.0, 3.0, 1.0, 2.0, 3.0, 1.0, 2.0, 0.0, 1.0, 0.0, 1.0, 2.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0, 5.0, 1.0, 9.0, 1.0, 6.0, 2.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 3.0, 3.0, 0.0, 3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0, 2.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 2.0, 2.0, 2.0, 4.0, 3.0, 3.0, 3.0, 4.0, 6.0, 3.0, 2.0, 1.0, 2.0, 2.0, 2.0, 3.0, 0.0, 2.0, 1.0, 2.0, 2.0, 3.0, 1.0, 2.0, 0.0, 2.0, 3.0, 3.0, 3.0, 3.0, 2.0, 1.0, 2.0, 2.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 5.0, 6.0, 4.0, 3.0, 2.0, 0.0, 3.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 3.0, 3.0, 3.0, 3.0, 3.0, 1.0, 2.0, 2.0, 0.0, 1.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 3.0, 3.0, 5.0, 2.0, 3.0, 3.0, 6.0, 4.0, 4.0, 3.0, 0.0, 0.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 3.0, 3.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0].slice(48 * (dayOfMonth - 1), dayOfMonth * 48);;

      plotEchartsGrid(data1,data2);
      plotEchartsIntersection(data3,data4);

  },
  data() {
    return {
      dialogVisible: false,
      showTimeGrid: true,
      showTimeIntersection: false,
      checkedP: true,
      activeIndex: '1',
      activeIndex2: '1',
      maps: null,
      valueTime:"2016-6-01",
      valueSlider:0,
      marksSlider:{
        0:'0',
        1:'1',
        2:'2',
        3:'3',
        4:'4',
        5:'5',
        6:'6',
        7:'7',
        8:'8',
        9:'9',
        10:'10',
        11:'11',
        12:'12',
        13:'13',
        14:'14',
        15:'15',
        16:'16',
        17:'17',
        18:'18',
        19:'19',
        20:'20',
        21:'21',
        22:'22',
        23:'23',
        // 24:'24',
      },
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
      value: '',
    };
  },
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
/deep/ .el-slider__marks-text{
  color: #3a8ee6;
  font-size: 12px;
}

/deep/ .el-checkbox__label{
  font-size: 22px;
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
  bottom: 60px;
  left: 600px;
}
.Evaluation{
  position: fixed;
  left:35px;
  top:550px;
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
