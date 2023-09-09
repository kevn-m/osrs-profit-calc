const express = require("express")

const app = express()
const mongoose = require("mongoose")

const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

// const userRouter = require("./routes/Users")
const apiRouter = require("./routes/Api")

// app.use("/users", userRouter)
app.use("/api", apiRouter)

if (require.main === module) {
  app.listen(3001, () => {
    console.log("Server running on 3001...")
  })
}

module.exports = app
