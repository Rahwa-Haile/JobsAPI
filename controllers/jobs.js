const createJob = (req, res)=>{
    res.send('create a job')
}
const getJob = (req, res)=>{
    res.send('get a job')
}
const getJobs = (req, res)=>{
    res.send('get jobs')
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
    getJobs,
    updateJob,
    deleteJob
}