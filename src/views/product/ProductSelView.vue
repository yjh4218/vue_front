<template>
  <div class="body">
      <div class="title">상품 조회</div>
      <select-product></select-product>
      <div>
        <b-table striped hover :product="products"></b-table>
      </div>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue';
import axios from "axios";

export default {
  components:{
    SelectProduct
  },
  data() {
      return {
        products:{
          sku_no:'',
          productName:'',
          brandName:'',
          maker:''
        }
      }
  },
  created(){
    // this.$store.dispatch("FETCH_USER", userName);
    axios.get('/selectProducts', this.products)
        .then(response => {
          console.log(response);
        })
        .catch((error) => console.log(error));
  }
}
</script>

<style>

</style>