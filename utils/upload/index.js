import {
	uploadAliyun
} from './uploadAliyun.js'

//  获取文件后缀
export const getFilExtension =(fileName)=>{
	console.log(fileName)
	return  fileName.substring(fileName.lastIndexOf('.')+1);
}
export default function uploadImgOss(options) {
	return new Promise((resolve, reject) => {
		uploadAliyun({
			...options,
			success: (res) => {
				console.log("htpp----", res)
				resolve(res)
			},
			fail: (err) => {
				console.log("htpp----", err)
				reject(err)
			},
		})

	})
}



export const chooseUploadImgOss = (count = 9) => {
	const uploadUrl = []
	return new Promise((resolve, reject) => {
	uni.chooseImage({
		count,
		success: async function(res) {
			// uploadUrl.push(res.tempFilePaths)
			
			uni.showLoading({
				title: "上传中"
			})
			for (let i = 0; i < res.tempFilePaths.length; i++) {
				const {data,result} = await uploadImgOss({
					filePath: res.tempFiles[i].path,
					dir: "APP/img/",
					type:"."+getFilExtension(res.tempFiles[i].path),
				})
				
				if(result){
					uploadUrl.push(data);
				}else{
					uni.hideLoading()
					reject ({
						result:false,
						data:{}
					})
				}
			}
			uni.hideLoading()
			resolve({
				data:uploadUrl,
				result:true
			});
		}
	})
   })

}
export const uploadTemporaryUrlOss = (imgurl) => {
	return new Promise(async (resolve,reject) =>{
		uni.showLoading({
			title: "上传中"
		})
		
		const {
			data,
			result
		} = await uploadImgOss({
			filePath: imgurl,
			dir: "APP/img/avater/",
			
		})
		
		if (result) {
			uni.hideLoading()
			resolve({
				data: data.imgUrl,
				result: true
			});
		} else {
			uni.hideLoading()
			reject({
				result: false,
				data: ""
			})
		}
	})
}
