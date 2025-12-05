import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditJobPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Form state
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Full-Time')
  const [description, setDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [locationCity, setLocationCity] = useState('')
  const [locationState, setLocationState] = useState('')
  const [salary, setSalary] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('Entry')
  const [applicationDeadline, setApplicationDeadline] = useState('')
  const [requirements, setRequirements] = useState('')

  // Fetch job by ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token') // JWT token
        const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // include auth header
          },
        })

        if (!res.ok) throw new Error('Failed to fetch job')
        const data = await res.json()

        setTitle(data.title || '')
        setType(data.type || 'Full-Time')
        setDescription(data.description || '')

        setCompanyName(data.company?.name || '')
        setContactEmail(data.company?.contactEmail || '')
        setCompanySize(data.company?.size || '')

        setLocationCity(data.location?.city || '')
        setLocationState(data.location?.state || '')

        setSalary(data.salary || '')
        setExperienceLevel(data.experienceLevel || 'Entry')

        setApplicationDeadline(
          data.applicationDeadline ? data.applicationDeadline.split('T')[0] : ''
        )

        setRequirements(data.requirements || '')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  // Submit update
  const submitForm = async (e) => {
    e.preventDefault()

    const updatedJob = {
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
      applicationDeadline,
      requirements,
    }

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token // JWT token
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 🔑 token included
        },
        body: JSON.stringify(updatedJob),
      })

      if (!res.ok) throw new Error('Failed to update job')

      navigate(`/jobs/${id}`)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='create'>
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        {/* ... all your form fields remain the same ... */}
        <label>Job Title:</label>
        <input
          type='text'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Job Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='Full-Time'>Full-Time</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Remote'>Remote</option>
          <option value='Internship'>Internship</option>
        </select>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3>Company Info</h3>
        <label>Company Name:</label>
        <input
          type='text'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type='email'
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Company Size:</label>
        <input
          type='text'
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
        />

        <h3>Location</h3>
        <label>City:</label>
        <input
          type='text'
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
        />
        <label>State:</label>
        <input
          type='text'
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
        />

        <h3>Job Details</h3>
        <label>Salary:</label>
        <input
          type='text'
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label>Experience Level:</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}>
          <option value='Entry'>Entry</option>
          <option value='Mid'>Mid</option>
          <option value='Senior'>Senior</option>
        </select>
        <label>Application Deadline:</label>
        <input
          type='date'
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />
        <label>Requirements:</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <button>Update Job</button>
      </form>
    </div>
  )
}

export default EditJobPage
