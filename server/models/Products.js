const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    price: { type: String, required: true },
    rate: String,
    img: {type: String, required: true},
    text: {type: String, required: true}
}, {
    timestamps: { createdAt: 'created_at' }
})

module.exports = model('Product', schema)