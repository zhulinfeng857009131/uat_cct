<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">选型工具</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="UserName"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- parseInt(new Date(that.sedData.endTime1).getTime()) -->

      <!-- <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
        <img :src="url+''+loginForm.time" style="position: absolute;right:0" @click="newups()">
      </el-form-item> -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips" style="display: none;">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { setToken,setuserName } from '@/utils/auth'
import { validUsername } from '@/utils/validate'
import { upms } from '@/api/movie'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // callback(new Error('Please enter the correct user name'))
        callback()
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback()
        // callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        time: ''
      },
      // url:'http://221.122.93.58:9090/api/oauth/captcha.jpg?uuid=',
      url: 'http://oauth.cct-uat.10.155.100.204.xip.io/cct-oauth/captcha.jpg?uuid=',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {

  },
  created() {
    this.loginForm.time = parseInt(new Date().getTime())
    console.log(2222)
		const hostname = document.location.hostname;
		console.log('hostname:'+hostname);
		// if(hostname === 'cct-test.schneider-electric.cn' && JSON.stringify(this.getHashParameters()) === '{}'){
		//    window.open('https://identity-stg.schneider-electric.com/ui/#!/login?app=ChinaConfiguratorsTool','_self');
		// 	//window.close();
		// }
  //   console.log('hash:' + location.hash)
  //   console.log('param: ' + JSON.stringify(this.getHashParameters()))
  //   if (JSON.stringify(this.getHashParameters()) !== '{}') {
  //     setToken(this.getHashParameters().token)
  //     Cookies.set('setuserName', this.getHashParameters().userName)
  //     this.$router.push({ path: this.redirect || '/' })
  //   }
  },
  methods: {
    getHashParameters() {
      var params = {}
      console.log((location.hash).indexOf('?token='))
      if ((location.hash).indexOf('?token=') !== -1) {
		  var arr = (location.hash || '').split('?')[1].split('&')
        for (var i = 0; i < arr.length; i++) {
			  var data = arr[i].split('=')
			  if (data.length === 2) {
			  params[data[0]] = data[1]
			  }
        }
      }

      return params
    },
    newups() {
      this.loginForm.time = parseInt(new Date().getTime())
    },
    // upms() {
    //   var that = this;
    //   upms("uuid=" + 12223443232).then((response) => {
    //     const { data } = response;
    //     console.log(data)
    //     that.tableData = data.statuscodes;
    //     that.titleData = data.solution;
    //   })
    // },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // this.$router.push({ path: this.redirect || '/' })
      // var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 代码调到了src/store下的user.js,调用了里面的login方法
          this.$store.dispatch('user/login', this.loginForm).then((response) => {
            console.log(1, this.redirect, response)
            this.newups()
            // return;
            // Cookies.set(setuserName, token)
            // this.$router.push({ path: '/home1' })
            // sessionStorage.setItem('user',that.loginForm.username)
            this.$router.push({ path:  '/' })
            console.log('login')
            this.loading = false
          }).catch(error => {
            console.log('err:', error)
            // this.$router.push({ path: this.redirect || '/' })
            // this.$router.push({path: this.redirect || '/'})
            this.loading = false
          })
        } else {
          this.newups()
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协�和光标变�*/
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
