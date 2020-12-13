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
        this.onInit()
    },

    async onInit() {
        var res = await app.db.product.productGetUserInfo()
        console.log(res)
        this.setData({
            userInfo: res.data
        })
    },


    async productSetUserInfo(e) {
        var userinfo = e.detail.userInfo
        // console.log(e.detail)
        var res = await app.db.product.productSetUserInfo({
            WxAvatarUrl: userinfo.avatarUrl,
            WxCity: userinfo.city,
            WxCountry: userinfo.country,
            WxGender: userinfo.gender,
            WxLanguage: userinfo.WxLanguage,
            WxNickName: userinfo.nickName,
            WxProvince: userinfo.province,
        })
        console.log(res)
        this.onInit()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})