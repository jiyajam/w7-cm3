# V1 Self-Assessment – Swostika

## Evaluation of Quality and Functionality
The V1 implementation delivers a fully functional RESTful API for job management, covering all CRUD operations. The backend follows a clean Node.js/Express/Mongoose structure, while the frontend successfully consumes these endpoints for job listing and deletion. 

### Quality Highlights
- **Robust Schema Design**
  - Structured `jobModel.js` with scalable fields.
  - Applied validation rules for required fields.
- **Complete CRUD Implementation**
  - Implemented `getAllJobs`, `getJobById`, `createJob`, `updateJob`, `deleteJob`. But i specifically implemented getAllJobs and deteJob by id.
  - Controllers aligned with proper HTTP methods.
- **Error Handling & Validation**
  - Used `mongoose.Types.ObjectId.isValid()` for safe ID checks.
  - Standardized error responses with 400, 404, and 500 codes.
- **Frontend Integration**
  - Connected backend endpoints to frontend components.
  - Built UI flows for job listing and deletion.
  - Verified functionality via Postman and frontend testing.


### Areas for Improvement
- Testing which i wrote had some issues so forfurther analysis puntawat did update so, work more in testing.
- Learn more Middleware handling 

### Challenges Faced and How I Overcame Them
- **Invalid MongoDB IDs** → Used `mongoose.Types.ObjectId.isValid()` to prevent crashes and return proper 404s.  
- **Returning Updated Documents** → Added  `findOneAndUpdate` for correct updated responses.  
- **Maintaining Organization** → Structured controllers and imports cleanly to keep files readable.

### Reflection on What I Learned
- Strengthened understanding of RESTful API design and stateless controllers.  
- Learned how schema design impacts scalability and clarity.  
- Gained experience in frontend-backend integration and backend workflows. 

---

# V2 Self-Assessment – Swostika

## Evaluation of Quality and Functionality
The V2 implementation extends V1 by introducing secure user authentication and authorization. It adds signup/login flows, JWT-based token management, and protected routes. The frontend integrates authentication, enabling users to sign up, log in, and perform protected job operations. Deployment to Render ensures separation of environments with a dedicated database.

### Quality Highlights
- **User Schema Design**
  - Designed `userModel.js` with nested fields (e.g., `address`).
  - Applied validation for secure and consistent user data.
- **Authentication Controllers**
  - **Signup**: Validates inputs, hashes passwords with `bcryptjs`, stores users securely.
  - **Login**: Verifies credentials, issues JWT tokens with expiration.
  - **getMe**: Returns authenticated user data for protected routes.
- **JWT Token System**
  - Implemented reusable `generateToken()` function.
  - Configured token expiration (3 days).
  - Secured sensitive endpoints with JWT verification.
- **User Routes**
  - Defined `POST /signup`, `POST /login`.
- **Frontend Integration**
  - Built Signup and Login pages with form validation.
  - Integrated JWT authentication into frontend workflows.
  - Implemented protected route logic (e.g., delete job requires login).

 
### Areas for Improvement
- Middleware could be expanded to centralize validation and error handling.  
- Token refresh functionality could be added for longer sessions.  
- Frontend error messages could be made more descriptive for failed login/signup attempts.

### Challenges Faced and How I Overcame Them
- **Password Security** → Used `bcryptjs` with `genSalt` + `hash` for secure storage.  
- **JWT Integration** → Implemented `jsonwebtoken` with reusable token generation.  
- **Protected Routes** → Applied middleware to enforce authentication before allowing job deletion or updates.  

### Reflection on What I Learned
- Deepened understanding of authentication and authorization principles.  
- Learned how to secure APIs with JWT and middleware.  
- Strengthened skills in frontend-backend integration for authentication flows.  
- Improved ability to write tests for secure systems using Jest/Supertest.  

---

👤 **Contributor:** Swostika
