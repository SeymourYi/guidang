<template>
    <div class="page">
        <div class="loading ok">
            <div class="logo black">
                <img class="logo_text" :src="logoPath1" alt="." />
                <img class="logo_img" :src="logoPath2" alt="." />
            </div>
            <h3 class="loading-box ok">
                <p><i class="iconfont icon-xiaoxi-chenggong"></i></p>
                <p>尊敬的贵宾：</p>
                <p>扫码已提交成功，我们会第一时间为您服务</p>
                <p>页面将在&nbsp;&nbsp;{{daojishi}}&nbsp;&nbsp;秒后自动关闭</p>
            </h3>
        </div>
    </div>
    <!-- / page -->
</template>
<script>
    import comjs from '@/api/common.js'

    export default {
        name: 'ok',
        components: {},
        data() {
            return {
                closeTimer: null,
                daojishi: 5,
                closeTime: 5000,
                logoPath1: require('../assets/img/logo-text.png'),
                logoPath2: require('../assets/img/logo-img.png'),
                logoPath3: require('../assets/img/logo-text-black.png'),
                logoPath4: require('../assets/img/logo-img-black.png'),
            }
        },
        created: function() {},
        mounted: function() {
            let that = this;
            var isLppzApp = false
            var ua = navigator.userAgent.toLowerCase()
        var uaApp = ua ? ua.match(/BeStore/i) : '' // match方法返回的是对象
        var uaAndroid = /android/i.test(ua) // test返回的是true/false
        var uaIos = /iphone|ipad|ipod/i.test(ua)

        that.closeTimer = setInterval(function() {
            if (that.daojishi == '1') {
                if (window.WeixinJSBridge) {
                    window.WeixinJSBridge.call('closeWindow') // 微信
                    // that.$message('微信');
                } else if (window.AlipayJSBridge) {
                    window.AlipayJSBridge.call('closeWebview') // 支付宝
                    // that.$message('支付宝');
                } else if (isLppzApp && uaAndroid) {
                    window.obj.closePageLppzRequest('') // 安卓app
                    // that.$message('安卓app');
                } else if (isLppzApp && uaIos) {
                    window.webkit.messageHandlers.closePageLppzRequest.postMessage('') //ios app
                    // that.$message('iosApp');
                } else {
                    window.close();
                    // that.$message('其他');
                }
                clearInterval(that.closeTimer);
            } else {
                that.daojishi--;
            }
        }, 1000)
    },
    methods: {},
    beforeDestory: function() {},
    computed: {},
    watch: {}
}
</script>
<style lang="less">
@import 'http://at.alicdn.com/t/font_1791493_ojt13vip9wl.css';
@import '../style/audi.less';

@white: #ffffff;
@black: #000000;
@activeColor: #cc0133;
@bg: #3a3a3a;

@shopcarH: 50px;

.page {
    height: 100%;
    overflow: auto;
}

.loading {
    position: relative;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: @white;
    z-index: 100;
}

.loading-box.ok {
    width: 100%;
    line-height: 30px;
    text-align: center;
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);

    .iconfont {
        position: relative;
        top: 5px;
        font-size: 60px;
        font-weight: normal;
    }

    .icon-xiaoxi-chenggong {
        color: @activeColor;
    }

    p {
        margin-bottom: 10px;
        /*font-weight: normal;*/
        text-align: left;
        padding: 0 15px;
        font-size: 14px;
        /*text-indent: 2rem;*/

        &:nth-child(1) {
            margin-bottom: 20px;
            text-align: center;
            padding: 0;
        }

        &:nth-child(1),
        &:nth-child(2) {
            text-indent: 0;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.logo {
    width: 100%;
    height: 50px;
    position: relative;
    position: absolute;
    overflow: hidden;
    z-index: 10;

    &.black {
        background-color: @black;
    }

    img {
        height: 20px;
    }

    .logo_text {
        float: left;
        margin: 15px 0 0 15px;
    }

    .logo_img {
        float: right;
        margin: 15px 15px 0 0;
    }
}
</style>