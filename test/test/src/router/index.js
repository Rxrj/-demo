import Vue from 'vue'
import Router from 'vue-router'
import Simulation from "@/page/Simulation";

import Header from "../components/Header";
import SliderAnalysis from "../components/SliderAnalysis";
import map from "../components/map";

import Analysis from "../page/Analysis";
import Prediction from "../page/Prediction";

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name:'Analysis',
      component:Analysis,
      children: [{
        path:'/',
        name:'map',
        component:map
      }]
    },
    {
      path:'/Prediction',
      name:'Prediction',
      component: Prediction,
      children: [{
        path:'/',
        name:'map',
        component:map
      }]
    },
    {
      path:'/Simulation',
      name:'Simulation',
      component: Simulation,
      children: [{
        path:'/',
        name:'map',
        component:map
      }]
    },
    {
      path:'/components/Header',
      name:'Header',
      component: Header
    },
    {
      path:'/components/SliderAnalysis',
      name:'SliderAnalysis',
      component: SliderAnalysis
    },
    {
      path:'/components/map',
      name:'map',
      component: map
    }
  ]
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Layout',
  //     component: Layout,
  //     children: [{
  //       path:'/',
  //       name:'Main',
  //       component:Main
  //     },{
  //       path: '/Simulation',
  //       name: 'Simulation',
  //       component: Simulation
  //     }]
  //   }
  // ]
})
