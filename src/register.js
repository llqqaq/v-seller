/* import {
  createAPI
} from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './components/header/header-detail.vue'
import ShopCartList from './components/shop-cart-list/shop-cart-list.vue'
createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList) */

import Vue from 'vue'
import headerDetail from './components/header/header-detail.vue'
import shopCartList from './components/shop-cart-list/shop-cart-list.vue'
import food from './components/Food/food.vue'
import {
  createAPI
} from 'cube-ui'

createAPI(Vue, headerDetail)
createAPI(Vue, shopCartList)
createAPI(Vue, food)
