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
                <b-button variant="primary" @click="searchProduct">
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
          <div class="col-md-6 mb-3">
            <b-input-group prepend="주문번호">
              <b-form-input
                type="text"
                v-model="orderNum"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
            <b-input-group prepend="젠데크스 티켓ID">
              <b-form-input
                type="text"
                v-model="zenDeskID"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <b-input-group prepend="클레임 발생일자">
              <b-form-input
                type="date"
                v-model="claimDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="클레임 분류">
              <b-form-select
                v-model="claimDecide"
                :options="claimDecideOptions"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="상세 분류">
              <b-form-select
                v-if="claimDecide === '1. 제조불량'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions1"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '2. 이물질'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions2"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '3. 포장불량'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions3"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '4. 고객과실'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions4"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '5. 원료유래'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions5"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '6. 배송불량'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions6"
              ></b-form-select>
              <b-form-select
                v-else-if="claimDecide === '7. 그 외 기타'"
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions7"
              ></b-form-select>
              <b-form-select
                v-else
                v-model="claimDecideSideOptions"
                :options="claimDecideSideOptions8"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="제품 유통기한">
              <b-form-input
                type="date"
                v-model="lotDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <b-input-group prepend="회수 여부">
              <b-form-select
                v-model="recall"
                :options="recallOptions"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-9 mb-3">
            <b-input-group prepend="아사나 링크">
              <b-form-input
                type="text"
                v-model="asanaLink"
                placeholder=""
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="클레임내용">
              <b-form-textarea
                id="textarea-default"
                v-model="claimContent"
                rows="3"
                max-rows="5"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="조치사항">
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
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="사진 미리보기">
              <viewer
                :images="imgFiles"
                @inited="inited"
                v-for="(item, index) in imgFiles"
                :key="index"
              >
                <span
                  class="imgSizes"
                >
                  <button :class="[inputRead ? 'divEnable' : 'divDisable']"
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
            v-bind:disabled="skuNo === '' || claimDate === ''"
          >
            신규 클레임 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-modal>
            클레임 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal>
            클레임 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            클레임 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규클레임 등록 </template> -->
        <div class="my-4">신규 클레임를 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertClaim(), $bvModal.hide('insert-modal')"
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
        <!-- <template #modal-title> 신규클레임 등록 </template> -->
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
        <!-- <template #modal-title> 신규클레임 등록 </template> -->
        <div class="my-4">클레임 정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateClaim(), $bvModal.hide('update-modal')"
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
        <!-- <template #modal-title> 신규클레임 등록 </template> -->
        <div class="my-4">해당 클레임 내용을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteClaim(), $bvModal.hide('delete-modal')"
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
        <div v-if="modalName === 'insertClaim'">
          <div v-if="insertState === 1">
            <p>클레임이 등록 되었습니다.</p>
          </div>
          <div v-else>
            <p>클레임 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateClaim'">
          <div v-if="updateState === 1">
            <p>클레임 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>클레임 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteClaim'">
          <div v-if="deleteState === 1">
            <p>클레임이 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>클레임 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'noAdmin'">
          <p>관리자가 아니기 때문에 추가, 수정, 삭제할 수 없습니다.</p>
        </div>

        <template
          slot="footer"
          v-if="modalName === 'insertClaim' && insertState === 1"
        >
          <b-button variant="primary" @click="roturInit('claimSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateClaim' && updateState === 1"
        >
          <b-button variant="primary" @click="roturInit('claimSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteClaim' && deleteState"
        >
          <b-button variant="primary" @click="roturInit('claimSel')"
            >확인</b-button
          >
        </template>
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
      claimId: "",
      productId: "",
      skuNo: "",
      productName: "",
      orderNum: "",
      zenDeskID: "",
      claimDate: "",
      claimDecide: "",
      claimDecideSideOptions: "",
      lotDate: "",
      recall: "",
      asanaLink: "",
      claimContent: "",
      specialReport: "",
      note: "",
      claimDecideOptions: [
        { value: "1. 제조불량", text: "1. 제조불량" },
        { value: "2. 이물질", text: "2. 이물질" },
        { value: "3. 포장불량", text: "3. 포장불량" },
        { value: "4. 고객과실", text: "4. 고객과실" },
        { value: "5. 원료유래", text: "5. 원료유래" },
        { value: "6. 배송불량", text: "6. 배송불량" },
        { value: "7. 그 외 기타", text: "7. 그 외 기타" },
      ],
      claimDecideSideOptions1: [
        { value: "1) 생산불량", text: "1) 생산불량" },
        { value: "2) 제품변질", text: "2) 제품변질" },
      ],
      claimDecideSideOptions2: [
        { value: "1) 머리카락", text: "1) 머리카락" },
        { value: "2) 벌레", text: "2) 벌레" },
        { value: "3) 고체이물", text: "3) 고체이물" },
        { value: "4) 그 외", text: "4) 그 외" },
      ],
      claimDecideSideOptions3: [
        { value: "1) 포장불량", text: "1) 포장불량" },
        { value: "2) 제품 수량(중량) 부족", text: "2) 제품 수량(중량) 부족" },
        { value: "3) 유통기한 불량", text: "3) 유통기한 불량" },
        { value: "4) 그 외", text: "4) 그 외" },
      ],
      claimDecideSideOptions4: [
        { value: "1) 급여방법 미준수", text: "1) 급여방법 미준수" },
        { value: "2) 부작용", text: "2) 부작용" },
        { value: "3) 그 외", text: "3) 그 외" },
      ],
      claimDecideSideOptions5: [
        { value: "1) 원료유래", text: "1) 원료유래" },
        { value: "2) 성상유래", text: "2) 성상유래" },
        { value: "3) 그 외", text: "3) 그 외" },
      ],
      claimDecideSideOptions6: [
        { value: "1) 상품파손", text: "1) 상품파손" },
        { value: "2) 제품누락", text: "2) 제품누락" },
        { value: "3) 그 외", text: "3) 그 외" },
      ],
      claimDecideSideOptions7: [{ value: "1) 기타", text: "1) 기타" }],
      claimDecideSideOptions8: [{ value: "", text: "클레임을 선택해주세요." }],
      recallOptions: [
        { value: "완료", text: "완료" },
        { value: "대기", text: "대기" },
        { value: "불필요", text: "불필요" },
      ],
      confirmSkuNo: "",
      inputRead: true,
      skuNoDuplication: true,
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
  },
  watch: {
    // 제품 조회 및 결과값 입력
    selectProdut(val) {
      this.productId = val.productId;
      this.skuNo = val.skuNo;
      this.productName = val.productName;
    },
  },
  methods: {
    // 제품 검색
    searchProduct() {
      this.searchModal = true;
      this.modalName = "searchProduct";
    },
    // 클레임 상세 정보 입력
    updateData() {
      if (this.propsdata === "updateView") {

        this.claimId = this.$store.state.getClaim.id;
        this.productId = this.$store.state.getClaim.product.id;
        this.skuNo = this.$store.state.getClaim.product.skuNo;
        this.productName = this.$store.state.getClaim.product.productName;
        this.orderNum = this.$store.state.getClaim.orderNum;
        this.zenDeskID = this.$store.state.getClaim.zenDeskID;
        this.claimDate = this.$store.state.getClaim.claimDate;
        this.claimDecide = this.$store.state.getClaim.claimDecide;
        this.claimDecideSideOptions =
          this.$store.state.getClaim.claimDecideSideOptions;
        this.lotDate = this.$store.state.getClaim.lotDate;
        this.recall = this.$store.state.getClaim.recall;
        this.asanaLink = this.$store.state.getClaim.asanaLink;
        this.claimContent = this.$store.state.getClaim.claimContent;
        this.specialReport = this.$store.state.getClaim.specialReport;
        this.note = this.$store.state.getClaim.note;
        this.inputRead = false;

        // 이미지 파일 있는지 확인.
        if (this.$store.state.getClaim.imageFile.length > 0) {
          this.imgUpdate(this.$store.state.getClaim.imageFile);
        }
      } 
    },
    roturInit() {
      this.$router.push("/claimSel");
    },
    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      this.inputRead = true;
    },
    // 클레임 추가
    insertClaim() {
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
        this.$store.commit("claimStore/SET_INSERT_CLAIM", 3);

        this.imgFiles.forEach((element) => {
          element.forEach((e) => {
            this.formData.append("image", e["file"]);
          });
        });

        let data = {
          productId: this.productId,
          skuNo: this.skuNo,
          productName: this.productName,
          orderNum: this.orderNum,
          zenDeskID: this.zenDeskID,
          claimDate: this.claimDate,
          claimDecide: this.claimDecide,
          claimDecideSideOptions: this.claimDecideSideOptions,
          lotDate: this.lotDate,
          recall: this.recall,
          asanaLink: this.asanaLink,
          claimContent: this.claimContent,
          specialReport: this.specialReport,
          note: this.note,
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
          .dispatch("claimStore/INSERT_CLAIM", this.formData)
          .then((response) => {
            this.modalName = "insertClaim";

            // 클레임 추가 성공
            if (response.data === 1) {
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 등록 실패
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
    // 클레임 수정진행
    updateClaim() {
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
        this.$store.commit("claimStore/SET_UPDATE_CLAIM", 3);

        this.imgFiles.forEach((element) => {
          element.forEach((e) => {
            if (e["file"]) {
              this.formData.append("image", e["file"]);
            } else if (e["imgId"]) {
              this.formData.append("imgId", e["imgId"]);
            }
          });
        });

        let data = {
          id: this.claimId,
          productId: this.productId,
          skuNo: this.skuNo,
          productName: this.productName,
          orderNum: this.orderNum,
          zenDeskID: this.zenDeskID,
          claimDate: this.claimDate,
          claimDecide: this.claimDecide,
          claimDecideSideOptions: this.claimDecideSideOptions,
          lotDate: this.lotDate,
          recall: this.recall,
          asanaLink: this.asanaLink,
          claimContent: this.claimContent,
          specialReport: this.specialReport,
          note: this.note,
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
          .dispatch("claimStore/UPDATE_CLAIM", this.formData)
          .then((response) => {
            this.modalName = "updateClaim";

            // 클레임 업데이트 성공
            if (response.data === 1) {
              this.updateState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 업데이트 실패
            else if (response.data === 0) {
              this.updateState = 3;
              this.openModal();
              this.closeSpinner();
            }
          })
          .catch((error) => {
            
            console.log(error);
          });
      }
    },
    // 클레임 삭제 진행
    deleteClaim() {
      // 관리자가 아닐 삭제 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 삭제 가능
      else {
        this.openSpinner();
        this.$store.commit("claimStore/SET_DELETE_CLAIM", 3);

        this.$store
          .dispatch("claimStore/DELETE_CLAIM", { id: this.claimId })
          .then((response) => {
            this.modalName = "deleteClaim";
            // 클레임 삭제 성공
            if (response.data === 1) {
              this.deleteState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 업데이트 실패
            else if (response.data === 0) {
              this.deleteState = 0;
              this.openModal();
              this.closeSpinner();
            }
          })
          .catch((error) => {
            
            console.log(error);
          });
      }
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