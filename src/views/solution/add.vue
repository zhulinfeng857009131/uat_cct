<template>
  <div id="">
    <el-container class="cont-conar cont-addjjfa" style="width: 50%;margin-left: auto;margin-right: auto;">
      <el-header style="height: auto;padding: 0 5px;">
        <h2 style="line-height: 1.8;">新建解决方案</h2>
      </el-header>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm adds">
        <el-form-item label="CCT编号" style="padding-left: 1px;">
          <el-input v-model="ruleForm.pdpNumber" value="" class="dised" readonly style="border: 0;"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="Opp ID" prop="oppID">
          <el-input v-model="ruleForm.oppID" placeholder="OP-191011-8230251 "></el-input>
        </el-form-item>
        <el-form-item label="施耐德电气销售" prop="salesUserID">
          <el-select style="width: 100%;" v-model="ruleForm.salesUserID" :loading="loading" :remote-method="showName"
            remote reserve-keyword filterable placeholder="请选择内部销售">


            <el-option :label="decodeURIComponent(item.realName)" :value="item.id" :key='item.id' v-for="item in operatorList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" style="padding-left: 1px;" class="gray">
          <el-input v-model="username" class="dised" readonly style="border: 0;color: :#ccc;"></el-input>
        </el-form-item>
        <el-form-item label="代理商公司" prop="ChannelName">
          <el-select style="width: 100%;" v-model="ruleForm.channelName" :loading="loading" :remote-method="showCompnay"
            remote reserve-keyword filterable placeholder="请选择代理商名称">
            <el-option :label="item.companyName" :value="item.id" :key='item.id' v-for="item in memberlist"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="Remarks" style="padding-left: 0;box-sizing: border-box;">
          <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注信息"></el-input>
        </el-form-item> -->
        <el-form-item style="text-align: center;padding: 20px 0;border-top:1px solid #EBEEF5 ;">
          <el-button style="width: 180px;" type="primary" @click="addSndSolution('ruleForm')">开始设计</el-button>
        </el-form-item>
      </el-form>

    </el-container>

  </div>

  </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }

  .gray .el-input.dised .el-input__inner {
    color: #ccc
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

  .adds.el-form-item--mini.el-form-item,
  .adds .el-form-item--small.el-form-item {
    margin-bottom: 22px !important;
  }
</style>
<script>
import Cookies from 'js-cookie'
  import {
    addSndSolution,
    quaryMemberlist,
    quaryoper,
    merlist
  } from '@/api/movie'
  export default {
    name: 'solutionAdd',
    data() {
      return {
        loading: false,
        state1: '',
        restaurants: [],
        operatorList: [],
        memberlist: [],
        visible: false,
        username: '',
        ruleForm: {
          "pdpNumber": "",
          "projectName": "",
          "channelName": "",
          "salesUserID": '',
          "remarks": "",
          "oppID": ""
        },
        rules: {
          projectName: [{
            required: true,
            message: '请输入项目名字',
            trigger: 'blur'
          }],
          salesUserID: [{
            required: true,
            message: '请选择内部销售',
            trigger: 'change'
          }],
        }
      }

    },
    mounted: function() {
    },
    created() {
      this.quaryMemberlist()
    },
    methods: {

      showName(params) {
        let query = params;
        let value = params;
        let that = this
        let obj = {
          oper: params
        }
        quaryoper(obj).then((response) => {
          const {
            data
          } = response
          this.operatorList = data;
        })
      },

      showCompnay(params) {
        let query = params;
        let value = params;
        let that = this
        let obj = {
          mber: params
        }
        merlist(obj).then((response) => {
          const {
            data
          } = response
          this.memberlist = data;
        })
      },

      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.realName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },


      handleSelect(item) {
        console.log(item);
      },
      addSndSolution(formName) {
        var that = this;
        if (that.ruleForm.oppID) {
          // Opp ID规则：OP- 开头， 两位年两位月两位日-八位或七位数字
          let OppArr = that.ruleForm.oppID.split('-')
          console.log(OppArr)
          if (OppArr.length < 3 || OppArr[0].toUpperCase() != 'OP' || OppArr[1].length != 6 || isNaN(OppArr[1]) ||
            isNaN(OppArr[2])) {
            // if((OppArr[2].length == 7 || OppArr[2].length == 8)){
            this.$message.error('Opp ID规则错误');
            return;
            // }
          }
          var a = OppArr[1].split('')
          console.log(a)
          var m = Number(a[2] + a[3])
          var d = Number(a[4] + a[5])
          if (m <= 0 || m > 12 || d <= 0 || d > 31) {
            this.$message.error('Opp ID规则错误');
            return;
          }
          if (OppArr[2].length == 7 || OppArr[2].length == 8) {} else {
            this.$message.error('Opp ID规则错误');
            return;
          }
        }
        console.log(that.ruleForm);
        // return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this
            addSndSolution(that.ruleForm).then((response) => {
              const {
                data
              } = response
              this.$router.push({
                  path: '/solution/complete',
                  query: {
                    id: data.solutionId,
                  },
                }

              )
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      quaryMemberlist() {

        var that = this;
        quaryMemberlist().then((response) => {
          const {
            data
          } = response;
          that.ruleForm.pdpNumber = data.PDPNumber;
          that.ruleForm.username = data.userName;
          // 代理商
          that.memberlist = data.memberlist;
          if (data.memberlist.length > 0) {
            that.ruleForm.channelName = data.memberlist[0].id
          }
          if (data.operatorList.length) {
            that.ruleForm.salesUserID = data.operatorList[0].id
          }
          // 内部销售
          that.operatorList = data.operatorList;
          //that.username = decodeURI(data.userName)
          that.username = Cookies.get('setuserName')
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

  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
  .el-form-item__error {
    color: #F33
  }
</style>
