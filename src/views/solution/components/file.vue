<template>
  <el-container class="" style="width: 80%;margin-left: auto;margin-right: auto;margoin-top:20px">

    <el-table class="detail-tab1 none-header"  :data="files" tooltip-effect="dark" style="width: 94%;margin-left: 3%;margin-right: 3%;">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column label="文件">
        <template slot-scope="scope">
        <img src="@/assets/img/ico-pdf.png" style="position: relative;top: 7px;margin-right: 5px;">{{ scope.row.fileName }}
        </template>
      </el-table-column>
      <el-table-column label="下载" width="50">
        <template slot-scope="scope" >
          <a target="_blank" :href="scope.row.fileUrl + scope.row.fileName" :download="scope.row.fileName"><img  src="@/assets/img/ico-down.png" style="height:18px ;"></a>
        </template>
      </el-table-column>
    </el-table>

  </el-container>

</template>

<style>
  body {
    background-color: #F5F5F5;
  }
  .none-header .has-gutter{
    display: none;
  }
  .gray .el-input.dised .el-input__inner{
    color:#ccc
  }
  #app {
    min-width: 1300px;
  }

  .demo-ruleForm {
    border: 1px solid #EBEEF5;
    background-color: #fff;
    padding: 20px 30px 10px;
  }

  .el-input.dised .el-input__inner {
    color: #333;
    border: 0;
    background-color: #fff;
  }

  .el-form-item__label {
    /* text-align: left; */
  }

  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
  .el-form-item__error {
    color: #6bc966;
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus {
    border-color: #6bc966;
  }
  .adds.el-form-item--mini.el-form-item, .adds .el-form-item--small.el-form-item {
      margin-bottom: 22px !important;
  }
</style>

<script>
import { getToken } from '@/utils/auth'
import {
  queryFileurl, downloadFile
} from '@/api/movie'
  // quaryMemberlist
export default {
  name: 'File',
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
      files: [],
      fileIds: [],
      fileNames: [],
      ftype: '',
      url: '',
      showBtn: false
    }
  },
  mounted: function() {
    console.log(this.$parent)
    var that = this
  },
  created() {
    var that = this
    console.log(1111)
    console.log(that.$props.lydata.productModel)
    that.ftype = that.$props.lydata.ftype
    that.queryFileurl(that.$props.lydata.productModel)
  },
  methods: {
    queryFileurl(type) {
      var that = this
      var index = that.$layer.loading({ content: 'loading' })
      queryFileurl('type=' + type).then((response) => {
        that.$layer.close(index)
        console.log(response)
        if (response.code == 0 && response.data) {
					var list = [];
						for(var i in response.data){
							if (that.ftype == response.data[i].fileType){
								 list.push(response.data[i]);
							}
						}
					that.files = list;
          that.showBtn = true;
        }
      })
    },
    changeValue() {
      var that = this
       //that.url = 'https://cct-test.schneider-electric.cn/cct/product/snd-profile/uploadFile?fileIds='+that.fileIds+'&token='+getToken()
      that.url = process.env.VUE_APP_BASE_API+'/cct/product/snd-profile/uploadFile?fileIds='+that.fileIds+'&token='+getToken()
    },
    download() {
      var that = this
      if (that.fileIds.length > 0) {
        that.$layer.loading({ content: '请等待' })
        var btn = document.createElement('a')
        btn.setAttribute('href', that.url)
        btn.click()
        setTimeout(function() {
          that.$layer.closeAll()
        }, 3000)
      } else {
        that.$message({
          message: '请选择要下载的文件！',
          type: 'warning',
          offset: 200
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
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before, .el-form-item__error{color:#F33}
</style>
