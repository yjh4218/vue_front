<template>
  <div >
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">상품 조회</div>
      <select-product :propsdata="message" @spinnerStart="openSpinner"></select-product>
      <div class="tableCss">
        <b-table
          striped
          hover
          :items="getSelectProduct"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="productDetails"
        ></b-table>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectProduct from "../../components/select/SelectProduct.vue";

export default {
  
  components: {
    SelectProduct,
  },
  data() {
    return {
      message: "productSelView",
      getSelectProduct :[],
      fields: [
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "brandName", label: "브랜드명", sortable: true, thClass: "w15" },
        { key: "className", label: "분류", sortable: true, thClass: "w15" },
        { key: "expDate", label: "유통기한", sortable: true, thClass: "w15" },
        { key: "maker", label: "제조사", sortable: true, thClass: "w15" },
        { key: "makeDate", label: "출시일자", sortable: true, thClass: "w15" },
      ],
      spinnerState:false,
    };
  },
  created() {
    // 처음에 전 상품 조회 함
    this.$store.dispatch("SELECT_PRODUCT", this.$route.name);
  },
  methods: {
    // 더블 클릭 이벤트
    productDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);
      
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_PRODUCT", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      if(this.$route.name === "selectAllProduct"){
        this.$store.commit("SET_PRODUCT", item);
        this.$router.push(`/productUp/${item.skuNo}`);
      } 
      // 신규 검수 등록 화면에서 데이터 입력일 경우
      else if(this.$route.name === "inspectInView"){
        var tempData = {
          productId : item.id,
          skuNo : item.skuNo,
          productName : item.productName
        }
        console.log("tempData : " + tempData);
        this.$store.commit("SET_PRODUCT", tempData);
        this.$emit('selectProductCheck');
      }
    },
    // 스피너 열기
    openSpinner(){
      console.log("openSpinner 열림");
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner(){
      console.log("closeSpinner 닫기 ");
      this.spinnerState = false;
    },
  },
  computed: {
    // 조회된 데이터 vuex를 통해 저장함.
    // ...mapGetters(["getSelectProduct"]),
    SelectProduct(){
      return this.$store.getters.getSelectProduct;
    },
  },
  mounted(){
    this.openSpinner();
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectProduct(val){
      this.getSelectProduct = val;
      this.closeSpinner();
    },
  },
};
</script>

<style scoped>
table.b-table thead th.w10 {
  width: 10%;
}
table.b-table thead th.w20 {
  width: 20%;
}
table.b-table thead th.w30 {
  width: 30%;
}
table.b-table thead th.w40 {
  width: 40%;
}
table.b-table thead th.w50 {
  width: 50%;
}
table.b-table thead th.w60 {
  width: 60%;
}
table.b-table thead th.w70 {
  width: 70%;
}
table.b-table thead th.w80 {
  width: 80%;
}
table.b-table thead th.w90 {
  width: 90%;
}
table.b-table thead th.w15 {
  width: 15%;
}
table.b-table thead th.w25 {
  width: 25%;
}
table.b-table thead th.w35 {
  width: 35%;
}
table.b-table thead th.w45 {
  width: 45%;
}
table.b-table thead th.w55 {
  width: 55%;
}
table.b-table thead th.w65 {
  width: 65%;
}
table.b-table thead th.w75 {
  width: 75%;
}
table.b-table thead th.w85 {
  width: 85%;
}
table.b-table thead th.w95 {
  width: 95%;
}
</style>
