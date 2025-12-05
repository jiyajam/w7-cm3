# Self-Grading Evaluation

**Student Name:** Puntawat Subhamani

## Grade: **64 / 80**

## Justification

I have evaluated my performance based on the code quality, feature functionality, and the overall workflow process.

### 1. Code Quality and Organization (Points: 34/40)

I believe my code adheres to modern development standards and is well-organized.

- **Backend Structure:** My `jobController` utilizes clean `async/await` patterns with robust `try/catch` error handling to ensure server stability. I effectively used Mongoose schemas to validate complex nested objects (e.g., `company` and `location`).
- **Frontend Logic:** The React code implements strict type guarding (using Regex to sanitize numeric inputs) and successfully manages authentication state via `localStorage` and headers.
- **Testing:** I provided a comprehensive test suite using Jest and Supertest that covers the full CRUD lifecycle, ensuring endpoint reliability.

### 2. Completion of Assigned Features (Points: 30/40)

All assigned technical features were implemented successfully:

- The **Create Job** feature is fully functional.
- **Authentication** was successfully integrated into the V2 release, securing the endpoints.
- Critical bugs in the **Delete** feature (parameter naming mismatches) were identified and resolved.

### Reason for Deduction (-16 Points)

I have deducted 16 points (20%) from my total score to reflect issues with **Time Management and Process**.

- While the code functions correctly, the final delivery—specifically the **Jest testing suite** and this **Self-Assessment**—was submitted dangerously close to the deadline.
