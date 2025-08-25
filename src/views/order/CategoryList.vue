<template>
  <div class="product-list">
    <div v-if="currentCategory">
      <div class="category-title">{{ currentCategory.name }}</div>
      <div class="products">
        <div v-if="currentCategory.products && currentCategory.products.length" class="products-wrap">
          <div
            v-for="product in currentCategory.products"
            :key="product.id"
            class="product-item"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-desc">{{ product.description }}</div>
              <div class="product-price">¥{{ product.price }}</div>
            </div>
            <div class="add-to-cart" @click="handleAddToCart(product)">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
        <div v-else class="empty">该分类暂无商品</div>
      </div>
    </div>
    <div v-else class="empty">分类不存在</div>
  </div>
  
</template>

<script>
export default {
  name: 'OrderCategoryList',
  inject: ['orderCategories', 'addToCartFn'],
  computed: {
    categoryId() {
      return this.$route.params.category || 'new'
    },
    currentCategory() {
      const cats = typeof this.orderCategories === 'function' ? this.orderCategories() : []
      return cats.find(c => c.id === this.categoryId)
    }
  },
  methods: {
    handleAddToCart(product) {
      if (typeof this.addToCartFn === 'function') {
        this.addToCartFn(product)
      } else {
        this.$message && this.$message.success('已添加到购物车')
      }
    },
  // 删除字符串中所有连续出现 k 次的字符（k ≥ 2），
// 并重复此过程直到不再有可删除的字符。
// 示例：输入 "deeedbbcccbdaa", k = 3 → 输出 "aa"
  }
}
</script>

<style scoped>
.product-list {
  flex: 1;
  background: #1a1a1a;
  overflow-y: auto;
  padding: 15px;
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
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 8px;
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

.add-to-cart {
  width: 40px;
  height: 40px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart i {
  color: white;
  font-size: 18px;
}

.empty {
  color: #aaa;
  font-size: 14px;
}
</style>


