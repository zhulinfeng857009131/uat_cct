<template>
  <div id="" style="min-width: 1300px;margin: 0 50px;">
    <el-row :gutter="20" class="prodocu-list">
      <el-col :span="6" v-for="data in productList" style="margin:15px 0">
        <div class="prodocu-list-item"  @click="openDetail(data.id)" style="cursor: pointer;">
          <img class="pro-img" src="@/assets/img/solutionaddp.png">
          <h3 style="font-size: 14px;">{{data.name}}</h3>
          <div style="position: absolute;left: 0;top: 0;"><img src="@/assets/img/ico-new.png" style="width: 50px;"></div>
          <div style="position: absolute;top: 10px;right: 5px;">
            <img src="@/assets/img/pro-edit.png" style="margin-right: 10px; display: none;">
            <img src="@/assets/img/pro-close.png" style="margin-right: 10px; display: none;">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  body {
    background-color: #F5F5F5;
  }
  .prodocu-list .prodocu-list-item{
    border: 1px solid #cdcdcd;
    text-align: center;
    padding-bottom: 15px;
    position: relative;
    background-color: #fff;
  }
  .prodocu-list h3{
    color: #6bc966;
    font-weight: 600;
  }
  .prodocu-list img.pro-img{
    height: 200px;
    display: block;
    margin: 10px auto 20px;
  }
</style>
<script>
export default {
  name: 'product',
  data() {
    return {
      productList:[]
    }
  },
  mounted: function() {
    var that = this;
    that.productList = [
      {name:'Galaxy PX',id:10},
      {name:'Galaxy PW 2nd Gen',id:2},
      {name:'EcoStruxure IT Expert',id:4},
      {name:'IMDC',id:5},
      {name:'Easy cooling',id:6},
      {name:'Galaxy 3L',id:1},
    ]
  },
  created() {
  },
  methods: {

      openDetail(id){
        if(id == 1){
            this.$alert('敬请期待','提示')
            // this.$message({
            //   message: '敬请期待',
            //   type: 'success'
            // })
        }else if(id == 2){
          this.$router.push({
            path: '/product/detailGalaxyPW',
            query: {
              id: 123
            }
          })
        }else if(id == 10){
          this.$router.push({
            path: '/product/detailGalaxy',
            query: {
              id: 12312
            }
          })
        }else if(id == 4){
          this.$router.push({
            path: '/product/detailITE',
            query: {
              id: 123
            }
          })
        }else if(id == 5){
          this.$router.push({
            path: '/product/detail',
            query: {
              id: 123
            }
          })
        }else if(id == 6){
          this.$router.push({
            path: '/product/detailEasy',
            query: {
              id: 123
            }
          })
        }else{
          this.$router.push({
            path: '/product/detail',
            query: {
              id: 123
            }
          })
        }
      },
  }
}
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
</style>
