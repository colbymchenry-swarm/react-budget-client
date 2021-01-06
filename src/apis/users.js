import axios from 'axios'

export default axios.create({
    baseURL: 'https://megarestock.com:4000/users'
})