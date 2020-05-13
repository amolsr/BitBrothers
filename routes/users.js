var express = require('express');
const userController = require('../controller/userController')
var router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
