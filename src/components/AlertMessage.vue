<template>
  <v-alert
          type="warning"
          title="Ошибка!"
          text="Введите еще хотя бы 2-х пользователей!"
          v-show="0 == state"
        >
        <button @click="reset" class="alert-button"
        >x</button></v-alert>
</template>

<script>
  export default {
    methods:{
      reset(){
        this.$emit('reset');
      }
    }
  }
</script>

<style lang="scss" scoped>
.alert-button{
  border: none;
  background-color: rgb(251, 140, 0)s;
  position: absolute;
  top: 3px;
  right: 10px;
  font-size: 16px;
}
</style>