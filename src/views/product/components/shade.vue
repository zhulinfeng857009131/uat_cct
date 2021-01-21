<template>
  <el-container class="cont-conar cont-addjjfa" style="width: 80%;margin-left: auto;margin-right: auto;padding-right: 10px;">
    <el-header style="height: auto;padding: 0 5px;margin-bottom:20px">
      <p style="line-height: 1.8;">请输入需要分享的邮箱地址，多个邮箱请用 ；隔开。</p>
    </el-header>
        <el-input
          type="textarea"
          :rows="7"
          placeholder="请输入内容"
          v-model="shadeText">
        </el-input>
      <div style="margin: 35px auto;text-align: center;">
        <img style="cursor: pointer;" src="@/assets/img/shade-sh.png">
      </div>
  </el-container>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }
  .gray .el-input.dised .el-input__inner{
    color:#ccc
  }
  #app {
    min-width: 1300px;
  }

  .demo-ruleForm {
    border: 1px solid #EBEEF5;
    background-color: #fff;
    padding: 20px 30px 10px;
  }

  .el-input.dised .el-input__inner {
    color: #333;
    border: 0;
    background-color: #fff;
  }

  .el-form-item__label {
    /* text-align: left; */
  }

  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
  .el-form-item__error {
    color: #6bc966;
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus {
    border-color: #6bc966;
  }
  .adds.el-form-item--mini.el-form-item, .adds .el-form-item--small.el-form-item {
      margin-bottom: 22px !important;
  }
</style>

<script>
import {quaryStatuscode,updateSndSolution,submitCheckSolution} from '@/api/movie'
export default {
  name: 'checkTips',
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
      shadeText:''
    }
  },
  mounted: function() {
    console.log(this.$parent)
    var that = this
  },
  created() {
  },
  methods: {
    back() {
	    this.$layer.closeAll()
	  },

  }

}
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before, .el-form-item__error{color:#F33}
</style>
