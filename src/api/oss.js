import request from '@/utils/request'
export function policy() {
  return request({
    url:'/image/upload',
    method:'post'
    // url:'/aliyun/oss/policy',
    // method:'get',
  })
}
