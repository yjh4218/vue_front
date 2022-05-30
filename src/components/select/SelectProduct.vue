<template>
    <div>
        <div class="row">
            <div class="col-md-3 mb-3">
                <b-input-group prepend="SKU-NO">
                    <b-form-input type="number" v-model="sku_no" placeholder="" value=""></b-form-input>
                    <!-- <b-input-group-prepend>
                        <b-button variant="primary" @click="searchData">검색</b-button>
                    </b-input-group-prepend> -->
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="제품명">
                    <b-form-input type="text" v-model="productName" placeholder="" value=""></b-form-input>
                    <!-- <b-input-group-prepend>
                        <b-button variant="primary" @click="openModal">검색</b-button>
                    </b-input-group-prepend> -->
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="브랜드명">
                    <b-form-input type="text" v-model="brandName" placeholder="" value=""></b-form-input>
                    <!-- <b-input-group-prepend>
                        <b-button variant="primary" @click="openModal">검색</b-button>
                    </b-input-group-prepend> -->
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="제조사">
                    <b-form-input type="text" v-model="maker" placeholder="" value=""></b-form-input>
                    <!-- <b-input-group-prepend>
                        <b-button variant="primary" @click="openModal">검색</b-button>
                    </b-input-group-prepend> -->
                </b-input-group>
            </div>
        </div>
         <div class="row">
            <div class="col-md-6 mb-3">
                <b-input-group prepend="날짜">
                    <b-form-input type="date" v-model="beforeDate" placeholder="" value=""></b-form-input>
                    <b-form-input type="date" v-model="afterDate" placeholder="" value=""></b-form-input>
                    <!-- <b-input-group-prepend>
                        <b-button variant="primary" @click="openModal">검색</b-button>
                    </b-input-group-prepend> -->
                </b-input-group>
            </div>
            <div class="col-md-4 mb-3" >
                <b-button variant="primary" class="btn_margin" >1주일 전</b-button>
                <b-button variant="primary" class="btn_margin" >1개월 전</b-button>
                <b-button variant="primary" class="btn_margin" >3개월 전</b-button>
            </div>
            <div class="col-md-2 mb-3 ">
                <b-button variant="primary" class="left-box" @click="searchData" v-bind:disabled="sku_no=='' && productName=='' && brandName=='' && maker=='' && beforeDate=='' && afterDate==''">상품 조회</b-button>
            </div>
         </div>

         <!-- 검색창(모달) -->
         <select-modal @close="closeModal" v-if="modal">
            <!-- default 슬롯 콘텐츠 -->
            <p>제품 검색</p>
            <div class="row">
            <div class="col-md-3 mb-3">
                <b-input-group prepend="SKU-NO">
                    <b-form-input type="text" v-model="sku_no" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary" @click="openModal">검색</b-button>
                    </b-input-group-prepend>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="제품명">
                    <b-form-input type="text" v-model="productName" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary">검색</b-button>
                    </b-input-group-prepend>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="브랜드명">
                    <b-form-input type="text" v-model="brandName" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary">검색</b-button>
                    </b-input-group-prepend>
                </b-input-group>
            </div>
            <div class="col-md-3 mb-3">
                <b-input-group prepend="제조사">
                    <b-form-input type="text" v-model="maker" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary">검색</b-button>
                    </b-input-group-prepend>
                </b-input-group>
            </div>
        </div>
         <div class="row">
            <div class="col-md-6 mb-3">
                <b-input-group prepend="날짜">
                    <b-form-input type="date" v-model="beforeDate" placeholder="" value=""></b-form-input>
                    <b-form-input type="date" v-model="afterDate" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary">검색</b-button>
                    </b-input-group-prepend>
                </b-input-group>
            </div>
            
            <div class="col-md-2 mb-3 ">
                <b-button  variant="primary" class="left-box" >상품 조회</b-button>
            </div>
         </div>
            <!-- /default -->
            <!-- footer 슬롯 콘텐츠 -->
            <template slot="footer">
                <button @click="closeModal">닫기</button>
            </template>
         </select-modal>
    </div>
</template>

<script>
import selectModal from '../SelectModal.vue';


export default {
    components:{
        selectModal
    },
    data(){
        return{
            sku_no:'',
            productName:'',
            brandName:'',
            maker:'',
            beforeDate:'',
            afterDate:'',
            modal: false,
            header:["skuNo", "제품명", "브랜드명", "제조사", "출시일자"],
            selectParam:[]
        }
    },
    methods: {
        searchData(){
            console.log(this.productName);
            this.$store.dispatch("SELECT_PRODUCT", {
                name : this.$route.name, 
                sku_no : this.sku_no, 
                productName : this.productName, 
                brandName : this.brandName, 
                maker : this.maker
            });
        }
    // openModal() {
    //     if(this.sku_no.length > 0 && this.productName.length > 0 && this.brandName.length > 0 && this.maker.length > 0 && this.beforeDate.length > 0 && this.afterDate.length > 0){
    //         this.$store.dispatch("SELECT_ALL_PRODUCT", this.$route.name);
    //     } else{
    //         this.$store.dispatch("SELECT_ALL_PRODUCT", this.$route.name, );
    //     }
    //     this.modal = true
    // },
    // closeModal() {
    //   this.modal = false
    // },
    // doSend() {
    //   if (this.message.length > 0) {
    //     alert(this.message)
    //     this.message = ''
    //     this.closeModal()
    //   } else {
    //     alert('메시지를 입력해주세요.')
    //   }
    // }
  }
    // created(){
    //     // this.$store.dispatch("FETCH_USER", userName);
    // }
}
</script>

<style scoped>
.btn_margin{
    margin-right: 5px;
}
.left-box{
    float: right;
}
</style>