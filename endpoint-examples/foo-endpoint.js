"use strict"

const app = require("express")()

const ticketsStorage = []

// midlewares
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan())

// helpers
const errorsInTen = require("./helper/random-error-in-ten")

// routes
app.post("/api/v1/tickets", (req, res) => {

  const { id_ingresso, id_show } = req.body

  errorsInTen(3, new Error("foo error"))

  ticketsStorage.push({id_ingresso, id_show})

  res.sendStatus(204)
})


app.get("/api/v1/tickets", (req, res) => {

  const { query } = req
  const { id_show } = query

  const total = ticketsStorage.filter(c => c.id_show === id_show).length

  res.json({ total })
})

app.get("/api/v1/tickets/validate", (req, res) => {

  const { query } = req
  const { id_ingresso, id_show } = query

  const ticket = ticketsStorage.filter(c => c.id_show === id_show && c.id_ingresso === id_ingresso)

  res.json({ valid : !!ticket })
})

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message })
})

app.listen(3000, () => {
  console.log('foo mock api is listening on port 3000!')
})

