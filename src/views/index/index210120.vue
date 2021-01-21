<template>
  <div id="">
    <el-row class="cont-conar" type="flex" align="middle" style="background-color: #fff;margin-top: 0;padding-top: 30px;">
      <el-form ref="form" :model="sedData" label-width="6em" type="flex">
        <el-row class="search">
          <el-col :span="5">
            <el-form-item label="CCT编号/ISX号:" label-width="125px">
              <el-input v-model="sedData.pdpNumber" placeholder="请输入CCT编号/ISX号" />
            </el-form-item>
            <el-form-item label="施耐德电气销售:" label-width="125px">
              <el-select
                v-model="sedData.salesUserID"
                :loading="loading"
                :remote-method="showName"
                remote
                reserve-keyword
                clearable
                filterable
                placeholder="请你选择销售"
              >
                <el-option v-for="item in fdata.operatorList" :key="item.id" :label="decodeURIComponent(item.realName)" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-col :span="12">
              <el-form-item label="项目名称:">
                <el-input v-model="sedData.projectName" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="OPP ID:">
                <el-input v-model="sedData.oppID" placeholder="OPP ID" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="方案状态:">
                <el-select v-model="sedData.region" clearable placeholder="请选择方案状态" style="width: 100%;">
                  <el-option v-for="value,index in fdata.schemeList" :label="value" :value="value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="9">
            <el-form-item label=" " label-width="2em">
              <el-col :span="5" style="margin-right: 1em;">
                <el-select v-model="sedData.upTime">
                  <el-option v-for="value,index in upTimeList" :label="value==0 ? '创建日期' : '修改日期'" :value="value" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-date-picker v-model="sedData.statrTime1" type="date" placeholder="开始日期" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2" style="text-align: center;">到</el-col>
              <el-col :span="8">
                <el-date-picker v-model="sedData.endTime1" type="date" placeholder="结束日期" style="width: 100%;" />
              </el-col>
            </el-form-item>
            <el-form-item label="方案类型:" label-width="105px">
              <el-col :span="24">
                <el-select v-model="sedData.code" clearable placeholder="请选择方案类型" filterable class="toppicker" style="width: 99%;color: #6bc966;">
                  <template v-for="item in fdata.sndTwoList">
                    <el-option :key="item.code" :label="item.content" :value="item.code" />
                    <el-option v-for="data in item.statuscodeList" :key="data.code" :label="'--'+data.content" :value="data.code" />
                  </template>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-form-item label-width="2em" style="margin-top: 11px;">
              <el-col :span="2" style="height:74px;width:1px;background-color: #DCDFE6;text-align: center;" />
              <el-col :span="22" style="text-align: center;"><img
                src="@/assets/img/search.png"
                style="cursor: pointer; margin-left:5px;margin-top: 22px;"
                alt=""
                @click="querySndSolution('search','search')"
              ></el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-container class="cont-conar cont-jjfa" style="margin-top: 0;">
      <el-header style="height: auto;padding: 0 5px;">
        <h2 style="line-height: 1.8;">解决方案列表</h2>
      </el-header>

      <el-table v-loading="loadingf" ref="multipleTable" :data="tableData1" @selection-change="handleSelectionChange" style="width: 100%;box-sizing: border-box;">
        <!-- <el-table-column  prop="pdpid" label="PDP编号"  width="170"></el-table-column> -->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="oppID" label="Opp ID" width="140" />
        <el-table-column label="CCT编号" width="148">
          <template slot-scope="scope">
            <span style="display: inline-block;">
              <img v-if="scope.row.typeflag == 1" src="../../assets/img/li-ico.png" alt="" style="height: 1em;">
            </span>
            {{ scope.row.pdpNumber }}
          </template>
        </el-table-column>
        <el-table-column prop="isxNumber" label="ISX号" width="80" />
        <el-table-column prop="projectName" label="项目名称" width="88">
          <template slot-scope="scope">
            <span v-if="scope.row.flag == 5">[草稿]</span>
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column prop="sndStatus" label="方案类型">
          <template slot-scope="scope">
            <ul>
              <li v-for="item in scope.row.sndStatus">{{ item }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="创建人" width="88" />
					
        <el-table-column prop="realname" label="施耐德电气销售" width="88" />
			
        <!-- :formatter="formatDate" -->
        <el-table-column prop="updateTime" label="最后修改于" width="136" />
        <!-- <el-table-column prop="checkStatus" label="方案审核" width="69" /> -->
        <el-table-column prop="sndStatus" label="方案审核" width="88">
          <template slot-scope="scope">
            <span v-if="scope.row.flag == 1">已取消</span>
            <span v-else>{{scope.row.checkStatus}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="orderStatus" label="Design Portal" /> -->
       <!-- <el-table-column prop="special" label="特价审批" width="88"/> -->
        <el-table-column label="操作" style="font-size: 12px;">
          <div class="table-operation" slot-scope="scope">
            <span
              style="margin-right: 8px;color: #6bc966; cursor: pointer;"
              @click="show(scope.row)"
            ><img
              src="../../assets/img/ck.png"
              style="height:1em;margin-right: 3px;"
              alt=""
            >查看</span>


        <!-- // 审核(s)，取消(q)，删除(d)，修改(m) -->
            <template  v-if="scope.row.flag != 1">

              <template v-if="roleUrl.indexOf('s') != -1">
              <span
                v-if="scope.row.checkStatus =='等待审核'"
                style="margin-right: 8px;color: #6bc966; cursor: pointer;"
                @click="audit(scope.row)"
              ><img
                src="../../assets/img/sh.png"
                style="height:1em;margin-right: 3px;"
                alt=""
              >审核</span>
              </template>
            <span v-if="roleUrl.indexOf('m') != -1 || createUserID == scope.row.createUserID"
              style="margin-right: 8px;color: #6bc966; cursor: pointer;" @click="checkhandle(scope.row)">
            <img
              src="../../assets/img/modify.png"
              style="height:1em;margin-right: 3px;"
              alt=""
            >修改</span>

            <template v-if="roleUrl.indexOf('q') != -1 || createUserID == scope.row.createUserID">
              <span  v-if="scope.row.flag != 5"
              style="margin-right: 8px;color: #6bc966; cursor: pointer;" @click="cancelSolution(scope.row)">
            <img
              src="../../assets/img/modify.png"
              style="height:1em;margin-right: 3px;"
              alt=""
            >取消</span>
            </template>

            <template v-if="roleUrl.indexOf('d') != -1 || createUserID == scope.row.createUserID">
            <span v-if="scope.row.flag ==5"
              slot="reference" style="margin-right: 8px;color: #6bc966; cursor: pointer; " @click="deleteSndSolution(scope.row)">
            <img
              src="../../assets/img/del.png"
              style="height:1em;margin-right: 3px;"
              alt=""
            >删除</span>
            </template>

            </template>

            <span
              style="margin-right: 8px;color: #6bc966; cursor: pointer;"
              @click="copySolution(scope.row)"><img
              src="../../assets/img/modify.png"
              style="height:1em;margin-right: 3px;"
              alt=""
            >复制</span>
          </div>
        </el-table-column>
      </el-table>
      <div style="background-color: #fff; text-align: center;padding: 20px 0;font-weight: bold;" v-if="idsflag == 'true'">
        方案总价合计：<span style="color: rgb(107, 201, 102);">￥{{allDdpPrice}}(CNY)</span>
        <div style="margin-top: 15px;"><el-button type="primary" @click="daochu">导出配置清单</el-button></div>
      </div>
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
    </el-container>
  </div>
</template>

<style>

  #app {
    min-width: 1100px;
  }
  .table-operation span{
    display: inline-block;
    word-break:break-word
  }
  .disabled {
    color: #C0C4CC;
  }
  .disabled {
    color: #C0C4CC;
  }

  .list-jjfa {
    padding: 0 0 10px 0;
    background-color: #fff;
  }

  .list-jjfa .el-collapse-item__header {
    background-color: #6bc966;
    color: #fff;
    padding-left: 10px;
    padding-right: 10px;
  }

  .el-table .has-gutter {
    color: #fff;
  }

  .el-table .has-gutter tr th {
    background-color: #565656;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
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
import { setToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import {
  querySndSolution,
  filterSndSolution,
  deleteSndSolution,
  quaryoper,
  updateSolutionStatus,
  copySolution,
  cancelSolution,
  priceProduct,
  batchExport
} from '@/api/movie'
import {
  audit
} from '../solution/components'

  import {
    getToken
  } from '@/utils/auth'
export default {
  inject: ['reload'],
  name: 'SolutionList',
  data() {
    return {
      loadingf: false,
      loading: false,
      visible: false,
      name: '',
      form: {
        region: '',
        startTime: ''
      },
      sedData: {
        page: 1,
        limit: 10,
        region: '',
        upTime: 0
      },
      upTimeList: [0, 1],
      activeNames: ['1'],
      value1: '',
      value2: '',
      serachFlag: 0,
      tableData: [],
      tableData1: [],
      size: '',
      total: 1,
      totalNumber: '',
      fdata: {
        operatorList: []
      },
      // roleUrl: "user:updateStatus,user:cancel,user:deleteSndSolution,user:updateSolutionStatus"
        // 审核(s)，取消(q)，删除(d)，修改(m)
      roleUrl:[],
      createUserID:'',
      ids:'',
      idsflag:'false',
      allDdpPrice:''

    }
  },
  mounted: function() {
    var that = this
    console.log('token:' + that.$route.query.token)
  },
  created() {
    if (this.$route.query.token) {
      setToken(this.$route.query.token)
      Cookies.set('setuserName', this.$route.query.userName)
      this.$router.push({ path: this.redirect || '/' })
    }
    console.log('token:' + this.$route.query.token)
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.querySndSolution()
    this.filterSndSolution()
    loading.close()
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    seleName(val) {
      const data = this.fdata.operatorList
    },
    handleSelectionChange(val) {
      console.log(val);
      // this.ids.length = 0;
      let that = this
      let s = []

      if(val.length > 0){
        this.idsflag = 'true'
        for(let i = 0; i < val.length;i++){
          s[i] = val[i].solutionID;
        }
        this.ids = s.toString()
      }else{
        this.idsflag = 'false'
      }

      priceProduct({solutionId:this.ids}).then((response) => {
        const {
          data
        } = response
		val = Number(response.allDdpPrice * 1.1 * 1.13 / 0.75).toFixed(2)
        var reg = /(?=(?!(\b))(\d{3})+$)/g
        val = val + ''
        that.allDdpPrice = val.indexOf('.') >= 0 ? val.split('.')[0].replace(reg, ',') + '.' + val.split('.')[1] : val.replace(reg,
          ',')
        console.log(response)
      })
    },
    daochu(){
      let url = process.env.VUE_APP_BASE_API + '/cct/product/snd-product/batchExport?solutionId='+this.ids+ '&token=' +
          getToken()

      var btn = document.createElement('a')
      btn.setAttribute('href', url)
      btn.click()
    },
    showName(params) {
      const query = params
      const value = params
      const that = this
      that.loading = true
      const obj = {
        oper: params
      }
      quaryoper(obj).then((response) => {
        const {
          data
        } = response
        console.log(response)
        this.fdata.operatorList = data
        that.loading = false
      })
    },
    stateFormat(row, column) {
      if (row.state === 0) {
        return '正确'
      } else {
        return '错误'
      }
    },
    handleCurrentChange(val) {
      this.querySndSolution(val, 'element')
    },
    querySndSolution(prams, page) {
      var that = this

      that.loadingf = true
      that.serachFlag == 1
      if (page == 'page') {
        if (prams == 'pageMinus' && Number(that.sedData.page) > 1) {
          that.sedData.page = Number(that.sedData.page) - 1
        } else if (prams == 'pageAdd' && Number(that.sedData.page) < that.totalNumber) {
          that.sedData.page = Number(that.sedData.page) + 1
        } else {
          return
        }
      }
      if (page == 'element') {
        that.sedData.page = prams
      } else {
        if (that.sedData.pdpNumber) {
          that.sedData.pdpNumber = that.sedData.pdpNumber.trim()
        }
        if (that.sedData.ProjectName) {
          that.sedData.ProjectName = that.sedData.ProjectName.trim()
        }
        console.log(parseInt(new Date(that.sedData.statrTime1).getTime()), parseInt(new Date(that.sedData.endTime1).getTime()))
        const time1 = parseInt(new Date(that.sedData.statrTime1).getTime())
        const time2 = parseInt(new Date(that.sedData.endTime1).getTime())
        if (time1 > 0 && !time2 || !time1 && time2 > 0) {
          this.$message.error('请同时选择与结束日期')
          that.loadingf = false
          return
        }
        if (time1 > time2) {
          this.$message.error('结束日期应该大于等于开始日期')
          that.loadingf = false
          return
        }
        if (that.sedData.statrTime1) {
          const dt = new Date(that.sedData.statrTime1)
          that.sedData.statrTime = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() +
              ':' + dt.getMinutes() + ':' + dt.getSeconds()
        }
        if (that.sedData.endTime1) {
          const dt = new Date(that.sedData.endTime1)
          that.sedData.endTime = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + '23:59:59'
        }
      }
      let newSendData = {}

      if (page == 'search') {
        that.serachFlag = 1
      }
      if (that.serachFlag == 0) {
        newSendData.page = that.sedData.page
        newSendData.limit = that.sedData.limit
      } else {
        if (page == 'element') {
          that.sedData.page = prams
        } else {
          that.sedData.page = 1
        }
        newSendData = that.sedData
        console.log(newSendData)
      }
      querySndSolution(newSendData).then((response) => {
        const {
          data
        } = response
        that.tableData1 = data.records
        for (let i = 0; i < that.tableData1.length; i++) {
          console.log(that.tableData1[i].sndStatus)
          that.tableData1[i].sndStatus = that.tableData1[i].sndStatus.split(';')
          console.log(that.tableData1[i].sndStatus)
        }

        // roleUrl: "user:updateStatus,user:cancel,user:deleteSndSolution,user:updateSolutionStatus"
        // 审核(s)，取消(q)，删除(d)，修改(m)
        if(response.roleUrl.indexOf('user:updateStatus') != -1){
          that.roleUrl[that.roleUrl.length] = 's'
        }
        if(response.roleUrl.indexOf('user:cancel') != -1){
          that.roleUrl[that.roleUrl.length] = 'q'
        }
        if(response.roleUrl.indexOf('user:deleteSndSolution') != -1){
          that.roleUrl[that.roleUrl.length] = 'd'
        }
        if(response.roleUrl.indexOf('user:updateSolutionStatus') != -1){
          that.roleUrl[that.roleUrl.length] = 'm'
        }
        that.createUserID = response.userId;
        console.log(that.roleUrl,that.roleUrl)
        that.size = data.size
        that.total = data.total
        that.loadingf = false
        that.totalNumber = Math.ceil(data.total / data.size)
      })
    },
    filterSndSolution() {
      var that = this
      filterSndSolution().then((response) => {
        const {
          data
        } = response
        that.fdata.findingsList = data.findingsList
        that.fdata.operatorList = data.operatorList
        that.fdata.schemeList = data.schemeList
        that.fdata.sndTwoList = data.sndTwoList
        console.log(response)
        console.log(that.fdata.schemeList)
      })
    },
    formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (!data) {
        return
      }
      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() +
          ':' + dt.getSeconds()
      // return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
    audit(params) {
      const solutionID = params.solutionID
      var that = this
      sessionStorage.setItem('checked', 'true')
      this.$router.push({
        path: '/solution/check',
        query: {
          id: solutionID,
          modify: false,
          modifym:true
        }
      })
    },
    show(params) {
      const solutionID = params.solutionID
      var that = this
      this.$router.push({
        path: '/solution/detail',
        query: {
          id: solutionID,
        }
      })
    },
    checkhandle(params) {
      const solutionID = params.solutionID
      const modifyval = params.checkStatus
      const that = this
      let msg = ''
     if (modifyval == '审核通过' || modifyval == '审核不通过') {
        msg = '此方案已完成审核，如果修改，将需要重新走审批流程'
      } else if (modifyval == '等待审核') {
        msg = '提示：当前解决方案的状态为【等待审核】，修改解决方案需要重新提交审核。'
      } else {
        msg = '其他情况'
      }

      if (modifyval == null) {
        that.openModify(solutionID, true)
      //} else if (modifyval == '审核通过' || modifyval == '审核不通过') {
	  } else if (modifyval) {
        this.$confirm(msg, '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          closeOnClickModal: false
        })
          .then(() => {
            that.updateSolutionStatus(solutionID)
          })
          .catch(action => {
          })
      } else {
        this.$confirm(msg, '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          closeOnClickModal: false
        })
          .then(() => {
            that.openModify(solutionID)
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '已取消'
                : '已取消'
            })
          })
      }
    },
    updateSolutionStatus(solutionID) {
      const that = this
      updateSolutionStatus({
        solutionID: solutionID
      }).then((response) => {
        that.openModify(solutionID)
      })
    },
    openModify(solutionID) {
      this.$router.push({
        path: '/solution/complete',
        query: {
          id: solutionID,
        }
      })
    },
    deleteSndSolution(row) {
      var that = this
      const msg = '确认删除解决方案<span style="color:#F33">' + row.projectName + '</span>吗？'
      this.$layer.confirm(msg,
        function(indexid) {
          that.deldel(row)
          that.close1(indexid)
        }, function(indexid) {
          that.close1(indexid)
          return
        })
    },
    copySolution(row) {
      var that = this
      const msg = '确认复制解决方案<span style="color:#F33">' + row.projectName + '</span>吗？'
      this.$layer.confirm(msg,
        function(indexid) {
          copySolution({
            solutionId: row.solutionID
          }).then((response) => {
            console.log(response)
            if (response.code == 0) {
              that.$message({
                message: response.msg,
                type: 'success',
                offset: 250,
                duration: 1500
              })
              that.querySndSolution()
            }
          })
          that.close1(indexid)
        }, function(indexid) {
          that.close1(indexid)
          return
        })
    },
    cancelSolution(row) {
      var that = this
      const msg = '确认取消解决方案<span style="color:#F33">' + row.projectName + '</span>吗？'
      this.$layer.confirm(msg,
        function(indexid) {
          cancelSolution({
            solutionId: row.solutionID
          }).then((response) => {
            console.log(response)
            if (response.code == 0) {
              that.$message({
                message: response.msg,
                type: 'success',
                offset: 250,
                duration: 1500
              })
              that.querySndSolution()
            }
          })
          that.close1(indexid)
        }, function(indexid) {
          that.close1(indexid)
          return
        })
    },
    close1(index) {
      this.$layer.close(index)
      this.$layer.closeAll(1)
      this.$layer.closeAll(3)
      this.$layer.closeAll(4)
    },
    deldel(row) {
      if (row.checkStatus != null) {
        this.$alert('暂无删除权限！请联系管理员删除', '提示')
      } else {
        deleteSndSolution({
          solutionID: row.solutionID
        }).then((response) => {
          console.log(response)
          if (response.status == 0) {
            this.$message({
              message: response.msg,
              type: 'success',
              offset: 250,
              duration: 1500
            })
            this.querySndSolution()
          }
        })
      }
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
