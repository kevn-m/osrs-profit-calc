const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/items", async (req, res) => {
  try {
    const response = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/mapping"
    )

    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/prices", async (req, res) => {
  try {
    const response = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/5m"
    )

    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/latest", async (req, res) => {
  try {
    const response = await axios.get(
      `https://prices.runescape.wiki/api/v1/osrs/latest`
    )

    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
