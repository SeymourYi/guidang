<!--
 * @Author: lsj shangjin.li@wonderit.cn
 * @Date: 2025-08-07 15:53:08
 * @LastEditors: lsj shangjin.li@wonderit.cn
 * @LastEditTime: 2025-08-08 09:26:28
 * @FilePath: /audi-mic-drinks-phone/src/views/order.vue
 * @Description: 餐饮点餐页面
-->
<template>
  <div class="order-page">
    
    
    <!-- 顶部导航栏 -->
     <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" width="300" height="200">
    </div>
    <!-- <div class="back-btn" @click="goBack" role="button" aria-label="返回上一页">
      <span class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path d="M15.5 19.5L8 12l7.5-7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="label">返回</span>
    </div> -->
    
  <div class="product-swiper">
    <div class="swiper-container product-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(p, idx) in products" :key="p.id">
          <div class="product-slide">
            <video v-if="p.video" class="product-cover" :src="p.video" autoplay loop muted playsinline webkit-playsinline></video>
            <img v-else class="product-cover" :src="p.image" :alt="p.name" />
            <!-- <div class="product-desc-card">
              <div class="desc-title">{{ p.name }}</div>
              <div class="desc-text">{{ p.description }}</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
<div class="orderbut" @click="addcar">
  <div class="orderbut-text">
    立即点单
  </div>

</div>
  <!-- 底部产品名称栏（包含所有产品，可点击切换，当前高亮） -->
  <div class="bottom-bar" role="contentinfo" aria-live="polite">
    <div class="bottom-bar__list" ref="bottomBarList">
      <div
        v-for="(p, idx) in products"
        :key="p.id"
        class="bottom-chip"
        :class="{ active: idx === activeProductIndex }"
        @click="selectProduct(idx)"
        role="button"
        :aria-current="idx === activeProductIndex ? 'true' : 'false'"
      >
        <span class="bottom-chip__name">{{ p.name }}</span>
      </div>
    </div>
  </div>
 
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  name: 'OrderPage',
  data() {
    return {
      logo: require('@/assets/svg/aito.svg'), // 确保路径正确
      cartItems: [], // 购物车商品
      // 样例商品数据（可自行扩展）
      products: [
        { id: 101, name: '经典拿铁', description: '双份特浓意式融合丝滑牛奶，入口香醇，回甘悠长。', price: '22.00', image: require('@/assets/img/tea.png'), video: require('@/assets/video/1.mp4') },
        { id: 102, name: '蜂蜜柠檬气泡水', description: '清爽气泡轻吻味蕾，柠檬与蜂蜜的酸甜恰到好处。', price: '16.00', image: require('@/assets/img/water.png'), video: require('@/assets/video/2.mp4') },
        { id: 103, name: '抹茶生乳卷', description: '日式抹茶遇上轻盈奶油，茶香清冽，绵软治愈。', price: '32.00', image: require('@/assets/img/snack.png'), video: require('@/assets/video/3.mp4') },
        { id: 104, name: '可可曲奇', description: '高可可含量巧克力碎，外脆内软，越嚼越香。', price: '12.00', image: require('@/assets/img/snack.png'), video: require('@/assets/video/4.mp4') },
        { id: 105, name: '西柚多多', description: '粉柚果香与多多酸甜交织，维C爆表元气满满。', price: '18.00', image: require('@/assets/img/drinks.png'), video: require('@/assets/video/5.mp4') }
      ],
      activeProductIndex: 0,
      productSwp: null,
             isCartVisible: false, // 控制购物车弹框显示
       categorySwp: null
    }
  },
  provide() {
    return {
      orderCategories: () => this.categories,
      addToCartFn: this.addToCart
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initProductSwiper();
      this.$nextTick(() => this.updateBottomBarScroll());
    });
    
    // 确保触摸事件正常工作
    this.$nextTick(() => {
      const container = document.querySelector('.product-swiper-container');
      if (container) {
        container.addEventListener('touchstart', (e) => {
          e.stopPropagation();
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
          e.stopPropagation();
        }, { passive: true });
      }
    });
  },
  activated() {
    // 组件被激活时重新初始化
    this.$nextTick(() => {
      if (!this.productSwp || this.productSwp.destroyed) {
        this.initProductSwiper();
        this.$nextTick(() => this.updateBottomBarScroll());
      }
    });
  },
  deactivated() {
    // 组件被缓存时清理资源
    this.destroySwipers();
  },
  methods: {

    
    goBack() {
      this.$router.go(-1)
    },
    goCategory(id) {
      if (this.activeCategory !== id) {
        this.$router.push({ name: 'order-category', params: { category: id }})
      }
    },
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      }
      this.$message.success('已添加到购物车')
    },
    async goToCheckout() {
      if (this.cartItems.length === 0) {
          this.$message.warning('请先选择商品')
        return
      }
      // 跳转到结算页面
      // this.$router.push('/ok')
      const cartItems = await this.cartItems.map(item => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image,
  

}));
      this.$router.push({
        name: 'orderPay',
       params: {
    cartItems: cartItems
  }
      })
    },
    addcar() {
      const current = this.activeProduct
      this.addToCart(current)
      this.animateAddToCart()
    },
    showcar() {
      this.isCartVisible = true;
    },
    closeCart() {
      this.isCartVisible = false;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      }
    },
    increaseQuantity(item) {
      item.quantity += 1;
    },
    animateAddToCart() {
      try {
        const imgEl = this.$el.querySelector('.product-swiper-container .swiper-slide-active .product-cover')
        const cartEl = this.$refs.cartIcon
        if (!imgEl || !cartEl) return this.pulseCart()

        const imgRect = imgEl.getBoundingClientRect()
        const cartRect = cartEl.getBoundingClientRect()

        const startX = imgRect.left + imgRect.width / 2
        const startY = imgRect.top + imgRect.height / 2
        const endX = cartRect.left + cartRect.width / 2
        const endY = cartRect.top + cartRect.height / 2

        const ball = document.createElement('div')
        ball.className = 'fly-ball'
        ball.style.left = startX + 'px'
        ball.style.top = startY + 'px'
        document.body.appendChild(ball)

        // 触发过渡
        requestAnimationFrame(() => {
          ball.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`
          ball.style.opacity = '0.2'
        })

        const cleanup = () => {
          ball.removeEventListener('transitionend', cleanup)
          if (ball && ball.parentNode) ball.parentNode.removeChild(ball)
          this.pulseCart()
        }
        ball.addEventListener('transitionend', cleanup)
      } catch (e) {
        this.pulseCart()
      }
    },
    pulseCart() {
      const icon = this.$refs.cartIcon
      if (!icon) return
      icon.classList.remove('pulse')
      // 强制重绘以便重新触发动画
      // eslint-disable-next-line no-unused-expressions
      void icon.offsetWidth
      icon.classList.add('pulse')
      setTimeout(() => icon.classList.remove('pulse'), 600)
    },
    destroySwipers() {
      // 停止所有视频播放
      if (this.productSwp && !this.productSwp.destroyed) {
        const videos = this.productSwp.el.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
          video.currentTime = 0;
        });
        
        // 销毁产品 Swiper 实例
        this.productSwp.destroy(true, true);
        this.productSwp = null;
      }
      
      // 销毁分类 Swiper 实例（如果存在）
      if (this.categorySwp && !this.categorySwp.destroyed) {
        this.categorySwp.destroy(true, true);
        this.categorySwp = null;
      }
      
      // 重置状态
      this.activeProductIndex = 0;
    },
    initProductSwiper() {
      // 防止重复初始化
      if (this.productSwp && !this.productSwp.destroyed) {
        this.destroySwipers();
      }
      
      // 确保DOM元素存在
      const container = document.querySelector('.product-swiper-container');
      if (!container) {
        console.warn('Swiper container not found');
        return;
      }
      
      // 调试触摸事件
      console.log('Initializing Swiper with touch support...');
      console.log('Container found:', container);
      console.log('Touch support:', 'ontouchstart' in window);
      
              try {
          this.productSwp = new Swiper('.product-swiper-container', {
            loop: true,
            speed: 700,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            allowTouchMove: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            touchMoveStopPropagation: false,
            resistanceRatio: 0.85,
            autoplay: { delay: 4500, disableOnInteraction: false },
            observer: true,
            observeParents: true,
            watchOverflow: true,
            preventClicks: false,
            preventClicksPropagation: false,
            on: {
              slideChange: () => {
                if (!this.productSwp || this.productSwp.destroyed) return
                this.activeProductIndex = this.productSwp.realIndex || 0
                this.$nextTick(() => this.updateBottomBarScroll())
              },
              touchStart: () => {
                console.log('Touch start detected');
              },
              touchMove: () => {
                console.log('Touch move detected');
              },
              touchEnd: () => {
                console.log('Touch end detected');
              }
            }
          })
      } catch (error) {
        console.error('Failed to initialize Swiper:', error);
      }
    },
    selectProduct(index) {
      try {
        if (!this.productSwp || this.productSwp.destroyed) {
          console.warn('Swiper not initialized');
          return;
        }
        
        if (typeof this.productSwp.slideToLoop === 'function') {
          this.productSwp.slideToLoop(index, 600)
        } else if (typeof this.productSwp.slideTo === 'function') {
          // +1 因为 loop 模式下存在克隆节点
          this.productSwp.slideTo(index + 1, 600)
        }
        this.activeProductIndex = index
        this.$nextTick(() => this.updateBottomBarScroll())
      } catch (e) {
        console.error('Error in selectProduct:', e);
      }
    },
    updateBottomBarScroll() {
      const list = this.$refs.bottomBarList
      if (!list) return
      const chips = list.querySelectorAll('.bottom-chip')
      const active = list.querySelector('.bottom-chip.active')
      if (!active) return
      // 若 active 不在可视区域内，则滚动到居中
      const listRect = list.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      if (activeRect.left < listRect.left || activeRect.right > listRect.right) {
        active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
      }
    }
  },
  computed: {
    activeCategory() {
      return this.$route.params.category || 'new'
    },
    activeProduct() {
      return this.products[this.activeProductIndex] || this.products[0]
    },
    cartTotal() {
      return this.cartItems.reduce((sum, item) => {
        const priceNumber = typeof item.price === 'string' ? parseFloat(item.price) : item.price
        return sum + priceNumber * item.quantity
      }, 0)
    },
    cartTotalFormatted() {
      return this.cartTotal.toFixed(2)
    },
    cartItemCount() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  beforeDestroy() {
    this.destroySwipers();
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('../assets/fonts/SourceHanSansCN-Regular.otf') format('opentype');
}


.order-page {
  height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  color: white;
}

.itemcarList {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  gap: 12px; /* 卡片之间留点间隔 */
  -webkit-overflow-scrolling: touch; /* 移动端流畅滚动 */
}
.itemcarList.empty { justify-content: center; }
.empty-tip { color: #9aa0a6; font-size: 14px; padding: 8px 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; }
.orderbut {
  position: absolute;
  bottom: 100px;
  left: 20%;
  display: flex;
  align-items: center;
  border-radius: 50px;
  justify-content: center;
  /* background: red; */
  border: 3px solid #fff;
  width: 60%;
  height: 80px;
  z-index: 1000;
}
/* 购物车横向卡片样式 */
.cart-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  flex: 0 0 auto;
  min-width: 220px;
}
.chip-img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
}
.chip-info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.chip-name { font-size: 14px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.chip-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
.chip-price { font-size: 14px; font-weight: 700; color: #ffdd66; }
.chip-qty { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; padding: 2px 6px; }
.qty-btn { width: 22px; height: 22px; border: none; border-radius: 50%; background: #fff; color: #000; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.qty-num { min-width: 16px; text-align: center; font-size: 12px; }
.orderbut-text {
  font-size: 35px;
  font-family: 'SourceHanSansCN-Regular';
  font-weight: bold;
}
/* 顶部导航栏 */
.header {
  background: #2a2a2a;
  padding: 10px 15px;
  border-bottom: 1px solid #333;
}

.header-top {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.maincontain{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.logo {
  width: 100%;
  /* position: absolute; */
  z-index: 100;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
.back-btn {
  position: absolute;
  top: 18px;
  left: 16px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px 0 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  color: #fff;
  cursor: pointer;
  z-index: 2000;
  backdrop-filter: blur(8px);
  transition: background 0.25s ease, transform 0.2s ease;
}
.back-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
.back-btn:active { transform: translateY(0); }
.back-btn .icon { display: inline-flex; width: 38px; height: 38px; align-items: center; justify-content: center; }
.back-btn .label { font-size: 24px; font-weight: 600; letter-spacing: 1px; }

.search-box {
  flex: 1;
  margin: 0 15px;
  background: #333;
  border-radius: 20px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
}

.search-box input {
  background: none;
  border: none;
  color: white;
  margin-left: 8px;
  flex: 1;
  outline: none;
}

.search-box input::placeholder {
  color: #999;
}

.profile-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.store-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}



/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧分类菜单 */
.category-sidebar {
  width: 80px;
  background: #2a2a2a;
  overflow-y: auto;
}

.category-item {
  padding: 15px 10px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #333;
  transition: all 0.3s;
}

.category-item:hover {
  background: #333;
}

.category-item.active {
  background: #000;
  border-left: 3px solid #e74c3c;
}

.category-item i {
  display: block;
  font-size: 20px;
  margin-bottom: 5px;
  color: #e74c3c;
}

.category-item span {
  font-size: 12px;
  display: block;
}

/* 右侧商品列表 */
.product-list {
  flex: 1;
  background: #1a1a1a;
  overflow-y: auto;
  padding: 15px;
}

.category-section {
  margin-bottom: 20px;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #fff;
}

.product-item {
  display: flex;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  line-height: 1.4;
}

.product-price {
  font-size: 16px;
  color: #e74c3c;
  font-weight: bold;
}

.add-to-cart {
  width: 40px;
  height: 40px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart:hover {
  background: #c0392b;
}

.add-to-cart i {
  color: white;
  font-size: 18px;
}

/* 底部购物车 */
.cart-bar {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
}

.cart-info {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
}

.cart-info i {
  margin-right: 2px;
  font-size: 18px;
}

.checkout-btn {
  background: #ffffff;
  color: #000000;
  padding: 10px 26px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.checkout-btn:hover {
  background: #000000;
  color: #ffffff;
}

/* 底部合计价格胶囊样式 */
.cart-total {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
}
.cart-total.disabled { opacity: 0.6; }
.total-label { font-size: 13px; color: #cfcfcf; }
.total-currency { font-size: 16px; font-weight: 700; color: #ffdd66; }
.total-amount { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
.total-count { font-size: 12px; color: #cfcfcf; }

/* 底部产品名称栏 */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1600;
  display: block;
  padding: 16px 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255,255,255,0.1);
}
.bottom-bar__list { display: flex; overflow-x: auto; gap: 16px; padding: 0 18px; scrollbar-width: none; }
.bottom-bar__list::-webkit-scrollbar { display: none; }
.bottom-chip { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 12px; padding: 14px 20px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; transition: transform .2s ease, background .2s ease; }
.bottom-chip:hover { transform: translateY(-1px); background: rgba(255,255,255,0.1); }
.bottom-chip.active { background: #ffffff; color: #000; border-color: #ffffff; }
.bottom-chip__name { font-size: 18px; font-weight: 700; white-space: nowrap; }

/* 滚动条样式 */
.category-sidebar::-webkit-scrollbar,
.product-list::-webkit-scrollbar {
  width: 4px;
}

.category-sidebar::-webkit-scrollbar-track,
.product-list::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.category-sidebar::-webkit-scrollbar-thumb,
.product-list::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

.category-sidebar::-webkit-scrollbar-thumb:hover,
.product-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 购物车弹框样式 */
/* 产品横滑区域 */
.product-swiper { width: 100%; height: calc(100vh - 80px); position: relative; flex: 1; }
.product-swiper-container { 
  width: 100%; 
  height: 100%; 
  touch-action: pan-y pinch-zoom;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.product-swiper .swiper-slide { 
  height: 100%; 
  touch-action: pan-y pinch-zoom;
}
.product-slide { position: relative; width: 100%; height: 100%; overflow: hidden; }
.product-cover { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display: block; 
  filter: brightness(0.92);
  pointer-events: none;
}

/* 顶部产品名展示 */
.product-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  z-index: 5;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.product-name {
  font-size: 22px;
  letter-spacing: 2px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(6px);
}

/* 底部介绍卡片 */
.product-desc-card {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 200px;
  width: min(86%, 760px);
  padding: 18px 20px 20px;
  font-family: 'SourceHanSansCN-Regular';
  /* border-radius: 16px; */
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
}
.product-desc-card .desc-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; font-family: 'SourceHanSansCN-Regular'; }
.product-desc-card .desc-text { font-size: 14px; color: #EAEAEA; line-height: 1.7; font-family: 'SourceHanSansCN-Regular'; }
.product-desc-card .desc-price { margin-top: 10px; font-size: 18px; color: #ffdd66; font-weight: 700; font-family: 'SourceHanSansCN-Regular'; }

.cart-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(32,32,32,0.85);
  backdrop-filter: blur(12px);
  color: white;
  border-top: 1px solid rgba(255,255,255,0.1);
  max-height: 50%;
  overflow-y: auto;
  z-index: 1000;
  animation: slide-up 0.3s ease-out;
}

.cart-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #333;
}

.cart-popup-body {
  padding: 15px;
}

.empty-cart {
  text-align: center;
  color: #999;
}

.cart-item {
  display: flex;
  margin-bottom: 15px;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.cart-item-quantity,
.cart-item-price {
  font-size: 14px;
  color: #999;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-actions button {
  width: 30px;
  height: 30px;
  border: none;
  background-color: #e74c3c;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  transition: background-color 0.3s;
} 


.cart-item-actions button:hover {
  background-color: #ddd;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* 加入购物车飞球与脉冲动画 */
.fly-ball {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffdd66;
  box-shadow: 0 4px 12px rgba(255, 221, 102, 0.6);
  pointer-events: none;
  transform: translate(0, 0) scale(1);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
  z-index: 3000;
}

.pulse { animation: pulseScale 0.6s ease; }
@keyframes pulseScale {
  0% { transform: scale(1); }
  40% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
</style>