import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const config = {
  authUrl: "/auth/",
  productUrl: "/product/",
  inspectUrl: "/inspect/",
  makerUrl: "/maker/",
  makerAuditUrl: "/makerAudit/",
  claimUrl: "/claim/",
  salesUrl: "/sales/",
};

// 유저 로그인
function userLogin(user) {
  let data = {
    email: user.userId,
    password: user.userPassword,
  };

  return axios.post(config.authUrl + "login", data, {
    header: { "Content-Type": `application/json` },
  });
}

// 상품 추가하기
function insertProduct(newProduct) {

  return axios.post(config.productUrl + "insertProduct", newProduct, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 상품 수정하기
function updateProduct(updateProduct) {
  return axios.put(config.productUrl + "updateProduct", updateProduct, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 상품 삭제하기
function deleteProduct(product) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: product.id,
      skuNo: product.skuNo,
    },
  };
  return axios.delete(config.productUrl + "deleteProduct", data);
}

// 특정 상품 조회
function selectProduct(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      // page : selectCon.page,
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      downExcel : selectCon.downExcel
      // productCurseId: selectCon.productCurseId,
    },
  };

  return axios.get(config.productUrl + "selectProducts", data);
}

// 제품 페이지 조회
function selectPageProduct(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      productCurseId: encodeURI(selectCon.productCurseId),
    },
  };

  return axios.get(config.productUrl + "selectPageProduct", data);
}

// 제품 sku 중복 확인
function checkSkuNo(skuNo) {

  let data = {
    params: {
      skuNo: skuNo,
    },
  };

  return axios.get(config.productUrl + "checkProduct", data);
}

// 상품 리플 수정하기
function updateProductReply(productReply) {

  return axios.put(config.productUrl + "updateProductReply", productReply);
}

// 상품 리플 삭제하기
function deleteProductReply(productReply) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      productId: productReply.productId,
      productReplyId: encodeURI(productReply.productReplyId),
    },
  };
  return axios.delete(config.productUrl + "deleteProductReply", data);
}

// 검수 추가하기
function insertInspect(newInspect) {
  return axios.post(config.inspectUrl + "insertInspect", newInspect, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 검수 수정하기
function updateInspect(updateInspect) {

  return axios.put(config.inspectUrl + "updateInspect", updateInspect, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 검수 삭제하기
function deleteInspect(deleteInspect) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteInspect.id,
    },
  };
  return axios.delete(config.inspectUrl + "deleteInspect", data);
}

// 모든 검수 조회
function selectAllInspect() {
  return axios.get(config.inspectUrl + "selectAllInspect");
}

// 일부 검수 조회
function selectInspect(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      page:selectCon.page,
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(config.inspectUrl + "selectInspects", data);
}


// 검수 엑셀 다운 
function selectInspectExcel(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      page:selectCon.page,
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(config.inspectUrl + "selectInspectExcel", data);
}

// 검수 페이지 조회
function selectPageInspect(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      inspectCurseId: encodeURI(selectCon.inspectCurseId),
    },
  };

  return axios.get(config.inspectUrl + "selectPageInspect", data);
}

// 제조사 추가하기
function insertMaker(newMaker) {
console.log(newMaker);
  return axios.post(config.makerUrl + "insertMaker", newMaker);
}

// 제조사 수정하기
function updateMaker(updateMaker) {
  console.log(updateMaker);
  return axios.put(config.makerUrl + "updateMaker", updateMaker);
}

// 제조사 삭제하기
function deleteMaker(deleteMaker) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteMaker.id,
    },
  };
  return axios.delete(config.makerUrl + "deleteMaker", data);
}

// 일부 제조사 조회
function selectMaker(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      makerName: selectCon.makerName,
      makerAddress: selectCon.makerAddress,
      makerPerson: selectCon.makerPerson,
      makerPhone: selectCon.makerPhone,
      className: encodeURI(selectCon.className),
      newProduct : selectCon.newProduct
    },
  };

  return axios.get(config.makerUrl + "selectMakers", data);
}


// 제조사 리플 수정하기
function updateMakerReply(makerReply) {

  return axios.put(config.makerUrl + "updateMakerReply", makerReply);
}

// 제조사 리플 삭제하기
function deleteMakerReply(makerReply) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      makerId: makerReply.makerId,
      makerReplyId: encodeURI(makerReply.makerReplyId),
    },
  };
  return axios.delete(config.makerUrl + "deleteMakerReply", data);
}

// 제조사 점검 추가하기
function insertMakerAudit(newAudit) {
  return axios.post(config.makerAuditUrl + "insertMakerAudit", newAudit, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 제조사 점검 수정하기
function updateMakerAudit(updateAudit) {
  return axios.put(config.makerAuditUrl + "updateMakerAudit", updateAudit, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 제조사 점검 삭제하기
function deleteMakerAudit(deleteAudit) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteAudit.id,
    },
  };
  return axios.delete(config.makerAuditUrl + "deleteMakerAudit", data);
}


// 클레임 추가하기
function insertClaim(newClaim) {

  return axios.post(config.claimUrl + "insertClaim", newClaim, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 클레임 수정하기
function updateClaim(updateClaim) {

  return axios.put(config.claimUrl + "updateClaim", updateClaim, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 클레임 삭제하기
function deleteClaim(deleteClaim) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteClaim.id,
    },
  };
  return axios.delete(config.claimUrl + "deleteClaim", data);
}


// 일부 클레임 조회
function selectClaim(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: selectCon.sku_no,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(config.claimUrl + "selectClaims", data);
}

// 월별 판매량 추가하기
function insertMonthSales(newSales) {

  return axios.post(config.salesUrl + "insertSales", newSales);
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

  return axios.get(config.salesUrl + "selectSales", data);
}

// 월별 판매량 수정하기
function updateMonthSales(updateSales) {

  return axios.put(config.salesUrl + "updateMonthSales", updateSales);
}

// 월별 판매량 삭제하기
function deleteMonthSales(deleteSales) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      ids: encodeURI(deleteSales.ids),
    },
  };

  return axios.delete(config.salesUrl + "deleteMonthSales", data);
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

  return axios.get(config.salesUrl + "selectMonthSales", data);
}

// 판매구성품 추가하기
function insertSalesProductComponent(newSales) {
  return axios.post(config.salesUrl + "insertSalesProductComponent", newSales);
}

// 판매구성품 수정하기
function updateSalesProductComponent(newSales) {

  return axios.post(config.salesUrl + "updateSalesProductComponent", newSales);
}

// 판매구성품 삭제하기
function deleteSalesProductComponent(newSales) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: newSales.skuNo,
    },
  };
  return axios.delete(config.salesUrl + "deleteSalesProductComponent", data);
}

// 판매구성품 중복조회
function checkProductComponentSkuNo(checkSkuNo) {

  let data = {
    params: {
      skuNo: checkSkuNo,
    },
  };

  return axios.get(config.salesUrl + "checkProductComponentSkuNo", data);
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

  return axios.get(config.salesUrl + "selectSalesProduct", data);
}

export {
  userLogin,
  insertProduct,
  updateProduct,
  deleteProduct,
  selectProduct,
  selectPageProduct,
  checkSkuNo,
  updateProductReply,
  deleteProductReply,
  insertInspect,
  updateInspect,
  deleteInspect,
  selectAllInspect,
  selectInspect,
  selectInspectExcel,
  selectPageInspect,
  insertMaker,
  updateMaker,
  deleteMaker,
  selectMaker,
  updateMakerReply,
  deleteMakerReply,
  insertMakerAudit,
  updateMakerAudit,
  deleteMakerAudit,
  insertClaim,
  updateClaim,
  deleteClaim,
  selectClaim,
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
};
