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
        :items="allInspect"
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
// import { mapGetters } from "vuex";

export default {
  
  components:{
    SelectProduct 
  },
  data() {
    return {
      message: "testSelView",
      allInspect:[],
      fields: [        
        { key: "inspectDate", label: "검수날짜", sortable: true, thClass: "w15" },
        { key: this.getAllInspect.product.skuNo, label: "skuNo", sortable: true, thClass: "w15" },
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
    // 처음에 전체 검수 조회 함
    this.$store.dispatch("SELECT_ALL_INSPECT", this.$route.name);
  },
  computed:{
    // ...mapGetters(["getAllInspect"]),
    // 제품 조회 및 결과값 입력
    selectAllInspect(){
      return this.$store.getters.getAllInspect;
    },
  },
   watch: {
    // 제품 조회 및 결과값 입력
    selectAllInspect(val){
      console.log("확인 : ");
      [].forEach.call(val, element => {
        element.skuNo = element.product.skuNo;
        console.log(element);
      });
      this.allInspect = val;
      // this.skuNo = val.skuNo;
      // this.productName = val.productName;
    },
   }

};
</script>

<style></style>
