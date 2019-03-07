// pages/games/wolf/createRoom/createRoom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index:null,
    picker:[6,7,8,9,10],
    list: [],
    god:false,
    syncVoice:true,
    role:{
       'wolf':{
        title: '狼人',
        img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/langren.jpg',
         desc:'每天晚上会残忍地杀害一个村民，到了白天，狼人要假扮村民隐藏自己的身份，故意误导或陷害其他村民。'
       },
       'person':{
         title: '平民',
         img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/pingmin.jpg',
         desc:'本身没有特殊技能。平民会接收到真假混杂的信息，需要从中分辨和判断出正确的信息，认真的投出每一票，直到放逐所有狼人。'
       },
       'witch': {
        title: '女巫',
        img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/nvwu.jpg',
         desc:'女巫拥有两瓶药，解药可以救活一名当晚被狼人杀害的玩家，毒药可以毒杀一名玩家，女巫在每天晚上最多使用一瓶药，女巫不可自救。'
      },
      'hunter': {
        title: '猎人',
        img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/lieren.jpg',
        desc:'当猎人被狼人杀害或被村民处决时，他可以射杀任意一个玩家。但当猎人由于意外死亡（如女巫的毒药或者被殉情而死）他不可在死前射出子弹。'
      },
      'prophet': {
        title: '预言家',
        img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/yuyanjia.jpg',
        desc:'每天晚上可查验一个玩家的身份，看ta是好人还是狼人。利用自己的能力带领大家找出、驱逐所有狼人！'
      },
      'cupid': {
        title: '丘比特',
        img: 'https://autowired.oss-cn-hangzhou.aliyuncs.com/img/qiubite.jpg',
        desc:'第一个晚上，选择两名玩家成为情侣。丘比特可以选择自己成为情侣之一，如果情侣里有一个人不幸落难，另一个则会为之殉情。如果情侣之中两人分别属于不同阵营，则他们的游戏目标就会改变成这对情侣只想平静地生活下去，所以他们必须除掉所有其他的玩家。（注：部分局规定情侣死亡则丘比特回归神阵营，部分局则规定不回归神阵营）'
      }}
  },
  //角色配置选择
  changeRole(e){
    console.log(e)

  },
  showModal(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //人数选择
  PickerChange(e) {
    var role = this.data.role;
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    switch (this.data.index) {
      case '0':
      //6人局
       this.setData({
         list: [
           role.wolf,
           role.wolf,
           role.person,
           role.person,
           role.witch,
           role.prophet
         ]
       }) 
        break;
      case '1':
       //7人局
        this.setData({
          list: [
            role.wolf,
            role.wolf,
            role.person,
            role.person,
            role.person,
            role.witch,
            role.prophet
          ]
        }) 
        break;
      case '2':
      //8人局 投边
        this.setData({
          list: [
            role.wolf,
            role.wolf,
            role.person,
            role.person,
            role.person,
            role.witch,
            role.prophet,
            role.hunter
          ]
        }) 
        break;
      case '3': 
      //9人局
        this.setData({
          list: [
            role.wolf,
            role.wolf,
            role.wolf,
            role.person,
            role.person,
            role.person,
            role.witch,
            role.prophet
          ]
        }) 
        break;
      case '4':
      //10人局
        this.setData({
          list: [
            role.wolf,
            role.wolf,
            role.wolf,
            role.person,
            role.person,
            role.person,
            role.person,
            role.witch,
            role.prophet,
            role.hunter
          ]
        }) 
        break;
      default:
        break
    }
  },
  createRoom: function(e){
    wx.navigateTo({
      url: '../waitJoin/waitJoin',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.src = "https://autowired.oss-cn-hangzhou.aliyuncs.com/sound/start.mp3"
    // innerAudioContext.play()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})