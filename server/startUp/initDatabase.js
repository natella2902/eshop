// 1. У любого пользователя будет как минимум в БД qualities & professions
// 2. Они равны mock данным
const Profession = require('../models/Profession')
const Quality = require('../models/Quality')
const Product = require('../models/Products')
const Tag = require('../models/Tag')
const Cart = require('../models/Cart')
const professionMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')
const productsMock = require('../mock/products.json')
const tagsMock = require('../mock/tags.json')
const cartMock = require('../mock/cart.json')

module.exports = async () => {
  const professions = await Profession.find()
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock)
  }

  const qualities = await Quality.find()
  if (qualities.length !== professionMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }

  const products = await Product.find()
  if(products.length !== productsMock.length) {
    await createInitialEntity(Product, productsMock)
  }

  const tags = await Tag.find()
  if(tags.length !== tagsMock.length) {
    await createInitialEntity(Tag, tagsMock)
  }

  const cart = await Cart.find()
  if(cart.length !== cartMock.length) {
    await createInitialEntity(Cart, cartMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}