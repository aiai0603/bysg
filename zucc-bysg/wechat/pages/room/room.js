// pages/room/room.js
Page({

    data: {
        room: [],
        hiddenmodalput: true,
        name: '',
        pass: ''
    },

    getData: function () {
        wx.request({
            url: 'http://47.97.158.11:8803/conference/findbyUser?id=' + wx.getStorageSync('storage').id,
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                this.setData({
                    room: res.data.data
                })

            },


        })
    },

    onLoad() {
        this.getData()
    },

    onShow() {
        this.getData()
    },


    bindname: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindpass: function (e) {
        this.setData({
            pass: e.detail.value
        })
    },

    modalinput: function () {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },

    goto(event){
        if(event.currentTarget.dataset.state == 1){
            wx.showToast({

                title: '会议室不可用',
      
                icon:'none',
      
                duration: 2000
      
              })

              return false;
        }
   
        wx.navigateTo({
          url: '../equip/equip?id='+    event.currentTarget.dataset.id ,
        })
          
    },

    delete(event){
        let that =this

        wx.request({
            url: 'http://47.97.158.11:8803/bind/delete?id=' + event.currentTarget.dataset.id + '&uid='+wx.getStorageSync('storage').id,
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                that.getData()
            },


        })

    },
    //取消按钮
    cancel: function () {
        this.setData({
            hiddenmodalput: true,
            name: '',
            pass: ''
        })
    },
    //确认
    confirm: function () {

        const id = wx.getStorageSync('storage').id

        let data = {
            name: this.data.name,
            pass: this.data.pass,
            user: id
        }

        wx.request({
            url: 'http://47.97.158.11:8803/bind/create',
            data: JSON.stringify(data),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {

                if (res.data.rspCode == 200) {
                    this.setData({
                        hiddenmodalput: true,
                        name: '',
                        pass: ''
                    })

                    this.getData()

                } else {
                    wx.showToast({
                        title: res.data.rspMsg, //提示文字
                        duration: 2000, //显示时长
                        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  


                    })
                }


            },
            fail: (error) => {

            }
        })


    }

})