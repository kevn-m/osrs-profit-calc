const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/items", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json",
      {
        params: {
          category: 1,
          alpha: "rune 2h",
          page: 1,
        },
      }
    )

    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
