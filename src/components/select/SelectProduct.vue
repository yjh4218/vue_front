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
        <div class="col-md-10 mb-3">
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
        <div class="col-md-2 mb-3" v-if="this.$route.name !== 'inspectSelView'">
          <b-button 
            variant="primary"
            class="left-box"
            @click="searchData"
            >상품 조회</b-button
          >
        </div>
      </div>
      <div
        slot="bottom"
        v-if="this.$route.name === 'inspectSelView'"
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
          <b-button variant="primary" class="btn_margin" @click="prevWeek">1주일 전</b-button>
          <b-button variant="primary" class="btn_margin" @click="prevMonth">1개월 전</b-button>
          <b-button variant="primary" class="btn_margin" @click="prevThreeMonth">3개월 전</b-button>
        </div>
        <div class="col-md-2 mb-3">
          <b-button
            variant="primary"
            class="left-box"
            @click="searchData(); spinnerStart();"
            >상품 조회</b-button
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
import confirmModal from "../modal/ConfirmModal.vue"

dayjs.extend(isSameOrBefore);

export default {
  components: {
    selectSlot,
    confirmModal
  },
  data() {
    return {
      sku_no: "",
      productName: "",
      brandName: "",
      maker: "",
      beforeDate: "",
      afterDate: "",
      header: ["skuNo", "제품명", "브랜드명", "제조사", "출시일자"],
      selectParam: [],
      className: [],
      modal: false,
      modalName: "",
    };
  },
  
  methods: {
    // 데이터 조회
    searchData() {
      console.log("데이터 조회");
      
      this.spinnerStart();

      if(this.$route.name === 'selectAllProduct' || this.$route.name === 'inspectInView'){
         this.$store.dispatch("SELECT_PRODUCT", {
          name: this.$route.name,
          sku_no: this.sku_no,
          productName: this.productName,
          brandName: this.brandName,
          maker: this.maker,
          className: this.className,
        });
      } else{
        var bfdate = dayjs(this.beforeDate);
        var afdate = dayjs(this.afterDate);
        if(bfdate.isSameOrBefore(this.afterDate,"day")){
          console.log("날짜 확인됨");
          this.$store.dispatch("SELECT_INSPECT", {
          name: this.$route.name,
          sku_no: this.sku_no,
          productName: this.productName,
          brandName: this.brandName,
          maker: this.maker,
          className: this.className,
          beforeDate : this.beforeDate,
          afterDate : afdate.add(1,"day").format("YYYY-MM-DD")
        });
        }else{
          this.modalName = "noConfirmDate"
          this.modal = true;
        }
      }
      
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
      console.log("event emit 접속");
      this.$emit('spinnerStart')
    }
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
  width:auto;
}
.custom-control custom-control-inline custom-checkbox {
  margin-left: 10px;
}
.chkBox {
  margin-left: 15px;
}
</style>
