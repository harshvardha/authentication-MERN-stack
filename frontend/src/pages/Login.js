import { useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../Services/suppliers"
import "./Authentication.css"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () => {
        if (email && password) {
            const response = await login({ email, password })
            if (response.status === 200) {
                console.log("Logged In")
            }
        }
    }

    return (
        <div className="authentication">
            <h1 className="authentication--title">LOGIN</h1>
            <div className="authentication--input">
                <h4>Email</h4>
                <input
                    name="email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="authentication--input">
                <h4>Password</h4>
                <input
                    name="password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="authentication--buttons">
                <button onClick={onSubmit}>Login</button>
                <Link to={"/register"}><button>Register</button></Link>
            </div>
        </div>
    )
}

export default Login