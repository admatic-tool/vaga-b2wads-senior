"use strict"

const app = require("express")()


const debitStore = []

// middlware
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan())

// helpers
const errorsInTen = require("./helper/random-error-in-ten")

// routes
app.post("/api/v1/debit", (req, res) => {

  const { account_id, cpc } = req.body

  errorsInTen(8, new Error("debit error"))
  debitStore.push({ account_id, cpc  })

  res.sendStatus(204)
})


app.get("/api/v1/debit", (req, res) => {

  const { query } = req
  const { account_id } = query
  const debit = debitStore.filter(d => d.account_id === account_id)
                          .reduce((memo, d) => memo + d.cpc, 0)

  res.json({ debit })
})

app.listen(4000, () => {
  console.log('debit mock api is listening on port 4000!')
})