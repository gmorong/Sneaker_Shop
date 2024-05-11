const {Basket, BasketGoods, Goods} = require('../models/models');

const ApiError = require('../error/ApiError');

class BasketController {

    async getAll (req, res) {
        
        const userId = req.body.userId

        const basket = await Basket.findOne({where: {userId: userId}})
        const id = basket.id
        const basketUser = await BasketGoods.findAll({where: {basketId: id}})

        return res.json(basketUser)
    }

    async addGoods (req, res) {
        const userId = req.body.userId
        const goodId = req.body.goodId
        const basket = await Basket.findOne({where: {userId: userId}})
        const id = basket.id
        const basketGoods = await BasketGoods.create({basketId: id, goodId: goodId})
        return res.json(basketGoods)
    }
}

module.exports = new BasketController()