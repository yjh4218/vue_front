<template>
  <div class="body">
    <div class="title">상품 정보 수정(제품 조회 후 선택해야 함)</div>
      <div class="row">
        <div class="col-md-6 mb-3">
            <b-input-group prepend="SKU-NO">
                <b-form-input type="number" v-model="sku_no" placeholder="" value="" readonly></b-form-input>
            </b-input-group>
        </div>
        <div class="col-md-6 mb-3">
            <b-input-group prepend="제품명">
                <b-form-input type="text" v-model="productName" placeholder="" value=""></b-form-input>
            </b-input-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
            <b-input-group prepend="브랜드명">
                <b-form-input type="text" v-model="brandName" placeholder="" value=""></b-form-input>
            </b-input-group>
        </div>
        <div class="col-md-6 mb-3">
            <b-input-group prepend="제조사">
                <b-form-input type="text" v-model="maker" placeholder="" value=""></b-form-input>
            </b-input-group>
        </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
          <b-input-group prepend="제품분류">
               <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-input-group>
      </div>
      <div class="col-md-6 mb-3">
          <b-input-group prepend="제품출시일">
              <b-form-input type="date" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
          <b-input-group prepend="매입가격(부가세포함)">
              <b-form-input type="number" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
      <div class="col-md-6 mb-3">
          <b-input-group prepend="판매가격(부가서포함)">
              <b-form-input type="number" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
          <b-input-group prepend="제품성상">
              <b-form-textarea id="textarea-default" v-model="beforeDate"  rows="3" max-rows="5"></b-form-textarea>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
          <b-input-group prepend="제품규격">
              <b-form-textarea id="textarea-default" v-model="beforeDate" rows="3" max-rows="5"></b-form-textarea>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
          <b-input-group prepend="칼로리">
              <b-form-input type="text" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
      <div class="col-md-6 mb-3">
          <b-input-group prepend="나트륨">
              <b-form-input type="text" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
          <b-input-group prepend="색상">
              <b-form-input type="text" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
      <div class="col-md-6 mb-3">
          <b-input-group prepend="모양">
              <b-form-input type="text" v-model="beforeDate" placeholder="" value=""></b-form-input>
          </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
          <b-input-group prepend="비고">
              <b-form-textarea id="textarea-default" v-model="beforeDate" rows="3" max-rows="5"></b-form-textarea>
          </b-input-group>
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
            afterDate:'',
            selected: null,
            options: [
              { value: "간식", text: '간식' },
              { value: '사료', text: '사료' },
              { value: '동물용 의료기기', text: '동물용 의료기기' },
              { value: '동물용 의약외품', text: '동물용 의약외품' },
              { value: '의류', text: '공산품' },
              { value: '장난감', text: '공산품' },
              { value: '생활화학제품', text: '공산품' },
              { value: '화장품', text: '화장품' },
              { value: '기타', text: '기타'}
            ]
        }
    },
}
</script>

<style>

</style>