<template>
    <sales-input-list :propsdata="message"></sales-input-list>
</template>

<script>
import salesInputList from "../../components/inpuList/SalesInputList.vue";

export default {
  components:{
    salesInputList
  },
  data() {
    return {
      message: "updateSales",
    };
  },

}
</script>

<style>

</style>