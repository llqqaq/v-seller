<template>
  <div class="cartcontrol">
    <transition name="move">
      <div v-show="food.count > 0" class="decrease">
        <i class="icon-remove_circle_outline icon" @click.stop.prevent="reduce"></i>
      </div>
    </transition>
    <transition class="movecount">
      <div class="count" v-show="food.count >= 0">{{food.count==0?'':food.count}}</div>
    </transition>
    <div class="increase">
      <i class="icon-add_circle icon" @click.stop.prevent="add"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartcontrol',
  components: {},
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  watch: {},
  methods: {
    add () {
      this.food.count++
    },
    reduce () {
      this.food.count--
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl'
.cartcontrol
  font-size: 0
  .decrease, .count, .increase
    display: inline-block
   .decrease, .increase
    .icon
      font-size: 24px
      color: rgb(0, 160, 220)
      line-height: 24px
  .count
    display: inline-block
    vertical-align: top
    font-size: 10px
    color: rgb(147, 153, 159)
    line-height: 24px
    margin: 0 10px
    &.movecount-enter-active, &.movecount-leave-active
      transition: all 0.5s linear
    &.movecount-enter, &.movecount-leave-to
      opacity: 0
      transform: translate3d(12px, 0, 0) rotate(180deg)
    &.movecount-enter-to
      opacity: 1
    &.movecount-leave
      opacity: 1
</style>
