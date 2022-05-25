<template>
  <div class="body">
    <div class="title">입고검수 조회</div>
    <select-product></select-product>
    <div>
      <table>
        <tr>
          <th>날짜</th>
          <th>SKU-NO</th>
          <th>제품명</th>
          <th>검수결과</th>
          <th>검수내용</th>
          <th>비고</th>
          <th>asdas</th>
        </tr>
        <tr v-for="item in items" :key="item.title">
          <td><span v-html="item.date"></span></td>
          <!-- <td><a target="_blank" :href="item.link">{{item.link}}</a></td> -->
          <!-- <td><img v-bind:src="item.image"></td> -->
          <td><span v-html="item.skuno"></span></td>
          <td><span v-html="item.productName"></span></td>
          <td><span v-html="item.incomeCheck"></span></td>
          <td><span v-html="item.incomeContent"></span></td>
          <td><span v-html="item.note"></span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue'

export default {
  components:{
    SelectProduct 
  },
  data() {
    return {
      items: [
        {
          date: "2022-02-12",
          skuno: "0000000000",
          productName: "Test1",
          incomeCheck: "O",
          incomeContent: "검수 중 성상이 약간 부적합 하였음",
          note: "없음",
        },
        {
          date: "2022-02-12",
          skuno: "0000000000",
          productName: "Test1",
          incomeCheck: "O",
          incomeContent: "검수 중 성상이 약간 부적합 하였음",
          note: "없음",
        },
        {
          date: "2022-02-12",
          skuno: "0000000000",
          productName: "Test1",
          incomeCheck: "O",
          incomeContent: "검수 중 성상이 약간 부적합 하였음",
          note: "없음",
        },
        {
          date: "2022-02-12",
          skuno: "0000000000",
          productName: "Test1",
          incomeCheck: "O",
          incomeContent: "검수 중 성상이 약간 부적합 하였음",
          note: "없음",
        },
        {
          date: "2022-02-12",
          skuno: "0000000000",
          productName: "Test1",
          incomeCheck: "O",
          incomeContent: "검수 중 성상이 약간 부적합 하였음",
          note: "없음",
        },
      ],
    };
  },
  created() {
    console.log("incomeselview");
  },
};
</script>

<style></style>
