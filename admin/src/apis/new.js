import request from '@/utils/request'
//添加新闻
export const NewAddAPI = ({ newsForm }) => {
  const params = new FormData()
  for (let i in newsForm) {
    params.append(i, newsForm[i])
  }
  return request({
    url: 'adminapi/new/add',
    method: 'POST',
    data: params
  }).catch((error) => {
    return error.response
  })
}
//获取新闻列表
export const NewListGetAPI = () => {
  return request({
    url: 'adminapi/new/getList',
    method: 'GET'
  }).catch((error) => {
    return error.response
  })
}
//更新新闻
//删除新闻
export const NewDelAPI = (title) => {
  return request({
    url: 'adminapi/new/del',
    method: 'DELETE',
    data: {
      title
    }
  }).catch((error) => {
    return error.response
  })
}
