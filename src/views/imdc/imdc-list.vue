<template>
  <div id="" style="min-width: 1300px;margin: 0 auto;">
    <el-container class="cont-conar cont-addjjfa" style="padding: 0 10px;min-height: 500px;">
      <el-container>
        <el-header style="height: auto;padding: 0 5px 5px;border: 1px solid #cdcdcd;background-color: #FFFFFF;margin-bottom: 20px;">
          <img src="../../assets/img/add0-title.png" alt="" style="float: left;margin-right: 20px;padding-top: 10px;">
          <img style="float: right;margin: 3px 20px;position: relative;top: 4px;cursor: pointer;" @click="showIMDC" src="@/assets/img/imdc-show.png">
          <div style="padding: 10px 0 2px;">
            <strong style="font-size: 1.3em;" @click="show()">{{ titleData.pdpNumber }}</strong><br>
            <span style="font-size: .85em;">{{ titleData.projectName }}</span>
          </div>
        </el-header>
      <el-row class="cct-col-divl" :gutter="20" style="padding: 10px 0;background-color: #a5a9ac;color:#fff;margin :0 1px 20px;border: 1px solid #cfcfcf;">
        <el-col :span="8">
          <div>项目名称：<span> {{solutionData.projectName }}</span></div>
          <div>施耐德电气销售：<span> {{decodeURIComponent(solutionData.salername) }}</span></div>
        </el-col>
        <el-col :span="8">
          <div>Opp ID：<span> {{solutionData.oppId}}</span></div>
          <div>
            方案状态：<span>正常</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div>IXS Number：<span> {{ solutionData.isxNumber }}</span></div>
          <div>方案总价：<span> ￥ {{solutionData.total | formatPrice}}(CNY)</span></div>
        </el-col>
      </el-row>
        <div style="background-color: #5f686d;padding: 8px 20px;">
          <span style="margin-right: 80px;color: #fff;">典型方案</span>

          <el-select  v-model="Mini" placeholder="请选择IMDC Mini典型方案" @change="chooseQskuType('Mini',$event)"
		   style="margin-right: 15px;width: 300px;">
            <el-option v-for="item_mini in qskuType.Mini" :value="item_mini.paramters" :label="item_mini.typeNum">
          </el-option>
          </el-select>
          <el-select v-model="One" placeholder="请选择IMDC One典型方案" @change="chooseQskuType('One',$event)"
		  style="margin-right: 15px;width: 300px;">
            <el-option v-for="item_one in qskuType.One" :value="item_one.paramters" :label="item_one.typeNum">
            </el-option>
          </el-select>
        </div>
        <div class="imdc-menu" style="border: 1px solid #cdcdcd;margin: 15px 0;padding: 20px 25px;">
          <div class="fl" style="width: 5em;">
            灵活配置
          </div>
          <div style="position: relative;box-sizing: border-box;padding-left: 6em;">
            <el-row :gutter="20">
              <el-col :span="8" v-for="item in navItem" style="margin: 0 0 15px;">
                <div style="padding: 10px 15px;border: 1px solid #cdcdcd;height: 130px;">
                  <h3 style="color: #3dcd57;">{{ item.content }}</h3>
                  <div v-for="data in item.sndImdccodeList" :class="'aaa'+ item.sndImdccodeList.length" style="display: table;margin: 8px 0;width: 100%;">

                    <span style="display: table-cell;vertical-align: middle;width: 5em;margin-right: 5px;">{{ data.content }}</span>
                    <el-select style="width: 100%;" v-if="data.type =='1'" v-model="formdata[data.code]" :disabled="data.fill"
                      placeholder="" @change="dataNavItem(data.code,$event)">
                      <el-option v-for="sublist in data.sndImdccodeList" :label="sublist.content" :value="sublist.alias"
                        :disabled="sublist.fill" />
                    </el-select>
                    <el-input style="width: 100%;" v-if="data.type =='0'" v-model="formdata[data.code]" placeholder="0" :disabled="data.fill"
                      onkeyup="value=value.replace(/[^\d]/g,'')" @blur="dataNavItem(data.code,$event)" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="cl"></div>
          <div style="border-bottom: 1px dashed #CCCCCC;margin-bottom:15px ;"></div>
          <div class="fl" style="width: 5em;">
            选择服务
          </div>
		<div style="position: relative;box-sizing: border-box;padding-left: 6em;">
            <el-row :gutter="20">
              <el-col :span="6" style="margin: 0 0 15px;">
                <div style="padding: 10px 15px;border: 1px solid #cdcdcd;height: 130px;">
                  <h3 style="color: #3dcd57;">安装</h3>
                  <div style="display: table;margin: 8px 0;width: 100%;">
                    <el-select  style="width: 100%;" v-model="service['install']" @change="changeService('install',$event)" :disabled="serviceFill">
                      <el-option label="不需要" value="0"/>
                      <el-option label="需要" value="1"/>
                    </el-select>
                  </div>
                  <p style="font-size: 12px;color: #B4BCCC;">说明： IMDC产品销售时不含安装，如需安装服务，请单独选购。</p>
                </div>
              </el-col>
              <el-col :span="6" style="margin: 0 0 15px;">
                <div style="padding: 10px 15px;border: 1px solid #cdcdcd;height: 130px;">
                  <h3 style="color: #3dcd57;">延保</h3>
                  <div style="display: table;margin: 8px 0;width: 100%;">
                    <!-- <span style="display: table-cell;vertical-align: middle;width: 5em;margin-right: 5px;">一年延保</span> -->
                   <el-select style="width: 100%;" v-model="service['yanbao']" @change="changeService('yanbao',$event)" :disabled="serviceFill">
                      <el-option label="1年" value="1"/>
                      <el-option label="2年" value="2"/>
                      <el-option label="3年" value="3"/>
                      <el-option label="4年" value="4"/>
                      <el-option label="5年" value="5"/>
                    </el-select>
                  </div>
                  <p style="font-size: 12px;color: #B4BCCC;">说明： IMDC产品自带保修1年，如需要延长保修时请随产品单独选购。如一台IMDC需要多年延保，需要几年延保则购买几次即可。</p>
                </div>
              </el-col>
              <el-col :span="6" style="margin: 0 0 15px;">
                <div style="padding: 10px 15px;border: 1px solid #cdcdcd;height: 130px;">
                  <h3 style="color: #3dcd57;">维保</h3>
                  <div style="display: table;margin: 8px 0;width: 100%;">
                    
                    <el-select style="width: 100%;" v-model="service['weibao']" @change="changeService('weibao',$event)" :disabled="serviceFill">
                      <el-option label="1年" value="1"/>
                      <el-option label="2年" value="2"/>
					  <el-option label="3年" value="3"/>
					  <el-option label="4年" value="4"/>
					  <el-option label="5年" value="5"/>
                    </el-select>
                  </div>
                  <p style="font-size: 12px;color: #B4BCCC;">说明： 如产品过保修期后，客户需要购买原厂IMDC保修服务，则可以选择维保服务，需要几年维保则购买几次即可。</p>
                </div>
              </el-col>
              <el-col :span="6" style="margin: 0 0 15px;">
                <div style="padding: 10px 15px;border: 1px solid #cdcdcd;height: 130px;">
                  <h3 style="color: #3dcd57;">单次巡检</h3>
                  <div style="display: table;margin: 8px 0;width: 100%;">
                    
                    <el-select style="width: 100%;" v-model="service['xunjian']"  @change="changeService('xunjian',$event)" :disabled="serviceFill">
                      <el-option label="1次" value="1"/>
                      <el-option label="2次" value="2"/>
					  <el-option label="3次" value="3"/>
					  <el-option label="4次" value="4"/>
					  <el-option label="5次" value="5"/>
                    </el-select>
                  </div>
                  <p style="font-size: 12px;color: #B4BCCC;">说明： 一次设备的原厂健康检查。</p>
                </div>
              </el-col>
            </el-row>
          </div>
       
        </div>

        <div id="showIMDC" :class="showIMDCClass=='true'?'showIMDCshow':'showIMDChide'">
          <!-- <div style="font-weight: bold;height: 50px;line-height: 50px;margin-bottom: 20px;padding-left:20px;background-color:#f4f4f4;">
                   操作提示
                   rack数量<input v-model="table.tablerackNum">
                   机柜高度<input v-model="table.tablerackLen">
                   F33len<input v-model="table.color1len">
                   greenlen<input v-model="table.color2len">
                   bluelen<input v-model="table.color3len">
                   color4len<input v-model="table.color4len">
                   <input type="button" @click="tablesub()" value="查询">
                 </div> -->
          <div style="padding-top: 10px;height: 600px;width:80%;background-color: #f4f4f4;margin: 0 auto;text-align: center; vertical-align: middle; position: relative;top: 50%;margin-top: -300px;">
            <img src="@/assets/img/imdcClose.png" style="border-radius: 50%;position: absolute;top: 10px;right: 10px;cursor: pointer;" @click="showIMDCc">
            <div style="height: 580px;overflow-y: scroll;">

					<el-main style="padding: 0;height: auto; padding: 15px 15px; border: 1px solid rgb(205, 205, 205); background-color: rgb(255, 255, 255); margin-bottom: 20px;">
					  <!-- <div style="font-weight: bold;height: 50px;line-height: 50px;margin-bottom: 20px;padding-left:20px;background-color:#f4f4f4;">
					    操作提示
					    rack数量<input v-model="table.tablerackNum">
					    机柜高度<input v-model="table.tablerackLen">
					    F33len<input v-model="table.color1len">
					    greenlen<input v-model="table.color2len">
					    bluelen<input v-model="table.color3len">
					    color4len<input v-model="table.color4len">
					    rdpNum:<input v-model="table.rdpNum">
					    <input type="button" @click="tablesub()" value="查询">
					  </div> -->
					  <el-main style="height: auto;background-color: #f4f4f4;margin-top: 0;text-align: center; vertical-align: middle;">
					    <div class="table-title1 ul-list">
					      <ul>
					        <li><span style="background-color: #000000;"></span>柜体</li>
					        <li><span style="background-color: #00b050;"></span>配电箱</li>
					        <li><span style="background-color: #00b0f0;"></span>UPS</li>
					        <li><span style="background-color: #0070c0;"></span>电池箱</li>
					        <li><span style="background-color: #7030a0;"></span>空调</li>
					      </ul>
					    </div>
					    <div class="table-title1" style="width: 75%;position: relative;">
					      <table style="width: 100%;text-align: left;border: 0;">
					        <tr v-for="data in table.tabletitle">

					          <td style="color:#00b050">{{data}}</td>
					        </tr>
					      </table>
					      <div class="table-charts1">
					      <table style="width: 22%;text-align: center;position: absolute;left: 10%;top: 0;" :style="'width:'+table.width +'px'">
					        <tr v-for="(data,index) in table.tablerack1">
					          <template v-if = "table.rdpNum > 0">
					          <td :rowspan="table.tablerack1.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					          <td  :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
					          <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

					          <template v-if = "table.rdpNum > 1">
					          <td :rowspan="table.tablerack1.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					        </tr>
					      </table>
					      <table style="width: 22%;text-align: center;position: absolute;left: 40%;top: 0;" :style="'width:'+table.width +'px'">
					        <tr v-for="(data,index) in table.tablerack2">
					          <template v-if = "table.rdpNum > 0">
					          <td :rowspan="table.tablerack2.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;height: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					          <td  :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
					          <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

					          <template v-if = "table.rdpNum > 1">
					          <td :rowspan="table.tablerack2.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					        </tr>
					      </table>
					      <table style="width: 22%;text-align: center;position: absolute;left: 70%;top: 0;" :style="'width:'+table.width +'px'">

					        <tr v-for="(data,index) in table.tablerack3">
					          <template v-if = "table.rdpNum > 0">
					          <td :rowspan="table.tablerack3.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					          <td  :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
					          <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

					          <template v-if = "table.rdpNum > 1">
					          <td :rowspan="table.tablerack3.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff"><p>rPDU</p></td>
					          </template>
					        </tr>

					      </table>
					      </div>
					    </div>
					  </el-main>
					</el-main>

				</div>
          </div>
        </div>
      </el-container>
    </el-container>
    <!-- 机柜修改为ups -->
    <div class="wrapper">

	  <el-row>
		<el-col :span="4" class="pages" style="text-align: center;background-color: #41923e;margin-top:0;color: #fff;padding: 15px 0;">
		   <strong style="margin-left:10px;font-size: 1.0em;">配置清单</strong>
		</el-col>
	    <el-col :span="10" class="pages" style="text-align: center;background-color: #41923e;margin-top:0;color: #fff;padding: 15px 0;">
	      QSKU号：  {{ qsku }}
	    </el-col>
	    <el-col :span="10" class="pages" style="text-align: center;background-color: #41923e;margin-top:0;color: #fff;padding: 15px 0;">
	      合计： RMB {{ totle }}
	    </el-col>
	  </el-row>
      <div class="add-table" style="margin-top: 5px;padding: 20px 10px 0;">
        <el-table style="width: 100%;" class="anone">
          <el-table-column prop="" label="SKU类型" width="200" />
          <el-table-column prop="" label="产品" width="200" />
          <el-table-column prop="" label="描述" />
          <el-table-column prop="" label="单价" width="100" />
          <el-table-column prop="" label="数量" width="100" />
          <el-table-column prop="" label="合计" width="100" />
          <el-table-column prop="" label="级别" width="100" />
        </el-table>
        <el-table :row-class-name="tableRowClassName" :data="imdclist" row-key="productId" :tree-props="{children: 'productList', hasChildren: 'hasChildren'}">
          <el-table-column prop="parameter5" label="ATO" width="200" />
          <el-table-column prop="sku" label="IMDC" width="200" />
          <el-table-column prop="description" label="IMDC Solution" />
          <el-table-column prop="ddpPrice" label="——" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.ddpPrice > 0 ">{{ scope.row.ddpPrice | formatPrice }}</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column prop="lev" label="1" width="100" />
          <el-table-column prop="totalPrice" width="100">
            <template v-if="scope.row.totalPrice != null" slot-scope="scope">
              {{ scope.row.totalPrice | formatPrice }}
            </template>
            <template v-else>——</template>
          </el-table-column>
          <el-table-column prop="leve" label="1" width="100" />
        </el-table>
		
      </div>
      <div class="footer" style="background-color: #fff;border-top: 2px solid #41923e;height: 80px;text-align: center;">
        <el-button v-if="imdclist != ''" style="width: 10em;background-color: #61b2e1;color: #fff;margin:20px auto;"
          @click="saveImdc">保存</el-button>
		<el-button v-if="imdclist != ''" style="width: 10em;background-color: #41923e;color: #fff;margin:20px auto;margin-left: 20px;"
		  @click="submitCheck">提交审核</el-button>
        <el-button style="margin:20px auto;width: 10em; margin-left: 20px;" @click="reloadImdc">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style>
  body {
     background-color: #F5F5F5;
   }
   .showIMDCshow{
     display: block;
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     z-index: 99;
     background-color: rgba(0,0,0,.8);
   }
   .showIMDChide{
     display: none;
   }
   input {
     width: 4em;
   }

   .ul-list li {
     margin: 10px 0 10px 10px;
     text-align: left;
   }

   .aaa3:nth-child(3),
   .aaa3:nth-child(4) {
     width: 48% !important;
     float: left;
   }

   .aaa3:nth-child(4) {
     margin-left: 4% !important;
   }

   .aaa5:nth-child(2),
   .aaa5:nth-child(3),
   .aaa5:nth-child(4) {
     width: 33% !important;
     float: left;
   }

   .aaa5 span {
     text-align: right;
     padding-right: 8px;
   }

   .aaa5:nth-child(5),
   .aaa5:nth-child(6) {
     width: 48% !important;
     float: left;
   }

   .ul-list li span {
     width: 80px;
     display: inline-block;
     height: 1em;
     margin-right: 15px;
     position: relative;
     top: 2px;

   }

   .table-title1,
   .table-charts1 {
     float: left;
     width: 20%;
   }

   .table-title1 table,
   .table-charts1 table {
     border-collapse: collapse;
     font-size: 11px
   }

   .table-title1 td,
   .table-charts1 td {
     height: 20px;
     border-bottom: 1px solid #b7b7b7;
     padding: 0 5px;
     width: auto;
     height: 16px;
     font-size: 12px;
   }
  .table-charts1 table{
    padding: 0 20px;
    border: 2px solid #000;
    position: relative;
    z-index: 999;
  }
   .table-charts1 td {
     border-bottom: 1px solid #f9f9f9;
     padding: 0 0;
   }

   .table-th-none .has-gutter {
     display: none;
   }

   .el-popper[x-placement^=top] {
     border: 1px solid #41923e;
     border-radius: 0;
     padding: 0 0 10px;
   }

   .ac .el-popper[x-placement^=top] .popper__arrow {
     left: 30px !important;
   }

   .el-popper[x-placement^=top] .popper__arrow::after {
     bottom: 0px;
     border-top-color: #41923e;
   }

   .el-popper .popper__arrow::after {
     color: #41923e;
   }

   .el-popper[x-placement^=top] .popper__arrow::after {}

   .wrapper {
     border: 1px solid #cdcdcd;
     border-top: 0;
     margin: 0px 10px;
     background-color: #fff;
   }

   .anone .el-table__empty-block {
     display: none;
   }

   .add-table .has-gutter th {
     background-color: #6bc966;
     color: #fff;
   }

   .anone .has-gutter tr th {
     background-color: #fff !important;
     color: #41923e;
   }

   .add-table h2 {
     font-size: 1.2em;
     line-height: 2;
     padding: 5px 0;
   }

   .add-table .el-table tr td:first-child,
   .add-table .el-table tr th:first-child {
     text-align: left;
     padding-left: 30px;
   }

   .add-table td:first-child i.el-icon-plus,
   .add-table td:first-child i.el-icon-minus {
     border: 1px solid #cdcdcd;
     padding: 3px;
   }

   .nnn {
     float: right;
     position: absolute;
     width: 100% !important;
     left: 0;
   }

   .el-popper[x-placement^=bottom] .popper__arrow,
   .el-popper[x-placement^=top] .popper__arrow {
     left: 50% !important;
   }

   .nnn .el-input--small .el-input__inner {
     height: 20px;
     line-height: 20px;
     border: 0;
     background-color: transparent;
     text-align: right;
     font-size: 12px;
     color: #30752e
   }

   .nnn .el-icon-arrow-up:before {
     /* content: '1'; */
     position: relative;
     top: -7px;
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
     border-bottom: 1px solid #cccccc;
     border-left: 0;
     border-right: 0;
     padding-bottom: 10px;
     margin: -1px 15px 5px;
     font-size: .8em;
   }

   .el-menu-item-group__title {
     border: 0;
     margin-bottom: 0;
     margin-top: 8px;
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

   .el-submenu .el-menu-item {
     color: #333
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

   .el-table .success-row {
     background: #eeeeee;
   }
</style>
<script>
  import {
	querySolutionById,
	quaryStatuscode,
    getImdcCode,
    getImdcList,
	saveImdcDesign,
    addImdcDesign,
    getImdcChooseHistory,
	qskuTypeList,
	getImdcServiceList
  } from '@/api/movie'

	import {checkTips} from '../solution/components'

  export default {
	  components: {
	    checkTips
	  },
    inject: ['reload'],
    name: 'SolutionAdd0',
    filters: {
      formatPrice(val1) {
        let val = Number(val1 * 1.1 * 1.13 / 0.75).toFixed(2)
        //let val = Math.round(val1* 1.1 * 1.13 / 0.75)
        var reg = /(?=(?!(\b))(\d{3})+$)/g
        val = val + ''
        return val.indexOf('.') >= 0 ? val.split('.')[0].replace(reg, ',') + '.' + val.split('.')[1] : val.replace(reg,
          ',')
      }
    },
    data() {
      return {
        showIMDCClass:'false',
        Mini: '',
        One: '',
        solutionId: '',
        productModel: '',
        formItem: [],
        navlistForm: [],
        table: {
          tabletitle: [],
          tablerack1: [],
          tablerack2: [],
          tablerack3: [],
          tablerackLen: 24,
          tablerackNum: 0,
          color1len: 0,
          color2len: 0,
          color3len: 0,
          color4len: 0,
		  rdpNum:0,
		  width:'176'
        },
        titleData: {
          pdpNumber: '',
          projectName: ''
        },
        tableData: [],
        newData: [],
        navItem: [],
        value: '',
        formdata: {},
        imdclist: [],
        totle: 0,
        qsku: null,
		qskuType:{
			Mini:[],
			One:[],
			ROW:[],
			POD:[]
		},
		Mini:'',
		One:'',
		ROW:'',
		POD:'',
		solutionData: {
		  oppId: '',
		  isxNumber:'',
		  salername: '',
		  total:'',
		  projectName:''
		},
		service:{},
		serviceFill:true
			
		
      }
    },
    mounted: function() {
      var that = this
      for (let i = 41, j = 0; i >= 0; i--, j++) {
        that.table.tabletitle[j] = (i + 1) + 'u';
      }
      that.tableData = [{
        ato: 'APC Part',
        imdc: '- IMDCFRM',
        type: 'IMDC FRAME OPTIONNS',
        sku: '1'
      }]
      that.newData = [{
          type: 'UPS',
          title: 'GPXUPS100KH48P32AS',
          num: 1
        },
        {
          type: 'UPS',
          title: 'GPXUPS100KH48P64AS',
          num: 2
        }
      ]
      console.log(that.$route)
    },
    created() {
      var that = this
      that.solutionId = that.$route.query.solutionId
      that.productModel = that.$route.query.productModel
	  that.getSolutionInfo();
      that.getImdcCode()
	  that.qskuTypeList()
    },

    methods: {
	  getSolutionInfo(){
		var that = this
		querySolutionById({'solutionId':that.solutionId}).then((response) => {
			console.log('imdc-------------------------------------------------');
			if(response.code == 0){
				that.solutionData.oppId = response.data.solution.oppID;
				that.solutionData.salername = response.data.solution.realname;
				that.solutionData.isxNumber = response.data.solution.isxNumber;
				that.solutionData.total = response.data.prices;
				console.log(response.data.solution.oppID+','+response.data.solution.realname+','+response.data.prices);
			}
		})
		quaryStatuscode('solutionId=' + that.solutionId).then((response) => {
			if(response.code == 0){
				that.solutionData.projectName = response.data.solution.projectName
			}
		})
	  },
	  tablesub() {
	    let that = this;
	    let len = 41;
	    len = that.table.tablerackLen
		const len1 = that.table.color1len
		const len2 = that.table.color2len
		const len3 = that.table.color3len
		const len4 = that.table.color4len
		that.table.rdpNum = that.formdata['A05T2'];
	    if(len == 42){
	      that.table.width = '200'
	    }else{
	      that.table.width = '160'
	    }
	      that.table.tabletitle.length = 0
	      for (let i = --len, j = 0; i >= 0; i--, j++) {
	        that.table.tabletitle[j] = (i + 1) + 'u';
	      }
	    if(Number(that.table.color1len) > 1){
	      len = len - Number(that.table.color1len) + 1
	    }
	    if(Number(that.table.color2len) > 1){
	      len = len - Number(that.table.color2len) + 1
	    }
	    if(Number(that.table.color3len) > 1){
	      len = len - Number(that.table.color3len) + 1
	    }
	    if(Number(that.table.color4len) > 1){
	      len = len - Number(that.table.color4len) + 1
	    }
	    let num = that.table.tablerackNum
	    that.table.tablerack3.length = that.table.tablerack2.length = that.table.tablerack1.length = 0
	    switch (num) {
	      case '3':
			console.log('------3:'+that.table.tablerack3+'-----len:'+that.table.tablerackLen);
			console.log('------3:'+that.table.tablerack3+',0,0,0,0');
	        that.tableFun(that.table.tablerack3,(that.table.tablerackLen-1));
	        that.tableSize(that.table.tablerack3,0, 0, 0, 0)
	      case '2':
			console.log('------2:'+that.table.tablerack2+'-----len:'+that.table.tablerackLen);
			if (that.formdata['A04T1'] == 2) {
				console.log('------2:'+that.table.tablerack2+',0, 0, 0,'+that.table.tablerackLen);
				that.tableFun(that.table.tablerack2,(that.table.tablerackLen-len4));
				that.tableSize(that.table.tablerack2, 0, 0, 0, len4)
			} else {
				console.log('------2:'+that.table.tablerack2+',0, 0, 0,0');
				that.tableFun(that.table.tablerack2,(that.table.tablerackLen-1));
				that.tableSize(that.table.tablerack2, 0, 0, 0, 0)
			}
	      case '1':
			console.log('------1:'+that.table.tablerack1+'-----len:'+len);
			console.log('------1:'+that.table.tablerack1+','+len1+','+len2+','+len3+','+len4);
	        that.tableFun(that.table.tablerack1,len);
	        that.tableSize(that.table.tablerack1, len1, len2, len3, len4)
	      default:
	    }
	    console.log('that.table.tablerack1',that.table.tablerack1)
	  },
      tableSize(arr, len1, len2, len3, len4) {
        const that = this
        console.log('1----', arr)
        // let len1 = that.table.color1len
        // let len2 = that.table.color2len
        // let len3 = that.table.color3len;
        // let len4 = that.table.color4len
        if (len4 <= 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].val != 'NaN1') {
              if (len1 > 0) {
				arr[i].row = Number(len1)*16
                arr[i].val = 'PDU'
                arr[i].gbcolor = '#00b050'
                 len1 = 0
              } else if (len2 > 0) {
				arr[i].row = Number(len2)*16
                arr[i].val = 'UPS'
                arr[i].gbcolor = '#00b0f0'
                len2 = 0
              } else if (len3 > 0) {
				arr[i].row = Number(len3)*16
                arr[i].val = 'BAT'
                arr[i].gbcolor = '#0070c0'
                len3 = 0
              } else {
                console.log(arr)
                return
              }
            }
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].val != 'NaN1') {
              if (len1 > 0) {
				arr[i].row = Number(len1)*16
                arr[i].val = 'PDU'
                arr[i].gbcolor = '#00b050'
                 len1 = 0
              } else if (len2 > 0) {
				arr[i].row = Number(len2)*16
                arr[i].val = 'UPS'
                arr[i].gbcolor = '#00b0f0'
                len2 = 0
              } else {
                console.log(arr)
                break
              }
            }
          }
          for (let i = arr.length - 1; i > 0; i--) {
            if (arr[i].val != 'NaN1') {
              if (len4 > 0) {
				arr[i].row = Number(len4)*16
                arr[i].val = 'Cooling'
                arr[i].gbcolor = '#7030a0'
                len4 = 0
              } else if (len3 > 0) {
				arr[i].row = Number(len3)*16
                arr[i].val = 'Battery'
                arr[i].gbcolor = '#0070c0'
                len3 = 0
              } else {
                console.log(arr)
                return
              }
            }
          }
        }
      },

	 tableFun(arr,len) {
	   arr.length = 0;
	   let that = this;
	   for (let i = len; i >= 0; i--) {
	       arr[i] = {}
	       //arr[i].val = i + 1;
		   arr[i].val = '';
	       arr[i].gbcolor = '';
		   arr[i].row = 16;
	   }
	   console.log('that.table.tablerack1----',that.table.tablerack1)
	   arr.reverse()
	 },
      getImdcChooseHistory(solutionId, productModel) {
        var that = this
        getImdcChooseHistory({
          'solutionId': solutionId,
          'productModel': productModel
        }).then((response) => {
          console.log('历史记录：' + JSON.stringify(response))
          that.formdata['A05T1'] = '1'
          that.formdata['A05T2'] = '1'
          that.formdata['A06T4'] = '2'
          that.formdata['A06T5'] = '2'

          if (response.status == 0) {
			  if(response.data != null){
				  //that.formdata = response.data;
				  that.jsonSort(response.data);
				  that.designPic()
				  that.getImdcList()
				  //that.qsku = response.qsku
				  for(var key in that.formdata){
				   console.log('历史记录开始验证：'+key+'/'+that.formdata[key]);
				   that.checkOptions(key, that.formdata[key] ,false);
				  }
			  }
			  if(response.service != null){
				  that.service = response.service;
			  }
			   // if(response.solution != null){
				  //  that.titleData.pdpNumber = response.solution.pdpNumber;
				  //  that.titleData.projectName = response.solution.projectName;
			   // }
          }
        })
      },
      getImdcCode() {
        var that = this
        getImdcCode().then((response) => {
          const {
            data
          } = response
          // that.navItem = data
          for (const i in data) {
            for (const j in data[i].sndImdccodeList) {
              // 盲板/导轨/层板不可填
              if (data[i].sndImdccodeList[j].code == 'A06T1' || data[i].sndImdccodeList[j].code == 'A06T2' || data[
                  i].sndImdccodeList[j].code == 'A06T3') {
                  data[i].sndImdccodeList[j].fill = true
              }
              for (const n in data[i].sndImdccodeList[j].sndImdccodeList) {
                // 设置一体式空调不可选
                if (data[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T2B2') {
                  data[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
                }
                // IEC口不可选
                if (data[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A05T1B2') {
                  data[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
                }
              }
            }
          }
          that.navItem = data
		  //获取历史数据
		  that.getImdcChooseHistory(that.solutionId, that.productModel)
        })
      },
      getImdcList() {
        var that = this
        that.$layer.loading({
          content: 'loading',
          shade: true
        })
			var data = null;
			var totle = null;
		 getImdcList(that.formdata).then((response) => {
			 if(response.code == 0){
				 data = response.data;
				 totle = response.money;
				 that.qsku = response.qsku;
				 if(that.formdata['A01T1'] && (that.service.install || that.service.yanbao 
				 || that.service.weibao || that.service.xunjian)){
					 that.getImdcServcieList(data,totle);
				 }else{
					if (data) {
					  for (const i in data) {
						data[i]['hasChilrden'] = true
						data[i]['leve'] = '2'
					  }
					  // console.log('ImdcList--->' + JSON.stringify(data))
					  that.imdclist = data
					  for (const i in data) {
						for (const j in data[i].productList) {
						  data[i].productList[j]['description'] = '— ' + data[i].productList[j]['description']
						  data[i].productList[j]['leve'] = '3'
						  data[i].productList[j]['hasChilrden'] = false
						}
					  }
					  that.imdclist = data
					  //设置Service是否可选
					  if(that.formdata.A01T1){
						  that.serviceFill = false;
					  }else{
						  that.serviceFill = true;
					  }
					  //that.totle = Math.round(response.money * 1.1 * 1.13 / 0.75).toLocaleString()
						that.totle = Number(response.money * 1.1 * 1.13 / 0.75).toFixed(2)
					  that.qsku = response.qsku
					  that.$layer.closeAll()
					} else {
					  that.$layer.closeAll()
					}
				 }
			 } else {
				that.$layer.closeAll()
			 }
		 })
		 
      },
	  getImdcServcieList(data,totle){
		  var that = this;
		  getImdcServiceList(that.service).then((response)=>{
		  		if(response.code == 0){
					 data = data.concat(response.data);
					 
					for(var n in response.data){
						//data.push(response.data[n]);
						totle+=response.data[n].totalPrice;
					}
				   if (data) {
					 for (const i in data) {
					   data[i]['hasChilrden'] = true
					   data[i]['leve'] = '2'
					 }
					 // console.log('ImdcList--->' + JSON.stringify(data))
					 that.imdclist = data ;
					 for (const i in data) {
					   for (const j in data[i].productList) {
						 data[i].productList[j]['description'] = '— ' + data[i].productList[j]['description']
						 data[i].productList[j]['leve'] = '3'
						 data[i].productList[j]['hasChilrden'] = false
					   }
					 }
					 that.imdclist =  data;
					 //设置Service是否可选
					 if(that.formdata.A01T1){
						that.serviceFill = false;
					 }else{
						that.serviceFill = true;
					 }
					 that.totle = Number(totle * 1.1 * 1.13 / 0.75).toFixed(2)
					 
					 that.$layer.closeAll()
					 console.log('ImdcList--->' + JSON.stringify(data))
				   } else {
					 that.$layer.closeAll()
				   }
				}	 
		  })
	  },
      tableRowClassName(e) {
        if (e.row.hasChilrden == true) {
          return 'success-row'
        } else {
          return ''
        }
      },

      show() {
        const that = this
        console.log(that.navlistForm)
      },

      handleChange(value, oldValue, index) {
        var that = this
      },
      handleCloseReview() {
        this.$refs[`popover-1`].doClose()
      },
	  changeService(code,e){
		  console.log('ServiceCode---->' + code + ':' + e)
		  this.getServiceList()
	  },
      dataNavItem(code, e) {
        const that = this
        console.log('code---->' + code + ':' + e)
				//清除典型方案设置
				that.Mini = '';
				that.One = '';
        that.checkOptions(code, e ,true)
        console.log('formdata--->', JSON.stringify(that.formdata))
        that.getImdcList()
      },
      checkOptions(code, e, enable) {
        var that = this
        switch (code) {
          case 'A01T1': // 产品类型逻辑
            that.productModelOption(e)
            break
          case 'A01T2': // it负载
            that.itOption(e)
            break
          case 'A02T2': // ups容量
           that.upsValOption(e);
            break
          case 'A03T1': // 机柜高度
            that.jgHeightOption(e)
            break
        }
		if(enable){
			that.getServiceList()
			that.designPic()
		}
      },
	  // 产品类型逻辑
	  productModelOption(e) {
		 var that = this;
		 if(e == '1'){
		 	for (const i in that.navItem) {
				for (const j in that.navItem[i].sndImdccodeList) {
								//If #1=“无空调MINI”，则#10-12不可选
							   if (that.navItem[i].sndImdccodeList[j].code == 'A04T1' || that.navItem[i].sndImdccodeList[j].code ==
								 'A04T2' || that.navItem[i].sndImdccodeList[j].code == 'A04T3') {
								 that.navItem[i].sndImdccodeList[j].fill = true
										that.formdata.A04T1 = '';
										that.formdata.A04T2 = '';
										that.formdata.A04T3 = '';
							   }
							   // If #1=“无空调MINI”，则#冷凝水泵、低温套件不可选
							   if (that.navItem[i].sndImdccodeList[j].code == 'A06T4' || that.navItem[i].sndImdccodeList[j].code ==
								 'A06T5') {
								 that.navItem[i].sndImdccodeList[j].fill = true
									   that.formdata.A04T6 = '';
									   that.formdata.A04T5 = '';
							   }
				  for (const n in that.navItem[i].sndImdccodeList[j].sndImdccodeList) {
					  // If #1="无空调MINI", 则#2只能选择3KW, 6KW
					  if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B3') {
							that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							 if(that.formdata.A01T2 == '3'){
								  that.formdata.A01T2 = '';
								   that.itOption('');
							  }
					   }
					   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B2') {
					   		that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					    }
					   // If #1="无空调MINI", 则#7 it=3kw ups负载只能选择3KW, 6KW
					   if(that.formdata.A01T2 == '1'){
							   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
								 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
								 if(that.formdata.A02T2 == '3'){
									  that.formdata.A02T2 = ''
								  }
								}
								if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3'){
									that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
								}
					   }
					   // If #1="无空调MINI", 则#7 it=6kw ups负载只能选择6KW
					   if(that.formdata.A01T2 == '2'){
						   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
							 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							 if(that.formdata.A02T2 == '1' || that.formdata.A02T2 == '3'){
								  that.formdata.A02T2 = ''
							  }
							}
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2') {
								that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							 }
					   }
					   // If #1="无空调MINI", 则机柜 24U、42U可选
						if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T1B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T1B2'){
							that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
						}
					   //if #1="无空调MINI", 则机柜数量只可选1
						if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3') {
							 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							 if(that.formdata.A03T2 == '2' || that.formdata.A03T2 == '3'){
								  that.formdata.A03T2 = ''
							  }
						}
						// If #1="无空调MINI"，则#3 SP、SURT系列可选
						if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T1B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T1B2') {
						   that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
						 }
				   }
			    }
		 	}
		 }else if(e == '2'){
			for (const i in that.navItem) {
				for (const j in that.navItem[i].sndImdccodeList) {
							//取消If #1=“无空调MINI”，则#10-12不可选
							if (that.navItem[i].sndImdccodeList[j].code == 'A04T1' || that.navItem[i].sndImdccodeList[j].code ==
								 'A04T2' || that.navItem[i].sndImdccodeList[j].code == 'A04T3') {
								 that.navItem[i].sndImdccodeList[j].fill = false
							}

							// 取消If #1=“无空调MINI”，则#冷凝水泵、低温套件不可选
							if (that.navItem[i].sndImdccodeList[j].code == 'A06T4' || that.navItem[i].sndImdccodeList[j].code ==
								 'A06T5') {
								 that.navItem[i].sndImdccodeList[j].fill = false
							}
				  for (const n in that.navItem[i].sndImdccodeList[j].sndImdccodeList) {
					   // If #1="机架式空调ONE", 则#2只能选择6KW, 10KW
					  if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B1') {
						 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
						 if(that.formdata.A01T2 == '1'){
							  that.formdata.A01T2 = '';
							   that.itOption('');
						  }
				       }
					  if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A01T2B3') {
						 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					   }
					   // If #1="机架式空调ONE", 则#7 it=6kw ups负载只能选择6KW, 10KW
					   if(that.formdata.A01T2 == '2'){
						   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1') {
							 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							 if(that.formdata.A02T2 == '1'){
								  that.formdata.A02T2 = ''
							  }
							}
							if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3'){
								that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							}
					   }
					   // If #1="机架式空调ONE", 则#7 it=10kw ups负载只能选择10KW
					   if(that.formdata.A01T2 == '3'){
						   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2') {
							 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							 if(that.formdata.A02T2 == '1' || that.formdata.A02T2 == '2'){
								  that.formdata.A02T2 = ''
							  }
							}
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
								that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							 }
					   }
					   // If #1="机架式空调ONE", 则机柜 24U不可选
					   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T1B1') {
						 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
						 if(that.formdata.A03T1 == '1'){
							  that.formdata.A03T1 = ''
						  }
						}
						if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T1B2'){
							that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
						}
						//if #1="机架式空调ONE",ups容量6kw 则机柜数量可选1、2
						if(that.formdata.A02T2 == '2'){
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3') {
								 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
								 if(that.formdata.A03T2 == '3'){
									  that.formdata.A03T2 = ''
								  }
							}
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2'){
								that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							}
						}
						//if #1="机架式空调ONE",ups容量10kw 则机柜数量可选1、2、3
						if(that.formdata.A02T2 == '3'){
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2'
							|| that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3'){
								that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							}
						}
						//IF =机架式空调ONE AND M21=6kW,则可选3.5kW
						if(that.formdata.A02T2 == '2'){
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B2') {
								 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
								 if(that.formdata.A04T1 == '2'){
									  that.formdata.A04T1 = ''
								  }
							}
						}
						//IF =机架式空调ONE AND M21=10kW,则可选3.5kW、3.5kW*2
						if(that.formdata.A02T2 == '3'){
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B2') {
								 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							}
						}
						// If #1="机架式空调ONE"，则#3 SURT系列不可选
						if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T1B2') {
						   that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
							  if(that.formdata.A02T1 == '2'){
								  that.formdata.A02T1 = ''
							  }
						 }
				   }
			    }
			}
		 }
	  },
	  //it负载逻辑
	  itOption(e){
		  var that = this;
		  for (const i in that.navItem) {
				for (const j in that.navItem[i].sndImdccodeList) {
				  for (const n in that.navItem[i].sndImdccodeList[j].sndImdccodeList) {
					  if(!e){
						  if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3'){
							  that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							   that.formdata.A02T2 = '';
							   that.upsValOption('');
						  }
					  }
					  if(e == '1'){
					  	  // If #1="无空调MINI", 则#7 it=3kw ups负载只能选择3KW, 6KW
					  	  if(that.formdata.A01T1 == '1'){
					  		   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
					  			 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  			 if(that.formdata.A02T2 == '3'){
					  				  that.formdata.A02T2 = '';
									  that.upsValOption('');
					  			  }
					  			}
					  			if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2'){
					  				that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  			}
					  	  }

					    }
					  if(e == '2'){
					  	// If #1="无空调MINI", 则#7 it=6kw ups负载只能选择6KW
					  	if(that.formdata.A01T1 == '1'){
					  	   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
					  		 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  		 if(that.formdata.A02T2 == '1' || that.formdata.A02T2 == '3'){
					  			  that.formdata.A02T2 = '';
								  that.upsValOption('');
					  		  }
					  		}
					  		if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2') {
					  			that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  		 }
					  	}
					  	// If #1="机架式空调ONE", 则#7 it=6kw ups负载只能选择6KW, 10KW
					  	if(that.formdata.A01T1 == '2'){
					  	   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1') {
					  		 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  		 if(that.formdata.A02T2 == '1'){
					  			  that.formdata.A02T2 = '';
								  that.upsValOption('');
					  		  }
					  		}
					  		if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3'){
					  			that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  		}
					  	}
					  }
					  if(e == '3'){
					  	// If #1="机架式空调ONE", 则#7 it=10kw ups负载只能选择10KW
					  	if(that.formdata.A01T1 == '2'){
					  	   if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B2') {
					  		 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  		 if(that.formdata.A02T2 == '1' || that.formdata.A02T2 == '2'){
					  			  that.formdata.A02T2 = '';
								  that.upsValOption('');
					  		  }
					  		}
					  		if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A02T2B3') {
					  			that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  		 }
					  	}
					  }
					}
				}
		    }

	  },
	  //ups容量
	  upsValOption(e){
		  var that = this;
		  for (const i in that.navItem) {
				for (const j in that.navItem[i].sndImdccodeList) {
				  for (const n in that.navItem[i].sndImdccodeList[j].sndImdccodeList) {
					  if(!e){
							  if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3'){
								  that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
								   that.formdata.A03T2 = ''
							  }
							  if(that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B2'){
								  that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
								   that.formdata.A04T1 = ''
							  }
					  }
					  if(e == '2'){
					  			  //if #1="机架式空调ONE",ups容量6kw 则机柜数量可选1、2
					  			  if(that.formdata.A01T1 == '2'){
					  			  	if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3') {
					  			  		 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  			  		 if(that.formdata.A03T2 == '3'){
					  			  			  that.formdata.A03T2 = ''
					  			  		  }
					  			  	}
					  			  	if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2'){
					  			  		that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  			  	}
					  				//IF =机架式空调ONE AND M21=6kW,则可选3.5kW
					  				if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B2') {
					  					 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
					  					 if(that.formdata.A04T1 == '2'){
					  						  that.formdata.A04T1 = ''
					  					  }
					  				}
									if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B1'){
										that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
									}
					  			  }
					  }
					  if(e == '3'){
					  	 //if #1="机架式空调ONE",ups容量10kw 则机柜数量可选1、2、3
					  	 if(that.formdata.A01T1 == '2'){
					  	 	if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A03T2B3'){
					  	 		that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
					  	 	}
							//IF =机架式空调ONE AND M21=10kW,则可选3.5kW、3.5kW*2
							if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B1' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T1B2') {
								 that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
							}
					  	 }
					  }
					}
				}
		    }

	  },
	 //机柜高度
	 jgHeightOption(e) {
	   var that = this;
	   that.table.tabletitle = [];
	   var i = 0,
		 j = 0;
	   if (e == 1) {
		 i = 23
	   } else if (e == 2) {
		 i = 41
	   }
	   for (i, j; i >= 0; i--, j++) {
		 that.table.tabletitle[j] = (i + 1) + 'u'
	   }
	 },

      reloadImdc() {
        // this.reload();
        var that = this
        that.formdata = {}
		that.service = {}
		for (const i in that.navItem) {
			for (const j in that.navItem[i].sndImdccodeList) {
				// 盲板/导轨/层板不可填
				if (that.navItem[i].sndImdccodeList[j].code == 'A06T1' || that.navItem[i].sndImdccodeList[j].code == 'A06T2' || that.navItem[i].sndImdccodeList[j].code == 'A06T3') {
				    that.navItem[i].sndImdccodeList[j].fill = true
				}else{
					that.navItem[i].sndImdccodeList[j].fill = false
				}
			  for (const n in that.navItem[i].sndImdccodeList[j].sndImdccodeList) {
				  // 设置一体式空调不可选  IEC口不可选
				  if (that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A04T2B2' || that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].code == 'A05T1B2') {
				    that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = true
				  }else{
					that.navItem[i].sndImdccodeList[j].sndImdccodeList[n].fill = false
				  }
			   }
			}
		}
		that.formdata['A05T1'] = '1'
		that.formdata['A05T2'] = '1'
		that.formdata['A06T4'] = '2'
		that.formdata['A06T5'] = '2'
        that.getImdcList()
      },

	 saveImdc() {
		var that = this
		let submit = ''
		let msg = '您确认要保存此方案？'

		if (that.checkSubmit()) {
		  this.$confirm(msg, '提示', {
			  distinguishCancelAndClose: true,
			  confirmButtonText: '确认',
			  cancelButtonText: '取消',
			  closeOnClickModal: false
			})
			.then(() => {
				  //that.jsonSort(that.formdata);
			  submit = that.formdata
				  that.jsonSort(submit)
			  submit['selOptions'] = JSON.stringify(submit).replace(/\s/g, '')
			  submit['solutionId'] = that.solutionId
			  submit['productModel'] = that.productModel
			  submit['sku'] = that.qsku
			  submit['serviceOptions'] = JSON.stringify(that.service).replace(/\s/g, '')
			  //let imdcSubmitData = {submit,that.service};
			  for (var obj in that.service) {
				  submit[obj] = that.service[obj];
			  }
			  console.log('option:' + JSON.stringify(submit))
			  that.saveImdcDesign(submit)
			  delete submit['selOptions']
			  delete submit['solutionId']
			  delete submit['productModel']
			  delete submit['sku']
			  delete submit['serviceOptions']
			})
			.catch(action => {})
		}
	 },

      jsonSort(data) {
        console.log('json处理前：' + JSON.stringify(data));
        var that = this;
        data = data || '{}';
        let arr = [];
        for (var key in data) {
          arr.push(key)
        }
        arr.sort();
        let str = '{';
        for (var i in arr) {
          str += '"' + arr[i] + '":"' + data[arr[i]] + '",'
        }
        str = str.substr(0, str.length - 1)
        str += '}'
        that.formdata = eval('(' + str + ')');
        console.log('json处理后：' + str);
      },
      saveImdcDesign(optionsdata) {
        var that = this
        that.$layer.loading({
          shade: true
        })
        saveImdcDesign(optionsdata).then((response) => {
          console.log(response)
          that.$layer.closeAll()
          if (response.status == 0) {
            that.$message({
              message: '保存成功',
              type: 'success',
              offset: 250,
              duration: 1500
            })
			sessionStorage.setItem('id', that.solutionId)
			sessionStorage.setItem('modify', true)
            that.$router.push({
							path: '/solution/complete',
							query: {
							id: that.solutionId,
							modify: true
							}
						})
				
          } else {
            that.$message({
              message: '保存失败',
              type: 'warning',
              offset: 200,
              duration: 1500
            })
          }
        })
      },
      checkSubmit: function() {
        var that = this
        var msg
        if (!that.formdata['A01T1']) {
          msg = '产品类型不能为空'
        } else if (!that.formdata['A01T2']) {
          msg = 'IT负载不能为空'
        } else if (!that.formdata['A02T1']) {
          msg = 'UPS类型不能为空'
        } else if (!that.formdata['A02T2']) {
          msg = 'UPS容量不能为空'
        } else if (!that.formdata['A02T3']) {
          msg = '电池包数量不能为空'
        } else if (!that.formdata['A03T1']) {
          msg = '机柜高度不能为空'
        } else if (!that.formdata['A03T2']) {
          msg = '机柜数量不能为空'
        } else if (!that.formdata['A04T1'] && that.formdata['A01T1'] == '2') {
          msg = '空调制冷量不能为空'
        } else if (!that.formdata['A04T2'] && that.formdata['A01T1'] == '2') {
          msg = '空调类型不能为空'
        } else if (!that.formdata['A04T3'] && that.formdata['A01T1'] == '2') {
          msg = '走管方式不能为空'
        } else if (!that.formdata['A05T1']) {
          msg = 'rPDU接口类型不能为空'
        } else if (!that.formdata['A05T2']) {
          msg = '每个机柜rPDU数量不能为空'
        }
        if (msg) {
          that.$layer.msg(msg)
          return false
        } else {
          return true
        }
      },
      designPic() {
        var that = this
        console.log('设计图')
        that.table.tablerackLen = 0
        that.table.tablerackNum = 0
        that.table.color1len = 0
        that.table.color2len = 0
        that.table.color3len = 0
        that.table.color4len = 0
        if (that.formdata['A01T1'] == 1) {
          that.noCoolingPic()
        }
        if (that.formdata['A01T1'] == 2) {
          that.coolingPic()
        }
      },
      noCoolingPic() {
        var that = this
        that.table.tablerackNum = that.formdata['A03T2'] // 机柜数量
        if (that.formdata['A03T1'] == 1) {
          that.table.tablerackLen = 24 // 机柜高度
        } else if (that.formdata['A03T1'] == 2) {
          that.table.tablerackLen = 42 // 机柜高度
        }
        if (that.formdata['A02T2'] == 1 || that.formdata['A02T2'] == 2) {
          that.table.color1len = 3 // PDU
        }
        if (that.formdata['A02T1'] == 1 && (that.formdata['A02T2'] == 1 || that.formdata['A02T2'] == 2)) {
          that.table.color2len = 2 // UPS 2
        }
        if (that.formdata['A02T1'] == 2 && (that.formdata['A02T2'] == 1 || that.formdata['A02T2'] == 2)) {
          that.table.color2len = 3 // UPS 3
        }
        if (that.formdata['A02T1'] == 1 && (that.formdata['A02T2'] == 1 || that.formdata['A02T2'] == 2 || that.formdata[
            'A02T2'] == 3)) {
          that.table.color3len = 2 * parseInt(that.formdata['A02T3']) // BAT 2
        }
        if (that.formdata['A02T1'] == 2 && (that.formdata['A02T2'] == 1 || that.formdata['A02T2'] == 2)) {
          that.table.color3len = 3 * parseInt(that.formdata['A02T3']) // BAT 3
        }
        that.tablesub()
      },
      coolingPic() {
        var that = this
        that.table.tablerackNum = that.formdata['A03T2'] // 机柜数量
        that.table.tablerackLen = 42 // 机柜高度
        that.table.color4len = 5 // 空调
        if (that.formdata['A02T2'] == 2) {
          that.table.color1len = 3 // PDU
        } else if (that.formdata['A02T2'] == 3) {
          that.table.color1len = 6 // PDU
        }
        if (that.formdata['A02T1'] == 1 && (that.formdata['A02T2'] == 2 || that.formdata['A02T2'] == 3)) {
          that.table.color2len = 2 // UPS 2
        }
        if (that.formdata['A02T1'] == 1 && (that.formdata['A02T2'] == 2 || that.formdata['A02T2'] == 3)) {
          that.table.color3len = 2 * parseInt(that.formdata['A02T3']) // BAT 2
        }
        that.tablesub()
      },
      showIMDCc(){
        this.showIMDCClass = 'false'
      },
      showIMDC() {
        this.showIMDCClass = 'true'
        // this.$layer.iframe({
        //   content: {
        //     content: imdcLay, // 传递的组件对象
        //     parent: this, // 当前的vue对象
        //     data: {
        //       solutionId: this.solutionId,
        //       productModel: this.productModel,
        //       table: this.table
        //     } // props
        //   },
        //   area: ['800px', '600px'],
        //   title: '配置图',
        //   cancel: () => { // 关闭事件
        //     // that.$layer.msg("关闭事件");
        //   }
        // })
      },
	  qskuTypeList(){
		  var that = this;
		  that.qskuType.Mini = [];
		  that.qskuType.One = [];
		  that.qskuType.ROW = [];
		  that.qskuType.POD = [];
		  qskuTypeList().then((response)=>{
			  console.log('QSKU列表',response)
			  if(response.code ==0){
				  for(let i in response.data){
					  switch(response.data[i].type){
						  case 'Mini':
						  that.qskuType.Mini.push(response.data[i]);
						  break;
						  case 'One':
						  that.qskuType.One.push(response.data[i]);
						  break;
						  case 'ROW':
						  that.qskuType.ROW.push(response.data[i]);
						  break;
						  case 'POD':
						  that.qskuType.POD.push(response.data[i]);
						  break;
					  }
				  }
				  console.log('qskuType:'+JSON.stringify(that.qskuType));
			  }
		  })
	  },
	  chooseQskuType(code,e){
		 const that = this;
			 if(code == 'Mini'){
				 that.One = '';
			 }else if(code == 'One'){
				 that.Mini = '';
			 }
		  console.log('code---->' +code +'--e--'+ e)
		  that.formdata = eval('(' + e + ')');
		  that.designPic()
		  that.getImdcList()

		  for(var key in that.formdata){
		   console.log('开始验证：'+key+'/'+that.formdata[key]);
		   that.checkOptions(key, that.formdata[key],false);
		  }
	  },
		submitCheck() {
			var that = this
			let submit = ''
			let msg = '您确认要提交此方案吗？'

			if (that.checkSubmit()) {
			  this.$confirm(msg, '提示', {
				  distinguishCancelAndClose: true,
				  confirmButtonText: '确认',
				  cancelButtonText: '暂不提交',
				  closeOnClickModal: false
				})
				.then(() => {
					  //that.jsonSort(that.formdata);
				  submit = that.formdata
					  that.jsonSort(submit)
				  submit['selOptions'] = JSON.stringify(submit).replace(/\s/g, '')
				  submit['solutionId'] = that.solutionId
				  submit['productModel'] = that.productModel
				  submit['sku'] = that.qsku
				  submit['serviceOptions'] = JSON.stringify(that.service).replace(/\s/g, '')
					for (var obj in that.service) {
						submit[obj] = that.service[obj];
					}
				  console.log('option:' + JSON.stringify(submit))
				 // that.saveImdcDesign(submit)
				 that.$layer.loading({
				   shade: true
				 })
				 saveImdcDesign(submit).then((response) => {
				   console.log(response)
				   that.$layer.closeAll()
				   if (response.status == 0) {
				      //弹出审核确认框
				      that.$layer.iframe({
				        content: {
				          content: checkTips, // 传递的组件对象
				          parent: that, // 当前的vue对象
				          data: {
				            solutionId: that.solutionId,
							productModel:'A01T4B1',
							parentPage:'imdc'
				          } // props
				        },
				        shade: true,
				        shadeClose: false,
				        area: ['500px', '400px'],
				        title: '提交审核',
				        cancel: () => { // 关闭事件
				        }
				      })
				   } else {
				     that.$message({
				       message: '提交失败',
				       type: 'warning',
				       offset: 200,
				       duration: 1500
				     })
				   }
				 })
				  delete submit['selOptions']
				  delete submit['solutionId']
				  delete submit['productModel']
				  delete submit['sku']
				  delete submit['serviceOptions']
				})
				.catch(action => {})
			}
		},
		getServiceList(){
			var that = this;
			that.service['cooling'] = that.formdata['A01T1']
			console.log('服务选项：'+JSON.stringify(that.service));
			that.getImdcList();
		}
    }
  }
  // 草稿  提交
  // 等待审核  通过  不通过
  // 类型  下一个页面带做的
</script>

<style>
  .el-icon-arrow-right:before,
  .el-icon-arrow-right::before {
    content: "\e6e0" !important;
  }
</style>
