const requests=require('../../requests/request.js')

Page({
  data: {
    splash:{}, 
    screenHeight:0,
    screenWidth:0,
    animationData:{}
  },
  onLoad(options){
    const _this = this
    //获取设备信息
    wx.getSystemInfo({
      success:function(res){
        _this.setData({
          screenHeight:res.windowHeight,
          screenWidth:res.windowWidth
        })
      }
    })
  },

  onReady(){
    const _this=this
    const size=_this.data.screenWidth+ '*' + this.data.screenHeight
    requests.getSplashCover(size,(data)=>{
    	_this.setData({splash:data})

      var animation=wx.createAnimation({
        duration:800,
        timingFunction:'ease',
        delay:200
      })
      animation.translateY(-66).step()
      this.setData({
        animationData:animation.export()
      })
    },null,()=>{
    	//call用来将toIndexPage执行的上下文变成_this
    	toIndexPage.call(_this)
    })
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  }
})

/**
* 延迟两秒 跳转到首页
*/
function toIndexPage(){
	setTimeout(function(){
		wx.redirectTo({
			url:'../index/index'
		})
	},2000)
}
