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
                  @click="searchProduct"
                  :disabled="!skuNoState"
                >
                  제품검색
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
import confirmModal from "../components/ConfirmModal.vue";

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
   
  },
  watch: {
    
  },
  methods: {
    
    
   
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
