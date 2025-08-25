<template>
  <div class="order-pay-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="header-top">
        <div class="back-btn" @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="page-title">确认订单</div>
        <div class="placeholder"></div>
      </div>
    </div>

    <!-- 订单信息摘要 -->
    <div class="order-summary">
      <div class="store-info">
        <div class="store-name">{{ store || 'AITO测试店' }}</div>
        <div class="store-area">{{ area || '用餐区域A' }}</div>
      </div>
      <div class="order-stats">
        <span>共 {{ totalItems }} 件商品</span>
        <span class="total-price">¥{{ totalPrice }}</span>
      </div>
    </div>
    <!-- 订单商品列表 -->
    <div class="order-items-container">
      <div class="section-title">订单详情</div>
      <div class="order-items-list">
        <div v-for="item in cartItems " :key="item.id" class="order-item-card">
           <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
           <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-desc">{{ item.description }}</div>
            <div class="item-price">¥{{ item.price }}</div>
          </div>
          <div class="item-quantity">
            <div class="quantity-controls">
              <button class="quantity-btn" @click="decreaseQuantity(item)">
                <i class="el-icon-minus"></i>
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button class="quantity-btn" @click="increaseQuantity(item)">
                <i class="el-icon-plus"></i>
              </button>
            </div>
            <div class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户信息对话框 -->
    <el-dialog 
      title="订单信息" 
      :visible.sync="centerDialogVisible" 
      width="90%" 
      class="order-dialog"
      center
    >
      <div class="dialog-content">
        <div class="input-group">
          <label>您的姓氏</label>
          <el-input v-model="custom" placeholder="请输入您的姓氏" />
        </div>
        <div class="input-group">
          <label>手机号码</label>
          <el-input v-model="phone" placeholder="请输入您的手机号" />
        </div>
        <div class="input-group">
          <label>称呼</label>
          <div class="radio-group">
            <el-radio v-model="sex" label="1" class="radio-item">先生</el-radio>
            <el-radio v-model="sex" label="2" class="radio-item">女士</el-radio>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="centerDialogVisible=false">取消</el-button>
        <el-button class="confirm-btn" @click="centerDialogVisible=false;xiadan()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 底部结算栏 -->
    <div class="checkout-bar">
      <div class="price-summary">
        <div class="total-info">
          <span class="label">总计</span>
          <span class="total-amount">¥{{ totalPrice }}</span>
        </div>
      </div>
      <div class="submit-btn" @click="panduan">
        提交订单
      </div>
    </div>
    </div>
    <!-- / page -->
</template>
<script>
    import Swiper from "swiper";
    import comjs from '@/api/common.js'

    export default {
  
        name: 'order',
        components: {},
        data() {
            return {
                store: 'AITO测试店',
                area: '用餐区域A',
                centerDialogVisible: false,
                sex: '1',
                custom: '',
                phone: '',
                cartItems: [], 
               
        }
    },
    computed: {
      totalItems() {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
      },
      totalPrice() {
        return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
      }
    },
    methods: {
    
        goBack() {
          this.$router.go(-1)
        },
        increaseQuantity(item) {
          if (item.quantity < 99) {
            item.quantity++
          }
        },
        decreaseQuantity(item) {
          if (item.quantity > 1) {
            item.quantity--
          }
        },
        panduan() {
            if (this.cartItems.length < 1) {
                this.$message('请选择商品后再提交');
                return false;
            } else {
                this.centerDialogVisible = true;
            }
        },
        xiadan() {
            let customerInfo = '';
            if (this.custom) {
                const sexText = this.sex === '1' ? '先生' : '女士';
                customerInfo = this.custom + sexText;
            }
            
            // 模拟订单提交
            this.$message({
                message: '订单提交成功，请您稍等',
                type: 'success',
                duration: 3000
            });
            
            // 清空表单
            this.custom = '';
            this.phone = '';
            
            // 跳转到成功页面
            setTimeout(() => {
                this.$router.push({ name: 'ok' });
            }, 1000);
        }
    },
    mounted() {
      const cartItems = this.$route.params.cartItems;
      this.cartItems = cartItems;
      console.log('传递过来的参数:', cartItems);
    }
}
</script>
<style scoped>
.order-pay-page {
  height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  color: white;
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
  justify-content: space-between;
}

.back-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
}

.page-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.placeholder {
  width: 30px;
}

/* 订单摘要 */
.order-summary {
  background: #2a2a2a;
  padding: 15px;
  border-bottom: 1px solid #333;
}

.store-info {
  margin-bottom: 10px;
}

.store-name {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.store-area {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.order-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.total-price {
  color: #e74c3c;
  font-weight: bold;
  font-size: 16px;
}

/* 订单商品列表 */
.order-items-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #fff;
}



.order-item-card {
  display: flex;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  margin-right: 15px;
}

.item-name {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  line-height: 1.3;
}

.item-price {
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
}

.item-quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  background: #333;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.quantity-btn:hover {
  background: #e74c3c;
}

.quantity {
  margin: 0 12px;
  font-size: 14px;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
}

/* 用户信息对话框 */
.order-dialog .el-dialog {
  background: #1a1a1a !important;
  border-radius: 12px !important;
  border: 1px solid #333 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
}

.order-dialog .el-dialog__header {
  background: #2a2a2a !important;
  border-bottom: 1px solid #333 !important;
  border-radius: 12px 12px 0 0 !important;
  padding: 20px 24px !important;
}

.order-dialog .el-dialog__title {
  color: #fff !important;
  font-size: 18px !important;
  font-weight: bold !important;
}

.order-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #999 !important;
  font-size: 20px !important;
}

.order-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: #fff !important;
}

.order-dialog .el-dialog__body {
  background: #1a1a1a !important;
  padding: 24px !important;
}

.dialog-content {
  padding: 0;
}

.input-group {
  margin-bottom: 24px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.input-group .el-input__inner {
  background: #2a2a2a !important;
  border: 1px solid #444 !important;
  color: #fff !important;
  border-radius: 8px !important;
  height: 44px !important;
  line-height: 44px !important;
  padding: 0 16px !important;
  font-size: 14px !important;
  transition: all 0.3s ease !important;
}

.input-group .el-input__inner:focus {
  border-color: #e74c3c !important;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
}

.input-group .el-input__inner::placeholder {
  color: #666 !important;
}

.radio-group {
  display: flex;
  gap: 32px;
  padding: 8px 0;
}

.radio-item {
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.order-dialog .el-dialog__footer {
  background: #2a2a2a !important;
  border-top: 1px solid #333 !important;
  border-radius: 0 0 12px 12px !important;
  padding: 20px 24px !important;
}

.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-btn {
  background: #333 !important;
  border: 1px solid #444 !important;
  color: #fff !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.cancel-btn:hover {
  background: #444 !important;
  border-color: #555 !important;
}

.confirm-btn {
  background: #e74c3c !important;
  border: 1px solid #e74c3c !important;
  color: #fff !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.confirm-btn:hover {
  background: #c0392b !important;
  border-color: #c0392b !important;
}

/* 底部结算栏 */
.checkout-bar {
  background: #2a2a2a;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #333;
}

.price-summary {
  flex: 1;
}

.total-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 14px;
  color: #999;
}

.total-amount {
  font-size: 18px;
  color: #e74c3c;
  font-weight: bold;
}

.submit-btn {
  background: #e74c3c;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  border: none;
  font-size: 16px;
}

.submit-btn:hover {
  background: #c0392b;
}

/* 单选按钮样式重写 */
.order-dialog .el-radio__inner {
  width: 16px !important;
  height: 16px !important;
  background: #333 !important;
  border: 1px solid #555 !important;
}

.order-dialog .el-radio__inner.is-checked {
  background-color: #e74c3c !important;
  border: 1px solid #e74c3c !important;
}

.order-dialog .el-radio__inner::after {
  width: 4px !important;
  height: 4px !important;
}

.order-dialog .el-radio__input.is-checked .el-radio__inner {
  background-color: #e74c3c !important;
  border: 1px solid #e74c3c !important;
}

.order-dialog .el-radio__input.is-checked + .el-radio__label {
  color: #fff !important;
}

.order-dialog .el-radio__label {
  color: #fff !important;
}

/* 确保“先生，女士”字体颜色为黑色 */
.order-dialog .radio-group .radio-item {
  color: #000 !important;
}

/* 使用深度选择器确保 scoped 样式作用于 el-dialog */
:deep(.order-dialog) {
  background: #1a1a1a !important;
  border-radius: 12px !important;
  border: 1px solid #333 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
}

/* 滚动条样式 */
.order-items-container::-webkit-scrollbar {
  width: 4px;
}

.order-items-container::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.order-items-container::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

.order-items-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>