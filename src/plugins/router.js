// import Vue from 'vue';
import{ createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes:[
    {path:'/people',component:()=>import('@/pages/PeopleInput.vue'), alias:"/"},
    {path:'/split',component:()=>import('@/pages/BillSplit.vue')},
    {path:'/result',component:()=>import('@/pages/ResultPage.vue')},
  ]
})

// Vue.use(VueRouter)