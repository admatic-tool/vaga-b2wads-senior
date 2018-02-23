"use strict"

const app = require("express")()

const valoresStore = []

// midlewares
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan())

// helpers
const errorsInTen = require("./helper/random-error-in-ten")

// routes
app.post("/api/v1/valores", (req, res) => {

  const { id_show, valor } = req.body

  errorsInTen(8, new Error("fighters error"))

  valoresStore.push({ id_show, valor })

  res.sendStatus(204)
})

app.get("/api/v1/valores", (req, res) => {

  const { query } = req
  const { id_show } = query
  const valor = valoresStore.filter(el => el.id_show === id_show)
                            .reduce((memo, d) => memo + d.valor, 0)

  res.json({ valor })
})

app.get("/api/v1/valores/ticket-medio", (req, res) => {

  const { query } = req
  const { id_show } = query
  const valores = valoresStore.filter(el => el.id_show === id_show)

  const valor_total = valores.reduce((memo, d) => memo + d.valor, 0)

  res.json({ ticket_medio: valor_total / valores.length })
})

app.listen(4000, () => {
  console.log('fighters mock api is listening on port 4000!')
})