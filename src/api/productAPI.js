import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const productUrl = "/product/";


// 상품 추가하기
function insertProduct(newProduct) {

  return axios.post(productUrl + "insertProduct", newProduct, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 상품 수정하기
function updateProduct(updateProduct) {
  return axios.put(productUrl + "updateProduct", updateProduct, {
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
  return axios.delete(productUrl + "deleteProduct", data);
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

  return axios.get(productUrl + "selectProducts", data);
}

// 제품 페이지 조회
function selectPageProduct(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      productCurseId: encodeURI(selectCon.productCurseId),
    },
  };

  return axios.get(productUrl + "selectPageProduct", data);
}

// 제품 sku 중복 확인
function checkSkuNo(skuNo) {

  let data = {
    params: {
      skuNo: skuNo,
    },
  };

  return axios.get(productUrl + "checkProduct", data);
}

// 상품 리플 수정하기
function updateProductReply(productReply) {

  return axios.put(productUrl + "updateProductReply", productReply);
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
  return axios.delete(productUrl + "deleteProductReply", data);
}

export {
    insertProduct,
    updateProduct,
    deleteProduct,
    selectProduct,
    selectPageProduct,
    checkSkuNo,
    updateProductReply,
    deleteProductReply,
}
