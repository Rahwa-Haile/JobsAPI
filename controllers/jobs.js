const {StatusCodes} = require('http-status-codes')
const Job = require('../models/Job')

const getAllJobs = (req, res)=>{
    res.send('get jobs')
}
const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const getJob = (req, res)=>{
    res.send('get a job')
}
const updateJob = (req, res)=>{
    res.send('update a job')
}
const deleteJob = (req, res)=>{
    res.send('delete a job')
}


module.exports = {
    createJob,
    getJob,
    getAllJobs,
    updateJob,
    deleteJob
}