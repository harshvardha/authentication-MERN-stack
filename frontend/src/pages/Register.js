import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../Services/suppliers"
import "./Authentication.css"

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = async () => {
        if (firstName && lastName && userName && email && password) {
            const regsiterDetails = {
                firstName,
                lastName,
                userName,
                email,
                password
            }
            const response = await register(regsiterDetails)
            if (response.status === 201) {
                navigate("/")
            }
        }
    }

    return (
        <div className="authentication">
            <h1 className="authentication--title">REGISTER</h1>
            <div className="authentication--input">
                <h4>Firstname</h4>
                <input
                    name="firstname"
                    type="text"
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div className="authentication--input">
                <h4>Lastname</h4>
                <input
                    name="lastname"
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="authentication--input">
                <h4>Username</h4>
                <input
                    name="username"
                    type="text"
                    onChange={(event) => setUserName(event.target.value)}
                />
            </div>
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
                    type="text"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button className="authentication--register" onClick={onSubmit}>Register</button>
        </div>
    )
}

export default Register