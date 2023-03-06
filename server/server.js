const express = require("express")

const app = express()
const mongoose = require("mongoose")

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://kevn-m:oUv67TriWEVG3EAJ@cluster0.jy9unwn.mongodb.net/osrs-profit-calc?retryWrites=true&w=majority"
)

const userRouter = require("./routes/Users")
const apiRouter = require("./routes/Api")

app.use("/users", userRouter)
app.use("/api", apiRouter)

app.listen(3001, () => {
  console.log("Server running on 3001...")
})
