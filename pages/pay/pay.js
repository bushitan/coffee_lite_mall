// pages/pay/pay.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    behaviors: [app.configBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            orderId: options.orderId || "",
        })
        this.onInit()
    },

    async onInit() {
        var that = this
        wx.showToast({
            title: "支付中",
            icon:"loading"
        })

        var orderId = this.data.orderId
        // if (orderId == "") {
        //     console.log("未传入orderId")
        //     return
        // }

        var res = await app.db.product.productPayment({
            OrderId: orderId
        })
        console.log(res)

        if (res.code == -2) {
            wx.showModal({
                title: res.msg,
                success() {
                    wx.switchTab({
                        url: "/pages/my/my"
                    })
                },
            })
            return
        }

        if (res.code == 0) {
            var data = res.data
            this.pullPayment()
          
        }
        else {
            wx.showModal({
                title: "网络异常",
                success() {
                    wx.switchTab({
                        url: "/pages/my/my"
                    })
                },
            })
            return
        }

    },

    // 调起支付
    pullPayment(data){
        var obj = {
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign,	//雕改 2020年09月16日 17：27	
            // paySign: data.subpaySign,																		
            success(res) {
                console.log(res)
                wx.showModal({
                    title: "支付成功",
                    success() {
                        wx.switchTab({
                            url: "/pages/my/my"
                        })
                    },
                })
            },
            fail(res) {
                console.log(res)
                wx.showModal({
                    title: "失败，请重新支付",
                    success() {
                        wx.switchTab({
                            url: "/pages/my/my"
                        })
                    },
                })
            }
        }
        console.log(obj)
        wx.requestPayment(obj)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})