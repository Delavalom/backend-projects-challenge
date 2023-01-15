import express from "express";
import { config } from 'dotenv'
import { route as productsRoute } from "./routes/products.route.js";

const app = express()

config()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRoute)

app.listen(port, () => console.log(`listennig on the port ${port}`))