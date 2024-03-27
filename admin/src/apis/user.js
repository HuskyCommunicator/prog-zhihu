import request from '@/utils/request'
//添加用户
export const userAddAPI = ({ username, password, role }) => {
  return request({
    url: 'adminapi/user/add',
    method: 'POST',
    data: {
      username,
      password,
      role
    }
  }).catch((error) => {
    return error.response
  })
}
//获取用户列表
export const userGetAPI = () => {
  return request({
    url: 'adminapi/user/getlist',
    method: 'GET'
  }).catch((error) => {
    return error.response
  })
}
//删除指定用户
export const userDelAPI = (username) => {
  return request({
    url: 'adminapi/user/deluser',
    method: 'DELETE',
    data: {
      username
    }
  }).catch((error) => {
    return error.response
  })
}
//更新指定用户
export const userPutAPI = ({ username, password, role, _id }) => {
  return request({
    url: 'adminapi/user/putuser',
    method: 'PUT',
    data: {
      username,
      password,
      role,
      _id
    }
  }).catch((error) => {
    return error.response
  })
}
