<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">제조사 조회</div>
      <select-maker :propsdata="message" @spinnerStart="openSpinner"></select-maker>
      <div>
        <b-table
          striped
          hover
          :items="getSelectMaker"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="inspectDetails"
        ></b-table>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectMaker from '../../components/select/SelectMaker.vue'

export default {
  
  components:{
    SelectMaker 
  },
  data() {
    return {
      message: "testSelView",
      getSelectMaker:[],
      fields: [        
        { key: "makerName", label: "제조사", sortable: true, thClass: "w15" },
        { key: "businessType", label: "업종", sortable: true, thClass: "w15" },
        { key: "importProduct", label: "주요제품", sortable: true, thClass: "w30" },
        { key: "process", label: "주요공정", sortable: true, thClass: "w30" },
        { key: "sales", label: "매출액", sortable: true, thClass: "w15" },
        { key: "makerPerson", label: "거래처 담당자", sortable: true, thClass: "w15" },
        { key: "makerPhone", label: "거래처 연락처", sortable: true, thClass: "w15" },
      ],
      spinnerState:false
    };
  },
  created() {
  },
  mounted(){
    this.openSpinner();
  },
  computed:{
    SelectMaker(){
      return this.$store.getters.getSelectMaker;
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectMaker(val){
      this.getSelectMaker = val;
      this.closeSpinner();
    },
  },
  methods:{
    // 더블 클릭 이벤트
    inspectDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);
      
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_MAKER", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_MAKER", item);
      this.$router.push(`/makerUp/${item.id}`);
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
  }
  

};
</script>

<style></style>
