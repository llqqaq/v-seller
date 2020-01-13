<template>
  <div class="show-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hight-light':totalFoodCount > 0}">
            <i class="icon-shopping_cart" :class="{'hight-light': totalFoodCount > 0}"></i>
          </div>
          <div class="food-sum" v-show="totalFoodCount > 0">
            <bubble :num="totalFoodCount"></bubble>
          </div>
        </div>
        <div class="price">
          <span class="text">￥{{totalPrice}}</span>
        </div>
        <div class="deliveryC">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div v-if="totalPrice <= 0">￥{{startingFee}}起送</div>
        <div v-if="totalPrice > 0 && totalPrice < startingFee">还差{{startingFee - totalPrice}}￥起送</div>
        <div v-if="totalPrice >=startingFee" class="hight-light">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import bubble from '../bubble/bubble'
export default {
  name: "shop-cart",
  props: ["startingFee","deliveryPrice","selectFood"],
  components: {
    bubble
  },
  data() {
    return {
      listFag: false
    };
  },
  watch: {},
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.selectFood.forEach(food => {
        totalPrice += food.count*food.price
      });
      return totalPrice
    },
    totalFoodCount(){
      let totalCount = 0;
      this.selectFood.forEach(food => {
        totalCount += food.count
      })
      return totalCount
    }
    /* totalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.selectFood.length; i++) {
        let food = this.selectFood[i];
        totalPrice += food.price * food.count;
      }
      return totalPrice;
    }, */
  },
  methods: {
    /* 显示选中的商品界面 */
    toggleList(){
      if(!this.listFag){
        if(!this.totalFoodCount){
          return
        }
        this._showShopCartList()
        this.listFag=true
      }else{
        this._hideShopCartList()
        this.listFag=false
      }
    },
    _showShopCartList(){
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList(
        {
          $props: {
            selectFood: "selectFood"
          },
          $events:{
            toHide: ()=>{
              console.log("派发");
              this.listFag = false
            }
          }
        }
      )
      this.shopCartListComp.show()
    },
    _hideShopCartList(){
      console.log('zhixing');
      this.shopCartListComp.hide()
    }
  },
  created() {
    console.log(this.deliveryFee);
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl'
.show-cart
  height: 100%
  position: relative
  .content
    height: 48px
    display: flex
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        box-sizing: border-box
        width: 56px
        height: 58px
        padding: 6px
        position: relative
        top: -10px
        border-radius: 50%
        margin: 0 12px
        background: #141d27
        z-index: 100
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background-color: rgba(0, 0, 0, 0.2)
          text-align: center
          &.hight-light
            background-color: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size: 24px
            line-height: 44px
            color: rgba(255, 255, 255, 0.4)
            &.hight-light
              color: rgba(255, 255, 255, 1)
        .food-sum
          position absolute
          top 0
          right 0
      .price
        display: inline-block
        padding: 12px 0
        /* 为什么这里要顶部对齐 */
        vertical-align: top
        .text
          display: block
          padding-right: 12px
          box-sizing: border-box
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          line-height: 22px
          font-weight: 700
          border-right: 1px solid rgba(255, 255, 255, 0.1)
      .deliveryC
        display: inline-block
        vertical-align: top
        margin-left: 12px
        line-height: 48px
        font-size: 14px
        color: rgba(255, 255, 255, 0.4)
        font-weight: 300
    .content-right
      width: 105px
      background: rgba(0, 0, 0, 0.2)
      text-align: center
      font-size: 16px
      line-height: 45px
      font-weight: 700
      color: rgba(255, 255, 255, 0.4)
      .hight-light
        color: rgb(255, 255, 255)
        background-color: rgba(0, 238, 143, 0.7)
</style>