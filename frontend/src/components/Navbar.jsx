import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const authPages =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";
  const handleLogout = () => {
  localStorage.clear();

  navigate("/");
};

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Finance Tracker</h2>

      <div style={styles.links}>
        {authPages ? (
          <>
            <Link style={styles.link} to="/login">
              Login
            </Link>

            <Link style={styles.link} to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/dashboard">
              Dashboard
            </Link>
            

            <Link style={styles.link} to="/history">
              History
            </Link>

            <Link style={styles.link} to="/reports">
              Reports
            </Link>
            <button
  style={styles.logoutButton}
  onClick={handleLogout}
>
  Logout
</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#020617",
    padding: "20px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "white",
    fontSize: "42px",
  },

  links: {
    display: "flex",
    gap: "30px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "500",
  },
  logoutButton: {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
},
};

export default Navbar;