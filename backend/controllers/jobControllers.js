const Job = require("../models/jobModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllJobs = async (req, res) => {
  try{
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  }catch(error){
    res.status(500).json({error: "Server Error"})
  }
};

// POST /jobs
const createJob = async (req, res) => {
  res.send("createJob");
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
