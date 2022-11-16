<template>
  <div class="body">
    <b-overlay :show="spinnerState" rounded="sm">
      <div class="title">판매제품 조회</div>
      <select-sales-product-component
        :propsdata="message"
        @spinnerStart="openSpinner"
      ></select-sales-product-component>
      <div class="row">
        <div class="col-md-12">
          <b-button variant="primary" class="right-box" v-on:click="download"
            >엑셀다운</b-button
          >
        </div>
      </div>
      <div>
        <b-table
          sticky-header="72vh"
          responsive
          striped
          hover
          :items="getSelectProductComponent"
          :fields="fields"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          @row-dblclicked="inspectDetails"
        >
          <template #cell(skuNo)="{ item }">
            <b-tr>
              <b-td :rowspan="item.skuNo"> </b-td>
            </b-tr>
            <div>{{ item.skuNo }}</div>
          </template>
        </b-table>
        <!-- <b-table-simple>
            <b-tr>
              <b-th v-for="item in fields" :key="item.key">
                {{item.label}}
              </b-th>
            </b-tr>
            <template v-for="dataType in typeSet">
                <b-tr v-for="(listItem, index2) in processedList.get(dataType)" :key="index2">
                  <b-td :rowspan="processedList.get(dataType).length" v-if="index2===0">{{dataType}}</b-td>
                  <b-td >
                    {{listItem.productName}}
                  </b-td>
                  <b-td> {{listItem.componentSkuNo}} </b-td>
                  <b-td> {{listItem.componentProductName}} </b-td>
                  <b-td> {{listItem.componentQuantity}} </b-td>
              </b-tr>
            </template>
        </b-table-simple> -->
      </div>
    </b-overlay>
  </div>
</template>

<script>
import SelectSalesProductComponent from "../../components/select/SelectSalesProductComponent.vue";
import * as XLSX from "xlsx";
import { spinnerMixin } from "../../mixins/spinnerMixin.js";

// import { mapGetters } from 'vuex'

export default {
  components: {
    SelectSalesProductComponent,
  },
  mixins: [spinnerMixin],
  data() {
    return {
      message: "testSelView",
      getSelectProductComponent: [],
      fields: [
        { key: "skuNo", label: "sku-no", sortable: true, thClass: "w10" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w20" },
        {
          key: "componentSkuNo",
          label: "구성품 sku-no",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "componentProductName",
          label: "구성품 제품명",
          sortable: true,
          thClass: "w20",
        },
        {
          key: "componentQuantity",
          label: "구성품 수량",
          sortable: true,
          thClass: "w10",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.openSpinner();
  },
  computed: {
    // ...mapGetters('makerStore', [
    //   'getSelectProductComponent'
    // ]),
    SelectMaker() {
      return this.$store.getters["salesStore/getSelectProductComponent"];
    },
  },
  watch: {
    // 검수 조회 및 결과값 입력
    SelectMaker(val) {
      console.log("SelectMaker");
      console.log(val);
      this.getSelectProductComponent = val;
      this.closeSpinner();
    },
  },
  methods: {
    //엑셀 다운로드
    download() {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(
        this.getSelectProductComponent
      );
      XLSX.utils.book_append_sheet(workBook, workSheet, "판매구성품 목록");
      XLSX.writeFile(workBook, "판매구성품 목록.xlsx");
    },
    // 더블 클릭 이벤트
    inspectDetails(item, index) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);

      console.log(index);

      var temp = [];
      var size = item.productLength;
      var startPos = item.componentNumber - 1;
      var i = index - startPos;

      console.log("size : " + size);
      console.log("startPos : " + startPos);
      console.log("i : " + i);

      for (var cnt = 0; cnt < size; cnt++) {
        temp.push(this.getSelectProductComponent[i]);
        i++;
      }

      console.log("구성품 목록");
      console.log(temp);
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_SALES_PRODUCT", "");

      // 전체 제품 조회 화면일 경우 제품 상세정보 페이지로 이동
      this.$store.commit("SET_SALES_PRODUCT", temp);
      this.$router.push(`/salesProductUp/${item.componentStart}`);
    },
  },
};
</script>

<style scoped>
.right-box {
  float: right;
  width: auto;
}

.customTable > tbody > tr > td:nth-child(2) {
  padding: 0;
}

.customTable > tbody > tr > td:nth-child(2) > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
}

.customTable > tbody > tr > td:nth-child(2) > div:nth-child(1) {
  border-bottom: 1px solid #dee2e6;
}
</style>