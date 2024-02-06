<template> <!--компонент отрисовки поля ввода имени и удаления пользователей-->
  <transition-group name="people-list">  <!--для красивой анимации-->
  <div class="people" v-for="(person, idx) in storage.persons" :key="person.id">
    <div class="text-field-container">
      <v-text-field
        class="text-field"
        v-model="this.storage.persons[idx].name"  
        placeholder="Введите имя"
        max-width="250"
        maxlength="10"
      ></v-text-field> <!--Поле для ввода имени, двусторонне связано с соответствуей ячейкой, предварительно созданной в storage-->
    </div>
    <!--Удаление пользователя, эмитим нажатие на эту кнопку и предаем вместе с соответствующим индексом пользователя в родительский компонент-->
    <v-btn class="ml-auto delete__button" color="darkred" @click="removePerson(idx)">Удалить</v-btn>  
  </div>
</transition-group>
  <div class="people noPeople" v-if="!storage.persons.length"> <!--Сообщение при отсутствии введенных пользователей-->
    <span>Нам нужен список имен</span>
  </div>
</template>

<script>
import { useStorage } from '@/stores/storage'
export default {
  emits:['removePerson'],
  setup() {
    const storage = useStorage()
    return { storage }
  }, 
  methods:{
      removePerson(idx){
        this.$emit('removePerson', idx);
      }
    }
}
</script>

<style lang="scss" scoped>
.people-list-enter-active,  //анимации добавления и удаления
.people-list-leave-active {
  transition: all 0.3s ease;
}
.people-list-enter-from,
.people-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.delete__button{
  color: rgb(255, 54, 54);
  background-color: #344E41;
}
</style>
