import request from '@/utils/request'
import { useRoute } from 'vue-router'
//添加用户
export const userAddAPI = ({ userForm }) => {
  const params = new FormData()
  for (let i in userForm) {
    params.append(i, userForm[i])
  }
  return request({
    url: 'adminapi/user/add',
    method: 'POST',
    data: params
  }).catch((error) => {
    return error.response
  })
}
//获取用户列表
export const userListGetAPI = () => {
  return request({
    url: 'adminapi/user/getlist',
    method: 'GET'
  }).catch((error) => {
    return error.response
  })
}
//获取指定用户
export const userGetAPI = ({ id }) => {
  const route = useRoute()
  return request({
    url: `adminapi/user/getuser/${id}`,
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
export const userPutAPI = ({ userForm }) => {
  const params = new FormData()
  for (let i in userForm) {
    params.append(i, userForm[i])
  }
  return request({
    url: 'adminapi/user/putuser',
    method: 'PUT',
    data: params
  }).catch((error) => {
    return error.response
  })
}
//个人中心
export const userUploadAPI = ({ userForm }) => {
  const params = new FormData()
  for (let i in userForm) {
    params.append(i, userForm[i])
  }
  return request({
    url: 'adminapi/user/upload',
    method: 'PUT',
    data: params
  }).catch((error) => {
    return error.response
  })
}
