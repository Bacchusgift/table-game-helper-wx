
// pages/games/wolf/waitJoin/waitJoin.js
var app = getApp()

Page({
  socketOpen : false,
  socketMsgQueue : [],
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    roomId:'',
    userInfo:{},
    playerList:[
      
    ],
    owner:'',
    roomSize:''
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       roomId:options.roomId,
       socketMsgQueue:[],
       roomSize:options.roomSize
     })
     //拉取用户列表(此房间的所有人发起的时候都会拉取一次)
     wx.request({
       url: app.api + '/room/prepareData/'+ this.data.roomId,
       success:res=>{
         console.log(res)
         this.setData({
             playerList: res.data.data
         })
         this.setData({
             owner:res.data.data[0]
         })
         //请求成功后 和服务器建立 websocket通信
         // 传入roomId和openid 
         wx.connectSocket({
           url: app.wsapi + this.data.roomId + "/" + app.globalData.openid
         })
         wx.onSocketOpen(res => {
           this.socketOpen = true
           // 告诉服务端已经进入房间
           this.sendSocketMessage("0")
           for (let i = 0; i < this.socketMsgQueue.length; i++) {
             this.sendSocketMessage(socketMsgQueue[i])
           }
           wx.onSocketMessage(res => {
             //得到服务端回应，解析res
             var playerList =  JSON.parse(res.data)
             console.log(playerList)
             this.setData({
               playerList:playerList
             })
           })
         })

       }
     })

    
    wx.getUserInfo({
      success:res=>{
        this.setData({
          userInfo:res.userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.showModal({
      title: '注意',
      content: '系统检测到你退出了房间'+this.data.roomId+',是否要重新连接?',
      success:res=>{
        wx.request({
          url: app.api + '/room/joinRoom/' + this.data.roomId + "?openId=" + this.data.openid,
          method: 'GET',
          success: res => {
            console.log("加入房间成功")
            console.log(res)
            if (res.data.err_code != 0) {
              wx.showModal({
                title: '错误',
                content: res.data.err_msg,
              })
              return;
            }
            wx.navigateTo({
              url: '../waitJoin/waitJoin?roomId=' + this.data.roomId + '&roomSize=' + this.data.roomSize,
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  exitRoom:function(){
    console.log(this.data.roomId)
    wx.closeSocket()
    wx.request({
      url: app.api+ '/room/exitRoom/'+ this.data.roomId,
      data:{
        openid:this.data.openid
      },
      success:res=>{
        if(res.data.err_code != 0){
          this.showErrMsg(res.data.err_msg)
        }
      }
    })
    wx.navigateBack({
      delta: 2
    })

  },
  sendSocketMessage: function(msg) {
    if(this.socketOpen) {
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      this.socketMsgQueue.push(msg)
    }
  },
  refreshData:function(){
      
  },
  showErrMsg:function(msg){
    wx.showModal({
      title: '错误',
      content: msg,
    })
  }
})