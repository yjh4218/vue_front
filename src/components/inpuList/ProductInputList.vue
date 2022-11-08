<template>
  <div>
    <b-overlay :show="spinnerState" rounded="sm">
      <div>
      <!-- <div :class="[inputRead ? 'divEnable' : 'divDisable']"> -->
        <div :class="[inputRead ? 'divEnable' : 'divDisable']">
          <div class="row">
            <div class="col-md-4 mb-3">
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
            <div class="col-md-5 mb-3">
              <b-input-group prepend="제품명">
                <b-form-input
                  type="text"
                  v-model="productName"
                  placeholder=""
                  value=""
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="브랜드명">
                <b-form-input
                  type="text"
                  v-model="brandName"
                  placeholder=""
                  value="skuInfo.brandName"
                ></b-form-input>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <b-input-group prepend="제품분류">
                <b-form-select
                  v-model="className"
                  :options="classNameOptions"
                  @change="classNameChange()"
                ></b-form-select>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="제조사">
                <b-form-select
                  v-if="className === '사료'"
                  v-model="maker"
                  :options="makerOptions1"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '동물용 의료기기'"
                  v-model="maker"
                  :options="makerOptions2"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '동물용 의약외품'"
                  v-model="maker"
                  :options="makerOptions3"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '공산품'"
                  v-model="maker"
                  :options="makerOptions4"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '생활화학제품'"
                  v-model="maker"
                  :options="makerOptions5"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '화장품'"
                  v-model="maker"
                  :options="makerOptions6"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '기타'"
                  v-model="maker"
                  :options="makerOptions7"
                ></b-form-select>
                <b-form-select
                  v-else
                  v-model="maker"
                  :options="makerOptions8"
                ></b-form-select>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="보관방법">
                <b-form-select
                  v-if="className === '사료'"
                  v-model="storMethod"
                  :options="storMethodOption1"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '동물용 의료기기'"
                  v-model="storMethod"
                  :options="storMethodOption2"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '동물용 의약외품'"
                  v-model="storMethod"
                  :options="storMethodOption3"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '공산품'"
                  v-model="storMethod"
                  :options="storMethodOption4"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '생활화학제품'"
                  v-model="storMethod"
                  :options="storMethodOption5"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '화장품'"
                  v-model="storMethod"
                  :options="storMethodOption6"
                ></b-form-select>
                <b-form-select
                  v-else-if="className === '기타'"
                  v-model="storMethod"
                  :options="storMethodOption7"
                ></b-form-select>
                <b-form-select
                  v-else
                  v-model="storMethod"
                  :options="storMethodOption8"
                ></b-form-select>
              </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
              <b-input-group prepend="유통기한(개월 수)">
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
            <div class="col-md-4 mb-3">
              <b-input-group prepend="제품출시일">
                <b-form-input
                  type="date"
                  v-model="makeDate"
                  placeholder=""
                  value=""
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-4 mb-3">
              <b-input-group prepend="제품 중량">
                <b-form-input
                  type="text"
                  v-model="productWeight"
                  placeholder=""
                  value=""
                ></b-form-input>
              </b-input-group>
            </div>
            
          </div>
          <div class="row" v-if="className === '사료'">
            <div class="col-md-4 mb-3">
              <b-input-group prepend="제품 수분율">
                <b-form-input
                  type="text"
                  v-model="moisture"
                  placeholder=""
                  value=""
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-4 mb-3">
              <b-input-group prepend="칼로리(100g 기준)">
                <b-form-input
                  type="number"
                  v-model="calorie"
                  placeholder=""
                  value="0"
                ></b-form-input>
              </b-input-group>
            </div>
            <div class="col-md-4 mb-3">
              <b-input-group prepend="나트륨(100g 기준, %)">
                <b-form-input
                  type="number"
                  v-model="sodium"
                  placeholder=""
                  value="0"
                ></b-form-input>
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
                  :fields="fileFields"
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
              <b-input-group prepend="사진 첨부하기">
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
                  <button :class="[inputRead ? 'divEnable' : 'divDisable']"
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
        <div :class="[inputRead ? 'divEnable' : 'divDisable']">
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
            <div class="col-md-12 mb-3">
              <b-input-group prepend="원재료명">
                <b-form-textarea
                  id="textarea-default"
                  v-model="rawMaterialName"
                  rows="3"
                  max-rows="5"
                ></b-form-textarea>
              </b-input-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <b-input-group prepend="포장단위">
                <b-form-textarea
                  id="textarea-default"
                  v-model="packingUnit"
                  rows="3"
                  max-rows="5"
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
              <b-input-group prepend="제품 변경내역">
                <b-form-textarea
                  id="textarea-default"
                  v-model="productChangeContent"
                  rows="3"
                  max-rows="5"
                ></b-form-textarea>
              </b-input-group>
            </div>
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
              className === ''
            "
          >
            신규 상품 등록
          </b-button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 mb-3" v-if="inputRead">
          <b-button variant="primary" class="rightBox" v-b-modal.update-modal>
            상품 정보 수정
          </b-button>
          <b-button variant="danger" class="rightBox" v-b-modal.delete-modal>
            상품 삭제
          </b-button>
        </div>
        <div class="col-md-12 mb-3" v-else>
          <b-button variant="primary" class="rightBox" @click="inpuReadMode">
            상품 수정하기
          </b-button>
        </div>
      </div>
      <div v-if="propsdata === 'updateView'">
        <div class="row">
          <div class="col-md-6">
            <p>※ 제품 변경 히스토리(수정 시 체크 박스 선택 필요함.</p>
          </div>
          <div class="col-md-6">
            <b-button
              variant="primary"
              class="rightBox"
              v-b-modal.reply-update-modal
            >
              제품 변경 정보 수정
            </b-button>
            <b-button
              variant="danger"
              class="rightBox"
              v-b-modal.reply-delete-modal
            >
              제품 변경 정보 삭제
            </b-button>
          </div>
        </div>
        <div class="replytable">
          <b-table
            sticky-header
            responsive
            striped
            hover
            :items="productReply"
            :fields="fields"
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
            <template v-slot:cell(productChangeReply)="row">
              <b-form-input v-model="row.item.productChangeReply" />
            </template>
          </b-table>
        </div>
      </div>

      <b-modal id="insert-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">신규상품을 등록하시겠습니까?</div>
        <div>Sku 번호와 제품 변경 정보는 등록 후 삭제할 수 없습니다.</div>
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
        <div class="my-4">
          해당상품을 삭제하시겠습니까? 해당 상품에 해당하는 검수내용이 모두
          삭제됩니다.
        </div>
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

      <b-modal id="reply-update-modal">
        <!-- <template #modal-title> 신규상품 등록 </template> -->
        <div class="my-4">제품 변경 히스토리를 수정하시겠습니까?</div>
        <div>체크박스에 선택 된 내용만 수정됩니다.</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="updateProductReply(), $bvModal.hide('reply-update-modal')"
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

        <div class="my-4">제품 변경 히스토리를 삭제하시겠습니까?</div>
        <div>체크박스에 선택 된 내용만 삭제됩니다.</div>
        <template #modal-footer>
          <div class="d-block text-center">
            <b-button
              variant="primary"
              class="frightBox"
              @click="deleteProductReply(), $bvModal.hide('reply-delete-modal')"
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
        <div v-if="modalName === 'updateProductReply'">
          <div v-if="updateState">
            <p>상품 정보가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 정보 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteProductReply'">
          <div v-if="deleteState">
            <p>상품 정보가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>상품 정보 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'updateProductReply'">
          <div v-if="updateState">
            <p>제품 변경 히스토리가 수정되었습니다.</p>
          </div>
          <div v-else>
            <p>제품 변경 히스토리 수정에 실패했습니다. 다시 시도해 주십시오.</p>
          </div>
        </div>
        <div v-if="modalName === 'deleteProductReply'">
          <div v-if="deleteState">
            <p>제품 변경 히스토리가 삭제되었습니다.</p>
          </div>
          <div v-else>
            <p>제품 변경 히스토리 삭제에 실패했습니다. 다시 시도해 주십시오.</p>
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
          v-if="modalName === 'insertProduct' && insertState"
        >
          <button @click="roturInit('productSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateProduct' && updateState"
        >
          <button @click="roturInit('productSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteProduct' && deleteState"
        >
          <button @click="roturInit('productSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'updateProductReply' && updateState"
        >
          <button @click="roturInit('productSel')">확인</button>
        </template>
        <template
          slot="footer"
          v-else-if="modalName === 'deleteProductReply' && deleteState"
        >
          <button @click="roturInit('productSel')">확인</button>
        </template>
        <template slot="footer" v-else>
          <button @click="modalText">확인</button>
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

export default {
  components: {
    confirmModal,
  },
  mixins: [modalMixin, spinnerMixin, imageMixin, adminChkMixin, fileMixin],
  props: ["propsdata"],
  data() {
    return {
      productId: "",
      skuNo: "",
      productName: "",
      brandName: "",
      maker: null,
      makeDate: "",
      className: "",
      storMethod:"",
      expDate: "0",
      productWeight: "",
      moisture:"0",
      rawMaterialName: "",
      packingUnit: "",
      productStandard: "",
      calorie: "0",
      sodium: "0",
      note: "",
      productChangeContent: "",
      productReply: [],
      selectReply: [],
      makerOptions:[
        { value: null, text: '제품 분류를 선택해주세요.' },
      ],
      makerOptions1:[],
      makerOptions2:[],
      makerOptions3:[],
      makerOptions4:[],
      makerOptions5:[],
      makerOptions6:[],
      makerOptions7:[],
      makerOptions8: [{ value: null, text: "제품 분류를 선택해주세요." }],
      classNameOptions: [
        { value: "사료", text: "1. 사료" },
        { value: "동물용 의료기기", text: "2. 동물용 의료기기" },
        { value: "동물용 의약외품", text: "3. 동물용 의약외품" },
        { value: "공산품", text: "4. 공산품" },
        { value: "생활화학제품", text: "5. 생활화학제품" },
        { value: "화장품", text: "6. 화장품" },
        { value: "기타", text: "7. 기타" },
      ],
      storMethodOption1:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 실온보관 후 개봉 시 냉장 보관", text: "2. 실온보관 후 개봉 시 냉장 보관" },
        { value: "3. 실온보관 후 개봉 시 즉시 섭취", text: "3. 실온보관 후 개봉 시 즉시 섭취" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption2:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 실온보관 후 개봉 시 냉장 보관", text: "2. 실온보관 후 개봉 시 냉장 보관" },
        { value: "3. 별도 보관 방법 없음", text: "3. 별도 보관 방법 없음" },
      ],
      storMethodOption3:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 직사광선을 피해서 실온보관", text: "2. 직사광선을 피해서 실온보관" },
        { value: "3. 실온보관 후 개봉 시 냉장 보관", text: "3. 실온보관 후 개봉 시 냉장 보관" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption4:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 어린이의 손이 닿지 않는 곳에 보관", text: "2. 어린이의 손이 닿지 않는 곳에 보관" },
        { value: "3. 화기에 주의해서 보관", text: "3. 화기에 주의해서 보관" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption5:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 직사광선을 피해서 실온보관", text: "2. 직사광선을 피해서 실온보관" },
        { value: "3. 실온보관 후 개봉 시 즉시 사용", text: "3. 실온보관 후 개봉 시 즉시 사용" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption6:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 직사광선을 피해서 실온보관", text: "2. 직사광선을 피해서 실온보관" },
        { value: "3. 실온보관 후 개봉 시 즉시 사용", text: "3. 실온보관 후 개봉 시 즉시 사용" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption7:[
        { value: "1. 실온보관", text: "1. 실온보관" },
        { value: "2. 직사광선을 피해서 실온보관", text: "2. 직사광선을 피해서 실온보관" },
        { value: "3. 실온보관 후 개봉 시 즉시 사용", text: "3. 실온보관 후 개봉 시 즉시 사용" },
        { value: "4. 별도 보관 방법 없음", text: "4. 별도 보관 방법 없음" },
      ],
      storMethodOption8: [{ value: "", text: "제품 분류를 선택해주세요." }],
      fields: [
        { key: "selected", thClass: "w2" },
        {
          key: "productChangeReply",
          label: "제품 변경 내용",
          sortable: true,
          thClass: "w50",
        },
        { key: "replyDate", label: "작성날짜", sortable: true, thClass: "w15" },
      ],
      fileFields: [
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
      confirmSkuNo: "",
      inputRead: true,
      skuNoDuplication: true,
      updateState: false,
      insertState: false,
      deleteState: false,
    };
  },
  mounted() {
    this.updateData();
    this.saveMakerList();
  },
  computed: {
    // skuNo 11자리 확인
    skuNoState() {
      return this.skuNo.length > 11 ? true : false;
    },
  },
  methods: {
    // sku-no 중복 확인
    searchProductDup() {
      this.openSpinner();

      console.log("ProductInputList 컴포넌트");
      console.log(this.propsdata);

      this.$store.commit("productStore/SET_CHECK_PRODUCT_RESULT", "3");

      this.$store
        .dispatch("productStore/CHECK_SKU_DUP", this.skuNo)
        .then((response) => {
          this.modalName = "checkSkuNo";

          if (response.data === 1) {
            console.log("response 값 1");
            this.skuNoDuplication = true;
            this.insertState = false;
            this.openModal();
            this.closeSpinner();
          } else if (response.data === 0) {
            console.log("response 값 0");
            this.skuNoDuplication = false;
            this.confirmSkuNo = this.skuNo;
            this.insertState = true;
            this.openModal();
            this.closeSpinner();
          }
          this.closeSpinner();

          console.log("중복확인 : " + this.skuNoDuplication);
          console.log("modalName : " + this.modalName);
        })
        .catch();
    },
    // 제품 수정일 경우 데이터 input에 입력
    updateData() {
      if (this.propsdata === "updateView") {
        console.log("setData if 실행 : " + this.propsdata);
        this.productId = this.$store.state.getProduct.id;
        this.skuNo = this.$store.state.getProduct.skuNo;
        this.productName = this.$store.state.getProduct.productName;
        this.brandName = this.$store.state.getProduct.brandName;
        this.maker = this.$store.state.getProduct.maker;
        this.makeDate = this.$store.state.getProduct.makeDate;
        this.className = this.$store.state.getProduct.className;
        this.storMethod = this.$store.state.getProduct.storMethod;
        this.moisture = this.$store.state.getProduct.moisture;
        this.expDate = this.$store.state.getProduct.expDate;
        this.productWeight = this.$store.state.getProduct.productWeight;
        this.rawMaterialName = this.$store.state.getProduct.rawMaterialName;
        this.packingUnit = this.$store.state.getProduct.packingUnit;
        this.productStandard = this.$store.state.getProduct.productStandard;
        this.calorie = this.$store.state.getProduct.calorie;
        this.sodium = this.$store.state.getProduct.sodium;
        this.note = this.$store.state.getProduct.note;
        this.productReply = this.$store.state.getProduct.productChangeReplies;
        this.inputRead = false;

        this.productReply.forEach((e) => {
          let tmpData = {
            id: e.id,
            productChangeReply: e.productChangeReply,
            replyDate: e.replyDate,
            selected: false,
            createDate: e.createDate,
          };
          this.selectReply.push(tmpData);
        });

        // file 데이터 있는지 확인
        if (this.$store.state.getProduct.productFile.length > 0) {
          var tmpImageFile = [];
          var tmpFileData = [];

          this.$store.state.getProduct.productFile.forEach((element) => {
            var tmp = element.filePath.split(".");

            if (tmp[1] === "png" || tmp[1] === "jpg") {
              tmpImageFile.push(element);
            } else {
              tmpFileData.push(element);
            }
          });
          console.log(this.fileData);
          this.imgUpdate(tmpImageFile, "file");
          this.updateFileData(tmpFileData);
        }

      } else {
        console.log("setData else 실행 : " + this.propsdata);
      }
    },
    // 제품 분류에 따른 제조사 정보 저장
    saveMakerList(){
      var makerList =  this.$store.getters["makerStore/getSelectMakerProduct"];
      makerList.forEach(element => {
        switch(element.className){
          case "사료":
            this.makerOptions1.push({"value" : element.makerName, "text" :element.makerName})
            break;
          case "동물용 의료기기":
            this.makerOptions2.push({"value" : element.makerName, "text" :element.makerName})
            break;
          case "동물용 의약외품":
            this.makerOptions3.push({"value" : element.makerName, "text" :element.makerName})
            break;
          case "공산품":
            this.makerOptions4.push({"value" : element.makerName, "text" :element.makerName})
            break;
          case "생활화학제품":
            this.makerOptions5.push({"value" : element.makerName, "text" :element.makerName})
            break;
          case "화장품":
            this.makerOptions6.push({"value" : element.makerName, "text" :element.makerName})
            break;
        }
        
      });
    },
    // 상품정보 변경
    selectReplyData(item) {
      console.log("체크 선택됨");
      console.log(this.selectReply);

      console.log(item);
      this.selectReply.forEach((element, index) => {
        if (element.id === item.id) {
          this.selectReply[index].selected = item.selected;
        }
      });
      console.log("체크 끝남");
      console.log(this.selectReply);
    },
    // 제품 분류 수정
    classNameChange(){
      console.log("제품분류 수정됨");
      if(this.className !== '사료'){
        this.calorie = "0";
        this.sodium  = "0";
        this.moisture = "0";
      }

      this.maker = null;
    },
    // 제품 추가
    insertProduct() {
      // 관리자가 아닐 경우 추가 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      }
      // 관리자일 경우 추가 가능
      else {
        // this.openSpinner();

        this.$store.commit("productStore/SET_INSERT_PRODUCT", "3");

        console.log("제품 추가 진행");

        this.imgFiles.forEach((element) => {
          // console.log(element);
          element.forEach((e) => {
            this.formData.append("file", e["file"]);
          });
        });

        // this.formData.append("fileData", this.fileData);
        this.fileData.forEach((element) => {
          this.formData.append("file", element["file"]);
        });

        let data = {
          skuNo: this.skuNo,
          productName: this.productName,
          brandName: this.brandName,
          maker: this.maker,
          makeDate: this.makeDate,
          className: this.className,
          storMethod : this.storMethod,
          moisture : this.moisture,
          expDate: this.expDate,
          productWeight: this.productWeight,
          rawMaterialName: this.rawMaterialName,
          packingUnit: this.packingUnit,
          productStandard: this.productStandard,
          calorie: this.calorie,
          sodium: this.sodium,
          note: this.note,
        };

        console.log(data);

        this.formData.append(
          "data",
          new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        this.formData.append(
          "productChangeContent",
          new Blob([JSON.stringify(this.productChangeContent)], {
            type: "application/json",
          })
        );

        for (var pair of this.formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
          console.log(pair[1]);
        }
        for (var key of this.formData.keys()) {
          console.log(`${key} : ${this.formData.get(key)}`);
        }

        this.$store
          .dispatch("productStore/INSERT_PRODUCT", this.formData)
          .then((response) => {
            this.modalName = "insertProduct";

            if (response.data === 1) {
              console.log("response 값 1");
              this.insertState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              console.log("response 값 0");
              this.insertState = false;
              this.openModal();
              this.closeSpinner();
            }
            console.log("insertState : " + this.insertState);

            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });

        this.formData = new FormData();
      }
    },
    // 제품 수정진행
    updateProduct() {
      
      this.openSpinner();

      console.log("제품 수정 진행");

      this.$store.commit("productStore/SET_UPDATE_PRODUCT", "3");

      console.log("productId : " + this.productId);

      this.imgFiles.forEach((element) => {
        // console.log(element);
        element.forEach((e) => {
          if (e["file"]) {
            console.log("신규 이미지 존재");
            this.formData.append("file", e["file"]);
          } else if (e["imgId"]) {
            console.log("기존 이미지 존재");
            this.formData.append("fileId", e["imgId"]);
          }
        });
      });

      this.fileData.forEach((element) => {
        console.log(element);
        if (element["file"]) {
          console.log("신규 파일 존재");
          this.formData.append("file", element["file"]);
        } else if (element["fileId"]) {
          console.log("기존 파일 존재");
          this.formData.append("fileId", element["fileId"]);
        }
      });

      let data = {
        id: this.productId,
        skuNo: this.skuNo,
        productName: this.productName,
        brandName: this.brandName,
        maker: this.maker,
        makeDate: this.makeDate,
        className: this.className,
        storMethod : this.storMethod,
        moisture : this.moisture,
        expDate: this.expDate,
        productWeight: this.productWeight,
        rawMaterialName: this.rawMaterialName,
        packingUnit: this.packingUnit,
        productStandard: this.productStandard,
        calorie: this.calorie,
        sodium: this.sodium,
        note: this.note,
      };

      console.log("this.productChangeContent");
      console.log(this.productChangeContent);

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
      this.formData.append(
        "productChangeContent",
        new Blob([JSON.stringify(this.productChangeContent)], {
          type: "application/json",
        })
      );

      this.$store
        .dispatch("productStore/UPDATE_PRODUCT", this.formData)
        .then((response) => {
          this.modalName = "updateProduct";

          if (response.data === 1) {
            console.log("response 값 1");
            this.updateState = true;
            this.openModal();
            this.closeSpinner();
          } else if (response.data === 0) {
            console.log("response 값 0");
            this.updateState = false;
            this.openModal();
            this.closeSpinner();
          }
          console.log("updateProduct : " + this.updateState);
          console.log("modalName : " + this.modalName);
        })
        .catch((error) => {
          console.log("error 발생");
          console.log(error);
        });
      
    },

    // 제품 삭제
    deleteProduct() {
      
      this.openSpinner();

      this.$store.commit("productStore/SET_DELETE_PRODUCT", "3");
      this.$store
        .dispatch("productStore/DELETE_PRODUCT", {
          id: this.productId,
          skuNo: this.skuNo,
        })
        .then((response) => {
          this.modalName = "deleteProduct";

          if (response.data === 1) {
            console.log("response 값 1");
            this.deleteState = true;
            this.openModal();
            this.closeSpinner();
          } else if (response.data === 0) {
            console.log("response 값 0");
            this.deleteState = false;
            this.openModal();
            this.closeSpinner();
          }

          console.log("updateProduct : " + this.deleteState);
          console.log("modalName : " + this.modalName);
        })
        .catch((error) => {
          console.log("error 발생");
          console.log(error);
        });
      
    },

    // 리플 수정진행
    updateProductReply() {
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

        console.log("리플 수정 진행");

        this.$store.commit("productStore/SET_UPDATE_PRODUCT_REPLY", "3");

        // console.log("productId : " + this.productId);

        var tmpReply = [];
        this.productReply.forEach((element) => {
          if (element.selected) {
            tmpReply.push({replyId : element.id, changeReplyData : element.productChangeReply});
          }
        });

        let data = {
          id: this.productId,
          replyDataList: tmpReply,
        };

        console.log("수정 진행 전 데이터 확인");
        console.log("productReply");
        console.log(this.productReply);
        console.log("data");
        console.log(data);

        this.$store
          .dispatch("productStore/UPDATE_PRODUCT_REPLY", data)
          .then((response) => {
            this.modalName = "updateProductReply";

            if (response.data === 1) {
              console.log("response 값 1");
              this.updateState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              console.log("response 값 0");
              this.updateState = false;
              this.openModal();
              this.closeSpinner();
            }
            console.log("updateProduct : " + this.updateState);
            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },

    // 제품 리플 삭제
    deleteProductReply() {
      console.log("제품 변경 리플 삭제 진행");

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
        this.productReply.forEach((element) => {
          if (element.selected) {
            tmpReply.push(element.id);
          }
        });

        let data = {
          productId: this.productId,
          productReplyId: tmpReply,
        };

        this.$store.commit("productStore/SET_DELETE_PRODUCT_REPLY", "3");
        this.$store
          .dispatch("productStore/DELETE_PRODUCT_REPLY", data)
          .then((response) => {
            this.modalName = "deleteProductReply";

            if (response.data === 1) {
              console.log("response 값 1");
              this.deleteState = true;
              this.openModal();
              this.closeSpinner();
            } else if (response.data === 0) {
              console.log("response 값 0");
              this.deleteState = false;
              this.openModal();
              this.closeSpinner();
            }

            console.log("updateProduct : " + this.deleteState);
            console.log("modalName : " + this.modalName);
          })
          .catch((error) => {
            console.log("error 발생");
            console.log(error);
          });
      }
    },

    // 업데이트 진행 시 수정모드인지 확인
    inpuReadMode() {
      // 관리자가 아닐 경우 삭제 불가능
      // adminChkMixin 사용
      this.adminChk();
      if (this.adminChkFlag) {
        this.modalName = "noAdmin";

        this.openModal();
      } else{
        this.inputRead = true;
      }
    },
    // 등록 완료 되었을 경우 초기화
    roturInit() {
      console.log("routerInit 접속. 새로고침 진행");
      this.$router.push("/productSel");
      // this.$router.go();
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
.replytable {
  text-align: center;
  /* overflow: auto; */
}
</style>