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
          <div class="col-md-4 mb-3">
            <b-input-group prepend="클레임 발생일자">
              <b-form-input
                type="date"
                v-model="claimDate"
                placeholder=""
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-md-4 mb-3">
            <b-input-group prepend="클레임 분류">
              <b-form-select
                v-model="claimDecide"
                :options="options"
              ></b-form-select>
            </b-input-group>
          </div>
          <div class="col-md-4 mb-3">
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
                :options="options"
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
                v-model="imgFiles"
                multiple
                @change="imgFileSelected"
                plain
                size="lg"
              ></b-form-file>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <b-input-group prepend="사진 미리보기">
              <!-- <b-img class="imgSizes" thumbnail fluid :src="item.url" alt="Image 1"></b-img> -->
              <viewer :images="this.imgFiles" @inited="inited">
                <div v-if="imgFlag">
                  <img
                    class="imgSizes"
                    v-for="item in imgFiles"
                    :src="item.url"
                    :key="item.url"
                  />
                </div>
                <div v-else>
                  <img
                    class="imgSizes"
                    v-for="item in imgFiles"
                    :src="require(`@/assets/images${item.url}`)"
                    :key="item.url"
                  />
                </div>
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
    </b-overlay>

    <!-- 제품검색 팝업창. -->
    <div>
      <search-product-modal @close="closeSearchModal" v-if="searchModal">
        <div v-if="modalName === 'searchProduct'">
          <select-product-table
            v-on:selectProductCheck="closeSearchModal"
          ></select-product-table>
          <template slot="footer">
            <button @click="modalText">확인</button>
          </template>
        </div>
      </search-product-modal>
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
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateClaim' && updateState === 1"
        >
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteClaim' && deleteState"
        >
          <b-button variant="primary" @click="roturInit()">확인</b-button>
        </template>
        <template slot="footer" v-else>
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import searchProductModal from "../modal/SearchProductModal.vue";
import SelectProductTable from "../select/SelectProductTable.vue";
import confirmModal from "../modal/ConfirmModal.vue";
// import ss from '../'

export default {
  components: {
    searchProductModal,
    SelectProductTable,
    confirmModal,
  },
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
      lotDate: "",
      recall: "",
      asanaLink: "",
      claimContent: "",
      specialReport: "",
      imgFiles: [],
      note: "",
      options: [
        { value: "적합", text: "적합" },
        { value: "부적합", text: "부적합" },
        { value: "판단보류", text: "판단보류" },
      ],
      confirmSkuNo: "",
      inputRead: true,
      skuNoDuplication: true,
      modal: false,
      searchModal: false,
      insertState: 3,
      updateState: 3,
      deleteState: 3,
      spinnerState: false,
      modalName: "",
      formData: new FormData(),
      // 이미지 수정 모드에 따라서 viewer로 나타내는 모드가 달라짐
      imgFlag: true,
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
      console.log("확인 : " + val.skuNo + ", " + val.productName);
      console.log(val);
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
        console.log("setData if 실행 : " + this.propsdata);

        this.claimId = this.$store.state.getClaim.id;
        this.productId = this.$store.state.getClaim.product.id;
        this.skuNo = this.$store.state.getClaim.product.skuNo;
        this.productName = this.$store.state.getClaim.product.productName;
        this.orderNum = this.$store.state.getClaim.orderNum;
        this.zenDeskID = this.$store.state.getClaim.zenDeskID;
        this.claimDate = this.$store.state.getClaim.claimDate;
        this.claimDecide = this.$store.state.getClaim.claimDecide;
        this.lotDate = this.$store.state.getClaim.lotDate;
        this.recall = this.$store.state.getClaim.recall;
        this.asanaLink = this.$store.state.getClaim.asanaLink;
        this.claimContent = this.$store.state.getClaim.claimContent;
        this.specialReport = this.$store.state.getClaim.specialReport;
        this.note = this.$store.state.getClaim.note;
        this.inputRead = false;

        // 이미지 파일 있는지 확인.
        if (this.$store.state.getClaim.imageFile.length > 0) {
          this.imgFlag = false;
          this.imgUpdate();
        }
      } else {
        this.imgFlag = true;
        console.log("setData else 실행 : " + this.propsdata);
      }
    },
    // 클레임 상세 정보 이미지 파일 지정
    imgUpdate() {
      this.imgFiles = [];
      this.$store.state.getClaim.imageFile.forEach((x) => {
        console.log("이미지 있음");

        var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");

        this.imgFiles.push({ url: tempImg });
        console.log(tempImg);
      });
      console.log(this.imgFiles);
    },
    // 파일 이미지 추가 될 경우
    imgFileSelected(event) {
      console.log("이미지 파일 추가");
      console.log(event);
      this.imgFlag = true;
      var files = event.target.files;
      this.imgFiles = [];

      var temp = [];
      var frm = new FormData();

      [].forEach.call(files, function (i, item) {
        frm.append("image", files[item]);
        console.log("FileReader 내용 확인중");
        console.log(files[item]);

        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          console.log(item);
          console.log(i);

          var img = {
            url: e.target.result,
          };
          console.log("url");
          console.log(img);

          // var img = e.target.result;

          temp.push(img);
        };
        fileReader.readAsDataURL(files[item]);
      });
      this.imgFiles = temp;
      this.formData = frm;
      console.log("이미지 추가.");
      console.log(this.imgFiles);
    },
    // viewer 초기화
    inited(viewer) {
      console.log("viewer 초기화");
      this.$viewer = viewer;
    },
    // 스피너 열기
    openSpinner() {
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner() {
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
    // 제품 검색 모달 열기
    openSearchModal() {
      this.searchModal = true;
    },
    // 제품 검색 모달 닫기
    closeSearchModal() {
      this.searchModal = false;
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      console.log("routerInit 접속. 새로고침 진행");
      this.$router.push("/claimSel");
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
    // 클레임 추가
    insertClaim() {
      // 관리자가 아닐 경우 추가 불가능
      if (this.$store.getters.getUserLogin.data.body.data.role !== "ADMIN") {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        this.openSpinner();
        this.$store.commit("SET_INSERT_CLAIM", 3);
        console.log("클레임 추가 진행");

        let data = {
          productId: this.productId,
          skuNo: this.skuNo,
          productName: this.productName,
          orderNum: this.orderNum,
          zenDeskID: this.zenDeskID,
          claimDate: this.claimDate,
          claimDecide: this.claimDecide,
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
          .dispatch("INSERT_CLAIM", this.formData)
          .then((response) => {
            this.modalName = "insertClaim";

            // 클레임 추가 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.insertState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 등록 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.insertState = 0;
            }
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });

        this.formData = new FormData();
      }
    },
    // 클레임 수정진행
    updateClaim() {
      // 관리자가 아닐 경우 수정 불가능
      if (this.$store.getters.getUserLogin.data.body.data.role !== "ADMIN") {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 수정 가능
      else {
        this.openSpinner();
        console.log("제품 수정 진행");
        this.$store.commit("SET_UPDATE_CLAIM", 3);
        console.log("productId : " + this.productId);

        let data = {
          id: this.claimId,
          productId: this.productId,
          skuNo: this.skuNo,
          productName: this.productName,
          orderNum: this.orderNum,
          zenDeskID: this.zenDeskID,
          claimDate: this.claimDate,
          claimDecide: this.claimDecide,
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
          .dispatch("UPDATE_CLAIM", this.formData)
          .then((response) => {
            this.modalName = "updateClaim";

            // 클레임 업데이트 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.updateState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 업데이트 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.updateState = 3;
              this.openModal();
              this.closeSpinner();
            }

            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },
    // 클레임 삭제 진행
    deleteClaim() {
      // 관리자가 아닐 삭제 추가 불가능
      if (this.$store.getters.getUserLogin.data.body.data.role !== "ADMIN") {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 삭제 가능
      else {
        this.openSpinner();
        console.log("클레임 삭제 진행");
        this.$store.commit("SET_DELETE_CLAIM", 3);

        this.$store
          .dispatch("DELETE_CLAIM", { id: this.claimId })
          .then((response) => {
            this.modalName = "deleteClaim";
            // 클레임 삭제 성공
            if (response.data === 1) {
              console.log("response 값 1");
              this.deleteState = 1;
              this.openModal();
              this.closeSpinner();
            }
            // 클레임 업데이트 실패
            else if (response.data === 0) {
              console.log("response 값 0");
              this.deleteState = 0;
              this.openModal();
              this.closeSpinner();
            }

            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
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
