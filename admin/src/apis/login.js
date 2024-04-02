import request from '@/utils/request'
export const loginAPI = ({ username, password }) => {
  return request({
    url: 'adminapi/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  }).catch((error) => {
    return error.response
  })
}
