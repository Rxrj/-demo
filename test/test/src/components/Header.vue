<template>
  <el-header>
    <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" style="background-color: #252525;border-bottom: solid 2px #444444" active-text-color="#409EFF">
      <el-menu-item class="header-item" style="font-size: 27px;width: 140px">S  O  U  P</el-menu-item>
      <el-menu-item disabled class="icon" style="font-size: 10px;color:#eeeeee;width:180px;line-height: 11px;padding-top: 20px;padding-left: 0">Spatial-Temporal Demand<br/> Forecasting and Competitive Supply</el-menu-item>
      <el-menu-item index="/" class="header-item">Supply-Demand Analysis</el-menu-item>
      <el-menu-item index="/Prediction" class="header-item">Resource Prediction</el-menu-item>
      <el-menu-item index="/Simulation" class="header-item">Simulation</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
.el-header{
  z-index: 1000;
  padding: 0px;
  width: 100%;
}
.header-item{
  color: #eeeeee;
  font-size: 17px;
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: 1000;
}


</style>
