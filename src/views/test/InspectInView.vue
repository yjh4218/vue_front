<template>
  <div class="body">
    <div class="title">출고 검사 등록</div>
    <div class="divInsert">
      <inspect-input-list :propsdata="message"></inspect-input-list>
    </div>
  </div>
</template>

<script>
import inspectInputList from '../../components/InspectInputList.vue'

export default {
  components: {
    inspectInputList,
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