<template>
  <div class="index">
     <Mlist></Mlist>
  </div>
</template>

<script>
import Mlist from "../components/mlist"
export default {
	components:{
     Mlist
  },
  name: 'index',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
