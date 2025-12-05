import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
 
const Signup = () => {
  // const userSchema = new mongoose.Schema(
  //   {
  //     name: { type: String, required: true }, // Full name
  //     username: { type: String, required: true, unique: true },
  //     password: { type: String, required: true }, // Hashed password
  //     phone_number: { type: String, required: true }, // Contact number
  //     gender: { type: String, required: true }, // Gender
  //     date_of_birth: { type: Date, required: true },
  //     address: {
  //       street: { type: String, required: true }, // Street address
  //       city: { type: String, required: true }, // City
  //       zipCode: { type: String, required: true }, // Postal/ZIP code
  //     },
  //   },
  //   { timestamps: true, versionKey: false }
  // );
 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZipCode, setAddressZipCode] = useState("");
 
  const { signup, error } = useSignup("/api/users/signup");
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      name,
      username,
      password,
      phone_number,
      gender,
      date_of_birth,
      address: {
        street: addressStreet,
        city: addressCity,
        zipCode: addressZipCode,
      },
    });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };
 
  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          required
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Gender:</label>
        <input
          type="text"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Date of Birth:</label>
        <input
          type="date"
          required
          value={date_of_birth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Street Address:</label>
        <input
          type="text"
          required
          value={addressStreet}
          onChange={(e) => setAddressStreet(e.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          required
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
        />
        <label>Zip Code:</label>
        <input
          type="text"
          required
          value={addressZipCode}
          onChange={(e) => setAddressZipCode(e.target.value)}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};
 
export default Signup;
 