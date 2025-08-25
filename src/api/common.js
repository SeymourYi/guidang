/*
 * @Author: lsj shangjin.li@wonderit.cn
 * @Date: 2023-04-24 13:20:04
 * @LastEditors: lsj shangjin.li@wonderit.cn
 * @LastEditTime: 2025-08-06 16:06:02
 * @FilePath: /audi-mic-drinks-phone/src/api/common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const devBaseUrl = 'http://api.wonderit.cn';
// const proBaseUrl = 'http://api.wonderit.cn';
// const proBaseUrl = 'https://mic.wonderit.cn';

const devBaseUrl = 'https://papi.wonderit.cn';
const proBaseUrl= 'https://papi.wonderit.cn';

let ip;
process.env.NODE_ENV === 'development' ? ip = devBaseUrl : ip = proBaseUrl;

console.log(ip)
console.log(process.env.NODE_ENV)

export default {
  ip
}
