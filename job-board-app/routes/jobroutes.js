const express = require('express');
const router = express.Router();
const path = require('path');
const jobController = require(path.join(__dirname, '../controllers/jobController'));

router.get('/', jobController.getJobs);
router.post('/post', jobController.createJob);

module.exports = router;