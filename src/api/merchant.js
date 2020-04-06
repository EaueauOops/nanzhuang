import request from '@/utils/request'

export function merchant(data) {
  return request({
    url: 'merchant/register',
    method: 'post',
    params: {
      ownerName: data.ownerName,
      businessCode: data.businessCode,
      uniqueCode: data.uniqueCode
    }
  })
}

export function merchantInfo(token) {
  return request({
    url: 'merchant/info',
    method: 'get',
    params: { token }
  })
}

export function merchantList(token) {
  return request({
    url: 'merchant/list',
    method: 'get',
    params: { token }
  })
}
