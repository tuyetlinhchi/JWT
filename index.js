const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URL,
			{
				useNewUrlParser: true, 
				useUnifiedTopology: true
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
