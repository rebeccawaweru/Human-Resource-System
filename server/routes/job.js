const express = require('express')
const router = express.Router()
const {findJob,newJob,getJob, getJobs,updateJob, deleteJob} = require('../controllers/job')

router.route('/newjob').post(newJob);
router.route('/findjob').post(findJob)
router.route('/job/:id').get(getJob).patch(updateJob);
router.route('/jobs').get(getJobs);
router.route('/deletejob/:id').delete(deleteJob)
module.exports = router;

