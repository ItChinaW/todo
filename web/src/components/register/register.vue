<template>
  <div class="box">
    <div class="topBar mt-10">
      <span><a href="/">返回首页 | </a></span>
      <span><a href="/#/login">返回登录</a></span>
    </div>
    <div class="container">
      <div class="login">
        <p class="logo"><img src="@/assets/logo.jpg"></p>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password class="mt-10"></el-input>
        <div class="mt-15">
          <el-button type="info" @click="reset()">重置</el-button>
          <el-button @click="submit()" type="primary">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {register} from '@/api/http'

export default {
  name: "register",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submit() {
      if (this.username === "" || this.password === "") {
        this.$message({
          showClose: true,
          message: '姓名或者密码为空',
          type: 'error'
        })
      }
      register({username: this.username, password: this.password}).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", this.username)
          localStorage.setItem('id', res.data._id)
          location.href = "/"
        } else {
          this.$message({
            showClose: true,
            message: '注册失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    reset() {
      this.username = ""
      this.password = ""
    },
  }
}
</script>
<style scoped lang="less">
.box {
  width: 7.5rem;
  margin: 0 auto;

  .topBar a {
    font-size: 14px;
    color: #72767b;
  }

  .container {
    height: 87vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      text-align: center;

      .logo {
        margin-bottom: -15px;

        img {
          width: 200px;
        }
      }
    }
  }
}
</style>
