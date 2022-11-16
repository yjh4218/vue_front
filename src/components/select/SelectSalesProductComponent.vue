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
          <b-input-group prepend="구성품 SKU-NO">
            <b-form-input
              type="text"
              v-model="comSkuNo"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-md-3 mb-3">
          <b-input-group prepend="구성품 제품명">
            <b-form-input
              type="text"
              v-model="comProductName"
              placeholder=""
              value=""
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div slot="middle" class="row">
        <div class="col-md-12 mb-3" v-if="this.$route.name !== 'inspectSelView'">
          <b-button 
            variant="primary"
            class="left-box"
            @click="spinnerStart(); searchData();"
            >판매제품 조회</b-button
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
      skuNo: "",
      productName: "",
      comSkuNo: "",
      comProductName: "",
      selectParam: [],
    };
  },
  created() {
    
  },
  methods: {
    // 데이터 조회
    searchData() {
      this.$store.dispatch("salesStore/SELECT_PRODUCT_COMPONENT", {
        skuNo: this.skuNo,
        productName: this.productName,
        comSkuNo: this.comSkuNo,
        comProductName: this.comProductName,
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
