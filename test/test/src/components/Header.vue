<template>
  <el-header>
    <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="font-weight: bold">
      <el-menu-item index="3" class="fr" >Simulation</el-menu-item>
      <el-menu-item index="2" class="fr">Resource Prediction</el-menu-item>
      <el-menu-item index="1" class="fr">Supply-Demand Analysis</el-menu-item>
    </el-menu>
    <div class="line"></div>
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
.el-header .fr{
  float: left;
}
</style>
