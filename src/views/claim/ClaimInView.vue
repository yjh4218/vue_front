<template>
  <div class="body">
    <div class="title">클레임 등록</div>
    <div class="divInsert">
      <claim-input-list :propsdata="message"></claim-input-list>
    </div>
  </div>
</template>

<script>
import ClaimInputList from '../../components/inpuList/ClaimInputList.vue'

export default {
  components: {
    ClaimInputList,
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