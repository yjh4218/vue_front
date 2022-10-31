<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">제품 판매량 추가(월단위)</div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <b-input-group prepend="엑셀 업로드">
            <input
              type="file"
              @change="readFile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </b-input-group>
        </div>
        <!-- <div class="col-md-3 mb-3">
          <b-input-group prepend="날짜(월) 입력">
            <b-form-select
              v-model="tmpMonth"
              :options="options"
            ></b-form-select>
          </b-input-group>
        </div> -->
        <div class="col-md-3 mb-3">
          <b-input-group prepend="날짜">
            <b-form-datepicker
              id="datepicker-dateformat1"
              date-format-options=""
              v-model="findDate"
            ></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.insert-modal
            @click="checkDate"
            :disabled="!tmpMonth"
          >
            판매량 등록
          </b-button>
        </div>
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
    <!-- 모달창. -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertSales'">
          <div v-if="insertState">
            <p>판매량이 등록 되었습니다.</p>
          </div>
          <div v-else>
            <p>판매량 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'cantAddProduct'">
          <p>더 이상 구성품을 생성할 수 없습니다.</p>
        </div>
        <div>
          <div v-if="modalName === 'checkSkuNo'">
            <p v-if="skuNoDuplication">기존에 등록된 제품이 있습니다.</p>
            <p v-else>신규 등록 가능한 코드입니다.</p>
          </div>
        </div>
        <div v-if="modalName === 'reCheckSkuNo'">
          <p>SKU-NO 중복 확인을 해주세요.</p>
        </div>
        <div v-if="modalName === 'updateSalesProductComponent'">
          <div v-if="updateState">
            <p>상품 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteSalesProductComponent'">
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

        <!-- <template slot="footer">
          <button @click="modalText">확인</button>
        </template> -->
        <template
          slot="footer"
          v-if="modalName === 'insertSales' && insertState"
        >
          <button @click="roturInit('sales')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateSalesProductComponent' && updateState"
        >
          <button @click="roturInit('salesProductComponent')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteSalesProductComponent' && deleteState"
        >
          <button @click="roturInit('salesProductComponent')">확인</button>
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
import dayjs from "dayjs";
import confirmModal from "../../components/modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";

export default {
  components: {
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin],
  data() {
    return {
      message: "testSelView",
      salesMonth: "",
      modalMonth: "",
      tmpMonth: "",
      getSalesData: [],
      options: [
        { value: "01", text: "1월" },
        { value: "02", text: "2월" },
        { value: "03", text: "3월" },
        { value: "04", text: "4월" },
        { value: "05", text: "5월" },
        { value: "06", text: "6월" },
        { value: "07", text: "7월" },
        { value: "08", text: "8월" },
        { value: "09", text: "9월" },
        { value: "10", text: "10월" },
        { value: "11", text: "11월" },
        { value: "12", text: "12월" },
      ],
      fields: [
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w15" },
        { key: "salesVolumn", label: "판매량", sortable: true, thClass: "w30" },
      ],
      spinnerState: false,
    };
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
      };
      reader.readAsBinaryString(file);
    },
    // 날짜 확인 및 입력
    checkDate() {
      var now = dayjs();
      now.format();
      console.log(now.get("y"));
      console.log(this.tmpMonth);
      this.modalMonth = now.get("y") + "년 " + this.tmpMonth + "월";

      this.salesMonth = now.get("y") + "-" + this.tmpMonth + "-01";
      console.log(this.salesMonth);
    },
    // 판매량 추가
    insertSalesData() {
      // 관리자가 아닐 경우 추가 불가능
      let checkUser = this.$store.getters["loginStore/getUserLogin"];
      if (checkUser.data.body.data.role !== "ADMIN") {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        // this.openSpinner();
        this.$store.commit("salesStore/SET_INSERT_SALES", 3);
        console.log("판매량 추가 진행");

        let data = {
          salesMonth: this.salesMonth,
          salesData: this.getSalesData,
        };

        this.$store
          .dispatch("salesStore/INSERT_SALES", data)
          .then((response) => {
            this.modalName = "insertSales";
            console.log("response 응답 옴");
            console.log(response);

            // 판매량 추가 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 판매량 등록 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.insertState = 0;
            }
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