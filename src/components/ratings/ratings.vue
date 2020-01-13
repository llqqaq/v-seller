<template>
  <div class="ratings">
    <cube-scroll :options="scrollOptions">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <div class="score">{{seller.score}}</div>
            <div class="text">综合评分</div>
            <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="text">服务态度</span>
              <div class="star-wrapper">
                <star :size="36" :score="seller.serviceScore"></star>
              </div>
              <span class="service-score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="text">服务态度</span>
              <div class="star-wrapper">
                <star :size="36" :score="seller.serviceScore"></star>
              </div>
              <span class="service-score">{{seller.serviceScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="text">送达时间</span>
              <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect
          :ratings="ratings"
          :des="des"
          :onlyContent="onlyContent"
          :selectType="selectType"
          @toggle="toggle"
          @select="select"
        ></ratingselect>
        <div class="food-rating">
          <ul class="ul-wrapper">
            <li v-for="(rating, index) in computeRatings" class="li-wrapper" :key="index">
              <span class="rating-time">{{ format(rating.rateTime) }}</span>
              <div class="rating-content">
                <!-- 注意这里的运用 -->
                <span :class="rating.rateType === 0?'icon-thumb_up':'icon-thumb_down'" class="icon"></span>
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
</template>

<script>
import { ratings, seller } from '../../api/http'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import moment from 'moment'
export default {
  components: {
    star,
    split,
    ratingselect
  },
  props: {},
  data () {
    return {
      ratings: [],
      seller: {},
      /* 设置滑动的限制，因为横竖都有滑动 */
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      des: {
        all: '全部',
        positive: '点赞',
        negitive: '吐槽'
      },
      selectType: 2,
      onlyContent: false
    }
  },
  watch: {},
  computed: {
    // 选中符合要求的评价
    computeRatings () {
      let ret = []
      this.ratings.forEach(rating => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === 2 || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  methods: {
    // 格式化时间
    format (time) {
      return moment(time).format('YYYY-MM-DD, h:mm:ss')
    },
    // 勾选按钮
    toggle () {
      this.onlyContent = !this.onlyContent
    },
    // 更改选中的类型
    select (type) {
      this.selectType = type
    }
  },
  created () {
    ratings().then(backData => {
      if (backData.data.errno === 0) {
        this.ratings = backData.data.data
      }
    })
    seller().then(backData => {
      if (backData.data.errno === 0) {
        this.seller = backData.data.data
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.ratings
  position: relative
  height: 100%
  .ratings-content
    font-size: 0
    .overview
      padding: 18px 24px 18px 0
      display: flex
      .overview-left
        flex: 0 0 138px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.3)
        .score
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px
          margin-bottom: 6px
        .text
          font-weight: 700
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
          margin-bottom: 8px
        .rank-rate
          font-size: 10px
          color: rgb(7, 17, 27)
          line-height: 10px
          margin-bottom: 6px
      .overview-right
        flex: 1
        margin-left: 24px
        font-size: 0
        .score-wrapper
          margin-bottom: 8px
          .text
            display: inline-block
            vertical-align: top
            font-weight: 700
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-right: 12px
          .star-wrapper
            display: inline-block
            font-weight: 700
            margin-right: 10px
            vertical-align: top
          .service-score
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
        .delivery-wrapper
          .text
            font-size: 12px
            font-weight: 700
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-right: 12px
          .delivery-time
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
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
