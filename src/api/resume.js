import request from '@/utils/request'
export function findResume(params) {
    return request({
      url:'/resume/findResume',
      method:'get',
      params:params
    })
  }

  export function findOneResume(id) {
    return request({
      url:'/resume/findOneResume/'+id,
      method:'get'
    })
  }

  export function createResume(data) {
    return request({
      url:'/resume/createResume',
      method:'post',
      data:data
    })
  }
  export function updateResume(id,data) {
    return request({
      url:'/resume/updateResume/'+id,
      method:'post',
      data:data
    })
  }