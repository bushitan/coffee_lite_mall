// // pages/test/test.js
var app = getApp()
Component({

    properties: {
        paramA: Number,
        paramB: String,
        obj:Object,
    },
    behaviors: [app.configBehaviors ],

    observers: {
        // 'paramA, paramB': function (paramA, paramB) {
        //     // 在 numberA 或者 numberB 被设置时，执行这个函数

        //     console.log('3')
        //     this.setData({
        //         sum: paramA + paramB
        //     })

        //     console.log('4')
        // // }
        // 'obj.name': function (name) {
        //     // 在 numberA 或者 numberB 被设置时，执行这个函数
        //     console.log(name)
        //     console.log('3')
        //     // this.setData({
        //     //     sum: paramA + paramB
        //     // })
        //     // this.setData({
        //     //     obj:{_name:123}
        //     // })
        //     // name = this.data.obj.name + 'ww'
        //     console.log('4')
        //     return name
        // }
    },


    methods: {
        onLoad: function () {
            // this.data.paramA // 页面参数 paramA 的值
            // this.data.paramB // 页面参数 paramB 的值

            console.log('1')
            this.setData({
                obj:{
                    name:'wf'
                }
            })
            console.log('2')
            console.log(this.data.color)

           
            // console.log(this.data)
        },

        // /**
        //  * 用户点击右上角分享
        //  */
        // onShareAppMessage: function () {
        //     debugger
        // },

        // // onLoad: function (options) {
        // //     // 页面创建时执行
        // //     console.log("onLoad")
        // // },
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
        
    }

})