<template>
  <el-table :data="tableList.filter(f => f.productNum > 0)" show-summary :summary-method="getSummaries" style="width: 100%;">
    <el-table-column prop="sku" label="产品型号" width="160" style="text-align: center;" />
    <el-table-column prop="description" label="描述" width="" style="text-align: center;" />
    <el-table-column prop="productNum" label="数量" width="80" />
    <el-table-column prop="ddpPrice" label="单价" width="150" style="text-align: center;">
      <template slot-scope="scope">
        {{ scope.row.ddpPrice | formatPrice1 }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      tableList: {
        type: Array,
        required: true
      },
      prices: {
        type: String,
        required: true
      },
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
