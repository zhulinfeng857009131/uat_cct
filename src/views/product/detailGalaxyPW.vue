<template>
  <div id="" style="min-width: 1300px;margin: 0 50px;">
    <div class="detail-top cl">
      <div class="fl detail-fl" style="width: 30%;height: 400px;">
        <template>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 200px;"></span>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="fr detail-fr" style="width: 69%;height: 400px;">
        <h2>Galaxy PW 2nd Gen</h2>
        <p>
          <br /><span><img class="pro-img" src="@/assets/img/detail1.jpg" style="height: 220px;"></span>
        </p>
      </div>
    </div>
    <div class="detail-main">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" style="width:25%">产品手册</el-menu-item>
        <el-menu-item index="3" style="width:25%">技术规格</el-menu-item>
        <el-menu-item index="4" style="width:25%">产品认证</el-menu-item>
        <!-- <el-menu-item index="5">产品案例</el-menu-item> -->
        <el-menu-item index="6" style="width:25%">安装手册</el-menu-item>
      </el-menu>
      <div style="padding: 20px 15px;">
        <template v-if="key == 1">
          <!-- ref="multipleTable" -->
          <el-table class="detail-tab1"  :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55">
            </el-table-column> -->
            <el-table-column label="文件">
              <template slot-scope="scope">
              <img src="@/assets/img/ico-pdf.png" style="position: relative;top: 7px;margin-right: 5px;">{{ scope.row.fileName }}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="上传日期" width="120">
            </el-table-column>
            <el-table-column label="下载" width="120">
              <template slot-scope="scope" >
                <a target="_blank" :href="scope.row.url" :download="scope.row.fileName"><img  src="@/assets/img/ico-down.png" style="height:18px ;"></a>
              </template>
            </el-table-column>
          </el-table>

          <div style="margin: 35px auto;text-align: center;display: none;">
            <img style="cursor: pointer;" src="@/assets/img/send-mail.png">
          </div>
          <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div> -->
        </template>


        <template v-if="key == 3">
<img class="pro-img" src="@/assets/img/gpx2end1.jpg" style="max-width: 100%;display: block;margin: 10px auto;">
<img class="pro-img" src="@/assets/img/gpx2end2.jpg" style="max-width: 100%;display: block;margin: 10px auto">
<img class="pro-img" src="@/assets/img/gpx2end3.jpg" style="max-width: 100%;display: block;margin: 10px auto">
<img class="pro-img" src="@/assets/img/gpx2end4.jpg" style="max-width: 100%;display: block;margin: 10px auto;">
<img class="pro-img" src="@/assets/img/gpx2end5.jpg" style="max-width: 100%;display: block;margin: 10px auto">
<img class="pro-img" src="@/assets/img/gpx2end6.jpg" style="max-width: 100%;display: block;margin: 10px auto">
<img class="pro-img" src="@/assets/img/gpx2end7.jpg" style="max-width: 100%;display: block;margin: 10px auto;">
<img class="pro-img" src="@/assets/img/gpx2end8.jpg" style="max-width: 100%;display: block;margin: 10px auto">
<img class="pro-img" src="@/assets/img/gpx2end9.jpg" style="max-width: 100%;display: block;margin: 10px auto">

        </template>

          <template v-if="key == 4">
            <!-- ref="multipleTable" -->
            <el-table class="detail-tab1"  :data="tableData1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55">
              </el-table-column> -->
              <el-table-column label="文件">
                <template slot-scope="scope">
                <img src="@/assets/img/ico-pdf.png" style="position: relative;top: 7px;margin-right: 5px;">{{ scope.row.fileName }}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="上传日期" width="120">
              </el-table-column>
              <el-table-column label="下载" width="120">
                <template slot-scope="scope" >
                  <a target="_blank" :href="scope.row.url" :download="scope.row.fileName"><img  src="@/assets/img/ico-down.png" style="height:18px ;"></a>
                </template>
              </el-table-column>
            </el-table>

            <div style="margin: 35px auto;text-align: center;display: none;">
              <img style="cursor: pointer;" src="@/assets/img/send-mail.png">
            </div>
            <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </div> -->
          </template>
        <template v-if="key == 5">
          <el-row :gutter="20" class="prodocu-list">
            <el-col :span="6" v-for="data in productList" style="margin:15px 0">
              <div class="prodocu-list-item">
                <img class="pro-img" :src="data.img" style="max-width: 90%;height: 160px;">
                <h3 style="font-size: 14px;padding: 0 10px;height: 32px;overflow: hidden;">{{data.name}}</h3>
                <div style="width: 80%;margin-left: 10%;height: 2.5em;line-height: 2.5em;margin-top: 10px;">
                  <span @click="showProduct(data)" style="background-color: #61b2e1;color: #fff;display: block;border-radius: 5px;cursor: pointer;">查看详情</span>
                </div>
                <div style="position: absolute;top: 10px;right: 5px;">
                  <img src="@/assets/img/pro-edit.png" style="margin-right: 5px;width: 35px;display: none;">
                  <img src="@/assets/img/pro-close.png" style="margin-right: 5px;width: 35px;display: none;">
                </div>
              </div>
            </el-col>
          </el-row>
        </template>

          <template v-if="key == 6">
            <!-- ref="multipleTable" -->
            <el-table class="detail-tab1"  :data="tableData2" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55">
              </el-table-column> -->
              <el-table-column label="文件">
                <template slot-scope="scope">
                <img src="@/assets/img/ico-pdf.png" style="position: relative;top: 7px;margin-right: 5px;">{{ scope.row.fileName }}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="上传日期" width="120">
              </el-table-column>
              <el-table-column label="下载" width="120">
                <template slot-scope="scope" >
                  <a target="_blank" :href="scope.row.url" :download="scope.row.fileName"><img  src="@/assets/img/ico-down.png" style="height:18px ;"></a>
                </template>
              </el-table-column>
            </el-table>

            <div style="margin: 35px auto;text-align: center;display: none;">
              <img style="cursor: pointer;" src="@/assets/img/send-mail.png">
            </div>
            <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </div> -->
          </template>
      </div>
    </div>
  </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }
  .table-lista{
    width: 100%;
    border:1px solid #999;
    border-right: 0;
    border-bottom: 0;
  }

  .table-lista td{
    padding: 8px 10px;
    text-align: center;
    font-size: 13px;
    line-height: 1.8;
    border-right:1px solid #999;border-bottom:1px solid #999
  }
  .table-lista td.colobg{
    background-color: #808080;
    color: #fff;
  }
  .atab .el-tabs__item.is-active{
    color: #3dcd58;
  }
  .atab .el-tabs__active-bar{
    background-color: #3dcd58;
  }
  .vl-notify.vl-notify-alert h2.vl-notice-title{
    background-color: #3dcd58;
    color: #fff;
  }
  .vl-notify.vl-notify-alert h2.vl-notice-title .icon-remove{
    color: #fff;
  }
  .detail-tab1{
    margin: 15px 30px;
  }
  .table-list {
    border-collapse:collapse;
    width: 100%;
  }
  .table-list tr td{
    background-color: #f4f4f4;
    border-top: 1px solid #b4b4b4;
    border-bottom: 1px solid #b4b4b4;
  }
  .table-list tr td{
    padding: 0 10px;
    height: 3em;
    line-height: 3em;
    vertical-align: middle;
    vertical-align: middle
  }
  .table-list thead tr td{
    color: #6bc966;
  }
  .table-list thead tr td img{
    display: block;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }
  .table-list tr td img{
    position: relative;
    top: 6px;
    margin-right: 8px;
  }
  .table-list tr:nth-child(2n+1) td{
    background-color: #fff;
  }
  .table-list tr strong{
    color: #6bc966;
  }
  .detail-tab1 .has-gutter{
    color:#fff
  }
  .detail-fl,
  .detail-fr {
    border: 1px solid #cdcdcd;
    background-color: #fff;
  }

  .detail-main {
    margin: 25px auto;
    border: 1px solid #cdcdcd;
  }

  .detail-main .el-menu-item {
    width: 16.667%;
    text-align: center;
    background-image: linear-gradient(#cfcfcf, #eaeaea);

  }

  .detail-main .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid transparent;
    background-image: linear-gradient(#41923e, #41923e);
    background-color: #41923e;
    color: #fff;
  }

  .detail-fr {
    padding: 15px 30px;
  }

  .detail-fr h2 {
    color: #41923e;
    font-size: 2.15em;
    padding: 8px 0 15px;
  }

  .detail-fr p {
    line-height: 2;
  }

  .detail-fr img {
    margin-top: 10px;
  }

  .detail-fl .el-carousel__container {
    height: 400px;
  }

  .detail-fl img {
    display: block;
    margin: 75px auto;
    width: auto;
    height: 250px;
  }

  .el-carousel__indicator--horizontal {}

  .el-carousel__button {
    width: 10px;
    height: 10px;
    background-color: #a9a9a9;
    border-radius: 50%;
  }

  .el-carousel__indicator.is-active button {
    background-color: #6bc966;
  }

  .prodocu-list .prodocu-list-item {
    border: 1px solid #cdcdcd;
    text-align: center;
    padding-bottom: 15px;
    position: relative;
    background-color: #fff;
  }

  .prodocu-list h3 {
    color: #6bc966;
    font-weight: 600;
  }

  .prodocu-list img.pro-img {
    height: 200px;
    display: block;
    margin: 10px auto 20px;
  }
</style>
<script>
import {
  shade,productDetail
} from './components'
  export default {
    name: 'product',
    data() {
      return {
        productList: [],
        tableData: [],
        tableData1: [],
        tableData2: [],
        key: 1,
        activeName: 'first'
      }
    },
    mounted: function() {
      var that = this;
      that.productList = [{
          img:'https://bang.schneider-electric.cn/pdp/cct/img/case1.jpg',
          imgc:'https://bang.schneider-electric.cn/pdp/cct/img/case1-con.jpg',
          name: '江苏烟草南通专卖配套项目'
        },
        {
          img:'https://bang.schneider-electric.cn/pdp/cct/img/case2.jpg',
          imgc:'https://bang.schneider-electric.cn/pdp/cct/img/case2-con.jpg',
          name: '浙江石油IMDC项目'
        },
        {
          img:'https://bang.schneider-electric.cn/pdp/cct/img/case3.jpg',
          imgc:'https://bang.schneider-electric.cn/pdp/cct/img/case3-con.jpg',
          name: '天津市理工大学机械设计学院边缘计算IMDC案例'
        },
        {
          img:'https://bang.schneider-electric.cn/pdp/cct/img/case4.jpg',
          imgc:'https://bang.schneider-electric.cn/pdp/cct/img/case4-con.jpg',
          name: '京东云'
        },
        {
          img:'https://bang.schneider-electric.cn/pdp/cct/img/case5.jpg',
          imgc:'https://bang.schneider-electric.cn/pdp/cct/img/case5-con.jpg',
          name: '上海海事局航标处项目'
        },
      ];

      that.tableData = [
        {
          fileName: 'Galaxy PW 2nd Gen 原产地证明',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/GalaxyPW2ndGen/Galaxy PW 2nd Gen 原产地证明.pdf',
          fileName:'Galaxy PW 2nd Gen 原产地证明',
          date: '2020/01/04',
        },
        {
          fileName: 'Galaxy PW CE自声明文件',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/GalaxyPW2ndGen/Galaxy PW CE自声明文件.pdf',
          fileName:'Galaxy PW CE自声明文件',
          date: '2020/01/04',
        }
      ]
      that.tableData1 = [
        {
          fileName: 'Galaxy PW 2nd Gen 原产地证明',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/GalaxyPW2ndGen/Galaxy PW 2nd Gen 原产地证明.pdf',
          fileName:'Galaxy PW 2nd Gen 原产地证明',
          date: '2020/01/04',
        },
        {
          fileName: 'Galaxy PW CE自声明文件',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/GalaxyPW2ndGen/Galaxy PW CE自声明文件.pdf',
          fileName:'Galaxy PW CE自声明文件',
          date: '2020/01/04',
        }
      ]
      that.tableData2 = [
        {
          fileName: '990-91405_Spec_FOR REFERENCE',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/990-91405_Spec_FOR REFERENCE.pdf',
          fileName:'990-91405_Spec_FOR REFERENCE',
          date: '2020/01/04',
        },
        {
          fileName: '990-91406_Installation_FOR REFERENCE',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/990-91406_Installation_FOR REFERENCE.pdf',
          fileName:'990-91406_Installation_FOR REFERENCE',
          date: '2020/01/04',
        },
        {
          fileName: '990-91407_opration_FOR REFERENCE',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/990-91407_opration_FOR REFERENCE.pdf',
          fileName:'990-91407_opration_FOR REFERENCE',
          date: '2020/01/04',
        }
      ]
    },
    created() {},
    methods: {
      handleSelect(key, keyPath) {
        this.key = key
        console.log(key, keyPath);
      },
      openShade(){
        this.$layer.iframe({
          content: {
            content: shade, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
               id: 1
            } // props
          },
          area: ['500px', '400px'],
          skin: 'shade-class',
          title: '分享',
            shadeClose: false,
          cancel: () => { // 关闭事件
            // that.$layer.msg("关闭事件");
          }
        })
      },
      showProduct(data){
        this.$layer.iframe({
          content: {
            content: productDetail, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
               id: 1,
               data:data
            } // props
          },
            shadeClose: false,
          area: ['800px', '600px'],
          skin: 'shade-class',
          title: data.name,
          cancel: () => { // 关闭事件
            // that.$layer.msg("关闭事件");
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

            handleClick(tab, event) {
              console.log(tab, event);
            }
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
  .shade-class{
    padding: 20px;
    border: 5px solid red;
  }
</style>
