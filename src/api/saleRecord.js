import request from '@/utils/request'
const qs = require('qs')

export function addSaleRecord(data) {
  return request({
    url: 'sale-record/add',
    method: 'post',
    params: {
      merchantName: data.merchantName,
      businessCode: data.businessCode,
      uniqueCode: data.uniqueCode,
      periodYear: data.periodYear,
      periodMonth: data.periodMonth,
      periodDays: data.periodDays,
      brand: data.brand,
      region: data.region,
      productDaleiCode: data.productDaleiCode,
      productDaleiName: data.productDaleiName,
      productDaleiSales: data.productDaleiSales,
      productZhongleiCode: data.productZhongleiCode,
      productZhongleiName: data.productZhongleiName,
      productZhongleiSalePrice: data.productZhongleiSalePrice,
      productZhongleiSaleNumber: data.productZhongleiSaleNumber,
      representationNumber: data.representationNumber,
      currentPrice: data.currentPrice,
      currentSales: data.currentSales,
      A: data.A,
      B: data.B,
      C: data.C,
      D: data.D,
      E: data.E,
      F: data.F,
      note: data.note
    }
  })
}

export function getAllSaleRecord(data) {
  return request({
    url: 'sale-record/all',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function filterSaleRecord(data) {
  return request({
    url: 'sale-record/query-records',
    method: 'get',
    params: {
      // merchantName: encodeURI(encodeURI(data.merchantName)),
      merchantName: data.merchantName,
      businessCode: data.businessCode,
      recodeUsername: data.recodeUsername,
      uniqueCode: data.uniqueCode,
      productDaleiName: data.productDaleiName,
      productZhongleiName: data.productZhongleiName,
      startTime: data.startTime,
      endTime: data.endTime,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function deleteSaleRecord(data) {
  return request({
    url: 'sale-record/delete',
    method: 'delete',
    params: {
      'saleRecordIds[]': data + ''
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
