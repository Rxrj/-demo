<template>
  <div style="height: 100%; margin: 0; padding: 0;background-color: #252525">
    <el-container>
      <Header/>
    </el-container>
    <el-container style="height: 100%; margin: 0; padding: 0;">
      <el-aside style="padding-top: 20px;">
        <Slider/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import map from "../components/map";
import echarts from 'echarts'
import Slider from "../components/Slider";
export default {
  name: "Prediction",
  components: {Slider, Header},
}
</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
.el-container{
  width:100%;
}
</style>
