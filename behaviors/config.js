
var app 
module.exports = Behavior({
    data: {
        // list: [],
        // tabCur: 0,
        // mainCur: 0,
        // verticalNavTop: 0,
        config:{} // 全局配置
    },


    created() {
        console.log("created")
    },
    attached() {

    },
    detached() {
        console.log("detached")
    },
    ready() {
        app = getApp()
        this.setData({
            config:app.config
        })

        // 设置标题
        wx.setNavigationBarTitle({
            title: app.config.window.navigationBarTitleText,
        })
        wx.setNavigationBarColor({
            frontColor: app.config.window.navigationBarTextStyle,
            backgroundColor: app.config.window.navigationBarBackgroundColor,
        })

    },
    moved() { 

    },

    methods: {

        /**
         * @method 申请配置
         */
        initConfig(){
            console.log("initConfig")
        },
        
    },
})