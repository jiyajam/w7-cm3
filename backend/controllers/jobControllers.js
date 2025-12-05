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
  res.send("getJobById");
};

// PUT /jobs/:jobId
const updateJob = async (req, res) => {
  res.send("updateJob");
};

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
