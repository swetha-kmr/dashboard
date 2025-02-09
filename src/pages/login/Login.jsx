import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Fixed typo in variable name
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      dispatch({ type: "LOGIN", payload: user });
      navigate("/dashboard"); // Changed from "/" to "/dashboard" to match our router setup
      
    } catch (error) {
      setError(true);
      // You can add more specific error messages based on error.code
      console.error("Login error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !email || !password}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div className="error-message">
            Wrong email or password! Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
