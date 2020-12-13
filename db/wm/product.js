

var dbFather = require('base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 用户登录
     * @return 
     *      code
	  * 	session
	  * 	AppId
     */
    login() {
        return new Promise((resolve, reject) => {
            var that = this
            wx.login({
                success(e) {

                    that.base({
                        url: that.HOST_URL + "api/gettoken/",
                        data: {
                            Code: e.code,
                            AppId: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        wx.setStorageSync(that.KEY_SESSION, res.data.session) //session
                        wx.setStorageSync(that.KEY_SN, res.data.sn)  //序列号			
                        wx.setStorageSync(that.KEY_UNION_KEY, res.data.unionKey)  //唯一值				

                        console.log("get customerGetToken success")
                        resolve(true)
                    })
                    .catch(res => {
                        console.log("get customerGetToken catch")
                        reject(false)
                    })
                },
                fail(res) {
                    console.log("login fail")
                    reject(false)
                },
            })
        })
    }

    /**
       * @method 查找可查看订单统计的门店列表
       */
    productGetStoreList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/sp/storeslist/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
         * @method 3 获取该店铺的菜单
         * @param 
            id
            fields
    */
    productMenu(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()

            this.base({ url: this.HOST_URL + "api/category/products", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }
    productGetSKUPrice(data) {
        return new Promise((resolve, reject) => {

            wx.showLoading({
                mask: true
            })
            this.base({ url: this.HOST_URL + "api/sku/change", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }


    /**
        * @method 获取当前门店 (客户端使用)
    */
    productGetStoreInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/current_store", data: data, }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }
    /**
         * @method 获取当前品牌下所有门店 (客户端使用)
     */
    productGetStoreList(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/stores", data: data, }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }


    /**
     * @method 获取订单的价格
     */
    productGetPrice(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/caculate/price", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }

    /**
     * @method 生成订单
     */
    productGen(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/orders/gen", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }

    /**
     * @method 点单系统完成订单
     * @param
     *      OrderId: 3412,
            PayMethod:0, // 0微信支付 1支付宝 2零钱 3银联 4其他 5小杯子优惠GO
            Reason:"",
     */
    productFinish(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/shoper/finishOrder", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }


    /**
     * @method 点单系统作废订单
     * @param
     *      orderId：
            reason：
     */
    productVoideOrder(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/orders/SpVoideOrder", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }




    /***************统计流程************/
    /**
     * @method 订单列表
    */
    productGetOrderList(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/spseller/getorderslist", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }

    /**
     * @method 订单汇总
    */
    productGetOrderSummary(data) {
        return new Promise((resolve, reject) => {
            // wx.showLoading()
            this.base({ url: this.HOST_URL + "api/spseller/summary", data: data, }).then(res => {
                // wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }



    /***************嗨翻节************/

    productScanOrderID(data) {
        return new Promise((resolve, reject) => {
            // wx.showLoading({ title: "加载中" })
            this.base({ url: this.HOST_URL + "api/seller/scan/", data: data, })
                .then(res => {
                    // wx.hideLoading()
                    resolve(res)
                })
                .catch(res => {
                    // wx.hideLoading()
                    reject(res)
                })
        })
    }
    productGetHiOrderList(data) {
        return new Promise((resolve, reject) => {
            // wx.showLoading({ title: "加载中" })
            this.base({ url: this.HOST_URL + "api/seller/getorderslist/", data: data, })
                .then(res => {
                    // wx.hideLoading()
                    resolve(res)
                })
                .catch(res => {
                    // wx.hideLoading()
                    reject(res)
                })
        })
    }



    /***************嗨翻节************/

	/**
	 * @method 获取客户收货地址
	 * @param 
	 */
    productGetShipAddrs(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/customer/shipaddrs/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    productPayment(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/orders/prepay/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
     * @method 获取会员头像
    */
    productGetUserInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/customer/selfinfo/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
     * @method 更新商户店员头像
     * @param
     *      orderId：
             reason：
    */
    productSetUserInfo(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()
            this.base({ url: this.HOST_URL + "api/customer/updatewxinfo", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }

    /**
     * @method 4 获取某一客户的所有订单
     */
    productGetOrderList(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/orders/getcustomerorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    productOrderDetail(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading({ title: "加载中" })
            this.base({ url: this.HOST_URL + "api/orders/getdetail/", data: data, })
            .then(res => {
                wx.hideLoading()
                resolve(res)
            })
            .catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }
    /**
     * @method 2 获取指定产品详情
     * @param 
        id
        fields
    */
    productGetItemDetail(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/products/getdetail/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


}


module.exports = dbSystem