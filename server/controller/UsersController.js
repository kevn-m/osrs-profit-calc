const UserModel = require("../models/User")

module.exports = {
  get: (req, res) => {
    UserModel.find({})
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  post: async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)
  },
}
