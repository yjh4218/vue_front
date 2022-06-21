<template>
  <div>
    <div class="title">상품 조회</div>
    <select-product :propsdata="message"></select-product>
    <div class="tableCss">
      <!-- <b-table striped hover :product="products"></b-table> -->
      <!-- <table>
        <thead>
          <th v-for="item in header" v-bind:key="item.skuNo">
            {{ item }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="item in getSelectProduct"
            v-bind:key="item.skuNo"
            @dblclick="productDetails"
          >
            <td>{{ item.skuNo }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.brandName }}</td>
            <td>{{ item.className }}</td>
            <td>{{ item.expDate }}</td>
            <td>{{ item.maker }}</td>
            <td>{{ item.makeDate }}</td>
          </tr>
        </tbody>
      </table> -->
      <b-table
        striped
        hover
        :items="getAllProduct"
        :fields="fields"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        @row-dblclicked="productDetails"
      ></b-table>
    </div>
  </div>
</template>

<script>
import SelectProduct from "../../components/select/SelectProduct.vue";
import { mapGetters } from "vuex";

export default {
  
  components: {
    SelectProduct,
  },
  data() {
    return {
      message: "productSelView",
      fields: [
        { key: "skuNo", label: "skuNo", sortable: true, thClass: "w15" },
        { key: "productName", label: "제품명", sortable: true, thClass: "w30" },
        { key: "brandName", label: "브랜드명", sortable: true, thClass: "w15" },
        { key: "className", label: "분류", sortable: true, thClass: "w15" },
        { key: "expDate", label: "유통기한", sortable: true, thClass: "w15" },
        { key: "maker", label: "제조사", sortable: true, thClass: "w15" },
        { key: "makeDate", label: "출시일자", sortable: true, thClass: "w15" },
      ],
    };
  },
  created() {
    // 처음에 전 상품 조회 함
    this.$store.dispatch("SELECT_ALL_PRODUCT", this.$route.name);
  },
  methods: {
    // 더블 클릭 이벤트
    productDetails(item) {
      console.log("this.$route.name : " + this.$route.name);
      console.log("row 더블클릭됨");
      console.log(item);
      
      console.log("this.$route.name : " + this.$route.name);
      this.$store.commit("SET_PRODUCT", "");

      if(this.$route.name === "selectAllProduct"){
        this.$store.commit("SET_PRODUCT", item);
        this.$router.push(`/productUp/${item.skuNo}`);
      } else if(this.$route.name === "inspectInView"){
        var tempData = {
          skuNo : item.skuNo,
          productName : item.productName
        }
        console.log("tempData : " + tempData);
        this.$store.commit("SET_PRODUCT", tempData);
        this.$emit('selectProductCheck');
      }
    },
  },
  computed: {
    // 조회된 데이터 vuex를 통해 저장함.
    ...mapGetters(["getAllProduct"]),
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
