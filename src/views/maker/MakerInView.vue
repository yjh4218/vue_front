<template>
  <div class="body">
    <div class="title">제조사 등록</div>
    <div class="divInsert">
      <maker-input-list :propsdata="message"></maker-input-list>
    </div>
  </div>
</template>

<script>
import makerInputList from '../../components/inpuList/makerInputList.vue'

export default {
  components: {
    makerInputList,
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