<template>
  <div class="area-page">
    <div class="background-video">
      <video 
        :src="restaurantVideo"
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
    
      
      <!-- 项目选择列表 -->
      <div class="bottom-bar__list">
        <div
          v-for="(project, idx) in projects"
          :key="project.id"
          class="bottom-chip"
          :class="{ active: idx === activeProjectIndex }"
          @click="selectProject(idx)"
        >
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img :src="require(`@/assets/svg/${project.icon}${idx === activeProjectIndex ? '_black' : ''}.svg`)" class="svgclass" width="60" height="60">
            <span class="bottom-chip__name">{{ project.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantPage',
  data() {
    return {
      logo: require('@/assets/svg/aito.svg'),
      restaurantVideo: require('@/assets/video/canting.mp4'),
      activeProjectIndex: -1,
      projects: [
        { 
          id: 1, 
          name: '预约中餐',
          icon: 'lunch'
        },
        { 
          id: 2, 
          name: '预约晚餐',
          icon: 'dinner'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    selectProject(index) {
      this.activeProjectIndex = index;
      console.log('选择了项目:', this.projects[index].name);
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

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-image img {
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
/* 底部操作栏样式 */
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
  min-height: 120px;
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

/* 中间产品名称列表 */
.bottom-bar__list { 
  flex: 1;
  display: flex; 
  overflow-x: auto; 
  /* gap: 18px;  */
  padding: 0 16px;
  scrollbar-width: none;
  justify-content: flex-start;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

.bottom-bar__list::-webkit-scrollbar { 
  display: none; 
}

.bottom-bar__list > .bottom-chip:first-child { 
  margin-left: 12px; 
}

.bottom-bar__list > .bottom-chip:last-child { 
  margin-right: 12px; 
}

.bottom-chip { 
  flex: 0 0 auto; 
  display: inline-flex; 
  align-items: center; 
  gap: 14px; 
  padding: 10px 30px; 
  min-width: 180px;
  margin: 0 15px;
  width: auto;
  height: 120px;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.12); 
  background: rgba(255,255,255,0.06); 
  color: #fff; 
  cursor: pointer; 
  transition: transform .2s ease, background .2s ease, border-color .2s ease; 
  min-height: 100px;
  scroll-snap-align: center;
}

.bottom-chip:hover { 
  transform: translateY(-2px); 
  background: rgba(255,255,255,0.1); 
}

.bottom-chip.active { 
  background: #ffffff; 
  color: #000; 
  border-color: #ffffff; 
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.bottom-chip__name { 
  font-size: 30px; 
  font-weight: 500; 
  white-space: nowrap; 
  text-align: center; 
  width: 100%;
  margin-top: 10px;
}

.svgclass {
  transition: all 0.3s ease;
}
</style>
