var a= new Array(800 * 480);

var aa= new Array(800 * 480);

var pxInd=0;

var rqMsg= "";


var ip="http://192.168.1.114/"

Page({

  /**
  
  * 页面的初始数据
  
  */

  data: {

   
    sW: 800,
    sH: 480,
    dX: 0,
    dY: 0,
    dW: 800,
    dH: 480,

    palArr : [
      [
        [0, 0, 0],
        [255, 255, 255]
      ],
      [
        [0, 0, 0],
        [255, 255, 255],
        [127, 0, 0]
      ],
      [
        [0, 0, 0],
        [255, 255, 255],
        [127, 127, 127]
      ],
      [
        [0, 0, 0],
        [255, 255, 255],
        [127, 127, 127],
        [127, 0, 0]
      ],
      [
        [0, 0, 0],
        [255, 255, 255]
      ],
      [
        [0, 0, 0],
        [255, 255, 255],
        [220, 180, 0]
      ],
      [
        [0, 0, 0]
      ],
      [
        [0, 0, 0],
        [255, 255, 255],
        [0, 255, 0],
        [0, 0, 255],
        [255, 0, 0],
        [255, 255, 0],
        [255, 128, 0]
      ]
    ],
    epdArr : [
      [200, 200, 0],
      [200, 200, 3],
      [152, 152, 5],
      [122, 250, 0],
      [104, 212, 1],
      [104, 212, 5],
      [104, 212, 0],
      [176, 264, 0],
      [176, 264, 1],
      [128, 296, 0],
      [128, 296, 1],
      [128, 296, 5],
      [128, 296, 0],
      [400, 300, 0],
      [400, 300, 1],
      [400, 300, 5],
      [600, 448, 0],
      [600, 448, 1],
      [600, 448, 5],
      [640, 384, 0],
      [640, 384, 1],
      [640, 384, 5],
      [800, 480, 0],
      [800, 480, 1],
      [880, 528, 1],
      [600, 448, 7],
      [880, 528, 0],
      [280, 480, 0],
      [152, 296, 0],
      [648, 480, 1],
      [128, 296, 1],
      [200, 200, 1],
      [104, 214, 1],
      [128, 296, 0],
      [400, 300, 1],
      [152, 296, 1],
      [648, 480, 0],
      [640, 400, 7],
      [176, 264, 1],
      [122, 250, 0]
    ],
    dispX: 0,
    palInd : 0,
    // var curPal = palArr[22];
    curPal:  [
    ],




    array: ['黑色', '白色'],
    sha: false,
    index: 0,
    show: false,
    img1: "",
    num: 40,
    name: "",
    count: 0,
    width: 0,
    height: 0,
    stInd: 0,
    count: 0,
    tips: "图片生成中"





  },


  //下拉框选择字体
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //获得文字
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  //获得字号
  numInput: function (e) {
    this.setData({
      num: e.detail.value
    })
  },

  //选择背景
  chooseImageTap: function () {

    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  // 选择图片
  chooseWxImage: function (type) {
    var that = this;
    //  var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        // that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
        that.setData({
          bgpic: res.tempFilePaths[0]
        })
        that.clickMe()

      }
    })
  },

  //小数点2位
  floor(num, n) {
    return parseInt(num * Math.pow(10, n)) / Math.pow(10, n)
  },

  /*
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx', //
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        that.data.picPaths.push(data['msg'])
        that.setData({
          picPaths: that.data.picPaths
        })
        console.log(that.data.picPaths)
      }
    })
  },

  */

  //修改图片
  change() {


    var index = 0;
    for (var j = 0; j < this.data.dH; j++) {
      var y = this.data.dY + j;
      if ((y < 0) || (y >= this.data.sH)) {
        for (var i = 0; i < this.data.dW; i++, index += 4) this.setVal(a, index, (i + j) % 2 == 0 ? 1 : 0);
        continue;
      }
      for (var i = 0; i < this.data.dW; i++) {
        var x = this.data.dX + i;
        if ((x < 0) || (x >= this.data.sW)) {
          this.setVal(a, index, (i + j) % 2 == 0 ? 1 : 0);
          index += 4;
          continue;
        }
        var pos = (y * this.data.sW + x) * 4;
        this.setVal(a, index, this.getNear(aa[pos], aa[pos + 1], aa[pos + 2]));
        index += 4;
      }
    }

  },



  //算法
  getVal(p, i) {
    if ((p[i] == 0x00) && (p[i + 1] == 0x00)) return 0;
    if ((p[i] == 0xFF) && (p[i + 1] == 0xFF)) return 1;
    if ((p[i] == 0x7F) && (p[i + 1] == 0x7F)) return 2;
    return 3;
  },

  setVal(p, i, c) {
    p[i] = this.data.curPal[c][0];
    p[i + 1] = this.data.curPal[c][1];
    p[i + 2] = this.data.curPal[c][2];
    p[i + 3] = 255;
  },
  addVal(c, r, g, b, k) {
    return [c[0] + (r * k) / 32, c[1] + (g * k) / 32, c[2] + (b * k) / 32];
  },
  getErr(r, g, b, stdCol) {
    r -= stdCol[0];
    g -= stdCol[1];
    b -= stdCol[2];
    return r * r + g * g + b * b;
  },
  getNear(r, g, b) {
    var ind = 0;
    var err = this.getErr(r, g, b, this.data.curPal[0]);
    for (var i = 1; i < this.data.curPal.length; i++) {
      var cur = this.getErr(r, g, b, this.data.curPal[i]);
      if (cur < err) {
        err = cur;
        ind = i;
      }
    }
    return ind;
  },

  /**
  
  * 生命周期函数--监听页面加载
  
  */
  onLoad: function (options) {

    var that = this
    // 获取设备宽高，以备海报全屏显示
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight,
          palInd : that.data.epdArr[22][2] & 0xFE,
          curPal : that.data.palArr[0]
        })
        



      },
    })
  },
  // 点击生成并保持海报到手机相册
  // 生成图片
  clickMe() {
    var that = this
    that.setData({

      show: true,
      sha: true,
      tips: "图片生成中"

    })
    that.drawCanvas()
  },
  // 绘制canvas
  drawCanvas() {


    this.setData({
      show: true,
      tips: "图片生成中",
      sha: true,
      dispX : 0,
     
    })
    
    var that = this
    var windowW = that.data.windowW
    var context = wx.createCanvasContext('firstCanvas')
    this.getGoodsImgPath().then((res) => {
      context.save() //保存当前的绘图上下文。
      context.drawImage(res, 0, 0, windowW, windowW / 400 * 240); //绘制图片
      context.restore()
      context.setFontSize(that.data.num)
      if (that.data.index == 0)
        context.setFillStyle("black")
      else
        context.setFillStyle("white")
      context.textAlign = 'center';
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(that.data.name, windowW / 2, windowW / 400 * 240 / 2)

      context.draw(true)
    })
    var context2 = wx.createCanvasContext('firstCanvas2')
    this.getGoodsImgPath().then((res) => {
      context2.save() //保存当前的绘图上下文。
      context2.drawImage(res, 0, 0, 800, 480); //绘制图片
      context2.restore()
      context2.setFontSize(that.data.num / 375 * 800)

      if (that.data.index == 0)
        context2.setFillStyle("black")
      else
        context2.setFillStyle("white")
      context2.textAlign = 'center';
      context2.textBaseline = "middle";
      context.textAlign = "center";
      context2.fillText(that.data.name, 800 / 2, 480 / 2)
      context2.draw(true)
      that.daochu()
    })
  },

  //获得图片数据
  getGoodsImgPath: function () {
    return new Promise((success, fail) => {
      var that = this
     // console.log(that.data.bgpic)
      wx.getImageInfo({
        src: that.data.bgpic,
        success: res => {
          this.setData({
            img1: res.path
          })
          success(res.path);
        },
        fail: res => {

          wx.showToast({

            title: '请先选择图片',
       
            icon: 'error',
       
            duration: 2000//持续的时间
       
          })
          fail(res);
        }
      })

    });
  },



  //转为bit
  tob() {
   
    var that = this
    wx.canvasGetImageData({
      canvasId: 'firstCanvas2', //参数，canvas标签的
      x: 0, //起始位置，x坐标
      y: 0,
      width: 800,
      height: 480,
      success: function (res) {
        aa= res.data
        var i = 0;
        that.setData({
          sha: false
        })

        // console.log(aa)
          that.change()
       //   console.log(a)

        for (var y = 0; y < 480; y++)
          for (var x = 0; x < 800; x++, i++) {
            
                a[i] = that.getVal(a, i << 2)   
          }
      },
      fail(res){
        console.log(res)
      }
    })
  },


  btnsave() {

    if(!this.data.show){

      wx.showToast({

        title: '请先选择图片',
   
        icon: 'error',
   
        duration: 2000//持续的时间
   
      })


      return 0 ;

    }
    var that = this
    pxInd=0

    that.setData({

      sha: true,
      tips: "正在连接服务器"

    })



    var that = this
    wx.request({
      url: ip+'EPDw_', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(stInd)

        if (that.data.stInd == 0) return that.u_data(a, 0, 0, 100);
        if (that.data.stInd == 1) return that.u_done();
      },
      fail: function (res) {
        // console.log(stInd)

        if (that.data.stInd == 0) return that.u_data(a, 0, 0, 100);
        if (that.data.stInd == 1) return that.u_done();
      }
    })
  },



  byteToStr(v) {
    return String.fromCharCode((v & 0xF) + 97, ((v >> 4) & 0xF) + 97);
  },
  wordToStr(v) {
    return this.byteToStr(v & 0xFF) + this.byteToStr((v >> 8) & 0xFF);
  },

  //发送
  u_send(cmd, next) {
    var that = this

    wx.request({
      url: ip + cmd, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          count: that.data.count + 1,

          tips: "上传进度" + that.floor(((that.data.count + 1) / 96) * 100, 2) + "%"


        })



        if (next || that.data.count >= 97) {
          that.setData({
            stInd: that.data.stInd + 1,
            sha: false
          })
        }


        if (that.data.stInd == 0) return that.u_data(a, 0, 0, 100);
        if (that.data.stInd == 1) return that.u_done();
        else


          that.setData({
            stInd: 0,
            count: 0
          })


        return 0;


      },
      fail:function (res) {

        that.setData({
          count: that.data.count + 1,

          tips: "上传进度" + that.floor(((that.data.count + 1) / 96) * 100, 2) + "%"


        })

        if (next || that.data.count >= 97) {
          that.setData({
            stInd: that.data.stInd + 1,
            sha: false
          })
        }

        if (that.data.stInd == 0) return that.u_data(a, 0, 0, 100);

        if (that.data.stInd == 1) return that.u_done();
        else
          that.setData({
            stInd: 0,
            count: 0
          })
        return 0;
      }


    })


  },

  u_next() {
    that.setData({
      lnInd: 0,

    })
    pxInd=0;

    this.u_send('NEXT_', true);
  },

  u_done() {


    return this.u_send('SHOW_', true);

  },
  u_show(a, k1, k2) {
    var x = '' + (k1 + k2 * pxInd / a.length);
    if (x.length > 5) x = x.substring(0, 5);

    return this.u_send(rqMsg + this.wordToStr(rqMsg.length) + 'LOAD_', pxInd >= a.length);
  },
  u_data(a, c, k1, k2) {
   
    rqMsg  ='';
   
    var that = this

    if (c == -1) {
      while ((pxInd < a.length) && (rqMsg.length < 1000)) {
        var v = 0;
        for (var i = 0; i < 16; i += 2)
          if (pxInd < a.length) v |= (a[pxInd++] << i);
            rqMsg+= that.wordToStr(v);
           
       

       
    
      }
    } else if (c == -2) {
      while ((pxInd < a.length) && (rqMsg.length < 1000)) {
        var v = 0;
        for (var i = 0; i < 16; i += 4)
          if (pxInd < a.length) v |= (a[pxInd++] << i);
            rqMsg+= that.wordToStr(v)
         
        

        
      
      }
    } else {
      while ((pxInd < a.length) && (rqMsg.length < 1000)) {
        var v = 0;
        for (var i = 0; i < 8; i++)
          if ((pxInd < a.length) && (a[pxInd++] != c)) v |= (128 >> i);
          rqMsg+=that.byteToStr(v)
         
      


        
     

      }
    }
    return this.u_show(a, k1, k2);
  },
  u_line(a, k1, k2) {
    var x;

      rqMsg=''


    while (rqMsg.length < 1000) {
      x = 0;
      while (x < 122) {
        var v = 0;
        for (var i = 0;
          (i < 8) && (x < 122); i++, x++)
          if (a[pxInd++] != 0) v |= (128 >> i);
     
          rqMsg+= that.byteToStr(v)
        
     


        
     
      }
    }
    return this.u_show(a, k1, k2);
  },








  // 点击保存按钮，同时将画布转化为图片

  daochu: function () {
   
    var that = this;
   

    setTimeout(function () {
      wx.canvasToTempFilePath({

        x: 0,
  
        y: 0,
        destWidth: 800,
        destHeight: 480,
  
  
        canvasId: 'firstCanvas',
  
        fileType: 'jpg',
  
        quality: 1,
  
        success: function (res) {
  
          console.log(1)
  
          that.setData({
  
            shareImage: res.tempFilePath
  
          })
  
  
          that.tob();
  
  
        },
  
  
      })
     
     }, 1000) //延迟时间 这里是2秒

  

  },

  // 将商品分享图片保存到本地

  eventSave() {

    wx.saveImageToPhotosAlbum({

      filePath: this.data.shareImage,

      success(res) {

        wx.showToast({

          title: '保存图片成功',

          icon: 'success',

          duration: 2000

        })

      }

    })

  },

  //将线上图片地址下载到本地，此函数进行了封装，只有在需要转换url的时候调用即可

  /*

  // canvas多文字换行

  newLine(txt, context) {

    var txtArr = txt.split('')

    var temp = ''

    var row = []

    for (var i = 0; i < txtArr.length; i++) {

      if (context.measureText(temp).width < 210) {

        temp += txtArr[i]

      } else {

        i--

        row.push(temp)

        temp = ''

      }

    }

    row.push(temp)

    //如果数组长度大于3 则截取前三个

    if (row.length > 3) {

      var rowCut = row.slice(0, 3);

      var rowPart = rowCut[2];

      var test = "";

      var empty = [];

      for (var a = 0; a < rowPart.length; a++) {

        if (context.measureText(test).width < 180) {

          test += rowPart[a];

        } else {

          break;

        }

      }

      empty.push(test);

      var group = empty[0] + "..." //这里只显示三行，超出的用...表示

      rowCut.splice(2, 1, group);

      row = rowCut;

    }

    return row

  },

  */
})