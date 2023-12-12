<template>
    <v-container>
      <action-button name="Добавить человека" @click="addPerson()" />

      <v-card class="mx-auto overflow-y-auto v-card" max-width="500" max-height="495">
        <input-people @removePerson="removePerson"></input-people>
      </v-card>
      <v-sheet max-width="300" class="mx-auto sheet">
        <action-button name="Перейти дальше" @click="checkNames(), changeState(), redirect()" />

        <alert-message
          v-show="0 == state"
          text="Введите еще хотя бы 2-х пользователей!"
          @reset="resetStates"
        />
        <alert-message
          v-show="1 == state"
          text="Введите еще хотя бы 1-го пользователя!"
          @reset="resetStates"
        />
        <alert-message
          v-show="namesCheck > 0 && state > 1"
          text="Введите все имена пользователей!"
          @reset="resetStates"
        />
        
      </v-sheet>
    </v-container>
</template>

<script>
import ActionButton from '@/components/ActionButton.vue'
import { useStorage } from '@/stores/storage'
import AlertMessage from '../components/AlertMEssage.vue'
import InputPeople from '../components/InputPeople.vue'

export default {
  components: {
    ActionButton,
    AlertMessage,
    InputPeople
  },
  setup() {
    const storage = useStorage()
    return { storage }
  },
  data() {
    return {
      state: 999,
      namesCheck: 0
    }
  },
  methods: {
    addPerson() {
      this.storage.persons.push({ name: '', debt: '',id:Date.now() })
    },
    removePerson(idx) {
      this.storage.persons.splice(idx, 1)
    },
    changeState() {
      this.state = this.storage.persons.length
    },
    checkNames() {
      this.namesCheck = this.storage.persons.filter((p) => !p.name.length).length
    },
    redirect() {
      if (this.state > 1 && this.namesCheck == 0) this.$router.push({ path: '/split' })
    },
    resetStates() {
      this.state = -1
      this.namesCheck = 999
    }
  }
}
</script>

<style scoped></style>
