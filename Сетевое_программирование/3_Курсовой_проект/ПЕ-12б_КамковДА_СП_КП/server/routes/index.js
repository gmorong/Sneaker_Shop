const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const goodsRouter = require('./goodsRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/users', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/goods', goodsRouter)
router.use('/basket', basketRouter)

module.exports = router