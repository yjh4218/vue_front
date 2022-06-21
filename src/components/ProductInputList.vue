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
          <div class="col-md-6 mb-3">
            <b-input-group prepend="브랜드명">
              <b-form-input
                type="text"
                v-model="brandName"
                placeholder=""
                value="skuInfo.brandName"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="제조사">
              <b-form-input
                type="text"
                v-model="maker"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <b-input-group prepend="제품분류">
              <b-form-select
                v-model="className"
                :options="options"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="유통기한">
              <b-form-input
                type="text"
                v-model="expDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="제품출시일">
              <b-form-input
                type="date"
                v-model="makeDate"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          
          <div class="col-md-6 mb-3">
            <b-input-group prepend="매입가격(부가세포함)">
              <b-form-input
                type="text"
                v-model="purchasePrice"
                placeholder=""
                value=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          
          <div class="col-md-6 mb-3">
            <b-input-group prepend="판매가격(부가서포함)">
              <b-form-input
                type="text"
                v-model="sellingPrice"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="제품성상">
              <b-form-textarea
                id="textarea-default"
                v-model="productCondition"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="제품규격">
              <b-form-textarea
                id="textarea-default"
                v-model="productStandard"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <b-input-group prepend="칼로리">
              <b-form-input
                type="number"
                v-model="calorie"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="나트륨">
              <b-form-input
                type="number"
                v-model="sodium"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <b-input-group prepend="색상">
              <b-form-input
                type="text"
                v-model="productColor"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="모양">
              <b-form-input
                type="text"
                v-model="productShape"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="비고">
              <b-form-textarea
                id="textarea-default"
                v-model="note"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="row" v-if="propsdata === 'insertView'">
        <div class="col-md-12 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.insert-modal
            v-bind:disabled="
              skuNo === '' ||
              productName === '' ||
              brandName === '' ||
              maker === '' ||
              makeDate === '' ||
              className === '' ||
              insertState === false
            "
          >
            신규 상품 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" 
            v-b-modal.update-modal>
            상품 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal> 상품 삭제 </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            상품 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">신규상품을 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertProduct(), $bvModal.hide('insert-modal')"
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
        <div class="my-4">상품정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateProduct(), $bvModal.hide('update-modal')"
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
              @click="deleteProduct(), $bvModal.hide('delete-modal')"
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

    <!-- <b-modal id="my-modal-2">
      <div class="my-4">
       등록이 완료되었습니다.
      </div>
      <template #modal-footer>
        <div  class="d-block text-center">
          <b-button variant="primary" class="frightBox" @click="$bvModal.hide('my-modal')">
            확인
          </b-button>
        </div>
      </template>
    </b-modal> -->

    <!-- 모달창. -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertProduct'">
          <div v-if="insertState">
            <p>상품이 등록 되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
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
        <div v-if="modalName === 'updateProduct'">
          <div v-if="updateState">
            <p>상품 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteProduct'">
          <div v-if="deleteState">
            <p>상품 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        
        <!-- <template slot="footer">
          <button @click="modalText">확인</button>
        </template> -->
        <template
          slot="footer"
          v-if="modalName === 'insertProduct' && insertState">
          <button @click="roturInit()">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateProduct' && updateState">
          <button @click="roturInit()">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteProduct' && deleteState">
          <button @click="roturInit()">확인</button>
        </template>
        <template slot="footer" v-else>
          <button @click="modalText">확인</button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import confirmModal from "./modal/ConfirmModal.vue";

export default {
  components: {
    confirmModal,
  },
  props: ["propsdata"],
  data() {
    return {
      skuNo: "",
      productName: "",
      brandName: "",
      maker: "",
      makeDate: "",
      className: "",
      expDate:"",
      purchasePrice: "",
      sellingPrice: "",
      productCondition: "",
      productStandard: "",
      calorie: "",
      sodium: "",
      productColor: "",
      productShape: "",
      note: "",
      options: [
        { value: "간식", text: "간식" },
        { value: "사료", text: "사료" },
        { value: "동물용 의료기기", text: "동물용 의료기기" },
        { value: "동물용 의약외품", text: "동물용 의약외품" },
        { value: "의류", text: "의류" },
        { value: "장난감", text: "장난감" },
        { value: "생활화학제품", text: "생활화학제품" },
        { value: "화장품", text: "화장품" },
        { value: "기타", text: "기타" },
      ],
      confirmSkuNo: "",
      inputRead: true,
      skuNoDuplication: true,
      modal: false,
      updateState: false,
      insertState: false,
      deleteState: false,
      spinnerState: false,
      modalName: "",
    };
  },
  mounted() {
    this.updateData();
  },
  computed: {
    skuNoState() {
      return this.skuNo.length > 11 ? true : false;
    },
    // 제품 추가 완료 확인
    checkInsertState() {
      return this.$store.getters.getInsertProduct;
    },
    // 제품 중복 검색 확인
    checkProductDup() {
      return this.$store.getters.getCheckProductDup;
    },
    // 제품 수정 확인
    checkUpdatdState(){
      return this.$store.getters.getUpdateProduct;
    },
    // 제품 삭제 확인
    checkDeleteProduct(){
      return this.$store.getters.getDeleteProduct;
    }
  },
  watch: {
    // 제품 추가 완료 확인
    checkInsertState(val) {
      if (val) {
        console.log("val 값 1");
        this.insertState = true;
      } else {
        console.log("val 값 0");
        this.insertState = false;
      }
      console.log("insertState : " + this.insertState);
      this.spinnerState = false;
      this.modalName = "insertProduct";
      console.log("modalName : " + this.modalName);
      this.modal = true;
      // this.$refs['my-modal-2'].show();
    },

    // 제품 중복 검색 확인
    checkProductDup(val) {
      if (val === 1) {
        console.log("val 값 1");
        this.skuNoDuplication = true;
        this.insertState = false;
      } else if (val === 0) {
        console.log("val 값 0");
        this.skuNoDuplication = false;
        this.confirmSkuNo = this.skuNo;
        this.insertState = true;
      }
      this.modalName = "checkSkuNo";
      console.log("중복확인 : " + this.skuNoDuplication);
      console.log("modalName : " + this.modalName);
      this.modal = true;
      
    },

    // 제품 정보 수정
    checkUpdatdState(val){
      if (val) {
        console.log("val 값 1");
        this.updateState = true;
      } else {
        console.log("val 값 0");
        this.updateState = false;
      }
      console.log("updateProduct : " + this.updateState);
      this.spinnerState = false;
      this.modalName = "updateProduct";
      console.log("modalName : " + this.modalName);
      this.modal = true;
    },

    // 제품 삭제 확인
    checkDeleteProduct(val){
      if (val) {
        console.log("val 값 1");
        this.deleteState = true;
      } else {
        console.log("val 값 0");
        this.deleteState = false;
      }
      console.log("updateProduct : " + this.deleteState);
      this.spinnerState = false;
      this.modalName = "deleteProduct";
      console.log("modalName : " + this.modalName);
      this.modal = true;
    }
  },
  methods: {
    // 제품 추가
    insertProduct() {
      // if (this.confirmSkuNo !== this.skuNo) {
      //   this.modalName = "reCheckSkuNo";
      //   this.modal = true;
      // }
      this.spinnerState = true;
      this.$store.commit("SET_INSERT_PRODUCT", "3");
      console.log("제품 추가 진행");
      this.$store.dispatch("INSERT_PRODUCT", {
        skuNo: this.skuNo,
        productName: this.productName,
        brandName: this.brandName,
        maker: this.maker,
        makeDate: this.makeDate,
        className: this.className,
        expDate: this.expDate,
        purchasePrice: this.purchasePrice,
        sellingPrice: this.sellingPrice,
        productCondition: this.productCondition,
        productStandard: this.productStandard,
        calorie: this.calorie,
        sodium: this.sodium,
        productColor: this.productColor,
        productShape: this.productShape,
        note: this.note,
      });
    },
    // sku-no 중복 확인
    searchProductDup() {
      this.spinnerState = true;
      console.log("ProductInputList 컴포넌트");
      console.log(this.propsdata);
      this.$store.commit("SET_CHECK_PRODUCT_RESULT", "3");
      this.$store.dispatch("CHECK_SKU_DUP", this.skuNo);
    },
    // 제품 수정일 경우 데이터 input에 입력
    updateData() {
      if (this.propsdata === "updateView") {
        console.log("setData if 실행 : " + this.propsdata);
        this.skuNo = this.$store.state.getProduct.skuNo;
        this.productName = this.$store.state.getProduct.productName;
        this.brandName = this.$store.state.getProduct.brandName;
        this.maker = this.$store.state.getProduct.maker;
        this.makeDate = this.$store.state.getProduct.makeDate;
        this.className = this.$store.state.getProduct.className;
        this.expDate = this.$store.state.getProduct.expDate;
        this.purchasePrice = this.$store.state.getProduct.purchasePrice;
        this.sellingPrice = this.$store.state.getProduct.sellingPrice;
        this.productCondition = this.$store.state.getProduct.productCondition;
        this.productStandard = this.$store.state.getProduct.productStandard;
        this.calorie = this.$store.state.getProduct.calorie;
        this.sodium = this.$store.state.getProduct.sodium;
        this.productColor = this.$store.state.getProduct.productColor;
        this.productShape = this.$store.state.getProduct.productShape;
        this.note = this.$store.state.getProduct.note;
        this.inputRead = false;
      } else {
        console.log("setData else 실행 : " + this.propsdata);
      }
    },
    // 제품 수정진행
    updateProduct() {
      this.spinnerState = true;
      console.log("제품 수정 진행");
      this.$store.commit("SET_UPDATE_PRODUCT", "3");
      this.$store.dispatch("UPDATE_PRODUCT", {
        skuNo: this.skuNo,
        productName: this.productName,
        brandName: this.brandName,
        maker: this.maker,
        makeDate: this.makeDate,
        className: this.className,
        expDate: this.expDate,
        purchasePrice: this.purchasePrice,
        sellingPrice: this.sellingPrice,
        productCondition: this.productCondition,
        productStandard: this.productStandard,
        calorie: this.calorie,
        sodium: this.sodium,
        productColor: this.productColor,
        productShape: this.productShape,
        note: this.note,
      })
    },

    // 제품 삭제
    deleteProduct(){
      console.log("제품 삭제 진행");
      this.spinnerState = true;
      this.$store.commit("SET_DELETE_PRODUCT", "3");
      this.$store.dispatch("DELETE_PRODUCT", this.skuNo)
    },

    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      this.inputRead = true;
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      console.log("routerInit 접속. 새로고침 진행");
      this.$router.push('/productSel');
      // this.$router.go();
    },
    modalText() {
      this.spinnerState = false;
      console.log("모달 메시지 확인 필요함");
      this.modal = false;
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
</style>
