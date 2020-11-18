<template>
  <el-container style="height: 100%;background-color: #252525">
    <el-header style="padding: 0;">
      <Header/>
    </el-header>
    <el-container style="height: 100%;background-color: #252525">
      <el-aside style="padding-top:90px;overflow-x: hidden">
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
          <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee" @click="runAnalysis">Run</el-button>

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
                <el-menu-item style="font-size: 20px" index="1-1" @click="scatterP">Scatter Plot</el-menu-item>

                <el-menu-item style="font-size: 20px;padding-left: 40px" index="1-2" @click="Choropleth">Choropleth Map</el-menu-item>
                <el-menu-item style="font-size: 20px;padding-left: 35px" index="1-3" @click="Heatmap">Heat
                  Map</el-menu-item>
                <el-menu-item style="font-size: 20px;padding-left: 35px" index="1-4" @click="threeD">3D Map</el-menu-item>

<!--                <el-menu-item style="font-size: 18px;padding-left: 20px" index="1-2">Thermodynamic Diagram</el-menu-item>-->
<!--                <el-menu-item style="font-size: 18px;padding-left: 5px" index="1-3" @click="threeD">3D Diagram</el-menu-item>-->

              </el-submenu>
              <el-submenu index="2" style="width: 250px;background-color: #252525">
                <template slot="title">
                  <span style="color: #eeeeee;font-size: 20px" class="item-title">Data Analysis</span>
                </template>
                <el-menu-item style="font-size: 20px;" @click="drawChartWorking">Working Days</el-menu-item>
                <el-dialog
                  title="Workingdays of June"
                  :visible.sync="dialogVisibleWorking"
                  width="90%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="12"><div style="height: 600px;" id="chartsWorkingPick"></div></el-col>
                    <el-col :span="12"><div style="height: 600px;" id="chartsWorkingDrop"></div></el-col>
                  </el-row>
                </el-dialog>
                <el-menu-item style="font-size: 20px;" @click="drawChartHolidays">Holidays</el-menu-item>
                <el-dialog
                  title="Weekends of June"
                  :visible.sync="dialogVisibleHolidays"
                  width="90%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="12"><div style="height: 600px;" id="chartsHolidaysPick"></div></el-col>
                    <el-col :span="12"><div style="height: 600px;" id="chartsHolidaysDrop"></div></el-col>
                  </el-row>
                </el-dialog>
                <el-menu-item style="font-size: 17px;padding-left: 5px" @click="chooseTime">Holidays and Working Days</el-menu-item>
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
                  width="50%"
                  :before-close="handleClose">
                  <el-row>
                    <el-col :span="24"><div style="height: 600px;" id="chartsComparison"></div></el-col>
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
            max="24"
            :step="1"
            :marks="marksSlider"
            @change="getValueSlider"
            show-stops>
          </el-slider>
          <div style="height:90px;left:50px;top:100px;font-size:24px;font-weight:700;position: absolute;color: #eeeeee;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px" id="NumberRequest"><div class="numberBoard">Number of Requests</div><br><div id="requestNumber"style="color: #fd4949;top:55px;left:100px;position: absolute;font-size: 23px">2010</div></div>
          <div style="right:0px;top:100px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee;" id="currentTime">Date Time: 2016-06-01 08:00</div>
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
          <div style="right:40px;bottom:375px;;position: absolute;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px">
            <div class="chartsBoard">Request Curve</div>
            <div class="charts" id="charts1" style="width: 400px;height: 400px;padding-left: 10px"></div>
          </div>
          <div style="left:15px;top:35%;width:500px;font-size:18px;font-weight:700;position: absolute;color: #eeeeee" id="gridInfo">[Click the Grid]</div>
          <div style="left:40px;bottom:80px;position: absolute;background-color: rgba(33,36,37,.62);border: 1px solid rgb(68, 68, 68);border-radius: 10px">
            <div class="chartsBoard" style="font-size: 20px">Grid Neighbor Request Comparison</div>
            <div class="charts" id="chartsNeighbor" style="height: 500px;"></div>
          </div>


        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import axios from "axios";

var pick_drop_Data;
var pickupData;
var dropoffData;
var choosenDate;
var comparison;
var pickupComparison;
var dropoffComparison;
var runClick = false;
//一个月内的所有工作日的数据
var dataMonth;
var pickupMonth;
var dropoffMonth;
var changeValueSlider = false;

var grid_data;
var grid_center_coordinates = new Array();
var current_region_id = 0;
var dayOfMonth = 1;
var grid_polygon_data;
import Header from "../components/Header";
import echarts from 'echarts';
import '@/assets/css/all.css';
import $ from 'jquery';
import {getCurrentGridIndex, getMouseLngLat, plotEchartsGrid, plotEchartsNeighbor} from "../assets/js/utils";
const mapboxgl = require('mapbox-gl');
export default {
  name: "Analysis",
  components: {Header},
  methods: {
    getValueSlider(){
      changeValueSlider = true;
      //alert(this.valueSlider);
    },
    runAnalysis(){
      alert("Start Run");
      runClick = true;
      const that = this;//注意先获取this，计时器内部的this不是能控制valueSlider的this
     if(runClick == true){
        var date = new Date(2016,5,1,8,0);//注意月份是0-11，1月为0，12月为11
        var indexT = 96;
        var index=0;
        var timer = window.setInterval(function() {
          if(index < 168){
            index++;
            console.log(index);
            map.getSource('pickup').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/pickup/pickup_" + String(index) +
              ".geojson");
            map.getSource('dropoff').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/dropoff/dropoff_" + String(index) +
              ".geojson");
            map.getSource('regionRequests').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/region_requests/region_request_" + String(index) +
              ".geojson");
            map.getSource('pickup_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_" + String(indexT) +
              ".geojson");
            var min=date.getMinutes();
            date.setMinutes(min+5);
            var h=date.getHours();//获取时
            if(changeValueSlider == false)
              that.valueSlider = h;//时间条会随着时间移动
            if(changeValueSlider == true)
            {
              index = (that.valueSlider - 8) * 12;
              //alert(index);
              date.setHours(that.valueSlider,0);
              //alert(date.getHours());
              changeValueSlider = false;
            }
            // var m=date.getMinutes();//获取分
            chartsAnalysis.dispatchAction({
              type:'showTip',
              seriesIndex: 0,//这行不能省
              dataIndex:index+96
            });
            chartsAnalysis.dispatchAction({
              type:'showTip',
              seriesIndex: 1,//这行不能省
              dataIndex:index+96
            });
            // if(m < 10)
            // {
            //   document.getElementById("currentTime").innerHTML =  "Date Time: 2016-6-1 "+h+":0"+m;
            // }
            // else
            // {
            //   document.getElementById("currentTime").innerHTML =  "Date Time: 2016-6-1 "+h+":"+m;
            // }
            document.getElementById("requestNumber").innerHTML =  pickupData[indexT]+dropoffData[indexT];
            indexT++;
            document.getElementById("currentTime").innerHTML = "Date Time: " + date.format("yyyy-MM-dd hh:mm");
          }else {
            //移除添加的source和layer
            map.removeLayer('pickup');
            map.removeLayer('dropoff');
            map.removeSource('pickup');
            map.removeSource('dropoff');
            map.removeLayer('regionRequests');
            map.removeSource('regionRequests');
            window.clearInterval(timer);
          }
        }, 1000);
      }
    },
    handleChange() {
      var check = this.checked;
      if (!check) {
        map.setLayoutProperty('regions', 'visibility', 'none');
      } else {
        map.setLayoutProperty('regions', 'visibility', 'visible');
      }
    },
    handleChangePickup(){
      var pickup = this.pickupSelect;
      if (!pickup) {
        map.setLayoutProperty('pickup', 'visibility', 'none');
      } else {
        map.setLayoutProperty('pickup', 'visibility', 'visible');
      }
    },
    handleChangeDropoff(){
      var dropoff = this.dropoffSelect;
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
      map.setZoom(11.3);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap', 'visibility', 'none');
      map.setLayoutProperty('regionRequests','visibility','none');
      map.setLayoutProperty('pickup','visibility','visible');
      map.setLayoutProperty('dropoff','visibility','visible');
      document.getElementById("choosePD").style.visibility="visible";
      document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="hidden";
      map.setLayoutProperty('grid_neighbors','visibility','visible');
    },
    Choropleth(){
      map.setPitch(0);
      map.setBearing(0);
      map.setZoom(11.3);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup','visibility','none');
      map.setLayoutProperty('dropoff','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap', 'visibility', 'none');
      map.setLayoutProperty('regionRequests','visibility','visible');
      document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility="visible";
      document.getElementById("heatmapIcon2").style.visibility="hidden";
      map.setLayoutProperty('grid_neighbors','visibility','none');
    },
    Heatmap(){
      map.setPitch(0);
      map.setBearing(0);
      map.setZoom(11.3);
      map.setLayoutProperty('3d-buildings','visibility','none');
      map.setLayoutProperty('pickup','visibility','none');
      map.setLayoutProperty('dropoff','visibility','none');
      map.setLayoutProperty('regionRequests','visibility','none');
      map.setLayoutProperty('pickup_pred-heatmap','visibility','visible');
      document.getElementById("choosePD").style.visibility="hidden";
      document.getElementById("heatmapIcon").style.visibility="hidden";
      document.getElementById("heatmapIcon2").style.visibility="visible";
      map.setLayoutProperty('grid_neighbors','visibility','none');
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
      if(this.valueTime2 == "")
        alert("Please choose a date!");
      else {
        this.dialogVisible = true;
        this.drawChartComparison();
      }
    },
    initData:function (){
      //2016-06-01的数据
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


        //选择的日期之后的数据
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

      //   //获得整个月的数据(还未可行)
      // dataMonth=new Array();
      // pickupMonth=new Array();
      // dropoffMonth=new Array();
      // for(var i=0;i<30;i++) {
      //   dataMonth[i] = new Array();
      //   pickupMonth[i] = new Array();
      //   dropoffMonth[i] = new Array();
      // }
      // var index = 0;
      // var url3;
      // var request3;
      // for(index=0;index < 30;index++){
      //   url3 = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_"+index+".geojson";
      //   request3 = new XMLHttpRequest();
      //   request3.open("get", url3);/*设置请求方法与路径*/
      //   request3.send(null);/*不发送数据到服务器*/
      //   request3.onload = function () {/*XHR对象获取到返回信息后执行*/
      //     if (request3.status == 200) {/*返回状态为200，即为数据获取成功*/
      //       dataMonth[index] = JSON.parse(request3.responseText);
      //       pickupMonth[index] = dataMonth[index].pickup.slice(0,288);
      //       dropoffMonth[index] = dataMonth[index].dropoff.slice(0,288);
      //
      //     }
      //   };
      // }
      // //alert(pickupMonth[1]);

    },
    //画地图上的图表
    drawChart(){
      //echarts进行初始化
      window.chartsAnalysis = echarts.init(document.getElementById('charts1'));
      // 绘制图表
      chartsAnalysis.setOption({
        tooltip: {
          transitionDuration: 0,
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

          }
        },
        legend: {
          data: ['Pick Up', 'Drop Off'],
          padding:[20,0,0,0],
          textStyle:{
            color:['#eeeeee'],
            fontSize:16,
            fontWeight:1000
          }
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            show: true,
            realtime: true,
            start:0,
            end: 100,
            //组件的背景颜色
          },
          {
            type: 'slider',
            yAxisIndex: [0],
            show: true,
            realtime: true,
            start: 0,
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
                color: '#eeeeee',//左边线的颜色
                fontWeight:1000
              }
            },
            axisLabel: {
              textStyle: {
                color: '#eeeeee',//坐标值得具体的颜色
                fontWeight:1000
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
                fontWeight:1000
              }
            },
            axisLabel: {
              textStyle: {
                color: '#eeeeee',//坐标值得具体的颜色
                fontWeight:1000
              }
            }
          }
        ],
        series: [
          {
            name: 'Pick Up',
            type: 'line',
            data: [],
            color:['#FF0000']
          },
          {
            name: 'Drop Off',
            type: 'line',
            data: [],
            color:['#007cbf']
          },
        ],
      });
      chartsAnalysis.showLoading();
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff_data.geojson",
        dataType:'JSON',
        success:function(data){
          chartsAnalysis.hideLoading();             //隐藏加载效果
          chartsAnalysis.setOption({
            series: [
              {
                name: 'Pick Up',
                type: 'line',
                data: data.pickup,
                color:['#FF0000']
              },
              {
                name: 'Drop Off',
                type: 'line',
                data: data.dropoff,
                color:['#007cbf']
              },
            ]
          })
        }
      })

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
          grid:{
            top:100
          },
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: ['2016-6-1','2016-6-2','2016-6-3','2016-6-6','2016-6-7','2016-6-8','2016-6-9','2016-6-10','2016-6-13','2016-6-14','2016-6-15','2016-6-16','2016-6-17','2016-6-20','2016-6-21','2016-6-22','2016-6-23','2016-6-24','2016-6-27','2016-6-28','2016-6-29','2016-6-30'],
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
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000

                }
              }
            }
          ],
          series: [
            {
              name: '2016-6-1',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-2',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-3',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-6',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-7',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-8',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-9',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-10',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-13',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-14',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-15',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-16',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-17',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-20',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-21',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-22',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-23',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-24',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-27',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-28',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-29',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-30',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
          ],
        });
        window.chartsWorkingDrop = echarts.init(document.getElementById('chartsWorkingDrop'));
        // 绘制图表
        chartsWorkingDrop.setOption({
          title: {
            text: 'Drop Off',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          grid:{
            top:100
          },
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: ['2016-6-1','2016-6-2','2016-6-3','2016-6-6','2016-6-7','2016-6-8','2016-6-9','2016-6-10','2016-6-13','2016-6-14','2016-6-15','2016-6-16','2016-6-17','2016-6-20','2016-6-21','2016-6-22','2016-6-23','2016-6-24','2016-6-27','2016-6-28','2016-6-29','2016-6-30'],
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
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000

                }
              }
            }
          ],
          series: [
            {
              name: '2016-6-1',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-2',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-3',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-6',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-7',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-8',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-9',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-10',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-13',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-14',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-15',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-16',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-17',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-20',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-21',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-22',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-23',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-24',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-27',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-28',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-29',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-30',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
          ],
        });
      })

      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_0.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-1',
                type: 'line',
                data: data.pickup,
                color:['#0780cf']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-1',
                type: 'line',
                data: data.dropoff,
                color:['#0780cf']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_1.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-2',
                type: 'line',
                data: data.pickup,
                color:['#765005']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-2',
                type: 'line',
                data: data.dropoff,
                color:['#765005']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_2.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-3',
                type: 'line',
                data: data.pickup,
                color:['#fa6d1d']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-3',
                type: 'line',
                data: data.dropoff,
                color:['#fa6d1d']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_5.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-6',
                type: 'line',
                data: data.pickup,
                color:['#0e2c82']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-6',
                type: 'line',
                data: data.dropoff,
                color:['#0e2c82']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_6.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-7',
                type: 'line',
                data: data.pickup,
                color:['#b6b51f']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-7',
                type: 'line',
                data: data.dropoff,
                color:['#b6b51f']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_7.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-8',
                type: 'line',
                data: data.pickup,
                color:['#da1f18']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-8',
                type: 'line',
                data: data.dropoff,
                color:['#da1f18']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_8.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-9',
                type: 'line',
                data: data.pickup,
                color:['#701866']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-9',
                type: 'line',
                data: data.dropoff,
                color:['#701866']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_9.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-10',
                type: 'line',
                data: data.pickup,
                color:['#f47a75']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-10',
                type: 'line',
                data: data.dropoff,
                color:['#f47a75']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_12.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-13',
                type: 'line',
                data: data.pickup,
                color:['#009db2']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-13',
                type: 'line',
                data: data.dropoff,
                color:['#009db2']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_13.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-14',
                type: 'line',
                data: data.pickup,
                color:['#024b51']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-14',
                type: 'line',
                data: data.dropoff,
                color:['#024b51']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_14.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-15',
                type: 'line',
                data: data.pickup,
                color:['#0780cf']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-15',
                type: 'line',
                data: data.dropoff,
                color:['#0780cf']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_15.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-16',
                type: 'line',
                data: data.pickup,
                color:['#765005']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-16',
                type: 'line',
                data: data.dropoff,
                color:['#765005']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_16.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-17',
                type: 'line',
                data: data.pickup,
                color:['#63b2ee']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-17',
                type: 'line',
                data: data.dropoff,
                color:['#63b2ee']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_19.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-20',
                type: 'line',
                data: data.pickup,
                color:['#76da91']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-20',
                type: 'line',
                data: data.dropoff,
                color:['#76da91']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_20.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-21',
                type: 'line',
                data: data.pickup,
                color:['#f8cb7f']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-21',
                type: 'line',
                data: data.dropoff,
                color:['#f8cb7f']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_21.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-22',
                type: 'line',
                data: data.pickup,
                color:['#f89588']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-22',
                type: 'line',
                data: data.dropoff,
                color:['#f89588']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_22.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-23',
                type: 'line',
                data: data.pickup,
                color:['#7cd6cf']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-23',
                type: 'line',
                data: data.dropoff,
                color:['#7cd6cf']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_23.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-24',
                type: 'line',
                data: data.pickup,
                color:['#9192ab']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-24',
                type: 'line',
                data: data.dropoff,
                color:['#9192ab']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_26.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-27',
                type: 'line',
                data: data.pickup,
                color:['#7898e1']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-27',
                type: 'line',
                data: data.dropoff,
                color:['#7898e1']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_27.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-28',
                type: 'line',
                data: data.pickup,
                color:['#efa666']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-28',
                type: 'line',
                data: data.dropoff,
                color:['#efa666']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_28.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-29',
                type: 'line',
                data: data.pickup,
                color:['#eddd86']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-29',
                type: 'line',
                data: data.dropoff,
                color:['#eddd86']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_29.geojson",
        dataType:'JSON',
        success:function(data){
          chartsWorkingPick.setOption({
            series: [
              {
                name: '2016-6-30',
                type: 'line',
                data: data.pickup,
                color:['#9987ce']
              },
            ]
          })
          chartsWorkingDrop.setOption({
            series: [
              {
                name: '2016-6-30',
                type: 'line',
                data: data.dropoff,
                color:['#9987ce']
              },
            ]
          })
        }
      })

    },
    drawChartHolidays(){
      this.dialogVisibleHolidays = true;
      this.$nextTick(() => {
        //echarts图表
        window.chartsHolidaysPick = echarts.init(document.getElementById('chartsHolidaysPick'));
        // 绘制图表
        chartsHolidaysPick.setOption({
          title: {
            text: 'Pick Up',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: ['2016-6-4','2016-6-5','2016-6-11','2016-6-12','2016-6-18','2016-6-19','2016-6-25','2016-6-26'],
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
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000

                }
              }
            }
          ],
          series: [
            {
              name: '2016-6-4',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-5',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-11',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-12',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-18',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-19',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-25',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-26',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
          ],
        });
        window.chartsHolidaysDrop = echarts.init(document.getElementById('chartsHolidaysDrop'));
        // 绘制图表
        chartsHolidaysDrop.setOption({
          title: {
            text: 'Drop Off',
            left: 'center',
            textStyle: {fontSize: 16,},
          },
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: ['2016-6-4','2016-6-5','2016-6-11','2016-6-12','2016-6-18','2016-6-19','2016-6-25','2016-6-26'],
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
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000

                }
              }
            }
          ],
          series: [
            {
              name: '2016-6-4',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-5',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-11',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-12',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-18',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-19',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-25',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
            {
              name: '2016-6-26',
              type: 'line',
              data: [],
              color:['#FF0000']
            },
          ],
        });
      })

      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_3.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-4',
                type: 'line',
                data: data.pickup,
                color:['#71ae46']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-4',
                type: 'line',
                data: data.dropoff,
                color:['#71ae46']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_4.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-5',
                type: 'line',
                data: data.pickup,
                color:['#96b744']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-5',
                type: 'line',
                data: data.dropoff,
                color:['#96b744']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_10.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-11',
                type: 'line',
                data: data.pickup,
                color:['#c4cc38']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-11',
                type: 'line',
                data: data.dropoff,
                color:['#c4cc38']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_11.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-12',
                type: 'line',
                data: data.pickup,
                color:['#ebe12a']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-12',
                type: 'line',
                data: data.dropoff,
                color:['#ebe12a']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_17.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-18',
                type: 'line',
                data: data.pickup,
                color:['#eab026']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-18',
                type: 'line',
                data: data.dropoff,
                color:['#eab026']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_18.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-19',
                type: 'line',
                data: data.pickup,
                color:['#e3852b']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-19',
                type: 'line',
                data: data.dropoff,
                color:['#e3852b']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_24.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-25',
                type: 'line',
                data: data.pickup,
                color:['#d85d2a']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-25',
                type: 'line',
                data: data.dropoff,
                color:['#d85d2a']
              },
            ]
          })
        }
      })
      $.ajax({
        type:'get',
        url:"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_25.geojson",
        dataType:'JSON',
        success:function(data){
          chartsHolidaysPick.setOption({
            series: [
              {
                name: '2016-6-26',
                type: 'line',
                data: data.pickup,
                color:['#ce2626']
              },
            ]
          })
          chartsHolidaysDrop.setOption({
            series: [
              {
                name: '2016-6-26',
                type: 'line',
                data: data.dropoff,
                color:['#ce2626']
              },
            ]
          })
        }
      })
    },
    drawChartComparison(){
      this.$nextTick(() => {
        var day = this.valueTime2.getDate();
        var week = this.valueTime2.getDay();
        var weekArray = new Array("Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", );//0表示周天
        //var url = "https://raw.githubusercontent.com/fengzi258/SOUP_data/main/pickup_dropoff/day_"+ String(day-1) + ".geojson";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        choosenDate = ['2016-6-1(Wed)', '2016-6-'+day+'('+weekArray[week]+')'];
        //echarts图表
        window.chartsComparison = echarts.init(document.getElementById('chartsComparison'));
        // 绘制图表
        chartsComparison.setOption({
          title: {
            text: 'Requests',
            left: 'center',
            textStyle: {fontSize: 22,},
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

            }
          },

          legend: {
            data: choosenDate,
            padding:[25,0,0,0],
            textStyle:{
              color:['#252525'],
              fontSize:18,
              fontWeight:1000
            },
            top:10
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              yAxisIndex: [0],
              show: true,
              realtime: true,
              start: 0,
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000
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
                  fontWeight:1000
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#252525',//坐标值得具体的颜色
                  fontWeight:1000

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

    getGridData:function (){
      axios.get('../../static/grid_data2.geojson').then(response => {
        grid_data = response.data;
        for (let i = 0; i < grid_data.length; i++) {
          grid_center_coordinates[i] = grid_data[i].geometry.coordinates;
        }
      }, response => {
        console.log("error");
      });
    },
    getGridPolygonData:function () {
      axios.get('../../static/grid_polygon_coordinates.geojson').then(response => {
        grid_polygon_data = response.data;
      }, response => {
        console.log("error");
      });
    }

  },
  mounted() {

    this.getGridData();
    this.getGridPolygonData();
    mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
    window.map = new mapboxgl.Map({
      container: 'map', // container id 绑定的组件的id
      style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [-73.96,40.785], // 初始坐标系
      zoom: 11.3,     // starting zoom 地图初始的拉伸比例

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
      map.setLayoutProperty('pickup_pred-heatmap','visibility','none');
      let ids_init = [0, 65, 71, 51, 84, 44, 82];
      let data_neighbor_coordinates = new Array();
      for(let i=0;i<ids_init.length;i++){
        // console.log(grid_polygon_data[ids_init[i]].center_coordinates);
        // var marker = new mapboxgl.Marker()
        //   .setLngLat(grid_polygon_data[ids_init[i]].center_coordinates)
        //   // .setPopup(new mapboxgl.Popup().setHTML("<h3>"+ids_init[i]+"</h3>"))
        //   .setPopup(new mapboxgl.Popup().setHTML("<h3>hello</h3>"))
        //   .addTo(map);
        data_neighbor_coordinates[i] = {                  /* geojson数据 */
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [grid_polygon_data[ids_init[i]].coordinates],
          }
        }
      }
      // console.log(data_neighbor_coordinates[0]);
      map.addSource("grid_neighbors", {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": data_neighbor_coordinates,
        },
      });

      map.addLayer({
        "id": "grid_neighbors",
        "type": "fill",           /* fill类型一般用来表示一个面，一般较大 */
        "source": "grid_neighbors",
        "paint": {
          // "line-color": 'rgba(138,43,226,1)',
          // "line-width": 1.5
          "fill-color": 'rgba(138,43,226,1)',
          "fill-opacity" : 0.25
        },
        "filter": ["==", "$type", "Polygon"]  /* filter过滤器将type等于Polygon的数据显示在layer上 */
      });



    });
    map.on('click', (e) => {
      if (typeof this.valueTime != "object") {
        this.valueTime = new Date(this.valueTime);
      }
      dayOfMonth = this.valueTime.getDate();
      current_region_id = getCurrentGridIndex(e.lngLat.toArray(), grid_center_coordinates);
      document.getElementById('gridInfo').innerHTML = getMouseLngLat(e) + " grid id: " + current_region_id;

      let neighbor_ids = grid_data[current_region_id].neighbors.ids;
      let neighbor_data = new Array();
      let ids = new Array();
      for(let i=0;i<neighbor_ids.length;i++){

        console.log(grid_polygon_data[neighbor_ids[i]].center_coordinates);

        ids[i] = "g" + String(neighbor_ids[i]);
        neighbor_data[i] = grid_data[neighbor_ids[i]].properties.groundTruth.slice(288 * (dayOfMonth - 1), dayOfMonth * 288);
      }
      plotEchartsNeighbor(ids,neighbor_data);
      let data_neighbor_coordinates = new Array();
      for(let i=0;i<neighbor_ids.length;i++){
        data_neighbor_coordinates[i] = {                  /* geojson数据 */
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [grid_polygon_data[neighbor_ids[i]].coordinates],
          }
        }
      }
      map.getSource('grid_neighbors').setData({
        "type": "FeatureCollection",
        "features": data_neighbor_coordinates,
      });
      // var marker = new mapboxgl.Marker().setLngLat(center_coordinates).addTo(map);
    });
    let ids_init = [0, 65, 71, 51, 84, 44, 82];
    let center_coordinates = [-73.96496216710322, 40.76634771095223];
    var marker = new mapboxgl.Marker().setLngLat([-73.96,40.785]).addTo(map);

    // for(let i=0;i<ids_init.length;i++) {
    //   var marker = new mapboxgl.Marker()
    //     .setLngLat(grid_polygon_data[ids_init[i]].center_coordinates)
    //     // .setPopup(new mapboxgl.Popup().setHTML("<h3>"+ids_init[i]+"</h3>"))
    //     // .setPopup(new mapboxgl.Popup().setHTML("<h3>hello</h3>"))
    //     .addTo(map);
    // }


    this.initData();
    this.drawChart();
    let ids = ['g0', 'g65', 'g71', 'g51', 'g84', 'g44', 'g82'];
    let data_array = [[5.0, 6.0, 9.0, 3.0, 3.0, 6.0, 4.0, 5.0, 10.0, 6.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 6.0, 7.0, 9.0, 9.0, 11.0, 11.0, 13.0, 14.0, 16.0, 20.0, 21.0, 23.0, 29.0, 34.0, 40.0, 42.0, 43.0, 45.0, 39.0, 44.0, 45.0, 53.0, 53.0, 52.0, 57.0, 60.0, 65.0, 63.0, 63.0, 63.0, 64.0, 65.0, 65.0, 69.0, 68.0, 64.0, 64.0, 64.0, 63.0, 62.0, 57.0, 56.0, 56.0, 56.0, 54.0, 51.0, 51.0, 51.0, 51.0, 52.0, 52.0, 54.0, 53.0, 50.0, 49.0, 49.0, 48.0, 49.0, 48.0, 48.0, 49.0, 53.0, 53.0, 55.0, 54.0, 53.0, 49.0, 53.0, 54.0, 50.0, 52.0, 53.0, 53.0, 54.0, 56.0, 57.0, 60.0, 57.0, 58.0, 58.0, 59.0, 60.0, 60.0, 59.0, 59.0, 59.0, 59.0, 58.0, 56.0, 56.0, 55.0, 52.0, 53.0, 55.0, 53.0, 50.0, 51.0, 53.0, 56.0, 55.0, 54.0, 53.0, 53.0, 54.0, 53.0, 54.0, 53.0, 55.0, 56.0, 59.0, 61.0, 62.0, 63.0, 63.0, 63.0, 64.0, 65.0, 63.0, 61.0, 61.0, 63.0, 62.0, 64.0, 63.0, 61.0, 59.0, 58.0, 59.0, 59.0, 59.0, 55.0, 52.0, 51.0, 55.0, 51.0, 50.0, 54.0, 52.0, 55.0, 55.0, 55.0, 62.0, 63.0, 66.0, 70.0, 71.0, 66.0, 66.0, 64.0, 63.0, 65.0, 63.0, 66.0, 65.0, 61.0, 60.0, 56.0, 59.0, 62.0, 62.0, 63.0, 62.0, 57.0, 56.0, 53.0, 53.0, 54.0, 51.0, 52.0, 48.0, 49.0, 45.0, 44.0, 42.0, 42.0, 39.0, 41.0, 42.0, 42.0, 40.0, 37.0, 37.0, 36.0, 36.0, 36.0, 34.0, 33.0, 31.0, 31.0, 30.0, 31.0, 30.0, 31.0, 29.0, 25.0, 26.0, 26.0, 24.0, 24.0, 23.0, 22.0, 24.0, 23.0, 20.0, 19.0, 19.0, 17.0, 16.0, 15.0, 16.0, 16.0, 14.0, 14.0, 12.0, 11.0, 10.0, 9.0, 8.0, 9.0, 8.0, 8.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0, 5.0, 5.0, 5.0, 5.0, 6.0, 8.0, 8.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 9.0, 11.0, 9.0, 9.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 4.0, 5.0, 4.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 6.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 7.0, 6.0, 7.0, 7.0, 6.0, 6.0, 6.0, 5.0, 6.0, 5.0, 5.0, 5.0, 6.0, 5.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 6.0, 6.0, 6.0, 8.0, 8.0, 10.0, 10.0, 9.0, 8.0, 8.0, 9.0, 8.0, 8.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 6.0, 5.0, 5.0, 5.0, 5.0, 6.0, 6.0, 6.0, 7.0, 7.0, 7.0, 7.0, 8.0, 7.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 7.0, 8.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0],
      [1.0, 3.0, 3.0, 1.0, 3.0, 3.0, 3.0, 1.0, 2.0, 0.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 6.0, 6.0, 6.0, 7.0, 9.0, 9.0, 10.0, 8.0, 10.0, 10.0, 11.0, 13.0, 13.0, 15.0, 15.0, 15.0, 15.0, 14.0, 14.0, 13.0, 13.0, 13.0, 15.0, 14.0, 13.0, 13.0, 13.0, 13.0, 14.0, 13.0, 13.0, 12.0, 12.0, 12.0, 12.0, 11.0, 13.0, 13.0, 12.0, 13.0, 12.0, 12.0, 12.0, 13.0, 12.0, 11.0, 12.0, 11.0, 11.0, 12.0, 11.0, 11.0, 12.0, 11.0, 11.0, 11.0, 12.0, 12.0, 11.0, 12.0, 12.0, 12.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 12.0, 12.0, 12.0, 13.0, 12.0, 11.0, 12.0, 12.0, 13.0, 12.0, 11.0, 12.0, 12.0, 12.0, 13.0, 13.0, 13.0, 13.0, 12.0, 12.0, 13.0, 13.0, 13.0, 13.0, 12.0, 14.0, 13.0, 13.0, 13.0, 14.0, 14.0, 13.0, 13.0, 14.0, 13.0, 13.0, 12.0, 13.0, 13.0, 13.0, 12.0, 11.0, 11.0, 12.0, 12.0, 12.0, 15.0, 12.0, 12.0, 13.0, 13.0, 12.0, 13.0, 14.0, 13.0, 13.0, 13.0, 13.0, 13.0, 14.0, 15.0, 15.0, 15.0, 14.0, 15.0, 16.0, 16.0, 15.0, 15.0, 15.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 13.0, 15.0, 13.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 13.0, 13.0, 13.0, 12.0, 13.0, 12.0, 11.0, 12.0, 12.0, 12.0, 12.0, 15.0, 13.0, 12.0, 13.0, 12.0, 12.0, 11.0, 18.0, 20.0, 13.0, 14.0, 13.0, 20.0, 18.0, 17.0, 11.0, 12.0, 12.0, 12.0, 13.0, 18.0, 25.0, 16.0, 15.0, 14.0, 12.0, 11.0, 11.0, 9.0, 9.0, 9.0, 10.0, 7.0, 7.0, 7.0, 6.0, 5.0, 6.0, 6.0, 4.0, 4.0, 4.0],
      [3.0, 3.0, 0.0, 3.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 4.0, 5.0, 7.0, 8.0, 11.0, 12.0, 12.0, 11.0, 10.0, 12.0, 13.0, 14.0, 15.0, 17.0, 23.0, 24.0, 30.0, 29.0, 30.0, 29.0, 30.0, 28.0, 27.0, 28.0, 27.0, 26.0, 25.0, 25.0, 26.0, 27.0, 25.0, 25.0, 24.0, 24.0, 23.0, 22.0, 22.0, 21.0, 22.0, 21.0, 22.0, 21.0, 21.0, 21.0, 21.0, 22.0, 22.0, 22.0, 20.0, 22.0, 22.0, 24.0, 24.0, 24.0, 24.0, 23.0, 22.0, 23.0, 24.0, 23.0, 24.0, 25.0, 24.0, 26.0, 27.0, 28.0, 29.0, 28.0, 27.0, 27.0, 28.0, 27.0, 27.0, 25.0, 25.0, 27.0, 26.0, 27.0, 27.0, 24.0, 24.0, 24.0, 25.0, 25.0, 23.0, 24.0, 23.0, 24.0, 24.0, 26.0, 26.0, 25.0, 24.0, 25.0, 26.0, 26.0, 27.0, 26.0, 27.0, 27.0, 28.0, 28.0, 27.0, 26.0, 25.0, 25.0, 24.0, 24.0, 27.0, 26.0, 27.0, 25.0, 25.0, 23.0, 23.0, 22.0, 24.0, 23.0, 22.0, 22.0, 21.0, 20.0, 22.0, 21.0, 21.0, 21.0, 22.0, 22.0, 22.0, 23.0, 26.0, 27.0, 27.0, 26.0, 27.0, 28.0, 26.0, 29.0, 28.0, 28.0, 27.0, 26.0, 27.0, 28.0, 29.0, 28.0, 28.0, 29.0, 28.0, 28.0, 28.0, 29.0, 27.0, 28.0, 26.0, 26.0, 27.0, 26.0, 25.0, 24.0, 25.0, 26.0, 25.0, 22.0, 24.0, 24.0, 27.0, 25.0, 25.0, 26.0, 27.0, 27.0, 27.0, 27.0, 25.0, 26.0, 25.0, 24.0, 22.0, 21.0, 22.0, 23.0, 25.0, 23.0, 22.0, 19.0, 19.0, 16.0, 17.0, 16.0, 18.0, 19.0, 18.0, 16.0, 15.0, 14.0, 13.0, 13.0, 13.0, 13.0, 12.0, 10.0, 10.0, 8.0, 8.0, 8.0, 6.0, 5.0, 5.0, 4.0, 4.0],
      [10.0, 10.0, 10.0, 6.0, 8.0, 13.0, 3.0, 4.0, 5.0, 4.0, 5.0, 6.0, 5.0, 5.0, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 3.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 3.0, 3.0, 4.0, 4.0, 6.0, 8.0, 6.0, 6.0, 7.0, 11.0, 14.0, 19.0, 15.0, 17.0, 17.0, 23.0, 23.0, 24.0, 30.0, 33.0, 35.0, 41.0, 47.0, 56.0, 54.0, 54.0, 55.0, 54.0, 53.0, 50.0, 56.0, 53.0, 65.0, 72.0, 71.0, 68.0, 68.0, 70.0, 67.0, 70.0, 70.0, 72.0, 72.0, 67.0, 69.0, 65.0, 73.0, 75.0, 74.0, 65.0, 64.0, 62.0, 61.0, 58.0, 55.0, 52.0, 52.0, 52.0, 51.0, 51.0, 53.0, 50.0, 49.0, 48.0, 47.0, 46.0, 42.0, 44.0, 44.0, 45.0, 46.0, 47.0, 47.0, 48.0, 44.0, 41.0, 46.0, 44.0, 42.0, 41.0, 41.0, 40.0, 42.0, 45.0, 48.0, 46.0, 44.0, 47.0, 48.0, 48.0, 48.0, 50.0, 47.0, 46.0, 49.0, 49.0, 47.0, 48.0, 47.0, 45.0, 46.0, 48.0, 48.0, 45.0, 47.0, 43.0, 46.0, 44.0, 45.0, 43.0, 42.0, 44.0, 45.0, 44.0, 44.0, 45.0, 45.0, 46.0, 47.0, 51.0, 51.0, 51.0, 47.0, 49.0, 49.0, 49.0, 47.0, 55.0, 53.0, 54.0, 50.0, 47.0, 47.0, 46.0, 43.0, 44.0, 42.0, 40.0, 40.0, 38.0, 35.0, 37.0, 36.0, 36.0, 35.0, 37.0, 38.0, 38.0, 39.0, 41.0, 44.0, 47.0, 47.0, 48.0, 53.0, 50.0, 53.0, 51.0, 48.0, 48.0, 50.0, 54.0, 55.0, 54.0, 54.0, 58.0, 56.0, 52.0, 53.0, 50.0, 52.0, 51.0, 52.0, 50.0, 48.0, 51.0, 50.0, 51.0, 48.0, 47.0, 47.0, 47.0, 47.0, 46.0, 47.0, 47.0, 47.0, 46.0, 46.0, 43.0, 46.0, 44.0, 43.0, 44.0, 43.0, 44.0, 41.0, 41.0, 41.0, 50.0, 45.0, 44.0, 42.0, 44.0, 41.0, 43.0, 41.0, 40.0, 40.0, 41.0, 41.0, 37.0, 37.0, 37.0, 35.0, 35.0, 35.0, 34.0, 30.0, 31.0, 29.0, 29.0, 25.0, 22.0, 22.0, 22.0, 20.0, 18.0, 17.0, 18.0],
      [7.0, 5.0, 11.0, 4.0, 8.0, 2.0, 9.0, 5.0, 7.0, 1.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 4.0, 4.0, 5.0, 5.0, 6.0, 7.0, 9.0, 12.0, 11.0, 14.0, 11.0, 15.0, 13.0, 16.0, 20.0, 22.0, 25.0, 28.0, 34.0, 37.0, 37.0, 37.0, 37.0, 37.0, 39.0, 41.0, 51.0, 49.0, 49.0, 48.0, 50.0, 49.0, 44.0, 44.0, 40.0, 42.0, 41.0, 41.0, 42.0, 40.0, 39.0, 38.0, 39.0, 39.0, 37.0, 37.0, 35.0, 33.0, 32.0, 35.0, 33.0, 32.0, 33.0, 32.0, 33.0, 33.0, 34.0, 32.0, 31.0, 29.0, 29.0, 29.0, 27.0, 28.0, 27.0, 27.0, 27.0, 28.0, 28.0, 27.0, 27.0, 25.0, 26.0, 24.0, 23.0, 24.0, 25.0, 25.0, 26.0, 26.0, 28.0, 27.0, 27.0, 27.0, 27.0, 27.0, 26.0, 27.0, 26.0, 26.0, 26.0, 26.0, 25.0, 25.0, 24.0, 24.0, 24.0, 25.0, 24.0, 23.0, 22.0, 23.0, 24.0, 24.0, 24.0, 24.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 24.0, 24.0, 25.0, 25.0, 27.0, 28.0, 27.0, 29.0, 28.0, 26.0, 27.0, 27.0, 27.0, 26.0, 27.0, 25.0, 24.0, 23.0, 23.0, 22.0, 22.0, 22.0, 21.0, 21.0, 21.0, 20.0, 20.0, 20.0, 23.0, 23.0, 23.0, 25.0, 26.0, 28.0, 30.0, 31.0, 30.0, 32.0, 33.0, 32.0, 33.0, 31.0, 31.0, 32.0, 32.0, 31.0, 33.0, 31.0, 30.0, 32.0, 32.0, 31.0, 31.0, 30.0, 28.0, 30.0, 30.0, 29.0, 30.0, 29.0, 27.0, 26.0, 26.0, 27.0, 27.0, 25.0, 24.0, 24.0, 27.0, 25.0, 24.0, 24.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 23.0, 22.0, 22.0, 22.0, 22.0, 23.0, 21.0, 21.0, 20.0, 21.0, 21.0, 20.0, 20.0, 19.0, 20.0, 20.0, 20.0, 18.0, 18.0, 18.0, 18.0, 16.0, 16.0, 16.0, 16.0, 15.0, 15.0, 14.0, 13.0, 13.0, 13.0, 12.0, 11.0, 11.0, 10.0],
      [3.0, 3.0, 1.0, 8.0, 1.0, 0.0, 3.0, 4.0, 0.0, 5.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 5.0, 7.0, 7.0, 8.0, 9.0, 9.0, 9.0, 10.0, 11.0, 14.0, 16.0, 18.0, 18.0, 22.0, 28.0, 31.0, 32.0, 33.0, 31.0, 28.0, 28.0, 27.0, 33.0, 35.0, 35.0, 40.0, 43.0, 44.0, 44.0, 45.0, 45.0, 45.0, 47.0, 47.0, 48.0, 46.0, 41.0, 37.0, 39.0, 38.0, 40.0, 34.0, 32.0, 31.0, 34.0, 34.0, 31.0, 30.0, 30.0, 27.0, 29.0, 28.0, 28.0, 27.0, 25.0, 24.0, 24.0, 23.0, 22.0, 22.0, 22.0, 24.0, 24.0, 25.0, 25.0, 25.0, 25.0, 23.0, 24.0, 23.0, 23.0, 23.0, 23.0, 23.0, 24.0, 26.0, 27.0, 27.0, 26.0, 26.0, 26.0, 27.0, 28.0, 29.0, 28.0, 26.0, 26.0, 25.0, 25.0, 25.0, 24.0, 23.0, 22.0, 23.0, 22.0, 21.0, 22.0, 22.0, 21.0, 21.0, 22.0, 22.0, 22.0, 21.0, 23.0, 23.0, 23.0, 23.0, 23.0, 24.0, 25.0, 26.0, 26.0, 26.0, 28.0, 28.0, 28.0, 30.0, 30.0, 31.0, 32.0, 33.0, 30.0, 29.0, 27.0, 27.0, 24.0, 23.0, 22.0, 22.0, 23.0, 22.0, 21.0, 21.0, 20.0, 20.0, 19.0, 22.0, 22.0, 23.0, 23.0, 24.0, 25.0, 26.0, 28.0, 28.0, 29.0, 30.0, 33.0, 32.0, 29.0, 28.0, 29.0, 29.0, 28.0, 28.0, 28.0, 28.0, 28.0, 27.0, 25.0, 24.0, 24.0, 24.0, 27.0, 27.0, 25.0, 24.0, 24.0, 24.0, 22.0, 22.0, 25.0, 23.0, 22.0, 20.0, 22.0, 21.0, 21.0, 21.0, 18.0, 18.0, 18.0, 19.0, 17.0, 18.0, 18.0, 18.0, 18.0, 19.0, 18.0, 19.0, 18.0, 16.0, 16.0, 16.0, 17.0, 16.0, 15.0, 15.0, 14.0, 13.0, 13.0, 14.0, 12.0, 11.0, 10.0, 10.0, 9.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 7.0, 7.0, 6.0, 6.0, 5.0, 5.0, 5.0]];
    plotEchartsNeighbor(ids,data_array);

  },
  data() {
    return {
      dialogVisible:false,
      dialogVisibleWorking:false,
      dialogVisibleHolidays:false,
      checked: true,
      pickupSelect:true,
      dropoffSelect:true,
      valueSlider:8,
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
        24:'24',
      },
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

/deep/ .el-slider__marks-text{
  color: #3a8ee6;
  font-size: 12px;
}

/deep/ .el-dialog__body{
  padding: 0;
}

/deep/ .el-dialog__title{
  font-size: 24px;
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
  position: absolute;
  width: 400px;
  top: 120px;
  right:5px;
}
.numberBoard{
  background: rgba(251,103,103,.5);
  text-align: left;
  color: #fff;
  margin: 10px 10px 0 10px;
  padding: 0px 30px 0px 10px;
  font-size: 22px;
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
  font-size: 22px;
  line-height: 40px;
  font-weight: 700;
  border-left: 12px solid #64bfff;
  text-shadow: 1px 1px 1px #000,1px 1px 1px #fff;
}
</style>
