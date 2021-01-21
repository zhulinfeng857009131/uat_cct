<template>
  <div class="cont-conar cont-addjjfa" style="width: 90%;margin-left: auto;margin-right: auto;padding-right: 10px;">
    <p>
      <img :src="data.imgc" style="width: 100%;display: block;mask-origin: 10px auto;" alt="">
    </p>
  </div>
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
      data:{}
    }
  },
  mounted: function() {
    console.log(this.$parent)
    var that = this
  },
  created() {
    this.data = this.$props.lydata.data
    console.log(data)
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
