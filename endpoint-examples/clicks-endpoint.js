"use strict"

const app = require("express")()


const clicksStore = []

// midlewares
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan())


// helpers
const errorsInTen = require("./helper/random-error-in-ten")

// routes
app.post("/api/v1/clicks", (req, res) => {

  const { ad_id } = req.body

  errorsInTen(3, new Error("click error"))

  clicksStore.push({ ad_id })

  res.sendStatus(204)
})


app.get("/api/v1/clicks", (req, res) => {

  const { query } = req
  const { ad_id } = query

  const clicks = clicksStore.filter(c => c.ad_id === ad_id).length

  res.json({ clicks })
})

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message })
})

app.listen(3000, () => {
  console.log('click mock api is listening on port 3000!');
})

