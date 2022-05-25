<template>
    <div>
        <div class="row">
            <div class="col-md-3 mb-3">
                <b-input-group prepend="SKU-NO">
                    <b-form-input type="text" v-model="sku_no" placeholder="" value=""></b-form-input>
                    <b-input-group-prepend>
                        <b-button variant="primary">검색</b-button>
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
            <div class="col-md-6 mb-3" >
                <b-button variant="primary" class="btn_margin" >1주일 전</b-button>
                <b-button variant="primary" class="btn_margin" >1개월 전</b-button>
                <b-button variant="primary" class="btn_margin" >3개월 전</b-button>
            </div>
         </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sku_no:'',
            productName:'',
            brandName:'',
            maker:'',
            beforeDate:'',
            afterDate:''
        }
    }
}
</script>

<style scoped>
.btn_margin{
    margin-right: 5px;
}

</style>