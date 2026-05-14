import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>Personal Finance Tracker</h1>

          <p style={styles.description}>
            Manage your income, expenses, savings, monthly reports,
            and financial history in one smart dashboard.
          </p>

          <div style={styles.buttonContainer}>
            <Link to="/signup">
              <button style={styles.signupButton}>
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button style={styles.loginButton}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    textAlign: "center",
    color: "white",
    maxWidth: "700px",
    padding: "40px",
  },

  title: {
    fontSize: "60px",
    marginBottom: "20px",
  },

  description: {
    fontSize: "22px",
    lineHeight: "1.8",
    color: "#cbd5e1",
  },

  buttonContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  signupButton: {
    padding: "15px 35px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  loginButton: {
    padding: "15px 35px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
    color: "#0f172a",
    cursor: "pointer",
  },
};

export default Home;