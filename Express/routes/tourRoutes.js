const express = require('express');
const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('./../controllers/tourController');
const router = express.Router();

router.param('id', checkId);

// Routes for tours
router.route('/').get(getAllTours).post(checkBody, addNewTour);
router
  .route('/:id')
  .get(getTour)
  .patch(checkBody, updateTour)
  .delete(deleteTour);

module.exports = router;
