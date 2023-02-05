import express from "express"
import doorLock from "./router/doorLock"
import auth from "./router/auth"
import cors from "cors"
import mongoose from "mongoose"
import * as dotenv from 'dotenv';

dotenv.config()
const app = express()
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://localhost/rustify", { family: 4 })

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  })

  const intervalId = setInterval(() => {
    res.write(`data: ${Date.now()}\n\n`)
  }, 1000)

  res.on("close", () => {
    console.log("Client closed")
    clearInterval(intervalId)
  })
})

  app.use("/door-lock", doorLock)
  app.use("/login", auth)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server has been started on port " + PORT);
})