

// import dbFather from '../db/db_6_seller.js'

var product = require('./wm/product.js')
class db {
    constructor() {
        this.product = new product()
    }

}


module.exports = new db()