<template>
  <div id="" style="min-width: 1300px;margin: 0 auto;">
    <el-container class="cont-conar cont-addjjfa" style="padding: 0 10px;min-height: 500px;">
      <el-header style="height: auto;padding: 0 5px 5px;border: 1px solid #cdcdcd;background-color: #FFFFFF;margin-bottom: 20px;">
        <img src="@/assets/img/add0-title0.png" alt="" style="float: left;margin-right: 20px;padding-top: 10px;padding-left: 10px;">
        <div class="asd" style="padding: 10px 10px 2px;float: right;">
          <span style="cursor: pointer;" @click="openLog"><img src="../../assets/img/add0-fangan.png">日志</span>
          <span style="cursor:pointer" @click="downloadXlsx(sendData.solutionId)"><img src="../../assets/img/add0-peizhi.png">导出配置清单</span>
		  <span v-if="imdcFlag" style="cursor:pointer" @click="showPic"><img src="@/assets/img/imdcPic.png" style="height:22px">查看配置图</span>
		</div>
        <div style="padding: 10px 0 2px;">
          <strong style="font-size: 1.3em;">{{ titleData.pdpNumber }}</strong><br>
        </div>
      </el-header>
      <projectItem  v-bind:titleData = 'titleData' v-bind:solutionInfo='solutionInfo' v-bind:prices = 'prices' v-bind:solutionStatus= 'solutionStatus' ></projectItem>
      <el-container>
        <el-main style="padding: 0;height: auto; padding: 0 15px 15px; border: 1px solid rgb(205, 205, 205); background-color: rgb(255, 255, 255); margin-bottom: 20px;">
          <div style="font-weight: bold;height: 60px;line-height: 60px;margin-bottom: 20px;border-bottom:3px solid #d6d6d6">

            <img src="@/assets/img/add-title.png" style="height: 1.5em;position: relative;top: .4em;margin-right: 8px;" alt="">方案清单
            <div style="float: right;">
              <template v-if="gpxFlag == true">
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('产品手册')">产品手册</el-button>
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('认证证书')">认证证书</el-button>
              </template>
              <template v-if="imdcFlag == true">
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('产品手册')">产品手册</el-button>
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('认证证书')">认证证书</el-button>
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('安装操作手册')">安装操作手册</el-button>
              </template>

            </div>
          </div>
          <el-main style="padding:20px 0">
            <div v-if="carshowFlag" style="float: right;margin-right: 30px;margin-bottom: 10px;"></div>
            <div style="clear: both;"></div>
            <template v-if="gpxFlag == true">
              <div style="float:left;width:30%;background-color: #f8f8f8;text-align: center;padding: 10px 0;border: 1px solid #cdcdcd;">
                <img src="@/assets/img/solutionaddp.png" style="width: 30%;" alt="">
              </div>
            </template>
            <div style="float: left;margin-left:2%;min-width: 63%;" :style="{width:gpxFlag?'66%':'96%'}">
              <template v-if="showQsku">
                <projectTableQsku v-bind:tableList = 'tableData1'  v-bind:prices = 'prices' v-bind:qsku = 'qsku'></projectTableQsku>
              </template>
              <template v-else>
                <projectTable v-bind:tableList = 'tableData1'  v-bind:prices = 'prices'></projectTable>
              </template>
            </div>
            <div style="clear: both;"></div>
          </el-main>
        </el-main>
      </el-container>
    </el-container>
    <!-- 机柜修改为ups -->
  </div>

  </div>
</template>
<script>
  import {
    getToken
  } from '@/utils/auth'
  import {projectItem,projectTable,projectTableQsku} from '../components'
  import {
    quaryStatuscode,
    querySolutionById,
  } from '@/api/movie'
  import {
    file,
    checkTips,
    log,
	imdcMiniOnePic
  } from './components'
  export default {
    name: 'solutionDetail',
    components: {
      projectItem,
      projectTable,
      projectTableQsku,
      checkTips,
      file,
      log,
	  imdcMiniOnePic
    },
    filters: {
      formatPrice1(val1) {
        //let val = Number(val1).toFixed(2)
        let val = Number(val1 * 1.1 * 1.13 / 0.75).toFixed(2)
        var reg = /(?=(?!(\b))(\d{3})+$)/g
        val = val + ''
        // return 11111
        return val.indexOf('.') >= 0 ? val.split('.')[0].replace(reg, ',') + '.' + val.split('.')[1] : val.replace(reg,
          ',')
      }
    },
    data() {
      return {
        solutionForm: {
          'solutionID': '',
          'oppID': '',
          'projectName': '',
          'remarks': ''
        },
        gpxFlag: false,
        imdcFlag: false,
        titleData: {
          pdpNumber: '',
          projectName: ''
        },
        sendData: {
          solutionId: '',
          productModel: ''
        },
        solutionStatus: {},
        prices: '',
        solutionId: '',
        solutionInfo: {},
        tableData1: [],
        components: [],
        showQsku: false,
        qsku: '',
        productModels: [],
        carproductModel: '',
        carshowFlag: false
      }
    },
    mounted: function() {
      var that = this
    },
    created() {
      var that = this
      that.solutionId = that.sendData.solutionId = this.$route.query.id
      that.solutionForm.solutionID = this.$route.query.id
      this.quaryStatuscode()
      this.querySolutionById()
    },
    methods: {

      filedownload(ftype) {
        var that = this
        console.log('-----' + that.productModels.toString())
        this.$layer.iframe({
          content: {
            content: file, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              productModel: that.productModels.toString(),
              ftype: ftype
            } // props
          },
          area: ['500px', '400px'],
          title: ftype,
          cancel: () => { // 关闭事件
            // that.$layer.msg("关闭事件");
          }
        })
      },
      querySolutionById(param) {
        var that = this
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const sendObj = {
          solutionID: that.sendData.solutionId
        }
        that.gpxFlag = false
        that.imdcFlag = false
        querySolutionById(that.sendData).then((response) => {
          const {
            data
          } = response
          that.tableData1 = data.productLists
          if (that.tableData1.length > 0) {
            that.carshowFlag = true
          }
          try {
            var model = ''
            that.tableData1.forEach(item => {
              if (model != item.productModel) {
                that.productModels.push(item.productModel)
                model = item.productModel
              }
			  
              if (item.sku.indexOf('GPX') != -1 || item.sku.indexOf('GVS') !=-1 || item.sku.indexOf('LIB') != -1) {
                that.gpxFlag = true
                that.carproductModel = 'A01T1B2'
                throw Error()
              } else {
                that.imdcFlag = true
                that.carproductModel = 'A01T4B1'
              }
            })
          } catch (e) {

          }
          that.solutionInfo = data.solution
          that.solutionStatus = data.status
          console.log('that.solutionStatus', that.solutionStatus)
          const pri = Number(data.prices)
          that.prices = that.formatPrice(pri)
          loading.close()
          that.solutionForm.oppID = data.solution.oppID
          that.solutionForm.remarks = data.solution.remarks
        })
      },

      formatPrice(val) {
        val = Number(val * 1.1 * 1.13 / 0.75).toFixed(2)
        var reg = /(?=(?!(\b))(\d{3})+$)/g
        return val.indexOf('.') >= 0 ? val.split('.')[0].replace(reg, ',') + '.' + val.split('.')[1] : val.replace(reg,
          ',')
      },
      quaryStatuscode() {
        var that = this
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.7)'
        })
        //console.log(that.tableData1)
        console.log(that.sendData)
        quaryStatuscode('solutionId=' + that.solutionId).then((response) => {
          const {
            data
          } = response
          console.log(data)
          loading.close()
          that.titleData = data.solution
          that.solutionForm.projectName = data.solution.projectName
          if (data.productModel && data.productModel[0].productModel.indexOf('A01T4') != -1) {
            that.showQsku = true
          } else {
            that.showQsku = false
          }
          if (data.solution.qsku) {
            that.qsku = data.solution.qsku
          }
        })
      },
      downloadXlsx(solutionId) {
        var that = this
        //var url = process.env.VUE_APP_BASE_API + '/api/product/snd-product/xlsList?solutionId=' + solutionId + '&token=' + getToken()
        var url = 'https://cct-test.schneider-electric.cn/cct/product/snd-product/xlsList?solutionId=' + solutionId + '&token=' + getToken()
        var layer = that.$layer.confirm('您确认要导出配置清单？', {
          btn: ['确定', '取消'] // 按钮
        }, function(e) {
          that.$layer.loading({
            content: '请等待'
          })
          var btn = document.createElement('a')
          btn.setAttribute('href', url)
          btn.click()
          setTimeout(function() {
            that.$layer.closeAll()
          }, 3000)
        }, function() {
          that.$layer.close(layer)
        })
      },
      openLog() {
				sessionStorage.setItem('solutionId', this.sendData.solutionId)
        this.$layer.iframe({
          content: {
            content: log, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
                solutionId:  this.sendData.solutionId,
            } // props
          },
          shade: true,
          shadeClose: false,
          area: ['1000px', '550px'],
          title: '日志',
          cancel: () => { // 关闭事件
          }
        })
      },
			showPic(){
			  var that = this;
			  that.$layer.iframe({
			    content: {
			      content: imdcMiniOnePic, // 传递的组件对象
			      parent: that, // 当前的vue对象
			      data: {
			        solutionId: that.sendData.solutionId,
							productModel:that.carproductModel
			      } // props
			    },
			    shade: true,
			    shadeClose: false,
			    area: ['95%', '550px'],
			    title: 'IMDC Mini&One 配置图',
			    cancel: () => { // 关闭事件
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
  body {
    background-color: #F5F5F5;
  }
</style>
