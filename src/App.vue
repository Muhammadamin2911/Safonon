<template>
  <div>
    <Loginpage v-if="!isLogged"/>
    <Home v-else/>
  </div>
</template>


<script>
import Loginpage from '../src/pages/loginpage/Loginpage.vue'
import Home from './pages/home/Home.vue'
export default {
  name: "App",
  data(){
    return{
      isLogged:false
    }
  },
  components: {
    Loginpage,
    Home
  },
  mounted(){
    let token = localStorage.getItem("token")

    if(token){
      this.isLogged=true
    }
    else{
      this.isLogged=false
    }
  }
}
</script>
<style>
  
</style>