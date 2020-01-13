import axios from 'axios'

/* 设置基地址 */
const baseUrl = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

/* 暴露查询商家信息的调用方法 */
export const seller = () => {
  return baseUrl.get('seller')
}

/* 暴露查询评论信息的调用方法 */
export const ratings = () => {
  return baseUrl.get('ratings')
}

/* 暴露查询商品详情的调用方法 */
export const goods = () => {
  return baseUrl.get('goods')
}
