<template>
  <el-scrollbar ref="scroll" style="overflow-x: hidden;">
    <div id="box" style="width: 990px;margin: 0 auto;overflow-x: hidden;">
      <el-container id="box2" class="cont-conar cont-addjjfa" style="padding: 0 2px;margin-top: 10px;">
        <el-header style="height: auto;padding: 0 5px;"></el-header>
        <div style="border: 1px solid #cdcdcd;background-color: #FFFFFF;width: 100%;">
          <el-form label-width="8.9em" :inline="true" :model="sendData" class="demo-form-inline gpx" style="padding: 12px 5px 0 12px;position: relative;border-bottom: 2px solid #41923e;">
            <strong style="line-height: 30px;padding-right: 0;font-size: 1.4em;">精确查询</strong>
            <el-form-item label="产品型号:">
              <el-input @keyup.native="showSelect" v-model="sendData.sku" placeholder="请输入产品型号" style="width: 11em;"></el-input>
            </el-form-item>
            <br><br>
            <strong style="line-height: 30px;padding-right: 0;font-size: 1.4em;">模糊查询</strong>
            <el-form-item label="容量:">
              <el-input type="text" min="1" @keyup.native="showSelect('bj')" v-model="sendData.capacity" placeholder="请输入"
                style="padding-left:3px;padding-right:3px;width: 119px;"></el-input>kVA
            </el-form-item>
            <el-form-item label="是否带PMM:">
              <el-select @change="showSelect" v-model="sendData.parameter2" filterable style="width: 10em;">
                <el-option label="请选择" value="请选择" key=''></el-option>
                <el-option :label="value == 0 ?'不带':'带'" :value="value" :key='value' v-for="value,index in formInline.pmmItem"></el-option>
              </el-select>
            </el-form-item>
            <template>
              <el-form-item label="PMM分开关容量:" v-show="sendData.parameter2 =='1'">
                <el-select @change="showSelect" v-model="sendData.parameter3" placeholder="32A" style="width: 10em;">
                  <el-option label="请选择" value="" key=''></el-option>
                  <el-option :label="value" :value="value" v-for="value,index in formInline.currenItem"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <br><br>
            <strong style="line-height: 30px;padding-right: 4em;font-size: 1.4em;"></strong>
            <el-form-item label="服务:">
              <el-select @change="showSelect" @input="changeInput" v-model="sendData.service" placeholder="请选择服务" style="width: 10em;">
                <el-option label="请选择" value="" key=''></el-option>
                <el-option label="不需要服务" value="0" key='0'></el-option>
                <el-option :label="value" :value="value" v-for="value in formInline.yearService"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="并机:">
              <el-select @change="showSelect('111')" v-model="sendData.region" :disabled="regionFlag" placeholder="是否并机" style="width: 10em;">
                <el-option label="请选择" value="" key=''></el-option>
                <el-option :label="value == 0 ?'否':'是'" :value="value" v-for="value,index in formInline.weaverItem"></el-option>
              </el-select>
            </el-form-item>
            <template v-show="weaverNumFlag">
              <el-form-item label="并机台数:" v-show="weaverNumFlag">
                <el-select @change="showSelect" v-model="sendData.lev" placeholder="并机台数" style="width: 10em;">
                  <el-option label="请选择" value="" key=''></el-option>
                  <el-option :label="value" :value="value" v-for="value,index in formInline.weaverNumItem"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <br><br>
            <div style="text-align: center;margin-bottom: 10px;">
              <el-button type="primary" @click="reset">重置查询条件</el-button>
            </div>
            <div class="fl" style="padding-top: 3px;position: absolute;right: 20px;bottom: 0;">
              <span style="position: relative;display: inline-block;">
                <img style="cursor: pointer;" src="@/assets/img/add1-total.png" alt="" @click="linkCar('car')">
                <span v-if="total > 0" style="position: absolute;top: 3px;left: 33px;font-style: normal;background-color: #c11111;border-radius: 50%;width: 1.52em;height: 1.52em;line-height: 1;text-align: center;color:#fff;border:3px solid #ededed">
                  <i style="font-size: .75em;font-style: normal;">{{total}}</i>
                </span>
              </span>
            </div>
          </el-form>

          <div class="add-table sel-table" style="margin-top: 5px;padding: 10px 30px 0;">
            <h2>符合条件的产品</h2>
            <el-table :data="tableData" class="table1" style="width: 100%;" v-loading="loadingf" :row-class-name="tableRowClassName"
              row-key="productId" :tree-props="{children: 'productList', hasChildren: 'hasChildren'}">
              <el-table-column prop="checked" label="" width="90">
                <template slot-scope="scope">
                  <span v-if="scope.row.atype != 'tj'">
                    <i style="cursor: pointer;" class="el-icon-plus" @click="checkhandle(scope.row)"></i>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="productModel" label="产品系列" width="100"></el-table-column>
              <el-table-column prop="sku" label="产品型号" width="200"></el-table-column>
              <el-table-column prop="description" label="描述"></el-table-column>
              <el-table-column prop="num" label="数量" width="80">
                <template slot-scope="scope">
                  <el-input style="width: 50px;padding-right: 10px;" :value='scope.row.lev' disabled="" clearable>
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="add-table sel-table" ref="car" style="padding: 10px 30px; 5px">
            <h2>已选择的产品</h2>
            <el-table :data="tableData1.filter(f => f.productNum >= 0)" style="width: 100%;" :row-class-name="tableRowClassName"
              row-key="productId" :tree-props="{children: 'productList', hasChildren: 'hasChildren'}">
              <el-table-column prop="" label="" width="90">
                <template slot-scope="scope">
                  <span v-if="scope.row.atype == 'tj'"></span>
                  <span v-else-if="scope.row.atype == 'fw'"></span>
                  <span v-else>
                    <el-button @click='checkhandledel(scope.row)' style="width: 2em;height: 2em;padding: 0;border: 0;" noboder slot="reference"><i class="el-icon-minus"></i></el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="productModel" label="产品系列" width="120"></el-table-column>
              <el-table-column prop="sku" label="产品型号" width="200"></el-table-column>
              <el-table-column prop="description" label="描述"></el-table-column>
              <el-table-column prop="" label="是否并机" width="100">

                <template slot-scope="scope">
                  <span v-if="scope.row.parallel == 0">
                    <span v-if="scope.row.productNum < 5 && scope.row.productNum >1">
                      <el-button type="primary" @click="bingji(scope.row)">并机</el-button>
                    </span>
                    <span v-else>未并机</span>
                  </span>
                  <span v-if="scope.row.parallel == 1" style="text-align: center;display: block;">
                    <el-button type="primary" @click="resetbingji(scope.row)">取消并机</el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="服务" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.parallel == 1 ? '1' : scope.row.parallel ==0">
                    <span v-if="scope.row.yearService == 0 || scope.row.yearService == null">
                      <el-button type="primary" @click="showService(scope.row)">选择服务</el-button>
                      <el-dialog title="选择服务" :visible.sync="dialogVisible" width="40%" :modal="false"
                        :close-on-click-modal="false">
                        <div>产品型号：{{dataRow.sku}}</div>
                        <div style="font-size: 12px;margin: 10px 0;">描述：{{dataRow.description}}</div>
                        <span>
                          <el-select v-model="yearService" placeholder="请选择服务" style="width: 90%;">

                            <el-option label="不需要服务" value="" key=''></el-option>
                            <el-option :label="value" :value="value" v-for="value in formInline.yearService"></el-option>
                          </el-select>
                        </span>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogVisible = false">取 消</el-button>
                          <el-button type="primary" @click="service(dataRow)">确 定</el-button>
                        </span>
                      </el-dialog>
                    </span>
                    <span v-else>
                      <el-button type="primary" @click="service(scope.row,0)">取消服务</el-button>
                    </span>
                  </span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="interior" label="数量" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.atype == 'tj'">
                    <el-input style="" class="ainputc" :value='scope.row.productNum' disabled="" clearable>
                    </el-input>
                  </span>
                  <span v-else-if="scope.row.atype == 'fw'">
                    <el-input style="" class="ainputc" :value='scope.row.productNum' disabled="" clearable>
                    </el-input>
                  </span>
                  <span v-else-if="scope.row.parallel == 1">
                    <el-input-number readonly style="width: 7em;" v-model="scope.row.productNum" @change="((val,oldValue)=>{handleChange(val,oldValue, scope.row)})"
                      size="mini" :min="0" :max="4"></el-input-number>
                  </span>
                  <span v-else>
                    <el-input-number readonly style="width: 7em;" v-model="scope.row.productNum" @change="((val,oldValue)=>{handleChange(val,oldValue, scope.row)})"
                      size="mini" :min="0"></el-input-number>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="footer" style="padding: 10px 1.5em;">
          <p><span style="color: #F33;">温馨提示：</span>Galaxy PX产品最多允许4台同型号的UPS并机，并机规则：</p>
          <p>1）2台并机，需要一套GVSOPT006;</p>
          <p>2）3台并机，需要两套GVSOPT006;</p>
          <p>3）4台并机，需要三套GVSOPT006;</p>
        </div>
        <div style="text-align: center;margin-bottom: 10px;">
          <el-button type="primary" @click="close" style="padding-left:30px;padding-right:30px">确定</el-button>
        </div>
      </el-container>
    </div>

    </div>
  </el-scrollbar>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }

  .gpx .el-form-item {
    width: 270px;
  }

  .footer p {
    line-height: 1.8;
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
    getProductList,sndDesign,getPxList,saveGPX} from '@/api/movie'
  export default {
    name: 'solution-add',
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
        dataRow: [],
        dialogVisible: false,
        yearService: '',
        fullLoading: true,
        loadingf: false,
        regionFlag: false,
        num: 1,
        total: 0,
        flag: 0,
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
          solutionId: '4',
          productModel: 'A01T1B2',
          sku: '',
          parameter1: '',
          parameter2: '请选择',
          parameter3: '',
          weaverNum: '',
          region: '',
          lev: '',
          capacity: '',
          description: '',
          service: ""
        },
        weaverNumFlag: false,
        tableData1: [],
        tableData: [],
        components: [],
        componentsList: [],
        componentsFlag: false,
        componentsFlag1: true,
        type: [{
          text: 1
        }]
      }
    },
    mounted: function() {
      var that = this;
    },
    created() {
      let that = this
      that.sendData.solutionId = this.$props.lydata.solutionId
      that.sendData.productModel = this.$props.lydata.productModel
      this.getProductList()
    },
    methods: {
      linkCar(ref) {
        const el = this.$refs['scroll'].wrap;
        el.scrollTop = this.$refs[ref].offsetTop
      },
      tableRowClassName(e) {
        if (e.row.hasChilden == '1') {
          return 'success-row';
        } else {
          return '';
        }
      },
      reset() {
        let that = this;
        this.sendData.sku = ''
        this.sendData.desc = ''
        this.sendData.parameter1 = ''
        this.sendData.parameter2 = '请选择'
        this.sendData.parameter3 = ''
        this.sendData.region = ''
        this.sendData.weaverNum = ''
        this.sendData.lev = ''
        this.sendData.capacity = ''
        this.sendData.service = ''
        this.weaverNumFlag = false;
        this.regionFlag = false;
        that.getProductList()
      },
      close() {
		  var that = this;
		  saveGPX({'solutionID':that.sendData.solutionId,'productModel':that.sendData.productModel}).then((response)=>{
			  console.log('gpx保存记录',JSON.stringify(response));
			  that.$parent.querySolutionById()
			  that.$parent.quaryStatuscode()
			  that.$layer.closeAll()
		  })

      },
      close1(index) {
        this.$layer.close(index)
      },
      changeInput() {
        this.$forceUpdate()
      },
      showSelect(param) {
        this.$forceUpdate()
        this.showData(param);
      },
      showData(param) {
        let that = this;
        const loading = this.$loading({
          lock: true,
          text: '',
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.loadingf = true
        that.sendData.parameter2 != 1 ? that.sendData.parameter3 = '' : ''
        that.sendData.region != 1 ? that.sendData.lev = '' : ''
        if (Number(this.sendData.capacity) > 0) {
          this.weaverNumFlag = false;
        } else {
          if (this.sendData.region == 1) {
            this.weaverNumFlag = true;
          } else {
            this.weaverNumFlag = false;
          }
        }
        if (param == 'bj') {
          let val = this.sendData.capacity;
          let newVal = val.replace(/[^\d]/g, '')
          this.sendData.capacity = newVal
          if (val == newVal) {
            this.sendData.capacity = newVal
          } else {
            that.loadingf = false;
            return
          }
          if (this.sendData.capacity < 0) {
            that.loadingf = false
            return
          }
          let parameter1 = Number(this.sendData.capacity)
          if (parameter1 > 400) {
            this.$alert('很抱歉，没有符合该条件的产品！', '提示', {
              confirmButtonText: '确定',
            });
            that.loadingf = false
          }
          if (parameter1 > 0) {
            this.regionFlag = true;
          } else {
            this.regionFlag = false;
          }
          if (parameter1 > 100) {
            // 判断是否需要并机并计算出并机台数
            let weaverNum = Math.ceil(parameter1 / 100)
            // alert('并机台数：'+weaverNum)
            this.sendData.region = 1;
            this.weaverNumFlag = false;
            this.sendData.lev = weaverNum;
          } else {
            this.sendData.region = 0
            this.weaverNumFlag = false;
            this.sendData.lev = ''
          }
          if (parameter1 == '') {
            this.sendData.region = ''
          }
        }
        this.$forceUpdate()
        getPxList(that.sendData).then((response) => {
          const {
            data
          } = response;
          loading.close();
          console.log(data)
          let arr = []
          arr = data.productList;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].productList) {
              for (let j = 0; j < arr[i].productList.length; j++) {
                arr[i].productList[j].productId = arr[i].productList[j].productId + i + '-' + j
              }
            }
          }
          that.tableData = arr;
          that.total = that.tableData1.length
        })
        that.loadingf = false
      },
      getProductList(param) {
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var that = this;
        that.fullLoading = true
        if (that.sendData.componentsFlag) {
          that.sendData.weaverNum = '';
        }
        getPxList(that.sendData).then((response) => {
          const {data} = response;
          that.tableData = data.productList;
          if (that.flag == 0) {
            that.tableData1 = data.designList;
            that.formInline = data.queryItems;
            that.componentsList = data.list;
          }
          that.components = data.components
          that.flag = 1;
          that.componentsFlag1 = true;
          loading.close();
          that.total = that.tableData1.length
        })
      },
      checkhandle(row) {
        var that = this;
        let service = ''
        if (that.sendData.service == '现场开机服务') {
          this.$confirm('您购买的产品主机已包含开机服务，请确认重复添加？', '提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              closeOnClickModal: false
            })
            .then(() => {
              service = that.sendData.service
              that.addCar(row, service)
            })
            .catch(action => {
              if (action === 'cancel') {
                service = ''
                that.addCar(row, service)
              }
            });

        } else {
          service = that.sendData.service
          that.addCar(row, service)
        }
      },
      addCar(row, service) {
        var that = this;
        row.checked = 0;
        row.productNum = 1;
        let dataA = row;
        let productNumSed = 1;
        let weaverNumSed = '';
        if (that.sendData.region) {
          if (Number(that.sendData.weaverNum) >= 2) {
            weaverNumSed = row.lev;
            that.componentsFlag = true;
          }
        }

        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.7)'
        });
        weaverNumSed = row.lev;
        let sndDesignData = {
          solutionId: that.sendData.solutionId,
          productModel: that.sendData.productModel,
          productId: row.productId,
          productNum: row.lev,
          parallel: that.sendData.region,
          id: '',
          yearService: service
        }
        sndDesign(sndDesignData).then((response) => {

          loading.close();
          const {
            data
          } = response;
          that.$notify({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: '产品<strong style="color:#F33">' + row.sku +
              '</strong>已加入购物车<br><span style="color:#67c23a">可以点击右上角图标查看</span>',
            type: 'success',
            position: 'top-right'
          });

          that.tableData1 = data
          that.total = data.length
        })
      },
      checkhandledel(row) {
        var that = this;
        let msg = '确认删除产品：' + row.sku + ' 吗？'
        this.$layer.confirm(msg,
          function(indexid) {
            that.checkhandledel1(row);
            that.close1(indexid);
          },
          function(indexid) {
            that.close1(indexid);
            return
          });
      },
      checkhandledel1(row) {
        var that = this;
        row.checked = 1;
        let dataA = row
        let productNum = '',componentNum = '';
        if (row.isComponent == 0) {
          productNum = 0;
        } else {
          componentNum = 0
        }
        let isComponentA = row.isComponent
        let sndDesignData = {
          solutionId: that.sendData.solutionId,
          productModel: that.sendData.productModel,
          productId: row.productId,
          productNum: 0,
          parallel: row.parallel,
          id: row.id
        }

                const loading = this.$loading({
                  lock: true,
                  text: '加载中...',
                  spinner: 'el-icon-loading',
                  fullscreen: true,
                  background: 'rgba(0, 0, 0, 0.7)'
                });
        sndDesign(sndDesignData).then((response) => {
          const {
            data
          } = response;
          let obj = {
            productId: dataA.productId,
            productModel: dataA.productModel,
            description: dataA.description,
            checked: 0,
            productNum: dataA.productNum,
            type: dataA.type,
            sku: dataA.sku,
            id: dataA.id
          }
          let flag = true;
          if (isComponentA == 1) {
            for (let i = 0; i < that.tableData1.length; i++) {
              if (that.tableData1[i].isComponent == 1) {
                that.tableData1.splice(i, 1);
                i = 0;
              }
            }
          } else {
            that.tableData1.forEach(item => {
              if (item.id == obj.id) {
                let index = (that.tableData1.indexOf(item))
                that.tableData1.splice(index, 1)
              }
            })
          }
          loading.close();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          that.total = that.tableData1.length
        })
      },

      resetbingji(row) {
        let that = this;
        this.$layer.confirm('是否取消并机？',
          function(indexid) {
            row.parallel = 0;
            delete row.productList
            that.upsndDesignData(row, 9999)
            that.close1(indexid);
          },
          function(indexid) {
            that.close1(indexid);
            return
          });
      },
      bingji(row) {
        row.parallel = 1;
        let that = this
        this.upsndDesignData(row, 9999)
      },
      showService(row) {
        this.dataRow = row
        this.dialogVisible = true
      },
      service(row, flag) {
        let that = this;
        let yearService = ''
        if (flag == 0) {
          this.$confirm('是否取消服务?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            yearService = 0
            that.dialogVisible = false
            this.upsndDesignData1(row, yearService)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          if (that.yearService) {
            yearService = that.yearService;
          } else {
            yearService = 0;
          }
          that.dialogVisible = false
          this.upsndDesignData1(row, yearService)
        }
      },
      upsndDesignData1(index, yearService) {
        let that = this;
        let yearService1 = yearService
        {
          let sndDesignData = {
            solutionId: that.sendData.solutionId,
            productModel: that.sendData.productModel,
            productId: index.productId,
            productNum: '',
            parallel: index.parallel,
            id: index.id,
            yearService: yearService1
          }
          that.yearService = ''
          sndDesign(sndDesignData).then((response) => {
            const {
              data
            } = response;
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            index.yearService = yearService1
            that.tableData1 = data
            that.total = that.tableData1.length
          })
        }
      },
      handleChange(value, oldValue, index) {
        var that = this
        var row = index
        let flag = true
        let avalue = Number(value) - Number(oldValue);
        if (Number(value) == 0) {
          this.$layer.confirm('确认删除产品：' + index.sku + '  吗？',
            function(indexid) {
              avalue = 0;
              index.productNum = -1;
              index.flagtype = 1;
              console.log(index)
              that.upsndDesignData(index, avalue);
              that.close1(indexid);
            },
            function(indexid) {
              index.productNum = oldValue
              flag = 'a4'
              that.close1(indexid);
              return
            });
        } else if (row.parallel == 1 && Number(value) == 1) {
          this.$layer.confirm('是否取消并机？',
            function(indexid) {
              row.parallel = 0
              row.numberKits = ''
              row.productList = []
              that.upsndDesignData(index, avalue);
              that.close1(indexid);
            },
            function(indexid) {
              index.productNum = oldValue
              flag = 'a4'
              that.close1(indexid);
              return
            });
        } else {

          if (row.productList && row.productList.length > 0) {
            if (value <= 1) {
              delete row.productList
            }
          }
          if (Number(value) == 1 && row.parallel != 3) {
            row.parallel = 0
            row.numberKits = ''
          }

          if (Number(value) > 4 && row.parallel == 1) {
            this.$message({
              message: '由于并机台数已超限制，现设置未不并机',
              type: 'warning'
            });
            row.parallel = 0;
            row.numberKits = ''
          }

          that.upsndDesignData(index, avalue);
        }
      },
      upsndDesignData(index, avalue, service) {
        let that = this;

                const loading = this.$loading({
                  lock: true,
                  text: '加载中...',
                  spinner: 'el-icon-loading',
                  fullscreen: true,
                  background: 'rgba(0, 0, 0, 0.7)'
                });
        {
          let sndDesignData = {
            solutionId: that.sendData.solutionId,
            productModel: that.sendData.productModel,
            productId: index.productId,
            productNum: avalue,
            parallel: index.parallel,
            id: index.id
          }
          sndDesign(sndDesignData).then((response) => {
            loading.close();
            const {
              data
            } = response;
            let flag = true;
            that.tableData1 = data
            that.total = that.tableData1.length
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
