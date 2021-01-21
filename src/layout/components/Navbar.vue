<template>
  <div class="navbar">
    <el-header class="top">
      <el-row>
        <el-col :span="5" class="top-l">
          <img src="@/assets/img/logo.png" alt="">
        </el-col>
        <el-col :span="14" class="top-c">
          <el-row type="flex" class="topc" justify="center">
            <el-col :span='4' style="cursor: pointer;">
              <router-link to="/index" tag="div">
                <img src="@/assets/img/top1.png" alt="">
                <p>解决方案列表</p>
              </router-link>
            </el-col>
            <el-col :span='4' style="cursor: pointer;">
              <!--  class="active" -->
              <router-link to="/solution" tag="div">
                <img src="@/assets/img/top2.png" alt="">
                <p>新建解决方案</p>
              </router-link>
            </el-col>
           <!-- <el-col :span='4' style="cursor: pointer;">
                <img src="@/assets/img/top3.png" alt="">
                <p>典型方案</p>
            </el-col> -->
            <el-col :span='4' style="cursor: pointer;">
              <router-link to="/product/index" tag="div">
                <img src="@/assets/img/top4.png" alt="">
                <p>新品推荐</p>
              </router-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="top-r" style="font-size: 12px;">
          <el-row type="flex" justify="right" :gutter="10">
            <el-col :span="14" style="cursor:pointer"  >
              <i @click="updateUserMsg"><img src="@/assets/img/topr1.png" alt="" ></i>
              <span @click="updateUserMsg">欢迎 {{user}}</span>
            </el-col>
            <el-col :span="10" style="cursor: pointer;">
              <i  @click="tologout"><img src="@/assets/img/topr2.png" alt=""></i>
              <span  @click="tologout">注销</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import '~@/assets/css/global.css';

  .topc .active {
    padding-bottom: 18px;
  }
</style>
<script>
  import{logout} from '@/api/user'
  import {
		getToken,
    removeToken,
    getuserName
  } from '@/utils/auth'
  import store from '@/store'
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        user: '12',
      }
    },
    created() {
      this.user = Cookies.get('setuserName')
			//console.log("userName:"+unescape(Cookies.get('setuserName')));
			//console.log("userName:"+decodeURI(Cookies.get('setuserName')));
    },
    methods: {
      tologout() {
      var that = this
      var layer = that.$layer.confirm('您确定要退出登录？', {
        btn: ['确定', '取消'] // 按钮
      }, function(e) {
        that.$layer.loading({ content: '', shade: [0.8, '#393D49']})
     
       window.open('https://identity-stg.schneider-electric.com/identity/IDMSC_IDPSloInit?RelayState=https://cct-test.schneider-electric.cn/cct/oauth/uatlogout','_self');
	   removeToken()
	   that.$layer.closeAll();
      }, function() {
         that.$layer.close(layer)
      })     
      },
	  updateUserMsg(){
		  window.open('https://identity-stg.schneider-electric.com/identity/UserProfile?app=ChinaConfiguratorsTool','_self');
	  }
    }
  }
</script>
