import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const config = {
  userUrl : "/user/",
  productUrl: "/product/",
  inspectUrl: "/inspect/",
  makerUrl: "/maker/",
};

// 유저 로그인
function userLogin(user) {
  console.log("유저 로그인 api 접근");
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      userId: user.userId,
      userPassword : user.userPassword
    },
  }

  console.log(data);

  return axios.post(config.userUrl + "login", data);
}

// 상품 추가하기
function insertProduct(newProduct) {
  console.log("상품추가하기");
  console.log(newProduct);

  let data = {
    skuNo: newProduct.skuNo,
    productName: newProduct.productName,
    brandName: newProduct.brandName,
    maker: newProduct.maker,
    className: newProduct.className,
    expDate: newProduct.expDate,
    makeDate: newProduct.makeDate,
    purchasePrice: newProduct.purchasePrice,
    sellingPrice: newProduct.sellingPrice,
    productCondition: newProduct.productCondition,
    productStandard: newProduct.productStandard,
    calorie: newProduct.calorie,
    sodium: newProduct.sodium,
    productColor: newProduct.productColor,
    productShape: newProduct.productShape,
    note: newProduct.note,
  };

  console.log(data);

  return axios.post(config.productUrl + "insertProduct", data);
}

// 상품 수정하기
function updateProduct(newProduct) {
  console.log("상품 수정하기");
  console.log(newProduct);

  let data = {
    id: newProduct.id,
    skuNo: newProduct.skuNo,
    productName: newProduct.productName,
    brandName: newProduct.brandName,
    maker: newProduct.maker,
    className: newProduct.className,
    expDate: newProduct.expDate,
    makeDate: newProduct.makeDate,
    purchasePrice: newProduct.purchasePrice,
    sellingPrice: newProduct.sellingPrice,
    productCondition: newProduct.productCondition,
    productStandard: newProduct.productStandard,
    calorie: newProduct.calorie,
    sodium: newProduct.sodium,
    productColor: newProduct.productColor,
    productShape: newProduct.productShape,
    note: newProduct.note,
  };

  console.log(data);

  return axios.put(config.productUrl + "updateProduct", data);
}

// 상품 삭제하기
function deleteProduct(product) {
  console.log("제품 삭제");
  console.log(product);

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: product.id,
      skuNo : product.skuNo
    },
  };
  return axios.delete(config.productUrl + "deleteProduct", data)
}



// 특정 상품 조회
function selectProduct(selectCon) {
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
    },
  };
  console.log(data);

  return axios.get(config.productUrl + "selectProducts", data);
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

// 검수 추가하기
function insertInspect(newInspect) {
  console.log("검수 추가하기");
  // console.log(imgFiles[0]);
  console.log(newInspect.get("productId"));

  return axios.post(config.inspectUrl + "insertInspect", newInspect, { headers: { "Content-Type": `multipart/form-data` } });
}

// 검수 수정하기
function updateInspect(updateInspect) {
  console.log("검수 수정하기");
  console.log(updateInspect);

  return axios.put(config.inspectUrl + "updateInspect", updateInspect, { headers: { "Content-Type": `multipart/form-data` } });
}

// 검수 삭제하기
function deleteInspect(deleteInspect) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteInspect.id
    },
  };
  return axios.delete(config.inspectUrl + "deleteInspect", data)
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
      skuNo: selectCon.sku_no,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate : selectCon.afterDate
    },
  };

  return axios.get(config.inspectUrl + "selectInspects", data);
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
      id: deleteMaker.id
    },
  };
  return axios.delete(config.makerUrl + "deleteMaker", data)
}

// 모든 제조사 조회
function selectAllMaker() {
  return axios.get(config.makerUrl + "selectAllMaker");
  //return axios.get(`${config.baseUrl}news/1.json`);
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
        businessType: encodeURI(selectCon.businessType),
    },
  };

  return axios.get(config.makerUrl + "selectMakers", data);
}

export {
  userLogin,
  insertProduct,
  updateProduct,
  deleteProduct,
  selectProduct,
  checkSkuNo,
  insertInspect,
  updateInspect,
  deleteInspect,
  selectAllInspect,
  selectInspect,
  insertMaker,
  updateMaker,
  deleteMaker,
  selectAllMaker,
  selectMaker
};
