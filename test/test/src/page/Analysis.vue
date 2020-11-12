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
                <el-menu-item style="font-size: 18px;" @click="drawChartWorking">Working Days</el-menu-item>
                <el-dialog
                  title="Workingdays of the whole month"
                  :visible.sync="dialogVisibleWorking"
                  width="90%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="12"><div style="height: 500px;" id="chartsWorkingPick">nihao</div></el-col>
                    <el-col :span="12"><div style="height: 500px;" id="chartsWorkingDrop">nihao</div></el-col>
                  </el-row>
                </el-dialog>
                <el-menu-item style="font-size: 18px;">Holidays</el-menu-item>
                <el-menu-item style="font-size: 18px;padding-left: 5px" @click="chooseTime">Holidays and Working Days</el-menu-item>
                <el-date-picker
                  id="valueTime2"
                  align="right"
                  type="date"
                  placeholder=" Select Data"
                  style="font-size: 22px;background-color: #252525;visibility: hidden"
                  v-model="valueTime2"
                  default-value = "2016-6-4"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <el-button @click="showComparison" id="showButton" style="visibility: hidden;font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Show</el-button>
                <el-dialog
                  title="Holidays and Weekdays Comparison"
                  :visible.sync="dialogVisible"
                  width="90%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="12"><div style="height: 500px;" id="chartsPickup"></div></el-col>
                    <el-col :span="12"><div style="height: 500px" id="chartsDropoff"></div></el-col>
                  </el-row>
                </el-dialog>
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
          <div style="right:0px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee;" id="currentTime">Date Time: 2016-6-1 8:00</div>
          <div id="choosePD" style="visibility: visible">
            <div style="bottom:200px;right:100px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
              <div style="background-color:#FF0000;bottom:5px;right:115px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
              <el-checkbox v-model="pickupSelect"
                         @change="handleChangePickup"><div style="font-weight:700;">Pick Up</div></el-checkbox>
            </div>
            <div style="bottom:150px;right:85px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
              <div style="background-color:#007cbf;bottom:5px;right:128px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px"></div>
              <el-checkbox v-model="dropoffSelect" style="padding-top: 20px;margin-left: 10px;font-size: 20px;font-weight: 700" @change="handleChangeDropoff"
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
            <div class="chartsBoard">Request Curve</div>
            <div class="charts" id="charts1" style="width: 400px;height: 400px;padding-left: 10px"></div>
          </div>


        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
var pick_drop_Data;
var pickupData;
var dropoffData;
var choosenDate;
var comparison;
var pickupComparison;
var dropoffComparison;
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
    },
    chooseTime(){
      if(document.getElementById("valueTime2").style.visibility=="visible" && document.getElementById("showButton").style.visibility=="visible"){
        document.getElementById("valueTime2").style.visibility="hidden";
        document.getElementById("showButton").style.visibility="hidden";
      }
      else{
        document.getElementById("valueTime2").style.visibility="visible";
        document.getElementById("showButton").style.visibility="visible";
      }

    },
    showComparison(){
      this.dialogVisible = true;
      this.drawChartComparison();
    },
    initData:function (){
        var url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff_data.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        // var grid_center_coordinates = new Array();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
          if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            pick_drop_Data = JSON.parse(request.responseText);
            pickupData = pick_drop_Data.pickup.slice(0,288);
            dropoffData = pick_drop_Data.dropoff.slice(0,288);
          }
        };


        var url2 = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_10.geojson";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request2 = new XMLHttpRequest();
        request2.open("get", url2);/*设置请求方法与路径*/
        request2.send(null);/*不发送数据到服务器*/
        request2.onload = function () {/*XHR对象获取到返回信息后执行*/
          if (request2.status == 200) {/*返回状态为200，即为数据获取成功*/
            comparison = JSON.parse(request2.responseText);
            pickupComparison = comparison.pickup.slice(0,288);
            dropoffComparison = comparison.dropoff.slice(0,288);
          }
        };

    },
    drawChart(){
      //echarts图表
      window.charts1 = echarts.init(document.getElementById('charts1'));
          // 绘制图表
          charts1.setOption({
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
            dataZoom: [
              {
                type: 'slider',
                xAxisIndex: [0],
                show: true,
                realtime: true,
                start:33,
                end: 92,
                 //组件的背景颜色
              },
              {
                type: 'inside',
                realtime: true,
                xAxisIndex: [0],
                start: 33,
                end: 92,
              },
              {
                type: 'slider',
                yAxisIndex: [0],
                show: true,
                realtime: true,
                start: 50,
                end: 100,

              },
              {
                type: 'inside',
                realtime: true,
                yAxisIndex: [0],
                start: 33,
                end: 75,
              },

            ],
            xAxis: [
              {
                type: 'category',
                data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'],
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
                data: pickupData,
                color:['#FF0000']
              },
              {
                name: 'Drop Off',
                type: 'line',
                data: dropoffData,
                color:['#007cbf']
              },
            ],
          });
        },
    drawChartWorking(){
      this.dialogVisibleWorking = true;
      this.$nextTick(() => {
        //echarts图表
        window.chartsWorkingPick = echarts.init(document.getElementById('chartsWorkingPick'));
        // 绘制图表
        chartsWorkingPick.setOption({
          title: {
            text: 'Pick Up',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: choosenDate,
            padding:[20,0,0,0],
            textStyle:{
              color:['#252525']
            },
            top:10
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 92,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 100,
            },
          ],
          xAxis: [
            {
              type: 'category',
              data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'],
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
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
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色

                }
              }
            }
          ],
          series: [
            {
              name: choosenDate[0],
              type: 'line',
              data: pickupData,
              color:['#FF0000']
            },
            {
              name: choosenDate[1],
              type: 'line',
              data: pickupComparison,
              color:['#007cbf']
            },
          ],
        });
      })
    },
    drawChartComparison(){
      this.$nextTick(() => {
        var day = this.valueTime2.getDate();
        var week = this.valueTime2.getDay();
        var weekArray = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
        //var url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_"+ String(day-1) + ".geojson";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        choosenDate = ['2016-6-1(Wed)', '2016-6-'+day+'('+weekArray[week-1]+')'];
        //echarts图表
        window.chartsPickup = echarts.init(document.getElementById('chartsPickup'));
        // 绘制图表
        chartsPickup.setOption({
          title: {
            text: 'Pick Up',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: choosenDate,
            padding:[20,0,0,0],
            textStyle:{
              color:['#252525']
            },
            top:10
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 92,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 100,
            },
          ],
          xAxis: [
            {
              type: 'category',
              data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'],
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
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
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色

                }
              }
            }
          ],
          series: [
            {
              name: choosenDate[0],
              type: 'line',
              data: pickupData,
              color:['#FF0000']
            },
            {
              name: choosenDate[1],
              type: 'line',
              data: pickupComparison,
              color:['#007cbf']
            },
          ],
        });
        window.chartsDropoff = echarts.init(document.getElementById('chartsDropoff'));
        // 绘制图表
        chartsDropoff.setOption({
          title: {
            text: 'Drop Off',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: choosenDate,
            padding:[20,0,0,0],
            textStyle:{
              color:['#252525']
            },
            top:10
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 92,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 33,
              end: 100,
            },
          ],
          xAxis: [
            {
              type: 'category',
              data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'],
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
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
                  color: '#252525',//左边线的颜色
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色

                }
              }
            }
          ],
          series: [
            {
              name: choosenDate[0],
              type: 'line',
              data: dropoffData,
              color:['#FF0000']
            },
            {
              name: choosenDate[1],
              type: 'line',
              data: dropoffComparison,
              color:['#007cbf']
            },
          ],
        });
      })
    },

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
        "type": "line",           /* fill类型一般用来表示一个面，一般较大 */
        "source": "regions",
        "paint": {
          "line-color": 'rgba(255,255,255,1)',
          "line-width": 1.5
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

    this.initData();
    this.drawChart();
  },
  data() {
    return {
      dialogVisible:false,
      dialogVisibleWorking:false,
      checked: true,
      pickupSelect:true,
      dropoffSelect:true,
      valueSlider:0,
      valueTime:"2016-6-1",
      valueTime2:'',
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

/deep/ .el-menu__inner{
  background-color: #252525;
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
  background-color: #252525;
}

/deep/ .el-submenu{
  background-color: #252525;
}

/deep/ .el-menu{
  background-color: #252525;
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
