import {connectDatabase} from "./pool.js"
import express from "express"
import {router} from "./routes/routes.js"
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()

const pool = connectDatabase()
const app = express()
const PORT = 8000


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
}))

app.use(router)

pool.connect((err) => {
	if (err) {
		console.log(err)
	} else {
		app.listen(PORT, () => {
			console.log(`Server has started on http://localhost:${PORT}`)
		})
	}
})