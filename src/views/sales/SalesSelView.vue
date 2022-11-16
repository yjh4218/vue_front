<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">판매량 조회</div>
      <select-sales
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-sales>
      <div class="row">
        <div class="col-md-12">
          <b-button variant="primary" class="right-box" v-on:click="download"
            >엑셀다운</b-button
          >
        </div>
      </div>
      <div>
        <b-table
          sticky-header="72vh"
          responsive
          striped
          hover
          :items="getSelectSales"
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
import SelectSales from "../../components/select/SelectSales.vue";
import * as XLSX from "xlsx";
// import { mapGetters } from 'vuex'

export default {
  components: {
    SelectSales,
  },
  data() {
    return {
      message: "testSelView",
      getSelectSales: [],
      fields: [
        { key: "skuNo", label: "SKU-NO", sortable: true },
        { key: "productName", label: "제품명", sortable: true },
        { key: "jan", label: "1월", sortable: true },
        { key: "feb", label: "2월", sortable: true },
        { key: "mar", label: "3월", sortable: true },
        { key: "apr", label: "4월", sortable: true },
        { key: "may", label: "5월", sortable: true },
        { key: "jun", label: "6월", sortable: true },
        { key: "jul", label: "7월", sortable: true },
        { key: "aug", label: "8월", sortable: true },
        { key: "sep", label: "9월", sortable: true },
        { key: "oct", label: "10월", sortable: true },
        { key: "nov", label: "11월", sortable: true },
        { key: "december", label: "12월", sortable: true },
      ],
      spinnerState: false,
    };
  },
  created() {},
  mounted() {
    // this.openSpinner();
  },
  computed: {
    // ...mapGetters('makerStore', [
    //   'getSelectSales'
    // ]),
    SelectMaker() {
      return this.$store.getters["salesStore/getSelectSales"];
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectMaker(val) {
      console.log(val);
      this.getSelectSales = val;
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.getSelectSales);
      XLSX.utils.book_append_sheet(workBook, workSheet, "제조사 목록");
      XLSX.writeFile(workBook, "제조사 목록.xlsx");
    },
    // 더블 클릭 이벤트
    inspectDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);

      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_MAKER", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_MAKER", item);
      this.$router.push(`/makerUp/${item.id}`);
    },
    // 스피너 열기
    openSpinner() {
      console.log("openSpinner 열림");
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner() {
      console.log("closeSpinner 닫기 ");
      this.spinnerState = false;
    },
  },
};
</script>

<style scoped>
.right-box {
  float: right;
  width: auto;
}
</style>