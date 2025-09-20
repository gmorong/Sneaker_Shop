const uuid = require('uuid')
const path = require('path');
const {Goods, GoodsInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class GoodsController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, min_amount, rem_stock, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const goods = await Goods.create({name, price, brandId, typeId, min_amount, rem_stock, img: fileName})

            if(info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    GoodsInfo.create({
                        title: i.title,
                        description: i.description,
                        goodId: goods.id
                    })
                )
            }

            return res.json(goods)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let {brandId, typeId, limit, page, name} = req.query

        let offset = page * limit - limit
        let goods;
        
        if (name){
            if (!brandId && !typeId) {
                goods = await Goods.findAndCountAll({where:{name}, limit, offset})
            }
            if (brandId && !typeId) {
                goods = await Goods.findAndCountAll({where:{name, brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                goods = await Goods.findAndCountAll({where:{name, typeId}, limit, offset})
            }
            if (brandId && typeId) {
                goods = await Goods.findAndCountAll({where:{name, typeId, brandId}, limit, offset})
            }
        }else {
            if (!brandId && !typeId) {
                goods = await Goods.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                goods = await Goods.findAndCountAll({where:{brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                goods = await Goods.findAndCountAll({where:{typeId}, limit, offset})
            }
            if (brandId && typeId) {
                goods = await Goods.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
        }

        return res.json(goods)
    }

    async getOne (req, res) {
        const {id} = req.params
        const goods = await Goods.findOne(
            {
                where: {id},
                include: [{model:GoodsInfo, as: 'info'}]
            }
        )
        return res.json(goods)
    }

    async getOneChangeMin (req, res) {
        const id = parseInt(req.body.id)
        const size = parseInt(req.body.size)

        console.log(id, size)

        const goods = await Goods.findOne(
            {
                where: {id: id},
            }
        )

        goods.min_amount = goods.min_amount + size 

        goods.save()

        return res.json(goods)
    }

    async getOneChangeRem (req, res) {
        const id = parseInt(req.body.id)
        const size = parseInt(req.body.size)

        const goods = await Goods.findOne(
            {
                where: {id: id},
            }
        )

        goods.rem_stock = goods.rem_stock + size 

        goods.save()

        return res.json(goods)
    }

    async delete(req, res, next) {
        try{
            const {name} = req.query
            const goods = await Goods.findOne({where:{name: name}})
            Goods.destroy({where: {name: name}})
            return res.json(goods)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update (req, res, next) {

    }
}

module.exports = new GoodsController()