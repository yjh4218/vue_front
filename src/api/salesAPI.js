import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const salesUrl = "/sales/";


// 월별 판매량 추가하기
function insertMonthSales(newSales) {

  return axios.post(salesUrl + "insertSales", newSales);
}

// 일부 판매량 조회
function selectSales(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      comFlag: selectCon.comFlag,
      findDate: selectCon.findDate,
    },
  };

  return axios.get(salesUrl + "selectSales", data);
}

// 월별 판매량 수정하기
function updateMonthSales(updateSales) {

  return axios.put(salesUrl + "updateMonthSales", updateSales);
}

// 월별 판매량 삭제하기
function deleteMonthSales(deleteSales) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      ids: encodeURI(deleteSales.ids),
    },
  };

  return axios.delete(salesUrl + "deleteMonthSales", data);
}

// 월별 판매량 조회
function selectMonthSales(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      findDate: selectCon.findDate,
    },
  };

  return axios.get(salesUrl + "selectMonthSales", data);
}

// 판매구성품 추가하기
function insertSalesProductComponent(newSales) {
  return axios.post(salesUrl + "insertSalesProductComponent", newSales);
}

// 판매구성품 수정하기
function updateSalesProductComponent(newSales) {

  return axios.post(salesUrl + "updateSalesProductComponent", newSales);
}

// 판매구성품 삭제하기
function deleteSalesProductComponent(newSales) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: newSales.skuNo,
    },
  };
  return axios.delete(salesUrl + "deleteSalesProductComponent", data);
}

// 판매구성품 중복조회
function checkProductComponentSkuNo(checkSkuNo) {

  let data = {
    params: {
      skuNo: checkSkuNo,
    },
  };

  return axios.get(salesUrl + "checkProductComponentSkuNo", data);
}

// 판매구성품 조회
function selectProductComponent(select) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: select.skuNo,
      productName: select.productName,
      comSkuNo: select.comSkuNo,
      comProductName: select.comProductName,
    },
  };

  return axios.get(salesUrl + "selectSalesProduct", data);
}

export {
  insertMonthSales,
  selectSales,
  updateMonthSales,
  deleteMonthSales,
  selectMonthSales,
  insertSalesProductComponent,
  updateSalesProductComponent,
  deleteSalesProductComponent,
  checkProductComponentSkuNo,
  selectProductComponent,
}
