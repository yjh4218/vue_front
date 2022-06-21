<!-- 상품 검색 구분 -->
<template>
  <div>
    <select-slot>
      <div slot="top" class="row">
        <div class="col-md-3 mb-3">
          <b-input-group prepend="SKU-NO">
            <b-form-input
              type="text"
              v-model="sku_no"
              placeholder=""
              value=""
              maxlength="12"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            ></b-form-input>
            <!-- <b-input-group-prepend>
                            <b-button variant="primary" @click="searchData">검색</b-button>
                        </b-input-group-prepend> -->
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
            <!-- <b-input-group-prepend>
                            <b-button variant="primary" @click="openModal">검색</b-button>
                        </b-input-group-prepend> -->
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="브랜드명">
            <b-form-input
              type="text"
              v-model="brandName"
              placeholder=""
              value=""
            ></b-form-input>
            <!-- <b-input-group-prepend>
                            <b-button variant="primary" @click="openModal">검색</b-button>
                        </b-input-group-prepend> -->
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="제조사">
            <b-form-input
              type="text"
              v-model="maker"
              placeholder=""
              value=""
            ></b-form-input>
            <!-- <b-input-group-prepend>
                            <b-button variant="primary" @click="openModal">검색</b-button>
                        </b-input-group-prepend> -->
          </b-input-group>
        </div>
      </div>
      <div slot="middle" class="row">
        <div class="col-md-12 mb-3">
          <b-input-group prepend="제품분류" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              class="chkBoxGroup"
              id="checkbox-group-1"
              v-model="className"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            >
              <b-form-checkbox class="chkBox" value="간식"
                >간식</b-form-checkbox
              >
              <b-form-checkbox class="chkBox" value="사료"
                >사료</b-form-checkbox
              >
              <b-form-checkbox class="chkBox" value="동물용 의료기기">
                동물용 의료기기
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="동물용 의약외품">
                동물용 의약외품
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="의류"
                >의류</b-form-checkbox
              >
              <b-form-checkbox class="chkBox" value="장난감"
                >장난감</b-form-checkbox
              >
              <b-form-checkbox class="chkBox" value="생활화학제품">
                생활화학제품
              </b-form-checkbox>
              <b-form-checkbox class="chkBox" value="화장품"
                >화장품</b-form-checkbox
              >
              <b-form-checkbox class="chkBox" value="기타"
                >기타</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-input-group>
        </div>
      </div>
      <div
        slot="bottom"
        v-if="this.$route.name !== 'selectAllProduct' && this.$route.name !== 'inspectInView'"
        class="row"
      >
        <div class="col-md-6 mb-3">
          <b-input-group prepend="날짜">
             <b-form-datepicker
              id="datepicker-dateformat1"
              v-model="beforeDate"
              :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
              locale="en"
            ></b-form-datepicker>
            <b-form-datepicker
              id="datepicker-dateformat2"
              v-model="afterDate"
              :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
              locale="en"
            ></b-form-datepicker>
          </b-input-group>
        </div>
        <div class="col-md-4 mb-3">
          <b-button variant="primary" class="btn_margin" @click="prevWeek">1주일 전</b-button>
          <b-button variant="primary" class="btn_margin" @click="prevMonth">1개월 전</b-button>
          <b-button variant="primary" class="btn_margin" @click="prevThreeMonth">3개월 전</b-button>
        </div>
      </div>
      <div slot="search" class="row">
        <b-button
          variant="primary"
          class="left-box"
          @click="searchData"
          v-bind:disabled="
            sku_no == '' &&
            productName == '' &&
            brandName == '' &&
            maker == '' &&
            beforeDate == '' &&
            afterDate == '' &&
            className == ''
          "
          >상품 조회</b-button
        >
      </div>
    </select-slot>

    <!-- 검색창(모달) -->
  </div>
</template>

<script>
import selectSlot from "../select/SelectProductSlot.vue";

export default {
  components: {
    selectSlot,
  },
  data() {
    return {
      sku_no: "",
      productName: "",
      brandName: "",
      maker: "",
      beforeDate: "",
      afterDate: "",
      modal: false,
      header: ["skuNo", "제품명", "브랜드명", "제조사", "출시일자"],
      selectParam: [],
      className: [],
      year : "",
      month: "",
      day : "",
    };
  },
  methods: {
    // 데이터 조회
    searchData() {
      console.log("데이터 조회");
      console.log("this.propsdata : " + this.propsdata );
      console.log("this.$route.name : " + this.$route.name);
      console.log(this.productName);
      this.$store.dispatch("SELECT_PRODUCT", {
        name: this.$route.name,
        sku_no: this.sku_no,
        productName: this.productName,
        brandName: this.brandName,
        maker: this.maker,
        className: this.className,
      });
      
    },
    // 오늘 날짜 확인
    setDate(searchDate){
      var thisday = new Date(searchDate);

      // 연도, 월, 일 추출
      var year = thisday.getFullYear();
      var month = ('0' + (thisday.getMonth() + 1)).slice(-2);
      var day = ('0' + thisday.getDate()).slice(-2);

      // 최종 포맷 (ex - '2021-10-08')
      return year + '-' + month + '-' + day; 
      
    },
    // 일주일 전 날짜 구하기
    prevWeek(){
      var d = new Date();
      this.afterDate = this.setDate(d);
      console.log("d : " + d);

      var dayOfMonth = d.getDate();
      d.setDate(dayOfMonth - 7);
      this.beforeDate = this.setDate(d);
    },
    // 한달 전 날짜 구하기
    prevMonth(){
      var d = new Date();
      this.afterDate = this.setDate(d);
      

      var monthOfYear = d.getMonth();
      d.setMonth(monthOfYear - 1);
      this.beforeDate = this.setDate(d);
    },
    // 3개월 전 날짜 구하기
    prevThreeMonth(){
      var d = new Date();
      this.afterDate = this.setDate(d);

      var monthOfYear = d.getMonth();
      d.setMonth(monthOfYear - 3);
      this.beforeDate = this.setDate(d);
    }
  },
  created(){
  }
};
</script>

<style scoped>
.btn_margin {
  margin-right: 5px;
}
.left-box {
  float: right;
}
.custom-control custom-control-inline custom-checkbox {
  margin-left: 10px;
}
.chkBox {
  margin-left: 15px;
}
</style>
