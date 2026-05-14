import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      if (
        response.data.message ===
        "Login Successful"
      ) {
        localStorage.setItem(
          "user_id",
          response.data.user_id
        );

        localStorage.setItem(
          "name",
          response.data.name
        );
        localStorage.setItem(
  "token",
  response.data.token
);

        alert("Login Successful");

        navigate("/dashboard");

      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          style={styles.link}
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #0f172a, #1e3a8a)",
  },

  card: {
    width: "400px",
    padding: "35px",
    borderRadius: "18px",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    textAlign: "center",
  },

  heading: {
    fontSize: "45px",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },

  link: {
    display: "block",
    marginTop: "20px",
    color: "#cbd5e1",
    textDecoration: "none",
  },
};

export default Login;