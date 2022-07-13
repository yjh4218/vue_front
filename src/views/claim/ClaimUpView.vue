<template>
  <div class="body">
    <div class="title" v-if="inputRead">클레임 상세 정보</div>
    <div class="title" v-else>클레임 정보 수정</div>
    <div>
      <claim-input-list :propsdata="message"></claim-input-list>
    </div>
  </div>
</template>

<script>
import claimInputList from "../../components/inpuList/ClaimInputList.vue";

export default {
  components: {
    claimInputList,
  },
  data() {
    return {
      message: "updateView",
      inputRead: "true",
    };
  },
  created() {
    console.log("inspectUpView 들어옴");
    // checkConfirm();
  },
  computed: {},
  methods: {
    // inpuReadMode() {
    //   this.inputRead = false;
    // },
  },
};
</script>

<style scoped></style>
