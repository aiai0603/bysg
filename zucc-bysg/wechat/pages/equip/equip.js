// pages/equip/equip.js
Page({


  data: {
    id: 0,
    name: '',
    now: {},
    cname: '',
    hiddenmodalput: true,
    equipment: []
  },


  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    this.getData();
  },

  onShow: function () {
    this.getData();
  },

  start() {
    this.setData({
      hiddenmodalput: false,
      cname: '',
    })
  },

  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      cname: '',
    })
  },

  bindname: function (e) {
    this.setData({
      cname: e.detail.value
    })
  },



  confirm() {
    let that = this
    let data = {
      deleteFlag: 0,
      roomId: this.data.id,
      name: this.data.cname,

    }

    wx.request({
      url: 'http://47.97.158.11:8803/history/create',
      data: JSON.stringify(data),
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.rspCode == 200) {
          that.setData({
            hiddenmodalput: true,
            cname: '',
          })
          that.getData()
        } else
          wx.showToast({
            title: res.data.rspMsg, //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          })
      },


    })

  },


  test(event) {


    var that = this;

    if (!this.data.now.flag) {
      wx.showToast({
        title: "请先开始会议", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none',
      })

      return;
    }

    if (event.currentTarget.dataset.id === '暂无数据') {
      wx.showToast({
        title: "暂无IP信息,等待连接！", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none',
      })
      return;
    }


    wx.request({
      url: 'http://47.97.158.11:8803/equipment/find?id=' + event.currentTarget.dataset.eid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.data.state == 1) {
          wx.showToast({
            title: "设备繁忙", //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none',
          })

          that.getData();
        } else {
          wx.request({
            url: 'http://' + event.currentTarget.dataset.id + '/TEST', //仅为示例，并非真实的接口地址
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 502 || res.statusCode == 200)
                wx.showToast({
                  title: "连接正常", //提示文字
                  duration: 2000, //显示时长
                  mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon: 'none',
                })


            },
            fail: function (res) {
              wx.showToast({
                title: "连接异常", //提示文字
                duration: 2000, //显示时长
                mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
                icon: 'none',
              })

            }
          })

        }

      },

    })



  },

  piliang(event) {

    var that = this;

    wx.navigateTo({
      url: '../show/show?id=' + event.currentTarget.dataset.id,
    })

  },

  goto(event) {

    var that = this;

    if (!this.data.now.flag) {
      wx.showToast({
        title: "请先开始会议", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none',
      })

      return;
    }

    if (event.currentTarget.dataset.ip === '暂无数据') {
      wx.showToast({
        title: "暂无IP信息,等待连接！", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none',
      })
      return;
    }

    wx.request({
      url: 'http://47.97.158.11:8803/equipment/find?id=' + event.currentTarget.dataset.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.data.state == 1) {
          wx.showToast({
            title: "设备繁忙", //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none',
          })

          that.getData();
        } else {
          wx.navigateTo({
            url: '../canvas/canvas?id=' + event.currentTarget.dataset.id,
          })

        }

      },

    })



  },

  finish(e) {
    let that = this

    wx.request({
      url: 'http://47.97.158.11:8803/history/finish?id=' + e.currentTarget.dataset.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.rspCode == 200)
          that.getData()
        else
          wx.showToast({
            title: res.data.rspMsg, //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          })
      },


    })

  },


  finish(e) {
    let that = this

    wx.request({
      url: 'http://47.97.158.11:8803/history/finish?id=' + e.currentTarget.dataset.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.rspCode == 200)
          that.getData()
        else
          wx.showToast({
            title: res.data.rspMsg, //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          })
      },


    })

  },

  getData() {

    wx.request({
      url: 'http://47.97.158.11:8803/equipment/findbyid?id=' + this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          equip: res.data.data
        })
      },
    })


    wx.request({
      url: 'http://47.97.158.11:8803/conference/find?id=' + this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          name: res.data.data.conferenceName
        })
      },
    })

    wx.request({
      url: 'http://47.97.158.11:8803/history/findnow?id=' + this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          now: res.data.data
        })
      },
    })

  }


})