<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">제조사 조회</div>
      <select-maker
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-maker>
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
          :items="getSelectMaker"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="makerDetails"
        ></b-table>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectMaker from "../../components/select/SelectMaker.vue";
import * as XLSX from "xlsx";
// import { mapGetters } from 'vuex'

export default {
  components: {
    SelectMaker,
  },
  data() {
    return {
      message: "testSelView",
      getSelectMaker: [],
      fields: [
        { key: "makerName", label: "제조사명", sortable: true, thClass: "w10" },
        { key: "className", label: "제조업종", sortable: true, thClass: "w10" },
        {
          key: "importProduct",
          label: "주요제품",
          sortable: true,
          thClass: "w20",
        },
        { key: "process", label: "주요공정", sortable: true, thClass: "w15" },
        { key: "sales", label: "매출액", sortable: true, thClass: "w10" },
        {
          key: "makerPerson",
          label: "거래처 담당자",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "makerPhone",
          label: "거래처 연락처",
          sortable: true,
          thClass: "w15",
        },
      ],
      spinnerState: false,
    };
  },
  created() {},
  mounted() {
    this.openSpinner();
  },
  computed: {
    // ...mapGetters('makerStore', [
    //   'getSelectMaker'
    // ]),
    SelectMaker() {
      return this.$store.getters["makerStore/getSelectMaker"];
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectMaker(val) {
      console.log(val);
      this.getSelectMaker = val;
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.getSelectMaker);
      XLSX.utils.book_append_sheet(workBook, workSheet, "제조사 목록");
      XLSX.writeFile(workBook, "제조사 목록.xlsx");
    },
    // 더블 클릭 이벤트
    makerDetails(item) {
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