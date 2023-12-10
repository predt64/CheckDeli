<script>
import { useStorage } from '@/stores/storage'

export default {
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
          return Number(0)
        }))
    },
    AddMeal() {
      this.storage.meals.push({
        name: '',
        price: '',
        eater: Array.apply(null, Array(this.storage.persons.length)).map(() => {
          return 0
        }),
        payer:0
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
      this.nameError=0;
      this.priceError=0;
      this.chooseError=0;
      this.amountError=0;
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
    }
  }
}
</script>

<template>
  {{ AddDebt() }}
  <v-container>
    <v-sheet max-width="300" class="mx-auto sheet">
      <v-btn @click="AddMeal()" class="mb-7" block rounded="lg" size="x-large" color="light-green"
        >Добавить позицию</v-btn
      >
    </v-sheet>
    <v-card class="mx-auto overflow-y-auto v-card" max-width="500" max-height="510">
      <div class="people-container" v-for="(meal, idx) in storage.meals" :key="idx">
        <div class="people">
          <div class="text-field-container">
            <v-text-field
              v-model="this.storage.meals[idx].name"
              placeholder="Введите название"
              maxlength="10"
              max-width="250"
            ></v-text-field>
          </div>
          <div class="text-field-container">
            <v-text-field
              v-model="this.storage.meals[idx].price"
              type="number"
              min="1"
              max="99999"
              maxlength="10"
              @input="if(Number(storage.meals[idx].price) > 99999) storage.meals[idx].price = '99999';
                      if(Number(storage.meals[idx].price) <1) storage.meals[idx].price = '';
                      if(storage.meals[idx].price.length>8) storage.meals[idx].price =storage.meals[idx].price.slice(0,-1) "
              placeholder="Введите цену"
              max-width="250"
            ></v-text-field>
          </div>
          <v-btn
            class="ml-auto"
            size="small"
            icon="mdi-delete"
            color="red"
            @click="RemoveMeal(idx)"
          ></v-btn>
        </div>
        <div class="peopleInteraction">
          <v-dialog
          v-model="dialog[idx]"
            scrollable
            width="auto"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{props}">
              <v-btn
              color="primary"
              v-bind="props"
              class="people-list dialog">
              Платит: {{storage.persons[storage.meals[idx].payer].name}}
            </v-btn>
            </template>
            <v-card>
              <v-card-title>Выберите плательщика</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                <v-radio-group
                v-model="storage.meals[idx].payer"
                column>
                  <v-radio v-for="(person, index) in storage.persons" 
                  :key="person.name"
                  :label="`${person.name}`"
                  :value=index></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog[idx]=false">
                Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      <div class="people noPeople" v-if="!storage.meals.length">
        <span>Нам нужен список блюд</span>
      </div>
    </v-card>
    <div class="people noPeople" v-if="storage.meals.length">
      <span>Промежуточный итог: {{fullprice}}</span>
    </div>
    <v-sheet max-width="300" class="mx-auto sheet">
      <v-btn
        class="next-button"
        block
        rounded="lg"
        size="x-large"
        color="light-green"
        @click="checkFields(),redirect()"
        >Перейти к результатам</v-btn
      >
      <v-alert
        type="warning"
        title="Ошибка!"
        text="Введите хотя бы две позиции!"
        v-show="amountError==1"
      >
        <button @click="nameError=0" class="alert-button">x</button></v-alert
      >
      <v-alert
        type="warning"
        title="Ошибка!"
        text="Введите все наименования!"
        v-show="nameError==1"
      >
        <button @click="nameError=0" class="alert-button">x</button></v-alert
      >
      <v-alert
        type="warning"
        title="Ошибка!"
        text="Введите все цены правильно!"
        v-show="priceError == 1"
      >
        <button @click="priceError=0" class="alert-button">x</button></v-alert
      >
      <v-alert
        type="warning"
        title="Ошибка!"
        text="Правильно отметьте всех людей!"
        v-show="chooseError"
      >
        <button @click="chooseError=0" class="alert-button">x</button>
      </v-alert>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
