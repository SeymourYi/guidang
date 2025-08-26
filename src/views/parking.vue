<template>
  <div class="area-page">
    <div class="background-video">
      <video 
        :src="parkingVideo"
        autoplay
        preload="auto"
        playsinline
        muted
        webkit-playsinline
        loop
      ></video>
    </div>
    
    <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" width="300" height="40">
    </div>

    <!-- 可左右滑动的主体区域 -->
    <div class="product-swiper">
      <div class="swiper-container product-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(p, idx) in projects" :key="p.id">
            <div class="product-slide">
              <!-- <div class="slot-card"> -->
                <!-- <div class="slot-time">{{ p.name }}</div> -->
                <!-- 可根据需要扩展内容 -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <!-- 返回按钮 -->
       <div class="bottom-nav-btn-back" @click="goBack">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24" width="30" height="30">
            <path d="M15.5 19.5L8 12l7.5-7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        返回
      </div>
       <div class="bottom-bar__list" ref="bottomBarList">
        <div
          v-for="(project, idx) in projects"
          :key="project.id"
          class="bottom-chip"
          @click="selectProject(idx)"
        >
          <div>
         <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img :src="require(`@/assets/svg/clock.svg`)"  class="svgclass" width="60" height="60">
         </div>
          <span class="bottom-chip__name">{{ project.name }}</span>
        </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  name: 'ParkingPage',
  data() {
    return {
      logo: require('@/assets/svg/aito.svg'),
      parkingVideo: require('@/assets/video/fixcar.mp4'),
      timeoutId: null,
      activeIndex: 0,
      productSwp: null,
       projects: [
        { 
          id: 1, 
          name: '9:00~12:00'
        },
        { 
          id: 2, 
          name: '13:00~15:00'
        },
        { 
          id: 3, 
          name: '16:00~18:00'
        },
      ]
    }
  },
  mounted() {
    this.resetTimer();
    window.addEventListener('mousemove', this.resetTimer);
    window.addEventListener('keydown', this.resetTimer);
    window.addEventListener('touchstart', this.resetTimer);

    // 初始化 swiper
    this.$nextTick(() => {
      this.initProductSwiper();
      this.$nextTick(() => this.updateBottomBarScroll());
    });
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('keydown', this.resetTimer);
    window.removeEventListener('touchstart', this.resetTimer);
    // 销毁 swiper
    if (this.productSwp && !this.productSwp.destroyed) {
      this.productSwp.destroy(true, true);
      this.productSwp = null;
    }
    if (this.timeoutId) clearTimeout(this.timeoutId);
  },
  methods: {
    resetTimer() {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      // 长时间无操作返回首页（保持原值）
      this.timeoutId = setTimeout(() => {
        this.$router.push('/');
      }, 500000);
    },
    goBack() {
      this.$router.push('/')
    },
    initProductSwiper() {
      // 防止重复初始化
      if (this.productSwp && !this.productSwp.destroyed) {
        try { this.productSwp.destroy(true, true); } catch (e) {}
        this.productSwp = null;
      }
      try {
        const that = this;
        this.productSwp = new Swiper('.product-swiper-container', {
          loop: false,
          speed: 500,
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          on: {
            slideChange: function() {
              // 在 slide 变更时更新 activeIndex（使用 realIndex 若 loop 为 true）
              const realIndex = (typeof this.realIndex !== 'undefined') ? this.realIndex : this.activeIndex;
              that.activeIndex = realIndex;
              that.$nextTick(() => that.updateBottomBarScroll());
            },
            init: function() {
              const realIndex = (typeof this.realIndex !== 'undefined') ? this.realIndex : this.activeIndex;
              that.activeIndex = realIndex;
              that.$nextTick(() => that.updateBottomBarScroll());
            }
          }
        })
      } catch (e) {
        console.error('init swiper fail', e)
      }
    },
    selectProject(idx) {
      if (this.productSwp && !this.productSwp.destroyed) {
        if (typeof this.productSwp.slideToLoop === 'function') {
          this.productSwp.slideToLoop(idx, 400);
        } else if (typeof this.productSwp.slideTo === 'function') {
          // 非 loop 模式
          this.productSwp.slideTo(idx, 400);
        }
      }
      this.activeIndex = idx;
      this.$nextTick(() => this.updateBottomBarScroll());
    },
    updateBottomBarScroll() {
      const list = this.$refs.bottomBarList;
      if (!list) return;
      const active = list.querySelector('.bottom-chip.active');
      if (!active) return;
      active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      try {
        const listRect = list.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        const listCenter = listRect.left + listRect.width / 2;
        const activeCenter = activeRect.left + activeRect.width / 2;
        const scrollOffset = activeCenter - listCenter;
        if (Math.abs(scrollOffset) > 5) {
          list.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('../assets/fonts/SourceHanSansCN-Regular.otf') format('opentype');
}

.area-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
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

/* 主体 swiper 区域 */
.product-swiper { width: 100%; height: calc(100vh - 88px); position: relative; z-index: 50; display: flex; align-items: center; justify-content: center; }
.product-swiper-container { width: 100%; height: 100%; }
.product-swiper .swiper-slide { height: 100%; display: flex; align-items: center; justify-content: center; }
.product-slide { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.slot-card {
  pointer-events: auto;
  width: 70%;
  max-width: 720px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}
.slot-time {
  font-size: 56px;
  font-weight: 700;
  color: #fff;
  font-family: 'SourceHanSansCN-Regular';
  text-align: center;
}

/* 底部操作栏样式（保留原样） */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1600;
  display: flex;
  align-items: center;
  padding: 22px 32px;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255,255,255,0.1);
  gap: 24px;
  min-height: 88px;
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

.bottom-nav-btn-back:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.25);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* 调整：允许横向滚动并左对齐，使按钮可滑动 */
.bottom-bar__list { 
  flex: 1;
  display: flex; 
  overflow-x: auto; 
  padding: 0 10px;
  justify-content: flex-start;    /* 改为左对齐，便于横向滚动 */
  align-items: center;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.bottom-bar__list::-webkit-scrollbar { display: none; }

.bottom-chip { 
  flex: 0 0 auto;                 /* 不再等比拉伸，固定宽度以支持横向滚动 */
  display: inline-flex; 
  align-items: center; 
  padding: 8px 12px; 
  min-width: 140px;               /* 保证时间文本能完整显示 */
  margin: 0 8px;
  height: 150px;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.12); 
  background: rgba(255,255,255,0.06); 
  color: #fff; 
  cursor: pointer; 
  transition: transform .2s ease, background .2s ease, border-color .2s ease; 
  min-height: 50px;
  white-space: normal;            /* 允许换行，避免省略 */
}

.bottom-chip:hover { 
  transform: translateY(-2px); 
  background: rgba(255,255,255,0.1); 
}
.svgclass {
  transition: all 0.3s ease;
  margin-bottom: 10px;
}
.bottom-chip.active { 
  background: #ffffff; 
  color: #000; 
  border-color: #ffffff; 
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.bottom-chip__name { 
  font-size: 30px;                /* 适当缩小字体，减少换行 */
  font-weight: 500; 
  white-space: normal;            /* 允许换行以完整显示时间 */
  text-align: center; 
  width: 100%;
  overflow: visible;
  text-overflow: unset;
}
</style>