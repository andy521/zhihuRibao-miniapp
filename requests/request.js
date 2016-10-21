const util=require('../utils/util.js')
const api=require('./api.js')

const app=getApp()

/**
* 网络请求方法
* @param url {string} 请求url
* @param data {object} 参数
* @param successCallback {function} 成功回调函数
* @param errorCallback {function} 失败回调函数
* @param completeCallback {function} 完成回调函数
* @returns {void}
*/
function requestData(url,data,successCallback,errorCallback,completeCallback){
	if(app.debug){
		console.log('requestData url:'+url)
	}
	wx.request({
		url:url,
		data:data,
		header:{ 'Content-Type': 'application/json' },
		success:function(res){
			if(app.debug){
				console.log('response data: ', res);
			}
			if(res.statusCode==200){
				//如果是200，那么判断收到开发者服务成功返类型是否是一个function
				util.isFunction(successCallback) && successCallback(res.data)
			}else{
				util.isFunction( errorCallback ) && errorCallback()
			}
		},
		fail:function(){
			util.isFunction(errorCallback) && errorCallback()
		},
		complete:function(){
			util.isFunction( completeCallback ) && completeCallback()
		}
	})
}

function getNewsLatest( successCallback, errorCallback, completeCallback ){
	requestData( api.getLatestNews(), {}, successCallback, errorCallback, completeCallback );
}

function getNewsLatest( successCallback, errorCallback, completeCallback ) {
    requestData( api.getLatestNews(), {}, successCallback, errorCallback, completeCallback );
}

function getBeforeNews( date, successCallback, errorCallback, completeCallback ) {
    requestData( api.getBeforeNews( date ), {}, successCallback, errorCallback, completeCallback );
}

function getNewsDetail( newsId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getNewsDetail( newsId ), {}, successCallback, errorCallback, completeCallback );
}

function getTheme( successCallback, errorCallback, completeCallback ) {
    requestData( api.getTheme(), {}, successCallback, errorCallback, completeCallback );
}

function getThemeStories( themeId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getThemeStories( themeId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryShortComments( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryShortComments( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryLongComments( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryLongComments( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryExtraInfo( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryExtraInfo( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getSplashCover( size, successCallback, errorCallback, completeCallback ) {
    requestData( api.getSplashCover( size ), {}, successCallback, errorCallback, completeCallback );
}

module.exports = {
    getNewsLatest: getNewsLatest,
    getBeforeNews: getBeforeNews,
    getNewsDetail: getNewsDetail,
    getTheme: getTheme,
    getStoryExtraInfo: getStoryExtraInfo,
    getThemeStories: getThemeStories,
    getStoryLongComments: getStoryLongComments,
    getStoryShortComments: getStoryShortComments,
    getSplashCover: getSplashCover
};