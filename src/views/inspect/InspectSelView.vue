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
          <b-button
            variant="primary"
            class="right-box"
            v-on:click="download"
            :disabled="getSelectInspect.length === 0"
            >엑셀다운</b-button
          >
        </div>
      </div>
      <div class="selectTableCss" style="height: 50vmin">
        <b-table
          sticky-header="100vh"
          style="overflow-y: unset"
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
      <div class="tableNav">
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
// import * as XLSX from "xlsx";

export default {
  components: {
    SelectProduct,
    confirmModal,
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
    cptItems() {
      return this.getSelectInspect.map((item) => {
        let tmp = item;
        item.decideResult === "적합"
          ? (tmp._rowVariant = "none")
          : (tmp._rowVariant = "danger");
        return tmp;
      });
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectInspect(val) {
      let tmpSearchData = this.$store.getters["inspectStore/getSearchData"];

      // console.log(tmpSearchData);
      // console.log(val);
      // console.log(this.getSelectInspect);

      if (val.selectCnt !== -1) {
        // excel이 아닐 경우 데이터 테이블에 로딩
        if (tmpSearchData.page !== "excel") {
          this.getSelectInspect = val.data;
        }

        // 제일 처음 조회이거나, 엑셀 조회일 경우 데이터 저장 진행
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
      } else {
        this.getSelectInspect = [];
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
            /** exceljs 사용 */
            const ExcelJS = require('exceljs');
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('입고검수 목록');

            // 컬럼 설정
            // header: 엑셀에 표기되는 이름
            // key: 컬럼을 접근하기 위한 key
            // hidden: 숨김 여부
            // width: 컬럼 넓이
            sheet.columns = [
              {header: 'sku-no', key: 'skuNo', width: 15,
                // 스타일 설정
                style: {
                  // Font 설정
                  // font: {name: 'Arial Black', size: 20},
                  // Borders 설정
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                    // right: {style:'thin', color: {argb:'FF00FF00'}},
                  },
                }
              },
              {header: '제품명', key: 'productName', hidden:false, width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '제품분류', key: 'className', width: 17,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '검수날짜', key: 'inspectDate', width: 11,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '검수결과', key: 'decideResult', width: 11,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '유통기한', key: 'lotDate', width: 11,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '성상', key: 'appearance', width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '관능', key: 'sensuality', width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '형태/색상', key: 'color', width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '수분율(%)', key: 'moisture', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '크기', key: 'size', width: 20,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '이물/이취', key: 'foreignBody', width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '작동여부', key: 'checkWork', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '마감상태', key: 'finishState', width: 20,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '중량', key: 'weight', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '사용성', key: 'usability', width: 15,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '파손여부', key: 'damage', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '포장상태', key: 'checkPacking', width: 20,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '검수내용', key: '검수내용', width: 30,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '특이사항', key: 'specialReport', width: 30,
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

            response.data.map((item) =>{
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
            sheet.getCell('M1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('N1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('O1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('P1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('Q1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('R1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('S1').alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell('T1').alignment = { vertical: 'middle', horizontal: 'center' };

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
            sheet.getCell('M1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('N1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('O1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('P1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('Q1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('R1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('S1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};
            sheet.getCell('T1').fill ={type: 'pattern', pattern:'solid', fgColor:{argb:'FFE6E6E6'}};


            workbook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url = window.URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = `입고검수 목록.xlsx`;
              anchor.click();
              window.URL.revokeObjectURL(url);
            })

            this.excelDownState = true;
            this.closeSpinner();
            this.openModal();
          })
          .catch((error) => {
            this.excelDownState = false;
            console.log(error);
            this.openModal();
          });

        // 검색 데이터 저장
        this.$store.commit("inspectStore/SET_SEARCH_DATA", data);
      }

      this.openModal();
    },
    pageChange(button, page) {
      // console.log(page);
      this.openSpinner();

      let data = {
        inspectCurseId: this.curseIdList[page - 1],
      };

      // console.log(data);
      // 페이지에 맞는 데이터 검색
      this.$store.dispatch("inspectStore/SELECT_PAGE_INSPECT", data);
    },
    // 더블 클릭 이벤트
    inspectDetails(item) {
      this.$store.commit("SET_INSPECT", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_INSPECT", item);
      this.$router.push(`/inspectUp/${item.id}`);
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
