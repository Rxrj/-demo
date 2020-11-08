<template>
  <el-container style="height: 100%;background-color: #252525">
    <el-header style="padding: 0">
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
const mapboxgl = require('mapbox-gl');
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
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
    window.map1 = new mapboxgl.Map({
      container: 'map1', // container id 绑定的组件的id
      style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [-73.96,40.78], // 初始坐标系
      zoom: 11,     // starting zoom 地图初始的拉伸比例
      antialias: true, //抗锯齿，通过false关闭提升性能
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


      map1.addSource('pickup_grid',{
        "type":"geojson",
        // "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_groundTruth/grid_0.geojson"
        "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_groundTruth/grid_0.geojson"
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
          "fill-opacity" : 0.95
        }
      });

      var index=0;
      var timer = window.setInterval(function() {
        if(index < 8639){
          index++;
          map1.getSource('pickup_grid').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_groundTruth/grid_" + String(index) + ".geojson");
          map2.getSource('pickup_grid_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_pred/grid_" + String(index) + ".geojson");
        }else {
          //移除添加的source和layer
          map1.removeLayer('pickup_grid');
          map1.removeSource('pickup_grid');
          map2.removeLayer('pickup_grid_pred');
          map2.removeSource('pickup_grid_pred');
          window.clearInterval(timer);
        }
      }, 1000);


      map1.addSource('pickup_intersection',{
        "type":"geojson",
        "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_0.geojson"
      });
      map1.addLayer({
        "id":"pickup_intersection",
        "type":"heatmap",
        "source":"pickup_intersection",
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

          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": [
            "interpolate", ["linear"],
            ["zoom"],
            0, 1,
            30, 1,
          ],
        },
      });

      var index=0;
      var timer = window.setInterval(function() {
        if(index < 1439){
          index++;
          map1.getSource('pickup_intersection').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_groundTruth/intersection_" + String(index) + ".geojson");
          map2.getSource('pickup_intersection_pred').setData("https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_pred/intersection_" + String(index) + ".geojson");
        }else {
          window.clearInterval(timer);
        }
      }, 1000);


      map1.setLayoutProperty('pickup_grid','visibility','none');
      map1.setLayoutProperty('pickup_intersection','visibility','none');

    });
    window.map2 = new mapboxgl.Map({
      container: 'map2', // container id 绑定的组件的id
      style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [-73.96,40.78], // 初始坐标系
      zoom: 11,     // starting zoom 地图初始的拉伸比例
      antialias: true, //抗锯齿，通过false关闭提升性能
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

      map2.addSource('pickup_grid_pred',{
        "type":"geojson",
        "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/grid_polygon_pred/grid_0.geojson"
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
          "fill-opacity" : 0.95
        }
      });

      map2.addSource('pickup_intersection_pred',{
        "type":"geojson",
        "data":"https://raw.githubusercontent.com/fengzi258/SOUP_data/main/intersection_pred/intersection_0.geojson"
      });

      map2.addLayer({
        "id":"pickup_intersection_pred",
        "type":"heatmap",
        "source":"pickup_intersection_pred",
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

          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": [
            "interpolate", ["linear"],
            ["zoom"],
            0, 1,
            30, 1,
          ],
        },
      });

      map2.setLayoutProperty('pickup_grid_pred','visibility','none');
      map2.setLayoutProperty('pickup_intersection_pred','visibility','none');

    });



    var charts1 = echarts.init(document.getElementById('charts1'));
    var data = [{"name":1596038400000,"value":[1596038400000,53]},{"name":1596039040000,"value":[1596039040000,51]},{"name":1596039680000,"value":[1596039680000,51]},{"name":1596040320000,"value":[1596040320000,51]},{"name":1596040832000,"value":[1596040832000,58]},{"name":1596041472000,"value":[1596041472000,67]},{"name":1596042112000,"value":[1596042112000,68]},{"name":1596042624000,"value":[1596042624000,54]},{"name":1596043264000,"value":[1596043264000,51]},{"name":1596043904000,"value":[1596043904000,57]},{"name":1596044416000,"value":[1596044416000,52]},{"name":1596045056000,"value":[1596045056000,54]},{"name":1596045696000,"value":[1596045696000,51]},{"name":1596046208000,"value":[1596046208000,51]},{"name":1596046848000,"value":[1596046848000,52]},{"name":1596047488000,"value":[1596047488000,51]},{"name":1596048000000,"value":[1596048000000,53]},{"name":1596048640000,"value":[1596048640000,52]},{"name":1596049280000,"value":[1596049280000,67]},{"name":1596049920000,"value":[1596049920000,59]},{"name":1596050432000,"value":[1596050432000,58]},{"name":1596051072000,"value":[1596051072000,52]},{"name":1596051712000,"value":[1596051712000,55]},{"name":1596052224000,"value":[1596052224000,53]},{"name":1596052864000,"value":[1596052864000,54]},{"name":1596053504000,"value":[1596053504000,54]},{"name":1596054016000,"value":[1596054016000,54]},{"name":1596054656000,"value":[1596054656000,52]},{"name":1596055296000,"value":[1596055296000,54]},{"name":1596055808000,"value":[1596055808000,65]},{"name":1596056448000,"value":[1596056448000,59]},{"name":1596057088000,"value":[1596057088000,55]},{"name":1596057600000,"value":[1596057600000,53]},{"name":1596058240000,"value":[1596058240000,55]},{"name":1596058880000,"value":[1596058880000,54]},{"name":1596059520000,"value":[1596059520000,55]},{"name":1596060032000,"value":[1596060032000,64]},{"name":1596060672000,"value":[1596060672000,57]},{"name":1596061312000,"value":[1596061312000,56]},{"name":1596061824000,"value":[1596061824000,55]},{"name":1596062464000,"value":[1596062464000,55]},{"name":1596063104000,"value":[1596063104000,55]},{"name":1596063616000,"value":[1596063616000,58]},{"name":1596064256000,"value":[1596064256000,79]},{"name":1596064896000,"value":[1596064896000,60]},{"name":1596065408000,"value":[1596065408000,63]},{"name":1596066048000,"value":[1596066048000,63]},{"name":1596066688000,"value":[1596066688000,82]},{"name":1596067200000,"value":[1596067200000,81]},{"name":1596067840000,"value":[1596067840000,78]},{"name":1596068480000,"value":[1596068480000,78]},{"name":1596069120000,"value":[1596069120000,65]},{"name":1596069632000,"value":[1596069632000,76]},{"name":1596070272000,"value":[1596070272000,80]},{"name":1596070912000,"value":[1596070912000,78]},{"name":1596107040000,"value":[1596107040000,70]},{"name":1596124799000,"value":[1596124799000,0]}];

    var option = {
      legend:{},
      grid:{
        left:50
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          var hour = date.getHours();
          var minutes = date.getMinutes();
          if(hour < 10){
            hour = '0' + hour;
          }
          if(minutes < 10){
            minutes = '0' + minutes;
          }
          var dateStr = hour + ':' + minutes;
          return dateStr + ' ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        },
        splitNumber:8,
        axisLine:{
          lineStyle:{
            color: '#eeeeee'
          }
        },
        axisLabel:{
          formatter:function(value,index){
            var date = new Date(value);
            var hour = date.getHours();
            var minutes = date.getMinutes();
            if(hour < 10){
              hour = '0' + hour;
            }
            if(minutes < 10){
              minutes = '0' + minutes;
            }
            return hour + ':' + minutes;
          },
          color:'#eeeeee'
        }
      },
      yAxis: {
        name:'Pick Up',
        nameTextStyle:{
          color: '#eeeeee',
          fontSize:15
        },
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        axisLine:{
          lineStyle:{
            color: '#eeeeee'
          }
        },
        axisLabel:{
          color:'#eeeeee'
        }
      },
      series: [{
        name: '',
        type: 'line',
        color:['#eeeeee'],
        hoverAnimation: false,
        smooth: true,
        symbolSize: 4,
        data: data

      }]
    };


    // 使用刚指定的配置项和数据显示图表。
    charts1.setOption(option);
    var charts2 = echarts.init(document.getElementById('charts2'));
    var data = [{"name":1596038400000,"value":[1596038400000,53]},{"name":1596039040000,"value":[1596039040000,51]},{"name":1596039680000,"value":[1596039680000,51]},{"name":1596040320000,"value":[1596040320000,51]},{"name":1596040832000,"value":[1596040832000,58]},{"name":1596041472000,"value":[1596041472000,67]},{"name":1596042112000,"value":[1596042112000,68]},{"name":1596042624000,"value":[1596042624000,54]},{"name":1596043264000,"value":[1596043264000,51]},{"name":1596043904000,"value":[1596043904000,57]},{"name":1596044416000,"value":[1596044416000,52]},{"name":1596045056000,"value":[1596045056000,54]},{"name":1596045696000,"value":[1596045696000,51]},{"name":1596046208000,"value":[1596046208000,51]},{"name":1596046848000,"value":[1596046848000,52]},{"name":1596047488000,"value":[1596047488000,51]},{"name":1596048000000,"value":[1596048000000,53]},{"name":1596048640000,"value":[1596048640000,52]},{"name":1596049280000,"value":[1596049280000,67]},{"name":1596049920000,"value":[1596049920000,59]},{"name":1596050432000,"value":[1596050432000,58]},{"name":1596051072000,"value":[1596051072000,52]},{"name":1596051712000,"value":[1596051712000,55]},{"name":1596052224000,"value":[1596052224000,53]},{"name":1596052864000,"value":[1596052864000,54]},{"name":1596053504000,"value":[1596053504000,54]},{"name":1596054016000,"value":[1596054016000,54]},{"name":1596054656000,"value":[1596054656000,52]},{"name":1596055296000,"value":[1596055296000,54]},{"name":1596055808000,"value":[1596055808000,65]},{"name":1596056448000,"value":[1596056448000,59]},{"name":1596057088000,"value":[1596057088000,55]},{"name":1596057600000,"value":[1596057600000,53]},{"name":1596058240000,"value":[1596058240000,55]},{"name":1596058880000,"value":[1596058880000,54]},{"name":1596059520000,"value":[1596059520000,55]},{"name":1596060032000,"value":[1596060032000,64]},{"name":1596060672000,"value":[1596060672000,57]},{"name":1596061312000,"value":[1596061312000,56]},{"name":1596061824000,"value":[1596061824000,55]},{"name":1596062464000,"value":[1596062464000,55]},{"name":1596063104000,"value":[1596063104000,55]},{"name":1596063616000,"value":[1596063616000,58]},{"name":1596064256000,"value":[1596064256000,79]},{"name":1596064896000,"value":[1596064896000,60]},{"name":1596065408000,"value":[1596065408000,63]},{"name":1596066048000,"value":[1596066048000,63]},{"name":1596066688000,"value":[1596066688000,82]},{"name":1596067200000,"value":[1596067200000,81]},{"name":1596067840000,"value":[1596067840000,78]},{"name":1596068480000,"value":[1596068480000,78]},{"name":1596069120000,"value":[1596069120000,65]},{"name":1596069632000,"value":[1596069632000,76]},{"name":1596070272000,"value":[1596070272000,80]},{"name":1596070912000,"value":[1596070912000,78]},{"name":1596107040000,"value":[1596107040000,70]},{"name":1596124799000,"value":[1596124799000,0]}];

    var option = {
      legend:{},
      grid:{
        left:50
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          var hour = date.getHours();
          var minutes = date.getMinutes();
          if(hour < 10){
            hour = '0' + hour;
          }
          if(minutes < 10){
            minutes = '0' + minutes;
          }
          var dateStr = hour + ':' + minutes;
          return dateStr + ' ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        },
        splitNumber:8,
        axisLine:{
          lineStyle:{
            color: '#eeeeee'
          }
        },
        axisLabel:{
          formatter:function(value,index){
            var date = new Date(value);
            var hour = date.getHours();
            var minutes = date.getMinutes();
            if(hour < 10){
              hour = '0' + hour;
            }
            if(minutes < 10){
              minutes = '0' + minutes;
            }
            return hour + ':' + minutes;
          },
          color:'#eeeeee'
        }
      },
      yAxis: {
        name:'Drop Off',
        nameTextStyle:{
          color: '#eeeeee',
          fontSize:15
        },
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        axisLine:{
          lineStyle:{
            color: '#eeeeee'
          }
        },
        axisLabel:{
          color:'#eeeeee'
        }
      },
      series: [{
        name: '',
        type: 'line',
        color:['#eeeeee'],
        hoverAnimation: false,
        smooth: true,
        symbolSize: 4,
        data: data

      }]
    };


    // 使用刚指定的配置项和数据显示图表。
    charts2.setOption(option);
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

/*.heatmapIcon{*/
/*  position: fixed;*/
/*  left:35px;*/
/*  top:500px;*/
/*  font-size: 22px;*/
/*  font-weight: 700;*/
/*  line-height: 50px;*/

/*  padding:10px;*/
/*  border-radius: 10px;*/
/*  box-shadow: 0 2px 5px black;*/
/*  width: 11%;*/

/*  !*padding-top: 70px;*!*/
/*  !*position: absolute;*!*/
/*  !*width: 100%;*!*/
/*  !*top:10px;*!*/
/*  !*left:0px;*!*/
/*  !*bottom: 0;*!*/
/*  !*text-align: center;*!*/
/*}*/

.charts{
  border-radius: 10px;
  box-shadow: 0 2px 5px black;
  margin-left: 40px;
  margin-bottom: 23px;
}

</style>
