const requests=require('../../requests/request.js')
const utils=require('../../utils/util.js')

Page({
	data:{
		id:'8857042',//当前日报id
		loading:false,//是否加载中
		isTheme:false,
		news:{},//日报详情
		modalHidden:true,
		extralInfo:{},
		modalMsgHidden:true,
		pageShow:'none'
	},

	//获取列表残过来的参数 id：日报id， theme：是否是主题日报内容（因为主题日报的内容有些需要单独解析）
	onLoad(options){
		const id=options.id
		const isTheme=options['theme']
		this.setData({
			id:id,
			isTheme:isTheme
		})
	},

	//加载日报数据
	onReady(){
		loadData.call(this)
	},

	//跳转到评论页面
	toCommentPage(e){
		const storyId=e.currentTarget.dataset.id
		const longCommentCount=this.data.extralInfo?this.data.extralInfo.long_comments:0    //长评数目
		const shortCommentCount=this.data.extralInfo?this.data.extralInfo.short_comments:0    //短评数目
		
		//跳转到评论页面，并传递评论数目信息
		wx.navigateTo({
			url: '../comment/comment?lcount=' + longCommentCount + '&scount=' + shortCommentCount + '&id=' + storyId
		})
	},

	//现在图片预览不支持调试显示，看不到效果
    //图片预览[当前是当前图片，以后会考虑整篇日报的图片预览]
    previewImgEvent(e){
    	const src=e.currentTarget.dataset.src
    	if(src && src.length>0){
    		wx.previewImage({
    			urls:[src]
    		})
    	}
    },

    //重新加载数量
    reloadEvent(){
    	loadData.call(this)
    },

    showModalEvent(){
    	this.setData({modalHidden:false})
    },

    hideModalEvent(){
    	this.setData({modalHidden:true})
    }
})




function loadData(){
	const _this=this
	const id=this.data.id
	const isTheme=this.data.isTheme

	//获取日报详细内容
	_this.setData({loading:true})
	requests.getNewsDetail(id,(data)=>{
		if('image' in data){
			data.image=data.image.replace("pic1","pic3");
    		data.image=data.image.replace("pic2","pic3");
		}
		console.log('data:'+data);

		data.body=utils.parseStory(data.body,isTheme)
		_this.setData({news:data,pageShow:'block'})
		wx.setNavigationBarTitle({title:data.title})
	},null,()=>{
		_this.setData({loading:false})
	})

	//请求日报额外信息（主要是评论数和推荐人数）
	requests.getStoryExtraInfo(id,(data)=>{
		console.log('extra:'+data)
		_this.setData({extralInfo:data})
	})
}