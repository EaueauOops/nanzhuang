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
