<template>
  <div id="app">
    <ViewTrans/>
</div>
</template>
<script>
import ViewTrans from './components/ViewTrans.vue'
export default {
  name: 'App',
  components: {
    ViewTrans
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
  margin-top: 60px;
}
</style>
