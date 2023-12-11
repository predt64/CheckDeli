<template>
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
                      if(storage.meals[idx].price.length>8) storage.meals[idx].price =storage.meals[idx].price.slice(0,-1)"
              placeholder="Введите цену"
              max-width="250"
            > </v-text-field>
          </div>
          <v-btn
            class="ml-auto"
            size="small"
            icon="mdi-delete"
            color="red"
            @click="RemoveMeal(idx)"
          ></v-btn>
        </div>
</template>

<script>
import { useStorage } from '@/stores/storage'
export default {
  props:['idx'],
  setup() {
    const storage = useStorage()
    return { storage }
  }, 
  methods:{
      RemoveMeal(idx){
        this.$emit('RemoveMeal', idx);
      }
    }
}
</script>

<style src="@/css/style.css">

</style>