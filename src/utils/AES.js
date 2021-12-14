import CryptoJS  from '@/static/crypto-js.min.js';
export default {
	/** * AES加密
	 * @param {Object} word 待加密的数据
	 * @param {Object} "abcdefghijesgjss"    密钥
	 */
	encrypt:(word)=>{
	　　let key = CryptoJS.enc.Utf8.parse("abcdefghijesgjss")
	　　let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word))
	　　let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
	　　return encrypted.toString();
		return word
	},
	/** * AES解密
	 * @param {Object} word 待解密的数据
	 * @param {Object} "abcdefghijesgjss"    密钥
	 */
	decrypt:(word)=>{
		let key = CryptoJS.enc.Utf8.parse("abcdefghijesgjss")
		let encryptedHexStr = CryptoJS.enc.Utf8.parse(word);
		let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		let decrypt = CryptoJS.AES.decrypt(word, key, {
			 mode: CryptoJS.mode.ECB,
			 padding: CryptoJS.pad.Pkcs7
		 });
		 let testDecryptStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
		 return testDecryptStr
		 return word
	}
}
