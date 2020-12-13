// pages/detail/detail.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {


        // PAYMENT_STATUS_PENDING: this.db.PAYMENT_STATUS_PENDING, // 待支付
        // PAYMENT_STATUS_AUTHORIZED: this.db.PAYMENT_STATUS_AUTHORIZED,// 待支付
        // PAYMENT_STATUS_REFUND_APPLY: this.db.PAYMENT_STATUS_REFUND_APPLY, // 申请退款中

        // ORDER_STATUS_PENDING: this.db.ORDER_STATUS_PENDING,
        // ORDER_STATUS_PROCESSING: this.db.ORDER_STATUS_PROCESSING, //订单处理中
        // ORDER_STATUS_COMPLETE: this.db.ORDER_STATUS_COMPLETE,
        // SHOP_TAKE_WM: this.db.SHOP_TAKE_WM, // 外卖配送
        // SHOP_TAKE_ZQ: this.db.SHOP_TAKE_ZQ, // 外卖配送
        // SHOP_TAKE_TS: this.db.SHOP_TAKE_TS, // 外卖配送
        orderId: "",
        order: {
            ship_address: {},
        }, // 订单信息
    },

    behaviors: [app.configBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.CustomBar)
        this.setData({
            orderId: options.orderId || ""
        })
        this.onInit()


    },
    async onInit(){
        // var order = await this.db.orderGen()
        var res = await app.db.product.productOrderDetail({
            orderId: this.data.orderId
        })
        this.setData({
            order: res.data
        })

        //订单状态为待使用，则重复请求
        // if (res.data.order_status_code == this.db.ORDER_STATUS_PROCESSING) {
        //     interval = setInterval(() => this.checkOrderComplete(), 5000)
        // }
    },


    // 检查订单是否已经完成
    async checkOrderComplete() {
        var res = await app.db.product.productOrderDetail({
            orderId: this.$data.orderId
        })
        if (res.data.order_status_code == this.db.ORDER_STATUS_COMPLETE) {
            uni.showModal({
                title: "核销成功",
                showCancel: false,
                success: () => {
                    var page = getCurrentPages()
                    var prePage = page[page.length - 2]
                    prePage.$vm.tabSelect(2)
                    uni.navigateBack()
                }
            })
        }
    },

    back() {
        uni.navigateBack({

        })
    },

    // 去支付
    clickPay() {
        uni.redirectTo({
            url: '/pages/wx/wxpay?orderId=' + this.$data.orderId,
        });
    },

    // 取消订单
    async clickCancle() {
        var that = this
        wx.showModal({
            title: "是否取消订单",
            success(res) {
                if (res.confirm) {
                    that.db.orderRefund({
                        orderId: that.$data.orderId
                    }).then(res => {
                        uni.showModal({ title: res.msg, showCancel: false })
                        uni.navigateBack({})
                    })
                }
            }
        })

    },

    // 致电骑手
    toRider() {
        wx.makePhoneCall({
            phoneNumber: "3468732874",
        })
    },

    qrR(e) {
        console.log(e)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})