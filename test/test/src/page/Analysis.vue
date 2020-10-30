<template>
  <el-container style="height: 100%;background-color: #252525">
    <el-header style="padding: 0">
      <Header/>
    </el-header>
    <el-container style="height: 100%">
      <el-aside style="padding-top: 20px">
        <div class="block" >
          <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="Select Data"
            :picker-options="pickerOptions">
          </el-date-picker>
          <br>
          <el-checkbox v-model="checked" style="padding-top: 20px;padding-left: 40px" @change="handleChange">Partition Visible</el-checkbox>
          <br>
          <el-checkbox v-model="dropoff" style="padding-top: 20px" @change="handleChange">Drop Off</el-checkbox>
          <el-checkbox v-model="pickup" style="padding-top: 20px" @change="handleChange">Pick Up</el-checkbox>
          <br>
          <el-button style="margin-top: 20px;width: 220px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Search</el-button>
        </div>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              style="left: 40px">
              <el-submenu index="1" style="width: 220px;background-color: #252525">
                <template slot="title">
                  <span style="color: #eeeeee" class="item-title">Data Visualization</span>
                </template>
                <el-menu-item>Scatter plot</el-menu-item>
                <el-menu-item>Thermodynamic diagram</el-menu-item>
                <el-menu-item>Three dimensional diagram</el-menu-item>
              </el-submenu>
              <el-submenu index="2" style="width: 220px;background-color: #252525">
                <template slot="title">
                  <span style="color: #eeeeee" class="item-title">Data Analysis</span>
                </template>
                <el-menu-item>Holidays and working days</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main style="padding: 20px;margin: 0">
        <div id="map" style="border-radius: 10px;box-shadow: 0 2px 5px black">
          <el-slider
            v-model="value2"
            max="24"
            :step="1"
            show-stops>
          </el-slider>
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
  name: "Analysis",
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
    }
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
        "type": "fill",           /* fill类型一般用来表示一个面，一般较大 */
        "source": "regions",
        "paint": {
          "fill-color": "#FFC1C1", /* 填充的颜色 */
          "fill-opacity": 0.3      /* 透明度 */
        },
        "filter": ["==", "$type", "Polygon"]  /* filter过滤器将type等于Polygon的数据显示在layer上 */
      });

    });
  },
  data() {
    return {
      checked: true,
      pickup:true,
      dropoff:true,
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

.el-menu{
  border-right: 0!important;
  top: 30px;
}

.el-menu-item{
  background-color: #252525;
  color: #eeeeee;
}
.el-menu-item:hover,.el-menu-item:focus{
  background-color: #383838;
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
  left: 850px;
}

</style>
