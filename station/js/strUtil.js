
// var fun_aes = require('../../utils/libs/aes.js') 
var key = CryptoJS.enc.Utf8.parse("YiDongHeDuiJiang"); 
var iv = CryptoJS.enc.Utf8.parse('4561237967814523'); 

function getAES(str) { 
    var srcs = CryptoJS.enc.Utf8.parse(str); 
    var encrypted = CryptoJS.AES.encrypt(srcs,key, 
    { 
        iv: iv, 
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7
    }
    );
   var hexStr = encrypted.ciphertext.toString().toUpperCase(); 
   console.log('hexStr->' + hexStr); 
   var oldHexStr = CryptoJS.enc.Hex.parse(hexStr); 
   var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr); 
   //这里根据需求返回 base64Str 或 hexStr(解密时有小小差别) 
   return base64Str; 
}

function getDAes(str) { 
     //如果加密返回的base64Str 
     var srcs = str; 
     //若上面加密返回的hexStr,需打开下面两行注释，再次处理 
     // var encryptedHexStr = CryptoJS.enc.Hex.parse(word); 
     // var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); 
     var decrypt = CryptoJS.AES.decrypt(srcs,key,
        { 
            iv: iv, 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.Pkcs7 
        }); 
     var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
     var value = decryptedStr.toString(); 
     return value; 
 }





