const Job = require('../models/jobModel')
const mongoose = require('mongoose')

// GET /jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

// POST /jobs
const createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      company,
      location,
      salary,
      experienceLevel,
      postedDate,
      status,
      applicationDeadline,
      requirements,
    } = req.body
    const userId = req.user._id
    const job = await Job.create({
      title,
      type,
      description,
      company: {
        name: company.name,
        contactEmail: company.contactEmail,
        size: company.size,
      },
      location: {
        city: location.city,
        state: location.state,
      },
      salary,
      experienceLevel,
      postedDate,
      status,
      applicationDeadline,
      requirements,
      userId,
    })
    res.status(201).json(job)
  } catch (err) {
    res.status(500).json({ error: `Cannot create job: ${err.message}` })
  }
}

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  const { jobId } = req.params
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' })
  }
  try {
    const job = await Job.findById(jobId)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve job' })
  }
}

// PUT /jobs/:jobId
const updateJob = async (req, res) => {
  const { jobId } = req.params
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ error: 'Invalid job ID' })
  }
  try {
    const userId = req.user._id
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, userId }, // only owner can update
      { ...req.body },
      { new: true, runValidators: true }
    )
    if (!updatedJob)
      return res.status(404).json({ message: 'Job not found or unauthorized' })
    res.status(200).json(updatedJob)
  } catch (error) {
    console.error('Error updating job:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  const { jobId } = req.params
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' })
  }
  try {
    const userId = req.user._id
    const deletedJob = await Job.findOneAndDelete({ _id: jobId, userId })
    if (!deletedJob)
      return res.status(404).json({ message: 'Job not found or unauthorized' })
    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' })
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
}
