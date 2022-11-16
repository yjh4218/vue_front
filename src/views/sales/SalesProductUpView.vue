<template>
  <div class="body">
    <div class="title" v-if="inputRead">판매 제품 정보</div>
    <div class="title" v-else>판매 제품 정보 수정</div>
    <div >
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
      message:"updateView",
      inputRead: "true"
    };
  },
  created() {
    console.log("SalesProductUp 들어옴");
    // checkConfirm();
  },
  computed: {
  },
  methods: {
    
    // inpuReadMode() {
    //   this.inputRead = false;
    // },
  },
};
</script>

<style scoped>

</style>
