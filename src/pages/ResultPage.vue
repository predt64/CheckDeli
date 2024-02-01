<template>
  <!--вызов основной функции подсчета долгов-->
  <div class="people noPeople result">
    <span>Результаты следующие:</span>
  </div>
  <v-card class="mx-auto overflow-y-auto v-card resultcard" max-width="500" max-height="495">
    <div class="debt" v-for="(person, idx) in storage.persons" :key="person.id">
      <p>
        пользователь <b>{{ person.name }}</b> должен:
      </p>
      <p v-if="checkDebt(storage.persons[idx].debt)">Да никому он не должен, живет как хочет</p>
      <!--вызов функции проверки наличия долгов, если их нет, то показ соответствующего сообщения-->
      <p v-else v-for="(debt, index) in storage.persons[idx].debt" :key="person.id-100" v-show="debt">
        {{ storage.persons[index].name }} : <b>{{ debt }}</b>
      </p>
      <!--отображение долга человека другим людям, если он кому то ничего не должен, то это отображаться не будет-->
    </div>
    {{counter}}
  </v-card>
</template>

<script>
import { useStorage } from '@/stores/storage' //подключение хранилища

export default {
  setup() {
    const storage = useStorage()
    return { storage }
  },
  data() {
    return {
    }
  },
  methods: {
    // функция высчтитывает сумму, которую каждый употребивий соответствующее блюдо человек должен заплатить,
    //чтобы полностью покрыть стоймость блюда,
    //т.е. если блюдо стоит 500 и 2 человека ело ее, то partial price блюда будет равна 250
    //и в послеедующем  в ячейку debt каждого употреблявшего будет добавлена соответствующая сумма
    calculatePartialPrice() {
      this.storage.meals.map(
        (meal) =>
          (meal.partialPrice = Number(meal.price) / meal.eater.reduce((acc, curr) => acc + curr))
      )
    },
    //проверка на наличие взаимных долгов между людьми и их последующее вычетание друг из друга
    checkSame() {
      for (let i = 0; i < this.storage.persons.length; i++) {
        for (let j = i; j < this.storage.persons[i].debt.length; j++) {
          if (
            i != j &&
            this.storage.persons[i].debt[j] > 0 &&
            this.storage.persons[j].debt[i] > 0
          ) {
            //проверка, у кого долг больше, наверное, можно было бы сделать как ниудь умнее и лаконичнее через модуль разницы или через функцию max(),
            //но это вроде самое понятное решение и, вероятно, не самое медленное, так что его было решено оставить
            if (this.storage.persons[i].debt[j] > this.storage.persons[j].debt[i]) {
              this.storage.persons[i].debt[j] -= this.storage.persons[j].debt[i]
              this.storage.persons[j].debt[i] = 0
            } else {
              this.storage.persons[j].debt[i] -= this.storage.persons[i].debt[j]
              this.storage.persons[i].debt[j] = 0
            }
          }
        }
      }
    },
    // проверка наличия долгов у пользователя, нужна для отображения сообщения при их отсутствии
    checkDebt(debt) {
      for (let item of debt) if (item) return 0
      return 1
    },
    result(){
       //вызов функции по подсчету частичной цены позиции
       this.calculatePartialPrice()
      //итерируемся по массиву введенных позиций, в нем итерируемся по массиву употреблявших ее, если person==1
      //(что значит, что человек был выделен как употреблявший данное блюдо) и если данный человек не является
      //плательщиком за это блюдо, то прибавляем к долгу человека partialPrice за соответствующее блюдо,
      //долг записывается в ячекйку, соответствующую плательщику за это блюдо.
      this.storage.meals.map((meal, idx) =>
        meal.eater.map((person, index) =>
          person == 1 && index != this.storage.meals[idx].payer
            ? (this.storage.persons[index].debt[this.storage.meals[idx].payer] +=
                this.storage.meals[idx].partialPrice)
            : (this.storage.persons[index].debt[this.storage.meals[idx].payer] += 0)
        )
      )
      //проверка на наличие взаимных долгов и их редуцирование
      this.checkSame()
    }
  },
  mounted(){
    this.result()
  }
}
</script>

<style lang="scss" scoped>
.result {
  margin-top: 20px;
  background-color: #a3b18a;
}
.resultcard {
  margin-top: 20px;
}
</style>
