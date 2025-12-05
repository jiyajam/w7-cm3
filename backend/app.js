// require('dotenv').config()
// const express = require('express')
// const app = express()
// const jobRouter = require('./routes/jobRouter')
// const userRouter = require('./routes/userRouter')
// const {
//   unknownEndpoint,
//   errorHandler,
// } = require('./middleware/customMiddleware')
// const connectDB = require('./config/db')
// const cors = require('cors')
// const requireAuth = require('./middleware/requireAuth')

// // Middlewares
// app.use(cors())
// app.use(express.json())

// connectDB()

// // Use the userRouter for all "/user" routes
// app.use('/api/users', userRouter)

// // Use the jobRouter for all "/jobs" routes
// app.use('/api/jobs', jobRouter)

// app.use('/api', unknownEndpoint)

// app.use(errorHandler)

// module.exports = app

// // app.listen(process.env.PORT, () => {
// //   console.log(`Server running on port ${process.env.PORT}`)
// // })
require('dotenv').config()
const express = require('express')
const app = express()
const jobRouter = require('./routes/jobRouter')
const userRouter = require('./routes/userRouter')
const {
  unknownEndpoint,
  errorHandler,
} = require('./middleware/customMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

// Middleware
app.use(cors())
app.use(express.json())

// Connect to database
connectDB()

// API routes
app.use('/api/users', userRouter)
app.use('/api/jobs', jobRouter)

// Unknown API endpoint handler
app.use('/api', unknownEndpoint)

// Error handler
app.use(errorHandler)

// Serve React frontend static files
app.use(express.static('view'))

// SPA fallback for React Router
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html')
})

module.exports = app

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`)
// })
