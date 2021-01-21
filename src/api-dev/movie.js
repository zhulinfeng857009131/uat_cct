
import request from '@/utils/request'
import qs from 'qs';

/*
    headers: {
      // 'Access-Control-Allow-Origin': *,
      'Content-Type':'application/x-www-form-urlencoded',
    },
*/


//解决方案概览判断是否需要复制一条新的解决方案
export function isExistSolution(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-solution/isExistSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}

//计算方案总价
export function priceProduct(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-design/priceProduct',
    method: 'post',
    data:qs.stringify(data)
  })
}
//导出配置清单
export function batchExport(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-product/batchExport',
    method: 'post',
    data:qs.stringify(data)
  })
}
//复制解决方案
export function copySolution(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-solution/copySolution',
    method: 'post',
    data:qs.stringify(data)
  })
}
//取消解决方案
export function cancelSolution(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-solution/cancelSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}
//日志
export function selectMylog(data) {
  console.log('data',data)
  return request({
    url: '/api/product/snd-operationlog/selectMylog',
    method: 'post',
    data:qs.stringify(data)
  })
}

//点击修改时更新审核状态
export function updateSolutionStatus(data) {
  return request({
    url: '/api/product/snd-solution/updateSolutionStatus',
    method: 'post',
    data:qs.stringify(data)
  })
}
//审核时判断是否需要验证QSKU
export function judgeQsku(data){
  return request({
    url: '/api/product/snd-solution/judgeQsku',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function querySolutionById(data){
  return request({
    url: '/api/product/snd-solution/querySolutionById',
    method: 'post',
    data:qs.stringify(data)
  })
}
// IMDC筛选项
export function getImdcCode(data){
  return request({
    url: '/api/product/snd-imdccode/getSndImdcCode',
    method: 'get',
    data:qs.stringify(data)
  })
}
//回显IMDC历史记录
export function getImdcChooseHistory(data){
  return request({
    url: '/api/product/snd-design/getIndcChooseHistory',
    method: 'post',
    data:qs.stringify(data)
  })
}
//IMDC列表
export function getImdcList(data){
  return request({
    url: '/api/product/snd-product/getProductImdcList',
    method: 'post',
    data:qs.stringify(data)
  })
}

// IMDC ROW筛选项
export function getImdcRowCode(data){
  return request({
    url: '/api/product/snd-imdccode/getSndImdcRowCode',
    method: 'get',
	data:qs.stringify(data)
  })
}
export function getImdcServiceList(data){
  return request({
    url: '/api/product/snd-imdccode/getService',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function getPxList(data){
  return request({
    url: '/api/product/snd-product/getPxList',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function upms(data) {
  return request({
    url: '/api/upms/captcha.jpg?'+data,
    method: 'get'
  })
}
// merlist
export function merlist(data) {
  return request({
    url: '/api/product/memberlist/merlist',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function quaryoper(data) {
  return request({
    url: '/api/product/memberlist/quaryoper',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function querySndSolution(data) {
  return request({
    url: '/api/product/snd-solution/querySndSolution',
    method: 'post',
    //提交的参数,其中本应该是data:data形式，但是因为request中参数data与该函数参数同名就只用写一个data即可
    data:qs.stringify(data)
  })
}
export function addSndSolution(data) {
  return request({
    url: '/api/product/snd-solution/addSndSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function logining1(data) {
  return request({
    url: '/api/product/snd-solution/addSndSolution',
    method: 'post',
    data
  })
}
// 代理商销售PDP名称下拉
export function quaryMemberlist(data){
  return request({
    url: '/api/product/memberlist/quaryMemberlist',
    method: 'post',
    data:qs.stringify(data)
  })
}
//解决方案提交审核
export function submitCheckSolution(data){
  return request({
    url: '/api/product/snd-solution/checkAndSendEmail',
    method: 'post',
    data:qs.stringify(data)
  })
}

//解决方案审核
export function checkSolution(data){
  return request({
    url: '/api/product/snd-solution/updateStatus',
    method: 'post',
    data:qs.stringify(data)
  })
}
//保存IMDC并提交配置方案
export function addImdcDesign(data){
  return request({
    url: '/api/product/snd-design/addImdcDesign',
    method: 'post',
    data:qs.stringify(data)
  })
}
//保存IMDC配置方案
export function saveImdcDesign(data){
  return request({
    url: '/api/product/snd-design/saveImdcDesign',
    method: 'post',
    data:qs.stringify(data)
  })
}

//gpx保存配置日志记录
export function saveGPX(data){
  return request({
    url: '/api/product/snd-design/saveGPX',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function getProductList(data){
  return request({
    url: '/api/product/snd-product/getProductList',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function sndDesign(data){
  return request({
    url: '/api/product/snd-design/addDesign',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function filterSndSolution(data){
  return request({
    url: '/api/product/snd-solution/filterSndSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}

// export function quaryStatuscode(data){
//   return request({
//     url: '/api/product/snd-statuscode/quaryStatuscode',
//     method: 'get',
//     data:qs.stringify(data)
//   })
// }
export function quaryStatuscode(data){
  return request({
    url: '/api/product/snd-statuscode/quaryStatuscode?'+data,
    method: 'get',
    data
  })
}

export function deleteSndSolution(data){
  return request({
    url: '/api/product/snd-solution/deleteSndSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}

//产品图片、手册、证书
export function queryFileurl(data){
  return request({
    url: '/api/product/snd-profile/queryFileurl?'+data,
    method: 'get',
    data
  })
}

//产品手册、证书下载
export function downloadFile(data){
  return request({
    url: '/api/product/snd-profile/downloadFile?'+data,
    method: 'get',
    data
  })
}

//修改解决方案
export function updateSndSolution(data){
  return request({
    url: '/api/product/snd-solution/updateSndSolution',
    method: 'post',
    data:qs.stringify(data)
  })
}

//获取qskuTypeList
export function qskuTypeList(data){
  return request({
    url: '/api/product/snd-qsku-type/qskuTypeList',
    method: 'post',
    data:qs.stringify(data)
  })
}

/******************************用户管理***************************************************/
// infoUser
//用户修改
export function infoUser(data) {
  console.log('data',data)
  return request({
    url: '/api/oauth/sys/user/infoUser?userId='+data,
    method: 'get',
    data:qs.stringify(data)
  })
}
//用户列表
export function userlist(data) {
  console.log('data',data)
  return request({
    url: '/api/oauth/sys/user/userlist',
    method: 'post',
    data:qs.stringify(data)
  })
}
//启用、禁用
export function  userStatus(data) {
  console.log('data',data)
  return request({
    url: '/api/oauth/sys/user/userStatus',
    method: 'post',
    data:qs.stringify(data)
  })
}

//用户权限
export function roleList(data){
  return request({
    url: '/api/oauth/sys/role/list',
    method: 'get',
    data:qs.stringify(data)
  })
}
// updateRole
//用户权限修改
export function updateRole(data){
  return request({
    url: '/api/oauth/sys/user/updateRole',
    method: 'post',
    data:qs.stringify(data)
  })
}
// /sys/statuscode/queryList
export function queryList(data){
  return request({
    url: '/api/oauth/sys/statuscode/queryList',
    method: 'post',
    data:qs.stringify(data)
  })
}
//用户权限修改 - 审核人区域
export function codeList(data){
  return request({
    url: '/api/oauth/sys/code/codeList',
    method: 'post',
    data:qs.stringify(data)
  })
}

//充值用户名解决中文乱码
export function resetUserName(data){
  return request({
    url: '/api/oauth/user-login/updateUser',
    method: 'post',
    data:qs.stringify(data)
  })
}