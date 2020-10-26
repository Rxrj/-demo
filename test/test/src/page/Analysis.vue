<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <Header/>
      </el-header>
      <el-container style="height: 100%">
        <el-aside>
         <SliderAnalysis/>
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

.el-main{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

}
</style>
