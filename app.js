//app.js
var db = require('db/db.js')
var utils = require('utils/util.js')
var configBehaviors = require('behaviors/config.js')

import { promisifyAll, promisify } from 'lib/miniprogram-api-promise/index.js'; // wx API化  promisify all wx's api
const wxp = {}
promisifyAll(wx, wxp) 
wx = wxp

App({
    db: db,
    utils: utils,
    configBehaviors: configBehaviors,
    behaivors:{
        config: require('behaviors/config.js'),
    },

    KEY: {
        APPID: "appId", // appid的关键字段
        SESSION_MANAGER: "session_manager",
        CONFIG:"config"
    },

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

        // 获取主题
        this.config = wx.getStorageSync(this.KEY.CONFIG)

        // 获取appid
        var res = await wx.getAccountInfoSync()
        wx.setStorageSync(this.KEY.APPID, res.miniProgram.appId)






        // configBehaviors.initConfig()
        // TODO 获取config配置
        // this.configBase = wx.getStorageSync(this.KEY.CONFIG) 

        // TODO 获取主题theme 配置
        // this.theme = {
        //     textMain: 'text-red',
        //     bgMain: 'bg-green'
        // }

        wx.getSystemInfo().then( res =>{
            console.log(res.windowHeight)
        })
        // wx.getSystemInfo({ success(res) { console.log(res) } })

        
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
    // onShareAppMessage(res) {
    //     res = res || {}
    //     if (res.from === 'button') {
    //         // 来自页面内转发按钮
    //         console.log(res.target)
    //     }
    //     return {
    //         title: res.title || '欢迎进入分享集点卡商户端',
    //         path: res.path || '/pages/route/route',
    //         imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",

    //     }
    // },
    
    /**
     * TODO
     * 1、背景，主题 
     * 2、前景卡片
     * 3、卡片主要颜色、背景
     * 4、说明文字
     */
    // configTheme:{
    //     textMain: 'text-red',
    //     bgMain: 'bg-green'
    // },

    // // 基础配置文件
    // configBase: {
    //     init: {
    //         page: "", //第一个进的页面
    //         shopID: "", //展示的门店号
    //     },
    //     color: {
    //         text: "", //文字颜色
    //         bg: "", //背景颜色
    //     },
    //     window: {
    //         "navigationBarBackgroundColor": "#efaf30",
    //         "navigationBarTextStyle": "#ffffff",
    //         "navigationBarTitleText": "小杯子配置",
    //         "backgroundColor": "#ffffff",
    //         "backgroundTextStyle": "light"
    //     }
    // },
        
    
    
})