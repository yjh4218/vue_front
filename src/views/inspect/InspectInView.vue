<template>
  <div class="body">
    <div class="title">출고 검사 등록</div>
    <div class="divInsert">
      <inspect-input-list :propsdata="message"></inspect-input-list>
    </div>
  </div>
</template>

<script>
import inspectInputList from '../../components/inpuList/InspectInputList.vue'

export default {
  components: {
    inspectInputList,
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