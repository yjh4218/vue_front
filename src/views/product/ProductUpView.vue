<template>
  <div class="body">
    <div class="title" v-if="inputRead">상품 상세 정보</div>
    <div class="title" v-else>상품 정보 수정</div>
    <div >
      <product-input-list :propsdata="message"></product-input-list>
    </div>
  </div>
</template>

<script>
import productInputList from "../../components/ProductInputList.vue";

export default {
  components: {
    productInputList,
  },
  data() {
    return {
      message:"updateView",
      inputRead: "true"
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    inpuReadMode() {
      this.inputRead = false;
    },
  },
};
</script>

<style scoped>

</style>
