<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "@/views/Index.vue";

export default {
  name: "app",
  components: {
    Index,
  }
};
</script>

<style lang="less">

@media screen and (min-width: 1000px) {
  html {
    font-size: 100px !important;
  }

}

.mt-10 {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 15px;
}

.mt-20 {
  margin-top: 20px;
}

h1 {
  font-size: 25px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  color: #333333;
  font-size: 15px
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    color: #333333;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  margin: 0;
  padding: 0;
}
</style>
