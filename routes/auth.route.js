const router = require('express').Router();

const authController = require('../controllers/auth.controllers');


router.get('/signin', authController.getSignIn);
router.post('/signin', authController.postSignIn);

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);

module.exports = router;