<template>
  <div>
    
  </div>
</template>

<script>
import { setToken,getToken,removeToken,setuserName } from '@/utils/auth'
import { validUsername } from '@/utils/validate'
import { upms,resetUserName } from '@/api/movie'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    
    return {
     
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {

  },
  created() {
   
    console.log(2222)
		const hostname = document.location.hostname;
		console.log('hostname:'+hostname);
		
		if(hostname === 'cct-test.schneider-electric.cn' && JSON.stringify(this.getHashParameters()) === '{}'){
		   window.open('https://identity-stg.schneider-electric.com/ui/#!/login?app=ChinaConfiguratorsTool','_self');
			//window.close();
		}
    console.log('hash:' + location.hash)
    console.log('param: ' + JSON.stringify(this.getHashParameters()))

    if (JSON.stringify(this.getHashParameters()) !== '{}') {
		removeToken();
	    setToken(this.getHashParameters().token);
      Cookies.set('setuserName', decodeURIComponent(this.getHashParameters().userName));
	  if(this.getHashParameters().tokenOne !='' && this.getHashParameters().tokenTwo !=''){
		  var inFifteenMinutes = new Date(new Date().getTime() +  59 * 60 * 1000);
		  Cookies.set('tokenOne', this.getHashParameters().tokenOne,{expires:inFifteenMinutes});
		  Cookies.set('tokenTwo', this.getHashParameters().tokenTwo,{expires:inFifteenMinutes});
	  }
	  this.resetUserName(this.getHashParameters().userId,decodeURIComponent(this.getHashParameters().userName));
	  console.log('path:'+this.redirect);
      this.$router.push({ path:  '/' })
	  //this.$router.push({ path: this.redirect || '/' })
    }
  },
  methods: {
    getHashParameters() {
      var params = {}
      console.log((location.hash).indexOf('?token='))
      if ((location.hash).indexOf('?token=') !== -1) {
		  var arr = (location.hash || '').split('?')[1].split('&')
        for (var i = 0; i < arr.length; i++) {
			  var data = arr[i].split('=')
			  if (data.length === 2) {
				params[data[0]] = data[1]
			  }
        }
      }
      return params
    },
	resetUserName(id,name){
		resetUserName({'userId':id,'username':name}).then((response) =>{
			console.log('用户名修改',JSON.Stringify(response));
		})
	}
  }
}
</script>

<style>

</style>
