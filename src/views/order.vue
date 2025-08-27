<!--
 * @Author: lsj shangjin.li@wonderit.cn
 * @Date: 2025-08-07 15:53:08
 * @LastEditors: lsj shangjin.li@wonderit.cn
 * @LastEditTime: 2025-08-22 16:12:54
 * @FilePath: /audi-mic-drinks-phone/src/views/order.vue
 * @Description: 餐饮点餐页面
-->
<template>
  <div class="order-page">
    <!-- 加载状态 -->
    <!-- <div v-if="!isResourcesLoaded" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在加载产品资源...</div>
        <div class="loading-progress">
          <div class="progress-bar" :style="{ width: loadingProgress + '%' }"></div>
        </div>
      </div>
    </div> -->
    
    <!-- 顶部导航栏 -->
     <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" width="300" height="40">
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
            <video v-if="p.video" class="product-cover" :src="p.video" autoplay muted playsinline webkit-playsinline></video>
            <img v-else class="product-cover" :src="p.image" :alt="p.name" />
           
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
  <!-- 底部导航栏：返回、产品名称、购物车 -->
  <div class="bottom-bar" role="contentinfo" aria-live="polite">
    <!-- 返回按钮 -->
    <div class="bottom-nav-btn-back" @click="goBack">
      <span class="nav-icon">
        <svg viewBox="0 0 24 24" width="38" height="38">
          <path d="M15.5 19.5L8 12l7.5-7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      返回
    </div>
    
    <!-- 产品名称列表 -->
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
       <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img :src="require(`@/assets/svg/${p.svgname}${idx === activeProductIndex ? '_black' : ''}.svg`)" class="svgclass" width="60" height="60">
            </div>
        <span class="bottom-chip__name">{{ p.name }}</span>
      </div>
    </div>
    
    <!-- 购物车按钮 -->
    <div class="bottom-nav-btn"  ref="cartIcon">
    <!-- <div class="bottom-nav-btn" @click="showcar" ref="cartIcon"> -->
      <span class="nav-icon">
     <svg class="prefix__icon" fill="#fff" viewBox="0 0 1028 1024" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path d="M332.8 790.528q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zm425.984 2.048q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zm172.032-581.632q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832T839.68 578.56h-537.6l14.336 92.16h517.12q49.152 0 49.152 41.984 0 20.48-9.728 35.84t-38.4 14.336H297.984q-20.48 0-34.304-9.216T240.64 729.6t-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696T200.192 576t-14.848-78.848T168.96 409.6q-19.456-103.424-44.032-230.4h-76.8q-15.36 0-25.6-7.68T5.632 153.088t-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792T45.056 61.44H148.48q20.48 0 32.768 6.144t19.456 15.36 10.24 18.944 5.12 16.896q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912h700.416zm-37.888 91.136l-641.024-2.048 35.84 185.344 535.552 1.024z"/>
      </svg>
      </span>
      <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
    </div>
  </div>

  <!-- 购物车弹框 -->
  <div v-if="isCartVisible" class="overlay" @click="closeCart"></div>
  <div v-if="isCartVisible" class="cart-popup">
    <div class="cart-popup-header">
      <h3>购物车</h3>
      <button @click="closeCart" class="close-btn">×</button>
    </div>
    <div class="cart-popup-body">
      <div v-if="cartItems.length === 0" class="empty-cart">
        购物车是空的
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image">
          <div class="cart-item-info">
            <div class="cart-item-name">{{ item.name }}</div>
            <div class="cart-item-price">¥{{ item.price }}</div>
          </div>
          <div class="cart-item-actions">
            <button @click="decreaseQuantity(item)">-</button>
            <span class="cart-item-quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
        </div>
        <div class="cart-total-section">
          <div class="cart-total-price">总计: ¥{{ cartTotalFormatted }}</div>
          <button @click="goToCheckout" class="checkout-btn">去结算</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 自定义通知组件 -->
  <div class="notifications-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['custom-notification', notification.type, { visible: notification.visible }]"
      @click="removeNotification(notification.id)"
    >
      <div class="notification-content">
        <div class="notification-icon">
          <span v-if="notification.type === 'success'">✅</span>
          <span v-else-if="notification.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="notification-message">{{ notification.message }}</div>
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
        { id: 101,svgname:'kafei', name: '咖啡', description: '双份特浓意式融合丝滑牛奶，入口香醇，回甘悠长。', price: '22.00', image: require('@/assets/img/tea.png'), video: require('@/assets/video/6.mp4') },
        { id: 102,svgname:'cola', name: '可乐', description: '清爽气泡轻吻味蕾，柠檬与蜂蜜的酸甜恰到好处。', price: '16.00', image: require('@/assets/img/water.png'), video: require('@/assets/video/4.mp4') },
        { id: 103,svgname:'drink', name: '果汁', description: '日式抹茶遇上轻盈奶油，茶香清冽，绵软治愈。', price: '32.00', image: require('@/assets/img/snack.png'), video: require('@/assets/video/5.mp4') },
        { id: 104,svgname:'binggan', name: '饼干', description: '高可可含量巧克力碎，外脆内软，越嚼越香。', price: '12.00', image: require('@/assets/img/snack.png'), video: require('@/assets/video/2.mp4') },
        { id: 105,svgname:'mianbao', name: '面包', description: '粉柚果香与多多酸甜交织，维C爆表元气满满。', price: '18.00', image: require('@/assets/img/drinks.png'), video: require('@/assets/video/3.mp4') },
        { id: 106,svgname:'jianguo', name: '坚果', description: '粉柚果香与多多酸甜交织，维C爆表元气满满。', price: '18.00', image: require('@/assets/img/drinks.png'), video: require('@/assets/video/1.mp4') }
      ],
      timeoutId : null,
      activeProductIndex: 0,
      productSwp: null,
      isCartVisible: false, // 控制购物车弹框显示
      categorySwp: null,
      isResourcesLoaded: false,
      loadingProgress: 0,
      autoPlayTimer: null,
      imageTimer: null,
      lastRealIndex: -1,
      notifications: [] // 自定义通知列表
    }
  },
  provide() {
    return {
      orderCategories: () => this.categories,
      addToCartFn: this.addToCart
    }
  },
  beforeUnmount() {
    // 清除事件监听，使用箭头函数确保正确的this上下文
    window.removeEventListener('mousemove', () => this.resetTimer());
    window.removeEventListener('keydown', () => this.resetTimer());
    window.removeEventListener('touchstart', () => this.resetTimer());
  },
  mounted() {
  
    this.$nextTick(() => {
      this.preloadResources().then(() => {
        this.initProductSwiper();
        // 确保初始状态下选中项居中
        this.$nextTick(() => {
          this.updateBottomBarScroll();
          // 再次确保居中效果
          setTimeout(() => this.updateBottomBarScroll(), 100);
        });
      }).catch((error) => {
        console.warn('Resource preload failed, initializing anyway:', error);
        this.initProductSwiper();
        this.$nextTick(() => {
          this.updateBottomBarScroll();
          setTimeout(() => this.updateBottomBarScroll(), 100);
        });
      });
    });
  console.log('Component mounted, adding event listeners.');
  this.resetTimer();
  window.addEventListener('mousemove', () => this.resetTimer());
  window.addEventListener('keydown', () => this.resetTimer());
  window.addEventListener('touchstart', () => this.resetTimer());
  },
  activated() {
    // 组件被激活时重新初始化
    this.$nextTick(() => {
      if (!this.productSwp || this.productSwp.destroyed) {
        if (this.isResourcesLoaded) {
          this.initProductSwiper();
          this.$nextTick(() => {
            this.updateBottomBarScroll();
            setTimeout(() => this.updateBottomBarScroll(), 100);
          });
        } else {
          this.preloadResources().then(() => {
            this.initProductSwiper();
            this.$nextTick(() => {
              this.updateBottomBarScroll();
              setTimeout(() => this.updateBottomBarScroll(), 100);
            });
          }).catch(() => {
            this.initProductSwiper();
            this.$nextTick(() => {
              this.updateBottomBarScroll();
              setTimeout(() => this.updateBottomBarScroll(), 100);
            });
          });
        }
      } else {
        // 如果swiper已存在，确保选中项居中
        this.$nextTick(() => this.updateBottomBarScroll());
      }
    });
  },
  deactivated() {
    // 组件被缓存时清理资源
    this.destroySwipers();
  },
  methods: {
    async preloadResources() {
      const promises = [];
      let loadedCount = 0;
      const totalResources = this.products.length * 2; // video + image for each product
      
      this.products.forEach((product) => {
        // 预加载视频
        if (product.video) {
          const videoPromise = new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadeddata = () => {
              loadedCount++;
              this.loadingProgress = (loadedCount / totalResources) * 100;
              resolve();
            };
            video.onerror = () => {
              loadedCount++;
              this.loadingProgress = (loadedCount / totalResources) * 100;
              resolve(); // 即使失败也继续
            };
            video.src = product.video;
          });
          promises.push(videoPromise);
        }
        
        // 预加载图片
        if (product.image) {
          const imagePromise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              this.loadingProgress = (loadedCount / totalResources) * 100;
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              this.loadingProgress = (loadedCount / totalResources) * 100;
              resolve(); // 即使失败也继续
            };
            img.src = product.image;
          });
          promises.push(imagePromise);
        }
      });
      
      try {
        await Promise.all(promises);
        this.isResourcesLoaded = true;
        console.log('All product resources preloaded successfully');
      } catch (error) {
        console.warn('Some resources failed to preload:', error);
        this.isResourcesLoaded = true; // 即使部分失败也继续
      }
    },
   resetTimer () {
    console.log('resetTimer called');
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // 2 秒无操作返回首页
    this.timeoutId = setTimeout(() => {
      console.log('No activity detected, would navigate back now.');
      this.$router.push('/');
    }, 500000);
  },
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
      this.showNotification('已添加到购物车')
    },
    async goToCheckout() {
      if (this.cartItems.length === 0) {
          this.showNotification('请先选择商品 🛒', 'warning')
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
      // 清除所有定时器
      clearTimeout(this.autoPlayTimer);
      clearTimeout(this.imageTimer);
      this.autoPlayTimer = null;
      this.imageTimer = null;
      
      // 停止所有视频播放
      if (this.productSwp && !this.productSwp.destroyed) {
        const videos = this.productSwp.el.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
          video.currentTime = 0;
          video.onended = null; // 清除事件监听
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
      this.lastRealIndex = -1;
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
      
      const that = this;
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
          // autoplay: { delay: 4500, disableOnInteraction: false }, // 移除固定时间自动播放，改为视频播放结束后切换
          observer: true,
          observeParents: true,
          watchOverflow: true,
          preventClicks: false,
          preventClicksPropagation: false,
          on: {
            slideChangeTransitionStart: function() {
              // 清除所有计时器
              clearTimeout(that.autoPlayTimer);
              clearTimeout(that.imageTimer);
              
              // 重置非当前视频
              const currentSlide = this.slides[this.previousIndex];
              if (currentSlide) {
                const currentVideo = currentSlide.querySelector('video');
                if (currentVideo) {
                  currentVideo.pause();
                  currentVideo.currentTime = 0;
                }
              }
            },
            slideChangeTransitionEnd: function() {
              if (!that.productSwp || that.productSwp.destroyed) return;
              
              // 获取真实索引（排除克隆节点）
              const realIndex = this.realIndex;
              that.activeProductIndex = realIndex;
              that.$nextTick(() => that.updateBottomBarScroll());
              
              // 相同媒体不处理
              if (realIndex === that.lastRealIndex) return;
              
              const activeSlide = this.slides[this.activeIndex];
              if (!activeSlide) return;
              
              const activeVideo = activeSlide.querySelector('video');
              const activeImage = activeSlide.querySelector('img');
              
              if (activeVideo) {
                // 视频播放逻辑
                activeVideo.onended = () => {
                  that.handleAutoSlide();
                };
                
                activeVideo.play().catch(error => {
                  console.error('播放失败自动切换:', error);
                  that.handleAutoSlide();
                });
              } else if (activeImage) {
                // 图片显示10秒后切换
                that.imageTimer = setTimeout(() => {
                  that.handleAutoSlide();
                }, 10000); // 10秒
              }
              
              that.lastRealIndex = realIndex;
            },
            init: function() {
              // 初始化首屏播放
              const firstSlide = this.slides[this.activeIndex];
              if (!firstSlide) return;
              
              const firstVideo = firstSlide.querySelector('video');
              const firstImage = firstSlide.querySelector('img');
              
              if (firstVideo) {
                firstVideo.play();
                firstVideo.onended = () => that.handleAutoSlide();
              } else if (firstImage) {
                // 图片显示10秒后切换
                that.imageTimer = setTimeout(() => {
                  that.handleAutoSlide();
                }, 10000); // 10秒
              }
              
              that.lastRealIndex = this.realIndex;
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
      const active = list.querySelector('.bottom-chip.active')
      if (!active) return
      
      // 总是将选中的元素滚动到中间，提供更好的用户体验
      active.scrollIntoView({ 
        inline: 'center', 
        block: 'nearest', 
        behavior: 'smooth' 
      })
      
      // 额外确保居中效果，使用原生滚动方法作为备选
      try {
        const listRect = list.getBoundingClientRect()
        const activeRect = active.getBoundingClientRect()
        const listCenter = listRect.left + listRect.width / 2
        const activeCenter = activeRect.left + activeRect.width / 2
        const scrollOffset = activeCenter - listCenter
        
        if (Math.abs(scrollOffset) > 5) { // 只有在需要调整时才滚动
          list.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
          })
        }
      } catch (e) {
        console.warn('Fallback scroll failed:', e)
      }
    },
    handleAutoSlide() {
      // 延迟切换避免冲突
      this.autoPlayTimer = setTimeout(() => {
        if (this.productSwp && !this.productSwp.destroyed) {
          this.productSwp.slideNext();
        }
      }, 500); // 添加适当过渡延迟
    },
    showNotification(message, type = 'success') {
      const id = Date.now();
      const notification = {
        id,
        message,
        type,
        visible: true
      };
      
      this.notifications.push(notification);
      
      // 3秒后自动移除通知
      setTimeout(() => {
        this.removeNotification(id);
      }, 3000);
    },
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications[index].visible = false;
        // 动画完成后真正移除
        setTimeout(() => {
          this.notifications.splice(index, 1);
        }, 300);
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
  watch: {
    activeProductIndex: {
      handler() {
        // 当活动产品索引改变时，自动滚动到中间
        this.$nextTick(() => {
          this.updateBottomBarScroll()
        })
      },
      immediate: true
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
/* 加载状态样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  font-size: 16px;
  margin-bottom: 20px;
  font-family: 'SourceHanSansCN-Regular';
}

.loading-progress {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #fff, #ebebeb);
  border-radius: 2px;
  transition: width 0.3s ease;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  bottom: 250px;
  left: 20%;
  display: flex;
  align-items: center;
  /* border-radius: 50px; */
  justify-content: center;
  /* background: red; */
  border: 1px solid #fff;
  width: 60%;
  height: 80px;
  z-index: 1000;
  cursor: pointer;
  /* transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); */
  /* background: rgba(255, 255, 255, 0.1); */
  /* backdrop-filter: blur(10px); */
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); */
}

.orderbut:hover {
  transform: translateY(-2px) scale(1.02);
  /* border-color: #ffdd66; */
  /* background: rgba(255, 221, 102, 0.15); */
  box-shadow: 0 12px 40px rgba(255, 221, 102, 0.25);
}

.orderbut:active {
  transform: translateY(0) scale(0.98);
  animation: orderButtonPulse 0.6s ease-out;
}

@keyframes orderButtonPulse {
  0% {
    transform: scale(0.98);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  30% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 221, 102, 0.3), 0 0 0 20px rgba(255, 221, 102, 0.1);
  }
  60% {
    transform: scale(1.02);
    box-shadow: 0 0 0 15px rgba(255, 221, 102, 0.2), 0 0 0 30px rgba(255, 221, 102, 0.05);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 12px 40px rgba(255, 221, 102, 0.25);
  }
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
  font-size: 40px;
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
  position: absolute;
  z-index: 100;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.back-btn {
  position: absolute;
  top: 18px;
  left: 16px;
  height: 50px;
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
  /* border-radius: 8px; */
  padding: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  /* border-radius: 8px; */
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

/* 底部导航栏 */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1600;
  display: flex;
  align-items: center;
  padding: 30px;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(12px);
  border-top: 1.5px solid rgba(255,255,255,0.1);
  min-height: 120px;
}

/* 左右导航按钮 */
.bottom-nav-btn {
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.12);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-left: 10px;
  border: 1.5px solid rgba(255,255,255,0.2);
}
.bottom-nav-btn-back {
  font-size: 36px;
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  background: rgba(255,255,255,0.12);
  color: #fff;
  cursor: pointer;
  border: 1.5px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  position: relative;
  margin-right: 15px;
}

.bottom-nav-btn:hover {
  background: rgba(255,255,255,0.15);
  transform: translateY(-2px);
}

.bottom-nav-btn .nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.svgclass{
  color: #000 !important;
}
/* 购物车数量徽章 */
.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 24px;
  height: 24px;
  background: #ff4757;
  color: #fff;
  border-radius: 12px;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 2px solid rgba(0,0,0,0.55);
}

/* 中间产品名称列表 */
.bottom-bar__list { 
  flex: 1;
  display: flex; 
  overflow-x: auto; 
  /* gap: 12px;  */
  padding: 0 12px;
  scrollbar-width: none;
  justify-content: flex-start;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.bottom-bar__list::-webkit-scrollbar { display: none; }
.bottom-bar__list > .bottom-chip:first-child { margin-left: 4px; }
.bottom-bar__list > .bottom-chip:last-child { margin-right: 4px; }
.bottom-chip { 
  flex: 0 0 auto; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 12px; 
  margin-right: 30px;
  padding: 12px; 
  width: 130px;
  height: 130px;
  justify-content: center;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.12);
  color: #fff; 
  cursor: pointer; 
  transition: all 0.3s ease;
  scroll-snap-align: center;
}
.bottom-chip:hover { 
  transform: translateY(-2px); 
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.3);
}
.bottom-chip.active { 
  background: #ffffff; 
  color: #000; 
  border-color: #ffffff; 
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.bottom-chip__name { 
  font-size: 30px; 
  font-weight: 500; 
  white-space: nowrap; 
  text-align: center; 
  width: 100%;
}

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
}

.category-sidebar::-webkit-scrollbar-thumb:hover,
.product-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 购物车弹框样式 */
/* 产品横滑区域 */
.product-swiper { width: 100%; height: calc(100vh - 80px); position: relative; flex: 1; }
.product-swiper-container { width: 100%; height: 100%; }
.product-swiper .swiper-slide { height: 100%; }
.product-slide { position: relative; width: 100%; height: 100%; overflow: hidden; }
.product-cover { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.92); }

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
  z-index: 2000;
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

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cart-total-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-total-price {
  font-size: 18px;
  font-weight: bold;
  color: #ffdd66;
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
  z-index: 1900;
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

/* 禁止页面内文字被选中和长按弹出菜单（iOS） */
.order-page, .order-page * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* 自定义通知样式 */
.notifications-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
  align-items: center;
}

.custom-notification {
  min-width: 260px;
  max-width: 90vw;
  padding: 16px 20px;
  background: rgba(28, 28, 30, 0.86);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: none;
  border-radius: 18px;
  color: #ffffff;
  font-family: 'SourceHanSansCN-Regular';
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 0.25s ease, opacity 0.25s ease;
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 金色装饰元素 */
.custom-notification::before { display: none; }

.custom-notification::after { display: none; }

.custom-notification.visible {
  transform: translateY(0);
  opacity: 1;
}



.notification-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: auto;
  text-align: left;
  z-index: 2;
  position: relative;
}

.notification-icon { display: none; }

.notification-message {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.5;
  word-wrap: break-word;
  max-width: 100%;
  text-shadow: none;
  letter-spacing: 0.2px;
}

.custom-notification:hover {
  transform: translateY(-2px);
}

.custom-notification:hover::before,
.custom-notification:hover::after {
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
}

/* 适配移动端 */
@media (max-width: 768px) {
  .notifications-container {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .custom-notification {
    min-width: 240px;
    max-width: 92vw;
    padding: 14px 16px;
  }
  
  .notification-icon { display: none; }
  
  .notification-message {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.1px;
  }
}
</style>