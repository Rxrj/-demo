<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <Header/>
      </el-header>
      <el-container style="height: 100%">
        <el-aside>
          <Slider/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import Slider from "../components/Slider";
import map from "../components/map";
export default {
  name: "Simulation",
  components: {Slider, Header},
}
</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
</style>
