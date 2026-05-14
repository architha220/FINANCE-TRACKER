function ForgotPassword() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Forgot Password</h1>

        <p style={styles.text}>
          Enter your registered email address.
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
        />

        <button style={styles.button}>
          Reset Password
        </button>
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
    background: "linear-gradient(to right, #0f172a, #1e3a8a)",
    padding: "20px",
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    textAlign: "center",
  },

  heading: {
    fontSize: "45px",
    marginBottom: "20px",
  },

  text: {
    marginBottom: "20px",
    color: "#cbd5e1",
    fontSize: "18px",
  },

  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default ForgotPassword;