// pages/list/list.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[1,2],

        TabCur: 0,
        scrollLeft: 0,


        // ORDER_STATUS_PENDING: this.db.ORDER_STATUS_PENDING,// 订单待处理
        // ORDER_STATUS_PROCESSING: this.db.ORDER_STATUS_PROCESSING,// 订单处理中
        // ORDER_STATUS_COMPLETE: this.db.ORDER_STATUS_COMPLETE, // 订单已完成
        // ORDER_STATUS_CANCEL: this.db.ORDER_STATUS_CANCEL, // 订单已取消	
        tabList: [] ,
        // [
        //     { id: 0, name: "未支付" },
        //     { id: 1, name: "待使用" },
        //     { id: 2, name: "已完成" },
        //     { id: 3, name: "退款" },
        // ],
        Status: app.db.ORDER_STATUS_PENDING || 0,
        isRefund: false, // 加载全部订单
        page: 1,
        limit: 15,
        lock: false,
        isMore: true,
    },
    behaviors: [app.configBehaviors],


    onLoad(){
        this.setData({ tabList: app.config.order.tab})
        this.onInit()
    },

    onInit() {
        // this.db.listInit(this)
        this.getOrderList() //获取订单
    },

    async getOrderList() {
        var data = {
            Page: this.data.page,
            Limit: this.data.limit,
            Status: this.data.Status,
        }

        // if (this.data.Status == this.db.ORDER_STATUS_PENDING)
        //     data.CreatedAtMin = this.getMinDate()


        // if(this.$data.isRefund) 
        // 	data.Status = this.db.PAYMENT_STATUS_REFUND

        var res = await app.db.product.productGetOrderList(data)
        this.setData({list:res.data})
        // this.db.listUpdate(this, res)
    },

    // getMinDate() {
    //     var date1 = new Date()
    //     var s1 = date1.getTime() - 1800 * 1000
    //     return this.formatDate(s1)
    // },
    // formatDate(date) {
    //     var date = new Date(date);
    //     var YY = date.getFullYear() + '-';
    //     var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //     var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    //     var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    //     var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    //     var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    //     return YY + MM + DD + " " + hh + mm + ss;
    // },

    /**
     * @method 点击选项卡
     */
    tabSelect(id) {
        console.log(id)
        var isRefund = false
        var Status
        // 未支付
        if (id == 0) {
            Status = this.db.ORDER_STATUS_PENDING
        }
        //  待使用
        if (id == 1) {
            Status = this.db.ORDER_STATUS_PROCESSING
        }
        // 已完成
        if (id == 2) {
            Status = this.db.ORDER_STATUS_COMPLETE
        }
        // 退款
        if (id == 3) {
            Status = this.db.ORDER_STATUS_CANCEL
        }
        // isRefund = true
        this.setData({
            TabCur: id,
            scrollLeft: (id - 1) * 60,
            Status: Status,
            // isRefund:isRefund,
        })
        this.onInit() // 重新请求				
    },

    back() {
        wx.navigateBack({

        })
    },
    toDetail(id) {
        uni.navigateTo({
            url: '/pages/detail/detail?orderId=' + id
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})