// pages/coupon/coupon.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoad:true,
        couponList:[]
    },
    behaviors: [app.configBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async  onInit(){
        var res = await app.db.product.productGetCouponList({
            openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
            Wxappid: "wx12dbd7b90d1260a8",
            // stock_id: "10833068",
            // status: "",
            // creator_mchid: "",
            // sender_mchid: "",
            // available_mchid: "",
            // offset: "",
            // limit: "",
            // shopId: "22",
        })
        wx.hideLoading()
        console.log(res.data.data.data[0])
        // debugger
        this.setData({
            couponList: res.data.data.data,
            isLoad:false,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})