<template>
  <div class="area-page">
    <div class="background-video">
      <video 
        :src="massageVideo"
        autoplay
        preload="auto"
        playsinline
        muted
        webkit-playsinline
        loop
      ></video>
    </div>
    
    <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" width="300" height="200">
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
      <div class="bottom-bar__list">
        <div
          v-for="(project, idx) in projects"
          :key="project.id"
          class="bottom-chip"
          @click="selectProject(idx)"
        >
          <span class="bottom-chip__name">{{ project.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MassagePage',
  data() {
    return {
      logo: require('@/assets/svg/aito.svg'),
      massageVideo: require('@/assets/video/anmo.mp4'),
      timeoutId: null,
       projects: [
        { 
          id: 1, 
          name: '9:00~12:00'
        },
        { 
          id: 2, 
          name: '14:00~17:00'
        },
      ]
    }
  },
  mounted() {
    console.log('Component mounted, adding event listeners.');
    this.resetTimer();
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('touchstart', () => this.resetTimer());
  },
  beforeUnmount() {
    // 清除事件监听
    window.removeEventListener('mousemove', () => this.resetTimer());
    window.removeEventListener('keydown', () => this.resetTimer());
    window.removeEventListener('touchstart', () => this.resetTimer());
  },
  methods: {
    resetTimer() {
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
      this.$router.push('/')
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
  min-height: 88px;
}

.bottom-nav-btn-back {
  font-size: 28px;
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-family: 'SourceHanSansCN-Regular';
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
.bottom-bar__list { 
  flex: 1;
  display: flex; 
  overflow-x: visible; 
  /* gap: 18px;  */
  padding: 0 10px;
  justify-content: center;
  align-items: center;
}


.bottom-chip { 
  flex: 1; 
  display: inline-flex; 
  align-items: center; 
  /* gap: 10px;  */
  padding: 5px 5px; 
  min-width: 80px;
  margin: 0 10px;
  /* max-width: 150px; */
  height: 70px;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.12); 
  background: rgba(255,255,255,0.06); 
  color: #fff; 
  cursor: pointer; 
  transition: transform .2s ease, background .2s ease, border-color .2s ease; 
  min-height: 50px;
}

.bottom-chip:hover { 
  transform: translateY(-2px); 
  background: rgba(255,255,255,0.1); 
}

.bottom-chip.active { 
  background: rgba(255,255,255,0.15); 
  color: #fff; 
  border-color: rgba(255,255,255,0.3); 
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.bottom-chip__name { 
  /* padding: 5px 0; */
  font-size: 30px;
  font-weight: 500; 
  white-space: nowrap; 
  text-align: center; 
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
