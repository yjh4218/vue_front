<template>
  <div class="body">
    <div class="title">출고 검사 등록</div>
    <div class="divInsert">
      <test-input-list :propsdata="message"></test-input-list>
    </div>
  </div>
</template>

<script>
import testInputList from "../../components/TestInputList.vue";

export default {
  components: {
    testInputList,
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

<style>

</style>