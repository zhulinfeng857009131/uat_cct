<template>
  <el-container class="cont-conar cont-addjjfa" style="width: 80%;margin-left: auto;margin-right: auto;">
    <el-header style="height: auto;padding: 0 5px;">
	  <h3 v-if="solutionForm.qsku !=null && solutionForm.qsku.length>0" style="line-height: 1.0;color:red;">此方案匹配了QSKU产品料号({{solutionForm.qsku}})，点击提交后将自动审批完成。</h3>
      <h3 style="line-height: 1.8;">请您再次确认项目相关信息，以确保准确</h3>
    </el-header>
    <el-form :model="solutionForm" label-width="100px" class="demo-ruleForm adds" >
      <el-form-item  label="OPP ID" prop="oppID" :rules="[{required: true, message: 'OPP ID不能为空'}]"  style="padding-left: 0;box-sizing: border-box;">
        <el-input v-model="solutionForm.oppID" type="input" placeholder="OP-201210-1234567" />
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName" :rules="[{required: true, message: '项目名称不能为空'}]"  style="padding-left: 0;box-sizing: border-box;">
        <el-input v-model="solutionForm.projectName" type="textarea" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item style="text-align: center;padding: 20px 0;border-top:1px solid #EBEEF5 ;">
        <el-button style="margin-left: -100px;" type="primary" @click="submitSolution">提交</el-button>
        <el-button style="" type="success" @click="back">取消</el-button>
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
      solutionForm: {
        'oppID':'',
        'projectName': '',
				'qsku':''
      },
      showQsku:false,
			productModel:'',
			parentPage:''
    }
  },
  mounted: function() {
    console.log(this.$parent)
    var that = this
  },
  created() {
    console.log(1111)
    console.log(this.$props.lydata.solutionId)
    this.solutionForm['solutionID'] = this.$props.lydata.solutionId;
		this.solutionForm['productModel'] = this.$props.lydata.productModel;
		this.parentPage = this.$props.lydata.parentPage;
		this.quaryStatuscode();
  },
  methods: {
	  quaryStatuscode(){
		  var that = this;
		  var index = that.$layer.loading({ content: 'loading' })
		   quaryStatuscode('solutionId=' + that.solutionForm.solutionID).then((response)=>{
				console.log(response);
				 that.$layer.close(index)
				if(response.code == 0){
				  that.solutionForm.oppID = response.data.solution.oppID;
				  that.solutionForm.projectName = response.data.solution.projectName;
				  that.solutionForm.qsku = response.data.solution.qsku;
				}
		   })
	  },
	  back() {
	    this.$layer.closeAll()
	  },
	  submitSolution(){
		  var that = this;
		  const loading = that.$loading({
		    lock: true,
		    text: '提交中...',
		    spinner: 'el-icon-loading',
		    fullscreen: true,
		    background: 'rgba(0, 0, 0, 0.7)'
		  })
		  if(!that.solutionForm.oppID ){
			  loading.close()
			  that.$message({
			    message: '请填写OPP ID',
			    type: 'warning',
			    offset:200
			  })
			  return
		  }else{
				if (that.solutionForm.oppID) {
				  // Opp ID规则：OP- 开头， 两位年两位月两位日-八位或七位数字
				  let OppArr = that.solutionForm.oppID.split('-')
				  console.log(OppArr)
				  loading.close()
				  if (OppArr.length < 3 || OppArr[0].toUpperCase() != 'OP' || OppArr[1].length != 6 || isNaN(OppArr[1]) ||
				    isNaN(OppArr[2])) {
				    // if((OppArr[2].length == 7 || OppArr[2].length == 8)){
						that.$message.error('Opp ID规则错误');
				    return;
				    // }
				  }
				  var a = OppArr[1].split('')
				  console.log(a)
				  var m = Number(a[2] + a[3])
				  var d = Number(a[4] + a[5])
				  if (m <= 0 || m > 12 || d <= 0 || d > 31) {
						that.$message.error('Opp ID规则错误');
				    return;
				  }
				  if (OppArr[2].length == 7 || OppArr[2].length == 8) {} else {
						that.$message.error('Opp ID规则错误');
				    return;
				  }
				}
			}
		  if(that.solutionForm.projectName.length ==0){
			  loading.close()
			  that.$message({
				message: '请填写项目名称',
				type: 'warning',
				offset:200
			  })
			  return
		  }
		  that.submitCheckSolution();
	  },
	  submitCheckSolution() {
	    var that = this
		const loading = that.$loading({
		  lock: true,
		  text: '提交中...',
		  spinner: 'el-icon-loading',
		  fullscreen: true,
		  background: 'rgba(0, 0, 0, 0.7)'
		})
		console.log('submitCheckSolution');
	    submitCheckSolution(that.solutionForm).then((response) => {
				console.log('submitCheckSolution:success');
				loading.close()
	      if (response.code == 0) {
	        that.$alert(response.msg, '提示', {
	          confirmButtonText: '确定'
	        })
				that.$layer.closeAll();
						// that.$parent.quaryStatuscode()
						// that.$parent.querySolutionById()
						//  that.$router.push({
						// 		path: '/home/solution-list'
						//  })
				// if(that.parentPage == 'imdc'){
				// 	that.$router.push({
				// 	  path: '/solution/detail',
				// 	  query: {
				// 			id: that.solutionForm.solutionID
				// 	  }
				// 	})
				// }else{
				// 	that.$parent.quaryStatuscode()
				// 	that.$parent.querySolutionById()
				// }
				
					that.$router.push({
					  path: '/solution/detail',
					  query: {
							id: that.solutionForm.solutionID
					  }
					})
				
	      } else {
	        that.$alert(response.msg, '提示', {
	          confirmButtonText: '确定'
	        })
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
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before, .el-form-item__error{color:#F33}
</style>
