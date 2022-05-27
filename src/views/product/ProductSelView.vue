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
          skuNo:'',
          productName:'',
          brandName:'',
          className:'',
          maker:'',
          makeDate:'',
          expDate:''
        }
      }
  },
  created(){
    // this.$store.dispatch("FETCH_USER", userName);
    axios.get('/selectProducts')
        .then(response => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
        });
  }
}
</script>

<style>

</style>