const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkroleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.delete('/', checkRole('ADMIN'), userController.delete)
router.post('/', checkRole('ADMIN'), userController.change)
router.post('/user', checkRole('ADMIN'), userController.changeUser)
router.post('/admin', checkRole('ADMIN'), userController.changeAdmin)
router.post('/unlog', authMiddleware, userController.logout)

module.exports = router