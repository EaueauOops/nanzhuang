import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: 'product/add',
    method: 'post',
    params: {
      productCode: data.productCode,
      productName: data.productName,
      typeLevel: data.typeLevel,
      daleiId: data.parentId
    }
  })
}

export function fetchLevel(data) {
  return request({
    url: 'product/get-list',
    method: 'get',
    params: {
      typeLevel: data
    }
  })
}

export function fetchList(data) {
  return request({
    url: 'product/get-mid',
    method: 'get',
    params: {
      productId: data
    }
  })
}

export function fetchDetail(data) {
  return request({
    url: 'product/get',
    method: 'get',
    params: {
      productId: data
    }
  })
}

export function deleteProduct(data) {
  return request({
    url: 'product/delete',
    method: 'delete',
    params: {
      productId: data.productId
    }
  })
}

