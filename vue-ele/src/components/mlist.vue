<template>
  <div>
  <div class="mlist" style="height: 500px; overflow-y: auto; position: relative;"> 
       <yd-scrolltab>
            <yd-scrolltab-panel :label=" item.name " icon="demo-icons-category1" v-for="(item,index) in goodlist " :key="index">
                <yd-list theme="4"> 
                      <yd-list-item v-for="(it, index) in item.foods" :key="index" @click.native="selectFood(it)" >
                          <img slot="img" :src="it.image" width="57" height="57">
                          <span slot="title">{{it.name}}</span>
                          <yd-list-other slot="other">
                              <div>
                                  <span class="demo-list-price">月售{{it.sellCount}}</span>
                                  
                                  <span class="demo-list-price" style="padding-left:0.1rem">好评率{{it.rating}}%</span>

                                 
                              </div>
                              
                          </yd-list-other>
                          <yd-list-other slot="other">
                              <div>
                                  
                                  <span class="demo-list-del-price" style="color:red">¥{{it.price}}</span>
                              </div>
                              <div class="jsnum">
                                 <span v-show="it.count>0" @click="remo(it)">-</span>
                                 <span v-show="it.count>0">{{ it.count }}</span>
                                 <span @click ="add(it)">+</span>
                              </div>
                          </yd-list-other>
                      </yd-list-item>
                  </yd-list>
            </yd-scrolltab-panel>
    
        </yd-scrolltab>
  </div>
  <div class="shopcart" >
      <div class="content" >
        <div class="content-left" @click="totalPrice.count > 0 ? show2=true :show2=false">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalPrice.count>0}">
              
              <yd-icon name="shopcart" :class="{'highlight':totalPrice.count>0}"></yd-icon>
            </div>
            <div class="num" v-show=" totalPrice.count > 0">{{ totalPrice.count }}</div>
          </div>
          <div class="price">￥{{ totalPrice.total }}</div>
          <div class="desc">另需配送费￥{{ this.$store.state.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="totalPrice.total < this.$store.state.minPrice ? 'not-enough' :'enough'">
           {{ payDesc }}
          </div>
        </div>
      </div>

    </div>
    <yd-popup v-model="show2" position="bottom" height="40%" class="popupcon" >
      <yd-navbar style="background:#f3f5f7; height:0.7rem">
        <span  slot="left">
            购物车
        </span>
    <span slot="right" @click="remove()">
            清空
        </span>
    </yd-navbar>
       <yd-list theme="4"> 
        <yd-list-item  v-for="(yt,index) in selectFoods" :key="index">
         
            <yd-list-other slot="other">
                <div>
                    <span>{{ yt.name }}</span> 
                </div>
                <div class="numlist">
                   <span class="" style="color:red">￥{{ yt.price*yt.count }}</span>
                  <span class="" @click="remo(yt)">-</span>
                    <span>{{ yt.count }}</span> 
                    <span class="" @click ="add(yt)">+</span>
                  </div>
            </yd-list-other>
        </yd-list-item>

    </yd-list>
            <!-- <yd-button type="warning" style="margin: 30px;" @click.native="show2 = false">Close Bottom Popup</yd-button> -->
     </yd-popup>
     <yd-popup v-model="show4" position="right" width="100%" >
      
            <yd-list theme="5"> 
              <yd-list-item >
                  <div slot="img" style="position:relative">
                    <img  :src="selobj.image">
                  <yd-navbar-back-icon style="position:absolute; top:0.2rem; left:0.2rem; " color="#fff" @click.native="show4=false"></yd-navbar-back-icon>
                  </div>
                  <span slot="title">{{ selobj.name }}</span>
                   <yd-list-other slot="other">
                              <div>
                                  <span class="demo-list-price">月售{{selobj.sellCount}}</span>
                                  
                                  <span class="demo-list-price" style="padding-left:0.1rem">好评率{{selobj.rating}}%</span>

                                 
                              </div>
                              
                          </yd-list-other>
                          <yd-list-other slot="other">
                              <div>
                                  
                                  <span class="demo-list-del-price" style="color:red">¥{{selobj.price}}</span>
                              </div>
                              <div class="jsnum">
                                 <span v-show="selobj.count>0" @click="remo(selobj)">-</span>
                                 <span v-show="selobj.count>0">{{ selobj.count }}</span>
                                 <span @click ="add(selobj)">+</span>
                              </div>
                          </yd-list-other>
              </yd-list-item>
           </yd-list>

           <div class="sp-con">
              <h4>商品信息</h4>
              <p>{{ selobj.info }}</p>
           </div>

           <div class="sp-con">
              <h4>商品评价</h4>
              <div>
                  <yd-button type="primary" @click.native="selecttab(2)">全部</yd-button>
                  <yd-button type="danger" @click.native="selecttab(0)">推荐</yd-button>
                  <yd-button type="warning" @click.native="selecttab(1)">吐槽</yd-button>
              </div>
           </div>
           <div class="sp-con">
               <ul>
                  <li v-show="showselect(tabs.rateType)"  v-for="(tabs,index) in selobj.ratings" :key="index" >{{ tabs.text }}</li>
               </ul>
           </div>

        </yd-popup>
        
</div>
</template>

<script>
export default {
  name: 'mlist',
  data () {
    return {
      goodlist:[],
      show2: false,
      show4:false,
      selectfoot:[],
      selobj:{},
      typenum:"all"
    
    }
 },
  computed:{

       
       totalPrice() {
        let foods = [];
        let tobj = {
              total : 0,
              count : 0
        };
        
        
        this.goodlist.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              foods.push(food);
            }
          });
        });
        
         foods.forEach((food) => {
           tobj.total += food.price * food.count;
           tobj.count += food.count
           
         });

         
        return tobj;
      },

      selectFoods() {
        let selfoods = [];
         this.goodlist.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              
              selfoods.push(food);
            }
          });
        });
        return selfoods
        
      },

     payDesc() {
        if (this.totalPrice.total === 0) {
          return `￥${this.$store.state.minPrice}元起送`;
        } else if (this.totalPrice.total < this.$store.state.minPrice) {
          let diff = this.$store.state.minPrice - this.totalPrice.total;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      }
      
  },

  created(){
     this.getgoodlist()
  },
  methods:{

    showselect(type){

          if(this.typenum == "all" || this.typenum == 2){
            return true
          }else{
            return type === this.typenum;
          }
    },

    selecttab(type){
         this.typenum = type
    },
     selectFood(it){
           this.show4=true
           this.selobj = it

     },
      remove(){
         this.selectFoods.forEach((food) => {
          food.count = 0;
        });
         this.show2 = false
      },
     getgoodlist(){
       
        this.$http.get('/static/data.json').then((res)=>{
               
               let reslist = res.data.goods;
               this.goodlist = reslist

        })
     },
     add(it){
        
        if(!it.count){
          this.$set(it,'count',1)
          
          
        }else{
          it.count++;

          
        }
   
     },

     remo(it){
       if(it.count){
          it.count--;
      if(this.totalPrice.total==0){
        this.show2 = false
      }
          

       }
       
     }
    
     
     
     
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sp-con{ width: 100%; padding:0.2rem; background:#fff;  border-bottom:1px solid rgba(7,17,27,0.1); margin:0.3rem 0; color: #4d555d;}
.yd-scrolltab-title{ font-size:0.1rem; font-weight: 700;  }
.sp-con p{ line-height:0.35rem; margin-top:0.1rem;}
.jsnum span{padding:0 5px;}

.numlist span{ padding: 0 0.1rem; } 
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2050;
  width: 100%;
  height: 48px;
}
.shopcart .content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background: #141d27;
  font-size: 0;
  color: rgba(255,255,255,0.4);
}
.shopcart .content .content-left {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
.shopcart .content .content-left .logo-wrapper {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #141d27;
}
.shopcart .content .content-left .logo-wrapper .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #2b343c;
}
.shopcart .content .content-left .logo-wrapper .logo.highlight {
  background: #00a0dc;
}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
  line-height: 44px;
  font-size: 24px;
  color: #80858a;
}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart.highlight {
  color: #fff;
}
.shopcart .content .content-left .logo-wrapper .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #f01414;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .content .content-left .price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255,255,255,0.1);
  font-size: 16px;
  font-weight: 700;
}
.shopcart .content .content-left .price.highlight {
  color: #fff;
}
.shopcart .content .content-left .desc {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: 10px;
}
.shopcart .content .content-right {
  -webkit-box-flex: 0;
      -ms-flex: 0 0 105px;
          flex: 0 0 105px;
  width: 105px;
}
.shopcart .content .content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
}
.shopcart .content .content-right .pay.not-enough {
  background: #2b333b;
}
.shopcart .content .content-right .pay.enough {
  background: #00b43c;
  color: #fff;
}
.shopcart .ball-container .ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.shopcart .ball-container .ball .inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00a0dc;
  transition: all 0.4s linear;
}
.shopcart .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  -webkit-transform: translate3d(0, -100%, 0);
          transform: translate3d(0, -100%, 0);
}
.shopcart .shopcart-list.fold-enter-active,
.shopcart .shopcart-list.fold-leave-active {
  transition: all 0.5s;
}
.shopcart .shopcart-list.fold-enter,
.shopcart .shopcart-list.fold-leave-active {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.shopcart .shopcart-list .list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .shopcart-list .list-header .title {
  float: left;
  font-size: 14px;
  color: #07111b;
}
.shopcart .shopcart-list .list-header .empty {
  float: right;
  font-size: 12px;
  color: #00a0dc;
}
.shopcart .shopcart-list .list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
}
.shopcart .shopcart-list .list-content .food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  position: relative;
}
.shopcart .shopcart-list .list-content .food::after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7,17,27,0.1);
  content: ' ';
}
.shopcart .shopcart-list .list-content .food .name {
  line-height: 24px;
  font-size: 14px;
  color: #07111b;
}
.shopcart .shopcart-list .list-content .food .price {
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: #f01414;
}
.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 6px;
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7,17,27,0.6);
}
.list-mask.fade-enter-active,
.list-mask.fade-leave-active {
  transition: all 0.5s;
}
.list-mask.fade-enter,
.list-mask.fade-leave-active {
  opacity: 0;
  background: rgba(7,17,27,0);
}

.shopcart .content .content-left .logo-wrapper .logo .highlight {
    color: #fff;
}



</style>
