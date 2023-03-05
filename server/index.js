const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./models/User")

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://kevn-m:oUv67TriWEVG3EAJ@cluster0.jy9unwn.mongodb.net/osrs-profit-calc?retryWrites=true&w=majority"
)

const userRouter = require("./routes/users")

app.use("/users", userRouter)

app.listen(3001, () => {
  console.log("Server running on 3001...")
})
