<template>
  <v-container>
    <action-button name="Добавить человека" @click="addPerson()" />
    <!-- Кнопка добавления человека-->

    <v-card class="mx-auto overflow-y-auto v-card" max-width="500" max-height="495">
      <input-people @removePerson="removePerson"></input-people>
      <!--Компонент ввода имени человека и его удаление-->
    </v-card>
    <v-sheet max-width="300" class="mx-auto sheet">
      <action-button name="Перейти дальше" @click="onNextButtonClick" />
      <!--Кнопка перехода на следующую страницу, перед этим вызывает функции для проверки корректности введенных данных-->

      <!-- Компонент сообщения об ошибке, подписан на функцию reset дочернего компонента и вызывает функцию resetStates для обнуления вспомогательных переменных и закрытия сообщения об ошибке-->
      <alert-message 
        v-show=isAlertMessageShown
        @reset="resetStates">
        {{ alertMessageText}}
      </alert-message>
    </v-sheet>
  </v-container>
</template>

<script>
import ActionButton from '@/components/ActionButton.vue' //импорт компонентов
import AlertMessage from '../components/AlertMessage.vue'
import InputPeople from '../components/InputPeople.vue'
import { useStorage } from '@/stores/storage' //импорт хранилища

export default {
  components: {
    ActionButton,
    AlertMessage,
    InputPeople
  },
  setup() {
    const storage = useStorage()
    return { storage } //добавление хранилища
  },
  data() {
    return {
      state: 999, //переменная для проверки количества введеных людей
      namesCheck: 0, //переменная для проверки введенных имен людей
    }
  },
  methods: {
    addPerson() {
      this.storage.persons.push({ name: '', debt: '', id: Date.now() }) //добавление нового пользователя в хранилище
    },
    removePerson(idx) {
      this.storage.persons.splice(idx, 1) //удаление пользователя
    },
    changeState() {
      this.state = this.storage.persons.length //вспомогательная функция проверки корректности введенных данных для перехода на следующую страницу
    },
    checkNames() {
      this.namesCheck = this.storage.persons.filter((p) => !p.name.length).length //вспомогательная функция проверки корректности введенных данных для перехода на следующую страницу
    },
    redirect() {
      if (this.state > 1 && this.namesCheck == 0) this.$router.push({ path: '/split' }) //переход на следующую страницу, если данные верны
    },
    resetStates() {
      this.state = -1
      this.namesCheck = 999 //обнуление вспомогательных переменных, убирает сообщение об ошибке
    },
    onNextButtonClick() {
      this.checkNames()
      this.changeState()
      this.redirect()
    }
  },
  computed: {
    alertMessageText() {
      if (this.state == 0) return 'Введите еще хотя бы 2-х пользователей!'
      if (this.state == 1) return 'Введите еще хотя бы 1-го пользователя!'
      if (this.namesCheck > 0 && this.state > 1) return 'Введите все имена пользователей!'
      else return 0
    },
    isAlertMessageShown() {
      if (this.alertMessageText == 0) return 0
      else return 1
    }
  }
}
</script>

<style scoped></style>
