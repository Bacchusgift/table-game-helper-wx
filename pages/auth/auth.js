//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '享受朋友在一起的时光吧 !',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadModal:false,
    openSettingBtn:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail:res=>{
          console.log("getUserInfo fail res:"+ res)
        }
      })
    }
  },
  start:function(){
    
  },
  getUserInfo: function(e) {
    console.log("auth页面 - userInfo :")
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      const openid = wx.getStorageSync("openid")
      if(openid){
        wx.request({
          url: app.api + '/user/setUserInfo/' + openid,
          method: "post",
          data: e.detail.userInfo,
          success: res => {
            console.log(res)
          }
        })
      } else {

      }
      // 存入userinfo到后端
      clearTimeout(timeout)
      this.setData({
        loadModal: true
      })
      var timeout = setTimeout(() => {
        this.setData({
          loadModal: false
        })
        wx.redirectTo({
          url: '../games/games',
        })
      }, 2000)
    }else{
      //强制用户设置授权
      this.setData({
        openSettingBtn:true
      })
    } 
    
  },
  openSetting:function(e){
    
    wx.openSetting({
      success: res=> {
        console.log(res.authSetting)
        wx.getUserInfo({
          success: res => {
            this.setData({
              openSettingBtn: false,
              hasUserInfo: true,
              userInfo: res.userInfo
            })           
          }
        })
       
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})
