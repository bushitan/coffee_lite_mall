//app.js
var db = require('db/db.js')
var utils = require('utils/util.js')
var configBehaviors = require('behaviors/config.js')
App({
    db: db,
    utils: utils,
    configBehaviors: configBehaviors,

    async onLaunch () {
        // 自定义导航条高度
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })

        // configBehaviors.initConfig()
        // TODO 获取config配置

        this.config = wx.getStorageSync('config')
    },

    
    // 全局变量
    globalData: {
        userInfo: null,
        StatusBar: 0,
        Custom: 0,
        CustomBar: 0,
    },
    // 获取上一页面
    getPrePage() {  return  getCurrentPages()[getCurrentPages().length - 2]  },
    // 基础的分享页面功能
    onShareAppMessage(res) {
        res = res || {}
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: res.title || '欢迎进入分享集点卡商户端',
            path: res.path || '/pages/route/route',
            imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",

        }
    },

    config: {},
        // init:{
        //     page:"", //第一个进的页面
        //     shopID:"", //展示的门店号
        // },
        // color:{
        //     text:"", //文字颜色
        //     bg:"", //背景颜色
        // },  
        // window:{
        //     "navigationBarBackgroundColor": "#efaf30",
        //     "navigationBarTextStyle": "#ffffff",
        //     "navigationBarTitleText": "小杯子配置",
        //     "backgroundColor": "#ffffff",
        //     "backgroundTextStyle": "light"
        // }
    
    
})