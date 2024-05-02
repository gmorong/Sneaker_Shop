const Router = require('express')
const router = new Router()
const goodsController = require('../controllers/goodsController')
const checkRole = require('../middleware/checkroleMiddleware')

router.post('/', checkRole('ADMIN'), goodsController.create)
router.get('/', goodsController.getAll)
router.get('/:id', goodsController.getOne)

module.exports = router