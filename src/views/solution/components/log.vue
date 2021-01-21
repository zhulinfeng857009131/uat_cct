<template>
    <div id="box" style="width: 990px;margin: 0 auto;overflow-x: hidden;">
        <div class="header-bg sel-table" style="margin-top: 5px;padding: 10px 30px 0;">
          <el-table :data="logData" class="table1" style="width: 100%;margin-top: 20px;"  v-loading="loadingf">
            <el-table-column prop="username" label="操作人" width="100">
				<template slot-scope="scope">
						{{decodeURIComponent(scope.row.username)}}
				</template>
			</el-table-column>
            <el-table-column prop="method" label="操作类型" width="150"></el-table-column>
            <el-table-column prop="content" label="描述"></el-table-column>
            <el-table-column prop="createdate" label="操作时间" width="150"></el-table-column>
          </el-table>
        <el-row>
          <el-col :span="24" style="text-align: center;margin: 10px 0;border: 0;"  class="pages">
            <el-pagination
              small
              layout="total,prev, pager, next"
              :current-page.sync="sedData.currPage"
              :page-size="sedData.pageSize"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
        </div>

      <!-- 机柜修改为ups -->
    </div>

    </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
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
  .footer p {
    line-height: 1.8;
  }
  .header-bg th{
    background-color: #6bc966;
    color: #fff;
  }
  .el-form--inline .el-form-item__content {
    line-height: 1;
  }

  .table1 .el-input--suffix .el-input__inner {
    padding-right: 0;
    text-align: left;
  }

  .el-notification.right {
    right: 50%;
    margin-right: -115px;
  }

  .footer {
    height: auto;
    padding: 0 0 0 10px;
    border: 1px solid #cdcdcd;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .ainputc {
    text-align: center;
  }

  .ainputc .el-input__inner {
    width: 50px;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }

  .sel-table .el-table__row {
    display: table-row !important;
  }

  .sel-table .el-table__expand-icon {
    display: none !important;
  }

  .add-table .has-gutter th {
    background-color: #6bc966;
    color: #fff;
  }

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }

  .add-table h2 {
    font-size: 1.2em;
    line-height: 2;
    padding: 5px 0;
  }

  .add-table .el-table tr td:first-child {
    text-align: center;
  }

  .add-table td:first-child i.el-icon-plus,
  .add-table td:first-child i.el-icon-minus {
    border: 1px solid #cdcdcd;
    padding: 3px;
  }

  .el-input--small .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  /* 火狐 */
  input {
    -moz-appearance: textfield !important;
  }
</style>
<script>
  import {
    selectMylog
  } from '@/api/movie'
  export default {
    name: 'log',
    data() {
      return {
        fullLoading: true,
        loadingf: false,

        sedData: {
          currPage: 1,
          pageSize: 10,
          solutionId:''
        },
				size: '',
				total: 1,
				totalNumber: '',
        logData:[]
      }

    },
    mounted: function() {
      //let that = this;
    },
    created() {
		let that = this;
		//console.log('log:',this.$props.lydata.solutionId)
      //that.sedData.solutionId =  that.$props.lydata.solutionId
	  that.sedData.solutionId = sessionStorage.getItem('solutionId')
      that.showData()
    },
    methods: {
        showData(){
          var that = this;
          selectMylog(that.sedData).then((response) => {
            console.log('response',response)
            const {
              data
            } = response
            that.logData = data.list
            that.size = data.pageSize
            that.total = data.total
            // that.loadingf = false
            that.totalNumber = Math.ceil(data.total / data.size)
          })
        },
        handleCurrentChange(val){
          this.currPage = val
          this.showData()
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
