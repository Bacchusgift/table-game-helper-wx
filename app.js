//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
            wx.request({
            url: this.api+'/user/wxlogin',
            data:{
              "js_code":res.code
            },
            success: res =>{
              console.log(res)
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid,
              })
              const openid = wx.getStorageSync("openid")
              if(openid){
                this.globalData.openid = openid
              }
              this.globalData.openid = res.data.data.openid
              wx.setStorage({
                key: 'userkey',
                data: res.data.data.userkey,
              })
            }
          })
          
        } 
      },
      fail:res =>{
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("globalData.userInfo:")
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('没有授权')
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:""
  },
  // api: "http://192.168.11.112:10085",
  // wsapi:"ws://192.168.11.112:10085/websocket/"
  api: "http://192.168.0.105:10085",
  wsapi:"ws://192.168.0.105:10085/websocket/"
})