<script>
import {useStorage} from '@/stores/storage'

export default {
  setup(){
    const storage =useStorage()
    return {storage}
  },
  data() {
    return {
      state: 999,
      namesCheck:0,
    }
  },
  methods: {
    addPerson() {
      this.storage.persons.push({name:'',debt:''})
    },
    removePerson(idx) {
      this.storage.persons.splice(idx, 1)
    },
    changeState() {
      this.state = this.storage.persons.length
    },
    checkNames() {
      this.namesCheck=this.storage.persons.filter(p => !p.name.length).length
    },
    redirect(){
      if(this.state>1 && this.namesCheck==0) 
      this.$router.push({path:'/split'})
    }
    
  },
}
</script>

<template>
<div>
    <v-container>
      <v-sheet max-width="300" class="mx-auto sheet">
        <v-btn
          @click="addPerson()"
          class="mb-5"
          block
          rounded="lg"
          size="x-large"
          color="light-green"
          >Добавить человека</v-btn
        >
      </v-sheet>
      <v-card class="mx-auto overflow-y-auto v-card" max-width="500" max-height="495">
        <div class="people" v-for="(person, idx) in storage.persons" :key="idx">
          <div class="text-field-container">
            <v-text-field
              v-model="this.storage.persons[idx].name"
              placeholder="Введите имя"
              max-width="250"
              maxlength="10"
            ></v-text-field>
          </div>
          <v-btn class="ml-auto" color="red" variant="tonal" @click="removePerson(idx)"
            >Удалить</v-btn
          >
        </div>
        <div class="people noPeople" v-if="!storage.persons.length">
          <span>Нам нужен список имен</span>
        </div>
      </v-card>
      <v-sheet max-width="300" class="mx-auto sheet">
        <v-btn class="next-button" block rounded="lg" size="x-large" color="light-green" @click="checkNames(),changeState(),redirect()" 
          >Перейти дальше</v-btn>
        <v-alert
          type="warning"
          title="Ошибка!"
          text="Введите еще хотя бы 2-х пользователей!"
          v-show="0 == state"
        >
        <button @click="namesCheck=-1,state=999" class="alert-button"
        >x</button></v-alert>
        <v-alert
          type="warning"
          title="Ошибка!"
          text="Введите еще хотя бы 1-х пользователей!"
          v-show="1 == state"
        >
        <button @click="namesCheck=-1,state=999" class="alert-button"
        >x</button></v-alert>
        <v-alert
          type="warning"
          title="Ошибка!"
          text="Введите все имена пользователей!"
          v-show="namesCheck>0 && state>1"
        >
        <button @click="namesCheck=-1,state=999" class="alert-button"
        >x</button>
      </v-alert>
      </v-sheet>
    </v-container>
  </div>
</template>

<style src="@/css/style.css" scoped >
</style>