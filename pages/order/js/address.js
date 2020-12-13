
var app = getApp()
module.exports = Behavior({
    data: {
        PickTime: app.utils.currentTime
    },

    created() { },
    attached() { },
    detached() { },
    ready() {
        console.log(this.data.config,'11')
    },
    methods: {
        async getAddress(){
            var res = await app.db.product.productGetShipAddrs()
            if (res.data.length > 0) {
                var index = wx.getStorageSync(app.db.product.KEY_ORDER_PRE_ADDRESS) || 0
                this.setData({ currentAddress: res.data[index] })
            }
            //TODO 打开地址
        },

        
        choosAddress() { 
            
            wx.chooseAddress({
                success:res=> {
                    this.setData({ address : res })
                    console.log(res.userName)
                    console.log(res.postalCode)
                    console.log(res.provinceName)
                    console.log(res.cityName)
                    console.log(res.countyName)
                    console.log(res.detailInfo)
                    console.log(res.nationalCode)
                    console.log(res.telNumber)
                }
            })
         },	


        TimeChange(e) { this.setData({ PickTime: e.detail.value }) },
    },
})