<template>
  <div id="" style="min-width: 1300px;margin: 0 50px;">
    <div class="detail-top cl">
      <div class="fl detail-fl" style="width: 30%;height: 400px;">
        <template>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner5.jpg"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner2.jpg"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner3.jpg"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner4.jpg"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner1.jpg"></span>
            </el-carousel-item>
            <el-carousel-item>
              <span><img class="pro-img" src="@/assets/img/imdcbanner6.jpg"></span>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="fr detail-fr" style="width: 69%;height: 400px;">
        <h2>IMDC</h2>
        <p>
          IMDC智能微型数据中心集成了电源、配电、制冷、机柜、环境监控管理等在内的物理基础设施单元，全部物理组件可在到达客户现场前实现工厂预制及全面检测，通过边缘控制层级的智能管理及数字化运维软件APP，帮助客户实现快速部署，实现端到端一站式交付和远程数字化管理。

          <br /><span><img class="pro-img" src="@/assets/img/detail.png" style="height: 220px;"></span>
        </p>
      </div>
    </div>
    <div class="detail-main">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">产品手册</el-menu-item>
        <el-menu-item index="2">典型配置</el-menu-item>
        <el-menu-item index="3">技术规格</el-menu-item>
        <el-menu-item index="4">产品认证</el-menu-item>
        <el-menu-item index="5">产品案例</el-menu-item>
        <el-menu-item index="6">安装手册</el-menu-item>
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
        <template v-if="key == 2">
          <template>
            <el-tabs class="atab" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="IMDC Mini 典型配置" name="first">
                <table class="table-list">
                  <thead>
                  <tr>
                    <td style="width: 170px;"></td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner5.jpg">
                      <span>NIM-U3sp24</span>
                    </td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner3.jpg">
                      <span>NIM-U3SP42</span>
                    </td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner3.jpg">
                      <span>NIM-U6SP42</span>
                    </td>
                  </tr>
                  </thead>
                  <tr>
                    <td><strong>尺寸  (W*D*H)  除去包装</strong></td>
                    <td>600mmW * 1200mmD * 1200mmH</td>
                    <td>600mmW * 1200mmD * 2000mmH</td>
                    <td>600mmW * 1200mmD * 2000mmH</td>
                  </tr>
                  <tr>
                    <td><strong>UPS容量</strong></td>
                    <td>3kVA</td>
                    <td>3kVA</td>
                    <td>6kVA</td>
                  </tr>
                  <tr>
                    <td><strong>RPDU（SP机型）</strong></td>
                    <td>1U 10A RPDU 8口（10A）国标插座</td>
                    <td>32A RPDU 12口（10A）+4口(16A）国标插座</td>
                    <td>32A RPDU 12口（10A）+4口(16A)国标插座</td>
                  </tr>
                  <tr>
                    <td><strong>3.5英寸触屏</strong></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                  </tr>
                  <tr>
                    <td><strong>冷却装置</strong></td>
                    <td>NA</td>
                    <td>NA</td>
                    <td>NA</td>
                  </tr>
                  <tr>
                    <td><strong>监测内容</strong></td>
                    <td>温湿度、烟雾探测器、门磁、 监控电力、UPS</td>
                    <td>温湿度、烟雾探测器、门磁、 监控电力、UPS</td>
                    <td>温湿度、烟雾探测器、门磁、 监控电力、UPS</td>
                  </tr>
                  <tr>
                    <td><strong>机架式配电单元</strong></td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                  </tr>
                  <tr>
                    <td><strong>APP支持</strong></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                  </tr>
                </table>
              </el-tab-pane>
              <el-tab-pane label="IMDC One 典型配置" name="second">
                <table class="table-list">
                  <thead>
                  <tr>
                    <td style="width: 170px;"></td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner2.jpg">
                      <span>NIO-R1U6C1</span>
                    </td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner1.jpg">
                      <span>NIO-R2U6C1</span>
                    </td>
                    <td style="text-align: center;">
                      <img class="pro-img" src="@/assets/img/imdcbanner6.jpg">
                      <span>NIO-R3U10C2</span>
                    </td>
                  </tr>
                  </thead>
                  <tr>
                    <td><strong>尺寸  (W*D*H)  除去包装</strong></td>
                    <td>600mmW * 1200mmD * 2000mmH</td>
                    <td>1200mmW * 1400mmD * 2000mmH</td>
                    <td>1800mmW * 1400mmD * 2000mmH</td>
                  </tr>
                  <tr>
                    <td><strong>UPS容量</strong></td>
                    <td>6kVA</td>
                    <td>6kVA</td>
                    <td>10kVA</td>
                  </tr>
                  <tr>
                    <td><strong>RPDU</strong></td>
                    <td>32A RPDU 12口（10A）+4口(16A) 国标插座</td>
                    <td>32A RPDU 12口（10A）+4口(16A) 国标插座</td>
                    <td>32A RPDU 12口（10A）+4口(16A) 国标插座</td>
                  </tr>
                  <tr>
                    <td><strong>10 英寸多点触屏</strong></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png"></td>
                  </tr>
                  <tr>
                    <td><strong>冷却装置</strong></td>
                    <td>3.5KW 机架式空调×1</td>
                    <td>3.5KW 机架式空调×1</td>
                    <td>3.5KW 机架式空调×2</td>
                  </tr>
                  <tr>
                    <td><strong>监测内容</strong></td>
                    <td>温湿度、烟雾探测器、水浸、监控电力、UPS、空调、门磁</td>
                    <td>温湿度、烟雾探测器、水浸、监控电力、UPS、空调、门磁</td>
                    <td>温湿度、烟雾探测器、水浸、监控电力、UPS、空调、门磁</td>
                  </tr>
                  <tr>
                    <td><strong>机架式配电单元</strong></td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                    <td>3U机架测量型+40kva防雷+过欠压保护 +维修旁路</td>
                  </tr>
                  <tr>
                    <td><strong>APP支持</strong></td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                    <td><img class="aa1" src="@/assets/img/aa1.png">连接到施耐德风云汇</td>
                  </tr>
                </table>
              </el-tab-pane>
            </el-tabs>
          </template>
        </template>

        <template v-if="key == 3">
<table border="0" cellspacing="0" cellpadding="0"  class="table-lista">
	<tr>
		<td style="width: 6em;background-color: #00b0f0;color:#fff">组件</td>
		<td style="width: 8em;background-color: #00b0f0;color:#fff">描述</td>
		<td style="color:#fff;background-color:#00b050">IMDCMini无空调 单柜</td>
		<td style="color:#fff;background-color:#00b050">IMDCOne3.5kw冷量单柜</td>
		<td style="color:#fff;background-color:#00b050">IMDCOne3.5kw冷量双柜</td>
		<td style="color:#fff;background-color:#00b050">IMDCOne7kw冷量三柜</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=4>整体参数</td>
		<td class="colobg">系统输入</td>
		<td>单路220VAC/63A/50Hz</td>
		<td>单路220VAC/63A/50Hz</td>
		<td>单路220VAC/63A/50Hz</td>
		<td>单路220VAC/80A/50Hz</td>
	</tr>
	<tr>
		<td class="colobg">机柜尺寸(WxDxH)</td>
		<td>600x1200x2000mm(42U)<br>600x1200x1200mm(24U)</td>
		<td>600x1200x2000mm(42U)</td>
		<td>1200x1400x2000mm(42U)</td>
		<td>1800x1400x2000mm(42U)</td>
	</tr>
	<tr>
		<td class="colobg">最大制冷量</td>
		<td>NA</td>
		<td>3.5 kW</td>
		<td>3.5 kW</td>
		<td>7 kW</td>
	</tr>
	<tr>
		<td class="colobg">推荐最大负载</td>
		<td>NA</td>
		<td>3.5 kW</td>
		<td>3.5 kW</td>
		<td>7 kW</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=3>配电盘</td>
		<td class="colobg">输入</td>
		<td>32A (3kVA)<br>63A (6kVA)<br>80A(10kVA)</td>
		<td>63A (6kVA)<br>80A(10kVA)</td>
		<td>63A (6kVA)<br>80A(10kVA)</td>
		<td>63A (6kVA)<br>80A(10kVA)</td>
	</tr>
	<tr>
		<td class="colobg">断路器</td>
		<td>系统总输入，过欠压保护，防雷器，UPS输入/输出，辅助电源，维修旁路，rPDU</td>
		<td>系统总输入，过欠压保护，防雷器，维修旁路，UPS输入/输出，应急风扇，rPDU，空调，辅助电源</td>
		<td>系统总输入，过欠压保护，防雷器，维修旁路，UPS输入/输出，应急风扇，rPDU，空调，辅助电源</td>
		<td>系统总输入，过欠压保护，防雷器，维修旁路，UPS输入/输出，应急风扇，rPDU，空调，辅助电源</td>
	</tr>
	<tr>
		<td class="colobg">输出端口</td>
		<td>rPDU*2</td>
		<td>空调内机*1,空调外机*1,rPDU*4</td>
		<td>空调内机*1,空调外机*1,rPDU*4</td>
		<td>空调内机*2,空调外机*2,rPDU*6</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=5>UPS*</td>
		<td class="colobg">容量</td>
		<td>3KVA/6KVA/10KVA<br> SPRM机型支持SURT机型*</td>
		<td colspan=3>6KVA/10KVASPRM机型</td>
	</tr>
	<tr>
		<td class="colobg">输入功率因数</td>
		<td>&#8807;0.95(3kVA)<br>&#8807;0.99(6kVA,10kVA)</td>
		<td>&#8807;0.99</td>
		<td>&#8807;0.99</td>
		<td>&#8807;0.99</td>
	</tr>
	<tr>
		<td class="colobg">输出负载效率</td>
		<td>&#62;90%(3kVA)<br>&#62;94%(6kVA,10kVA)</td>
		<td>&#62;94%</td>
		<td>&#62;94%</td>
		<td>&#62;94%</td>
	</tr>
	<tr>
		<td class="colobg">输出功率因数</td>
		<td>0.8(3kVA)<br>1(6kVA,10kVA)</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
	<tr>
		<td class="colobg">数量</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=2>Battery</td>
		<td class="colobg">BATT</td>
		<td>72V(12V/9AH/12节)(3kVA)<br>192V(12V/9AH/16节)<br>(6kVA,10kVA)</td>
		<td>192V(12V/9AH/16节)</td>
		<td>192V(12V/9AH/16节)</td>
		<td>192V(12V/9AH/16节)</td>
	</tr>
	<tr>
		<td class="colobg">数量</td>
		<td>0~3(3kVA)<br>0~5(6,10kVA)</td>
		<td colspan=3>0~5</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=2>rPDU</td>
		<td class="colobg">参数</td>
		<td>32A 0U国标输出<br>10A x 12+ 16A x 4（42U）<br>10A 1U 8x国标输出,<br>10A x 8（24U）</td>
		<td colspan=3>单路220VAC/32A/50Hz, 0U 国标输出10A x 12+ 16A x 4<br>单路220VAC/32A/50Hz, 0UIEC输出10A x 12+
			16A x 4</td>
	</tr>
	<tr>
		<td class="colobg">数量</td>
		<td>1/2（42U）<br>0/1（24U）</td>
		<td>1/2</td>
		<td>2/4</td>
		<td>3/6</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=5>制冷</td>
		<td class="colobg">空调数量</td>
		<td>NA</td>
		<td>3.5kW分体式*1<br>3.5kW一体式*1</td>
		<td>3.5kW分体式*1<br>3.5kW一体式*1</td>
		<td>3.5kW分体式*2<br>3.5kW一体式*2</td>
	</tr>
	<tr>
		<td class="colobg">空调供电方式</td>
		<td>NA</td>
		<td>220VAC /1P/50Hz</td>
		<td>220VAC /1P/50Hz</td>
		<td>220VAC /1P/50Hz</td>
	</tr>
	<tr>
		<td class="colobg">空调安装方式</td>
		<td>NA</td>
		<td colspan=3>机架式，内机5U(分体式)<br>机架式，一体机8U(一体式)</td>
	</tr>
	<tr>
		<td class="colobg">制冷剂</td>
		<td>NA</td>
		<td>R410A</td>
		<td>R410A</td>
		<td>R410A</td>
	</tr>
	<tr>
		<td class="colobg">应急风扇</td>
		<td>NA</td>
		<td>前后各1组</td>
		<td>前后各1组*2</td>
		<td>前后各1组*3</td>
	</tr>
	<tr>
		<td class="colobg" rowspan=6>监控</td>
		<td class="colobg">本地监控</td>
		<td>3.5英寸多点触摸屏</td>
		<td>10英寸多点触摸屏</td>
		<td>10英寸多点触摸屏</td>
		<td>10英寸多点触摸屏</td>
	</tr>
	<tr>
		<td class="colobg">通讯接口</td>
		<td>RJ45</td>
		<td>RJ45</td>
		<td>RJ45</td>
		<td>RJ45</td>
	</tr>
	<tr>
		<td class="colobg">烟感</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
	<tr>
		<td class="colobg">水浸</td>
		<td>NA</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
	<tr>
		<td class="colobg">温湿度</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
		<td>2</td>
	</tr>
	<tr>
		<td class="colobg">门磁+照明</td>
		<td>1</td>
		<td>1</td>
		<td>2</td>
		<td>3</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td style="color: #00b050;">IMDCOne&Mini标配数字化服务*</td>
	</tr>
</table>

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
          fileName: 'New IMDC 全新一代智能微信数据中心彩页',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/IMDCProduct.pdf',
          fileName:'IMDC 全新一代智能微信数据中心彩页',
          date: '2020/12/02',
        }
      ]
      that.tableData1 = [
        {
          fileName: '认证资料-09 SX Rack_Test report（动载静载）-Chinese',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/IMDCrz1.pdf',
          fileName:'认证资料-09 SX Rack_Test report（动载静载）-Chinese',
          date: '2020/12/02',
        },
        {
          fileName: '认证资料-3.5kVA Cooling CCC report',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/IMDCrz2.pdf',
          fileName:'认证资料-3.5kVA Cooling CCC report',
          date: '2020/12/02',
        },
      ]
      that.tableData2 = [
        {
          fileName: 'New IMDC One &amp; Mini 安装和操作手册',
          url:'https://bang.schneider-electric.cn/pdp/cct/pdf/IMDCanzhuang.pdf',
          fileName:'New IMDC One  Mini 安装和操作手册',
          date: '2020/12/02',
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
