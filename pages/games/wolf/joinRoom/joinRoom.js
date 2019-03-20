// pages/games/wolf/joinRoom/joinRoom.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {
    },
    roomId:'',
    openId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        userInfo: app.globalData.userInfo,
        openid: wx.getStorageSync('openid') 
    })
  },
  joinRoom:function(e){
    console.log(this.data.roomId)
      wx.request({
        url: app.api +'/room/joinRoom/'+ this.data.roomId+"?openId="+this.data.openid,
        method:'GET',
        success: res=>{
            console.log("加入房间成功")
            console.log(res)
            wx.navigateTo({
              url: '../waitJoin/waitJoin?roomId=' + this.data.roomId + '&roomSize=' + this.data.roomSize,
            })
        }
      })
  },
  setRoomId:function(e){
    console.log(e.detail.value)
      this.setData({
         roomId:e.detail.value
      })
     
  }
})