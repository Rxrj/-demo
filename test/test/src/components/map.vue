<template>
    <div id="map">
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
        center: [-73.90,40.785], // 初始坐标系，这个是南京建邺附近
        zoom: 11,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
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
  bottom: 10px;
  left: 900px;
}

</style>
