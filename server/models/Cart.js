const {Schema, model} = require('mongoose')

const schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    amount: { type: String, required: true},
    price: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('Cart', schema)