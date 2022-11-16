<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">클레임 조회</div>
      <select-product
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-product>
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
          :items="getSelectClaim"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="claimDetails"
        ></b-table>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectProduct from "../../components/select/SelectProduct.vue";
import * as XLSX from "xlsx";

export default {
  components: {
    SelectProduct,
  },
  data() {
    return {
      message: "testSelView",
      getSelectClaim: [],
      fields: [
        {
          key: "claimDate",
          label: "클레임 발생 일자",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "product.skuNo",
          label: "skuNo",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "product.productName",
          label: "제품명",
          sortable: true,
          thClass: "w20",
        },
        {
          key: "product.className",
          label: "제품분류",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "claimDecide",
          label: "클레임 분류",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "claimContent",
          label: "클레임 내용",
          sortable: true,
          thClass: "w20",
        },
        {
          key: "lotDate",
          label: "유통기한(LOT)",
          sortable: true,
          thClass: "w10",
        },
        { key: "recall", label: "회수여부", sortable: true, thClass: "w10" },
      ],
      spinnerState: false,
    };
  },
  created() {},
  mounted() {
    this.openSpinner();
  },
  computed: {
    Selectclaim() {
      return this.$store.getters["claimStore/getSelectClaim"];
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    Selectclaim(val) {
      this.getSelectClaim = val;
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.getSelectClaim);
      XLSX.utils.book_append_sheet(workBook, workSheet, "제조사 목록");
      XLSX.writeFile(workBook, "제조사 목록.xlsx");
    },
    // 더블 클릭 이벤트
    claimDetails(item) {
      this.$store.commit("SET_CLAIM", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_CLAIM", item);
      this.$router.push(`/claimUp/${item.id}`);
    },
    // 스피너 열기
    openSpinner() {
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner() {
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