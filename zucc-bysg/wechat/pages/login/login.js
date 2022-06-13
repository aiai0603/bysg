//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    openId: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {


    wx.getStorage({
      key: 'storage',
      success: function(res){
       if(res!=null){
        wx.switchTab({
          url: '../room/room',
        })
       }
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
        }
      })
    }
  },

  relogin() {
    console.log(this.data.userInfo)
    let data = {
      openId: this.data.openId,
      nickName: this.data.userInfo.nickName,
      avater: this.data.userInfo.avatarUrl
    }

    wx.request({
      url: 'http://47.97.158.11:8803/user/login',
      data: JSON.stringify(data),
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {

        wx.setStorageSync('storage', res.data.data)

          wx.switchTab({
            url: '../room/room',
          })
      },
      fail: (error) => {

      }
    })

  },
  getUserProfile() {
    var that = this
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        that.login()
      }
    })

  },
  login: function (e) {
    wx.login({
      success: (res) => {
        console.log(res)

        if (res.code) {
          console.log('通过login接口的code换取openid');

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: { //填上自己的小程序唯一标识 
              appid: 'wxa912f0f32e690074', //填上自己的小程序的 app secret 
              secret: '87c69dcf402e9220b51fbc2e83b976e9',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: (openIdRes) => {
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              this.setData({
                openId: openIdRes.data.openid
              })

              this.relogin()
            },
            fail: (error) => {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })

  }
})