<template>
  <el-container class="cont-conar cont-addjjfa" style="width: 80%;margin-left: auto;margin-right: auto;">
    <el-header style="height: auto;padding: 0 5px;">
      <h2 style="line-height: 1.8;">解决方案审核</h2>
    </el-header>

    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm adds">

      <el-form-item label="审核状态" prop="pass">
        <el-select v-model="ruleForm.pass" @change="judgeQsku">
          <el-option key="0" label="通过" value="0" />
          <el-option key="1" label="拒绝" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="showQsku" label="QSKU号" prop="qsku" style="padding-left: 0;box-sizing: border-box;">
        <el-input v-model="ruleForm.qsku" type="input" placeholder="请输入QSKU号" />
      </el-form-item>
      <el-form-item label="审核说明" prop="remarks" style="padding-left: 0;box-sizing: border-box;">
        <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入审核说明" />
      </el-form-item>
      <el-form-item style="text-align: center;padding: 20px 0;border-top:1px solid #EBEEF5 ;">
        <el-button style="margin-left: -100px;" type="primary" @click="save">保存</el-button>
        <el-button style="" type="success" @click="back">返回</el-button>
      </el-form-item>
    </el-form>

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
import {
  judgeQsku,checkSolution
} from '@/api/movie'
  // quaryMemberlist
export default {
  name: 'Audit',
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
      ruleForm: {
        'pass': '0',
        'qsku':'',
        'remarks': ''
      },
      showQsku:false
    }
  },
  mounted: function() {
    console.log(this.$parent)
    var that = this
  },
  created() {
    console.log(1111)
    // this.quaryMemberlist()
    // this.GetListImg();
    // this.addSndSolution();
    console.log(this.$props.lydata.solutionId)
    this.ruleForm['solutionID'] = this.$props.lydata.solutionId;
    this.judgeQsku();
  },
  methods: {
    save() {
      var that = this;
      if (that.ruleForm.pass == 1 && that.ruleForm.remarks.length <= 0) {
        that.$message({
          message: '请输入审核不通过说明！',
          type: 'warning',
          offset:200
        })
        return
      }

      if(that.showQsku == true && that.ruleForm.pass == 0 && that.ruleForm.qsku.length <= 0){
        var layer = that.$layer.confirm('您确定不创建新的QSKU号吗？', {
          btn: ['确定', '取消'] //按钮
        }, function(e) {
         that.check()
        }, function() {
          that.$layer.close(layer);
        });
      }else{
        that.check()
      }
    },
    back() {
      this.$layer.closeAll()
    },
    judgeQsku(){
      var that = this;
      judgeQsku(that.ruleForm).then((response)=>{
        console.log(response);
        if(response.status == 0){
          if(response.qsku == 1 && that.ruleForm.pass == 0){
            that.showQsku = true;
          }else{
            that.showQsku = false;
          }
        }
      })
    },
    check() {
      var that = this;
      that.$layer.loading({content:'请等待'});
      checkSolution(that.ruleForm).then((response) => {
        console.log(response);
        setTimeout(function() {
          that.$layer.closeAll()
        }, 300)
        if(response.status == 0){
          that.$message({
            message: '审核成功！',
            type: 'success',
            offset:'250'
          })
        }else if(response.status == 1){
          that.$message({
            message: '此方案已经审核过了！',
            type: 'warning',
            offset:'250'
          })
        }else{
          that.$message({
            message: '审核失败！',
            type: 'warning',
            offset:'250'
          })
        }
        setTimeout(function() {
         that.$router.push({
               path: '/home/solution-list'
             })
        }, 1500)
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
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before, .el-form-item__error{color:#F33}
</style>
