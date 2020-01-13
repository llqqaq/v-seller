<template>
  <div class="ratingselect">
    <span class="r-header">商品评价</span>
    <div class="select">
      <div class="select1" :class="{'active':selectType === 2}" @click="choose(2)">
        <span>{{des.all}}</span>
        <span>{{ratings.length}}</span>
      </div>
      <div class="select2" :class="{'active':selectType === 0}"  @click="choose(0)">
        <span>{{des.positive}}</span>
        <span>{{positive.length}}</span>
      </div>
      <div class="select3" :class="{'active':selectType === 1}"  @click="choose(1)">
        <span>{{des.negitive}}</span>
        <span>{{negitive.length}}</span>
      </div>
    </div>
    <div class="r-footer">
      <span class="icon icon-check_circle" :class="{'active': onlyContent===true}" @click="selectOnly"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const EVENT_TOGGLE = 'toggle'
const EVENT_CHOOSE = 'select'
export default {
  components: {},
  props: {
    des: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negitive: '不满意'
        }
      }
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: 2
    },
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  watch: {},
  computed: {
    positive () {
    /* filter返回一个满足条件的数组，并不会对原来的数组产生影响 */
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negitive () {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    selectOnly () {
      this.$emit(EVENT_TOGGLE)
    },
    choose (type) {
      this.$emit(EVENT_CHOOSE, type)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl'
.ratingselect
  width: 100%
  padding: 18px 18px 12px 18px
  .r-header
    font-size: 18px
    color: rgb(7, 17, 27)
    line-height: 18px
    margin-bottom: 18px
  .select
    padding-top: 6px
    width: 100%
    border-bottom 1px solid rgba(7,17,27,0.1)
    div
      display: inline-block
      margin: 12px 8px 18px 0
      padding: 8px 12px
      border-radius: 2px
      font-size: 12px
      line-height: 16px
      &.select1
        background-color: skyblue
        color: rgb(255, 255, 255)
      &.select2
        background-color: rgba(0, 160, 220, 0.2)
        color: rgb(77, 85, 93)
      &.select3
        background-color: rgba(77, 85, 93, 0.2)
        color: rgb(77, 85, 93)
      &.active
        background-color blue
  .r-footer
    padding 12px 0 0 0
    .icon
      font-size 24px
      color rgb(147,153,159)
      line-height 24px
      vertical-align middle
      margin-right 4px
      &.active
        color blue
    .text
      font-size 12px
      color rgb(147,153,159)
      line-height 24px
</style>
