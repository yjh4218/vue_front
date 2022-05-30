<template>
  <div class="body">
      <div class="title">상품 조회</div>
      <select-product></select-product>
      <div class="tableCss">
        <!-- <b-table striped hover :product="products"></b-table> -->
        <table >
          <thead>
                <th v-for="item in header" v-bind:key="item.skuNo">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in this.$store.state.allProducts" v-bind:key="item.skuNo">
                    <td>{{ item.skuNo }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.brandName }}</td>
                    <td>{{ item.className }}</td>
                    <td>{{ item.expDate }}</td>
                    <td>{{ item.maker }}</td>
                    <td>{{ item.makeDate }}</td>
                    <!-- <td v-for="item in line" v-bind:key="item.skuNo">{{ item }}</td> -->
                </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue';

export default {
  components:{
    SelectProduct
  },
  data() {
      return {
        header:["skuNo", "제품명","브랜드명","분류", "유통기한", "제조사", "출시일자"]
      }
  },
  created(){
    this.$store.dispatch("SELECT_ALL_PRODUCT", this.$route.name);
  }
}
</script>

<style>

</style>