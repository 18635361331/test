export default {
    transformNnix(time){    //转为unix时间戳
        return new Date(time).getTime()
    },
    transformDate(time){    //unix转为标准时间
        let unixtime = time;
        let unixTimestamp = new Date(unixtime);
        let Y = unixTimestamp.getFullYear(),
        M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1)),
        D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate()),
        h = (unixTimestamp.getHours()<10) ? "0"+unixTimestamp.getHours() : unixTimestamp.getHours(),
        min = (unixTimestamp.getMinutes()<10) ? "0"+unixTimestamp.getMinutes() : unixTimestamp.getMinutes(),
        s = (unixTimestamp.getSeconds()<10) ? "0"+unixTimestamp.getSeconds() : unixTimestamp.getSeconds();
        let toDay = Y + '-' + M + '-' + D+ " " +h + ":" +min + ":" +s;
        return toDay;
    },
    formatDate(date, fmt) { //yyyy-MM-dd hh:mm
        date = (typeof date)=="object"?date:new Date(date) 
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    },
	/**
	     * 身份证格式验证
	     * @param code string 身份证号码
	     */
	IdentityCodeValid(code){
		let _this = this;
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		var tip = "";
		var pass= true;

		if(!code || !/^\d{17}(\d|x)$/i.test(code)){
			tip = "身份证号格式错误";
			pass = false;
		}

		else if(!city[code.substr(0,2)]){
			tip = "地址编码错误";
			pass = false;
		}
		else{
			//18位身份证需要验证最后一位校验位
			if(code.length == 18){
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				//校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++)
				{
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if(parity[sum % 11] != code[17]){
					tip = "校验位错误";
					pass =false;
				}
			}
		}
	   // if(!pass){_this.notice(tip);}
		return pass;
	},
	hintMsg(msg){
		uni.showToast({
			title: msg,
			icon: "none"
		})
	},
	getDHours(time){
		if(!time){
			return ''
		}
		let last = new Date(new Date(new Date(time).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
		let now = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
		return  parseInt((last - now) / 1000 / 60 / 60 / 24 , 10)
		
	}
}