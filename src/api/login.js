import request from '@/utils/request'

export function login(userName, passWord) {
  return request({
    url:'/login/login',
    method:'post',
    data:{
          "userName":userName,
          "passWord":passWord
        },
  })
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data: {
  //     "userName":userName,
  //     "passWord":passWord
  //   },
  //   dataType:"json",
  //   headers:{
  //     'X-Requested-With':'XMLHttpRequest',
  //     'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      
  //   }
  // })
}

export function getInfo() {
  return request({
    url: '/login/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
