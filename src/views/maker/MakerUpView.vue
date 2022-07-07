<template>
  <div class="body">
    <div class="title" v-if="inputRead">제조사 상세 정보</div>
    <div class="title" v-else>제조사 정보 수정</div>
    <div >
      <maker-input-list :propsdata="message"></maker-input-list>
    </div>
  </div>
</template>

<script>
import makerInputList from "../../components/inpuList/makerInputList.vue";

export default {
  components: {
    makerInputList,
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
