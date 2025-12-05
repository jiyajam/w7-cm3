const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");

// Sample job data structure matching your Schema/Controller
const sampleJob = {
  title: "Backend Engineer",
  type: "Full-time",
  description: "Building scalable APIs",
  company: {
    name: "DevCorp",
    contactEmail: "jobs@devcorp.com",
    size: "50",
  },
  location: {
    city: "Tampere",
    state: "Pirkanmaa",
  },
  salary: 4500,
  experienceLevel: "Mid",
  requirements: ["Express", "MongoDB", "Jest"],
  postedDate: new Date(),
  status: "open",
};

beforeEach(async () => {
  await Job.deleteMany({});
});

describe("Job Routes (No Auth)", () => {
  // --- POST TESTS ---
  describe("POST /api/jobs", () => {
    it("should create a new job successfully", async () => {
      const response = await api
        .post("/api/jobs")
        .send(sampleJob)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe(sampleJob.title);
      expect(response.body.company.name).toBe(sampleJob.company.name);

      // Verify it exists in the database
      const jobsAtEnd = await Job.find({});
      expect(jobsAtEnd).toHaveLength(1);
    });

    it("should return 500 if required fields are missing", async () => {
      // Sending empty object to trigger validation/creation error
      await api.post("/api/jobs").send({}).expect(500);
    });
  });

  // --- GET ALL TESTS ---
  describe("GET /api/jobs", () => {
    it("should return all jobs as JSON", async () => {
      // Seed DB with one job
      await Job.create(sampleJob);

      const response = await api
        .get("/api/jobs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe(sampleJob.title);
    });

    it("should return empty array if no jobs exist", async () => {
      const response = await api.get("/api/jobs").expect(200);
      expect(response.body).toEqual([]);
    });
  });

  // --- GET BY ID TESTS ---
  describe("GET /api/jobs/:id", () => {
    it("should return a specific job by ID", async () => {
      const createdJob = await Job.create(sampleJob);

      const response = await api
        .get(`/api/jobs/${createdJob._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(sampleJob.title);
      expect(response.body._id).toBe(createdJob._id.toString());
    });

    it("should return 400 for invalid MongoDB ID format", async () => {
      await api.get("/api/jobs/123-bad-id").expect(400);
    });

    it("should return 404 if job ID is valid but does not exist", async () => {
      const validNonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/jobs/${validNonExistentId}`).expect(404);
    });
  });

  // --- DELETE TESTS ---
  describe("DELETE /api/jobs/:id", () => {
    it("should delete a job successfully", async () => {
      const createdJob = await Job.create(sampleJob);

      await api.delete(`/api/jobs/${createdJob._id}`).expect(200);

      const jobInDb = await Job.findById(createdJob._id);
      expect(jobInDb).toBeNull();
    });

    it("should return 400 for invalid ID", async () => {
      await api.delete("/api/jobs/bad_id").expect(400);
    });

    it("should return 404 if trying to delete non-existent job", async () => {
      const validNonExistentId = new mongoose.Types.ObjectId();
      await api.delete(`/api/jobs/${validNonExistentId}`).expect(404);
    });
  });

  // --- PUT TESTS ---
  describe("PUT /api/jobs/:id", () => {
    // NOTE: This test expects the Controller to be fixed.
    // Currently, your controller sends text "updateJob" and stops.
    it("should update an existing job", async () => {
      const createdJob = await Job.create(sampleJob);
      const updates = {
        title: "Senior Backend Engineer",
        salary: 6000,
      };

      console.log(`_id: ${createdJob._id}`);

      const response = await api
        .put(`/api/jobs/${createdJob._id}`)
        .send(updates)
        .expect(200)
        // Ensure we get JSON back, not the "updateJob" text
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(updates.title);
      expect(response.body.salary).toBe(updates.salary);

      // Verify persistence
      const jobInDb = await Job.findById(createdJob._id);
      expect(jobInDb.title).toBe(updates.title);
    });

    it("should return 404 when updating non-existent job", async () => {
      // This test might fail until you fix req.prams.id typo in controller
      const validNonExistentId = new mongoose.Types.ObjectId();
      await api
        .put(`/api/jobs/${validNonExistentId}`)
        .send({ title: "New" })
        .expect(404);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
