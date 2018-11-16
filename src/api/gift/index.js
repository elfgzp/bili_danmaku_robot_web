import request from '@/plugin/axios'

const baseUri = '/gift/v3/live/gift_config'

export function getGifts (data) {
  data = data || {}
  return request({
    baseURI: '',
    url: `${baseUri}`,
    method: 'get',
    params: data
  })
}
