<template>
  <div id="showIMDC" >
    <div style="font-weight: bold;height: 50px;line-height: 50px;margin-bottom: 20px;padding-left:20px;background-color:#f4f4f4;">
             操作提示
             rack数量<input v-model="table.tablerackNum">
             机柜高度<input v-model="table.tablerackLen">
             F33len<input v-model="table.color1len">
             greenlen<input v-model="table.color2len">
             bluelen<input v-model="table.color3len">
             color4len<input v-model="table.color4len">
             <input type="button" @click="tablesub()" value="查询">
           </div>
    <div class="cl" style="height: auto;width:1120px;margin:20px auto;background-color: #f4f4f4;text-align: center; vertical-align: middle;">
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
              <template v-if="table.rdpNum > 0">
                <td :rowspan="table.tablerack1.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
              <td :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
              <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

              <template v-if="table.rdpNum > 1">
                <td :rowspan="table.tablerack1.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
            </tr>
          </table>
          <table style="width: 22%;text-align: center;position: absolute;left: 40%;top: 0;" :style="'width:'+table.width +'px'">
            <tr v-for="(data,index) in table.tablerack2">
              <template v-if="table.rdpNum > 0">
                <td :rowspan="table.tablerack2.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;height: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
              <td :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
              <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

              <template v-if="table.rdpNum > 1">
                <td :rowspan="table.tablerack2.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
            </tr>
          </table>
          <table style="width: 22%;text-align: center;position: absolute;left: 70%;top: 0;" :style="'width:'+table.width +'px'">

            <tr v-for="(data,index) in table.tablerack3">
              <template v-if="table.rdpNum > 0">
                <td :rowspan="table.tablerack3.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
              <td :style="{'background-color':data.gbcolor,height:data.row +'px'}">{{data.val}}</td>
              <!-- <td :style="'background-color:'+data.gbcolor;'height:'+ data.row +'px'">{{data.val}}</td> -->

              <template v-if="table.rdpNum > 1">
                <td :rowspan="table.tablerack3.length" v-if="index == 0" style="width: 3px;padding: 0 0 3px;background-color: #9fa0a4;width: 21px;line-height: 21px;writing-mode: tb-rl;border: 1px solid #fff;color:#fff">
                  <p>rPDU</p>
                </td>
              </template>
            </tr>

          </table>
        </div>
      </div>
    </div>
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
      }
    },
    data() {
      return {
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
          rdpNum: 0,
          width: '176'
        },
      }
    },

    created() {
    },
    methods: {

      tablesub() {
        let that = this;
        let len = 41;
        len = that.table.tablerackLen
        const len1 = that.table.color1len
        const len2 = that.table.color2len
        const len3 = that.table.color3len
        const len4 = that.table.color4len
        // that.table.rdpNum = that.formdata['A05T2'];
        that.table.rdpNum = 5;
        if (len == 42) {
          that.table.width = '200'
        } else {
          that.table.width = '160'
        }
        that.table.tabletitle.length = 0
        for (let i = --len, j = 0; i >= 0; i--, j++) {
          that.table.tabletitle[j] = (i + 1) + 'u';
        }
        if (Number(that.table.color1len) > 1) {
          len = len - Number(that.table.color1len) + 1
        }
        if (Number(that.table.color2len) > 1) {
          len = len - Number(that.table.color2len) + 1
        }
        if (Number(that.table.color3len) > 1) {
          len = len - Number(that.table.color3len) + 1
        }
        if (Number(that.table.color4len) > 1) {
          len = len - Number(that.table.color4len) + 1
        }
        let num = that.table.tablerackNum
        that.table.tablerack3.length = that.table.tablerack2.length = that.table.tablerack1.length = 0
        switch (num) {
          case '3':
            that.tableFun(that.table.tablerack3, (that.table.tablerackLen - 1));
            that.tableSize(that.table.tablerack3, 0, 0, 0, 0)
          case '2':
            // if (that.formdata['A04T1'] == 2) {
            //   that.tableFun(that.table.tablerack2, (that.table.tablerackLen - len4));
            //   that.tableSize(that.table.tablerack2, 0, 0, 0, len4)
            // } else {
            //   that.tableFun(that.table.tablerack2, (that.table.tablerackLen - 1));
            //   that.tableSize(that.table.tablerack2, 0, 0, 0, 0)
            // }
            
              that.tableFun(that.table.tablerack2, (that.table.tablerackLen - len4));
              that.tableSize(that.table.tablerack2, 0, 0, 0, len4)
          case '1':
            that.tableFun(that.table.tablerack1, len);
            that.tableSize(that.table.tablerack1, len1, len2, len3, len4)
          default:
        }
        console.log('that.table.tablerack1', that.table.tablerack1)
      },
      tableSize(arr, len1, len2, len3, len4) {
        const that = this
        if (len4 <= 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].val != 'NaN1') {
              if (len1 > 0) {
                arr[i].row = Number(len1) * 16
                arr[i].val = 'PDU'
                arr[i].gbcolor = '#00b050'
                len1 = 0
              } else if (len2 > 0) {
                arr[i].row = Number(len2) * 16
                arr[i].val = 'UPS'
                arr[i].gbcolor = '#00b0f0'
                len2 = 0
              } else if (len3 > 0) {
                arr[i].row = Number(len3) * 16
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
                arr[i].row = Number(len1) * 16
                arr[i].val = 'PDU'
                arr[i].gbcolor = '#00b050'
                len1 = 0
              } else if (len2 > 0) {
                arr[i].row = Number(len2) * 16
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
                arr[i].row = Number(len4) * 16
                arr[i].val = 'Cooling'
                arr[i].gbcolor = '#7030a0'
                len4 = 0
              } else if (len3 > 0) {
                arr[i].row = Number(len3) * 16
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

      tableFun(arr, len) {
        arr.length = 0;
        let that = this;
        for (let i = len; i >= 0; i--) {
          arr[i] = {}
          //arr[i].val = i + 1;
          arr[i].val = '';
          arr[i].gbcolor = '';
          arr[i].row = 16;
        }
        console.log('that.table.tablerack1----', that.table.tablerack1)
        arr.reverse()
      },

    }
  }
</script>

<style>


  .ul-list li {
    margin: 10px 0 10px 10px;
    text-align: left;
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
</style>
