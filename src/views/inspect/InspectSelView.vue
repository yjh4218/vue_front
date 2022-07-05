<template>
  <div class="body">
    <div class="title">입고검수 조회</div>
    <select-product :propsdata="message"></select-product>
    <div>
      <!-- <table>
        <tr>
          <th>날짜</th>
          <th>SKU-NO</th>
          <th>제품명</th>
          <th>검수결과</th>
          <th>검수내용</th>
          <th>비고</th>
          <th>asdas</th>
        </tr>
        <tr v-for="item in items" :key="item.title">
          <td><span v-html="item.date"></span></td>
          <td><span v-html="item.skuno"></span></td>
          <td><span v-html="item.productName"></span></td>
          <td><span v-html="item.incomeCheck"></span></td>
          <td><span v-html="item.incomeContent"></span></td>
          <td><span v-html="item.note"></span></td>
        </tr>
      </table> -->
      <b-table
        striped
        hover
        :items="getAllInspect"
        :fields="fields"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        @row-dblclicked="inspectDetails"
      ></b-table>
      
    </div>
  </div>
</template>

<script>
import SelectProduct from '../../components/select/SelectProduct.vue'
import { mapGetters } from "vuex";

export default {
  
  components:{
    SelectProduct 
  },
  data() {
    return {
      message: "testSelView",
      allInspect:[],
      fields: [        
        { key: "inspectDate", label: "검수날짜", sortable: true, thClass: "w15" },
        { key: "product.skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "product.productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "product.className", label: "제품분류", sortable: true, thClass: "w30" },
        { key: "decideResult", label: "검수결과", sortable: true, thClass: "w15" },
        { key: "inspectContent", label: "검수내용", sortable: true, thClass: "w15" },
        { key: "lotDate", label: "유통기한(LOT)", sortable: true, thClass: "w15" },
        { key: "moisture", label: "수분율(%)", sortable: true, thClass: "w15" },
      ],
    };
  },
  created() {
  },
  computed:{
    ...mapGetters(["getAllInspect"]),
    // 제품 조회 및 결과값 입력
  },
  methods:{
    // 더블 클릭 이벤트
    inspectDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);
      
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_INSPECT", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_INSPECT", item);
      this.$router.push(`/inspectUp/${item.id}`);
    },
  }
  

};
</script>

<style></style>
