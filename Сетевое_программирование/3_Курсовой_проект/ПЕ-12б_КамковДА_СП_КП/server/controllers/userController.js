const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Users, Basket} = require('../models/models')
const { json, where } = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SEC_KEY,
        {expiresIn: '1h'}
    )
}

const deletejwt = () => {
    return jwt.destroy()
}

class UserController {
    async registration (req, res, next) {
        const {name, second_name, surname, email, p_number, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Users.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({name, surname, second_name, email, p_number, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.role)

        const basket = await Basket.create({userId: user.id})

        return res.json({token})
    }

    async login (req, res, next) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async delete(req, res, next) {
        try{
            const email = req.body.email
            const user = await Users.findAll({where:{email: email}})
            Users.destroy({where: {email: email}})
            return res.json(user)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async change(req, res, next) {
        try{
            const email = req.body.email
            const user = await Users.findOne({where:{email: email}})
            if(!user){
                return next(ApiError.badRequest(e.message))
            }
            user.role = "WORKER"
            user.save()
            return res.json(user)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeUser(req, res, next) {
        try{
            const email = req.body.email
            const user = await Users.findOne({where:{email: email}})
            if(!user){
                return next(ApiError.badRequest(e.message))
            }
            user.role = "USER"
            user.save()
            return res.json(user)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAdmin(req, res, next) {
        try{
            const email = req.body.email
            const user = await Users.findOne({where:{email: email}})
            if(!user){
                return next(ApiError.badRequest(e.message))
            }
            user.role = "ADMIN"
            user.save()
            return res.json(user)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            deletejwt()
            res.clearCookie()
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()