<template>
  {{ AddDebt() }}
  <v-container>
    <v-sheet max-width="300" class="mx-auto sheet">

      <action-button name="Добавить позицию" @click="AddMeal()"/>

    </v-sheet>

    <v-card class="mx-auto overflow-y-auto v-card" max-width="500" max-height="510">
      <transition-group name="meal-list">
      <div class="people-container" v-for="(meal, idx) in storage.meals" :key="meal.id">

        <input-meal :idx="idx" @RemoveMeal="RemoveMeal"></input-meal>

        <div class="peopleInteraction">
          <dialog-window :dialog="dialog" :idx="idx"></dialog-window>
        <div class="people-list">
          <button class="people-item" @click="ClickAll(idx)">Все</button>
          <button
            class="people-item"
            v-for="(person, index) in storage.persons"
            :key="index"
            :class="{ clicked: storage.meals[idx].eater[index] === 1}"
            @click="Clicked(idx, index)"
          >
            {{ person.name }}
          </button>
        </div>

      </div>

      </div>
    </transition-group>
      <div class="people noPeople" v-if="!storage.meals.length">
        <span>Нам нужен список блюд</span>
      </div>

    </v-card>

    <div class="special" v-if="storage.meals.length">
      <span>Промежуточный итог: {{fullprice}}</span>
    </div>

    <v-sheet max-width="300" class="mx-auto sheet">
      <action-button name="Перейти к результатам" @click="resetStates(),checkFields(),redirect()"/>

      <alert-message v-show="amountError==1" text="Введите как минимум 2 позиции!" @reset="resetStates"/>
      <alert-message v-show="nameError==1" text="Введите все наименования!" @reset="resetStates"/>
      <alert-message v-show="priceError == 1" text="Введите все цены правильно!" @reset="resetStates"/>
      <alert-message v-show="chooseError" text="Правильно отметьте всех людей!" @reset="resetStates"/>
    </v-sheet>
  </v-container>
</template>

<script>

import { useStorage } from '@/stores/storage'
import ActionButton from '../components/ActionButton.vue'
import AlertMessage from '../components/AlertMEssage.vue'
import InputMeal from '../components/InputMeal.vue'
import DialogWindow from '../components/DialogWindow.vue'

export default {
  components:{
    ActionButton,AlertMessage,InputMeal,DialogWindow
  },
  setup() {
    const storage = useStorage()
    return { storage }
  },
  data() {
    return {
      nameError: 0,
      priceError: 0,
      chooseError: 0,
      amountError: 0,
      dialog:[],
  }
},
  computed:{
    
    fullprice : function(){
      return this.storage.meals.reduce((acc,curr)=>acc+Number(curr.price),0)
    }
},
  methods: {
    AddDebt(){
      this.storage.persons.map((item)=>item['debt']=Array.apply(null, Array(this.storage.persons.length)).map(() => {
          return 0
        }))
    },
    AddMeal() {
      this.storage.meals.push({
        name: '',
        price: '',
        eater: Array.apply(null, Array(this.storage.persons.length)).map(() => {
          return 0
        }),
        payer:0,
        id:Date.now(),
      })
      this.dialog.push(false);
    },
    RemoveMeal(idx) {
      this.storage.meals.splice(idx, 1)
    },
    Clicked(idx, index) {
      if (this.storage.meals[idx].eater[index] === 1) this.storage.meals[idx].eater[index] = 0
      else this.storage.meals[idx].eater[index] = 1
    },
    ClickAll(idx) {
      if (this.storage.meals[idx].eater.filter((p) => p == 0).length == 0)
        this.storage.meals[idx].eater = this.storage.meals[idx].eater.map(() => {
          return 0
        })
      else
        this.storage.meals[idx].eater = this.storage.meals[idx].eater.map(() => {
          return 1
        })
    },
    checkFields() {
      if ( this.storage.meals.length<2)
      {
        this.amountError=1;
        return -1
      }
      if ( this.storage.meals.filter((p) => p.name).length != this.storage.meals.length)
      {
        this.nameError=1;
        return -1
      }
      else if(this.fullprice==0 || this.storage.meals.filter((p) => p.price).length != this.storage.meals.length)
      {
        this.priceError=1;
        return -1
      }
      else if(this.storage.meals.filter((item)=>item.eater.filter((curr) => curr==1).length).length
              != this.storage.meals.length) // проверяем, есть ли хотя бы 1 отмеченный пользователь в каждом блюде
      {
        this.chooseError=1;
        return -1
      }
      else
      this.chooseError=0;
    },
    redirect(){
      if(this.nameError==0 &&
      this.priceError==0 &&
      this.chooseError==0 &&
      this.amountError==0)
      this.$router.push({path:'/result'})
    },
    resetStates(){
      this.nameError=0;
      this.priceError=0;
      this.chooseError=0;
      this.amountError=0;
    }
  }
}
</script>

<style lang="scss" scoped>


.meal-list-enter-active,
.meal-list-leave-active {
  transition: all 0.3s ease;
}
.meal-list-enter-from,
.meal-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.people-list{
  display: flex;
  flex-direction: row;
  gap: 5px;
  overflow-y: hidden;
  overflow-x: auto;
  padding: 5px 0px;
  max-width: 456px;
  margin-left: 22px;
}
.people-item{
  border: 2px solid gray;
  border-radius: 10px;
  padding: 3px;
  max-height: 37px;
  
}
.people-item:hover{
  opacity: 0.75;
  background-color:rgb(94, 159, 159);
  transition: .15s;
}
.clicked{
  transition: .15s;
border: 2px solid greenyellow;
}
.people-item:first-child{
  border-color: black;
  margin-right: 10px;
}
.special{
  display: flex;
  padding: 10px 20px;
  border: 2px solid ghostwhite;
  border-radius: 10px;
  background-color: lightblue;
  color: black; 
  margin-bottom: 20px;
  justify-content: center;
  max-width:500px;
  max-height:438px;
  margin: 20px auto;
}

.people-container{
  background-color: lightblue;
  margin-bottom: 3px;
  border-radius: 10px;
}

.people-container:nth-last-child(-n+2){
  margin-bottom: 0 !important;
  }
</style>
