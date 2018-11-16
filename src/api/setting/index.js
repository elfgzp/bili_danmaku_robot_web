import request from '@/plugin/axios'

const baseUri = '/settings'

export function getSettings (data) {
  data = data || {}
  return request({
    url: `${baseUri}`,
    method: 'get',
    params: data
  })
}

export function saveSettings (data) {
  data = data || {}
  return request({
    url: `${baseUri}`,
    method: 'put',
    data
  })
}
