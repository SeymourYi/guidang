<template>
    <keep-alive>
<div class="contain">
    <video  :src="loading" 
    width="100%" height="100%"
    style="object-fit: cover"
    autoplay muted loop>
    </video>
   <div class="dianji">
        <img :src="dianji"
        width="200px"
        height="200px"
        class="dianji-img"
        alt="">
    </div>
    <!-- <div class="fartherlist">
        <div  class="contenlist">
        <div v-for="item in areas.slice(0,3)"  class="caritem">
            <div class="caritemtext">       {{item.name }}</div>
            <div class="disc">       {{item.english }}</div>
            <video 
             class="caritemvideo"
              loop
              autoplay
              muted
              :src="item.video"></video>
        </div>
    </div>
    <div  class="contenlist">
        <div v-for="item in areas.slice(3,6)"  class="caritem">
            <div class="caritemtext">{{item.name }}</div>
            <div class="disc">       {{item.english }}</div>
            <video 
             class="caritemvideo"
              loop
              autoplay
              muted
              :src="item.video"></video>
        </div>
    </div>
    </div>  -->
   
    
</div>
    </keep-alive>
  
</template>

<script>
import loading from '../assets/home.mp4';
// import dianji from '../assets/svg/dianji1.gif';
import dianji from '../assets/svg/mask.png';

    export default {
     data() {
        return {
            loading: loading,
            dianji: dianji,
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
        }
    },
    }
</script>

<style scoped>
.contain{
    position: relative;
    /* display: 0; */
    width: 100%;
    height: 100%;
/* background: #c94f4f; */
}
.dianji{
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translate(-50%, -50%);
}
.dianji-img{
    animation: dianji 1s infinite;
    background: transparent;
    animation: floatY 1s ease-in-out infinite;
  will-change: transform;
}
@keyframes floatY {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
.fartherlist{
    position: absolute;
    left: 50%;
    bottom: 1vh;
    transform: translateX(-50%);
    width: 92vw;
    display: flex;
    flex-direction: column;
    /* gap: 18px; */
}
.disc {
  font-size: 15px;
  font-weight: 200;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 46px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  text-align: center;
  color: #ffffff;
}
.contenlist{
    /* background: #fe2b2b; */
    width: 100%;
    display: flex;
    justify-content: center;
    /* gap: 20px; */
    /* margin: 20px; */
}
.caritem{
    position: relative;
    flex: 0 0 calc((100% - 2 * 20px) / 3);
    max-width: calc((100% - 2 * 20px) / 3);
    overflow: hidden;
    /* border-radius: 12px; */
    margin: 10px 9px;
    box-shadow:
      0 10px 34px 10px rgba(255, 255, 255, 0.22),
      0 6px 16px -8px rgba(255, 255, 255, 0.18),
      0 2px 6px rgba(255, 255, 255, 0.12);
}
.caritemvideo{
    height: 200px;
    width: 100%;
object-fit: cover;
}
.caritemtext{
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 24px);
    text-align: center;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.25);
}
</style>