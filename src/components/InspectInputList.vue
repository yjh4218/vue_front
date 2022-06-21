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
                placeholder=""
                value=""
                maxlength="12"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                required
                readonly
              ></b-form-input>
              <b-input-group-prepend>
                <b-button 
                  variant="primary"
                  @click="searchProduct"
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
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <b-input-group prepend="검수날짜">
              <b-form-input
                type="date"
                v-model="inspectDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="검수결과">
              <b-form-select
                v-model="decideResult"
                :options="options"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="유통기한">
              <b-form-input
                type="date"
                v-model="lotDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="수분도">
              <b-form-input
                type="text"
                v-model="moisture"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="검수내용">
              <b-form-textarea
                id="textarea-default"
                v-model="inspectContent"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="특이사항">
              <b-form-textarea
                id="textarea-default"
                v-model="specialReport"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="사진 첨부하기">
              <b-form-file class="imgup" id="file-default" v-model="imgFiles" multiple @change="imgFileSelected" plain size="lg"></b-form-file>
              
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3" >
            <b-input-group prepend="사진 미리보기">
             <!-- <b-img class="imgSizes" thumbnail fluid :src="item.url" alt="Image 1"></b-img> -->
             <viewer :images="imgFiles"> 
              <img class="imgSizes" v-for="item in imgFiles" :src="item.url" :key="item.url" />
             </viewer>
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
              skuNo === '' || decideResult === '' || inspectDate === ''"
            
          >
            신규 검수 등록
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
        <div class="my-4">신규 검수를 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertInspect(), $bvModal.hide('insert-modal')"
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
        <!-- <template #modal-title> 신규상품 등록 </template> -->
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

    <!-- 제품검색 팝업창. -->
    <div>
      <search-product-modal @close="closeSearchModal" v-if="searchModal">
        <div v-if="modalName === 'searchProduct'">
            <select-product-table v-on:selectProductCheck ="closeSearchModal"></select-product-table>
        <template slot="footer">
          <button @click="modalText">확인</button>
        </template>
        </div>
      </search-product-modal>
    </div>

    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertInspect'">
          <div v-if="insertInspectState === 1">
            <p>검사 내용이 등록 되었습니다.</p>
          </div>
          <div v-else-if="insertInspectState === 2">
            <p>하나의 검수 날짜에 2개 제품 등록은 안 됩니다.</p>
          </div>
          <div v-else>
             <p>검사 내용 등록에 실패했습니다. 다시 시도해 주십시오.</p>
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
          v-if="modalName === 'insertInspect' && insertState">
          <button @click="roturInit()">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateInspect' && updateState">
          <button @click="roturInit()">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteInspect' && deleteState">
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
import searchProductModal from "./modal/SearchProductModal.vue";
import SelectProductTable from '../components/select/SelectProductTable.vue'
import confirmModal from "./modal/ConfirmModal.vue";

export default {
  components: {
    searchProductModal,
    SelectProductTable,
    confirmModal
  },
  props: ["propsdata"],
  data() {
    return {
      skuNo: "",
      productName: "",
      inspectDate:"",
      decideResult:"",
      lotDate:"",
      moisture:"",
      inspectContent:"",
      specialReport:"",
      imgFiles: [],
      note: "",
      options: [
        { value: "적합", text: "적합" },
        { value: "부적합", text: "부적합" },
        { value: "판단보류", text: "판단보류" }
      ],
      confirmSkuNo: "",
      inputRead: true,
      skuNoDuplication: true,
      modal: false,
      searchModal: false,
      updateState: false,
      insertState: false,
      insertInspectState : 3,
      deleteState: false,
      spinnerState: false,
      modalName: "",
      formData : new FormData(),
    };
  },
  mounted() {
  },
  computed: {
    // 제품 조회 및 결과값 입력
    selectProdut(){
      return this.$store.getters.getSkuProduct;
    },

    // 제품 추가 완료 확인
    checkInsertState() {
      return this.$store.getters.getInsertInspect;
    },
  },
  watch: {
    // 제품 조회 및 결과값 입력
    selectProdut(val){
      console.log("확인 : " + val.skuNol + ", " + val.productName);
      this.skuNo = val.skuNo;
      this.productName = val.productName;
    },

    // 제품 추가 완료 확인
    checkInsertState(val) {
      if (val === 1) {
        console.log("val 값 1");
        this.insertInspectState = 1;
        this.insertState = true;
      } else if(val === 2){
        console.log("val 값 2");
        this.insertInspectState = 2;
        this.insertState = false;
      } else {
        console.log("val 값 0");
        this.insertInspectState = 3;
        this.insertState = false;
      }
      console.log("insertState : " + this.insertState);
      this.spinnerState = false;
      this.modalName = "insertInspect";
      console.log("modalName : " + this.modalName);
      this.modal = true;
      // this.$refs['my-modal-2'].show();
    },
    
  },
  methods: {
    // 제품 검색
    searchProduct(){
      this.searchModal = true;
      this.modalName = "searchProduct";
    },
    // 파일 이미지 추가 될 경우
    imgFileSelected(event){

      var files = event.target.files;
      this.imgFiles = [];

      var temp = [];
      var frm = new FormData();

      [].forEach.call(files,function(i, item){
        frm.append('image', files[item]);

        var fileReader = new FileReader();
        fileReader.onload = function(e){
        console.log(files[item]);
        console.log(item);
        console.log(i);
        
          var img = {
            url: e.target.result
          };
          // var img = e.target.result;
            
          temp.push(img);
        }
        fileReader.readAsDataURL(files[item]);
      });
      this.imgFiles = temp;
      this.formData = frm;
      // for(var i =0; i<3; i++){
        
      // console.log("frm");
      // console.log(this.formData.get('image'));
      // }
    },
    // 모달 열기
    openModal() {
      this.modal = true;
    },
    // 모달 닫기
    closeModal() {
      this.modal = false;
    },
    // 제품 검색 모달 열기
    openSearchModal(){
      this.searchModal = true;
    },
    // 제품 검색 모달 닫기
    closeSearchModal(){
      this.searchModal = false;
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      console.log("routerInit 접속. 새로고침 진행");
      this.$router.push('/inspectSel');
      // this.$router.go();
    },
    modalText() {
      this.spinnerState = false;
      console.log("모달 메시지 확인 필요함");
      this.modal = false;
    },
    // 제품 추가
    insertInspect(){
      // this.spinnerState = true;
      this.$store.commit("SET_INSERT_INSPECT", "3");
      console.log("제품 추가 진행");
      console.log("this.formData");
      console.log(this.formData.get('image0'));

      let data = {
        skuNo: this.skuNo,
        productName: this.productName,
        inspectDate: this.inspectDate,
        decideResult:this.decideResult,
        lotDate:this.lotDate,
        moisture:this.moisture,
        inspectContent:this.inspectContent,
        specialReport:this.specialReport,
        note: this.note,
      };

      this.formData.append('data',  new Blob([JSON.stringify(data)], { type: "application/json" }));
      this.formData.append('skuNo',  new Blob([JSON.stringify(this.skuNo)], { type: "application/json" }));

      // this.formData.append('note',  new Blob([JSON.stringify(this.note)], { type: "application/json" }));

      this.$store.dispatch("INSERT_INSPECT",this.formData);
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
