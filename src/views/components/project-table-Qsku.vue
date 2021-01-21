<template>
  <el-table :data="tableList.filter(f => f.productNum > 0)" show-summary :summary-method="getSummaries" stripe style="width: 100%;">
    <el-table-column :label="'QSKU : '+qsku">
      <el-table-column prop="sku" label="产品型号" width="160" style="text-align: center;">
        <template slot-scope="scope">
          <span v-if="scope.row.ddpPrice > 0 " style="padding-left: 15px;color:grey;font-size:11px;">{{scope.row.sku}}</span>
          <span v-else>{{scope.row.sku}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="" style="text-align: center;">
        <template slot-scope="scope">
          <span v-if="scope.row.ddpPrice > 0 " style="padding-left: 10px;color:grey;font-size:11px;">——{{scope.row.description}}</span>
          <span v-else>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productNum" label="数量" width="80" />
      <el-table-column prop="ddpPrice" label="单价" width="150" style="text-align: center;">
        <template slot-scope="scope">
          <span v-if="scope.row.ddpPrice > 0 ">{{ scope.row.ddpPrice | formatPrice1 }}</span>
          <span v-else style="color:grey">——</span>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'sidebar',
    props: {
      tableList: {
        type: Array,
        required: true
      },
      prices: {
        type: String,
        required: true
      },
			qsku:''
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
		
      }
    },

    created() {},
    methods: {
      getSummaries() {
        var that = this
        const sums = []
        sums[0] = '方案总价'
        sums[3] = '￥' + that.prices + '(CNY)'
        return sums
      },
    }
  }
</script>

<style>
</style>
