import request from '@/plugin/axios'

const baseUri = '/responses'

export function getRsponsesList (data) {
  data = data || {}
  return request({
    url: `${baseUri}`,
    method: 'get',
    params: data
  })
}

export function getRsponseDetail (id, data) {
  data = data || {}
  return request({
    url: `${baseUri}/${id}`,
    method: 'get',
    params: data
  })
}

export function createRsponse (data) {
  data = data || {}
  return request({
    url: `${baseUri}`,
    method: 'post',
    data
  })
}

export function deleteReponse (id, data) {
  data = data || {}
  return request({
    url: `${baseUri}/${id}`,
    method: 'delete',
    data
  })
}
