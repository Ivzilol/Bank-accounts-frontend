import './Login.css'
import {useState} from "react";
import baseURL from "../BaseUrl/baseURL";
import {useUser} from "../../userPrivider/UserProvider";
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Login = () => {

    const user = useUser();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function sendLoginRequest() {
        const requestBody = {
            "username": username,
            "password": password,
        };
        fetch(`${baseURL}api/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.username !== null)
                    return Promise.all([response.json(), response.headers])
                else return Promise.reject("Invalid login attempt")
            })
            .then(([, headers]) => {
                user.setJwt(headers.get("Authorization"))
                navigate("/")
            }).catch(() => {

        });
    }

    return (
        <div>
            <Navbar/>
            <div className="register-container">
                <h2>Login</h2>
                <section>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Password</label>
                        <input
                            type="password"
                            id="firstName"
                            name="firstName"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => sendLoginRequest()}
                    >Login
                    </button>
                </section>
            </div>
        </div>
    )
}

export default Login;