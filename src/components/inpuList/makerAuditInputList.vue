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
                <b-form-input
                  type="text"
                  v-model="auditPurpose"
                ></b-form-input>
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
                      {{item.name}}
                    </span> 
                  </template>

                  <!-- 수정 권한 내용 -->
                  <template v-slot:cell(chkDel)="row">
                    <b-button
                      @click="delDown(row.item, row.index, $event.target)"
                    >삭제</b-button>
                  </template>
                  <template v-slot:cell(down)="row">
                    <b-button
                      @click="row.btn"
                    >다운로드</b-button>
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
                  @change="imgFileSelected"
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
                  v-for="(img, index2) in item"
                  :key="index2"
                >
                  <button
                   :class="[inputRead ? 'divEnable' : 'divDisable']"
                    class="xBox"
                    v-b-modal.xBox-modal
                    @click="imgElementSave(index, index2)"
                  >
                    x
                  </button>
                  <img :src="img.url" />
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
import confirmModal from "../modal/ConfirmModal.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";
import { imageMixin } from "../../mixins/imageMixin.js";
import { adminChkMixin } from "../../mixins/adminChkMixin.js";
// import ss from '../'

export default {
  components: {
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin, imageMixin, adminChkMixin],
  props: ["propsdata"],
  data() {
    return {
      makerAudittId: "",
      writDate: "",
      auditDate: "",
      auditPurpose: "",
      auditScore: "",
      auditResult: "",
      auditContent: "",
      auditIncon: "",
      auditImprove: "",
      fileData:[],
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
      chkFileData :false,
      inputRead: true,
      searchModal: false,
      insertState: 3,
      updateState: 3,
      deleteState: 3,
    };
  },
  mounted() {
    // this.updateData();
  },
  computed: {
    
  },
  watch: {
  },
  methods: {
    // 파일 첨부 데이터 확인
    async AddfileData(event){
      console.log("file add event");
      console.log(event);

      var files = event.target.files;
      console.log(files);
      
      var temp = await this.fileDataFun(files);

      temp.forEach(element => {
        this.fileData.push(element);
      });

      console.log("파일 추가.");
      console.log(this.fileData);

    },
    // 파일 데이터 처리
    fileDataFun(files){
      var temp = [];

      var cnt = 1;
      var len = files.length;

      return new Promise(function(resolve){
        [].forEach.call(files, function (i,item) {

          var fileReader = new FileReader();
          fileReader.onload = async function (e) {
              
              console.log(e.target);

              var img = await {
                  url : e.target.result,
                  file : files[item]
              };

              console.log("url");
              console.log(img);

              temp.push(img);
              
              if(cnt === len){
                resolve(temp)
              } else{
                cnt++;
              }
          };
          fileReader.readAsDataURL(files[item]);
        });
      })
    },
    // 첨부파일 삭제
    delDown(item, index, button){
      console.log("데이터 들어옴");
      console.log(item);
      console.log(index);
      console.log(button);
    }
    
    // 검수 상세 정보 입력
    // updateData() {
    //   if (this.propsdata === "updateView") {
    //     console.log("setData if 실행 : " + this.propsdata);
    //     console.log(this.$store.state.getInspect);
    //     this.inspectId = this.$store.state.getInspect.id;
    //     this.productId = this.$store.state.getInspect.product.id;
    //     this.skuNo = this.$store.state.getInspect.product.skuNo;
    //     this.className = this.$store.state.getInspect.product.className;
    //     this.productName = this.$store.state.getInspect.product.productName;
    //     this.inspectDate = this.$store.state.getInspect.inspectDate;
    //     this.decideResult = this.$store.state.getInspect.decideResult;
    //     this.lotDate = this.$store.state.getInspect.lotDate;
    //     this.moisture = this.$store.state.getInspect.moisture;
    //     this.appearance = this.$store.state.getInspect.appearance;
    //     this.color = this.$store.state.getInspect.color;
    //     this.size = this.$store.state.getInspect.size;
    //     this.damage = this.$store.state.getInspect.damage;
    //     this.finishState = this.$store.state.getInspect.finishState;
    //     this.checkWork = this.$store.state.getInspect.checkWork;
    //     this.usability  = this.$store.state.getInspect.usability;
    //     this.foreignBody  = this.$store.state.getInspect.foreignBody;
    //     this.weight = this.$store.state.getInspect.weight;
    //     this.checkPacking = this.$store.state.getInspect.checkPacking;
    //     this.inspectContent = this.$store.state.getInspect.inspectContent;
    //     this.specialReport = this.$store.state.getInspect.specialReport;
    //     this.inputRead = false;

    //     // 이미지 파일 있는지 확인.
    //     if (this.$store.state.getInspect.imageFile.length > 0) {
    //       this.imgUpdate(this.$store.state.getInspect.imageFile);
    //     }
    //   } else {
    //     console.log("setData else 실행 : " + this.propsdata);
    //   }
    // },
    // // 등록 완료 되었을 경우 초기화
    // roturInit() {
    //   console.log("routerInit 접속. 새로고침 진행");
    //   this.$router.push("/inspectSel");
    //   // this.$router.go();
    // },
    // // 업데이트 진행 시 수정모드인지 확인
    // inpuReadMode() {
    //   // 관리자가 아닐 경우 추가 불가능
    //   // adminChkMixin 사용
    //   this.adminChk();
    //   if (this.adminChkFlag) {
    //     this.modalName = "noAdmin";

    //     this.openModal();
    //   }
    //   // 관리자일 경우 추가 가능
    //   else {
    //     this.inputRead = true;
    //   }
    // },
    // // 검수 추가
    // insertInspect() {
    //   // 관리자가 아닐 경우 추가 불가능
    //   // adminChkMixin 사용
    //   this.adminChk();
    //   if (this.adminChkFlag) {
    //     this.modalName = "noAdmin";

    //     this.openModal();
    //   }
    //   // 관리자일 경우 추가 가능
    //   else {
    //     // this.openSpinner();
    //     this.$store.commit("inspectStore/SET_INSERT_INSPECT", 3);
    //     console.log("검수 추가 진행");

    //     this.imgFiles.forEach((element) => {
    //       // console.log(element);
    //       element.forEach((e) => {
    //         this.formData.append("image", e["file"]);
    //       });
    //     });

    //     let data = {
    //       id: this.inspectId,
    //       skuNo: this.skuNo,
    //       productName: this.productName,
    //       inspectDate: this.inspectDate,
    //       decideResult: this.decideResult,
    //       lotDate: this.lotDate,
    //       appearance : this.appearance,
    //       moisture: this.moisture,
    //       color : this.color,
    //       size : this.size,
    //       damage : this.damage,
    //       finishState : this.finishState,
    //       checkWork : this.checkWork,
    //       usability  : this.usability,
    //       foreignBody  : this.foreignBody,
    //       weight : this.weight,
    //       checkPacking : this.checkPacking,
    //       inspectContent: this.inspectContent,
    //       specialReport: this.specialReport,
    //     };

    //     console.log("this.productId : " + this.productId);

    //     this.formData.append(
    //       "data",
    //       new Blob([JSON.stringify(data)], { type: "application/json" })
    //     );
    //     this.formData.append(
    //       "productId",
    //       new Blob([JSON.stringify(this.productId)], {
    //         type: "application/json",
    //       })
    //     );

    //     this.$store
    //       .dispatch("inspectStore/INSERT_INSPECT", this.formData)
    //       .then((response) => {
    //         this.modalName = "insertInspect";
    //         console.log("response 응답 옴");
    //         console.log(response);

    //         // 검수 추가 성공
    //         if (response.data === 1) {
    //           console.log("response 값 1");
    //           this.insertState = 1;
    //           this.openModal();
    //           this.closeSpinner();
    //         }
    //         // 해당 검수 날짜에 이미 등록된 검수 내용 존재
    //         else if (response.data === 2) {
    //           console.log("response 값 2");
    //           this.insertState = 2;
    //           this.openModal();
    //           this.closeSpinner();
    //         }
    //         // 검수 등록 실패
    //         else if (response.data === 0) {
    //           console.log("response 값 0");
    //           this.insertState = 0;
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("error 발생");
    //         console.log(error);
    //       });

    //     this.formData = new FormData();
    //   }
    // },
    // // 검수 수정진행
    // updateInspect() {
      
    //   this.openSpinner();
    //   console.log("제품 수정 진행");
    //   this.$store.commit("inspectStore/SET_UPDATE_INSPECT", 3);
    //   console.log("productId : " + this.productId);

    //   this.imgFiles.forEach((element) => {
    //     // console.log(element);
    //     element.forEach((e) => {
    //       if (e["file"]) {
    //         console.log("신규 이미지 존재");
    //         this.formData.append("image", e["file"]);
    //       } else if (e["imgId"]) {
    //         console.log("기존 이미지 존재");
    //         this.formData.append("imgId", e["imgId"]);
    //       }
    //     });
    //   });

    //   let data = {
    //     id: this.inspectId,
    //     skuNo: this.skuNo,
    //     productName: this.productName,
    //     inspectDate: this.inspectDate,
    //     decideResult: this.decideResult,
    //     lotDate: this.lotDate,
    //     appearance : this.appearance,
    //     moisture: this.moisture,
    //     color : this.color,
    //     size : this.size,
    //     damage : this.damage,
    //     finishState : this.finishState,
    //     checkWork : this.checkWork,
    //     usability  : this.usability,
    //     foreignBody  : this.foreignBody,
    //     weight : this.weight,
    //     checkPacking : this.checkPacking,
    //     inspectContent: this.inspectContent,
    //     specialReport: this.specialReport,
    //   };

    //   this.formData.append(
    //     "data",
    //     new Blob([JSON.stringify(data)], { type: "application/json" })
    //   );
    //   this.formData.append(
    //     "productId",
    //     new Blob([JSON.stringify(this.productId)], {
    //       type: "application/json",
    //     })
    //   );

    //   this.$store
    //     .dispatch("inspectStore/UPDATE_INSPECT", this.formData)
    //     .then((response) => {
    //       this.modalName = "updateInspect";

    //       // 검수 업데이트 성공
    //       if (response.data === 1) {
    //         console.log("response 값 1");
    //         this.updateState = 1;
    //         this.openModal();
    //         this.closeSpinner();
    //       }
    //       // 검수 업데이트 실패
    //       else if (response.data === 0) {
    //         console.log("response 값 0");
    //         this.updateState = 3;
    //         this.openModal();
    //         this.closeSpinner();
    //       }

    //       console.log("modalName : " + this.modalName);
    //     })
    //     .catch((error) => {
    //       console.log("error 발생");
    //       console.log(error);
    //     });
      
    // },
    // // 검수 삭제 진행
    // deleteInspect() {
    
    //   this.openSpinner();
    //   console.log("검수 삭제 진행");
    //   this.$store.commit("inspectStore/SET_DELETE_INSPECT", 3);

    //   this.$store
    //     .dispatch("inspectStore/DELETE_INSPECT", { id: this.inspectId })
    //     .then((response) => {
    //       this.modalName = "deleteInspect";
    //       // 검수 삭제 성공
    //       if (response.data === 1) {
    //         console.log("response 값 1");
    //         this.deleteState = 1;
    //         this.openModal();
    //         this.closeSpinner();
    //       }
    //       // 검수 업데이트 실패
    //       else if (response.data === 0) {
    //         console.log("response 값 0");
    //         this.deleteState = 0;
    //         this.openModal();
    //         this.closeSpinner();
    //       }

    //       console.log("modalName : " + this.modalName);
    //     })
    //     .catch((error) => {
    //       console.log("error 발생");
    //       console.log(error);
    //     });
      
    // },
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