<template>
  <el-header>
    <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" style="background-color: #252525;border-bottom: solid 2px #444444;height: 90px !important;" active-text-color="#409EFF">
      <el-menu-item class="header-item" style="font-size: 50px;left:30px">S  O  U  P</el-menu-item>
      <el-menu-item class="header-item"
                    style="padding-top:20px;float:right;font-size: 20px;color:#409EFF;line-height: 15px;"><div
        style="text-align: right">Spatial-Temporal Demand</div><br/> Prediction and Competitive Supply</el-menu-item>
      <el-menu-item index="/" class="header-item" style="left:100px">Request Analysis</el-menu-item>
      <el-menu-item index="/Prediction" class="header-item" style="left:100px">Request Prediction</el-menu-item>
      <el-menu-item index="/Simulation" class="header-item" style="left:100px">Simulation</el-menu-item>
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
  margin: 0;
  width: 100%;
}
.header-item{
  color: #eeeeee;
  font-size: 30px;
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  height: 100%;
  text-align: center;
  padding-top: 15px;
}

/deeep/ .el-menu-item:not(.is-disabled):focus,.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline:0;
  color:#409EFF
}


</style>
