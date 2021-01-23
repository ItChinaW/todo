<template>
  <el-container>
    <el-header>
      清单列表
      <div class="logout" @click="logout()">登出</div>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :span="12">
          <div class="grid-content">
            <el-divider>
              <h1>Todo清单</h1>
            </el-divider>
            <TodoList></TodoList>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>FrontEnd by <a href="https://github.com/Q1mi" target="_blank">Qimi</a> BackEnd by <a
        href="https://www.wuyaw.com" target="_blank">wuya</a> <a href="http://beian.miit.gov.cn/">浙ICP备19006613号-5</a>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";

export default {
  name: "Index",
  components: {
    TodoList
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({path: "login"})
    }
  }
};
</script>
<style scoped>
@media screen and (min-width: 300px) and (max-width: 1000px) {

  footer {
    display: none !important;
  }
}


.logout {
  position: absolute;
  top: 0;
  right: .5rem;
  cursor: pointer;
  font-size: 15px;
}

.el-header,
.el-footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}

.el-footer {
  background-color: #909399;
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0;
  font-size: .15rem;
}
</style>
