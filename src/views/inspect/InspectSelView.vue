<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">입고검수 조회</div>
      <select-product :propsdata="message" @spinnerStart="openSpinner"></select-product>
      <b-button variant="primary" class="right-box" v-on:click="download">엑셀다운</b-button>
      <div>
        <b-table
          striped
          hover
          :items="getSelectInspect"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="inspectDetails"
        ></b-table>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue'
import * as XLSX from 'xlsx'

export default {
  
  components:{
    SelectProduct 
  },
  data() {
    return {
      message: "testSelView",
      getSelectInspect:[],
      fields: [        
        { key: "inspectDate", label: "검수날짜", sortable: true, thClass: "w15" },
        { key: "product.skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "product.productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "product.className", label: "제품분류", sortable: true, thClass: "w30" },
        { key: "decideResult", label: "검수결과", sortable: true, thClass: "w15" },
        { key: "inspectContent", label: "검수내용", sortable: true, thClass: "w15" },
        { key: "lotDate", label: "유통기한(LOT)", sortable: true, thClass: "w15" },
        { key: "moisture", label: "수분율(%)", sortable: true, thClass: "w15" },
      ],
      spinnerState: false,
    };
  },
  created() {

  },
  mounted(){
    this.openSpinner();
  },
  computed:{
    SelectInspect(){
      return this.$store.getters.getSelectInspect;
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectInspect(val){
      this.getSelectInspect = val;
      this.closeSpinner();
    },
  },
  methods:{
    //엑셀 다운로드
    download() {
      console.log("확인");
      const workBook = XLSX.utils.book_new()
      const workSheet = XLSX.utils.json_to_sheet(this.getSelectInspect)
      XLSX.utils.book_append_sheet(workBook, workSheet, '제조사 목록')
      XLSX.writeFile(workBook, '제조사 목록.xlsx')
    },
    // 더블 클릭 이벤트
    inspectDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);
      
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_INSPECT", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_INSPECT", item);
      this.$router.push(`/inspectUp/${item.id}`);
    },
    // 스피너 열기
    openSpinner(){
      console.log("openSpinner 열림");
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner(){
      console.log("closeSpinner 닫기 ");
      this.spinnerState = false;
    },
  },
  
};
</script>

<style scoped>
.right-box {
  float: right;
  width:auto;
}
</style>
