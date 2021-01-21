<template>
  <div class="aside">
    <h2>选择产品</h2>
    <dl>
      <template v-for="(item,index) in sidebarData">
        <dt>
          <i class="el-icon-arrow-down" @click="showHide('a'+index)"></i>
          <span style="display: block;" @click="addSndSolution1(item.code,item.content)" :class="item.content !='UPS及配电'&&item.content !='IMDC'?'disabled':''">{{ item.content }}</span>

        </dt>
        <dd :class="'a'+index" :style="{display:(item.content =='UPS及配电' || item.content =='IMDC'?'block':'none')}">
          <ul>
            <li @click="addSndSolution1(data.code,data.content)" v-for="data in item.statuscodeList" :class="(data.content !='Galaxy PX'&&data.content !='IMDC Mini&One'?'disabled':'')">{{ data.content }}</li>
          </ul>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
  import {
    isExistSolution
  } from '@/api/movie'
  import {
    galaxy
  } from '../solution/components'
  export default {
    name: 'sidebar',
    props: {
      sidebarData: {
        type: Array,
        required: true
      },
      tableData1: {
        type: Array,
        required: true
      },
      sendData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },

    created() {
      this.querySolutionById()
    },
    methods: {
      querySolutionById() {
        this.$emit('reload', '1')
      },
      quaryStatuscode() {
        // this.$parent.quaryStatuscode()
      },
      showHide(a) {
        if (document.getElementsByClassName(a)[0].style.display == 'none') {
          document.getElementsByClassName(a)[0].style.display = 'block'
        } else {
          document.getElementsByClassName(a)[0].style.display = 'none'
        }
      },
      addSndSolution1(productModel, productName) {
        const that = this
        if (!(productModel == 'A01T1' || productModel == 'A01T1B2' || productModel == 'A01T4B1' || productModel ==
            'A01T4')) {
          return
        }
        if (that.tableData1.length > 0) {
          if (productModel.indexOf('A01T4') != -1 && that.tableData1[0].productModel.indexOf('A01T4') != -1) {
            // imdc产品
            if (productModel == that.tableData1[0].productModel || productModel == 'A01T4' ? (productModel = 'A01T4B1') :
              false) {
              // imdc分类一致，直接打开
              that.openNewWIn(productModel)
            } else {
              // 新建IMDC
              that.confrimWin(productModel, productName)
            }
          } else if (productModel.indexOf('A01T4') != -1 && that.tableData1[0].productModel.indexOf('A01T4') == -1) {
            // 新建IMDC
            that.confrimWin(productModel, productName)
          } else if (productModel.indexOf('A01T4') == -1 && that.tableData1[0].productModel.indexOf('A01T4') != -1) {
            // 新建非IMDC
            that.confrimWin(productModel, productName)
          } else {
            // 非imdc产品,直接打开
            that.openNewWIn(productModel)
          }

        } else {
          // 直接打开
          that.openNewWIn(productModel)
        }

      },
      confrimWin(productModel, productName) {
        const that = this
        // 你将进入新的解决方案进行*** 的产品配置
        this.$confirm('你将进入新的解决方案进行' + productName + '的产品配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // that.confrimWin(productModel)
          that.isExistSolution(productModel)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      openNewWIn(productModel) {
        let that = this
        if (productModel == 'A01T1B2' || productModel == 'A01T1') {
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
        } else if (productModel == 'A01T4B1' || productModel == 'A01T4') {
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
      isExistSolution(productModel) {
        let that = this;
        let productModelA = productModel
        if (productModel == 'A01T1') {
          productModel = 'A01T1B2'
        }
        if (productModel == 'A01T4') {
          productModel = 'A01T4B1'
        }
        let obj = {
          solutionId: that.sendData.solutionId,
          productModel: productModel
        }
        console.log(obj)
        isExistSolution(obj).then((response) => {
          const {
            data
          } = response
          if (response.flag == true) {

          } else {
            // alert(response.solutionId)
            that.sendData.solutionId = response.solutionId
            let query = this.$router.history.current.query;
            let path = this.$router.history.current.path;
            //对象的拷贝
            let newQuery = JSON.parse(JSON.stringify(query));
            // 地址栏的参数值赋值
            newQuery.id = response.solutionId;
            this.$router.push({
              path,
              query: newQuery
            });
            // alert(response.solutionId)
            that.querySolutionById()
            that.openNewWIn(productModelA)
          }
        })
      },
    }
  }
</script>

<style>
</style>
