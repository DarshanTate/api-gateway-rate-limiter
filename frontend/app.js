const API_BASE = "http://localhost:5000";

function App() {
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
  );
  const [response, setResponse] = React.useState("");

  // ---------------- LOGIN ----------------
  async function login() {
    if (!email) {
      alert("Please enter email");
      return;
    }

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!data.token) {
      alert("Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  // ---------------- CALL PROTECTED API ----------------
  async function callAPI() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    const res = await fetch(`${API_BASE}/api/data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`   // 🔴 CRITICAL LINE
      }
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  // ---------------- LOGOUT ----------------
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setResponse("");
    setEmail("");
  }

  // ---------------- UI ----------------
  if (!token) {
    return (
      <div>
        <h3>Login</h3>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Dashboard</h3>

      <button onClick={callAPI}>
        Call Protected API
      </button>

      <pre>{response}</pre>

      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(<App />);
