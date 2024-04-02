import request from '@/utils/request'
//添加新闻
//获取新闻列表
export const NewListGetAPI = () => {
  return request({
    url: 'adminapi/new/getList',
    method: 'GET'
  }).catch((error) => {
    return error.response
  })
}
