require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"], // change if needed
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// MongoDB URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("Job_Management");
    const jobsCollection = db.collection("demoJobs");
    const applicationsCollection = db.collection("applications");

    // Home route
    app.get('/', (req, res) => {
      res.send('Hello Developer 🚀');
    });

    // =========================
    // JOB ROUTES
    // =========================

    // Post a Job
    app.post("/post-job", async (req, res) => {
      try {
        const body = req.body;
        body.createdAt = new Date();

        const result = await jobsCollection.insertOne(body);

        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to post job" });
      }
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollection.find({}).toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: "Error fetching jobs" });
      }
    });

    // Get single job
    app.get("/all-jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid Job ID" });
        }

        const job = await jobsCollection.findOne({ _id: new ObjectId(id) });

        if (!job) {
          return res.status(404).send({ message: "Job not found" });
        }

        res.send(job);
      } catch (error) {
        res.status(500).send({ message: "Error fetching job" });
      }
    });

    // Get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const jobs = await jobsCollection.find({ postedBy: email }).toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: "Error fetching user jobs" });
      }
    });

    // Delete job
    app.delete("/job/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid Job ID" });
        }

        const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error deleting job" });
      }
    });

    // Update job
    app.patch("/update-job/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid Job ID" });
        }

        const updateData = req.body;

        const result = await jobsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error updating job" });
      }
    });

    // =========================
    // APPLICATION ROUTES
    // =========================

    // Apply to a job
    app.post("/apply-job", async (req, res) => {
      try {
        const { jobId, email, resumeLink } = req.body;

        if (!jobId || !email) {
          return res.status(400).send({ message: "Missing fields" });
        }

        const application = {
          jobId,
          email,
          resumeLink,
          createdAt: new Date()
        };

        const result = await applicationsCollection.insertOne(application);

        res.status(201).send({
          message: "Application submitted successfully",
          result
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error applying for job" });
      }
    });

    // Get applications by email
    app.get("/applications/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const applications = await applicationsCollection
          .find({ email })
          .toArray();

        res.send(applications);
      } catch (error) {
        res.status(500).send({ message: "Error fetching applications" });
      }
    });

    // MongoDB ping
    await client.db("admin").command({ ping: 1 });
    console.log("📡 MongoDB Ping Successful");

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

run();

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});