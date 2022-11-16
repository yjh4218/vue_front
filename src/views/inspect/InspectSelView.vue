<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">입고검수 조회</div>
      <select-product
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-product>
      <div class="row">
        <div class="col-md-12">
          <b-button variant="primary" class="right-box" v-on:click="download" :disabled="getSelectInspect.length === 0"
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
          :items="cptItems"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="inspectDetails"
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
import confirmModal from "../../components/modal/ConfirmModal.vue";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
import { modalMixin } from "../../mixins/modalMixin.js";
import * as XLSX from "xlsx";

export default {
  components: {
    SelectProduct,
    confirmModal
  },
  mixins: [modalMixin, adminChkMixin],
  data() {
    return {
      message: "testSelView",
      getSelectInspect: [],
      fields: [
        {
          key: "inspectDate",
          label: "검수날짜",
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
          key: "decideResult",
          label: "검수결과",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "inspectContent",
          label: "검수내용",
          sortable: true,
          thClass: "w20",
        },
        {
          key: "lotDate",
          label: "유통기한(LOT)",
          sortable: true,
          thClass: "w10",
        },
        { key: "moisture", label: "수분율(%)", sortable: true, thClass: "w10" },
      ],
      curseIdList: [],
      spinnerState: false,
      excelDownState: false,
      perPage: 15,
      currentPage: 1,
      totalRows: 0,
    };
  },
  created() {},
  mounted() {
    this.openSpinner();
  },
  computed: {
    SelectInspect() {
      return this.$store.getters["inspectStore/getSelectInspect"];
    },
    rows() {
      return this.totalRows;
    },
    // 검수결과 부적합 제품 테이블 row 색상 변경
    cptItems(){
      return this.getSelectInspect.map((item)=>{
        let tmp=item;
        item.decideResult === "적합"? tmp._rowVariant='none':tmp._rowVariant='danger';
        return tmp;
      }) 
    }
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectInspect(val) {
      console.log("검색완료됨. 테이블 입력");
      console.log(val);
      let tmpSearchData = this.$store.getters["inspectStore/getSearchData"];
      console.log(tmpSearchData);
      if(tmpSearchData.page !== "excel"){
        this.getSelectInspect = val.data;
      }

      if (tmpSearchData.page === 0 || tmpSearchData.page === "excel") {
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
          beforeDate: tmpSearchData.beforeDate,
          afterDate: tmpSearchData.afterDate,
        };
        // 검색 데이터 저장
        this.$store.commit("inspectStore/SET_SEARCH_DATA", data);
      }

      console.log(this.getSelectInspect);
      
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {

      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";
      } else {
        // this.openSpinner();
        let tmpSearchData = this.$store.getters["inspectStore/getSearchData"];
        console.log("엑셀 다운!");
        console.log(tmpSearchData);

        let data = {
          page: "excel",
          skuNo: tmpSearchData.skuNo,
          productName: tmpSearchData.productName,
          brandName: tmpSearchData.brandName,
          maker: tmpSearchData.maker,
          className: tmpSearchData.className,
          beforeDate: tmpSearchData.beforeDate,
          afterDate: tmpSearchData.afterDate,
        };

        this.$store
          .dispatch("inspectStore/SELECT_INSPECT_EXCEL", data)
          .then((response) => {
            this.modalName = "excelDataDown";
            let excelData = response.data;
            this.excelDownState = true;
            console.log("excel 다운 선택");
            console.log(response.data);
            const workBook = XLSX.utils.book_new();
            const workSheet = XLSX.utils.json_to_sheet(excelData);
            XLSX.utils.book_append_sheet(workBook, workSheet, "검수목록");
            XLSX.writeFile(workBook, "검수목록.xlsx");
            this.closeSpinner();
            console.log("확인");
          })
          .catch((error) => {
            this.excelDownState = false;
            console.log("error 발생");
            console.log(error);
          });

          // 검색 데이터 저장
        this.$store.commit("inspectStore/SET_SEARCH_DATA", data);
      }

      this.openModal();
    },
    pageChange(button, page) {
      this.openSpinner();
      console.log("페이지 변경 클릭 : ");
      console.log(button);
      console.log(page);

      let data = {
        inspectCurseId: this.curseIdList[page - 1],
      };

      // 페이지에 맞는 데이터 검색\
      this.$store.dispatch("inspectStore/SELECT_PAGE_INSPECT", data);
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
