/**
 * Author   : Syan
 * Date     : 2018/4/20
 * Project [ RNPlayground ] Coded on WebStorm.
 * import { stringify } from 'qs'; GET 请求拼接参数使用
 */

import request from '../utils/request';
import Config from '../common/config';

/**
 * 车型库品牌接口
 */
export async function queryBrands(page = 1) {
  return request(`${Config.API_HOST}brands?page=${page}`);
}
