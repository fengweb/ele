<template>
  <div class="mhead">
     <div class="head-content">
         <yd-list theme="4"> 
          <yd-list-item >
            <img slot="img" :src="headlist.avatar" width="64" height="64">
            <span slot="title">{{ headlist.name }}</span>
            <yd-list-other slot="other">
                <div>
                    <span class="demo-list-price">{{headlist.description}}/{{headlist.deliveryTime}}分钟送达</span>
                    
                </div>
                
                
            </yd-list-other>
            <yd-list-other slot="other">
                <div>
                    <span class="demo-list-price" v-if ="headlist.supports">{{headlist.supports[0].description}}</span>
                    
                </div>
                
                <div v-if ="headlist.supports">{{headlist.supports.length}}个</div>
            </yd-list-other>
        </yd-list-item>
    </yd-list>
  
     </div>
     <div class="bulletin-wrapper" @click="">
      <span class="bulletin-title"></span><span class="bulletin-text">{{headlist.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="headlist.avatar" width="100%" height="100%">
    </div>
  </div>

</template>

<script>
export default {
  name: 'mhead',
  data () {
    return {

       headlist:{}
       
    }
  },
   created(){
     // this.$store.state.deliveryPrice = 1
    
     this.getcontent()
  },

  methods:{
     getcontent(){
       
        this.$http.get('/static/data.json').then((res)=>{
               console.log(res);
               let reslist = res.data.seller;
               this.headlist = reslist;
              this.$store.state.deliveryPrice = reslist.deliveryPrice
              this.$store.state.minPrice = reslist.minPrice



        })
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mhead{
    position: relative;
    color: #fff;
    overflow: hidden;
    background: rgba(7,17,27,0.5);}
.head-content{    
    position: relative;
    padding: 18px 12px 18px 18px;}

.background{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-filter: blur(10px);
    filter: blur(10px);
}
.mhead .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
  }
  .mheader .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
}
</style>

























































