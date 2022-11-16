<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title" v-if="propsdata === 'insertSales'">
        제품 판매량 등록(월단위)
      </div>
      <div class="title" v-else>제품 판매량 수정 및 삭제</div>
      <div class="row" v-if="propsdata === 'insertSales'">
        <div class="col-md-6 mb-3">
          <b-input-group prepend="엑셀 업로드">
            <input
              type="file"
              @change="readFile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="날짜">
            <b-form-datepicker v-model="tmpMonth"></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.insert-modal
            @click="checkDate"
            :disabled="!excelFileFlag"
          >
            판매량 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="날짜검색">
            <b-form-datepicker v-model="findDate"></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="SKU-NO">
            <b-form-input
              type="text"
              v-model="skuNo"
              placeholder=""
              value=""
              maxlength="12"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="제품명">
            <b-form-input
              type="text"
              v-model="productName"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>

        <div class="col-md-3 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.update-modal
            :disabled="!getSalesDataFlag"
          >
            판매량 수정
          </b-button>
          <b-button
            variant="danger"
            class="rightBox"
            v-b-modal.delete-modal
            :disabled="!getSalesDataFlag"
          >
            판매량 삭제
          </b-button>
          <b-button variant="primary" class="rightBox" @click="selectSalesData">
            판매량 조회
          </b-button>
        </div>
      </div>
      <div class="row" v-if="propsdata === 'updateSales'">
        <div class="col-md-3 mb-3">{{ salesMonth }} 판매량 조회</div>
      </div>
      <div>
        <b-table
          striped
          hover
          :items="getSalesData"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
        >
          <template v-slot:cell(salesVolumn)="row">
            <b-form-input v-model="row.item.salesVolumn" />
          </template>
        </b-table>
      </div>
    </b-overlay>

    <b-modal id="insert-modal">
      <!-- <template #modal-title> 신규제조사 등록 </template> -->
      <div class="my-4">{{ modalMonth }} 판매량을 등록하시겠습니까?</div>
      <template #modal-footer>
        <div class="d-block text-center">
          <b-button
            variant="primary"
            class="frightBox"
            @click="insertSalesData(), $bvModal.hide('insert-modal')"
            :disabled="spinnerState"
          >
            등록하기
          </b-button>
          <b-button
            variant="primary"
            class="rightBox"
            @click="$bvModal.hide('insert-modal')"
          >
            취소하기
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal id="update-modal">
      <!-- <template #modal-title> 신규제조사 등록 </template> -->
      <div class="my-4">판매량을 수정하시겠습니까?</div>
      <template #modal-footer>
        <div class="d-block text-center">
          <b-button
            variant="primary"
            class="frightBox"
            @click="updateSalesData(), $bvModal.hide('update-modal')"
            :disabled="spinnerState"
          >
            수정하기
          </b-button>
          <b-button
            variant="primary"
            class="rightBox"
            @click="$bvModal.hide('insert-modal')"
          >
            취소하기
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal id="delete-modal">
      <!-- <template #modal-title> 신규제조사 등록 </template> -->
      <div class="my-4">판매량을 삭제하시겠습니까?</div>
      <template #modal-footer>
        <div class="d-block text-center">
          <b-button
            variant="primary"
            class="frightBox"
            @click="deleteSalesData(), $bvModal.hide('delete-modal')"
            :disabled="spinnerState"
          >
            삭제하기
          </b-button>
          <b-button
            variant="primary"
            class="rightBox"
            @click="$bvModal.hide('insert-modal')"
          >
            취소하기
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- 모달창. -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertSales'">
          <div v-if="insertState === 1">
            <p>판매량이 등록 되었습니다.</p>
          </div>
          <div v-else-if="insertState === 2">
            <p>
              해당 월에 등록된 데이터가 있습니다. 기존 등록된 데이터를 전체삭제
              후 추가해주시기 바랍니다.
            </p>
          </div>
          <div v-else>
            <p>판매량 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateMonthSales'">
          <div v-if="updateState">
            <p>판매량이 수정 되었습니다.</p>
          </div>
          <div v-else>
            <p>판매량 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteMonthSales'">
          <div v-if="deleteState">
            <p>상품 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'noAdmin'">
          <p>관리자가 아니기 때문에 추가, 수정, 삭제할 수 없습니다.</p>
        </div>

        <template
          slot="footer"
          v-if="modalName === 'insertSales' && insertState"
        >
          <button @click="roturInit('salesSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateMonthSales' && updateState"
        >
          <button @click="roturInit('salesSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteMonthSales' && deleteState"
        >
          <button @click="roturInit('salesSel')">확인</button>
        </template>
        <template slot="footer" v-else>
          <button @click="modalText">확인</button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import confirmModal from "../../components/modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
import dayjs from "dayjs";

export default {
  components: {
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin, adminChkMixin],
  props: ["propsdata"],
  data() {
    return {
      skuNo: "",
      productName: "",
      findDate: "",
      salesMonth: "",
      modalMonth: "",
      tmpMonth: "",
      getSalesData: [],
      getSalesDataFlag: false,
      excelFileFlag: false,
      insertState: "",
      updateState: "",
      deleteState: "",
      fields: [
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w15" },
        { key: "salesVolumn", label: "판매량", sortable: true, thClass: "w30" },
      ],
      spinnerState: false,
    };
  },
  mounted() {
    this.setDate();
  },
  methods: {
    // 업로드된 엑셀 파일 확인
    readFile(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      let tmpResult = {};
      reader.onload = () => {
        let data = reader.result;
        let workbook = XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach((sheetName) => {
          workbook.Sheets[sheetName].A1.w = "skuNo";
          workbook.Sheets[sheetName].B1.w = "productName";
          workbook.Sheets[sheetName].C1.w = "salesVolumn";

          console.log(workbook.Sheets[sheetName].A1);
          const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          tmpResult = roa;
        });
        console.log(tmpResult);
        this.excelJsonData = tmpResult;
        this.getSalesData = tmpResult;
        this.excelFileFlag = true;
      };
      reader.readAsBinaryString(file);
    },
    // 오늘 날짜 확인
    setDate() {
      var thisday = new Date();

      // 연도, 월, 일 추출
      var year = thisday.getFullYear();
      var month = ("0" + (thisday.getMonth() + 1)).slice(-2);
      var day = ("0" + thisday.getDate()).slice(-2);

      // 최종 포맷 (ex - '2021-10-08')
      this.tmpMonth = year + "-" + month + "-" + day;
      // 최종 포맷 (ex - '2021-10-08')
      this.findDate = year + "-" + month + "-" + day;
    },
    // 날짜 확인 및 입력
    checkDate() {
      console.log(this.tmpMonth);
      console.log(this.tmpMonth.slice(0, 4));
      console.log(this.tmpMonth.slice(5, 7));
      this.modalMonth =
        this.tmpMonth.slice(0, 4) + "년 " + this.tmpMonth.slice(5, 7) + "월";

      this.salesMonth = this.tmpMonth.slice(0, 7) + "-01";
      console.log(this.salesMonth);
    },
    // 판매량 추가
    insertSalesData() {
      // 관리자가 아닐 경우 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        this.openSpinner();
        this.$store.commit("salesStore/SET_INSERT_MONTH_SALES", 3);
        console.log("판매량 추가 진행");

        let data = {
          salesMonth: this.salesMonth,
          salesData: this.getSalesData,
        };

        this.$store
          .dispatch("salesStore/INSERT_MONTH_SALES", data)
          .then((response) => {
            this.modalName = "insertSales";
            console.log("response 응답 옴");
            console.log(response);

            // 판매량 추가 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.insertState = 1;
            }
            // 판매량 등록 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.insertState = 0;
            } else if (response.data === 2) {
              console.log("response 값 2");
              this.insertState = 2;
            }
            this.openModal();
            this.closeSpinner();
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });

        // this.formData = new FormData();
      }
    },

    // 데이터 조회
    selectSalesData() {
      console.log("데이터 조회");
      this.openSpinner();
      // 화면에 보여지는 조회된 날짜
      this.salesMonth =
        this.findDate.slice(0, 4) + "년 " + this.findDate.slice(6, 7) + "월";
      this.findDate = this.findDate.slice(0, 7) + "-01";
      var bfdate = dayjs(this.findDate);

      console.log(bfdate);

      this.$store
        .dispatch("salesStore/SELECT_MONTH_SALES", {
          skuNo: this.skuNo,
          productName: this.productName,
          findDate: bfdate.format("YYYY-MM-DD"),
        })
        .then((response) => {
          console.log("response 응답 옴");
          console.log(response);

          this.getSalesData = response.data;
          if (this.getSalesData.length > 0) {
            this.getSalesDataFlag = true;
          } else {
            this.getSalesDataFlag = false;
          }
          this.closeSpinner();
        })
        .catch((error) => {
          console.log("error 발생");
          console.log(error);
        });
    },

    // 판매량 수정
    updateSalesData() {
      // 관리자가 아닐 경우 수정 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 수정 가능
      else {
        this.openSpinner();
        this.$store.commit("salesStore/SET_UPDATE_MONTH_SALES", 3);
        console.log("판매량 수정 진행");

        let data = {
          salesMonth: this.getSalesData[0].salesMonth,
          salesData: this.getSalesData,
        };

        this.$store
          .dispatch("salesStore/UPDATE_MONTH_SALES", data)
          .then((response) => {
            this.modalName = "updateMonthSales";
            console.log("response 응답 옴");
            console.log(response);

            // 판매량 추가 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.updateState = 1;
            }
            // 판매량 등록 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.updateState = 0;
            }
            this.openModal();
            this.closeSpinner();
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });

        // this.formData = new FormData();
      }
    },
    // 판매량 삭제
    deleteSalesData() {
      // 관리자가 아닐 경우 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        this.openSpinner();
        this.$store.commit("salesStore/SET_DELETE_MONTH_SALES", 3);
        console.log("판매량 삭제 진행");

        var tmpIds = [];

        this.getSalesData.forEach((element) => {
          tmpIds.push(element.id);
        });

        console.log(tmpIds);

        let data = {
          ids: tmpIds,
        };

        this.$store
          .dispatch("salesStore/DELETE_MONTH_SALES", data)
          .then((response) => {
            this.modalName = "deleteMonthSales";
            console.log("response 응답 옴");
            console.log(response);

            // 판매량 추가 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.deleteState = 1;
            }
            // 판매량 등록 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.deleteState = 0;
            }
            this.openModal();
            this.closeSpinner();
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });

        // this.formData = new FormData();
      }
    },
  },
};
</script>

<style scoped>
.rightBox {
  float: right;
  margin-left: 10px;
}
</style>