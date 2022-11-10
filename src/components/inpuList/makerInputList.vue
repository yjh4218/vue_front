<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div :class="[inputRead ? 'divEnable' : 'divDisable']">
        <div class="row">
          <div class="col-md-3 mb-3">
            <b-input-group prepend="제조사명">
              <b-form-input
                type="text"
                v-model="makerName"
                placeholder=""
                value=""
                maxlength="100"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-3 mb-3">
            <b-input-group prepend="평가점수(100점 만점)">
              <b-form-input
                type="text"
                v-model="makerScore"
                placeholder=""
                value=""
                maxlength="3"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-6 mb-3">
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
            <b-input-group prepend="제조업종">
              <b-form-select
                v-model="className"
                :options="options"
              ></b-form-select>
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
          <div class="col-md-6 mb-3">
            <b-input-group prepend="주요공정">
              <b-form-input
                type="text"
                v-model="process"
                placeholder=""
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
                maxlength="14"
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
        <div class="col-md-12 mb-3">
            <b-input-group prepend="주요제품">
              <b-form-textarea
                id="textarea-default"
                v-model="importProduct"
                rows="3"
                max-rows="10"
              ></b-form-textarea>
            </b-input-group>
          </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="제조사 정보">
              <b-form-textarea
                id="textarea-default"
                v-model="makerInfo"
                rows="3"
                max-rows="10"
              ></b-form-textarea>
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
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="제조사 히스토리">
              <b-form-textarea
                id="textarea-default"
                v-model="makerChangeContent"
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
            v-bind:disabled="makerName === '' || className === ''"
          >
            신규 제조사 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-modal>
            제조사 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal>
            제조사 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            제조사 수정하기
          </b-button>
        </div>
      </div>
<!-- v-if="propsdata === 'updateView'" -->
      <div v-if="propsdata === 'updateView'">
        <div class="leftTable">
          <div class="row">
            <div class="col-md-6">
              <p>※ 제조사 히스토리(수정 시 체크 박스 선택 필요)</p>
            </div>
            <div class="col-md-6">
              <b-button
                variant="primary"
                class="rightBox"
                v-b-modal.reply-update-modal
              >
                제조사 정보 수정
              </b-button>
              <b-button
                variant="danger"
                class="rightBox"
                v-b-modal.reply-delete-modal
              >
                제조사 정보 삭제
              </b-button>
            </div>
          </div>
          
          <div class="replytable">
            <b-table
              sticky-header
              responsive
              striped
              hover
              :items="makerReply"
              :fields="histioryFields"
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
            >
              <template v-slot:head(selected)>
                <b-form-checkbox></b-form-checkbox>
              </template>
              <template v-slot:cell(selected)="row">
                <b-form-checkbox
                  v-model="row.item.selected"
                  @change="selectReplyData(row.item)"
                ></b-form-checkbox>
              </template>

              <!-- 수정 권한 내용 -->
              <template v-slot:cell(makerChangeReply)="row">
                <b-form-input v-model="row.item.makerChangeReply" />
              </template>
            </b-table>
          </div>
        </div>
        <div class="rightTable">
          <div class="row">
            <div class="col-md-6">
              <p>※ 제조사 점검내역(수정, 삭제 시 더블클릭)</p>
            </div>
            <div class="col-md-6">
              <b-button
                variant="primary"
                class="rightBox"
                @click="addAudit()"
              >
                점검 내역 추가
              </b-button>
            </div>
          </div>
          <div>
            <b-table
              sticky-header
              responsive
              striped
              hover
              :items="makerAudit"
              :fields="auditFields"
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              @row-dblclicked="makerAuditDetails"
            >
            </b-table>
          </div>
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

      <b-modal id="reply-update-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">제조사 정보를 수정하시겠습니까?</div>
        <div>체크박스에 선택 된 내용만 수정됩니다.</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateMakerReply(), $bvModal.hide('reply-update-modal')"
              :disabled="spinnerState"
            >
              수정하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('reply-update-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="reply-delete-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->

        <div class="my-4">제조사 정보를 삭제하시겠습니까?</div>
        <div>체크박스에 선택 된 내용만 삭제됩니다.</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteMakerReply(), $bvModal.hide('reply-delete-modal')"
              :disabled="spinnerState"
            >
              삭제하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('reply-delete-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>

      <!-- 제조사 모달 -->
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

    <!-- 점검내역 오픈 모달. -->
    <div>
      <common-modal @close="closeSearchModal" v-if="searchModal">
        <div v-if="modalName === 'addAudit'">
          <maker-audit-input-list :propsdata="[messageId, messageMode]"></maker-audit-input-list>
          <template slot="footer">
            <button @click="modalText">확인</button>
          </template>
        </div>
      </common-modal>
    </div>


    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertMaker'">
          <div v-if="insertState === 1">
            <p>제조사가 등록 되었습니다.</p>
          </div>
          <div v-else>
            <p>제조사 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateMaker'">
          <div v-if="updateState === 1">
            <p>제조사 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>제조사 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
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
        <div v-if="modalName === 'updateMakerReply'">
          <div v-if="updateState">
            <p>제조사 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>제조사 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteMakerReply'">
          <div v-if="deleteState">
            <p>제조사 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>제조사 정보 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
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
          v-if="modalName === 'insertMaker' && insertState === 1"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateMaker' && updateState === 1"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteMaker' && deleteState"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateMakerReply' && updateState"
        >
          <button @click="roturInit('makerSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteMakerReply' && deleteState"
        >
          <button @click="roturInit('makerSel')">확인</button>
        </template>
        <template slot="footer" v-else>
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import commonModal from "../modal/commonModal.vue"
import makerAuditInputList from "../inpuList/makerAuditInputList.vue"
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
// import ss from '../'

export default {
  components: {    
    commonModal,
    confirmModal,
    makerAuditInputList
  },
  mixins: [modalMixin, spinnerMixin, adminChkMixin],
  props: ["propsdata"],
  data() {
    return {
      makerId: "",
      className: "",
      makerName: "",
      makerAddress: "",
      process: "",
      importProduct: "",
      makerScore: "",
      sales: "",
      makerInfo: "",
      makerPerson: "",
      makerPhone: "",
      makerEmail: "",
      note: "",
      makerChangeContent: "",
      makerReply: [],
      selectReply: [],
      makerAudit:[],
      options: [
        { value: "사료", text: "1. 사료" },
        { value: "동물용 의료기기", text: "2. 동물용 의료기기" },
        { value: "동물용 의약외품", text: "3. 동물용 의약외품" },
        { value: "공산품", text: "4. 공산품" },
        { value: "생활화학제품", text: "5. 생활화학제품" },
        { value: "화장품", text: "6. 화장품" },
        { value: "기타", text: "7. 기타" },
      ],
      histioryFields: [
        { key: "selected", thClass: "w2" },
        {
          key: "makerChangeReply",
          label: "제조사 히스토리",
          sortable: true,
          thClass: "w50",
        },
        { key: "replyDate", label: "작성날짜", sortable: true, thClass: "w15" },
      ],
      auditFields: [
        {
          key: "auditDate",
          label: "점검일자",
          sortable: true,
          thClass: "w15",
        },
        { key: "auditPurpose", label: "점검목적", sortable: true, thClass: "w40" },
        { key: "auditScore", label: "점검점수", sortable: true, thClass: "w20" },
      ],
      inputRead: true,
      searchModal: false,
      insertState: 3,
      updateState: 3,
      deleteState: 3,
      modalName: "",
      messageId: "",
      messageMode:""
    };
  },
  mounted() {
    this.updateData();
  },

  methods: {
    // 제조사 상세 정보 입력
    updateData() {
      if (this.propsdata === "updateView") {
        this.makerId = this.$store.state.getMaker.id;
        this.makerName = this.$store.state.getMaker.makerName;
        this.className = this.$store.state.getMaker.className;
        this.makerScore = this.$store.state.getMaker.makerScore;
        this.makerInfo = this.$store.state.getMaker.makerInfo;        
        this.makerAddress = this.$store.state.getMaker.makerAddress;
        this.process = this.$store.state.getMaker.process;
        this.importProduct = this.$store.state.getMaker.importProduct;
        this.sales = this.$store.state.getMaker.sales;
        this.makerPerson = this.$store.state.getMaker.makerPerson;
        this.makerPhone = this.$store.state.getMaker.makerPhone;
        this.makerEmail = this.$store.state.getMaker.makerEmail;
        this.note = this.$store.state.getMaker.note;
        this.makerReply = this.$store.state.getMaker.makerChangeReplies;
        this.inputRead = false;
        this.messageId = this.$store.state.getMaker.id;
        this.makerAudit = this.$store.state.getMaker.makerAuditList;

        this.makerReply.forEach((e) => {
          let tmpData = {
            id: e.id,
            makerChangeReply: e.makerChangeReply,
            replyDate: e.replyDate,
            selected: false,
            createDate: e.createDate,
          };
          this.selectReply.push(tmpData);
        });
      } else {
        this.imgFlag = true;
      }
    },
    // 점검 내역 추가
    addAudit() {
      // 관리자가 아닐 경우 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      } else{
        this.messageMode="insertView"
        this.searchModal = true;
        this.modalName = "addAudit";
      }
    },
    // 상품정보 변경
    selectReplyData(item) {
      this.selectReply.forEach((element, index) => {
        if (element.id === item.id) {
          this.selectReply[index].selected = item.selected;
        }
      });
    },
    // 수정인지, 신규 등록인지 확인
    inpuReadMode() {
      this.inputRead = true;
    },
    // 더블 클릭 이벤트
    makerAuditDetails(item) {
      this.$store.commit("SET_MAKER_AUDIT", "");

      // 제조사 점검 상세정보 페이지로 이동
      this.$store.commit("SET_MAKER_AUDIT", item);
      // 관리자가 아닐 경우 오픈 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      } else{
        this.messageMode="updateView"
        this.searchModal = true;
        this.modalName = "addAudit";
      }
      // this.$router.push(`/makerUp/${item.id}`);
    },
    // 제조사 추가
    insertMaker() {
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
        this.$store.commit("makerStore/SET_INSERT_MAKER", 3);

        let data = {
          id: this.makerId,
          makerName: this.makerName,
          className: this.className,
          makerAddress: this.makerAddress,
          process: this.process,
          importProduct: this.importProduct,
          sales: this.sales,
          makerScore : this.makerScore,
          makerInfo : this.makerInfo,
          makerPerson: this.makerPerson,
          makerPhone: this.makerPhone,
          makerEmail: this.makerEmail,
          note: this.note,
          makerChangeContent : this.makerChangeContent
        };
        this.$store
          .dispatch("makerStore/INSERT_MAKER", data)
          .then((response) => {
            this.modalName = "insertMaker";

            // 제조사 추가 성공
            if (response.data === 1) {
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 제조사 등록 실패
            else if (response.data === 0) {
              this.insertState = 0;
              this.openModal();
              this.closeSpinner();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 제조사 수정진행
    updateMaker() {
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
        this.$store.commit("makerStore/SET_UPDATE_MAKER", 3);

        let data = {
          id: this.makerId,
          makerName: this.makerName,
          className: this.className,
          makerAddress: this.makerAddress,
          process: this.process,
          importProduct: this.importProduct,
          makerScore : this.makerScore,
          makerInfo : this.makerInfo,
          sales: this.sales,
          makerPerson: this.makerPerson,
          makerPhone: this.makerPhone,
          makerEmail: this.makerEmail,
          makerChangeContent : this.makerChangeContent,
          note: this.note,
        };

        this.$store
          .dispatch("makerStore/UPDATE_MAKER", data)
          .then((response) => {
            this.modalName = "updateMaker";

            // 제조사 업데이트 성공
            if (response.data === 1) {
              
              this.updateState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 제조사 업데이트 실패
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
    // 제조사 삭제
    deleteMaker() {
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
        this.$store.commit("makerStore/SET_DELETE_MAKER", 3);

        this.$store
          .dispatch("makerStore/DELETE_MAKER", { id: this.makerId })
          .then((response) => {
            this.modalName = "deleteMaker";
            // 제조사 삭제 성공
            if (response.data === 1) {
              
              this.deleteState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 제조사 업데이트 실패
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

    // 리플 수정진행
    updateMakerReply() {
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
        this.$store.commit("makerStore/SET_UPDATE_MAKER_REPLY", "3");

        var tmpReply = [];
        this.makerReply.forEach((element) => {
          if (element.selected) {
            tmpReply.push({replyId : element.id, changeReplyData : element.makerChangeReply});
          }
        });

        let data = {
          id: this.makerId,
          replyDataList: tmpReply,
        };

        this.$store
          .dispatch("makerStore/UPDATE_MAKER_REPLY", data)
          .then((response) => {
            this.modalName = "updateMakerReply";

            if (response.data === 1) {
              this.updateState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              this.updateState = false;
              this.openModal();
              this.closeSpinner();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // 제품 리플 삭제
    deleteMakerReply() {

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

        var tmpReply = [];
        this.makerReply.forEach((element) => {
          if (element.selected) {
            tmpReply.push(element.id);
          }
        });

        let data = {
          makerId: this.makerId,
          makerReplyId: tmpReply,
        };

        this.$store.commit("makerStore/SET_DELETE_MAKER_REPLY", "3");
        this.$store
          .dispatch("makerStore/DELETE_MAKER_REPLY", data)
          .then((response) => {
            this.modalName = "deleteMakerReply";

            if (response.data === 1) {
              this.deleteState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              this.deleteState = false;
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
.leftTable{
  width: 49%;
  float:left;
}
.rightTable{
  width: 49%;
  float:right;
}
</style>