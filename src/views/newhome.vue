<template>
    <div class="swiper-container">
      <div class="father_swpercontain">
<div class="swper_contain" :style="`transform:translateX(${-selectedArea*50}%)`">
  <div  class="casdads" @click="handleAreaClick" >
    <Swperitem1/>
  </div>
<div class="container">
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
             @click="switchArea(index);goToArea(index)">
          
          <div class="video-wrapper">
            <video :src="item.video"
              ref="videos"
                   autoplay muted loop
                   style="width: 100%; height: 100%; object-fit: cover;">
            </video>
          </div>
          <div class="text_container" :class="{ 'selected': index === selectedArea }">
            <div class="name">{{ item.name }}</div>
            <div class="disc">{{ item.english }}</div>
          </div>
          <div class="border-decoration"></div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
</template>
<script>
import Swperitem1 from '../views/swperitem1.vue';
export default {
  components: {
    Swperitem1
  },
  
  data() {
    return {
       loading:require('@/assets/video/loading.mp4'),
      areas: [
        { 
          id: 'bar', 
          name: '吧台', 
          route: '/order',
          disc: '饮品小吃服务',
          english: 'Bar Counter',
          video: require('@/assets/callf.mp4')
        },
        { 
          id: 'massage', 
          name: '按摩室', 
          route: '/massage',
          disc: '预约按摩服务',
          english: 'Massage Room',
          video: require('@/assets/video/anmo.mp4')
        },
        { 
          id: 'restaurant', 
          name: '餐厅',
          route: '/restaurant',
          disc: '预约餐饮服务',
          english: 'Restaurant',
          video: require('@/assets/video/canting.mp4')
        },
        { 
          id: 'baby', 
          name: '母婴室', 
          route: '/baby',
          disc: '母婴设施使用',
          english: 'Mother and Baby Room',
          video: require('@/assets/video/muying.mp4')
        },
        { 
          id: 'parking', 
          name: '停车场', 
          route: '/parking',
          disc: '预约停车时段',
          english: 'Parking Area',
          video: require('@/assets/video/fixcar.mp4')
        },
        { 
          id: 'children', 
          name: '儿童室', 
          route: '/children',
          disc: '儿童游乐设施',
          english: 'Children\'s Area',
          video: require('@/assets/video/ertong.mp4')
        }
      ],
      selectedArea: 0,
      isloading:true,
      inactivityTimer: null,
    }
  },
  methods: {
    switchArea(index) {
      this.selectedArea = index;
    },
    bindActivityEvents() {
      ['click', 'mousemove', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        window.addEventListener(event, this.resetInactivityTimer);
      });
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
    },
    handleAreaClick(){
      this.selectedArea=1
      console.log('点击了区域:', this.selectedArea);
    },
    resetInactivityTimer() {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this.selectedArea = 0;
      }, 50000); // 30秒无操作返回第一个
    },
    unbindActivityEvents() {
      ['click', 'mousemove', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        window.removeEventListener(event, this.resetInactivityTimer);
      });
    },

  },
mounted() {
  this.bindActivityEvents()
  this.resetInactivityTimer(); // 初始化定时器
  // this.controlVideos(); // 初始播放第一个
  // console.log('组件已挂载，初始selectedArea:', this.selectedArea);
  
  setInterval(() => {
    // console.log('定时器执行了，当前selectedArea:', this.selectedArea);
    
    // 判断是否到最后一个元素
    // if(this.selectedArea === this.areas.length - 1){
  //   if(this.selectedArea === 1){
  //     this.selectedArea = 0;
  //     console.log('重置到第一个区域:', this.selectedArea);
  //   } else {
  //     this.selectedArea++;
  //     console.log('切换到下一个区域:', this.selectedArea);
  //   // }
  // }
    // this.controlVideos(); // 切换后控制视频播放/暂停
  }, 5000);
},
beforeUnmount() {
    this.unbindActivityEvents();
    clearTimeout(this.inactivityTimer);
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
background: #111;
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

/* 保持原有的三行两列布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 150px);
  gap: 240px 30px;
  padding: 10px;
  margin-bottom: 200px;
  position: relative;
  z-index: 1;
}

.item-container {
  position: relative;
  width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 10px 34px 10px rgba(255, 255, 255, 0.22),
    0 6px 16px -8px rgba(255, 255, 255, 0.18),
    0 2px 6px rgba(255, 255, 255, 0.12);
}
/* removed odd bottom bar shadow */

/* 视频容器 */
.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* border-radius: 20px; */
  overflow: hidden;
}
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
  opacity: 0.85;
}


.name {
  display: block;
  padding-bottom: 10px;
  font-size: 35px;
  color:#fff;
  font-weight:400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.disc {
  font-size: 15px;
  font-weight: 200;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.father_swpercontain{
    position: relative;
    overflow: hidden;
    width: 100vw;   
    height: 100vh;
}
.swper_contain{
  height: 100%;
  display: flex;
  width: 200%; /* 两个轮播项，每个100%，总共200% */
  transition: transform 0.5s ease;
}
.swper_item{
/* display: flex; */
    background-color: red;
    width: 50vw; /* 改为50vw，配合50%的translateX */
    flex-shrink: 0;
    height: 100vh;
}
.casdads{
  width: 100%;
  height: 100%;
}
</style>