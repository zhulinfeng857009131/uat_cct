<template>
  <div id="" style="min-width: 1300px;margin: 0 auto;">
    <el-container class="cont-conar cont-addjjfa" style="padding: 0 10px;min-height: 500px;">
      <el-header style="height: auto;padding: 0 5px 5px;border: 1px solid #cdcdcd;background-color: #FFFFFF;margin-bottom: 20px;">
        <img src="@/assets/img/add0-title0.png" alt="" style="float: left;margin-right: 20px;padding-top: 10px;padding-left: 10px;">
        <div class="asd" style="padding: 10px 10px 2px;float: right;">
          <span style="cursor: pointer;" @click="openLog"><img src="../../assets/img/add0-fangan.png">日志</span>
          <span style="cursor:pointer" @click="downloadXlsx(sendData.solutionId)"><img src="../../assets/img/add0-peizhi.png">导出配置清单</span>

				 <!-- <el-button v-if="solutionStatus.checkStatus == null" type="primary" style="padding-left: 30px;padding-right: 30px;"
            @click="checkConfirm(sendData.solutionId)">提交审核</el-button>
          <el-button v-if="solutionStatus.checkStatus == '等待审核'" type="primary" style="padding-left: 30px;padding-right: 30px;"
            @click="audit(sendData.solutionId)">审核</el-button> -->

          <!-- <div class="xy_fixed_btn">
            <el-button type="pdpgreen" v-if="solutionStatus.checkStatus == null" @click="checkConfirm(sendData.solutionId)">提交审核</el-button>
			<el-button type="pdpgreen" v-if="solutionStatus.checkStatus == '等待审核'"  @click="audit(sendData.solutionId)">审核</el-button>
          </div> -->
          <!-- 审核 -->
        </div>
        <div style="padding: 10px 0 2px;">
          <strong style="font-size: 1.3em;">{{ titleData.pdpNumber }}</strong><br>
          <!-- <span style="font-size: .85em;">{{titleData.projectName}}</span> -->
        </div>
      </el-header>
      <projectItem  v-bind:titleData = 'titleData' v-bind:solutionInfo='solutionInfo' v-bind:prices = 'prices' v-bind:solutionStatus= 'solutionStatus' ></projectItem>

      <el-container>
        <el-main style="padding: 0;height: auto; padding: 0 15px 15px; border: 1px solid rgb(205, 205, 205); background-color: rgb(255, 255, 255); margin-bottom: 20px;">
          <div style="font-weight: bold;height: 60px;line-height: 60px;margin-bottom: 20px;border-bottom:3px solid #d6d6d6">

            <img src="@/assets/img/add-title.png" style="height: 1.5em;position: relative;top: .4em;margin-right: 8px;"
              alt="">方案清单
              <div style="float: right;">
                <el-button v-if="carshowFlag" plain type="primary" icon="el-icon-shopping-cart-1" @click="modifyCar">修改产品</el-button>

              </div>
           <!-- <div style="float: right;">
              <template v-if="gpxFlag == true">
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('产品手册')">产品手册</el-button>
                <el-button type="primary" style="padding-left: 30px;padding-right: 30px;" @click="filedownload('认证证书')">认证证书</el-button>
              </template>
            </div> -->
          </div>
          <el-main style="padding:20px 0">
            <template v-if="gpxFlag == true">
              <!-- <div style="float:left;width:30%;background-color: #f8f8f8;text-align: center;padding: 10px 0;border: 1px solid #cdcdcd;">
                <img src="@/assets/img/solutionaddp.png" style="width: 30%;" alt="">
              </div> -->
            </template>
            <div style="float: left;margin-left:5%;width: 90%;">
              <template v-if="showQsku">
                <projectTableQsku v-bind:tableList = 'tableData1'  v-bind:prices = 'prices' v-bind:qsku = 'qsku'></projectTableQsku>
              </template>
              <template v-else>
                <projectTable v-bind:tableList = 'tableData1'  v-bind:prices = 'prices'></projectTable>
              </template>
            </div>
            <div style="clear: both;"></div>

            <!-- 审核 -->
           <div style="background-color: #f7f7f7;margin: 10px auto;padding: 10px 15px;width:90%">
              <div v-if="solutionForm.remarks != ''">
				  <h4  style="margin-bottom: 10px;">方案说明</h4>
				  <p style="padding: 5px 0;line-height: 1.8;margin-bottom:20px;boder:">
					{{solutionForm.remarks}}
				  </p>
			  </div>
              <el-form :model="ruleForm" label-width="5em" class="demo-ruleForm adds" style="background-color: #f7f7f7;border: 0;">
                <strong>请确认当前方案是否符合配置要求</strong>
                <el-form-item label="审核状态" prop="pass" style="margin-top: 15px;">
                  <el-select v-model="ruleForm.pass" @change="judgeQsku">
                    <el-option key="0" label="通过" value="0" />
                    <el-option key="1" label="拒绝" value="1" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="wirteQsku" label="QSKU号" prop="qsku" style="padding-left: 0;box-sizing: border-box;">
                  <el-input v-model="ruleForm.qsku" type="input" placeholder="请输入QSKU号" />
                </el-form-item>
                <el-form-item label="审核说明" prop="remarks" style="padding-left: 0;box-sizing: border-box;">
                  <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入审核说明" />
                </el-form-item>
                <el-form-item style="text-align: center;padding: 20px 0;border-top:1px solid #EBEEF5 ;">
                  <el-button style="margin-left: -100px;" type="primary" @click="save">审核</el-button>

                </el-form-item>
              </el-form>
            </div>
          </el-main>
        </el-main>
      </el-container>
    </el-container>
    <!-- 机柜修改为ups -->
  </div>

  </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }

  .abox ul {
    border: 1px solid #cdcdcd;
    border-top: 3px solid #6bc966;
    background-color: #fafafa;
    padding: 15px 20px;
  }

  .cct-col-divl div {
    padding: 5px 0 2px;
  }

  .abox ul li {
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 12px;
    color: #9b9b9b;
  }

  .abox ul li span {
    float: right;
    font-weight: bold;
    color: #333;
    padding-right: 2px;
  }

  .abox ul li span.r {
    color: #6bc966;
  }

  .abox h3 {
    height: 30px;
    line-height: 30px;
    margin-bottom: 8px;
    padding-left: 5px;
  }

  .abox h3 img {
    position: relative;
    top: 5px;
  }

  .el-table thead {
    /* color: #fff */
  }

  .asd el-button {
    margin-right: 10px;
  }

  .asd>span {
    margin-right: 20px;
    color: #81c1e7;
  }

  .asd>span img {
    position: relative;
    top: 4px;
    margin-right: 5px;
  }

  .el-submenu__title,
  .el-submenu__title:hover {
    background-color: #6bc966;
    border-bottom: 2px solid #41923e !important;
    color: #fff;
  }

  .el-menu {
    border: 0;
  }

  .el-menu-item,
  .el-submenu__title {
    height: 38px;
    line-height: 38px;
  }

  .el-submenu__title i {
    color: #fff;
  }

  .submenu .el-submenu__title {
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #cccccc;
    padding-left: 5px !important;
    margin: 0 15px 0;
    color: #41923e
  }

  .el-submenu .el-menu {
    margin-top: 0 !important;
  }

  .submenu .el-submenu__title,
  .submenu .el-submenu__title:hover {
    border-bottom: 1px solid #cccccc !important;
  }

  .el-submenu .el-menu-item {
    height: 32px;
    line-height: 32px;
    padding: 5px 0;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #fff;
  }

  .el-submenu .el-menu {
    margin-top: 2px;
  }

  .el-menu-item-group__title,
  .el-submenu .el-menu-item {
    padding-left: 10px !important;
    height: 32px;
    line-height: 20px;
    background-color: #f4f4f4;
    border: 1px solid #cccccc;
    border-left: 0;
    border-right: 0;
    padding-bottom: 10px;
    margin: -1px 15px 0;
    font-size: .8em;
  }

  .el-menu-item-group__title {
    background-color: #fff;
    border-top: 0;
    color: #41923e;
    font-size: 1.1em;
    font-weight: bold;
  }

  .el-submenu i {
    float: right;
    font-size: 1em !important;
    color: #41923e;
  }

  .el-menu-item.is-active {
    color: #333;
  }

  .el-menu-item.is-active i {
    float: right;
    font-size: 0.8em;
    padding: 3px 0;
    color: #41923e;
  }

  #app .hideSidebar .el-submenu>.el-submenu__title {
    padding-left: 10px !important;
  }

  .el-button--pdpgreen {
    color: #FFF !important;
    background-color: #409eff !important;
    border-color: #409eff !important;
  }

  .el-button--pdpgreen.is-plain {
    color: #409eff !important;
    background-color: #fff !important;
  }

  .xy_fixed_btn {
    position: fixed;
    z-index: 1;
    right: 15px;
    top: 92%;
    transform: translateY(-50%);
  }

  .xy_fixed_btn .el-button {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .xy_fixed_btn .el-button span {
    display: inline-block;
    width: 30px;
    white-space: normal;
  }

  .xy_fixed_btn .el-button+.el-button {
    margin-left: 0;
  }
</style>
<script>
  import {
    getToken
  } from '@/utils/auth'
  import {sidebar,projectItem,projectTable,projectTableQsku} from '../components'
  import {
    quaryStatuscode,
    submitCheckSolution,
    querySolutionById,
    getPxList,
	checkSolution
  } from '@/api/movie'
  import {
    galaxy,
    audit,
    file,
    checkTips,
	log
  } from './components'
  export default {
    name: 'SolutionAdd0',
    components: {
      sidebar,
      projectItem,
      projectTable,
      projectTableQsku,
      galaxy,
      audit,
	  log
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
        ruleForm: {
		  'solutionID':'',
          'pass': '0',
          'qsku': '',
          'remarks': ''
        },
        solutionForm: {
          'oppID': '',
          'projectName': '',
		  'remarks':''
        },
        gpxFlag: false,
        formInline: {
          pmmItems: [],
          currenItem: [],
          weaverItem: [],
          weaverNumItem: []
        },
        titleData: {
          pdpNumber: '',
          projectName: ''
        },
        sendData: {
          solutionId: '',
          productModel: ''
        },
        solutionStatus: '',
        prices: '',
        solutionId: '',
        modifyFlag: 'false',
        solutionInfo: '',
        tableData1: [],
        tableData: [],
        components: [],
        componentsFlag: false,
        type: [{
          text: 1
        }],
        showQsku: false,
		wirteQsku:false,
        qsku: '',
        productModels: [],
        carproductModel:'',
        carshowFlag:true
      }
    },
    mounted: function() {
      var that = this
      that.sendData.solutionId = this.$route.query.id
      that.ruleForm.solutionID = this.$route.query.id
	  that.modifyFlag = this.$route.query.modify + '' || sessionStorage.getItem('modify') + ''
    },
    created() {
      this.quaryStatuscode()
      this.querySolutionById()
    },
    methods: {

      modifyCar(){
        let that = this;

        // if (!(productModel == 'A01T1' || productModel == 'A01T1B2' || productModel == 'A01T4B1')) {
        // that.openNewWIn('A01T1B2')
        // that.openNewWIn('A01T4B1')
        that.addSndSolution1(that.carproductModel)
      },
      getSummaries() {
        var that = this
        const sums = []
        sums[0] = '方案总价'
        sums[3] = '￥' + that.prices + '(CNY)'
        return sums
      },
      audit(params) {
        var that = this
        console.log(params, '-----')
        this.$layer.iframe({
          content: {
            content: audit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              solutionId: params
            } // props
          },
          area: ['500px', '400px'],
          title: '审核',
          cancel: () => { // 关闭事件
            // that.$layer.msg("关闭事件");
          }
        })
      },
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
        if (that.sendData.componentsFlag) {
          that.sendData.weaverNum = ''
        }
        const sendObj = {
          solutionID: that.sendData.solutionId
        }
        that.gpxFlag = false
        querySolutionById(that.sendData).then((response) => {
          const {
            data
          } = response
          that.tableData1 = data.productLists
          try {
            var model = ''
            that.tableData1.forEach(item => {
              if (model != item.productModel) {
                that.productModels.push(item.productModel)
                model = item.productModel
              }
              if (item.sku.indexOf('WOE') != -1 || item.sku.indexOf('GPX') != -1 || item.sku.indexOf('GVS') !=
                -1 || item.sku.indexOf('LIB') != -1 || item.sku.indexOf('WST') != -1) {
                that.gpxFlag = true
                that.carproductModel = 'A01T1B2'
                throw Error()
              } else {

                that.carproductModel = 'A01T4B1'
              }
            })
          } catch (e) {

          }
          that.solutionInfo = data.solution
          that.solutionStatus = data.status
          console.log('that.solutionStatus', that.solutionStatus)
          //const pri = Number(data.prices).toFixed(2)
          that.prices = that.formatPrice(data.prices)
          loading.close()
		  that.solutionForm.oppID = data.solution.oppID
		  that.solutionForm.remarks = data.solution.remarks
		  that.judgeQsku();//判断是否创建QSKU
        })
      },
      formatPrice(val) {
		val = Number(val * 1.1 * 1.13 / 0.75).toFixed(2)
        var reg = /(?=(?!(\b))(\d{3})+$)/g
        val = val + ''
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
        console.log(that.tableData1)
        that.solutionId = that.sendData.solutionId = this.$route.query.id
        console.log(that.sendData)
        quaryStatuscode('solutionId=' + that.solutionId).then((response) => {
          const {
            data
          } = response
          console.log(data)
          loading.close()
          that.tableData = data.statuscodes
          that.titleData = data.solution
		  that.solutionForm.projectName = data.solution.projectName
          if (data.statuscodes && data.statuscodes[0].code == 'A01T4') {
            that.showQsku = true
          } else {
            that.showQsku = false
          }
          if (data.solution.qsku) {
            that.qsku = data.solution.qsku
          }
        })
      },
      addSndSolution1(productModel) {
        const that = this
        if (productModel == 'A01T1B2') {
          this.$layer.iframe({
            content: {
              content: galaxy, // 传递的组件对象
              parent: this, // 当前的vue对象
              data: {
                  solutionId: that.sendData.solutionId,
                  productModel: productModel
              } // props
            },
            shade: true,
            shadeClose: false,
            area: ['1000px', '600px'],
            title: 'UPS -Galaxy PX',
            cancel: () => { // 关闭事件
              that.quaryStatuscode()
              that.querySolutionById()
            }
          })
        } else if (productModel == 'A01T4B1') {
          this.$router.push({
            path: '/imdc/imdc-list',
            query: {
              solutionId: that.sendData.solutionId,
              productModel: productModel
            }
          })
        } else {
          // this.$message({
          //   message: '正在开发中',
          //   type: 'success'
          // })
        }
      },
      show() {
        this.$router.push({
          path: '/home/solution-add-show',
          query: {
            solutionId: this.solutionId
          },
          params: {
            solutionId: this.solutionId
          }
        })
      },
      downloadXlsx(solutionId) {
        var that = this
        // var url = 'http://221.122.93.58:9090/api/product/snd-product/xlsList?solutionId=' + solutionId + '&token=' +
        //   getToken()
		 var url = process.env.VUE_APP_BASE_API+ '/api/product/snd-product/xlsList?solutionId=' + solutionId + '&token=' +
           getToken()
        //var url = 'https://cct-test.schneider-electric.cn/cct/product/snd-product/xlsList?solutionId=' + solutionId + '&token=' + getToken()
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
	    if(that.wirteQsku == true && that.ruleForm.pass == 0 && that.ruleForm.qsku.length <= 0){
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
	  judgeQsku(){
	    var that = this;
		if(!(that.gpxFlag) && that.qsku == '' && that.ruleForm.pass == 0){
		  that.wirteQsku = true;
		}else{
		  that.wirteQsku = false;
		}
	  },
	  check() {
	    var that = this;
		that.$layer.closeAll();
	    const loading = this.$loading({
	      lock: true,
	      text: '审核中...',
	      spinner: 'el-icon-loading',
	      fullscreen: true,
	      background: 'rgba(0, 0, 0, 0.7)'
	    })
	    checkSolution(that.ruleForm).then((response) => {
	      console.log(response);
	      setTimeout(function() {
	        loading.close()
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
	             path: '/'
	           })
	      }, 1500)
	    })
	  },
	  openLog(){
	  	this.$layer.iframe({
	  	  content: {
	  		content: log, // 传递的组件对象
	  		parent: this, // 当前的vue对象
	  		data: {} // props
	  	  },
	  	  shade: true,
	  	  shadeClose: false,
	  	  area: ['1000px', '550px'],
	  	  title: '日志',
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
</style>
