<template>
    <!-- <div  v-if="isloading">
          <video :src="loading"
              ref="videos"
                   autoplay muted loop
                   style="width: 100%; height: 100%; object-fit: cover;">
            </video>
    </div> -->
  <div class="container">
    <!-- 装饰背景元素 -->
    <div class="bg-decoration">
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-circle circle-3"></div>
      <div class="pulse-dot dot-1"></div>
      <div class="pulse-dot dot-2"></div>
      <div class="pulse-dot dot-3"></div>
    </div>

    <div class="grid-container">
      <div v-for="(item, index) in areas" :key="index">
        <div class="item-container"
             :class="{ 'grid-item-large': index === selectedArea }"
             @click="switchArea(index);goToArea(index)">
          
          <!-- 视频容器 -->
          <div class="video-wrapper">
            <video :src="item.video"
              ref="videos"
                   autoplay muted loop
                   style="width: 100%; height: 100%; object-fit: cover;">
            </video>
            <!-- 渐变遮罩层 -->
            <!-- <div class="video-overlay"></div> -->
          </div>

          <!-- 选中状态指示器 -->
          <!-- <div class="selection-indicator" :class="{ 'active': index === selectedArea }"></div> -->
          
          <!-- 文本容器 -->
          <div class="text_container" :class="{ 'selected': index === selectedArea }">
            <div class="name">{{ item.name }}</div>
            <div class="disc">{{ item.disc }}</div>
          </div>

          <!-- 边框装饰 -->
          <div class="border-decoration"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       loading:require('@/assets/video/loading.mp4'),
      areas: [
        { 
          id: 'bar', 
          name: '吧台', 
          route: '/order',
          disc: '饮品小吃服务',
          video: require('@/assets/callf.mp4')
        },
        { 
          id: 'massage', 
          name: '按摩室', 
          route: '/massage',
          disc: '预约按摩服务',
          video: require('@/assets/video/anmo.mp4')
        },
        { 
          id: 'restaurant', 
          name: '餐厅',
          route: '/restaurant',
          disc: '预约餐饮服务',
          video: require('@/assets/video/canting.mp4')
        },
        { 
          id: 'baby', 
          name: '母婴室', 
          route: '/baby',
          disc: '母婴设施使用',
          video: require('@/assets/video/muying.mp4')
        },
        { 
          id: 'parking', 
          name: '停车场', 
          route: '/parking',
          disc: '预约停车时段',
          video: require('@/assets/video/fixcar.mp4')
        },
        { 
          id: 'children', 
          name: '儿童室', 
          route: '/children',
          disc: '儿童游乐设施',
          video: require('@/assets/video/ertong.mp4')
        }
      ],
      selectedArea: 0,
      isloading:true
    }
  },
  methods: {
    switchArea(index) {
      this.selectedArea = index;
    },
      goToArea(index) {
      // 直接跳转到对应区域页面
      const area = this.areas[index];
      if (area) {
        this.$router.push(area.route);
      }
    },
     controlVideos() {
      this.$refs.videos.forEach((video, index) => {
        if (index === this.selectedArea) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  },
mounted() {
//       setTimeout(() => {
//      this.isloading = false
//   }, 5000);
       this.controlVideos(); // 初始播放第一个
  setInterval(() => {
    console.log('定时器执行了');

    // 判断是否到最后一个元素
    if(this.selectedArea === this.areas.length - 1){
      this.selectedArea = 0;
    } else {
      this.selectedArea++;
    }
     this.controlVideos(); // 切换后控制视频播放/暂停
  }, 5000);
}
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(155, 207, 255, 0.1) 100%
  ); */
  /* background: transparent; */
  background: rgb(0, 0, 0,0);
  background-size: cover;
  /* background-image: url('../assets/img/image-removebg-preview.png'); */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 装饰背景元素 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(74, 144, 226, 0.1));
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.pulse-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.6), transparent);
  border-radius: 50%;
  animation: pulse 3s infinite;
}

.dot-1 {
  top: 30%;
  right: 25%;
  animation-delay: 1s;
}

.dot-2 {
  bottom: 40%;
  left: 30%;
  animation-delay: 2s;
}

.dot-3 {
  top: 70%;
  left: 70%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.5); }
}

/* 保持原有的三行两列布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 150px);
  gap: 230px 40px;
  padding: 10px;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
}

.item-container {
  position: relative;
  width: 300px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
  
  /* 玻璃拟态效果 */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.25) 0%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  /* 高级阴影效果 */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.5);
  
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.item-container:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
  border-color: rgba(74, 144, 226, 0.4);
}

/* 保持原有的选中放大效果 */
.grid-item-large {
  transform: scale(1.1) translateY(-5px);
  z-index: 2;
  box-shadow: 
    0 16px 48px rgba(74, 144, 226, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.7);
  border-color: rgba(74, 144, 226, 0.6);
}

/* 视频容器 */
.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
}

/* 视频渐变遮罩 */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(74, 144, 226, 0.1) 0%,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 1;
}

/* 选中状态指示器 */
.selection-indicator {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 23px;
  background: linear-gradient(45deg, transparent, transparent);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 0;
}

.selection-indicator.active {
  opacity: 1;
  background: linear-gradient(45deg, 
    rgba(74, 144, 226, 0.4), 
    rgba(155, 207, 255, 0.6), 
    rgba(74, 144, 226, 0.4)
  );
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(74, 144, 226, 0.3); }
  to { box-shadow: 0 0 30px rgba(74, 144, 226, 0.5); }
}

/* 增强文本容器 */
.text_container {
  position: absolute;
  top: 10px;
  color: #fff;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  border-radius: 15px;
  z-index: 2;
  
  /* 玻璃拟态文本背景 */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.25) 0%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  
  transition: all 0.3s ease;
  opacity: 0.85;
}

.text_container.selected {
  background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.3) 0%, 
    rgba(155, 207, 255, 0.2) 100%
  );
  transform: scale(1.05);
  opacity: 1;
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.2);
}

.text_container:hover {
  transform: scale(1.02);
  opacity: 1;
}

.name {
  display: block;
  padding-bottom: 10px;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.disc {
  font-size: 25px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 边框装饰 */
.border-decoration {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 21px;
  background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0.1), 
    transparent, 
    rgba(74, 144, 226, 0.1)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.item-container:hover .border-decoration {
  opacity: 1;
}

/* 非选中项的透明度效果 */
.grid-container .item-container:not(.grid-item-large) {
  opacity: 0.8;
}

.grid-container:hover .item-container:not(:hover):not(.grid-item-large) {
  opacity: 0.6;
}
</style>