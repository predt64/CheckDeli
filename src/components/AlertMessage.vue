<template>
  <!--Сообщение об ошибке-->
  <v-alert type="warning" title="Ошибка!">
    <slot></slot>
    <button @click="reset" class="alert-button">
      x
    </button>
    </v-alert>
  <!--При клике вызываем функцию reset, которую эмитим в родительский компонент, чтобы убрать сообщение об ошибке-->
</template>

<script>
export default {
  emits: ['reset'],
  methods: {
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-button {
  border: none;
  background-color: rgb(251, 140, 0) s;
  position: absolute;
  top: 3px;
  right: 10px;
  font-size: 16px;
}
</style>
