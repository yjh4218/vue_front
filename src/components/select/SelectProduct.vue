<!-- 상품 검색 구분 -->
<template>
  <div>
    <select-slot>
      <div slot="top" class="row">
        <div class="col-md-3 mb-3">
          <b-input-group prepend="SKU-NO">
            <b-form-input
              type="text"
              v-model="skuNo"
              placeholder="숫자만 써주세요."
              value=""
              maxlength="13"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              @keyup.enter="searchData()"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="제품명">
            <b-form-input
              type="text"
              v-model="productName"
              placeholder=""
              value=""
              @keyup.enter="searchData()"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="브랜드명">
            <b-form-input
              type="text"
              v-model="brandName"
              placeholder=""
              value=""
              @keyup.enter="searchData()"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="제조사">
            <b-form-input
              type="text"
              v-model="maker"
              placeholder=""
              value=""
              @keyup.enter="searchData()"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div slot="middle" class="row">
        <div class="col-md-6 mb-3">
          <b-input-group prepend="제품분류" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              class="chkBoxGroup"
              id="checkbox-group-1"
              v-model="className"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            >
              <b-form-checkbox class="chkBox" value="사료"
                >사료</b-form-checkbox>
              <b-form-checkbox class="chkBox" value="동물용 의료기기">
                동물용 의료기기
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="동물용 의약외품">
                동물용 의약외품
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="공산품"
                >공산품</b-form-checkbox>
              <b-form-checkbox class="chkBox" value="생활화학제품">
                생활화학제품
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="화장품"
                >화장품</b-form-checkbox>
              <b-form-checkbox class="chkBox" value="기타"
                >기타</b-form-checkbox>
            </b-form-checkbox-group>
          </b-input-group>
        </div>
        <div class="col-md-4 mb-3"
          v-if="
              this.$route.name === 'selectAllProduct' ||
              this.$route.name === 'inspectInView' ||
              this.$route.name === 'claimInView' ||
              this.$route.name === 'salesProductInView' ||
              this.$route.name === 'salesProductUp' ||
              this.$route.name === 'productInsert'
        ">
          <b-input-group prepend="운영여부" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              class="chkBoxGroup"
              id="checkbox-group-1"
              v-model="operation"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            >
            <b-form-checkbox class="chkBox" value="출시예정"
                >출시예정</b-form-checkbox>
              <b-form-checkbox class="chkBox" value="상품 운영 중">
                상품 운영 중
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="판매중단(단종)">
                판매중단(단종)
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-input-group>
        </div>
        <div
          class="col-md-2 mb-3"
          v-if="
            this.$route.name === 'selectAllProduct' ||
            this.$route.name === 'inspectInView' ||
            this.$route.name === 'claimInView' ||
            this.$route.name === 'salesProductInView' ||
            this.$route.name === 'salesProductUp' ||
            this.$route.name === 'productInsert'
          "
        >
          <b-button variant="primary" class="left-box" @click="searchData()"
            >상품 조회</b-button
          >
        </div>
      </div>
      <div
        slot="bottom"
        v-if="
          this.$route.name === 'inspectSelView' ||
          this.$route.name === 'claimSelView'
        "
        class="row"
      >
        <div class="col-md-6 mb-3">
          <b-input-group prepend="날짜">
            <b-form-datepicker
              id="datepicker-dateformat1"
              v-model="beforeDate"
            ></b-form-datepicker>
            <b-form-datepicker
              id="datepicker-dateformat2"
              v-model="afterDate"
            ></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-4 mb-3">
          <b-button variant="primary" class="btn_margin" @click="prevWeek"
            >1주일 전</b-button
          >
          <b-button variant="primary" class="btn_margin" @click="prevMonth"
            >1개월 전</b-button
          >
          <b-button variant="primary" class="btn_margin" @click="prevThreeMonth"
            >3개월 전</b-button
          >
        </div>
        <div class="col-md-2 mb-3" v-if="this.$route.name === 'inspectSelView'">
          <b-button variant="primary" class="left-box" @click="searchData()"
            >검수 조회</b-button
          >
        </div>
        <div class="col-md-2 mb-3" v-else>
          <b-button
            variant="primary"
            class="left-box"
            @click="
              spinnerStart();
              searchData();
            "
            >클레임 조회</b-button
          >
        </div>
      </div>
    </select-slot>
    <confirm-modal @close="closeModal" v-if="modal">
      <div v-if="modalName === 'noConfirmDate'">
        <p>날짜가 형식에 맞지 않습니다. 뒤의 날짜가 앞의 날짜보다 빠릅니다.</p>
      </div>
      <template slot="footer" v-else>
        <button @click="modalText">확인</button>
      </template>
    </confirm-modal>
  </div>
</template>

<script>
import selectSlot from "../select/SelectProductSlot.vue";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import confirmModal from "../modal/ConfirmModal.vue";
import { dateSearchMixin } from "../../mixins/dateSearchMixin";

dayjs.extend(isSameOrBefore);

export default {
  components: {
    selectSlot,
    confirmModal,
  },
  mixins: [dateSearchMixin],
  data() {
    return {
      skuNo: "",
      productName: "",
      brandName: "",
      maker: "",
      header: ["skuNo", "제품명", "브랜드명", "제조사", "출시일자"],
      selectParam: [],
      className: [],
      operation:[],
      modal: false,
      modalName: "",
    };
  },

  methods: {
    // 데이터 조회
    searchData() {
      // console.log(this.$route.name);
      this.spinnerStart();
      if (
        this.$route.name === "selectAllProduct" ||
        this.$route.name === "inspectInView" ||
        this.$route.name === "claimInView" ||
        this.$route.name === "salesProductInView" ||
        this.$route.name === "salesProductUp" ||
        this.$route.name === "productInsert" || 
        this.$route.name === "inspectUpView"
      ) {
        // 검색 데이터 저장
        let data = {
          page: 0,
          name: this.$route.name,
          skuNo: this.skuNo,
          productName: this.productName,
          brandName: this.brandName,
          maker: this.maker,
          className: this.className,
          operation: this.operation
        };
        // console.log(data);
        // 검색 데이터 저장
        this.$store.commit("productStore/SET_SEARCH_DATA", data);

        this.$store.dispatch("productStore/SELECT_PRODUCT", data);
      } else {
        var bfdate = dayjs(this.beforeDate);
        var afdate = dayjs(this.afterDate);

        if (bfdate.isSameOrBefore(this.afterDate, "day")) {
          let data = {
            page: 0,
            name: this.$route.name,
            skuNo: this.skuNo,
            productName: this.productName,
            brandName: this.brandName,
            maker: this.maker,
            className: this.className,
            beforeDate: this.beforeDate,
            afterDate: afdate.add(1, "day").format("YYYY-MM-DD"),
          };

          if (this.$route.name === "inspectSelView") {
            // 검색 데이터 저장
            this.$store.commit("inspectStore/SET_SEARCH_DATA", data);
            this.$store.dispatch("inspectStore/SELECT_INSPECT", data);
          } else {
            this.$store.dispatch("claimStore/SELECT_CLAIM", data);
          }
        } else {
          this.modalName = "noConfirmDate";
          this.modal = true;
        }
      }
    },
    // 모달 열기
    openModal() {
      this.modal = true;
    },
    // 모달 닫기
    closeModal() {
      this.modal = false;
    },
    // 상위 컴포넌트에 스피너 열기
    spinnerStart() {
      this.$emit("spinnerStart");
    },
  },
  mounted() {
    // 처음 실행 시 날짜 지정
    this.prevWeek();
    // 처음에 전체 검수 조회 함
    this.searchData();
  },
};
</script>

<style scoped>
.btn_margin {
  margin-right: 5px;
}
.left-box {
  float: right;
  width: auto;
}
.custom-control custom-control-inline custom-checkbox {
  margin-left: 10px;
}
.chkBox {
  margin-left: 15px;
}
</style>
