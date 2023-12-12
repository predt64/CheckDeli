<template>
  {{ calculate }}
  <div class="people noPeople result">
  <span>Результаты следующие:</span>
    </div>
<v-card class="mx-auto overflow-y-auto v-card resultcard" max-width="500" max-height="495">
  <div class="debt" v-for="(person, idx) in storage.persons" :key="idx">
    <p>пользователь <b>{{ person.name }}</b> должен:</p>
    <p v-if="checkDebt(storage.persons[idx].debt)">Да никому он не должен, живет как хочет</p>
    <p v-else v-for="(debt,index) in storage.persons[idx].debt" 
    :key="index" v-show="debt"> {{storage.persons[index].name}} : <b>{{ debt }}</b></p>
  </div>
</v-card>
</template>

<script>
import { useStorage } from '@/stores/storage'

export default {
  setup(){
    const storage =useStorage()
    return {storage}
  },
  data() {
    return {
    }
  },
  methods:{
    calculatePartialPrice(){
      this.storage.meals.map((meal)=>meal.partialPrice=Number(meal.price)/meal.eater.reduce((acc,curr)=>acc+curr));
    },
    checkSame(){
    for(let i=0;i<this.storage.persons.length;i++){
      for(let j=i;j<this.storage.persons[i].debt.length;j++){
        if(i!=j && this.storage.persons[i].debt[j]>0 && this.storage.persons[j].debt[i]>0){
          if (this.storage.persons[i].debt[j]>this.storage.persons[j].debt[i])
          {
          this.storage.persons[i].debt[j]-=this.storage.persons[j].debt[i];
          this.storage.persons[j].debt[i]=0
          }
          else{
            this.storage.persons[j].debt[i]-=this.storage.persons[i].debt[j];
            this.storage.persons[i].debt[j]=0;
          }
        }
    }
    }
  },
  checkDebt(debt){
    for(let item of debt)
        if (item)
          return 0;
    return 1;
  },
},
computed:{
  calculate(){
      this.calculatePartialPrice();
      this.storage.meals.map((meal,idx)=>meal.eater.map((person,index)=>
      person==1 && index!=this.storage.meals[idx].payer?
      this.storage.persons[index].debt[this.storage.meals[idx].payer]
      +=this.storage.meals[idx].partialPrice
      :this.storage.persons[index].debt[this.storage.meals[idx].payer]+=0));
      this.checkSame();
      return '';
    }
}
}
</script>


<style lang="scss" scoped>
.result{
  margin-top: 20px;
  background-color: coral;
}
.resultcard{
  margin-top: 20px;
}</style>
