import './Register.css';
import {useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Register = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate()

    function createAndLoginUser() {
        const requestBody = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            firstName: firstName,
            lastName: lastName
        }

        ajax(`${baseURL}api/users/register`, "POST", null, requestBody)
            .then((response) => {
                if (response.email !== null) {
                    alert("You have registered successfully, please check your email for activation");
                    navigate("/")
                }
            });

    }

    return (
        <div>
            <Navbar/>
            <div className="register-container">
                <h2>Register</h2>
                <section>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => createAndLoginUser()}
                    >Register
                    </button>
                </section>
            </div>
        </div>
    )
}

export default Register;