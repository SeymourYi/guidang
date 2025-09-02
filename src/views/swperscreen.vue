<template>
  <div 
    class="carousel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- 视频轮播 -->
    <div class="carousel-track" :style="{ transform: 'translateX(' + (-currentIndex * 100) + 'vw)' }">
      <div class="carousel-item" v-for="(item, index) in areas" :key="index">
        <video 
          :src="item.video"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          style="width:100%; height:100%; object-fit: cover;"
        ></video>
      </div>
    </div>

    <!-- 可叠加内容 -->
    <div class="overlay">
      <div v-for="(item, index) in areas" :key="'text-'+index" v-show="currentIndex === index">
        <h1>{{ item.name }}</h1>
        <p>{{ item.disc }}</p>
      </div>
    </div>

    <!-- 左右按钮 -->
    <button class="btn prev" @click="prev">‹</button>
    <button class="btn next" @click="next">›</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas: [
        { name: '吧台', disc: '饮品小吃服务', video: require('@/assets/callf.mp4') },
        { name: '按摩室', disc: '预约按摩服务', video: require('@/assets/video/anmo.mp4') },
        { name: '餐厅', disc: '预约餐饮服务', video: require('@/assets/video/canting.mp4') },
        { name: '母婴室', disc: '母婴设施使用', video: require('@/assets/video/muying.mp4') },
        { name: '停车场', disc: '预约停车时段', video: require('@/assets/video/fixcar.mp4') },
        { name: '儿童室', disc: '儿童游乐设施', video: require('@/assets/video/ertong.mp4') }
      ],
      currentIndex: 0,
      touchStartX: 0,
      touchEndX: 0
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.areas.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.areas.length) % this.areas.length;
    },
    onTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    onTouchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    },
    onTouchEnd() {
      const deltaX = this.touchStartX - this.touchEndX;
      if (deltaX > 50) { // 左滑
        this.next();
      } else if (deltaX < -50) { // 右滑
        this.prev();
      }
    }
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.carousel-item {
  min-width: 100vw;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 50px;
  pointer-events: none;
}

.overlay h1 {
  font-size: 3rem;
  margin: 0;
}

.overlay p {
  font-size: 1.5rem;
}

.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: rgba(0,0,0,0.3);
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  z-index: 3;
}

.prev { left: 20px; }
.next { right: 20px; }
</style>
