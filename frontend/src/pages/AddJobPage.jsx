import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [salary, setSalary] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [applicationDeadline, setApplicationDeadline] = useState(new Date());
  const [requirements, setRequirements] = useState("");
  const navigate = useNavigate();

  const setCompanySizeRaw = (e) => {
    // replace non-numeric characters
    const rawValue = e.target.value.replace(/\D/g, "");
    setCompanySize(rawValue);
  };

  const setSalaryRaw = (e) => {
    // replace non-numeric characters
    const rawValue = e.target.value.replace(/\D/g, "");
    setSalary(rawValue);
  };

  // const jobSchema = new mongoose.Schema({
  //   title: { type: String, required: true },
  //   type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  //   description: { type: String, required: true },
  //   company: {
  //     name: { type: String, required: true },
  //     contactEmail: { type: String, required: true },
  //     size: { type: Number }, // Number of employees
  //   },
  //   location: {
  //     city: { type: String, required: true },
  //     state: { type: String, required: true },
  //   },
  //   salary: { type: Number, required: true }, // e.g., Annual or hourly salary
  //   experienceLevel: {
  //     type: String,
  //     enum: ['Entry', 'Mid', 'Senior'],
  //     default: 'Entry'
  //   }, // Experience level
  //   postedDate: { type: Date, default: Date.now }, // Date the job was posted
  //   status: {
  //     type: String,
  //     enum: ['open', 'closed'],
  //     default: 'open'
  //   }, // Job status (open/closed)
  //   applicationDeadline: { type: Date }, // Deadline for job applications
  //   requirements: [String], // List of required skills or qualifications
  // });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("submitForm called");
    try {
      const requirementsParts = requirements
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          type,
          description,
          company: {
            name: companyName,
            contactEmail,
            size: companySize,
          },
          location: {
            city: locationCity,
            state: locationState,
          },
          salary,
          experienceLevel,
          postedDate: new Date(),
          applicationDeadline,
          requirements: requirementsParts,
        }),
      });
      const jsonData = await response.json();
      if (response.status !== 201) {
        throw new Error(`Job not created: ${jsonData.error}`);
      }
      console.log(jsonData);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const toDateInputValue = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Company Size:</label>
        <input type="text" value={companySize} onChange={setCompanySizeRaw} />
        <label>Location City:</label>
        <input
          type="text"
          required
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
        />
        <label>Location State:</label>
        <input
          type="text"
          required
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
        />
        <label>Salary:</label>
        <input type="text" required value={salary} onChange={setSalaryRaw} />
        <label>Experience Level:</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="" disabled>
            --choose an option--
          </option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <label>Application Deadline:</label>
        <input
          type="date"
          value={toDateInputValue(applicationDeadline)}
          onChange={(e) => setApplicationDeadline(new Date(e.target.value))}
        />
        <label>Requirements (comma separated):</label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
