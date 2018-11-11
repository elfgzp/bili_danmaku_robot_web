import request from '@/plugin/axios'

export function userToken (data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}
