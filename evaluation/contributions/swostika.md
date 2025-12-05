# 📌 Week7 Marathon Project – Contributions by Swostika

This README documents my contributions to the **Week7 Marathon Project**, covering both **Phase 1 (API V1 & Frontend V1)** and **Phase 2 (API V2 & Frontend V2)**.  
I worked on **both backend and frontend**, ensuring robust APIs, secure authentication, and smooth integration.

---

## ⚡ Phase 1: API V1 & Frontend V1 (No Authentication)

### 🔗 Repository References
- [feature-getalljobs](https://github.com/jiyajam/w7-cm3/tree/feature-getalljobs)  
- [feature-deleteonebyid](https://github.com/jiyajam/w7-cm3/tree/feature-deleteonebyid)  

### 🛠️ My Core Contributions
- **CRUD Controller Implementation**
  - Developed REST endpoints for job listings.  
  - `getAllJobs`: Retrieve all jobs (sorted by most recent).  
  - `deleteJob`: Safely remove job entries with ID validation.  

- **Schema Architecture (jobModel.js)**
  - Implemented a structured and scalable schema using Mongoose.  

- **Error Handling & Validation**
  - Added validation for required fields during creation.  
  - Used `mongoose.Types.ObjectId.isValid()` for ID-based operations.  
  - Standardized error responses with meaningful HTTP codes (400, 404, 500).  

- **Frontend Integration**
  - Connected backend endpoints (`getAllJobs`, `deleteJob`) with frontend.  
  - Built UI flows for job listing and deletion.  
  - Tested functionality via Postman and frontend integration.  


---

## 🔐 Phase 2: API V2 & Frontend V2 (With Authentication)

### 🔗 Repository References
- [v2-user-auth](https://github.com/jiyajam/w7-cm3/tree/v2-user-auth)  
- [v2-delete-jobs-auth](https://github.com/jiyajam/w7-cm3/tree/v2-delete-jobs-auth)  
- [v2-testing](https://github.com/jiyajam/w7-cm3/tree/v2-testing)  

### 🛠️ My Core Contributions
- **User Schema Design (userModel.js)**
  - Designed a complete user schema including nested fields like `address`.  

- **Authentication Controllers (userControllers.js)**
  - **Signup Controller**: Validates inputs, hashes passwords with `bcryptjs`, stores users securely.  
  - **Login Controller**: Verifies credentials, issues JWT tokens with expiration.  
  - **getMe Controller**: Returns authenticated user data, prepared for JWT-protected routes.  

- **JWT Token System**
  - Implemented reusable `generateToken()` function.  
  - Configured token expiration .  
  - Secured routes with JWT verification.  

- **User Routes (userRouter.js)**
  - Defined authentication endpoints:  
    - `POST /signup`  
    - `POST /login`  
     

- **Frontend Integration**
  - Built **Signup** and **Login** pages with form validation.  
  - Integrated JWT authentication into frontend workflows.  
  - Implemented protected route logic (e.g., delete job requires login).  
  - Connected frontend UI with backend auth APIs for seamless user experience.  


---

## 🌟 Summary of Impact

Across both phases, my contributions ensured:
- Robust **job management API** with proper validation and error handling.  
- Secure **user authentication system** with JWT-based authorization.  
- Comprehensive **backend testing** with Jest/Supertest.  
- Seamless **frontend-backend integration** for job operations and authentication flows.  
- Successful **deployment of both V1 and V2 apps** to Render with separate databases.  

---

👤 **Contributor:** Swostika
