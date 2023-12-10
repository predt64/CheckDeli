<script>
export default {
  data(){
    return{
      executed:false
    }

  },
  methods: {
    RedirectMain(){
      if(this.executed==false)
      {
        this.$router.push('/people')
      this.executed=true
      }
    },
  }
}
</script>

<template>
  {{ RedirectMain() }}
  <router-view></router-view>
</template>

<style>

</style>
