<template>
  <transition name="fade">
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" width="100%" height="100%" alt="食物图片" />
            <div class="back" @click="hide">
              <span class="icon-arrow_lift"></span>
            </div>
          </div>
          <div class="content">
            <span class="food-name">{{food.name}}</span>
            <div class="food-allSale">
              <span class="food-sale">月售{{food.sellCount}}</span>
              <span>好评率{{food.rating}}%</span>
            </div>
            <div class="food-price-operate">
              <span class="food-newPrice">&yen;{{food.price}}</span>
              <span class="food-oldPrice" v-show="food.oldPrice != '' ">&yen;{{food.oldPrice}}</span>
              <span class="addTo-shopCart" @click="add" v-show="food.count<=0">加入购物车</span>
              <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
            </div>
          </div>
          <split></split>
          <div class="food-introduction" v-show="food.info != '' ">
            <span class="food-des">商品介绍</span>
            <p class="food-text">{{food.info}}</p>
          </div>
          <split></split>
          <ratingselect 
          :ratings="ratings"
          :des="des"
          :onlyContent = "onlyContent"
          :selectType = "selectType"
          @toggle=toggle
          @select=select
          ></ratingselect>
          <div class="food-rating">
            <ul class="ul-wrapper">
              <li v-for="rating in computeRatings" class="li-wrapper">
                <span class="rating-time">{{ format(rating.rateTime) }}</span>
                <div class="rating-content">
                  <!-- 注意这里的运用 -->
                  <span
                    :class="rating.rateType === 0?'icon-thumb_up':'icon-thumb_down'"
                    class="icon"
                  ></span>
                  <span class="text">{{rating.text}}</span>
                </div>
                <div class="user">
                  <span class="user-id">{{rating.username}}</span>
                  <img class="user-head-portrait" :src="rating.avatar" width="12px" height="12px" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import split from "../split/split";
import cartcontrol from "../cartcontrol/cartcontrol";
import moment from "moment";
import ratingselect from "../ratingselect/ratingselect";
export default {
  name: "food",
  components: {},
  props: ["food"],
  data() {
    return {
      visible: false,
      ratings: this.food.ratings,
      des: {
        all: "全部",
        positive: "点赞",
        negitive: "吐槽"
      },
      selectType: 2,
      onlyContent: false
    };
  },
  watch: {},
  computed: {
    computeRatings(){
      let ret = []
      this.ratings.forEach(rating => {
          if(this.onlyContent && !rating.text){
            return
          }
          if(this.selectType===2 ||rating.rateType === this.selectType){
            ret.push(rating)
          }
      });
      return ret
    }
  },
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    hide() {
      this.visible = false;
    },
    format(time) {
      return moment(time).format("YYYY-MM-DD, h:mm:ss");
    },
    add() {
      this.food.count++;
    },
    toggle(){
      this.onlyContent = !this.onlyContent
    },
    select(type){
      this.selectType = type
    }
  },
  created() {},
  mounted() {},
  components: {
    split,
    cartcontrol,
    ratingselect
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl'
.food-content
  position: relative
  width: 100%
.food
  position: fixed
  width: 100%
  top: 0
  bottom: 48px
  background: rgb(255, 255, 255)
  /* 切入动画 */
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.3s linear
  &.fade-enter, &.fade-leave-active
    transform: translate3d(100%, 0, 0)
  .image-header
    width: 100%
    height: 375px
    .icon-arrow_lift
      position: absolute
      top: 26px
      left: 10px
      font-size: 23px
      color: white
  .content
    background-color: #fff
    padding: 18px 18px 18px 18px
    font-size: 0px
    .food-name
      display: block
      color: rgb(7, 17, 27)
      font-size: 14px
      font-weight: 700
      line-height: 14px
    .food-allSale
      margin-top: 8px
      margin-bottom: 18px
      font-size: 10px
      color: rgb(147, 153, 159)
      line-height: 10px
      .food-sale
        margin-right: 12px
    .food-price-operate
      position: relative
      width: 100%
      font-weight: 700
      line-height: 24px
      .food-newPrice
        font-size: 24px
        color: rgb(240, 20, 20)
        margin-right: 10px
      .food-oldPrice
        font-size: 20px
        text-decoration: line-through
        color: rgb(147, 153, 159)
      .addTo-shopCart
        z-index: 1
        position: absolute
        top: 0
        right: 0
        box-sizing: border-box
        width: 74px
        height: 24px
        padding: 6px 0
        text-align: center
        font-size: 10px
        background-color: rgb(0, 160, 220)
        border-radius: 12px
        color: rgb(255, 255, 255)
        line-height: 12px
      .cartcontrol
        position: absolute
        top: 0
        right: 0
  .food-introduction
    padding: 18px
    .food-des
      color: rgb(7, 17, 27)
      font-size: 18px
      line-height: 18px
    .food-text
      margin-top: 6px
      padding: 0 8px
      font-size: 12px
      font-weight: 200
      color: rgb(77, 82, 93)
      line-height: 24px
  .food-rating
    width: 100%
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    .ul-wrapper
      width: 100%
      box-sizing: border-box
      padding: 0 18px
      .li-wrapper
        position: relative
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        padding: 16px 0
        .rating-time
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 24px
          margin-bottom: 6px
        .rating-content
          .icon
            font-size: 12px
            color: rgb(127, 153, 159)
            line-height: 24px
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 16px
            margin-left: 4px
        .user
          position: absolute
          top: 26px
          right: 0
          .user-id
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
            margin-right: 6px
            vertical-align: top
          .user-head-portrait
            display: inline-block
            border-radius: 12px
            vertical-align: top
</style>