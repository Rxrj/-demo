<template>
    <div id="map" style="border-radius: 10px;box-shadow: 0 2px 5px black">
        <el-slider
          v-model="value"
          max="24"
          :step="1"
          show-stops>
        </el-slider>
    </div>
</template>

<script type="text/ecmascript-6">
const mapboxgl = require('mapbox-gl');
export default {
  name: "map",
  mounted() {
    this.initmap();
  },
  methods:{
    initmap(){
      mapboxgl.accessToken = 'pk.eyJ1IjoicnhyaiIsImEiOiJja2dseDQ1bnUwMTV4MzFxcmY2cWxwcnpjIn0.qjzBBML5vuTGTZeMeyHsrg'; //这里请换成自己的token
      var map = new mapboxgl.Map({
        container: 'map', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/dark-v9', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-73.96,40.78], // 初始坐标系
        zoom: 11,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });

      map.on('load', function(){
        map.addSource("regions", {
          "type": "geojson",
          "data": "https://raw.githubusercontent.com/REUS1/SOUP-Data/main/regions.geojson"
        });

        map.addLayer({
          "id": "regions",
          "type": "fill",           /* fill类型一般用来表示一个面，一般较大 */
          "source": "regions",
          "paint": {
            "fill-color": "#FFC1C1", /* 填充的颜色 */
            "fill-opacity": 0.3      /* 透明度 */
          },
          "filter": ["==", "$type", "Polygon"]  /* filter过滤器将type等于Polygon的数据显示在layer上 */
        });
      });


      var i = 0;
      var timer = window.setInterval(function() {
        i++;
        if(i>10){
          map.setLayoutProperty('regions', 'visibility', 'none');
        }
        if(i>20){
          map.setLayoutProperty('regions', 'visibility', 'visible');
        }
      }, 1000);
    }
  },
  data() {
    return {
      value: 0,
    }
  },
}
</script>

<style scoped>
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
  bottom: 50px;
  left: 900px;
}

</style>
