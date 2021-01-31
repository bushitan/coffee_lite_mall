
var app 
module.exports = Behavior({
    data: {
        list: [],
        // tabCur: 0,
        // mainCur: 0,
        // verticalNavTop: 0,

        config:{}, // 全局配置

        
    },



    // 监听器
    observers:{
        // 全局生成config配置参数
        'configBase': function (config) {
            console.log(config)
            // TODO 检查配置文件是否完整，不完整，在这里补充
            this.setData({
                config: config
            })
            
        }

    },

    //准备完成
    ready() {
        app = getApp()
        console.log(11111111)
        this.setData({
            configBase: app.configBase,
        })
        this.initConfig()
    },
    methods: {
        /**
         * @method 初始化配置
         */
        initConfig(){
            console.log("initConfig")

            console.log(2)
            // 设置标题
            // wx.setNavigationBarTitle({
            //     title: this.data.config.window.navigationBarTitleText,
            // })
            wx.setNavigationBarColor({
                frontColor: this.data.config.window.navigationBarTextStyle,
                backgroundColor: this.data.config.window.navigationBarBackgroundColor,
            })
        },
        

        // 返回前一页的page
        getPrePage() { return getCurrentPages()[getCurrentPages().length - 2] },

        onShareAppMessage(res) {
            console.log("share")
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

        // onLoad: function (options) {
        //     // 页面创建时执行 组件内不触发
        //     console.log("onLoad")
        // },
        // onShow: function () {
        //     // 页面出现在前台时执行
        //     console.log(" onShow")
        // },
        // onReady: function () {
        //     // 页面首次渲染完毕时执行
        //     console.log(" onReady")
        // },
        // onHide: function () {
        //     // 页面从前台变为后台时执行
        //     console.log("onHide ")
        // },
        // onUnload: function () {
        //     // 页面销毁时执行
        //     console.log("onUnload ")
        // },
        // onPullDownRefresh: function () {
        //     // 触发下拉刷新时执行
        //     console.log(" onPullDownRefresh")
        // },
        // onReachBottom: function () {
        //     // 页面触底时执行
        //     console.log("onReachBottom ")
        // },
        // onShareAppMessage: function () {
        //     // 页面被用户分享时执行
        //     console.log(" onShareAppMessage")
        // },
        // onPageScroll: function () {
        //     // 页面滚动时执行
        //     console.log(" onPageScroll")
        // },
        // onResize: function () {
        //     // 页面尺寸变化时执行
        //     console.log(" onResize")
        // },
    },


    // created() {
    //     console.log("created")
    // },
    // attached() {

    // },
    // detached() {
    //     console.log("detached")
    // },
    // moved() {
    //     console.log("moved")
    // },


    // // 可以不用
    // pageLifetimes: {
    //     // 组件所在页面的生命周期函数
    //     show: function () { console.log("show") },
    //     hide: function () { console.log("hide") },
    //     resize: function () { console.log("resize") },
    // },

    // // 可以不用
    // lifetimes: {
    //     // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    //     attached: function () { },
    //     moved: function () { },
    //     detached: function () { },
    // },
})