<template>
  <div class="tab">
    <!-- 导航 -->
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      @click="clickHandler"
      showSlider
      :useTransition="false"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>
    <!-- 标签页 -->
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        @change="getIndex"
        :options="options"
        @scroll="scroll"
        ref="slide"
      >
        <cube-slide-item>
          <goods :seller="seller1"></goods>
        </cube-slide-item>
        <cube-slide-item>
          <ratings></ratings>
        </cube-slide-item>
        <cube-slide-item>
          <seller></seller>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import goods from '../goods/goods'
import seller from '../seller/seller'
import ratings from '../ratings/ratings'

export default {
  name: 'tab',
  components: {
    goods,
    seller,
    ratings
  },
  props: ['seller1'],
  data () {
    return {
      selectedLabel: '商品',
      test: ['1', '2', '3'],
      index: 0,
      tabs: [
        {
          label: '商品'
        },
        {
          label: '评价'
        },
        {
          label: '商家'
        }
      ],
      options: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    /* 获取点击的tab索引值 */
    clickHandler (label) {
      this.selectedLabel = label
      this.index = this.tabs.findIndex(value => {
        return value.label === this.selectedLabel
      })
    },
    /* 获取导航切换的tab值 */
    getIndex (index) {
      this.selectedLabel = this.tabs[index].label
    },
    /* 下划线动态跟随 */
    scroll (e) {
      // 导航条的宽度
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      //  整个标签页的宽度
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      // 算出比例
      const transform = (-e.x / slideWidth) * tabBarWidth
      /* 实例方法，得获取元素才能调用 */
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  created () {
    // 获取选中的下标
    this.index = this.tabs.findIndex(value => {
      return value.label === this.selectedLabel
    })
  }
}
</script>
<style lang="stylus" scoped>
.tab
  >>> .cube-tab
    padding: 10px 0
  display: flex
  flex-direction: column
  height: 100%
  .slide-wrapper
    flex: 1
    overflow: hidden
</style>
