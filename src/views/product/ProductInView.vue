<template>
  <div class="body">
    <div class="title">신규 상품 등록</div>
    <div class="divInsert">
      <product-input-list :propsdata="message"></product-input-list>
    </div>
  </div>
</template>

<script>
import productInputList from "../../components/inpuList/ProductInputList.vue";

export default {
  components: {
    productInputList,
  },
  data() {
    return {
      message: "insertView",
    };
  },
  created() {
  },
  computed: {
    skuInfo() {
      return this.$store.state.selectProduct;
    },
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>
