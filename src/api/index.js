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
  console.log("유저 로그인 api 접근");

  console.log(user);

  let data = {
    email: user.userId,
    password: user.userPassword,
  };

  console.log(data);

  return axios.post(config.authUrl + "login", data, {
    header: { "Content-Type": `application/json` },
  });
}

// 상품 추가하기
function insertProduct(newProduct) {
  console.log("상품추가하기");
  console.log(newProduct);

  return axios.post(config.productUrl + "insertProduct", newProduct, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 상품 수정하기
function updateProduct(updateProduct) {
  console.log("상품 수정하기");
  console.log(updateProduct);
  // for (var pair of updateProduct.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  for (var key of updateProduct.keys()) {
    console.log(`${key} : ${updateProduct.get(key)}`);
  }


  return axios.put(config.productUrl + "updateProduct", updateProduct, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 상품 삭제하기
function deleteProduct(product) {
  console.log("제품 삭제");
  console.log(product);

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
  console.log("api : sku_no, productName, brandName, maker");
  console.log(selectCon);

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
  console.log(data);

  return axios.get(config.productUrl + "selectProducts", data);
}

// 제품 페이지 조회
function selectPageProduct(selectCon) {
  console.log("selectPageProduct api access");
  console.log(selectCon);

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      productCurseId: encodeURI(selectCon.productCurseId),
    },
  };
  console.log(data);

  return axios.get(config.productUrl + "selectPageProduct", data);
}

// 제품 sku 중복 확인
function checkSkuNo(skuNo) {
  console.log("api : sku_no");
  console.log(skuNo);

  let data = {
    params: {
      skuNo: skuNo,
    },
  };

  return axios.get(config.productUrl + "checkProduct", data);
}

// 상품 리플 수정하기
function updateProductReply(productReply) {
  console.log("리플 수정하기");
  console.log(productReply);

  return axios.put(config.productUrl + "updateProductReply", productReply);
}

// 상품 리플 삭제하기
function deleteProductReply(productReply) {
  console.log("리플 삭제");
  console.log(productReply);

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
  console.log("검수 추가하기");
  // console.log(imgFiles[0]);
  console.log(newInspect.get("productId"));
  for (var pair of newInspect.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  return axios.post(config.inspectUrl + "insertInspect", newInspect, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 검수 수정하기
function updateInspect(updateInspect) {
  console.log("검수 수정하기");
  console.log(updateInspect);
  for (var pair of updateInspect.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

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
  //return axios.get(`${config.baseUrl}news/1.json`);
}

// 일부 검수 조회
function selectInspect(selectCon) {
  console.log("api : sku_no, productName, brandName, maker");
  console.log(selectCon);

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
  console.log("api : sku_no, productName, brandName, maker");
  console.log(selectCon);

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
  console.log("selectPageInspect api access");
  console.log(selectCon);

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
  console.log("제조사 추가하기");

  return axios.post(config.makerUrl + "insertMaker", newMaker);
}

// 제조사 수정하기
function updateMaker(updateMaker) {
  console.log("제조사 수정하기");
  console.log(updateMaker);

  return axios.put(config.makerUrl + "updateMaker", updateMaker);
}

// 제조사 삭제하기
function deleteMaker(deleteMaker) {
  console.log("deleteMaker api 접속");
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
  console.log("일부 제조사 조회 api 접속");
  console.log(selectCon);

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
  console.log("리플 수정하기");
  console.log(makerReply);

  return axios.put(config.makerUrl + "updateMakerReply", makerReply);
}

// 제조사 리플 삭제하기
function deleteMakerReply(makerReply) {
  console.log("리플 삭제");
  console.log(makerReply);

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
  console.log("제조사 점검 추가하기");
  // console.log(imgFiles[0]);
  // console.log(newAudit.get("productId"));
  for (var pair of newAudit.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  return axios.post(config.makerAuditUrl + "insertMakerAudit", newAudit, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}


// 클레임 추가하기
function insertClaim(newClaim) {
  console.log("클레임 추가하기");
  // console.log(imgFiles[0]);
  console.log(newClaim.get("productId"));
  for (var pair of newClaim.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  return axios.post(config.claimUrl + "insertClaim", newClaim, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 클레임 수정하기
function updateClaim(updateClaim) {
  console.log("클레임 수정하기");
  console.log(updateClaim);
  for (var pair of updateClaim.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

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

// 모든 클레임 조회
// function selectAllClaim() {
//   return axios.get(config.ClaimUrl + "selectAllClaim");
//   //return axios.get(`${config.baseUrl}news/1.json`);
// }

// 일부 클레임 조회
function selectClaim(selectCon) {
  console.log("api : sku_no, productName, brandName, maker");
  console.log(selectCon);

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
  console.log("월별 판매량 추가하기");
  console.log(newSales);

  return axios.post(config.salesUrl + "insertSales", newSales);
}

// 일부 판매량 조회
function selectSales(selectCon) {
  console.log("판매량 조회");
  console.log(selectCon);

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
  console.log("월별 판매량 수정하기");
  console.log(updateSales);

  return axios.put(config.salesUrl + "updateMonthSales", updateSales);
}

// 월별 판매량 삭제하기
function deleteMonthSales(deleteSales) {
  console.log("월별 판매량 삭제하기");
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
  console.log("월별 판매량 조회");
  console.log(selectCon);

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
  console.log("판매구성품 추가하기");
  console.log(newSales);
  return axios.post(config.salesUrl + "insertSalesProductComponent", newSales);
}

// 판매구성품 수정하기
function updateSalesProductComponent(newSales) {
  console.log("판매구성품 수정하기");

  return axios.post(config.salesUrl + "updateSalesProductComponent", newSales);
}

// 판매구성품 삭제하기
function deleteSalesProductComponent(newSales) {
  console.log("판매구성품 삭제하기");
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
  console.log("api : sku_no");
  console.log(checkSkuNo);

  let data = {
    params: {
      skuNo: checkSkuNo,
    },
  };

  return axios.get(config.salesUrl + "checkProductComponentSkuNo", data);
}

// 판매구성품 조회
function selectProductComponent(select) {
  console.log("일부 제조사 조회 api 접속");
  console.log(select);

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
