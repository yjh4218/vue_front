<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div>
        <div v-if="inputRead">
          <h4>제조사 점검 내역 추가</h4>
        </div>
        <div v-else>
          <p>제조사 점검 내역 수정</p>
        </div>
        <div :class="[inputRead ? 'divEnable' : 'divDisable']">
          <div class="row">
            <div class="col-md-3 mb-3">
              <b-input-group prepend="작성일자">
                <b-form-input
                  type="date"
                  v-model="writDate"
                  placeholder=""
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="점검일자">
                <b-form-input
                  type="date"
                  v-model="auditDate"
                  placeholder=""
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="점검 점수">
                <b-form-input
                  type="text"
                  v-model="auditScore"
                  maxlength="3"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="점검결과">
                <b-form-select
                  v-model="auditResult"
                  :options="auditResultOptions"
                ></b-form-select>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="점검목적">
                <b-form-input type="text" v-model="auditPurpose"></b-form-input>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="점검내용">
                <b-form-textarea
                  id="textarea-default"
                  v-model="auditContent"
                  rows="3"
                  max-rows="5"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="부적합 사항">
                <b-form-textarea
                  id="textarea-default"
                  v-model="auditIncon"
                  rows="3"
                  max-rows="5"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="개선 사항">
                <b-form-textarea
                  id="textarea-default"
                  v-model="auditImprove"
                  rows="3"
                  max-rows="5"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <p>※ 파일 첨부하기</p>
              <b-form-file multiple @change="AddfileData" plain></b-form-file>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <p>※ 파일 첨부 목록</p>
              <div>
                <b-table
                  sticky-header
                  responsive
                  striped
                  hover
                  :items="fileData"
                  :fields="fields"
                  label-sort-asc=""
                  label-sort-desc=""
                  label-sort-clear=""
                >
                  <template #cell(index)="data">
                    {{ data.index + 1 }}
                  </template>
                  <template v-slot:cell(filename)="row">
                    <span v-for="(item, index) in row.item" :key="index">
                      {{ item.name }}
                    </span>
                  </template>

                  <!-- 수정 권한 내용 -->
                  <template v-slot:cell(chkDel)="row">
                    <b-button
                      @click="delDown(row.item, row.index, $event.target)"
                      >삭제</b-button
                    >
                  </template>
                  <template v-slot:cell(down)="row">
                    <b-button
                      @click="downData(row.item, row.index, $event.target)"
                      >다운로드</b-button
                    >
                  </template>
                </b-table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="부적합 사진 첨부">
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
      </div>
      <div class="row" v-if="propsdata[1] === 'insertView'">
        <div class="col-md-12 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            v-b-modal.insert-audit-modal
            :disabled="
              writDate === '' || auditDate === '' || auditResult === ''
            "
          >
            신규 점검 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-audit-modal>
            점검 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-audit-modal>
            점검 정보 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            점검 수정하기
          </b-button>
        </div>
      </div>

      <b-modal id="insert-audit-modal">
        <!-- <template #modal-title> 신규점검 등록 </template> -->
        <div class="my-4">신규 점검를 등록하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="insertMakerAudit(), $bvModal.hide('insert-audit-modal')"
              :disabled="spinnerState"
            >
              등록하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('insert-audit-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="update-audit-modal">
        <!-- <template #modal-title> 신규점검 등록 </template> -->
        <div class="my-4">점검 정보를 수정하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateMakerAudit(), $bvModal.hide('update-audit-modal')"
              :disabled="spinnerState"
            >
              수정하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('update-audit-modal')"
            >
              취소하기
            </b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="delete-audit-modal">
        <!-- <template #modal-title> 신규점검 등록 </template> -->
        <div class="my-4">해당 점검 내용을 삭제하시겠습니까?</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteMakerAudit(), $bvModal.hide('delete-audit-modal')"
              :disabled="spinnerState"
            >
              삭제하기
            </b-button>
            <b-button
              variant="primary"
              class="rightBox"
              @click="$bvModal.hide('delete-audit-modal')"
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

    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === 'insertMakerAudit'">
          <div v-if="insertState === 1">
            <p>검사 내용이 등록 되었습니다.</p>
          </div>
          <div v-else-if="insertState === 2">
            <p>하나의 점검 날짜에 2개 제품 등록은 안 됩니다.</p>
          </div>
          <div v-else>
            <p>검사 내용 등록에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateMakerAudit'">
          <div v-if="updateState === 1">
            <p>검사 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>검사 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteMakerAudit'">
          <div v-if="deleteState === 1">
            <p>점검 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>점검 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
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
          v-if="modalName === 'insertMakerAudit' && insertState === 1"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateMakerAudit' && updateState === 1"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
            >확인</b-button
          >
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteMakerAudit' && deleteState"
        >
          <b-button variant="primary" @click="roturInit('makerSel')"
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
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { imageMixin } from "../../mixins/imageMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
import { fileMixin } from "../../mixins/fileMixin.js";
// import ss from '../'

export default {
  components: {
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin, imageMixin, adminChkMixin, fileMixin],
  props: ["propsdata"],
  data() {
    return {
      id: "",
      makerId: "",
      makerAudittId: "",
      writDate: "",
      auditDate: "",
      auditPurpose: "",
      auditScore: "",
      auditResult: "",
      auditContent: "",
      auditIncon: "",
      auditImprove: "",
      auditResultOptions: [
        { value: "적합", text: "적합" },
        { value: "부적합", text: "부적합" },
        { value: "판단보류", text: "판단보류" },
      ],
      fields: [
        {
          key: "index",
          label: "번호",
          sortable: true,
          thClass: "w5",
        },
        {
          key: "filename",
          label: "파일명",
          sortable: true,
          thClass: "w50",
        },
        { key: "down", label: "다운로드", sortable: true, thClass: "w15" },
        { key: "chkDel", label: "삭제버튼", sortable: true, thClass: "w15" },
      ],
      chkFileData: false,
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
  computed: {},
  watch: {},
  methods: {

    // 점검 상세 정보 입력
    updateData() {
      if (this.propsdata[1] === "insertView") {
        this.inputRead = true;
      } else {
        this.inputRead = false;

        this.id = this.$store.state.getMakerAudit.id;
        this.writDate = this.$store.state.getMakerAudit.writDate;
        this.auditDate = this.$store.state.getMakerAudit.auditDate;
        this.auditPurpose = this.$store.state.getMakerAudit.auditPurpose;
        this.auditScore = this.$store.state.getMakerAudit.auditScore;
        this.auditResult = this.$store.state.getMakerAudit.auditResult;
        this.auditContent = this.$store.state.getMakerAudit.auditContent;
        this.auditIncon = this.$store.state.getMakerAudit.auditIncon;
        this.auditImprove = this.$store.state.getMakerAudit.auditIncon;

        // file 데이터 있는지 확인
        if (this.$store.state.getMakerAudit.makerAuditFiles.length > 0) {
          var tmpImageFile = [];
          var tmpFileData = [];

          this.$store.state.getMakerAudit.makerAuditFiles.forEach((element) => {
            var tmp = element.fileInPath.split(".");

            if (tmp[1] === "png" || tmp[1] === "jpg") {
              tmpImageFile.push(element);
            } else {
              tmpFileData.push(element);
            }
          });
          this.imgUpdate(tmpImageFile, "file");
          this.updateFileData(tmpFileData);
        }
      }

      // makerId와 데이터를 조회하면 데이터 입력 진행.
      this.makerId = this.propsdata[0];
    },

    // // 업데이트 진행 시 수정모드인지 확인
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

    // 제조사 점검 추가
    insertMakerAudit() {
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
        this.$store.commit("makerStore/SET_INSERT_MAKER_AUDIT", 3);

        this.imgFiles.forEach((element) => {
            this.formData.append("file", element["file"]);
        });

        // this.formData.append("fileData", this.fileData);
        this.fileData.forEach((element) => {
          this.formData.append("file", element["file"]);
        });

        let data = {
          writDate: this.writDate,
          auditDate: this.auditDate,
          auditPurpose: this.auditPurpose,
          auditScore: this.auditScore,
          auditResult: this.auditResult,
          auditContent: this.auditContent,
          auditIncon: this.auditIncon,
          auditImprove: this.auditImprove,
        };

        this.formData.append(
          "data",
          new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        this.formData.append(
          "makerId",
          new Blob([JSON.stringify(this.makerId)], {
            type: "application/json",
          })
        );

        this.$store
          .dispatch("makerStore/INSERT_MAKER_AUDIT", this.formData)
          .then((response) => {
            this.modalName = "insertMakerAudit";
            
            // 점검 추가 성공
            if (response.data === 1) {
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 해당 점검 날짜에 이미 등록된 점검 내용 존재
            else if (response.data === 2) {
              this.insertState = 2;
              this.openModal();
              this.closeSpinner();
            }
            // 점검 등록 실패
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
    // 점검 수정진행
    updateMakerAudit() {
      this.openSpinner();
      this.$store.commit("makerStore/SET_UPDATE_MAKER_AUDIT", 3);

      this.imgFiles.forEach((element) => {
          if (element["file"]) {
            this.formData.append("file", element["file"]);
          } else if (element["imgId"]) {
            this.formData.append("fileId", element["imgId"]);
          }
      });

      this.fileData.forEach((element) => {
        if (element["file"]) {
          this.formData.append("file", element["file"]);
        } else if (element["fileId"]) {
          this.formData.append("fileId", element["fileId"]);
        }
      });

      let data = {
        id: this.id,
        writDate: this.writDate,
        auditDate: this.auditDate,
        auditPurpose: this.auditPurpose,
        auditScore: this.auditScore,
        auditResult: this.auditResult,
        auditContent: this.auditContent,
        auditIncon: this.auditIncon,
        auditImprove: this.auditImprove,
      };

      this.formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      this.formData.append(
        "makerId",
        new Blob([JSON.stringify(this.makerId)], {
          type: "application/json",
        })
      );

      this.$store
        .dispatch("makerStore/UPDATE_MAKER_AUDIT", this.formData)
        .then((response) => {
          this.modalName = "updateMakerAudit";

          // 점검 업데이트 성공
          if (response.data === 1) {
            this.updateState = 1;
            this.openModal();
            this.closeSpinner();
          }
          // 점검 업데이트 실패
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

    // 점검 삭제 진행
    deleteMakerAudit() {
      this.openSpinner();
      this.$store.commit("makerStore/SET_DELETE_MAKER_AUDIT", 3);
      this.$store
        .dispatch("makerStore/DELETE_MAKER_AUDIT", { id: this.id })
        .then((response) => {
          this.modalName = "deleteMakerAudit";
          // 점검 삭제 성공
          if (response.data === 1) {
            this.deleteState = 1;
            this.openModal();
            this.closeSpinner();
          }
          // 점검 업데이트 실패
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
