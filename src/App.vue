<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :seller1="seller"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/header/v-header'
import tab from './components/tab/tab'
import { seller } from './api/http.js'

export default {
  name: 'app',
  data () {
    return {
      seller: {}
      /* tab */
    }
  },
  components: {
    VHeader,
    tab
  },
  created () {
    /* 获取商家信息 */
    this.getSeller()
  },
  methods: {
    /* 获取商家信息 */
    getSeller () {
      seller().then(backData => {
        if (backData.data.errno === 0) {
          this.seller = backData.data.data
        }
      })
    }
    /* tab */
  }
}
</script>
<style lang="stylus">
.tab-wrapper
  position: fixed
  top: 134px
  left: 0
  right: 0
  bottom: 0
</style>
