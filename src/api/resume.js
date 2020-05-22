import request from '@/utils/request'
export function findResume(params) {
    return request({
      url:'/resume/findResume',
      method:'get',
      params:params
    })
  }