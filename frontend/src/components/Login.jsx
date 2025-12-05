import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = useField("username");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await login({
      username: username.value,
      password: password.value,
    });
    if (success) {
      console.log("success");
      navigate("/");
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>User Name:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;