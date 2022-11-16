<template>
  <div>
    <div class="title">상품 조회</div>
    <b-overlay :show="spinnerState" rounded="sm">
      <select-product
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-product>
      <div class="row">
        <div class="col-md-12"> 
          <b-button variant="primary" class="right-box" v-on:click="download" :disabled="getSelectProduct.length === 0"
            >엑셀다운</b-button
          >
        </div>
      </div>

      <div>
        <b-table
          ref="table"
          sticky-header="72vh"
          responsive
          striped
          hover
          :items="getSelectProduct"
          :fields="fields"
          :per-page="0"
          :current-page="currentPage"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="productDetails"
        ></b-table>
      </div>
      <div>
        <b-pagination
          v-model="currentPage"
          @page-click="pageChange"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
        >
          <!-- aria-controls="product-table" -->
        </b-pagination>
      </div>
    </b-overlay>

    <!-- 모달창. -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'excelDataDown'">
          <div v-if="excelDownState">
            <p>엑셀 다운이 완료되었습니다.</p>
          </div>
          <div v-else>
            <p>엑셀 다운에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'noAdmin'">
          <p>관리자가 아니기 때문에 엑셀 다운 할 수 없습니다.</p>
          <p>관리자에게 요청해주시기 바랍니다.</p>
        </div>

        <template slot="footer">
          <button @click="modalText">확인</button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import SelectProduct from "../../components/select/SelectProduct.vue";
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
import * as XLSX from "xlsx";

export default {
  components: {
    SelectProduct,
    confirmModal,
  },
  mixins: [modalMixin, adminChkMixin],
  data() {
    return {
      message: "productSelView",
      getSelectProduct: [],
      fields: [
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w10" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "brandName", label: "브랜드명", sortable: true, thClass: "w10" },
        { key: "className", label: "분류", sortable: true, thClass: "w5" },
        { key: "expDate", label: "유통기한", sortable: true, thClass: "w10" },
        { key: "maker", label: "제조사", sortable: true, thClass: "w15" },
        { key: "makeDate", label: "출시일자", sortable: true, thClass: "w10" },
      ],
      curseIdList: [],
      spinnerState: false,
      excelDownState: false,
      perPage: 15,
      currentPage: 1,
      totalRows: 0,
    };
  },
  props: ["salesProduct"],
  methods: {
    //엑셀 다운로드를 위한 데이터 검색
    download() {
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";
      } else {
        this.openSpinner();
        let tmpSearchData = this.$store.getters["productStore/getSearchData"];

        console.log("tmpSearchData");
        console.log(tmpSearchData);

        let data = {
          downExcel: "excel",
          skuNo: tmpSearchData.skuNo,
          productName: tmpSearchData.productName,
          brandName: tmpSearchData.brandName,
          maker: tmpSearchData.maker,
          className: tmpSearchData.className,
        };

        this.$store
          .dispatch("productStore/SELECT_PRODUCT", data)
          .then((response) => {
            this.modalName = "excelDataDown";
            let excelData = response.data;
            this.excelDownState = true;
            console.log("excel 다운 선택");
            console.log(response);
            console.log(response.data);
            const workBook = XLSX.utils.book_new();
            const workSheet = XLSX.utils.json_to_sheet(excelData);
            XLSX.utils.book_append_sheet(workBook, workSheet, "상품목록");
            XLSX.writeFile(workBook, "상품목록.xlsx");
            this.closeSpinner();
            this.openModal();
          })
          .catch((error) => {
            this.excelDownState = false;
            console.log("error 발생");
            console.log(error);
            this.openModal();
          });
      }

      
    },
    // 조회된 데이터로 엑셀 데이터 제작
    makeExcel() {},
    // 더블 클릭 이벤트
    productDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);

      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_PRODUCT", "");

      var tempData = {};

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      if (this.$route.name === "selectAllProduct") {
        this.$store.commit("SET_PRODUCT", item);
        this.$router.push(`/productUp/${item.skuNo}`);
      }
      // 신규 검수 등록 화면에서 데이터 입력일 경우
      else if (
        this.$route.name === "inspectInView" ||
        this.$route.name === "claimInView"
      ) {
        tempData = {
          productId: item.id,
          skuNo: item.skuNo,
          productName: item.productName,
          className: item.className,
        };
        console.log("tempData : " + tempData);
        this.$store.commit("SET_PRODUCT", tempData);
        this.$emit("selectProductCheck");
      } else if (
        this.$route.name === "salesProductInView" ||
        this.$route.name === "salesProductUp"
      ) {
        tempData = {
          salesProduct: this.salesProduct,
          productId: item.id,
          skuNo: item.skuNo,
          productName: item.productName,
        };
        console.log(tempData);
        this.$store.commit("SET_PRODUCT", tempData);
        this.$emit("selectProductCheck");
      }
    },
    pageChange(button, page) {
      this.openSpinner();
      console.log("페이지 변경 클릭 : ");

      // 검색 데이터 저장
      let data = {
        productCurseId: this.curseIdList[page - 1],
      };

      // 페이지에 맞는 데이터 검색
      this.$store.dispatch("productStore/SELECT_PAGE_PRODUCT", data);
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
  computed: {
    // 조회된 데이터 vuex를 통해 저장함.
    // ...mapGetters(["getSelectProduct"]),
    SelectProduct() {
      return this.$store.getters["productStore/getSelectProduct"];
    },
    rows() {
      return this.totalRows;
    },
  },
  mounted() {
    this.openSpinner();
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectProduct(val) {
      console.log("검색완료됨. 테이블 입력");
      let tmpSearchData = this.$store.getters["productStore/getSearchData"];
      if (tmpSearchData.page === 0) {
        // 총 검색 수량 확인
        this.totalRows = val.selectCnt;
        // 조회 curseId 확인
        this.curseIdList = val.idList;
        let data = {
          page: -1,
          skuNo: tmpSearchData.skuNo,
          productName: tmpSearchData.productName,
          brandName: tmpSearchData.brandName,
          maker: tmpSearchData.maker,
          className: tmpSearchData.className,
        };
        // 검색 데이터 저장
        this.$store.commit("productStore/SET_SEARCH_DATA", data);
      }

      this.getSelectProduct = val.data;

      this.closeSpinner();
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
