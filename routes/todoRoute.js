const express = require('express');

const router = express.Router();
const controller = require('../controllers/todoController');


router.get('/getallTasks',controller.get)
router.post('/addTask',controller.add)
router.put('updateTask', controller.update)
router.delete('deleteTask',controller.delete)
router.post('sendEmail', controller.post)

module.exports = router;

