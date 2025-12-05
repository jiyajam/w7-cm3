const Job = require("../models/jobModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

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
    } = req.body;
    const response = await Job.create({
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
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: `Cannot create job: ${err.message}` });
  }
};

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findById(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job" });
  }
};

// PUT /jobs/:jobId

const updateJob = async (req, res) => {
  // res.send("updateJob");
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobId },
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (job) {
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
