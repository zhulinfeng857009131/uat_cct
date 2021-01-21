<template>
  <el-row class="cct-col-divl" :gutter="20" style="padding: 10px 0;background-color: #a5a9ac;color:#fff;margin :0 1px 20px;border: 1px solid #cfcfcf;">
    <el-col :span="8">
      <div>项目名称：<span>{{ titleData.projectName }}</span></div>
      <div>施耐德电气销售：<span>{{ decodeURIComponent(solutionInfo.realname) }}</span></div>
    </el-col>
    <el-col :span="8">
      <div>Opp ID：<span>{{ solutionInfo.oppID }}</span></div>
      <div>
        方案状态：<span>
          <template v-if="solutionStatus.falg == 0">{{solutionStatus.checkStatus}}</template>
		  <template v-if="solutionStatus.falg == 1">方案取消</template>
          <template v-if="solutionStatus.falg == 5">草稿</template>
          <template v-if="solutionStatus.falg == 9">删除</template></span>
      </div>
    </el-col>
    <el-col :span="8">
      <div>ISX Number：<span>{{ solutionInfo.isxNumber }}</span></div>
      <div>方案总价：<span> ￥{{ prices }}(CNY)</span></div>
    </el-col>
  </el-row>
</template>

<script>
  import {
    isExistSolution
  } from '@/api/movie'
  export default {
    name: 'sidebar',
    props: {
      solutionInfo: {
        type: Object,
        required: true
      },
      solutionStatus: {
        type: Object,
        required: true
      },
      prices: {
        type: String,
        required: true
      },
      titleData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },

    created() {},
    methods: {}
  }
</script>

<style>
</style>
