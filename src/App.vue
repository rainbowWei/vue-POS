<template>
  <div id="app">
    <leftNav></leftNav>
    <div class="main">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import leftNav from '@/components/common/leftnav'
export default {
  name: 'App',
  components:{
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main{
  float: left;
  width: 95%;
  background-color:pink
}
</style>
