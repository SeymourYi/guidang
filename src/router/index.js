/*
 * @Author: lsj shangjin.li@wonderit.cn
 * @Date: 2023-04-24 13:19:45
 * @LastEditors: lsj shangjin.li@wonderit.cn
 * @LastEditTime: 2025-08-12 15:32:13
 * @FilePath: /audi-mic-drinks-phone/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'

// import order from '@/views/order/order'
import ok from '@/views/ok'
import home from '@/views/home'
import order from '@/views/order'
import CategoryList from '@/views/order/CategoryList.vue'
import orderPay from '@/views/order/orderPay.vue'
import massage from '@/views/massage'
import restaurant from '@/views/restaurant'
import baby from '@/views/baby'
import parking from '@/views/parking'
import children from '@/views/children'
import newhome from '@/views/newhome.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "swiper/css/swiper.min.css";


Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.use(Router)
Vue.use(ElementUI);

export default new Router({
    routes: [
        {
        path: '/order',
        name: 'order',
        component: order,
        children: [
            {
                path: '',
                redirect: 'new'
            },
            {
                path: ':category?',
                name: 'order-category',
                component: CategoryList
            },
            // {
            //     path: '/order/pay',
            //     name: 'pay',
            //     component: pay
            // }
        ]   
    },
    
    {
        path: '/',
        name: 'home',
        component: newhome
    }, 
    {
        path: '/ok',
        name: 'ok',
        component: ok
    },
{
    path: '/orderPay',
    name: 'orderPay',
    component: orderPay
},
{
    path: '/massage',
    name: 'massage',
    component: massage
},
{
    path: '/restaurant',
    name: 'restaurant',
    component: restaurant
},
{
    path: '/baby',
    name: 'baby',
    component: baby
},
{
    path: '/parking',
    name: 'parking',
    component: parking
},
{
    path: '/children',
    name: 'children',
    component: children
}]
})