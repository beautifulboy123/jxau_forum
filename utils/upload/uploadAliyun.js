import {ossConfig } from './ossConfig.js';

const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

const uploadAliyun = function (options) {
    if (!options.filePath || options.filePath.length < 9) {
        wx.showModal({
            title: '图片错误',
            content: '请重试',
            showCancel: false,s
        })
        return;
    }

    //阿里云指定文件夹
    //   const aliyunFileKey = options.dir （"APP/"） + options.filePath.replace('wxfile://', '');
	console.log(options.type)
	let type = options.type || ".jpg"
    const aliyunFileKey = options.dir + new Date().getTime() + Math.floor(Math.random() * 150)+type;

    const aliyunServerURL = ossConfig.uploadImageUrl;
    const accessid = ossConfig.OSSAccessKeyId;
    const policyBase64 = getPolicyBase64();
    const signature = getSignature(policyBase64);

    // console.log('aliyunServerURL', aliyunServerURL);
    wx.uploadFile({
        url: aliyunServerURL,
        filePath: options.filePath,
        name: 'file',
        formData: {
            'key': aliyunFileKey,
            'policy': policyBase64,
            'OSSAccessKeyId': accessid,
            'signature': signature,
            'success_action_status': '200',
        },
        success: function (res) {
            if (res.statusCode != 200) {
                if (options.fail) {
                    options.fail({
					result:false,
					date:res
				})
                }
                return;
            }
            if (options.success) {
                options.success({
					result:true,
					data:{
						url:aliyunFileKey,
						imgUrl:ossConfig.uploadImageUrl+"/"+aliyunFileKey,
						temporaryUrl: options.filePath
					}
				});
            }
        },
        fail: function (err) {
            err.wxaddinfo = aliyunServerURL;
            if (options.fail) {
                options.fail({
					result:false,
					date:err
				})
            }
        },
    })
}

//  获取标识
const getPolicyBase64 = function () {
    let date = new Date();
    date.setHours(date.getHours() + ossConfig.timeout);
	console.log( ossConfig.timeout)
    let srcT = date.toISOString();
    const policyText = {
        "expiration": srcT, //设置该Policy的失效时间
        "conditions": [
            ["content-length-range", 0, 100 * 1024 * 1024] // 设置上传文件的大小限制,100mb
        ]
    };

    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
}

//  获取 签名
const getSignature = function (policyBase64) {
    const accesskey = ossConfig.AccessKeySecret;
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);
    return signature;
};



export{
	uploadAliyun
}
