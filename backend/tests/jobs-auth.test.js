const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Job = require("../models/jobModel"); // Import Job model

const users = [
  {
    name: "Alice Johnson",
    username: "alicej",
    password: "Password123!",
    phone_number: "+358401234567",
    gender: "Female",
    date_of_birth: new Date("1995-04-12"),
    address: {
      street: "Keskuskatu 10",
      city: "Helsinki",
      zipCode: "00100",
    },
  },
];

// Sample job data for testing
const sampleJob = {
  title: "Software Developer",
  type: "Full-time",
  description: "Develop amazing apps",
  company: {
    name: "Tech Solutions",
    contactEmail: "hr@techsolutions.com",
    size: "50",
  },
  location: {
    city: "Espoo",
    state: "Uusimaa",
  },
  salary: 5000,
  experienceLevel: "Mid",
  requirements: ["Node.js", "React"],
};

beforeEach(async () => {
  // Clear both Users and Jobs before every test to ensure isolation
  await User.deleteMany({});
  await Job.deleteMany({});
});

describe("Job Routes", () => {
  let token;
  let user;

  // Helper to create a user and get token before job tests
  beforeEach(async () => {
    const response = await api.post("/api/users/signup").send(users[0]);
    token = response.body.token;
    // We fetch the user from DB to get the _id for manual association if needed
    user = await User.findOne({ username: users[0].username });
  });

  describe("POST /api/jobs", () => {
    it("should create a new job when authenticated", async () => {
      const response = await api
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`) // Assuming Bearer auth scheme
        .send(sampleJob)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // Verify response structure
      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe(sampleJob.title);
      expect(response.body.company.name).toBe(sampleJob.company.name);

      // Verify job is actually in database
      const jobsAtEnd = await Job.find({});
      expect(jobsAtEnd).toHaveLength(1);
      expect(jobsAtEnd[0].title).toBe(sampleJob.title);
    });

    it("should fail with 401/403 if token is missing", async () => {
      await api.post("/api/jobs").send(sampleJob).expect(401); // Or 403 depending on your auth middleware setup
    });

    it("should fail with 500 if required fields are missing", async () => {
      // Sending empty object to trigger validation error
      await api
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(500);
    });
  });

  describe("GET /api/jobs", () => {
    it("should retrieve all jobs (public access)", async () => {
      // Create a job directly in DB first
      const job = new Job({ ...sampleJob, userId: user._id });
      await job.save();

      const response = await api
        .get("/api/jobs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe(sampleJob.title);
    });
  });

  describe("GET /api/jobs/:id", () => {
    it("should retrieve a specific job by ID (public access)", async () => {
      const job = new Job({ ...sampleJob, userId: user._id });
      const savedJob = await job.save();

      const response = await api.get(`/api/jobs/${savedJob._id}`).expect(200);

      expect(response.body.title).toBe(sampleJob.title);
    });

    it("should return 400 for invalid mongo ID", async () => {
      await api.get("/api/jobs/123-invalid-id").expect(400);
    });

    it("should return 404 if job does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/jobs/${nonExistentId}`).expect(404);
    });
  });

  describe("PUT /api/jobs/:id", () => {
    it("should update a job if the user is the owner", async () => {
      const job = new Job({ ...sampleJob, userId: user._id });
      const savedJob = await job.save();

      const updates = { title: "Updated Developer", salary: 6000 };

      const response = await api
        .put(`/api/jobs/${savedJob._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe("Updated Developer");
      expect(response.body.salary).toBe(6000);
    });

    it("should fail (404/Unauthorized) if trying to update someone else's job", async () => {
      // 1. Create a second user and login
      const secondUserRes = await api.post("/api/users/signup").send({
        ...users[0],
        username: "user2",
        name: "User Two",
      });
      const secondToken = secondUserRes.body.token;

      // 2. Original user owns the job
      const job = new Job({ ...sampleJob, userId: user._id });
      const savedJob = await job.save();

      // 3. Second user tries to update it
      // Controller returns 404 because query is { _id: jobId, userId }
      await api
        .put(`/api/jobs/${savedJob._id}`)
        .set("Authorization", `Bearer ${secondToken}`)
        .send({ title: "Hacked Title" })
        .expect(404);

      // Verify it didn't change in DB
      const jobInDb = await Job.findById(savedJob._id);
      expect(jobInDb.title).toBe(sampleJob.title);
    });
  });

  describe("DELETE /api/jobs/:id", () => {
    it("should delete a job if the user is the owner", async () => {
      const job = new Job({ ...sampleJob, userId: user._id });
      const savedJob = await job.save();

      await api
        .delete(`/api/jobs/${savedJob._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const jobInDb = await Job.findById(savedJob._id);
      expect(jobInDb).toBeNull();
    });

    it("should fail (404/Unauthorized) if trying to delete someone else's job", async () => {
      // 1. Create second user
      const secondUserRes = await api.post("/api/users/signup").send({
        ...users[0],
        username: "user2",
        name: "User Two",
      });
      const secondToken = secondUserRes.body.token;

      // 2. Original user owns the job
      const job = new Job({ ...sampleJob, userId: user._id });
      const savedJob = await job.save();

      // 3. Second user tries to delete
      await api
        .delete(`/api/jobs/${savedJob._id}`)
        .set("Authorization", `Bearer ${secondToken}`)
        .expect(404);

      // Verify job still exists
      const jobInDb = await Job.findById(savedJob._id);
      expect(jobInDb).not.toBeNull();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
