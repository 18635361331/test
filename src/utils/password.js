export default{
	checkPassword(pwd){	//密码规则
		if(this.isDiffStr(pwd) && /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,20}$/.test(pwd)){
			return true;
		}else{
			return false; 
		}
	},
	isDiffStr(str) {	//密码正则
		return /^([a-zA-Z0-9]|[@#!_~\-\$\*]){0,20}$/.test(str)? true : false
	},
	checkPwdIntensity(pwd){	//密码强度校验
		if(this.checkPassword(pwd)){
			if(pwd.length>=8&&pwd.length<=10){
				if((/[@#!$*_~-]/im.test(pwd))){
					return '2';//中
				}else{
					return '1';//弱
				}
			}
			if(pwd.length>=11&&pwd.length<=13){
				if((/[@#!$*_~-]/im.test(pwd))){
					return '3';//强
				}else{
					return '2';
				}
			}
			if(pwd.length>=14&&pwd.length<=20){
				return '3';
			}
		}else{
			return '0';//不符合密码要求
		}
	}
}