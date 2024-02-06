<template>
  <!--компонент ввода навзвания и цены позиции а так же ее удалиние, схож по архитектуре с аналогичным компонентом InputPeople-->
  <div class="people">
    <div class="text-field-container">
      <v-text-field
        class="text-field"
        v-model="this.storage.meals[idx].name"
        placeholder="Введите название"
        maxlength="10"
        max-width="250"
      ></v-text-field>
    </div>
    <div class="text-field-container">
      <v-text-field
        class="text-field"
        v-model="this.storage.meals[idx].price"
        type="number"
        placeholder="Введите цену"
        max-width="250"
        @input="checkLength"
      >
      </v-text-field>
      <!--внутри текст-филд проверки на длину введенной цены, ее максимальное и минимальное значение-->
    </div>
    <v-btn
      class="ml-auto"
      size="small"
      icon="mdi-delete"
      color="#E63946"
      @click="removeMeal(idx)"
    ></v-btn>
  </div>
</template>

<script>
import { useStorage } from '@/stores/storage'
export default {
  emits:['removeMeal'],
  props:{
    idx:{
      type:Number,
      requred:true,
    }
  },
  setup() {
    const storage = useStorage()
    return { storage }
  },
  methods: {
    removeMeal() {
      this.$emit('removeMeal')
    },
    checkLength(){
      const currentPrice=Number(this.storage.meals[this.idx].price)

      if (currentPrice > 99999) this.storage.meals[this.idx].price = '99999'
      if (currentPrice < 1) this.storage.meals[this.idx].price = ''
    }
  }
}
</script>

<style></style>
