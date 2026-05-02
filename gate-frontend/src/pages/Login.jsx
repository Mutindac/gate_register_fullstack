import { useState } from "react";
import { api } from "../api/api";

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleLogin = async () => {
        const data = await api.post("login/", form, false); 
        if (data.access) {
            localStorage.setItem("token", data.access);
            window.location.href = "/";
     } else {
        alert("Login failed");
     }
    };

        return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Login</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;