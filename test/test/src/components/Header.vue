<template>
  <el-header>
    <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect"  style="background-color: #252525;border-bottom: solid 2px #444444">
      <el-menu-item class="header-item" style="font-size: 27px;width: 140px">S  O  U  P</el-menu-item>
      <el-menu-item disabled class="icon" style="font-size: 10px;color:#eeeeee;width:180px;line-height: 11px;padding-top: 20px;padding-left: 0">Spatial-Temporal Demand<br/> Forecasting and Competitive Supply</el-menu-item>
      <el-menu-item index="1" class="header-item">Supply-Demand Analysis</el-menu-item>
      <el-menu-item index="2" class="header-item">Resource Prediction</el-menu-item>
      <el-menu-item index="3" class="header-item">Fleet Management Simulation</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({path: "/"});
          break;
        case '2':
          this.$router.push({path: "/Prediction"});
          break;
        case '3':
          this.$router.push({path: "/Simulation"});
          break;


      }
    }
  }
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
/deep/.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #444444;
  color: #303133;
}
/deep/.icon >>> .is-disabled{
  color: #eeeeee;
}


</style>
