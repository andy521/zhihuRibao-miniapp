Page({
	data:{
		checkboxStyleFirst:'nochecked',
		checkboxStyleSecond:'nochecked',
		checkboxStyleThird:'nochecked',
		checkboxStyleFourth:'nochecked',
		checkboxStyleFifth:'nochecked',
		checkboxStyleTheme:'nochecked',
		theme:'light',
		setting:{}
	},
	onLoad(options){
		// 页面初始化 options为页面跳转所带来的参数
	},
	onReady(){

	},
	checkboxEvent(e){
		console.log('e:');
		console.log(e);
		const currentcheck=e.target.dataset.id;
		console.log(currentcheck);
		//毫无疑问，以下的写法很渣，然而我暂时是在想不出别的写法了
		if(e.currentTarget.id==='nochecked'){
			console.log(e.currentTarget.id);
			if(currentcheck==='first')
				this.setData({checkboxStyleFirst:'haschecked'})
			else if(currentcheck==='second')
				this.setData({checkboxStyleSecond:'haschecked'})
			else if(currentcheck==='third')
				this.setData({checkboxStyleThird:'haschecked'})
			else if(currentcheck==='fourth')
				this.setData({checkboxStyleFourth:'haschecked'})
			else if(currentcheck==='nightTheme'){
				this.setData({checkboxStyleTheme:'haschecked'})
			}
			else
				this.setData({checkboxStyleFifth:'haschecked'})
		}
		else if(e.currentTarget.id==='haschecked'){
			if(currentcheck==='first')
				this.setData({checkboxStyleFirst:'nochecked'})
			else if(currentcheck==='second')
				this.setData({checkboxStyleSecond:'nochecked'})
			else if(currentcheck==='third')
				this.setData({checkboxStyleThird:'nochecked'})
			else if(currentcheck==='fourth')
				this.setData({checkboxStyleFourth:'nochecked'})
			else if(currentcheck==='nightTheme')
				this.setData({checkboxStyleTheme:'nochecked'})
			else
				this.setData({checkboxStyleFifth:'nochecked'})
		}
	},
	onShow(){

	},
	onHide(){

	},
	onUnload(){

	}
})