<!-- 상품 검색 구분 -->
<template>
  <div>
    <select-slot>
      <div slot="top" class="row">
        <div class="col-md-3 mb-3">
          <b-input-group prepend="제조사">
            <b-form-input
              type="text"
              v-model="makerName"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="주소">
            <b-form-input
              type="text"
              v-model="makerAddress"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="거래처 담당자">
            <b-form-input
              type="text"
              v-model="makerPerson"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
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
      </div>
      <div slot="middle" class="row">
        <div class="col-md-10 mb-3">
          <b-input-group prepend="업종" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              class="chkBoxGroup"
              id="checkbox-group-1"
              v-model="className"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
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
              <b-form-checkbox class="chkBox" value="공산품"
                >공산품</b-form-checkbox
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
            @click="spinnerStart(); searchData();"
            >제조사 조회</b-button
          >
        </div>
      </div>
    </select-slot>
  </div>
</template>

<script>
import selectSlot from "./SelectProductSlot.vue";

export default {
  components: {
    selectSlot
  },
  data() {
    return {
      makerId: "",
      makerName: "",
      makerAddress: "",
      makerPerson: "",
      makerPhone: "",
      selectParam: [],
      className: [],
    };
  },
  created() {
    
  },
  methods: {
    // 데이터 조회
    searchData() {
      this.$store.dispatch("makerStore/SELECT_MAKER", {
        makerName: this.maker,
        makerAddress: this.makerAddress,
        makerPerson: this.makerPerson,
        makerPhone: this.makerPhone,
        className: this.className,
      });
    },
    // 상위 컴포넌트에 스피너 열기
    spinnerStart() {
      this.$emit('spinnerStart')
    }
  },
  mounted() {
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
