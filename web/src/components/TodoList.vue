<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="16" :offset="2">
        <el-input v-model="newTitle" size placeholder="请输入待办事项..."/>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" circle></el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @cell-dblclick="edit">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="待办事项" prop="title" align="center"></el-table-column>
      <el-table-column label="时间" prop="time" sortable  align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
              type="success"
              icon="el-icon-check"
              v-show="!tag(scope.row.status)"
              @click="handleEdit(scope.$index, scope.row)"
              style="margin:0 0 5px 10px"
              circle
          ></el-button>
          <el-button
              type="warning"
              icon="el-icon-refresh-left"
              v-show="tag(scope.row.status)"
              @click="handleEdit(scope.$index, scope.row)"
              circle
          ></el-button>
          <el-button
              type="danger"
              icon="el-icon-close"
              @click="handleDelete(scope.$index, scope.row._id)"
              circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {addTodo, getTodo, deleteTodo, putTodo} from "@/api/http"
import parseTime from "@/utils/time";

export default {
  name: "TodoList",
  data() {
    return {
      tableData: [],
      newTitle: "",
      status: false
    };
  },
  mounted() {
    getTodo().then(response => {
      this.tableData = response.data
    })
    let _this = this
    document.onkeydown = function (oEvent) {
      if (oEvent.ctrlKey === true && oEvent.code === "Enter") {
        _this.handleAdd()
      }
    }
  },
  methods: {
    tag(t) {
      if (t === true) return true
      if (t === false) return false
      if (t === "true") return true
      if (t === "false") return false
    },
    async edit(title) {
      this.$prompt('修改您的清单', '操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[^\s].*/,
        inputValue: title.title,
        inputErrorMessage: '格式不正确'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '修改成功: ' + value,
        });
        putTodo(title._id, title.status, value).then(() => {
          this.getTodoList()
        })
      }).catch(() => {
      });
    },
    tableRowClassName({row}) {
      if (this.tag(row.status)) {
        return "success-row";
      } else {
        return "";
      }
    },
    async getTodoList() {
      getTodo()
          .then(async response => {
            this.tableData = await response.data
          });
    },
    async handleEdit(index, row) {
      let messageSuffix = this.tag(row.status) ? " 置为未完成" : " 置为已完成";
      putTodo(row._id, !this.tag(row.status), row.title)
          .then(() => {
            this.tableData[index].status = !this.tag(row.status);
            this.$message({
              showClose: true,
              duration: 1500,
              message: `<${row.title}> ${messageSuffix}`,
              type: "success"
            });
          });
    },
    async handleDelete(index, id) {
      deleteTodo(id).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          showClose: true,
          duration: 1500,
          message: "删除待办事项成功",
          type: "success"
        });
      });
    },
    async handleAdd() {
      if (this.newTitle != "") {
        addTodo({
          title: this.newTitle,
          time: parseTime(),
          status: this.status,
          id: localStorage.getItem('id')
        }).then(() => {
          this.getTodoList();
          this.$message({
            showClose: true,
            duration: 1500,
            message: "添加待办事项成功",
            type: "success"
          });
        });
        this.newTitle = "";
      } else {
        this.$message({
          showClose: true,
          duration: 1500,
          message: "title不能为空哦",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  text-decoration: line-through;
}
</style>
