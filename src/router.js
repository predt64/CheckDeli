// import Vue from 'vue';
import{ createRouter, createWebHistory } from 'vue-router';
import split from './pages/BillSplit.vue';
import PeopleInput from './pages/PeopleInput.vue';
import result from './pages/ResultPage.vue';
import app from './App.vue';

export default createRouter({
  history: createWebHistory(),
  routes:[
    {path:'/',component: app, alias:'/home',},
    {path:'/split',
    name: 'split',
    component: split,
  },
    {path:'/people',component: PeopleInput},
    {path:'/result',component: result},
  ]
})

// Vue.use(VueRouter)