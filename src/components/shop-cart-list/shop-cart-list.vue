<template>
  <transition name="fade">
    <cube-popup
      :maskClosable="true"
      :zIndex="90"
      position="bottom"
      type="shop-cart-list"
      ref="list"
      @mask-click="toHide"
    >
      <transition name="move">
        <div>
          <!-- 头部 -->
          <div class="list-header">
            <span class="gouwuche">购物车</span>
            <span class="clear" @click.stop="clearShopCart">清空</span>
          </div>
          <!-- 商品区 -->
          <cube-scroll ref="listContent">
            <ul class="ul-wrapper">
              <li v-for="item in selectFood" class="li-wrapper">
                <div class="list-left">{{item.name}}</div>
                <div class="list-right">
                  <span class="list-price">{{item.price*item.count}}</span>
                  <cartcontrol class="cartcontrol" :food="item"></cartcontrol>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from "../cartcontrol/cartcontrol";
const EVENT_HIDE = "toHide";

export default {
  name: "shop-cart-list",
  props: ["selectFood"],
  /* props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    totalFoodCount: {
      type: Number,
      default: 0
    }
  }, */

  data() {
    return {
      visible: false
    };
  },
  computed: {},
  methods: {
    show() {
      this.$refs.list.show();
      this.$nextTick(() => {
        this.$refs.listContent.refresh();
      });
    },
    hide() {
      this.$refs.list.hide();
    },
    clearShopCart() {
      this.selectFood.forEach(food => {
        food.count = 0;
      });
      this.$refs.list.hide();
    },
    toHide() {
      this.$emit(EVENT_HIDE);
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cube-shop-cart-list
  bottom: 48px
  &.fade-enter, &.fade-leave-active
    opacity: 0
  &.fade-enter-active, &.fade-leave-active
    transition: all 2s ease-in-out
  .move-enter, .move-leave-active
    transform: translate3d(0, 100%, 0)
  .move-enter-active, .move-leave-active
    transition: all 2s ease-in-out
  .list-header
    width: 100%
    height: 40px
    background-color: #f3f5f7
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .gouwuche
      float: left
      font-size: 14px
      font-weight: 200
      color: rgb(7, 17, 27)
      margin-left: 18px
      line-height: 40px
    .clear
      display: inline-block
      float: right
      margin-right: 18px
      color: rgb(0, 160, 220)
      line-height: 40px
  .cube-scroll-wrapper
    background-color: #fff
    max-height: 217px
    .ul-wrapper
      .li-wrapper
        height: 48px
        .list-left
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 24px
          margin: 12px 18px
        .list-right
          float: right
          padding: 12px 18px
          box-sizing: border-box
          height: 48px
          .list-price
            vertical-align: middle
            margin-right: 12px
            font-size: 10px
            font-weight: normal
            color: rgb(240, 20, 20)
            line-height: 24px
          .cartcontrol
            display: inline-block
            vertical-align: middle
            font-size: 24px
            color: rgb(7, 17, 27)
            line-height: 24px
</style>