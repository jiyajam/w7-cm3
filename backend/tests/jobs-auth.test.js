const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Job = require("../models/jobModel")
const User = require("../models/userModel")

const jobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    description: "Develop and maintain web applications using modern frameworks.",
    company: {
      name: "TechNova Solutions",
      contactEmail: "hr@technova.com",
      size: 250,
    },
    location: {
      city: "San Francisco",
      state: "CA",
    },
    salary: 120000,
    experienceLevel: "Mid",
    postedDate: new Date(),
    status: "open",
    applicationDeadline: new Date("2026-01-15"),
    requirements: ["JavaScript", "React", "Node.js", "MongoDB"],
  }
]

let token = null
let user = null

beforeAll(async () => {
  await User.deleteMany({})
  await Job.deleteMany({})

  const res = await api.post("/api/users/signup").send({
    name: "Test User",
    username: "testuser",
    password: "Password123!",
    phone_number: "+358401234567",
    gender: "Female",
    date_of_birth: new Date("1995-04-12"),
    address: {
      street: "Keskuskatu 10",
      city: "Helsinki",
      zipCode: "00100"
    }
  }).expect(201)

  token = res.body.token
  user = await User.findOne({ username: "testuser" })
})

beforeEach(async () => {
  await Job.deleteMany({})
  await Job.insertMany(
    jobs.map(job => ({
      ...job,
      user_id: user._id
    }))
  )
})

//Get all jobs
describe("Protected Job Routes", () => {
  it("should return all jobs with a valid token", async () => {
    const res = await api
      .get("/api/jobs")
      .set("Authorization", "Bearer " + token)
      .expect(200)

    expect(res.body).toHaveLength(jobs.length)
  })

  it("should return 401 if no token is provided", async () => {
    await api.get("/api/jobs").expect(401)
  })
//POST /create job
  it("should create one job with a valid token", async () => {
    const newJob = {
      title: "Data Analyst",
      type: "Contract",
      description: "Analyze datasets and generate insights for business decisions.",
      company: {
        name: "Insight Analytics",
        contactEmail: "jobs@insightanalytics.com",
        size: 80,
      },
      location: {
        city: "New York",
        state: "NY",
      },
      salary: 70000,
      experienceLevel: "Entry",
      postedDate: new Date(),
      status: "open",
      applicationDeadline: new Date("2026-02-01"),
      requirements: ["SQL", "Python", "Excel", "Data Visualization"],
    }

    const res = await api
      .post("/api/jobs")
      .set("Authorization", "Bearer " + token)
      .send(newJob)
      .expect(201)

    expect(res.body.title).toBe(newJob.title)
  })
//GET /job by id
  it("should return one job by ID", async () => {
    const job = await Job.findOne()
    const res = await api
      .get(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)

    expect(res.body.title).toBe(job.title)
  })

  it("should update one job by ID with a valid token", async () => {
    const job = await Job.findOne()
    const updatedJob = { type: "Full-Time" }

    const res = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedJob)
      .expect(200)

    expect(res.body.type).toBe(updatedJob.type)

    const updatedJobCheck = await Job.findById(job._id)
    expect(updatedJobCheck.type).toBe(updatedJob.type)
  })
//DELETE /job by id
  it("should delete one job by ID", async () => {
    const job = await Job.findOne()
    await api
      .delete(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204)

    const jobCheck = await Job.findById(job._id)
    expect(jobCheck).toBeNull()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
