<template>
    <el-container style="height: 100%;background-color: #252525">
      <el-header style="padding: 0">
        <Header/>
      </el-header>
      <el-container style="height: 100%;background-color: #252525">
        <el-aside style="padding-top: 90px">
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
            <br>
            <el-select v-model="value" placeholder="Taxi Number">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="font-size: 22px;width: 220px">
              </el-option>
            </el-select>
            <br>
            <div>
              <el-checkbox v-model="checked" style="padding-top: 20px;margin-left: 0px;font-size: 20px;font-weight: 700" @change="handleChange"><div>Partition Visible</div></el-checkbox>
              <br>
            </div>
            <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Run</el-button>
          </div>
        </el-aside>
        <el-main style="padding-top: 70px;margin: 0">
          <el-row style="height: 100%;margin: 0;padding: 0">
            <el-col :span="15" style="height: 100%;margin: 0;padding: 0">
              <div id="map" style="border-radius: 10px;box-shadow: 0 2px 5px black">
                <el-slider
                  v-model="value2"
                  max="24"
                  :step="1"
                  style="left:570px"
                  show-stops>
                </el-slider>
                <div style="right:500px;top:50px;font-size:22px;font-weight:700;position: absolute;width: 500px;color: #eeeeee" id="currentTimeSim">Date Time: 2016-6-1 8:00</div>
                <div style="bottom:200px;right:720px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
                  <div style="background-color:#FF0000;bottom:10px;right:150px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px" id="taxis"></div>
                  Idle Taxis:   40
                </div>
                <div style="bottom:150px;right:635px;font-size:22px;font-weight:700;position: absolute;color: #eeeeee">
                  <div style="background-color:#007cbf;bottom:10px;right:235px;font-size:22px;font-weight:700;position: absolute;width: 10px;height: 10px" id="requests"></div>
                   Waiting Requests:   40
                </div>
                <div class="Evaluation" style="text-align: right">
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Search Time<br/><div class="font" id="searchTimeNumber">416.317s</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Waiting Time<br/><div class="font" id="waitingTimeNumber">61.833s</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Expiration Percentage<br/><div class="font" id="expirationNumber">14.411%</div></div>
                </div>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="charts" id="charts1" style="width: auto;height: 235px"></div>
              <div class="charts" id="charts2" style="width: auto;height: 235px"></div>
              <div class="charts" id="charts3" style="width: auto;height: 235px"></div>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
var DROP_expiration;
var DROP_search;
var DROP_wait;
var RD_expiration;
var RD_search;
var RD_wait;
import Header from "../components/Header";
import echarts from 'echarts'
import '@/assets/css/all.css'
const mapboxgl = require('mapbox-gl');

export default {
  name: "Simulation",
  components: {Header},
  methods:{
    handleChange(){
      var check = this.checked;
      if(!check){
        map.setLayoutProperty('regions', 'visibility', 'none');
      }
      else{
        map.setLayoutProperty('regions', 'visibility', 'visible');
      }
    },
    initTreeData:function (){
      let url1 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/DROP_expiration.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      let request1 = new XMLHttpRequest();
      request1.open("get", url1);/*设置请求方法与路径*/
      request1.send(null);/*不发送数据到服务器*/
      request1.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request1.status == 200) {/*返回状态为200，即为数据获取成功*/
          DROP_expiration = JSON.parse(request1.responseText).expirationPercentage.slice(0,288);
        }
      };
      var url2 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/DROP_search.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request2 = new XMLHttpRequest();
      request2.open("get", url2);/*设置请求方法与路径*/
      request2.send(null);/*不发送数据到服务器*/
      request2.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request2.status == 200) {/*返回状态为200，即为数据获取成功*/
          DROP_search = JSON.parse(request2.responseText).searchTime.slice(0,288);
        }
      };

      var url3 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/DROP_wait.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request3 = new XMLHttpRequest();
      request3.open("get", url3);/*设置请求方法与路径*/
      request3.send(null);/*不发送数据到服务器*/
      request3.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request3.status == 200) {/*返回状态为200，即为数据获取成功*/
          DROP_wait = JSON.parse(request3.responseText).waitTime.slice(0,288);
        }
      };

      var url4 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/RD_expiration.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request4 = new XMLHttpRequest();
      request4.open("get", url4);/*设置请求方法与路径*/
      request4.send(null);/*不发送数据到服务器*/
      request4.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request4.status == 200) {/*返回状态为200，即为数据获取成功*/
          RD_expiration = JSON.parse(request4.responseText).expirationPrcentage.slice(0,288);
        }
      };

      var url5 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/RD_search.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request5 = new XMLHttpRequest();
      request5.open("get", url5);/*设置请求方法与路径*/
      request5.send(null);/*不发送数据到服务器*/
      request5.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request5.status == 200) {/*返回状态为200，即为数据获取成功*/
          RD_search = JSON.parse(request5.responseText).searchTime.slice(0,288);
        }
      };

      var url6 = "https://raw.githubusercontent.com/Rxrj/SOUP-data/main/RD_wait.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request6 = new XMLHttpRequest();
      request6.open("get", url6);/*设置请求方法与路径*/
      request6.send(null);/*不发送数据到服务器*/
      request6.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request6.status == 200) {/*返回状态为200，即为数据获取成功*/
          RD_wait = JSON.parse(request6.responseText).waitTime.slice(0,288);
        }
      };
      //alert("Loading Data Succeed");
    },
    drawCharts(){
      window.charts1 = echarts.init(document.getElementById('charts1'));
      charts1.setOption({
        title:{
          text:'Search Time',
          left:'center',
          textStyle:{
            color:['#eeeeee']
          }
        },
        legend: {
          data: ['DROP', 'RD'],
          padding:[40,0,0,0],
          textStyle:{
            color:['#eeeeee']
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type:'shadow'
          }
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
            start: 20,
            end: 60,
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
        xAxis: [
          {
            type: 'category',
            data: ['08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00'],
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
            name:'(s)',
            nameTextStyle:{
              color: '#eeeeee',
              fontSize:15
            },
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
            name: 'DROP',
            type: 'line',
            data: DROP_search,
            color:['#FF0000']
          },
          {
            name: 'RD',
            type: 'line',
            data: RD_search,
            color:['#007cbf']
          }]
      });

      var charts2 = echarts.init(document.getElementById('charts2'));
      var data2 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',35]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',65]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',60]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',20]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',25]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',65]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',55]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',68]}];
      var data22 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',12]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',8]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',14]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',2]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',5]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',12]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',9]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',13]}];

      var option = {
        title:{
          text:'Waiting Time',
          left:'center',
          textStyle:{
            color:['#eeeeee']
          }
        },
        legend: {
          data: ['DROP', 'RD'],
          padding:[40,0,0,0],
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
            start: 5,
            end: 95,
          },
          {
            type: 'slider',
            yAxisIndex: [0],
            show: true,
            realtime: true,
            start: 60,
            end: 100,
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type:'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00'],
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
            name:'(s)',
            nameTextStyle:{
              color: '#eeeeee',
              fontSize:15
            },
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
            name: 'DROP',
            type: 'line',
            data: DROP_wait,
            color:['#FF0000']
          },
          {
            name: 'RD',
            type: 'line',
            data: RD_wait,
            color:['#007cbf']
          }]
      };


      // 使用刚指定的配置项和数据显示图表。
      charts2.setOption(option);
      var charts3 = echarts.init(document.getElementById('charts3'));

      var option = {
        title:{
          text:'Expiration Percentage',
          left:'center',
          textStyle:{
            color:['#eeeeee']
          }
        },
        legend: {
          data: ['DROP', 'RD'],
          padding:[40,0,0,0],
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
            start: 5,
            end: 95,
          },
          {
            type: 'slider',
            yAxisIndex: [0],
            show: true,
            realtime: true,
            start: 0,
            end: 100,
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type:'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00'],
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
            name:'(%)',
            nameTextStyle:{
              color: '#eeeeee',
              fontSize:15
            },
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
            name: 'DROP',
            type: 'line',
            data: DROP_expiration,
            color:['#FF0000']
          },
          {
            name: 'RD',
            type: 'line',
            data: RD_expiration,
            color:['#007cbf']
          }]
      };


      // 使用刚指定的配置项和数据显示图表。
      charts3.setOption(option);
    }
  },
  mounted() {
    this.initTreeData();
    mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
    window.map = new mapboxgl.Map({
      container: 'map', // container id 绑定的组件的id
      style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [-73.96,40.785], // 初始坐标系
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
      map.addSource('resources', {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/resource/resources_0.geojson"
      });

      map.addSource('agents', {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/agent/agents_0.geojson"
      });

      map.addLayer({
        "id": "resources",
        "source": "resources",
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#007cbf"
        }
      });

      map.addLayer({
        "id": "agents",
        "source": "agents",
        "type": "circle",
        "paint": {
          "circle-radius": 3,
          "circle-color": "#FF0000"
        }
      });

      var index=0;
      var index2 = 0;
      var date = new Date(2016,6,1,8,0);//注意月份是0-11，1月为0，12月为11
      var timer = window.setInterval(function() {
        if(index < 1680){
          index++;
          map.getSource('resources').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/resource/resources_" + String(index) +
            ".geojson");
          map.getSource('agents').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/agent/agents_" + String(index) + ".geojson");
          var sec=date.getSeconds();
          date.setSeconds(sec+30);
          var h=date.getHours();//获取时
          var m=date.getMinutes();//获取分
          if(m < 10)
          {
            document.getElementById("currentTimeSim").innerHTML =  "Date Time: 2016-6-1 "+h+":0"+m;
          }
          else
          {
            document.getElementById("currentTimeSim").innerHTML =  "Date Time: 2016-6-1 "+h+":"+m;
          }
          if((index+1)%10 == 0)
          {
            document.getElementById("searchTimeNumber").innerHTML= DROP_search[index2].toFixed(3) + "s";
            document.getElementById("waitingTimeNumber").innerHTML= DROP_wait[index2].toFixed(3) + "s";
            document.getElementById("expirationNumber").innerHTML= DROP_expiration[index2].toFixed(3) + "%";
            index2++;
          }
        }else {
          window.clearInterval(timer);
        }
      }, 500);


    });

    this.drawCharts();

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
      value: '4000',
      options: [{
        value: '选项1',
        label: '4000'
      }, {
        value: '选项2',
        label: '5000'
      }, {
        value: '选项3',
        label: '6000'
      }],
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
  font-size: 22px;
  width: 220px;
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
  bottom: 50px;
  left: 600px;
}
.Evaluation{
  position: fixed;
  left:20px;
  top:400px;
  font-size: 22px;
  font-weight: 700;
  line-height: 50px;

  padding:10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px black
}

.font{
  font-size: 35px;
  color: #409EFF;
}

.Numbers{
  position: fixed;
  left:40px;
  top:670px;
  font-size: 22px;
  font-weight: 700;
  line-height: 50px;

  padding:10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px black
}


.charts{
  border-radius: 10px;
  box-shadow: 0 2px 5px black;
  margin-left: 40px;
  margin-bottom: 23px;
}

</style>
