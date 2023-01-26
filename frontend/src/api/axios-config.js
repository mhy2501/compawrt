import axios from 'axios'

const app = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
		'Access-Control-Allow-Credentials': 'true'
    }
})

export default app