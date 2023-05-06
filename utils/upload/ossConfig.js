var fileHost="https://help.aliyun.com"
var ossConfig = {
  //aliyun OSS config
  uploadImageUrl: `https://wx-api-service.oss-cn-hangzhou.aliyuncs.com`, //默认存在根目录，可根据需求改
  AccessKeySecret: '4b7Tss3IokqPIxolQJX3EdVB1ttkLa',
  OSSAccessKeyId: 'LTAI5tRzVsAJsC3uy9NBiyGv',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
export {
	ossConfig
}
