const express = require("express")
const router = express.Router()
const UserModel = require("../models/User")

router.get("/", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post("/new", async (req, res) => {
  const user = req.body
  const newUser = new UserModel(user)
  await newUser.save()

  res.json(user)
})

module.exports = router
