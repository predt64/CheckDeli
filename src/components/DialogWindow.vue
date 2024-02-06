<template>    <!--Компонент диалогове окно с выбором плательщика-->
  <v-dialog
          v-model="myDialog[idx]"            
            scrollable
            width="auto"
            transition="dialog-bottom-transition"
          >      <!--двустороннее связывание с локальной переменной myDialog равной переданному пропсом dialog, т.к. при закрытии и открытии dialog должен изменяться, а из дочернего компонента родительские переменные мы изменять не можем -->
            <template v-slot:activator="{props}"> <!--последующий код в основном взят с vueitfy и модифицирован под нужды автора-->
              <v-btn
              color="#A3B18A"
              v-bind="props"
              class="people-list dialog">
              Платит: {{storage.persons[storage.meals[idx].payer].name}}
            </v-btn>
            </template>
            <v-card>
              <v-card-title>Выберите плательщика</v-card-title>
              <v-divider/>
              <v-card-text style="height: 300px;">
                <v-radio-group
                v-model="storage.meals[idx].payer"
                column>
                  <v-radio v-for="(person, index) in storage.persons" 
                  :key="person.name"
                  :label="`${person.name}`"
                  :value=index></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider/>
              <v-card-actions>
                <v-btn
                  color="#A3B18A"
                  variant="text"
                  @click="myDialog[idx]=false">
                Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script>
  import { useStorage } from '@/stores/storage'
export default {
  props:{
    dialog:{
      type:Array,
      required:true
    },
    idx:{
      type:Number,
      required:true,
    }
  },
  setup() {
    const storage = useStorage()
    return { storage }
  },
  data(){
    return{
      myDialog:this.dialog,
    }
  }
  }
</script>

<style lang="scss" scoped>
.dialog{
  margin-top: 5px;
  margin-left: 22px;
}
</style>