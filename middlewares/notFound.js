const notFound = (req, res)=>{
    res.status(404).send('Page doesnot extist')
}

module.exports = notFound