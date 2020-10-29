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
        center: [-73.97,40.75],
        zoom: 12,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      function pointOnCircle(i) {
        return {
          "type": "Point",
          "coordinates": [
            -73.98 + 0.0001 * i,
            40.75 + 0.0001 * i
          ]
        };
      }
      map.on('load', function () {
        map.addSource("regions", {
          "type": "geojson",           /* geojson类型资源 */
          "data": {                    /* geojson数据 */
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-73.9570868799842, 40.78418956539499],
                    [-73.96347129174404, 40.783136890661766],
                    [-73.96544002797853, 40.77867605891164],
                    [-73.96102526311755, 40.77526823378264],
                    [-73.95464187881434, 40.776320688988555],
                    [-73.95267223202801, 40.78078118882081],
                    [-73.9570868799842, 40.78418956539499]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [[
                  [-73.97824871666947, 40.72281094762265],
                  [-73.98462442013124, 40.7217577544381],
                  [-73.98658861001985, 40.71729990459654],
                  [-73.98217800523803, 40.71389557913704],
                  [-73.97580332622488, 40.71494855254655],
                  [-73.97383822765691, 40.71940607116063],
                  [-73.97824871666947, 40.72281094762265]
                ]]
              }
            }]
          }
        });

        map.addLayer({
          "id": "regions",
          "type": "fill",           /* fill类型一般用来表示一个面，一般较大 */
          "source": "regions",
          "paint": {
            "fill-color": "#FFC1C1", /* 填充的颜色 */
            "fill-opacity": 0.4      /* 透明度 */
          },
          "filter": ["==", "$type", "Polygon"]  /* filter过滤器将type等于Polygon的数据显示在layer上 */
        });

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
          if(i>200){
            map.setLayoutProperty('point', 'visibility', 'none');
            map.setLayoutProperty('regions', 'visibility', 'none');
          }
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
