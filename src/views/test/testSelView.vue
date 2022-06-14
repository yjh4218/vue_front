<template>
  <div class="body">
    <div class="title">입고검수 조회</div>
    <select-product :propsdata="message"></select-product>
    <div>
      <!-- <table>
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
          <td><span v-html="item.skuno"></span></td>
          <td><span v-html="item.productName"></span></td>
          <td><span v-html="item.incomeCheck"></span></td>
          <td><span v-html="item.incomeContent"></span></td>
          <td><span v-html="item.note"></span></td>
        </tr>
      </table> -->
      <b-table
        striped
        hover
        :items="getAllProduct"
        :fields="fields"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        @row-dblclicked="productDetails"
      ></b-table>
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
      message: "testSelView",
      fields: [
        
        { key: "date", label: "날짜", sortable: true, thClass: "w15" },
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "testCheck", label: "검수결과", sortable: true, thClass: "w15" },
        { key: "testContent", label: "검수내용", sortable: true, thClass: "w15" },
        { key: "lotNumber", label: "유통기한(LOT)", sortable: true, thClass: "w15" },
        { key: "note", label: "비고", sortable: true, thClass: "w15" },
      ],
    };
  },
  created() {
    console.log("incomeselview");
  },
};
</script>

<style></style>
