import request from '@/utils/request'

export function getAllPrice(data) {
  return request({
    url: 'price-index/all',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function filterPrice(data) {
  return request({
    url: 'price-index/query',
    method: 'get',
    params: {
      code: data.code,
      brand: data.brand,
      region: data.region,
      periodYear: data.periodYear,
      periodMonth: data.periodMonth,
      periodDays: data.periodDays,
      daleiName: data.daleiName,
      zhongleiName: data.zhongleiName,
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}
