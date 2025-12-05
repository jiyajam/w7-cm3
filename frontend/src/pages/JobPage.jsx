import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const JobPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log('id: ', id)
        const res = await fetch(`/api/jobs/${id}`)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json()
        setJob(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  const onDeleteClick = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {},
      })
      if (!res.ok) {
        throw new Error('Failed to delete job')
      }
      navigate('/')
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  return (
    <div className='job-preview'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Email: {job.company.contactEmail}</p>
          {job.company.size && <p>Company Size: {job.company.size}</p>}
          <p>
            Location: {job.location.city}, {job.location.state}
          </p>
          <p>Salary: {job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Status: {job.status}</p>
          {job.applicationDeadline && (
            <p>
              {' '}
              Application Deadline:{' '}
              {new Date(job.applicationDeadline).toLocaleDateString()}
            </p>
          )}
          {job.requirements && job.requirements.length > 0 && (
            <p>Requirements: {job.requirements.join(', ')}</p>
          )}

          <button onClick={() => onDeleteClick(job._id)}>delete</button>
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>edit</button>
        </>
      )}
    </div>
  )
}

export default JobPage
