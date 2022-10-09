import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/users"
})

export const register = (userDetails) => {
    try {
        console.log(userDetails)
        const response = api.post("http://localhost:5000/users/register", userDetails)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const login = (loginDetails) => {
    try {
        const response = api.post(`/login`, loginDetails)
        return response
    } catch (error) {
        console.log(error)
    }
}