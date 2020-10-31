<template>
    <el-container style="height: 100%;background-color: #252525">
      <el-header style="padding: 0">
        <Header/>
      </el-header>
      <el-container style="height: 100%;background-color: #252525">
        <el-aside style="padding-top: 70px">
          <div class="block" >
            <el-date-picker
              v-model="value"
              align="right"
              type="date"
              placeholder=" Select Data"
              style="font-size: 22px"
              :picker-options="pickerOptions">
            </el-date-picker>
            <br>
            <div>
              <el-checkbox v-model="checked" style="padding-top: 20px;" @change="handleChange"><div>Partition Visible</div></el-checkbox>
            </div>
            <el-button style="font-size:22px;margin-top: 20px;width: 100px;background-color:#2d2d2d;border:solid 2px #444444;color: #eeeeee">Start</el-button>
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
                  show-stops>
                </el-slider>
                <div class="Evaluation" style="text-align: right">
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Search Time<br/><div class="font">416.317s</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Waiting Time<br/><div class="font">61.833</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Expiration Percentage<br/><div class="font">14.411%</div></div>
                </div>
                <div class="Numbers" style="text-align: right">
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Idle Cars<br/><div style="font-size: 25px;color:#409EFF">14</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Waiting Customers<br/><div style="font-size: 25px;color:#409EFF">14</div></div>
                </div>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="charts" id="charts1" style="width: auto;height: 250px"></div>
              <div class="charts" id="charts2" style="width: auto;height: 250px"></div>
              <div class="charts" id="charts3" style="width: auto;height: 250px"></div>
            </el-col>
          </el-row>


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
          "fill-color": "#eeeeee", /* 填充的颜色 */
          "fill-opacity": 0.3      /* 透明度 */
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
          "circle-radius": 2,
          "circle-color": "#007cbf"
        }
      });

      map.addLayer({
        "id": "agents",
        "source": "agents",
        "type": "circle",
        "paint": {
          "circle-radius": 2,
          "circle-color": "#FF0000"
        }
      });

      var index=0;
      var timer = window.setInterval(function() {
        if(index < 1680){
          index++;
          map.getSource('resources').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/resource/resources_" + String(index) +
            ".geojson");
          map.getSource('agents').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/agent/agents_" + String(index) + ".geojson");
        }else {
          window.clearInterval(timer);
        }
      }, 200);

    });
    var charts1 = echarts.init(document.getElementById('charts1'));
    var data = [{"name":1596038400000,"value":[1596038400000,53]},{"name":1596039040000,"value":[1596039040000,51]},{"name":1596039680000,"value":[1596039680000,51]},{"name":1596040320000,"value":[1596040320000,51]},{"name":1596040832000,"value":[1596040832000,58]},{"name":1596041472000,"value":[1596041472000,67]},{"name":1596042112000,"value":[1596042112000,68]},{"name":1596042624000,"value":[1596042624000,54]},{"name":1596043264000,"value":[1596043264000,51]},{"name":1596043904000,"value":[1596043904000,57]},{"name":1596044416000,"value":[1596044416000,52]},{"name":1596045056000,"value":[1596045056000,54]},{"name":1596045696000,"value":[1596045696000,51]},{"name":1596046208000,"value":[1596046208000,51]},{"name":1596046848000,"value":[1596046848000,52]},{"name":1596047488000,"value":[1596047488000,51]},{"name":1596048000000,"value":[1596048000000,53]},{"name":1596048640000,"value":[1596048640000,52]},{"name":1596049280000,"value":[1596049280000,67]},{"name":1596049920000,"value":[1596049920000,59]},{"name":1596050432000,"value":[1596050432000,58]},{"name":1596051072000,"value":[1596051072000,52]},{"name":1596051712000,"value":[1596051712000,55]},{"name":1596052224000,"value":[1596052224000,53]},{"name":1596052864000,"value":[1596052864000,54]},{"name":1596053504000,"value":[1596053504000,54]},{"name":1596054016000,"value":[1596054016000,54]},{"name":1596054656000,"value":[1596054656000,52]},{"name":1596055296000,"value":[1596055296000,54]},{"name":1596055808000,"value":[1596055808000,65]},{"name":1596056448000,"value":[1596056448000,59]},{"name":1596057088000,"value":[1596057088000,55]},{"name":1596057600000,"value":[1596057600000,53]},{"name":1596058240000,"value":[1596058240000,55]},{"name":1596058880000,"value":[1596058880000,54]},{"name":1596059520000,"value":[1596059520000,55]},{"name":1596060032000,"value":[1596060032000,64]},{"name":1596060672000,"value":[1596060672000,57]},{"name":1596061312000,"value":[1596061312000,56]},{"name":1596061824000,"value":[1596061824000,55]},{"name":1596062464000,"value":[1596062464000,55]},{"name":1596063104000,"value":[1596063104000,55]},{"name":1596063616000,"value":[1596063616000,58]},{"name":1596064256000,"value":[1596064256000,79]},{"name":1596064896000,"value":[1596064896000,60]},{"name":1596065408000,"value":[1596065408000,63]},{"name":1596066048000,"value":[1596066048000,63]},{"name":1596066688000,"value":[1596066688000,82]},{"name":1596067200000,"value":[1596067200000,81]},{"name":1596067840000,"value":[1596067840000,78]},{"name":1596068480000,"value":[1596068480000,78]},{"name":1596069120000,"value":[1596069120000,65]},{"name":1596069632000,"value":[1596069632000,76]},{"name":1596070272000,"value":[1596070272000,80]},{"name":1596070912000,"value":[1596070912000,78]},{"name":1596107040000,"value":[1596107040000,70]},{"name":1596124799000,"value":[1596124799000,0]}];

    var option = {
      title: {
        text: 'Search Time'
      },
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
        name:'Search Time',
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
      title: {
        text: 'Search Time'
      },
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
        name:'Search Time',
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
    var charts3 = echarts.init(document.getElementById('charts3'));
    var data = [{"name":1596038400000,"value":[1596038400000,53]},{"name":1596039040000,"value":[1596039040000,51]},{"name":1596039680000,"value":[1596039680000,51]},{"name":1596040320000,"value":[1596040320000,51]},{"name":1596040832000,"value":[1596040832000,58]},{"name":1596041472000,"value":[1596041472000,67]},{"name":1596042112000,"value":[1596042112000,68]},{"name":1596042624000,"value":[1596042624000,54]},{"name":1596043264000,"value":[1596043264000,51]},{"name":1596043904000,"value":[1596043904000,57]},{"name":1596044416000,"value":[1596044416000,52]},{"name":1596045056000,"value":[1596045056000,54]},{"name":1596045696000,"value":[1596045696000,51]},{"name":1596046208000,"value":[1596046208000,51]},{"name":1596046848000,"value":[1596046848000,52]},{"name":1596047488000,"value":[1596047488000,51]},{"name":1596048000000,"value":[1596048000000,53]},{"name":1596048640000,"value":[1596048640000,52]},{"name":1596049280000,"value":[1596049280000,67]},{"name":1596049920000,"value":[1596049920000,59]},{"name":1596050432000,"value":[1596050432000,58]},{"name":1596051072000,"value":[1596051072000,52]},{"name":1596051712000,"value":[1596051712000,55]},{"name":1596052224000,"value":[1596052224000,53]},{"name":1596052864000,"value":[1596052864000,54]},{"name":1596053504000,"value":[1596053504000,54]},{"name":1596054016000,"value":[1596054016000,54]},{"name":1596054656000,"value":[1596054656000,52]},{"name":1596055296000,"value":[1596055296000,54]},{"name":1596055808000,"value":[1596055808000,65]},{"name":1596056448000,"value":[1596056448000,59]},{"name":1596057088000,"value":[1596057088000,55]},{"name":1596057600000,"value":[1596057600000,53]},{"name":1596058240000,"value":[1596058240000,55]},{"name":1596058880000,"value":[1596058880000,54]},{"name":1596059520000,"value":[1596059520000,55]},{"name":1596060032000,"value":[1596060032000,64]},{"name":1596060672000,"value":[1596060672000,57]},{"name":1596061312000,"value":[1596061312000,56]},{"name":1596061824000,"value":[1596061824000,55]},{"name":1596062464000,"value":[1596062464000,55]},{"name":1596063104000,"value":[1596063104000,55]},{"name":1596063616000,"value":[1596063616000,58]},{"name":1596064256000,"value":[1596064256000,79]},{"name":1596064896000,"value":[1596064896000,60]},{"name":1596065408000,"value":[1596065408000,63]},{"name":1596066048000,"value":[1596066048000,63]},{"name":1596066688000,"value":[1596066688000,82]},{"name":1596067200000,"value":[1596067200000,81]},{"name":1596067840000,"value":[1596067840000,78]},{"name":1596068480000,"value":[1596068480000,78]},{"name":1596069120000,"value":[1596069120000,65]},{"name":1596069632000,"value":[1596069632000,76]},{"name":1596070272000,"value":[1596070272000,80]},{"name":1596070912000,"value":[1596070912000,78]},{"name":1596107040000,"value":[1596107040000,70]},{"name":1596124799000,"value":[1596124799000,0]}];

    var option = {
      title: {
        text: 'Search Time'
      },
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
        name:'Search Time',
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
    charts3.setOption(option);
  },
  data() {
    return {
      checked: true,
      activeIndex: '1',
      activeIndex2: '1',
      maps: null,
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
  top:300px;
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
  left:50px;
  top:650px;
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
