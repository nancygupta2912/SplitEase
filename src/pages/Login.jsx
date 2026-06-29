import { useState } from "react";
import "./Login.css";
import { login } from "../services/authService";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const data = await login({
                email,
                password
            });

            // console.log(data);

            localStorage.setItem("token", data.token);

            localStorage.setItem("user",JSON.stringify(data.user));

            navigate("/dashboard");

        } catch (error) {
            console.log(error.response.data);
        }

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>SplitEase</h1>
                <p>Welcome Back 👋</p>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>
                    Login
                </button>

                <p className="signup-text">
                  Don't have an account?{" "}
                <Link to="/signup">Sign Up</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;