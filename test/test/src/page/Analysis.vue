<template>
  <div>
    <el-container>
    <Header/>
    </el-container>
    <el-container>
      <el-aside>
        <SliderAnalysis/>
      </el-aside>
    <router-view/>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import SliderAnalysis from "../components/SliderAnalysis";
import map from "../components/map";
export default {
  name: "Analysis",
  components: {SliderAnalysis, Header},
}
</script>

<style scoped>
html,body{
  width: 100%;
  height:100%;
}
</style>
