// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    count:0
  },
  onLoad() {
    
  },

  
  send(){
    var that = this
    wx.request({
      url: 'http://192.168.1.113/EPDw_', //仅为示例，并非真实的接口地址
      method: 'POST', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.datas()
      }
    })
  },


  datas(){
    var that = this
    if(that.data.count<96){
      wx.request({
        url: 'http://192.168.1.113/ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppfpppppnppppppphklipaedpcjhdflpfnhipmmopbphppppnppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppphpppppjppppppphmpmpailpdmpdopphodmpmoppbppppppnpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppdpppppnppppppphohkpjnlpdmpdpppdopkhnpopfphpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppphpppppjppppppphpphppojpjmplplpaoppidphnpphppppnpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppdpppppnpppppppppphppplppopppppfpphklpoppppppppppppiodaLOAD_', //仅为示例，并非真实的接口地址
        method: 'POST', 
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            count:that.data.count+1
          })
            that.datas()
        }
      })


    }else{
      wx.request({
        url: 'http://192.168.1.113/SHOW_', //仅为示例，并非真实的接口地址
        method: 'POST', 
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
       
        }
      })
    }
    

  }
})
