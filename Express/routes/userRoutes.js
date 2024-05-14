const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

// Routes for users
router.route('/').get(userController.getAllUsers).post(userController.addUSer);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUSer)
  .delete(userController.deleteUser);

module.exports = router;
