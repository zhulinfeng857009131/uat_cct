<template>
<div>
  <el-form ref="form" :model="userRole" label-width="80px" style="margin-top: 30px;margin-left: 99px;width: 600px;">
    <el-form-item label="用户名:">
      {{userInfo.username}}
    </el-form-item>
    <el-form-item label="用户邮箱:">
      {{userInfo.email}}
    </el-form-item>
    <el-form-item label="手机号:">
      {{userInfo.mobile}}
    </el-form-item>
    <el-form-item label="用户角色:">
      <el-checkbox-group  v-model="userRole.type" @change="showUserRole">
        <el-checkbox v-for="data in userRoleTitle" :label="data.roleId" name="type">{{data.roleName}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!--   v-show="codeListFlag" -->
    <template v-if="codeListFlag">
    <el-form-item label="审核区域:">
      <el-checkbox-group  v-model="userRole.type1">
        <el-checkbox v-for="data in codeListA" :label="data.areaCode" name="type">{{data.area}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    </template>
    <!--   v-show="queryListFlag" -->
    <template v-if="queryListFlag">
    <el-form-item label="产品列表:">
      <el-checkbox-group  v-model="userRole.type2">
        <el-checkbox v-for="data in queryListA" :label="data.code" name="type">{{data.content}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    </template>
  <el-form-item style="margin-left: -80px;text-align: center;">
    <el-button type="primary" @click="onSubmit">确定修改</el-button>
  </el-form-item>
  </el-form>
</div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }
</style>
<script>
  // codeList  审核人的  审核区域
  // queryList 产品的   产品列表
  import {
    infoUser,roleList,updateRole,codeList,queryList
  } from '@/api/movie'
  export default {
    name: 'solution-add',
    props: {
      info: {
        type: Object,
        default: () => {
          return {}
        }
      },
      layerid: {
        type: String,
        default: ''
      },
      lydata: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        fullscreenLoading: false,
        userId:'',
        userInfo:{
          userName:123
        },
        userRole:{
          type:'',
          type1:[1],
          type2:[2],
        },
        codeList:{
          type:''
        },
        queryList:{
          type:''
        },
        codeListFlag:false,
        queryListFlag:false,
        userRoleTitle:{},
        codeListA:{},
        queryListA:{}
      }

    },
    mounted: function() {
    },
    created() {
      var that = this;
      that.userId = this.$props.lydata.userId
      //
  // codeList  审核人的  审核区域
  // queryList 产品的   产品列表
      this.userInfoA()
      this.roleList()
      // this.codeListshow()
      // this.queryListshow()


    },
    methods: {
      userInfoA(){
        var that = this;
        infoUser(that.userId).then((response) => {
          const {
            data
          } = response
          that.userInfo = response.user;
          that.userRole.type = response.user.roleIdList
          that.userRole.type2 = response.user.productList ?  response.user.productList :[]
          that.userRole.type1 = response.user.areaIdList ?response.user.areaIdList  :[]
          if(that.userRole.type1.length > 0){
            that.codeListFlag = true
          }
          if(that.userRole.type2.length > 0){
            that.queryListFlag = true
          }
          console.log('that.userRole.type',that.userRole.type)
        })
      },
      showUserRole(){
        let that = this
         console.log('1111',that.userRole.type)
         let arr = that.userRole.type;
         if(arr.indexOf(4) != -1){
           // // 方案审核人
           // codeListFlag:false,
           // queryListFlag:false,
           this.fullscreenLoading = true;
           that.codeListFlag = true
         }else{
           that.codeListFlag = false;
           that.userRole.type1 = []
         }
         if(arr.indexOf(7) != -1){
           // 产品经理
           this.fullscreenLoading = true;
           that.queryListFlag = true
         }else{
           that.queryListFlag = false
           that.userRole.type2 = []
         }
      },
      codeListshow(){
        var that = this;
        codeList({}).then((response) => {
          const {
            data
          } = response
          that.codeListA = data
          that.fullscreenLoading = false;
          console.log('that.codeListA',that.codeListA)
        })
      },
      queryListshow(){
        var that = this;
        queryList({}).then((response) => {
          const {
            data
          } = response
          that.queryListA = data
          that.fullscreenLoading = false;
          console.log(that.queryListA )
        })
      },
      roleList(){
        var that = this;
        roleList({}).then((response) => {
          const {
            data
          } = response
          that.userRoleTitle = data.rolelist
          that.codeListA = data.arealist
          that.queryListA = data.productlist
          console.log(that.userRoleTitle )
        })
      },
      onSubmit(){
        var that = this;
        // codeList
        // queryList
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let a = that.userRole.type.toString()
        let obj = {
          userId:that.userId,
          roleIds:a,
          areaIds:that.userRole.type1.toString(),
          productIds:that.userRole.type2.toString()
        }
        console.log(obj)
        let arr = that.userRole.type;
        if(arr.indexOf(4) != -1){
          if(that.userRole.type1.toString().length <= 0){
            this.$alert('请选择审核区域', '提示', {
              confirmButtonText: '确定',
              type:'error'
            });loading.close();
            return;
          }
        }
        if(arr.indexOf(7) != -1){
          if(that.userRole.type2.toString().length <= 0){
            this.$alert('请选择产品列表', '提示', {
              confirmButtonText: '确定',
              type:'error'
            });loading.close();
            return;
          }
        }
        console.log(obj)
        updateRole(obj).then((response) => {
          const {
            data
          } = response
              this.$parent.showData()
          if(response.code == 0){
            loading.close();
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$layer.closeAll()
              }
            });
          }
        })
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
