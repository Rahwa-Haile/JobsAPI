const {StatusCodes} = require('http-status-codes')

const getAllJobs = (req, res)=>{
    res.send('get jobs')
}
const createJob = (req, res)=>{
    
    res.status(StatusCodes.CREATED).json(req.user)
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