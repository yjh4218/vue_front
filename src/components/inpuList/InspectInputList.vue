<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div>
        <div :class="[inputRead ? 'divEnable' : 'divDisable']">
          <div class="row">
            <div class="col-md-5 mb-3">
              <b-input-group prepend="SKU-NO">
                <b-form-input
                  type="text"
                  v-model="skuNo"
                  placeholder=""
                  value=""
                  maxlength="12"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  required
                  disabled
                ></b-form-input>
                <b-input-group-prepend>
                  <b-button variant="primary" @click="searchProduct">
                    <!-- 
                    v-b-modal.search-product-modal -->
                    제품검색
                  </b-button>
                </b-input-group-prepend>
                <b-input-group-prepend v-if="propsdata === 'insertView'">
                  <b-button
                    variant="primary"
                    @click="importReg"
                    style="margin-left: 10px"
                    :disabled="!skuNo"
                  >
                    <!-- 
                    v-b-modal.search-product-modal -->
                    직전 등록 불러오기
                  </b-button>
                </b-input-group-prepend>
              </b-input-group>
            </div>
            <div class="col-md-4 mb-3">
              <b-input-group prepend="제품명">
                <b-form-input
                  type="text"
                  v-model="productName"
                  placeholder=""
                  value=""
                  readonly
                  disabled
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="제품분류">
                <b-form-input
                  type="text"
                  v-model="className"
                  placeholder=""
                  value=""
                  disabled
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
                  :options="decideResultOptions"
                ></b-form-select>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="유통기한(제조일자)">
                <b-form-input
                  type="date"
                  v-model="lotDate"
                  placeholder=""
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3" v-if="className === '사료'">
              <b-input-group prepend="수분율(%)">
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
            <div class="col-md-6 mb-3">
              <b-input-group prepend="성상">
                <b-form-textarea
                  id="textarea-default"
                  v-model="appearance"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
            <div class="col-md-6 mb-3">
              <b-input-group prepend="형태/색상">
                <b-form-textarea
                  id="textarea-default"
                  v-model="color"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <b-input-group prepend="크기">
                <b-form-textarea
                  id="textarea-default"
                  v-model="size"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
            <div class="col-md-6 mb-3">
              <b-input-group prepend="관능">
                <b-form-textarea
                  id="textarea-default"
                  v-model="sensuality"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row" v-if="className === '공산품'">
            <div class="col-md-6 mb-3">
              <b-input-group prepend="파손여부">
                <b-form-textarea
                  id="textarea-default"
                  v-model="damage"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
            <div class="col-md-6 mb-3">
              <b-input-group prepend="마감상태">
                <b-form-textarea
                  id="textarea-default"
                  v-model="finishState"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row" v-if="className === '공산품'">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="작동여부">
                <b-form-textarea
                  id="textarea-default"
                  v-model="checkWork"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div
            class="row"
            v-else-if="
              className === '동물용 의료기기' ||
              className === '동물용 의약외품' ||
              className === '생활화학제품' ||
              className === '화장품'
            "
          >
            <div class="col-md-12 mb-3">
              <b-input-group prepend="사용성">
                <b-form-textarea
                  id="textarea-default"
                  v-model="usability"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <b-input-group prepend="이물/이취">
                <b-form-textarea
                  id="textarea-default"
                  v-model="foreignBody"
                  rows="2"
                  max-rows="3"
                ></b-form-textarea>
              </b-input-group>
            </div>
            <div class="col-md-6 mb-3">
              <b-input-group prepend="중량">
                <b-form-textarea
                  id="textarea-default"
                  v-model="weight"
                  rows="1"
                  max-rows="2"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="포장상태">
                <b-form-textarea
                  id="textarea-default"
                  v-model="checkPacking"
                  rows="1"
                  max-rows="2"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="검수내용">
                <b-form-textarea
                  id="textarea-default"
                  v-model="inspectContent"
                  rows="2"
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
                <b-form-file
                  class="imgup"
                  id="file-default"
                  multiple
                  @change="AddImageData"
                  plain
                  size="lg"
                ></b-form-file>
              </b-input-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="사진 미리보기">
              <viewer
                :images="imgFiles"
                @inited="inited"
                v-for="(item, index) in imgFiles"
                :key="index"
              >
                <span class="imgSizes">
                  <button
                    :class="[inputRead ? 'divEnable' : 'divDisable']"
                    class="xBox"
                    v-b-modal.xBox-modal
                    @click="imgElementSave(index)"
                  >
                    x
                  </button>
                  <img :src="item.url" />
                </span>
              </viewer>
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
              skuNo === '' || decideResult === '' || inspectDate === ''
            "
          >
            신규 검수 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-modal>
            검수 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal>
            검사 정보 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            검수 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규검수 등록 </template> -->
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
        <!-- <template #modal-title> 신규검수 등록 </template> -->
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
        <!-- <template #modal-title> 신규검수 등록 </template> -->
        <div class="my-4">검수 정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateInspect(), $bvModal.hide('update-modal')"
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
        <!-- <template #modal-title> 신규검수 등록 </template> -->
        <div class="my-4">해당 검수 내용을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteInspect(), $bvModal.hide('delete-modal')"
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

      <b-modal id="xBox-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">해당 사진을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="xBoxClick(), $bvModal.hide('xBox-modal')"
              :disabled="spinnerState"
            >
              삭제하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('xBox-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>
    </b-overlay>

    <!-- 제품검색 팝업창. -->
    <div>
      <common-modal @close="closeSearchModal" v-if="searchModal">
        <div v-if="modalName === 'searchProduct'">
          <select-product-table
            v-on:selectProductCheck="closeSearchModal"
          ></select-product-table>
          <template slot="footer">
            <button @click="modalText">확인</button>
          </template>
        </div>
      </common-modal>
    </div>

    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertInspect'">
          <div v-if="insertState === 1">
            <p>검사 내용이 등록 되었습니다.</p>
          </div>
          <div v-else-if="insertState === 2">
            <p>하나의 검수 날짜에 2개 제품 등록은 안 됩니다.</p>
          </div>
          <div v-else>
            <p>검사 내용 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateInspect'">
          <div v-if="updateState === 1">
            <p>검사 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>검사 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteInspect'">
          <div v-if="deleteState === 1">
            <p>검수 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>검수 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'noAdmin'">
          <p>관리자가 아니기 때문에 추가, 수정, 삭제할 수 없습니다.</p>
        </div>
        <div v-if="modalName === 'noReg'">
          <p>직전 등록한 검수 내용이 없습니다.</p>
        </div>

        <!-- <template slot="footer">
          <button @click="modalText">확인</button>
        </template> -->
        <template
          slot="footer"
          v-if="modalName === 'insertInspect' && insertState === 1"
        >
          <b-button variant="primary" @click="roturInit('inspectSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateInspect' && updateState === 1"
        >
          <b-button variant="primary" @click="roturInit('inspectSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteInspect' && deleteState"
        >
          <b-button variant="primary" @click="roturInit('inspectSel')"
            >확인</b-button
          >
        </template>
        <!-- <template slot="footer" v-else-if="insertState !== 3 || updateState !== 3">
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template> -->
        <template slot="footer" v-else>
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import commonModal from "../modal/commonModal.vue";
import SelectProductTable from "../select/SelectProductTable.vue";
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { imageMixin } from "../../mixins/imageMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
// import ss from '../'

export default {
  components: {
    commonModal,
    SelectProductTable,
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin, imageMixin, adminChkMixin],
  props: ["propsdata"],
  data() {
    return {
      inspectId: "",
      productId: "",
      skuNo: "",
      productName: "",
      inspectDate: "",
      appearance: "",
      decideResult: "",
      lotDate: "",
      moisture: "",
      color: "",
      size: "",
      damage: "",
      sensuality: "",
      finishState: "",
      checkWork: "",
      usability: "",
      foreignBody: "",
      weight: "",
      checkPacking: "",
      inspectContent: "",
      specialReport: "",
      decideResultOptions: [
        { value: "적합", text: "적합" },
        { value: "부적합", text: "부적합" },
        { value: "판단보류", text: "판단보류" },
      ],
      appearanceOptions: [
        { value: "적합", text: "적합" },
        { value: "부적합", text: "부적합" },
      ],
      className: "",
      confirmSkuNo: "",
      inputRead: true,
      searchModal: false,
      insertState: 3,
      updateState: 3,
      deleteState: 3,
    };
  },
  mounted() {
    this.updateData();
  },
  computed: {
    // 제품 조회 및 결과값 입력
    selectProdut() {
      return this.$store.getters.getSkuProduct;
    },
    // 직전등록 검수 조회
    selectInspectReg() {
      return this.$store.getters["inspectStore/getSelectInspectReg"];
    },
  },
  watch: {
    // 제품 조회 및 결과값 입력
    selectProdut(val) {
      this.productId = val.productId;
      this.skuNo = val.skuNo;
      this.productName = val.productName;
      this.className = val.className;
    },

    // 직전등록 검수 조회
    selectInspectReg(val) {
      console.log(val);
      // // this.inspectDate = val.data.inspectDate;
      // // this.decideResult = val.data.decideResult;
      // this.lotDate = val.data.lotDate;
      if (val.data === null || val.data === undefined) {
        this.modalName = "noReg";

        this.openModal();
      } else {
        // this.moisture = val.data.moisture;
        this.appearance = val.data.appearance;
        this.color = val.data.color;
        this.size = val.data.size;
        this.damage = val.data.damage;
        this.sensuality = val.data.sensuality;
        this.finishState = val.data.finishState;
        this.checkWork = val.data.checkWork;
        this.usability = val.data.usability;
        this.foreignBody = val.data.foreignBody;
        this.weight = val.data.weight;
        this.checkPacking = val.data.checkPacking;
        this.inspectContent = val.data.inspectContent;
        this.specialReport = val.data.specialReport;
      }

      this.closeSpinner();
    },
  },
  methods: {
    // 제품 검색
    searchProduct() {
      this.searchModal = true;
      this.modalName = "searchProduct";
    },
    // 검수 상세 정보 입력
    updateData() {
      console.log(this.$store.state.getInspect);
      if (this.propsdata === "updateView") {
        this.inspectId = this.$store.state.getInspect.id;
        this.productId = this.$store.state.getInspect.product.id;
        this.skuNo = this.$store.state.getInspect.product.skuNo;
        this.className = this.$store.state.getInspect.product.className;
        this.productName = this.$store.state.getInspect.product.productName;
        this.inspectDate = this.$store.state.getInspect.inspectDate;
        this.decideResult = this.$store.state.getInspect.decideResult;
        this.lotDate = this.$store.state.getInspect.lotDate;
        this.moisture = this.$store.state.getInspect.moisture;
        this.appearance = this.$store.state.getInspect.appearance;
        this.color = this.$store.state.getInspect.color;
        this.size = this.$store.state.getInspect.size;
        this.damage = this.$store.state.getInspect.damage;
        this.sensuality = this.$store.state.getInspect.sensuality;
        this.finishState = this.$store.state.getInspect.finishState;
        this.checkWork = this.$store.state.getInspect.checkWork;
        this.usability = this.$store.state.getInspect.usability;
        this.foreignBody = this.$store.state.getInspect.foreignBody;
        this.weight = this.$store.state.getInspect.weight;
        this.checkPacking = this.$store.state.getInspect.checkPacking;
        this.inspectContent = this.$store.state.getInspect.inspectContent;
        this.specialReport = this.$store.state.getInspect.specialReport;
        this.inputRead = false;

        // 이미지 파일 있는지 확인.
        if (this.$store.state.getInspect.imageFile.length > 0) {
          this.imgUpdate(this.$store.state.getInspect.imageFile);
        }
      }
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      this.$router.push("/inspectSel");
    },
    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      // 관리자가 아닐 경우 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        this.inputRead = true;
      }
    },
    // 직전 등록 불러오기
    importReg() {
      this.openSpinner();
      let data = {
        productId: this.productId,
        skuNo: this.skuNo,
      };
      this.$store.dispatch("inspectStore/SELECT_INSPECT_REG", data);
    },
    // 검수 추가
    insertInspect() {
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
        this.$store.commit("inspectStore/SET_INSERT_INSPECT", 3);

        this.imgFiles.forEach((element) => {
          this.formData.append("image", element["file"]);
        });

        let data = {
          id: this.inspectId,
          skuNo: this.skuNo,
          productName: this.productName,
          inspectDate: this.inspectDate,
          decideResult: this.decideResult,
          lotDate: this.lotDate,
          appearance: this.appearance,
          moisture: this.moisture,
          color: this.color,
          size: this.size,
          damage: this.damage,
          sensuality: this.sensuality,
          finishState: this.finishState,
          checkWork: this.checkWork,
          usability: this.usability,
          foreignBody: this.foreignBody,
          weight: this.weight,
          checkPacking: this.checkPacking,
          inspectContent: this.inspectContent,
          specialReport: this.specialReport,
        };

        this.formData.append(
          "data",
          new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        this.formData.append(
          "productId",
          new Blob([JSON.stringify(this.productId)], {
            type: "application/json",
          })
        );

        this.$store
          .dispatch("inspectStore/INSERT_INSPECT", this.formData)
          .then((response) => {
            this.modalName = "insertInspect";

            // 검수 추가 성공
            if (response.data === 1) {
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 해당 검수 날짜에 이미 등록된 검수 내용 존재
            else if (response.data === 2) {
              this.insertState = 2;
              this.openModal();
              this.closeSpinner();
            }
            // 검수 등록 실패
            else if (response.data === 0) {
              this.insertState = 0;
            }
          })
          .catch((error) => {
            console.log(error);
          });

        this.formData = new FormData();
      }
    },
    // 검수 수정진행
    updateInspect() {
      this.openSpinner();
      this.$store.commit("inspectStore/SET_UPDATE_INSPECT", 3);

      this.imgFiles.forEach((element) => {
        if (element["file"]) {
          this.formData.append("image", element["file"]);
        } else if (element["imgId"]) {
          this.formData.append("imgId", element["imgId"]);
        }
      });

      let data = {
        id: this.inspectId,
        skuNo: this.skuNo,
        productName: this.productName,
        inspectDate: this.inspectDate,
        decideResult: this.decideResult,
        lotDate: this.lotDate,
        appearance: this.appearance,
        moisture: this.moisture,
        color: this.color,
        size: this.size,
        damage: this.damage,
        sensuality: this.sensuality,
        finishState: this.finishState,
        checkWork: this.checkWork,
        usability: this.usability,
        foreignBody: this.foreignBody,
        weight: this.weight,
        checkPacking: this.checkPacking,
        inspectContent: this.inspectContent,
        specialReport: this.specialReport,
      };

      this.formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      this.formData.append(
        "productId",
        new Blob([JSON.stringify(this.productId)], {
          type: "application/json",
        })
      );

      this.$store
        .dispatch("inspectStore/UPDATE_INSPECT", this.formData)
        .then((response) => {
          this.modalName = "updateInspect";

          // 검수 업데이트 성공
          if (response.data === 1) {
            this.updateState = 1;
            this.openModal();
            this.closeSpinner();
          }
          // 검수 업데이트 실패
          else if (response.data === 0) {
            this.updateState = 3;
            this.openModal();
            this.closeSpinner();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 검수 삭제 진행
    deleteInspect() {
      this.openSpinner();
      this.$store.commit("inspectStore/SET_DELETE_INSPECT", 3);

      this.$store
        .dispatch("inspectStore/DELETE_INSPECT", { id: this.inspectId })
        .then((response) => {
          this.modalName = "deleteInspect";
          // 검수 삭제 성공
          if (response.data === 1) {
            this.deleteState = 1;
            this.openModal();
            this.closeSpinner();
          }
          // 검수 업데이트 실패
          else if (response.data === 0) {
            this.deleteState = 0;
            this.openModal();
            this.closeSpinner();
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
.imgup {
  margin-left: 10px;
}
</style>
