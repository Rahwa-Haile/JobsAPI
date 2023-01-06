const getAllJobs = (req, res)=>{
    res.send('get jobs')
}
const createJob = (req, res)=>{
    res.send('create a job')
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