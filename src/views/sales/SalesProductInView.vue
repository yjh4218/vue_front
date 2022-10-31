<template>
  <div class="body">
    <div class="title">판매 제품 등록</div>
    <div class="divInsert">
      <sales-product-input-list :propsdata="message"></sales-product-input-list>
    </div>
  </div>
</template>

<script>
import SalesProductInputList from '../../components/inpuList/SalesProductInputList.vue'

export default {
  components: {
    SalesProductInputList,
  },
  data() {
    return {
      message: "insertView",
    };
  },
};
</script>

<style>

</style>