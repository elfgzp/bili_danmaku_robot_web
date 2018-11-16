import request from '@/plugin/axios'

const baseUri = '/statements'

export function getStatementsList (data) {
  data = data || {}
  return request({
    url: `${baseUri}`,
    method: 'get',
    data
  })
}

export function getStatementDetail (id, data) {
  data = data || {}
  return request({
    url: `${baseUri}/${id}`,
    method: 'get',
    data
  })
}

export function getStatementResponses (data) {
  data = data || {}
  return request({
    url: `${baseUri}/${id}/responses`,
    method: 'get',
    data
  })
}

export function getStatementResponseDetail (id, response_id, data) {
  data = data || {}
  return request({
    url: `${baseUri}/${id}/responses/${response_id}`,
    method: 'get',
    data
  })
}