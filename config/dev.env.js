/*
 * @Author: lsj shangjin.li@wonderit.cn
 * @Date: 2023-04-24 13:20:04
 * @LastEditors: lsj shangjin.li@wonderit.cn
 * @LastEditTime: 2025-08-06 16:00:50
 * @FilePath: /audi-mic-drinks-phone/config/dev.env.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"https://qapi.wonderit.cn/"'
})
