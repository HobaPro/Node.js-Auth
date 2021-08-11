const router = require('express').Router();

const homeController = require('../controllers/home.controller');
const authController = require('../controllers/auth.controllers')

router.get('/', homeController.getHome)

router.get('/:id', authController.getProfile)

module.exports = router;