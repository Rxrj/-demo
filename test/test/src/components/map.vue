<template>
  <el-container>
  <el-main>
    <div id="map">
    </div>
  </el-main>
  </el-container>
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
        style: 'mapbox://styles/mapbox/streets-v11', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [-74.5, 40], // 初始坐标系，这个是南京建邺附近
        zoom: 9,     // starting zoom 地图初始的拉伸比例
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
    }
  }
}
</script>

<style scoped>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
#map{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
el-main{
  position: absolute;
  width: 100%;
  top:0px;
  left:0;
  bottom: 0;
  padding-top: 60px;
}

</style>
