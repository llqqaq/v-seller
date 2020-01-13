<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
        <!-- 左侧 -->
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <!-- 右侧 -->
          <ul>
            <li
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">&yen;{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                </div>
                <!-- 添加商品 -->
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="show-cart-wrapper">
      <shopCart :startingFee="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFood="selectFoods"></shopCart>
    </div>
  </div>
</template>

<script>
import { goods } from '../../api/http'
import shopCart from '../shop-cart/shop-cart'
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  components: {
    shopCart,
    cartcontrol
  },
  props: ['seller'],
  data () {
    return {
      goods: [],
      deliveryFee: 0,
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  patch: {},
  computed: {
    /* 统计选择的food */
    /* selectFoods(){
      let selectFoodList=[]
      for(let i=0;i<this.goods.length;i++){
        for(let j=0;j<this.goods[i].foods.length;j++){
          if(this.goods[i].foods[j].count>0){
            selectFoodList.push(this.goods[i].foods[j])
          }
        }
      }
      return selectFoodList
    } */
    selectFoods () {
      let selectFoodList = []
      for (let i = 0; i < this.goods.length; i++) {
        let foods = this.goods[i].foods
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j]
          if (food.count > 0) {
            selectFoodList.push(food)
          }
        }
      }
      return selectFoodList
    }
  },
  methods: {
    /* 给goods加上count字段 */
    _initDabta () {
      for (let i = 0; i < this.goods.length; i++) {
        for (let j = 0; j < this.goods[i].foods.length; j++) {
          this.$set(this.goods[i].foods[j], 'count', 0)
        }
      }
    },
    /* 食品createApi */
    selectFood (food) {
      this.choseFood = food
      this.foodComp = this.$createFood({
        $props: {
          food: 'choseFood'
        }
      })
      this.foodComp.show()
    }
    /* selectFood(food) {
      this.choseFood = food;
      this.$createFood({
        $props: {
          food: "choseFood"
        }
      }).show();
    }, */
  },
  created () {
    /* 获取商品数据 */
    goods().then(backData => {
      console.log(backData)
      if (backData.data.errno === 0) {
        this.goods = backData.data.data
        this.$nextTick(() => {
          this._initDabta()
        })
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'
.goods
  position: relative
  text-align: left
  height: 100%
  .scroll-nav-wrapper
    position: absolute
    width: 100%
    top: 0px
    left: 0
    bottom: 48px
    /* .text
    flex: 1
    position: relative
    .num
      position: absolute
      right: -8px
      top: -10px
    .support-ico
      display: inline-block
      vertical-align: top
      margin-right: 4px */
    .food-item
      padding: 18px
      display: flex
      position: relative
      border-1px(rgba(7, 17, 27, 0.1))
      &.last-child
        border-none()
      .icon
        flex: 0 0 57px
        display: inline-block
        vertical-align: top
      .content
        display: inline-block
        position: relative
        flex: 1
        vertical-align: top
        margin-top: 2px
        margin-left: 10px
        .name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          font-weight: 900
          margin-bottom: 8px
        .desc, .extra
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 14px
          margin-bottom: 8px
          .count
            margin-right: 12px
        .price
          display: inline-block
          .now
            font-size: 14px
            color: rgb(240, 20, 20)
            font-weight: normal
            line-height: 24px
            margin-right: 8px
          .old
            text-decoration: line-through
            font-size: 10px
            font-weight: normal
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 0
        .cart-button-wrapper
          display: inline-block
          position: absolute
          right: 18px
  >>> .cube-scroll-nav-bar-items
    width: 80px
    white-space: normal
  >>> .cube-scroll-nav-bar-item
    padding: 0 10px
    /* 让里面的盒子/span元素上下居中 */
    display: flex
    align-items: center
    height: 56px
    line-height: 14px
    font-size: $fontsize-small
    background: $color-background-ssss
    &.cube-scroll-nav-bar-item_active
      font-weight: 700
      background: #fff
  >>> .cube-scroll-nav-panel-title
    padding-left: 14px
    background: #f3f5f7
    font-size: 12px
    color: rgb(147, 153, 159)
    line-height: 26px
    border-left: 2px solid #d9dde1
  .show-cart-wrapper
    position: absolute
    bottom: 0
    right: 0
    left: 0
    width: 100%
    height: 48px
    background: #141d27
</style>
