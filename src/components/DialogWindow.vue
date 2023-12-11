<template>    
  <v-dialog
          v-model="myDialog[idx]"
            scrollable
            width="auto"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{props}">
              <v-btn
              color="primary"
              v-bind="props"
              class="people-list dialog">
              Платит: {{storage.persons[storage.meals[idx].payer].name}}
            </v-btn>
            </template>
            <v-card>
              <v-card-title>Выберите плательщика</v-card-title>
              <v-divider></v-divider>
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
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="blue-darken-1"
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
  props:['dialog', 'idx'],
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

</style>