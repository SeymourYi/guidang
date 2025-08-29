<template>
  <div class="imgSwiper">

    
    <!-- <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" width="300" height="40">
    </div> -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <video src="https://hima.auto/dam/hima-site/cn/wenjie/m7-ultra/new/images/appearance/m7-ultra-id-video-xs.mp4" 
             alt="Slide 1" 
            autoplay
            playsinline
            muted
            webkit-playsinline
            loop
            style="width:100%; height:100%; object-fit: cover; object-position: 75% center;"
/>
        </div>
      </div>
    </div>
     <div class="button_row">
      <div class="bottom-tab-bar">
       <div class="tab-container">
         <div class="tab-container-inner">
          <div 
           v-for="(area, index) in areas.slice(0,2)" 
           :key="area.id"
           class="tab-item"
           @click="goToArea(index)"
         >
         <video 
         :src="area.video" 
             alt="Slide 1" 
            autoplay
            playsinline
            muted
            webkit-playsinline
            loop
            class="tab-item-video"
            style="width:100%; height:100%; object-fit: cover; object-position: 75% center;"
/>
 <div class="tab-item-content">
           {{ area.name }}
            <div class="disc">{{ area.disc }} ></div>
            </div>
         </div>
        </div>
       </div>
     </div>
      <div class="bottom-tab-bar">
       <div class="tab-container">
       <div class="tab-container-inner">
          <div 
           v-for="(area, index) in areas.slice(2,4)" 
           :key="area.id"
           class="tab-item_active"
           @click="goToArea(index+2)"
         >
         <video 
         :src="area.video" 
             alt="Slide 1" 
            autoplay
            playsinline
            muted
            webkit-playsinline
            loop
            class="tab-item-video"
            style="width:100%; height:100%; object-fit: cover; object-position: 75% center;"
/>
 <div class="tab-item-content">
           {{ area.name }}
            <div class="disc">{{ area.disc }} ></div>
            </div>
         </div>
        </div>
       </div>
     </div>
        <div class="bottom-tab-bar">
       <div class="tab-container">
        <div class="tab-container-inner">
          <div 
           v-for="(area, index) in areas.slice(4,6)" 
           :key="area.id"
           class="tab-item"
           @click="goToArea(index+4)"
         >
         <video 
         :src="area.video" 
             alt="Slide 1" 
            autoplay
            playsinline
            muted
            webkit-playsinline
            loop
            class="tab-item-video"
            style="width:100%; height:100%; object-fit: cover; object-position: 75% center;"
/>
 <div class="tab-item-content">
           {{ area.name }}
            <div class="disc">{{ area.disc }} ></div>
            </div>
         </div>
        </div>
       </div>
     </div>
     </div>
   
   
  </div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/css/swiper.min.css';
import videoB from '../assets/home.mp4';
import m8 from '../assets/m8-mob.png';

export default {
  data() {
    return {
      logo: require('@/assets/svg/aito.svg'), // 确保路径正确
      areas: [
        { 
          id: 'bar', 
          name: '吧台', 
          route: '/order',
          disc: '饮品小吃服务',
          video:require('@/assets/video/anniu_batai.mp4'),
          // video: "https://video-qn.ibaotu.com/22/08/26/ing/video/ING_VID_5352903.mp4"
        },
        { 
          id: 'massage', 
          name: '按摩室', 
          route: '/massage',
          disc: '预约按摩服务',
          video:require('@/assets/video/anniu_anmo.mp4'),
          
          // video: "https://video-qn.ibaotu.com/22/08/26/ing/video/ING_VID_5352903.mp4"
        },
        { 
          id: 'restaurant', 
          name: '餐厅',
          route: '/restaurant',
          disc: '预约餐饮服务',
          video:require('@/assets/video/anniu_wucan.mp4'),

          // video: "https://video-qn.ibaotu.com/preview/yayv/v1/23/11/22/63dfdf5046ba45fb88b80d419a865c44.mp4"
        },
        { 
          id: 'baby', 
          name: '母婴室', 
          route: '/baby',
          disc: '母婴设施使用',
          video:require('@/assets/video/anniu_muying.mp4'),

          // video: "https://video-qn.ibaotu.com/19/87/61/73h888piCvGB.mp4"
        },
        { 
          id: 'parking', 
          name: '停车场', 
          route: '/parking',
          disc: '预约停车时段',
          video:require('@/assets/video/anniu_tingchechang.mp4'),

          // video: "https://video-qn.ibaotu.com/01/81/43/09s888piCmDY.mp4"
        },
        { 
          id: 'children', 
          name: '儿童室', 
          route: '/children',
          disc: '儿童游乐设施',
          video:require('@/assets/video/anniu_ertong.mp4'),

          // video: "https://video-qn.ibaotu.com/12/50/17/06apkijf6.mp4"
        }
      ],
      currentAreaIndex: 0,
      mediaArr: [
        { type: 'video', src: videoB },
        { type: 'image', src: m8, alt: 'm8' }
      ],
      swp: null,
      lastRealIndex: -1,
      autoPlayTimer: null,
      imageTimer: null,

    };
  },
  computed: {
    currentArea() {
      return this.areas[this.currentAreaIndex] || this.areas[0];
    }
  },
  components: {
  },
  mounted() {
    // 页面加载完成
    console.log('Home video path:', this.home);
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
  activated() {
    // 组件被激活时重新初始化
    this.$nextTick(() => {
      if (!this.swp || this.swp.destroyed) {
        this.initSwiper();
      }
    });
  },
  deactivated() {
    // 组件被缓存时清理资源
    this.destroySwiper();
  },
  methods: {
    initSwiper() {
      // 防止重复初始化
      if (this.swp && !this.swp.destroyed) {
        this.destroySwiper();
      }
      
      // 确保DOM容器存在
      const container = document.querySelector('.swiper-container');
      if (!container) {
        console.warn('Swiper container not found, retrying...');
        setTimeout(() => this.initSwiper(), 100);
        return;
      }
      
      const that = this;
      try {
        this.swp = new Swiper('.swiper-container', {
          speed: 800,
          loop: true, // 启用循环模式
          observer: true,
          observeParents: true,
          touchRatio: 1,
          touchAngle: 45,
          touchMoveStopPropagation: false,
          resistanceRatio: 0.85,
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
            // 获取真实索引（排除克隆节点）
            const realIndex = this.realIndex;
            
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
      });
      } catch (error) {
        console.error('Failed to initialize Swiper:', error);
        // 重试一次
        setTimeout(() => this.initSwiper(), 500);
      }
    },

    handleAutoSlide() {
      // 延迟切换避免冲突
      this.autoPlayTimer = setTimeout(() => {
        if (this.swp && !this.swp.destroyed) {
          this.swp.slideNext();
        }
      }, 500); // 添加适当过渡延迟
    },

    destroySwiper() {
      // 清除所有定时器
      clearTimeout(this.autoPlayTimer);
      clearTimeout(this.imageTimer);
      this.autoPlayTimer = null;
      this.imageTimer = null;
      
      // 停止所有视频播放
      if (this.swp && !this.swp.destroyed) {
        const videos = this.swp.el.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
          video.currentTime = 0;
          video.onended = null;
        });
        
        // 销毁 Swiper 实例
        this.swp.destroy(true, true);
        this.swp = null;
      }
      
      // 重置状态
      this.lastRealIndex = -1;
    },

    handleAreaClick(area) {
      // 处理区域按钮点击事件
      console.log(`${area.name}按钮被点击`);
      // 跳转到对应区域页面
      this.$router.push(area.route);
    },
    
    goToArea(index) {
      // 直接跳转到对应区域页面
      const area = this.areas[index];
      if (area) {
        this.$router.push(area.route);
      }
    }
  },
  beforeDestroy() {
    // 组件销毁时清理资源
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('../assets/fonts/SourceHanSansCN-Regular.otf') format('opentype');
}

.imgSwiper {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.tab-item-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;         /* 铺满容器 */
  object-position: 75% center; /* 视频偏右显示 */
  z-index: 1;                /* 放在文字下层 */
}
.button_row{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
   /* border: 2px solid rgb(191, 191, 201);  */
  height: 100px;
  width:100%;
  align-items: center;
  z-index: 100;
  /* 脱离文档流，不占据位置 */
  position: absolute;
  /* 可选：设置位置，默认会在原来的位置 */
  top: 55vh;
  /* left: 0; */
}
.svgclass{
  color: white;
  
}
.disc{
  position: relative;
  font-size: 20px;
  color: #ffffff;
  margin-top: 5px;
  font-family: 'SourceHanSansCN-Regular';
}
.orderbut1 {
  width: 300px;
  height: 80px;
  /* background-color: #fff; */
  color: #ebebeb;
  font-size: 20px;
  border: 3px solid #ebebeb;
  font-weight: bold;
  /* border-radius: 10px; */
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 30px;
  font-family: 'SourceHanSansCN-Regular';
}
.orderbut {
  width: 300px;
  height: 100px;
  background-color: #ebebeb;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50px;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
    font-family: 'SourceHanSansCN-Regular';
}
.logo {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.button_row{
  display: flex;
  flex-direction: column;
}

.background-video {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.background-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
  display: block;
}

.order-button {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #000;
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  z-index: 200;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  white-space: nowrap;
  text-align: center;
  min-width: 120px;
}

/* .order-button:hover {
  background: #f5f5f5;
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.order-button:active {
  transform: translateX(-50%) translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
} */

/* 底部选择栏样式 */
.bottom-tab-bar {
 margin-bottom: 120px;
  background: transparent;
  padding: 0 10px;
  z-index: 150;
  pointer-events: none;
}

.tab-container {
  display: flex;
  gap: 300px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  margin: 85px auto;
  pointer-events: auto;
  /* padding: 0 0px; */
  box-sizing: border-box;
}
.tab-item-content{
  background: #00000026;
  border-radius: 10px;
  padding: 10px 20px;
  bottom: 40%;
  position: relative;
  z-index: 2;                /* 文字内容在上层 */
  color: #ffffff;
  text-align: center;
}

.tab-container::-webkit-scrollbar {
  display: none;
}

/* 添加平滑滚动 */
.tab-container {
  scroll-behavior: smooth;
}

.swiper-container {
  width: 100%;
  height: 100vh;
}



.swiper-slide {
  width: 100% !important;
  height: 100% !important;
}

.swiper-slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tab-container {
    max-width: 100%;
    gap: 10px;
  }
  
  .tab-item {
    display: flex ;
    flex-direction: column;
    font-size: 24px;
    padding: 10px 16px;
    min-width: 70px;
  }
  
  .tab-item.active {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .tab-container {
    max-width: 95%;
    gap: 8px;
  }
  
  .tab-item {
      display: flex ;
    flex-direction: column;
    font-size: 20px;
    padding: 8px 12px;
    min-width: 60px;
  }
  
  .tab-item.active {
    font-size: 24px;
  }
}

.tab-item {
    display: flex ;
    flex-direction: column;
  flex: 1;
  /* height: 80px;   */
  align-items: center;
  justify-content: center;
  display: flex;
  color: #fff;
  cursor: pointer;
  width: 200px;
  height: 350px;
  /* border: 1px solid #fff; */
  transition: all 0.3s ease;
  border-radius: 10px;
  font-family: 'SourceHanSansCN-Regular';
  font-size: 40px;
  font-weight: 400;
  white-space: nowrap;
  outline: none;
  backdrop-filter: blur(5px);
    padding: 60px 30px;
  box-sizing: border-box;
   margin: 0 10px;
}
.tab-container-inner{
  display: flex;
  justify-content: center;
  width: 90vw;
  align-items: center;
  flex-direction: row;
  /* gap: 0 20px; */
}
.tab-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.tab-item_active {
 display: flex ;
    flex-direction: column;
  flex: 1;
  /* height: 80px;   */
  align-items: center;
  justify-content: center;
  display: flex;
  color: #fff;
  cursor: pointer;
  width: 250px;
  height: 400px;
  /* border: 1px solid #fff; */
  transition: all 0.3s ease;
  border-radius: 10px;
  font-family: 'SourceHanSansCN-Regular';
  font-size: 40px;
  font-weight: 400;
  white-space: nowrap;
  outline: none;
  backdrop-filter: blur(5px);
    padding: 70px 40px;
  box-sizing: border-box;
   margin: 0 10px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
}
</style>
