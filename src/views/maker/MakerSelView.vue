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
      <div class="selectTableCss" style="height: 68vmin;">
        <b-table
          sticky-header="100vh"
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
import SelectMaker from "../../components/select/SelectMaker.vue";
import confirmModal from "../../components/modal/ConfirmModal.vue";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
import { modalMixin } from "../../mixins/modalMixin.js";
// import * as XLSX from "xlsx";
// import { mapGetters } from 'vuex'

export default {
  components: {
    SelectMaker,
    confirmModal
  },
  mixins: [modalMixin, adminChkMixin],
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
      this.getSelectMaker = val;
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";
      }
      else{
        // const workBook = XLSX.utils.book_new();
        // const workSheet = XLSX.utils.json_to_sheet(this.getSelectMaker);
        // XLSX.utils.book_append_sheet(workBook, workSheet, "제조사 목록");
        // XLSX.writeFile(workBook, "제조사 목록.xlsx");
        try {
          this.modalName = "excelDataDown";
          /** exceljs 사용 */
          const ExcelJS = require('exceljs');
          const workbook = new ExcelJS.Workbook();
          const sheet = workbook.addWorksheet('제조사 목록');

          // 컬럼 설정
          // header: 엑셀에 표기되는 이름
          // key: 컬럼을 접근하기 위한 key
          // hidden: 숨김 여부
          // width: 컬럼 넓이
          sheet.columns = [
            {header: '제조사명', key: 'makerName', hidden:false, width: 20,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '제조업종', key: 'className', width: 15,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '제조사 주소', key: 'makerAddress', width: 30,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '주요공정', key: 'process', width: 20,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '주요제품', key: 'importProduct', width: 25,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '매출액(억)', key: 'sales', width: 15,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '평가점수(100점 만점)', key: 'makerScore', width: 10,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '거래처 담당자', key: 'makerPerson', width: 20,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '거래처 연락처', key: 'makerPhone', width: 15,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '거래처 메일주소', key: 'makerEmail', width: 30,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '제조사 정보', key: 'makerInfo', width: 50,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
            {header: '비고', key: 'note', width: 50,
              style: {
                border: {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'},
                },
              }
            },
          ]

          console.log(this.getSelectMaker);

          this.getSelectMaker.map((item) =>{
            sheet.addRow(item);
          })

          sheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('G1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('H1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('I1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('J1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('K1').alignment = { vertical: 'middle', horizontal: 'center' };
          sheet.getCell('L1').alignment = { vertical: 'middle', horizontal: 'center' };

          sheet.getCell('A1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('B1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('C1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('D1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('E1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('F1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('G1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('H1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('I1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('J1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('K1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
          sheet.getCell('L1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};

          workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `제조사 목록.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
          })

          this.excelDownState = true;
          this.closeSpinner();
          this.openModal();
        } catch (error) {
          this.excelDownState = false;
              console.log(error);
              this.openModal();
        }
      }
      
    },
    // 더블 클릭 이벤트
    makerDetails(item) {
      this.$store.commit("SET_MAKER", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_MAKER", item);
      this.$router.push(`/makerUp/${item.id}`);
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