const {StatusCodes} = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req, res)=>{
    const {userId} = req.user
    const jobs = await Job.find({ createdBy: userId }).sort('-createdAt')

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const getJob = async (req, res)=>{
    const {user: {userId}, params: {id: jobId}} = req
    const job = await Job.findOne({ _id: jobId, createdBy: userId })
    if(!job){
        throw new NotFoundError(`No such job with an id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const updateJob = async (req, res)=>{
    const { body: { company, position}, user: {userId}, params: {id: jobId}} = req

    if(!company || !position){
        throw new BadRequestError('company name and position must be provided')
    }
    const job = await Job.findOneAndUpdate({ createdBy: userId , _id: jobId }, req.body, {new: true, runValidators: true})
    if(!job){
        throw new NotFoundError(`No such job with an id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
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