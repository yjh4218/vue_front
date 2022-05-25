<template>
  <div class="body">
      <div class="title">상품 조회</div>
      <select-product></select-product>
      <div>
        <b-table striped hover :items="items"></b-table>
      </div>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue'

export default {
  components:{
    SelectProduct
  },
  data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
  }
}
</script>

<style>

</style>