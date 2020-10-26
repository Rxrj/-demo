<template>
  <div id="app" style="height: 100%">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/all.css'
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;

}
html,body.el-container{
  width: 100%;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
