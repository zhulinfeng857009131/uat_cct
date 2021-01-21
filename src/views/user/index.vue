<template>
  <div class="user-table" style="min-width: 1300px;margin: 0 50px;">
      <h2 style="background-color: #f1f2f7;padding: 12px 20px;font-size: 16px;">用户管理</h2>
      <div>
        <el-form :inline="true" style="margin: 15px 25px;">
          <el-form-item>
            <el-input v-model="sedData.username" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin: 15px 25px;">
        <el-table :data="userData" style="width: 100%;">

          <el-table-column prop="userNumber"  label="员工号" width="150"> </el-table-column>
          <el-table-column prop="decodeURIComponent(username)" label="姓名" sortable width="180"> </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable  width="180"> </el-table-column>
          <el-table-column prop="mobile" label="手机号" sortable width="180"> </el-table-column>
          <el-table-column prop="roleName" label="用户角色" sortable> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <div class="user-oper">
              <span @click="infoUser(scope.row)">用户权限</span>
              <span @click="userStatus(scope.row)" style="color: #FFF;background-color: #F33;border-color: #f33;" v-if="scope.row.status == 1">禁用</span>
              <span @click="userStatus(scope.row)" style="color: #FFF;background-color: #409EFF;border-color: #409EFF;" v-if="scope.row.status == 0">启用</span>
            </div>
            </template>
          </el-table-column>
        </el-table>

        <el-row>
          <el-col :span="24" class="pages">
            <el-pagination
              small
              layout="total,prev, pager, next"
              :current-page.sync="sedData.page"
              :page-size="sedData.limit"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }
  .user-table{
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .user-table .el-table .has-gutter tr th{
    background-color: #f1f2f7 !important;
    color: #000;
  }
  .user-oper span{
    padding: 3px 10px;
    border: 1px solid #ccc;
    display: inline-block;
    margin-right: 15px;
    border-radius: 3px;
    cursor: pointer;
  }
  .pages {
    text-align: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #EBEEF5;
  }

  .pages span {
    margin-left: 15px;
    margin-right: 15px;
  }
</style>
<script>
  import {
    userlist,userStatus,infoUser
  } from '@/api/movie'
  import {
    roleList
  } from './components'
export default {
  name: 'product',
  data() {
    return {
      searchName:'',
      sedData: {
        page: 1,
        limit: 10,
        region: '',
        upTime: 0,
        username:''
      },

      total: 0,
        userData: [],
    }
  },
  mounted: function() {
    var that = this;
    that.showData()
  },
  created() {
  },
  methods: {
    userStatus(row){
      var that = this;
        let s = ''
        status = row.status == 1 ? '0' : '1';
        s = row.status == 1 ? '禁用' : '启用';
        s += row.username
        this.$confirm('确定要'+s+'用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // {userId:row.userId+'',status:status}
          userStatus({userId:row.userId+'',status:status}).then((response) => {
            const {
              data
            } = response
            row.status = row.status == 1 ? '0' : '1'
            this.$message({message:response.msg,type: 'success'});
            console.log(response)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    infoUser(row){
      var that = this;
        console.log(row)
        this.$layer.iframe({
          content: {
            content: roleList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              userId:row.userId
            } // props
          },
          shade: true,
          shadeClose: false,
          area: ['800px', '600px'],
          title: "<span style='color:#6bc966'>"+row.username+'</span>权限修改',
          cancel: () => { // 关闭事件

            that.showData()
          }
        })
    },
    showData(){
      var that = this;
      userlist(that.sedData).then((response) => {
        const {
          data
        } = response
        that.userData = data.records
        that.size = data.size
        that.total = data.total
        // that.loadingf = false
        that.totalNumber = Math.ceil(data.total / data.size)
      })
    },
    handleCurrentChange(val) {
      this.sedData.page = val
      this.showData()
      console.log(val)
    },
    onSubmit(){
      var that = this;
      that.showData()
    }
  }
}
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
</style>
