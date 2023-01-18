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
          <b-button
            variant="primary"
            class="right-box"
            style="margin-left:10px"
            v-on:click="productDetails(selected)"
            :disabled="!productDetailFlag"
            >선택 제품 조회</b-button
          >
          <b-button
            variant="primary"
            class="right-box"
            v-on:click="download"
            :disabled="getSelectProduct.length === 0"
            >엑셀다운</b-button
          >
        </div>
      </div>

      <div class="selectTableCss" style="height: 61vmin">
        <b-table
          ref="table"
          sticky-header="100vh"
          style="overflow-y: unset"
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
          selectable
          @row-selected="onRowSelected"
          select-mode="single"
        >
          <!-- <template v-slot:head(selected)>
            선택 
          </template> -->
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>  
        </b-table>
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
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
// import * as XLSX from "xlsx";

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
        { key: "selected", label: "선택여부", thClass: "w5" },
        { key: "operation", label: "운용여부", sortable: true, thClass: "w10" },
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
      selected: [],
      productDetailFlag:false
    };
  },
  props: ["salesProduct"],
  methods: {
    // table에서 선택한 row
    onRowSelected(items) {
      // console.log(items);
      if(items.length === 1){
        this.productDetailFlag = true
      } else{
        this.productDetailFlag = false
      }
      this.selected = items[0]
      // console.log(this.selected);
    },
    //엑셀 다운로드를 위한 데이터 검색
    download() {
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";
        this.openModal();
      } else {
        this.openSpinner();
        let tmpSearchData = this.$store.getters["productStore/getSearchData"];
        console.log(tmpSearchData);

        let data = {
          downExcel: "excel",
          skuNo: tmpSearchData.skuNo,
          productName: tmpSearchData.productName,
          brandName: tmpSearchData.brandName,
          maker: tmpSearchData.maker,
          className: tmpSearchData.className,
          operation: tmpSearchData.operation
        };

        this.$store.dispatch("productStore/SELECT_PRODUCT", data)
          .then((response) => {
            this.modalName = "excelDataDown";
            console.log(response);

            /** exceljs 사용 */
            const ExcelJS = require('exceljs');
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('상품목록');

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
              {header: '브랜드명', key: 'brandName', width: 15,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '제조사', key: 'maker', width: 20,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '분류', key: 'className', width: 17,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '운영여부', key: 'operation', width: 17,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '보관방법', key: 'storMethod', width: 30,
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
              {header: '출시일자', key: 'makeDate', width: 11,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '유통기한', key: 'expDate', width: 20,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '재품중량', key: 'productWeight', width: 12,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '원재료명', key: 'rawMaterialName', width: 110,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '제품규격', key: 'productStandard', width: 110,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '포장단위', key: 'packingUnit', width: 35,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '칼로리', key: 'calorie', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '나트륨', key: 'sodium', width: 10,
                style: {
                  border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'},
                  },
                }
              },
              {header: '비고', key: 'note', width: 30,
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

            console.log(response.data);
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


            workbook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url = window.URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = `상품목록.xlsx`;
              anchor.click();
              window.URL.revokeObjectURL(url);
            })


/** xlxs 사용 */
            // 엑셀 다운 데이터 저장
            
            // let excelData= [];

            // response.data.forEach(element => {
            //   let tmpData = {
            //     'sku-no' : element.skuNo,
            //     '제품명' : element.productName,
            //     '브랜드명' : element.brandName,
            //     '제조사' : element.maker,
            //     '분류' : element.className,
            //     '보관방법' : element.storMethod,
            //     '수분율(%)' : element.moisture,
            //     '출시일자' : element.makeDate,
            //     '유통기한' : element.expDate,
            //     '재품중량' : element.productWeight,
            //     '원재료명' : element.rawMaterialName,
            //     '제품규격' : element.productStandard,
            //     '포장단위' : element.packingUnit,
            //     '칼로리' : element.calorie,
            //     '나트륨' : element.sodium,
            //     '비고' : element.note                
            //   }
            //   excelData.push(tmpData);
            // });

            // this.excelDownState = true;
            // // 엑셀 파일 생성
            // const workBook = XLSX.utils.book_new();
            // const workSheet = XLSX.utils.json_to_sheet(excelData);
            
            // // 열너비 지정
            // workSheet["!cols"] = [ 
            //   { wch: 20 }, 
            //   { wch: 45 }, 
            //   { wch: 12 }, 
            //   { wch: 17 },
            //   { wch: 17 },
            //   { wch: 30 }, 
            //   { wch: 10 }, 
            //   { wch: 11 }, 
            //   { wch: 20 }, 
            //   { wch: 12 }, 
            //   { wch: 110 }, 
            //   { wch: 110 }, 
            //   { wch: 35 }, 
            //   { wch: 10 }, 
            //   { wch: 10 }, 
            //   { wch: 30 }, 
            // ];

            // // 파일명 지정
            // XLSX.utils.book_append_sheet(workBook, workSheet, "상품목록");
            // // 다운 진행
            // XLSX.writeFile(workBook, "상품목록.xlsx");
            this.excelDownState = true;
            this.closeSpinner();
            this.openModal();
          })
          .catch((error) => {
            this.excelDownState = false;
            console.log(error);
            this.openModal();
          });
      }
    },
    // 더블 클릭 이벤트
    productDetails(item) {
      console.log(item);
      this.$store.commit("SET_PRODUCT", "");

      var tempData = {};

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      if (this.$route.name === "selectAllProduct") {
        this.$store.commit("SET_PRODUCT", item);
        this.$router.push(`/productUp/${item.skuNo}`);
      }
      // 신규 상품 등록 시 기존 등록 데이터 조회
      else if (this.$route.name === "productInsert") {
        // console.log(item);

        this.$store.commit("SET_PRODUCT", item);
        this.$emit("selectProductCheck");
      }
      // 신규 검수 등록 화면에서 데이터 입력일 경우
      else if (
        this.$route.name === "inspectInView" ||
        this.$route.name === "claimInView" ||
        this.$route.name === "inspectUpView"
      ) {
        tempData = {
          productId: item.id,
          skuNo: item.skuNo,
          productName: item.productName,
          className: item.className,
        };
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
        this.$store.commit("SET_PRODUCT", tempData);
        this.$emit("selectProductCheck");
      }
    },
    // 상품정보 변경
    selectReplyData(item) {
      console.log(item);
      this.selectReply.forEach((element, index) => {
        if (element.id === item.id) {
          this.selectReply[index].selected = item.selected;
        }
      });
    },
    // 페이지 변경
    pageChange(button, page) {
      this.openSpinner();

      // 검색 데이터 저장
      let data = {
        productCurseId: this.curseIdList[page - 1],
      };

      // 페이지에 맞는 데이터 검색
      this.$store.dispatch("productStore/SELECT_PAGE_PRODUCT", data);
    },
    // 스피너 열기
    openSpinner() {
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner() {
      this.spinnerState = false;
    },
    // 단종제품 테이블 row 색상 변경
    cptItems() {
      console.log(this.getSelectProduct);
      return this.getSelectProduct.map((item) => {
        let tmp = item;
        // console.log(item);
        // console.log(item.operation);
        if(item.operation === "판매중단(단종)"){
          tmp._rowVariant = "warning"
        } else if(item.operation === "출시예정"){
          tmp._rowVariant = "success"
        } else{
          tmp._rowVariant = "none"
        }
        // item.operation !== "판매중단(단종)"
        //   ? (tmp._rowVariant = "none")
        //   : (tmp._rowVariant = "danger");
        return tmp;
      });
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
    // 제품 조회 및 결과값 입력
    SelectProduct(val) {
      console.log(val);
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
          operation : tmpSearchData.operation
        };
        // 검색 데이터 저장
        this.$store.commit("productStore/SET_SEARCH_DATA", data);
      }

      this.getSelectProduct = val.data;
      this.cptItems();

      this.closeSpinner();
    },
  },
};
</script>

<style scoped></style>
