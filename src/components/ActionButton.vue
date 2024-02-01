<template>            <!--кнопка, пропсом принимаем желаемый текст внутри блока-->
    <v-sheet max-width="300" class="mx-auto sheet">
        <v-btn
          class="mb-1"
          block
          rounded="lg"
          size="x-large"
          color="#DAD7CD">
          {{ name }}
        </v-btn>
      </v-sheet>
</template>

<script>
export default{
  props:{
    name:{
      type:String,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>