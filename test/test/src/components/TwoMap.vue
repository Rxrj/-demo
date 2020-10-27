<template>
  <el-container style="height: 100%; margin: 0; padding: 0;">
        <el-col :span="12" >
          <div id="map1">
            <div class="label1">the real situation</div>
          </div></el-col>
        <el-col :span="12">
          <div id="map2" style="border-left: 2px solid black">
            <div class="label2">the prediction</div>
          </div>
        </el-col>
  </el-container>
</template>

<script>
const mapboxgl = require('mapbox-gl');
export default {
  name: "TwoMap",
  mounted() {
    this.initmap();
  },
  methods:{
    initmap(){
      mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
      var map1 = new mapboxgl.Map({
        container: 'map1', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/streets-v11', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-120, 50], // 初始坐标系，这个是南京建邺附近
        zoom: 2,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
      map1.on('load',function (){
        map1.addSource('earthquakes',{
          "type": "geojson",
          "data": "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        });
        map1.addLayer({
          "id": "earthquakes-heat",
          "type": "heatmap",
          "source": "earthquakes",
          "maxzoom": 9,
          "paint": {
// Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0, 0,
              6, 1
            ],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 1,
              9, 3
            ],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.2, "rgb(103,169,207)",
              0.4, "rgb(209,229,240)",
              0.6, "rgb(253,219,199)",
              0.8, "rgb(239,138,98)",
              1, "rgb(178,24,43)"
            ],
// Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 2,
              9, 20
            ],
// Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, 1,
              9, 0
            ],
          }
        }, 'waterway-label');
        map1.addLayer({
          "id": "earthquakes-point",
          "type": "circle",
          "source": "earthquakes",
          "minzoom": 7,
          "paint": {
// Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 1,
                6, 4
              ],
              16, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 5,
                6, 50
              ]
            ],
// Color circle by earthquake magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              1, "rgba(33,102,172,0)",
              2, "rgb(103,169,207)",
              3, "rgb(209,229,240)",
              4, "rgb(253,219,199)",
              5, "rgb(239,138,98)",
              6, "rgb(178,24,43)"
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
// Transition from heatmap to circle layer by zoom level
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, 0,
              8, 1
            ]
          }
        }, 'waterway-label');
      });
      var map2 = new mapboxgl.Map({
        container: 'map2', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/streets-v11', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-120, 50], // 初始坐标系，这个是南京建邺附近
        zoom: 2,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
      map2.on('load',function (){
        map2.addSource('earthquakes',{
          "type": "geojson",
          "data": "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        });
        map2.addLayer({
          "id": "earthquakes-heat",
          "type": "heatmap",
          "source": "earthquakes",
          "maxzoom": 9,
          "paint": {
// Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0, 0,
              6, 1
            ],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 1,
              9, 3
            ],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.2, "rgb(103,169,207)",
              0.4, "rgb(209,229,240)",
              0.6, "rgb(253,219,199)",
              0.8, "rgb(239,138,98)",
              1, "rgb(178,24,43)"
            ],
// Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 2,
              9, 20
            ],
// Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, 1,
              9, 0
            ],
          }
        }, 'waterway-label');
        map2.addLayer({
          "id": "earthquakes-point",
          "type": "circle",
          "source": "earthquakes",
          "minzoom": 7,
          "paint": {
// Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 1,
                6, 4
              ],
              16, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 5,
                6, 50
              ]
            ],
// Color circle by earthquake magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              1, "rgba(33,102,172,0)",
              2, "rgb(103,169,207)",
              3, "rgb(209,229,240)",
              4, "rgb(253,219,199)",
              5, "rgb(239,138,98)",
              6, "rgb(178,24,43)"
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
// Transition from heatmap to circle layer by zoom level
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7, 0,
              8, 1
            ]
          }
        }, 'waterway-label');
      });
    }
  }
}
</script>

<style scoped>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
#map1,#map2{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 42%;
}
.el-main{
  position: absolute;
  width: 100%;
  top:0px;
  left:0;
  bottom: 0;
  padding-top: 60px;
}
.label1{
  position: fixed;
  top:90px;
  left: 350px;
  font-size: 20px;
  line-height: 50px;
}
.label2{
  position: fixed;
  top:90px;
  left: 1200px;
  font-size: 20px;
  line-height: 50px;
}
</style>
