<template>
  <div class="body">
    <div class="title" v-if="inputRead">검수 상세 정보</div>
    <div class="title" v-else>검수 정보 수정</div>
    <div >
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
      message:"updateView",
      inputRead: "true"
    };
  },
  created() {
    console.log("inspectUpView 들어옴");
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
