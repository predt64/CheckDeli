<template>            <!--кнопка, пропсом принимаем желаемый текст внутри блока-->
    <v-sheet max-width="300" class="mx-auto sheet">
        <v-btn
          class="mb-1"
          block
          rounded="lg"
          size="x-large"
          color="light-green">
          {{ name }}
        </v-btn>
      </v-sheet>
</template>

<script setup>
defineProps(['name'])
</script>

<style lang="scss" scoped>

</style>