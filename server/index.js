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

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.post("/createUser", async (req, res) => {
  const user = req.body
  const newUser = new UserModel(user)
  await newUser.save()

  res.json(user)
})

app.listen(3001, () => {
  console.log("Server running on 3001...")
})
