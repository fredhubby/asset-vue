<template>
<div>
  <h1>这是主页面</h1>
  <span id="usrname">欢迎您：{{ $store.getters.getUser.name }}</span><br/>
  <span id="logintime">登录于：{{ logintime }}</span>
</div>
</template>

<script>
export default {
  name: "Main",
  data () {
    return{
      logintime: Date().toLocaleString()
    }

  }
}
</script>

<style scoped>

</style>