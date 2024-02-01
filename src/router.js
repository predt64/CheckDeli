// import Vue from 'vue';
import{ createRouter, createWebHashHistory } from 'vue-router';
import split from './pages/BillSplit.vue';
import PeopleInput from './pages/PeopleInput.vue';
import result from './pages/ResultPage.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes:[
    {path:'/people',component: PeopleInput, alias:"/"},
    {path:'/split',component: split},
    {path:'/result',component: result},
  ]
})

// Vue.use(VueRouter)