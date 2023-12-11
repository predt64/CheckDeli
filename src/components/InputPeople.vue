<template>
  <transition-group name="people-list">
  <div class="people" v-for="(person, idx) in storage.persons" :key="idx">
    <div class="text-field-container">
      <v-text-field
        v-model="this.storage.persons[idx].name"
        placeholder="Введите имя"
        max-width="250"
        maxlength="10"
      ></v-text-field>
    </div>
    <v-btn class="ml-auto" color="red" variant="tonal" @click="removePerson(idx)">Удалить</v-btn>
  </div>
</transition-group>
  <div class="people noPeople" v-if="!storage.persons.length">
    <span>Нам нужен список имен</span>
  </div>
</template>

<script>
import { useStorage } from '@/stores/storage'
export default {
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
.people-list-enter-active,
.people-list-leave-active {
  transition: all 0.3s ease;
}
.people-list-enter-from,
.people-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
