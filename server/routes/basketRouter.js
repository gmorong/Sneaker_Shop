const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')

router.post('/', BasketController.addGoods)
router.post('/get', BasketController.getAll)
router.delete('/', )

module.exports = router