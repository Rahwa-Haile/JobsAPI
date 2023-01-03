const express = require('express')
const router = express.Router()
const { createJob, getJob, getJobs, updateJob, deleteJob } = require('../controllers/jobs')

router.route('/jobs').post(createJob).get(getJobs)
router.route('/jobs/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router