<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div :class="[inputRead ? 'divEnable' : 'divDisable']">
        <div class="row">
          <div class="col-md-4 mb-3">
            <b-input-group prepend="제조사명">
              <b-form-input
                type="text"
                v-model="makerName"
                placeholder=""
                value=""
                maxlength="20"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-8 mb-3">
            <b-input-group prepend="제조사 주소">
              <b-form-input
                type="text"
                v-model="makerAddress"
                placeholder=""
                value=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
            <div class="col-md-3 mb-3">
                <b-input-group prepend="업종">
                <b-form-select
                    v-model="businessType"
                    :options="options"
                ></b-form-select>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="주요공정">
                    <b-form-input
                    type="text"
                    v-model="process"
                    placeholder=""
                    ></b-form-input>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="주요제품">
                    <b-form-input
                        type="text"
                        v-model="importProduct"
                        placeholder=""
                    ></b-form-input>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="매출액(억)">
                    <b-form-input
                        type="text"
                        v-model="sales"
                        placeholder=""
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    ></b-form-input>
                </b-input-group>
            </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
                <b-input-group prepend="거래처 담당자">
                    <b-form-input
                        type="text"
                        v-model="makerPerson"
                        placeholder=""
                    ></b-form-input>
                </b-input-group>
            </div>
            <div class="col-md-4 mb-3">
                <b-input-group prepend="거래처 연락처">
                    <b-form-input
                        type="text"
                        v-model="makerPhone"
                        placeholder="숫자만 써주세요."
                        maxlength="11"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    ></b-form-input>
                </b-input-group>
            </div>
            <div class="col-md-5 mb-3">
                <b-input-group prepend="거래처 메일주소">
                    <b-form-input
                        type="text"
                        v-model="makerEmail"
                        placeholder=""
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
              makerName === '' || businessType === ''"
            
          >
            신규 제조사 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" 
            v-b-modal.update-modal>
            제조사 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal> 제조사 삭제 </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            제조사 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규제조사 등록 </template> -->
        <div class="my-4">신규 제조사를 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertMaker(), $bvModal.hide('insert-modal')"
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

      <!-- 제품 검색 모달 -->
      <b-modal id="search-product-modal">
        <!-- <template #modal-title> 신규제조사 등록 </template> -->
        <div class="my-4">
          <select-product-table></select-product-table>
        </div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertProduct(), $bvModal.hide('search-product-modal')"
              :disabled="spinnerState"
            >
              등록하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('search-product-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>

    <b-modal id="update-modal">
        <!-- <template #modal-title> 신규제조사 등록 </template> -->
        <div class="my-4">제조사 정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateMaker(), $bvModal.hide('update-modal')"
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
        <!-- <template #modal-title> 신규제조사 등록 </template> -->
        <div class="my-4">해당제조사을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteMaker(), $bvModal.hide('delete-modal')"
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

    
    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertMaker'">
          <div v-if="insertState === 1">
            <p>검사 내용이 등록 되었습니다.</p>
          </div>
          <div v-else-if="insertState === 2">
            <p>하나의 제조사 날짜에 2개 제품 등록은 안 됩니다.</p>
          </div>
          <div v-else>
             <p>검사 내용 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateMaker'">
          <div v-if="updateState === 1">
            <p>검사 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>검사 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteMaker'">
          <div v-if="deleteState === 1">
            <p>제조사 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>제조사 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        
        <!-- <template slot="footer">
          <button @click="modalText">확인</button>
        </template> -->
        <template
          slot="footer"
          v-if="modalName === 'insertMaker' && insertState===1">
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateMaker' && updateState === 1">
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteMaker' && deleteState">
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template slot="footer" v-else-if="insertState !== 3 || updateState !== 3">
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template>
      </confirm-modal>
    </div>
    
  </div>
</template>

<script>
import SelectProductTable from '../select/SelectProductTable.vue'
import confirmModal from "../modal/ConfirmModal.vue";
// import ss from '../'

export default {
  components: {
    SelectProductTable,
    confirmModal
  },
  props: ["propsdata"],
  data() {
    return {
      makerId:"",
      businessType:"",
      makerName:"",
      makerAddress:"",
      process:"",
      importProduct:"",
      sales:"",
      makerPerson:"",
      makerPhone:"",
      makerEmail:"",
      note: "",
      options: [
        { value: "사료", text: "사료" },
        { value: "화장품/의약외품", text: "화장품/의약외품" },
        { value: "공산품", text: "공산품" }
      ],
      inputRead: true,
      modal: false,
      insertState:3,
      updateState : 3,
      deleteState : 3,
      spinnerState: false,
      modalName: "",
    };
  },
  mounted() {
    this.updateData();
  },
  computed: {
    // 제품 추가 완료 확인
    checkInsertState() {
      return this.$store.getters.getInsertMaker;
    },

    // 제품 제조사 완료 확인
    checkUpdateState() {
      return this.$store.getters.getUpdateMaker;
    },

    // 제품 제조사 완료 확인
    checkDeleteState() {
      return this.$store.getters.getDeleteMaker;
    },
  },
  watch: {
    // 제조사 추가 상태 확인
    checkInsertState(val) {
      
      this.modalName = "insertMaker";

      // 제조사 추가 성공
      if (val === 1) {
        console.log("val 값 1");
        this.insertState = 1;
        this.openModal();
        this.closeSpinner();
      } 
      // 해당 제조사 날짜에 이미 등록된 제조사 내용 존재
      else if(val === 2){
        console.log("val 값 2");
        this.insertState = 2;
        this.openModal();
        this.closeSpinner();
      } 
      // 제조사 등록 실패
      else if(val === 0){
        console.log("val 값 0");
        this.insertState = 0;
        this.openModal();
        this.closeSpinner();
      } else{
        console.log("val 값 확인 : " + val);
      }
    },
    // 제조사 업데이트 상태 확인
    checkUpdateState(val) {
      
      this.modalName = "updateMaker";

      // 제조사 업데이트 성공
      if (val === 1) {
        console.log("val 값 1");
        this.updateState = 1;
        this.openModal();
        this.closeSpinner();
      } 
      // 제조사 업데이트 실패
      else if(val === 0){
        console.log("val 값 0");
        this.updateState = 3;
        this.openModal();
        this.closeSpinner();
      }
      
      console.log("modalName : " + this.modalName);
    },
    // 제조사 삭제 상태 확인
    checkDeleteState(val){

      this.modalName = "deleteMaker";
      // 제조사 삭제 성공
      if (val === 1) {
        console.log("val 값 1");
        this.deleteState =1;
        this.openModal();
        this.closeSpinner();
      } 
      // 제조사 업데이트 실패
      else if(val === 0){
        console.log("val 값 0");
        this.deleteState = 0;
        this.openModal();
        this.closeSpinner();
      } 
      
      console.log("modalName : " + this.modalName);
    }
  },
  methods: {
    
    // 제조사 상세 정보 입력
    updateData() {
      if (this.propsdata === "updateView") {
        console.log("setData if 실행 : " + this.propsdata);

        this.makerId = this.$store.state.getMaker.id;
        this.makerName = this.$store.state.getMaker.makerName;
        this.businessType = this.$store.state.getMaker.businessType;
        this.makerAddress = this.$store.state.getMaker.makerAddress;
        this.process = this.$store.state.getMaker.process;
        this.importProduct = this.$store.state.getMaker.importProduct;
        this.sales = this.$store.state.getMaker.sales;
        this.makerPerson = this.$store.state.getMaker.makerPerson;
        this.makerPhone = this.$store.state.getMaker.makerPhone;
        this.makerEmail = this.$store.state.getMaker.makerEmail;
        this.note = this.$store.state.getMaker.note;

        this.inputRead = false;
      } else {
        this.imgFlag = true;
        console.log("setData else 실행 : " + this.propsdata);
      }
    },
    
    // 스피너 열기
    openSpinner(){
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner(){
      this.spinnerState = false;
    },
    // 모달 열기
    openModal() {
      this.modal = true;
    },
    // 모달 닫기
    closeModal() {
      this.modal = false;
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      console.log("routerInit 접속. 새로고침 진행");
      this.$router.push('/makerSel');
      // this.$router.go();
    },
    modalText() {
      this.closeSpinner();
      console.log("모달 메시지 확인 필요함");
      this.modal = false;
    },
    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      this.inputRead = true;
    },
    // 제조사 추가
    insertMaker(){
      this.openSpinner();
      this.$store.commit("SET_INSERT_MAKER", 3);
      console.log("제조사 추가 진행");

      let data = {
        id : this.makerId,
        makerName : this.makerName,
        businessType : this.businessType,
        makerAddress : this.makerAddress,
        process : this.process,
        importProduct : this.importProduct,
        sales : this.sales,
        makerPerson : this.makerPerson,
        makerPhone : this.makerPhone,
        makerEmail : this.makerEmail,
        note : this.note,
      };
      this.$store.dispatch("INSERT_MAKER",data);
    },
    // 제조사 수정진행
    updateMaker() {
      this.openSpinner();
      console.log("제품 수정 진행");
      this.$store.commit("SET_UPDATE_MAKER", 3);
      console.log("productId : " + this.productId);
      
      let data = {
        id : this.makerId,
        makerName : this.makerName,
        businessType : this.businessType,
        makerAddress : this.makerAddress,
        process : this.process,
        importProduct : this.importProduct,
        sales : this.sales,
        makerPerson : this.makerPerson,
        makerPhone : this.makerPhone,
        makerEmail : this.makerEmail,
        note : this.note,
      };
      this.$store.dispatch("UPDATE_MAKER",data);
     
    },
    // 제조사 삭제
    deleteMaker(){
      this.openSpinner();
      console.log("제조사 삭제 진행");
      this.$store.commit("SET_DELETE_MAKER", 3);
      
      this.$store.dispatch("DELETE_MAKER", {id : this.makerId})
    }
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
.imgSizes{
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.imgup{
  margin-left: 10px;
}
</style>
