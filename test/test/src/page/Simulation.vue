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
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Search Time<br/><div class="font">416.317s</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Waiting Time<br/><div class="font">61.833s</div></div>
                  <div style="color: #eeeeee; font-weight: bold;text-align:center">Expiration Percentage<br/><div class="font">14.411%</div></div>
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
        "type": "line",
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
      var timer = window.setInterval(function() {
        if(index < 1680){
          index++;
          map.getSource('resources').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/resource/resources_" + String(index) +
            ".geojson");
          map.getSource('agents').setData("https://raw.githubusercontent.com/REUS1/SOUP-Data/main/agent/agents_" + String(index) + ".geojson");
        }else {
          window.clearInterval(timer);
        }
      }, 500);

    });
    var charts1 = echarts.init(document.getElementById('charts1'));
    var data1 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',400]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',320]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',417]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',290]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',300]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',410]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',400]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',420]}];
    var data11 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',35]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',65]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',60]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',20]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',25]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',65]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',55]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',68]}];
    var option = {
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
      grid:{

      },
      tooltip: {
        trigger: 'axis',
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
          color:'#eeeeee'
        }
      },
      yAxis: {
        name:'(s)',
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
        name: 'DROP',
        type: 'line',
        color:['#FF0000'],
        hoverAnimation: false,
        smooth: true,
        symbolSize: 4,
        data: data1

      },
        {
          name: 'RD',
          type: 'line',
          color:['#007cbf'],
          hoverAnimation: false,
          smooth: true,
          symbolSize: 4,
          data: data11

        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    charts1.setOption(option);
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
        name:'(s)',
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
        name: 'DROP',
        type: 'line',
        color:['#FF0000'],
        hoverAnimation: false,
        smooth: true,
        symbolSize: 4,
        data: data2

      },
        {
          name: 'RD',
          type: 'line',
          color:['#007cbf'],
          hoverAnimation: false,
          smooth: true,
          symbolSize: 4,
          data: data22

        }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    charts2.setOption(option);
    var charts3 = echarts.init(document.getElementById('charts3'));
    var data3 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',12]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',8]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',14]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',2]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',5]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',12]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',9]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',13]}];
    var data33 =[{"name":'2016/6/1 8:00:00',"value":['2016/6/1 8:00:00',16]},{"name":'2016/6/1 10:00:00',"value":['2016/6/1 10:00:00',10]},{"name":'2016/6/1 12:00:00',"value":['2016/6/1 12:00:00',16]},{"name":'2016/6/1 14:00:00',"value":['2016/6/1 14:00:00',6]},{"name":'2016/6/1 16:00:00',"value":['2016/6/1 16:00:00',10]},{"name":'2016/6/1 18:00:00',"value":['2016/6/1 18:00:00',20]},{"name":'2016/6/1 20:00:00',"value":['2016/6/1 20:00:00',15]},{"name":'2016/6/1 22:00:00',"value":['2016/6/1 22:00:00',18]}];

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
        name:'(%)',
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
        name: 'DROP',
        type: 'line',
        color:['#FF0000'],
        hoverAnimation: false,
        smooth: true,
        symbolSize: 4,
        data: data3

      },
        {
          name: 'RD',
          type: 'line',
          color:['#007cbf'],
          hoverAnimation: false,
          smooth: true,
          symbolSize: 4,
          data: data33

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
      value: '',
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

var date = new Date(2016,6,1,8,0);//注意月份是0-11，1月为0，12月为11
var t = null;
t = setTimeout(timeChange,500);//開始运行
var agentsNumber = 1700;
function timeChange()
{
  clearTimeout(t);//清除定时器
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
  t = setTimeout(timeChange,500); //设定定时器，循环运行
  if(h == 22)
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
