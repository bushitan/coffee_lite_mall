// pages/route/route.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        config:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // debugger
        this.onInit()
    },

    // 初始化路由
    async onInit(){
        // 获取配置
        // await this.getConfig()
        this.getConfig()

        // todo 登陆
        
        var res = await app.db.product.login()
        // this.clickTo()
        this.toBrand()
    },
    //  默认和点击跳转
    clickTo() { // debugger
        wx.redirectTo({
            url: app.config.route.defaultPage,
        })
    },

    toMenu() { wx.navigateTo({ url: '/pages/menu/menu?shopID=97', }) }, // 去订单
    toOrder() { wx.navigateTo({ url: '/pages/order/order?shopID=87', }) }, // 去订单
    toPay() { wx.navigateTo({ url: '/pages/pay/pay?orderId=87', }) }, // 去支付
    toMy() { wx.navigateTo({ url: '/pages/my/my', }) }, // 去支付
    toList() { wx.navigateTo({ url: '/pages/list/list', }) }, // 订单列表
    toDetail() { wx.navigateTo({ url: '/pages/detail/detail?orderId=3150', }) }, // 订单列表
    toItem() { wx.navigateTo({ url: '/pages/item/item?itemId=2444&shopID=87', }) }, // 订单列表
    toBrand() { wx.navigateTo({ url: '/pages/brand/brand?shopID=97', }) }, // 品牌专栏
    /**
     * @method 获取配置表
     * 除开switch页面，其他页面，均使用公共的配置表，来完成风格的转化
     */
    getConfig() {

        app.config = {
            //路由页面配置
            route: {
                defaultPage: "/pages/menu/menu?shopID=97", //默认进的页面
                // defaultShopID: "", //展示的门店号
                image: "cloud://cup-wm-release.6375-cup-wm-release-1302028748/image/loading.jpg",//route欢迎海报
                btnClass:"line-white",
                btnText: "Seeking 欢迎您",
            },
            //品牌配置
            brand:{
                logo: "/images/logo.png",//品牌名字
                name: "",//品牌名字
                list:[
                    {
                        name:"", //门店名字
                        shopID:"", //门店的id
                        address:"",
                        tel:"",
                        longitude:0,
                        latitude:0,
                    },
                ],
            },
            //图标配置
            icon: {
                cart: "/images/logo.png", //购物车按钮
                add: "/images/icon/add.png", //增加按钮
                cut: "/images/icon/cut.png", //增加按钮
            },
            // 主题色彩配置
            color: {
                text: "", //文字颜色
                bg: "", //背景颜色
                page: "",
                textMain: 'text-red',
                bgMain: 'bg-green'
            },
            // 窗口配置
            window: {
                "navigationBarBackgroundColor": "#efaf30",
                "navigationBarTextStyle": "#ffffff", // #000000  #ffffff 二选一
                "navigationBarTitleText": "小杯子配置",
                "backgroundColor": "#ffffff",
                "backgroundTextStyle": "light"
            },
            // 基础分享页面配置
            share: {
                title: "",
                path: "",
                imageUrl: "",
            },
            //订单--分类配置
            order:{
                tab: [
                    { id: 0, name: "未支付" },
                    { id: 1, name: "待使用" }, //待发货  || 待接单
                    // { id: 2, name: "已完成" }, //已发货  || 制作中 || 配送中
                    { id: 3, name: "已完成" },
                    { id: 4, name: "退款" },
                ],
            },
            footer:{
                text:"Copyright © 2020 索骏科技提供技术支持"
            },

            // TODO 想到什么，就加到配置表上
            // coupon
        }
        this.setData({ config: app.config })

        wx.setStorageSync('config', app.config )
        

        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {

        //         resolve()
        //     }, 1000)
        // })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})