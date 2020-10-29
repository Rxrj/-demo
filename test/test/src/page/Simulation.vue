<template>
    <el-container style="height: 100%;background-color: #252525">
      <el-header style="padding: 0">
        <Header/>
      </el-header>
      <el-container style="height: 100%">
        <el-aside style="padding-top: 20px">
          <Slider/>
        </el-aside>
        <el-main style="padding: 0;margin: 0">
          <div id="map">
            <el-slider
              v-model="value2"
              max="24"
              :step="1"
              show-stops>
            </el-slider>
            <div class="Evaluation" style="text-align: right">
              <div style="color: #eeeeee; font-weight: bold">Search Time：416.317s</div>
              <div style="color: #eeeeee; font-weight: bold">Waiting Time：61.833s</div>
              <div style="color: #eeeeee; font-weight: bold">Expiration Percentage：14.411%</div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
import Header from "../components/Header";
import Slider from "../components/Slider";
import map from "../components/map";
import echarts from 'echarts'
import '@/assets/css/all.css'
const mapboxgl = require('mapbox-gl');
export default {
  name: "Simulation",
  components: {Slider, Header},
  mounted() {
    this.initmap();
  },
  methods:{
    initmap(){
      mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
      var map = new mapboxgl.Map({
        container: 'map', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.97,40.75], // 初始坐标系，这个是南京建邺附近
        zoom: 12,     // starting zoom 地图初始的拉伸比例
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
      map.on('load', function () {
// Add a source and layer displaying a point which will be animated in a circle.
        map.addSource('point', {
          "type": "geojson",
          "data": pointOnCircle(0)
        });
        map.addLayer({
          "id": "point",
          "source": "point",
          "type": "circle",
          "paint": {
            "circle-radius": 5,
            "circle-color": "#007cbf"
          }
        });
        var i = 0;
        var timer = window.setInterval(function() {
          map.getSource('point').setData(pointOnCircle(i));
          i++;
        }, 100);
      })
    }
  },

}
</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
#map{
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  width: auto;
  height: 95%;
  z-index: 0;
}
.el-slider{
  padding: 20px;
  margin: 0;
  position: fixed;
  z-index: 1000;
  width: 500px;
  bottom: 10px;
  left: 900px;
}
.Evaluation{
  position: fixed;
  right:100px;
  top:100px;
  font-size: 20px;
  font-weight: 700;
  line-height: 50px;
}

</style>
