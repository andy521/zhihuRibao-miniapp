const requests=require('../../requests/request.js')
const utils=require('../../utils/util.js')

Page({
	data:{
		id: null,
	    pageShow: 'display',
	    background: '',
	    pageData: [], //列表数据源
	    editorData: [], //主编数据
	    description: '',
	    loading: false,
	    loadingMsg: '数据加载中...'
	},

	//接受主页传递过来的主题日报id
	onLoad(options){
		this.setData({id:options.themeId})
	},

	//获取主题日报列表
	onReady(){
		const _this=this
		this.setData({loading:true})
		requests.getThemeStories(_this.data.id,(data)=>{
			data.background=data.background.replace('pic1','pic4')
			data.background=data.background.replace('pic2','pic4')
			let editorsLen=data.editors.length;
			for(let i=0;i<editorsLen;i++){
				data.editors[i].avatar=data.editors[i].avatar.replace("pic1","pic3");
        		data.editors[i].avatar=data.editors[i].avatar.replace("pic2","pic3");
			}
			data=utils.correctData(data);
			console.log(data);
			_this.setData({
				pageData: data.stories,
		        background: data.background,
		        description: data.description,
		        editorData: data.editors
			})
			wx.setNavigationBarTitle({title: data.name})
		},null,()=>{
			_this.setData({loading:false})
		})
	},

	//跳转到日报详情页
	toDetailPage(e){
		let id=e.currentTarget.dataset.id
		wx.navigateTo({
			url: '../detail/detail?theme=1&id=' + id
		})
	},
	onShow: function() {

	},
	onHide: function() {

	},
	  
	onUnload: function() {

	}
})