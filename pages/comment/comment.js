const requests=require('../../requests/request.js')

Page({
	data:{
		storyId:null,
		loading:false,
		toastHidden:true,
		longCommentData:[],
		shortCommentData:null,
		shortCommentCount:0,
		longCommentCount:0,
		loadingMsg:'加载中...',
		toastMsg:''
	},

	//获取传递过来的日报id 和 评论数目
	onLoad(options){
		const storyId=options['id']
		const longCommentCount=parseInt(options['lcount'])
		const shortCommentCount=parseInt(options['scount'])
		this.setData({
			storyId:storyId,
			longCommentCount:longCommentCount,
			shortCommentCount:shortCommentCount
		})
	},

	//加载长评列表
	onReady(){
		const storyId=this.data.storyId
		const _this=this
		this.setData({loading:true,toastHidden:true})

		//如果长评数量大于0，则加载长评，否则加载短评
		if(this.data.longCommentCount>0){
			requests.getStoryLongComments(storyId,(data)=>{
				console.log(data);
				_this.setData({longCommentData:convertDate(data.comments)})
				console.log(convertDate(data.comments));
			},()=>{
				_this.setData({toastHidden:false,toastMsg:'请求失败'})
			},()=>{
				_this.setData({loading:false})
			})
		}else{
			loadShortComments.call(this)
		}
	},

	//加载短评列表
	loadShortCommentEvent(){
		//已经加载过就无需再次加载 判断是否为null
		if(this.data.shortCommentData){
			return;
		}
		loadShortComments.call(this)
	},

	toastChangeEvent(){
		this.setData({toastHidden:true})
	},

	onShow(){
		//页面显示
	},
	onHide(){
		//页面隐藏
	},
	onUnload(){
		//页面关闭
	}
})

/**
* 加载短评列表
*/
function loadShortComments(){
	const storyId=this.data.storyId
	const _this=this
	this.setData({loading:true,toastHidden:true})
	requests.getStoryShortComments(storyId,(data)=>{
		_this.setData({shortCommentData:convertDate(data.comments)})
	},()=>{
		_this.setData({toastHidden:false,toastMsg:'请求失败'})
	},()=>{
		_this.setData({loading:false})
	})
}

function convertDate(comments){
	if(comments){
		const len=comments.length;
		for(let i=0;i<len;i++){
			comments[i]['time']=getDateDesc(comments[i]['time'])
		}
	}
	return comments
}

function getDateDesc(timestamp){
	let date=new Date(timestamp*1000)
	return (date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes()
}