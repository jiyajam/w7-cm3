**Author:** Puntawat Subhamani **Component Focus:** Job Management (Create/Post) & Testing

## 1. Code Quality and Functionality Evaluation

### Backend Implementation (`createJob`)

The backend logic is built using a robust `async/await` pattern within an Express controller.

- **Security Integration:** The code explicitly extracts `userId` from `req.user._id`. This indicates that the `createJob` controller is successfully protected by an authentication middleware, ensuring that jobs are strictly associated with the logged-in user.
    
- **Data Integrity:** The controller creates a complex nested object structure (e.g., `company` and `location` objects) before saving to MongoDB. This ensures that the data matches the Mongoose Schema strict typing.
    
- **Error Handling:** A `try/catch` block is used to catch database errors, returning a standard 500 status code if the creation fails.
    

### Frontend Implementation (`AddJobPage`)

The frontend is a React functional component utilizing **Controlled Forms**.

- **State Management:** The form uses individual `useState` hooks for every field. While verbose, this provides granular control over every input.
    
- **Input Sanitization:** A proactive approach was taken for numeric fields (Salary and Company Size). The `setSalaryRaw` and `setCompanySizeRaw` functions use Regex (`/\D/g`) to strip non-numeric characters immediately, preventing type-mismatch errors when sending data to the backend.
    
- **API Integration:** The `submitForm` function correctly retrieves the JWT token from `localStorage` and attaches it to the `Authorization` header (`Bearer token`). This is critical for passing the backend security checks.
    

### Testing Suite (`v1-test`)

The testing suite uses **Jest** and **Supertest** for integration testing.

- **Coverage:** The tests cover the full CRUD lifecycle (Create, Read, Update, Delete).
    
- **Database Isolation:** The `beforeEach` hook cleans the database before every test, ensuring that tests run in isolation and do not produce false positives/negatives based on previous data.
    
- **Edge Case Handling:** The tests explicitly check for failure scenarios, such as 400 (Invalid ID) and 404 (ID valid but not found), ensuring the API handles errors gracefully.
    

## 2. Challenges Faced and Solutions

### Challenge 1: Handling Data Types Mismatch

**The Issue:** The backend Mongoose schema expects `salary` and `company.size` to be Numbers, but HTML input forms return Strings by default. Sending strings caused validation errors on the server. **The Solution:** I implemented custom handler functions (`setSalaryRaw`) in the React frontend. These handlers sanitise the input in real-time using Regex to remove non-numeric characters, ensuring only clean data is sent to the backend.

## 3. Professional Reflection

Developing this feature provided significant insight into the **Full Stack Development Cycle**.

1. **The Importance of Integration Testing:** Writing the `v1-test` suite taught me that unit tests aren't enough. Testing the actual HTTP endpoints using Supertest revealed bugs in the `jobController` (specifically a parameter naming mismatch) that static code analysis missed.
    
2. **State Management:** I learned that managing form state in React requires careful planning. While individual states work for small forms, I realized that for larger forms like this one, using a single object state or a library like Formik might reduce boilerplate code in the future.
    
3. **Schema Design:** Working with Mongoose schemas forced me to think about data structure upfront. I learned that the shape of the data on the Frontend (React state) must be carefully mapped to the shape of the Backend (Mongoose Model) to avoid "Validation Failed" errors.
