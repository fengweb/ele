import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //count:2
    deliveryPrice:0,
    minPrice:0

    //islist:true

  },
  mutations:{
    // increment:state => state.count ++,
    // decrement:state => state.count --,
  }
})

