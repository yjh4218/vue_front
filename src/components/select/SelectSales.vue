<!-- 상품 검색 구분 -->
<template>
  <div>
    <select-slot>
      <div slot="top" class="row">
        <div class="col-md-2 mb-3">
          <b-input-group prepend="SKU-NO">
            <b-form-input
              type="text"
              v-model="skuNo"
              placeholder=""
              value=""
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
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="날짜">
            <b-form-datepicker
              id="datepicker-dateformat1"
              v-model="findDate"
            ></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-4 mb-3">
          <b-button
            variant="primary"
            class="rightBox"
            @click="
              allSalesSerach();
              spinnerStart();
            "
            >판매상품 조회</b-button
          >
          <b-button
            variant="primary"
            class="rightBox"
            @click="
              comSalesSerach();
              spinnerStart();
            "
            >구성품 조회</b-button
          >
        </div>
      </div>
      <div slot="bottom" class="row"></div>
    </select-slot>
  </div>
</template>

<script>
import selectSlot from "./SelectProductSlot.vue";
import { modalMixin } from "../../mixins/modalMixin.js";
import dayjs from "dayjs";

export default {
  components: {
    selectSlot,
  },
  mixins: [modalMixin],
  data() {
    return {
      skuNo: "",
      productName: "",
      comFlag: true,
      findDate: "",
    };
  },
  created() {},
  methods: {
    comSalesSerach() {
      this.comFlag = true;
      this.searchData();
    },
    allSalesSerach() {
      this.comFlag = false;
      this.searchData();
    },
    // 데이터 조회
    searchData() {
      this.spinnerStart();
      var bfdate = dayjs(this.findDate);

      this.$store.dispatch("salesStore/SELECT_SALES", {
        skuNo: this.skuNo,
        productName: this.productName,
        findDate: bfdate.format("YYYY-MM-DD"),
        comFlag: this.comFlag,
      });
    },

    // 상위 컴포넌트에 스피너 열기
    spinnerStart() {
      this.$emit("spinnerStart");
    },

    // 오늘 날짜 확인
    chkToday() {
      var thisday = new Date();

      // 연도, 월, 일 추출
      var year = thisday.getFullYear();
      var month = ("0" + (thisday.getMonth() + 1)).slice(-2);
      var day = ("0" + thisday.getDate()).slice(-2);

      // 최종 포맷 (ex - '2021-10-08')
      this.findDate = year + "-" + month + "-" + day;
    },
  },
  mounted() {
    // 처음 실행 시 날짜 지정
    this.chkToday();
    // 처음에 전체 검수 조회 함
    this.searchData();
  },
};
</script>

<style scoped>
.btn_margin {
  margin-right: 5px;
}
.rightBox {
  float: right;
  margin-left: 10px;
}
.custom-control custom-control-inline custom-checkbox {
  margin-left: 10px;
}
.chkBox {
  margin-left: 15px;
}
</style>