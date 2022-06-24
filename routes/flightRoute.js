const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/getflight', controller.single)
router.get('/getallflight',controller.all)
router.post('/bookflight',controller.book)
router.put('updateflight', controller.update)
router.delete('deleteflight',controller.delete)


module.exports = router;

