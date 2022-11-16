<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div :class="[inputRead ? 'divEnable' : 'divDisable']">
        <div class="row">
          <div class="col-md-6 mb-3">
            <b-input-group prepend="SKU-NO">
              <b-form-input
                type="text"
                v-model="skuNo"
                :state="skuNoState"
                placeholder=""
                value=""
                maxlength="12"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                required
                :readonly="propsdata === 'updateView'"
              ></b-form-input>
              <b-input-group-prepend v-if="propsdata === 'insertView'">
                <b-button
                  variant="primary"
                  @click="searchProductDup"
                  :disabled="!skuNoState"
                >
                  중복확인
                </b-button>
              </b-input-group-prepend>
            </b-input-group>
            <b-form-text id="input-live-help">
              -를 제외한 12자리 sku-no를 입력하세요.
            </b-form-text>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="제품명">
              <b-form-input
                type="text"
                v-model="productName"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-button
              variant="primary"
              class="rightBox"
              @click="addComponentProductInput"
            >
              구성품 추가
            </b-button>
          </div>
        </div>
        <sales-product-component
          v-for="(component, item) in addList"
          :key="item"
          :is="component"
          v-bind:message="{
            productCnt: productCnt,
            dbClickUpProduct: dbClickUpProduct,
          }"
          v-bind:saveAllData="saveFlag"
          v-on:childProduct="childProduct"
          v-on:removeProduct="removeProduct"
          v-on:successMakeCom="successMakeCom"
        ></sales-product-component>
      </div>
      <!-- <div class="row" v-if="listFlag">
        <div class="col-md-12 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            @click="insertSalesProduct"
            :disabled="
              skuNoDuplication || productName === '' || comProductLength <= 0
            "
          >
            구성품 일괄 저장
          </b-button>
        </div>
      </div> -->
      <div class="row" v-if="propsdata === 'insertView'">
        <div class="col-md-12 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.insert-modal
            :disabled="skuNoDuplication || productName === ''"
          >
            판매 제품 추가
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-modal>
            구성품 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal>
            구성품 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            구성품 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">신규 판매 제품을 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="
                saveAllComponentData('insert'), $bvModal.hide('insert-modal')
              "
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
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">상품 구성 정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="
                saveAllComponentData('update'), $bvModal.hide('update-modal')
              "
              :disabled="spinnerState"
            >
              수정하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('update-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="delete-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">해당상품을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="
                deleteSalesProductComponent(), $bvModal.hide('delete-modal')
              "
              :disabled="spinnerState"
            >
              삭제하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('delete-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>
    </b-overlay>

    <!-- 모달창. -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertSalesProductComponent'">
          <div v-if="insertState">
            <p>상품이 등록 되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 등록에 실패했습니다. 다시 시도해 주십시오.</p>
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
          v-if="modalName === 'insertSalesProductComponent' && insertState"
        >
          <button @click="roturInit('salesProductComponent')">확인</button>
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
import confirmModal from "../modal/ConfirmModal.vue";
import SelectProductTable from "../select/SelectProductTable.vue";
import salesProductComponent from "../select/SalesProductComponents.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";

export default {
  components: {
    confirmModal,
    SelectProductTable,
    salesProductComponent,
  },
  mixins: [modalMixin, spinnerMixin, adminChkMixin],
  props: ["propsdata"],
  data() {
    return {
      productId: "",
      skuNo: "",
      productName: "",
      confirmSkuNo: "",
      componentProduct: [],
      addList: [],
      addListLength: 0,
      // 제품 데이터 저장용 인덱스
      insertUpdateSave: "",
      productCnt: -1,
      delCnt: 0,
      comProductLength: 0,
      saveFlag: false,
      inputRead: true,
      skuNoDuplication: true,
      updateState: false,
      insertState: false,
      deleteState: false,
      // 더블클릭 후 데이터 전달 확인
      dbClickUpFlag: false,
      dbClickUpProduct: [],
      dbClickUpLength: 0,
      dbClickUpPos: 0,
    };
  },
  mounted() {
    this.updateData();
  },
  computed: {
    skuNoState() {
      return this.skuNo.length > 11 ? true : false;
    },
  },
  methods: {
    // 구성품 작성 추가 버튼
    addComponentProductInput() {
      // 조회된 데이터의 구성품 만큼 생성
      if (this.propsdata === "updateView" && this.dbClickUpFlag) {
        var tempData = this.$store.state.getSalesProduct;

        this.dbClickUpProduct = tempData[this.dbClickUpPos];
        this.dbClickUpPos++;
        this.productCnt++;
        this.addList.push(salesProductComponent);

        // 구성품 만큼 생성되면 그만 생성
        if (this.dbClickUpPos === this.dbClickUpLength) {
          this.dbClickUpFlag = false;
        }
      } else {
        // 구성품은 10개까지만 추가 가능
        var len = this.addList.length;

        if (len < 21) {
          // this.addList.push({salesProductComponent:salesProductComponent, arrayCnt:this.productCnt})
          this.addList.push(salesProductComponent);
          this.productCnt++;
        }
        // 10개 이상이 될 경우 생성 불가
        else {
          this.modalName = "cantAddProduct";
          this.openModal();
        }
      }

      console.log(this.addList);
    },
    // 구성품 생성 완료 회신
    successMakeCom() {
      this.dbClickUpProduct = [];
      if (this.dbClickUpFlag) {
        this.addComponentProductInput();
      }
    },
    // 구성품 삭제 버튼
    removeProduct(val) {
      console.log("구성품 삭제");
      console.log(val);
      this.$set(this.addList, val.productCnt, undefined);
      this.delCnt++;

      console.log(this.addList);

      console.log("구성품 목록");
      this.componentProduct.splice(val.productCnt, 1);
      console.log(this.componentProduct);
    },
    // 구성품 내용 들 저장
    childProduct(val) {
      console.log("event emit");
      console.log(val);
      this.componentProduct[val.productCnt] = {
        productId: val.productId,
        productName: val.productName,
        skuNo: val.skuNo,
        quantity: val.quantity,
      };
      console.log(this.componentProduct);
      this.comProductLength = this.componentProduct.length;

      if (this.comProductLength === this.addListLength) {
        if (this.insertUpdateSave === "insert") {
          this.insertSalesProduct();
        } else {
          this.updateSalesProduct();
        }
      }
    },
    // 모든 구성품들 저장 진행
    saveAllComponentData(val) {
      console.log("모든 구성품들 저장 진행");
      this.addList = this.addList.filter((element) => element !== undefined);
      this.addListLength = this.addList.length;
      this.saveFlag = true;
      this.insertUpdateSave = val;
    },

    // sku-no 중복 확인(구성품에서 중복되는 내용 있는지 확인)
    searchProductDup() {
      this.openSpinner();

      console.log("구성품에서 sku-no 중복되는 내용 있는지 확인");
      console.log(this.propsdata);

      this.$store.commit("salesStore/SET_CHECK_PRODUCT_RESULT", "3");

      this.$store
        .dispatch("salesStore/CHECK_SKU_DUP", this.skuNo)
        .then((response) => {
          this.modalName = "checkSkuNo";

          // 중복값 없음
          if (response.data === 1) {
            console.log("response 값 1");
            this.skuNoDuplication = true;
            this.insertState = false;
            this.openModal();
            this.closeSpinner();
          }
          // 중복값 있음
          else if (response.data === 0) {
            console.log("response 값 0");
            this.skuNoDuplication = false;
            this.confirmSkuNo = this.skuNo;
            this.insertState = true;
            this.openModal();
            this.closeSpinner();
          }
          this.closeSpinner();

          console.log("중복확인 : " + this.skuNoDuplication);
          console.log("modalName : " + this.modalName);
        })
        .catch((error) => {
          console.log("error 발생");
          console.log(error);
        });
    },
    // 구성품 추가
    insertSalesProduct() {
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

        console.log("구성품 추가 진행");

        // 중간 값들 삭제
        this.componentProduct = this.componentProduct.filter(
          (element) => element !== undefined
        );
        console.log(this.componentProduct);

        let data = {
          skuNo: this.skuNo,
          productName: this.productName,
          componentProduct: this.componentProduct,
        };

        this.$store
          .dispatch("salesStore/INSERT_SALES_PRODUCT_COMPONENT", data)
          .then((response) => {
            this.modalName = "insertSalesProductComponent";

            // 저장 완료
            if (response.data === 1) {
              console.log("response 값 1");
              this.insertState = true;
              this.openModal();
              this.closeSpinner();
            }
            // 저장 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.insertState = false;
              this.openModal();
              this.closeSpinner();
            }
            console.log("insertState : " + this.insertState);

            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },
    // 제품 수정일 경우 데이터 input에 입력
    updateData() {
      if (this.propsdata === "updateView") {
        console.log("setData if 실행 : " + this.propsdata);
        console.log(this.$store.state.getSalesProduct);
        this.dbClickUpFlag = true;
        this.inputRead = false;

        this.productId = this.$store.state.getSalesProduct[0].id;
        this.skuNo = this.$store.state.getSalesProduct[0].skuNo;
        this.productName = this.$store.state.getSalesProduct[0].productName;
        this.dbClickUpLength = this.$store.state.getSalesProduct.length;

        this.addComponentProductInput();
      } else {
        console.log("setData else 실행 : " + this.propsdata);
      }
    },

    // 제품 수정진행
    updateSalesProduct() {
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

        console.log("구성품 수정 진행");

        // 중간 값들 삭제
        this.componentProduct = this.componentProduct.filter(
          (element) => element !== undefined
        );
        console.log(this.componentProduct);

        let data = {
          id: this.productId,
          skuNo: this.skuNo,
          productName: this.productName,
          componentProduct: this.componentProduct,
        };

        this.$store
          .dispatch("salesStore/UPDATE_SALES_PRODUCT_COMPONENT", data)
          .then((response) => {
            this.modalName = "updateSalesProductComponent";

            // 저장 완료
            if (response.data === 1) {
              console.log("response 값 1");
              this.updateState = true;
              this.openModal();
              this.closeSpinner();
            }
            // 저장 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.updateState = false;
              this.openModal();
              this.closeSpinner();
            }
            console.log("updateState : " + this.updateState);

            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },

    // 제품 삭제
    deleteSalesProductComponent() {
      console.log("제품 삭제 진행");

      // 관리자가 아닐 경우 삭제 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 삭제 가능
      else {
        this.openSpinner();

        this.$store.commit(
          "salesStore/SET_DELETE_SALES_PRODUCT_COMPONENT",
          "3"
        );
        this.$store
          .dispatch("salesStore/DELETE_SALES_PRODUCT_COMPONENT", {
            skuNo: this.skuNo,
          })
          .then((response) => {
            this.modalName = "deleteSalesProductComponent";

            if (response.data === 1) {
              console.log("response 값 1");
              this.deleteState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              console.log("response 값 0");
              this.deleteState = false;
              this.openModal();
              this.closeSpinner();
            }

            console.log("updateProduct : " + this.deleteState);
            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },

    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      this.inputRead = true;
    },
  },
};
</script>

<style scoped>
.rightBox {
  float: right;
  margin-left: 10px;
}
.divDisable {
  pointer-events: none;
}
.divEnable {
  pointer-events: auto;
}
.imgSizes {
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
</style>