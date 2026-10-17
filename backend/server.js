import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import redirect from "./routes/redirect.js"
import urlRoutes from "./routes/urlRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongodb connected successfully")).catch((err) => {
    console.log("Database Error:",err)
})

app.use("/api/url", urlRoutes)
app.use("/",redirect)


app.listen(PORT, () => {
    console.log(`server is up and running at PORT ${PORT}`)
})