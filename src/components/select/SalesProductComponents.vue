<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div>
        <div class="row">
          <div class="col-md-1 mb-3">
            <b-button
              variant="danger"
              @click="removeProduct"
              :disabled="!readonlyMode"
            >
              <!-- 
                            v-b-modal.search-product-modal -->
              삭제
            </b-button>
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
                required
                readonly
              ></b-form-input>
              <b-input-group-prepend>
                <b-button
                  variant="primary"
                  @click="searchProduct"
                  :disabled="!readonlyMode"
                >
                  <!-- 
                            v-b-modal.search-product-modal -->
                  제품검색
                </b-button>
              </b-input-group-prepend>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="제품명">
              <b-form-input
                type="text"
                v-model="productName"
                placeholder=""
                value=""
                readonly
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-2 mb-3">
            <b-input-group prepend="수량">
              <b-form-input
                type="text"
                v-model="quantity"
                placeholder=""
                value=""
                maxlength="12"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');"
                required
                v-bind:disabled="skuNo === ''"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>

        <!-- 제품검색 팝업창. -->
        <div>
          <common-modal @close="closeSearchModal" v-if="searchModal">
            <div v-if="modalName === 'searchProduct'">
              <select-product-table
                v-on:selectProductCheck="closeSearchModal"
                v-bind:salesProduct="productCnt"
              ></select-product-table>
              <template slot="footer">
                <button @click="modalText">확인</button>
              </template>
            </div>
          </common-modal>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
// import confirmModal from "../modal/ConfirmModal.vue";
import commonModal from "../modal/commonModal.vue";
import SelectProductTable from "./SelectProductTable.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";

export default {
  components: {
    // confirmModal,
    commonModal,
    SelectProductTable,
  },
  mixins: [modalMixin, spinnerMixin],
  props: ["message", "saveAllData"],
  data() {
    return {
      productId: "",
      skuNo: "",
      productName: "",
      quantity: 0,
      productCnt: 0,
      readonlyMode: true,
      changeModal: false,
    };
  },
  methods: {
    // 제품 검색
    searchProduct() {
      this.searchModal = true;
      this.modalName = "searchProduct";
    },
    // 구성품 저장 버튼 클릭
    changeData() {
      this.openModal();
      this.modalName = "changeData";
    },
    // 저장을 누르면 데이터 전달
    saveData() {
      this.modal = false;
      var temp = {
        productCnt: this.productCnt,
        productId: this.productId,
        skuNo: this.skuNo,
        productName: this.productName,
        quantity: this.quantity,
      };
      this.$emit("childProduct", temp);

      // 저장하면 수정 불가능
      this.readonlyMode = false;
    },
    // 삭제 버튼 클릭시 이벤트 전달
    removeProduct() {
      this.$emit("removeProduct", {
        productCnt: this.productCnt,
      });
    },
  },
  mounted() {
    this.productCnt = this.message.productCnt;
    if (this.message.dbClickUpProduct !== undefined) {
      this.productCnt = this.message.productCnt;
      this.productId = this.message.dbClickUpProduct.id;
      this.skuNo = this.message.dbClickUpProduct.componentSkuNo;
      this.quantity = this.message.dbClickUpProduct.componentQuantity;
      this.productName = this.message.dbClickUpProduct.componentProductName;

      this.$emit("successMakeCom", {
        productCnt: this.productCnt,
      });
    }
    // console.log("구성품 skuNo");
    // console.log(this.message.dbClickUpProduct.componentSkuNo);
  },
  computed: {
    // 제품 조회 및 결과값 입력
    selectProdut() {
      return this.$store.getters.getSkuProduct;
    },
  },
  watch: {
    // 제품 조회 및 결과값 입력
    selectProdut(val) {
      console.log("확인 : " + val.skuNo + ", " + val.productName);
      console.log(val);
      if (this.productCnt === val.salesProduct) {
        this.productId = val.productId;
        this.skuNo = val.skuNo;
        this.productName = val.productName;
      }
    },
    saveAllData() {
      console.log("saveAllData 로그 확인");
      this.saveData();
    },
  },
};
</script>

<style scoped></style>